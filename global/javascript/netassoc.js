$.ajaxSetup({
    headers:
        { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
});

let inputElement = document.createElement('input');
inputElement.setAttribute('type', 'hidden');
inputElement.setAttribute('name', 'secret_xss_lite');
inputElement.setAttribute('value', $('meta[name="csrf-token"]').attr('content'));

let forms = document.getElementsByTagName("form");

setInterval(function() {
    Object.values(forms).forEach( (key) =>{
        var current = key.getAttribute('class');
        if (current && current.includes('has_xss'))
            return;
        key.setAttribute('class', ((current ? current : '') + ' has_xss').trim())
        key.insertAdjacentHTML('afterbegin', inputElement.outerHTML);
    })
}, 1000);

window.NALib = Object;

/*******************************************************************************
 * Fonctionnalités sur les listes de paramètres
 ******************************************************************************/
function showAddButton(elem, child, del)
{
	if( !child || typeof child == 'undefined')
		elem.find('.ajoutItem').hide();

	if( del && typeof del != 'undefined' && elem.find('tr:first').parent() && elem.find('tr:first').parent().children('tr:last.isParent').length)
		elem.find('tr:first').parent().children('tr:last.isParent').find('.ajoutItem').show();
	else
		elem.find('tr:first').parent().children('tr:last').find('.ajoutItem').show();

	elem.find('.ajoutDoc').hide();
	elem.find('tr:first').parent().children('tr:last').find('.ajoutDoc').show();
}

function del_item(elem)
{
	var limit = 1;
	if (elem.closest('table').find('tr:first').children('th').size())
		limit += 1;

	if( elem.closest('tr').hasClass('isParent')) {
		if( elem.closest('tr').next('tr').hasClass('isChild') )
		{
			alert('Vous devez supprimer les enfants');
			return false;
		}
	}


	if (elem.closest('table').find('tr:first').parent().children('tr').size() > limit)
	{
		var tab_tmp = elem.closest('table');
		var deletedIdex = tab_tmp.find('tr:not(.form-head)').index(elem.closest('tr'));
		elem.closest('tr').remove();
		showAddButton(tab_tmp, null, true);

		var start = tab_tmp.find('tr:first').children('th').size() ? 1 : 0;

		tab_tmp.find('tr:first').parent().children('tr').each(
			function(index)
			{
				rename_item($(this), index - start);
			}
		);
	}
	else
	{
		reset_item(elem, 0);
	}

	if (typeof tab_tmp != 'undefined')
		tab_tmp.trigger('deleted-item', deletedIdex);
}

function addSousQuestion(elem)
{
	clone = ajout_item(elem, false, true);

	clone.find('.add_dom').hide();
	clone.find('.open-edit-popup-disabled').show().css('opacity', '0.2');
	clone.find('.open-edit-popup').hide();
	if( !clone.find('td:visible:first').find('.sous-question').length )
		clone.find('td:visible:first').prepend('<div class="sous-question"></div>');
	clone.find('.sous-question').html('<img src="/global/images/arrow_ltr2.gif" style="padding:10px;">');
	clone.find('.ajoutItem').hide();
	clone.find('.is_child').val(1);
	//clone.find('.is_child').attr('data-default', 1);


	if( typeof customChild == 'function')
		customChild(clone);

	//console.log(elem);
}

function rename_item(elem, index)
{
	elem.closest('tr').find(".text, .datepicker-tabform, select.std_autocomplete ").each(
	        function()
	        {
                console.log($(this).attr('name'));
                var name = $(this).attr('name').lastIndexOf('[') != -1 ? $(this).attr('name').substr(0,
		                $(this).attr('name').lastIndexOf('['))
		                + '[' + index + ']' : $(this).attr('name');
		        $(this).attr('name', name);

				if ($(this).data('name'))
				{
					name = $(this).data('name').lastIndexOf('[') != -1 ? $(this).data('name').substr(0,
						$(this).data('name').lastIndexOf('['))
						+ '[' + index + ']' : $(this).data('name');
					$(this).data('name', name);
				}
	        });

	elem.closest('tr').find(".textarea").each(
	        function()
	        {
		        var name = $(this).attr('name').lastIndexOf('[') != -1 ? $(this).attr('name').substr(0,
		                $(this).attr('name').lastIndexOf('['))
		                + '[' + index + ']' : $(this).attr('name');
		        $(this).attr('name', name);

				if ($(this).data('name'))
				{
					name= $(this).data('name').lastIndexOf('[') != -1 ? $(this).data('name').substr(0,
						$(this).data('name').lastIndexOf('['))
						+ '[' + index + ']' : $(this).data('name');
					$(this).data('name', name);
				}
	        });

	elem.closest('tr').find(".checkbox").each(
	        function()
	        {
		        var name = $(this).attr('name').lastIndexOf('[') != -1 ? $(this).attr('name').substr(0,
		                $(this).attr('name').lastIndexOf('['))
		                + '[' + index + ']' : $(this).attr('name');
		        $(this).attr('name', name);


				if ($(this).data('name'))
				{
					name= $(this).data('name').lastIndexOf('[') != -1 ? $(this).data('name').substr(0,
						$(this).data('name').lastIndexOf('['))
						+ '[' + index + ']' : $(this).data('name');
					$(this).data('name', name);
				}
	        });

	elem.closest('tr').find(".radio").each(
	        function()
	        {
		        $(this).attr('value', index);
	        });

	elem.closest('tr').find("select.select").each(
	        function()
	        {
		        //return ;
                
                var hook = '';
                if( $(this).attr('name').lastIndexOf('[]') != -1 )
                    hook = '[]';
                
                $(this).attr('name', $(this).attr('name').replace(hook, ''));
                
                var name = $(this).attr('name').lastIndexOf('[') != -1 ? 
                                $(this).attr('name').substr(0, $(this).attr('name').lastIndexOf('[')) + '[' + index + ']' 
                                : 
                                $(this).attr('name');
                
		        $(this).attr('name', name + hook);
		        
                if ($(this).data('name'))
				{
					name= $(this).data('name').lastIndexOf('[') != -1 ? $(this).data('name').substr(0,
						$(this).data('name').lastIndexOf('['))
						+ '[' + index + ']' : $(this).data('name');
					$(this).data('name', name);
				}
	        });

	elem.closest('tr').find(".hidden,.slider").each(
	        function()
	        {
                if ($(this).attr('name')) {
    		        var name = $(this).attr('name').lastIndexOf('[') != -1 ? $(this).attr('name').substr(0,
    		                $(this).attr('name').lastIndexOf('['))
    		                + '[' + index + ']' : $(this).attr('name');
    		        $(this).attr('name', name);
                }

				if ($(this).data('name'))
				{
					name= $(this).data('name').lastIndexOf('[') != -1 ? $(this).data('name').substr(0,
						$(this).data('name').lastIndexOf('['))
						+ '[' + index + ']' : $(this).data('name');
	                $(this).data('name', name);
				}
	        });


	elem.closest('tr').find(".file").each(
	        function()
	        {
		        var name = $(this).attr('name').lastIndexOf('[') != -1 ? $(this).attr('name').substr(0,
		                $(this).attr('name').lastIndexOf('['))
		                + '[' + index + ']' : $(this).attr('name');
		        $(this).attr('name', name);

				if ($(this).data('name'))
				{
					name= $(this).data('name').lastIndexOf('[') != -1 ? $(this).data('name').substr(0,
						$(this).data('name').lastIndexOf('['))
						+ '[' + index + ']' : $(this).data('name');
					$(this).data('name', name);
				}
	        });
            
            
    elem.closest('tr').find("[type=checkbox]:not(.optGroupCheck)").each(
	        function()
	        {
                var hook = '';
                if( $(this).attr('name').lastIndexOf('[]') != -1 )
                    hook = '[]';
                
                $(this).attr('name', $(this).attr('name').replace(hook, ''));
                
		        var name = $(this).attr('name').lastIndexOf('[') != -1 ? $(this).attr('name').substr(0,
		                $(this).attr('name').lastIndexOf('['))
		                + '[' + index + ']' : $(this).attr('name');
		        
                $(this).attr('name', name + hook);
                
				if ($(this).data('name'))
				{
					name = $(this).data('name').lastIndexOf('[') != -1 ? $(this).data('name').substr(0,
						$(this).data('name').lastIndexOf('['))
						+ '[' + index + ']' : $(this).data('name');
					$(this).data('name', name);
				}
	        });
}

function reset_item(elem, index, notResetItem)
{
	elem.closest('tr').find(".text, select.std_autocomplete").each(
	        function()
	        {
				if (!$(this).attr('name')) {
					// Might be a multipleSelect search input so no need to process
					return;
				}

		        var name = $(this).attr('name').lastIndexOf('[') != -1 ? $(this).attr('name').substr(0,
		                $(this).attr('name').lastIndexOf('['))
		                + '[' + index + ']' : $(this).attr('name');

				if(typeof notResetItem != 'undefined' && notResetItem)
					$(this).attr('name', name);
				else
					$(this).val('').attr('name', name);

				if ($(this).data('name'))
				{
					name = $(this).data('name').lastIndexOf('[') != -1 ? $(this).data('name').substr(0,
						$(this).data('name').lastIndexOf('['))
						+ '[' + index + ']' : $(this).data('name');
					$(this).data('name', name);
				}
		        
		        if (typeof $(this).data('default') != 'undefined')
		        	$(this).val($(this).data('default'));
	        });

	elem.closest('tr').find(".datepicker-tabform").each(
		function()
		{
			var name = $(this).attr('name').lastIndexOf('[') != -1 ? $(this).attr('name').substr(0,
																								 $(this).attr('name').lastIndexOf('['))
																		 + '[' + index + ']' : $(this).attr('name');

			if(typeof notResetItem != 'undefined' && notResetItem)
				$(this).attr('name', name);
			else
				$(this).val('').attr('name', name);

			if ($(this).data('name'))
			{
				name = $(this).data('name').lastIndexOf('[') != -1 ? $(this).data('name').substr(0,
					$(this).data('name').lastIndexOf('['))
					+ '[' + index + ']' : $(this).data('name');
				$(this).data('name', name);
			}

			if (typeof $(this).data('default') != 'undefined')
				$(this).val($(this).data('default'));

			$(this).removeAttr('id').removeClass('hasDatepicker').next('.ui-datepicker-trigger').remove().end()
		});

	elem.closest('tr').find(".textarea").each(
	        function()
	        {
		        var name = $(this).attr('name').lastIndexOf('[') != -1 ? $(this).attr('name').substr(0,
		                $(this).attr('name').lastIndexOf('['))
		                + '[' + index + ']' : $(this).attr('name');

				if(typeof notResetItem != 'undefined' && notResetItem)
					$(this).attr('name', name);
				else
					$(this).val('').attr('name', name);

				if ($(this).data('name'))
				{
					name = $(this).data('name').lastIndexOf('[') != -1 ? $(this).data('name').substr(0,
						$(this).data('name').lastIndexOf('['))
						+ '[' + index + ']' : $(this).data('name');
					$(this).data('name', name);
				}

		        if (typeof $(this).data('default') != 'undefined')
		        	$(this).val($(this).data('default'));
	        });

	elem.closest('tr').find(".checkbox").each(
	        function()
	        {
		        var name = $(this).attr('name').lastIndexOf('[') != -1 ? $(this).attr('name').substr(0,
		                $(this).attr('name').lastIndexOf('['))
		                + '[' + index + ']' : $(this).attr('name');
		        $(this).attr('checked', false).attr('name', name);

				if ($(this).data('name'))
				{
					name = $(this).data('name').lastIndexOf('[') != -1 ? $(this).data('name').substr(0,
						$(this).data('name').lastIndexOf('['))
						+ '[' + index + ']' : $(this).data('name');
					$(this).data('name', name);
				}
	        });

	elem.closest('tr').find(".radio").each(
	        function()
	        {
		        $(this).attr('checked', false).attr('value', index);
	        });

	elem.closest('tr').find("select.select").each(
            function()
            {
                var hook = '';
                if( $(this).attr('name').lastIndexOf('[]') != -1 )
                    hook = '[]';

                $(this).attr('name', $(this).attr('name').replace(hook, ''));

                var name = $(this).attr('name').lastIndexOf('[') != -1 ? 
                                $(this).attr('name').substr(0, $(this).attr('name').lastIndexOf('[')) + '[' + index + ']' 
                                : 
                                $(this).attr('name');

                $(this).attr('name', name + hook);

                if ($(this).data('name'))
                {
                    name = $(this).data('name').lastIndexOf('[') != -1 ? $(this).data('name').substr(0,
                            $(this).data('name').lastIndexOf('['))
                            + '[' + index + ']' : $(this).data('name');
                    $(this).data('name', name);
                }


                $(this).selectedIndex = 0;
                $(this).prop('selectedIndex', 0);
                
                if (typeof $(this).data('default') != 'undefined') {
                    $(this).val($(this).data('default'));
                }

				$(this).change();
            });

	elem.closest('tr').find(".hidden,.slider").each(
	        function()
	        {
                if ($(this).attr('name')) {
    		        var name = $(this).attr('name').lastIndexOf('[') != -1 ? $(this).attr('name').substr(0,
	    	                $(this).attr('name').lastIndexOf('['))
		                    + '[' + index + ']' : $(this).attr('name');
		            $(this).attr('name', name);
                }

				if ($(this).data('name'))
				{
					name = $(this).data('name').lastIndexOf('[') != -1 ? $(this).data('name').substr(0,
						$(this).data('name').lastIndexOf('['))
						+ '[' + index + ']' : $(this).data('name');
					$(this).data('name', name);
				}

		        $(this).val(typeof $(this).data('default') != 'undefined' ? $(this).data('default') : '');
                if ($(this).hasClass('true')) {
                    $(this).removeClass('true').addClass('false');
                }
	        });
	elem.closest('tr').find(".file").each(
	        function()
	        {
		        var name = $(this).attr('name').lastIndexOf('[') != -1 ? $(this).attr('name').substr(0,
		                $(this).attr('name').lastIndexOf('['))
		                + '[' + index + ']' : $(this).attr('name');
		        $(this).val('').attr('name', name);

				if ($(this).data('name'))
				{
					name = $(this).data('name').lastIndexOf('[') != -1 ? $(this).data('name').substr(0,
						$(this).data('name').lastIndexOf('['))
						+ '[' + index + ']' : $(this).data('name');
					$(this).data('name', name);
				}

		        $(this).prev('br').remove();
		        $(this).prev('label').remove();
		        $(this).prev('input.checkbox').remove();
		        $(this).prev('a').remove();
	        });
    
    elem.closest('tr').find(".optGroupCheck").each(
	        function()
	        {
                $(this).attr('checked', false);
                $(this).closest('div').removeClass('selected');
                $(this).closest('div').removeClass('semiselected');
            }
    );
    
    elem.closest('tr').find(".multipleSelect").each(
	        function()
	        {
                $(this).find('.input-search').val('');
                $(this).find('.input-search').trigger('input');

				$(this).find('.nOption').each(function() {
					let input = $(this).find('input');
					let label = $(this).find('label');
					input.attr('id', input.attr('name') + input.attr('id'));
					label.attr('for', input.attr('id'));
				});
            }
    );
    
    elem.closest('tr').find("[type=checkbox]:not(.optGroupCheck)").each(
	        function()
	        {
                var hook = '';
                if( $(this).attr('name').lastIndexOf('[]') != -1 )
                    hook = '[]';
                
                $(this).attr('name', $(this).attr('name').replace(hook, ''));
                
		        var name = $(this).attr('name').lastIndexOf('[') != -1 ? $(this).attr('name').substr(0,
		                $(this).attr('name').lastIndexOf('['))
		                + '[' + index + ']' : $(this).attr('name');
		        
                $(this).attr('checked', false).attr('name', name + hook);
                $(this).closest('div').removeClass('selected');
                $(this).closest('div').removeClass('semiselected');

				if ($(this).data('name'))
				{
					name = $(this).data('name').lastIndexOf('[') != -1 ? $(this).data('name').substr(0,
						$(this).data('name').lastIndexOf('['))
						+ '[' + index + ']' : $(this).data('name');
					$(this).data('name', name);
				}

		        $(this).prev('br').remove();
		        $(this).prev('label').remove();
		        $(this).prev('[type=checkbox]').remove();
                $(this).prev('a').remove();
	        });

	elem.closest('tr').find(".lien_divers .delItem").attr('onClick', "del_item($(this)); return false;");

}

function ajout_item(elem, callback, child)
{
	var limit = parseInt(elem.closest('table').siblings('input.limit').val());
	if (limit && elem.closest('table').find('tr:first').children('th').size())
		limit += 1;
	if (!limit || elem.closest('table').find('tr:first').parent().children('tr').size() < limit)
	{
		var clone = elem.closest('table').find('tr:first').parent().children('tr:last').clone(/* true */);

		var index = elem.closest('table').find('tr:first').parent().children('tr').length;
		if (elem.closest('table').find('tr:first').children('th').size())
			index--;

		reset_item(clone, index, elem.hasClass('notResetItem'));


		if( child && typeof child != 'undefined' && elem.closest('tr').nextAll('tr.isParent').length)
			elem.closest('tr').nextAll('tr.isParent:first').before(clone);
		else
			elem.closest('table').append(clone);

		showAddButton(elem.closest('table'), child);
		elem.closest('table').find('tr:first').parent().children('tr:last').find('.delItem').show();
		
		make_calendar();

		clone.removeClass('isChild');
		clone.removeClass('isParent');
		clone.find('.hide_clone').hide();

		if( child && typeof child != 'undefined') {
			clone.addClass('isChild');
		}
		else {
			clone.addClass('isParent');
		}
	}
	else
	{
		alert(polyglot.t("core.limit_is", {limit:parseInt(elem.closest('table').siblings('input.limit').val())}));        
		return false;
	}
	initUIAutocomplete();

    
    if( typeof clone != "undefined")
	if (clone.has('.datepicker-tabform') && $.datepicker != 'undefined')
	{
		let minDate = clone.find('.datepicker-tabform').data('mindate') ? new Date(clone.find('.datepicker-tabform').data('mindate')) : null;
		clone.find('.datepicker-tabform').datepicker(
			{
				showOn: 'button',
				buttonImage: (typeof url_root != 'undefined' ? url_root : "" ) + '/global/images/calendar.gif',
				buttonImageOnly: true,
				dateFormat : 'dd/mm/yy',
				numberOfMonths: 3,
				showButtonPanel: true,
				minDate: minDate,
				onSelect: function(date) {
					this.dispatchEvent(new Event("input"));
				}
			}
		);
	}

	clone.find('select').change();

	initAjoutItem(clone, callback);
	initSelectColorPicker();
    
    if( typeof clone != "undefined") {
        clone.find('.select2-container').each(function()
        {
            $(this).remove();
        });
    
        clone.find('.select2').each(function()
        {
            $(this).unbind(".select2") .attr({"tabIndex": this.elementTabIndex}).show();
        });
        clone.find('.simple-search').each(function()
        {
            $(this).unbind(".simple-search") .attr({"tabIndex": this.elementTabIndex}).show();
            // $(this).select2();
        });


        // LF : si on le fait pas 2 fois il initialise pas, je sais pas pquoi
        var nbIter = 1;
        var patt = /base=100/i;
        if (!window.location.search.match(patt))
            nbIter = 2;
        for (var i = 0; i < nbIter; i++) {
            clone.find('div.autocomplete-initialized').each(function() {
                $(this).remove();
            });
            clone.find('select.autocomplete-initialized-new').each(function()
            {
                $(this).data('libelle', '');
                $(this).val('');
    
                //$(this).unbind(".std_autocomplete").removeClass('autocomplete-initialized');
                $(this).removeClass('autocomplete-initialized-new');
            });

			let select = [];
			if (clone[0].getElementsByClassName('na-select2')[0] && clone[0].getElementsByClassName('na-select2')[0].dataset.select2Id)
				select = select.concat(Array.from(clone[0].getElementsByClassName('na-select2')));
			if (clone[0].getElementsByClassName('select2')[0] && clone[0].getElementsByClassName('select2')[0].dataset.select2Id)
				select = select.concat(Array.from(clone[0].getElementsByClassName('select2')));
			if (clone[0].getElementsByClassName('simple-search')[0] && clone[0].getElementsByClassName('simple-search')[0].dataset.select2Id)
				select = select.concat(Array.from(clone[0].getElementsByClassName('simple-search')));
			if (clone[0].getElementsByClassName('na-select2-autocomplete')[0] && clone[0].getElementsByClassName('na-select2-autocomplete')[0].dataset.select2Id)
				select = select.concat(Array.from(clone[0].getElementsByClassName('na-select2-autocomplete')));
			if (clone[0].getElementsByClassName('std_autocomplete')[0] && clone[0].getElementsByClassName('std_autocomplete')[0].dataset.select2Id)
				select = select.concat(Array.from(clone[0].getElementsByClassName('std_autocomplete')));

			if (select)
				for (let index = 0; index < select.length; index++) {
					let options = Array.from(select[index].getElementsByTagName('OPTION'));
					let optionsGroups = Array.from(select[index].getElementsByTagName('OPTGROUP'));
					options = options.concat(optionsGroups);
					for (let i = 0; i < options.length; i++)
						delete options[i].dataset.select2Id;
					select[index].value = '';
					delete select[index].dataset.select2Id;
				}

			if (clone[0].getElementsByClassName('na-select2')[0] || clone[0].getElementsByClassName('na-select2-autocomplete')[0]) {
				initSimpleSearch();
				initStdAutoComplete();
			} else if (typeof $.prototype != 'undefined' && typeof $.prototype.select2 != 'undefined') {
				$(clone).find('select.simple-search, select.select2').each(function() {
					var placeHolder = $(this).data('placeholder');
					let parent = this.closest('.modal.fade.in') ? this.parentElement : '';
					$(this).select2({ 
						width: 'resolve',
						placeholder: placeHolder != undefined ? placeHolder : '',
						allowClear: true,
						dropdownParent: parent
					});
				});
			}
        }
    }
    
    /*var defaults =
		    {
				morePic: (typeof url_root != 'undefined' ? url_root : "" ) + '/global/images/skills_more.png',
				lessPic: (typeof url_root != 'undefined' ? url_root : "" ) + '/global/images/skills_less.png',
				width : 'ajust',
				height : 'clone',
				beforeTransform: false,
				afterTransform: false,
				displayOptOnDisabledItem: false
		    };
    clone.find('.multipleSelect').each(function()
    {
        initSelectMultiple($(this), defaults);
        initSearchSelectMultiple($(this), defaults);
    });*/
    
    if( typeof cleanupdom == 'function')
        cleanupdom();

	if( typeof customItem == 'function')
		customItem(clone, child);

	if( child && typeof child != 'undefined') {
		var tab_tmp = elem.closest('table').find('tr:not(.form-head)');

		var start = 0;
		tab_tmp.each(function(index) {
			//console.log(index, '-----------');
			rename_item($(this), index - start);
		});
		return clone;
	}


    return false;
}

function initUIAutocomplete()
{
	$('.UIautoComplete').each(function()
	{
		if ($(this).attr('autocompletepage') != '')
		{
			$(this).UIautocomplete('destroy').UIautocomplete(
			{
			    source : (typeof url_root != 'undefined' ? url_root : "" ) + '/global/ressources/ajax/autocomplete/' + $(this).attr('autoCompletePage') + '.php',
			    minLength : 2,
                change: function () {
                    $(this).change();
                },
				select: function(event, ui) {
					if (ui.item && ui.item.additional) {
						const add = ui.item.additional;
						Object.keys(add).forEach(element => {
							$(".UIauto-" + element).val(add[element]).change();
						});
					}
				}
			});
		}
	});
}

function initSelectColorPicker() {
  $('.colorPicker option').click(function() {
      $(this).closest("select").css('background-color', '#' + $(this).val());
  });
  $('.colorPicker').each(function() {
      $(this).css('background-color', '#' + $(this).val());
  });
  $('.colorPicker option').each(function() {
      $(this).css('background-color', '#' + $(this).val());
  });
}

/*******************************************************************************
 * Fonctionnalités sur ajout de documents
 ******************************************************************************/
function del_document(elem)
{
	var limit = 1;
	if (elem.closest('table').find('tr:first').find('th').size())
		limit += 1;
	if (parseInt(elem.closest('table').find('tr').length) > limit)
	{
		var tab_tmp = elem.closest('table');
		elem.closest('tr').remove();
		showAddButton(tab_tmp);
	}
	else
	{
		reset_document(elem);
	}
}

function reset_document(elem)
{
	elem.closest('tr').find(".libelle_doc").html('').css('display', 'none');
	elem.closest('tr').find(".champ_doc").css('display', 'block').find('input').attr('disabled', false);
	elem.closest('tr').find(".champ_doc").find('input').each(function(index)
	{
		$(this).val('');
	});
}

function ajout_document(elem)
{
	var limit = parseInt(elem.closest('table').siblings('input.limit').val());
	if (limit && elem.closest('table').find('tr:first').find('th').size())
		limit += 1;
	if (!limit || parseInt(elem.closest('table').find('tr').length) < limit)
	{
		var clone = elem.closest('table').find('tr:last').clone();
		reset_document(clone);
		clone.find('.ajoutDoc').click(function()
		{
			return ajout_item($(this));
		})
		elem.closest('table').append(clone);

		showAddButton(elem.closest('table'));
	}
	else
	{
		alert(polyglot.t("core.limit_is", {limit:parseInt(elem.closest('table').siblings('input.limit').val())}));                
	}
	initAjoutItem();
	return false;
}

function initAjoutItem(elem, callback)
{
	if (typeof elem == 'undefined')
		elem = $(document);

	elem.on('click', ".ajoutItem", function()
	{
		ajout_item($(this), callback);

		if (typeof callback == 'function')
			callback($(this));

		return false;
	});

	elem.on('click', ".ajoutDoc", function()
	{
		return ajout_item($(this));
	});
}

function loadJsFile(jsFilename)
{
	$.ajax(
	{
	    url : jsFilename,
	    dataType : 'script',
	    async : false
	});
}

function replaceJQueryVersion(newJQueryVersion)
{
	console.log(parseInt(jQuery.fn.jquery.replace(/\./g, '')));

	if (parseInt(jQuery.fn.jquery.replace(/\./g, '')) < parseInt(newJQueryVersion.replace(/\./g, '')))
	{
		loadJsFile('/global/javascript/jquery-' + newJQueryVersion + '.min.js');
	}

	console.log(parseInt(jQuery.fn.jquery.replace(/\./g, '')));
}

function retoreOldJqueryVersion()
{
	console.log(parseInt(jQuery.fn.jquery.replace(/\./g, '')));
	jQuery.noConflict();
	console.log(parseInt(jQuery.fn.jquery.replace(/\./g, '')));
}

function replaceTimeAgoLine()
{
	if($('span.hasTimeAgo').size())
	$('span.hasTimeAgo').timeago().removeClass('hasTimeAgo');
}

function initTimeAgo()
{
	if (typeof $.timeago == 'undefined')
	{
		var s = document.getElementsByTagName('script')[0];

		var a = document.createElement('script');
		a.src = (typeof url_root != 'undefined' ? url_root : "" ) + '/global/javascript/jquery.timeAgo/jquery.timeAgo.js?v=20190813';
		a.type = 'text/javascript';
		a.async = true;
		a.onload = a.onreadystatechange = function()
		{
			a.onreadystatechange = a.onload = null;

			var langue;
			if ($('#langue_selectionne_du_site').length)
				langue = $('#langue_selectionne_du_site').val();
			else
				langue = typeof langue_selected != 'undefined' ? langue_selected : '';

			$().timeago.lang = langue;

			if (langue == 'fr')
			{
				b = document.createElement('script');
				b.src = (typeof url_root != 'undefined' ? url_root : "" ) + '/global/javascript/jquery.timeAgo/languages/fr.js';
				b.type = 'text/javascript';
				b.async = true;
				b.onload = b.onreadystatechange = function()
				{
					b.onreadystatechange = b.onload = null;
					replaceTimeAgoLine();
				}
				if (s && typeof s != 'undefined' && s.parentNode && typeof s.parentNode != 'undefined')
					s.parentNode.insertBefore(b, s);

			}
			else
			{
				replaceTimeAgoLine();
			}
		}
		if (typeof s != 'undefined' && typeof s.parentNode != 'undefined')
			s.parentNode.insertBefore(a, s);
	}
	else
	{
		replaceTimeAgoLine();
	}
}

function initFancyLink()
{
	version = '1.3.4'; /* Fancybox version to use */

	if (typeof $.fancybox == 'undefined')
	{
		s = document.getElementsByTagName('script')[0];

		stylesheet = document.createElement('link');
		stylesheet.href = (typeof url_root != 'undefined' ? url_root : "" ) + '/global/javascript/jquery.fancybox/jquery.fancybox-' + version + '.css';
		stylesheet.rel = 'stylesheet';
		stylesheet.type = 'text/css';
		if (typeof s != 'undefined' && typeof s.parentNode != 'undefined')
			s.parentNode.insertBefore(stylesheet, s);

		a = document.createElement('script');
		a.src = (typeof url_root != 'undefined' ? url_root : "" ) + '/global/javascript/jquery.fancybox/jquery.fancybox-' + version + '.js';
		a.type = 'text/javascript';
		a.async = true;
		a.onload = a.onreadystatechange = function()
		{
			a.onreadystatechange = a.onload = null;
			if(typeof fancybox == 'function')
			$('a[rel=fancybox], .fancybox').fancybox();
		}
		if (typeof s != 'undefined' && typeof s.parentNode != 'undefined')
			s.parentNode.insertBefore(a, s);
	}
	else
	{
		$('a[rel=fancybox], .fancybox').fancybox();
	}
}

function initCodePostal()
{
	if ($.browser && $.browser.msie == true && parseInt($.browser.version, 10) <= 7)
		return false;

	/* Autocompletion de la ville en fonction du code postal */
	$('.autocompleteCP').UIautocomplete('destroy').UIautocomplete(
	{
	    //'autoFill' : true,
	    'autoFillCallback' : function(res, field)
	    {
		    $(res).each(function()
		                {
			    field.val(this.cp);
                var ville = this.ville.replace(new RegExp("[ ]*cedex.*", 'gi'), '');
                var villeComp = '';
                if( this.ville.indexOf('cedex') != -1 )
                    villeComp = this.ville.replace(new RegExp(".*(cedex.*)", 'gi'), '$1');
                
			    field.closest('table').find('.autocompleteVille').val(ville);
			    field.closest('table').find('.autocompleteVilleComp').val(villeComp);
		    });
		    return false;
	    },
	    'source' : function(request, response)
	    {
		    $.ajax(
		    {
		        'url' : (typeof url_root != 'undefined' ? url_root : "" ) + "/global/ressources/ajax/autocomplete/codePostal.php",
		        'dataType' : "json",
		        'data' :
		        {
		            'term' : request.term,
		            'country' : $(this.element).closest('table').find('.select.pays').val()
		        },
		        'success' : function(data)
		        {
			        response(data);
		        }
		    });
	    },
	    'minLength' : 2,
	    'select' : function(event, ui)
	    {
            var ville = ui.item.ville.replace(new RegExp("[ ]*cedex.*", 'gi'), '');
            var villeComp = '';
            if( ui.item.ville.indexOf('cedex') != -1 )
                villeComp = ui.item.ville.replace(new RegExp(".*(cedex.*)", 'gi'), '$1');

            if ($(this).closest('table').length) {
			    $(this).closest('table').find('.autocompleteVille').val(ville);
			    $(this).closest('table').find('.autocompleteVilleComp').val(villeComp);
            }
            else {
			    $('.autocompleteVille').val(ville);
			    $('.autocompleteVilleComp').val(villeComp);                
            }
	    },
	    'open' : function(event, ui)
	    {
            var acData = $(this).data('UIautocomplete');
            var currentValue = acData.term;
            var pattern = '(' + utils.escapeRegExChars(currentValue) + ')';
            
            $("ul.ui-autocomplete li a").each(function()
		    {
                var htmlString = $(this).html();
                htmlString = htmlString.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
                $(this).html(htmlString);
            });
            $("ul.ui-autocomplete").css({'height' : '170px', 'overflowY' : 'scroll', 'fontSize' : '11px'});
	    }
	});
}

function initVilleEntreprise()
{
    if ($.browser && $.browser.msie == true && parseInt($.browser.version, 10) <= 7)
		return false;

	/* Autocompletion de la ville en fonction du code postal */
	$('.autocompleteVille').UIautocomplete('destroy').UIautocomplete(
	{
	    //'autoFill' : true,
	    'autoFillCallback' : function(res, field)
	    {
		    $(res).each(function()
		    {
			    field.val(this.ville);
			    if (this.cp)
				    field.closest('table').find('.autocompleteCP').val(this.cp);
		    });
		    return false;
	    },
	    'source' : function(request, response)
	    {
		    $.ajax(
		    {
		        // 'url':
				// (typeof url_root != 'undefined' ? url_root : "" ) + "/global/ressources/ajax/autocomplete/ajax_autocomplete_villesEntreprise.php",
		        'url' : (typeof url_root != 'undefined' ? url_root : "" ) + "/global/ressources/ajax/autocomplete/ajax_autocomplete_villes.php",
		        'dataType' : "json",
		        'data' :
		        {
			        'term' : request.term,
		            'country' : $(this.element).closest('table').find('.select.pays').val()
		        },
		        'success' : function(data)
		        {
			        response(data);
		        }
		    });
	    },
	    'minLength' : 2,
	    'select' : function(event, ui)
	    {
		    if (ui.item.cp)
			    $(this).closest('table').find('.autocompleteCP').val(ui.item.cp);
	    },
	    'open' : function(event, ui)
	    {
            var acData = $(this).data('UIautocomplete');
            var currentValue = acData.term;
            var pattern = '(' + utils.escapeRegExChars(currentValue) + ')';
            
            $("ul.ui-autocomplete li a").each(function()
		    {
                var htmlString = $(this).html();//.replace(/&lt;/g, '<');
                htmlString = htmlString.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
                $(this).html(htmlString);
            });
            $("ul.ui-autocomplete").css({'height' : '170px', 'overflowY' : 'scroll', 'fontSize' : '11px'});
	    }
	});
}

function initEntreprise()
{
    if ($.browser && $.browser.msie == true && parseInt($.browser.version, 10) <= 7)
		return false;

    $('.autocompleteEntreprise').each(function() {
	var name = $(this).attr('name') + "_type";
	
	$(this).UIautocomplete('destroy').UIautocomplete(
	{
	    //'autoFill' : true,
	    'autoFillCallback' : function(res, field)
	    {
		    $(res).each(function()
		    {
			    field.val(this.c_nom);
		    });
		    return false;
	    },
	    'source' : function(request, response)
	    {
   	            var radio = $("[name="+name+"]:checked");
		    $.ajax(
		    {
		        'url' : (typeof url_root != 'undefined' ? url_root : "" ) + "/global/ressources/ajax/autocomplete/ajax_autocomplete_entreprises.php",
		        'dataType' : "json",
		        'data' :
		        {
			    'term' : request.term,
			    'type' : radio.val()
		        },
		        'success' : function(data)
		        {
			        response(data);
		        }
		    });
	    },
	    'minLength' : 2,
        'open' : function(event, ui)
	    {
            var acData = $(this).data('UIautocomplete');
            var currentValue = acData.term;
            var pattern = '(' + utils.escapeRegExChars(currentValue) + ')';

            $("ul.ui-autocomplete li a").each(function()
		    {
                var htmlString = $(this).html();//.replace(/&lt;/g, '<');
                htmlString = htmlString.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
                $(this).html(htmlString);
            });
            $("ul.ui-autocomplete").css({'height' : '170px', 'overflowY' : 'scroll', 'fontSize' : '11px'});
	    }
	});
    });
    
}

function initEntrepriseGroupe()
{
    if ($.browser && $.browser.msie == true && parseInt($.browser.version, 10) <= 7)
		return false;

    $('.autocompleteEntrepriseGroupe').each(function() {
	var name = $(this).attr('name') + "_type";
	
	$(this).UIautocomplete('destroy').UIautocomplete(
	{
	    //'autoFill' : true,
	    'autoFillCallback' : function(res, field)
	    {
		    $(res).each(function()
		    {
			    field.val(this.c_nom);
		    });
		    return false;
	    },
	    'source' : function(request, response)
	    {
   	            var radio = $("[name="+name+"]:checked");
		    $.ajax(
		    {
		        'url' : (typeof url_root != 'undefined' ? url_root : "" ) + "/global/ressources/ajax/autocomplete/ajax_autocomplete_entreprisesGroupe.php",
		        'dataType' : "json",
		        'data' :
		        {
			    'term' : request.term,
			    'type' : radio.val()
		        },
		        'success' : function(data)
		        {
			        response(data);
		        }
		    });
	    },
	    'minLength' : 2,
        'open' : function(event, ui)
	    {
            var acData = $(this).data('UIautocomplete');
            var currentValue = acData.term;
            var pattern = '(' + utils.escapeRegExChars(currentValue) + ')';

            $("ul.ui-autocomplete li a").each(function()
		    {
                var htmlString = $(this).html();//.replace(/&lt;/g, '<');
                htmlString = htmlString.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
                $(this).html(htmlString);
            });
            $("ul.ui-autocomplete").css({'height' : '170px', 'overflowY' : 'scroll', 'fontSize' : '11px'});
	    }
	});
    });
    
}

function initCNaf()
{
    
	if ($.browser && $.browser.msie == true && parseInt($.browser.version, 10) <= 7)
		return false;

	/* Autocompletion de la ville en fonction du code postal */
	$('.autocompleteCodeNaf').UIautocomplete('destroy').UIautocomplete(
	{
	    ////'autoFill' : true,
	    'autoFillCallback' : function(res, field)
	    {
		    $(res).each(function()
		    {
			    field.val(this.naf);
		    });
		    return false;
	    },
	    'source' : function(request, response)
	    {
		    $.ajax(
		    {
		        'url' : (typeof url_root != 'undefined' ? url_root : "" ) + "/global/ressources/ajax/autocomplete/ajax_autocomplete_cnaf.php",
		        'dataType' : "json",
		        'data' :
		        {
			        'term' : request.term
		        },
		        'success' : function(data)
		        {
			        response(data);
		        }
		    });
	    },
	    'minLength' : 2,
	    'select' : function(event, ui)
	    {
		    $(this).closest('table').find('.codenaf').val(ui.item.id);
	    },
	    'open' : function(event, ui)
	    {
            var acData = $(this).data('UIautocomplete');
            var currentValue = acData.term;
            var pattern = '(' + utils.escapeRegExChars(currentValue) + ')';
            
            $("ul.ui-autocomplete li a").each(function()
		    {
                var htmlString = $(this).html();//.replace(/&lt;/g, '<');
                htmlString = htmlString.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
                $(this).html(htmlString);
            });
            $("ul.ui-autocomplete").css({'height' : '170px', 'overflowY' : 'scroll', 'fontSize' : '11px'});
	    }
	});
}

function initVille()
{
    
	if ($.browser && $.browser.msie == true && parseInt($.browser.version, 10) <= 7)
		return false;

	/* Autocompletion de la ville en fonction du code postal */
	$('.autocompleteVilleEx').UIautocomplete('destroy').UIautocomplete(
	{
	    //'autoFill' : true,
	    'autoFillCallback' : function(res, field)
	    {
		    $(res).each(function()
		    {
			    field.val(this.ville);
		    });
		    return false;
	    },
	    'source' : function(request, response)
	    {
		    $.ajax(
		    {
		        'url' : (typeof url_root != 'undefined' ? url_root : "" ) + "/global/ressources/ajax/autocomplete/ajax_autocomplete_villes.php?"+($(this.element).hasClass('autocompleteFull') ? "full=1&country=all" : ""),
		        'dataType' : "json",
		        'data' :
		        {
			        'term' : request.term,
		            'country' : $(this.element).closest('table').find('.select.pays').val()
		        },
		        'success' : function(data)
		        {
			        response(data);
		        }
		    });
	    },
	    'minLength' : 2,
	    'open' : function(event, ui)
	    {
            var acData = $(this).data('UIautocomplete');
            var currentValue = acData.term;
            var pattern = '(' + utils.escapeRegExChars(currentValue) + ')';
            
            $("ul.ui-autocomplete li a").each(function()
		    {
                var htmlString = $(this).html();//.replace(/&lt;/g, '<');
                htmlString = htmlString.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
                $(this).html(htmlString);
            });
            $("ul.ui-autocomplete").css({'height' : '170px', 'overflowY' : 'scroll', 'fontSize' : '11px'});
	    }
	});
}

function initDiplome()
{
    
	if ($.browser && $.browser.msie == true && parseInt($.browser.version, 10) <= 7)
		return false;
		
	/* Autocompletion de la ville en fonction du code postal */
	$('.autocompleteDiplome').UIautocomplete('destroy').UIautocomplete(
	{
	    //'autoFill' : true,
	    'autoFillCallback' :
		    function(res, field)
		    {
			    $(res).each(function()
			    {
				    field.val(this.value);
				    field.parent().find('.autocompleteIDDiplome').val(this.id);
			    });
			    return false;
		    },
	    'source' :
		    function(request, response)
		    {
			    $.ajax(
			    {
			        'url' : (typeof url_root != 'undefined' ? url_root : "" ) + "/global/ressources/ajax/autocomplete/ajax_diplome.php",
			        'dataType' : "json",
			        'data' :
			        {
				        'term' : request.term
			        },
			        'success' : function(data)
			        {
				        response(data);
			        }
			    });
		    },
	    'minLength' : 2,
	    'select' :
		    function(event, ui)
		    {
			    $(this).parent().find('.autocompleteIDDiplome').val(ui.item.id);
		    },
	    'open' : 
            function(event, ui)
            {
                var acData = $(this).data('UIautocomplete');
                var currentValue = acData.term;
                var pattern = '(' + utils.escapeRegExChars(currentValue) + ')';

                $("ul.ui-autocomplete li a").each(function()
                {
                    var htmlString = $(this).html();//.replace(/&lt;/g, '<');
                    htmlString = htmlString.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
                    $(this).html(htmlString);
                });
                $("ul.ui-autocomplete").css({'height' : '170px', 'overflowY' : 'scroll', 'fontSize' : '11px'});
            }
	}).on('input',
		function ()
		{
			if (!$.trim($(this).val()).length)
				$(this).parent().find('.autocompleteIDDiplome').val('');
		}
	);
}

function initDiplomeEtablissement() {
    if ($.browser && $.browser.msie == true && parseInt($.browser.version, 10) <= 7)
		return false;

    $('.autocompleteDiplomeEtablissement').UIautocomplete('destroy').UIautocomplete({
        //'autoFill' : true,
        'autoFillCallback' : function(res, field) {
            $(res).each(function() {
                    field.val(this.poste);
            });
            return false;
        },
        'source': function(request, response) {
            $.ajax({
                    'url': (typeof url_root != 'undefined' ? url_root : "" ) + "/global/ressources/ajax/autocomplete/ajax_autocomplete_etablissements.php",
                    'dataType': "json",
                    'data': {
                            'term' : request.term
                    },
                    'success': function(data) {
                            response(data);
                    }
            });
        },
        'minLength': 2,
        'open' : 
            function(event, ui)
            {
                var acData = $(this).data('UIautocomplete');
                var currentValue = acData.term;
                var pattern = '(' + utils.escapeRegExChars(currentValue) + ')';

                $("ul.ui-autocomplete li a").each(function()
                {
                    var htmlString = $(this).html();//.replace(/&lt;/g, '<');
                    htmlString = htmlString.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
                    $(this).html(htmlString);
                });
                $("ul.ui-autocomplete").css({'height' : '170px', 'overflowY' : 'scroll', 'fontSize' : '11px'});
            }

    });
}


function initDiplomeFormation() {
    if ($.browser && $.browser.msie == true && parseInt($.browser.version, 10) <= 7)
		return false;

    $('.autocompleteDiplomeFormation').UIautocomplete('destroy').UIautocomplete({
        //'autoFill' : true,
        'autoFillCallback' : function(res, field) {
            $(res).each(function() {
                    field.val(this.poste);
            });
            return false;
        },
        'source': function(request, response) {
            $.ajax({
                    'url': (typeof url_root != 'undefined' ? url_root : "" ) + "/global/ressources/ajax/autocomplete/ajax_autocomplete_formations.php",
                    'dataType': "json",
                    'data': {
                            'term' : request.term
                    },
                    'success': function(data) {
                            response(data);
                    }
            });
        },
        'minLength': 2,
        'open' : 
            function(event, ui)
            {
                var acData = $(this).data('UIautocomplete');
                var currentValue = acData.term;
                var pattern = '(' + utils.escapeRegExChars(currentValue) + ')';

                $("ul.ui-autocomplete li a").each(function()
                {
                    var htmlString = $(this).html();//.replace(/&lt;/g, '<');
                    htmlString = htmlString.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
                    $(this).html(htmlString);
                });
                $("ul.ui-autocomplete").css({'height' : '170px', 'overflowY' : 'scroll', 'fontSize' : '11px'});
            }

    });
}

function initFonction()
{
    
	if ($.browser && $.browser.msie == true && parseInt($.browser.version, 10) <= 7)
		return false;

    $('.autocompleteFonction').UIautocomplete('destroy').UIautocomplete({
        //'autoFill' : true,
        'autoFillCallback' : function(res, field) {
            $(res).each(function() {
                    field.val(this.poste);
            });
            return false;
        },
        'source': function(request, response) {
            $.ajax({
                    'url': (typeof url_root != 'undefined' ? url_root : "" ) + "/global/ressources/ajax/autocomplete/ajax_autocomplete_poste.php",
                    'dataType': "json",
                    'data': {
                            'term' : request.term
                    },
                    'success': function(data) {
                            response(data);
                    }
            });
        },
        'minLength': 2,
        'open' : 
            function(event, ui)
            {
                var acData = $(this).data('UIautocomplete');
                var currentValue = acData.term;
                var pattern = '(' + utils.escapeRegExChars(currentValue) + ')';

                $("ul.ui-autocomplete li a").each(function()
                {
                    var htmlString = $(this).html();//.replace(/&lt;/g, '<');
                    htmlString = htmlString.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
                    $(this).html(htmlString);
                });
                $("ul.ui-autocomplete").css({'height' : '170px', 'overflowY' : 'scroll', 'fontSize' : '11px'});
            }

    });
}

function initSport()
{
    
	if ($.browser && $.browser.msie == true && parseInt($.browser.version, 10) <= 7)
		return false;

    /* Autocompletion de la ville en fonction du code postal */
    $('.autocompleteSport').UIautocomplete('destroy').UIautocomplete({
        //'autoFill' : true,
        'autoFillCallback' : function(res, field) {
            $(res).each(function() {
                    field.val(this.value);
            });
            return false;
        },
        'source': function(request, response) {
            $.ajax({
                    'url': (typeof url_root != 'undefined' ? url_root : "" ) + "/global/ressources/ajax/autocomplete/ajax_autocomplete_sports.php",
                    'dataType': "json",
                    'data': {
                            'term' : request.term
                    },
                    'success': function(data) {
                            response(data);
                    }
            });
        },
        'minLength': 2,
        'open' : 
            function(event, ui)
            {
                var acData = $(this).data('UIautocomplete');
                var currentValue = acData.term;
                var pattern = '(' + utils.escapeRegExChars(currentValue) + ')';

                $("ul.ui-autocomplete li a").each(function()
                {
                    var htmlString = $(this).html();//.replace(/&lt;/g, '<');
                    htmlString = htmlString.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
                    $(this).html(htmlString);
                });
                $("ul.ui-autocomplete").css({'height' : '170px', 'overflowY' : 'scroll', 'fontSize' : '11px'});
            }

    });
}

function initCompetence() {
    
    if ($.browser && $.browser.msie == true && parseInt($.browser.version, 10) <= 7)
		return false;

    /* Autocompletion de la ville en fonction du code postal */
    $('.autocompleteCompetence').UIautocomplete('destroy').UIautocomplete({
        //'autoFill' : true,
        'autoFillCallback' : function(res, field) {
            $(res).each(function() {
                    field.val(this.value);
            });
            return false;
        },
        'source': function(request, response) {
            $.ajax({
                    'url': (typeof url_root != 'undefined' ? url_root : "" ) + "/global/ressources/ajax/autocomplete/ajax_autocomplete_competences.php",
                    'dataType': "json",
                    'data': {
                            'term' : request.term
                    },
                    'success': function(data) {
                            response(data);
                    }
            });
        },
        'minLength': 2,
        'open' : 
            function(event, ui)
            {
                var acData = $(this).data('UIautocomplete');
                var currentValue = acData.term;
                var pattern = '(' + utils.escapeRegExChars(currentValue) + ')';

                $("ul.ui-autocomplete li a").each(function()
                {
                    var htmlString = $(this).html();//.replace(/&lt;/g, '<');
                    htmlString = htmlString.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
                    $(this).html(htmlString);
                });
                $("ul.ui-autocomplete").css({'height' : '170px', 'overflowY' : 'scroll', 'fontSize' : '11px'});
            }

    });
}

function initDecoration()
{
    
	if ($.browser && $.browser.msie == true && parseInt($.browser.version, 10) <= 7)
		return false;

    /* Autocompletion de la ville en fonction du code postal */
    $('.autocompleteDecoration').UIautocomplete('destroy').UIautocomplete({
        //'autoFill' : true,
        'autoFillCallback' : function(res, field) {
            $(res).each(function() {
                    field.val(this.value);
            });
            return false;
        },
        'source': function(request, response) {
            $.ajax({
                    'url': (typeof url_root != 'undefined' ? url_root : "" ) + "/global/ressources/ajax/autocomplete/decorations.php",
                    'dataType': "json",
                    'data': {
                            'term' : request.term
                    },
                    'success': function(data) {
                            response(data);
                    }
            });
        },
        'minLength': 2,
        'open' : 
            function(event, ui)
            {
                var acData = $(this).data('UIautocomplete');
                var currentValue = acData.term;
                var pattern = '(' + utils.escapeRegExChars(currentValue) + ')';

                $("ul.ui-autocomplete li a").each(function()
                {
                    var htmlString = $(this).html();//.replace(/&lt;/g, '<');
                    htmlString = htmlString.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
                    $(this).html(htmlString);
                });
                $("ul.ui-autocomplete").css({'height' : '170px', 'overflowY' : 'scroll', 'fontSize' : '11px'});
            }

    });
}


function initActivite()
{
    
	if ($.browser && $.browser.msie == true && parseInt($.browser.version, 10) <= 7)
		return false;

    /* Autocompletion de la ville en fonction du code postal */
    $('.autocompleteActivite').UIautocomplete('destroy').UIautocomplete({
        //'autoFill' : true,
        'autoFillCallback' : function(res, field) {
            $(res).each(function() {
                    field.val(this.value);
            });
            return false;
        },
        'source': function(request, response) {
            $.ajax({
                    'url': (typeof url_root != 'undefined' ? url_root : "" ) + "/global/ressources/ajax/autocomplete/ajax_autocomplete_activites.php",
                    'dataType': "json",
                    'data': {
                            'term' : request.term
                    },
                    'success': function(data) {
                            response(data);
                    }
            });
        },
        'minLength': 2,
        'open' : 
            function(event, ui)
            {
                var acData = $(this).data('UIautocomplete');
                var currentValue = acData.term;
                var pattern = '(' + utils.escapeRegExChars(currentValue) + ')';

                $("ul.ui-autocomplete li a").each(function()
                {
                    var htmlString = $(this).html();//.replace(/&lt;/g, '<');
                    htmlString = htmlString.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
                    $(this).html(htmlString);
                });
                $("ul.ui-autocomplete").css({'height' : '170px', 'overflowY' : 'scroll', 'fontSize' : '11px'});
            }

    });
}

function initCentreInteret()
{
     
	if ($.browser && $.browser.msie == true && parseInt($.browser.version, 10) <= 7)
		return false;

    /* Autocompletion de la ville en fonction du code postal */
    $('.autocompleteCentreInteret').UIautocomplete('destroy').UIautocomplete({
        //'autoFill' : true,
        'autoFillCallback' : function(res, field) {
            $(res).each(function() {
                    field.val(this.value);
            });
            return false;
        },
        'source': function(request, response) {
            $.ajax({
                    'url': (typeof url_root != 'undefined' ? url_root : "" ) + "/global/ressources/ajax/autocomplete/ajax_autocomplete_centres_dinterets.php",
                    'dataType': "json",
                    'data': {
                            'term' : request.term
                    },
                    'success': function(data) {
                            response(data);
                    }
            });
        },
        'minLength': 2,
         'open' : 
             function(event, ui)
            {
                var acData = $(this).data('UIautocomplete');
                var currentValue = acData.term;
                var pattern = '(' + utils.escapeRegExChars(currentValue) + ')';

                $("ul.ui-autocomplete li a").each(function()
                {
                    var htmlString = $(this).html();//.replace(/&lt;/g, '<');
                    htmlString = htmlString.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
                    $(this).html(htmlString);
                });
                $("ul.ui-autocomplete").css({'height' : '170px', 'overflowY' : 'scroll', 'fontSize' : '11px'});
            }

    });
}

function initNom()
{
     
	if ($.browser && $.browser.msie == true && parseInt($.browser.version, 10) <= 7)
		return false;

    /* Autocompletion de la ville en fonction du code postal */
    $('.autocompleteNom').UIautocomplete('destroy').UIautocomplete({
        //'autoFill' : true,
        'autoFillCallback' : function(res, field) {
            $(res).each(function() {
                    field.val(this.value);
            });
            return false;
        },
        'source': function(request, response) {
            $.ajax({
                    'url': (typeof url_root != 'undefined' ? url_root : "" ) + "/global/ressources/ajax/autocomplete/ajax_autocomplete_noms.php",
                    'dataType': "json",
                    'data': {
                            'term' : request.term
                    },
                    'success': function(data) {
                            response(data);
                    }
            });
        },
        'minLength': 2,
         'open' : 
             function(event, ui)
            {
                var acData = $(this).data('UIautocomplete');
                var currentValue = acData.term;
                var pattern = '(' + utils.escapeRegExChars(currentValue) + ')';

                $("ul.ui-autocomplete li a").each(function()
                {
                    var htmlString = $(this).html();//.replace(/&lt;/g, '<');
                    htmlString = htmlString.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
                    $(this).html(htmlString);
                });
                $("ul.ui-autocomplete").css({'height' : '170px', 'overflowY' : 'scroll', 'fontSize' : '11px'});
            }

    });
}

function initPersonne()
{
	if ($.browser && $.browser.msie == true && parseInt($.browser.version, 10) <= 7)
		return false;

	/* Autocompletion de la ville en fonction du code postal */
	$('.autocompletePersonne').UIautocomplete('destroy').UIautocomplete(
		{
			//'autoFill' : true,
			'autoFillCallback': function (res, field) {
				$(res).each(function () {
					field.val(this.value);
				});
				return false;
			},
			'source': function (request, response) {
				$.ajax({
						   'url': (typeof url_root != 'undefined' ? url_root : "" ) + "/global/ressources/ajax/autocomplete/ajax_autocomplete_personnes.php",
						   'dataType': "json",
						   'data': {
							   'term': request.term
						   },
						   'success': function (data) {
							   response(data);
						   }
					   });
			},
			'minLength': 2,
			'open':
				function (event, ui) {
					var acData = $(this).data('UIautocomplete');
					var currentValue = acData.term;
					var pattern = '(' + utils.escapeRegExChars(currentValue) + ')';

					$("ul.ui-autocomplete li a").each(function () {
						var htmlString = $(this).html();//.replace(/&lt;/g, '<');
						htmlString = htmlString.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
						$(this).html(htmlString);
					});
					$("ul.ui-autocomplete").css({'height': '170px', 'overflowY': 'scroll', 'fontSize': '11px'});
				},
			'select': function(event, ui) {
				var target_id = $(this).data('for');
				if (target_id)
					$('#'+target_id).val(ui.item.id);
			}
		});
}

function initVilleSimple()
{
     
	if ($.browser && $.browser.msie == true && parseInt($.browser.version, 10) <= 7)
		return false;

    /* Autocompletion de la ville en fonction du code postal */
    $('.autocompleteVilleSimple').UIautocomplete('destroy').UIautocomplete({
        //'autoFill' : true,
        'autoFillCallback' : function(res, field) {
            $(res).each(function() {
                    field.val(this.value);
            });
            return false;
        },
        'source': function(request, response) {
            $.ajax({
                    'url': (typeof url_root != 'undefined' ? url_root : "" ) + "/global/ressources/ajax/autocomplete/ajax_autocomplete_villes_simple.php",
                    'dataType': "json",
                    'data': {
                            'term' : request.term
                    },
                    'success': function(data) {
                            response(data);
                    }
            });
        },
        'minLength': 2,
         'open' : 
             function(event, ui)
            {
                var acData = $(this).data('UIautocomplete');
                var currentValue = acData.term;
                var pattern = '(' + utils.escapeRegExChars(currentValue) + ')';

                $("ul.ui-autocomplete li a").each(function()
                {
                    var htmlString = $(this).html();//.replace(/&lt;/g, '<');
                    htmlString = htmlString.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
                    $(this).html(htmlString);
                });
                $("ul.ui-autocomplete").css({'height' : '170px', 'overflowY' : 'scroll', 'fontSize' : '11px'});
            }

    });
}


/*
 * Complète le numéro de fixe et de mobile en fonction de l'indicatif du pays
 * choisi
 */
function ChangePaysPerso(item)
{
	$.get("/global/ressources/ajax/ajax_getTelPrefixByCountry.php",
	{
		'id_pays' : item.val()
	}, function(data)
	{
		item.closest('table').find('.indicatifTel').val(data);
	});
}

/*
 * Renvoi la longueur maximale du numéro de téléphone en vigueur dans le pays
 * sélectionné.
 */
function LoadLengthNum(item, entreprise)
{
	$.get("/global/ressources/ajax/ajax_loadLengthNum.php",
	{
		'id_pays' : item.val()
	}, function(data)
	{
		item.closest('table').find(".phoneNumber").attr('maxLength', data);

		if (data != '')
		{
			if (item.closest('table').find(".chiffre_perso").size())
				item.closest('table').find(".chiffre_perso").html(data);

			if (item.closest('table').find(".phrase_perso").size())
			{
				if (entreprise)
					item.closest('table').find(".phrase_perso").html(
					        'vous ne pouvez saisir que ' + data
					                + ' chiffres dans les champs "T&eacute;l. standard", "Fax standard"');
				else
					item.closest('table').find(".phrase_perso").html(
					        'vous ne pouvez saisir que ' + data
					                + ' chiffres dans les champs "t&eacute;l&eacute;phone", "mobile", "fax"');
			}

		}
		else
		{
			item.closest('table').find(".phrase_perso").html('Merci de renseigner votre pays');
		}
	});
}

function preg_replace(array_pattern, array_pattern_replace, my_string)
{
	var new_string = String(my_string);

	for (i = 0; i < array_pattern.length; i++)
	{
		var reg_exp = RegExp(array_pattern[i], "gi");
		var val_to_replace = typeof array_pattern_replace[i] != 'undefined' ? array_pattern_replace[i]
		        : (typeof array_pattern_replace == 'Array' ? array_pattern_replace[0] : array_pattern_replace);
		new_string = new_string.replace(reg_exp, val_to_replace);
	}

	return new_string;
}

function noAccentSpace(my_string)
{
	var new_string = my_string.replace(/[\ ()''",.:!?\/#@&+]+/g, '-');

	var pattern_accent = new Array(" ", "--", "\351", "\350", "	\352", "\353", "\347", "\340", "\342", "\344", "\356", "\357", "\371", "\364", "\363", "\366");
	var pattern_replace_accent = new Array("-", "-", "e", "e", "e", "e", "c", "a", "a", "a", "i", "i", "u", "o", "o", "o");

	if (new_string && new_string != "")
		new_string = preg_replace(pattern_accent, pattern_replace_accent, new_string);

	new_string = new_string.replace(/['']/g, '-');
	new_string = new_string.replace(/[^0-9a-zA-Z-]+/g, '');
	new_string = new_string.replace(/--+/g, '-');

	return new_string;
}

function noArticles(url, end_space)
{
	if (typeof end_space == 'undefined')
		end_space = false;

	var to_del = new Array('un', 'une', 'des', 'de', 'le', 'la', 'les', 'ce', 'ces', 'ne', 'se', 's', 'd', 'l', 'n', 'c', 'a', '\340');

	if (typeof url != 'undefined' && url && url != "")
	{
		for ( var i = 0; i < to_del.length; i++)
		{
			var pattern = new RegExp('^' + to_del[i] + '-', 'g');
			url = url.replace(pattern, '');

			pattern = new RegExp('-' + to_del[i] + '-', 'g');
			url = url.replace(pattern, '-');

			pattern = new RegExp('-' + to_del[i] + '$', 'g');
			url = url.replace(pattern, '-');

			pattern = new RegExp('^(-+)(.*?)$');
			url = url.replace(pattern, '$2');

			pattern = new RegExp('^(.*?)(-+)$');
			url = url.replace(pattern, '$1' + (end_space ? '-' : ''));

			pattern = new RegExp('^(.*?)(-{2,})(.*?)$');
			while (url.match(pattern))
				url = url.replace(pattern, '$1-$3');
		}
	}

	return url;
}

function setURLRewriting(elem)
{
	var url = noAccentSpace(elem.val().toLowerCase());

	url = noArticles(url, elem[0] === $('#url_rewriting')[0] ? true : false);

	$('#url_rewriting').val(url);
}

function verifURLRewriting(type, id, display_alert)
{
	var url = $('#url_rewriting').val();

	var ok = true;
	$.ajax(
	{
	    url : (typeof url_root != 'undefined' ? url_root : "" ) + "/global/ressources/ajax/ajax_verifUrlRewriting.php",
	    type : 'POST',
	    async : false,
	    data :
	    {
	        'type' : (typeof type != 'undefined' ? type : ''),
	        'url' : url,
	        'id' : (typeof id != 'undefined' ? id : '')
	    },
	    success : function(data)
	    {
		    if (data == 'no')
		    {
			    if (display_alert)
				    alert("L'url de redirection existe d\351j\340 pour un lien. veuillez la changer");

			    $('#url_rewriting_error').show();

			    $('#url_rewriting').removeClass('in_ok').addClass('in_error');
			    $('#url_rewriting').focus();

			    ok = false;
		    }
		    else
		    {
			    $('#url_rewriting').removeClass('in_error').addClass('in_ok');
			    $('#url_rewriting_error').hide();
			    ok = true;
		    }
	    }
	});

	return ok;
}

function make_calendar()
{
	if($('.datepicker').length)
	$('.datepicker').datepicker(
			{
				showOn: 'button', 
				buttonImage: (typeof url_root != 'undefined' ? url_root : "" ) + '/global/images/calendar.gif', 
				buttonImageOnly: true, 
				dateFormat : 'dd/mm/yy',
				numberOfMonths: 3,
				showButtonPanel: true
			}
		);


    if($('.datepicker_naissance').length)
        $('.datepicker_naissance').datepicker(
            {
                changeMonth: true,
                changeYear: true,
                showOn: 'button', 
                buttonImage: (typeof url_root != 'undefined' ? url_root : "" ) + '/global/images/calendar.gif', 
                buttonImageOnly: true, 
                dateFormat : 'dd/mm/yy',
                yearRange: "-100:-15",
                showButtonPanel: true
            }
        );
        
    if($('.datepicker_histo_debut').length)
        $('.datepicker_histo_debut').datepicker(
                {
                    showOn: 'button', 
                    buttonImage: (typeof url_root != 'undefined' ? url_root : "" ) + '/global/images/calendar.gif', 
                    buttonImageOnly: true, 
                    dateFormat : 'dd/mm/yy',
                    numberOfMonths: 3,
                    showButtonPanel: true,
                    maxDate : '+0m +0w',
                    onSelect: function(selected) {
                        $(".datepicker_histo_fin").datepicker("option","minDate", selected)
                    }
                }
            );

    if($('.datepicker_histo_fin').length)
        $('.datepicker_histo_fin').datepicker(
                {
                    showOn: 'button', 
                    buttonImage: (typeof url_root != 'undefined' ? url_root : "" ) + '/global/images/calendar.gif', 
                    buttonImageOnly: true, 
                    dateFormat : 'dd/mm/yy',
                    numberOfMonths: 3,
                    showButtonPanel: true,
                    onSelect: function(selected) {
                        $(".datepicker_histo_debut").datepicker("option","maxDate", selected)
                    }
                }
            );
}

var utils = (function () {
    return {
        escapeRegExChars: function (value) {
            return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        }
    };
}());

$(document).ready(function ()
{
	initAjoutItem();
	initUIAutocomplete();

	if ($.browser && !($.browser.msie == true && (parseInt($.browser.version, 10) == 6 || parseInt($.browser.version, 10) == 7)))
		initTimeAgo();

	initFancyLink();

	if ($.fn.UIautocomplete)
	{
    	initCodePostal();
		initEntreprise();
		initEntrepriseGroupe();
		initVilleEntreprise();
		initVille();
		initCNaf();
		initFonction();
		initSport();
		initCentreInteret();
        initActivite();
        initDecoration();
        initCompetence();
        initNom();
        initPersonne();
        initVilleSimple();
        initDiplomeEtablissement();
        initDiplomeFormation();

		var isChromium = window.chrome;
		var winNav = window.navigator;
		var vendorName = winNav.vendor;
		var isOpera = typeof window.opr !== "undefined";
		var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
		var isIOSChrome = winNav.userAgent.match("CriOS");

		if (isIOSChrome)
		{
			$('.ui-autocomplete-input').attr('autocomplete', 'no');
		}
		else if (
			isChromium !== null &&
			typeof isChromium !== "undefined" &&
			vendorName === "Google Inc." &&
			isOpera === false &&
			isIEedge === false
		)
		{
			$('.ui-autocomplete-input').attr('autocomplete', 'no');
		}
		else
		{
			// not Google Chrome
		}
	}

	make_calendar();

    $("input.integer").on({
        'change':function() {
            this.value=this.value.replace(/[^0-9]/g,'');
        },
        'input':function() {
            this.value=this.value.replace(/[^0-9]/g,'');
        }
    });

    // Pour afficher une alerte si on quitte la page alors qu'il y a des modifications
    $('form.alert-before-leaving input, form.alert-before-leaving select:not([multiple]), form.alert-before-leaving textarea').one('change input',
			function (event, params)
			{
				if ((typeof params === 'undefined' || !params['no-alert']))
				{
					addAlertBeforeLeaving();
				}
			});
    $('form.alert-before-leaving select[multiple]').addClass('alert-before-leaving');

	// Pour ne plus afficher d'alerte si on valide
	$('form.alert-before-leaving .no-alert-before-Leaving').click(function (e) { removeAlertBeforeLeaving(); }).end()
		.submit(function () { removeAlertBeforeLeaving(); });

	// set juste la variable globale formModified a true s'il y a une modif dans le form. On peut tester ensuite cette variable dans du code JS specifique
	$('form.register-modify input, form.register-modify select:not([multiple]), form.register-modify textarea').one('change input',
		   function (event, params)
		   {
			   setFormModified();
		   });
	$('form.register-modify select[multiple]').addClass('register-modify');

});

var formModified = false;
function setFormModified()
{
	formModified = true;
}

function unsetFormModified()
{
	formModified = false;
}

var alertBinded = false;
function addAlertBeforeLeaving()
{

	if (!alertBinded)
	{
		alertBinded = true;
		$(window).bind('beforeunload', function () {
			// La phrase ici ne sert a rien, ce n'est pas elle qui est affichée
			return 'Vous avez des modifications en cours. Êtes-vous sûr(e) de vouloir quitter cette page ?';
		});
	}
}

function removeAlertBeforeLeaving()
{
	if (alertBinded)
	{
		alertBinded = false;
		$(window).unbind('beforeunload');
	}
}

/******************
 * Fonctionnalités Module Emailing 
 *****************/
function setEnvoiMail(ele, id_mailing) {
    
    var element = ele.closest('td');
    var statut_envoi = element.find('input').val();
    element.find('img').attr({'src' : (typeof url_root != 'undefined' ? url_root : "" ) + "/global/images/ajax-loader.gif"});
    $('#notificationStatutEnvoi').html('<center><img src="/global/images/ajax-loader.gif" /></center>');

    $.ajax(
        {
            url: (typeof url_root != 'undefined' ? url_root : "" ) + '/global/ressources/ajax/mailing/ajax_set_statut_envoi.php',
            type: 'POST',
            async: true,
            data :
            {
                'id_mailing' : (typeof id_mailing != 'undefined' ? id_mailing : ''),
                'statut_envoi' : (typeof statut_envoi != 'undefined' ? statut_envoi : '')
            },
            success : 
                function (data) 
                {
                    if (data)
                    {
                        $('#notificationStatutEnvoi').html(data).show()/*.delay(5000).slideUp('fast', function() {})*/;
                        if(statut_envoi == 2 )
                        {
                            element.find('img').attr({'src' : (typeof url_root != 'undefined' ? url_root : "" ) + '/global/images/media-pause.png', 'title' : polyglot.t('admin.stop_sending_mail')});
                            element.find('input').val('3');
                        }
                        else
                        {
                            element.find('img').attr({'src' : (typeof url_root != 'undefined' ? url_root : "" ) + '/global/images/play_vert.png', 'title' : polyglot.t('admin.resend_email')});
                            element.find('input').val('2');
                        }
                    }
                    else
                    {
                        $('#notificationStatutEnvoi').html(polyglot.t('admin.an_error_occurred_while_editing._if_problem_persist'));
                    }
                }
        }
    );
}
/******************
 * Fin Fonctionnalités Module Emailing 
 *****************/

function alertSwal(title, type, txt, confirmButtonColor) {

    if(typeof swal  ==  'function' ) {
    	if (typeof confirmButtonColor == 'undefined')
            confirmButtonColor = '#888888';

        swal(
            {
                title: title,
                text: txt,
                confirmButtonColor: confirmButtonColor,
                html: true,
                type: typeof type != 'undefined' ? type : ''
            }
        );
    } else {
        if( txt && typeof txt !== 'undefined') 
            return alert(txt);
        else if (!txt && title)
    		return alert(title);
    }
}

function confirmSwal(title, callback, txt, type, closeOnConfirm, showCancelButton, confirmButtonColor, confirmButtonText, cancelButtonText, showConfirmButton = true)
{
    if (typeof title == 'undefined' || !title)
            title = '';

    if (typeof closeOnConfirm == 'undefined')
            closeOnConfirm = true;
        
    if (typeof showCancelButton == 'undefined')
            showCancelButton = true;

    if (typeof cancelButtonColor == 'undefined')
            cancelButtonColor = '#C1C1C1';
        
    if (typeof confirmButtonColor == 'undefined')
            confirmButtonColor = '#888888';

    if (typeof confirmButtonText == 'undefined')
            confirmButtonText = "Ok";

    if (typeof swal == 'function')
    {
		var cancel = cancelButtonText;

		if (typeof cancelButtonText == 'undefined')
		{
            polyglot.t("core.cancel");
		}
        
        swal(
            {
                title: title,
                text: txt,
                html:true,
                type: typeof type != 'undefined' ? type : '',
                showCancelButton: showCancelButton,
                cancelButtonText: cancel,
                cancelButtonColor: cancelButtonColor,
                confirmButtonText: confirmButtonText,
                confirmButtonColor: confirmButtonColor,
                closeOnConfirm: closeOnConfirm,
				showConfirmButton: showConfirmButton
            },
            function (isConfirm)
            {
                if (isConfirm)
                    callback(isConfirm);
            }
        );
    }
    else
    {
        if (typeof title == 'undefined' || !title)
            title = txt;
        if (confirm(title))
            return callback();
    }
}

function NA_check_log(etape) 
{
	var formu = $('form[name="formulaire_login' + etape + '"]:visible');
	
	if (formu.size() == 0)
		return false;
	
	if (formu.find('input[name="login_s"]').val() == "")
	{
		if ( typeof msg_error_login != 'undefined' ) {
			var msg_alert = msg_error_login;
		} else {
			var msg_alert = polyglot.t("event.subscribe.please_enter_your_login");
		}
        alertSwal(msg_alert);
            
		formu.find('input[name="login_s"]').focus();
		return false;
	}
	else if (formu.find('input[name="pswd_s"]').val() == "")
	{
        alertSwal("Merci d'indiquer votre mot de passe !");

		formu.find('input[name="pswd_s"]').focus();
		return false;
	}
	else
	{
		var password = formu.find('input[name="pswd_s"]').val();
        
        if ($("#password_no_md5").val() != 1)
            password = md5(password);

		formu.find('input[name="password_c"]').val(password);
		formu.find('input[name="pswd_s"]').val("");

		var ret = true;
		
		if (formu.find('input[name="login_sites[]"]').size())
		{
			var nb_log = 0;
            var login  = formu.find('input[name="login_s"]').val();
            var passwd = formu.find('input[name="password_c"]').val();
			var setcookie = formu.find('input[name="setcookie"]:checked').size() ? 'true' : 0;
            var time = Math.floor(new Date().getTime() / 1000);

            formu.append( "<input type='hidden' name='cookie_connect' value='"+time+"'>" );

            $.ajax({
                type: "POST",
                url: (typeof url_root != 'undefined' ? url_root : "" ) + '/global/module/core/ressources/ajax/ajax_verif_connexion.php',
                data:
					{
						'login_s': login,
						'password_c': passwd,
						'setcookie': setcookie
					},
                success: function(retur) {

                    if (retur=='ok') {

                        formu.find('input[name="login_sites[]"]').each(
                            function ()
                            {
                                if (!$(this).hasClass('redirect'))
                                {
                                    _this = $(this);

									crossDomainAjax('POST', $(this).val(), formu.serialize() + '&from_ajax=1&cookie_connect=' + time,
													null,
													function (data)
													{
														nb_log++;

														console.log('complete ' + nb_log + ' / ' + formu.find('input[name="login_sites[]"]:not(.redirect)').size());


														if (nb_log == formu.find('input[name="login_sites[]"]:not(.redirect)').length)
														{
															// le submit de form en JS ne fonctionne pas sur FF (mm si on fait un undoLoader() sur formu.find('.connection-submit'))
															// formu.attr('action', formu.find('input[name="login_sites[]"].redirect').val());
															// formu.submit();

															// on a juste besoin de faire un reload car on est deja connecté via le ajax_verif_connexion.php
															location.reload();
														}
													}
									);
                                }
                            }
                        );

					}
					else
					{
						if (formu.find('.connection-submit').size())
							undoLoader(formu.find('.connection-submit'));
						alertSwal(retur);
					}
                }
            });
			
			return false;
		}

		if (formu.find('.connection-submit').size())
            setTimeout(function(){
                makeLoader(formu.find('.connection-submit'));
            }, 100);

		return formu.submit();
	}
}


function animOngletAccueil(elem, elem_bis)
{
	if( typeof elem_bis == 'undefined')
		elem_bis = 'titreRubriqueAccueilEP';

	$("."+elem).find("." + elem_bis).click ( function()
	 {
		 if($(this).siblings('div').is(":hidden"))
		 {
			 $(this).siblings('div').slideDown();
			 $(this).find('span').removeClass('ui-icon-triangle-1-e');
			 $(this).find('span').addClass('ui-icon-triangle-1-s');
		 }
		 else
		 {
			 $(this).siblings('div').slideUp();
			 $(this).find('span').removeClass('ui-icon-triangle-1-s');
			 $(this).find('span').addClass('ui-icon-triangle-1-e');
		 }
	 });
}


function supprime_modele_mail(id)
{
	if (id != undefined)
	{
		$.post('/global/ressources/ajax/mailing/supprimeModele.php', { 'id': id },
			function (data)
			{
				if (data)
				{
					$('select#mail_content option').each(
						function ()
						{
							if ($(this).val() == id)
							{
								$(this).remove();
								return;
							}
						}
					);
				}
			}
		);
	}
}

function selectUniqueCheckBox(elem, all)
{	
	if (elem.attr('checked'))
	{
		all.attr('checked', false);
		elem.attr('checked', true);
	}
}

/***************************
* code jquery 
***************************/
if (window.jQuery) {
	$( function() {
        var isPhone = false ;
        if( $.browser ) {
            $.browser.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
            var isPhone = $.browser.device ;
        }

		/************** Menus Mobile ******************/
		//if(isPhone){
			if ($("#compactNavigation").length) {
				$("#compactNavigation ").click(
					function(){
						if($("#compactNavigation>ul").is(':visible')){
							$("#compactNavigation ul").css('display','none');
						} else {
							$("#compactNavigation ul").css('display','block');	
						}
					} 
				);

			};
		//}
		/**************  fin block Menu mobile **********/ 
	});
}


/* UTILITIES */

/* permet un debugg js dans la console olu alert */
function var_dump(obj , toalert) {
	var out = '';
	for (var i in obj) {
		out += i + ": " + obj[i] + "\n";
	}

	if(toalert)
		alert(out);
	else 
		console.log(out);

	var pre = document.createElement('pre');
	pre.innerHTML = out;
	document.body.appendChild(pre)
}



/*****
* Visualisation des contenu saisis en admin (mailings, actu ...)
******/
function NA_visualisation(type, contenu, largeur, asso) 
{
	switch (type)
	{
		case "mailing" :
			if (typeof largeur == 'undefined')
				largeur = 700;

			var param = "type=mailing";

			if ($('#groupe_mailing').val())
				param += "&groupe_mailing=" + $('#groupe_mailing').val();

			if ($('#s_sujet').val())
				param += "&sujet=" + $('#s_sujet').val();

			var template = 0;
			if ($('input[type="radio"][name="template_mail"]').size())
				template = $('input[type="radio"][name="template_mail"]:checked').val();
			else
				template = $('input[type="hidden"][name="template_mail"]').val();


			if (typeof template != 'undefined' && template > 0)
				param += "&template=" + template;

			if (asso != undefined)
				param += "&asso=" + asso;

			param += "&contenu=" + encodeURIComponent(contenu);

			afficheCalque("/global/gene/NA_visualisation.php", "", param, largeur);
			break;
	}
}

function closeFancy() {
    if(typeof $.fancybox != "undefined" )
        window.parent.$.fancybox.close();
	window.close();
}

function makeLoader(elem)
{
    elem.each(
        function ()
        {
            $(this).addClass('uiLoader').data('html', $(this).html()).empty().html('<i class="fas fa-spinner fa-spin fa-3x fa-fw"></i>');
        }
    )
}

function undoLoader(elem, html)
{
    elem.each(
        function ()
        {
			if (elem.hasClass('uiLoader'))
			{
				var data = html == undefined || html === false ? elem.data('html') : html;
				elem.removeClass('uiLoader').empty().html(data);
			}
        }
    )
}

function readmore(ele, tag) {
    
    var ellipsestext = "...";
    var moretext = "Lire la suite";
    var lesstext = "R\351duire";

    ele.each(function() {

        var content = $(this).html();
        var showChar = content.indexOf(tag);
        if( content.length > showChar && showChar > 0)  {
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);

            var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span style="display: none">' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink" style="display: block;">' + moretext + '</a></span>';

            $(this).html(html);
        }

    });

    ele.find(".morelink").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        
        return false;
    });
}


