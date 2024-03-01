;(function($) {
    var commentMethods = {
        init: function() {
            return $(this).each(function() {
				
                var $this = $(this),
                data =  $this.data('comment');
				
                if (!data) {
                    $(this).data('comment', {
                        target : $this
                    });
                    $this.hover(function(e) {
                        e.stopImmediatePropagation();
                        //$this.closest(".na_comment").find(".commentDeleteLink:visible").hide();
                        $this.closest(".na_comment").find(".commentDeleteLink:first").show();
                    }, function(e) {
                        e.stopImmediatePropagation();
                        $this.find(".commentDeleteLink:visible").hide();
                    });
					$(this).find('.commentDeleteLink').click(function() {
						$(this).closest('.na_comment').comment('_remove');
						return false;
					});
                }
            });
        },
		_remove: function() {
			var container = this;
            var url = (typeof url_root != "undefined" ?  url_root : "" ) + '/global/module/comment/ressources/ajax/ajax_deleteComment.php'
			$.post(url, { id : $(this).find('.commentDeleteLink').attr('id') }, function() {
				container.animate({opacity: 0}, function(){
					$(this).wrap('<div/>').parent().slideUp('fast', function() {
						$(this).remove();
					});
				});
				
				return false;
			});
		}
    };

    $.fn.comment = function(method) {
        if ( commentMethods[method] )
        {
            return commentMethods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        }
        else if ( typeof method === 'object' || ! method )
        {
            return commentMethods.init.apply( this, arguments );
        }
        else
        {
            $.error( 'Method ' +  method + ' does not exist on jQuery.comment' );
        }
    };
	
    /* Pour le formulaire */
    var commentFormMethods = {
        init: function() {
            return $(this).each(function() {
                var $this = $(this),
                data =  $this.data('commentForm');
			
                if (!data) {
                    $(this).data('commentForm', {
                        target : $this,
                        justOne: $this.find("input[name=justOne]").val(),
                        wall:  $this.find("input[name=wall]").val()
                    });
					 
                    $(".commentButton:not(.noHide)").keydown(function() {
                        $(this).slideUp();
                    });
                }
            });
        },
			
        postComment: function () {
            return $(this).each(function() {
                var $this = $(this),
                params = $this.data('commentForm');
				
                if ($this.find('.commentFormTxt').is(":visible") && !$this.find('.commentFormTxt').val().length)
                {
                    alert('Vous ne pouvez pas poster un commentaire vide!');
                    return false;
                }
                else if ($this.find('.commentFormUrl').is(":visible") && !$this.find('.commentFormUrl').val().length)
                {
                    alert('Vous ne pouvez pas publier une url vide!');
                    return false;
                }
				$('.invitePublish').addClass('disabled');

                var data = $this.serialize();
                data = data.replace(/(%E2%80%93|%E2%80%94)/g, '-');
				data = data.replace(/%E2%80%99/g, "'");
				data = data.replace(/(%E2%80%9C|%E2%80%9D|%E2%80%92)/g, '"');
				data = data.replace(/%E2%80%A6/g, '...');
				data = data.replace(/%C5%93/g, 'oe');
                var url = (typeof url_root != "undefined" ?  url_root : "" ) + '/global/module/comment/ressources/ajax/ajax_postComment.php'
                $.post(url, data, function(data) {
                    $('.invitePublish').removeClass('disabled');
					$this.find(".preview").slideUp("1000");
					
					
                    if (params.justOne != 'false')
                    {
                        $('.na_comment').slideUp("1000").remove();
                        ncomment = $(data);
                        ncomment.find('.likeLine').like();
                        $(data).hide().comment().insertBefore($this).slideDown();
                    }
                    else
                    {
                        if (params.wall != "0") // Si on est sur une publication avancée type wall
                        {
                            ncomment = $(data);
                            ncomment.find('.likeLine').like();
                            ncomment.hide().comment().insertAfter($this).slideDown().find(".commentForm").commentForm().commentFormMagic();
                        }							
                        else
                        {
                            ncomment = $(data);
                            ncomment
                            .find('.likeLine')
                            .like();
                            ncomment
                            .hide()
                            .comment();
                                                
                            if ($this.closest(".Wall_reactions").length) // Si on est effectivement sur un wall on l'insère dans le wall
                            {
                                ncomment.prependTo($this.closest(".Wall_reactions")).slideDown();
                            }
                                                        
                            else // Sinon (cas des news)
                            {
                                                    
                                ncomment.insertBefore($this.parent('.form_area')).slideDown();
                            }
                        }
                    }					
                }, 'html');
                $this.find('.commentFormTxt').val($this.find('.commentFormTxt').attr("default"));
                $this.find('.commentFormUrl').val($this.find('.commentFormUrl').attr("default"));

                return true;
            });
        }
    };
	

    $.fn.commentForm = function(method) {
        if ( commentFormMethods[method] )
        {
            return commentFormMethods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        }
        else if ( typeof method === 'object' || ! method )
        {
            return commentFormMethods.init.apply( this, arguments );
        }
        else
        {
            $.error( 'Method ' +  method + ' does not exist on jQuery.commentForm' );
        }
    };
	
})(jQuery);

