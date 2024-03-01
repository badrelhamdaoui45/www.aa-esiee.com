
function initEventFilters()
{
    var filters = $('[id^="zoneEvent"] .accordion-head');

    filters.toggle(
        function ()
        {
            $('.accordion-body,.criteria-item' , $(this).parents('.criteria')).slideDown("fast");
        },
        function ()
        {
            $('.criteria-item:not(.selected)' , $(this).parents('.criteria')).slideUp("fast");
        }
    );

    filters.parents('.criteria:has(.selected)').each(
        function ()
        {
            $('.accordion-head' , $(this)).click().click();
        }
    )

    $('.criteria-item' , $('[id^="zoneEvent"] .criteria-select')).click(
        function () {
            selectFilterItem($(this));
        }
    );

    $('.btKeywords').click(function () {
        getFilteredEvents();
    });
}

var update_xhr = new AjaxHelper(
    {
        url: "/event/ajax/loadmap",
        type: 'POST',
        async: true,
        dataType: 'json',
        success: refreshHtml
    }
);

var update_xhr_list = new AjaxHelper(
    {
        url: "/event/ajax/loadevent",
        type: 'POST',
        async: true,
        dataType: 'json',
        success: refreshHtml
    }
);

var update_xhr_list_map = new AjaxHelper(
    {
        url: "/event/ajax/loadeventfrommaps",
        type: 'POST',
        async: true,
        dataType: 'json',
        success : refreshHtml
    }
);

function refreshHtml(data)
{
    $('.loaderResults, .loaderResultsMaps').hide();
    if (data)
    {
        if (data.filters_html)
        {
          $('#maps-event').hide();
          $("#widget-filters").html(data.filters_html);
          $('#zoneEvent .section-body').show();
          initEventFilters();
        }

        if (data.gmap_renderer)
        {
          $('#maps-event').show();
          $('#maps-event').html(data.gmap_renderer);
          $('.loaderResultsMaps').hide();
        }

        if (data.events_html)
        {
          $('#maps-event').hide();
          $('#zoneEvent .section-body').html(data.events_html);
          $('#zoneEvent .section-body').show();
          simplePaginationSearch();
        }

        if (data.event_calendar)
        {
          $('#maps-event').hide();
          $('#zoneEvent .section-body').html(data.events_html);
          $('#zoneEvent .section-body').show();
          simplePaginationSearch();
        }

        if( data.show_event ) {
            $('#zoneEvent .section-body').show();
        }
    }
    $('.leaflet-popup').css({
			marginBottom : "20px"
		});
		$('.leaflet-popup-content').css({
			padding : "20px"
		});

}

function loadEvent(id_events) {
  console.log('trigger loadEvent unique', id_events);
    $('#zoneEvent .section-body').html('');
    $('.loaderResults').show();

    update_xhr_list_map.send({ 'id_events' : id_events });
}

function setClusters() {

var opt_options = {gridSize : 20};

    if( typeof MarkerClusterer != 'undefined') {
        var markerCluster = new MarkerClusterer(map, markersArray, opt_options) ;
        if (typeof(google.maps) != 'undefined') {

            google.maps.event.addListener(markerCluster, 'clusterclick', function(cluster){

                var markers = cluster.getMarkers();

                //Get all the titles
                var idClusters = [];
                for(var i = 0; i < markers.length; i++) {
                    if( markers[i].id )
                        idClusters.push(markers[i].id);
                }

                loadEvent(idClusters);
            });
        }
    }
}

function selectFilterItem(elem)
{
    var criteria = elem.parents('.criteria');
    var label = elem.data('label');
    var value = elem.data('value');

    var selected = criteria.find('.selected');

    if (selected.text().trim() == label)
        criteria.find('.selected').removeClass('selected');
    else
    {
        selected.removeClass('selected');
        elem.addClass('selected');
    }

    criteria.find('.accordion-head').click();

    getFilteredEvents();
}

function getFilteredEvents()
{
    $('#zoneEvent .section-body').html('');
    $('.loaderResults').show();

    var data = [];
    data.push('filter=1');

    if( $('#year_selected').html() ) {
        data.push('calendar_year=' + $('#year_selected').html());
    }

    if( $('#month_selected').html() ) {
        data.push('calendar_month=' + $('#month_selected').html());
    }

	if( $('#day_selected').html() ) {
		data.push('calendar_day=' + $('#day_selected').html());
	}

	if( $('#group_en_cours').val() ) {
		data.push('id_details_groupe=' + $('#group_en_cours').val());
	}
    if ($(".replay").val()) {
        data.push('replay=1');
    }

    if( $('.inputKeywords').val() ) {
        data.push('keywords=' + $('.inputKeywords').val());
    }    

    $('.criteria').each(
        function ()
        {
            var criteria = $(this);
            var items = criteria.find('.criteria-item.selected');

            var i = 0;
            items.each(
                function ()
                {
                    data.push(criteria.data('name') + '[' + i++ + ']=' + $(this).data('value'));
                }
            )
        }
    );

    var opt_rubriques = $('#opt_rubriques').html();
    if( opt_rubriques ) data.push('opt_rubriques=' + opt_rubriques);

    data = data.join('&');
    console.log('trigger getFilteredEvents');
    update_xhr_list.send(data);
}