function readmore2( options ) {
    var animspeed = 500; // animation speed in milliseconds
    var elem = options.elem;
    var $readmore = $('.' + elem);
    
    var height = $readmore.height() + 30;
    var mini = options.min; // $('.' + elem + ' p').eq(0).height() + $('.' + elem + ' p').eq(1).height() + $('.' + elem + ' p').eq(2).height();
	/*if( options.min <= 4)
	{
		mini = height * (options.min/4);
	}*/

    if( height >  mini )
        $( '<a class="expand">'+options.more+'</a><a class="contract hide">'+options.less+'</a>' ).insertAfter( '.' + elem );
    else 
        mini = height;
    
    $readmore.attr('data-fullheight',height+'px');
    $readmore.attr('data-miniheight',mini+'px');
    $readmore.css('height',mini+'px');
    $readmore.css('overflow','hidden');

    $('.expand').on('click', function(e){
        $text = $(this).prev();
        $text.animate({
          'height': $text.attr('data-fullheight')
        }, animspeed);
        $(this).next('.contract').removeClass('hide');
        $(this).addClass('hide');
    });

    $('.contract').on('click', function(e){
        $text = $(this).prev().prev();

        $text.animate({
          'height': $text.attr('data-miniheight')
        }, animspeed);
        $(this).prev('.expand').removeClass('hide');
        $(this).addClass('hide');
    });
}

