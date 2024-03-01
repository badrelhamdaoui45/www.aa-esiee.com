var vis = new Array();
var iIdLine=1; // Identifiant de la ligne à supprimer
// Ajoute une ligne pour pouvoir uploader le fichier
function addLigneTableEnfant (idTable,classIn,affiche_prenom,affiche_nom,affiche_datenaiss,affiche_promo,affiche_dcd) {
	
	
if(!classIn) classIn="";
var ligne = document.createElement('tr');

var celluleEnfant = document.createElement('td');
celluleEnfant.setAttribute("width","50%");
var cellulePrenom = document.createElement('td');
cellulePrenom.className = "text_n_12";
var celluleNom = document.createElement('td');
var celluleDateNais = document.createElement('td');
var cellulePromo = document.createElement('td');
var celluleDCD = document.createElement('td');
var celluleSup = document.createElement('td');

// Cellule Prenom
	
	var cptInputPrenom = document.createElement('input');
	cptInputPrenom.setAttribute("type","text");
	
	//cptInputPrenom.setAttribute("class","text"+classIn);
	cptInputPrenom.className= "text"+classIn;
	cptInputPrenom.setAttribute("name","prenom_enfant[]");
	cptInputPrenom.setAttribute("size","20");
	cellulePrenom.appendChild(cptInputPrenom);
	// Rattachement à la ligne
	if(affiche_prenom) ligne.appendChild(cellulePrenom);

// Cellule Nom
	
	var cptInputNom = document.createElement('input');
	cptInputNom.setAttribute("type","text");
	//cptInputNom.setAttribute("class","text"+classIn);
	cptInputNom.className= "text"+classIn;
	cptInputNom.setAttribute("name","nom_enfant[]");
	cptInputNom.setAttribute("size","20");
	celluleNom.appendChild(cptInputNom);
	// Rattachement à la ligne
	if(affiche_nom) ligne.appendChild(celluleNom);

// Cellule Année de naissance
	var cptInputNaisAn = document.createElement('select');
	
	//cptInputNaisAn.setAttribute("class","select_disabled"+classIn);
	
	cptInputNaisAn.className= "select"+classIn;
	cptInputNaisAn.setAttribute("name","enaissance_annee[]");
	cptInputNaisAn.id='anneNAiss'+iIdLine;
	insertOptionSelect(cptInputNaisAn, "0000", "0000");
	var  ladate=new  Date()
	for(j=ladate.getFullYear(); j>1900; j--) insertOptionSelect(cptInputNaisAn,j,j);
	
	celluleDateNais.appendChild(cptInputNaisAn);
	// Rattachement à la ligne
	if(affiche_datenaiss) ligne.appendChild(celluleDateNais);
	
// Cellule Promo
	var cptInputPromo = document.createElement('input');
	cptInputPromo.setAttribute("type","text");
	cptInputPromo.className="text"+classIn;
	//cptInputPromo.setAttribute("class","select_disabled"+classIn);
	cptInputPromo.setAttribute("name","promo_enfant[]");
	cptInputPromo.setAttribute("size","4");
	cellulePromo.appendChild(cptInputPromo);
	// Rattachement à la ligne
	if(affiche_promo) ligne.appendChild(cellulePromo);
// Cellule DCD
	var cptInputDCD = document.createElement('input');
	cptInputDCD.setAttribute("type","checkbox");
	cptInputDCD.setAttribute("name","decede[]");
	celluleDCD.appendChild(cptInputDCD);
	celluleDCD.setAttribute("class","text_n_12"+classIn);
	celluleDCD.appendChild(document.createTextNode("Décédé(e)"));
	celluleDCD.className= "text_n_12"+classIn;
	// Rattachement à la ligne
	if(affiche_dcd) ligne.appendChild(celluleDCD);
	
// Cellule Supprimer
	var hrefImgSup = document.createElement('a');
	var imageSup = document.createElement('img');
	imageSup.src="/global/images/del_rouge.gif";
	imageSup.border="0";
	hrefImgSup.href="javascript:supTabLigne('"+idTable+"','"+iIdLine+"');";
	hrefImgSup.appendChild(imageSup);
	celluleSup.appendChild(hrefImgSup);
	// Rattachement à la ligne
	ligne.appendChild(celluleSup);



//  Rattachement au tableau
var table = document.getElementById(idTable);
var tableBody = table.lastChild;

ligne.id=iIdLine;
tableBody.appendChild(ligne);


iIdLine++;

} //addLigneFileUpload


function insertOptionSelect(elSel,textOption,valueOption){
	
	
    var elOptNew = document.createElement('option');
	
	if(navigator.appName=='Netscape')  elOptNew.text = textOption; else elOptNew.innerText = textOption; 

    
    elOptNew.value = valueOption;
	
	elSel.appendChild(elOptNew);
 
}



// Supprimer la ligne
function supTabLigne (idTable,idTr)
{
 // Boucler sur tout les tr du tableau et regarder l'id qu'il faut suprimer
 var table = document.getElementById(idTable);
 var tableBody = table.lastChild;
 var nbrNodes=tableBody.childNodes.length;

 for(i=0;i<nbrNodes;i++){
     // Supprimer le noeud qui a l'id
     if(tableBody.childNodes[i].id==idTr){
        supAllChildNodes(tableBody.childNodes[i]);
        tableBody.removeChild(tableBody.childNodes[i]);
        break;
     }
 }
} // supUploadFileLigne

function supAllChildNodes(node) {
		 if (node && node.hasChildNodes && node.removeChild) {
		 		 while (node.hasChildNodes()) {
		 		 node.removeChild(node.firstChild);
		 		 }
		 }
} // supAllChildNodes


function fenetre_conjoint_modal(nom_formulaire, as_no, modal) {
	rech_as_no_modal("/global/gene/rech_as_no.php?nom_formulaire=" + nom_formulaire +"&personne=conjoint_fiche&no_as_no="+as_no, modal);

}

function fenetre_conjoint(formulaire, ecole, num_champs, as_no) {
   fen = window.open("/global/gene/rech_as_no_conjoint.php?" + formulaire +"&num_champs="+num_champs+"&as_no="+as_no, "", "width=600,height=600,scrollbars=yes");
   if (!fen.opener) fen.opener = self;

}

function supp_conjoint() {
	document.formulaire_maj.as_no_conjoint.value = '';
	document.formulaire_maj.nom_conjoint.value = '';
}


function conjointMember(val) {
	if(val == 1)  {
		$('.modal_rech_asno').show();
		$('#prenom_conjoint').hide();
		$('#nom_conjoint').attr('readonly', true);
		$('.phrase_conjoint_membre').show();
	}
	else {
		$('.modal_rech_asno').hide();
		$('#prenom_conjoint').show();
		$('#nom_conjoint').attr('readonly', false);
		$('.phrase_conjoint_membre').hide();
	}
}