function shareComment(content){
    var url = (typeof url_root != "undefined" ?  url_root : "" ) + '/global/generpx_xdcomm.html'
		
    RPXNOW.init({
        appId: 'animhabgcoigmcedhnjg',
        xdReceiver: url
    });

    RPXNOW.loadAndRun(['Social'], function () {
        var activity = new RPXNOW.Social.Activity(
            "Partager",
            content,
            "<?php echo URL_ROOT; ?>");
        RPXNOW.Social.publishActivity(activity);
    });
}

UTF8 = {
    encode: function(s){
        for(var c, i = -1, l = (s = s.split("")).length, o = String.fromCharCode; ++i < l;
            s[i] = (c = s[i].charCodeAt(0)) >= 127 ? o(0xc0 | (c >>> 6)) + o(0x80 | (c & 0x3f)) : s[i]
        );
        return s.join("");
    },
    decode: function(s){
        for(var a, b, i = -1, l = (s = s.split("")).length, o = String.fromCharCode, c = "charCodeAt"; ++i < l;
            ((a = s[i][c](0)) & 0x80) &&
            (s[i] = (a & 0xfc) == 0xc0 && ((b = s[i + 1][c](0)) & 0xc0) == 0x80 ?
                o(((a & 0x03) << 6) + (b & 0x3f)) : o(128), s[++i] = "")
        );
        return s.join("");
    }
};

function deleteComment(id, elem)
{
    
	if (confirm('Êtes-vous sur(e) de vouloir supprimer ce commentaire ?'))
    {
	var url = (typeof url_root != "undefined" ?  url_root : "" ) + '/global//module/comment/ressources/ajax/ajax_deleteComment.php'

    	$.post(url, 'id='+id);
    	$(elem).closest('tr').hide('slow');
    	decompteComment();
    }
    return false;
}

function validerComment(id, elem)
{    
	if (confirm('Êtes-vous sur(e) de vouloir valider ce commentaire ?'))
    {
	var url = (typeof url_root != "undefined" ?  url_root : "" ) + '/module/comment/ressources/ajax/ajax_valideComment.php'
    	$.post(url, 'id='+id);
    	$(elem).closest('a').hide('slow');
    }
    return false;
}

function decompteComment(){
	var nb = parseInt($('#resultat_nombre').html()) - 1;
	$('#resultat_nombre').html(nb);
	if(nb > 1)
    	$('#resultat_texte').html('résultats');
	else
		$('#resultat_texte').html('résultat');
}
			
$(function() {
    if( $(".na_comment").length ) 
        $(".na_comment").comment();
    
    if( $(".commentForm").length ) 
        $(".commentForm").commentForm().commentFormMagic();
});
