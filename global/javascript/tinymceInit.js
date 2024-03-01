$(function() {
    // !!! si changement fait ici le faire aussi dans netassoc.js dans initTinyMCE !!!
    na.tinymce.init_all();
    na.tinymce.init_all_specific();
    if( typeof tinymce != "undefined") {
        tinymce.init(na.tinymce.all);
        tinymce.init(na.tinymce.all_reduced);
        tinymce.init(na.tinymce.standard);
        tinymce.init(na.tinymce.simple);
        tinymce.init(na.tinymce.newsletter);
        tinymce.init(na.tinymce.mail);
        tinymce.init(na.tinymce.mail_fullpage);
        tinymce.init(na.tinymce.histo);
        tinymce.init(na.tinymce.emploi);
        tinymce.init(na.tinymce.model_doc);
        tinymce.init(na.tinymce.gls);
        tinymce.init(na.tinymce.mobile);
    }
});