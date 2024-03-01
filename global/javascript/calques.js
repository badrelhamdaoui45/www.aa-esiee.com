/*
var maxZindex = 100;
var dragObject  = null;
var mouseOffset = null;
var mousePos = null;
var nbCalques = 0;

document.onmousemove = function(ev) {
	ev = ev || window.event;
	mousePos = mouseCoords(ev);
}
*/
var timer;
/**********************
* Nom : creerCalque
* Desc : créer un calque avec un contenu charger dynamiquement
*********************/
function creerCalque(page, titre, type, largeur_calque) {
	var nom_calque = "calque";

	if(!largeur_calque) largeur_calque = 800;

	/*if(!nom_calque)
		nom_calque = 'calque_'+Math.round(Math.random()*10000);*/

	if(!type) type="contenu";

	supprimerCalque(nom_calque);


		//Création du calque contenaire pour avoir le fond semi transparent
		var myDiv = document.createElement('DIV');
		myDiv.setAttribute('id',nom_calque);
		// on met 100% sinon le margin : auto de myDivContenu est décentré
		myDiv.style.width="100%";
		myDiv.style.height=document.body.scrollHeight+"px";
		myDiv.style.padding="0";
		myDiv.style.position="absolute";
		myDiv.style.top="0";
		myDiv.style.left="0";
		myDiv.style.zIndex="999";
		myDiv.style.textAlign="center";
		myDiv.style.background="transparent url('/global/images/semi-transparent.gif') left top";

		document.body.appendChild(myDiv);

		// Création du calque de contenu
		var myDivContenu = document.createElement('DIV');
		myDivContenu.setAttribute('id',"contenu_"+nom_calque);
		myDivContenu.style.width=largeur_calque+"px";
		myDivContenu.style.textAlign = "left";
		myDivContenu.style.backgroundColor = "#FFF";
		myDivContenu.style.padding="0px";
		myDivContenu.style.margin="30px auto 30px auto";
		myDivContenu.style.border="1px solid #000";
		myDivContenu.style.overflow="auto";
		if(document.body.scrollTop)
			myDivContenu.style.marginTop = (document.body.scrollTop + 50)+"px";
		else
			myDivContenu.style.marginTop = (document.documentElement.scrollTop + 50)+"px";
		myDivContenu.style.position="relative";
		if(titre)
			myDivContenu.innerHTML = '<div id="entete_'+nom_calque+'" class="entete_calque"><a href="javascript:supprimerCalque(\''+nom_calque+'\');" title="Fermer le calque" style="float:right;"><img src="/global/images/icon_fermer.gif" alt="Fermer" style="border:0" /></a>'+titre+'</div>';
		else
			myDivContenu.innerHTML = '<a href="javascript:supprimerCalque(\''+nom_calque+'\');" title="Fermer le calque" id="bouton_fermer_calque" style="position:absolute;right:5px;top:5px;z-index:500;"><img src="/global/images/icon_fermer.gif" alt="Fermer" style="border:0" /></a>';

		if(type == "contenu") {
			if(page)
				myDivContenu.innerHTML += page.replace('"','\"');
			else
				myDivContenu.innerHTML += '&nbsp;';
		} if(type == "frame") {
			var myFrame = document.createElement('IFRAME');
			myFrame.setAttribute('id','myiFrame_'+nom_calque);
			myFrame.setAttribute('name','myiFrame_'+nom_calque);
			myFrame.frameBorder=0;
			myFrame.style.width="100%";
			myFrame.style.border="0";
			myFrame.style.margin="0";
			myFrame.src=page;

			myDivContenu.appendChild(myFrame);
		}

		myDiv.appendChild(myDivContenu);

		if(type == "frame") {
			if(navigator.appName=="Microsoft Internet Explorer") {
				myFrame.onreadystatechange = function() {
					if(this.readyState == "interactive") {
						actu_iframe(this.id,nom_calque);
					}

				}
			} else {
				myFrame.onload = function() {
					actu_iframe(this.id, nom_calque);
				}
			}
		}

}


/**********************
* Nom : mouseCoords
* Desc : récupère les coordonnées de la souris lorsqu'elle bouge
*********************/
function mouseCoords(ev){

	if(ev.pageX || ev.pageY){
		return {x:ev.pageX, y:ev.pageY};
	}
	return {
		x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
		y:ev.clientY + document.body.scrollTop  - document.body.clientTop
	};
}

/**********************
* Nom : getMouseOffset
* Desc : récupère la position de la souris à l'instant t
*********************/
function getMouseOffset(target, ev){
	ev = ev || window.event;

	var docPos    = getPosition(target);
	var mousePos  = mouseCoords(ev);
	return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
}

/**********************
* Nom : getPosition
* Desc :
*********************/
function getPosition(e){
	var left = 0;
	var top  = 0;

	while (e.offsetParent){
		left += e.offsetLeft;
		top  += e.offsetTop;
		e     = e.offsetParent;
	}

	left += e.offsetLeft;
	top  += e.offsetTop;

	return {x:left, y:top};
}


/**********************
* Nom : supprimerCalque
* Desc : supprime le calque dont on passe l'id en paramètre
*********************/
function supprimerCalque() {
	if(timer) clearTimeout(timer);
	
	if(document.getElementById("calque")) {
		document.body.removeChild(document.getElementById("calque"));
	} else if(window.parent.document.getElementById("calque")) {
		window.parent.document.body.removeChild(window.parent.document.getElementById("calque"));
	}

}

