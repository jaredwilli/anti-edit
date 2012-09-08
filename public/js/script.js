/**
 * Authors:
 * Jared Williams - @jaredwilli
 * Antonio Fernandes - @afj176
 * 
 */
var ANTI = {
	common: {
		init: function() {
			ANTI.init();
		}
	},
    
	init: function() {
        // resize the canvas to fill browser window dynamically
        window.addEventListener('resize', ANTI.utils.resizable, false);
        ANTI.utils.resizable();

		$('footer h1').click(function(e) {
			if ($('footer').hasClass('open')) {
				$('footer').removeClass('open').stop().animate({ bottom: '-180px' }, 'slow');
			} else {
				$('footer').addClass('open').stop().animate({ bottom: 0 }, 'slow');				
			}
		});
	},
    
	// Useful utilities for browsers and other handy functions
	utils: {
		resizable: function() {
			var winHeight = window.innerHeight,
				winWidth = window.innerWidth,
				section = $('section'),
				sectionHeight = winHeight - 80,
				sectionWidth = winWidth / 2 - 60,
				editor = $('.editor'),
				iframe = $('#docCanvas'),
				editorHeight = (sectionHeight / 3) - 12;

			$('body').css({ height: winHeight });
			$('#code').css({ height: sectionHeight, width: sectionWidth });
			$('#output, #docCanvas').css({ height: sectionHeight, width: sectionWidth +20 });
			$('.editor').css({ height: editorHeight, width: sectionWidth });
			$('.CodeMirror-scroll, .CodeMirror-scrollbar').css({ height: editorHeight -20 });
        },
		inArray: function(key, array, argStrict) {
            var strict = !!argStrict;

            if (strict) {
                for (key in array) {
                    if (array[key] === key) {
                        return true;
                    }
                }
            } else {
                for (key in array) {
                    if (array[key] == key) {
                        return true;
                    }
                }
            }
            return false;
		},
		// Adds body class for browser
		browserBodyClass: function() {
			var ua = $.browser;
			if (ua.webkit === true) {
				$('body').addClass('webkit');
			} else if (ua.mozilla === true) {
				$('body').addClass('firefox');
			} else if (ua.msie === true) {
				$('body').addClass('msie');
			}
			if (ANTI.utils.isAndroidStockBrowser()) {
				$('body').addClass('androidDefault');
			}
			if (ANTI.utils.isAndroidFirefox()) {
				$('body').addClass('androidFirefox');
			}
			if (ANTI.utils.isSafari()) {
				$('body').addClass('safari');
			}
		},
		// Boolean check if the userAgent is Firefox browser
		isFirefox: function() {
			if (navigator.userAgent.toLowerCase().indexOf('firefox') !== -1) {
				return true;
			} else {
				return false;
			}
		},
		// Boolean check if the userAgent is Safari browser
		isSafari: function() {
			if (navigator.vendor) {
				return (navigator.vendor.toLowerCase().indexOf('apple') !== -1);
			} else {
				return false;
			}
		},
		// Boolean check if userAgent is Firefox on Android
		isAndroidFirefox: function() {
			if (ANTI.utils.isFirefox() && navigator.userAgent.toLowerCase().indexOf("android") !== -1 ) {
				return true;
			} else {
				return false;
			}
		},
		// Boolean check if the userAgent is for Stock Android Browser
		isAndroidStockBrowser: function() {
			if (navigator.userAgent.toLowerCase().indexOf('linux; u; android') !== -1) {
				return true;
			} else {
				return false;
			}
		},
		// Creates cache for images, scripts or other resources
		createCache: function(requestFunction) {
			var cache = {};
			return function(key, callback) {
				if (!cache[key]) {
					cache[key] = $.Deferred(function(defer) {
						requestFunction(defer, key);
					}).promise();
				}
				return cache[key].done(callback);
			};
		},
		// Get current domain for environment settings
		getCurrentDomain: function() {
			var urlpattern = new RegExp("((http|https)://.*?)(:|/).*$"),
				parsedurl = window.location.href.match(urlpattern);
			return parsedurl[1];
		}
	}
};

var UTIL = {
	fire: function(func, funcname, args) {
		var namespace = ANTI;
		funcname = (funcname === undefined) ? 'init' : funcname;
		if (func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function') {
			namespace[func][funcname](args);
		}
	},
	loadEvents: function() {
		var b = document.body,
			bid = b.id,
			c = b.className.split(/\s+/),
			cLen = c.length;
		UTIL.fire('common');
		UTIL.fire(bid);
		for (var i = 0; i < cLen; i++) {
			UTIL.fire(c[i]);
			UTIL.fire(c[i], bid);
		}
		UTIL.fire('common', 'finalize');
	}
};
// kick it all off here
$(document).ready(UTIL.loadEvents);