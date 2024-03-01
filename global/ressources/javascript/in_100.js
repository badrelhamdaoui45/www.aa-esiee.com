function select_area(){ //v3.0
	formulaire_maj.textfield.select();
}

function select_area2(){ //v3.0
	formulaire_maj.textfield2.select();
}

function stats_cotis() {
	document.form2.submit();
	}

function MM_jumpMenu(targ,selObj,restore){ //v3.0
  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}

/***********************
* Afficher le bouton option
***********************/
function afficheOptions(base,num) {

        var valeur;

       valeur = document.getElementById("menu_groupe["+base+"]["+num+"][type]").value;

       if(valeur=="evenements" || valeur=="stats" || valeur=="photo" || valeur=="videos" || valeur=="forum" || valeur=="doc" || valeur=="documents" || valeur=="agenda" || valeur=="event" || valeur=="calendrier" || valeur=="lien" || valeur=="groupe" || valeur=="ep_forum"){

                document.getElementById("div_option_groupe["+base+"]["+num+"]").style.display = "block";

       }

}

function afficheOptions2(base,num) {

                document.getElementById("div_option_groupe["+base+"]["+num+"]").style.display = "block";

}
/***********************
* Masquer le bouton option
***********************/
function cacheOptions(base,num) {

        document.getElementById("div_option_groupe["+base+"]["+num+"]").style.display = "none";

}


function FW_OpenWindow(theURL,features) {
  window.open(theURL,'Detail',features);
}

// Not used in global/ensae anymore
function FW_open_popup() {
 larg=document.formulaire_maj.largeur_popup2.value;
 haut=document.formulaire_maj.hauteur_popup2.value;
 // The file does not exists on ensae anymore
 openfenetre('/ressources/popup/pop_up_dyn.html','A',''+larg+'',''+haut+'','no','center')
}

function FW_open_popup_430(fichier, groupe, ecole, espace) {
    openfenetre('/global/gene/editeur.php?fichier='+fichier+'&id_groupe='+groupe+'&ecole='+ecole+'&espace='+espace,'A','700','700','no','center')
}
function MM_popupMsg(msg) { //v1.0
  alert(msg);
}

function ajout_bandeau()
{
	var editeur = tinyMCE.activeEditor;
	editeur.setContent('<img src="/images/toplogo_new.gif" /><table width=600><tr><td><font face="Verdana" size=2><br><br>Bonjour |%prenom%|,<br>'+editeur.getContent()+'</font></td></tr></table>');

	var contenu_txt = $(document.FormEditeur.Contenu_texte);
	contenu_txt.val('Bonjour |%prenom%|,\n' + contenu_txt.val());

	//$(document.FormEditeur.images).val('toplogo_new.gif');
}

function sfHover(){
    $("#menuAdmin li").hover( 
                    function(){ $(this).addClass('sfhover');}
                    ,function(){ $(this).removeClass('sfhover');}
                    
                    );
}
$( function(){sfHover();})

// 2014-07-20 : not used on ensae/global
function fenetre_fiche_entreprise(formulaire) {
   fen = window.open("rech_entreprise.php?number=" + formulaire  , "", "width=550,height=400,scrollbars=yes");
   if (!fen.opener) fen.opener = self;
}

function _body_onload()	{

	SetContext('clients');
	setActiveButtonByName('clients');

	if(document.getElementById('loader'))
		document.body.removeChild(document.getElementById('loader'));
}

function _body_onunload() {

	//Création du calque contenaire pour avoir le fond semi transparent
	var myDiv = document.createElement('DIV');
	myDiv.setAttribute('id','loader');
	myDiv.style.width=document.body.scrollWidth+"px";
	myDiv.style.height=document.body.scrollHeight+"px";
	myDiv.style.padding=(document.documentElement.scrollTop+20)+"px 0";
	myDiv.style.background="transparent url('/global/images/semi-transparent.gif') left top";

	document.body.appendChild(myDiv);

	//Création du calque de contenu
	var myDiv2 = document.createElement('DIV');
	myDiv2.innerHTML = '<img src="/global/images/loading.gif" alt="Chargement en cours ..." /> Chargement en cours ...';

	myDiv.appendChild(myDiv2);

}