function initStdAutoComplete(defaultPlaceholder, context) {
	if (typeof _NASelect2 !== 'undefined')
		_NASelect2.InitAutoComplete(context);
	else if (typeof $('select').select2 === 'function')
		$('select').select2();
}

function iniTelInput(initial = 'fr') {
	$('.telInput').each(function() {
		$(this).intlTelInput(
			{
				autoHideDialCode: true,
				autoPlaceholder: true,
				separateDialCode: true,
				nationalMode: true,
				placeholderNumberType: $(this).data('isfix') ? "FIXED_LINE" : "MOBILE",
				formatOnDisplay : true,
				initialCountry : initial,
				preferredCountries : ['fr'],
				utilsScript: (typeof url_root != 'undefined' ? url_root : "" ) + "/global/vendorExt/jackocnr/intl-tel-input/build/js/utils.js" // just for formatting/placeholders etc
			}
		)
	})

	$('.telInput').on('input', function ()
	{
		$(this).intlTelInput('setNumber', $(this).val());
	});

	$('.telInput').each(function ()
	{
		if(!$(this).closest('table').find('.select.pays').val() && !$(this).val())
			$(this).intlTelInput('setCountry', $(this).data('init-country') ? $(this).data('init-country') : 'fr');
	});
}
function initSimpleSearch(selector) { 
	if (typeof _NASelect2 !== 'undefined') {
		_NASelect2.InitSimpleSearch(selector);
		_NASelect2.InitAutoComplete(selector);
	}
	else if (typeof $('select').select2 === 'function')
		$('select').select2();

	if (typeof $.prototype != 'undefined' && typeof $.prototype.select2 != 'undefined') {
		$(selector).find('select.simple-search').each(function() {
			if (!this.classList.contains('simple-search-initialized')) {
				var placeHolder = $(this).data('placeholder');
				let parent = this.closest('.modal.fade.in') ? this.parentElement : '';
				   $(this).select2({ 
						width: 'resolve',
						placeholder: placeHolder != undefined ? placeHolder : '',
						allowClear: true,
						dropdownParent: parent
				});
				this.classList.add('simple-search-initialized');
			}
	    });
	}
}
// function initSimpleSearch(selector) {
// }

