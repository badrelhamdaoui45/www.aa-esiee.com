$( function()
{
    if( typeof $.fancybox == 'function' ) {
	$("a.calqueOffre").fancybox(
	{
		'hideOnContentClick': false,
		'autoScale':true,
		'autoDimensions':true,
		'titleShow':false
	});
        
	$("a.calqueDiplomes").fancybox(
	{
		'hideOnContentClick': false,
		'width':600,
		'height':400,
		'autoScale':false,
		'autoDimensions':false,
		'titleShow':false
	});

	$("a.calqueCV").fancybox({
            'hideOnContentClick': false,
            'autoScale': true,
            'autoDimensions': true,
            'titleShow':false
        });
    }
    
        $("input.datepicker").datepicker({showOn: 'button', buttonImage: '/global/images/calendar.gif', buttonImageOnly: true,dateFormat: "dd/mm/yy"}, $.datepicker.regional['fr']);
	
	if ($.fn.UIautocomplete) {
		$('.autocompleteEntrepriseOffre').UIautocomplete('destroy').UIautocomplete({
        	'autoFill' : true,
        	'autoFillCallback' : function(res, field) {
        	    $(res).each(function() { 
        	            field.val(this.societe);
        	    });
        	    return false;
        	},
        	'source': function(request, response) {
            	$.ajax({
                	    'url': "/global/module/job/ressources/ajax/ajax_autocomplete_entreprisesOffres.php",
                	    'dataType': "json",
                	    'data': {
                	            'term' : request.term
                	    },
                	    'success': function(data) {
        	                    response(data);
        	            }
        	    });
	        },
	        'minLength': 2
	    });
	}
    if( typeof $().dialog == 'function' )
    $('#div_commentaire_commande').dialog({ 
        autoOpen : false, 
        modal : true, 
        height: 'auto',
        width: '450px',
        buttons: {
            'Ok' : function() {
                supprim_commande($( this ).data("id_vente"))
            },
            'Annuler' : function(){
                $(this).dialog("close");
            }
        },
        close: function() {
            parent.location.reload(true);
        }
    });	
   
});

function visualisationOffre() {
    $.fancybox.showActivity();
    
    var link = "preview=1";
    $('.champ_preview').each( function()
    {
        if( ($(this).is(':visible')) || ($(this).is('textarea')) ) {
            if ($(this).is('.multipleSelect')) {
                $(this).find('.nOption.selected').each(function() {
                    link += "&" + $(this).find('input').attr('name') + "=" + encodeURIComponent($(this).find('input').val());
                });
            }
            else if($(this).attr('type') == 'radio')
            {
                if($(this).is(':checked'))
                {
                    link += "&"+$(this).attr('name')+"="+encodeURIComponent($(this).val());
                }
            }
            else if($(this).attr('type') == 'checkbox')
            {
                if($(this).is(':checked'))
                {
                    link += "&"+$(this).attr('name')+"="+encodeURIComponent($(this).val());
                }
            }
            else
            {
                link += "&"+$(this).attr('name')+"="+encodeURIComponent($(this).val());
            }
        }
    });
    $.ajax({
        type		: "POST",
        cache	: false,
        url		: "/global/module/job/template/detail_offre.php?bypass=ZV6THSFD",
        data	: link,
        success: function(data) {
            $.fancybox(data,{
                'hideOnContentClick': false,
                'autoScale':true,
                'autoDimensions':true,
                'titleShow':false
            });
        }
    });
            return false;
}

function VerifForm() 
{
	document.depot_offre.submit();	
}

function limite_aera(zone,max) 
{
	if(zone.value.length>=max){zone.value=zone.value.substring(0,max);}
}

function get_contactsForRecruteur(id_recrut,id_contact,is_modif)
{
	$.post('/global/module/job/ressources/ajax/ajax_contactsForRecruteur.php', 'id_recrut='+id_recrut+(id_contact?'&id_contact='+id_contact:'')+(is_modif?'&is_modif='+is_modif:''), function (data)
		{
			$('#calque_liste_annonceurs').empty().append(data);
			if($('#calque_liste_annonceurs select').val() > 0 && !is_modif)
				update_contactFields($('#calque_liste_annonceurs select').val());
		}, 'html');
}