function getCalendarEvents( _year , _month, _day) {
    $('#zoneEvent .section-body').html('');
    $('.loaderResults').show();

    var data = [];
    if( typeof _year !='undefined' ) {
        data.push('calendar_year=' + _year);
        $('#year_selected').html(_year);
    }

    if( typeof _month !='undefined' ) {
        data.push('calendar_month=' + _month);
        $('#month_selected').html(_month);
    }
    if( typeof _day !='undefined' ) {
        data.push('calendar_day=' + _day);
		$('#day_selected').html(_day);
    }

	if( $('#group_en_cours').val() ) {
		data.push('id_details_groupe=' + $('#group_en_cours').val());
	}    

	if ($(".replay").val()) {
        data.push('replay=1');
    }

    if( $('.inputKeywords').val() ) {
        data.push('keywords=' + $('.inputKeywords').val());
    }

    var opt_rubriques = $('#opt_rubriques').html();
    if( opt_rubriques ) data.push('opt_rubriques=' + opt_rubriques);


    data.push('filter=1');

    $('.criteria').each(
        function ()
        {
            var criteria = $(this);
            var items = criteria.find('.criteria-item.selected');

            var i = 0;
            items.each(
                function ()
                {
                    data.push(criteria.data('name') + '[' + i++ + ']=' + $(this).data('value'));
                }
            )
        }
    );

    data = data.join('&');
    //console.log('trigger getCalendarEvents');
    update_xhr_list.send(data);
}

function saveModifiedSuscribtion(elem) {

	var waiting_list = elem.closest('form').find('.waiting_list').length;

	if(waiting_list) {
		var msg = polyglot.t('admin.are_you_sure_you_want_add_this_entry_waiting_list_interrogation');
	}
	else {
		var msg = polyglot.t('admin.are_you_sure_you_want_change_this_listing_interrogation');
	}

    if (!confirm(msg))
        return false;

    $('.notificationArea').html('<div style="text-align:center"><img src="/global/images/ajax-loader.gif" /></div>');

    $.post('/event/admin/ajax/updateInscription', elem.closest('form').serialize(), function(data) {
        $('.notificationArea').html(data);
    });

    return false;
}

function saveModifiedPrequestions(elem, id_event, id_product) {
	if (!verifFormulaire(elem.closest('form')))
		return false;

	if (!confirm(polyglot.t('admin.are_you_sure_you_want_change_answers_interrogation')))
		return false;

	$('.notificationArea').html('<div style="text-align:center"><img src="/global/images/ajax-loader.gif" /></div>');

	var formData = new FormData();

	var formDataArray = elem.closest('form').serializeArray();
	for (var i = 0; i < formDataArray.length; i++)
	{
		var formDataItem = formDataArray[i];
		formData.append(formDataItem.name, formDataItem.value);
	}

	var files = elem.closest('form').find('input[type="file"]');
	if (files.length)
	{
		elem.closest('form').find('.jqueryButton').find('.ui-button-text').text(polyglot.t('admin.recording_progress_3dots'));

		for (i = 0; i < files.length; i++)
		{
			formData.append($(files[i]).attr('name'), files[i].files[0]);
		}
	}

	$.ajax(
		{
			url: '/event/admin/ajax/editSurveyAnswers/' + id_event + '/' + id_product,
			data: formData,
			processData: false,
			contentType: false,
			type: 'POST',
			success: function (data) {
				console.log('upload success!');
				$('.notificationArea').html(data);
			}
		}
	);

	return false;
}

function removeSuscribtion(item, eventID, orderID)
{
    if (confirm(polyglot.t('admin.are_you_sure_you_want_delete_this_entry_interrogation')))
    {
        item.find('img').attr('src', '/global/images/ajax-loader.gif')
        $.post('/event/admin/ajax/removeInscription', { 'id_event' : eventID, 'id_order' : orderID }, function() {
            item.closest('table').find('.suscribtionLine_' + orderID).remove();
        });
    }
}

function removeRefus(item, eventID, as_no)
{
    if (confirm(polyglot.t('admin.are_you_sure_you_want_delete_this_line_interrogation')))
    {
        item.find('img').attr('src', '/global/images/ajax-loader.gif')
        $.post('/event/admin/ajax/removeRefus', { 'id_event' : eventID, 'as_no' : as_no }, function() {
            item.closest('table').find('.refusLine_' + as_no).remove();
        });
    }
}

