class NASelect {
	constructor(sub) {
		this.DOMElement				= sub.DOMElement
		this.PlaceHolder			= sub.custom.placeholder ? sub.custom.placeholder : (this.DOMElement.dataset.placeholder ? this.DOMElement.dataset.placeholder : polyglot.t('core.select_value'));
		this.TemplateSelection		= sub.custom.templateSelection ? sub.custom.templateSelection : (this.DOMElement.dataset.formatselection ? this.DOMElement.dataset.formatselection : null);
		this.TemplateResult			= sub.custom.templateResult ? sub.custom.templateResult : (this.DOMElement.dataset.formatresult ? this.DOMElement.dataset.formatresult : null);
		this.Parent					= sub.custom.parent ? sub.custom.parent : (this.DOMElement.parentElement ? this.DOMElement.parentElement : null);
		this.Multiple				= sub.custom.multiple || this.DOMElement.dataset.multiple == 'true' || this.DOMElement.multiple ? true : false;
		this.Width					= sub.custom.width ? sub.custom.width : (this.DOMElement.style.width ? this.DOMElement.style.width : 'resolve');
		this.Translations			= sub.custom.translations ? sub.custom.translations : {};
		this.MaximumSelectionSize	= sub.custom.maximumSelectionSize ? sub.custom.maximumSelectionSize : (this.DOMElement.dataset.maximumSelectionSize ? this.DOMElement.dataset.maximumSelectionSize : 9999);
		this.FormatSelectionTooBig	= sub.custom.formatSelectionTooBig ? sub.custom.formatSelectionTooBig : (this.DOMElement.dataset.formatSelectionTooBig ? this.DOMElement.dataset.formatSelectionTooBig : '');
		this.Ajax					= null;
		this.Code					= null;
		this.Limit					= null;
		this.AjaxURL				= null;
		this.LoadMorePadding		= null;
		this.ProcessID				= null;
		this.ProcessValue			= null;
		this.Separator				= sub.custom.separator ? sub.custom.separator : (this.DOMElement.dataset.separator ? this.DOMElement.dataset.allowclear : ';');
		this.AllowClear				= sub.custom.allowClear === false || this.DOMElement.dataset.allowclear === 'false' ? false : true;
		this.SetCustomConfig(sub);
		this.Build();
	}

	SetCustomConfig(data) {
	}

	SetConfig() {
		const self = this;
		return {
			language				: this.GetTranslations(),
			placeholder				: this.PlaceHolder,
			allowClear				: this.AllowClear,
			width					: this.Width,
			ajax					: this.Ajax,
			dropdownParent			: this.Parent,
			loadMorePadding			: 200,
			multiple				: this.Multiple,
			closeOnSelect			: true,
			separator				: this.Separator,
			maximumSelectionSize	: this.MaximumSelectionSize,
			formatSelectionTooBig	: function (x) { return self.FormatSelectionTooBig; },
			formatSearching			: function () { return 'Recherche...'; },
			templateSelection		: function (x) {
				if (self.TemplateSelection == undefined) {
					let parser = new DOMParser();
					let document = parser.parseFromString(x.text, 'text/html');
					var htmlObject = document.createElement('div');
					htmlObject.innerHTML = document.body.innerHTML;
					return htmlObject;
				}
				return window[self.TemplateSelection](x);
			},
			templateResult			: function (x) {
				if (x.element != undefined && x.element.className != undefined && x.element.className != "") {
					console.log(x);
					let wrapper = document.createElement('span');
					wrapper.classList = x.element.className;
					wrapper.innerHTML = x.text;
					return wrapper;
				}
				if (self.TemplateResult != undefined) {
					return window[self.TemplateResult](x);
				}
				let parser = new DOMParser();
				let doc = parser.parseFromString(x.text, 'text/html');
				var htmlObject = doc.createElement('div');
				htmlObject.innerHTML = doc.body.innerHTML;
				return htmlObject;				
			},
		}
	}