function initGroupes(tab_groupes, all, as_no, admin_groupe) {
	
	var xhr_object = null;
	if(window.XMLHttpRequest) // Firefox
		xhr_object = new XMLHttpRequest();
   	else if(window.ActiveXObject) // Internet Explorer
       	xhr_object = new ActiveXObject("Microsoft.XMLHTTP");
   	else{ // XMLHttpRequest non supporté par le navigateur
     	alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest...");
    	return;
  	}
	xhr_object.open("POST", "/global/ressources/ajax/ajaxRecupGroupes.php", false);
   	xhr_object.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr_object.setRequestHeader("X-Requested-With", "xmlhttprequest");
    xhr_object.setRequestHeader("X-CSRF-TOKEN", $('meta[name="csrf-token"]').attr('content'));
    
   	var data = "tab_groupes="+tab_groupes;
   	if(all) data += "&all="+all;
   	if (as_no) data += "&as_no="+as_no;
   	xhr_object.send(data);

   	eval(xhr_object.responseText);
   	//alert(xhr_object.responseText);
	loadChoixGroupes(admin_groupe);
}

// Chargement de la liste des groupes
var dossierGroupeOpen = 0;

// Ajout d'un groupe (passage de la liste de gauche vers la liste de droite)
function addGroupes(admin_groupe) {

	var tab_tmp = new Array();

	for(i in listGroupesDispo) {

		var groupeASupprimer = new Array();

		for(j in listGroupesDispo[i]) {
			if(document.getElementById('groupeDispo['+j+']').value == 1) {
				if(!listGroupesSelected)
					listGroupesSelected = new Array();
				if(!listGroupesSelected[i])
					listGroupesSelected[i] = new Array();
				listGroupesSelected[i][j] = listGroupesDispo[i][j];
				groupeASupprimer[groupeASupprimer.length] = j;
				dossierGroupeOpen = i;

			} else {

				if(!tab_tmp[i])
					tab_tmp[i] = new Array();
				tab_tmp[i][j] = listGroupesDispo[i][j];

			}
		}

	}

	listGroupesDispo = ksort(tab_tmp);
	listGroupesSelected = ksort(listGroupesSelected);

	loadChoixGroupes(admin_groupe);
	if (document.getElementById('input_search_l').value)
		doSearch('l');
	if (document.getElementById('input_search_r').value)
		doSearch('r');
	return false;
}

// Suppression d'un groupe (passage de la liste de droite vers la liste de gauche)
function delGroupes(admin_groupe) {

	var tab_tmp = new Array();

	for(i in listGroupesSelected) {

		var groupeASupprimer = new Array();

		for(j in listGroupesSelected[i]) {
			if(document.getElementById('groupeSelected['+j+']').value == 1) {
				if(!listGroupesDispo)
					listGroupesDispo = new Array();
				if(!listGroupesDispo[i])
					listGroupesDispo[i] = new Array();
				listGroupesDispo[i][j] = listGroupesSelected[i][j];
				groupeASupprimer[groupeASupprimer.length] = j;
				dossierGroupeOpen = i;

			} else {

				if(!tab_tmp[i])
					tab_tmp[i] = new Array();
				tab_tmp[i][j] = listGroupesSelected[i][j];

			}
		}
	}

	listGroupesSelected = ksort(tab_tmp);
	listGroupesDispo = ksort(listGroupesDispo);
	loadChoixGroupes(admin_groupe);
	if (document.getElementById('input_search_l').value)
		doSearch('l');
	if (document.getElementById('input_search_r').value)
		doSearch('r');
	return false;
}

