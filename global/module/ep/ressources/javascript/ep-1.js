function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_displayStatusMsg(msgStr) { //v1.0
  status=msgStr;
  document.MM_returnValue = true;
}

function MM_openBrWindow(theURL,winName,features) { //v2.0
    fen = window.open(theURL,winName,features);
    if (!fen.opener) fen.opener = self;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

var fen = null;

function fenetre_fiche_origine(formulaire) {
	  fen = window.open("/global/gene/rech_origine.php?number=" + formulaire , "", "width=445,height=180,scrollbar=yes");
	 if (!fen.opener) fen.opener = self;
}

function Agrandie(num,legende,larg,haut,id_photo) {
	if(haut>700) {
		rapport=700/haut;
		haut=haut*rapport;
		larg=larg*rapport;
		}
	if(larg<450) {haut2=haut+30;} else {haut2=haut+20;}
		
   browser=window.open('/global/gene/details_diapo.php?numero='+num+'&legende='+legende+'&largeur='+larg+'&hauteur='+haut+'&id_photo='+id_photo,'','width='+larg+',height='+haut2);
   window.onerror = null;
   browser.moveTo ((screen.availWidth )/2-250,20);
   browser.focus();
}

function fenetre_cot_couple(valDuForm) {
	var left = (screen.width/2)-(600/2);
	var top = (screen.height/2)-(500/2);	 		
   fen = window.open("/global/gene/rech_cotisation_couple.php?valDuForm="+valDuForm, "", "width=600,height=500,scrollbars=yes,top="+top+",left="+left);
   if (!fen.opener) fen.opener = self;
}

var remote2=null;

function Active_list(string, show_couple, show_paiement_multiple) 
{
	document.paiement_ce.type_cotise2.value=string;
	if (show_couple == undefined)
		show_couple = false;
	
	if (show_paiement_multiple == undefined)
		show_paiement_multiple = false;

    // See http://mantis.netanswer.fr/view.php?id=35047
    if (string.indexOf("CC") == 0)
        show_couple = true;

	if (show_couple)
	{
		$('tr.conjoint').fadeIn(function () { $(this).find('#cotisation_couple_asno').attr('disabled', false) });
	}
	else
	{
		$('tr.conjoint').fadeOut(function () { $(this).find('#cotisation_couple_asno').attr('disabled', true) });
	}
	
	if (show_paiement_multiple)
	{
		$('tr.paiement_multiple').fadeIn();
	}
	else
	{
		$('tr.paiement_multiple').fadeOut(function () { $(this).find('input[name="paiement_multiple"]').attr('checked', false) });
	}

	if (typeof chang_dynamic_phrase === 'function')
	{
		chang_dynamic_phrase();
	}
}
	
function paiement() {
   window.open('','SPPLUS','width=670,height=535,status=1');
}
function setref()
{
      datejour=new Date();

      datefinjour = datejour.getDate();
      if (datefinjour <=9)
        {datefinjour='0'+datefinjour;}

      datefinmois = datejour.getMonth();
      datefinmois=datefinmois+1;
      if (datefinmois <= 9)
        {datefinmois='0'+datefinmois;}

      datefinannee = datejour.getYear()-2000;
       if (datefinannee <= 9)
        {datefinannee='0'+datefinannee;}
      dateheure=datejour.getHours();
       if (dateheure <= 9)
        {dateheure='0'+dateheure;}
      datemin=datejour.getMinutes();
       if (datemin <= 9)
        {datemin='0'+datemin;}
      datesec=datejour.getSeconds();
       if (datesec <= 9)
        {datesec='0'+datesec;}


      document.paiement_ce.reference.value = ('test'+datefinjour+'/'+datefinmois+'-'+dateheure+':'+datemin+':'+datesec);
      window.setTimeout(setref,1000);
}


function loadCalqueImportLinkedin(elem) {
        
	$.fancybox(
	{
    	'hideOnContentClick': false,
    	'width':900,
    	'height':700,
    	'autoScale':false,
    	'autoDimensions':false,
    	'href':elem.attr('href'),
    	'titleShow':false,
    	'type':'iframe',
        'frameHeight': '100%',
        'frameWidth': '100%',
    	'onClosed': function() {
            parent.location.reload(true);
    	}
	});
	return false;
}

function loadCalqueImport(elem, reload) {
        
	$.fancybox(
	{
    	'hideOnContentClick': false,
    	'width':900,
    	'height':700,
    	'autoScale':false,
    	'autoDimensions':false,
    	'href':elem.attr('href'),
    	'titleShow':false,
    	'type':'iframe',
        'frameHeight': '100%',
        'frameWidth': '100%',
    	'onClosed': function() {
            parent.location.reload(true);
    	}
	});
	return false;
}


function loadCalqueExtranetX(elem) {
	$.fancybox(
	{
    	'hideOnContentClick': false,
    	'width':"90%",
    	'height':"90%",
    	'autoScale':false,
    	'autoDimensions':false,
    	'href':elem.attr('href'),
    	'titleShow':false,
    	'type':'iframe',
        'frameHeight': '100%',
        'frameWidth': '100%',
	});
	return false;
}

function deleteRPX(providerName, elem)
{
	if(providerName)
	{
		var data = "providerName=" + providerName;
		$.ajax({
			type		: "POST",
			cache		: false,
			url		: "/global/module/ep/ressources/ajax/deleteRPX.php",
			data		: data,
			success: function(data) {
				if(data)
				{
					elem.slideUp();
					$('.confirmationRevocation').html(data).delay(3000).fadeOut(2000);					
				}
			}
		});
	}
}

/**************************************************************
 * DEBUT - ENTREPRISE
 */

function searchCompanyNoSite(fromImport, position)
{
    if( position == 'undefined')
        position = 0;
    
    var data = "num=" + $('.numAdresse').val() + "&q=" + encodeURIComponent($('#nomEntrepriseRecherche').val()) + '&pays=' + $('#paysEntrepriseRecherche').val() + '&dep=' + $('#depEntrepriseRecherche').val();
    if( fromImport && fromImport != 'undefined')
        data +=  '&fromImport=1';
    
    data +=  '&position='+position;
    data +=  '&type='+((('#nomEntrepriseRecherche_type_begins').is(':checked'))?$('#nomEntrepriseRecherche_type_begins').val():'0');
    
    $.ajax({
        url: "/global/ressources/ajax/ajax_rechercheEntreprise.php",
        type: "POST",
        data: data,
        success: function(html)
        {
            $('#zoneResultCompany').html(html);
        }
    });
}

function choixEntrepriseNoSite(id,num, fromImport, position)
{
    if(id)
    {
        var data = "id=" + id;
        
        if( fromImport && fromImport != 'undefined' )
        {
            $('#import_id_'+position).append('<input type="hidden" name="adressePro['+position+'][id_entreprise]" value="'+id+'">');
            $('#import_id_'+position).closest('tr').find('.create_entreprise').html('<span style="color:green">Entreprise ajoutée</span>');
            $('#searchCompany').dialog('close');
            return;
        }
        
        $.ajax({
            url: "/global/ressources/ajax/ajax_detailEntreprise.php",
            type: "POST",
            data: data,
            dataType: "json",
            success: function(html)
            {
                var	detail_adresse  = html.adresse + " " + html.adresse_2 + " " + html.adresse_3;
                	detail_adresse += "<br />" + html.c_postal + " " + html.ville + " " + html.ville_2;

                $('#companySelection_'+num).val(html.c_nom);
                $('#naf_'+num).html(html.c_naf);
                $('#siret_'+num).html(html.siret);
                if(html.siret){
                    $('#tr_siret_'+num).show();
                } else {
                    $('#tr_siret_'+num).hide();
                }
                $('#entreprise_'+num).val(html.id_entreprise);
               
                var adresse_pro = "<br />"+html.adresse+' '+html.adresse_2+' '+html.adresse_3;
                adresse_pro += "<br />"+html.c_postal+' '+html.ville+' '+html.ville_2;
                if(html.libelle_pays)
                    adresse_pro += "<br />"+html.libelle_pays;
                
                if(html.c_naf_libelle)
                    adresse_pro += "<br /><b>Naf : </b>"+html.c_naf_libelle;
                if(html.web)
                    adresse_pro += "<br />"+html.web;
                $('#adresse_entreprise_'+num).html(adresse_pro);
                
           }
        });
    }
    $('#searchCompany').dialog('close');
}

function openDialogSearchEntrepriseNoSite(num, nomEntreprise, submit_form, position)
{

	var data = "num=" + num + '&position='+position;
	if( submit_form && submit_form != 'undefined' )
        data += "&submit_form=1";
    if( nomEntreprise && nomEntreprise != 'undefined')
        data += "&nomEntreprise="+encodeURIComponent(nomEntreprise);
	$.ajax({
		type		: "POST",
		cache		: false,
		url			: "/global/ressources/ajax/ajax_rechercheEntrepriseFormulaire.php",
		data		: data,
		success: function(theResponse) {

            if(!$('#searchCompany').size()) {
                $('body').append('<div id="searchCompany"></div>');
            }

	    	$('#searchCompany').dialog({
	    		width : 650,
	    		height: 500,
                buttons: {
	    			"Fermer": function(){ 
	    									$(this).dialog("close");
	    								}
	    		}
	    	}).html(theResponse);
	    	
		}
	});
	
}

function resetEntrepriseNoSite(num)
{
    $('#companySelection_'+num).val('');
    $('#naf_'+num).html('');
    $('#siret_'+num).html('');
    $('#entreprise_'+num).val('');
    $('#adresse_pro_'+num).val('');
    $('#adresse_pro_2_'+num).val('');
    $('#adresse_pro_3_'+num).val('');
    $('#c_postal_pro_'+num).val('');
    $('#ville_pro_'+num).val('');
    $('#ville_pro_2_'+num).val('');
    $('#pays_pro_'+num).val('');
    $('#pays_pro_libelle_'+num).val('');
}

function openDialogCompanyAddNoSite(num, fromImport, position)
{

    $('#searchCompany').dialog('close');
    
	$.ajax({
		type		: "POST",
		cache		: false,
		url			: "/global/ressources/ajax/ajax_entrepriseFormulaire.php",
		success: function(theResponse) {
	
            if(!$('#addCompany').size()) {
                $('body').append('<div id="addCompany"></div>');
            }
            
	    	$('#addCompany').dialog({
                    height: 650,
                    width: 800,
                    modal: false,
                    buttons: { 
	    			
                                "Fermer": function(){ 
                                        $(this).dialog("close");
                                },
                                "Créer": function(){
                                        if(verifFormulaire($(this).find('form')))
                                        {
                                                verifAddPaysNoSite(this, num, fromImport, position);
                                        }
                                }
	    			
	    		}
	    	}).html(theResponse);
	    	
		}
	});
}

function verifAddPaysNoSite(elem, num, fromImport, position)
{
    error = false;

	$("#error_save_company").hide();
	
    
        $('#error_add_company').hide();
        $('#addCompany').append('<div class="ajaxProgression"><center>Enregistrement en cours<br /><img src="/global/images/loading_bar_red.gif" /></center></div>');
        $.post('/global/ressources/ajax/ajax_entrepriseAjout.php', $('#addCompany form').serialize(), function(data){
                $('#addCompany .ajaxProgression').remove();
                
                if (data.statut == '1')
                {
                    
                    if( fromImport && fromImport != 'undefined') {
                        $('#import_id_'+position).append('<input type="hidden" name="adressePro['+position+'][id_entreprise]" value="'+data.idEntreprise+'">');
                        $('#import_id_'+position).closest('tr').find('.create_entreprise').html('<span style="color:green">Entreprise ajoutée</span>');
                        $('#addCompany').dialog('close');
                        return;
                    }
                    /* Nom de l'entreprise */
                    $('#entreprise_'+ num).val(data.idEntreprise);
                    $('#companySelection_' + (num)).val(data.c_nom);

                    /* Adresse */
                    $('#adresse_pro_' + (num)).val(data.adresse);
                    $('#adresse_pro_2_' + (num)).val(data.adresse_2);
                    $('#adresse_pro_3_' + (num)).val(data.adresse_3);

                    /* Code postal */
                    $('#c_postal_pro_' + (num)).val(data.c_postal);

                    /* Ville */
                    $('#ville_pro_' + (num)).val(data.ville);
                    $('#ville_pro_2_' + (num)).val(data.ville_2);

                    /* Pays */
                    $('#pays_pro_' + (num)).val(data.id_pays);
                    $('#pays_pro_libelle_' + (num)).val(data.libelle_pays);
                    
                    $('#naf_' + (num)).html(data.c_naf_libelle);
                    $('#siret_' + (num)).html(data.siret);
                    
                    $('#addCompany').dialog('close');

                }
                if( !data.valid)
					alert(polyglot.t("ep.must_update_address_pro_to_validatte"));

        }, 'json');

}

/**************************************************************
 * DEBUT - ENTREPRISE SITE
 */

function searchCompany(fromImport, position, sirene)
{
    
    $('#zoneResultCompany').html('<img src="/global/images/ajax-loader.gif"/>');
                
    if( position == 'undefined')
        position = 0;    
    if( typeof sirene == 'undefined')
        sirene = 0;

    var ville = $('#ville').val();
    if($('.villeEntrepriseRecherche').val())
		ville = $('.villeEntrepriseRecherche').val();

	var data = "num=" + $('.numAdresse').val() + "&q=" + encodeURIComponent($('#nomEntrepriseRecherche').val()) + '&pays=' + $('#paysEntrepriseRecherche').val()
        + '&dep=' + $('#depEntrepriseRecherche').val() + '&ville=' + ville;

    if( fromImport && fromImport != 'undefined')
        data +=  '&fromImport=1';
    
    data +=  '&position='+position;
    data +=  '&type='+(($('#nomEntrepriseRecherche_type_begins').is(':checked'))?$('#nomEntrepriseRecherche_type_begins').val():'0');
    data +=  '&sirene='+sirene;
    
    $.ajax({
        url: "/global/ressources/ajax/ajax_rechercheEtablissement.php",
        type: "POST",
        data: data,
        success: function(html)
        {
            $('#zoneResultCompany').html(html);
        }
    });
}

function choixEntreprise(id,num, fromImport, position)
{
    if(id)
    {
        var data = "id=" + id;
        
        if( fromImport && fromImport != 'undefined' )
        {
            $('#import_id_'+position).append('<input type="hidden" name="adressePro['+position+'][id_entreprise_site]" value="'+id+'">');
            $('#import_id_'+position).append('<input type="hidden" class="has_entreprise_site" value="1">');
            $('#import_id_'+position).closest('tr').find('.create_entreprise').html('<span style="color:green">Entreprise ajoutée</span>');
            $('#searchCompany').dialog('close');
            return;
        }
        
        $.ajax({
            url: "/global/ressources/ajax/ajax_detailEtablissement.php",
            type: "POST",
            data: data,
            dataType: "json",
            success: function(html)
            {
                var	detail_adresse  = html.adresse + " " + html.adresse_2 + " " + html.adresse_3;
                	detail_adresse += "<br />" + html.c_postal + " " + html.ville + " " + html.ville_2;

				if($('#edit_addr_with_entreprise_site').val()) {

					confirmSwal(
						null,
						function () {
							populateBlocAdresseCoord(num, html);
						},
						polyglot.t("profile.would_you_like_update_your_current_address_interrogation"),
						"info"
					);
				}
                else {
					populateBlocAdresseCoord(num, html);
				}

                $('#companySelection_'+num).val(html.c_nom + ((html.c_nom_site)?', ' + html.c_nom_site:''));
                $('#naf_'+num).html(html.c_naf);
                $('#siret_'+num).html(html.siret);
                if(html.siret){
                    $('#tr_siret_'+num).show();
                } else {
                    $('#tr_siret_'+num).hide();
                }
                $('#entreprise_site_'+num).val(html.id_entreprise_site);

				var adresse_pro = "<br />" + html.adresse + ' ' + html.adresse_2 + ' ' + html.adresse_3;
				adresse_pro += "<br />" + html.c_postal + ' ' + html.ville + ' ' + html.ville_2 + (html.libelle_etat ? ', ' + html.libelle_etat : '');
				if (html.libelle_pays)
					adresse_pro += "<br />" + html.libelle_pays;

				if (html.c_naf_libelle)
					adresse_pro += "<br /><b>Naf : </b>" + html.c_naf_libelle;
				if (html.siret)
					adresse_pro += "<br /><b>SIRET : </b>" + html.siret;
				if (html.web)
					adresse_pro += "<br />" + html.web;
				$('#adresse_entreprise_site_' + num).html(adresse_pro);

				if($('.preview_file_form_pro_' + num).length) {
					if(html.url_logo) {
						$('.preview_file_form_pro_' + num).find('img').attr('src', '/images/logos_entreprises/' + html.url_logo);
						$('.preview_file_form_pro_' + num).find('a').attr('href', '/images/logos_entreprises/' + html.url_logo);
					}
					else {
						$('.preview_file_form_pro_' + num).find('a').remove();
					}
				}

				if(!html.gestionnaires) {
					$('#gestionnaire_entreprise_site_' + num).attr('disabled', false);
				}
				else  {
					$('#gestionnaire_entreprise_site_' + num).attr('disabled', true);
					$('#gestionnaire_entreprise_site_' + num + '.is_gestionnaire').attr('disabled', false);
				}
			}
        });
    }
    $('#searchCompany').dialog('close');
}

function openDialogSearchEntreprise(num, nomEntreprise, submit_form, position, location)
{

	var data = "num=" + num + '&position=' + position;

	if (submit_form && submit_form != 'undefined')
		data += "&submit_form=1";

	if (nomEntreprise && nomEntreprise != 'undefined')
		data += "&nomEntreprise=" + encodeURIComponent(nomEntreprise);

	if (location && typeof location != 'undefined' && location != 'undefined')
		data += "&location_rs=" + encodeURIComponent(location);

	$.ajax({
		type		: "POST",
		cache		: false,
		url			: "/global/ressources/ajax/ajax_rechercheEtablissementFormulaire.php",
		data		: data,
		success: function(theResponse) {

            if(!$('#searchCompany').size()) {
                $('body').append('<div id="searchCompany"></div>');
            }

	    	$('#searchCompany').dialog({
	    		width : 650,
	    		height: 500,
                buttons: {
	    			"Fermer": function(){ 
	    									$(this).dialog("close");
	    								}
	    		}
	    	}).html(theResponse);
	    	
		}
	});
	
}

function resetEntreprise(num)
{
    $('#companySelection_'+num).val('');
    $('#naf_'+num).html('');
    $('#siret_'+num).html('');
    $('#entreprise_site_'+num).val('');
    $('#adresse_pro_'+num).val('');
    $('#adresse_pro_2_'+num).val('');
    $('#adresse_pro_3_'+num).val('');
    $('#c_postal_pro_'+num).val('');
    $('#adresse_pro').val('');
    $('#adresse_pro_2').val('');
    $('#adresse_pro_3').val('');
    $('#c_postal_pro').val('');
    $('#ville_pro').val('');
    $('#pays_pro').val('');
    $('#ville_pro_'+num).val('');
    $('#ville_pro_2_'+num).val('');
    $('#pays_pro_'+num).val('');
    $('#pays_pro_libelle_'+num).val('');
	$("#adresse_entreprise_site_"+num).html('');
	$("#adresse_entreprise_site2_"+num).html('');
}

function openDialogCompanyAdd(num, fromImport, position, siret)
{   
    $("#openDialogCompanyAdd").prop('disabled', true);
    $(".select_siren").prop('disabled', true);

	$.ajax({
		type		: "POST",
		cache		: false,
		url			: "/global/ressources/ajax/ajax_etablissementFormulaire.php?siret="+siret,
		success: function(theResponse) {

            $('#searchCompany').dialog('close');
	
            if(!$('#addCompany').size()) {
                $('body').append('<div id="addCompany"></div>');
            }
            
	    	$('#addCompany').dialog({
                    height: 650,
                    width: 800,
                    modal: false,
                    buttons: { 
	    			
                                "Fermer": function(){ 
                                        $(this).dialog("close");
                                },
                                "Créer": function(){
                                    $("[name^=addCompAdresse]").removeClass('in_error');
                                    if (!$("[name=addCompAdresse]").val() && !$("[name=addCompAdresse2]").val() && !$("[name=addCompAdresse3]").val()) {
                                        $("[name^=addCompAdresse]").addClass('in_error');
                                        return false;
                                    }

                                        if(verifFormulaire($(this).find('form')))
                                        {
                                                verifAddPays(this, num, fromImport, position);
                                        }
                                }
	    			
	    		}
	    	}).html(theResponse);

			setTimeout(function(){
				if (typeof initCoordAutocompleteIA == 'function')
					initCoordAutocompleteIA();

			},100);
	    	
		}
	});
	/*
                $('#addCompany input').val('');
                if ($('#addCompany li.token-input-token') && $('#addCompany li.token-input-token').size())
                        $('#addCompany li.token-input-token').remove();
                $('#addCompany li.token-input-input-token input').show();
                $('#addCompany').find('input').css('background-color', '#ffffff');
                $('#error_add_company').hide();
                $('#addCompany .numAdresseAdd').val(num);
                $('#addCompany').dialog('open');*/

}

function verifAddPays(elem, num, fromImport, position)
{
    error = false;

	$("#error_save_company").hide();
	
    
        $('#error_add_company').hide();
        $('#addCompany').append('<div class="ajaxProgression"><center>Enregistrement en cours<br /><img src="/global/images/loading_bar_red.gif" /></center></div>');
        $.post('/global/ressources/ajax/ajax_etablissementAjout.php', $('#addCompany form').serialize(), function(data){
                $('#addCompany .ajaxProgression').remove();

			if (data.statut == '1')
			{
				if (fromImport && fromImport != 'undefined')
				{
					$('#import_id_' + position).append('<input type="hidden" name="adressePro[' + position + '][id_entreprise_site]" value="' + data.idEntreprise + '">');
					$('#import_id_' + position).append('<input type="hidden" class="has_entreprise_site" value="1">');
					$('#import_id_' + position).closest('tr').find('.create_entreprise').html('<span style="color:green">Entreprise ajoutée</span>');
					$('#addCompany').dialog('close');
					return;
				}

				populateBlocAdresse(num, data);


				if($('#edit_addr_with_entreprise_site').val()) {

					confirmSwal(
						null,
						function () {
							populateBlocAdresseCoord(num, data);
						},
						polyglot.t("profile.would_you_like_update_your_current_address_interrogation"),
						"info"
					);
				}
				else {
					populateBlocAdresseCoord(num, data);
				}

				$('#gestionnaire_entreprise_site_' + num).attr('disabled', false);
				//On met gestionnaire à Oui par défaut
				$('#gestionnaire_entreprise_site_' + num).val(1);
                    
				$('#addCompany').dialog('close');
			}

			if( !data.valid)
				alert(polyglot.t("ep.must_update_address_pro_to_validatte"));

        }, 'json');

}

function populateBlocAdresseCoord(num, data) {
	/* Adresse */
	$('#adresse_pro_' + (num)).val(data.adresse);
	$('#adresse_pro_2_' + (num)).val(data.adresse_2);
	$('#adresse_pro_3_' + (num)).val(data.adresse_3);

	/* Code postal */
	$('#c_postal_pro_' + (num)).val(data.c_postal);

	/* Ville */
	$('#ville_pro_' + (num)).val(data.ville);
	$('#ville_pro_2_' + (num)).val(data.ville_2);

	/* Pays */
	$('#pays_pro_' + (num)).val(data.id_pays);
	$('#pays_pro_libelle_' + (num)).val(data.libelle_pays);

	$('#etat_pro_'+num).val(data.id_etat);
}

function populateBlocAdresse(num, data) {
	/* Id entreprise */
	$('#entreprise_site_' + (num )).val(data.idEntreprise);

	/* Nom de l'entreprise */
	$('#companySelection_' + (num)).val(data.c_nom);


	$('#naf_' + (num)).html(data.c_naf_libelle);
	$('#siret_' + (num)).html(data.siret);
	$('#tel_pro_' + (num)).html(data.tel);
	$('#fax_pro_' + (num)).html(data.fax);


	if ($('#adresse_entreprise_site_' + num).size())
	{
		var adresse_pro = "<br />" + data.adresse + ' ' + data.adresse_2 + ' ' + data.adresse_3;
		adresse_pro += "<br />" + data.c_postal + (data.ville ? ' ' + data.ville : '') + (data.ville && data.ville_2 ? ' ' : '') + (data.ville_2 ? ' ' + data.ville_2 : '') + (data.libelle_etat ? ', ' + data.libelle_etat : '');
		adresse_pro += "<br />" + data.libelle_pays;

		if (data.c_naf_libelle)
			adresse_pro += "<br /><b>Naf : </b>" + data.c_naf_libelle;
		if (data.siret)
			adresse_pro += "<br /><b>SIRET : </b>" + data.siret;
		if (data.web)
			adresse_pro += "<br /> <b>Site web : </b>" + data.web;
		$('#adresse_entreprise_site_' + num).html(adresse_pro);
	}
}

function validateCompany(elem, num, forced) {

	if(verifFormulaire($(elem).closest('form')))
	{
		$(elem).closest('div').find('img').show();
		$.post('/global/ressources/ajax/ajax_validateCompanySite.php', $(elem).closest('form').serialize()+((typeof forced != "undefined") ? "&forced=1": ""), function(data) {
			//console.log(html);

			$(elem).closest('div').find('img').hide();

			if (data.statut) {
				$('#confirmation_save_company').show().delay(2000).queue(function() {
					populateBlocAdresse(num, data);

					if($('#edit_addr_with_entreprise_site').val()) {

						confirmSwal(
							null,
							function () {
								populateBlocAdresseCoord(num, data);
							},
							polyglot.t("profile.would_you_like_update_your_current_address_interrogation"),
							"info"
						);
					}
					else {
						populateBlocAdresseCoord(num, data);
					}

					$.fancybox.close();
				});
			}
			else {
				$('#error_save_company').show();
			}
			return false;
		});
	}
}

/**************************************************************
 * FIN - ENTREPRISE SITE
 */

function checkAdresseExiste(item,perso, pro)
{
    if(item)
    {
        switch(item)
        {
            case '3':
                if(!perso) 
                {
                    alert(polyglot.t("ep.not_entered_personal_address_2"));
                    $('#contact').val(1);
                }
                break;
            case '4':
                if(!pro) 
                {
					alert(polyglot.t("ep.not_entered_business_address_2"));
                    $('#contact').val(2);
                }
                break; 
                    
            default :
                return true;
            break;
        }
    }
}

function move_input_conjoint(elem)
{
	var row_conjoint = $('tr.conjoint');
	elem.parents('tr.cotisation').after(row_conjoint);
	elem.parents('tr.cotisations').after(row_conjoint);
}


function validePerduVue(as_no)
{
    var form_perdu = $('#formulaire_' + as_no);
    var name = $.trim(form_perdu.parents('.row-lost').find('#formDestName' + as_no).text());

    var email = form_perdu.find('.email.required').val();
    var place = email.indexOf("@",1);
    var point = email.indexOf(".",place+1);
    if ((place == -1) || (email.length <= 2) || (point <= 1))
    {
		var msg = polyglot.t("ep.you_must_enter_a_valid_email_to_receive_notifying");
        alert(  msg.replace('%name%', name));
    }
    else
    {
        var data = form_perdu.serialize();
        makeLoader(form_perdu);
        form_perdu.parents('.row-lost').find('.lien_divers').hide();
        $.post('/global/module/ep/ajax/validePerduVue.php', data,
            function (data)
            {
                undoLoader(form_perdu);
                form_perdu.parents('.row-lost').remove();

				var msg = polyglot.t("ep.ep.email_will_be_sent_after_validation");
				alert(  msg.replace('%name%', name));
            }
        )
    }
}

function suggestUpdate(element, callback) {
    let form = element.closest("form");
    const itemId = form.itemId.value;
    const suggestion = form.suggestion.value;
    if (suggestion == null || suggestion === '') {
        form.suggestion.classList.add("messageBoxEditor-error");
        return false;
    }
    const data = new FormData();
    data.append("data", JSON.stringify({
        "itemId": itemId,
        "suggestion": suggestion
    }));
    fetch("/global/module/ep/ajax/suggestUpdate.php", {
        method: "POST",
        body: data
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            $(form).find('p').css("display", "block");
            $(form).find('textarea').css("display", "none");
            $(form).find('.msgBoxEditorButtons').css("display", "none");
            callback();
        });
}

function initSuggestionBox() {
    $('div#data_suggestion p').css("display", "none");
    $('div#data_suggestion textarea').css("display", "block").removeClass('messageBoxEditor-error').val("");
    $('div#data_suggestion .msgBoxEditorButtons').css("display", "block");
}

function deleteComment(element, commentId) {
    $(element).closest('div').find('i').removeClass('fa-trash');
    $(element).closest('div').find('i').addClass('fa-spinner fa-pulse');
    fetch("/global/module/ep/ajax/suggestUpdate.php?id=" + commentId, {
        method: "PUT"
    })
        .then(function(response) {
            if (response.ok) {
                $(element).closest('div').hide('slow', function(){ $(element).closest('div').remove(); });
            }
        });
}

function profilTooltip(elem) {
	if( !elem.find('.profil-tooltip').hasClass('activeTooltip')) {

		if(elem.data('asno') && elem.data('type') && elem.data('field')) {
			var thiis = elem;
			$.post('/global/module/ep/ressources/ajax/ajax_get_phone.php',
				   {'as_no' : elem.data('asno'), 'type' : elem.data('type'), 'field' : elem.data('field'), 'ordre' : elem.data('ordre')},
				   function(data){
					   thiis.find('.profil-tooltip').html(data);
				   }
			);
		}
		$('.profil-tooltip.activeTooltip').removeClass('activeTooltip');
		elem.find('.profil-tooltip').addClass('activeTooltip')
	} else {
		elem.find('.profil-tooltip').removeClass('activeTooltip')
	}
}

$( function(){

	if( $('.profil-tooltip-action.action-clic').length ){

		$('.profil-tooltip-action.action-clic').click( function(){
			profilTooltip($(this));
		});
	}

	if( $('.edit,.profil-tooltip-action').length ){
		if(!!('ontouchstart' in window) ){
		        $('.edit,.profil-tooltip-action:not(".action-clic")').click( function(){
                                $('.activeTooltip').removeClass('activeTooltip');
                                $(this).find('.profil-tooltip').addClass('activeTooltip')
                        });
			$('.edit,.profil-tooltip-action.action-clic').click( function(){
				profilTooltip($(this));
			});
		} else {

			$('.edit,.profil-tooltip-action:not(".action-clic")').hover( function(){
				$('.activeTooltip').removeClass('activeTooltip');
				$(this).find('.profil-tooltip').addClass('activeTooltip')
			}, function(){
				$(this).find('.profil-tooltip').removeClass('activeTooltip')
			});
		}
	}

	if( $('table.tabform').length && $(window).width() < 560 ){
		var elem = $('table.tabform');
		elem.each( function(){
			var tr = $('tr', $(this));
			var th = $('th' , tr[0]);
			tr.each( function(i,v){
				if($('td' , $(this)).length) {
					$('td' , $(this)).each( function(i2,v2){

					   if($(this).has('select').length) {
						var opt = $('select option' , this).eq(0);
						if(opt.text() == '' ){
							if(th[i2]) {
								opt.text($(th[i2]).text());
							} else {
								opt.text($(this).parents('.valeur').prev('.libelle').text());
							}
						}
					   } else {
							var opt = $('input[type="text"]' , this);
							if(opt.attr('placeholder') == '' ){
								if(th[i2]) {
									opt.attr('placeholder', $(th[i2]).text());
								} else {
									opt.attr('placeholder', $(this).parents('.valeur').prev('.libelle').text());
								}
							}
					   }
					})
				}
			});
		})
	}


});
