$( function()
   {
	   if( typeof $.datepicker != 'undefined' )
		   $("input.datepicker").datepicker({showOn: 'button', buttonImage: '/global/images/calendar.gif', buttonImageOnly: true,dateFormat: "dd/mm/yy"}, $.datepicker.regional['fr']);
   });


function deleteFilter(tag, filtre) {
	var elem = $('.annuaire_sidebar').find('.' + filtre);
	if (elem.is(":hidden"))
		elem.remove();
	else
		elem.attr('checked', false).val('');

	if(filtre == 'zone_geo') {
		$('#active_zone_geo').val(0);
		$('#getbounds').val(1);
	}

	if (filtre.match(/keyword-/)) {
		$("[name=keyword").val('');
	}

	liveSearch($('form.form_facet'), 0, $('.sort_result').val());
}

function liveSearch(elem, page, sort, url_search, change_filters) {

	if($('#zoneAnnuaire_layout .annuaire_result_map_').is(':visible')) {
		$('#pagination_map').html(page);
		loadAll(1);
	}
	else {
		if( !$('.overlay_annuaire').length && 0)
			$('body').prepend('<div class="overlay_annuaire"><div class="loader" ></div></div>');

		//$('body').find('.overlay_annuaire').show();
		$('.annuaire_result').css('opacity', '0.6');

		if( typeof page == "undefined")
			page = '0';

		if( typeof sorte == "undefined")
			sorte = '';

		if( typeof url_search == "undefined") {
			url_search = '/annuaire/ajax/loadresult';
			if( typeof url_search_ajax != 'undefined' && url_search_ajax)
				url_search = url_search_ajax;
		}

		if (typeof change_filters == "undefined")
			change_filters = 1;

		var map_visible =  $('#zoneAnnuaire_layout .annuaire_result_map_').is(':visible');

		$.ajax({
				   type	: "POST",
				   cache	: false,
				   url	: url_search,
				   data	: 'page=' + page + '&sort=' + sort  + '&change_filters=' + change_filters + '&map_visible=' + map_visible + '&' + elem.serialize(),
				   success: function(data) {

					   var __map = $('#zoneAnnuaire_layout  .annuaire_result').find('.annuaire_result_map_').html();
					   $('#zoneAnnuaire_layout .annuaire_result').html(data);
					   $('#zoneAnnuaire_layout .annuaire_result').find('.annuaire_result_map_').html(__map);

					   $('.annuaire_result').css('opacity', '1');

					   //$('body').find('.overlay_annuaire').hide();
					   //if( $('.popBackG').length){ $('.popBackG').remove(); }

					   var elem = $("#annuaire_result").length ? $("#annuaire_result") : $("#zoneAnnuaire_layout");

					   if($('.advanced-search').length && $('.advanced-search').is(':visible')) {
						   $('#zoneAnnuaire_layout .simple-search').show();
						   //$('#zoneAnnuaire_layout .simple-search .link1').hide();
					   }


					   if( $('.row-appli-mobile').length ) {
						   $('.displayMode').on('click', function() {
							   $('.displayMode').removeClass('active');
							   $(this).addClass('active');

							   if ($(this).data('map')) {
								   $('.annuaire_result_map').show();
							   } else {
								   $('.annuaire_result_map').hide();
							   }
						   });

						   var top = typeof custom_top != 'undefined' && custom_top  ? custom_top : 0;


						   //j'utilise cette fonction pour le scroll (qui exsite déja dans le controller) pour ne pas casser la recherche
						   if( typeof angular == 'object' ) {
							   angular.element('.content-annuaire').scope().hideKeyboard(top);
							   //angular.element('.content-annuaire').scope().scrollToTop(top);
						   }

						   $('.global-pagination a').on('click',function () {
							   liveSearch($('form.form_facet'), $(this).data('page'), $('.sort_result').val());
							   return false;
						   });
					   }

					   $( ".annuaire_result" ).animate({scrollTop:0});
					   $('html, body').animate({
						   scrollTop: elem.offset().top
					   }, 750);


				   }
			   });
	}
}

function submitFormSearch(node) {
	node.closest('form')['keyword'].value = '';
	node.closest('form').submit();
}

function uploadResult(elem) {
	elem.addClass('active');
	$('.img-upload').show();
	$('.file-upload').hide();
	$.post('/module/annuaire/ajax/upload-result', function(html) {
		$('.img-upload').hide();
		$('.file-upload').show().html(html);
		elem.removeClass('active');
	}, 'html');
}