function select_action() {
	alert(polyglot.t('admin.please_select_action'));
	return false;
}
function groupActions(elem) {
	var val = elem.val();
	$('#venu').val('0');
	$('#venu_workshop').val('0');

	if(val == '0') {
		elem.closest('div').find('.group_actions').attr('onClick', "select_action(); return false;");
	}
	else if(val.indexOf('pres_workshop_') >= 0 ) {
		$('#venu_workshop').val(val.replace('pres_workshop_', ''));
		elem.closest('div').find('.group_actions').attr('onClick', "validePresenceSuscribtionWorkShop($(this)); return false;");
	}
	else if(val.indexOf('pres_') >= 0 ) {
		$('#venu').val(val.replace('pres_', ''));
		elem.closest('div').find('.group_actions').attr('onClick', "validePresenceSuscribtion($('#from_membre_present')); return false;");
	}
	else if( val == 'refund') {
		elem.closest('div').find('.group_actions').attr('onClick', "refundSuscribtion($('#from_membre_present')); return false;");
	}
	else if (val == 'mail_acces_conf')
	{
		elem.closest('div').find('.group_actions').attr('onClick', "sendMailAccesConferenceGroup($('#from_membre_present')); return false;");
	}
	else if (val == 'mail_acces_conf2')
	{
		elem.closest('div').find('.group_actions').attr('onClick', "sendMailAccesConferenceGroup($('#from_membre_present'), { only_not_opened : true }); return false;");
	}
	else if (val == 'relance_paiement')
	{
		elem.closest('div').find('.group_actions').attr('onClick', "sendMailRelancePaiement($('#from_membre_present')); return false;");
	}
	else if (val == 'valid_waitinglist')
	{
		elem.closest('div').find('.group_actions').attr('onClick', "validWaitingList($('#from_waiting_list')); return false;");
	}
	else if (val == 'add_list')
	{
		elem.closest('div').find('.group_actions').attr('onClick', "addList($('#from_membre_present')); return false;");
	}
	else if (val == 'send_mail')
	{
		elem.closest('div').find('.group_actions').attr('onClick', "senMailAction($('#from_membre_present')); return false;");
	}
	else if (val == 'valid_waitingExtern')
	{
		elem.closest('div').find('.group_actions').attr('onClick', "validWaitingExtern($('#from_waiting_extern')); return false;");
	}
	else if (val == 'del_waitingExtern')
	{
		elem.closest('div').find('.group_actions').attr('onClick', "delWaitingExtern($('#from_waiting_extern'), 0); return false;");
	}
	else if (val == 'del_waitingExternMail')
	{
		elem.closest('div').find('.group_actions').attr('onClick', "delWaitingExtern($('#from_waiting_extern'), 1); return false;");
	}
	else if (val == 'send_mail_survey')
	{
		elem.closest('div').find('.group_actions').attr('onClick', "sendMailSurvey($('#from_membre_present')); return false;");
	}
}

function sendMailSurvey(elem)
{
	var test = false;
	elem.find(("[id^=present_]")).each(function(){
		if($(this).is(':checked'))
			test = true;
	});

	if( !test ) {
		alert(polyglot.t('admin.please_select_one_or_more_participants'));
		return false;
	}

	if (confirm(polyglot.t('admin.are_you_sure_want_send_mail_questionnaire_these_participants_interrogation')))
	{
		$.post('/event/admin/mailing/questionnaire', 'action=grouped&'+elem.serialize(), function(data)
		{
			$("html, body").animate({ scrollTop: 0 }, "slow");
			$('div#msg_confirmation_list').html(polyglot.t('common.the_mail_has_been_sent'))
				.removeClass('attention erreur')
				.addClass('confirmation')
				.show().delay(5000).queue(function() {
				$('div#msg_confirmation_list').hide();
			});
			$('.loading-action').hide();
		});
	}
}

function addList(elem)
{
	var test = false;
	elem.find(("[id^=present_]")).each(function(){
		if($(this).is(':checked')) {
			test = true;
		}
	});

	if( !test ) {
		alert(polyglot.t('admin.please_select_one_or_more_participants'));
		return false;
	}

	$('.loading-action').show();
	$.post('/event/admin/ajax/add_list', elem.serialize(), function(data)
	{
		if($(".blockMesInformationsFilitres") && $(".blockMesInformationsFilitres .panel-collapse").is(':visible'))
			$(".titreRubriqueFiltres").click();

		$("html, body").animate({ scrollTop: 0 }, "slow");
		$('div#msg_confirmation_list').html(data)
			.removeClass('attention erreur')
			.addClass('confirmation')
			.show().delay(60000).queue(function() {
			$('div#msg_confirmation_list').hide();
		});
		$('.loading-action').hide();
	});
}

function senMailAction(elem)
{

	var test = false;
	elem.find(("[id^=present_]")).each(function(){
		if($(this).is(':checked')) {
			test = true;
		}
	});

	if( !test ) {
		alert(polyglot.t('admin.please_select_one_or_more_participants'));
		return false;
	}

	$('.loading-action').show();
	$.post('/event/admin/ajax/send_mail_action', elem.serialize(), function(data)
	{
		$('.loading-action').hide();
		if(data) {
			window.location = data;
		}
	});
}