	GetTranslations() {
		const self = this;
		return {
			errorLoading	: function () { return self.Translations.errorLoading ? self.Translations.errorLoading : polyglot.t("select2.errorLoading") },
			inputTooLong	: function () { return self.Translations.inputTooLong ? self.Translations.inputTooLong : polyglot.t("select2.inputTooLong") },
			inputTooShort	: function () { return self.Translations.inputTooShort ? self.Translations.inputTooShort : polyglot.t("select2.inputTooShort") },
			loadingMore		: function () { return self.Translations.loadingMore ? self.Translations.loadingMore : polyglot.t("select2.loadingMore") },
			maximumSelected	: function () { return self.Translations.maximumSelected ? self.Translations.maximumSelected : polyglot.t("select2.maximumSelected") },
			noResults		: function () { return self.Translations.noResults ? self.Translations.noResults : polyglot.t("select2.noResults") },
			searching		: function () { return self.Translations.searching ? self.Translations.searching : polyglot.t("select2.searching") }
		};
	}

	Build() {
		if (typeof $(this.DOMElement).select2 !== 'function')
			return;
		$(this.DOMElement).select2(this.SetConfig())
		this.DOMElement.classList.add('autocomplete-initialized-new');
	}
}

class NASelectSimpleSearch extends NASelect {
	constructor(data) {
		super(data);
	}
}

class NASelectAutocomplete extends NASelect {
	constructor(data) {
		super(data);
	}

	SetCustomConfig(data) {
		this.Code		= data.custom.code ? data.custom.code : (this.DOMElement.dataset.code ? this.DOMElement.dataset.code : null);
		this.Limit		= data.custom.limit ? data.custom.limit : (this.DOMElement.dataset.limit ? this.DOMElement.dataset.limit : 20);
		this.AjaxURL	= (data.custom.url_root ? data.custom.url_root : '') + (data.ajaxURL ? data.ajaxURL : (this.DOMElement.dataset.url ? this.DOMElement.dataset.url : "/global/module/admin/ressources/ajax/ajax_stdAutocomplete.php"));
		this.ProcessID		= data.custom.processID ? data.custom.processID : (this.DOMElement.dataset.processId ? this.DOMElement.dataset.processId : null);
		this.ProcessValue 	= data.custom.processValue ? data.custom.processvalue : (this.DOMElement.dataset.processValue ? this.DOMElement.dataset.processValue : null);
		this.Ajax		= this.SetAjax();
	}

	SetAjax() {
		const self = this;
		return {
			type		: 'POST',
			url			: this.AjaxURL,
			quietMillis	: 750,
			data		: function (params) {
				return {
					query		: params.term,
					limit		: self.Limit,
					page		: params.page,
					criterion	: self.Code
				};
			},
			results		: function (data, page) {
				let more = data.fullLoaded ? false : (page * self.Limit) < data.total;
				return {results: data.results, more: more};
			},
			processResults: (self.ProcessID && self.ProcessValue ? function (data) {
				let data_;

				try {
					data_ = JSON.parse(data);
				} catch (e) {
					data_ = data;
				}

				let results = [];
				data_.forEach(element => {
					results.push({
						'id': element[self.ProcessID],
						'text': element[self.ProcessValue]
					});
				});
				return {
					results: results
				};
			} : function (data) { return data; })
		};
	}
}

const _NASelect2 = new class {
	InitSimpleSearch(selector = document, classe = 'na-select2', data = {}) {
		if (selector !== document && typeof selector === 'object' && selector[0])
			selector = selector[0]
		let selects = selector.getElementsByClassName(classe);
		for (let index = 0; index < selects.length; index++)
			if (!selects[index].classList.contains('autocomplete-initialized-new'))
				new NASelectSimpleSearch({DOMElement: selects[index], custom: data})
	}

	InitAutoComplete(selector = document, classe = 'na-select2-autocomplete', data = {}) {
		if (selector !== document && typeof selector === 'object' && selector[0])
			selector = selector[0]
		let autocomplete = selector.getElementsByClassName(classe);
		for (let index = 0; index < autocomplete.length; index++)
			if (!autocomplete[index].classList.contains('autocomplete-initialized-new'))
				new NASelectAutocomplete({DOMElement: autocomplete[index], custom: data})
	}
}

document.addEventListener('DOMContentLoaded', function () {
	_NASelect2.InitSimpleSearch();
	_NASelect2.InitAutoComplete();
}, false);
