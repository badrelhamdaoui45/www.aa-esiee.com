function set_focus(d, el)
{
	if (!el)	// if form element not set - do nothing
		return;

	if ((x = findObj(e, d)) != null) {
		if (x.focus)
			x.focus();
		if (x.select)
			x.select();
	}
}

function syn(s)
{
	if (!s || !s.options || !s.options.length)
		return false;

	if (s.options[s.options.length - 1].selected)
		s.options[s.options.length - 1].selected = false;
}

function plesk_scroll(w)
{
	var nav = navigator.appName;
	var ver = parseInt(navigator.appVersion);
	if ((nav.indexOf('Netscape') != -1) && (ver == 4) && w.document.location.hash) {
		var aname = w.document.location.hash.substr(1);
		var an = w.document.anchors[aname];
		if (an)
			w.scrollTo(an.x, an.y);
	}
}

function MM_reloadPage(init)	// reloads the window if Nav4 resized
{
	if (init == true)
		with (navigator) {
			if ((appName == 'Netscape') && (parseInt(appVersion) == 4)) {
				document.MM_pgW = innerWidth;
				document.MM_pgH = innerHeight;
				onresize = MM_reloadPage;
			}
		}
	else
		if ((innerWidth != document.MM_pgW) || (innerHeight != document.MM_pgH))
			location.reload();
}

function getButtonName(name)
{
    re = /^bname_([A-Za-z0-9-]+)$/;
    return name.replace(re,"$1");
}


function isFramed()
{
	return !opt_no_frames && top.workFrame && top.leftFrame && top.topFrame;
}

function setActiveButtonByName(name)
{
	try {
		return top.leftFrame.setActiveNode(name);
	} catch (e) {
		return false;
	}
}

function setActiveButton(o)
{
	try {
		return top.leftFrame.setActiveNode(o.id);
	} catch (e) {
		return false;
	}
}

function setScrollInIE()
{
	try {
		var navL = top.leftFrame.document.getElementById ('navArea');
		top.leftFrame.document.body.scroll = (navL.clientHeight > top.leftFrame.document.documentElement.clientHeight || navL.clientWidth > top.leftFrame.document.documentElement.clientWidth) ? 'yes' : 'no';
	} catch (e) {
		return false;
	}
}

//---------------------------------- redirect

function go_to(href)
{
	return go_to_workframe(href);
}

function go_to_workframe(href)
{
	_go_to(isFramed() ? top.workFrame : this, href);
}

function refresh_leftframe()
{
	_refresh(top.leftFrame);
}

function go_to_leftframe(href)
{
	_go_to(top.leftFrame, href);
}

function refresh_topframe()
{
	_refresh(top.topFrame);
}

function go_to_topframe(href)
{
	_go_to(top.topFrame, href);
}

function go_to_top(href)
{
	_go_to(top, href);
}

function _refresh(target)
{
	try {
		target.location.reload();
	} catch (e) {
		alert (e);
	}
}

function _go_to(target, href)
{
	try {
		target.location = href;
	} catch (e) {
	}
}

//---------------------------------- conhelp & help

function SetConHelp(conhelp_name, direct)
{
	try {
		return top.leftFrame._SetConHelp(conhelp_name, direct);
	} catch (e) {
		return false;
	}
}

function SetContext(context)
{
	SetHelpModule('');

	if (opt_integrated_mode && !opt_no_frames)
		return top.SetContext(context)

	try {!$
		if (context)
			top._context = context;
	} catch (e) {
		return false;
	}

	return SetConHelp();
}

function SetHelpModule(module)
{
	if (opt_integrated_mode && !opt_no_frames && top.SetHelpModule)
		return top.SetHelpModule(module)

	try {
		top._help_module = module;
	} catch (e) {
		return false;
	}

	return true;
}

function GetContext()
{
	try {
		return top._context;
	} catch (e) {
		return false;
	}
}

function GetHelpPrefix()
{
	try {
		return top._help_prefix;
	} catch (e) {
		return false;
	}
}

function GetHelpModule()
{
	try {
		return top._help_module;
	} catch (e) {
		return false;
	}
}

function mouse_move(context, direct)
{
	if (!opt_integrated_mode || opt_no_frames) {
		return SetConHelp(context, direct);
	} else {
		try {
			return top.mouse_move(context);
		} catch (e) {
			return false;
		}
	}
}