$( function(){
	$('.fancyForgotPass').each(function() {
		var link = $(this);
        
		link.fancybox({
						  autoDimensions: false,
						  width: ((($(window).width()/2) < 800)?(($(window).width() < 800)?$(window).width():800):($(window).width()/2)),
						  height: ((($(window).height()/2) < 500)?(($(window).height() < 500)?$(window).height():500):($(window).height()/2)),
						  type: 'iframe',
						  title: link.attr('title'),
						  hideOnOverlayClick : true
					  });
	});
	$('.fancyForgotFirstConnexion').each(function() {
		var link = $(this);

		link.fancybox({
						  autoDimensions: false,
						  width: ((($(window).width()/2) < 800)?(($(window).width() < 800)?$(window).width():800):($(window).width()/2)),
						  height: ((($(window).height()/2) < 500)?(($(window).height() < 500)?$(window).height():500):($(window).height()/2)),
						  title: link.attr('title'),
						  hideOnOverlayClick : true
					  });
	});

	$('.fancyForgotPhotoUser').each(function() {
		var link = $(this);
		link.fancybox({
						  autoDimensions: true,
						  width: $(window).width() - 150,
						  height: $(window).height() - 150,
						  type: 'iframe',
						  title: link.attr('title'),
						  hideOnOverlayClick : true
					  });
	});
	$('.fancyAgenda').each(function() {
		var link = $(this);
		link.fancybox({
						  autoDimensions: true,
						  width: $(window).width() - 150,
						  height: $(window).height() - 150,
						  type: 'iframe',
						  title: link.attr('title'),
						  hideOnOverlayClick : true
					  });
	});

	/* LOADER , ceci ajoute les 3 spans necessaires au nouveau loader */
	makeLoader($('.uiLoader'));

	/* popup debug container ( global debugOn / Off ) */
	if($('#pqp-container').length){
		$('#pqp-container').dialog({ minWidth: 1010, minHeight: 300, position: 'center'});
	}

    let scriptCheck = setInterval( () => {
        if (polyglot) {
            clearInterval(scriptCheck);
	        initStdAutoComplete(polyglot.t("core.select_value"));                        
        }
    }, 200);
    

    initSimpleSearch(document);
    
    $(".btn_historique_doc").click( function() {
        $(".zoneHistoriqueDoc").slideUp();
        $(this).siblings(".zoneHistoriqueDoc").slideDown();
    });
    $(".annulerHistoriqueDoc").click( function() {
        $(this).closest(".zoneHistoriqueDoc").slideUp();
    });

	$("input.numeric").keyup(
		function ()
		{
			var pattern = new RegExp(/^[0-9.,]*$/);
			while (!pattern.test($(this).val()))
				$(this).val($(this).val().substring(0, $(this).val().length - 1));

		});
        
        
    var input_mail = $('.verif-mail-syntax');

    if (input_mail.length)
    {
        var mail_xhr = new AjaxHelper(
            {
                url: (typeof url_root != 'undefined' ? url_root : "" ) + "/global/ressources/ajax/testMail.php",
                type: 'POST',
                async: true,
                dataType: 'json'
            }
        );

        input_mail.eventTimeout(
            {
                callback :
                    function (elem)
                    {
                        elem.removeClass('in_wait in_ok in_error verif-mail');

                        if (elem.val() == "")
                            return true;

                        elem.removeClass('in_ok in_error').addClass("in_wait");

                        mail_xhr.send({'mail' : elem.val()}, true,
                            function (data)
                            {
                                elem.removeClass('in_wait');

                                if (data.result)
                                    elem.addClass("in_ok");
                                else
                                    elem.addClass("in_error verif-mail");
                            }
                        );
                    }
            }
        );

        if (input_mail.val())
            input_mail.eventTimeout('trigger');
    }

	// commenté car faisait une erreur js sur la nouvelle charte
	/*
    $( '.header-navigation > .nav-wrapper > .nav > ul >  li.menuli').on( 'mouseleave touchend', function() {

       $(this + "> .nav-dropdown").toggle();
    });
    */
});

