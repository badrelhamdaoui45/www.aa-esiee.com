/*
* Changelog
* v 0.1 - Fonctionnement basique
* v 0.2 - Optimisation de code
* v 0.3 - Ajout du support du plugin jquery.actual pour calculer la largeur optimale
* v 0.31 - Ajout d'Ã©vÃ¨nements pour pouvoir influer sur le plugin
* v 0.32 - Optimisation de selecteurs > vitesse amÃ©liorÃ©e
* v 0.33 - Ajout d'une option pour dÃ©rouler les suboptions quand le select est disabled
*/

function initSearchSelectMultiple(newSelect, opts, block) {
    var search = $('<input type="text" class="input-search text">');
    newSelect.prepend(search);
    if( newSelect.find('.input-search').length > 1)
        newSelect.find('.input-search:eq(1)').remove();

	var prefix_url  = '';
    if( typeof url_root != 'undefined' && url_root )
		prefix_url = url_root;

    search.after('<img src="' +prefix_url+ '/global/images/loupe_16x16.png" class="img-search">');
    
    if( newSelect.find('.img-search').length > 1)
        newSelect.find('.img-search:eq(1)').remove();
    
    search.width(parseInt(newSelect.find('div:first').width()) - 57);

	var callback = function ()
	{
		search.eventTimeout({
								delay: 500,
								callback:
									function (elem)
									{
										elem.addClass('loading');

										setTimeout(
											function ()
											{
												var str = noAccentSpace($.trim(elem.val()));

												if (str)
												{
													var pattern = new RegExp('.*' + str + '.*', 'i');

													// options simples
													elem.parent().find('> .nOption label').each(
														function ()
														{
															var subject = noAccentSpace($(this).text());

															if (!subject.match(pattern))
																$(this).parent('.nOption').hide();
															else
																$(this).parent('.nOption').show();
														}
													);

													if( block ) {
														// options simples block
														elem.parent().find('.nOption label').each(
															function ()
															{
																var subject = noAccentSpace($(this).text());

																$this = $(this).parent('.nOption');

																if (!subject.match(pattern)) {
																	$this.hide();
																	$this.closest('tr').hide();
																} else {
																	$this.show();
																	$this.closest('tr').show();
																}
															}
														);
													}
													// options des optgroup
													elem.parent().find('.optGroupList .nOption label').each(
														function ()
														{
															var subject = noAccentSpace($(this).text());

															if (!subject.match(pattern)) {
																$(this).parent('.nOption').hide();
																if( block && 0)
																	$(this).parent('.nOption').closest('tr').hide();
															}
															else {
																$(this).parent('.nOption').show();
																if( block )
																	$(this).parent('.nOption').closest('tr').show();
															}
														}
													);

													// optgroup
													elem.parent().find('.optGroupList .optGroupDisplay label').each(
														function ()
														{
															var subject = noAccentSpace($(this).text());
															var parent = $(this).parents('.optGroupList');

															if (!subject.match(pattern))
															{
																// si ya aucun enfant qui match on cache
																if (!parent.find('.nOption:not(:hidden)').length )
																	parent.hide();

															}
															else
															{
																//si ca match on affiche tous les enfants
																parent.show().find('.nOption').show();
																if( block )
																	parent.find('.nOption').closest('tr').show();

															}

															if (!parent.find('.nOption:hidden').length)
																parent.find('.optGroupDisplay img').attr('src', opts.lessPic);
															else
																parent.find('.optGroupDisplay img').attr('src', opts.morePic);
														}
													);

												}
												else
												{

													elem.parent().find('> .nOption').show();
													if( block ) {
														elem.parent().find('.nOption').show();
														elem.parent().find('.nOption').closest('tr').show();
													}
													elem.parent().find('.optGroupList').show().find('.nOption').hide().end().find('.optGroupDisplay img').attr('src', opts.morePic);
													elem.parent().find('.optGroupList .optGroupList').hide();
												}

												elem.removeClass('loading');

											}, 50
										);

									}
							});
	}

	if( typeof $LAB != 'undefined') {
		$LAB.script(prefix_url + "/global/javascript/jquery.eventTimeout.js").wait(
			callback
		);
	}
	else {
		$.getScript(prefix_url + '/global/javascript/jquery.eventTimeout.js',
			callback
		);
	}
}

