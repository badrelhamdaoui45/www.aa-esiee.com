;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);

	$doc.ready(function() {
		// Placeholder for form elements
		$(document)
			.on('focusin', '.field:not(.code-reduction), .textarea', function() {
				if (this.title == this.value) {
					this.value = '';
				}
			})
			.on('focusout', '.field:not(.code-reduction), .textarea', function() {
				if (this.value == '') {
					this.value = this.title;
				}
			});

		// Tabs
		var currentElement;
		$('.tabs-nav a').on('click', function (event) {
			currentElement = $(this).attr('href');

			$(this)
				.parent()
				.addClass('current')
				.siblings()
				.removeClass('current');

			$(currentElement)
				.addClass('current')
				.siblings()
				.removeClass('current');

            var funcName = "eventInitialize_"+currentElement.substring(1);
            console.log(funcName);
            if (typeof window[funcName] == 'function') { 
                window[funcName](); 
            }

			return false;
		});

            // Accordion
            if( typeof initEventFilters == 'function')
		initEventFilters();

        // Custom Radios
		$('input:radio:not(.custom)').click(
			function ()
			{
				var $this = $(this);
				$thisParent = $this.parent();
				if ($this.prop('checked')) {
					$thisParent.addClass('checked');

					$this
						.closest('li')
						.siblings()
						.find('.radio-holder')
						.removeClass('checked');
				} else {
					$thisParent.addClass('checked')
				}
			}
		)
		.each(
			function ()
			{
				var $this = $(this);
				$thisParent = $this.parent();
				if ($this.prop('checked')) {
					$thisParent.addClass('checked');
				}
			}
		);
});

})(jQuery, window, document);

var map = false;

$(document).ready(
    function () {

        /*$('#EventEditorInscription').tabs({
            show: function( event, ui ) {
                if ($(ui.panel).attr('id') == "badges") {
                    eventTabInitBadges();
                }
            }
        });
        $('#EventEditorExport').tabs({
            show: function( event, ui ) {

                if ($(ui.panel).attr('id') == "exportPdf") {

                    $('#EventEditorInscription').tabs('select', '#exports');
                    $('#EventEditorExport').tabs('select', '#exportPdf');
                }
            }}
        );*/
        if( typeof $('a.fancyframe').fancybox == 'function')
            $('a.fancyframe').fancybox({ width : 800, height: '98vh', autoDimensions: false, padding: 0, border:0});

        if( typeof $('.AccompagnantEditor').dialog == 'function')
		$('.AccompagnantEditor').dialog({
				'autoOpen' : false,
				'width' : 600
			});

		if (typeof loadListeInscrits == 'function')
			loadListeInscrits();
                    
		if (typeof loadListeRefus == 'function')
			loadListeRefus();

		if (typeof initExport == 'function')
			initExport();


		var input_mail = $('#field-mail');

		if (input_mail.size())
		{
			var mail_xhr = new AjaxHelper(
				{
					url: "/global/ressources/ajax/testMail.php",
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
    
        if( $('.slider_photo_event').length )
            $('.slider_photo_event').bxSlider({
                auto: true,
                pager: false,
                infiniteLoop: true,
                pause: 3000,
                mode: 'horizontal',
                autoDirection: 'next',
                preloadImages: 'all',
                useCSS: true,
                stopAuto: false
            });
        
        if( $('a.zoomboxPhotoEvent').length )
            $('a.zoomboxPhotoEvent').zoombox({gallery  : true});
    
	}

);
function workshopCollapse (element) {
	let image = element.children[0].children[0];
	if (image.classList.contains('fa-angle-down')) {
		image.classList.remove("fa-angle-down");
		image.classList.add("fa-angle-up");
	} else if (image.classList.contains('fa-angle-up')) {
		image.classList.remove("fa-angle-up");
		image.classList.add("fa-angle-down");
	}
}

function initExport() {
	/* NA_FA_COMPLEX */
	if( typeof $('.exportListeExcel').dialog == 'function') {
		$('.exportListeExcel').dialog({
										  'autoOpen' : false,
										  'width' : 400,
										  'title' : 'Téléchargement de listes Excel'
									  });

		$('.exportListePdf').dialog({
										'autoOpen' : false,
										'width' : 400,
										'title' : 'Téléchargement de listes Pdf'
									});

		$('.exportBadges').dialog({
									  'autoOpen' : false,
									  'width' : 400,
									  'title' : 'Téléchargement de badges'
								  });

		$('.exportCavaliers').dialog({
										 'autoOpen' : false,
										 'width' : 400,
										 'title' : 'Téléchargement de cavaliers'
									 });
	}
}