// Pour que ça existe même sur ancien admin / front
function addDatePickerGroupAddon() {

}


function owner_changed(el, alertOnValid)
{
	el = $(el);

	el.removeClass('in_wait in_ok in_error');

	if (el.val() == "")
		return true;

	el.removeClass('in_ok in_error').addClass("in_wait");

	$.get('/global/ressources/ajax/testMail.php',
		  { 'mail': el.val() },
		  function (data)
		  {
			  el.removeClass('in_wait verif-mail');

			  if (data.result)
				  el.addClass("in_ok");
			  else
				  el.addClass("in_error" + (typeof alertOnValid != 'undefined' && alertOnValid ? ' verif-mail' : ''));
		  },
		  'json'
	);
	return true;
}

function geoloc(address, id_adresse) {
    
    if( address && typeof address != 'undefined') {
        
        var img = $('#addr_'+id_adresse).closest('td').find('img').attr('src');
        
        $('#addr_'+id_adresse).closest('td').find('img').attr('src', (typeof url_root != 'undefined' ? url_root : "" ) + '/global/images/ajax-loader.gif');

        $.get("https://nominatim.openstreetmap.org/search.php?format=json&q=" + address,{},
			function(data)
		  	{
		  		if (typeof data[0] != 'undefined') {
					var lat = data[0].lat;
					var lng = data[0].lon;

					$.post('/global/ressources/ajax/geoloc.php', { 'id_adresse': id_adresse, 'lat' : lat, 'lng' : lng },
						   function(data) {
							   $this = $('#addr_'+id_adresse);
							   $this.closest('td').find('img').attr('src', (typeof url_root != 'undefined' ? url_root : "" ) + '/global/images/geoloc_1.png');
							   $('.addr-'+id_adresse).smallipop('show');
							   $('.addr-'+id_adresse).smallipop('update', $('.na-tooltip-content-temp-'+id_adresse).html());
						   }
					);

				} else {
					$('#addr_'+id_adresse).closest('td').find('img').attr('src', img);
					alert("Géolocalisation n'a pas réussi");
				}

		  	});
    }
}

