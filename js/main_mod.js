// Config
if (location.hostname.indexOf('anti-code') != -1) {
	var BASE_URL = '';
} else {
	var BASE_URL = '/me';
}

$(function() {

(function() {

// WANT FULL HTML OR PART HTML ?
var want_full_html = $('#full_html').hasClass('included'),
	full_html = "<!doctype html>\n<html>\n\t<head>\n\t\t<meta charset=\"utf-8\">\n\t\t<title>Test</title>\n\n\t\t<!-- You can load more JS/CSS resources here :) -->\n\t</head>\n\t<body>\n\t\t\n\t\t<div id=\"fav\">Your Favourite HTML,CSS,JS Playground!</div>\n\t\n\t</body>\n</html>",
	part_html = "<div id=\"fav\">No code zone... Just kidding!</div>",
	default_source = "<!doctype html>\n<html>\n\t<head>\n\t\t<meta charset=\"utf-8\">\n\t\t<title>Test</title>\n\n\t\t\n\t</head>\n\t<body>\n\t\n\t</body>\n</html>";

var ctype_timeout_id = '',
	editor_pane_right = '0px';
//,		reset_resources = false;

var $save_timeline = false;

/*
HELPERS
*/

function remove_link_borders() {
	for ( i = 0; i < document.links.length; i++ ) {
		// register our event handler for each link
		document.links[i].onfocus = document.links[i].blur;
	}
}

/*function insert_resources(doc) {
	var style_sheets = [],
			scripts = [],
			custom_style_sheets = [],
			custom_scripts = [],
			res,
			node;

	if( choosen_res ) {
	
		for( var i = 0; i < choosen_res.length; i++ ) {
			res = choosen_res[i];
			if( res.custom == 1 ) continue;
			
			if( res.type == 'css' ) {
				// StyleSheets
				node = $('<link>', {'class': 'csscreations', rel: 'stylesheet', href: res.url})[0];
				doc.find('head')[0].appendChild(node);
			}
			else {
				// Scripts
				node = $('<script>', {'class': 'csscreations', src: res.url})[0];
				doc.find('head')[0].appendChild(node);
			}
		}
		
		// Custom Resources Now
		
		for( var i = 0; i < choosen_res.length; i++ ) {
			res = choosen_res[i];
			if( res.custom == 0 ) continue;
			
			if( res.type == 'css' ) {
				// StyleSheets
				node = $('<link>', {'class': 'csscreations', rel: 'stylesheet', href: res.url})[0];
				doc.find('head')[0].appendChild(node);
			}
			else {
				// Scripts
				node = $('<script>', {'class': 'csscreations', src: res.url})[0];
				doc.find('head')[0].appendChild(node);
			}
		}
		
	}
	
}*/

function remove_resources(doc, type) {
	var html;
	
	if( typeof doc == type ) {
		html = doc;
		// Remove all old included Stylesheets
		html = html.replace(/[\n][\t]*<link class="csscreations"[^\n]*/g, '');
		// Remove all old included Scripts
		html = html.replace(/[\n][\t]*<script class="csscreations"[^\n]*/g, '');
		
		return html;
	}
	else {
		// Remove Pre-Added StyleSheets, Scripts, Styles
		doc.find('head .csscreations').remove();
	}
}

function full_html_resources(html) {
	var resources = [],
		resources_html = [],
		res;

	html = remove_resources(html, 'string');
	
	// Included Resources
	if( choosen_res ) {
	
		for( var i = 0; i < choosen_res.length; i++ ) {
			res = choosen_res[i];
			if( res.custom == 1 ) continue;
			
			if( res.type == 'css' ) {
				// StyleSheets
				resources_html.push( '<link class="csscreations" rel="stylesheet" href="' + res.url + '">' );
				// resources.push($('<link>', {'class': 'csscreations', src: res.url, rel: 'stylesheet'})[0]);
			}
			else {
				// Scripts
				resources_html.push( '<script class="csscreations" src="' + res.url + '"></script>' );
				// resources.push($('<script>', {'class': 'csscreations', src: res.url})[0]);
			}
		}
		
		// Custom Resources Now
		
		for( var i = 0; i < choosen_res.length; i++ ) {
			res = choosen_res[i];
			if( res.custom == 0 ) continue;
			
			if( res.type == 'css' ) {
				// StyleSheets
				resources_html.push( '<link class="csscreations" rel="stylesheet" href="' + res.url + '">' );
				// resources.push($('<link>', {'class': 'csscreations', src: res.url, rel: 'stylesheet'})[0]);
			}
			else {
				// Scripts
				resources_html.push( '<script class="csscreations" src="' + res.url + '"></script>' );
				// resources.push($('<script>', {'class': 'csscreations', src: res.url})[0]);
			}
		}
		
		/*for( var res in included_res ) {
			if( res == 'custom_res' ) continue;
			scripts.push( '<script class="csscreations" src="' + included_res[res] + '">' );
		}
		for( var res in included_res['custom_res'] ) {
			scripts.push( '<script class="csscreations" src="' + included_res['custom_res'][res] + '">' );
		}*/
		/*// ocontent.find('head')[0].appendChild('lol');
		ocontent.find('head script.csscreations').load(function() { // time waster :P
			// alert('sup');
		});*/
		
		if( resources_html.length > 0 ) {
			
			head_str = html.match(/([\t])*<\/head>/);
			mod_head_str = "\t" + head_str[1] + resources_html.join("\n\t" + head_str[1]) + "\n" + head_str[0];
			html = html.replace(new RegExp(head_str[0]), mod_head_str);
			// console.log(html);
		}
	}
	
	return {'resources_html': resources_html, 'html': html};
}

function prepareHtml(html) {

	//if ( want_full_html ) {
	// html = full_html_resources(html);
	var arr = full_html_resources(html);
	// console.log(arr);
	
	if( arr['html'] != html && want_full_html ) {
		$('#html textarea:first').val(arr['html']);
		// setValue places cursor at first position :(
		code_mirror_html.setValue(arr['html']);
	}
	
	// arr['html'] = remove_resources(arr['html'], 'string');
	//}
	
	return arr['html'];
}

/*
function output_reload() {
	$('#docCanvas').load(function() {
		update_live_preview();
		// live_preview_trigger();
	});
}*/

// FILL choosen_res WITH CHOOSEN RESOURCES
function set_resources() {
	var selected_res = $('div.include li.included'),
		custom_res = $('div.include li.custom_resource')
		jq_ob = null;
			
	// Reset the included resource array
	choosen_res = [];
	
	// First, the Pre-Defined Resources
	for( var i = 0; i < selected_res.length; i++ ) {
		jq_ob = $(selected_res[i]);
		choosen_res.push({
			name: jq_ob.attr('data-resource_name'),
			url: resources[jq_ob.attr('data-resource_name')],
			custom: 0,
			type: jq_ob.attr('data-resource_type')
		});
	}
	console.log(choosen_res);
	
	// Now, the Custom Resources
	for( var i = 0; i < custom_res.length; i++ ) {
		jq_ob = $(custom_res[i]);
		choosen_res.push({
			name: jq_ob.attr('data-resource_name'),
			url: custom_resources[jq_ob.attr('data-resource_name')],
			custom: 1,
			type: jq_ob.attr('data-resource_type')
		});
	}
	// console.log(choosen_res);	
}

function delete_resource(name, custom) {
	var node;
	
	for( var i = 0; i < choosen_res.length; i++ ) {
		node = choosen_res[i];
		
		if( node.name == name ) {
			if( custom && node.custom == 1 ) {
				delete choosen_res[i];
				delete custom_resources[node.name];
			}
			if( !custom && node.custom == 0 ) delete choosen_res[i];
		}
	}
	
}

function custom_resource_duplicate(url) {
	for ( var name in custom_resources ) {
		if (custom_resources[name] == url ) return true;
	}
}

/*
ON PAGE LOAD CALLS
*/

remove_link_borders(); // Remove Default Borders from HyperLinks


// INCLUDE RESOURCES

// Master Libs Object - Thanks to JSBIN For this Object
var libs = {
	yui: {
		text: 'YUI',
		scripts: [
			{ text: 'YUI 3.3.0', url: 'http://yui.yahooapis.com/3.3.0/build/yui/yui-min.js'},
			{ text: 'YUI 2.8.2', url: 'http://ajax.googleapis.com/ajax/libs/yui/2.8.2/build/yuiloader/yuiloader-min.js'}
		]
	},
	mootools: {
		text: 'MooTools',
		scripts: [
			{ text: 'Mootools 1.3.2', url: 'http://ajax.googleapis.com/ajax/libs/mootools/1.3.2/mootools-yui-compressed.js'},
			{ text: 'Mootools 1.2.4', url: 'http://ajax.googleapis.com/ajax/libs/mootools/1.2.4/mootools-yui-compressed.js' }
		]
	},
	prototype: {
		text: 'Prototype',
		scripts: [
			{ text: 'Prototype latest', url: 'http://ajax.googleapis.com/ajax/libs/prototype/1/prototype.js' },
			{ text: 'Prototype 1.7.0.0', url: 'http://ajax.googleapis.com/ajax/libs/prototype/1.7.0.0/prototype.js'},
			{ text: 'Prototype 1.6.1.0', url: 'http://ajax.googleapis.com/ajax/libs/prototype/1.6.1.0/prototype.js' },
			{ text: 'script.aculo.us 1.8.3', url: 'http://ajax.googleapis.com/ajax/libs/scriptaculous/1.8.3/scriptaculous.js', requires: 'http://ajax.googleapis.com/ajax/libs/prototype/1/prototype.js' }
		]
	},
	jquery: {
		text: 'jQuery',
		scripts: [
			{ text: 'jQuery latest', url: 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js' },
			{ text: 'jQuery WIP (via git)', url: 'http://code.jquery.com/jquery-git.js' },
			{ text: 'jQuery 1.7.1', url: 'http://code.jquery.com/jquery-1.7.1.min.js' },
			{ text: 'jQuery 1.6.4', url: 'http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js' }
		]
	},
	jqueryui : {
		text: 'jQuery UI',
		requires: 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js',
		style: 'http://ajax.googleapis.com/ajax/libs/jqueryui/1/themes/base/jquery-ui.css',
		scripts: [
			{ text: 'jQuery UI 1.8.13', url: 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/jquery-ui.min.js' }
		]
	},
	jquerymobile : {
		text: 'jQuery Mobile',
		requires: 'http://code.jquery.com/jquery-1.6.4.min.js',
		style: 'http://code.jquery.com/mobile/1.0b3/jquery.mobile-1.0.min.css',
		scripts: [
			{ text: 'jQuery Mobile 1.0', url: 'http://code.jquery.com/mobile/1.0/jquery.mobile-1.0.min.js' },
			{ text: 'jQuery Mobile 1.0b3', url: 'http://code.jquery.com/mobile/1.0b3/jquery.mobile-1.0b3.min.js' }
		]
	},
	others: {
		text: 'Others',
		scripts: [
			{ text: 'Backbone 0.5.3', url: 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.5.3/backbone-min.js' },
			{ text: 'CoffeeScript', url: 'http://jashkenas.github.com/coffee-script/extras/coffee-script.js' },
			{ text: 'ES5 shim 1.2.4', url: 'http://cdnjs.cloudflare.com/ajax/libs/es5-shim/1.2.4/es5-shim.min.js' },
			{ text: 'ext-core 3.1.0', url: 'http://cdnjs.cloudflare.com/ajax/libs/ext-core/3.1.0/ext-core.js', style: 'http://extjs.cachefly.net/ext-3.1.0/resources/css/ext-all.css' },
			{ text: 'Less 1.1.3', url: 'http://cdnjs.cloudflare.com/ajax/libs/less.js/1.1.3/less-1.1.3.min.js' },
			{ text: 'Modernizr 2.0.6', url: 'http://cdnjs.cloudflare.com/ajax/libs/modernizr/2.0.6/modernizr.min.js' },
			{ text: 'Processing 1.2.3', url: 'http://cdnjs.cloudflare.com/ajax/libs/processing.js/1.2.3/processing-api.min.js' },
			{ text: 'RaphaÃ«l 2.0.0', url: 'http://cdnjs.cloudflare.com/ajax/libs/raphael/2.0.0/raphael-min.js' },
			{ text: 'Sammy 0.6.3', url: 'http://cdnjs.cloudflare.com/ajax/libs/sammy.js/0.6.3/sammy.min.js' },
			{ text: 'Sencha Touch', url: 'http://cdn.sencha.io/touch/1.1.0/sencha-touch.js', style: 'http://cdn.sencha.io/touch/1.1.0/resources/css/sencha-touch.css' },
			{ text: 'TwitterLib', url: 'http://remy.github.com/twitterlib/twitterlib.min.js' },
			{ text: 'underscore 1.2.2', url: 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.2.2/underscore-min.js' },
			{ text: 'Zepto 0.7', url: 'http://cdnjs.cloudflare.com/ajax/libs/zepto/0.7/zepto.min.js' }
		]
	},
	dojo : {
		text: 'Dojo',
		scripts: [
			{ text: 'Dojo 1.6.0', url: 'http://ajax.googleapis.com/ajax/libs/dojo/1.6.0/dojo/dojo.xd.js' },
			{ text: 'Dojo 1.4.1', url: 'http://ajax.googleapis.com/ajax/libs/dojo/1.4.1/dojo/dojo.xd.js' }
		]
	}
	// ext : {
	//   text: 'Ext Core',
	//   style: 'http://extjs.cachefly.net/ext-2.2/resources/css/ext-all.css',
	//   scripts: [
	//     { text: 'Ext Core 3.1', url: 'http://ajax.googleapis.com/ajax/libs/ext-core/3.1.0/ext-core.js' }
	//   ]
	// }
},

// NOTE if a new library category is added, you need to add it here
order = 'jquery jqueryui jquerymobile prototype yui mootools dojo others'.split(' '),
resources_list = [],
resources = {},
custom_resources = {},
choosen_res = cssdeck_choosen_res;

for (var i = 0; i < order.length; i++) {
	var css_class = '',
			resource_type = 'js',
			resource_name = '',
			resource_url = '';

	resources_list.push('<li class="include_head">' + libs[ order[i] ].text + '</li>');
	
	for( var n = 0; n < libs[ order[i] ].scripts.length; n++ ) {
	
		// For JS I am not going to define any Resource Type in the libs object, only for CSS, since CSS Resources are lesser than JS ones
		resource_type = libs[ order[i] ].scripts[n].resource_type ? 'css' : 'js';
		resource_name = libs[ order[i] ].scripts[n].text;
		resource_url = libs[ order[i] ].scripts[n].url;
		
		resources[resource_name] = resource_url;
		resources_list.push('<li class="' + css_class + '" data-resource_name="' + resource_name + '" data-resource_type="' + resource_type + '">' + resource_name + '</li>');
	}
}
$('div.include ul').html( resources_list.join('') );

// SET CUSTOM_RESOURCES
for( var i = 0; i < choosen_res.length; i++ ) {
	var node = choosen_res[i];
	
	if( node.custom == 1 ) {
		custom_resources[node.name] = node.url;
	}
}

/*
CODING
*/

/* GENERIC */
$('#reset_fields').click(function() {
	var $this = $(this),
		confirm_msg = $this.attr('data-confirm');

	var confirmed = confirm(confirm_msg);
	
	if ( confirmed ) {
		code_mirror_html.setValue('');
		code_mirror_css.setValue('');
		code_mirror_js.setValue('');
		
		code_mirror_save();
	}

	return false;
});

// CODEMIRROR INITIALIZATION
/*
extraKeys: {
	"Tab": "insertTab"
}
*/
$html_content = $("#html_textarea").val();
$css_content = $("#css_textarea").val();
$js_content = $("#js_textarea").val();
var $ohcp = 0; var $occp = 0; var $ojcp = 0;

code_mirror_html = CodeMirror.fromTextArea( $('#html textarea')[0], {
	mode: 'text/html',
	gutter: true,
	lineNumbers: true,
	indentUnit: 2,
	tabSize: 4,
	indentWithTabs: true,
	undoDepth: 0, 
	smartIndent: true, 
	extraKeys: {
		"Tab" : function(instance) {
			if (instance.somethingSelected())
				CodeMirror.commands.indentMore(instance);
			else
				CodeMirror.commands.insertTab(instance);
		}
	},
	onChange: function(instance, changes) {
		var $new_content = instance.getValue();
		//var $cursor = instance.getCursor();
		var $cursor = cm_to_linear_cursor($new_content, instance.getCursor());
		
		if(typeof $ohc == "undefined") $ohc = "";
		if($new_content != $ohc && should_render() || ($save_timeline !== true && $slide == $slides-1)) {
			update_live_preview();
		}
		
		/*
		if($save_timeline === true) {
			if(save_change("html", $html_content, $new_content, $cursor, $ohcp)) {
				$html_content = $new_content;
				$ohcp = $cursor;
				//console.log("OHCP: " + $ohcp);
			}
		}
		*/
	}, 
	
	onCursorActivity: function(instance) {
		//console.log($ohcp);
		if(typeof $marker != "undefined") $marker.clear();
		
		if($save_timeline === true) {
			var $selected = 0;
			var $new_content = instance.getValue();
			
			if(typeof $html_content == "undefined") $html_content = "";
			
			if($new_content == $html_content) {
				if(instance.somethingSelected()) {
					//console.log("Something is selected");
					$selected = 1;
				}
				var $cursor = cm_to_linear_cursor($new_content, instance.getCursor());
				//console.log($cursor);
				save_change("html", "", "", $cursor, $ohcp, $selected);
				$ohcp = $cursor;
			}
			else {
				//console.log($new_content + " does not match with " + $html_content);
			}
		}
		/*
		else if($save_timeline !== true && $slide == $slides-1) {
			update_live_preview();
		}
		 */
	}
});

code_mirror_css = CodeMirror.fromTextArea( $('#css textarea')[0], {
	mode: 'css',
	gutter: true,
	lineNumbers: true,
	indentUnit: 2,
	tabSize: 4,
	indentWithTabs: true,
	undoDepth: 0, 
	smartIndent: true, 
	extraKeys: {
		"Tab" : function(instance) {
			if (instance.somethingSelected())
				CodeMirror.commands.indentMore(instance);
			else
				CodeMirror.commands.insertTab(instance);
		}
	},
	onChange: function(instance, changes) {
		var $new_content = instance.getValue();
		//var $cursor = instance.getCursor();
		var $cursor = cm_to_linear_cursor($new_content, instance.getCursor());
		
		if(typeof $occ == "undefined") $occ = "";
		if($new_content != $occ && should_render() || ($save_timeline !== true && $slide == $slides-1)) {
			update_live_preview();
		}
		
		/*
		if($save_timeline === true) {
			if(save_change("css", $css_content, $new_content, $cursor, $occp)) {
				$css_content = $new_content;
				$occp = $cursor;
			}
		}
		*/
	}, 
	
	onCursorActivity: function(instance) {
		if(typeof $marker != "undefined") $marker.clear();
		
		if($save_timeline === true) {
			var $selected = 0;
			var $new_content = instance.getValue();
			if(typeof $css_content == "undefined") $css_content = "";
			if($new_content == $css_content) {
				if(instance.somethingSelected()) {
					//console.log("Something is selected");
					$selected = 1;
				}
				var $cursor = cm_to_linear_cursor($new_content, instance.getCursor());
				//console.log($cursor);
				save_change("css", "", "", $cursor, $occp, $selected);
				$occp = $cursor;
			}
			else {
				//console.log($new_content + " does not match with " + $css_content);
			}
		}
		/*
		else if($save_timeline !== true && $slide == $slides-1) {
			update_live_preview();
		}
		 */
	}
});

code_mirror_js = CodeMirror.fromTextArea( $('#js textarea')[0], {
	mode: 'javascript',
	gutter: true,
	lineNumbers: true,
	indentUnit: 2,
	tabSize: 4,
	indentWithTabs: true,
	undoDepth: 0, 
	smartIndent: true, 
	extraKeys: {
		"Tab" : function(instance) {
			if (instance.somethingSelected())
				CodeMirror.commands.indentMore(instance);
			else
				CodeMirror.commands.insertTab(instance);
		}
	},
	onChange: function(instance, changes) {
		/*if ( ctype_timeout_id ) {
			clearTimeout(ctype_timeout_id);
			// console.log('Cleared: ' + ctype_timeout_id);
		}
		ctype_timeout_id = setTimeout(update_live_preview, 500);*/
		
		var $new_content = instance.getValue();
		//alert($new_content);
		//var $cursor = instance.getCursor();
		var $cursor = cm_to_linear_cursor($new_content, instance.getCursor());
		
		if(typeof $ojc == "undefined") $ojc = "";
		if($new_content != $ojc && should_render() || ($save_timeline !== true && $slide == $slides-1)) {
			update_live_preview();
		}
		
		/*
		if($save_timeline === true) {
			if(save_change("js", $js_content, $new_content, $cursor, $ojcp)) {
				$js_content = $new_content;
				$ojcp = $cursor;
			}
		}
		 */
	},
	

	onCursorActivity: function(instance) {
		if(typeof $marker != "undefined") $marker.clear();
		
		/*
		if($save_timeline === true) {
			var $selected = 0;
			var $new_content = instance.getValue();
			if(typeof $js_content == "undefined") $js_content = "";
			if($new_content == $js_content) {
				if(instance.somethingSelected()) {
					//console.log("Something is selected");
					$selected = 1;
				}
				var $cursor = cm_to_linear_cursor($new_content, instance.getCursor());
				//console.log($cursor);
				save_change("js", "", "", $cursor, $ojcp, $selected);
				$ojcp = $cursor;
			}
			else {
				//console.log($new_content + " does not match with " + $js_content);
			}
		} else if($save_timeline !== true && $slide == $slides-1) {
			update_live_preview();
		}
		 */
	}
});

/* Dirty CM Bug Fix
if ( $('#html textarea:first').text() && !$('#html textarea:first').val() ) code_mirror_html.setValue($('#html textarea:first').text());
if ( $('#css textarea:first').text() && !$('#css textarea:first').val() ) code_mirror_css.setValue($('#css textarea:first').text());
if ( $('#js textarea:first').text() && !$('#js textarea:first').val() ) code_mirror_js.setValue($('#js textarea:first').text());
*/

// CODEMIRROR REFRESH
// If your code does something to change the size of the editor element (window resizes are already listened for), or unhides it, you should probably follow up by calling this method to ensure CodeMirror is still looking as intended.
function code_mirror_refresh(type) {
	switch (type) {
		case 'html': code_mirror_html.refresh(); break;
		case 'css': code_mirror_css.refresh(); break;
		case 'js': code_mirror_js.refresh(); break;
		default:
			code_mirror_html.refresh();
			code_mirror_css.refresh();
			code_mirror_js.refresh();
			break;
	}
}
// CODEMIRROR SAVE
// Copy the content of the editor into the textarea.
function code_mirror_save(type) {
	switch (type) {
		case 'html': code_mirror_html.save(); break;
		case 'css': code_mirror_css.save(); break;
		case 'js': code_mirror_js.save(); break;
		default:
			code_mirror_html.save();
			code_mirror_css.save();
			code_mirror_js.save();
			break;
	}
}

// CODEMIRROR TABS
function codemirror_expand(type) {
	//$('#code > div:not(#' + type + ')').hide();
	
	// If output has been disabled then mess with the width, else height
	var output_removed = $('.output').hasClass('removed');
	if( output_removed ) $('#' + type + '').show().css('width', '100%');
	else $('#' + type + '').show().css('height', '100%');
	
	$('ol .active').removeClass('active');
	$('.code_' + type + '').addClass('active');
	
	code_mirror_refresh();

	return false;
}

// HTML, CSS, JS TABS
$('#editor-tabs li a').click(function(e) {
	e.preventDefault();
	var href = $(this).attr('href'),
		$editor = href.split('#');
	
	if ($editor[1] !== 'show-all') {
		if ($(this).hasClass('enabled')) {
			$('#'+ $editor[1]).css({ display: 'none' }).removeClass('enabled');
			$(this).removeClass('enabled');
		} else {
			$('#'+ $editor[1]).css({ display: 'inline-block' }).addClass('enabled');
			$(this).addClass('enabled');
		}
	} else {
		// SHOW ALL EDITORS

		// Just Remove Height/Width and it will auto adjust based on its CSS Declaration :)
		//$('#code > div:not(.removed)').show().css({'height': '', 'width': ''});
		
		$('#html, #css, #js').css({ display: 'inline-block' }).addClass('enabled');
		$(this).addClass('enabled');
	}

	assemble_codemirrors();
	//code_mirror_refresh();
});

function assemble_codemirrors() {
	$count = $(".code_canvas").filter(".enabled").length;
	if($count == 1) $counter = "100%";
	else if($count == 2) $counter = "50%";
	else if($count == 3) $counter = "33.33%";
	
	//if($(".editor_pane").hasClass("horizontal")) $(".code_canvas").css("width", $counter).css("height", "100%");
	//if($(".editor_pane").hasClass("vertical")) $(".code_canvas").css("height", $counter).css("width", "100%");
}


// REALTIME PREVIEW AS THE CODE IS TYPED

//var ctype_timeout_id = '';
/*$('#code > div').live('keyup', function() {

	if ( $(this).attr('id') == 'js' ) {
	
		if ( ctype_timeout_id ) {
			clearTimeout(ctype_timeout_id);
			// console.log('Cleared: ' + ctype_timeout_id);
		}
		ctype_timeout_id = setTimeout(update_live_preview, 1000);
	}
	else {
		update_live_preview();
	}
});*/


function update_live_preview() {
	code_mirror_save();
	
	if ($(".resolutions_list .selected").attr("data-height") != "100%" && 
		$(".resolutions_list .selected").attr("data-width") != "100%") {
		var $iframe_width = $("#docCanvas").width() + "px";
		var $iframe_height = $("#docCanvas").height() + "px";
		var $iframe_marginTop = $("#docCanvas").css("margin-top");
	}
	/* Remove Add Iframes - Fixes so many bugs, haha - not bugs exactly, but if the previous code added some data on window like window.$ 
	then this seems like the best way to clear. or maybe for i in window delete window[i] :D */
	$("#docCanvas").remove();
	$('#output').append('<iframe id="docCanvas" src="' + BASE_URL + '/iframe.html" width="1000" height="800"></iframe>');
	
	if ($(".resolutions_list .selected").length > 0) {
		$("#docCanvas").css({ height: $iframe_height, width: $iframe_width, marginTop: $iframe_marginTop });
	}

	var html = $('#html textarea:first').val(),
		prepared_html = html,
		css_code = $('#css textarea:first').val(),
		css = '<style class="csscreations">' + css_code + '</style>',
		/*js = $('<script>').html( $('#js textarea:first').val() )[0],*/
		js_code = $('#js textarea:first').val(),
		js = '<script>$(document).ready(function(){\n' + js_code + '\n});</script>',
		ocontent = $('#docCanvas').contents(),
		css_js_loaded = false,
		prepared_source = '';

	// Write HTML
	// -- Checking for html tag or doctype in html code
	if (prepared_html.match(/\<html(.*)\>?/i) && prepared_html.match(/\<html(.*)\>?/i).length > 0 || 
		prepared_html.match(/\<\!doctype/i) && prepared_html.match(/\<\!doctype/i).length > 0) {
	} else {
		prepared_html = default_source.replace('</body>', prepared_html + '</body>');
	}

	prepared_html = prepareHtml(prepared_html); // Can change editor contents when full html + resources included

	prepared_source = prepared_html;
	if ( css_code ) prepared_source = prepared_source.replace('</head>', css + '</head>');
	if ( js_code ) prepared_source = prepared_source.replace('</body>', '<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>' + js + '</body>');
	
	//console.log(prepared_source);

	ocontent[0].open();
	ocontent[0].write(prepared_source);
	ocontent[0].close();

	$('.ajax_loader').fadeOut();
};

function should_render() {
	//return false;
	$render = false;
	if(typeof $slide != "undefined") {
		//console.log($slide);
		var $editor = $walkthrough['editor'][$slide];
		var $the_content = $walkthrough['added'][$js_data_reference_index[$slide]];
		var $the_previous_content = $walkthrough['added'][$js_data_reference_index[$slide]-1];
		var $the_replaced_content = $walkthrough['removed'][$js_data_reference_index[$slide]];
		if($editor == "js") {
			//$current_line = $js_cursor['line'][$slide];
			//$previous_line = $js_cursor['line'][$slide-1];
			$current_line = get_cm_cursor_position($index_content['js'][$js_data_reference_index[$slide]>>0], $js_cursor[$slide]);
			$current_line = $current_line['line'];
			if($slide > 0) {
				$previous_line = get_cm_cursor_position($index_content['js'][$js_data_reference_index[$slide]-1], $js_cursor[$slide-1]);
				$previous_line = $previous_line['line'];
			}
			else {
				$previous_line = 0;
			}
		}
		else if($editor == "html") {
			//$current_line = $html_cursor['line'][$slide];
			//$previous_line = $html_cursor['line'][$slide-1];
			
			$current_line = get_cm_cursor_position($index_content['html'][$js_data_reference_index[$slide]>>0], $html_cursor[$slide]);
			$current_line = $current_line['line'];
			if($slide > 0) {
				$previous_line = get_cm_cursor_position($index_content['html'][$js_data_reference_index[$slide]-1], $html_cursor[$slide-1]);
				$previous_line = $previous_line['line'];
			}
			else {
				$previous_line = 0;
			}
		} else if($editor == "css") {
			//$current_line = $css_cursor['line'][$slide];
			//$previous_line = $css_cursor['line'][$slide-1];
			
			$current_line = get_cm_cursor_position($index_content['css'][$js_data_reference_index[$slide]>>0], $css_cursor[$slide]);
			$current_line = $current_line['line'];
			if($slide > 0) {
				$previous_line = get_cm_cursor_position($index_content['css'][$js_data_reference_index[$slide]-1], $css_cursor[$slide-1]);
				$previous_line = $previous_line['line'];
			}
			else {
				$previous_line = 0;
			}
		}
		
		if(typeof $the_content != "undefined") {
			var $last_character = $the_content[$the_content.length - 1];
			if($the_previous_content) var $previous_last_character = $the_previous_content[$the_content.length - 1];
			else $previous_last_character = "";
			
			//console.log("replaced: " + $the_replaced_content + " > " + isNaN(parseInt($the_replaced_content)))
			//console.log("added: " + $the_content + " > " + isNaN(parseInt($the_content)))
			
			if(
				(
				$last_character != $previous_last_character && 
				(
					$last_character == ";" || 
					$last_character == "}" || 
					(!isNaN(parseInt($the_replaced_content)) && !isNaN(parseInt($the_content)))
				)
				) || 
				$current_line != $previous_line
			)
			{
				$render = true;
			}
		}
	}
	if($render || typeof $slide == "undefined" || $slide == 0 || $slide == $slides-1) {
		$render = true;
	}
	
	return $render;
}

/* On Page Load Call */
//reset_resources = true;
update_live_preview(); // Render Code's Preview

/*
PREFERENCES
*/

// PREFERENCES DROPBOX
$('#pref').click(function() {
	var $this = $(this);
	
	var pref_list = $('div.pref');
	if( pref_list.css('display') == 'none' ) {
		pref_list.fadeIn('fast');
	}
	else {
		pref_list.fadeOut('fast');
	}
	
	return false;
});

// FULL HTML
$('#full_html').click(function() {
	var $this = $(this);
	
	if( $this.hasClass('included') ) {
		$this.removeClass('included');
	}
	else {
		$this.addClass('included');
	}
	
	want_full_html = $this.hasClass('included');
	
	if( want_full_html ) {
		part_html = $('#html textarea:first').val();
		
		code_mirror_html.setValue(full_html);
		code_mirror_save('html');
	}
	else {
		full_html = $('#html textarea:first').val();
		
		code_mirror_html.setValue(part_html);
		code_mirror_save('html');
	}
	
	update_live_preview();
});

// REMOVE HTML, CSS, JS OR OUTPUT
$('.remove').click(function() {
	var $this = $(this),
		remove_what = $this.attr('data-remove'),
		action = '';
	
	if( $this.hasClass('included') ) {
		$this.removeClass('included');
		$('#' + remove_what).removeClass('removed').show();
		$('#tabs a[data-type="' + remove_what + '"]').show();
		
		action = 'show';
	}
	else {
		$this.addClass('included');
		$('#' + remove_what).addClass('removed').hide();
		$('#tabs a[data-type="' + remove_what + '"]').hide();
		
		action = 'hide';
	}
	
	if( remove_what == 'output' ) {
		if ( $this.hasClass('included') ) $('.ui-resizable-handle').hide();
		else $('.ui-resizable-handle').show();
		
		render_output(action);
	}
	render_code_boxes(remove_what, action);

	return false;
});

// ON PAGE LOAD
$.each($('.remove'), function(index, value) {
	var jq_ob = $(value);
	
	if( jq_ob.hasClass('included') ) {
		jq_ob.removeClass('included').click(); // COOL TRICK BRO ;)
	}
});

function render_output(action) {
	var code_boxes = 0;
	
	if( action == 'show' ) {
		$('.code').removeClass('code_full');
		$('.tabs').removeClass('tabs_full');
		
		$('.editor_pane').removeClass('editor_pane_full');
		$('.editor_pane').css('right', editor_pane_right);
		
		code_boxes_len = $('.code > div').length;
		$('.code > div').removeClass('vert_equal cb_equal_' + code_boxes_len).addClass('horiz_equal cb_equal_' + code_boxes_len);
	}
	else { // hide
		$('.code').addClass('code_full');
		$('.tabs').addClass('tabs_full');
		
		editor_pane_right = $('.editor_pane').css('right');
		$('.editor_pane').addClass('editor_pane_full');
		$('.editor_pane_full').css('right', '0px');
		
		code_boxes_len = $('.code > div').length;
		$('.code > div').removeClass('horiz_equal cb_equal_' + code_boxes_len).addClass('vert_equal cb_equal_' + code_boxes_len);
	}
	
	code_mirror_refresh();
	$('#tabs .active').click();
}

function render_code_boxes(remove_what, action) {
	var code_boxes = 0;
	
	if( action == 'show' ) {
		code_boxes_len = $('.code > div:not(.removed)').length;
		$('.code > div').removeClass('cb_equal_1 cb_equal_2 cb_equal_3').addClass('cb_equal_' + code_boxes_len);
	}
	else { // hide
		code_boxes_len = $('.code > div:not(.removed)').length;
		$('.code > div').removeClass('cb_equal_1 cb_equal_2 cb_equal_3').addClass('cb_equal_' + code_boxes_len);
	}
	
	code_mirror_refresh();
}


/*
RESOURCES
*/

$('#include').click(function() {
	var $this = $(this);
	
	var include_list = $('div.include');
	if( include_list.css('display') == 'none' ) {
		include_list.fadeIn('fast');
	}
	else {
		include_list.fadeOut('fast');
		
		// Insert script files into realtime preview
		var includes = $('li.included', include_list);
		
		if( includes.length > 0 || choosen_res.length > 0 ) {
			// ajax loader
			$('.ajax_loader').fadeIn();
			
			set_resources();
			
			//reset_resources = true;
			update_live_preview();
		}
	}

	return false;
});

// RESOURCES SELECT
$('div.include li:not(.include_head):not(.custom_resource)').live('click', function() {
	var $this = $(this);
	
	if( $this.hasClass('included') ) $this.removeClass('included');
	else $this.addClass('included');

	return false;
});

// CUSTOM RESOURCES CANCEL
$('div.include li.custom_resource span').live('click', function() {
	var $this = $(this),
		li = $this.closest('li');
	
	delete_resource( li.attr('data-resource_name'), true );
	// console.log(choosen_res);
	li.remove();

	return false;
});

// RESOURCES SEARCH AND ADDING CUSTOM RESOURCES
$('.include_search').keyup(function(e) {
	var $this = $(this),
		search_str = $this.val(),
		include_list = $('div.include'),
		text = '';
	// console.log($this.val());
	
	$.each($('li:not(.include_head):not(.custom_resource):not(.included)', include_list), function(index, value) {
		var jq_ob = $(value);
		
		text = jq_ob.text().toLowerCase();
		if( text.indexOf(search_str) != 0 ) {
			jq_ob.hide();
		}
		else {
			jq_ob.show();
		}
	});
	
	if( e.keyCode == 13 ) {
		data = {url: $this.val()};
		
		if (custom_resource_duplicate(data.url)) return false;
		
		$.post(BASE_URL + '/t/addResource', data, function(data) {
		
			if( data['status'] == 'success' ) {
				list_custom_resource({name: data.file_name, type: data.type});
				custom_resources[data.file_name] = data.url;
				
				set_resources();
			}
		}, 'json');
	
		return false;
	}
});

// LIST THE CUSTOM RESOURCES - ONE AT A TIME
function list_custom_resource(data) {
	var include_list = $('div.include');
	
	$('ul', include_list).prepend( '<li class="custom_resource" data-resource_name="' + data.name + '" data-resource_type="' + data.type + '"><span>X</span>' + data.name + '</li>' );
}

//added by Ruby On Tails
var timer;
$('.output_resolutions').hover(function() {
	if(timer) { clearTimeout(timer); timer = null; }
	
	timer = setTimeout(function() {	
		$('div.resolutions_list').fadeIn('fast');
	}, 250);
}, function(){
	clearTimeout(timer);
	timer = null;
	$('div.resolutions_list').fadeOut('fast');
});

$(".resolutions_list li").click(function(){
	$(".resolutions_list .selected").removeClass("selected");
	$(this).addClass("selected");
	if($(this).attr("data-width") != "100%" && $(this).attr("data-height") != "100%") {
		var $width = Math.min($(this).attr("data-width"), $("#output").width()) + "px";
		var $height = Math.min($(this).attr("data-height"), $("#output").height()) + "px";
		var $marginTop = ($("#output").height() - parseInt($height))/2 + "px";
	}
	else {
		var $width = "100%";
		var $height = "100%";
		var $marginTop = 0;
	}
	
	$("#output #docCanvas").animate({width: $width, height: $height, marginTop: $marginTop}, 500, function(){
		//update_live_preview();
		display_resolution();
		if($save_timeline === true) save_resolution_change();
	});
	
	return false;
})

display_resolution(false);

// ONLOAD STUFF ;)
$.each(choosen_res, function(index, value) {
	if( value.custom == 0 ) {
		$('li[data-resource_name="' + value.name + '"]', 'div.include').addClass('included');
	}
	else {
		list_custom_resource({name: value.name, type: value.type});
	}
});


/*
RENDER
*/
	
// MAINTAINING EQUAL MARGINS BETWEEN EDITORS
// Has to be done before Rendering Full Screen
var code_height = $('.code').height();
$('.code > div.horiz_equal.cb_equal_3:not(:last)').css('margin-bottom', (code_height - $('.code > div').height()*3)/2);

// ONLY RENDER (SHOW OUTPUT) - NOTHING ELSE - NO CODE EDITORS
function render($this) {
	var output = $('#output');
	
	if( output.hasClass('output_full') ) {
		output.removeClass('output_full');
		$('#tabs, #code').show();
		$('.editor_pane').show();
		$('.output').css('left', $('.editor_pane').width());
		$this.removeClass('active');
		
		if( output.hasClass('removed') ) output.hide();
	} else {
		output.addClass('output_full').show();
		$('#tabs, #code').hide();
		$('.editor_pane').hide();
		$('.output').css('left', 0);
		$this.addClass('active');
	}
	
	update_live_preview();

	return false;
}

if( $('#render').hasClass('active') ) render($('#render'));

$('#render').click(function() {
	return render( $(this) );
});


/*
FULL VIEW
*/
if( !$('#save').attr('data-slug') ) {
	//$('#full_view').closest('li').hide();
	$('#full_view').closest('li').remove();
}


/*
SAVE
*/

// Save Pastebin
$('#save').click(function() {
	var $this = $(this);
	
	var data = {
		html: $('#html textarea').val(),
		css: $('#css textarea').val(),
		js: $('#js textarea').val(),
		slug: $this.attr('data-slug'),
		/* preferences */
		full_html: +$('#full_html').hasClass('included'),
		remove_html: +$('div.pref li[data-remove="html"]').hasClass('included'),
		remove_css: +$('div.pref li[data-remove="css"]').hasClass('included'),
		remove_js: +$('div.pref li[data-remove="js"]').hasClass('included'),
		remove_output: +$('div.pref li[data-remove="output"]').hasClass('included'),
		render: +$('#render').hasClass('active'),
		title: $('#title').val(),
		description: $('#description').val()
	};
	
	/* libs included */
	/*var libs_inc = {};
	$.each( $('div.include li.included'), function(index, value) {
		var jq_obj = $(value);
		
		var lib_name = $.trim(jq_obj.text());
		libs_inc[ lib_name ] = libs_obj[ lib_name ];
	});
	data.libs_inc = JSON.stringify( libs_inc );*/
	data.choosen_res = JSON.stringify( choosen_res );
	// console.log(data.choosen_res);
	// return false;
	
	if( !data.html && !data.css && !data.js ) return false;
	
	$.post( BASE_URL + '/t/save', data, function(data) {
	
		if( data['status'] == 'success' ) {
			location.href = BASE_URL + '/t/' + data['redirect_to'];
		}
	}, 'json');

	return false;
});


/*
TIPS
*/


/*
TOGGLE TOPBAE
*/
/*$('.topbar_toggle').click(function() {
	$('body > header').toggle();
	return false;
});*/

/*
	RESIZABLE
*/
/*
var resize_options = {
	//handles: 'e',
	//minHeight: $( ".editor_pane" ).height(),
	//maxHeight: $( ".editor_pane" ).height(),
	resize: function(e, ui) {
	console.log(ui.size.width);
		$('.output').css("left", ui.size.width+"px");
	},
	stop: function(e, ui) {
		$('.output').css("left", ui.size.width+"px");
	}
};
*/
//$( ".editor_pane" ).resizable(resize_options);

/*
$('.ui-resizable-e').bind('mousedown', function(e){
	$this = $(this);
	$this.addClass('active');

	$(document).bind('mousemove', function(e){
		//resizing when mouse moves
		$('.editor_pane').css('right', $(document).width() - e.pageX);
		$('.output').css('left', e.pageX);
		
		e.preventDefault(); e.stopPropagation();
	});
	
	$('iframe').contents().bind('mousemove', function(e){
		//resizing when mouse moves
		$('.editor_pane').css('right', $(document).width() - e.screenX );
		$('.output').css('left', e.screenX);
		
		e.preventDefault(); e.stopPropagation();
	});
	
	$(document).bind('mouseup', function(e){
		//user released so you can unbind the mousemove
		$(document).unbind('mousemove');
		$('iframe').contents().unbind('mousemove');
		
		$this.removeClass('active');
		
		e.preventDefault(); e.stopPropagation();
	});
	
	e.preventDefault(); e.stopPropagation();
});
*/

// Remove Full Shadow after Page Loaded
$('#full_shadow').fadeOut();

})();

});

function cm_to_linear_cursor($string, $cp) {
	//$cp_object = get_codemirror_cursor_object($cp);
	var $line = parseInt($cp['line']);
	var $ch = parseInt($cp['ch']);
	var $count = 0;
	$string_array = $string.split("");
	//console.log($string_array);
	var $line_characters = 0; var $remaining_characters = 0;
	for(var $i = 0; $i < $string_array.length; $i++) {
		if($string_array[$i] == "\n") {
			$count++;
			//console.log("Line: " + $line);
			if($count == $line) {
				//console.log("I: " + $i);
				$line_characters = $i+1;
				//$remaining_characters = $string.length-$i-1;
				//console.log("line characters: " + $line_characters + " Remaining characters: " + $ch);
				//console.log($i);
				break;
			}
		}
	}
	//$remaining_characters = $remaining_characters ? $remaining_characters : $ch;
	//console.log($line_characters +"+"+ $ch);
	//console.log($line_characters + $remaining_characters);
	return $line_characters + $ch;
}

function get_cm_cursor_position($string, $cp) {
	$substring = $string.substring(0, $cp);
	if($array = $substring.match(/\n/g)) {
		$line = $array.length;
	}
	else {
		$line = 0;
	}
	//console.log($cp - $substring.lastIndexOf("\n"));
	$ch = $cp - $substring.lastIndexOf("\n");
	//console.log("Line: " + $line + " Ch: " + $ch);
	
	$cursor_position = new Object;
	$cursor_position['line'] = $line;
	$cursor_position['ch'] = $ch;
	
	//console.log($cursor_position);
	
	return $cursor_position;
}

function display_resolution($show){
	if(typeof $show == "undefined") $show = true;
	
	$resolution = $("#output iframe").width() + " x " + $("#output iframe").height();
	$(".current_resolution").html($resolution);
	if($show) {
		$("#output .current_resolution").fadeIn("fast", function(){
			setTimeout(function(){
				$("#output .current_resolution").fadeOut('slow');
			}, 1000)
		});
	}
}