function groupActionsEncours(elem) {
	var val = elem.val();

	if(val == '0') {
		elem.closest('div').find('.group_actions_encours').attr('onClick', "select_action(); return false;");
	}
	else if( val == 'change_state') {
		elem.closest('div').find('.group_actions_encours').attr('onClick', "changeStateSuscribtion($('#from_membre_encours')); return false;");
	}
}

function validePresenceSuscribtion(elem)
{

	var test = false;
	elem.find(("[id^=present_]")).each(function(){
		if($(this).is(':checked')) {
			test = true;
		}
	});

	if( !test ) {
		alert(polyglot.t('admin.please_select_one_or_more_participants'));
		return false;
	}

    $.post('/event/admin/ajax/validePresenceInscription', elem.serialize(), function()
    {
        if (typeof loadListeInscrits == 'function')
            loadListeInscrits();
        else
            location.reload();
    });
}


function validWaitingList(elem)
{

	var test = false;
	elem.find(("[id^=waiting_list_]")).each(function(){
		if($(this).is(':checked')) {
			test = true;
		}
	});

	if( !test ) {
		alert(polyglot.t('admin.please_select_one_or_more_participants'));
		return false;
	}

	$.post('/event/admin/ajax/valideWaitingList', elem.serialize(), function()
	{
		if (typeof loadListeInscrits == 'function')
			loadListeInscrits();
		else
			location.reload();
	});
}

function validWaitingExtern(elem)
{
	var test = false;
	elem.find(("[id^=waiting_extern_]")).each(function(){
		if($(this).is(':checked')) {
			test = true;
		}
	});

	if( !test ) {
		alert(polyglot.t('admin.please_select_one_or_more_participants'));
		return false;
	}

	$.post('/event/admin/ajax/valideWaitingExtern', elem.serialize(), function()
	{
		if (typeof loadListeInscrits == 'function')
			loadListeInscrits();
		else
			location.reload();
	});
}
function delWaitingExtern(elem, send_mail)
{
	var test = false;
	elem.find(("[id^=waiting_extern_]")).each(function(){
		if($(this).is(':checked')) {
			test = true;
		}
	});

	if( !test ) {
		alert(polyglot.t('admin.please_select_one_or_more_participants'));
		return false;
	}

	if (confirm('Êtes-vous sur(e) de vouloir supprimer ces participants ?'))
	{
		$.post('/event/admin/ajax/delWaitingExtern', 'send_mail='+send_mail + '&'+ elem.serialize(), function()
		{
			if (typeof loadListeInscrits == 'function')
				loadListeInscrits();
			else
				location.reload();
		});
	}

}

function validePresenceSuscribtionWorkShop(elem)
{
    $.post('/event/admin/ajax/validePresenceInscriptionWorkshop', $(elem).closest('form').serialize(), function()
    {
        $('.modal_presence_atelier').trigger('click');
        //location.reload();
        /*if (typeof loadListeInscrits == 'function')
            loadListeInscrits();
        else
            location.reload();*/
    });
}

function refundSuscribtion(elem)
{
	var test = false;
	elem.find(("[id^=present_]")).each(function(){
		if($(this).is(':checked')) {
			test = true;
		}
	});

	if( !test ) {
		alert(polyglot.t('admin.please_select_one_or_more_participants'));
		return false;
	}


	if (confirm(polyglot.t('admin.are_you_sure_you_want_reimburse_these_participants_interrogation')))
	{
		$.post('/event/admin/ajax/refundSuscribtion', elem.serialize(), function()
		{
			$("html, body").animate({ scrollTop: 0 }, "slow");
			$('div#msg_confirmation_list').html(polyglot.t('admin.refund_made'))
				.removeClass('attention erreur')
				.addClass('confirmation')
				.show().delay(5000).queue(function() {
				$('div#msg_confirmation_list').hide();
			});
			if (typeof loadListeInscrits == 'function') {
				loadListeInscrits();
			} else {
				location.reload();
			}


		});
	}

}

function sendMailAccesConferenceWorkshop(id_workshop_date, id_workshop, params)
{
	var data_post =  'id_workshop_date='+id_workshop_date+'&id_workshop=' + id_workshop;
	if (typeof params !== 'undefined')
	{
		if (typeof params.only_not_opened !== 'undefined' && params.only_not_opened)
		{
			data_post = data_post + "&only_not_opened=1";
		}
	}

	if (confirm(polyglot.t('admin.are_you_sure_you_want_send_videoconference_access_participants_interrogation')))
	{
		var html = $('div#msg_confirmation_workshop_envoi_encours').html();
		$('div#msg_confirmation_workshop_'+id_workshop).html(html)
			.addClass('attention') . show();

		$.post('/event/admin/mailing/acces_conference', data_post, function()
		{
			$("html, body").animate({ scrollTop: 0 }, "slow");
			var html = $('div#msg_confirmation_workshop_envoi_termine').html();
			$('div#msg_confirmation_workshop_'+id_workshop).html(html)
				.removeClass('attention erreur')
				.addClass('confirmation')
				.show().delay(5000).queue(function() {
				$('div#msg_confirmation_workshop').hide();
			});
		});
	}
}

