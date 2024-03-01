var menuskin=1
var display_url=0

var opt_no_frames = false;
var opt_integrated_mode = false;

test=0;

function VerifForm_nl(form_name)
{
	if (typeof form_name == 'undefined')
		form = document.formu_nl;
	else
		form = document.getElementsByName(form_name)[0];

	if (typeof adresse == 'undefined')
		adresse = form.email_nl.value;
	var place = adresse.indexOf("@", 1);
	var point = adresse.indexOf(".", place + 1);
	if ((place > -1) && (adresse.length > 2) && (point > 1))
	{
		form.submit();
	}
	else
	{
		alert('Entrez une adresse e-mail valide !');
	}
}

function VerifForm_erevue()
	{
	adresse = document.formu_erevue.email_nl.value;
	var place = adresse.indexOf("@",1);
	var point = adresse.indexOf(".",place+1);
	if ((place > -1)&&(adresse.length >2)&&(point > 1))
		{document.formu_erevue.submit();}
	else
		{alert('Entrez une adresse e-mail valide !');}
	}

function ZyVa() {
	remoteWin=window.open('','remoteWin','width=268,height=110,marginwidth=0,marginheight=0,resizable=no,scrollbars=no')
if (remoteWin != null)
	{
	remoteWin.toto = parent;
	remoteWin.location = "chg_couleur.php3";
	}
}

var remote2=null;

function ZyVa2() {
	remote2=window.open('','remote2','width=400,height=120,marginwidth=0,marginheight=0,resizable=no,scrollbars=no')
if (remote2 != null)
	{
	remote2.toto = self;
	remote2.location = "telecom3.htm";
	}
}

function FW_OpenWindow(theURL,features) {
  window.open(theURL,'Detail',features);
}

function showmenuie5(){
var rightedge=document.documentElement.clientWidth - event.clientX - ie5menu.offsetParent.offsetLeft
var bottomedge=document.documentElement.clientHeight - event.clientY - ie5menu.offsetParent.offsetTop

if (rightedge<ie5menu.offsetWidth)
	ie5menu.style.left=document.documentElement.scrollLeft + event.clientX - ie5menu.offsetWidth - ie5menu.offsetParent.offsetLeft
else
	ie5menu.style.left=document.documentElement.scrollLeft + event.clientX - ie5menu.offsetParent.offsetLeft;

if (bottomedge<ie5menu.offsetHeight)
	ie5menu.style.top=document.documentElement.scrollTop + event.clientY - ie5menu.offsetHeight - ie5menu.offsetParent.offsetTop
else
	ie5menu.style.top=document.documentElement.scrollTop + event.clientY - ie5menu.offsetParent.offsetTop

ie5menu.style.visibility="visible"
return false
}

function hidemenuie5(){
	ie5menu.style.visibility="hidden"
}

function highlightie5(){if (event.srcElement.className=="menuitems"){
	event.srcElement.style.backgroundColor="highlight"
	event.srcElement.style.color="white"
	if (display_url==1)
	window.status=event.srcElement.url
	}
}

function lowlightie5(){
	if (event.srcElement.className=="menuitems"){
	event.srcElement.style.backgroundColor=""
	event.srcElement.style.color="black"
	window.status=''
	}
}

function jumptoie5(){
	if (event.srcElement.className=="menuitems"){
		if (event.srcElement.getAttribute("target")!=null)
		window.open(event.srcElement.url,event.srcElement.getAttribute("target"))
	else
		window.location=event.srcElement.url
	}
}

function personalise(string) {
	document.FormEditeur.ContenuEditeur.value=document.FormEditeur.ContenuEditeur.value+'|%'+string+'%|';
	document.FormEditeur.Contenu_texte.value=document.FormEditeur.Contenu_texte.value+'|%'+string+'%|';
	}

function MM_callJS(jsStr) { //v2.0
  return eval(jsStr)
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v3.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document); return x;
}