function selectGroupe(elem,id) {
	if(document.getElementById("groupeDispo["+id+"]")) {
		if(document.getElementById("groupeDispo["+id+"]").value != 0) {
			document.getElementById("groupeDispo["+id+"]").value = 0;
			elem.style.backgroundColor = "";
		} else {
			document.getElementById("groupeDispo["+id+"]").value = 1;
			elem.style.backgroundColor = "#EEE";
		}
	} else if (document.getElementById("groupeSelected["+id+"]")) {
		if(document.getElementById("groupeSelected["+id+"]").value != 0) {
			document.getElementById("groupeSelected["+id+"]").value = 0;
			elem.style.backgroundColor = "";
		} else {
			document.getElementById("groupeSelected["+id+"]").value = 1;
			elem.style.backgroundColor = "#EEE";
		}
	}
	return false;
}

function display_groupes(id) {
	if(document.getElementById("liste_groupe_"+id))	document.getElementById("liste_groupe_"+id).style.display = "block";
	if(document.getElementById("image_titre_"+id)) document.getElementById("image_titre_"+id).src = "/global/images/btn_moins.gif";
	if(document.getElementById("lien_titre_"+id)) document.getElementById("lien_titre_"+id).href = "javascript:hide_groupes("+id+")";
}
function hide_groupes(id) {
	if(document.getElementById("liste_groupe_"+id))	document.getElementById("liste_groupe_"+id).style.display = "none";
	if(document.getElementById("image_titre_"+id)) document.getElementById("image_titre_"+id).src = "/global/images/btn_plus.gif";
	if(document.getElementById("lien_titre_"+id)) document.getElementById("lien_titre_"+id).href = "javascript:display_groupes("+id+")";
}