function sendMailAccesConferenceGroup(elem, params)
{
	var test = false;
	elem.find(("[id^=present_]")).each(function(){
		if($(this).is(':checked'))
			test = true;
	});

	if( !test ) {
		alert(polyglot.t('admin.please_select_one_or_more_participants'));
		return false;
	}

	var data_post =  elem.serialize();

	if (typeof params !== 'undefined')
	{
		if (typeof params.only_not_opened !== 'undefined' && params.only_not_opened)
		{
			data_post = data_post + "&only_not_opened=1";
		}
	}

	if (confirm(polyglot.t('admin.are_you_sure_you_want_send_videoconference_access_for_these_participants_interrogation')))
	{
		$.post('/event/admin/mailing/acces_conference', data_post, function()
		{
			$("html, body").animate({ scrollTop: 0 }, "slow");
			$('div#msg_confirmation_list').html(polyglot.t('event.access_video_conference_sent'))
				.removeClass('attention erreur')
				.addClass('confirmation')
				.show().delay(5000).queue(function() {
				$('div#msg_confirmation_list').hide();
			});
			if (typeof loadListeInscrits == 'function') {
				loadListeInscrits();
			} else {
				location.reload();
			}
		});
	}
}

function sendMailRelancePaiement(elem)
{
	var test = false;
	elem.find(("[id^=present_]")).each(function(){
		if($(this).is(':checked'))
			test = true;
	});

	if( !test ) {
		alert(polyglot.t('admin.please_select_one_or_more_participants'));
		return false;
	}

	if (confirm(polyglot.t('admin.are_you_sure_you_want_send_payment_reminder_email_these_participants_interrogation')))
	{
		$.post('/event/admin/mailing/relance_paiement', elem.serialize(), function(data)
		{
			$("html, body").animate({ scrollTop: 0 }, "slow");
			$('div#msg_confirmation_list').html(polyglot.t('admin.payment_reminders_have_been_sent'))
				.removeClass('attention erreur')
				.addClass('confirmation')
				.show().delay(5000).queue(function() {
				$('div#msg_confirmation_list').hide();
			});
			if (typeof loadListeInscrits == 'function') {
				loadListeInscrits();
			} else {
				location.reload();
			}
		});
	}
}

function changeStateSuscribtion(elem)
{
	var test = false;
	elem.find(("[id^=encours_]")).each(function(){
		if($(this).is(':checked')) {
			test = true;
		}
	});

	if( !test ) {
		alert(polyglot.t('admin.please_select_one_or_more_entries'));
		return false;
	}

	if (confirm(polyglot.t('admin.are_you_sure_you_want_unlock_these_registrations_interrogation')))
	{
		$.post('/event/admin/ajax/changeStateSuscribtion', elem.serialize(), function()
		{
			$('div#msg_confirmation_list_encours').html(polyglot.t('admin.registrations_have_been_released'))
				.removeClass('attention erreur')
				.addClass('confirmation')
				.show().delay(2000).queue(function() {
					$('div#msg_confirmation_list_encours').hide();
				if (typeof loadListeInscrits == 'function')
					loadListeInscrits();
				else
					location.reload();
				});
		});
	}
}

function coche_tout( elem ) {
    var cases = elem.closest('table').find(':checkbox');
    if( elem.is(':checked'))
    {
        cases.not(':disabled').attr('checked', true);
    }
    else
    {
        cases.attr('checked', false);
    }
}

function coche_tout_workshop( elem, id_workshop ) {
    var cases = elem.closest('table').find('.workshop_'+id_workshop);
    if( elem.is(':checked'))
    {
        cases.attr('checked', true);
    }
    else
    {
        cases.attr('checked', false);
    }
}

function fusionner_fiche_manif(id_participant, as_no, dialog)
{
	jQ('#fusion_fiche_modal').find('.modal-body').html('<div style="margin:50px; text-align: center"><i class="fas fa-spinner fa-spin fa-3x fa-fw"></i></div>');
	jQ('#fusion_fiche_modal').modal('show');

	$.post('/event/admin/ajax/fusionnerFiche',
		   {
			   'id_participant': id_participant,
			   'as_no': as_no,
			   'fusion' : 1
		   },
		   function (data)
		   {
			   $('.dialog').dialog('close');
			   $('#fusion_fiche_modal').find('.modal-body').html(data);
		   }
   	);
}