/**********************
* Nom : touchesSpeciales
* Desc : attibue une action spécifique lorsqu'on appuis sur une touche
*********************/
function touchesSpeciales(ev) {
	var touche   = ev.keyCode;
    if (touche==27) { // si on presse sur la touche Esc
       codeHTML = 'Escape';
       supprimerCalque('calqueApercu');
    }
}

/**********************
* Nom : actu_iframe
* Desc : Redimensionne l'iframe en fonction de son contenu
*********************/
function actu_iframe(iframeWindow, nom_calque){
	IE  = window.ActiveXObject ? true : false;
	/*MOZ = window.sidebar       ? true : false;*/

  	if(IE)  {
  		edoc = window.frames[iframeWindow].document;
  		if(edoc.body && edoc.body.offsetHeight) {
	  		document.getElementById(iframeWindow).style.height = (edoc.body.offsetHeight+10)+"px";
	  		timer = setTimeout("actu_iframe('"+iframeWindow+"','"+nom_calque+"')",1000);
	  	} else {
	  		timer = setTimeout("actu_iframe('"+iframeWindow+"','"+nom_calque+"')",10);
	  	}
  	} else {
  		edoc = document.getElementById(iframeWindow).contentDocument;
  		if(edoc.body && edoc.body.offsetHeight) {
	   		document.getElementById(iframeWindow).style.height = (edoc.body.offsetHeight + 25)+"px";
	   		timer = setTimeout("actu_iframe('"+iframeWindow+"','"+nom_calque+"')",1000);
	   	} else {
	   		timer = setTimeout("actu_iframe('"+iframeWindow+"','"+nom_calque+"')",10);
	   	}
   	}


}




/**********************
* Nom : loadCalque
* Desc : charge le contenu de la page en Ajax
*********************/
function afficheCalque(page, titre, parametres, largeur_calque) {

	if(page) {
		var xhr_object = null;
		if(window.XMLHttpRequest) // Firefox
			xhr_object = new XMLHttpRequest();
	   	else if(window.ActiveXObject) // Internet Explorer
	       	xhr_object = new ActiveXObject("Microsoft.XMLHTTP");
	   	else{ // XMLHttpRequest non supporté par le navigateur
	     	alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest...");
	    	return;
	  	}
		xhr_object.open("POST", page, true);
	   	xhr_object.onreadystatechange = function() {
	   		/*if(xhr_object.readyState != 4) {
	   			creerCalque("Chargement en cours ... ", titre, calque, "contenu");
	   		}*/
	   		if(xhr_object.readyState == 4) {
				creerCalque(xhr_object.responseText, titre, "contenu", largeur_calque);
			}
		}
	   	xhr_object.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr_object.setRequestHeader("X-Requested-With", "xmlhttprequest");
        xhr_object.setRequestHeader("X-CSRF-TOKEN", $('meta[name="csrf-token"]').attr('content'));
        
	   	if(parametres)
	  		var data = parametres+"&noframe=1";
	  	else
	  		var data = "noframe=1";
	   	xhr_object.send(data);
	}
}

/**********************
* Nom : deroulerCalque
* Desc : charge le contenu de la page en Ajax
*********************/
function deroulerCalque(id, hauteur_masque, largeur_masque) {

	// On recupére la taille actuelle du masque
	hauteur_tmp = parseInt(document.getElementById("masque_"+id).style.height.substring(0,(document.getElementById("masque_"+id).style.height.length - 2)));
	largeur_tmp = parseInt(document.getElementById("masque_"+id).style.width.substring(0,(document.getElementById("masque_"+id).style.width.length - 2)));

	// On recupére la taille du contenu
	hauteur = parseInt(document.getElementById("contenu_"+id).offsetHeight);
	largeur = parseInt(document.getElementById("contenu_"+id).offsetWidth);

	if( Math.abs(largeur_tmp - largeur) > Math.abs((largeur - largeur_masque)/20) || Math.abs(hauteur_tmp - hauteur) > Math.abs((hauteur - hauteur_masque)/20) ) {

		if(Math.abs(hauteur_tmp - hauteur) > Math.abs((hauteur - hauteur_masque)/20))
			document.getElementById("masque_"+id).style.height = (hauteur_tmp + ((hauteur - hauteur_masque)/20))+"px";

		if(Math.abs(largeur_tmp - largeur) > Math.abs((largeur - largeur_masque)/20)) {
			document.getElementById("masque_"+id).style.width = (largeur_tmp + ((largeur - largeur_masque)/20))+"px";
			document.getElementById("contenu_"+id).style.marginLeft = -(largeur - largeur_tmp - ((largeur - largeur_masque)/20))/2+"px";
		}

		timerCalque = setTimeout("deroulerCalque('"+id+"', '"+hauteur_masque+"', '"+largeur_masque+"')",5);

	} else {

		document.getElementById("masque_"+id).style.height = hauteur+"px";
		document.getElementById("masque_"+id).style.width = largeur+"px";
		document.getElementById("contenu_"+id).style.marginLeft = "0px";
		if(document.getElementById('bouton_fermer_calque'))
			document.getElementById('bouton_fermer_calque').style.display="block";
		clearTimeout(timerCalque);

	}
}
