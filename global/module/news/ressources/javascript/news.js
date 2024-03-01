function deleteNews(id_news, elem, del)
{
	if(!del) del = '';
    
	if (confirm(polyglot.t('news.are_you_sure_you_want_delete_this_news_interrogation')))
    {
    	$.post('/global/module/news/ressources/ajax/ajax_deleteNews.php', 'id_news='+id_news+'&del='+del);
    	$(elem).closest('tr').hide('slow');
    	decompte_news();
    }
    
    return false;
}

function select_action_news(element) {
    const action = $(element).closest('div').find('select').val();
    let ids_news = [];
    $("input:checkbox[name=select_news]:checked").each(function(){
        ids_news.push($(this).val());
    });
    let msg_key = ids_news.length > 1 ? 'news.are_you_sure_archivedelete_this_news_interrogation_plural' : 'news.are_you_sure_archivedelete_this_news_interrogation';

    if (action == 'supprimer') {
        archiveDeleteNewsEnMasse(ids_news, msg_key, polyglot.t('news.delete').toLowerCase(), 'true');
    } else if (action == 'archiver') {
        archiveDeleteNewsEnMasse(ids_news, msg_key, polyglot.t('news.archive').toLowerCase(), '');
    } else if (action == 'attente') {
        validerNewsEnMasse(ids_news, msg_key, polyglot.t('news.put_this_news_hold').toLowerCase(), '3');
    } else if (action == 'valider') {
        validerNewsEnMasse(ids_news, msg_key, polyglot.t('news.validate').toLowerCase(), '');
    } else if (action == 'restaurer') {
        validerNewsEnMasse(ids_news, msg_key, polyglot.t('news.restore').toLowerCase(), '');
    }
}

function archiveDeleteNewsEnMasse(listNews, msg_key, label, toDelete) {
    if (confirm(polyglot.t(msg_key, {'action': label}))) {    
        const postData = {'id_news[]=': listNews, 'del': toDelete};
        $.post('/global/module/news/ressources/ajax/ajax_deleteNews.php', postData)
            .done(function() {
                $("input:checkbox[name=select_news]:checked").each(function(){
                    $(this).closest('tr').hide('slow', function(){ $(this).closest('tr').remove(); });
                });
                decompte_news(listNews.length);
            });
    }
}

function validerNewsEnMasse(listNews, msg_key, label, valide) {
    if (confirm(polyglot.t(msg_key, {'action': label}))) {  
        const postData = {'id_news[]=': listNews, 'valide': valide};
        $.post('/global/module/news/ressources/ajax/ajax_valideNews.php', postData)
            .done(function() {
                $("input:checkbox[name=select_news]:checked").each(function(){
                    $(this).closest('tr').hide('slow', function(){ $(this).closest('tr').remove(); });
                });
                decompte_news(listNews.length);
            });
    }
}

function coche_tout( elem ) {
    const cases = elem.closest('table').find(':checkbox');
    if (elem.is(':checked')) {
        cases.not(':disabled').attr('checked', true);
    } else {
        cases.attr('checked', false);
    }
}

function validerNews(id_news, elem)
{    
	if (confirm(polyglot.t('news.are_you_sure_you_want_validate_this_news_hold_interrogation')))
    {
    	$.post('/global/module/news/ressources/ajax/ajax_valideNews.php', 'id_news='+id_news);
    	$(elem).closest('tr').hide('slow');
    	decompte_news();
    }
    
    return false;
}

function enAttenteNews(id_news, elem)
{    
	if (confirm(polyglot.t('news.are_you_sure_you_want_put_this_news_hold_interrogation')))
    {
    	$.post('/global/module/news/ressources/ajax/ajax_valideNews.php', 'id_news='+id_news+'&valide=3');
    	$(elem).closest('tr').hide('slow');
    	decompte_news();
    }
    
    return false;
}

function archiveNews(id_news, elem, del)
{
	if(!del) del = '';
    
	if (confirm(polyglot.t('news.are_you_sure_you_want_archive_this_news_interrogation')))
    {
    	$.post('/global/module/news/ressources/ajax/ajax_deleteNews.php', 'id_news='+id_news+'&del='+del);
    	$(elem).closest('tr').hide('slow');
    	decompte_news();
    }
    
    return false;
}

function decompte_news(count = 1){
	var nb = parseInt($('#resultat_nombre').html()) - count;
	$('#resultat_nombre').html(nb);
	/*if(nb > 1)
    	$('#resultat_texte').html('résultats');
	else
		$('#resultat_texte').html('résultat');*/
}

function restaureNews(id_news, elem)
{
	if (confirm(polyglot.t('news.are_you_sure_you_want_restore_this_news_interrogation')))
	{
		$.post('/global/module/news/ressources/ajax/ajax_restaureNews.php', 'id_news='+id_news);
		$(elem).closest('tr').hide('slow');
		decompte_news()
    }
    
	return false;
}

function verif_form(accueil, une, blog, verif)
{
	if (
        (
          (!$('#userfile_image').val() && !$('#userfile_image_MEMO').val()) ||
		  (!$('#userfile_image').val() && $('#userfile_image_MEMO').val() && $('#userfile_image_supprime').attr('checked') == 'checked')
        )
		&& 
		((accueil == 1 && $('#publication_accueil').attr('checked') == 'checked') || 
		 (une == 1 && $('#publication_une').attr('checked') == 'checked') || 
		 (blog == 1 && $('#publication_blog').val() != '1')))
	{
		dialog_alert('Erreur','<p style="text-align:center;">'+polyglot.t('news.please_select_image_publish_news')+'</p>');
		return false;
	} 

    if ($("[name^=titre_news][value!='']").size() == 0) {
        if ($("[name^=titre_news]").size() > 1)
		    dialog_alert('Erreur','<p style="text-align:center;">'+polyglot.t('news.please_enter_title_at_least_one_language')+'</p>');
        else
		    dialog_alert('Erreur','<p style="text-align:center;">'+polyglot.t('news.please_enter_title')+'</p>');
		return false;
    }

	$('#news_form').submit();
}