function get_fonctions(id_parent,id_fonction)
{
	if(id_parent)
	{
		$.post('/global/module/job/ressources/ajax/ajax_fonctions.php', 'id_parent='+id_parent+(id_fonction?'&id_fonction='+id_fonction:''), function (data)
		{
			$('#calque_liste_fonctions').empty().append(data);
			$('#calque_liste_fonctions').closest('tr').show();
		}, 'html');
	}
	else
	{
		$('#calque_liste_fonctions').empty();
		$('#calque_liste_fonctions').closest('tr').hide();
	}
}

function get_regions(id_parent,id_region)
{
	if(id_parent)
	{
		$.post('/global/module/job/ressources/ajax/ajax_regions.php', 'id_parent='+id_parent+(id_region?'&id_region='+id_region:''), function (data)
		{
			$('#calque_liste_regions').empty().append(data);
			//$('#calque_liste_regions').closest('tr').show();
		}, 'html');
	}
	else
	{
		let scriptCheck = setInterval( () => {
			if (polyglot) {
				clearInterval(scriptCheck);
				$('#calque_liste_regions').empty().append(polyglot.t("job.must_choose_country"));
			}
		}, 200)

	}
}

function get_multi_regions(id_parent,id_region,by_id)
{
	if(id_parent)
	{
		$.post('/global/module/job/ressources/ajax/ajax_multi_regions.php', 'id_parent='+id_parent+(id_region?'&id_region='+id_region:'')+(by_id?'&by_id='+by_id:''), function (data)
		{
			$('#calque_liste_regions').append(data);
	        $('#depoffre_region_' + id_parent).selectMultiple();
		}, 'html');
	}
	else
	{
		let scriptCheck = setInterval( () => {
			if (polyglot) {
				clearInterval(scriptCheck);
				$('#calque_liste_regions').empty().append(polyglot.t("job.must_choose_country"));
			}
		}, 200)
	}
}

function update_contactFields(id_contact)
{
	if (!id_contact)
		return;
	$.post('/global/module/job/ressources/ajax/ajax_contactsDetails.php', 'id_contact='+id_contact, function (data){
		$('#depoffre_nom_contact').val(data['prenom']+' '+data['nom']);
        $('#depoffre_prenom_contact').val(data['prenom']);
        $('#depoffre_fonction_contact').val(data['fonction']);
		$('#depoffre_email_contact').val(data['mail']);
		$('#depoffre_societe').val(data['raison_sociale']);
		$('#depoffre_tel_contact').val(data['tel']);
		$('#depoffre_fax_contact').val(data['fax']);
		$('#depoffre_mob_contact').val(data['mob']);
		}, 'json');
}

function showPostulationOffre()
{
	undoLoader($('#zoneFormulairePostulation'));

	$("#zoneFormulaireEnvoi").slideUp('fast');
	$("#zoneFormulairePostulation").slideDown('fast', function() 
	{
		$("#fancybox-inner").scrollTop($("#fancybox-inner").scrollTop()+500);
	});
}

function showEnvoiMailOffre()
{
	$("#job_offer_postulate").slideUp('fast');
	$("#zoneFormulaireEnvoi").slideDown('fast', function () {
		$('html,body').animate(
			{
				scrollTop: $("#zoneFormulaireEnvoi").offset().top
			}, 'slow');
	});
}

function postulationOffre(offre)
{
	
    var data = $('#formPostulation').serialize();

    makeLoader($('.send-offer-post'));
    $.post('/global/module/job/ressources/ajax/ajax_postulation.php', data,
       function (data)
       {
           undoLoader($('.send-offer-post'));

           if (data)
           {
			   let scriptCheck = setInterval( () => {
				   if (polyglot) {
					   clearInterval(scriptCheck);
					   alertSwal('', 'success', polyglot.t("job.application_sent"));
				   }
			   }, 200)

               $("#job_offer_postulate").remove();
               $(".offer_postulate").remove();
           }
           else
           {
			   let scriptCheck = setInterval( () => {
				   if (polyglot) {
					   clearInterval(scriptCheck);
					   alertSwal('', 'error', polyglot.t("job.error_while_sending"));
				   }
			   }, 200)

           }

           $("#job_offer_postulate").slideUp();
       },
       'json'
    );
	
}