//Correction de la fonction apporté par Mohammed. (EI - 22/09/10)
function MM_showHideLayers() { //v6.0
    var i,p,v,obj,args=MM_showHideLayers.arguments;
    for (i=0; i<(args.length-2); i+=3) if ((obj=document.getElementById(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }
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
  window.open(theURL,winName,features);
}

var win=null;
function openfenetre(mypage,myname,w,h,scroll,pos){
	if(pos=="random"){LeftPosition=(screen.width)?Math.floor(Math.random()*(screen.width-w)):100;TopPosition=(screen.height)?Math.floor(Math.random()*((screen.height-h)-75)):100;}
	if(pos=="center"){LeftPosition=(screen.width)?(screen.width-w)/2:100;TopPosition=(screen.height)?(screen.height-h)/2:100;}
	else if((pos!="center" && pos!="random") || pos==null){LeftPosition=0;TopPosition=20}
	settings='width='+w+',height='+h+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=yes';
	win=window.open(mypage,myname,settings);
	}


function check_log_jquery()
{

/*	if ($("#form_std input:text").empty()) {
//		$("#boiteConnexion").animate( { background-color:"#F4DEC3" }, { queue:false, duration:1000 });
//		$("#errorlogin").fadein();
		$("#boiteConnexion input:text").css("background-color", "#F3CD4E");
	}
	if ($("#form_std input:password").empty()) {
		$("#boiteConnexion input:password").css("background-color", "#F4D3CE");
//		alert("Merci de renseigner le champ Mot de passe");
	}
	else
		document.getElementsById("form_std").submit();

*/
	check_log(1);
}

/*
 * DEPRECATED : Call NA_check_log() instead
 */
function check_log(etape) {
	var formu = (etape == 1 ? document.formulaire_login1 : document.formulaire_login3);

	if (formu.login_s.value=="")
	{
		alert(polyglot.t("profile.please_enter_your_login"));
		formu.login_s.focus();
		return false;
	}
	else if (formu.pswd_s.value=="")
	{
		alert(polyglot.t("profile.please_enter_your_password_exclamation"));
		formu.pswd_s.focus();
		return false;
	}
	else
	{
		var password = formu.pswd_s.value;
        
        var md5pass = $("[name=pswd_s]").data('md5');
        if (typeof md5pass == 'undefined' || md5pass == 1)
		    formu.password_c.value = md5(password);
        else
		    formu.password_c.value = password;

		//alert(password);
		formu.pswd_s.value = "";
		//formu.submit();

		return true;
	}
}

function verif_url(url) {
	var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
	if (regexp.test(url) == false)
		alert(polyglot.t("profile.please_enter_valid_url_exclamation"));
	return regexp.test(url);
}

function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);

function ZyVanamail1() {
	remotenamail1=window.open('','namail1','width=800,height=600,resizable=yes,status=1,scrollbars=yes')
	if (remotenamail1 != null) {
		remotenamail1.toto = self;
	}
}

function fenetre_fiche_histopro(as_no,adresse) {
	fen = window.open("/gene/stock_adresse_pro.php?as_no_stock=" + as_no + "&adresse_stock=" + adresse , "", "width=700,height=500,scrollbar=yes");
	if (!fen.opener) fen.opener = self;
}

function fenetre_fiche_histopro_view(as_no) {
	fen = window.open("/gene/view_stock_adresse_pro.php?as_no_stock=" + as_no, "", "width=700,height=500,scrollbars=yes");
	if (!fen.opener) fen.opener = self;
}
function limite_aera(zone,max) {
	if(zone.value.length>=max){zone.value=zone.value.substring(0,max);}
}

function Agrandie(num,legende,larg,haut,id_photo) {
	if(haut>700) {
		rapport=700/haut;
		haut=haut*rapport;
		larg=larg*rapport;
		}
	if(larg<450) {haut2=haut+30;} else {haut2=haut+20;}

   browser=window.open('details_photo.php?numero='+num+'&legende='+legende+'&largeur='+larg+'&hauteur='+haut+'&id_photo='+id_photo,'','width='+larg+',height='+haut2);
   window.onerror = null;
   browser.moveTo ((screen.availWidth )/2-250,20);
   browser.focus();
}

/**********************************************
			Affichage d'une page
***********************************************/

function Affiche_popup(large, haut, type, id, groupe, ecole, espace, title)
{
    var data = "type=" + type + "&groupe=" + groupe + "&ecole=" + ecole + "&espace=" + espace;

    $.post("/global/ressources/template/recup_contenu_popup_ajax.php", data,
        function (theResponse)
        {
            $('#dialog-alert').dialog(
                {
                    title: title != undefined ? title : '',
                    height: haut,
                    width: large,
                    modal: true

                }
            ).html(theResponse);
			$('.ui-dialog').removeClass('ui-widget-content').addClass('ui-widget-content-modal');
			$('.ui-widget-content-modal').css({
					"height": haut + "px",
					"background": "url('images/ui-bg_spotlight_0_ffffff_600x600.png') 50% 2% repeat-x rgb(255, 255, 255)",
					"color": "rgb(52, 73, 94)"
			});
    });
}
/*****************************************/


function show_menu_groupe(id) {
	if(!id) id=0;

	for(i=1;i<=5;i++) {
		if(document.getElementById('niveau1_groupe_'+i)) {
			if(id == i) {
				if(document.getElementById('zoneSousMenu_groupe_'+i).style.display!='block') {
					document.getElementById('niveau1_groupe_'+i).style.display='block';
					hauteur_cellule = document.getElementById('niveau1_groupe_'+i).offsetHeight;
					document.getElementById('niveau1_groupe_'+i).style.marginTop=-hauteur_cellule+"px";
					if(i==5)
						document.getElementById('zoneSousMenu_groupe_'+i).style.marginLeft = -79+"px";
					document.getElementById('zoneSousMenu_groupe_'+i).style.height=hauteur_cellule+"px";
					timerMenu = setTimeout("derouler_groupe("+i+")",10);
				}
			} else {
				document.getElementById('niveau1_groupe_'+i).style.display='none';
				document.getElementById('zoneSousMenu_groupe_'+i).style.height=0;
			}
		}
	}
}

function derouler_groupe(id) {
	//hauteur_cellule = document.getElementById('niveau1_'+id).offsetHeight;
	position = parseInt(document.getElementById('niveau1_groupe_'+id).style.marginTop.substring(0,(document.getElementById('niveau1_groupe_'+id).style.marginTop.length - 2)));
	if(position < -10) {
		document.getElementById('niveau1_groupe_'+id).style.marginTop = (position + 10)+"px";
		timerMenu = setTimeout("derouler_groupe("+id+")",10);
	} else {
		document.getElementById('niveau1_groupe_'+id).style.marginTop = 0+"px";
		clearTimeout(timerMenu);
	}
}



// initialise les menues déroulants (basé sur jquery)
function init_menus() {

	// On modifie l'evenement "click" sur les liens dans les items de liste
	// qui portent la classe "toggleSubMenu" :
	$("div.menuSecondaireLienElem > a").mouseover( function () {

		// Si le sous-menu etait deja ouvert, on le referme :
		if ($(this).next("div.menu3niv:visible").length != 0) {
			$(this).next("div.menu3niv").slideUp("normal", function () { $(this).parent().removeClass("open") } );
		}
		// Si le sous-menu est cache, on ferme les autres et on l'affiche :
		else {
			$("div.menu3niv").slideUp("normal", function () { $(this).parent().removeClass("open") } );
			$(this).next("div.menu3niv").slideDown("normal", function () { $(this).parent().addClass("open") } );
		}
		// On empêche le navigateur de suivre le lien :
		return false;

	});
} // function init_menus

function addEvent(source, type, callback) {
  // fonction d'abstraction pour enregistrer un gestionnaire d'evenement
  // source : objet sur lequel ajouter le gestionnaire d'evenement
  // type : type d'evenement
  // callback : fonction qui traitera l'evenement
  if (source.addEventListener){		// code standard DOM
    source.addEventListener(type, callback, false);
    return true;
  } else if (source.attachEvent){ 	// code propriétaire MSIE
    var r = source.attachEvent("on"+type, callback);
    return r;
  } else {        	// code navigateur sans support DOM-event
    eval('source.on' + type + '= callback') ;
  }
}

addEvent(window, 'load', init_menus);

function updatePres(contener)
{
	if (!contener)
		contener = '';
	else
		contener = contener+' ';
	$(contener+'.ui-state-default').css('cursor', 'pointer').hover(function(){$(this).addClass('ui-state-hover');},
									function(){$(this).removeClass('ui-state-hover');});
}

function showProfile(alias)
{
	window.location = "/profil/" + alias;
}

function dialog_alert(titre,contenu,width,height)
{
	if(!titre) titre = "Alerte";
	if(!contenu) contenu = "";
	if(!width) width = 300;
	if(!height) height = 150;

	$('#dialog-alert').attr('title',titre);
	$('#dialog-alert').html(contenu);
	$('#dialog-alert').dialog({
		modal: true,
		width: width,
		height: height
	});
}

function val_abs(valeur){

	valeur = Math.abs(valeur);

	return valeur;

}

function is_nan(valeur, valeur_defaut){

	if(!valeur_defaut) valeur_defaut = 0;

	if(isNaN(valeur)){

		valeur = valeur_defaut;
	}

	return valeur;

}

// Fonction pour la validation des formulaires
function verifFormulaire(formulaire, display_error)
{
    //indicatif tel
    if( formulaire.find('.telInput').length ) {
        formulaire.find('.telInput').each( function(){
            if( $(this).parent().parent().find('.indicatifTelInput').length) {
                $(this).parent().parent().find('.indicatifTelInput').val($(this).intlTelInput("getNumber"));
            }
        });
    }

	var error_forumlaire = false;
    var error_email = false;

	var lang_selected = undefined;

	if( typeof langue_selected != 'undefined')
		lang_selected = langue_selected;

	if (typeof lang_selected == 'undefined')
	{
		if ($('#langue_selected').length && $('#langue_selected').val())
			lang_selected = $('#langue_selected').val();
		else
			lang_selected = '';
	}

	var list_error = [];

	formulaire.find('.in_error').removeClass('in_error');

	formulaire.find('.obligatoire').each( function(){

		if (!$(this).is(':visible'))
		{
			return;
		}

		if ($(this).is('.multipleSelect'))
		{
			if (!$(this).find('.nOption input:checked').size())
			{
				$(this).removeClass('in_ok').addClass('in_error');
				error_forumlaire = true;
			}
			else if (!$(this).is('.verif-mail'))
			{
				$(this).removeClass('in_error');
			}
		}
		else if ($(this).is('.tinymce_emploi, .tinymce_mail, .tinymce, .tinymce_all'))
		{
			var id_span = $(this).attr('id');
			var html_span = $("#" + id_span + "_ifr").contents().find('body').html();

			if (id_span && ( html_span == '<p><br mce_bogus="1"></p>' || html_span == '<p><br _mce_bogus="1"></p>' || html_span == '<p><br></p>' || html_span == '<p><br data-mce-bogus="1"></p>' ))
			{
				$("#" + id_span + "_ifr").closest('td').removeClass('in_ok').addClass('in_error');
				error_forumlaire = true;
			}
			else if (!$(this).is('.verif-mail'))
			{
				$("#" + id_span + "_ifr").closest('td').removeClass('in_error');
			}
		}
		else if ($(this).is('.simple-search'))
		{
            var id = $(this).attr("id");
            if (id) {
			    id = id.replace('s2id_', '')
                if ($("#s2id_" + id).size())
			    {
				    if (!$(this).select2('data'))
				    {
					    $("#s2id_" + id).addClass('in_error');
					    error_forumlaire = true;
				    }
				    else
					    $("#s2id_" + id).removeClass('in_error');
			    }
			    else
			    {
				    return true;
			    }
            }
		}
		else if( $(this).hasClass('radio_mandatory'))
		{

			var error_forumlaire_tmp = true;
			$(this).find("[type='radio']").each(function () {

				if( $(this).is(':checked') ) {
					error_forumlaire_tmp = false;
				}
			});

			if( error_forumlaire_tmp ) {
				$(this).addClass('in_error');
				error_forumlaire = error_forumlaire_tmp;
			} else {
				$(this).removeClass('in_error');
			}
		}
		else if($(this).hasClass('checkbox_mandatory'))
		{
			var error_forumlaire_tmp = true;
			$(this).find("[type='checkbox']").each(function () {
				if( $(this).is(':checked') ) {
					error_forumlaire_tmp = false;
				}
			});

			if( error_forumlaire_tmp ) {
				$(this).addClass('in_error');
				error_forumlaire = error_forumlaire_tmp;
			} else {
				$(this).removeClass('in_error');
			}
		}
		else if($(this).hasClass('checkbox_mandatory_inline'))
		{
			var error_forumlaire_tmp = true;
			$(this).find("[type='checkbox']").each(function () {
				if( $(this).is(':checked') ) {
					error_forumlaire_tmp = false;
				}
			});

			if( error_forumlaire_tmp ) {
				$(this).addClass('error');
                                $(this).find('a').each(function() {
                                    $(this).addClass('error');
                                })
                                
				error_forumlaire = error_forumlaire_tmp;
			} else {
				$(this).removeClass('error');
                                $(this).find('a').each(function() {
                                    $(this).removeClass('error');
                                })
			}
		}
		else
		{
			var val = $(this).val();
			if($(this).hasClass('not-accept-0') && val === '0')
				val = '';

			if (!val && !($(this).hasClass('accept-0') && val === 0) )
			{
				if ($(this).is(":visible"))
				{
					$(this).removeClass('in_ok').addClass('in_error');
					error_forumlaire = true;
					list_error.push($(this).data('libelle'))
				}
			}
			else if (!$(this).is('.verif-mail'))
			{
				$(this).removeClass('in_error');
			}
			else if ($(this).is('.verif-mail')) {
				error_email = true;
			}
		}
	});

	if(error_forumlaire)
	{
        var title;
        var msg;

        title = polyglot.t("core.error");
        msg = polyglot.t("profile.please_fill_mandatory_fields");

        if( typeof display_error != 'undefined' && display_error && list_error.length ) {
			msg += "<div style='text-align:left;margin-left:45px;'>";
			list_error.forEach(function(entry) {

				msg += "<br /> - " + entry;
			});
			msg += "</div>";
		}
        
        confirmSwal(title, function() { $.fancybox.hideActivity();}, msg, '', true, false,'#8CD4F5' );
        return false;
        
        //sweetAlert( title ,  msg );
        //return false;
        
        swal(
            {
                title: title,
                text: msg,
                type: typeof type != 'undefined' ? type : '',
                showCancelButton: false,
                confirmButtonText: "Ok",
                confirmButtonColor: "#8CD4F5",
                closeOnConfirm: true
            },
            function ()
            {
                if ( $('#fancybox-content').length > 0 )
                    $.fancybox.hideActivity();
            }
        );
        return false;
        
    }
    else if (error_email) {
        var msg;
        msg = polyglot.t("profile.email_incorrect");
		dialog_alert('Erreur','<p style="text-align:center;">'+msg+'</p>');
		return false;                
    }
	else if (formulaire.find('input[type="text"][name*="mail"][value!=""].in_error').size())
	{
		var msg;
        msg = polyglot.t("profile.email_incorrect_sure_continue");
		return confirm(msg);
	}
	else
	{
		return true;
	}
}

/*****************
 * Transforme les liens makeButton en bouton jquery
 ****************/
function displayButton()
{
	$(".makeButton").not('.ui-button').each(function() {
        $(this).button({
        	icons: {
            	primary: $(this).attr("icon"),
            	secondary: $(this).attr("iconRight")
        	},
        	text : $(this).html()
        }).removeAttr("icon").removeAttr("iconRight").removeClass("makeButton");
    });
}

function display_profile(alias, type_visu)
{
	var publication = 0;
	var publication_site = 0;

	// Début : Préparation du tableau
	var x = new Array();
	var a = new Array();

	$("form[name=formulaire_maj] input:checked").each(
			function() 
			{
				if ($(this).attr('name'))
	            {
	                str = $(this).attr('name');
	                motif = /\[([^\[]*)\]/g;
	                keys = str.match(motif);

	                for (k in keys)
	                {
	                    keys[k] = keys[k].substring(1, keys[k].length - 1);
	                }
	                a = recursiveTab(keys, $(this).val(), a);
	            }
	        }
		);
	
	x = a;
	x = serialize(x);

	// Fin : Préparation du tableau
	var data  = "alias=" + alias;
 		data += "&ajax=" + 1;
 		data += "&type_visu=" + type_visu;
 		data += "&publication_ajax=" + x;
		
	$.ajax({
        url:      '/global/gene/ajax_saveTemporaryPrivacyParams.php',
		type:     'POST',
        async:    false,// Pour nepas être bloqué par les bloqueurs de pop-up
        data:     { 'privacy' : x },
        success:  function() {
			MM_openBrWindow('/profil/' + alias + '?viewAs=' + type_visu, 'Votreprofil', 'width=1050,height=900,scrollbars=yes');
        }
    });
}

function recursiveTab(keyList, value, tab)
{
    var res;

    res = new Array();
    if (tab instanceof Array)
    {
        res = tab;
    }

    if(keyList)
    if (keyList.length == 1)
    {
        res[keyList[0]] = value;
    }
    else
    {
        var key1 = keyList[0];

        if (!typeof res[key1] == Array)
            res[key1] = new Array();

        keyList.shift();
        res[key1] = recursiveTab(keyList, value, res[key1]);
    }
    return res;
}

$(function() {
	$("#dialog_profile").dialog({
		height: 600,
		width: 900,
//		position:top, pour une raison inconnu, fait bugger le chargement des widget sous firefox (lors d'un chargement depuis une iframe)
		modal: true,
		autoOpen: false,
		buttons: { "Ok": function() { $(this).dialog("close");}}
	});
	$("#tabs_carnet").tabs({ ajaxOptions: {
					beforeSend: function(){
							$('#tabs_carnet div:visible').empty().append('<div align="center"><img src="/global/images/loading_bar_red.gif" /></div>');
											}
										},
							load: function(event, ui){
							updatePres('#tabs_carnet div:visible');
										}
							});
	
	//$("select[multiple]").selectMultiple({ height : 'css' });
	
	if (typeof fancybox != 'undefined')
		$(".fancyPics").fancybox({'hideOnContentClick': true});

    $(document).on('submit', 'form:not(.no_obligatoire)', function() {
			var res = verifFormulaire($(this));
			$(this).trigger('verifFormulaireDone', res);
			return res;
		});
	
	displayButton();
});



function supprimer_documents(id_doc){
	if(id_doc){
		
		if(confirm(polyglot.t("doc.confirm_delete_doc"))) {
			var data = "del_id_doc=" + id_doc;
			
			$.ajax({
				
				url: "/global/ressources/ajax/suppression_document.php",
				type: "POST",
				data: data,
				success: function(html){
					if(!html){
                        polyglot.t("doc.doc_deleted");
						$(".ligne_document_" + id_doc).fadeOut();
					} else {
						alert("Une erreur est survenue, la suppression n'a pu \352tre effectu\351");
					}
				}
			});
		}
	} else {
        polyglot.t("doc.no_document_selected");
	}
}


function stockHisto(as_no, adresse)
{   
    
		$('#stockHisto'+adresse).hide();
		
        var $tabs = $('#EventEditorContainer').tabs();
        var current = $tabs.tabs('option', 'selected');
        $( "#EventEditorContainer" ).tabs({ selected: current+1 });


        $.post('/global/module/ep/ressources/ajax/ajax_hasHistoAdresse.php', {'as_no' : as_no }, function(data) {
                addStockHisto(as_no, adresse, data);
        });

}


function addStockHisto(as_no, adresse, num)
{
	if (num != 'no')
	{
		num++;
		addHisto();
	}
	else
	{
		num = 1;
	}

	$.post('/global/module/ep/ressources/ajax/ajax_getAdressePro.php', {
		'as_no': as_no,
		'ordre': adresse
	}, function (data) {
		var entree_pro = '';
		var tab_entree_pro;

		var sortie_pro = '';
		var tab_sortie_pro;
		
		if (!data || typeof data['entree_pro'] === 'undefined' || data['entree_pro'] === '0000-00-00')
		{
			var date_debut = new Date();
			entree_pro = date_debut.getFullYear() + '-' + (date_debut.getMonth().length < 2 ? '0' + date_debut.getMonth() : date_debut.getMonth()) + '-' + (date_debut.getDate().length < 2 ? '0' + date_debut.getDate() : date_debut.getDate());
			tab_entree_pro = entree_pro.split('-');
			tab_entree_pro[1] = parseInt(tab_entree_pro[1]) + 1;
			if (tab_entree_pro[1].length < 2)
				tab_entree_pro[1] = '0' + tab_entree_pro[1];
			entree_pro = tab_entree_pro[2] + '/' + tab_entree_pro[1] + '/' + tab_entree_pro[0];
		}
		else if (data && data['entree_pro'] !== '0000-00-00')
		{
			tab_entree_pro = data['entree_pro'].split('-');
			if (tab_entree_pro[1].length < 2)
				tab_entree_pro[1] = '0' + tab_entree_pro[1];
			entree_pro = tab_entree_pro[2] + '/' + tab_entree_pro[1] + '/' + tab_entree_pro[0];
		}

		if (!data || typeof data['sortie_pro'] === 'undefined' || data['sortie_pro'] === '0000-00-00')
		{
			var date_fin = new Date();
			sortie_pro = date_fin.getFullYear() + '-' + (date_fin.getMonth().length < 2 ? '0' + date_fin.getMonth() : date_fin.getMonth()) + '-' + (date_fin.getDate().length < 2 ? '0' + date_fin.getDate() : date_fin.getDate());
			tab_sortie_pro = sortie_pro.split('-');
			tab_sortie_pro[1] = parseInt(tab_sortie_pro[1]) + 1;
			tab_sortie_pro[1] = tab_sortie_pro[1].toString();
			if (tab_sortie_pro[1].length < 2) {
				tab_sortie_pro[1] = '0' + tab_sortie_pro[1];
			}
			if (tab_sortie_pro[2].length < 2) {
				tab_sortie_pro[2] = '0' + tab_sortie_pro[2];
			}

			sortie_pro = tab_sortie_pro[2] + '/' + tab_sortie_pro[1] + '/' + tab_sortie_pro[0];
		}
		else if (data && data['sortie_pro'] !== '0000-00-00')
		{
			tab_sortie_pro = data['sortie_pro'].split('-');
			if (tab_sortie_pro[1].length < 2)
				tab_sortie_pro[1] = '0' + tab_sortie_pro[1];
			sortie_pro = tab_sortie_pro[2] + '/' + tab_sortie_pro[1] + '/' + tab_sortie_pro[0];
		}

		$('#entree_histo' + num).val(entree_pro);
		$('#sortie_histo' + num).val(sortie_pro);

		if ($('#entree_histo_d_' + num).length)
			$('#entree_histo_d_' + num).val(tab_entree_pro[2]);

		if ($('#entree_histo_m_' + num).length)
			$('#entree_histo_m_' + num).val(tab_entree_pro[1]);

		if ($('#entree_histo_y_' + num).length)
			$('#entree_histo_y_' + num).val(tab_entree_pro[0]);

		if (sortie_pro)
		{
			if ($('#sortie_histo_d_' + num).length)
				$('#sortie_histo_d_' + num).val(tab_sortie_pro[2]);

			if ($('#sortie_histo_m_' + num).length)
				$('#sortie_histo_m_' + num).val(tab_sortie_pro[1]);

			if ($('#sortie_histo_y_' + num).length)
				$('#sortie_histo_y_' + num).val(tab_sortie_pro[0]);
		}

		if (!data)
			return;

		$('#entreprise_histo' + num).val(data['entreprise']);
		$('#direction_histo' + num).val(data['direction']);
		$('#direction2_histo' + num).val(data['direction_2']);
		$('#direction3_histo' + num).val(data['direction_3']);
		$('#secteur_histo' + num).val(data['secteur']).trigger('change');
		$('#poste_histo' + num).val(data['poste']);
		$('#fonction_histo' + num).val(data['id_fonction']).trigger('change');
		$('#pays_histo' + num).val(data['id_pays']);
		$('#ville_histo' + num).val(data['ville']);
		$('#histo_statut' + num).val(data['statut_pro']);

		$('#contrat_histo' + num).val(data['contrat']);

		if ($('#userfile_histo' + num).length)
			$('#userfile_histo' + num).val(data['logo_entreprise']);

		if ($('#direction_histo' + num).length)
			$('#direction_histo' + num).val(data['direction']);

		if ($('#direction_histo_2' + num).length)
			$('#direction_histo_2' + num).val(data['direction_2']);

		if ($('#direction_histo_3' + num).length)
			$('#direction_histo_3' + num).val(data['direction_3']);

	}, 'json');
}
