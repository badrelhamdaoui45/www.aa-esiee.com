(function($) 
{
    $.eventTimeout = { version: '1' };

    $.fn.extend(
		{
			eventTimeout : 
				function (options)
				{
					switch (options)
					{
						case 'trigger' :
							if ($(this).data('events'))
								$(this).trigger($(this).data('events'));
							return;
							break;
					}

					var defaults =	{
						delay : 300,
						events : typeof $.browser != 'undefined' && $.browser.msie == true && parseInt($.browser.version, 10) <= 8 ? 'change keyup focusout' : 'input',
						each : false,
						callback : function () {}
					};

					var opts = $.extend(defaults, options);

					var last = false;
					
					var func = 
						function (event)
						{
														
							if (opts.each)
								$(this).data('last', new Date().getTime());
							else
								last = new Date().getTime();
						
							var _this = $(this);
	
							setTimeout(function () { _this.checkElapsed(opts.delay, opts.callback, opts.each, last, event); }, opts.delay);
						};
					
					$(this).data('events', opts.events).on(opts.events, func);
					
					if (opts.events.indexOf('input') != -1)
					{
						$(this).each(
							function ()
							{
								if ($(this).is('select, input[type="checkbox"], input[type="radio"], input[type="file"]'))
									$(this).change(func);
							}
						);
					}
					
					return $(this);
				},
			
			checkElapsed :
				function (delay, callback, lastOnElem, last, event)
				{
					var elapsed = new Date().getTime() - (lastOnElem ? $(this).data('last') : last);
					
					if (elapsed >= delay)
						callback($(this), event);
				}
	    }
	);
})(jQuery);