function loadChoixGroupes(admin_groupe) {

    if( !$("#choix_groupe_l").length || !$("#choix_groupe_r").length )
        return;
    
    $("#choix_groupe_l").html('');
	$("#choix_groupe_r").html('');


	var num_dossier = 0;

	// Liste des groupes disponibles
	for(var i in listGroupesDispo) {
		num_dossier++;
		var lien_titre = document.createElement('a');
		if(dossierGroupeOpen == i)
			lien_titre.setAttribute('href','javascript:hide_groupes('+num_dossier+');');
		else
			lien_titre.setAttribute('href','javascript:display_groupes('+num_dossier+');');
		lien_titre.id = "lien_titre_"+num_dossier;

		var image_titre = document.createElement('img');
		if(dossierGroupeOpen == i)
			image_titre.src = "/global/images/btn_moins.gif";
		else
			image_titre.src = "/global/images/btn_plus.gif";
		image_titre.id = "image_titre_"+num_dossier;

		var titre = document.createElement('h5');
		titre.style.margin=0;
		titre.style.padding=0;

		lien_titre.appendChild(image_titre);
		lien_titre.appendChild(document.createTextNode(" "));
		lien_titre.appendChild(document.createTextNode(i));
		titre.appendChild(lien_titre);

		document.getElementById("choix_groupe_l").appendChild(titre);

		var div_groupes = document.createElement('div');
		div_groupes.id = "liste_groupe_"+num_dossier;
		if(dossierGroupeOpen == i)
			div_groupes.style.display="block";
		else
			div_groupes.style.display="none";
		div_groupes.style.padding = "0 0 0 10px";

		for(var j in listGroupesDispo[i]) {
			var lien = document.createElement('a');
			lien.setAttribute('href','#');
			lien.setAttribute('id',j);
			var nomGroupeC = new String(listGroupesDispo[i][j]);
			nomGroupeC = nomGroupeC.replace(new RegExp(',', 'g'),'');
			lien.appendChild(document.createTextNode(nomGroupeC));
			lien.onclick = function() {
				selectGroupe(this,this.id);
				return addGroupes(admin_groupe);
			}

			var champ = document.createElement('input');
			champ.setAttribute('type','hidden');
			champ.setAttribute('id','groupeDispo['+j+']');
			champ.setAttribute('name','groupeDispo['+j+']');
			champ.value = 0;

			div_groupes.appendChild(lien);
			div_groupes.appendChild(champ);
		}
		document.getElementById("choix_groupe_l").appendChild(div_groupes);
	}

	// Liste des groupes séléctionnés
	for(i in listGroupesSelected) {
		
		num_dossier++;
		var lien_titre = document.createElement('a');
		if(dossierGroupeOpen == i)
			lien_titre.setAttribute('href','javascript:hide_groupes('+num_dossier+');');
		else
			lien_titre.setAttribute('href','javascript:display_groupes('+num_dossier+');');
		lien_titre.id = "lien_titre_"+num_dossier;

		var image_titre = document.createElement('img');
		if(dossierGroupeOpen == i)
			image_titre.src = "/global/images/btn_moins.gif";
		else
			image_titre.src = "/global/images/btn_plus.gif";
		image_titre.id = "image_titre_"+num_dossier;

		var titre = document.createElement('h5');
		titre.style.margin=0;
		titre.style.padding=0;

		lien_titre.appendChild(image_titre);
		lien_titre.appendChild(document.createTextNode(" "));
		lien_titre.appendChild(document.createTextNode(i));
		titre.appendChild(lien_titre);

		document.getElementById("choix_groupe_r").appendChild(titre);

		var div_groupes = document.createElement('div');
		div_groupes.id = "liste_groupe_"+num_dossier;
		if(dossierGroupeOpen == i)
			div_groupes.style.display="block";
		else
			div_groupes.style.display="none";
		div_groupes.style.padding = "0 0 0 10px";

		for(j in listGroupesSelected[i]) {
			var lien = document.createElement('a');
			lien.setAttribute('href','#');
			lien.setAttribute('id',j);
			
			var nomGroupeC = new String(listGroupesSelected[i][j]);
			nomGroupeC = nomGroupeC.replace(new RegExp(',', 'g'),'');
			lien.appendChild(document.createTextNode(nomGroupeC));
			
			lien.onclick = function() {
				selectGroupe(this,this.id);
				return delGroupes(admin_groupe);
			}

			var champ = document.createElement('input');
			champ.setAttribute('type','hidden');
			champ.setAttribute('id','groupeSelected['+j+']');
			champ.setAttribute('name','groupeSelected['+j+']');
			champ.value = 0;

			div_groupes.appendChild(lien);
			div_groupes.appendChild(champ);
		}
		document.getElementById("choix_groupe_r").appendChild(div_groupes);
	}
	
	if(admin_groupe)
	{
		$("#choix_groupe_r").find('div a').each(function() {

			if($('#choix_groupe_r').html())
			{
				  $('#choix_groupe_r').removeClass('obligatoire');
			}

			$(this).bind("click", function(){
				if(!$('#choix_groupe_r').html())
				{
					  $('#choix_groupe_r').addClass('obligatoire');
				}
			});
		});
	}

}

function ksort(w)
{
	var sArr = [];
	var tArr = [];
	var n = 0;
	for (i in w)
	{
		tArr[n++] = i;
	}
	//tri du plus petit au plus grand
	tArr = tArr.sort();
	n = tArr.length;
	for (var i=0; i<n; i++)
	{
		sArr[tArr[i]] = w[tArr[i]];
	}
	return sArr;
}

/* correction appliquee pour windows XP  http://redmine.netanswer.fr/issues/18447 */
var osVer = /^.*Windows NT (\d\.\d+).*/.exec(navigator.userAgent);
if(osVer && osVer[1] < 6 && osVer[1] > 5.09){
	if (typeof jQuery != 'undefined') {
		$(function(){ $('select').each( function(){ $(this).css({ fontSize : "1em"}); }) })
	}
}

$( function(){
	var hilighte_eleme = '#' + window.location.hash.replace('#', '');
	hilighte_eleme = hilighte_eleme.toLowerCase();
	if( $(hilighte_eleme).size()) {
		if( hilighte_eleme.indexOf('#row_param_') == 0 ) {
		   $(hilighte_eleme).addClass("alert-danger"); // hilight if admin pams name
			$('html, body').animate({
				scrollTop: $(hilighte_eleme).offset().top - 220
			}, 1800, "swing", function(){
			});
		}
	}
});
