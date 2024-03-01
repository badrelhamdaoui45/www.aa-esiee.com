(function($) {
	$.like = {version: '0.1'};
	$.fn.extend({
		like: function(options) {
			var defaults = {
				
				likeMsg: "J'aime",
				dislikeMsg: "Je n'aime plus",

				likeTitle: "J'aime ça",
				dislikeTitle: "Je n'aime plus cet élément",

				likeClass: 'pleaseLike',
				dislikeClass: 'noMoreLike',

				clickableType: 'div',
				clickableSelector: '.likeButton',

				showPersonneWhoLikeClass: "showLikers",
				showPersonneWhoLikeTitle: "Cliquez pour voir les personnes qui aiment cette publication",
				showPersonneWhoLikeUrl: "/global/module/like/ajax/showLike.php"
			};
            
		    var opts = $.extend(defaults, options);
		    
		    $(this).each(function()
			{
				var item = $(this);
				
				if (item.data('likeReady')) {
					return item;
				}
				item.data('likeReady', true);
				
		    	item.find(opts.clickableType + opts.clickableSelector).each(function()
				{
					var clickableItem = $(this);
					
		    		if (clickableItem.is("." + opts.likeClass))
		    		{
						clickableItem.find(opts.clickableSelector + 'Content span')
							.html(opts.likeMsg)
						clickableItem.attr("title", opts.likeTitle);
		    		}

			    	else if (clickableItem.is("." + opts.dislikeClass))
			    	{
						clickableItem.find(opts.clickableSelector + 'Content span')
							.html(opts.dislikeMsg)
						clickableItem.attr("title", opts.dislikeTitle);
			    	}
				});
				item.find(opts.clickableType + opts.clickableSelector).unbind('click').click(function() {
					
					var item = $(this);
					if (!item.is("." + opts.showPersonneWhoLikeClass))
					{
						var container = item.closest("div.likeLine");

					    $.post((typeof url_root != "undefined" ? url_root : "" ) + "/global/module/like/ajax/changeLike.php", { param : container.attr("id") }, function(data) {
							var line = $(data);
							container.replaceWith(line);
							line.like();
							container = false;
						});		    			
					}
				});
		    	return item;
		    });
		}
	});
})(jQuery);

$(function() {
    if( $(".likeLine").length ) {
        $(".likeLine").like();
    }
})