function fusionner_fiche_manif_old(id_participant, as_no, dialog)
{
    if (typeof id_participant != 'undefined' && id_participant &&
            typeof as_no != 'undefined' && as_no &&
            confirm(polyglot.t('admin.are_you_sure_you_want_merge_participant_with_this_form_interrogation')))
    {
        $.post('/event/admin/ajax/fusionnerFiche',
            {
                    id_participant: id_participant,
                    as_no: as_no
            },
            function (data)
            {
                    if (data == 'true')
                    {
                        $('div#msg_confirmation').html(polyglot.t('admin.participant_correctly_merged'))
                                .removeClass('attention erreur')
                                .addClass('confirmation')
                                .show();

                    }
                    else
                    {
                            $('div#msg_confirmation').html(polyglot.t('admin.an_error_occurred_during_merge'))
                                                    .removeClass('attention confirmation')
                                                    .addClass('erreur')
                                                    .show();
                    }

                if (typeof loadListeInscrits == 'function')
                    loadListeInscrits();
                else
                    location.reload();
                    dialog.dialog('close');
            }
        );
    }
}

function creer_fiche_manif(id_participant, link, sendMail,dialog )
{

	if (typeof id_participant != 'undefined' && id_participant && confirm(polyglot.t('admin.are_you_sure_you_want_create_new_entry_for_this_participant_interrogation')))
	{
        $.post('/event/admin/ajax/creerFiche', { id_participant: id_participant, send_mail : sendMail },
            function (data)
            {
                    if (data != 'false' && parseInt(data) > 0)
                    {
                            var as_no = parseInt(data);
                            //var participant_infos = JSON.parse(participant_json);

                            $.post('/event/admin/ajax/fusionnerFiche',
                                {
                                        id_participant: id_participant,
                                        as_no: as_no
                                },
                                function (data)
                                {
                                        if (data == 'true')
                                        {

                                            $('div#msg_confirmation').html(polyglot.t('admin.file_created'))
                                                                    .removeClass('attention erreur')
                                                                    .addClass('confirmation')
                                                                    .show().delay(1500).queue(function() {
                                                                        window.location.reload();
                                                                    });

                                        }
                                        else
                                        {
                                                $('div#msg_confirmation').html(polyglot.t('admin.file_created_but_error_occurred_while_updating_participant'))
                                                        .removeClass('attention erreur')
                                                        .addClass('confirmation')
                                                        .show();
                                        }
                                }
                            );

                            link.remove();
                    }
                    else
                    {
                        $('div#msg_confirmation').html(polyglot.t('admin.an_error_occurred_while_creating_file'))
                                            .removeClass('attention confirmation')
                                            .addClass('erreur')
                                            .show();
                    }
                    if( dialog )
                        dialog.dialog('close');
                }
            );
	}
}

function updateLibeleExport(name, elem) {
    elem.closest("tr").find('.libelle_fields').val(elem.find("option:selected").data("name"));
}


function sendMailConfirmation(item, eventID, suscribeID, productID)
{
	if (confirm(polyglot.t('admin.are_you_sure_you_want_send_this_email_interrogation')))
	{
		item.find('img').attr('src', '/global/images/ajax-loader.gif');
		$.post('/event/admin/mailing/confirmation', {'id_event' : eventID, 'id' : suscribeID, 'id_product' : productID}, function( data ) {
            if( data ) {
                $('.notificationArea').html(data);
                $('.notificationArea').show().delay(2000).slideUp('fast', function() {});
            }

            if( suscribeID )
                item.find('img').attr('src', '/global/images/btn_mail_bg_0.png');
            else
                item.find('img').attr('src', '/global/images/contact_send_mail.jpg')
		});
	}
}

function sendMailAccesConference(item, eventID, suscribeID, productID, accompagnant)
{
	if (confirm(polyglot.t('admin.are_you_sure_you_want_send_this_email_interrogation')))
	{
		item.find('img').attr('src', '/global/images/ajax-loader.gif');
		$.post('/event/admin/mailing/acces_conference', {'id_event' : eventID, 'id_order' : suscribeID, 'id_product' : productID, 'accompagnant' : accompagnant}, function( data ) {
			if( data ) {
				$('.notificationArea').html(data);
				$('.notificationArea').show()//.delay(2000).slideUp('fast', function() {});
			}

			if( suscribeID || productID )
				item.find('img').attr('src', '/global/images/btn_mail_bg_0.png');
			else
				item.find('img').attr('src', '/global/images/contact_send_mail.jpg')
		});
	}
}

function sendMailQuestionnaire(item, eventID, suscribeID, present, forceSend, notification, id_event_survey)
{
    if( !notification || notification == 'undefined')
        notification = 'notificationArea';
    
    if( !id_event_survey || id_event_survey == 'undefined')
        id_event_survey = '0';

    if (confirm(polyglot.t('admin.are_you_sure_you_want_send_this_email_interrogation')))
    {
        var hideImg = false;
        var src = '/global/images/btn_mail_bg_0_question.png';

        if( src != item.find('img').attr('src'))
            hideImg = true

        item.find('img').attr('src', '/global/images/ajax-loader.gif').show();

        $.post('/event/admin/mailing/questionnaire',
        { 'id_event' : eventID, 'id' : suscribeID ? suscribeID : 0, 'present' : present, 'forceSend' : forceSend, 'id_event_survey' : id_event_survey}, function( data ) {
            if( data ) {
                $('.'+notification).html(data);
                $('.'+notification).show().delay(2000).slideUp('fast', function() {});
                if( hideImg )
                    item.find('img').hide();
                else
                    item.find('img').attr('src', '/global/images/btn_mail_bg_0_question.png');

            }
        });
    }
}