function get_html_translation_table (table, quote_style) {
    // Returns the internal translation table used by htmlspecialchars and mb_htmlentities
    //
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/get_html_translation_table
    // +   original by: Philip Peterson
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: noname
    // +   bugfixed by: Alex
    // +   bugfixed by: Marco
    // +   bugfixed by: madipta
    // +   improved by: KELAN
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Frank Forte
    // +   bugfixed by: T.Wild
    // +      input by: Ratheous
    // %          note: It has been decided that we're not going to add global
    // %          note: dependencies to php.js, meaning the constants are not
    // %          note: real constants, but strings instead. Integers are also supported if someone
    // %          note: chooses to create the constants themselves.
    // *     example 1: get_html_translation_table('HTML_SPECIALCHARS');
    // *     returns 1: {'"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}
    var entities = {},
        hash_map = {},
        decimal;
    var constMappingTable = {},
        constMappingQuoteStyle = {};
    var useTable = {},
        useQuoteStyle = {};

    // Translate arguments
    constMappingTable[0] = 'HTML_SPECIALCHARS';
    constMappingTable[1] = 'HTML_ENTITIES';
    constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
    constMappingQuoteStyle[2] = 'ENT_COMPAT';
    constMappingQuoteStyle[3] = 'ENT_QUOTES';

    useTable = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
    useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT';

    if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
        throw new Error("Table: " + useTable + ' not supported');
        // return false;
    }

    entities['38'] = '&amp;';
    if (useTable === 'HTML_ENTITIES') {
        entities['160'] = '&nbsp;';
        entities['161'] = '&iexcl;';
        entities['162'] = '&cent;';
        entities['163'] = '&pound;';
        entities['164'] = '&curren;';
        entities['165'] = '&yen;';
        entities['166'] = '&brvbar;';
        entities['167'] = '&sect;';
        entities['168'] = '&uml;';
        entities['169'] = '&copy;';
        entities['170'] = '&ordf;';
        entities['171'] = '&laquo;';
        entities['172'] = '&not;';
        entities['173'] = '&shy;';
        entities['174'] = '&reg;';
        entities['175'] = '&macr;';
        entities['176'] = '&deg;';
        entities['177'] = '&plusmn;';
        entities['178'] = '&sup2;';
        entities['179'] = '&sup3;';
        entities['180'] = '&acute;';
        entities['181'] = '&micro;';
        entities['182'] = '&para;';
        entities['183'] = '&middot;';
        entities['184'] = '&cedil;';
        entities['185'] = '&sup1;';
        entities['186'] = '&ordm;';
        entities['187'] = '&raquo;';
        entities['188'] = '&frac14;';
        entities['189'] = '&frac12;';
        entities['190'] = '&frac34;';
        entities['191'] = '&iquest;';
        entities['192'] = '&Agrave;';
        entities['193'] = '&Aacute;';
        entities['194'] = '&Acirc;';
        entities['195'] = '&Atilde;';
        entities['196'] = '&Auml;';
        entities['197'] = '&Aring;';
        entities['198'] = '&AElig;';
        entities['199'] = '&Ccedil;';
        entities['200'] = '&Egrave;';
        entities['201'] = '&Eacute;';
        entities['202'] = '&Ecirc;';
        entities['203'] = '&Euml;';
        entities['204'] = '&Igrave;';
        entities['205'] = '&Iacute;';
        entities['206'] = '&Icirc;';
        entities['207'] = '&Iuml;';
        entities['208'] = '&ETH;';
        entities['209'] = '&Ntilde;';
        entities['210'] = '&Ograve;';
        entities['211'] = '&Oacute;';
        entities['212'] = '&Ocirc;';
        entities['213'] = '&Otilde;';
        entities['214'] = '&Ouml;';
        entities['215'] = '&times;';
        entities['216'] = '&Oslash;';
        entities['217'] = '&Ugrave;';
        entities['218'] = '&Uacute;';
        entities['219'] = '&Ucirc;';
        entities['220'] = '&Uuml;';
        entities['221'] = '&Yacute;';
        entities['222'] = '&THORN;';
        entities['223'] = '&szlig;';
        entities['224'] = '&agrave;';
        entities['225'] = '&aacute;';
        entities['226'] = '&acirc;';
        entities['227'] = '&atilde;';
        entities['228'] = '&auml;';
        entities['229'] = '&aring;';
        entities['230'] = '&aelig;';
        entities['231'] = '&ccedil;';
        entities['232'] = '&egrave;';
        entities['233'] = '&eacute;';
        entities['234'] = '&ecirc;';
        entities['235'] = '&euml;';
        entities['236'] = '&igrave;';
        entities['237'] = '&iacute;';
        entities['238'] = '&icirc;';
        entities['239'] = '&iuml;';
        entities['240'] = '&eth;';
        entities['241'] = '&ntilde;';
        entities['242'] = '&ograve;';
        entities['243'] = '&oacute;';
        entities['244'] = '&ocirc;';
        entities['245'] = '&otilde;';
        entities['246'] = '&ouml;';
        entities['247'] = '&divide;';
        entities['248'] = '&oslash;';
        entities['249'] = '&ugrave;';
        entities['250'] = '&uacute;';
        entities['251'] = '&ucirc;';
        entities['252'] = '&uuml;';
        entities['253'] = '&yacute;';
        entities['254'] = '&thorn;';
        entities['255'] = '&yuml;';
    }

    if (useQuoteStyle !== 'ENT_NOQUOTES') {
        entities['34'] = '&quot;';
    }
    if (useQuoteStyle === 'ENT_QUOTES') {
        entities['39'] = '&#39;';
    }
    entities['60'] = '&lt;';
    entities['62'] = '&gt;';


    // ascii decimals to real symbols
    for (decimal in entities) {
        if (entities.hasOwnProperty(decimal)) {
            hash_map[String.fromCharCode(decimal)] = entities[decimal];
        }
    }

    return hash_map;
}
function html_entity_decode (string, quote_style) {
    // Convert all HTML entities to their applicable characters
    //
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/html_entity_decode
    // +   original by: john (http://www.jd-tech.net)
    // +      input by: ger
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   improved by: marc andreu
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Ratheous
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Nick Kolosov (http://sammy.ru)
    // +   bugfixed by: Fox
    // -    depends on: get_html_translation_table
    // *     example 1: html_entity_decode('Kevin &amp; van Zonneveld');
    // *     returns 1: 'Kevin & van Zonneveld'
    // *     example 2: html_entity_decode('&amp;lt;');
    // *     returns 2: '&lt;'
    var hash_map = {},
        symbol = '',
        tmp_str = '',
        entity = '';
    tmp_str = string.toString();

    if (false === (hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style))) {
        return false;
    }

    // fix &amp; problem
    // http://phpjs.org/functions/get_html_translation_table:416#comment_97660
    delete(hash_map['&']);
    hash_map['&'] = '&amp;';

    for (symbol in hash_map) {
        entity = hash_map[symbol];
        tmp_str = tmp_str.split(entity).join(symbol);
    }
    tmp_str = tmp_str.split('&#039;').join("'");

    return tmp_str;
}
function upload_substr(string)
{
    if(string.length>20)
          string = string.substr(0,20)+'...' ;

    return string;
}