function initSelectMultiple (newSelect, opts ) {
            
    newSelect.find('input[type=checkbox]').unbind('click').click(function(e)
    {
        $this = $(this);
        $thisClosestDiv = $this.closest('div');
        $thisClosestOptgroup = $this.closest('.optGroupList');

        if ($this.is(':checked'))
        {
            $thisClosestDiv.addClass('selected');

            $(this).parents('.optGroupList').each(
                function ()
                {
                    
                    if ($(this).closest('.optGroupList').find('.inOptGroup:checked').length == $(this).closest('.optGroupList').find('.inOptGroup').length ||
                        ($(this).find('.optGroupList .optGroupDisplay input:checked').length && ($(this).find('.optGroupList .optGroupDisplay input:checked').length == $(this).find('.optGroupList .optGroupDisplay input').length)))
                        $(this).closest('.optGroupList')
                            .find('.optGroupDisplay').removeClass('semiselected').addClass('selected')
                            .find('input.optGroupCheck').attr('checked', 'checked');
                    else
                        $(this).closest('.optGroupList')
                            .find('.optGroupDisplay:first').addClass('semiselected')
                            .parents('.optGroupList').find('.optGroupDisplay:first').addClass('semiselected');
                }
            );
        }
        else
        {
            $thisClosestDiv.removeClass('selected');

            // 2015-04-03 : Loic Fevrier
            // Works with only 2 levels
            // Needs some more work if more than 2 levels

            if ($this.hasClass('inOptGroup'))
            {
                $thisClosestOptgroup.find('.optGroupDisplay')
                    .removeClass('selected')
                    .find('input[type=checkbox]')
                    .removeAttr('checked');

                if ($thisClosestOptgroup.find('.inOptGroup:checked').length)
                    $thisClosestOptgroup.find('.optGroupDisplay').addClass('semiselected');
                else
                    $thisClosestOptgroup.find('.optGroupDisplay').removeClass('semiselected');
            }

        }

        var	select = $(this).parents('.multipleSelect');

        var nb = select.find('input[type="checkbox"]').length;
        var nb_checked = select.find('input[type="checkbox"]:checked').length;

        if (nb_checked == nb)
            select.next('.checkall').find('.selectAll, .deselectPartial').hide().end().find('.deselectAll').show();
        else if (nb_checked)
            select.next('.checkall').find('.selectAll, .deselectAll').hide().end().find('.deselectPartial').show();
        else
            select.next('.checkall').find('.deselectAll, .deselectPartial').hide().end().find('.selectAll').show();

        // gestion du shift

        var last = select.find('input[type=checkbox].last-clicked');
        if (e.shiftKey && last.length)
        {
            var checkboxes = select.find('input[type="checkbox"]');
            var first_index = checkboxes.index(last);
            var last_index = checkboxes.index($(this));

            var min = first_index < last_index ? first_index : last_index;
            var max = first_index > last_index ? first_index : last_index;

            for (var i = min; i <= max; i++)
            {
                if (!checkboxes.eq(i).hasClass('optGroupCheck') || i == first_index)
                    checkboxes.eq(i).attr('checked', $(this).is(':checked')).click().attr('checked', $(this).is(':checked'));
            }
        }
        select.find('.last-clicked').removeClass('last-clicked');
        $(this).addClass('last-clicked');

    }); // End click

    newSelect.find(".optGroupCheck").click(function() {

        if (this.checked)
        {
            $(this).closest("div.optGroupList").find("input[type=checkbox]").each(
                    function ()
                    {
                        if(!$(this).is(':disabled'))
                            $(this).attr("checked", "checked").closest("div").addClass("selected");
                    }
                );

            //$(this).closest("div.optGroupList").find("input[type=checkbox]").closest("div").addClass("selected")
            $(this).closest("div").removeClass("semiselected").addClass("selected");
        }
        else
        {
            $(this).closest("div.optGroupList").find("input[type=checkbox]").removeAttr("checked").closest("div").removeClass("selected");
            $(this).closest("div").removeClass("selected");

            var	select = $(this).parents('.multipleSelect');

            var nb = select.find('input[type="checkbox"]').length;
            var nb_checked = select.find('input[type="checkbox"]:checked').length;

            if (nb_checked == nb)
                select.next('.checkall').find('.selectAll, .deselectPartial').hide().end().find('.deselectAll').show();
            else if (nb_checked)
                select.next('.checkall').find('.selectAll, .deselectAll').hide().end().find('.deselectPartial').show();
            else
                select.next('.checkall').find('.deselectAll, .deselectPartial').hide().end().find('.selectAll').show();
        }
    }); // End click

    newSelect.find(".subOptions").click(function(e) {
        e.stopImmediatePropagation();

        if ($(this).closest("div").next().is(":visible"))
        {
            $(this).attr("src", opts.morePic);
            $(this).closest(".optGroupList").find("> div:not(.optGroupDisplay)").slideUp("fast");
        }
        else
        {
            $(this).attr("src", opts.lessPic);
            $(this).closest(".optGroupList").find("> div:not(.optGroupDisplay)").slideDown("fast");
        }
    }); // End click
}