function envoiMailOffre(offre)
{
	var mailDest = $("#dest_mail_offre").val();
	var mailExp = $("#exp_mail_offre").val();
	var mailSujet = $("#sujet_mail_offre").val();
	var mailContenu = $("#contenu_mail_offre").val();
	if(!offre) offre = "";
	if(!mailDest || !mailContenu || !offre)
	{
		let scriptCheck = setInterval( () => {
			if (polyglot) {
				clearInterval(scriptCheck);
				alertSwal('', 'error', polyglot.t("job.informations_missing"));
			}
		}, 200)

	}
	else
	{
		makeLoader($('.sa-button-container'));

		data = "mailExp="+encodeURIComponent(mailExp)+"&mailDest="+encodeURIComponent(mailDest)+"&mailSujet="+encodeURIComponent(mailSujet)+"&mailContenu="+encodeURIComponent(mailContenu)+"&offre="+offre;
		$.ajax({
			url: "/global/module/job/ressources/ajax/mail_offre.php",
			type: "POST",
			data: data,
			success: function(html)
			{
				undoLoader($('.sa-button-container'));

				if(html == "OK")
				{
					alertSwal('', 'success', 'Le mail a bien \351t\351 envoy\351');
					$("#dest_mail_offre").val('');
					$("#contenu_mail_offre").val('');
					$("#zoneFormulaireEnvoi").slideUp();
				}
				else 
				{
					alertSwal('', 'error', html);
				}
			},
			complete : function (data)
			{
				undoLoader($('.sa-button-container'));
			}
		});
	}
}

function ajouteCV(id)
{
	var conteneur = $('.ajouteCV').closest('div');
	var data = "idCV="+id;
	$.ajax({
		url: "/global/module/job/ressources/ajax/ajax_ajouteCV.php",
		type: "POST",
		data: data,
		success: function(html){
			alert(html);
			conteneur.slideUp();
		}
	});
}

function autoCompleteRecruteur(elem, affiche)
{
	if (typeof affiche == "undefined")
		affiche = 0;

	var asso = elem.parents('form').find('select[name="asso"]').size() ? elem.parents('form').find('select[name="asso"]').val() : elem.parents('form').find('input[name="asso"]').val();

	elem.UIautocomplete(
		{
			minLength: 2,
			source: function (request, response)
			{
				$.ajax(
					{
						url: '/global/module/job/ressources/ajax/ajax_autocomplete_entreprises.php?affiche=' + affiche,
						dataType: "json",
						data: {
							q: request.term,
							asso: asso
						},
						success: function (data)
						{
							response($.map(data, function (row)
							{
								return {
									data: row,
									label: row.raison_sociale + (row.ville || row.adresse ? ' (' + row.id_recrut + ')' + '\n' + row.adresse + ' ' + row.ville : ''),
									value: row.raison_sociale,
									id_recrut: row.id_recrut,
									type: row.type,
									adresse: row.adresse,
									adresse_2: row.adresse_2,
									adresse_3: row.adresse_3,
									c_postal: row.c_postal,
									ville: row.ville,
									ville_2: row.ville_2,
									id_pays: row.id_pays,
									tel: row.tel,
									fax: row.fax,
									web: row.web

								}
							}));
						}
					}
				);
			},
			select: function (event, ui)
			{
				if (ui.item.id_recrut && ui.item.id_recrut != "NULL") $("#id_recrut").val(ui.item.id_recrut);
				if (ui.item.type && ui.item.type != "NULL") $("#recruteur_type").val(ui.item.type);
				if (ui.item.adresse && ui.item.adresse != "NULL") $("#recruteur_adresse").val(ui.item.adresse);
				if (ui.item.adresse_2 && ui.item.adresse_2 != "NULL") $("#recruteur_adresse_2").val(ui.item.adresse_2);
				if (ui.item.adresse_3 && ui.item.adresse_3 != "NULL") $("#recruteur_adresse_3").val(ui.item.adresse_3);
				if (ui.item.c_postal && ui.item.c_postal != "NULL") $("#recruteur_cp").val(ui.item.c_postal);
				if (ui.item.ville && ui.item.ville != "NULL") $("#recruteur_ville").val(ui.item.ville);
				if (ui.item.ville_2 && ui.item.ville_2 != "NULL") $("#recruteur_ville_2").val(ui.item.ville_2);
				if (ui.item.id_pays && ui.item.id_pays != "NULL") $("#recruteur_pays").val(ui.item.id_pays);
				if (ui.item.tel && ui.item.tel != "NULL") $("#recruteur_tel").val(ui.item.tel);
				if (ui.item.fax && ui.item.fax != "NULL") $("#recruteur_fax").val(ui.item.fax);
				if (ui.item.web && ui.item.web != "NULL") $("#recruteur_web").val(ui.item.web);
				$(event.currentTarget).val(ui.item.value);

			},
			open: function ()
			{
				$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
			},
			close: function ()
			{
				$(this).removeClass("ui-corner-top ui-corner-all");
			}
		}
	);
}