$(function() {
    if ($("#datepicker").length > 0) {
        $("#datepicker").datepicker({
                        showOn: 'button', 
                        buttonImage: '/global/images/calendar.gif', 
                        buttonImageOnly: true,
                        dateFormat : 'dd/mm/yy'
                    }, $.datepicker.regional['fr']);
    }
});

function makeObligatoireEspace(checkbox)
{
	var obligatoire = true;
	checkbox.closest('div').find('.checkbox').each( function(){
		if($(this).is(':checked'))
			obligatoire = false;
	});
	
	if(obligatoire)
		checkbox.closest('div').addClass('obligatoire in_error');
	else
	{
		checkbox.closest('div').removeClass('obligatoire');
		checkbox.closest('div').removeClass('in_error');
	}
		
}

function setNewsModif(ele, id_news, id_type, do_test) {
  
    var element = ele.closest('td');
    var statut_accueil = element.find('input').val();
    
    if( typeof do_test !== 'undefined' &&  do_test == 1 ) {

        if( (id_type == 'une' || id_type == 'accueil') && statut_accueil == 1) {
            if(!$(ele).closest('tr').find('img.photoNews').size()){
                alert(polyglot.t('news.please_add_image_publish_news'));
                return false;
            }
        }
    }

    element.find('img').attr({'src' : "/global/images/ajax-loader.gif"});
    $('#notificationStatutNews').html('<center><img src="/global/images/ajax-loader.gif" /></center>');

    $.ajax(
        {
            url: '/global/module/news/ressources/ajax/ajax_set_statut_modif.php',
            type: 'POST',
            async: true,
            data :
            {
                'id_news' : (typeof id_news != 'undefined' ? id_news : ''),
                'id_type' : (typeof id_type != 'undefined' ? id_type : ''),
                'statut_accueil' : (typeof statut_accueil != 'undefined' ? statut_accueil : '')
            },
            success : 
                function (data) 
                {
                    if (data)
                    {
                        $('#notificationStatutNews').html(data).show()/*.delay(5000).slideUp('fast', function() {})*/;
						if(statut_accueil == 2 )
						{
							element.find('img').attr({'src' : '/global/images/green_tick_off.png', 'title' : polyglot.t('news.set_as_home_page')});
							element.find('input').val('1');
						}
						else
						{
							element.find('img').attr({'src' : '/global/images/green_tick.png', 'title' : polyglot.t('news.delete_from_home_page')});
							element.find('input').val('2');
						}

                    }
                    else
                    {
                        $('#notificationStatutEnvoi').html(polyglot.t('admin.an_error_occurred_while_editing._if_problem_persists'));
                    }
                }
        }
    );
}

function setNewsVisibilite(ele, id_news) {
    
    var element = ele.closest('td');
    var statut_accueil = element.find('input').val();
    element.find('img').attr({'src' : "/global/images/ajax-loader.gif"});
    $('#notificationStatutNews').html('<center><img src="/global/images/ajax-loader.gif" /></center>');

    $.ajax(
        {
            url: '/global/module/news/ressources/ajax/ajax_set_statut_visibilite.php',
            type: 'POST',
            async: true,
            data :
            {
                'id_news' : (typeof id_news != 'undefined' ? id_news : ''),
                'statut_visibilite' : (typeof statut_accueil != 'undefined' ? statut_accueil : '')
            },
            success : 
                function (data) 
                {
                    if (data)
                    {
                        $('#notificationStatutNews').html(data).show()/*.delay(5000).slideUp('fast', function() {})*/;
                        console.log(statut_accueil);
                        if(statut_accueil == 0 )
                        {
                            element.find('img').attr({'src' : '/global/images/btn_membres.gif', 'title' : polyglot.t('news.connected_members_start_visible_all')});
                            element.find('input').val('4');
                        }
                        if(statut_accueil == 5 )
                        {
                            element.find('img').attr({'src' : '/global/images/btn_cotisant.gif', 'title' : polyglot.t('news.contributing_members')});
                            element.find('input').val('2');
                        }
                        if(statut_accueil == 4 )
                        {
                            element.find('img').attr({'src' : '/global/images/btn_membres.gif', 'title' : polyglot.t('news.connected_members')});
                            element.find('input').val('1');
                        }
                        else if(statut_accueil == 3 )
                        {
                            element.find('img').attr({'src' : '/global/images/btn_membres_off.gif', 'title' : polyglot.t('news.public_visible_all')});
                            element.find('input').val('0');
                        }
                        else if(statut_accueil == 2 )
                        {
                            element.find('img').attr({'src' : '/global/images/ed_link.gif', 'title' : polyglot.t('news.access_url')});
                            element.find('input').val('3');
                        }
                        else if(statut_accueil == 1 )
                        {
                            element.find('img').attr({'src' : '/global/images/btn_cotisant.gif', 'title' : polyglot.t('news.contributing_members_start_visible_all')});
                            element.find('input').val('5');
                        }
                    }
                    else
                    {
                        $('#notificationStatutEnvoi').html(polyglot.t('admin.an_error_occurred_while_editing._if_problem_persists'));
                    }
                }
        }
    );
}
