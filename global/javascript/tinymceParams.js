var na = {};
na.tinymce = {};
na.tinymce.naTinyDefaultOptions = {
    cache_suffix: "20220124",
    // General behaviour
    theme: "modern",
    // "fr" is normal here : only two translation for now in the editor
    language:(langue_selected == "fr") ? "fr_FR" : null,
    browser_spellcheck : true,
    resize:true,
    statusbar: true,
    relative_urls: false,
    remove_script_host:true,
    urlconverter_callback:function(url, node, on_save, name) {
        var callback = tinymce.activeEditor.settings.urlconverter_callback;
        tinymce.activeEditor.settings.urlconverter_callback = '';
        res = tinymce.activeEditor.convertURL(url, name, node);
        tinymce.activeEditor.settings.urlconverter_callback = callback;

        // si l'url commence par "|%" c'est que le paramètre dynamique contient l'url entière (ex: |%lien_password_url%|) du coup il faut supprimer le host ajouté par tinyMCE
        // sinon non (ex : /agenda/3897?token=|%as_no_md5%|&decline=1)
        if (url.indexOf('|%') === 0)
        {
            var regex = /^.*?\|%/gi;
            res = res.replace(regex, '|%');
        }

        return res;
    },
	setup: function (editor) {
		if ($('#' + editor.id).parents('form').hasClass('alert-before-leaving') || $('#' + editor.id).parents('form').hasClass('register-modify'))
			$('#' + editor.id).data('update-on-change', '1');

		editor.on('change', function () {
			// normalement c'est le travail de tinymce.triggerSave(); mais ca ne fonctionne pas sur Chrome
			if (editor.id !== 'undefined' && $('#' + editor.id).data('update-on-change'))
			{
				$('textarea#' + editor.id).html(editor.getContent());
				$('textarea#' + editor.id).val(editor.getContent());
				$('textarea#' + editor.id).text(editor.getContent());
				$('textarea#' + editor.id).change();
			}
		});
	},
    //invalid_elements : "script",
    insertdatetime_formats: ["%d/%m/%Y", "%Hh%M"],   
    document_base_url:window.location.origin,
   // verify_html: false,
//    forced_root_block : false,
    plugins: [
        ["advlist anchor autolink charmap code colorpicker contextmenu hr image insertdatetime"],
        ["link lists media nonbreaking paste preview print searchreplace table textcolor visualblocks visualchars wordcount"],
        ["moxiemanager"],
        ["netassoc", "eqneditor", "bootstrapaccordion"]
        // autoresize autosave bbcode directionality emoticons example example_dependency fullpage layer
        // importcss noneditable pagebreak save spellchecker tabfocus template textpattern
        // legacyoutput ??
    ],

    // Image plugin
    image_advtab:true,

    media_filter_html:false,

    // Interface

    menu : { // this is the complete naTinyDefaultOptions configuration
        file   : {title : 'File'  , items : 'newdocument'},
        edit   : {title : 'Edit'  , items : 'undo redo | cut copy paste pastetext | selectall | searchreplace'},
        insert : {title : 'Insert', items : 'link image media | anchor charmap hr insertdatetime nonbreaking'},
        view   : {title : 'View'  , items : 'visualchars visualblocks visualaid | fullscreen preview'},
        format : {title : 'Format', items : 'bold italic underline strikethrough superscript subscript | formats | removeformat'},
        table  : {title : 'Table' , items : 'inserttable tableprops deletetable | cell row column'},
        tools  : {title : 'Tools' , items : 'spellchecker code'}
    },
    
    toolbar: 
    [
        "undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | eqneditor link image media | print preview | forecolor backcolor",
        "styleselect formatselect fontselect fontsizeselect "
    ],
    contextmenu: "link image inserttable | cell row column deletetable | na_dyn_data na_test_data",
    
    extended_valid_elements : "a[*],span[*],embed[*],"
                              // svg support
                              + "svg[*],defs[*],pattern[*],desc[*],metadata[*],g[*],mask[*],path[*],line[*],marker[*],rect[*],circle[*],ellipse[*],polygon[*],polyline[*],linearGradient[*],radialGradient[*],stop[*],image[*],view[*],text[*],textPath[*],title[*],tspan[*],glyph[*],symbol[*],switch[*],use[*]",

	non_empty_elements: "td,th,iframe,video,audio,object,script,area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,source,wbr,track,"
						// svg support
						+ "svg,defs,pattern,desc,metadata,g,mask,path,line,marker,rect,circle,ellipse,polygon,polyline,linearGradient,radialGradient,stop,image,view,text,textPath,title,tspan,glyph,symbol,switch,use",

    // Styles
    style_formats: [
        {title: "Headers", items: [
            {title: "Header 1", format: "h1"},
            {title: "Header 2", format: "h2"},
            {title: "Header 3", format: "h3"},
            {title: "Header 4", format: "h4"},
            {title: "Header 5", format: "h5"},
            {title: "Header 6", format: "h6"}
        ]},
        {title: "Inline", items: [
            {title: "Bold", icon: "bold", format: "bold"},
            {title: "Italic", icon: "italic", format: "italic"},
            {title: "Underline", icon: "underline", format: "underline"},
            {title: "Strikethrough", icon: "strikethrough", format: "strikethrough"},
            {title: "Superscript", icon: "superscript", format: "superscript"},
            {title: "Subscript", icon: "subscript", format: "subscript"},
            {title: "Code", icon: "code", format: "code"}
        ]},
        {title: "Blocks", items: [
            {title: "Paragraph", format: "p"},
            {title: "Blockquote", format: "blockquote"},
            {title: "Div", format: "div"},
            {title: "Pre", format: "pre"}
        ]},
        {title: "Alignment", items: [
            {title: "Left", icon: "alignleft", format: "alignleft"},
            {title: "Center", icon: "aligncenter", format: "aligncenter"},
            {title: "Right", icon: "alignright", format: "alignright"},
            {title: "Justify", icon: "alignjustify", format: "alignjustify"}
        ]},
        {title: "Tableaux", items: [
            {title: "Tableaux responsive", format: "tabledataresponsive"}
        ]}
        /*
        {title: "Local", items: [
            {title: 'Bold text', inline: 'b'},
            {title: 'Red text', inline: 'span', styles: {color: '#ff0000'}},
            {title: 'Red header', block: 'h1', styles: {color: '#ff0000'}},
            {title: 'Example 1', inline: 'span', classes: 'example1'},
            {title: 'Example 2', inline: 'span', classes: 'example2'},
            {title: 'Table styles'},
            {title: 'Table row 1', selector: 'tr', classes: 'tablerow1'}
        ]},
        */
    ],
    color_custom: [
        {title:"Custom color", color:""},
        {title:"Custom color", color:""},
        {title:"Custom color", color:""},
        {title:"Custom color", color:""},
        {title:"Custom color", color:""}
    ],
    block_formats: "Paragraph=p;Header 1=h1;Header 2=h2;Header 3=h3",


	content_css : "/global/css/netassoc.css?v=20191007,/ressources/css/main.css?v=20191007,/global/css/tinymce.css?v=20191007",
    body_id : "contenu_principal",


    // Moxiemanager
    moxiemanager_filelist_manage_menu:'cut copy paste | view edit rename download addfavorite | remove',
    moxiemanager_filelist_context_menu:'cut copy paste | view edit rename download addfavorite | remove',
    na_settings_dyndata: [
        {title: polyglot.t('tinymce.personal_informations'), items: [
            {title: polyglot.t('tinymce.dear_upper'), code: 'cher'},
                {title: polyglot.t('tinymce.dear_lower'), code: 'cher_min'},
                {title: polyglot.t('tinymce.graduate'), code: 'diplome'},
                {title: polyglot.t('tinymce.civility'), code: 'civilite'},
                {title: polyglot.t('tinymce.last_name'), code: 'nom'},
                {title: polyglot.t('tinymce.first_name'), code: 'prenom'},
                {title: polyglot.t('tinymce.login'), code: 'user'},
                {title: polyglot.t('tinymce.alias'), code: 'alias'},
                {title: polyglot.t('tinymce.netassoc_id'), code: 'as_no'},
                {title: polyglot.t('tinymce.family_situation'), code: 'situation_familiale'},
                {title: polyglot.t('tinymce.professional_situation'), code: 'situation_pro'},
                {title: polyglot.t('tinymce.diploma'), code: 'diplomes'},
                {title: polyglot.t('tinymce.promotion'), code: 'promo'},            
                {title: typeof tab_const_tinymce != 'undefined' ? tab_const_tinymce['no_asso'] : 'LIBELLE_NO_ASSO', code: 'no_asso'},
                {title: typeof tab_const_tinymce != 'undefined' ? tab_const_tinymce['no_asso_2'] : 'LIBELLE_NO_ASSO_2', code: 'no_asso_2'},
                {title: typeof tab_const_tinymce != 'undefined' ? tab_const_tinymce['no_asso_3'] : 'LIBELLE_NO_ASSO_3', code: 'no_asso_3'},
                ]},
            
        {title: polyglot.t('tinymce.contact_details'), items: [
                {title: polyglot.t('tinymce.contact_address'), code: 'coord_contact'},
                {title: polyglot.t('tinymce.contact_email'), code: 'mail_contact'},
                {title: polyglot.t('tinymce.personal_details'), code: 'coord_perso'},
                {title: polyglot.t('tinymce.personal_contact_information_such_as_in_the_paper_directory'), code: 'coord_perso_conf'},
                {title: polyglot.t('tinymce.personal_details_with_data_to_be_completed'), code: 'coord_perso_full'},
                {title: polyglot.t('tinymce.business_contact'), code: 'coord_pro'},
                {title: polyglot.t('tinymce.professional_contact_information_such_as_in_the_paper_directory'), code: 'coord_pro_conf'},
                {title: polyglot.t('tinymce.professional_contact_details_with_data_to_be_completed'), code: 'coord_pro_full'},
                {title: polyglot.t('tinymce.personal_city'), code: 'ville_perso'},
                {title: polyglot.t('tinymce.city_pro'), code: 'ville_pro'},
                {title: polyglot.t('tinymce.validation_of_contact_details'), code: 'valide_coord'},
                {title: polyglot.t('tinymce.validation_of_coordinates_button'), code: 'bouton_fr_valide_coord'}
                ]},

		{title: polyglot.t('tinymce.bank_details'), items: [
				{title: polyglot.t('tinymce.iban'), code: 'iban'},
				{title: polyglot.t('tinymce.bic'), code: 'bic'}
			]},

        {title: polyglot.t('tinymce.private_space'), items: [
            {title: polyglot.t('tinymce.link_to_private_area'), code: 'lien_direct'},
            {title: polyglot.t('tinymce.link_to_private_area_here'), code: 'lien_direct_ici'},
            {title: polyglot.t('tinymce.link_to_private_area_in_english_here'), code: 'lien_direct_here'},
            {title: polyglot.t('tinymce.link_to_private_area_customizable'), code: 'lien_direct_html'},
            {title: polyglot.t('tinymce.link_to_private_area_in_english_customizable'), code: 'lien_direct_html_uk'},
            {title: polyglot.t('tinymce.link_to_private_area_button'), code: 'bouton_fr_lien_direct'},
            {title: polyglot.t('tinymce.link_to_private_area_in_english_button'), code: 'bouton_uk_lien_direct'},
            {title: polyglot.t('tinymce.link_to_update_informations'), code: 'lien_direct_settings'},
            {title: polyglot.t('tinymce.reset_password_link'), code: 'lien_password'},
            {title: polyglot.t('tinymce.reset_password_url'), code: 'lien_password_url'},
            {title: polyglot.t('tinymce.unsubscribe_link'), code: 'lien_unsubscribe'},
            {title: polyglot.t('tinymce.directory_data'), code : 'donnees_annuaire'},
            {title : 'Points PPC', code : 'pointsppc'},
            {title : 'Points (n)', code : 'points_n'},
            {title : 'Points (n-1)', code : 'points_n1'},
            {title : 'Solde (n-1)', code : 'solde_n1'},
            {title : 'Points report\u00E9s (n)', code : 'report_n'},
            {title : 'Points report\u00E9s (n-1)', code : 'report_n1'},
            {title : 'Points à acqu\u00E9rir (n)', code : 'aacqueriren_n'},
            {title : 'Points à acqu\u00E9rir au 01/01 (n)', code : 'aacquerir_n'},
            {title : 'Points total acquis (n-1)', code : 'total_acquis_n1'},
            {title : 'Points CERA', code : 'points_cera'},
            {title : 'Points CERA (n)', code : 'points_cera_n'},
            {title : 'Points CERA (n-1)', code : 'points_cera_n1'},
            {title : 'Solde CERA (n-1)', code : 'solde_cera_n1'},
            {title : 'Points CERA report\u00E9s (n)', code : 'report_cera_n'},
            {title : 'Points CERA report\u00E9s (n-1)', code : 'report_cera_n1'},
            {title : 'Points CERA à acqu\u00E9rir (n)', code : 'cera_aacqueriren_n'},
            {title : 'Points CERA à acqu\u00E9rir au 01/01 (n)', code : 'cera_aacquerir_n'},
            {title : 'Points CERA total acquis (n-1)', code : 'total_cera_acquis_n1'},
        ]},
    
        {title: polyglot.t('tinymce.subscription'), items: [
            {title: polyglot.t('tinymce.membership_in_one_click_here'), code: 'lien_cotisation'},
            {title: polyglot.t('tinymce.one_click_subscription_in_english_here'), code: 'lien_cotisation_uk'},
            {title: polyglot.t('tinymce.contribution_in_one_click_customizable'), code: 'lien_cotis_html'},
            {title: polyglot.t('tinymce.one_click_subscription_in_english_customizable'), code: 'lien_cotis_html_uk'},
            {title: polyglot.t('tinymce.contribution_in_one_click_button'), code: 'bouton_fr_cotis_html'},
            {title: polyglot.t('tinymce.one_click_subscription_in_english_button'), code: 'bouton_uk_cotis_html'},
            {title: polyglot.t('tinymce.last_contribution_donation_amount'), code: 'last_cotis'},
            {title: polyglot.t('tinymce.last_contribution_donation_amount_in_english'), code: 'last_cotis_uk'},
            {title: polyglot.t('tinymce.last_contribution_end_date'), code: 'last_cotis_end_date'},
            {title: polyglot.t('tinymce.current_contribution_year'), code: 'cotis_current_year'},            
        ]},
    
        {title: polyglot.t('tinymce.direct_debit'), items: [
            {title: polyglot.t('tinymce.mandate_bic'), code: 'mandat_bic'},
            {title: polyglot.t('tinymce.mandate_iban'), code: 'mandat_iban'},
            {title: polyglot.t('tinymce.mandate_rum'), code: 'mandat_rum'},
            {title: polyglot.t('tinymce.mandate_date_signed'), code: 'mandat_date_signature'},
            {title: polyglot.t('tinymce.direct_debit_amount_if_list_associated_with_a_direct_debit'), code: 'prelevement_montant'},
            {title: polyglot.t('tinymce.direct_debit_date_if_list_associated_with_a_direct_debit'), code: 'prelevement_date'}
        ]},
    
        {title: polyglot.t('tinymce.events'), items: [
            {title: polyglot.t('tinymce.link_to_an_event_with_login'), code: 'event_connexion'},
            {title: polyglot.t('tinymce.link_to_an_event_with_connection_button'), code: 'bouton_event_connexion'}
        ]},

        {title: polyglot.t('tinymce.offers'), items: [
            {title: polyglot.t('tinymce.link_to_classified_ads_with_login'), code: 'annonces_connexion'}
        ]},
    
        {title: polyglot.t('tinymce.mentoring'), items: [
            {title: polyglot.t('tinymce.permalink_mentor_profile_direct_connection'), code: 'parrainage_a'},
            {title: polyglot.t('tinymce.mentor_profile_permalink_button'), code: 'bouton_parrainage_a'},

            {title: polyglot.t('tinymce.permalink_search_mentor_direct_connection'), code: 'parrainage_b'},
            {title: polyglot.t('tinymce.seek_referrer_permalink_button'), code: 'bouton_parrainage_b'},

            {title: polyglot.t('tinymce.permalink_godson_profile_direct_connection'), code: 'parrainage_c'},
            {title: polyglot.t('tinymce.referral_profile_permalink_button'), code: 'bouton_parrainage_c'},

            {title: polyglot.t('tinymce.permalink_search_referral_direct_connection'), code: 'parrainage_d'},
            {title: polyglot.t('tinymce.referral_search_permalink_button'), code: 'bouton_parrainage_d'}
        ]},
		{title: polyglot.t('tinymce.group'), items: [
            {title: polyglot.t('tinymce.link_to_group_join_confirm_leave'), code: 'groupe'}
        ]},
		{title: polyglot.t('tinymce.lost_view'), items: [
            {title: polyglot.t('tinymce.the_list_of_lost'), code: 'perdu_de_vue'},
            {title: polyglot.t('tinymce.link_to_the_private_area_lost_to_view'), code: 'lien_perdu_de_vue_html'}
        ]},

		{title: polyglot.t('tinymce.surveys'), items: [
            {title: polyglot.t('tinymce.link_to_a_survey_with_login'), code: 'sondage_connexion'},
            {title: polyglot.t('tinymce.link_to_a_survey_with_login_button'), code: 'bouton_sondage_connexion'}
        ]},

		{title: polyglot.t('tinymce.forms'), items: [
            {title: polyglot.t('tinymce.link_to_a_form_with_login'), code: 'form_connexion'},
            //{title: 'Lien vers un formulaire avec connexion (bouton)', code: 'bouton_form_connexion'}
        ]},
        {title: polyglot.t('admin.planner'), items: [
            {title: polyglot.t('planner.link_planner_with_connection'), code: 'planner_connexion'},
         ]}
    ],

    add_links:["page", "news", "doc", "speciaux", "album", "member", "rss", "event"]
};