function loadFormNews(groupe,id_news)
{
	var data = "id_groupe="+groupe;
	if(id_news) data += "&mod_id_news="+id_news;
	$.ajax({
		url: "/global/module/job/template/form_ajout_news.php",
		type: "POST",
		data: data,
		success: function(html){
			$('#zoneFormNews').html(html);
			window.location = "#zoneFormNews";
			
			if (typeof 'displayButton' != 'undefined')
				displayButton();
		}
	});
}

function supprim_commande(id_vente)
{
    $.post("/global/module/job/ressources/ajax/ajax_saveCommentForCommand.php",
        $('#commentaire_commande').serialize()+'&id_vente='+id_vente, function(data){

            if (data == 'ok')
            {
                $("#commentaire_commande_error").hide();
                $("#commentaire_commande_success").fadeOut(function(){$(this).fadeIn();});

            }
            else
            {
                $("#commentaire_commande_success").hide();
                $("#commentaire_commande_error").fadeOut(function(){$(this).fadeIn();});
            }
        }
    ,'html');
}
function fenetre_213(formulaire, modal) {

	rech_as_no_modal("/global/gene/rech_as_no.php?nom_formulaire=" + formulaire, modal);
}

function fenetre_fiche_groupe_recruteur(id_recrut) 
{
   	fen = window.open("/global/module/job/ressources/ajax/ajax_rech_groupe_recruteur.php?id_recrut=" + id_recrut, "", "width=520,height=210,scrollbars=yes");
   	if (!fen.opener) fen.opener = self;
}

function setRecruteurModif(ele, id_recrut, id_type) {
    var element = ele.closest('td');
    var statut = element.find('input').val();
    element.find('img').attr({'src' : "/global/images/ajax-loader.gif"});

    $.ajax(
        {
            url: '/global/module/job/ressources/ajax/ajax_set_statut_modif_recruteur.php',
            type: 'POST',
            async: true,
            data :
            {
                'id_recrut' : (typeof id_recrut != 'undefined' ? id_recrut : ''),
                'id_type' : (typeof id_type != 'undefined' ? id_type : ''),
                'statut' : (typeof statut != 'undefined' ? 1-statut : 0)
            },
            success : 
                function (data) 
                {
                    if (data)
                    {
                        $('#notificationStatutNews').html(data).show()/*.delay(5000).slideUp('fast', function() {})*/;
                        if (statut == 1)
                        {
                            element.find('img').attr({'src' : '/global/images/green_tick_off.png'});
                            element.find('input').val('0');
                        }
                        else
                        {
                            element.find('img').attr({'src' : '/global/images/green_tick.png'});
                            element.find('input').val('1');
                        }
                    }
                }
        }
    );
}

function addFavorisOffre(id_offre) {
    
    $.ajax(
        {
            url: '/global/module/job/ressources/ajax/ajax_offre_favoris.php',
            type: 'POST',
            async: true,
            data :
            {
                'id_offre' : id_offre,
                'action' : 'add'
            },
            success : 
                function (data) 
                {
                    if (data)
                    {
                        $('.add-favoris-'+id_offre).hide();
                        $('.del-favoris-'+id_offre).show();
                    }
                }
        }
    );
}

function delFavorisOffre(id_offre) {
    
    $.ajax(
        {
            url: '/global/module/job/ressources/ajax/ajax_offre_favoris.php',
            type: 'POST',
            async: true,
            data :
            {
                'id_offre' : id_offre,
                'action' : 'del'
            },
            success : 
                function (data) 
                {
                    if (data)
                    {
                        $('.del-favoris-'+id_offre).hide();
                        $('.add-favoris-'+id_offre).show();
                    }
                }
        }
    );
}

function removeFavorisOffre(id_offre, msg) {
    confirmSwal(msg, function(){ 
        delFavorisOffre(id_offre); 
        var nb = $('#nb_offre').html();
        $('#nb_offre').html( nb - 1 );
        $(".row-"+id_offre).slideUp(); 
        return true; 
    });
    return false;
}