function sendMailQuestionnaireWorkshop(item, eventID, suscribeID, present, forceSend, notification, id_workshop, id_event_workshop_survey)
{
    if( !notification || notification == 'undefined')
        notification = 'notificationArea';

    if (confirm(polyglot.t('admin.are_you_sure_you_want_send_this_email_interrogation')))
    {
        var hideImg = false;
        var src = '/global/images/btn_mail_bg_0_question.png';

        if( src != item.find('img').attr('src'))
            hideImg = true

        item.find('img').attr('src', '/global/images/ajax-loader.gif').show();

        $.post('/event/admin/mailing/questionnaire_workshop',
        { 'id_event' : eventID, 'id' : suscribeID ? suscribeID : 0, 'present' : present, 'forceSend' : forceSend
        , 'id_workshop' : id_workshop
        , 'id_event_workshop_survey' : id_event_workshop_survey}, function( data ) {
            if( data ) {
                $('.'+notification).html(data);
                $('.'+notification).show().delay(2000).slideUp('fast', function() {});
                if( hideImg )
                    item.find('img').hide();
                else
                    item.find('img').attr('src', '/global/images/btn_mail_bg_0_question.png');

            }
        });
    }
}




function sendMailAttestation(eventID, item)
{
    var test = false;
    var tab = [];
    item.find(("[id^=present_]")).each(function(){
        if($(this).is(':checked')) {
            test = true;
            id = $(this).attr('id');
            id_product = id.replace('present_', '');
            tab.push(id_product);
        }
    });

    if( !test ) {
        alert(polyglot.t('admin.please_select_one_or_more_participants_send_email'))
        return false;
    }

    if (confirm(polyglot.t('admin.are_you_sure_you_want_send_this_email_interrogation')))
    {
        console.log(tab);
        $('#EventEditorInscription').find('img#img_attestation').show();

		$.post('/event/admin/mailing/attestation', {'id_event' : eventID, 'ids' : tab}, function( data ) {
            if( data ) {
                $('.notificationAreaAttestation').html(data);
                $('.notificationAreaAttestation').show().delay(2000).slideUp('fast', function() {});
            }

            $('#EventEditorInscription').find('img#img_attestation').hide();
		});
    }
}

function affiche_questionnaire_participant(id_event, questionnaire, id_product, id_event_survey)
{
    $.post('/event/admin/ajax/recupQuestionnaire',
        { 'id_event' : id_event, 'envoi_questionnaire' : questionnaire, 'id_product' : id_product, 'id_event_survey' : id_event_survey}, function(data) {
            $('#QuestionnaireEvent').empty().html(data).dialog('open');
    });
}

function affiche_questionnaire_participant_workshop(id_event, questionnaire, id_product, id_workshop, id_survey )
{
    $.post('/event/admin/ajax/recupQuestionnaireWorkshop/'+id_event+'/'+id_workshop+'/'+id_survey,
        { 'envoi_questionnaire' : questionnaire, 'id_product' : id_product}, function(data) {
            $('#QuestionnaireEvent').empty().html(data).dialog('open');
    });
}

function sendMailIcs(id_event, as_no, url_root) {

    $('.notificationAreaMailIcsImg').html('<div style="text-align:center"><img src="'+url_root+'/global/images/ajax-loader.gif" style="width:initial"/></div>');

    $.post(url_root + '/event/ajax/mail/ics',
        { 'id_event' : id_event, 'as_no' : as_no}, function(data) {
            $('.notificationAreaMailIcsImg').hide();
            $('.notificationAreaMailIcs').html(data);
            alertSwal(polyglot.t('admin.email_sent'));
    });
}

function sendMailConfirmationAccompagnant(suscribeID) {

    $('.notificationArea').html('<img src="/global/images/ajax-loader.gif" style="width:30px;">').show();
    $.post('/event/admin/mailing/confirmation', {'id' : suscribeID, 'accompagnant' : 1}, function( data ) {
        if( data ) {
            $('.notificationArea').html(data);
            $('.notificationArea').show().delay(2000).slideUp('fast', function() {});
        }

    });
}

function setPresent(item, id_product, etat) {

	if( item.attr('src') )
		item.attr('src', '/global/images/ajax-loader.gif').show();
	else {
		$('<img src="/global/images/ajax-loader.gif">').insertAfter(item);
		item.hide();
	}

    $.post('/event/admin/ajax/setPresent',
    { 'etat' : etat, 'id_product' : id_product}, function( data ) {
        if( data ) {
            item.closest('td').html(data);
        }
    });
}

