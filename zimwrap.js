
// ZIM js Interactive Media modules by Dan Zen http://danzen.com (c) 2014
// zimwrap.js creates global wrapper functions for less typing http://zimjs.com
// free to use - donations welcome of course! http://zimjs.com/donate

// set var zon=true before calling zim scripts to show script comments
if (typeof zon === "undefined") zon = false; // comments from zim scripts

// zog() is now a short version of console.log() 
var zog = console.log.bind(console);

if (zon) zog("ZIM WRAP - zog, zid, zss, zgo, zum, zot");

function zid(s) {
	// short version of document.getElementById()
	return document.getElementById(s);	
}

function zss(s) {
	// short version of document.getElementById(s).style
	// so you can do zss("logo").top = "10px"; // for instance
	return document.getElementById(s).style;	
}

function zgo(u,t) {
	// short version of either window.location.href or window.open
	if (zot(t)) {
		window.location.href = u;
	} else {
		window.open(u,"_blank","modal=yes,alwaysRaised=yes");
	}
}

function zum(n) {
	// converts 10px string from style to number 10, for instance
	// if there is no value then this will return 0
	return Number(n.replace(/[^\d\.\-]/g, ''));	
}

function zot(v) {
	// test to see if v has no value (v must exist as var or parameter)
	// or if v has been set to null
	// good for setting function defaults: if (zot(speed)) speed=1;
	if (v === null) return true;
	return typeof v === "undefined";
}

function zop(e) {
	// stop event propagation - must pass it e || window.event;
	if (e.stopImmediatePropagation) e.stopImmediatePropagation();
	if (window.event) window.event.cancelBubble=true;	
}