function initTinyMCE()
{
	na.tinymce.init_all();
	na.tinymce.init_all_specific();
	if( typeof tinymce != "undefined")
	{
		tinymce.init(na.tinymce.all);
		tinymce.init(na.tinymce.all_reduced);
		tinymce.init(na.tinymce.standard);
		tinymce.init(na.tinymce.simple);
		tinymce.init(na.tinymce.newsletter);
		tinymce.init(na.tinymce.mail);
		tinymce.init(na.tinymce.mail_fullpage);
		tinymce.init(na.tinymce.histo);
		tinymce.init(na.tinymce.emploi);
		tinymce.init(na.tinymce.model_doc);
		tinymce.init(na.tinymce.gls);
		tinymce.init(na.tinymce.mobile);
	}
}

function copyToClipboard(elementId, imageId, text) {
    const $temp = $("<input>");
    $("body").append($temp);
    $temp.val($('#' + elementId).text()).select();
    document.execCommand("copy");

    const $image = $('#' + imageId);
    $image.removeClass('fa-copy');
    $image.addClass('fa-paste');
    $image.find(">:first-child").text(text);
    $temp.remove();
}


function rech_as_no_modal(url, modal) {
	if(modal) {
		$('#modal_rech_asno').find('.modal-body').html('<center style="margin:50px;"><i class="fas fa-spinner fa-spin fa-3x fa-fw"></i></center>');
		$('#modal_rech_asno').find('.modal-body').load(url+'&modal=1',function(){
			initLegacy('.rech_as_no');
		});
	}
	else {
		fen = window.open(url , "", "width=580,height=400,scrollbars=yes");
		if (!fen.opener) fen.opener = self;
	}
}

