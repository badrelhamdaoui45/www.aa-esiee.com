function VerifFormEmploi() {
	secteur = document.depot_offre.depoffre_secteur.value;
	if (secteur.length >1) {
		document.depot_offre.submit();
	} else {
		alert(polyglot.t("job.specify_sector"));
	}
}

//Etiquettes
var_etiq_type=1;
function FW_open_etiqannonceurs() {
	lien_final="/gene/etiq_annonceurs_pdf.php?type_annonceur="+var_etiq_type;
	etiq_dep=document.form_etiq.etiq_dep.value;
	if(etiq_dep!="") lien_final+="&departement_annonceur="+etiq_dep;
	openfenetre(lien_final,'A',''+500+'',''+500+'','yes','center')
}