function setPresentWorkshop(item, id_product, id_workshop, etat) {

    if( item.attr('src') )
        item.attr('src', '/global/images/ajax-loader.gif').show();
    else {
        item.hide();
        item.siblings('img').show();
    }
    
    $.post('/event/admin/ajax/setPresentWorkshop',
    { 'etat' : etat, 'id_product' : id_product, 'id_workshop' : id_workshop}, function( data ) {
        if( data ) {
            item.closest('td').html(data);
        }
    });
}

function loadList(id_event) {
	$('.seemore').hide();
	$('#zoneEventAjax .notif').hide();
	$('.find_loading_search').show();
	$('.list_inscrits').html('');
	$('.rows-persons').css('opacity', '0.6');

	$.post('/event/ajax/listeinscrits/' + id_event, $('.filtre-form').serialize(), function(data) {


		$('.rows-persons').css('opacity', '1');
		$('.rows-persons').replaceWith(data);

		$('.find_loading_search').hide();
		$('.list_inscrits').html(data.tpl);
	    if(!data.nb) {
			$('#zoneEventAjax .notif').show();
        }
        else {

			var nb = data.nb;
			$('#nb_result').val(nb);
			var nb_row = $('#zoneEventAjax .list_inscrits .row').size();

			if( nb > nb_row ) {
				$('#nb_more').html('('+(nb - nb_row )+')');
				$('.seemore').show();
			}
        }

	});
}

function seeMore(id_event, count) {

	$('.find_loading').show();
	var params = $('.filtre-form').serialize();
	var nb = $('#nb_result').val();

	$.post('/event/ajax/listeinscrits/' + id_event, params + '&load_more=1&count='+count,
		function(data)
		{
			$('.find_loading').hide();
			$('.list_inscrits').append(data);

			var nb_row = $('#zoneEventAjax .list_inscrits .row').size();

			$('#nb_more').html('('+(nb - nb_row )+')');

			if( nb_row == nb)
				$('.seemore').hide();

		}
	);
}

function calculateEventsDates(eventDates = [], eventDatesEnd, eventTypes, labels) {
	eventDates = JSON.parse(eventDates);
	let eventDatesStart = [...eventDates];
	eventDatesEnd = JSON.parse(eventDatesEnd);
	eventTypes = JSON.parse(eventTypes);
	let eventTypesStart = {...eventTypes};

	for (let i = 0; i < eventDatesStart.length; i++) {
		const dateStart = new Date(eventDatesStart[i]);
		const dateEnd = new Date(eventDatesEnd[i]);
		if (dateStart < dateEnd) {
			const diffDays = (dateEnd.getTime() - dateStart.getTime()) / (1000 * 60 * 60 * 24);
			if (diffDays <= 30) {
				let nextDate = dateStart;
				for (let j = 0; j < diffDays; j++) {
					nextDate.setDate(nextDate.getDate() + 1);
					const dateEvent = nextDate.toLocaleDateString("en-US");
					eventDates.push(dateEvent);

					if (eventTypes[dateEvent] === undefined) {
						eventTypes[dateEvent] = eventTypesStart[eventDatesStart[i]];
					} else {
						eventTypes[dateEvent] = eventTypesStart[eventDatesStart[oldestIndexEventDate(nextDate, eventDatesStart, eventDatesEnd)]];
					}

					if (labels[dateEvent] == null) {
						labels[dateEvent] = [];
					}
					const label = labels[eventDatesStart[i]][0].trim().replaceAll('\r', '').replaceAll('\n', '');
					if (!labels[dateEvent].includes(label)) {
						labels[dateEvent].push(label);
					}
				}
			}
		}
	}
	return {eventDates, eventTypes, labels};
}

function oldestIndexEventDate(nextDate, eventDatesStart, eventDatesEnd) {
	for (let k = 0; k < eventDatesStart.length; k++) {
		if (nextDate >= new Date(eventDatesStart[k]) && nextDate <= new Date(eventDatesEnd[k])) {
			return k;
		}
	}
}


function loadStates(item, selector)
{
	var elem = item.closest(selector);
	if(item.val() && item.val() != 'FR')
	{
		$.post('/global/ressources/ajax/recupEtat.php', { 'pays' : item.val(), 'etat' :  elem.find('.currentState').val() }, function(data) {

			if (data == '') {
				elem.find('.etat').html('').hide().closest('tr').hide();
				elem.find('.currentState').val('');
				elem.find('.noState').show();
			}
			else
			{
				elem.find('.noState').hide();
				elem.find('.currentState').val('');
				elem.find('.etat').html(data).show().closest('div.div_fields').show();
			}
		});
	}
	else
	{
		elem.find('.etat').html('').hide().closest('div.div_fields').hide();
		elem.find('.currentState').val('');
		elem.find('.noState').show();
	}
}

$(function() {
	$('div .google-auto-country.pays').each(function() {

		$(this).unbind('change').change(function() {
			loadStates($(this), '.form-registration');
		});
		loadStates($(this), '.form-registration');
	});
})
