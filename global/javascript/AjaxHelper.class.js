(function()
{ 
	AjaxHelper = 
		function (options)
		{
			this.options = options;
		};
		
	AjaxHelper.prototype = 
		{
			options: false,
			xhr: false,
	
			setOptions:
				function (options)
				{
					this.options = options;
				},
			
			option:
				function (option, value)
				{
					if (value != undefined)
					{
						eval('this.options.' + option + " = '" + value + "'");
						return this;
					}

					return eval('this.options.' + option);
				},
				
			beforeSend:
				function ()
				{
					if (this.xhr != false)
						this.xhr.abort();

					if (this.options.beforeSend != undefined)
					{
						try
						{
							this.options.beforeSend();
						}
						catch (e)
						{
							
						}
					}
				},
			
			success:
				function (data, textStatus, jqXHR)
				{
					this.xhr = false;
					this.options.success(data, textStatus, jqXHR);
				},
				
			send:
				function (data, cancelPrevious, callback)
				{
					if (callback != undefined)
						this.options.success = callback;

					var options = this.options;
					var _this = this;
				
					_this.xhr = $.ajax(
									{
										url: options.url,
										type: options.type,
										async: options.async,
										data: data,
                                        cache: false,
                                        contentType: typeof options.contentType != "undefined" ? options.contentType : "application/x-www-form-urlencoded; charset=UTF-8",
                                        processData: typeof options.processData != "undefined" ? options.contentType : true,
										dataType: options.dataType,
										beforeSend: cancelPrevious == undefined || cancelPrevious ? function () { _this.beforeSend(); } : false,
										success: function (data, textStatus, jqXHR) { _this.success(data, textStatus, jqXHR); }
									}
								);
					
					return _this;
				}
		};
})();