na.tinymce.init_all = function () {
    if (typeof tab_const_tinymce == 'undefined' || !tab_const_tinymce.MOXIMANAGER_ADMIN_GROUPE || (typeof tab_const_tinymce.MOXIMANAGER_RECRUTEUR != 'undefined' && !tab_const_tinymce.MOXIMANAGER_RECRUTEUR)) {
        for (var i = 0; i < na.tinymce.naTinyDefaultOptions.plugins.length; ++i) {
            na.tinymce.naTinyDefaultOptions.plugins[i][0] = na.tinymce.naTinyDefaultOptions.plugins[i][0].replace("moxiemanager", "");
        }
    }

    na.tinymce.all = $.extend(true, {}, na.tinymce.naTinyDefaultOptions, {
        selector: "textarea.tinymce_all",
    });
    na.tinymce.all.toolbar[1] += '| bootstrapaccordion';

    na.tinymce.all_reduced = $.extend(true, {}, na.tinymce.naTinyDefaultOptions, {
        selector: "textarea.tinymce_all_reduced"
    });

    na.tinymce.standard = $.extend(true, {}, na.tinymce.naTinyDefaultOptions, {
        selector: "textarea.tinymce"
    });

    na.tinymce.simple = $.extend(true, {}, na.tinymce.naTinyDefaultOptions, {
        selector: "textarea.tinymce_simple",
        font_formats: "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Opensans='Open Sans', sans-serif; Raleway=raleway; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
        content_style: "@import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');",
    });

	na.tinymce.mobile = $.extend(true, {}, na.tinymce.naTinyDefaultOptions, {
		selector: "textarea.tinymce_mobile",
		remove_script_host: false
	});

    na.tinymce.newsletter = $.extend(true, {}, na.tinymce.naTinyDefaultOptions, {
		selector: "textarea.tinymce_newsletter",
		content_css: "",
		remove_script_host: false
	});

    for (var i = 0; i < na.tinymce.newsletter.plugins.length; ++i) {
        na.tinymce.newsletter.plugins[i][0] = na.tinymce.newsletter.plugins[i][0].replace("media", "");
    }

    na.tinymce.mail = $.extend(true, {}, na.tinymce.naTinyDefaultOptions, {
        selector: "textarea.tinymce_mail",
        content_css: "",
        remove_script_host: false,
        formats: {
			aligncenter: [
				{selector: 'figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li', styles: {textAlign: 'center'}, defaultBlock: 'div'},
				{selector: 'table', collapsed: false, styles: {marginLeft: 'auto', marginRight: 'auto'}}
			]
        }
    });

    // pour les mails pas de lien vers les pages du site
	for (var i = 0; i < na.tinymce.mail.add_links.length; ++i)
	{
	    if (na.tinymce.mail.add_links[i] == 'page')
			na.tinymce.mail.add_links[i] = '';
	}

    for (var i = 0; i < na.tinymce.mail.plugins.length; ++i) {
        na.tinymce.mail.plugins[i][0] = na.tinymce.mail.plugins[i][0].replace("media", "");
    }

    na.tinymce.mail_fullpage = $.extend(true, {}, na.tinymce.mail, {
        selector: "textarea.tinymce_mail_fullpage",
        plugins: $.merge( $.merge([], na.tinymce.mail.plugins), [["fullpage"]])
    });


    na.tinymce.histo = $.extend(true, {}, na.tinymce.naTinyDefaultOptions, {
        selector: "textarea.tinymce_histo"
    });

    na.tinymce.emploi = $.extend(true, {}, na.tinymce.naTinyDefaultOptions, {
        selector: "textarea.tinymce_emploi"
    });
    
    for (var i = 0; i < na.tinymce.emploi.plugins.length; ++i) {
        na.tinymce.emploi.plugins[i][0] = na.tinymce.emploi.plugins[i][0].replace("moxiemanager", "");
    }
    
    na.tinymce.gls = $.extend(true, {}, na.tinymce.naTinyDefaultOptions, {
        selector: "textarea.tinymce_gls",
        add_links:["", "", "", ""]
    });

    na.tinymce.model_doc = $.extend(true, {}, na.tinymce.naTinyDefaultOptions, {
        selector: "textarea.tinymce_model_doc",
        plugins: [
            ["contextmenu", "netassoc", "code"]
        ],    
        menu : {
            file   : {title : 'File'  , items : 'newdocument'},
            edit   : {title : 'Edit'  , items : 'undo redo | cut copy paste pastetext | selectall | searchreplace'},
            insert : null,
            view : null,
            format : {title : 'Format', items : 'bold italic underline'},
            table : null,
            tools  : {title : 'Tools' , items : 'spellchecker code'}
        },
        toolbar: 
        [
            "undo redo | bold italic underline forecolor | alignleft aligncenter alignright alignjustify",
            ""
        ],
        content_css: "",
        contextmenu: "na_dyn_data",
        formats: {
            bold : {inline : 'strong' },  
            italic : {inline : 'i' },
            underline : {inline : 'u', exact : true}
        }
    });
}

na.tinymce.init_all_specific = function () {

}