function lon(target)
{

	try {
		if (undefined == target)
			target = this;

		if (undefined == target._lon_disabled_arr)
			target._lon_disabled_arr = new Array();
		else if (target._lon_disabled_arr.length > 0)
			return true;

		target.document.getElementById("loaderContainer").style.display = "";
		var select_arr = target.document.getElementsByTagName("select");

		for (var i = 0; i < select_arr.length; i++) {
			select_arr[i].disabled = true;
			_lon_disabled_arr.pop(select_arr[i]);
			var clone = target.document.createElement("input");
			clone.type = "hidden";
			clone.name = select_arr[i].name;
			var values = new Array();
			for (var n = 0; n < select_arr[i].length; n++) {
				if (select_arr[i][n].selected) {
					values[values.length] = select_arr[i][n].value;
				}
			}
			clone.value = values.join(",");
			select_arr[i].parentNode.insertBefore(clone, select_arr[i]);
		}
	} catch (e) {
		return false;
	}
	return true;
}

function loff(target)
{
	try {
		if (undefined == target)
			target = this;

		target.document.getElementById("loaderContainer").style.display = "none";
		if (undefined == target._lon_disabled_arr)
			return true;

		for (;_lon_disabled_arr.legth > 0;) {
			var select = _lon_disabled_arr.push();
			select.disabled = false;

			var clones_arr = target.document.getElementsByName(select.name);
			for (var n = 0; n < clones_arr.length; n++) {
				if ("hidden" == clones_arr[n].type)
					clones_arr[n].parent.removeChild(clones_arr[n]);
			}
		}
	} catch (e) {
		return false;
	}
	return true;
}

/**
 * Wrapper pour les appels ajax crossdomain.
 * Sous IE 8 et 9 le post est transformé en GET (le comportement peu être changé mais je n'ai pas réussi a transmettres des paramètres en POST)  
 * 
 * @param method - POST or GET
 * @param url - url to call
 * @param params - data to send
 * @param callback_success - callback on success
 * @returns false on IE7 and less
 */
function crossDomainAjax(method, url, params, callback_success, callback_done)
{
	var isIE10Up = false;

	// IE10
	if (navigator.appVersion.indexOf("MSIE 10") !== -1)
		isIE10Up = true;

	// IE11
	if (navigator.userAgent.indexOf("Trident") !== -1 && navigator.userAgent.indexOf("rv:11") !== -1)
		isIE10Up = true;

	// IE8 & 9 only Cross domain JSON GET request
	if (!isIE10Up && 'XDomainRequest' in window && window.XDomainRequest !== null)
	{
        var xdr = new XDomainRequest(); // Use Microsoft XDR
        xdr.open('GET', url + (url.indexOf('?') > 0 ? '&' : '?' ) + params);
        xdr.onload = function () {
			if (typeof callback_success == 'function')
	            callback_success(); // internal function

			if (typeof callback_done == 'function')
				callback_done(); // internal function
        };

        xdr.onerror = function() {
            _result = false;
        };
        xdr.ontimeout = function() {
        	_result = false;
        };

        xdr.send();
	}

	// IE7 and lower can't do cross domain
	else if (!isIE10Up && navigator.userAgent.indexOf('MSIE') != -1 && parseInt(navigator.userAgent.match(/MSIE ([\d.]+)/)[1], 10) < 8)
	{
		return false;
	}

	// Do normal jQuery AJAX for everything else
	else {
		$.support.cors = true;
		$.ajax(
				{
					url: url,
					type: method,
					xhrFields: {withCredentials: true},
					crossDomain: true,
					data: params,
					success : 
						function (data)
						{
							if (typeof callback_success == 'function')
								callback_success(data);
						},
					complete :
						function (data)
						{
							if (typeof callback_done == 'function')
								callback_done(data);
						}
				}
			);
    }
    
    return true;
}



/**
* @return : js $_GET array
*/

function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi,
		function( m, key, value ) {
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;
	}
	return vars;
}

$( function(){
	if( '1' === $_GET('mdp') && $('.fancyForgotPass').size()){
		$('.fancyForgotPass').eq(0).trigger('click');
	}
})





/* Forums */
$( function() {
	var trs = $('#groupe_forum,.groupe_forum_table').find('tr:visible').filter( function() {
		return $.trim($(this).text()) != ''  ;
	});
	
	Array.prototype.forEach.call( trs, child => {
		var wrapper = document.createElement('div');
		wrapper.classList.add('forum-row');
		child.parentNode.insertBefore(wrapper, child);
		
		Array.prototype.forEach.call(child, td => {
			td.classList.add('td-');
		});
		
		wrapper.appendChild(child);
	});
});

function copyToClipboard(elementId, imageId, text) {
	const $temp = $("<input>");
	$("body").append($temp);
	console.log($('#' + elementId).text());
	$temp.val($('#' + elementId).text()).select();
	document.execCommand("copy");
	const $image = $('#' + imageId);
	$image.removeClass('fa-copy');
	$image.addClass('fa-paste');
	$image.find(">:first-child").text(text);
	$temp.remove();
}