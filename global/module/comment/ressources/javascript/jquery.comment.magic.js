(function($) {
	var commentFormMagicMethods = {
		init: function() {
			return this.each(function() {
				var $this = $(this),
				data =  $this.data('commentFormMagic');
				
				if (!data) {
					 $(this).data('commentFormMagic', {
			               na : false,
			               oldContent : false,
			               content : false,
			               youtubeMovies : false,
			               dailymotionMovies : false,
			               externalPage : false,
			               movieId : false,
			               title : false,
			               description : false,
			               img : false,
			               imgCurrentPos : 0,
			               imgMaxPos : 0,
			               tmp : "",
			               loadedPics : 0,
			               prompt: $this.find(".commentFormUrl")
			           });
					 $this.find(".PublishItemType").click(function() {
							$(".PublishItemType.current").removeClass("current");
							$(this).addClass("current");
						});
						
					$this.find(".commentArea").find('textarea').focus(function() { $(this).val(""); });
					$this.find(".commentArea").find('input:text').focus(function() { $(this).val(""); });
					if (typeof $.elastic != 'undefined')
						$this.find('.commentFormTxt').elastic();
					$this.find('.commentFormUrl').keyup(function(e) { 
						if (e.keyCode == 13)
						{
							e.preventDefault();
							$this.commentFormMagic("parseIt", { replace : false, loader: true });
							return false;
						}
					});
					
					$this.find(".commentFormUrl,.commentFormTxt").focus(function() {
						$(this).closest(".commentArea").find(".commentButton").slideDown();
					});
					$this.find(".invitePublish").click(function() {
					    $(this).hide();
					    if ($(this).closest(".commentArea").find(".commentFormTxt").length) {
                            $(this).closest(".commentArea").find(".commentFormTxt").show().css('height', '100').focus();
                            $(this).closest(".commentArea").find(".commentFormTxt").show().focus().val();
					    }
					    if ($(this).closest(".commentArea").find(".commentFormUrl").length) {
                            $(this).closest(".commentArea").find(".commentFormUrl").show().focus().val();
					    }
					});
				}
			});
		},
		
		debug: function() {
			return $(this).data('commentFormMagic');
		},
		
		showPublish: function(options) {
			return this.each(function() {
				var $this = $(this),
	            params = $this.data('commentFormMagic');
				
				// on supprime les erreurs liées aux insultes
				$this.parent('div').parent('div').find('.error_insulte').remove();
				
				/* On masque le preview et on le vide */
				$this.find(".preview").hide().empty();				
				/**/
				$this.find(".shareLink").show();				
				/* On désactive les zones de saisies */
				$this.find(".commentArea:visible").find(".commentFormTxt, .commentFormUrl").attr("disabled", "disabled");
				/* On masque la zone de publication active */
				$this.find(".commentArea:visible").hide();
				/* On réactive */
				$this.find(".comment" + options.part).css("display", "block").find("input,textarea").removeAttr("disabled");
				$this.find(".commentArea:visible").find('.commentFormTxt, .commentFormUrl').val($this.find(".commentArea:visible").find('.commentFormTxt, .commentFormUrl').attr("default"));
				
				$this.find(".commentArea:visible").find('.commentFormTxt, .commentFormUrl').hide();
				$this.find(".commentArea:visible").find('.invitePublish').show();
				$this.find(".commentButton").hide();
				
				$this.find("td.PublishItemType.current").removeClass("current");
				$this.find("td.showArea" + options.part).addClass("current");

			});
		},
		
		parseIt: function(options) {
			return this.each(function() {
				var $this = $(this),
	            params = $this.data('commentFormMagic');
				params.content = params.prompt.val();
				if (!options || !options.replace)
					options.replace = false;
				 else
				 {
					 params.oldContent = "";
					 $this.commentFormMagic('updateTmp');
					 params.prompt.val(params.tmp);
					 return false;
				 }
				 if (params.content == "" || params.content == params.oldContent)
				    return true;
				 params.youtubeMovies = false;
				 params.dailymotionMovies = false;
				 params.externalPage = false;
				 params.movieId = false;
				 params.title = false;
				 params.description = false;
				 params.oldContent = params.content;
				 params.img = false;
				 params.imgCurrentPos = 0;
				 $this.find(".preview").hide().empty();
				 var expr = /http:\/\/www\.youtube\.com\/watch\?v=(.{11})&?.*/ig;
				 if (expr.test(params.content)) {
					 params.movieId = RegExp.$1;
					 params.youtubeMovies = true;
				 } else {
					 var expr = /http:\/\/youtu\.be\/(.{11})&?.*/ig;
					 if (expr.test(params.content)) {
						 params.movieId = RegExp.$1;
						 params.youtubeMovies = true;
					 }
				 }
				 var expr = /http:\/\/www\.dailymotion\.com\/video\/(.{6})_.*/;
				 if (!params.youtubeMovies && expr.test(params.content)) {
					 expr.exec(params.content);
					 params.movieId = RegExp.$1;
					 params.dailymotionMovies = true;
				 }
				 
				 if (params.dailymotionMovies || params.youtubeMovies) {
					 $this.commentFormMagic("updateTmp");
					 $this.commentFormMagic("fillPreview", { loader: false, replace: false });
				 } else {
					 $.get("/global/module/comment/ressources/ajax/isUrl.php", { url : params.content }, function(data) {
						 if (data !== "1") {
							 alert(params.content + " n'est pas une url valide!");
							 return;
						 }
						 params.loadedPics = 0;
						 $this.commentFormMagic("updateTmp");
						 params.externalPage = true;
						 $this.commentFormMagic("fillPreview", { loader : true, replace: false });
						 
						 $.get("/global/module/comment/ressources/ajax/naUrlWrapper.php", { url : params.content, wall: params.wall }, function(data) {
							 $this.commentFormMagic("fillPreview", { loader: false, htmlcode: data });
							 $this.commentFormMagic("updateTmp");
						 }, "html");
					 });
				 }
			});
		},
		
		getAjaxLoaderHTML: function (options) {
			if (!options || !options.hide) options.hide = false;
			ret = "<div style='" + (options.hide ? "display : none;" : "") + "padding-right : 20px; text-align : right; width : 95%' class='previewLoader'><img src='/global/images/ajax-loader.gif' border='0' /></div><br />";
			return ret;
		},
		
		fillPreview: function (options) {
			return this.each(function() {
				
				var $this = $(this),
	            params = $this.data('commentFormMagic');
				
				if (!options.loader)
					options.loader = false;
				
				$this.find(".shareLink").hide();
				if (options.loader) {
			    	$this.find('.preview').html($this.commentFormMagic("getAjaxLoaderHTML", { hide : false })).show();
			    	return true;
			    }
				if (params.youtubeMovies) {
			    	$this.find(".preview").html('<center><iframe title="YouTube video player" width="350" height="295" src="http://www.youtube.com/embed/' + params.movieId + '" frameborder="0" allowfullscreen></iframe></center>');
			    }
				else if (params.dailymotionMovies) {
					$this.find(".preview").html('<center><iframe frameborder="0" width="350" height="300" src="http://www.dailymotion.com/embed/video/' + params.movieId + '?theme=none"></iframe></center>');
				}
				else if (params.externalPage) {
					$this.find(".preview").empty().html( options.htmlcode );
				}
				button = $('<a>').html('Publier').button({ icons : { primary : 'ui-icon-check' } }).css('float', 'right');
				button
					.click(function() {
						var contenutComment = UTF8.encode(params.content);
						$this.commentFormMagic("parseIt", { replace: true });
						$this.commentForm("postComment");
						$this.commentFormMagic("showPublish", { part: "Simple" });
						return false;
					});
				
				$this.find(".preview").append(button).show();
			    
			    params.prompt.removeAttr("readonly");
			});
		},
		disablePrompt: function() {
			return this.each(function() {
				var $this = $(this),
	            params = $this.data('commentFormMagic');
				
				$this.find("input:visible, textarea:visible").attr("readonly", "readonly").attr("disabled", "disabled");
	        });
		},

		enablePrompt: function() {
			return this.each(function() {
				var $this = $(this),
	            params = $this.data('commentFormMagic');
				
				$this.find("input:visible, textarea:visible").removeAttr("readonly").removeAttr("disabled");
	        });
		},
		
		updateTmp: function() {
			
			return this.each(function() {
				var $this = $(this),
	            params = $this.data('commentFormMagic');
				
				if (params.youtubeMovies)
				{
					params.tmp = "[YoutubeMovies:" + params.movieId  + "]";
				}
				else if (params.dailymotionMovies)
				{
					params.tmp = "[dailymotionMovies:" + params.movieId  + "]";
				}
				else if (params.externalPage)
				{
					params.tmp = "[Page:" + params.content + 
						(params.title ? "#title=" + params.title : "") + 
						(params.description ? "#description=" + params.description : "") + 
						(params.img ? "#image=" + params.img : "") + "]";
				}
				else
				{
					params.tmp = params.content;
				}
	        });
		},
		
		selectPrevPics: function () {
			return this.each(function() {
				var $this = $(this),
	            params = $this.data('commentFormMagic');
				
				if (!params.externalPage) return false;
				
				if (params.imgCurrentPos != 0)
				{
					params.imgCurrentPos--;
					$this.find(".previewLinkImg:visible").hide();
					$this.find(".previewLinkImg").eq(params.imgCurrentPos).show();
				}
				
				params.img = $this.find(".previewLinkImg:visible").attr("src");
				
				$this.commentFormMagic("updateTmp");
			});
		},
		
		selectNextPics: function(item) {
			return this.each(function() {
				var $this = $(this),
	            params = $this.data('commentFormMagic');
				
				if (!params.externalPage || params.imgCurrentPos == params.imgMaxPos)
				{
					return false;
				}
				
				if (params.imgMaxPos && params.loadedPics <= params.imgMaxPos)
				{
					$.get("/global/module/comment/ressources/ajax/loadImage.php", { load : params.loadedPics + 1, url : params.content }, function(data) 
					{
						$this.find(".imgPreviewContainer").append(data);
						params.loadedPics++;
					});
				}
				if (params.imgCurrentPos <= params.imgMaxPos)
				{
					params.imgCurrentPos++;
					$this.find(".previewLinkImg:visible").hide();
					$this.find(".previewLinkImg").eq(params.imgCurrentPos).show();
				}
				
				params.img = $this.find(".previewLinkImg:visible").attr("src");
				$this.commentFormMagic("updateTmp");		
			});
		}
	};
	$.fn.commentFormMagic = function(method) {
		if ( commentFormMagicMethods[method] )
		{
			return commentFormMagicMethods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		}
		else if ( typeof method === 'object' || ! method )
		{
			return commentFormMagicMethods.init.apply( this, arguments );
		}
		else
		{
			$.error( 'Method ' +  method + ' does not exist on jQuery.commentFormMagic' );
		}
	};
})(jQuery);