(function($) {
    $.selectMultiple = {version: '0.33'};
    $.fn.extend({
        
    	makeBlock: 
			function (options)
			{
				var defaults = {
						morePic: "/global/images/skills_more.png",
						lessPic: "/global/images/skills_less.png",
						width : 'ajust',
						height : 'ajust',
						defaultHeight : '150px',
						optgroup : 'link'
					};
				
				var opts = $.extend(defaults, options);
                            $(this).each(
                            function()
		    	    {
		    	    	var select = $(this);
                                
		    	    	var newSelect = $('<div id="' + select.attr('id') + '" class="multipleSelect ' + select.attr('class') + '" tabindex="100"></div>');

		    	    	if (opts.height == 'css')
		    	    	{
		    	    		var height = (select.css("height") == '0px' ? opts.defaultHeight : select.css("height"));
		    	    		newSelect.css("height", height);
		    	    		
		    	    		// patch IE7
		    	    		newSelect.css('overflow', 'auto');
		    	    	}
		    	    	else if (opts.height != 'ajust' && !select.hasClass('custom'))
		    	    		newSelect.css("height", 'auto');

		    	    	if (opts.width == 'ajust')
		    	    		newSelect.css("width", 'auto');
		    	    	else if (opts.width && opts.width != 'ajust' && !select.hasClass('custom'))
		    	    		newSelect.css("width", opts.width);
		    	    	
		    	    	if (select.hasClass('custom'))
		    	    		newSelect.attr('style', select.attr('style'));
		    	    	
		    	    	if (select.css('max-width'))
		    	    		newSelect.css('max-width', select.css('max-width'));

		    	    	var idBase = select.attr("name").substr(0, select.attr("name").length - 2);

		    	    	var left_items = new Array();
		    	    	var right_items = new Array();
		    	    	
		    	    	// la 1ere moitié des options sont à gauche, l'autre a droite
		    	    	var nb_children = select.children().length;
		    	    	var nb_elem_per_col = Math.ceil(nb_children / 2);
		    	    	var i = 0;
		    	    	select.children().each(
		    	    		function() 
		    	    		{
		    	    			if (i < nb_elem_per_col)
		    	    				left_items[left_items.length] = $(this);
		    	    			else
		    	    				right_items[right_items.length] = $(this);
		    	    			i++;
		    	    		}
		    	    	);
		    	    	
		    	    	var index = select.data('index') ? select.data('index') : 1;
		    	    	
		    	    	// construction colonne de gauche
		    	    	var options_l = $('<table class="options_left"></table>');
		    	    	for (i = 0; i < left_items.length; i++)
	    	    		{
		    	    		var item = left_items[i];
		    	    		var name = typeof item.attr('name') != 'undefined' ? item.attr('name') : select.attr('name');
		    	    		
		    	    		var row = $('<tr> \
	    	    							<td> \
	    	    							</td> \
	    	    						</tr>');
		    	    		
		    	    		var option = ''
		    	    		if (item[0].nodeName == 'OPTION')
	    	    			{
	    	    				option = '	<div style="float: left; clear: left;" class="nOption' + (item.is(":selected") ? ' selected' : '') + '"> \
						    	    			<input type="checkbox"' + 
													(item.is(":selected") ? ' checked' : '') + 
													' id="' + idBase + index + '"' +
													' name="' + name + '"' +
													' value="' + item.val() + '"' +
													' style="float: left;"' + 
												'> \
    	    									<label for="' + (idBase + index) + '" style="float: left; width: 90%;"> \
													<span style="float: right; width: 100%;">' + 
														item.html() + 
													'</span> \
												</label> \
											</div>';
	    	    				index++;
	    	    			}
		    	    		else if (item[0].nodeName == 'OPTGROUP')
	    	    			{
		    	    			option = $('<div style="width: 100%;"> \
    	    									<div class="optGroupList"> \
    	    										<div class="optGroupDisplay' + (item.hasClass("selected") ? ' selected' : '') + '"> \
    	    										</div> \
    	    									</div> \
    	    								</div>');
		    	    			
		    	    			var checkbox = $('<input type="checkbox" class="optGroupCheck"' +
	        							' id="' + (idBase + index) + '" name="' + name + '" value="' + item.attr('value') + '"' + (item.hasClass("selected") ? ' checked="checked"' : '') + ' />');
		    	    			
		    	    			if (opts.optgroup == 'link')
					        		checkbox.click(
					    				function() 
					    				{
					    		        	if ($(this).is(":checked"))
							        		{
							        			$(this).closest("div.optGroupList").find("input[type=checkbox]").attr("checked", "checked")
							        				.closest("div").addClass("selected");
							        			
					    	    				$(this).closest("div").removeClass("semiselected").addClass("selected");
							        		}
					    		        	else
					    		        	{
					    		        		$(this).closest("div.optGroupList").find("input[type=checkbox]").removeAttr("checked")
					    		        			.closest("div").removeClass("selected");
					    		        		
					    	    				$(this).closest("div").removeClass("selected");
					    		        	}
					    				}
									);
		    	    			else
		    	    				checkbox.click(
					    				function() 
					    				{
					    		        	if ($(this).is(":checked"))
							        		{
					    		        		$(this).closest("div").removeClass("selected").addClass("selected");
							        		}
					    		        	else
				    		        		{
					    		        		$(this).closest("div").removeClass("selected");
				    		        		}
			    		        		}
				    				);
		    	    			
				        		option.find('.optGroupDisplay').append(checkbox);
				        		
				        		var img = $('<img src="' + opts.morePic + '" class="subOptions">');
    	    	        		img.click(
    	    	    				function() 
    	    	    				{
    	    	    		            if ($(this).closest("div").next().is(":visible"))
    	    	    		            {
    	    	    			            $(this).attr("src", opts.morePic);
    	    	    			            $(this).closest(".optGroupList").find("div:not(.optGroupDisplay)").slideUp("fast",
    	    	    			            		function ()
    	    	    			            		{
    	    	    			            			var max_height = $(this).parents('.multipleSelect').find('.options_left').css('height');
    	    	    			            			if (parseInt($(this).parents('.multipleSelect').find('.options_right').css('height')) > parseInt(max_height))
    	    	    			            				max_height = $(this).parents('.multipleSelect').find('.options_right').css('height');
    	    	    			            			
    	    	    			            			$(this).parents('.multipleSelect').css('height', max_height);
    	    	    			            		}
    	    			            			);
    	    	    		            }
    	    	    		            else
    	    	    		            {
    	    	    		            	$(this).attr("src", opts.lessPic);
    	    	    			            $(this).closest(".optGroupList").find("div:not(.optGroupDisplay)").slideDown("fast",
    	    	    			            		function ()
    	    	    			            		{
		    	    			            			var max_height = $(this).parents('.multipleSelect').find('.options_left').css('height');
		    	    			            			if (parseInt($(this).parents('.multipleSelect').find('.options_right').css('height')) > parseInt(max_height))
		    	    			            				max_height = $(this).parents('.multipleSelect').find('.options_right').css('height');
		    	    			            			
		    	    			            			$(this).parents('.multipleSelect').css('height', max_height);
    	    	    			            		}
	    	    			            		);
    	    				            }
    	    	    				}
    	    					);
    	    	        		option.find('.optGroupDisplay').append(img).
    	    	        			append('<label for="' + (idBase + index++) + '" style="font-weight : bold;">' + item.attr("label") + '</label>');
    	    	        		
    	    	        		item.children().each(
    	    	        			function ()
    	    	        			{
    	    		    	    		var name = typeof $(this).attr('name') != 'undefined' ? $(this).attr('name') : select.attr('name');

    	    	        				option.find('.optGroupList').append('<div style="float: left; clear: left;" class="nOption' + ($(this).is(":selected") ? ' selected' : '') + '"> \
															    	    		<input type="checkbox" class="inOptGroup"' + 
																						($(this).is(":selected") ? ' checked' : '') + 
																						' id="' + idBase + index + '"' +
																						' name="' + name + '"' +
																						' value="' + $(this).val() + '"' +
																						' style="float: left;"' + 
																				'> \
										    									<label for="' + (idBase + index) + '" style="float: left; width: 90%;"> \
																					<span style="float: right; width: 100%;">' + 
																						$(this).html() + 
																					'</span> \
																				</label> \
																			</div>');
    	    	        				index++;
    	    	        			}
    	        				);
    	    	        		
	    	    			}

	    	        		
	    	        		row.find('td').append(option);
    	        			options_l.append(row);
	    	    		}
		    	    	newSelect.append(options_l);

		    	    	// construction colonne de droite
		    	    	var options_r = $('<table class="options_right"></table>');
		    	    	for (i = 0; i < right_items.length; i++)
	    	    		{
		    	    		var item = right_items[i];
		    	    		var name = typeof item.attr('name') != 'undefined' ? item.attr('name') : select.attr('name');
		    	    		
		    	    		var row = $('<tr> \
	    	    							<td> \
	    	    							</td> \
	    	    						</tr>');
		    	    		
		    	    		var option = ''
		    	    		if (item[0].nodeName == 'OPTION')
	    	    			{
	    	    				option = '	<div style="float: left; clear: left;" class="nOption' + (item.is(":selected") ? ' selected' : '') + '"> \
						    	    			<input type="checkbox"' + 
													(item.is(":selected") ? ' checked' : '') + 
													' id="' + idBase + index + '"' +
													' name="' + name + '"' +
													' value="' + item.val() + '"' +
													' style="float: left;"' + 
												'> \
    	    									<label for="' + (idBase + index) + '" style="float: left; width: 90%;"> \
													<span style="float: right; width: 100%;">' + 
														item.html() + 
													'</span> \
												</label> \
											</div>';
	    	    				index++;
	    	    			}
		    	    		else if (item[0].nodeName == 'OPTGROUP')
	    	    			{
		    	    			option = $('<div style="width: 100%;"> \
    	    									<div class="optGroupList"> \
    	    										<div class="optGroupDisplay' + (item.hasClass("selected") ? ' selected' : '') + '"> \
    	    										</div> \
    	    									</div> \
    	    								</div>');
		    	    			
		    	    			var checkbox = $('<input type="checkbox" class="optGroupCheck"' +
	        							' id="' + (idBase + index) + '" name="' + name + '" value="' + item.attr('value') + '"' + (item.hasClass("selected") ? ' checked="checked"' : '') + ' />');
		    	    			
		    	    			if (opts.optgroup == 'link')
					        		checkbox.click(
					    				function() 
					    				{
					    		        	if ($(this).is(":checked"))
							        		{
							        			$(this).closest("div.optGroupList").find("input[type=checkbox]").attr("checked", "checked")
							        				.closest("div").addClass("selected");
							        			$(this).closest("div").removeClass("semiselected").addClass("selected");
							        		}
					    		        	else
					    		        	{
					    		        		$(this).closest("div.optGroupList").find("input[type=checkbox]").removeAttr("checked")
					    		        			.closest("div").removeClass("selected");
					    		        		$(this).closest("div").removeClass("selected");
					    		        	}
					    				}
									);
		    	    			else
		    	    				checkbox.click(
					    				function() 
					    				{
					    		        	if ($(this).is(":checked"))
							        		{
					    		        		$(this).closest("div").removeClass("selected").addClass("selected");
							        		}
					    		        	else
				    		        		{
					    		        		$(this).closest("div").removeClass("selected");
				    		        		}
			    		        		}
				    				);
		    	    			
				        		option.find('.optGroupDisplay').append(checkbox);
				        		
				        		var img = $('<img src="' + opts.morePic + '" class="subOptions">');
    	    	        		img.click(
    	    	    				function() 
    	    	    				{
    	    	    		            if ($(this).closest("div").next().is(":visible"))
    	    	    		            {
    	    	    			            $(this).attr("src", opts.morePic);
    	    	    			            $(this).closest(".optGroupList").find("div:not(.optGroupDisplay)").slideUp("fast",
    	    	    			            		function ()
    	    	    			            		{
		    	    			            			var max_height = $(this).parents('.multipleSelect').find('.options_left').css('height');
		    	    			            			if (parseInt($(this).parents('.multipleSelect').find('.options_right').css('height')) > parseInt(max_height))
		    	    			            				max_height = $(this).parents('.multipleSelect').find('.options_right').css('height');
		    	    			            			
		    	    			            			$(this).parents('.multipleSelect').css('height', max_height);
    	    	    			            		}
    	    			            			);
    	    	    		            }
    	    	    		            else
    	    	    		            {
    	    	    		            	$(this).attr("src", opts.lessPic);
    	    	    			            $(this).closest(".optGroupList").find("div:not(.optGroupDisplay)").slideDown("fast",
    	    	    			            		function ()
    	    	    			            		{
		    	    			            			var max_height = $(this).parents('.multipleSelect').find('.options_left').css('height');
		    	    			            			if (parseInt($(this).parents('.multipleSelect').find('.options_right').css('height')) > parseInt(max_height))
		    	    			            				max_height = $(this).parents('.multipleSelect').find('.options_right').css('height');
		    	    			            			
		    	    			            			$(this).parents('.multipleSelect').css('height', max_height);
    	    	    			            		}
	    	    			            		);

    	    				            }
    	    	    				}
    	    					);
    	    	        		option.find('.optGroupDisplay').append(img).
    	    	        			append('<label for="' + (idBase + index++) + '" style="font-weight : bold;">' + item.attr("label") + '</label>');
    	    	        		
    	    	        		item.children().each(
    	    	        			function ()
    	    	        			{
    	    		    	    		var name = typeof $(this).attr('name') != 'undefined' ? $(this).attr('name') : select.attr('name');

    	    		    	    		option.find('.optGroupList').append('<div style="float: left; clear: left;" class="nOption' + ($(this).is(":selected") ? ' selected' : '') + '"> \
															    	    		<input type="checkbox" class="inOptGroup"' + 
																						($(this).is(":selected") ? ' checked' : '') + 
																						' id="' + idBase + index + '"' +
																						' name="' + name + '"' +
																						' value="' + $(this).val() + '"' +
																						' style="float: left;"' + 
																				'> \
										    									<label for="' + (idBase + index) + '" style="float: left; width: 90%;"> \
																					<span style="float: right; width: 100%;">' + 
																						$(this).html() + 
																					'</span> \
																				</label> \
																			</div>');
    	    	        				index++;
    	    	        			}
    	        				);
    	    	        		
	    	    			}

	    	        		
	    	        		row.find('td').append(option);
    	        			options_r.append(row);
	    	    		}
		    	    	newSelect.append(options_r);

		    	    	// surlignage au click
		    	    	newSelect.find("input[type=checkbox]:not(.optGroupCheck)").click(
		    	    		function() 
		    	    		{
		    	    			if ($(this).is(":checked")) 
		    	    			{
		    	    				$(this).closest("div").addClass("selected");
		    	    				
		    	    				if (opts.optgroup == 'link')
	    	    					{
			    	    				if ($(this).hasClass("inOptGroup"))
			    	    				{
			    	    					if ($(this).closest(".optGroupList").find(".inOptGroup:checked").length == $(this).closest(".optGroupList").find(".inOptGroup").length)
			    	    					{
			    	    						$(this).closest(".optGroupList").find(".optGroupDisplay").removeClass("semiselected").addClass("selected").find("input.optGroupCheck").attr("checked", "checked");
			    	    					}
			    	    					else
			    	    					{
			    	    						$(this).closest(".optGroupList").find(".optGroupDisplay").addClass("semiselected");
			    	    					}
			    	    				}
	    	    					}
		    	    				else
	    	    					{
		    	    					$(this).closest(".optGroupList").find(".optGroupDisplay").addClass("semiselected");
	    	    					}
		    	    			}
		    	    	    	else 
		    	    	    	{
		    	    	    		$(this).closest("div").removeClass("selected");

		    	    				if (opts.optgroup == 'link')
	    	    					{
	    	    						if ($(this).hasClass("inOptGroup"))
			    	    				{
			    	    					$(this).closest(".optGroupList").find(".optGroupDisplay").removeClass("selected")
			    	    						.find("input[type=checkbox]")
			    	    						.removeAttr("checked");
	
			    	    					if ($(this).closest(".optGroupList").find(".inOptGroup:checked").length)
			    	    						$(this).closest(".optGroupList").find(".optGroupDisplay").addClass("semiselected");
			    	    					else
			    	    						$(this).closest(".optGroupList").find(".optGroupDisplay").removeClass("semiselected");
			    	    				}
	    	    					}
		    	    				else
	    	    					{
		    	    					if (!$(this).closest(".optGroupList").find(".inOptGroup:checked").length)
		    	    						$(this).closest(".optGroupList").find(".optGroupDisplay").removeClass("semiselected");
	    	    					}
		    	    	    	}
		    	    		}
		    	    	);

		    	    	// on replit les sous options des optgroup
		    	    	newSelect.find(".optGroupList div:not(.optGroupDisplay)").hide();

		    	    	if (opts.optgroup == 'link')
	    	    		{
			    	    	// si tte les options d'un optgroup sont selectionnées alors on selectionne aussi l'optgroup
			    	    	newSelect.find(".optGroupList").each(
			    	    		function ()
			    	    		{
			    	    			if ($(this).find("div:not(.optGroupDisplay) input[type=checkbox]").length &&
		    	    					$(this).find("div:not(.optGroupDisplay) input[type=checkbox]").length ==
			    	    				$(this).find("div:not(.optGroupDisplay) input[type=checkbox]:checked").length)
			    	    				$(this).find("div.optGroupDisplay").removeClass("semiselected").addClass("selected")
			    	    					.find('input.optGroupCheck').attr("checked", "checked");
			    	    			else if ($(this).find("div:not(.optGroupDisplay) input[type=checkbox]:checked").length)
			    	    				$(this).find("div.optGroupDisplay").removeClass("selected").addClass("semiselected")
			    	    					.find('input.optGroupCheck').attr("checked", false);
			    	    		}
			    	    	);
	    	    		}

		    	    	// remplacement du vieux select par le nouveau
		    	    	select.after(newSelect).remove();
		    	    	
		    	    	// equilibrage options gauche / droite (dans le cas ou les options tiennent sur +ieur lignes)
		    	    	while (options_l.actual('height') < options_r.actual('height'))
	    	    		{
		    	    		var item = options_r.find('tr:first');
		    	    		options_l.append(item);
	    	    		}
		    	    	
		    	    	if (opts.height == 'ajust' && !select.hasClass('custom'))
		    	    		newSelect.css("height", options_l.actual('height'));


                                if (select.hasClass('searchable') /* && (newSelect.height() < height) */)
				{
                                    initSearchSelectMultiple(newSelect, opts, 1);
				}


		    	    }
	    		);
			},
			
		selectMultiple: function(options)
		{
		    var defaults =
		    {
				morePic: '/global/images/skills_more.png',
				lessPic: '/global/images/skills_less.png',
				width : 'ajust',
				height : 'clone',
				beforeTransform: false,
				afterTransform: false,
				displayOptOnDisabledItem: false
		    };
		    var opts = $.extend(defaults, options);
		    
		    $(document).trigger('beforeTransform');

		    $(this).each(function()
		    {
		    	originalSelect		= $(this);
				originalSelectName	= originalSelect.attr('name');
	            originalSelectDisabled	= originalSelect.is(':disabled');

				if (typeof opts.beforeTransform == 'function')
					opts.beforeTransform(originalSelect);

		    	newSelect = $(document.createElement('div'));
	            newSelect.addClass(originalSelect.attr('class') + ' multipleSelect').removeClass('select');
	            
		    	if (opts.height == 'clone')
		    	{
			    	newSelect.css('height', typeof $.actual == 'undefined' ? originalSelect.css('height') : originalSelect.actual('height'));
			    }
		    	else if (opts.height != 'css')
		    	{
			    	newSelect.css('height', opts.height);
			    }

				if (opts.width && opts.width != 'ajust')
				{
				    newSelect.css('width', opts.width);
				}

    	    	if (originalSelect.css('max-width'))
    	    		newSelect.css('max-width', originalSelect.css('max-width'));

				/*
				* Then, insert the new select after the replaced item. Maybe not optimized!
				*/

				var optGroupStarted = false;
				var current_optGroup = false;
				nwidth = 0;
				i = 1;
				idBase = originalSelectName.substr(0, originalSelectName.length - 2);

				var version = originalSelect.data('version');
				
				if (!version)
				{
					$('*', originalSelect).each(function()
					{
					    $_originalSelectItem		    = $(this);
					    $_originalSelectItemIsSelected   = $_originalSelectItem.is(':selected') || $_originalSelectItem.hasClass('selected');
                        //$_originalSelectItemIsSelected   = (typeof this.selected !== "undefined" && this.selected) || $_originalSelectItem.hasClass('selected');
					    $_originalSelectItemName	    = $_originalSelectItem.attr('name');
					    
					    $_itemLine = $(document.createElement('div')).css('width', '100%');
					    
					    $_itemID = idBase + i;
					    
					    /*
					     * If an optgroup is started and finish now
					     */
					    if (optGroupStarted && $_originalSelectItem.context.parentNode.nodeName != 'OPTGROUP')
					    {
							optGroupStarted = false;
							insideCheckedOptGroup = current_optGroup.find('.inOptGroup:checked');
							insideOptGroup = current_optGroup.find('.inOptGroup');
							
							if (insideCheckedOptGroup.length)
							{
							    optGroupDisplayButton = current_optGroup.find('.optGroupDisplay');
							    
							    if (insideCheckedOptGroup.length == insideOptGroup.length)
							    {				
									optGroupDisplayButton
								    	.removeClass('semiselected')
								    	.addClass('selected');
									optGroupDisplayButton.find('.optGroupCheck').attr('checked', 'checked');
							    }
							    else
							    {
									optGroupDisplayButton.addClass('semiselected');
							    }
							}
							/* This is the end of the inside item collections, so we're adding now the currentOptGroup to his containing line, not before! */
							current_optGroup.appendTo(newSelect);
					    } // Endif
					    
					    
					    if ($_originalSelectItem[0].nodeName == 'OPTGROUP')
						{
						    optGroupStarted = true;
						    current_optGroup = $(document.createElement('div')).addClass('optGroupList');
						    
						    optGroupLibelleContainer = $(document.createElement('div')).addClass('optGroupDisplay');
						    
						    if ($_originalSelectItemIsSelected)
						    {
						    	optGroupLibelleContainer.addClass('selected');
						    }
						    
						    checkbox = $(document.createElement('input')).attr({
								'type': 'checkbox',
								'checked' : $_originalSelectItemIsSelected,
								'value' : $_originalSelectItem.attr('value'),
								'id' : $_itemID,
								'disabled' : originalSelectDisabled
						    }).addClass('optGroupCheck');
	
						    if (typeof $_originalSelectItemName != 'undefined')
						    	checkbox.attr('name', $_originalSelectItemName);
						    
						    checkbox.appendTo(optGroupLibelleContainer);
	
						    img = $(document.createElement('img')).attr('src', opts.morePic).addClass('subOptions');
	
						    var label = $_originalSelectItem.attr("label") || $.trim($_originalSelectItem.html());
						    					    
						    var optgroupLibelle = $(document.createElement('label'))
								.attr('for', $_itemID)
								.css('font-weight', 'bold')
								.html(label);
	
						    img.appendTo(optGroupLibelleContainer);
	
						    optgroupLibelle.appendTo(optGroupLibelleContainer);
						    optGroupLibelleContainer.appendTo(current_optGroup);
						}
					    else if ($_originalSelectItem[0].nodeName == 'OPTION')
						{
						    if ($_originalSelectItemIsSelected)
						    {
								$_itemLine.addClass('selected');
						    }
	
						    $_itemLine.addClass('nOption');
	
						    checkbox = $(document.createElement('input')).attr({
								'type': 'checkbox',
								'checked' : $_originalSelectItemIsSelected,
								'name' : $_originalSelectItemName && (typeof $_originalSelectItemName != 'undefined') ? $_originalSelectItemName : originalSelectName,
								'value' : $_originalSelectItem.val(),
								'id' : $_itemID,
								'disabled' : originalSelectDisabled || ($_originalSelectItem.attr('disabled') != 'undefined' && $_originalSelectItem.attr('disabled') == 'disabled'),
                                'class' : $_originalSelectItem.attr('class') != 'undefined' ?  $_originalSelectItem.attr('class') : ''
						    });
						    
                            var label = $(document.createElement('label'));
                            label.attr('for', $_itemID);
                            if( $_originalSelectItem.attr('class') != 'undefined' )
                                label.attr('class', $_originalSelectItem.attr('class'));
						    span = label.html($_originalSelectItem.html());
						    
						    /*
						     * If we have a started optGroup, then, add the line inside!
						     */
						    if (optGroupStarted)
						    {
								checkbox
								    .addClass('inOptGroup')
								    .appendTo($_itemLine);
								    
								span.appendTo($_itemLine);
								$_itemLine.appendTo(current_optGroup);
						    }
						    else
						    {
								checkbox.appendTo($_itemLine);
								span.appendTo($_itemLine);
								$_itemLine.appendTo(newSelect);
						    }
						}
					   
					    i++;
					}); // End each
					/*
					 * If an optgroup is opened and is the first & last item, then we never close it and append it to the container
					 */
					if (optGroupStarted)
					{
					    optGroupStarted = false;
					    insideCheckedOptGroup = current_optGroup.find('.inOptGroup:checked');
					    insideOptGroup = current_optGroup.find('.inOptGroup');
	
					    if (insideCheckedOptGroup.length)
					    {
							optGroupDisplayButton = current_optGroup.find('.optGroupDisplay');
	
							if (insideCheckedOptGroup.length == insideOptGroup.length)
							{				
							    optGroupDisplayButton
									.removeClass('semiselected')
									.addClass('selected');
							    optGroupDisplayButton.find('.optGroupCheck').attr('checked', 'checked');
							}
							else
							{
							    optGroupDisplayButton.addClass('semiselected');
							}
					    }
					    /* This is the end of the inside item collections, so we're adding now the currentOptGroup to his containing line, not before! */
					    current_optGroup.appendTo(newSelect);
					} // End if
				}
				else if (version == 2)
				{
					$('*', originalSelect).each(
						function()
						{
						    $_originalSelectItem		    = $(this);
						    $_originalSelectItemIsSelected   = $_originalSelectItem.is(':selected') || $_originalSelectItem.hasClass('selected');
						    $_originalSelectItemName	    = $_originalSelectItem.data('name');
						    						    
						    $_itemLine = $(document.createElement('div')).css('width', '100%');
						    
						    $_itemID = idBase + i;
						    
						    if ($_originalSelectItem.data('optgroup') || originalSelect.find('option[data-id_parent="' + $_originalSelectItem.val() + '"]').length)
							{
							    current_optGroup = $(document.createElement('div')).addClass('optGroupList').attr('id', 'group_' + $_originalSelectItem.val());
							    optGroupLibelleContainer = $(document.createElement('div')).addClass('optGroupDisplay');
							    
							    if ($_originalSelectItemIsSelected)
							    	optGroupLibelleContainer.addClass('selected');
							    
							    checkbox = $(document.createElement('input')).attr({
									'type': 'checkbox',
									'checked' : $_originalSelectItemIsSelected,
									'value' : $_originalSelectItem.attr('value'),
									'id' : $_itemID,
									'disabled' : originalSelectDisabled
							    }).addClass('optGroupCheck');
		
							    if (typeof $_originalSelectItemName != 'undefined')
							    	checkbox.attr('name', $_originalSelectItemName);
							    
							    optGroupLibelleContainer.append(checkbox);
		
							    img = $(document.createElement('img')).attr('src', opts.morePic).addClass('subOptions');
									    					    
							    var optgroupLibelle = $(document.createElement('label'))
									.attr('for', $_itemID)
									.css('font-weight', 'bold')
									.html($.trim($_originalSelectItem.html()));
		
							    optGroupLibelleContainer.append(img);
							    optGroupLibelleContainer.append(optgroupLibelle);
							    
							    current_optGroup.append(optGroupLibelleContainer);
							    
							    
							    // init selection
								insideCheckedOptGroup = current_optGroup.find('.inOptGroup:checked');
								insideOptGroup = current_optGroup.find('.inOptGroup');
								
								if (insideCheckedOptGroup.length)
								{
								    optGroupDisplayButton = current_optGroup.find('.optGroupDisplay');
								    
								    if (insideCheckedOptGroup.length == insideOptGroup.length)
								    {				
										optGroupDisplayButton
									    	.removeClass('semiselected')
									    	.addClass('selected');
										optGroupDisplayButton.find('.optGroupCheck').attr('checked', 'checked');
								    }
								    else
								    {
										optGroupDisplayButton.addClass('semiselected');
								    }
								}
								
								if (!$_originalSelectItem.data('id_parent'))
									newSelect.append(current_optGroup);
								else
								{
									var parent = newSelect.find('.optGroupList[id="group_' + $_originalSelectItem.attr('data-id_parent') + '"]').find('> div:last');
									
									parent.after(current_optGroup);
								}
							}
						    else if (!$_originalSelectItem.data('optgroup') && !originalSelect.find('option[data-id_parent="' + $_originalSelectItem.val() + '"]').length)
							{
							    if ($_originalSelectItemIsSelected)
							    {
									$_itemLine.addClass('selected');
							    }
		
							    $_itemLine.addClass('nOption');
		
							    checkbox = $(document.createElement('input')).attr({
									'type': 'checkbox',
									'checked' : $_originalSelectItemIsSelected,
									'name' : $_originalSelectItemName && (typeof $_originalSelectItemName != 'undefined') ? $_originalSelectItemName : originalSelectName,
									'value' : $_originalSelectItem.val(),
									'id' : $_itemID,
									'disabled' : originalSelectDisabled
							    });
		
							    span = $(document.createElement('label')).attr('for', $_itemID).html($_originalSelectItem.html());
							    
							    if (!$_originalSelectItem.data('id_parent'))
							    {
									$_itemLine.append(checkbox);
									$_itemLine.append(span);
									newSelect.append($_itemLine);
								}
								else
								{
									var parent = newSelect.find('.optGroupList[id="group_' + $_originalSelectItem.attr('data-id_parent') + '"]').find('> div:last');
									
									checkbox.addClass('inOptGroup');
									$_itemLine.append(checkbox);
									$_itemLine.append(span);
									parent.after($_itemLine);
								}
							}
						   
						    i++;
						}
					); // End each
					
				}
				
				newSelect.find('.optGroupList div:not(.optGroupDisplay)').hide();
				
				if (!newSelect.find('.optGroupList div:not(.optGroupDisplay) input[type=checkbox]:not(:checked)').length && newSelect.find('.optGroupList div:not(.optGroupDisplay) input[type=checkbox]').length) {
				    newSelect.find('.optGroupList div.optGroupDisplay input[type=checkbox]').attr('checked', 'checked');
				}
				
				newSelect.find('.optGroupList div.optGroupDisplay.selected').each(
						function ()
						{
							$(this).parent('.optGroupList').find('.nOption').addClass('selected').find('input[type=checkbox]').attr('checked', 'checked');
									
						}
					);
				

				originalSelect.replaceWith(newSelect);

				if (originalSelect.hasClass('custom')) {
                    //console.log(originalSelectName + " : " + originalSelect.width());
					newSelect.css('width', originalSelect.width());
                }
				else if (opts.width == 'ajust') {
                    var list = newSelect.find('label');
                    var nbLabels = list.length;
				    optimalWidth = Math.max.apply(Math, list.map(function(){
					    if (typeof $.actual !== 'undefined' && nbLabels <= 100)
				    	    return $(this).actual('width', { 'clone' : true});
				        return $(this).width();
				    }).get());
				    
				    if (optimalWidth > nwidth) {
				        nwidth = optimalWidth;
				    }
					newSelect.css('width', Math.max(nwidth, 150) + 60);
                    //console.log(originalSelectName + " : ajust " + (nwidth + 60));
				}
				
				if (originalSelect.hasClass('checkall'))
				{
					var checkall = $('<span class="checkall" style="margin-left: 5px; vertical-align: top;"> \
										<img src="/global/images/select_all.png" class="deselectAll" alt="Tout décocher" border="0" style="cursor: pointer; vertical-align: top;" title="Tout décocher"> \
										<img src="/global/images/select_partial.png" class="deselectPartial" alt="Tout décocher" border="0" style="cursor: pointer; display: inline; vertical-align: top;" title="Tout décocher"> \
										<img src="/global/images/deselect_all.png" class="selectAll" alt="Tout cocher" border="0" style="cursor: pointer; display: inline; vertical-align: top;" title="Tout cocher"> \
									</span>');

					var nb = newSelect.find('input[type="checkbox"]').length;
					var nb_checked = newSelect.find('input[type="checkbox"]:checked').length;
					
					if (nb_checked == nb)
						checkall.find('.selectAll, .deselectPartial').hide();
					else if (nb_checked)
						checkall.find('.selectAll, .deselectAll').hide();
					else
						checkall.find('.deselectAll, .deselectPartial').hide();
					
					checkall.click(
							function ()
							{
								var select = $(this).prev('.multipleSelect');
								
								var checkboxes = select.find('input[type="checkbox"]');
								var nb_checked = select.find('input[type="checkbox"]:checked').length;
								
								if (nb_checked)
								{
									checkboxes.attr('checked', false);
									select.find('.selected, .semiSelected').removeClass('selected semiSelected');
									$(this).find('.deselectAll, .deselectPartial').hide().end().find('.selectAll').show();
								}
								else
								{
                                    checkboxes.each(
                                        function ()
                                        {
                                            if(!$(this).is(':disabled'))
                                                $(this).attr("checked", true).closest("div").addClass("selected");
                                        }
                                    );
                            
                                    //checkboxes.attr('checked', true);
									//select.find('.nOption, .optGroupDisplay').addClass('selected');
									$(this).find('.selectAll, .deselectPartial').hide().end().find('.deselectAll').show();
								}
							}
						);
					
					newSelect.css('display', 'inline-block').after(checkall);
				}

				var height = 0;
				newSelect.find('> .nOption:visible, .optGroupList:visible').each(function () { height += parseInt($(this).height()) });
				
				if (originalSelect.hasClass('searchable') /* && (newSelect.height() < height) */)
				{
                                    initSearchSelectMultiple(newSelect, opts, 0);
				}

				if (typeof opts.afterTransform == 'function')
					opts.afterTransform(newSelect);

				/*
				 * Binding click
				 */

				if (!originalSelectDisabled)
				{
					initSelectMultiple(newSelect, opts);

					if (originalSelect.hasClass('alert-before-leaving'))
					{
						newSelect.find('input[type=checkbox]').one('click', function () { addAlertBeforeLeaving(); });
					}

					if (originalSelect.hasClass('register-modify'))
					{
						newSelect.find('input[type=checkbox]').one('click', function () { setFormModified(); });
					}
				}
				else /* On ajoute un return si l'item est désactivé */
				{
					if (opts.displayOptOnDisabledItem)
					{
						newSelect.find(".subOptions").click(function(e) {
						    e.stopImmediatePropagation();
						    
						    if ($(this).closest("div").next().is(":visible"))
						    {
								$(this).attr("src", opts.morePic);
								$(this).closest(".optGroupList").find("div:not(.optGroupDisplay)").slideUp("fast");
						    }
						    else
						    {
								$(this).attr("src", opts.lessPic);
								$(this).closest(".optGroupList").find("div:not(.optGroupDisplay)").slideDown("fast");
						    }
						});
					}
					else
					{
						newSelect.click(function() { return false; });	
					}
				}
			}); // End each
		} // End function
    });
})(jQuery);