function initTribute(selectorId) {

	if(typeof Tribute == 'undefined')
		return;

	var tribute = new Tribute({
	  		trigger: '@',
		  	allowSpaces : true,
		  	lookup: 'id',
		  searchOpts: {
			  pre: '<span>',
			  post: '</span>',
			  skip: true // true will skip local search, useful if doing server-side search
		  },
			values: function (text, cb) {
		  		remoteSearchName(text, users => cb(users));
	  		},
		  noMatchTemplate: function () {
			  return $('.not_found').html();
		  }
		 /*menuItemTemplate: function(item) {

			 return item.string;

			  console.log(item);
			  var label = item.original.label;
			  console.log('label -> ' + label.replace('affiche_nom', item.string));
			  return label.replace('affiche_nom', item.string);
		  },*/
  	});

	tribute.attach(document.getElementById(selectorId));
}

function remoteSearchName(text, cb) {
	var URL = "/global/module/admin/ressources/ajax/ajax_stdAutocomplete.php?criterion=Elastic.PersonneNomPrenom";
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				var data = JSON.parse(xhr.responseText);
				cb(data);
			} else if (xhr.status === 403) {
				cb([]);
			}
		}
	};
	xhr.open("GET", URL + "&mention=1&term=" + text, true);
	xhr.send();
}


function UpdateElementOfParent(id, val) {
	$('#'+id).val(val);
}

function getElementOfParent(id) {
	return $('#'+id).val();
}

function hasElementOfParent(id) {
	return $('#'+id).length;
}

function submitForm(id) {
	$('#'+id).submit();
}

function loadCalqueImportInscription(elem, url) {
	$.fancybox(
		{
			'hideOnContentClick': false,
			'width':900,
			'height':700,
			'autoScale':false,
			'autoDimensions':false,
			'href': typeof url != "undefined" ? url : elem.attr('href'),
			'titleShow':false,
			'type':'iframe',
			'frameHeight': '100%',
			'frameWidth': '100%',
			'onClosed': function() {}
		});
	return false;
}

function DropDown(el) {
	this.dd = el;
	this.initEvents();
}

function setDateFocusIn(dateInput) {
	dateInput.type = 'date';
}

function setDateFocusOut(dateInput) {
	if (!dateInput.value) {
		dateInput.type = 'text';
	}
}

function initDateWithPlaceholder() {
	document.querySelectorAll('input[type="date"]').forEach(function(element) {
		if (element.placeholder) {
			element.addEventListener('focus', () => setDateFocusIn(element), false);
			element.addEventListener('focusout', () => setDateFocusOut(element), false);
			setDateFocusOut(element);
		}
	});
}

document.addEventListener('DOMContentLoaded', function() {
	initDateWithPlaceholder();
})