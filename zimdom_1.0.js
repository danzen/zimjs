
// ZIM js Interactive Media modules by Dan Zen http://danzen.com (c) 2014
// zimdom.js helps with common Browser and DOM  http://zimjs.com
// free to use - donations welcome of course! http://zimjs.com/donate
// these are common Web solutions over the years (sorry for lack of credit)

if (typeof zog === "undefined") { // bootstrap zimwrap.js
	document.write('<script src="http://d309knd7es5f10.cloudfront.net/zimwrap_1.0.js"><\/script>');
	document.write('<script src="http://d309knd7es5f10.cloudfront.net/zimdom_1.0.js"><\/script>');
} else {

var zim = function(zim) {
	
	if (zon) zog("ZIM DOM Module");

	// how many pixels down from the top the browser window has been scrolled

	zim.scrollY = function() {		
		var safari = 0;
		var browser=navigator.appName;
		var navindex=navigator.userAgent.indexOf('Safari');
		if (navindex != -1 || browser=='Safari') {
			var safari = 1;
		}
		if (!safari && document.compatMode == 'CSS1Compat') {				
			return document.documentElement.scrollTop;
		} else {
			return document.body.scrollTop;
		}			
	}
	
	zim.windowWidth = function() {
		return isNaN(window.innerWidth) ? window.clientWidth : window.innerWidth;
	}
	
	zim.windowHeight = function() {
		return isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight;
	}
		
	
	// match PHP urlencode and urldecode functions
	
	zim.urlEncode = function(str) {
		var str = (str + '').toString();
		return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
		replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
	}	
	zim.urlDecode = function(str) {
		 return decodeURIComponent((str + '').replace(/\+/g, '%20'));
	}
	
	
	// set, get, and delete cookies
	// if no days, it will be a session cookie (while browser is open)
	
	zim.setCookie = function(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		} else {
			var expires = "";
		}
		document.cookie = name+"="+escape(value)+expires+"; path=/";
	}
	
	zim.getCookie = function(name) {
		var outer = document.cookie.split(/;\s*/);	
		var cookies = new Array();
		var inner;
		for (i=0; i<outer.length; i++) {		
			inner = outer[i].split("=");
			cookies[inner[0]] = inner[1];
		}	
		return unescape(cookies[name]);
	}
	
	zim.deleteCookie = function(name) {
		zim.setCookie(name,"",-1);
	}	

	return zim;
} (zim || {});
} 