function delOffre(id_offre) {
    
    $.ajax(
        {
            url: '/global/module/job/ressources/ajax/ajax_offre.php',
            type: 'POST',
            async: true,
            data :
            {
                'id_offre' : id_offre,
                'action' : 'del'
            },
            success : 
                function (data) 
                {
                    if (data)
                    {
                        
                    }
                }
        }
    );
}

function removeOffre(id_offre, msg) {
    confirmSwal(msg, function(){ 
        delOffre(id_offre); 
        var nb = $('#nb_offre').html();
        $('#nb_offre').html( nb - 1 );
        $(".row-"+id_offre).slideUp(); 
        return true; 
    });
    return false;
}


/********* Upload de photos *************/
function loadBoutonUpload()
{
    if($('#postulation_lettre').length > 0)
	{
		new AjaxUpload($('#postulation_lettre'), {
			action: '/global/module/job/ressources/ajax/upload-postulation.php',
			//Name of the file input box
			name: 'uploadfile_lettre',
			onSubmit: function(file, ext){
				if (! (ext && /^(doc|docx|pdf)$/.test(ext))){
					  // check for valid file extension
					$('#status_lettre').text('Les formats DOC, DOCX et PDF sont autorisés');
                                        $('.add_input').remove();
					return false;
				}
				$('#status_lettre').text('Uploading...');
			},
			onComplete: function(file, response){
				//On completion clear the status
				$('#status_lettre').text('');
				//Add uploaded file to list
				//response = eval(response);
				$('#postulation_lettre').hide();
				$('#status_lettre').html(response);
				$('#lettre_autre').val(file);
                                $('#lettre_autre').trigger('change');
			}
		});
	}
	
	if($('#postulation_cv').length > 0)
	{
		new AjaxUpload($('#postulation_cv'), {
			action: '/global/module/job/ressources/ajax/upload-postulation.php',
			//Name of the file input box
			name: 'uploadfile',
			onSubmit: function(file, ext){
				if (! (ext && /^(doc|docx|pdf)$/.test(ext))){
					  // check for valid file extension
					$('#status_cv').text('Les formats DOC, DOCX et PDF sont autorisés');
                                        $('.add_input').remove();
					return false;
				}
				$('#status_cv').text('Uploading...');
			},
			onComplete: function(file, response){
				//On completion clear the status
				$('#status_cv').text('');
				//Add uploaded file to list
				$('#postulation_cv').hide();
				$('#status_cv').html(response);
				$('#cv_autre').val(file);
                $('#cv_autre').trigger('change');
			}
		});
	}
	
}


function delDocPostulation(elem)
{	
	if(elem)
	{
		var data = "fichier=" + elem.closest('.addCv').find('.docPostulationAutre').val();
		$.ajax({
			url: "/global/module/job/ressources/ajax/deleteDocPostulation.php",
			type: "POST",
			data: data,
			success: function(html){
                $this = elem.closest('.addCv');
				$this.find('.docPostulationAutre').val('');
				$this.find('.uploadDocPostulation').show();
                var txt = $this.find('#add_cv').html();
				$this.find('.statusDocPostulation').text(txt ? txt :'');												
                $('.docPostulationAutre').trigger('change');
			}
		});
	}
}

function deleteFilter(filtre) {
    var elem = $('.job_sidebar').find('.' + filtre);
    if (elem.is(":hidden") && !filtre.match(/periode-/))
        elem.remove();
    else
        elem.attr('checked', false).val('');
    if (filtre.match(/keyword-/)) {
        $("[name=keyword]").val('');
    }

    liveSearch($('form.form_facet'), 0, $('.sort_result').val());
}

function liveSearch(elem, page, sort) {
    
    if( !$('.overlay_job').length)
        $('body').prepend('<div class="overlay_job"><div class="loader" ></div></div>');
    
    $('body').find('.overlay_job').show();
    
    if( typeof page == "undefined")
        page = '0';
    
    if( typeof sorte == "undefined")
        sorte = '';
    
    $.ajax({
        type	: "POST",
        cache	: false,
        url	: "/module/job/ajax/loadresult",
        data	: 'page=' + page + '&sort=' + sort + '&' + elem.serialize(),
        success: function(data) {
            $('.job_result').html(data);
            $('body').find('.overlay_job').hide();
            
            if( page > 0 )
            $('html, body').animate({
                scrollTop: $("#zoneJob_layout").offset().top
            }, 1000);


        }
    });
}
