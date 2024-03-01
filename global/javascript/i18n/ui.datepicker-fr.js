/* French initialisation for the jQuery UI date picker plugin. */
/* Written by Keith Wood (kbwood@virginbroadband.com.au) and Stéphane Nahmani (sholby@sholby.net). */
jQuery(function($){
	$.datepicker.regional['fr'] = {
		closeText: 'Fermer',
		prevText: 'Pr&eacute;c',
		nextText: 'Suiv',
		currentText: 'Courant',
		monthNames: ['Janvier','F&#233;vrier','Mars','Avril','Mai','Juin', 'Juillet','Ao&#251;t','Septembre','Octobre','Novembre','D&#233;cembre'],
		monthNamesShort: ['Jan','F&#233;v','Mar','Avr','Mai','Jun', 'Jul','Ao&#251;','Sep','Oct','Nov','D&#233;c'],
		dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
		dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
		dayNamesMin: ['Di','Lu','Ma','Me','Je','Ve','Sa'],
		dateFormat: 'dd/mm/yy', firstDay: 1,
		isRTL: false};
	$.datepicker.setDefaults($.datepicker.regional['fr']);
});