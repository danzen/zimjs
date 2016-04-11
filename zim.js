// ZIM js Interactive Media modules by Dan Zen http://danzen.com (c) 2016
// zim.js includes all the basic zim coding modules http://zimjs.com
// free to use - donations welcome of course! http://zimjs.com/donate

////////////////  ZIM WRAP  //////////////

// zimwrap.js creates global wrapper functions for less typing

// set var zon=true before calling zim scripts to show script comments
if (typeof zon === "undefined") zon = false; // comments from zim scripts

/*--
zog(item1, item2, etc.)         ~ log
a wrapper for console.log()
--*/
var zog = console.log.bind(console);
if (zon) zog("ZIM WRAP zog zid zss zgo zum zot zop zil zob");

/*--
zid(string)                     ~ id
short version of document.getElementById(string)
--*/
function zid(s) {
	return document.getElementById(s);
}

/*--
zss(string)                     ~ css
short version of document.getElementById(string).style
so you can do zss("logo").top = "10px"; // for instance
--*/
function zss(s) {
	if (document.getElementById(s)) {return document.getElementById(s).style;}
	else if (zon) zog("zim wrap - zss(): id not found");
}

/*--
zgo(url, target, modal)         ~ go
short version of either window.location.href or window.open
--*/
function zgo(u,t,m) {
	if ((zot(t) && t != "") || t == "_self") {
		window.location.href = u;
	} else {
		if (zot(m)) { // not modal
			window.open(u,t);
		} else {
			window.open(u,t,"modal=yes,alwaysRaised=yes");
		}
	}
}

/*--
zum(string)                     ~ num
converts "10px string from styles to number 10, for instance
if there is no value then this will return 0
--*/
function zum(s) {
	if (zot(s)) return;
	return Number(String(s).replace(/[^\d\.\-]/g, ''));
}

/*--
zot(value)                      ~ not
test to see if value has no value (value must exist as var or parameter)
or if value has been set to null
good for setting function defaults: if (zot(speed)) speed=1;
--*/
function zot(v) {
	return v==null; // both null and undefined match but not false or 0
}

/*--
zop(e)                          ~ stop
stop event propagation - just easier to remember than below
must pass it e || window.event from your event function
--*/
function zop(e) {
	if (zot(e)) return;
	if (e.stopImmediatePropagation) e.stopImmediatePropagation();
	if (window.event) window.event.cancelBubble=true;
}

/*--
zil()                           ~ still
stop keys from moving content - arrows, spacebar, pgup, pgdown, home, end
stop scroll wheel from moving content - scrolling the canvas for instance
do once at start - usually in the template for full scale mode
returns an array of references to three listeners: [keydown, mousewheel and DOMMouseScroll]
use these to removeEventListeners
--*/
function zil() {

	var a = function(e) {if (!e) e = event; if (e.keyCode && (e.keyCode >= 32 && e.keyCode <= 40)) e.preventDefault();}
	var b = function(e) {if (!e) e = event; e.preventDefault();}
	var c = b;
	window.addEventListener("keydown", a);
	window.addEventListener("mousewheel", b);
	window.addEventListener("DOMMouseScroll", c);
	return [a, b, c];
}

/*--
zob(func, args, sig, scope)     ~ object
pass in a function and the function's arguments
and use the following as the first line of your function
replace yourFunction with a reference to your function but keep arguments as is
var duo; if (duo = zob(yourFunction, arguments)) return duo;
this will allow either individual arguments to be passed
or a single object (with property names of the arguments) to be passed
for example: function test(a,b,c){}; test(1,null,3); test({a:1,c:3});
many of the ZIM functions and classes use this "DUO" technique
NOTE: if you are minifying the file then you need to do an extra step
add a string version of the signature of your function above the duo call
for example: var sig = "a,b,c";
then pass the signature in as a parameter to zob()
var duo; if (duo = zob(yourFunction, arguments, sig)) return duo;
works also with JS6 default parameter values
NOTE: if you are running the function as a constructor with the new keyword
then you need to pass in this (keyword) as the last parameter (sig can be null)
var duo; if (duo = zob(yourFunction, arguments, sig, this)) return duo;
this allows zob() to test to see if we need to rerun the function as a constructor
--*/
function zob(func, args, sig, scope) {
	if (args.length == 1 && args[0].constructor === {}.constructor) {
		var zp = args[0];
		var za = (zot(sig))?func.toString().split(/\n/,1)[0].match(/\((.*)\)/)[1].replace(/\s+/g,"").split(","):sig.replace(/\s+/g,"").split(",");
		var zv = []; var zi; var zt;
		for (zi=0; zi<za.length; zi++) {zt=za[zi].split("=")[0]; za[zi]=zt; zv.push(zp[zt]);}
		for (zi in zp) {if (za.indexOf(zi)<0) {if (zon) zog(func,"bad argument "+zi);}};
		var zr; if (zr=(func.prototype.isPrototypeOf(scope))?new (func.bind.apply(func,[null].concat(zv)))():func.apply(null,zv)) {return zr;} else {return true;}
	}
}


////////////////  ZIM CODE  //////////////

// zimcode.js adds some general code functionality along with Browser and DOM code
// some of these are common Web solutions over the years (sorry for lack of credit)
// moved Damp, Proportion and ProportionDamp here as they can be used without CreateJS


var zim = function(zim) {

	if (zon) zog("ZIM CODE Module");

/*--
zim.shuffle = function(array)
randomly shuffles elements of an array
actually changes the original array (but also returns it)
shuffle and loop to show random but unique elements from an array
--*/
	zim.shuffle = function(array) {
		if (zot(array)) return;
		var i = array.length, j, temp;
		if (i == 0) return array;
		while(--i) {
			j = Math.floor(Math.random()*(i+1));
			temp=array[i];
			array[i]=array[j];
			array[j]=temp;
		}
		return array;
	}

/*--
zim.rand = function(a, b, integer)
returns a random integer between and including a and b if integer is true
returns a random number (with decimals) including a and up to b but not b if integer is false
b is optional and if left out will default to 0 (includes 0)
integer is a boolean and defaults to true
if a and b are 0 then just returns Math.random()
--*/
	zim.rand = function(a, b, integer) {
		if (zot(integer)) integer = true;
		if (zot(b)) b = 0;
		if (zot(a)) a = 0;
		if (integer) if (a>b) {a++;} else if (b>a) {b++;}
		var r;
		if (a == 0 && b == 0) {
			return Math.random();
		} else if (b == 0) {
			r = Math.random()*a;
		} else {
			r = Math.min(a,b) + Math.random()*(Math.max(a,b)-Math.min(a,b));
		}
		if (integer) {
			return Math.floor(r);
		} else {
			return r;
		}
	}

/*--
zim.copy = function(obj)
copies arrays and basic objects
http://stackoverflow.com/users/35881/a-levy
--*/
	zim.copy = function(obj) {
		if (obj==null || typeof obj != 'object') return obj;
		if (obj instanceof Array) {
			return obj.slice(0);
		}
		if (obj instanceof Object) {
			copy = {};
			for (var attr in obj) {
				if (obj.hasOwnProperty(attr)) copy[attr] = zim.copy(obj[attr]);
			}
			return copy;
		}
	}

/*--
zim.arraysEqual = function(a, b, strict)
slightly modified Evan Steinkerchnerv & Tomas Zato
finds out if arrays are same (including nested arrays)
works for arrays with strings and numbers (not necessarily other objects)
strict defaults to true - if false, order in arrays does not matter
--*/
	zim.arraysEqual = function(a, b, strict) {
		if (zot(a) || zot(b)) return false;
		if (zot(strict)) strict = true; // must be the same order
		if (a.length != b.length) return false;

		for (var i = 0; i < a.length; i++) {
			if (a[i] instanceof Array && b[i] instanceof Array) {
				if (!zim.arraysEqual(a[i], b[i], strict))	return false;
			}
			else if (strict && a[i] != b[i]) {
				return false;
			}
			else if (!strict) {
				return zim.arraysEqual(a.sort(), b.sort(), true);
			}
		}
		return true;
	}

/*--
zim.merge = function(objects)
merges any number of objects {} you pass in as parameters
overwrites properties if they have the same name
--*/
	zim.merge = function() {
		var obj = {}; var i; var j;
		for (i=0; i<arguments.length; i++) {
			for (j in arguments[i]) {
				if (arguments[i].hasOwnProperty(j)) {
					obj[j] = arguments[i][j];
				}
			}
		}
		return obj;
	}

/*--
zim.decimals = function(num, places)
rounds number to the number of decimal places specified by places
negative number places round to tens, hundreds, etc.
for instance zim.decimals(1.8345, 2) == 1.83
--*/
	zim.decimals = function(num, places) {
		if (zot(num) || num==0) return 0;
		if (zot(places)) places = 1;
		return Math.round(num*Math.pow(10, places))/Math.pow(10, places);
	}

/*--
zim.Damp = function(startValue, damp)

Damp Class

damping emulates things slowing down due to friction
the movement heads towards the right direction and looks organic
this is similar if not the same as easing out
create your Damp object outside an interval or ticker
var d = new zim.Damp(parameters);
then inside an interval or ticker call the convert method
d.convert(desiredValue)
you would then apply that desired value to a property such as x or y or scale
if you want to do both x and y then you need two Damp objects
and two convert calls (you can do both in one interval or ticker)

PARAMETERS: supports DUO - parameters or single object
a startValue if you want the object to start directly somewhere
the damp value with 1 being no damping and 0 being no movement - default is .1

METHODS
convert() - converts a value into a damped value
immediate() - immediately goes to value

PROPERTIES
damp - can dynamically change the damping (usually just pass it in as a parameter to start)
lastValue - setting this would go immediately to this value (would not normally use)
--*/
	zim.Damp = function(startValue, damp) {
		var sig = "startValue, damp";
		var duo; if (duo = zob(zim.Damp, arguments, sig, this)) return duo;
		this.lastValue = (zot(startValue)) ? 0 : startValue;
		this.damp = (zot(damp)) ? .1 : damp;
	}
	zim.Damp.prototype.convert = function(desiredValue) {
		return this.lastValue = this.lastValue + (desiredValue - this.lastValue) * this.damp;
	}
	zim.Damp.prototype.immediate = function(desiredValue) {
		this.lastValue = desiredValue;
	}

/*--
zim.Proportion = function(baseMin, baseMax, targetMin, targetMax, factor, targetRound)

Proportion Class

converts an input value to an output value on a different scale
for instance like a slider controlling the scale of an object or sound volume
make a Proportion object
var p = new zim.Proportion(parameters)

PARAMETERS: supports DUO - parameters or single object
put in min and max for the input scale (say x values, 0 and 1 are the defaults)
put in min and max for the output scale (say volume)
factor (default 1) is going the same direction and -1 is going in opposite directions
round (default false) rounds the converted number if set to true

in your own pressmove event function or whatever call p.convert(input)
pass in your input property (say the mouseX)
a proportional value will be returned - so use that for your volume (or whatever)

the object always starts by assuming baseMin as baseValue
just call the convert method right away if you want it to start at a different baseValue
for instance, if your slider went from 100 to 500 and you want to start at half way
make the object and call p.convert(300); on the next line

METHODS
convert(input) - will return the output property (for instance, a volume)
--*/
	zim.Proportion = function(baseMin, baseMax, targetMin, targetMax, factor, targetRound) {

		var sig = "baseMin, baseMax, targetMin, targetMax, factor, targetRound";
		var duo; if (duo = zob(zim.Proportion, arguments, sig, this)) return duo;

		// factor - set to 1 for increasing and -1 for decreasing
		// round - true to round results to whole number
		if (zot(targetMin)) targetMin = 0;
		if (zot(targetMax)) targetMax = 1;
		if (zot(factor)) factor = 1;
		if (zot(targetRound)) targetRound = false;

		// proportion
		var baseAmount;
		var proportion;
		var targetAmount;

		baseAmount = baseMin; // just start at the min otherwise call immediate(baseValue);

		this.convert = function(baseAmount) {
			if (isNaN(baseAmount)) {return;}
			baseAmount = Math.max(baseAmount, baseMin);
			baseAmount = Math.min(baseAmount, baseMax);
			proportion = (baseAmount - baseMin) / (baseMax - baseMin);
			if (factor > 0) {
				targetAmount = targetMin + (targetMax-targetMin) * proportion;
			} else {
				targetAmount = targetMax - (targetMax-targetMin) * proportion;
			}
			if (targetRound) {targetAmount = Math.round(targetAmount);}
			return targetAmount;
		}

	}

/*--
zim.ProportionDamp = function(baseMin, baseMax, targetMin, targetMax, damp, factor, targetRound)

ProportionDamp Class

converts an input value to an output value on a different scale with damping
works like Proportion Class but with a damping parameter
var pd = new zim.ProportionDamp(parmeters);

PARAMETERS: supports DUO - parameters or single object
put in desired damping with 1 being no damping and .1 being the default
in your own interval or ticker event function call pd.convert(input)
the object always starts by assuming baseMin as baseValue
if you want to start or go to an immediate value without easing then
call the pd.immediate(baseValue) method with your desired baseValue (not targetValue)

METHODS
convert(input) - converts a base value to a target value
immediate(input) - immediately sets the target value (no damping)
dispose() - clears interval

PROPERTIES
damp - can adjust this dynamically (usually just pass it in as a parameter to start)
--*/
	zim.ProportionDamp = function(baseMin, baseMax, targetMin, targetMax, damp, factor, targetRound) {

		var sig = "baseMin, baseMax, targetMin, targetMax, damp, factor, targetRound";
		var duo; if (duo = zob(zim.ProportionDamp, arguments, sig, this)) return duo;

		// damp - can be changed via damp get/set method property
		// factor - set to 1 for increasing and -1 for decreasing
		// round - true to round results to whole number
		// zot() is found in danzen.js (the z version of not)
		if (zot(targetMin)) targetMin = 0;
		if (zot(targetMax)) targetMax = 1;
		if (zot(damp)) damp = .1;
		if (zot(factor)) factor = 1;
		if (zot(targetRound)) targetRound = false;

		this.damp = damp; // want to expose as a property we can change
		var that = this;

		// proportion
		var baseAmount;
		var proportion;
		var targetDifference;
		var targetAmount;

		// damping
		var differenceAmount;
		var desiredAmount=0;
		var lastAmount = 0;

		baseAmount = baseMin; // just start at the min otherwise call immediate(baseValue);
		lastAmount = targetMin;

		var interval = setInterval(calculate, 20);

		function calculate() {
			if (isNaN(baseAmount)) {return;}

			baseAmount = Math.max(baseAmount, baseMin);
			baseAmount = Math.min(baseAmount, baseMax);

			proportion = (baseAmount - baseMin) / (baseMax - baseMin);
			targetDifference = targetMax - targetMin;

			if (factor > 0) {
				targetAmount = targetMin + targetDifference * proportion;
			} else {
				targetAmount = targetMax - targetDifference * proportion;
			}

			desiredAmount = targetAmount;
			differenceAmount = desiredAmount - lastAmount;
			lastAmount += differenceAmount*that.damp;
		}

		this.immediate = function(n) {
			that.convert(n);
			calculate();
			lastAmount = targetAmount;
			if (targetRound) {lastAmount = Math.round(lastAmount);}
		}

		this.convert = function(n) {
			baseAmount = n;
			if (targetRound) {
				return Math.round(lastAmount);
			} else {
				return lastAmount;
			}
		}

		this.dispose = function() {
			clearInterval(interval);
			return true;
		}
	}


/*--
zim.Dictionary = function()

Dictionary Class

A object that uses objects as keys to give values
Similar to an object with properties except the property names are objects instead of strings
JavaScript currently does not have a dictionary, but other languages do
var o = {test:"test"}
var f = function(w) {zog(w)};
var c = new zim.Circle();
var d = new zim.Dictionary();
d.add(o, 1); d.add(f, 2); d.add(c, f);
zog(d.at(o)); // 1
zog(d.at(f)); // 2
d.at(c)("hello"); // hello
d.remove(o); // to clear o
zog(d.length); // 2

METHODS
add(object, value) - adds a value that can be retrieved by an object reference
at(object) - retrieves the value stored at the object (or returns null if not there)
remove(object) - removes the object and its value from the Dictionary
dispose() - deletes object

PROPERTIES
length - the number of items in the Dictionary
--*/
	zim.Dictionary = function() {

		this.length = 0;
		var objects = []; // store objects and values in synched arrays
		var values = [];

		this.add = function(o,v) {
			if (zot(o)) return;
			objects.push(o);
			values.push(v);
			this.length++;
		}

		this.at = function(o) {
			if (zot(o)) return;
			var i = objects.indexOf(o);
			if (i > -1) return values[i];
			return null;
		}

		this.remove = function(o) {
			if (zot(o)) return;
			var i = objects.indexOf(o);
			if (i > -1) {
				objects.splice(i,1);
				values.splice(i,1);
				this.length--
			}
		}

		this.dispose = function() {
			objects = null;
			values = null;
			this.length = null;
			return true;
		}
	}


	// DOM CODE

/*--
zim.scrollX = function(num, time)
num and time are optional
if not provided, this gets how many pixels from the left the browser window has been scrolled
if only num is provided it scrolls the window to this x position
if num and time are provided it animates the window to the x position in time milliseconds
--*/
	zim.scrollX = function(num, time) {
		return zim.abstractScroll("X", "Left", num, time);
	}


/*--
zim.scrollY = function(num, time)
num and time are optional
if not provided, this gets how many pixels from the top the browser window has been scrolled
if only num is provided it scrolls the window to this y position
if num and time are provided it animates the window to the y position in time milliseconds
--*/
	zim.scrollY = function(num, time) {
		return zim.abstractScroll("Y", "Top", num, time);
	}

	zim.abstractScroll = function(dir, side, num, time) {
		var perpend = (dir == "X") ? "Y" : "X"; // perpendicular direction
		if (zot(num)) {
			var safari = 0;
			var browser=navigator.appName;
			var navindex=navigator.userAgent.indexOf('Safari');
			if (navindex != -1 || browser=='Safari') {
				var safari = 1;
			}
			if (!safari && document.compatMode == 'CSS1Compat') {
				return document.documentElement["scroll"+side];
			} else {
				return document.body["scroll"+side];
			}
		} else if (zot(time)) {
			window.scrollTo(zim["scroll"+perpend](), num);
		} else {
			var interval = 50;
			if (time < interval) time = interval;
			var steps = time/interval;
			var current = zim["scroll"+dir]();
			var amount = num - current;
			var diff = amount/steps;
			var count = 0;
			var scrollInterval = setInterval(function() {
				count++;
				current+=diff;
				window.scrollTo(zim["scroll"+perpend](), current);
				if (count >= steps) {
					window.scrollTo(zim["scroll"+perpend](), num);
					clearInterval(scrollInterval);
				}
			}, interval);
		}
	}

/*--
zim.windowWidth = function()
returns the width of a window
window.clientWidth or window.innerWidth
--*/
	zim.windowWidth = function() {
		return isNaN(window.innerWidth) ? window.clientWidth : window.innerWidth;
	}

/*--
zim.windowHeight = function()
returns the height of a window
window.clientHeight or window.innerHeight
--*/
	zim.windowHeight = function() {
		return isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight;
	}

/*--
zim.urlEncode = function(string)
matches PHP urlencode and urldecode functions
--*/
	zim.urlEncode = function(s) {
		var s = (s + '').toString();
		return encodeURIComponent(s).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
		replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
	}

/*--
zim.urlDecode = function(string)
matches PHP urlencode and urldecode functions
--*/
	zim.urlDecode = function(s) {
		 return decodeURIComponent((s + '').replace(/\+/g, '%20'));
	}


/*--
zim.setCookie = function(name, value, days)
sets an HTML cookie
if no days, it will be a session cookie (while browser is open)
--*/
	zim.setCookie = function(name, value, days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		} else {
			var expires = "";
		}
		document.cookie = name+"="+escape(value)+expires+"; path=/";
	}

/*--
zim.getCookie = function(name)
gets an HTML cookie
--*/
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

/*--
zim.deleteCookie = function(name)
deletes an HTML cookie
--*/
	zim.deleteCookie = function(name) {
		zim.setCookie(name,"",-1);
	}

/*--
zim.mobile = function(orientation)
detects if app is on a mobile device - if so, returns the mobile device type
android, ios, blackberry, windows, other (all which evaluate to true) else returns false
orientation defaults to true and if there is window.orientation then it assumes mobile
BUT this may return true for some desktop and laptop touch screens
so you can turn the orientation check off by setting orientation to false
the check looks at the navigator.userAgent for the following regular expression
/ip(hone|od|ad)|android|blackberry|nokia|opera mini|mobile|phone|nexus|webos/i
microsoft mobile gets detected by nokia, mobile or phone
so if orientation is set to false the check may miss non-mainstream devices
--*/
	zim.mobile = function(orientation) {
		if (zot(orientation)) orientation = true;
		if (/ip(hone|od|ad)/i.test(navigator.userAgent)) return "ios";
		if (/android|nexus/i.test(navigator.userAgent)) return "android";
		if (/blackberry/i.test(navigator.userAgent)) return "blackberry";
		if (/nokia|phone|mobile/i.test(navigator.userAgent)) return "windows";
		if (/opera mini|webos/i.test(navigator.userAgent)) return "other";
		if (orientation && window.orientation !== undefined) return true;
		return false;
	}


	return zim;
} (zim || {});


////////////////  ZIM CREATE  //////////////

// zimcreate.js adds functionality to CreateJS for digidos (Interactive Features)
// functions in this module require createjs namespace to exist and in particular easel.js and tween.js
// available at http://createjs.com

var zim = function(zim) {

	if (zon) zog("ZIM CREATE Module");

/*--
zim.Ticker = {}
a static class to let ZIM use one createjs Ticker
if a function has been added to the Ticker queue then it will run in the order added
along with a single stage update after all functions in queue have run
if zim.OPTIMIZE is true then the Ticker will not update the stage (it will still run functions)
however, OPTIMIZE can be overridden as follows (or with the always() method):

PROPERTIES (static)
zim.Ticker.update = true - overrides zim.OPTIMIZE and forces an update if a function is in the queue
zim.Ticker.update = false - forces no update regardless of zim.OPTIMIZE
zim.Ticker.update = null (default) - only updates if there is a function in queue and zim.OPTIMIZE is false
zim.Ticker.stage - the stage reference (the Ticker will still run functions with its stage property set to null)
zim.Ticker.list - an Array with the functions in the Ticker queue

METHODS (static)
zim.Ticker.always(stage) - overrides zim.OPTIMIZE and always runs an update even with no function in queue
zim.Ticker.add(function, [stage]) - adds the function to the Ticker queue and returns the function that was added
zim.Ticker.remove(function) - removes the function from the Ticker queue
zim.Ticker.removeAll() - removes all functions from the Ticker queue (keeps stage update - see below)
zim.Ticker.setFPS(30, 60) - (mobile, pc) default 30 frames per second mobile, 60 frames per second non mobile
zim.Ticker.dispose() - removes all functions from the queue removes the createjs Ticker and updates

the Ticker is used internally by zim functions like move(), animate(), drag(), Scroller(), Parallax()
you are welcome to add functions to it as well but unless zim has already been using it,
make sure to set the stage property or pass the stage in as a second parameter to the add() method

USES:
1. if you have your own ticker going, just set zim.OPTIMIZE = true and don't worry about a thing
2. if you do not have your own ticker going but still want OPTIMIZE true to avoid components updating automatically,
then set zim.OPTIMIZE = true and set zim.Ticker.update = true
this will run a single update only when needed in zim Ticker for any zim functions
3. if you want a ticker with a single update going all the time (with OPTIMIZE true or false) then
run zim.Ticker.always(stage);
4. if for some reason (can't think of any) you want no ticker updates for zim but want component updates
then set zim.OPTIMIZE = false and then set zim.Ticker.update = false
--*/
	zim.Ticker = {
		stage:null,
		myUpdate: null,
		myAlways:false,
		list:[],
		setFPS: function(m, d) {
			if (zot(m)) m = 30;
			if (zot(d)) d = 60;
			createjs.Ticker.framerate = (zim.mobile()) ? m : d;
		},
		add: function(f, s) {
			var t = zim.Ticker;
			if (s && s.update) t.stage = s;
			if (zot(f) || typeof f !== 'function') {zog("zim.Ticker - only add functions"); return;}
			if (!t.ticker) t.ticker = createjs.Ticker.on("tick", t.call);
			t.list.push(f);
			return f;
		},
		call: function() {
			var t = zim.Ticker;
			for (var i=0; i<t.list.length; i++) {
				t.list[i]();
			}
			if (t.myAlways && zim.Ticker.stage) {
				t.stage.update();
				return;
			}
			if (zot(t.update) && !zim.OPTIMIZE && t.stage) {
				t.stage.update();
			} else if (t.update && t.stage) {
				t.stage.update();
			}
		},
		always: function(s) {
			var t = zim.Ticker;
			if (zot(s) || !s.update) {zog("zim.Ticker.always(stage) - needs stage parameter"); return;}
			t.myAlways = true;
			t.stage = s;
			if (!t.ticker) t.ticker = createjs.Ticker.on("tick", t.call);
		},
		remove: function(f) {
			var t = zim.Ticker;
			if (zot(f) || typeof f !== 'function') {zog("zim.Ticker - only remove functions"); return;}
			var i = t.list.indexOf(f);
			if (i > -1) t.list.splice(i,1);
			if (!t.myAlways && t.list.length == 0) {createjs.Ticker.off("tick", t.ticker); t.ticker = null;}
		},
		removeAll: function() {
			var t = zim.Ticker;
			t.list = [];
			if (!t.myAlways && t.list.length == 0) {createjs.Ticker.off("tick", t.ticker); t.ticker = null;}
		},
		dispose: function() {
			var t = zim.Ticker;
			t.removeAll();
			createjs.Ticker.off("tick", t.ticker);
			t.update = null;
			return true;
		}
	}

	Object.defineProperty(zim.Ticker, 'update', {
		get: function() {
			return zim.Ticker.myUpdate;
		},
		set: function(value) {
			var t =  zim.Ticker;
			if (typeof value != "boolean") value = null;
			t.myUpdate = value;
			if (t.myUpdate === false) {
				 createjs.Ticker.off("tick", t.ticker);
				 // note, this overrides always()
				 // but running always() will override update = false
				 t.myAlways = false;
				 return;
			}
			if (t.myAlways) return;
			if (!t.myUpdate && t.list.length == 0) createjs.Ticker.off("tick", t.ticker);
		}
	});


/*--
zim.drag = function(obj, rect, overCursor, dragCursor, currentTarget, swipe, localBounds, onTop, surround, slide, slideDamp, slideSnap, reg)
adds drag and drop to an object
handles scaled, rotated nested objects
supports DUO - parameters or single object
obj is the object to drag
rect is a rectangle object for the bounds of dragging
if surround is true then it will make sure the obj surrounds the rect rather than stays within it
this rectangle is relative to the stage (global)
if a rectangle relative to the object's parent is desired then set the localBounds parameter to true
after the rect comes two cursor properties which are any css cursor value such as "pointer", etc.
currentTarget defaults to false allowing you to drag things within a container
eg. drag(container); will drag any object within a container
setting currentTarget to true will then drag the whole container
swipe defaults to false which prevents a swipe from triggering when dragging
localBounds defaults to false which means the rect is global - set to true for a rect in the object parent frame
onTop (default true) brings the dragged object to the top of the container
surround (default false) is for dragging a big object that always surrounds the rect
slide (default false) will let you throw the object and it will damp with slideDamp value (default .3)
slidSnap (default true) will let the object go outside and snap back to bounds
reg (default false) when set to true will snap the registration of the object to the mouse position
note: will not drag if zim.OPTIMIZE is set to true
unless zim.Ticker.update is set to true or you run zim.Ticker.always(stage) see zim.Ticker
returns obj for chaining
--*/
	zim.drag = function(obj, rect, overCursor, dragCursor, currentTarget, swipe, localBounds, onTop, surround, slide, slideDamp, slideSnap, reg) {

		var sig = "obj, rect, overCursor, dragCursor, currentTarget, swipe, localBounds, onTop, surround, slide, slideDamp, slideSnap, reg";
		var duo; if (duo = zob(zim.drag, arguments, sig)) return duo;

		if (zot(obj) || !obj.on) return;
		obj.cursor = (zot(overCursor)) ? "pointer" : overCursor;
		if (zot(rect)) localBounds = false;
		if (zot(currentTarget)) currentTarget = false;
		if (zot(swipe)) swipe = false;
		if (zot(localBounds)) localBounds = false;
		if (zot(onTop)) onTop = true;
		if (zot(surround)) surround = false;
		if (zot(slide)) slide = false;
		if (zot(slideDamp)) slideDamp = .3;
		if (zot(slideSnap)) slideSnap = true;
		if (zot(reg)) reg = false;

		zim.setSwipe(obj, swipe);
		obj.zimDragRect = rect;
		var downCheck = false;

		var diffX; var diffY; var point; var r;	var rLocal;
		obj.zimAdded = obj.on("added", initializeObject, null, true); // if not added to display list
		obj.zimRemoved = obj.on("removed", unInitializeObject, null, true);
		if (obj.parent) initializeObject();

		function initializeObject() {
			// check position right away if there is a bounding box
			// there is no mousedown so set the diffX and diffY to 0
			diffX = 0; diffY = 0;
			// positionObject() is used as well in the dragmove function
			// where it expects a global x and y
			// so convert obj.x and obj.y positions inside its parent to global:
			if (localBounds) {
				r = zim.boundsToGlobal(obj.parent, obj.zimDragRect);
				if (surround) rLocal = obj.zimDragRect;
			} else {
				r = obj.zimDragRect;
				if (surround) rLocal = zim.boundsToGlobal(obj.parent, obj.zimDragRect, true); // flips to global to local
			}
			point = obj.parent.localToGlobal(obj.x, obj.y);
			positionObject(obj, point.x, point.y);
			zim.Ticker.stage = obj.getStage();
			if (slide) {
				setUpSlide();
			} else {
				obj.zimDragTicker = zim.Ticker.add(function(){}); // ensures drag is in Ticker queue
			}
		}

		function unInitializeObject() {
			zim.Ticker.remove(obj.zimDragTicker);
		}

		// set up damping for slide and variables used to predict future locations
		if (slide) {
			var dampX = new zim.Damp(obj.x, slideDamp);
			var dampY = new zim.Damp(obj.y, slideDamp);
			var back = 3; // how many ticks ago to estimate trajectory
			var lastCount = 0;
			var backX = [];
			var backY = [];
			var upX = obj.x; // mouse up translated to local
			var upY = obj.y;
			var objUpX = obj.x; // drag object x when mouse up
			var objUpY = obj.y;
			var lastBackX = obj.x; // used to calculate trajectory
			var lastBackY = obj.y;
			var lastX = -10000; // used to see if sliding object is still moving
			var lastY = -10000;
			obj.zimDragMoving = false; // needs to be set by zim.dragRect as well
		}

		var dragObject;

		obj.zimDown = obj.on("mousedown", function(e) {
			// e.stageX and e.stageY are global
			// e.target.x and e.target.y are relative to e.target's parent
			// bring stageX and stageY into the parent's frame of reference
			// could use e.localX and e.localY but might be dragging container or contents
			dragObject = (currentTarget)?e.currentTarget:e.target;
			if (obj.zimDragRect && !dragObject.getBounds()) {zog("zim.drag() - drag object needs bounds set"); return;}
			if (onTop) {
				dragObject.parent.setChildIndex(dragObject,dragObject.parent.numChildren-1);
				dragObject.getStage().update();
			}
			downCheck = true;

			var point = dragObject.parent.globalToLocal(e.stageX, e.stageY);
			if (reg) {
				dragObject.x = point.x;
				dragObject.y = point.y;
				dragObject.getStage().update();
			}
			diffX = point.x - dragObject.x;
			diffY = point.y - dragObject.y;

			if (localBounds) {
				r = zim.boundsToGlobal(dragObject.parent, obj.zimDragRect);
				if (surround) rLocal = obj.zimDragRect;
			} else {
				r = obj.zimDragRect;
				if (surround) {
					rLocal = zim.boundsToGlobal(dragObject.parent, obj.zimDragRect, true); // true flips to global to local
				}
			}
			// just a quick way to set a default cursor or use the cursor sent in
			obj.cursor = (zot(dragCursor))?"move":dragCursor;

			// extra slide settings to project where the object will slide to
			if (slide) {
				lastCount = 0;
				backX = [point.x];
				backY = [point.y];
				lastX = -10000; // reset
				lastY = -10000;
				obj.zimDragMoving = true;
			}

		}, true);

		obj.zimMove = obj.on("pressmove", function(e) {
			if (!downCheck) return;
			positionObject(dragObject, e.stageX, e.stageY);
		}, true);

		function positionObject(o, x, y) {

			if (zot(o)) o = (dragObject) ? dragObject : obj; // so zim.dragRect can use this

			// x and y are the desired global positions for the object o
			// checkBounds returns the same values if there are no bounds
			// and returns values inside the bounds if there are bounds set
			// or returns a position so that object o surrounds the bounds if surround is true
			// firstly, convert the global x and y to a point relative to the object's parent
			if (!o.parent) return;
			if (!o.getStage()) return;

			if (zot(x) || zot(y)) {
				// so zim.dragRect can use this to position on rect change
				// it may be we are resizing before we even drag at all
				// so we need to establish variables that would have been made on drag events
				var p = o.parent.localToGlobal(o.x, o.y);
				diffX = diffY = 0;
				if (localBounds) {
					r = zim.boundsToGlobal(o.parent, obj.zimDragRect);
					if (surround) rLocal = o.zimDragRect;
				} else {
					r = obj.zimDragRect;
					if (surround) rLocal = zim.boundsToGlobal(o.parent, obj.zimDragRect, true); // flips to global to local
				}
				x = p.x;
				y = p.y;
				if (slide) {
					objUpX = o.x;
					objUpY = o.y;
					dragObject = o;
					dampX.immediate(objUpX);
					dampY.immediate(objUpY);
				}
			}

			var point = o.parent.globalToLocal(x, y);
			if (slide && slideSnap) {
				o.x = point.x-diffX;
				o.y = point.y-diffY;
			} else {
				var checkedPoint = checkBounds(o,point.x-diffX, point.y-diffY);
				// now set the object's x and y to the resulting checked local point
				o.x = checkedPoint.x;
				o.y = checkedPoint.y;
			}
		}
		obj.zimPosition = positionObject;

		obj.zimUp = obj.on("pressup", function(e) {
			if (!downCheck) return;
			obj.cursor = (zot(overCursor))?"pointer":overCursor;
			if (slide) {
				var point = dragObject.parent.globalToLocal(e.stageX, e.stageY);
				downCheck = false;
				upX = point.x;
				upY = point.y;
				objUpX = dragObject.x;
				objUpY = dragObject.y;
				dampX.immediate(dragObject.x);
				dampY.immediate(dragObject.y);
			}
		}, true);

		// the bounds check for registration inside the bounds
		// or if surround is set for the whole object staying outside the bounds
		function checkBounds(o, x, y) {
			if (r) {
				if (surround) {
					var w = o.getBounds().width;
					var h = o.getBounds().height;
					if (w < rLocal.width) {
						// put half way between
						x = rLocal.x + (rLocal.width - w) / 2 + o.regX;
					} else {
						if (x - o.regX > rLocal.x) {
							x = rLocal.x + o.regX;
						}
						if (x - o.regX + w < rLocal.x + rLocal.width) {
							x = rLocal.x + rLocal.width + o.regX - w;
						}
					}
					if (o.height < rLocal.height) {
						// put half way between
						y = rLocal.y + (rLocal.height - h) / 2 + o.regY;
					} else {
						if (y - o.regY > rLocal.y) {
							y = rLocal.y + o.regY;
						}
						if (y - o.regY + h < rLocal.y + rLocal.height) {
							y = rLocal.y + rLocal.height + o.regY - h;
						}
					}
				} else {
					// convert the desired drag position to a global point
					// note that we want the position of the object in its parent
					// so we use the parent as the local frame
					var point = o.parent.localToGlobal(x,y);
					// r is the bounds rectangle on the global stage
					// r is set during mousedown to allow for global scaling when in localBounds mode
					// if you scale in localBounds==false mode, you will need to reset bounds with dragRect()
					x = Math.max(r.x, Math.min(r.x+r.width, point.x));
					y = Math.max(r.y, Math.min(r.y+r.height, point.y));
					// now that the point has been checked on the global scale
					// convert the point back to the obj parent frame of reference
					point = o.parent.globalToLocal(x, y);
					x = point.x;
					y = point.y;
				}
			}
			return {x:x,y:y}
		}

		// we store where the object was a few ticks ago and project it forward
		// then damp until it stops - although the ticker keeps running and updating
		// if it snaps then the object is allowed to go past the bounds and damp back
		// if it is not snapping then the object stops at the bounds when it is slid
		function setUpSlide() {
			var stage = obj.getStage();
			obj.zimDragTicker = function() {
				if (!dragObject) dragObject = obj; // could be risky if intending to drag children
				if (downCheck) {
					var point = dragObject.parent.globalToLocal(stage.mouseX, stage.mouseY);
					lastCount++;
					backX.push(point.x);
					backY.push(point.y);
					if (lastCount >= back) {
						lastBackX = backX.shift();
						lastBackY = backY.shift();
					} else {
						lastBackX = backX[0];
						lastBackY = backY[0];
					}
				} else {
					if (!obj.zimDragMoving) return;
					var desiredX = objUpX + upX-lastBackX;
					var desiredY = objUpY + upY-lastBackY;
					if (r) {
						var checkedPoint = checkBounds(dragObject, desiredX, desiredY);
						desiredX = checkedPoint.x;
						desiredY = checkedPoint.y;
					}
					if (!slideSnap) {
						var checkedPoint = checkBounds(dragObject, dampX.convert(desiredX), dampY.convert(desiredY));
						dragObject.x = checkedPoint.x;
						dragObject.y = checkedPoint.y;
						testMove(dragObject,dragObject.x,dragObject.y,dragObject.x,dragObject.y);
					} else {
						dragObject.x = dampX.convert(desiredX);
						dragObject.y = dampY.convert(desiredY);
						testMove(dragObject,dragObject.x,dragObject.y,desiredX,desiredY);
					}
				}
			}
			function testMove(o,x,y,desiredX,desiredY) {
				if (Math.abs(o.x-lastX) < .1 && Math.abs(o.y-lastY) < .1) {
					obj.zimDragMoving = false;
					o.x = desiredX; // snap to final resting place
					o.y = desiredY;
					o.dispatchEvent("slidestop");
				} else {
					lastX = x;
					lastY = y;
				}
			}
			zim.Ticker.add(obj.zimDragTicker);
		}
		return obj;
	}

/*--
zim.noDrag = function(obj)
removes drag function from an object
this is not a stopDrag function (as in the drop of a drag and drop)
that happens automatically with the drag() function
this in a sense, turns off a drag function so it is no longer draggable
returns obj for chaining
--*/
	zim.noDrag = function(obj) {
		if (zot(obj) || !obj.on) return;
		obj.cursor = "default";
		zim.setSwipe(obj, true);
		obj.off("added", obj.zimAdded);
		obj.off("removed", obj.zimRemoved);
		obj.off("mousedown", obj.zimDown);
		obj.off("pressmove", obj.zimMove);
		obj.off("pressup", obj.zimUp);
		if (zim.Ticker && obj.zimDragSlide) zim.Ticker.remove(obj.zimDragSlide);
		obj.zimDragMoving=obj.zimAdded=obj.zimRemoved=obj.zimDown=obj.zimMove=obj.zimUp=obj.zimDragRect=obj.zimDragSlide=null;
		return obj;
	}

/*--
zim.dragRect = function(obj, rect)
dynamically changes or adds a bounds rectangle to the object being dragged with zim.drag()
obj is an object that currently has its zim.drag() set
rect is a createjs Rectangle for the bounds - the local / global does not change from the original drag
--*/
	zim.dragRect = function(obj, rect) {
		if (zot(obj) || !obj.on) return;
		if (zot(rect)) return;
		obj.zimDragRect = rect;
		obj.zimDragMoving = true;
		if (obj.zimPosition) obj.zimPosition();
		return obj;
	}

/*--
zim.setSwipe = function(obj, swipe)
sets a zimNoSwipe property on the object to true if not swiping
sets the property to null if we want to swipe
zim Swipe in the Pages module will not swipe if zimNoSwipe is true
recursively sets children to same setting
--*/
	zim.setSwipe = function(obj, swipe) {
		if (zot(obj) || !obj.on) return;
		obj.zimNoSwipe = (swipe) ? null : true;
		if (obj instanceof createjs.Container) dig(obj);
		function dig(container) {
			var num = container.getNumChildren();
			var temp;
			for (var i=0; i<num; i++) {
				temp = container.getChildAt(i);
				temp.zimNoSwipe = obj.zimNoSwipe;
				if (temp instanceof createjs.Container) {
					dig(temp);
				}
			}
		}
	}

/*--
zim.hitTestPoint = function(obj, x, y)
see if shape (obj) is hitting the global point x and y on the stage
--*/
	zim.hitTestPoint = function(obj, x, y) {
		if (zot(obj) || !obj.globalToLocal) return;
		var point = obj.globalToLocal(x,y);
		return obj.hitTest(point.x, point.y);
	}

/*--
zim.hitTestReg = function(a, b)
see if shape (a) is hitting the registration point of object (b)
--*/
	zim.hitTestReg = function(a, b) {
		if (zot(a) || zot(b) || !a.localToLocal || !b.localToLocal) return;
		var point = b.localToLocal(b.regX,b.regY,a);
		return a.hitTest(point.x, point.y);
	}

/*--
zim.hitTestRect = function(a, b, num)
see if a shape (a) is hitting points on a rectangle
the rectangle is based on the position, registration and bounds of object (b)
the four corners are the default with num=0;
if num is 1 then it tests for one extra (mid) point on each side
if num is 2 then it tests for two extra points on each side (1/3 and 2/3)
etc.
--*/
	zim.hitTestRect = function(a, b, num) {
		if (zot(a) || zot(b) || !a.hitTest || !b.getBounds) return;
		if (zot(num)) num = 0;
		var bounds = b.getBounds();
		if (!bounds) {
			zog("zim create - hitTestRect():\n please setBounds() on param b object");
			return;
		}

		var shiftX, shiftY, point;

		//num = 0;  1/1
		//num = 1;  1/2  2/2
		//num = 2;  1/3  2/3  3/3
		//num = 3;  1/4  2/4  3/4  4/4

		for (var i=0; i<=num; i++) {
			shiftX = bounds.width  * (i+1)/(num+1);
			shiftY = bounds.height * (i+1)/(num+1);
			point = b.localToLocal(bounds.x+shiftX, bounds.y, a);
			if (a.hitTest(point.x, point.y)) return true;
			point = b.localToLocal(bounds.x+bounds.width, bounds.y+shiftY, a);
			if (a.hitTest(point.x, point.y)) return true;
			point = b.localToLocal(bounds.x+bounds.width-shiftX, bounds.y+bounds.height, a);
			if (a.hitTest(point.x, point.y)) return true;
			point = b.localToLocal(bounds.x, bounds.y+bounds.height-shiftY, a);
			if (a.hitTest(point.x, point.y)) return true;
		}
	}

/*--
zim.hitTestCircle = function(a, b, num)
see if a shape (a) is hitting points on a circle
the circle is based on the position, registration and bounds of object (b)
num is how many points around the circle we test - default is 8
--*/
	zim.hitTestCircle = function(a, b, num) {
		if (zot(a) || zot(b) || !a.hitTest || !b.getBounds) return;
		if (zot(num)) num = 8;
		var bounds = b.getBounds();
		if (!bounds) {
			zog("zim create - hitTestCircle():\n please setBounds() on param b object");
			return;
		}

		var centerX = bounds.x+bounds.width/2;
		var centerY = bounds.y+bounds.height/2;
		var radius = (bounds.width+bounds.height)/2/2; // average diameter / 2
		var angle, pointX, pointY, point;
		for (var i=0; i<num; i++) {
			angle = i/num * 2*Math.PI; // radians
			pointX = centerX + (radius * Math.cos(angle));
			pointY = centerY + (radius * Math.sin(angle));
			point = b.localToLocal(pointX, pointY, a);
			if (a.hitTest(point.x, point.y)) return true;
		}

	}

/*--
zim.hitTestBounds = function(a, b, boundsShape)
see if the a.getBounds() is hitting the b.getBounds()
we draw bounds for demonstration if you pass in a boundsShape shape
--*/
	zim.hitTestBounds = function(a, b, boundsShape) {

		if (zot(a) || zot(b) || !a.getBounds || !b.getBounds) return;
		var boundsCheck = false;
		if (boundsShape && boundsShape.graphics) boundsCheck=true;

		var aB = a.getBounds();
		var bB = b.getBounds();
		if (!aB || !bB) {
			zog("zim create - hitTestBounds():\n please setBounds() on both objects");
			return;
		}

		var adjustedA = zim.boundsToGlobal(a);
		var adjustedB = zim.boundsToGlobal(b);

		if (boundsCheck) {
			var g = boundsShape.graphics;
			g.clear();
			g.setStrokeStyle(1).beginStroke("blue");
			g.drawRect(adjustedA.x, adjustedA.y, adjustedA.width, adjustedA.height);
			g.beginStroke("green");
			g.drawRect(adjustedB.x, adjustedB.y, adjustedB.width, adjustedB.height);
			boundsShape.getStage().update();
		}

		return rectIntersect(adjustedA, adjustedB);

		function rectIntersect(a, b) { // test two rectangles hitting
			if (a.x >= b.x + b.width || a.x + a.width <= b.x ||
				a.y >= b.y + b.height || a.y + a.height <= b.y ) {
				return false;
			} else {
				return true;
			}
		}
	}

/*--
zim.boundsToGlobal = function(obj, rect)
returns a createjs Rectangle of the bounds of object projected onto the stage
if a createjs rectangle is passed in then it converts this rectangle
from within the frame of the obj to a global rectangle
if flip (default false) is set to true it goes from local rect to global rect
used by drag() and hitTestBounds() above so probably you will not use this directly
--*/
	zim.boundsToGlobal = function(obj, rect, flip) {

		if (zot(obj) || !obj.getBounds) return;
		if (zot(flip)) flip = false;
		var oB = obj.getBounds();
		if (!oB && zot(rect)) {
			zog("zim create - boundsToGlobal():\n please setBounds() on object (or a rectangle)");
			return;
		}
		if (rect) oB = rect;

		if (flip) {
			var pTL = obj.globalToLocal(oB.x, oB.y);
			var pTR = obj.globalToLocal(oB.x+oB.width, oB.y);
			var pBR = obj.globalToLocal(oB.x+oB.width, oB.y+oB.height);
			var pBL = obj.globalToLocal(oB.x, oB.y+oB.height);
		} else {
			var pTL = obj.localToGlobal(oB.x, oB.y);
			var pTR = obj.localToGlobal(oB.x+oB.width, oB.y);
			var pBR = obj.localToGlobal(oB.x+oB.width, oB.y+oB.height);
			var pBL = obj.localToGlobal(oB.x, oB.y+oB.height);
		}

		// handle rotation
		var newTLX = Math.min(pTL.x,pTR.x,pBR.x,pBL.x);
		var newTLY = Math.min(pTL.y,pTR.y,pBR.y,pBL.y);
		var newBRX = Math.max(pTL.x,pTR.x,pBR.x,pBL.x);
		var newBRY = Math.max(pTL.y,pTR.y,pBR.y,pBL.y);

		return new createjs.Rectangle(
			newTLX,
			newTLY,
			newBRX-newTLX,
			newBRY-newTLY
		);
	}

/*--
zim.hitTestGrid = function(obj, width, height, cols, rows, x, y, offsetX, offsetY, spacingX, spacingY, local, type)
converts an x and y point to an index in a grid
if you have a grid of rectangles for instance and you want to find out which is beneath the cursor
this technique will work faster than any of the other hit tests
obj is the object that contains the grid
width and height are the overall dimensions
cols and rows are how many of each (note it is cols and then rows)
x and y would be your stage.mouseX and stage.mouseY most likely
these get automatically converted to the object's cooridinates unless local is set to true (default is false)
offsetX and offsetY are the distances the grid starts from the origin of the obj - default is 0
spacingX and spacingY default to 0 - null will be returned if x and y within spacing
spacing is only between the cells and is to be included in the width and height (but not outside the grid)
type defaults to index which means the hitTestGrid returns the index of the cell beneath the x and y point
starting at 0 for top left corner and counting columns along the row and then to the next row, etc.
type set to "col" will return the column and "row" will return the row "array" will return all three [index, col, row]
--*/
	zim.hitTestGrid = function(obj, width, height, cols, rows, x, y, offsetX, offsetY, spacingX, spacingY, local, type) {
		if (!zot(obj) && !local) {
			var point = obj.globalToLocal(x,y);
			x=point.x; y=point.y;
		}
		if (zot(offsetX)) offsetX = 0;
		if (zot(offsetY)) offsetY = 0;
		if (zot(spacingX)) spacingX = 0;
		if (zot(spacingY)) spacingY = 0;

		// assume spacing is to the right and bottom of a cell
		// turning this into an object would avoid the size calculations
		// but hopefully it will not be noticed - and then hitTests are all functions
		var sizeX = width / cols;
		var sizeY = height / rows;

		// calculate col and row
		var col = Math.min(cols-1,Math.max(0,Math.floor((x-offsetX)/sizeX)));
		var row = Math.min(rows-1,Math.max(0,Math.floor((y-offsetY)/sizeY)));

		// check if within cell
		if ((x-offsetX)>sizeX*(col+1)-spacingX || (x-offsetX)<sizeX*(col)) return;
		if ((y-offsetY)>sizeY*(row+1)-spacingY || (y-offsetY)<sizeY*(row)) return;

		var index = row*cols + col;
		if (zot(type) || type=="index") return index
		if (type == "col") return col;
		if (type == "row") return row;
		if (type == "array") return [index, col, row];
	}

/*--
zim.scale = function(obj, scale)
convenience function to do scaleX and scaleY in one call
pass in the object to scale followed by the scale
returns the object for chaining
--*/
	zim.scale = function(obj, scale) {
		if (zot(obj) || !obj.scaleX) return;
		if (zot(scale)) scale=1;
		obj.scaleX = obj.scaleY = scale;
		return obj;
	}

/*--
zim.scaleTo = function(obj, boundObj, percentX, percentY, type)
scales object to a percentage of another object's bounds
percentage is from 0 - 100 (not 0-1)
for example, button (obj) is 10% the width of the stage (boundObj)
supports DUO - parameters or single object
type is "smallest" (default), "biggest", and "both"
smallest: uses the smallest scaling (fit)
biggest: uses the largest scaling (outside)
both: keeps both x and y scales - may stretch object (stretch)
returns the object for chaining
--*/
	zim.scaleTo = function(obj, boundObj, percentX, percentY, type) {

		var sig = "obj, boundObj, percentX, percentY, type";
		var duo; if (duo = zob(zim.scaleTo, arguments, sig)) return duo;

		if (zot(obj) || !obj.getBounds || !obj.getBounds()) {zog ("zim create - scaleTo(): please provide an object (with setBounds) to scale"); return;}
		if (zot(boundObj) || !boundObj.getBounds || !boundObj.getBounds()) {zog ("zim create - scaleTo(): please provide a boundObject (with setBounds) to scale to"); return;}
		if (zot(percentX)) percentX = -1;
		if (zot(percentY)) percentY = -1;
		if (percentX == -1 && percentY == -1) return obj;
		if (zot(type)) type = "smallest";
		var w = boundObj.getBounds().width * percentX / 100;
		var h = boundObj.getBounds().height * percentY / 100;
		if ((percentX == -1 || percentY == -1) && type != "both" && type != "stretch") {
			if (percentX == -1) {
				zim.scale(obj, h/obj.getBounds().height);
			} else {
				zim.scale(obj, w/obj.getBounds().width);
			}
			return obj;
		}
		if (type == "both" || type == "stretch") {
			obj.scaleX = (percentX != -1) ? w/obj.getBounds().width : obj.scaleX;
			obj.scaleY = (percentY != -1) ? h/obj.getBounds().height : obj.scaleY;
			return obj;
		} else if (type == "biggest" || type == "largest" || type == "outside") {
			var scale = Math.max(w/obj.getBounds().width, h/obj.getBounds().height);
		} else { // smallest or fit
			var scale = Math.min(w/obj.getBounds().width, h/obj.getBounds().height);
		}
		zim.scale(obj, scale);
		return obj;
	}

/*--
zim.move = function(target, x, y, time, ease, call, params, wait, props, fps, sequence)
convenience function (wraps createjs.Tween)
to animate an object target to position x, y in time milliseconds
supports DUO - parameters or single object
with optional ease, call back function and params (send an array, for instance)
and props for TweenJS tween (see CreateJS documentation) defaults to override:true
note, this is where you can set loop:true to loop animation
added to props as a convenience are:
loopWait:ms - how many ms to wait before looping (post animation wait)
rewind:true - rewinds (reverses) animation
rewindWait:ms - milliseconds to wait in the middle of the rewind (default 0 ms)
rewindCall:function - calls function at middle of rewind animation
rewindParams:obj - parameters to send rewind function
count:Integer - if loop is true how many times it will loop - default 0 forever
can set frames per second as fps parameter default 30 (works better on mobile)
sequence defaults to 0 ms - set it to the delay time (ms) to run an array of targets
for example, target = [a,b,c] and sequence = 1000
would run the animation on a and then 1 second later, run the animation on b, etc.
note - the ticker parameter has been removed - see zim.Ticker
returns target for chaining
--*/
	zim.move = function(target, x, y, time, ease, call, params, wait, props, fps, sequence) {

		var sig = "target, x, y, time, ease, call, params, wait, props, fps, sequence";
		var duo; if (duo = zob(zim.move, arguments, sig)) return duo;
		return zim.animate(target, {x:x, y:y}, time, ease, call, params, wait, props, fps, sequence);
	}

/*--
zim.animate = function(target, obj, time, ease, call, params, wait, props, fps, sequence)
convenience function (wraps createjs.Tween)
to animate object obj properties in time milliseconds
supports DUO - parameters or single object
added convinience property of scale that does both scaleX and scaleY
with optional ease, call back function and params (send an array, for instance)
and props for TweenJS tween (see CreateJS documentation) defaults to override:true
note, this is where you can set loop:true to loop animation
added to props as a convenience are:
loopWait:ms - how many ms to wait before looping (post animation wait)
rewind:true - rewinds (reverses) animation
rewindWait:ms - milliseconds to wait in the middle of the rewind (default 0 ms)
rewindCall:function - calls function at middle of rewind animation
rewindParams:obj - parameters to send rewind function
count:Integer - if loop is true how many times it will loop - default 0 forever
can set frames per second as fps parameter default 30 (works better on mobile)
sequence defaults to 0 ms - set it to the delay time (ms) to run an array of targets
for example, target = [a,b,c] and sequence = 1000
would run the animation on a and then 1 second later, run the animation on b, etc.
note - the ticker parameter has been removed - see zim.Ticker
returns target for chaining
--*/
	zim.animate = function(target, obj, time, ease, call, params, wait, props, fps, sequence) {

		var sig = "target, obj, time, ease, call, params, wait, props, fps, sequence";
		var duo; if (duo = zob(zim.animate, arguments, sig)) return duo;

		// handle multiple targets first if there is an array
		// this just recalls the animate function for each element delayed by the sequence parameter
		if (zot(sequence)) sequence = 0;
		if (target instanceof Array) {
			var currentTarget = 0;
			for (var i=0; i<target.length; i++) {
				setTimeout(function() {
					var t =	target[currentTarget];
					currentTarget++;
					zim.animate(t, obj, time, ease, call, params, wait, zim.copy(props), fps);
				}, sequence*i);
			}
			return;
		}

		// original animate functionality

		if (zot(target) || !target.on || zot(obj) || !target.getStage()) return;

		var t = time;
		if (zot(t)) t = 1000;
		if (zot(ease)) ease = "quadInOut";
		if (zot(wait)) wait = 0;
		if (zot(props)) props = {override: true};
		if (zot(params)) params = target;
		if (!zot(obj.scale)) {
			obj.scaleX = obj.scaleY = obj.scale;
			delete obj.scale;
		}
		zim.Ticker.stage = target.getStage();

		var tween;
		if (props.loop) {
			if (!zot(props.count)) {
				var count = props.count;
				delete props.count;
				var currentCount = 1;
			}
		}
		var wait3 = 0;
		if (props.loopWait) {
			wait3 = props.loopWait;
			delete props.loopWait;
		}
		if (props.rewind) {
			// flip second ease
			if (ease) {
				// backIn backOut backInOut
				var ease2 = ease;
				if (ease2.indexOf("InOut") == -1) {
					if (ease2.indexOf("Out") != -1) {
						ease2 = ease2.replace("Out", "In");
					} else if (ease2.indexOf("In") != -1) {
						ease2 = ease2.replace("In", "Out");
					}
				}
			}
			var obj2 = {}; var wait2 = 0;
			for (var i in obj) {
				obj2[i] = target[i];
			}
			delete props.rewind;
			if (props.rewindWait) {
				wait2 = props.rewindWait;
				delete props.rewindWait; // not a createjs prop so delete
			}
			if (props.rewindCall) {
				var call2 = props.rewindCall;
				var params2 = props.rewindParams;
				if (zot(params2)) params2 = target;
				delete props.rewindCall;
				delete props.rewindParams;
				tween = createjs.Tween.get(target, props)
					.wait(wait)
					.to(obj, t, createjs.Ease[ease])
					.call(rewindCall)
					.wait(wait2)
					.to(obj2, t, createjs.Ease[ease2])
					.call(doneAnimating)
					.wait(wait3);
			} else {
				tween = createjs.Tween.get(target, props)
					.wait(wait)
					.to(obj, t, createjs.Ease[ease])
					.wait(wait2)
					.to(obj2, t, createjs.Ease[ease2])
					.call(doneAnimating)
					.wait(wait3);
			}
		} else {
			tween = createjs.Tween.get(target, props)
				.wait(wait)
				.to(obj, t, createjs.Ease[ease])
				.call(doneAnimating)
				.wait(wait3);
		}

		var zimTicker = zim.Ticker.add(function(){});
		if (!zot(fps)) createjs.Ticker.setFPS(fps);

		function doneAnimating() {
			if (call && typeof call == 'function') {(call)(params);}
			if (props.loop) {
				if (count > 0) {
					if (currentCount < count) {
						currentCount++;
						return;
					}
				} else {
					return;
				}
			}
			tween.setPaused(true);
			zim.Ticker.remove(zimTicker);
		}
		function rewindCall() {
			if (call2 && typeof call2 == 'function') {(call2)(params2);}
		}
		return target;
	}

/*--
zim.fit = function(obj, left, top, width, height, inside)
scale an object to fit inside (or outside) a rectangle and center it
actually scales and positions the object
object must have bounds set (setBounds())
supports DUO - parameters or single object
if only the object is passed in then if fits to the stage
the inside parameter defaults to true and fits the object inside the bounds
if inside is false then it fits the object around the bounds
in both cases the object is centered
returns an object with the new and old details:
{x:obj.x, y:obj.y, width:newW, height:newH, scale:scale, bX:left, bY:top, bWidth:width, bHeight:height}
--*/
	zim.fit = function(obj, left, top, width, height, inside) {

		var sig = "obj, left, top, width, height, inside";
		var duo; if (duo = zob(zim.fit, arguments, sig)) return duo;

		if (zot(obj) || !obj.getBounds) return;
		if (!obj.getBounds()) {
			zog("zim create - fit(): please setBounds() on object");
			return;
		}
		if (zot(left)) {
			if (!obj.getStage()) {
				zog("zim create - fit(): please add boundary dimensions or add obj to stage first");
				return;
			}
			if (!obj.getStage().getBounds()) {
				zog("zim create - fit(): please add boundary dimensions or add obj with bounds to stage first");
				return;
			}
			var stageW = obj.getStage().getBounds().width;
			var stageH = obj.getStage().getBounds().height;
			left = 0; top = 0;
			width = stageW; height = stageH;
		}
		if (zot(inside)) inside = true;

		obj.scaleX = obj.scaleY = 1;

		var w = width;
		var h = height;
		var objW = obj.getBounds().width;
		var objH = obj.getBounds().height;
		var scale;

		if (inside) { // fits dimensions inside screen
			if (w/h >= objW/objH) {
				scale = h / objH;
			} else {
				scale = w / objW;
			}
		} else { // fits dimensions outside screen
			if (w/h >= objW/objH) {
				scale = w / objW;
			} else {
				scale = h / objH;
			}
		}

		obj.scaleX = obj.scaleY = scale;

		var newW = objW * scale;
		var newH = objH * scale;

		// horizontal center
		obj.x = obj.regX*scale + left + (w-newW)/2;

		// vertical center
		obj.y = obj.regY*scale + top + (h-newH)/2;

		return {x:obj.x, y:obj.y, width:newW, height:newH, scale:scale, bX:left, bY:top, bWidth:width, bHeight:height};

	}

/*--
zim.outline = function(obj, color, size)
for testing purposes
draws a rectangle around the bounds of obj (adds rectangle to the objects parent)
draws a cross at the origin of the object (0,0) where content will be placed
draws a circle at the registration point of the object (where it will be placed in its container)
these three things could be in completely different places ;-)
supports DUO - parameters or single object
returns the shape if you want to remove it: obj.parent.removeChild(returnedShape);
will not be resized - really just to use while building and then comment it out or delete it
--*/
	zim.outline = function(obj, color, size) {

		var sig = "obj, color, size";
		var duo; if (duo = zob(zim.outline, arguments, sig)) return duo;

		if (zot(obj) || !obj.getBounds) {zog("zim create - outline(): please provide object and shape"); return;}
		if (!obj.getBounds()) {zog("zim create - outline(): please setBounds() on object");	return;}
		if (!obj.parent) {zog("zim create - outline(): object should be on stage first"); return;}
		if (zot(color)) color = "brown";
		if (zot(size)) size = 2;
		var oB = obj.getBounds();
		var shape = new createjs.Shape();
		var p = obj.parent;

		var pTL = obj.localToLocal(oB.x, oB.y, p);
		var pTR = obj.localToLocal(oB.x+oB.width, oB.y, p);
		var pBR = obj.localToLocal(oB.x+oB.width, oB.y+oB.height, p);
		var pBL = obj.localToLocal(oB.x, oB.y+oB.height, p);

		var g = shape.graphics;
		g.s(color).ss(size).r(pTL.x, pTL.y, (pTR.x-pTL.x),(pBR.y-pTR.y));

		// subtract a scaled top left bounds from the top left point
		zero = {x:pTL.x-oB.x*obj.scaleX, y:pTL.y-oB.y*obj.scaleY};

		// cross at 0 0
		var s = 10;
		var ss = s+1;
		g.s("white").ss(size+2);
		g.mt(zero.x-ss, zero.y+0).lt(zero.x+ss, zero.y+0);
		g.mt(zero.x+0,  zero.y-ss).lt(zero.x+0, zero.y+ss);
		g.s(color).ss(size);
		g.mt(zero.x-s, zero.y+0).lt(zero.x+s, zero.y+0);
		g.mt(zero.x+0,  zero.y-s).lt(zero.x+0, zero.y+s);

		// circle at registration point
		g.s("white").ss(size+2).dc(obj.x,obj.y,s+6);
		g.s(color).ss(size).dc(obj.x,obj.y,s+6);

		obj.parent.addChild(shape);
		if (obj.getStage()) obj.getStage().update();
		return obj;
	}

/*--
zim.centerReg = function(obj, container, add)
centers the registration point on the bounds - obj must have bounds set
supports DUO - parameters or single object
if container is specified then sets obj x and y to half the width and height of container
add defaults to true and will add the child to the container - set to false if you do not want this
just a convenience function - returns obj for chaining
--*/
	zim.centerReg = function(obj, container, add) {

		var sig = "obj, container";
		var duo; if (duo = zob(zim.centerReg, arguments, sig)) return duo;

		if (zot(obj) || !obj.getBounds) {zog("zim create - centerReg(): please provide object with bounds set"); return;}
		if (!zot(container)) {
			if (!container.getBounds) {
				zog("zim create - centerReg(): please provide container with bounds set");
				return;
			} else {
				obj.x = container.getBounds().width/2;
				obj.y = container.getBounds().height/2;
			}
		}
		var oB = obj.getBounds();
		obj.regX = oB.x + oB.width/2;
		obj.regY = oB.y + oB.height/2;
		if (zot(add)) add = true;
		if (add && container && container.addChild) container.addChild(obj);
		return obj;
	}

/*--
zim.place = function(obj)
sets the object to drag and logs to the console the x and y
this is for when building you can move an object around to position it
and then once positioned just set the reported x and y and delete the place call
--*/
	zim.place = function(obj, id) {
		if (zot(obj)) return;
		if (zot(id)) id = "obj";
		function report() {zog(id+".x = " + Math.round(obj.x) +  "; "+id+".y = " + Math.round(obj.y) + ";");}
		zim.drag({obj:obj, currentTarget:true, dragCursor:"crosshair"});
		zog("place "+id+" - to get new position");
		obj.on("click", report);
	}

/*--
zim.expand = function(obj, padding, paddingVertical)
adds a createjs hitArea to an object with an extra padding of padding (default 20)
or if padding vertical is supplied then the padding parameter is for horizontal padding
good for making mobile interaction better on labels, buttons, etc.
returns object for chaining
--*/
	zim.expand = function(obj, padding, paddingVertical) {
		if (zot(obj) || !obj.getBounds) {zog("zim create - expand(): please provide object with bounds set"); return;}
		if (zot(padding)) padding = 20;
		if (zot(paddingVertical)) paddingVertical = padding;
		var oB = obj.getBounds();
		var rect = new createjs.Shape();
		rect.graphics.f("0").r(oB.x-padding,oB.y-paddingVertical,oB.width+2*padding,oB.height+2*paddingVertical);
		obj.hitArea = rect;
		return obj;
	}

	return zim;
} (zim || {});



////////////////  ZIM BUILD  //////////////

// zimbuild.js adds common building classes for digidos (interactive media)
// classes in this module require createjs namespace to exist and in particular easel.js
// available at http://createjs.com

var zim = function(zim) {

	if (zon) zog("ZIM BUILD Module");

/*--
zim.OPTIMIZE

a setting that relates to how stage.update() is used by the components
default is false which means some components will update the stage automatically
for instance, the Slider will update the stage so that you can see the knob slide
also, the CheckBox and RadioButtons when checked will update the stage
the Tabs change button colors and then update the stage
closing of a Pane will update the stage
the Stepper also updates as does changing color of a button, label, etc.

however, concurrent stage.update() calls can slow down mobile performance
so if you are making content for mobile you should set zim.OPTIMIZE = true;
then you will have to stage.update() in the change event handlers
but you were probably doing things in these events and updating anyway!
just be careful - you might be testing a checkbox and it won't check...
so it takes some getting used to running in optimized mode

Components affected by OPTIMIZE:
Label, Button, Checkbox, RadioButton, Pane, Stepper, Slider, Tabs

OPTIMIZE set to true also affects the zim Ticker
for functions like move, animate, drag, Scroller, Parallax
See zim.Ticker as you may have to set zim.Ticker.update = true;

For mobile, you should set the mouseover parameter of zim.Frame to false
and, as mentioned, set zim.OPTIMIZE = true at the top of your script
--*/

zim.OPTIMIZE = false;


/*--
zim.ACTIONEVENT

a setting that specifies the event type to trigger many of the components
default is "mousedown" which is more responsive on mobile
setting the constant to anything else, will cause the components to use "click"

for instance, with the default settings, the following components will act on mousedown
Button, CheckBox, RadioButtons, Pane, Stepper and Tabs
--*/

zim.ACTIONEVENT = "mousedown";


/*--
zim.Circle = function(radius, fill, stroke, strokeSize)

Circle class

extends a createjs.Container (allows for ZIM HotSpots)
makes a circle shape inside a container
var circle = new zim.Circle(parameters);
the registration and origin will be the center

PARAMETERS: supports DUO - parameters or single object
radius is the radius ;-)
fill, stroke, strokeSize are optional

METHODS
setFill(color)
setStroke(color)
setStrokeSize(size) - number
clone() - makes a copy

PROPERTIES
shape - gives access to the circle shape
color - get and set the fill color
width and height - as expected or use getBounds()
mouseChildren - set to false so  you do not drag the shape inside the circle
if you nest things inside and want to drag them, will want to set to true
--*/
	zim.Circle = function(radius, fill, stroke, strokeSize) {

		var sig = "radius, fill, stroke, strokeSize";
		var duo; if (duo = zob(zim.Circle, arguments, sig)) return duo;

		function makeCircle() {

			if (zot(radius)) radius = 50;
			if (zot(fill)) fill = "black";

			var that = this;
			this.mouseChildren = false;

			var circle = this.shape = new createjs.Shape();
			this.addChild(circle);

			var g = circle.graphics;
			var fillObj =g.beginFill(fill).command;
			if (!zot(stroke)) {
				var strokeObj = g.beginStroke(stroke).command;
				if (zot(strokeSize)) strokeSize=1;
				var strokeSizeObj = g.setStrokeStyle(strokeSize).command;
			}
			g.dc(0,0,radius);

			this.width = radius*2;
			this.height = radius*2;
			this.setBounds(-radius,-radius,this.width,this.height);

			this.setFill = function(c) {
				if (zot(c)) return;
				fill = c;
				fillObj.style = fill;
			}
			Object.defineProperty(that, 'color', {
				get: function() {
					return fill;
				},
				set: function(value) {
					that.setFill(value);
				}
			});
			this.setStroke = function(c) {
				if (!strokeObj || zot(c)) return;
				stroke = c;
				strokeObj.style = stroke;
			}
			this.setStrokeSize = function(size) {
				if (!strokeSizeObj || zot(size)) return;
				strokeSize = size;
				strokeSizeObj.width = strokeSize;
			}
			this.clone = function() {
				return new zim.Circle(radius, fill, stroke, strokeSize);
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeCircle.prototype = new createjs.Container();
		makeCircle.prototype.constructor = zim.Circle;
		return new makeCircle();

	}


/*--
zim.Rectangle = function(width, height, fill, stroke, strokeSize, corner)

Rectangle class

extends a createjs.Container
makes a rectangle shape inside a container
var rectangle = new zim.Rectangle(parameters);
the registration and origin will be top left
mouseChildren is set to false so clicks return expected target (instead of shape in container)
to use ZIM HotSpots inside rectangle then set rectangle's mouseChildren = true

PARAMETERS: supports DUO - parameters or single object
width, height
fill, stroke, strokeSize are optional
corner - round of corner default 0

METHODS
setFill(color)
setStroke(color)
setStrokeSize(size) - number
clone() - makes a copy

PROPERTIES
shape - gives access to the circle shape
color - get and set the fill color
width and height - as expected or use getBounds()
mouseChildren - set to false so  you do not drag the shape inside the rectangle
if you nest things inside and want to drag them, will want to set to true
--*/
	zim.Rectangle = function(width, height, fill, stroke, strokeSize, corner) {

		var sig = "width, height, fill, stroke, strokeSize, corner";
		var duo; if (duo = zob(zim.Rectangle, arguments, sig)) return duo;

		function makeRectangle() {

			if (zot(width)) width = 100;
			if (zot(height)) height = 100;
			if (zot(fill)) fill = "black";
			if (zot(corner)) corner = 0;

			var that = this;
			this.mouseChildren = false;

			var rectangle = this.shape = new createjs.Shape();
			this.addChild(rectangle);

			var g = rectangle.graphics;
			var fillObj =g.beginFill(fill).command;
			if (!zot(stroke)) {
				var strokeObj = g.beginStroke(stroke).command;
				if (zot(strokeSize)) strokeSize=1;
				var strokeSizeObj = g.setStrokeStyle(strokeSize).command;
			}

			if (corner > 0) {
				g.rr(0,0,width,height,corner);
			} else {
				g.r(0,0,width,height);
			}

			this.width = width;
			this.height = height;
			this.setBounds(0,0,this.width,this.height);

			this.setFill = function(c) {
				if (zot(c)) return;
				fill = c;
				fillObj.style = fill;
			}
			Object.defineProperty(that, 'color', {
				get: function() {
					return fill;
				},
				set: function(value) {
					that.setFill(value);
				}
			});
			this.setStroke = function(c) {
				if (!strokeObj || zot(c)) return;
				stroke = c;
				strokeObj.style = stroke;
			}
			this.setStrokeSize = function(size) {
				if (!strokeSizeObj || zot(size)) return;
				strokeSize = size;
				strokeSizeObj.width = strokeSize;
			}
			this.clone = function() {
				return new zim.Rectangle(width, height, fill, stroke, strokeSize, corner);
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeRectangle.prototype = new createjs.Container();
		makeRectangle.prototype.constructor = zim.Rectangle;
		return new makeRectangle();

	}


/*--
zim.Triangle = function(a, b, c, fill, stroke, strokeSize, center, adjust)

Triangle class

extends a createjs.Container (allows for ZIM HotSpots)
makes a triangle shape inside a container using three line lengths
var tri = new zim.Triangle(parameters);

PARAMETERS: supports DUO - parameters or single object
a, b and c are the lengths of the sides
a will run horizontally along the bottom
b is upwards and c is back to the origin
if c is set to -1 will assume a 90 angle
fill, stroke, strokeSize are optional
center defaults to true and puts the registration point to the center
the actual center is not really the weighted center
so can pass in an adjust which brings the center towards its vertical base

METHODS
setFill(color)
setStroke(color)
setStrokeSize(size) - number
clone() - makes a copy

PROPERTIES
shape - gives access to the triangle shape
color - get and set the fill color
width and height - as expected or use getBounds()
mouseChildren - set to false so  you do not drag the shape inside the triangle
if you nest things inside and want to drag them, will want to set to true
--*/
	zim.Triangle = function(a, b, c, fill, stroke, strokeSize, center, adjust) {

		var sig = "a, b, c, fill, stroke, strokeSize, center, adjust";
		var duo; if (duo = zob(zim.Triangle, arguments, sig)) return duo;

		function makeTriangle() {

			if (zot(a)) a = 100;
			if (zot(b)) b = a;
			if (zot(c)) c = a;
			if (c==-1) c = Math.sqrt(Math.pow(a,2)+Math.pow(b,2));
			if (zot(fill)) fill = "black";
			if (zot(center)) center = true;
			if (zot(adjust)) adjust = 0;

			this.mouseChildren = false;
			var that = this;

			var lines = [a,b,c];
			lines.sort(function(a, b){return b-a});
			aa = lines[0];
			bb = lines[1];
			cc = lines[2];

			if (aa > bb+cc) {
				zog("zim build - Triangle(): invalid triangle lengths");
				return;
			}

			var tri = this.shape = new createjs.Shape();
			this.addChild(tri);

			var g = tri.graphics;
			var fillObj =g.beginFill(fill).command;
			if (!zot(stroke)) {
				var strokeObj = g.beginStroke(stroke).command;
				if (zot(strokeSize)) strokeSize=1;
				var strokeSizeObj = g.setStrokeStyle(strokeSize).command;
			}

			g.mt(0,0);
			g.lt(a,0);

			// find biggest angle with cosine rule
			var angle1 = Math.acos( (Math.pow(bb,2) + Math.pow(cc,2) - Math.pow(aa,2)) / (2 * bb * cc) ) * 180 / Math.PI;

			// use the sine rule for next biggest angle
			var angle2 = Math.asin( bb * Math.sin(angle1 * Math.PI / 180) / aa ) * 180 / Math.PI;

			// find last angle
			var angle3 = 180 - angle1 - angle2;

			// the next line is b the angle will be relative to the length of c
			// if c is the longest, then the angle is angle1
			// if c is the second longest, then the angle is angle2, etc.

			var nextAngle;
			if (c == aa) {nextAngle = angle1}
			else if (c == bb) {nextAngle = angle2}
			else {nextAngle = angle3}

			var backX = Math.cos(nextAngle * Math.PI / 180) * b;
			var upY = Math.sin(nextAngle * Math.PI / 180) * b;

			this.width = Math.max(a, a-backX);
			this.height = upY;
			this.setBounds(0,0,this.width,this.height);

			tri.y = this.height;

			g.lt(a-backX,0-upY);
			g.cp();

			if (center) {
				this.regX = this.width/2;
				this.regY = this.height/2+adjust;
			}

			this.setFill = function(c) {
				if (zot(c)) return;
				fill = c;
				fillObj.style = fill;
			}
			Object.defineProperty(that, 'color', {
				get: function() {
					return fill;
				},
				set: function(value) {
					that.setFill(value);
				}
			});
			this.setStroke = function(c) {
				if (!strokeObj || zot(c)) return;
				stroke = c;
				strokeObj.style = stroke;
			}
			this.setStrokeSize = function(size) {
				if (!strokeSizeObj || zot(size)) return;
				strokeSize = size;
				strokeSizeObj.width = strokeSize;
			}
			this.clone = function() {
				return new zim.Triangle(a, b, c, fill, stroke, strokeSize, center, adjust);
			}

		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeTriangle.prototype = new createjs.Container();
		makeTriangle.prototype.constructor = zim.Triangle;
		return new makeTriangle();

	}


/*--
zim.Label = function(text, size, font, color, rollColor, shadowColor, shadowBlur, align)

Label Class

extends a createjs.Container
makes a label - wraps the createjs Text object
can use with Button, CheckBox, RadioButtons and Pane
var label = new zim.Label(parameters);
Text seems to come in different sizes so we do our best
Have tended to find that left and alphabetic are most consistent across browsers

PARAMETERS (see the defaults in the code) supports DUO - parameters or single object
labelText,
fontSize, font, textColor, textRollColor,
shadowColor defaults to -1 for no shadow
value for shadow blur (default 14)
align - defaults to "left" also there is "center" and "right"

METHODS
showRollColor(boolean) - true to show roll color (used internally)
clone() - returns a copy of the label and its properties
dispose() - to get rid of the button and listeners

PROPERTIES
label - references the text object of the label
color - gets or sets the label text color
rollColor - gets or sets the label rollover color
text - references the text property of the text object
width and height (or use getBounds().width, getBounds().height)
enabled - default is true - set to false to disable

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties

EVENTS
dispatches no events
--*/
	zim.Label = function(text, size, font, color, rollColor, shadowColor, shadowBlur, align) {

		var sig = "text, size, font, color, rollColor, shadowColor, shadowBlur, align";
		var duo; if (duo = zob(zim.Label, arguments, sig)) return duo;

		function makeLabel() {

			if (zot(text)) text="LABEL";
			if (text === "") text = " ";
			if (zot(size)) size=36;
			if (zot(font)) font="arial";
			if (zot(color)) color="black";
			if (zot(rollColor)) rollColor=color;
			if (zot(shadowColor)) shadowColor=-1;
			if (zot(shadowBlur)) shadowBlur=14;
			if (zot(align)) align="left";

			var that = this;
			this.mouseChildren = false;

			var obj = this.label = new createjs.Text(String(text), size + "px " + font, color);
			obj.textBaseline = "alphabetic";
			obj.textAlign = align;
			if (shadowColor != -1 && shadowBlur > 0) obj.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);
			this.addChild(obj);

			var backing = new createjs.Shape();
			backing.graphics.f("black").r(0,0,this.getBounds().width,this.getBounds().height);
			this.hitArea = backing;

			this.width = this.getBounds().width;
			this.height = this.getBounds().height;
			if (align == "center") {
				this.setBounds(-this.width/2,0,this.width,this.height);
			} else if (align == "right") {
				this.setBounds(-this.width,0,this.width,this.height);
			} else {
				this.setBounds(0,0,this.width,this.height);
			}

			obj.y = size-size/6;

			Object.defineProperty(that, 'text', {
				get: function() {
					var t = (obj.text == " ") ? "" : obj.text;
					return t;
				},
				set: function(value) {
					if (zot(value)) {value = " ";}
					obj.text = String(value);
					that.width = that.getBounds().width;
					that.height = that.getBounds().height;;
					if (align == "center") {
						that.setBounds(-that.width/2,0,that.width,that.height);
					} else if (align == "right") {
						that.setBounds(-that.width,0,that.width,that.height);
					} else {
						that.setBounds(0,0,that.width,that.height);
					}
				}
			});

			Object.defineProperty(that, 'color', {
				get: function() {
					return color;
				},
				set: function(value) {
					color = value;
					obj.color = color;
					if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
				}
			});

			Object.defineProperty(that, 'rollColor', {
				get: function() {
					return rollColor;
				},
				set: function(value) {
					rollColor = value;
				}
			});

			this._enabled = true;
			Object.defineProperty(that, 'enabled', {
				get: function() {
					return that._enabled;
				},
				set: function(value) {
					zenable(that, value);
					obj.color = color;
					that.mouseChildren = false;
					if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
				}
			});

			this.showRollColor = function(yes) {
				if (zot(yes)) yes = true;
				if (yes) {
					obj.color = rollColor;
				} else {
					obj.color = color;
				}
				if (that.getStage()) that.getStage().update();
			}

			this.on("mouseover", function(e) {that.showRollColor();});
			this.on("mouseout", function(e) {that.showRollColor(false);});

			this.clone = function() {
				return new zim.Label(that.text, size, font, color, rollColor, shadowColor, shadowBlur);
			}

			this.dispose = function() {
				that.removeAllEventListeners();
				return true;
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeLabel.prototype = new createjs.Container();
		makeLabel.prototype.constructor = zim.Label;
		return new makeLabel();

	}


/*--
zim.Button = function(width, height, label, color, rollColor, borderColor, borderThickness, corner, shadowColor, shadowBlur, hitPadding)

Button Class

extends a createjs.Container
makes a button with rollovers
var button = new zim.Button(parameters);
you will need to stage.addChild(button); and position it
you will need to add a click event button.on("click", function); (or mousedown for mobile)
the Button class handles the rollovers

PARAMETERS (all with defaults - see code) supports DUO - parameters or single object
width (default 200), height (default 60),
label, // ZIM Label or plain text for default settings
color (backing), rollColor (backing), borderColor, borderThickness,
corner default 20
shadowColor defaults to rgba(0,0,0,.3) set to -1 for no shadow
value for shadow blur (default 14)
hitPadding (default 0) adds extra hit area to the button for mobile

METHODS
dispose() - to get rid of the button and listeners

PROPERTIES
width and height - or use getBounds().width and getBounds().height
text - references the text property of the Label object of the button
label - gives access to the label
backing - references the backing (zim.Rectangle) of the button
enabled - default is true - set to false to disable
color - get or set non-rolled on backing color
rollColor - get or set rolled on backing color

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties

EVENTS
dispatches no events - you make your own click event (or mousedown for mobile)
--*/
	zim.Button = function(width, height, label, color, rollColor, borderColor, borderThickness, corner, shadowColor, shadowBlur, hitPadding) {

		var sig = "width, height, label, color, rollColor, borderColor, borderThickness, corner, shadowColor, shadowBlur, hitPadding";
		var duo; if (duo = zob(zim.Button, arguments, sig)) return duo;

		function makeButton() {

			if (zot(width)) width=200;
			if (zot(height)) height=60;
			if (zot(color)) color="#C60";
			if (zot(rollColor)) rollColor="#F93";
			if (zot(borderColor)) borderColor=null;
			if (zot(borderThickness)) borderThickness=1;
			if (zot(corner)) corner=20;
			if (zot(shadowColor)) shadowColor="rgba(0,0,0,.3)";
			if (zot(shadowBlur)) shadowBlur=14;
			if (zot(hitPadding)) hitPadding=0;
			if (zot(label)) label = "PRESS";
			if (typeof label === "string" || typeof label === "number") label = new zim.Label(label, 36, "arial", "white");

			var that = this;
			this.mouseChildren = false;
			this.cursor = "pointer";

			var buttonBacking = new zim.Rectangle(width,height,color,borderColor,borderThickness,corner);
			this.addChild(buttonBacking);
			this.backing = buttonBacking;

			if (hitPadding > 0) {
				var rect = new createjs.Shape();
				rect.graphics.f("#000").r(-hitPadding,-hitPadding,width+hitPadding*2,height+hitPadding*2);
				this.hitArea = rect;
			}

			if (shadowColor != -1 && shadowBlur > 0) buttonBacking.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);
			this.setBounds(0,0,width,height);
			this.width = width;
			this.height = height;

			label.x = (width-label.getBounds().width)/2+1;
			label.y = (height-label.getBounds().height)/2+2;
			this.addChild(label);
			this.label = label;

			Object.defineProperty(that, 'text', {
				get: function() {
					var t = (label.text == " ") ? "" : label.text;
					return t;
				},
				set: function(value) {
					label.text = value;
					label.x = (width-label.getBounds().width)/2+1;
					label.y = (height-label.getBounds().height)/2+2;
				}
			});

			Object.defineProperty(that, 'color', {
				get: function() {
					return color;
				},
				set: function(value) {
					color = value;
					buttonBacking.color = color;
					if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
				}
			});

			Object.defineProperty(that, 'rollColor', {
				get: function() {
					return rollColor;
				},
				set: function(value) {
					rollColor = value;
				}
			});

			this._enabled = true;
			Object.defineProperty(that, 'enabled', {
				get: function() {
					return that._enabled;
				},
				set: function(value) {
					zenable(that, value);
					that.mouseChildren = false;
					label.color = label.color;
					if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
				}
			});

			this.on("mouseover", buttonOn);
			function buttonOn(e) {
				that.on("mouseout", buttonOff);
				buttonBacking.color = rollColor;
				that.label.showRollColor();
				if (that.getStage()) that.getStage().update();
			}

			function buttonOff(e) {
				that.off("mouseout", buttonOff);
				buttonBacking.color = color;
				that.label.showRollColor(false);
				if (that.getStage()) that.getStage().update();
			}

			this.dispose = function() {
				that.removeAllEventListeners();
				that.removeChild(buttonBacking);
				that.removeChild(that.label);
				that.label.dispose();
				buttonBacking = null;
				that.label = null;
				return true;
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeButton.prototype = new createjs.Container();
		makeButton.prototype.constructor = zim.Button;
		return new makeButton();

	}


/*--
zim.CheckBox = function(size, label, startChecked, color, margin, type)

CheckBox Class

extends createjs.Container
a checkbox that when pressed toggles the check and a checked property
var checkBox = new zim.CheckBox(parameters)

PARAMETERS: supports DUO - parameters or single object
size - in pixels (always square)
label - ZIM Label object - or just some text to make a default label
startChecked - an initial parameter to set checked if true - default is false
color - the stroke and text color (default black) - background is set to a .5 alpha white
margin - is on outside of box so clicking or pressing is easier
type - default check, could be square (box) or x

METHODS
setChecked(Boolean) - defaults to true to set button checked (or use checked property)

PROPERTIES
label - gives access to the label
text - the text of the label
checked - gets or sets the check of the box
check - gives access to the check mark ie. check.color = "blue";
color - gets or sets the color of the check
enabled - default is true - set to false to disable

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

EVENTS
dispatches a "change" event when pressed on but not when the checked property is set
--*/
	zim.CheckBox = function(size, label, startChecked, color, margin, type) {

		var sig = "size, label, startChecked, color, margin, type";
		var duo; if (duo = zob(zim.CheckBox, arguments, sig)) return duo;

		function makeCheckBox() {

			if (zot(size)) size = 60;
			if (zot(label)) label = null;
			if (typeof label === "string" || typeof label === "number") label = new zim.Label(label, size*5/6, "arial", color);
			var myChecked = (zot(startChecked)) ? false : startChecked;
			if (zot(color)) color = "black";
			if (zot(margin)) margin = 10; //20;
			if (type != "box" && type != "square" && type != "x") type = "check";

			this.setBounds(-margin, -margin, size+margin*2, size+margin*2);

			var that = this;
			this.cursor = "pointer";

			var box = new createjs.Shape();
			var g = box.graphics;
			g.f("rgba(255,255,255,.5)").r(0,0,size,size);
			g.s(color).ss(size/10).r(size/7, size/7, size-size/7*2, size-size/7*2);
			this.addChild(box);

			var fullWidth = size;

			if (label) {
				this.addChild(label);
				label.x = size*1.3 + margin; //this.getBounds().width;
				label.y = size/8;
				this.label = label;
				this.setBounds(-margin, -margin, size+margin*3+label.getBounds().width, Math.max(size+margin*2, label.getBounds().height));
				fullWidth = label.x + label.width;
			}

			var backing = new createjs.Shape();
			g = backing.graphics;
			g.f("rgba(0,0,0,.01)").r(
				this.getBounds().x,
				this.getBounds().y,
				fullWidth+(margin*2),
				this.getBounds().height
			);
			this.hitArea = backing;
			// hitArea will stop rollovers on labels but oh well

			var check = new createjs.Shape();
			var g2 = check.graphics;
			var checkColor = "#000";
			if (type == "check") {
				g2.f(checkColor).p("AnQAdICBiaIEEDZIF8nfICfB4In/KPg"); // width about 90 reg in middle
			} else if (type == "box" || type == "square") {
				g2.f(checkColor).dr(-35,-35,70,70);
			} else { // x
				g2.f(checkColor).p("AmJEVIEUkTIkXkWIB4h5IEWEYIETkTIB4B3IkTESIEQERIh4B4IkRkRIkSEVg"); // width about 90 reg in middle
			}

			var cW = 95
			check.setBounds(-cW/2, -cW/2, cW, cW);
			var scale = size/(cW+66);

			check.scaleX = check.scaleY = scale;
			check.alpha = .9;
			check.x = size/2;
			check.y = size/2;

			if (myChecked) this.addChild(check);
			this.on((zim.ACTIONEVENT=="mousedown")?"mousedown":"click", toggleCheck);

			Object.defineProperty(that, 'checked', {
				get: function() {
					return myChecked;
				},
				set: function(value) {
					that.setChecked(value);
				}
			});

			Object.defineProperty(that, 'text', {
				get: function() {
					if (label) return label.text;
				},
				set: function(value) {
					if (label) {
						label.text = value;
						if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
					};
				}
			});

			Object.defineProperty(check, 'color', {
				get: function() {
					return checkColor;
				},
				set: function(value) {
					if (myChecked) {that.removeChild(check);}
					check = new createjs.Shape();
					g2 = check.graphics;
					checkColor = value;
					g2.f(checkColor).p("AnQAdICBiaIEEDZIF8nfICfB4In/KPg");
					check.scaleX = check.scaleY = scale;
					check.alpha = .9;
					check.x = size/2;
					check.y = size/2;
					if (myChecked) that.addChild(check);
					if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
				}
			});

			Object.defineProperty(that, 'check', {
				get: function() {
					return check;
				},
				set: function(value) {
					zog("ZIM CheckBox - check is read only");
				}
			});

			this._enabled = true;
			Object.defineProperty(that, 'enabled', {
				get: function() {
					return that._enabled;
				},
				set: function(value) {
					zenable(that, value);
				}
			});

			function toggleCheck(e) {
				myChecked = !myChecked;
				that.setChecked(myChecked);
				that.dispatchEvent("change");
			}

			this.setChecked = function(value) {
				if (zot(value)) value = true;
				myChecked = value;
				if (myChecked) {
					that.addChild(check);
				} else {
					that.removeChild(check);
				}
				if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
			}

			this.dispose = function() {
				that.removeAllEventListeners();
				return true;
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeCheckBox.prototype = new createjs.Container();
		makeCheckBox.prototype.constructor = zim.CheckBox;
		return new makeCheckBox();

	}


/*--
zim.RadioButtons = function(size, buttons, vertical, color, spacing, margin, always)

RadioButtons Class

extends createjs.Container
a radio button set that lets you pick from choices
var radioButton = new zim.RadioButton(parameters)

PARAMETERS: supports DUO - parameters or single object
size - in pixels (always square)
buttons - an array of button data objects as follows:
[{label:ZIM Label or text, id:optional id, selected:optional Boolean}, {etc...}]
or just a list of labels for default labels ["hi", "bye", "what!"]

vertical - boolean that if true displays radio buttons vertically else horizontally
color - the stroke and font color (default #111) - background is set to a .5 alpha white
spacing - the space between radio button objects
margin - the space around the radio button itself
always - defaults to false - if set true, cannot click on selection to unselect it

METHODS
setSelected(num) - sets the selected index (or use selectedIndex) -1 is default (none)

PROPERTIES
selected - gets the selected object - selected.label, selected.id, etc.
selectedIndex - gets or sets the selected index of the buttons
label - current selected label object
text - current selected label text
id - current selected id
labels - an array of the ZIM Label objects. labels[0].text = "YUM"; labels[2].y -= 10;
dots - an array of the zim Shape dot objects. dots[0].color = "yellow";
enabled - default is true - set to false to disable

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties
and stage.update() in change event to see component change its graphics

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

EVENTS
dispatches a "change" event when pressed but not when selectedIndex is set
then ask for the properties above for info
--*/
	zim.RadioButtons = function(size, buttons, vertical, color, spacing, margin, always) {

		var sig = "size, buttons, vertical, color, spacing, margin, always";
		var duo; if (duo = zob(zim.RadioButtons, arguments, sig)) return duo;

		function makeRadioButtons() {

			if (zot(size)) size = 60;
			size = Math.max(5, size);
			if (zot(buttons)) return;
			if (zot(vertical)) vertical = true;
			if (zot(color)) color = "#111";
			if (zot(spacing)) spacing = (vertical) ? size*.2 : size;
			if (zot(margin)) margin =  size/5;

			var that = this;
			this.cursor = "pointer";
			this.labels = [];
			this.dots = [];
			var currentObject; // reference to the current data object

			var buttonContainer = new createjs.Container();
			this.addChild(buttonContainer);
			buttonContainer.on((zim.ACTIONEVENT=="mousedown")?"mousedown":"click", pressBut);
			function pressBut(e) {
				var index = buttonContainer.getChildIndex(e.target);
				if (always) {if (that.selectedIndex == index) return;}
				that.setSelected(index);
				that.dispatchEvent("change");
			}

			// loop through data and call makeButton() each time
			makeButtons();
			var lastBut;
			function makeButtons() {
				// test for duplicate selected true properties (leave last selected)
				var data; var selectedCheck = false;
				for (var i=buttons.length-1; i>=0; i--) {
					data = buttons[i];
					if (data.selected && data.selected === true) {
						if (!selectedCheck) {
							selectedCheck = true; // first item marked selected
							that.id = data.id;
						} else {
							data.selected = "false"; // turn off selected
						}
					}
				}
				buttonContainer.removeAllChildren();
				var but; var currentLocation = 0;
				for (var i=0; i<buttons.length; i++) {
					data = buttons[i];

					if (typeof data === "string" || typeof data === "number") {
						var d = {selected:false, label:new zim.Label(data, size*5/6, "arial", color)};
						data = d;
					}
					if (data.label && typeof data.label === "string" || typeof data.label === "number") {
						data.label = new zim.Label(data.label, size*5/6, "arial", color);
					}
					that.labels.push(data.label);
					data.index = i;
					but = makeButton(data.selected, data.label);
					but.obj = data;
					if (data.selected) currentObject = but.obj;

					buttonContainer.addChild(but);

					if (vertical) {
						but.y = currentLocation;
						currentLocation += but.getBounds().height + spacing;
					} else {
						but.x = currentLocation;
						currentLocation += but.getBounds().width + spacing;
					}
				}
			}

			// making a single button - similar to CheckBox class
			function makeButton(mySelected, label) {
				var but = new createjs.Container();
				but.mouseChildren = false;
				but.setBounds(-margin, -margin, size+margin*2, size+margin*2);

				var box = new createjs.Shape();
				var g = box.graphics;
				g.f("rgba(255,255,255,.5)").dc(size/2,size/2,size/1.85);
				g.s(color).ss(size/9).dc(size/2, size/2, size/2-size/2/5);
				but.addChild(box);

				var check = but.check = new zim.Circle(size/5.2);
				that.dots.push(check);
				check.mouseEnabled = false;
				check.alpha = .95;
				check.regX = check.regY = -size/2;

				var fullWidth = size;

				if (label) {
					but.addChild(label);
					label.x = but.getBounds().width;
					label.y = size/8;
					but.setBounds(-margin, -margin, size+margin*2+label.getBounds().width, Math.max(size+margin*2, label.getBounds().height));
					fullWidth = label.x + label.width;
				}
				if (mySelected) {
					but.addChild(check);
					that.label = label;
					if (that.label) that.text = label.text;
				}

				var backing = new createjs.Shape();
				g = backing.graphics;
				g.f("rgba(0,0,0,.01)").r(
					but.getBounds().x,
					but.getBounds().y,
					fullWidth+(margin*2),
					but.getBounds().height
				);
				but.hitArea = backing;
				// hitArea will stop rollovers on labels but oh well

				return(but);
			}
			if (!this.getBounds()) this.setBounds(0,0,size,size);
			this.setBounds(-margin,-margin,this.getBounds().width+margin,this.getBounds().height+margin);

			// the main function that sets a button selected (after the initial makeButton)
			// this gets called by the setter methods below and the click event up top
			this.setSelected = function(value) {
				if (zot(value)) value = -1;
				if (value != -1 && !buttonContainer.getChildAt(value)) return;
				var but;
				for (var i=0; i<buttonContainer.getNumChildren(); i++) {
					but = buttonContainer.getChildAt(i);
					but.removeChild(but.check);
				}
				if (value >= 0) {
					but = buttonContainer.getChildAt(value);
					var lastIndex = -2;
					if (currentObject) lastIndex = currentObject.index;
					currentObject = but.obj;
				}
				if (value == -1 || lastIndex == currentObject.index) {
					currentObject = null;
					that.id = null;
					that.label = null;
					that.text = "";
				} else {
					but.addChild(but.check);
					that.id = currentObject.id;
					that.label = currentObject.label;
					if (that.label) that.text = that.label.text;
				}
				if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
			}

			// getter setter methods

			Object.defineProperty(that, 'selected', {
				get: function() {
					return currentObject;
				},
				set: function(value) {
					zog("ZIM RadioButton - selected is read only");
				}
			});

			Object.defineProperty(that, 'selectedIndex', {
				get: function() {
					return (currentObject) ? currentObject.index : -1;
				},
				set: function(value) {
					var index = value;
					if (always) {if (that.selectedIndex == index) return;}
					that.setSelected(index);
				}
			});

			this._enabled = true;
			Object.defineProperty(that, 'enabled', {
				get: function() {
					return that._enabled;
				},
				set: function(value) {
					zenable(that, value);
				}
			});

			this.dispose = function() {
				that.removeAllEventListeners();
				return true;
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeRadioButtons.prototype = new createjs.Container();
		makeRadioButtons.prototype.constructor = zim.RadioButtons;
		return new makeRadioButtons();

	}


/*--
zim.Pane = function(container, width, height, label, color, drag, resets, modal, corner, backingAlpha, shadowColor, shadowBlur, center)

Pane Class

extends a createjs.Container
adds a window for alerts, etc.
var pane = new zim.Pane(parameters);
you need to call the pane.show() to show the pane and pane.hide() to hide it
you do not need to add it to the stage - it adds itself centered
you can change the x and y (with origin and registration point in middle)

PARAMETERS: supports DUO - parameters or single object
see the defaults in the code below
pass in the container for the pane (usually the stage) and the width and height of the pane
pass in an optional ZIM Label (or text for default label properties)
pass in a boolean for if you want to drag the pane (default false)
pass in whether a dragging pane should open at first start position (defaults false)
for reset, default true, Pane takes the first position and will continue to use that on opening
modal defaults to true and means the pane will close when user clicks off the pane
corner is the corner radius default 20
the backingAlpha is the darkness of the background that fills the stage
shadowColor defaults to rgba(0,0,0,.3) set to -1 for no shadow
value for shadow blur (default 20)
align - defaults to true and centers the pane and the label on the pane
if center is false you will have to set x and y for the pane and the label
note, the origin inside the pane is in the center

METHODS
show() - shows the pane
hide() - hides the pane

PROPERTIES
display - reference to the pane box
text - gives access to the label text
label - gives access to the label
backing - reference to the backing that covers the stage
resetX - if reset is true you can dynamically adjust the position if needed
resetY

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties
and stage.update() in change event to see component change its graphics

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

EVENTS
dispatches a "close" event when closed by clicking on backing
--*/
	zim.Pane = function(container, width, height, label, color, drag, resets, modal, corner, backingAlpha, shadowColor, shadowBlur, center) {

		var sig = "container, width, height, label, color, drag, resets, modal, corner, backingAlpha, shadowColor, shadowBlur, center";
		var duo; if (duo = zob(zim.Pane, arguments, sig)) return duo;

		function makePane() {

			if (zot(container) || !container.getBounds) {zog("zim build - Pane(): Please pass in a reference to a container with bounds set as first parameter");	return;}
			if (!container.getBounds()) {zog("zim build - Pane(): Please give the container bounds using setBounds()"); return;}
			if (zot(container.getStage)) {zog("zim build - Pane(): Please give the container that has a stage property"); return;}

			if (zot(width)) width=200;
			if (zot(height)) height=200;
			if (zot(label)) label = null;
			if (typeof label === "string" || typeof label === "number") label = new zim.Label(label, 40, "arial", "black");
			if (zot(color)) color="white";
			if (zot(drag)) drag=false;
			if (zot(resets)) resets=true;
			if (zot(modal)) modal=true;
			if (zot(corner)) corner=20;
			if (zot(backingAlpha)) backingAlpha=.14;
			if (zot(shadowColor)) shadowColor="rgba(0,0,0,.3)";
			if (zot(shadowBlur)) shadowBlur=20;
			if (zot(center)) center=true;

			var backing = this.backing = new createjs.Shape();
			// make a big backing that closes the pane when clicked
			// could also provide a close button
			var g = backing.graphics;
			g.beginFill("black");
			g.drawRect(-5000,-5000,10000,10000);
			// makes it seem like the pane has the dimensions of the display
			this.setBounds(-width/2,-height/2, width, height);

			backing.alpha = backingAlpha;
			var that = this;
			backing.on((zim.ACTIONEVENT=="mousedown")?"mousedown":"click", function(e) {
				removePane();
				container.getStage().update();
				that.dispatchEvent("close");
				e.stopImmediatePropagation();
			});
			backing.on("mousedown", function(e) {
				e.stopImmediatePropagation();
			});
			if (modal) this.addChild(backing);

			var display = this.display = new createjs.Shape();
			display.setBounds(0, 0, width, height);
			display.regX = width/2;
			display.regY = height/2;
			g = display.graphics;
			g.beginFill(color);
			g.drawRoundRect(0, 0, width, height, corner);
			if (shadowColor != -1 && shadowBlur > 0) display.shadow = new createjs.Shadow(shadowColor, 8, 8, shadowBlur);
			display.on("click", function(e) {
				// stops the click from going through the display to the background
				e.stopImmediatePropagation();
			});

			this.resetX; this.resetY;
			if (drag) {
				display.cursor = "pointer";
				var diffX, diffY;
				display.on("mousedown", function(e) {
					if (isNaN(that.resetX)) that.resetX = that.x;
					if (isNaN(that.resetY)) that.resetY = that.y;
					diffX = e.stageX - that.x;
					diffY = e.stageY - that.y;
					display.cursor = "move";
				});

				display.on("pressmove", function(e) {
					var p = checkBounds(e.stageX-diffX, e.stageY-diffY);
					that.x = p.x;
					that.y = p.y;
					container.getStage().update();
				});

				this.on("pressup", function(e) {
					display.cursor = "pointer";
					container.getStage().update();
				});
			}

			this.addChild(display);

			if (label) {
				if (center) {
					label.x =  -label.getBounds().width/2 - label.getBounds().x;
					label.y =  -label.getBounds().height/2 - label.getBounds().y;
				}
				this.addChild(label);
				this.label = label;
				this.text = label.text;
			}

			Object.defineProperty(that, 'text', {
				get: function() {
					var t = (label.text == " ") ? "" : label.text;
					return t;
				},
				set: function(value) {
					label.text = value;
					if (center) {
						label.x = -label.getBounds().width/2;
						label.y = -label.getBounds().height/2;
					}
				}
			});

			this.hide = function() {
				removePane();
				if (!zim.OPTIMIZE) container.getStage().update();
			}

			function removePane() {
				container.removeChild(that);
				if (resets) {
					if (!isNaN(that.resetX)) that.x = that.resetX;
					if (!isNaN(that.resetY)) that.y = that.resetY;
				}
			}

			this.show = function() {
				if (center) {
					if (isNaN(that.resetX)) {
						that.x = (container.getBounds().width) /2;
						that.y = (container.getBounds().height) /2;
					}
				}
				container.addChild(that);
				if (container.getStage()) container.getStage().update();
			}
			function checkBounds(x,y) {
				x = Math.max(width/2, Math.min(container.getBounds().width-width/2, x));
				y = Math.max(height/2, Math.min(container.getBounds().height-height/2, y));
				return {x:x,y:y}
			}

			this.dispose = function() {
				display.removeAllEventListeners();
				that.removeChild(display);
				display = null;
				return true;
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makePane.prototype = new createjs.Container();
		makePane.prototype.constructor = zim.Pane;
		return new makePane();

	}


/*--
zim.Waiter = function(container, speed, color, circleColor, corner, shadowColor, shadowBlur)

Waiter Class

extends a createjs.Container
adds a little animated three dot wait widget
var waiter = new zim.Waiter(parameters);
you need to call the waiter.show() to show the waiter and waiter.hide() to hide it
you do not need to add it to the stage - it adds itself centered
you can change the x and y (with origin and registration point in middle)

PARAMETERS: supports DUO - parameters or single object
pass in the container for the waiter (usually the stage)
pass in the speed in ms for the cycle time (default 600ms)
pass in backing color and dot color
corner is the corner radius default 14
shadowColor defaults to rgba(0,0,0,.3) set to -1 for no shadow
value for shadow blur (default 14)

METHODS
show() - shows the waiter
hide() - hides the waiter

PROPERTIES
display - reference to the waiter backing graphic

--*/
	zim.Waiter = function(container, speed, color, circleColor, corner, shadowColor, shadowBlur) {

		var sig = "container, speed, color, circleColor, corner, shadowColor, shadowBlur";
		var duo; if (duo = zob(zim.Waiter, arguments, sig)) return duo;

		function makeWaiter() {

			if (zot(container) || !container.getBounds) {zog("zim build - Waiter(): Please pass in a reference to a container with bounds set as first parameter");	return;}
			if (!container.getBounds()) {zog("zim build - Waiter(): Please give the container bounds using setBounds()"); return;}
			if (zot(container.getStage)) {zog("zim build - Waiter(): Please give the container that has a stage property"); return;}

			if (zot(speed)) speed=600; // ms cycle time
			if (zot(color)) color="orange";
			if (zot(circleColor)) circleColor="white";
			if (zot(corner)) corner=16;
			if (zot(shadowColor)) shadowColor="rgba(0,0,0,.3)";
			if (zot(shadowBlur)) shadowBlur=14;

			var height = 40;
			var numDots = 3;
			var r = height*.6/2;
			var s = (height-r*2)/2;
			var width = numDots*(r*2+s)+s;

			this.setBounds(-width/2,-height/2, width, height);

			var that = this;

			var display = this.display = new createjs.Shape();
			this.addChild(display);
			display.setBounds(0, 0, width, height);
			display.regX = width/2;
			display.regY = height/2;
			var g = display.graphics;
			g.f(color);
			g.rr(0, 0, width, height, corner);
			if (shadowColor != -1 && shadowBlur > 0) display.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);
			display.on("click", function(e) {
				// stops the click from going through the display to the background
				e.stopImmediatePropagation();
			});

			var circles = new createjs.Container();
			this.addChild(circles);

			var dot;
			for (var i=0; i<numDots; i++) {
				dot = new createjs.Shape();
				dot.graphics.f(circleColor).dc(0,0,r);
				dot.x = (i-(numDots-1)/2) * (r*2+s);
				circles.addChild(dot);
				dot.cache(-r,-r,r*2,r*2);
				dot.alpha = 0;
			}

			container.getStage().update();

			this.hide = function() {
				createjs.Tween.get(that,{override:true})
							.to({alpha:0}, 300).call(function() {
								createjs.Ticker.off("tick", that.ticker);
								container.removeChild(that);
								container.getStage().update();
							});
			}
			this.show = function() {
				var dot; var counter=0;
				for (var i=0; i<circles.getNumChildren(); i++) {
					that.alpha = 0;
					createjs.Tween.get(that,{override:true})
							.to({alpha:1}, 300);
					setTimeout(function() {
						dot = circles.getChildAt(counter);
						createjs.Tween.get(dot,{loop:true})
							.to({alpha:1}, speed/numDots/2)
							.wait(speed/numDots)
							.to({alpha:0}, speed/numDots)
							.wait(speed-speed/numDots-speed/numDots/2);
						counter++;
					}, i*speed/numDots);

				}
				that.ticker = createjs.Ticker.on("tick", function() {container.getStage().update();});

				that.x = (container.getBounds().width) /2;
				that.y = (container.getBounds().height) /2;
				container.addChild(that);
				container.getStage().update();
			}

			this.dispose = function() {
				display.removeAllEventListeners();
				that.removeChild(display);
				that.removeChild(circles);
				display = null;
				circles = null;
				return true;
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeWaiter.prototype = new createjs.Container();
		makeWaiter.prototype.constructor = zim.Waiter;
		return new makeWaiter();

	}

/*--
zim.Indicator = function(width, height, num, color, offColor, borderColor, backingColor, type, fill, scale, lightScale, press, shadowColor, shadowBlur)

Indicator Class

extends a createjs.Container
a row of dots or squares (or just one) that can be used to indicate a step, page, level, score, etc.
var Indicator = new zim.Indicator(parameters);
the indicator can be used as an input as well but often these are small so may not be best to rely on

PARAMETERS: supports DUO - parameters or single object
pass in the width (100), height (50), number of lights (6), the color of the active light (orange) and inactive lights (grey)
pass in the borderColor (-1 for no border - default), backingColor (-1 for no backing - default),
type defaults to "dot" or "circle" - can also set "box" or "square"
fill defaults to false - set to true to fill in lights to the left of the selectedIndex
scale (1) is for all the lights including spacing
lightScale (1) is for each light keeping the spacing unchanged
press defaults to false - set to true to make lights clickable
shadowColor defaults to rgba(0,0,0,.3) set to -1 for no shadow
value for shadow blur (default 5)

METHODS
dispose() - removes any listeners

PROPERTIES
selectedIndex - gets or sets the current index of the indicator
width, height - gives width and height (read only)
min, max, step - the assigned values (read only)
backing - gives access to the backing if there is one zim.Rectangle
lights - an array of the light objects (zim Circle or Rectangle objects)
lightsContainer - gives access to the lights createjs.Container with its zim.Circle or zim.Rectangle children

EVENTS
dispatches a changed event if press is true and indicator is pressed on and lights change
--*/
	zim.Indicator = function(width, height, num, color, offColor, borderColor, backingColor, type, fill, scale, lightScale, press, shadowColor, shadowBlur) {

		var sig = "width, height, num, color, offColor, borderColor, backingColor, type, fill, scale, lightScale, press, shadowColor, shadowBlur";
		var duo; if (duo = zob(zim.Indicator, arguments, sig)) return duo;

		function makeIndicator() {

			if (zot(width)) width = 300;
			if (zot(height)) height = 50;
			if (zot(num)) num = 6;
			if (zot(color)) color = "#f58e25";
			if (zot(offColor)) offColor = "#666";
			if (offColor < 0) offColor = "rgba(0,0,0,.01)";
			if (borderColor < 0) borderColor = null;
			if (zot(backingColor)) backingColor = -1;
			if (zot(type)) type = "dot";
			if (zot(fill)) fill = false;
			if (zot(scale)) scale = 1;
			if (zot(lightScale)) lightScale = 1;
			if (zot(press)) press = false;
			if (zot(shadowColor)) shadowColor = "rgba(0,0,0,.3)";
			if (zot(shadowBlur)) shadowBlur = 5;

			var eventType = (zim.ACTIONEVENT=="mousedown")?"mousedown":"click";

			var that = this;

			this.width = width; // read only
			this.height = height;
			this.lights = [];

			var myValue;
			var indicator = new createjs.Container();
			if (backingColor != -1) {
				var backing = new zim.Rectangle(width, height, backingColor);
				this.addChild(backing);
				this.backing = backing;
			}
			var lights = this.lightsContainer = new createjs.Container();
			this.addChild(lights);
			var hitArea = new createjs.Shape();
			hitArea.graphics.f("black").dr(-height/2,-height/2,height,height);
			var light;
			var size;
			var space = width / (num+1);
			for (var i=0; i<num; i++) {
				if (type == "square" || type == "box") {
					var size = height * .5;
					light = new zim.Rectangle(size, size, offColor, borderColor);
					light.regX = light.width/2;
					light.regY = light.height/2;
				} else {
					var size = height * .5;
					light = new zim.Circle(size/2, offColor, borderColor);
				}
				this.lights.push(light);
				light.znum = i;
				light.hitArea = hitArea;
				light.scaleX = light.scaleY = lightScale;
				light.x = space + space * i;
				light.y = height / 2;
				lights.addChild(light);
			}
			lights.setBounds(0,0,width,height);
			lights.regX = lights.x = width / 2;
			lights.regY = lights.y = height / 2;
			this.addChild(lights);
			if (shadowColor != -1 && shadowBlur > 0) lights.shadow = new createjs.Shadow(shadowColor, 2, 2, shadowBlur);

			if (press) {
				lights.cursor = "pointer";
				var lightsEvent = lights.on(eventType, function(e) {
					if (myValue != e.target.znum) that.dispatchEvent("changed");
					myValue = e.target.znum;
					setLights(myValue);
				});
			}
			lights.scaleX = lights.scaleY = scale;

			function setLights(v) {
				if (v >= num) v = -1; // out of range - don't let it fill up
				var c;
				for (var i=0; i<num; i++) {
					if (fill) {
						if (i < v) c = color;
						else c = offColor;
					} else {
						c = offColor;
					}
					if (i == v) c = color;
					lights.getChildAt(i).color = c;
				}
				if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
			}

			Object.defineProperty(this, 'selectedIndex', {
				get: function() {
					return myValue;
				},
				set: function(value) {
					myValue = Math.floor(value);
					setLights(myValue);
				}
			});

			Object.defineProperty(this, 'num', {
				get: function() {
					return num;
				},
				set: function(value) {
					if (zon) zog("num is read only");
				}
			});

			this.dispose = function() {
				that.removeAllEventListeners();
				return true;
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeIndicator.prototype = new createjs.Container();
		makeIndicator.prototype.constructor = zim.Indicator;
		return new makeIndicator();

	}


/*--
zim.Stepper = function(list, width, color, strokeColor, label, vertical, arrows, corner, shadowColor, shadowBlur, loop, display)

Stepper Class

extends a createjs.Container
lets you step through a list of strings or numbers with arrows or keyboard arrows
var stepper = new zim.Stepper(parameters);

PARAMETERS: supports DUO - parameters or single object
list - pass in an array of strings or numbers to display one at a time - default 1-10
width is the width of the text box - default 100 (you can scale the whole stepper if needed)
a color for the arrows and the text box - default white
a strokeColor color for the box - default null - no stroke
an optional label which can be used to define the text properties
vertical if you want the numbers above and below - default false - left and right of text
arrows - use keyboard arrows - default true (will always show graphical arrows)
corner is the radius of the text box corners default 10
shadowColor defaults to rgba(0,0,0,.3) set to -1 for no shadow
value for shadow blur (default 14)
loop - defaults to false so will not loop around or go back past 0 index (unless set to true)
display - defaults to true to show the value - set to false just to show the arrows

PROPERTIES
width, height
currentIndex - gets or sets the current index of the array and display
currentValue - gets or sets the current value of the array and display
stepperArray - gets or sets the list - you should manually set the desired currentIndex if you change this
prev, next - access to the arrow containers (use to position)
arrowPrev, arrowNext - access to the graphical zim Triangle objects (createjs.Containers)
label - access to the zim.Label
textBox - access to the text box backing shape
loop - does the stepper loop
enabled - default is true - set to false to disable

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties
and stage.update() in change event to see component change its graphics

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

METHODS
next() - goes to next
prev() - goes to previous
dispose() - removes listeners and deletes object

EVENTS
dispatches a "change" event when changed by pressing an arrow or a keyboard arrow
(but not when setting currentIndex or currentValue properties)
--*/
	zim.Stepper = function(list, width, color, strokeColor, label, vertical, arrows, corner, shadowColor, shadowBlur, loop, display) {

		var sig = "list, width, color, strokeColor, label, vertical, arrows, corner, shadowColor, shadowBlur, loop, display";
		var duo; if (duo = zob(zim.Stepper, arguments, sig)) return duo;

		function makeStepper() {

			if (zot(list)) list = [0,1,2,3,4,5,6,7,8,9];
			if (zot(width)) width=200;
			if (zot(color)) color="white";
			if (zot(strokeColor)) strokeColor=null;
			if (zot(label)) label = "";
			if (typeof label === "string" || typeof label === "number") label = new zim.Label(label, 64, "arial", "#555", null, null, null, "center");
			if (zot(vertical)) vertical=false;
			if (zot(arrows)) arrows=true;
			if (zot(corner)) corner=16;
			if (zot(shadowColor)) shadowColor="rgba(0,0,0,.3)";
			if (zot(shadowBlur)) shadowBlur=14;
			if (zot(loop)) loop=false;
			if (zot(display)) display=true;
			var eventType = (zim.ACTIONEVENT=="mousedown")?"mousedown":"click";

			var that = this;
			var index;
			var height = 100;
			var boxSpacing = height/4;

			this.label = label;
			label.mouseChildren = false;
			label.mouseEnabled = false;

			var prev = this.prev = new createjs.Container();
			this.addChild(prev);
			var prevBacking = new createjs.Shape();
			prevBacking.graphics.f("rgba(255,255,255,.11)").r(0,0,height*1.5,height*1.5);
			prevBacking.regX = height*1.5 / 2;
			prevBacking.regY = height*1.5 / 2 + boxSpacing/2;
			prev.hitArea = prevBacking;

			var arrowPrev = this.arrowPrev = new zim.Triangle(height, height*.8, height*.8, color);
			if (shadowColor != -1 && shadowBlur > 0) prev.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);
			prev.addChild(arrowPrev);
			prev.cursor = "pointer";
			prev.on(eventType, function(e) {step(-1);});

			if (vertical) {
				prev.rotation = 180;
				prev.x = width/2;
				if (display) {
					prev.y = prev.getBounds().height + boxSpacing + height + prev.getBounds().height/2 + boxSpacing;
				} else {
					prev.y = prev.getBounds().height * 2;
				}

			} else {
				prev.rotation = -90;
				prev.x = prev.getBounds().height/2;
				prev.y = prev.getBounds().width/2;
			}

			if (display) {
				var box = this.textBox = new createjs.Shape();
				box.cursor = "pointer";
				this.addChild(box);
				box.setBounds(0, 0, width, height);
				if (strokeColor != null) box.graphics.s(strokeColor).ss(1.5);
				box.graphics.f(color).rr(0, 0, width, height, corner);
				if (shadowColor != -1 && shadowBlur > 0) box.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);

				if (vertical) {
					box.y = arrowPrev.height + boxSpacing;
				} else {
					box.x = arrowPrev.height + boxSpacing;
				}
				// label

				this.addChild(label);
				if (list.length > 0) {
					// index = Math.floor(list.length/2)
					index = 0;
					label.text = list[index];
				}
				label.x = 50+box.x+box.getBounds().width/2;
				label.y = box.y+(box.getBounds().height-label.getBounds().height)/2;
			} else {
				if (list.length > 0) {
					index = 0;
				}
			}

			var next = this.next = new createjs.Container();
			this.addChild(next);
			var nextBacking = new createjs.Shape();
			nextBacking.graphics.f("rgba(255,255,255,.01)").r(0,0,height*1.5,height*1.5);
			nextBacking.regX = height*1.5 / 2;
			nextBacking.regY = height*1.5 / 2 + boxSpacing/2;
			next.hitArea = nextBacking;

			var arrowNext = this.arrowNext = new zim.Triangle(height, height*.8, height*.8, color);
			if (shadowColor != -1 && shadowBlur > 0) next.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);
			next.addChild(arrowNext);

			next.cursor = "pointer";
			next.on(eventType, function(e) {step(1);});
			if (display) box.on(eventType, function(e) {step(1);});

			if (vertical) {
				next.rotation = 0;
				next.x = width/2;
				next.y = next.getBounds().height/2;
			} else {
				next.rotation = 90;
				if (display) {
					next.x = box.x + box.getBounds().width + next.getBounds().height/2 + boxSpacing;
				} else {
					next.x = prev.x + prev.getBounds().width;
				}
				next.y = next.getBounds().width/2;
			}

			this.width = this.getBounds().width;
			this.height = this.getBounds().height;

			setLabel(index);

			function step(n) {
				var nextIndex = index + n;
				if (!loop) {
					if (nextIndex > list.length-1) {
						if (display) box.cursor = "default";
						return;
					} else {
						if (display) box.cursor = "pointer";
					}
					if (nextIndex < 0) return;
				} else {
					if (nextIndex > list.length-1) nextIndex = 0;
					if (nextIndex < 0) nextIndex = list.length-1;
				}
				setLabel(nextIndex);
				that.dispatchEvent("change");
			}

			Object.defineProperty(this, 'currentIndex', {
				get: function() {
					return index;
				},
				set: function(value) {
					value = Math.min(list.length-1, Math.max(0, value));
					if (value == that.currentIndex) return;
					setLabel(index=value);
				}
			});

			Object.defineProperty(this, 'currentValue', {
				get: function() {
					return list[index];
				},
				set: function(value) {
					if (list.indexOf(value) > -1) {
						value = list.indexOf(value);
					}
					if (value == that.currentIndex) return;
					setLabel(index=value);
				}
			});

			Object.defineProperty(this, 'loop', {
				get: function() {
					return loop;
				},
				set: function(value) {
					loop = value;
					setLabel(index);
				}
			});

			Object.defineProperty(this, 'stepperArray', {
				get: function() {
					return list;
				},
				set: function(value) {
					list = value;
				}
			});

			this._enabled = true;
			Object.defineProperty(that, 'enabled', {
				get: function() {
					return that._enabled;
				},
				set: function(value) {
					zenable(that, value);
					if (value) {
						setLabel(that.currentIndex);
					} else {
						prev.alpha = .8;
						arrowPrev.setFill("#aaa");
						prev.cursor = "default";
						next.alpha = .8;
						arrowNext.setFill("#aaa");
						next.cursor = "default";
						if (display) label.mouseChildren = false;
						if (display) label.mouseEnabled = false;
					}
					if (!zim.OPTIMIZE && next.getStage()) next.getStage().update();
				}
			});

			function setLabel(n) {
				index = n;
				if (display) {
					label.text = list[index];
					label.x = box.x+box.getBounds().width/2;
					label.y = box.y+(box.getBounds().height-label.getBounds().height)/2;
				}
				prev.alpha = 1;
				arrowPrev.setFill(color);
				prev.cursor = "pointer";
				next.alpha = 1;
				arrowNext.setFill(color);
				next.cursor = "pointer";
				if (!loop) {
					if (index == 0) {
						prev.alpha = .8;
						arrowPrev.setFill("#aaa");
						prev.cursor = "default";
					}
					if (index == list.length-1) {
						next.alpha = .8;
						arrowNext.setFill("#aaa");
						next.cursor = "default";
					}
				}
				if (!zim.OPTIMIZE && next.getStage()) next.getStage().update();
			}

			if (arrows) {
				this.keyDownEvent = function(e) {
					if (!e) e = event;
					if (e.keyCode >= 37 && e.keyCode <= 40) {
						var nextIndex;
						if (e.keyCode == 38 || e.keyCode == 39) {
							step(1);
						} else if (e.keyCode == 37 || e.keyCode == 40) {
							step(-1);
						}
					}
				}
				window.addEventListener("keydown", this.keyDownEvent);
			}

			this.next = function() {
				step(1);
			}

			this.prev = function() {
				step(-1);
			}

			this.dispose = function() {
				that.removeAllEventListeners();
				return true;
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeStepper.prototype = new createjs.Container();
		makeStepper.prototype.constructor = zim.Stepper;
		return new makeStepper();

	}

/*--
zim.Slider = function(min, max, step, button, barLength, barWidth, barColor, vertical, useTicks, inside)

Slider Class

extends a createjs.Container
a traditional slider - will give values back based on min and max and position of button (knob)
var slider = new zim.Slider(parameters);
slider.on("change", function() {zog(slider.currentValue);});

PARAMETERS: supports DUO - parameters or single object
pass in min and max amounts for slider (default 0, 10)
step for the slider (default 0 - for continuous decimal number)
a zim.Button (default small button with no label)
barLength (default 300), barWidth (default 3), varColor (default #666)
vertical (default false) for horizontal or vertical slider
useTicks (default false) set to true to show small ticks for each step (step > 0)
inside (default false) set to true to fit button inside bar (need to manually adjust widths)

PROPERTIES
currentValue - gets or sets the current value of the slider
width, height - gives width and height including button
min, max, step - the assigned values (read only)
bar - gives access to the bar zim.Rectangle
button - gives access to the zim.Button
ticks - gives access to the ticks (to position these for example)
enabled - default is true - set to false to disable

METHODS
dispose() - removes listeners and deletes object

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties
and stage.update() in change event to see component change its graphics

EVENTS
dispatches a "change" event when button is slid on slider (but not when setting currentValue property)
--*/
	zim.Slider = function(min, max, step, button, barLength, barWidth, barColor, vertical, useTicks, inside) {

		var sig = "min, max, step, button, barLength, barWidth, barColor, vertical, useTicks, inside";
		var duo; if (duo = zob(zim.Slider, arguments, sig)) return duo;

		function makeSlider() {

			if (zot(min)) min = 0;
			if (zot(max)) max = 10;
			if (max-min == 0) {zog("ZIM Slider range must not be 0"); return;}
			if (zot(step)) step = 0;
			if (zot(barLength)) barLength = 300;
			if (zot(barWidth)) barWidth = 3;
			if (zot(barColor)) barColor = "#666";
			if (zot(vertical)) vertical = false;
			if (zot(useTicks)) useTicks = false;
			if (zot(inside)) inside = false;

			if (zot(button)) {
				var w = 30; var h = 40;
				if (vertical) {w = 50; h = 40;}
				button = new zim.Button(w,h,"","#fff","#ddd","#666",1,0,null,null,30);
			}

			if (vertical) {
				this.width = button.width;
				if (inside) {
					this.height = barLength;
					this.setBounds(0, 0, this.width, this.height);
				} else {
					this.height = barLength + button.height;
					this.setBounds(-button.width/2, -button.height/2, this.width, this.height);
				}
			} else {
				this.height = button.height;
				if (inside) {
					this.width = barLength;
					this.setBounds(0, 0, this.width, this.height);
				} else {
					this.width = barLength+button.width;
					this.setBounds(-button.width/2, -button.height/2, this.width, this.height);
				}
			}

			var that = this;
			var myValue = min;
			var lastValue = 0; // does not include min so always starts at 0
			this.button = button;
			this.cursor = "pointer";

			var bar, rect, bounds, ticks, g;

			if (useTicks && step != 0) {
				ticks = this.ticks = new createjs.Shape();
				this.addChild(ticks);
				g = ticks.graphics;
				g.ss(1).s(barColor);
				var stepsTotal = Math.round((max - min) / step);
				var newStep = (max - min) / stepsTotal;
				if (newStep != step) {if (zon) zog("zim.Slider() : non-divisible step ("+step+") adjusted");}
				step = newStep;
				if (inside) {
					var spacing = (barLength - ((vertical) ? button.height : button.width)) / stepsTotal;
				} else {
					var spacing = barLength / stepsTotal;
				}
			}

			if (vertical) {
				var start = (inside) ? button.height / 2 : 0;
				if (useTicks && step != 0) {
					for (var i=0; i<=stepsTotal; i++) {
						g.mt(0, start+spacing*i).lt(20, start+spacing*i);
					}
					ticks.x = 10;
				}
				bar = this.bar = new zim.Rectangle(barWidth, barLength, barColor);
				this.addChild(bar);
				zim.centerReg(button);
				this.addChild(button);
				bounds = bar.getBounds();
				rect = new createjs.Rectangle(bounds.width/2, bounds.y+start, 0, bounds.height-start*2);
			} else {
				var start = (inside) ? button.width / 2 : 0;
				if (useTicks && step != 0) {
					for (var i=0; i<=stepsTotal; i++) {
						g.mt(start+spacing*i,0).lt(start+spacing*i,-20);
					}
					ticks.y = -10;
				}
				bar = this.bar = new zim.Rectangle(barLength, barWidth, barColor);
				this.addChild(bar);
				zim.centerReg(button);
				this.addChild(button);
				bounds = bar.getBounds();
				rect = new createjs.Rectangle(bounds.x+start, bounds.height/2, bounds.width-start*2, 0);
			}
			button.x = rect.x;
			button.y = rect.y;

			function snap(v) {
				if (step == 0) return v;
				return Math.round(v/step)*step;
			}

			var diffX, diffY;
			button.on("mousedown", function(e) {
				var point = that.globalToLocal(e.stageX, e.stageY);
				diffX = point.x - button.x;
				diffY = point.y - button.y;
				if (that.getStage()) that.getStage().mouseMoveOutside = true;
			});

			button.on("pressmove", function(e) {
				setValue(e);
			});
			function setValue(e) {
				var point = that.globalToLocal(e.stageX, e.stageY);
				var p = checkBounds(point.x-diffX, point.y-diffY, rect);
				if (vertical) {
					button.x = p.x;
					myValue = snap((p.y-rect.y) / rect.height * (max - min));
					button.y = rect.y + myValue * rect.height / (max - min);
					myValue += min;
					if (button.y != lastValue) {
						that.dispatchEvent("change");
					}
					lastValue = button.y;
				} else {
					myValue = snap((p.x-rect.x) / rect.width * (max - min));
					button.x = rect.x + myValue * rect.width / (max - min);
					myValue += min;
					button.y = p.y;
					if (button.x != lastValue) {
						that.dispatchEvent("change");
					}
					lastValue = button.x;
				}
				if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
			};

			function checkBounds(x,y,rect) {
				x = Math.max(rect.x, Math.min(rect.x+rect.width, x));
				y = Math.max(rect.y, Math.min(rect.y+rect.height, y));
				return {x:x,y:y}
			}

			bar.on("mousedown", function(e) {
				diffX = button.width/2;
				diffY = button.height/2;
				setValue(e);
			});

			Object.defineProperty(this, 'currentValue', {
				get: function() {
					return myValue;
				},
				set: function(value) {
					if (min < max) {
						if (value < min) value = min;
						if (value > max) value = max;
					} else {
						if (value > min) value = min;
						if (value < max) value = max;
					}
					myValue = value = snap(value);
					if (vertical) {
						button.y = (value - min) / (max - min) * rect.height + start;
						lastValue = button.y;
					} else {
						button.x = (value - min) / (max - min) * rect.width + start;
						lastValue = button.x;
					}
					if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
				}
			});

			Object.defineProperty(this, 'min', {
				get: function() {
					return min;
				},
				set: function(value) {
					if (zon) zog("min is read only");
				}
			});

			Object.defineProperty(this, 'max', {
				get: function() {
					return max;
				},
				set: function(value) {
					if (zon) zog("max is read only");
				}
			});

			Object.defineProperty(this, 'step', {
				get: function() {
					return step;
				},
				set: function(value) {
					if (zon) zog("step is read only");
				}
			});

			this._enabled = true;
			Object.defineProperty(that, 'enabled', {
				get: function() {
					return that._enabled;
				},
				set: function(value) {
					zenable(that, value);
				}
			});

			this.dispose = function() {
				button.removeAllEventListeners();
				return true;
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeSlider.prototype = new createjs.Container();
		makeSlider.prototype.constructor = zim.Slider;
		return new makeSlider();

	}

/*--
zim.Dial = function(min, max, step, width, color, indicatorColor, indicatorScale, type, innerCircle, innerScale, useTicks, innerTicks, tickColor, limit)

Dial Class

extends a createjs.Container
a traditional dial - will give values back based on min and max and position of dial
var dial = new zim.Dial(parameters);
dial.on("change", function() {zog(dial.currentValue);});

PARAMETERS: supports DUO - parameters or single object
pass in min and max amounts for dial (default 0, 10)
step for the dial (default 0 - for continuous decimal number)
the width (100), color("#666"), indicatorColor("#222"), indicatorScale (1)
type - of indicator defaults to "arrow" or "triangle" - can also be "dot" or "circle", and "line" or "rectangle"
innerCircle defaults to true and gives a knob type look - set to false for flat
innerScale (1) can be adjusted along with indicatorScale to get a variety of looks
useTicks (true) will show lines and innerTicks (false) being set to true will put the ticks inside
tickColor defaults to the indicatorColor
limit (true) stops the dial from going right around - set to false to spin freely

PROPERTIES
currentValue - gets or sets the current value of the dial
width, height - gives width and height (read only)
min, max, step - the assigned values (read only)
backing - gives access to the dial backing zim.Circle
inner and inner2 give access to any inner circles
ticks - gives access to the ticks (to scale these for example)
indicator - gives access to the indicator container with registration point at the dial center
indicatorShape - gives access to the shape on the end of the indicator (zim Triangle, Circle, Rectangle)
enabled - default is true - set to false to disable

METHODS
dispose() - removes listeners and deletes object

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties
and stage.update() in change event to see component change its graphics

EVENTS
dispatches a "change" event when dial changes value (but not when setting currentValue property)
--*/
	zim.Dial = function(min, max, step, width, color, indicatorColor, indicatorScale, type, innerCircle, innerScale, useTicks, innerTicks, tickColor, limit) {

		var sig = "min, max, step, width, color, indicatorColor, indicatorScale, type, innerCircle, innerScale, useTicks, innerTicks, tickColor, limit";
		var duo; if (duo = zob(zim.Dial, arguments, sig)) return duo;

		function makeDial() {

			if (zot(min)) min = 0;
			if (zot(max)) max = 10;
			if (max-min == 0) {zog("ZIM Dial range must not be 0"); return;}
			if (zot(step)) step = 1;
			if (zot(width)) width = 100;
			if (zot(color)) color = "#666";
			if (zot(indicatorColor)) indicatorColor = "#222";
			if (zot(indicatorScale)) indicatorScale = 1;
			if (zot(type)) type = "arrow";
			if (zot(innerCircle)) innerCircle = true;
			if (zot(innerScale)) innerScale = .5;
			if (zot(useTicks)) useTicks = true;
			if (zot(innerTicks)) innerTicks = false;
			if (zot(tickColor)) tickColor = indicatorColor;
			if (zot(limit)) limit = true;

			var that = this;
			this.cursor = "pointer";

			var r = width / 2;
			this.width = this.height = width;

			var myValue = min; // includes the min
			var lastValue = 0; // does not include min (so always starts at 0)

			var backing = this.backing = new zim.Circle(r, color);
			this.addChild(backing);

			if (innerCircle) {
				var ic = (innerTicks) ? "rgba(0,0,0,.2)" : "rgba(0,0,0,.1)";
				if (color=="black"||color=="#000"||color=="#000000"||color=="#111"||color=="#111111") ic = "#222";
				var inner = this.inner = new zim.Circle(r*innerScale, ic);
				this.addChild(inner);

				if (!innerTicks) {
					var ic2 = "rgba(0,0,0,.1)";
					var inner2 = this.inner2 = new zim.Circle(r*(innerScale-.1), ic2);
					this.addChild(inner2);
				}

			}

			var stepsTotal = (max - min) / step;
			if (useTicks && step != 0) {
				ticks = this.ticks = new createjs.Container();
				this.addChild(ticks);
				var tick;
				for (var i=0; i<stepsTotal+1; i++) {
					var tick = new zim.Rectangle(1, r*.2, tickColor);
					tick.regY = r * ((innerTicks) ? (innerScale-.05) : 1.28);
					tick.regX = .5;
					tick.rotation = (360 / (stepsTotal+1)) * i;
					ticks.addChild(tick);
				}
			}

			this.setBounds(-r,-r,width,width);
			if (type == "dot" || type == "circle") {
				var indicator = this.indicator = new createjs.Container();
				var indicatorShape = this.indicatorShape = new zim.Circle(r*.19, indicatorColor);
				indicator.addChild(indicatorShape);
				zim.scale(indicator, indicatorScale);
				indicator.regY = r - indicator.getBounds().width*indicatorScale/2 - r*.07;
			} else if (type == "line" || type == "rectangle") {
				var indicator = this.indicator = new createjs.Container();
				var indicatorShape = this.indicatorShape = new zim.Rectangle(r * .1, r*.3, indicatorColor);
				indicator.addChild(indicatorShape);
				zim.scale(indicator, indicatorScale);
				indicator.regY = r - indicator.getBounds().width*indicatorScale/2 - r*.07;
				indicator.regX = r * .05;
			} else { // arrow
				var indicator = this.indicator = new createjs.Container();
				var indicatorShape = this.indicatorShape = new zim.Triangle(r*.4, r*.4, r*.4, indicatorColor);
				indicator.addChild(indicatorShape);
				zim.scale(indicator, indicatorScale);
				indicator.regY = r - indicator.getBounds().height*indicatorScale*((innerTicks)?.85:.75);
				if (innerTicks) {
					indicatorShape.rotation = 180;
				}
			}
			indicator.regY /= indicatorScale;
			this.addChild(indicator);

			function snap(v) {
				if (step == 0) return v;
				return Math.round(v/step)*step;
			}

			var lastAngle;
			var startAngle;
			var moveEvent;
			var upEvent;
			var lastA = 0;
			this.on("mousedown", function() {
				lastAngle = indicator.rotation;
				var p = that.parent.globalToLocal(that.getStage().mouseX, that.getStage().mouseY);
				var dX = p.x-that.x;
				var dY = that.y-p.y;
				startAngle = Math.atan2(dX,dY)*180/Math.PI;
				var pressTime = new Date().getTime();
				moveEvent = that.on("pressmove", function() {
					p = that.parent.globalToLocal(that.getStage().mouseX, that.getStage().mouseY);
					dX = p.x-that.x;
					dY = that.y-p.y;
					var angle = lastAngle + Math.atan2(dX,dY)*180/Math.PI - startAngle;
					if (limit) {
						if (angle < 0) angle += 360;
						angle = angle % 360;
						if (Math.abs(angle-lastA) > 180) return;
					}
					lastA = angle;

					setValue(angle);
				});
				upEvent = this.on("pressup", function() {
					var deltaTime = new Date().getTime()-pressTime;
					if (deltaTime < 200) {
						p = that.parent.globalToLocal(that.getStage().mouseX, that.getStage().mouseY);
						dX = p.x-that.x;
						dY = that.y-p.y;
						var angle = Math.atan2(dX,dY)*180/Math.PI;
						setValue(angle);
					}
					lastAngle = indicator.rotation;
					that.off("pressmove", moveEvent);
					that.off("pressup", upEvent);
				});

			});

			function sign(n) {return n > 0 ? 1 : -1;}

			function setValue(angle) {
				var v; // value (not including min)
				if (angle < 0) angle += 360;
				angle = angle % 360;
				if (step != 0) {
					angle = Math.min(angle,  360 - 360 / (stepsTotal+1));
					v = snap(angle / (360 - 360 / (stepsTotal+1)) * (max - min));
					indicator.rotation = v * (360 - 360 / (stepsTotal+1)) / (max - min);
				} else {
					indicator.rotation = angle;
					v = (angle / 360) * (max - min);
				}
				if (v != lastValue) {
					lastValue = v;
					myValue = v + min;
					that.dispatchEvent("change");
					if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
				}
			}

			Object.defineProperty(this, 'currentValue', {
				get: function() {
					return myValue;
				},
				set: function(value) {
					if (value < min) value = min;
					if (value > max) value = max;
					myValue = value;
					value = snap(value);
					if (step != 0) {
						indicator.rotation = (value - min) * (360 - 360 / (stepsTotal+1)) / (max - min);
					} else {
						indicator.rotation = (value - min) * 360 / (max - min);
					}
					lastValue = value - min;
					if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
				}
			});

			Object.defineProperty(this, 'min', {
				get: function() {
					return min;
				},
				set: function(value) {
					if (zon) zog("min is read only");
				}
			});

			Object.defineProperty(this, 'max', {
				get: function() {
					return max;
				},
				set: function(value) {
					if (zon) zog("max is read only");
				}
			});

			Object.defineProperty(this, 'step', {
				get: function() {
					return step;
				},
				set: function(value) {
					if (zon) zog("step is read only");
				}
			});

			this._enabled = true;
			Object.defineProperty(that, 'enabled', {
				get: function() {
					return that._enabled;
				},
				set: function(value) {
					zenable(that, value);
				}
			});

			this.dispose = function() {
				that.removeAllEventListeners();
				return true;
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeDial.prototype = new createjs.Container();
		makeDial.prototype.constructor = zim.Dial;
		return new makeDial();

	}

/*--
zim.Tabs = function(width, height, tabs, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor, labelAdjust, keyEnabled)

Tabs Class

extends a createjs.Container
a traditional tab layout for along the edge of content
can also act as an independent button row or column
var tabs = new zim.Tabs(parameters);
tabs.on("change", function() {zog(tabs.selectedIndex);});

PARAMETERS: supports DUO - parameters or single object
pass in an overall width and height for the tab set
zim will automatically divide the width for each tab taking into account spacing
tabs is an array of tab objects with the following properties available
any tab specific properties will override the default values from other parameters
[{label:"String", width:200, color:"Red", rollColor:"pink", offColor:"grey"}, {etc.}]
the label can be a String or a zim.Label object - default text color is white
color is the color of the selected tab - default #333
rollColor is the rollover color (selected tabs do not roll over) - default #555
offColor is the color of a deselected tab when not rolled over - default #777
spacing is the pixels between buttons - default 1 pixel
currentEnabled defaults to false and means the selected tab button cannot be clicked
corner is the corner radius - default 0
labelColor defaults to white
labelAdjust defaults to 0 and can be negative or positive to move the labels up or down
Then you can set the corner to some value, give a bigger height, move the labels up
and hide the bottom of the buttons to give a curved top effect
keyEnabled defaults to true so tab key cycles through tabs, shift tab backwards


PROPERTIES
width, height - actual width and provided height
selectedIndex - gets or sets the selected index of the tabs
selected - gets the selected button - selected.enabled = true, etc.
tabs - gets or sets tabs object (will have to manually change buttons as well as adjust props)
color - gets or sets default selected tab color
rollColor - gets or sets default rolled over color
offColor - gets or sets default unselected tab color
text - gets current selected label text
label - gets current selected label object
buttons - an array of the ZIM Button objects. buttons[0].enabled = false;
labels - an array of the ZIM Label objects. labels[0].text = "YUM"; labels[2].y -= 10;
keyEnabled - gets or sets whether the tab key and shift tab key cycles through tabs
enabled - default is true - set to false to disable

METHODS
dispose() - removes listeners and deletes object

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties
and stage.update() in change event to see component change its graphics

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

EVENTS
dispatches a "change" event when a tab changes (but not when selecting selectedIndex property)
--*/
	zim.Tabs = function(width, height, tabs, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor, labelAdjust, keyEnabled) {

		var sig = "width, height, tabs, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor, labelAdjust, keyEnabled";
		var duo; if (duo = zob(zim.Tabs, arguments, sig)) return duo;

		function makeTabs() {

			if (zot(width)) width = 240;
			if (zot(height)) height = 60;
			if (zot(tabs) || tabs.length<=0) tabs = [{label:1},{label:2},{label:3},{label:4}];
			if (zot(color)) color = "#333";
			if (zot(rollColor)) rollColor = "#555";
			if (zot(offColor)) offColor = "#777";
			if (zot(currentEnabled)) currentEnabled = false;
			if (zot(spacing)) spacing = 1;
			if (zot(corner)) corner = 0;
			if (zot(labelColor)) labelColor = "white";
			if (zot(labelAdjust)) labelAdjust = 0;
			if (zot(keyEnabled)) keyEnabled = true;

			var that = this;
			this.width = width;
			this.height = height;
			this.keyEnabled = keyEnabled;

			var myIndex = 0; // local value for this.currentIndex
			var labels = []
			var buttons = [];
			var button; var t;
			var num = tabs.length;
			var tabW = (width - spacing*(num-1))/num;

			if (typeof tabs[0] == "number" || typeof tabs[0] == "string") { // change to objects with labels
				for (var i=0; i<tabs.length; i++) {
					tabs[i] = {label:String((tabs[i]!=null))?tabs[i]:"1"};
				}
			}
			// calculate widths
			var total = 0; var t;
			var newTabW; var nonSpecifiedCount = 0;
			for (var i=0; i<tabs.length; i++) {
				t = tabs[i];
				if (zot(t.width)) nonSpecifiedCount++;
				total += (zot(t.width))?tabW:t.width;
			}

			if (total > width - spacing*(num-1)) {
				// go back and assign proportional widths
				for (i=0; i<tabs.length; i++) {
					t = tabs[i];
					t.width = (width - spacing*(num-1)) / total * ((zot(t.width))?tabW:t.width);
				}
			} else if (Math.round(total) < Math.round(width - spacing*(num-1))) {
				// go back and readjust the average of non specified widths
				if (nonSpecifiedCount > 0) {
					newTabW = (total-nonSpecifiedCount*tabW)/nonSpecifiedCount;
					zog(tabW);
					for (i=0; i<tabs.length; i++) {
						t = tabs[i];
						t.width = ((zot(t.width))?newTabW:t.width);
					}
				} else {
					if (zon) zog("ZIM Tabs - total less than width");
					this.width = total + spacing*(num-1);
				}
			}

			var lastX = 0; var tColor;
			for (i=0; i<tabs.length; i++) {
				t = tabs[i];
				if (zot(t.label)) t.label = " ";
				tColor = (i==0)?((zot(t.color))?color:t.color):((zot(t.offColor))?offColor:t.offColor);
				if (typeof t.label === "string" || typeof t.label === "number") {
					t.label = new zim.Label(t.label, height/2, "arial", labelColor);
				}
				button = new zim.Button(
					(zot(t.width))?tabW:t.width,
					height, t.label, tColor,
					(zot(t.rollColor))?rollColor:t.rollColor,
					null, null, corner, -1
				)
				button.znum = i;
				t.label.znum = i;
				t.label.y += labelAdjust;
				labels.push(t.label);
				buttons.push(button);
				this.addChild(button);
				button.x = lastX;
				lastX = button.x + button.width + spacing;
				if (i==0 && !currentEnabled) button.enabled = false;
			};

			this.on((zim.ACTIONEVENT=="mousedown")?"mousedown":"click", function(e) {
				change(e.target.znum);
				that.dispatchEvent("change");
				if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
			});

			function change(num) {
				var t = tabs[myIndex];
				if (t) {
					buttons[myIndex].color = (zot(t.offColor))?offColor:t.offColor;
					if (!currentEnabled) buttons[myIndex].enabled = true;
				}
				myIndex = num;
				t = tabs[myIndex];
				if (t) {
					buttons[myIndex].color = (zot(t.color))?color:t.color;
					if (!currentEnabled) buttons[myIndex].enabled = false;
				}
			}

			window.addEventListener("keydown", function(e) {
				if (!that.keyEnabled) return;
				if (e.keyCode == 9) {
					var next = myIndex; // note that change updates the index
					if (e.shiftKey) {
						change((--next<0)?tabs.length-1:next);
					} else {
						change((++next>tabs.length-1)?0:next);
					}
					that.dispatchEvent("change");
					if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
					e.preventDefault();
				}
			});

			Object.defineProperty(this, 'selected', {
				get: function() {
					return buttons[myIndex];
				},
				set: function(value) {
					if (zon) zog("selected is read only - try selectedIndex");
				}
			});

			Object.defineProperty(this, 'selectedIndex', {
				get: function() {
					return myIndex;
				},
				set: function(value) {
					// change(Math.min(Math.max(value, 0), tabs.length-1));
					change(value);
					if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
				}
			});

			Object.defineProperty(this, 'tabs', {
				get: function() {
					return myIndex;
				},
				set: function(value) {
					change(Math.min(Math.max(value, 0), tabs.length-1));
					if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
				}
			});

			Object.defineProperty(this, 'color', {
				get: function() {
					return color;
				},
				set: function(value) {
					color = value;
					if (zot(tabs[myIndex].color)) {
						buttons[myIndex].color = color;
						if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
					}
				}
			});

			Object.defineProperty(this, 'rollColor', {
				get: function() {
					return rollColor;
				},
				set: function(value) {
					rollColor = value;
					for (var i=0; i<tabs.length; i++) {
						if (zot(tabs[myIndex].rollColor)) {
							buttons[i].rollColor = rollColor;
						}
					}
				}
			});

			Object.defineProperty(this, 'offColor', {
				get: function() {
					return offColor;
				},
				set: function(value) {
					offColor = value;
					for (var i=0; i<tabs.length; i++) {
						if (zot(tabs[myIndex].offColor)) {
							buttons[i].color = offColor;
						}
					}
					if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
				}
			});

			Object.defineProperty(this, 'label', {
				get: function() {
					return labels[myIndex];
				},
				set: function(value) {
					if (zon) zog("selected is read only - try selectedIndex");
				}
			});

			Object.defineProperty(this, 'text', {
				get: function() {
					return (labels[myIndex]!=null) ? labels[myIndex].text : undefined;
				},
				set: function(value) {
					if (zon) zog("selected is read only - try selectedIndex");
				}
			});

			Object.defineProperty(this, 'buttons', {
				get: function() {
					return buttons;
				},
				set: function(value) {
					if (zon) zog("buttons is read only");
				}
			});

			Object.defineProperty(this, 'labels', {
				get: function() {
					return labels;
				},
				set: function(value) {
					if (zon) zog("labels is read only");
				}
			});

			this._enabled = true;
			Object.defineProperty(that, 'enabled', {
				get: function() {
					return that._enabled;
				},
				set: function(value) {
					zenable(that, value);
				}
			});

			this.dispose = function() {
				for (var i=0; i<that.buttons.length; i++) {
					that.buttons[i].dispose();
					that.labels[i].dispose();
				}
				that.removeAllEventListeners();
				return true;
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeTabs.prototype = new createjs.Container();
		makeTabs.prototype.constructor = zim.Tabs;
		return new makeTabs();

	}

/*--
zim.Pad = function(width, cols, rows, keys, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor, labelAdjust)

Pad Class

extends a createjs.Container - is really rows of zim Tab objects
a pad that has rows and cols made of square keys
when keys are pressed the pad will dispatch a change event - get the selectedIndex or text property
var pad = new zim.Pad(parameters);
pad.on("change", function() {zog(pad.selectedIndex);});

PARAMETERS: supports DUO - parameters or single object
pass in an overall width for the pad (default 150)
zim will automatically divide the width into the cols taking into account spacing
pass in cols (default 3) and rows - rows will default to the cols
keys is an array of key objects with the following properties available
any key specific properties will override the default values from other parameters
[{label:"String", width:200, color:"Red", rollColor:"pink", offColor:"grey"}, {etc.}]
the label can be a String or a zim.Label object - default text color is white
color is the color of the selected key - default #333
rollColor is the rollover color (selected keys do not roll over) - default #555
offColor is the color of a deselected key when not rolled over - default #777
spacing is the pixels between keys - default 1 pixel
currentEnabled defaults to true and means the selected key will be clickable
corner is the corner radius - default 0
labelColor defaults to white
labelAdjust defaults to 0 and can be negative or positive to move the labels up or down

PROPERTIES
width, height
selectedIndex - gets or sets the selected index of the pad
selected - gets the selected button - selected.enabled = true, etc.
text - gets current selected label text
label - gets current selected label object
color - gets or sets default selected tab color
rollColor - gets or sets default rolled over color
offColor - gets or sets default unselected tab color
buttons - an array of the ZIM Button objects. buttons[0].enabled = false;
labels - an array of the ZIM Label objects. labels[0].text = "YUM"; labels[2].y -= 10;
tabs - an array of the zim Tab objects (one object per row)
enabled - default is true - set to false to disable

METHODS
dispose() - removes listeners and deletes object

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties
and stage.update() in change event to see component change its graphics

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

EVENTS
dispatches a "change" event when a pad changes (but not when setting selectedIndex property)
--*/
	zim.Pad = function(width, cols, rows, keys, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor, labelAdjust) {

		var sig = "width, cols, rows, keys, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor, labelAdjust";
		var duo; if (duo = zob(zim.Pad, arguments, sig)) return duo;

		function makePad() {

			// the other parameters will be handled by the Tabs object for each row
			if (zot(width)) width = 150;
			if (zot(cols)) cols = 3;
			if (zot(rows)) rows = cols;
			if (zot(keys)) keys = [1,2,3,4,5,6,7,8,9];
			if (zot(currentEnabled)) currentEnabled = true;
			if (zot(spacing)) spacing = 1;

			var that = this;
			var myIndex;

			this.cols = cols; // read only
			this.rows = rows;

			var height = width / cols - spacing;
			var rowTabs = [];
			var count = 0;
			var r;
			this.labels = [];
			this.buttons = [];
			for (var i=0; i<rows; i++) {
				var rowKeys = [];
				for (var j=0; j<cols; j++) {
					rowKeys.push((keys[count]!=null) ? keys[count] : "");
					count++;
				}
				r = rowTabs[i] = new zim.Tabs(width, height, rowKeys, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor, labelAdjust, false);
				this.labels = this.labels.concat(r.labels);
				this.buttons = this.buttons.concat(r.buttons);
				this.addChild(r);
				r.selectedIndex = -1;
				r.y = (height+spacing)*i;
				r.znum = i;
				r.on("change", pressKey);
			}
			this.tabs = rowTabs;
			function pressKey(e) {
				var r = e.target;
				that.selected = r.selected;
				that.text = r.text;
				that.label = r.label;
				var s = r.selectedIndex; // store selected then clear all in pad
				for (var i=0; i<rowTabs.length; i++) {
					rowTabs[i].selectedIndex = -1;
				}
				r.selectedIndex = s; // restore selected
				myIndex = r.znum * cols + s; // calculate pad selected
				that.dispatchEvent("change");
				if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
			}

			this.width = this.getBounds().width;
			this.height = this.getBounds().height;

			Object.defineProperty(this, 'selectedIndex', {
				get: function() {
					return myIndex;
				},
				set: function(value) {
					myIndex = value;
					for (var i=0; i<rowTabs.length; i++) {
						rowTabs[i].selectedIndex = -1;
					}
					var tabNum = Math.floor(myIndex / cols);
					if (tabNum >= 0 && tabNum < that.tabs.length) {
						that.tabs[tabNum].selectedIndex = myIndex % cols;
					}
				}
			});

			this._enabled = true;
			Object.defineProperty(that, 'enabled', {
				get: function() {
					return that._enabled;
				},
				set: function(value) {
					zenable(that, value);
				}
			});

			this.dispose = function() {
				for (var i=0; i<that.tabs.length; i++) {
					that.tabs[i].dispose();
				}
				that.removeAllEventListeners();
				return true;
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makePad.prototype = new createjs.Container();
		makePad.prototype.constructor = zim.Pad;
		return new makePad();

	}


/*--
zim.ColorPicker = function(width, colors, cols, spacing, greyPicker, alphaPicker, startColor, drag, shadowColor, shadowBlur)

ColorPicker Class

extends a createjs.Container
a color picker which shows 256 Web colors by default or custom colors
additionally can show 16 greys and / or an alpha slider
picking on a color sets the swatch color and the selectedColor property
OK dispatches a change event if the color changed or a close event if not
The X dispatches a close event
var cp = new zim.ColorPicker(parameters);
cp.on("change", function() {zog(cp.selectedColor, cp.selectedAlpha);});

PARAMETERS: supports DUO - parameters or single object
pass in a width (default 500) for the color picker
colors is an optional list of colors ["red", "#CCC", etc.] - default 256 Web colors
cols is how many columns to use if you pass in custom colors - default 10
spacing is the space between the color squares - default 2
greyPicker defaults to true and shows an extra 16 greys (set to false to hide these)
(for the default colors it also includes 2 starting colors that record last picked colors)
alphaPicker defaults to true and shows an alpha slider (set to false to hide this)
(the swatch has a black, grey and white backing underneath to show multiple alpha effects)
startColor is a starting color and defaults to the last color in the colors array
drag defaults to true and is whether you can drag the component - set to false to not drag
(a small grip under the color text shows if draggable)
shadowColor defaults to rgba(0,0,0,.3) set to -1 for no shadow
value for shadow blur (default 14)

PROPERTIES
selectedColor - gets or sets the selected color swatch
selectedAlpha - gets or sets the selected alpha (set does not work if alphaPicker is false)
width, height - gets width and height of component

swatch - gets the zim.Rectangle that is the color swatch
swatchBacking - gets the createjs.Shape that is under the swatch (seen if alpha set low)
swatchText - gets the zim.Label that shows the color text
grip - gets the createjs.Shape for the grip if the panel is dragable
backing - gets the zim.Rectangle that is the backing (cp.backing.color = "white")
okBut - references the OK zim.Button
closeBut - references the X zim.Button

if alphaPicker is true:
alpaBacking - gets reference to the zim.Rectangle that makes the backing for the alpha slider
alphaBut - the zim.Button on the alpha slider
alphaSlider - the zim.Slider for the alpha
alphaText - the zim.Label for the alpha

METHODS
dispose() - removes listeners and deletes object

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

EVENTS
dispatches a "change" event when the OK button is activated and the color is different than before
dispatches a "close" event if the OK button is activated and the color has not changed or the X button is pressed
--*/

	zim.ColorPicker = function(width, colors, cols, spacing, greyPicker, alphaPicker, startColor, drag, shadowColor, shadowBlur) {

		var sig = "width, colors, cols, spacing, greyPicker, alphaPicker, startColor, drag, shadowColor, shadowBlur";
		var duo; if (duo = zob(zim.ColorPicker, arguments, sig)) return duo;

		function makeColorPicker() {

			if (zot(width)) width = 500;
			if (zot(colors)) standard = true;
			if (zot(cols)) cols = 10;
			if (zot(spacing)) spacing = 2;
			if (zot(alphaPicker)) alphaPicker = true;
			if (zot(greyPicker)) greyPicker = true;
			if (zot(drag)) drag = true;
			if (zot(shadowColor)) shadowColor="rgba(0,0,0,.3)";
			if (zot(shadowBlur)) shadowBlur=14;

			var that = this;

			var secondLastColor = "#e472c4"; // only used on standard colors
			var thirdLastColor = "#50c4b7";
			var lastAlpha = 1;
			var myAlpha = 1;

			var box = new createjs.Shape(); // shape that holds all colors and greys
			this.addChild(box);
			box.x += spacing;
			box.y += spacing;

			var standard = false;
			var colorsTemp; var w;
			var greys = [];
			if (zot(colors)) {
				standard = true;
				var num = 6; // six sets 0,3,6,9,C,F - for Web colors
				var tot = num*num*num;
				num = Math.ceil(Math.pow(tot,1/2));
				w = (width - spacing)/18-spacing;
				var f = Math.floor(Math.pow(num*num, 1/3));
				colorsTemp = [];
				for (var i=0; i<6; i++) {
					for (var j=0; j<6; j++) {
						for (var k=0; k<6; k++) {
							colorsTemp.push("#" + con(i*3) + con(j*3) + con(k*3));
						}
					}
				}
				colors = []; // flip every six by six sideways and put on two lines
				var c, r, nC, nR;
				for (i=0; i<colorsTemp.length; i++) {
					c = Math.floor(i/6);
					r = i%6;
					if (c >= 6*3) {f = 1;} else {f = 0;}
					nC = c-f*6*3;
					nR = r+f*6;
					colors[nR*18+nC] = colorsTemp[i];
				}
				cols = 18;
				greys = [thirdLastColor, secondLastColor];
			} else {
				w = (width - spacing) / cols - spacing;
			}
			var rows = Math.ceil(colors.length/cols);

			var myColor = String(colors[colors.length-1]);
			if (!zot(startColor)) myColor = String(startColor);
			var lastColor = thirdLastColor;

			function con(n) {
				n = Math.floor(n).toString(16);
				return n + "" + n;
			}

			var g = box.graphics; var f=0; var color, r, c, rX , rY;
			for (i=0; i<colors.length; i++) {
				c = i%cols;
				r = Math.floor(i/cols);
				rX = c*(w+spacing);
				rY = r*(w+spacing);
				g.f(colors[i]).r(rX,rY,w,w);
			}

			var lastHeight = rY + w + spacing;

			var greyHeight = lastHeight;
			if (greyPicker) {
				for (i=0; i<16; i++) {
					greys.push("#"+con(i)+con(i)+con(i));
				}
				for (i=0; i<greys.length; i++) {
					c = Math.floor(i/cols);
					r = i%cols;
					rX = r*(w+spacing);
					rY = c*(w+spacing)+lastHeight;
					g.f(greys[i]).r(rX,rY,w,w);
				}
				lastHeight = rY + w + spacing;
				var greyCols = cols;
				var greyRows = Math.ceil(greys.length/cols);
			}

			var margin = 10;

			if (alphaPicker) {
				var alpha = new createjs.Container();
				alpha.setBounds(0,0,600,70);
				alpha.width = 600;
				alpha.height = 70;
				this.addChild(alpha);
				alpha.x = 0;
				alpha.y = lastHeight;

				var alphaBacking = this.alphaBacking = new zim.Rectangle(600-margin*2, 50, "#222", null, null, 0);
				alpha.addChild(alphaBacking);
				zim.centerReg(alphaBacking, alpha);

				var sliderBut = this.alphaBut = new zim.Button({width:20,height:30,label:"",corner:0,hitPadding:20});
				var slider = this.alphaSlider = new zim.Slider(0,1,.05,sliderBut,600*.55);
				slider.currentValue = 1;
				alpha.addChild(slider);
				slider.x = 40;
				slider.y = alpha.height/2;

				var alphaText = this.alphaText = new zim.Label("Alpha: 1", 30, null, "orange");
				alpha.addChild(alphaText);
				alphaText.x = slider.x + slider.bar.width + 40;
				alphaText.y = alpha.height/2 - alphaText.height/2;

				alpha.scaleX = alpha.scaleY = width / 600;

				slider.on("change", function() {
					alphaText.text = "Alpha: " + decimals(slider.currentValue);
					swatch.alpha = myAlpha = slider.currentValue;
					if (that.getStage()) that.getStage().update();
				});

				lastHeight += (alpha.height-margin)*alpha.scaleX;
			}

			var nav = new createjs.Container();
			nav.setBounds(0,0,600,100);
			nav.width = 600;
			nav.height = 100;
			this.addChild(nav);
			nav.x = 0;
			nav.y = lastHeight+margin;

			var swatchText = this.swatchText = new zim.Label(myColor.toUpperCase().substr(0,7), 30, null, "orange");
			nav.addChild(swatchText);
			zim.centerReg(swatchText);
			swatchText.x = 200/2-10;
			swatchText.y = 50-2;

			if (drag) {
				var grip = this.grip = new createjs.Shape();
				nav.addChild(grip);
				grip.graphics.f("rgba(256,256,256,.25)").r(0,0,5,20).r(10,0,5,20).r(20,0,5,20).r(30,0,5,20);
				grip.x = 70; grip.y = 65;
				swatchText.y = 50-10;
			}

			var closeBut = this.closeBut = new zim.Button(90, 90, "X", "#222", "#444", null,null,0);
			nav.addChild(closeBut);
			closeBut.x = 600 - closeBut.width - margin;
			closeBut.y = 0;
			closeBut.on((zim.ACTIONEVENT=="mousedown")?"mousedown":"click", function(){that.dispatchEvent("close");});

			var button = this.okBut = new zim.Button(150, 90, "OK", "#222", "#444", null,null,0);
			nav.addChild(button);
			button.x = closeBut.x - button.width - margin;
			button.y = 0;
			button.on((zim.ACTIONEVENT=="mousedown")?"mousedown":"click", doChange);

			var swatchBacking = this.swatchBacking = new createjs.Shape();
			nav.addChild(swatchBacking);
			var g = swatchBacking.graphics;
			g.f("black").r(0.5,0.5,50,89).f("#666").r(50,0.5,50,89).f("white").r(100,0.5,49.5,89);
			swatchBacking.x = button.x - 150 - margin;
			swatchBacking.y = 0;

			var swatch = this.swatch = new zim.Rectangle(150, 90, myColor);
			nav.addChild(swatch);
			swatch.x = swatchBacking.x;
			swatch.y = 0;
			swatch.on((zim.ACTIONEVENT=="mousedown")?"mousedown":"click", doChange);
			swatch.cursor = "pointer";

			nav.scaleX = nav.scaleY = width / 600;
			lastHeight += nav.height * nav.scaleX;

			this.width = width;
			this.height = lastHeight + margin;
			this.setBounds(0,0,this.width,this.height);

			var backing = this.backing = new zim.Rectangle(this.width,this.height,"black");
			this.addChildAt(backing,0);
			if (shadowColor != -1 && shadowBlur > 0) backing.shadow = new createjs.Shadow(shadowColor, 8, 8, shadowBlur);

			function doChange(){
				if (myColor != lastColor || myAlpha != lastAlpha) {
					if (standard && greyPicker) {
						thirdLastColor = secondLastColor;
						secondLastColor = lastColor;
						var lastColors = [thirdLastColor, secondLastColor]
						for (i=0; i<2; i++) {
							var g = box.graphics;
							c = Math.floor(i/cols);
							r = i%cols;
							rX = r*(w+spacing);
							rY = c*(w+spacing)+greyHeight;
							greys[i] = lastColors[i];
							g.f(backing.color).r(rX-1,rY-1,w+2,w+2).f(lastColors[i]).r(rX,rY,w,w);
						}
						if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
					}
					lastColor = myColor;
					lastAlpha = myAlpha
					that.dispatchEvent("change");
				} else {
					that.dispatchEvent("close");
				}
			}

			if (drag) {
				var diffX, diffY;
				backing.on("mousedown", function(e) {
					diffX = e.stageX - that.x;
					diffY = e.stageY - that.y;
					backing.cursor = "move";
				});
				backing.on("pressmove", function(e) {
					that.x = e.stageX-diffX;
					that.y = e.stageY-diffY;
					if (that.getStage()) that.getStage().update();
				});
				backing.on("pressup", function(e) {
					backing.cursor = "default";
					if (that.getStage()) that.getStage().update();
				});
			}

			var gridW = cols*(w+spacing);
			var gridH = rows*(w+spacing);
			if (greyPicker) {
				var greyW = greyCols*(w+spacing);
				var greyH = greyRows*(w+spacing);
			}
			box.on((zim.ACTIONEVENT=="mousedown")?"mousedown":"click", function() {
				var index = zim.hitTestGrid(box, gridW, gridH, cols, rows, that.getStage().mouseX, that.getStage().mouseY, 0, 0, spacing, spacing);
				if (!zot(index)) {
					swatch.color = myColor = colors[index];
					swatchText.text = String(colors[index]).toUpperCase().substr(0,7);
					zim.centerReg(swatchText);
					if (that.getStage()) that.getStage().update();
				}
				if (greyPicker) {
					// note greyW not gridW
					index = null;
					index = zim.hitTestGrid(box, greyW, greyH, greyCols, greyRows, that.getStage().mouseX, that.getStage().mouseY, 0, gridH, spacing, spacing);

					if (!zot(index)) {
						swatch.color = myColor = greys[index];
						swatchText.text = greys[index].toUpperCase();
						zim.centerReg(swatchText);
						if (that.getStage()) that.getStage().update();
					}
				}
			});

			Object.defineProperty(this, 'selectedColor', {
				get: function() {
					return myColor;
				},
				set: function(value) {
					swatch.color = myColor = value;
					swatchText.text = colors[index];
					zim.centerReg(swatchText);
					if (that.getStage()) that.getStage().update();
				}
			});

			Object.defineProperty(this, 'selectedAlpha', {
				get: function() {
					if (alphaPicker) {
						return decimals(slider.currentValue);
					} else {
						return 1;
					}
				},
				set: function(value) {
					if (alphaPicker) {
						swatch.alpha = slider.currentValue = value;
						alphaText.text = "Alpha: " + decimals(slider.currentValue);
						if (that.getStage()) that.getStage().update();
					}
				}
			});

			function decimals(n) {
				return Math.round(n*Math.pow(10, 2))/Math.pow(10, 2);
			}

			this.dispose = function() {
				slider.dispose();
				box.removeAllEventListeners();
				backing.removeAllEventListeners();
				closeBut.removeAllEventListeners();
				swatch.removeAllEventListeners();
				button.removeAllEventListeners();
				return true;
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeColorPicker.prototype = new createjs.Container();
		makeColorPicker.prototype.constructor = zim.ColorPicker;
		return new makeColorPicker();
	}

/*--
zim.Parallax = function(stage, damp, layers, auto, fps)

Parallax Class

takes objects as layers and sets properties based on an input
for instance, each layer could move a different x based on position of mouseX
or each layer could scale a different amount based on scroll of y
The types of input are mouseX, mouseY, scrollX, scrollY
The types of properties to change could be x, y, scaleX, scaleY, rotation, alpha, frameNumber, etc.
Parallax allows scale to be a property which scales scaleX and scaleY together
Parallax allows frame to be a property and calls gotoAndStop() on a Sprite frame
Parallax really just manages multiple ProportionDamp objects
for proper parallax, the objects closer move more than the objects farther back
make a new object: p = new zim.Parallax(parameters)

PARAMETERS: supports DUO - parameters or single object
pass in a reference to the stage as the first parameter
pass in the damping value (.1 default)
pass in an array of layer objects in the following format:

[{obj:obj, prop:"x", propChange:200, input:"scrolly", inMin:100, inMax:300, factor:1, integer:false}, etc.]
this would move the obj 200 px in the x as the window scrolls from 100 to 300 px in the y

the first three properties are required
object is the object whose property is being changed
prop is the property that is being changed
propChange is how much you want the property to change
input defaults to mouseX but can also be mouseY, scrollX, scrollY
the inMin defaults to 0, inMax to stageW (for x prop) stageH (for y prop)
the factor defaults to 1 which means change is in same direction
set factor to -1 to change in the opposite direction
integer rounds the value to an integer
note, if frame is the property, the gotoAndStop() accepts decimals

For instance,
[{obj:obj, prop:"x", propChange:100}, {obj:obj, prop:"y", propChange:50, input:"mouseY"}, etc.]
would do traditional mouse move parallax for one object
you would probably have more objects to follow

or you can add these one at a time with the p.addLayer({layer object properties});
the auto parameter defaults to true and uses the specified input
if auto is set to false, you must make your own Ticker and use the step(input) method
can set frames per second as fps parameter default 30 (works better on mobile)
note: the ticker parameter has been removed - see zim.Ticker

METHODS
addLayer({layer object properties}) - adds a layer
removeLayer(index) - removes a layer based on order added
step(input) - used when auto is false to send in custom input data
immediate([]) - immediately sets the target value for each layer object (no damping)
dispose() - removes listeners

PROPERTIES
damp - allows you to dynamically change the damping
--*/
	zim.Parallax = function(stage, damp, layers, auto, fps) {

		var sig = "stage, damp, layers, auto, fps";
		var duo; if (duo = zob(zim.Parallax, arguments, sig, this)) return duo;

		if (zot(stage) || !stage.getBounds) {zog("zim build - Parallax(): please pass in the stage with bounds as first parameter"); return;}
		if (!stage.getBounds()) {zog("zim build - Parallax(): Please give the stage bounds using setBounds()");	return;}
		if (zot(auto)) auto = true;

		var stageW = stage.getBounds().width;
		var stageH = stage.getBounds().height;

		var that = this;

		// public properties
		this.damp = (zot(damp)) ? .1 : damp;

		// public methods (do not get hoisted so define early)
		// addLayer works as a public method
		// and also is called from the object in case we add layers via the Parallax object parameters
		// the function prepares ProportionDamp objects for two values
		// and stores them on the layer object
		// and also stores the desired amounts on the layer objects themselves
		// finally, the layer object is added to the myLayers private property
		// the timer then loops through these layers and handles things from there
		// obj, distanceX, distanceY, minX, minY, maxX, maxY, factor, targetRound
		this.addLayer = function(layer) {
			//{obj, prop, propChange, input, inMin, inMax, factor, integer}
			if (zot(layer.obj) || zot(layer.prop) || zot(layer.propChange)) return;
			var obj = {obj:layer.obj, prop:layer.prop};
			obj[obj.prop] = layer.propChange;
			if (zot(layer.input)) layer.input = "mouseX";
			obj.input = layer.input;

			var inMin = (zot(layer.inMin)) ? 0 : layer.inMin;
			var inMax = (zot(layer.inMax)) ? stageW : layer.inMax;
			var factor = (zot(layer.factor)) ? 1 : layer.factor;
			var integer = (zot(layer.integer)) ? false : layer.integer;

			// baseMin, baseMax, targetMin, targetMax, damp, factor, targetRound
			obj["p_"+obj.prop] = new zim.ProportionDamp(inMin, inMax, 0, obj[obj.prop], that.damp, factor, integer);
			if (obj.prop == "scale") {
				obj["s_"+obj.prop] = obj.obj.scaleX; // helper to allow scale to be property
			} else if (obj.prop == "frame") {
				obj["s_"+obj.prop] = obj.obj.currentFrame;
			} else {
				obj["s_"+obj.prop] = obj.obj[obj.prop]; // obj.s_x = obj.obj.x for example
			}
			myLayers.push(obj);
			return myLayers.length-1;
		}

		this.removeLayer = function(index) {
			if (zot(index)) return;
			var layer = myLayers[index];
			layer["p_"+layer.prop].dispose();
			myLayers.splice(index,1);
		}

		this.immediate = function(array) {
			var o;
			for (var i=0; i<myLayers.length; i++) {
				o = myLayers[i];
				o["p_"+o.prop].immediate(array[i]);
			}
		}

		this.dispose = function() {
			myLayers = null;
			if (auto) zim.Ticker.remove(zimTicker);
			return true;
		}

		// private properties
		// here are any layers that come in from Parallax object parameters
		layers = (zot(layers)) ? [] : layers;

		// we now are going to process these layers with the public addLayer method
		// this will add the processed layers to the private property, myLayers
		var myLayers = [];
		for (var i=0; i<layers.length; i++) {
			this.addLayer(layers[i]);
		}

		if (auto) {
			zim.Ticker.stage = stage;
			var zimTicker = zim.Ticker.add(animate);
			if (!zot(fps)) createjs.Ticker.setFPS(fps);
		}

		// loop though our layers and apply the converted proportion damping
		function animate(e) {
			that.step();
		}

		this.step = function(custom) {
			var o; var input;
			for (var i=0; i<myLayers.length; i++) {
				o = myLayers[i];
				if (zot(custom)) {
					if (o.input == "mouseX") input = stage.mouseX;
					else if (o.input == "mouseY") input = stage.mouseY;
					else if (o.input == "scrollX") input = zim.scrollX();
					else if (o.input == "scrollY") input = zim.scrollY();
				} else {
					input = custom;
				}
				// damp object at property to start value + converted goal based on input
				if (o.prop == "scale") {
					o.obj.scaleX = o.obj.scaleY = o["s_"+o.prop] + o["p_"+o.prop].convert(input);
				} else if (o.prop == "frame") {
					o.obj.gotoAndStop(o["s_"+o.prop] + o["p_"+o.prop].convert(input));
				} else {
					o.obj[o.prop] = o["s_"+o.prop] + o["p_"+o.prop].convert(input);
					// for x on mouseX we split the destination range in two for a centered parallax
					if (o.input == "mouseX" && auto) o.obj[o.prop] -= o[o.prop] / 2;
				}
			}
		}
	}


/*--
zim.Scroller = function(backing1, backing2, speed, direction, horizontal, gapFix, fps)

Scroller Class

animates a backing either horizontally or vertically (not both)
make a new zim.Scroller(parameters) object
the Scroller object will animate and swap the backgrounds when needed

PARAMETERS: supports DUO - parameters or single object
pass in two backgrounds (that look the same - clone them)
pass in the speed, direction and a boolean for horizontal (default true)
setting horizontal to false will animate vertically
you can adjust the speed and direction properties dynamically
you cannot adjust the backings and horizontal dynamically
to change your animation, dispose() of the Scroller object and make a new one
disposing just removes the ticker - you have to remove the backings
not sure what is causing a small gap to appear over time
but if your background can overlap a little you can pass in a gapFix of 10 pixels etc.
can set frames per second as fps parameter default 30 (works better on mobile)
note: the ticker parameter has been removed - see zim.Ticker

METHODS
dispose() - get rid of the event listeners - you need to remove the backings

PROPERTIES
speed - how fast the animation is going in pixels per frame (ticker set at 60)
direction - either left or right if horizontal or up or down if not horizontal
gapFix - if spacing occurs over time you can set the gapFix dynamically
--*/
	zim.Scroller = function(backing1, backing2, speed, direction, horizontal, gapFix, fps) {

		var sig = "backing1, backing2, speed, direction, horizontal, gapFix, fps";
		var duo; if (duo = zob(zim.Scroller, arguments, sig, this)) return duo;

		var b1 = backing1; var b2 = backing2;
		if (zot(b1) || !b1.getBounds || zot(b2) || !b2.getBounds) return;
		if (zot(horizontal)) horizontal = true;
		var that = this; // we keep animate protected but want to access public properties
		if (zot(fps)) fps = 30;

		// here are the public properties that can be changed
		this.speed = (zot(speed)) ? 1 : speed;
		this.direction = (zot(direction)) ? 1 : direction;
		this.gapFix = (zot(gapFix)) ? 0 : gapFix;

		if (!b1.getBounds() || !b2.getBounds()) {
			zog("zim build - Scroller(): please setBounds() on backing objects");
			return;
		}
		if (!b1.getStage()) {
			zog("zim build - Scroller(): please add backing objects to stage to start");
			return;
		}

		var stageW;
		var stageH;

		if (horizontal) {
			b2.x = b1.getBounds().width;
		} else {
			b2.y = b1.getBounds().height;
		}

		zim.Ticker.stage = b1.getStage();
		var zimTicker = zim.Ticker.add(animate);
		if (!zot(fps)) createjs.Ticker.setFPS(fps);

		function animate(e) {
			if (!b1.getStage()) return;
			if (!b1.getStage().getBounds()) {zog("zim build - Scroller(): please setBounds() on stage"); return;}
			if (!stageW) {
				stageW = b1.getStage().getBounds().width;
				stageH = b1.getStage().getBounds().height;
			}
			// pausing the ticker does not really pause the ticker (weird)
			if (that.speed == 0 || that.direction == 0) {return;}

			if (horizontal) {
				b1.x -= that.speed*that.direction;
				b2.x -= that.speed*that.direction;

				if (that.direction * that.speed > 0) {
					if (b2.x < 0 && b1.x < b2.x) {
						b1.x = b2.getBounds().width-that.gapFix;
					} else if (b1.x < 0 && b2.x < b1.x) {
						b2.x = b1.getBounds().width-that.gapFix;
					}
				} else {
					if (b2.x > stageW && b2.x > b1.x) {
						b2.x = b1.x - b1.getBounds().width+that.gapFix;
					} else if (b1.x > stageW && b1.x > b2.x) {
						b1.x = b2.x - b2.getBounds().width+that.gapFix;
					}
				}
			} else {
				b1.y -= that.speed*that.direction;
				b2.y -= that.speed*that.direction;

				if (that.direction * that.speed > 0) {
					if (b2.y < 0 && b1.y < b2.y) {
						b1.y = b2.getBounds().height-that.gapFix;
					} else if (b1.y < 0 && b2.y < b1.y) {
						b2.y = b1.getBounds().height-that.gapFix;
					}
				} else {
					if (b2.y > stageH && b2.y > b1.y) {
						b2.y = b1.y - b1.getBounds().height+that.gapFix;
					} else if (b1.y > stageH && b1.y > b2.y) {
						b1.y = b2.y - b2.getBounds().height+that.gapFix;
					}
				}
			}
			b1.getStage().update();
		}

		this.dispose = function() {
			if (zon) zog("bye from Scroller");
			zim.Ticker.remove(zimTicker);
			return true;
		}

	}

	// function to set enabled of components
	function zenable(t,v) {
		if (v) {
			t.mouseChildren = true;
			t.mouseEnabled = true;
			t._enabled = true;
		} else {
			t.mouseChildren = false;
			t.mouseEnabled = false;
			t._enabled = false;
		}
	}


	return zim;
} (zim || {});



////////////////  ZIM PAGES  //////////////

// zimpages.js helps you layout and control flexive pages, click and swipe between pages and more
// classes in this module require createjs namespace to exist and in particular easel.js
// available at http://createjs.com

var zim = function(zim) {

	if (zon) zog("ZIM PAGES Module");


/*--
zim.Swipe = function(obj, distance, duration)

Swipe class

extends a createjs.EventDispatcher so it can dispatch events
sets up capturing swipes on objects
dispatches a "swipe" event on swipe left, right, up, down
var s = zim.Swipe(parameters)

PARAMETERS: supports DUO - parameters or single object
pass into the object the object you want to swipe on
then an optional distance to activate swipe (30 pixel default)
might want to pass in a pixel distance based on percentage of stage
and an optional time to travel that distance (80 ms default)
try http://zimjs.com/code/swipe.html for testing distance and time (speed)

PROPERTIES
distance - the distance needed for swipe to activate
duration - the time from mousedown a swipe is measured for distance
direction - the direction of the last swipe (left, right, up, down or none)
obj - the object that was last swiped
active - Boolean true for dispatching swipes and false for not

METHODS
enable() - set swipe to active (by default it is)
disable() - set swipe to inactive (sets active to false and does not dispatch)

EVENTS
dispatches a "swipe" event on every pressup (even if swipe failed and direction is none)
when a swipe event triggers
the Swipe event object has a swipeX and swipeY property that is -1,0, or 1
for left, none, or right OR up, none, down
the event object has an obj property as well for what object was swiped
also dispatches a "swipedown" event for convenience on a mousedown
LEGACY
the Swipe object provides a direction property of "left", "right", "up", or "down"
the Swipe object provides an obj property of what object was swiped on
for instance if e is the event object
then e.target is the Swipe object so use e.target.direction
did not dispatch a custom event due to lack of support in early IE
Swipe also dispatches a direction of "none" if the mouse movement is not a swipe
this can be used to snap back to an original location
--*/
	zim.Swipe = function(obj, distance, duration) {

		var sig = "obj, distance, duration";
		var duo; if (duo = zob(zim.Swipe, arguments, sig)) return duo;

		function makeSwipe() {
			if (zot(obj) || !obj.on) {zog("zim pages - Swipe():\nPlease pass in object"); return;}
			if (zot(distance)) distance = 30; // pixels for swipe to count
			if (zot(duration)) duration = 80; // ms to test pixels

			this.distance = distance;
			this.duration = duration;
			this.active = true;

			var startX;
			var startY;
			var mouseX;
			var mouseY;
			var downCheck;
			var timer;
			var that = this;

			obj.on("mousedown", function(e) {

				if (!that.active || e.target.zimNoSwipe) return;
				that.obj = e.target;
				mouseX = startX = e.stageX;
				mouseY = startY = e.stageY;
				downCheck = true;
				that.dispatchEvent("swipedown");
				clearTimeout(timer);
				timer = setTimeout(function() {
					if (downCheck) {
						checkSwipe();
						downCheck = false;
					}
				}, that.duration);
				obj.on("pressmove", function(e) {
					mouseX = e.stageX;
					mouseY = e.stageY;
				});
				obj.on("pressup", function(e) {
					if (downCheck) {
						checkSwipe();
						downCheck = false;
						clearTimeout(timer);
					}
				});

				function checkSwipe() {
					var swipeCheck = false;
					var e = new createjs.Event("swipe");
					e.obj = that.obj;
					e.swipeX = e.swipeY = 0;
					that.direction = "none";
					// may as well use 45 degrees rather than figure for aspect ratio
					if (Math.abs(mouseX - startX) > Math.abs(mouseY - startY)) {
						if (mouseX - startX > that.distance) {e.swipeX = 1;  that.direction="right";}
						if (startX - mouseX > that.distance) {e.swipeX = -1; that.direction="left";}
					} else {
						if (mouseY - startY > that.distance) {e.swipeY = 1;  that.direction="down";}
						if (startY - mouseY > that.distance) {e.swipeY = -1; that.direction="up";}
					}
					that.dispatchEvent(e);
				}
			});

			this.disable = function() {
				that.active = false;
			}

			this.enable = function() {
				that.active = true;
			}
		}
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeSwipe.prototype = new createjs.EventDispatcher();
		makeSwipe.prototype.constructor = zim.Swipe;
		return new makeSwipe();
	}


/*--
zim.Pages = function(holder, pages, transition, speed, transitionTable)

Pages Class

Pages extends the createjs Container - so you stage.addChild(myPages)
handles going between pages
make a var myPages = new zim.Pages() object
all your pages from then on are added to and manipulated inside the Pages object
Pages allows you to set the destination pages for swipe events
other events like buttons can call the go(page, direction) method
consider using zim.HotSpots() to efficiently handle multiple buttons

PARAMETERS: supports DUO - parameters or single object
pass in the holder object (ie. stage) so we can set various transition animation parameters
pass in an array of page objects - for example:
[{page:home, swipe:[null,"info",hide,find]},{page:hide, swipe:[null,null,null,home]}]
the pages should be containers - it helps to give them each a name property
the optional swipe array holds mappings to swipe events ["right", "left", "down", "up"]
in other words, these could be pages to the left, right, top and bottom of the current page
or they can call commands as strings
pass in the type of transition "reveal", "slide", "fade", "black", "white" or the default: "none"
and a speed in milliseconds
finally an optional transitionTable (read the property below for format)

METHODS
addPage() - lets you alternatively add pages after you create the object
removePage() - lets you remove a page (if on this page, call a go() first and remove on the page event)
setSwipe() - lets you set the swipe array for a page
go(newPage, direction, trans, ms) - lets you go to a page for events other than swipe events
trans and ms are optional and will override any previously set transitions (speed in ms)
resize() - call to resize transitions - not the pages themselves (use layouts)
pause() - pauses a transition before it starts (call from swipe event)
unpause() - unpauses a paused transition (unless another go() command is called)
puff(time) - adds all the pages behind the currentPage (time (ms) auto calls settle)
settle() - removes all pages except the currentPage
disable() - stops swipe from activating and sets active = false
enable() - enables swipe action and sets active = true
dispose() - clears your listeners and pages

PROPERTIES
speed - of transitions in ms
transitionTable - [[fromPage, toPage, "transition", ms(optional)], etc.] overrides default transition
page - the current page object (read)
lastPage - the last page before transition (read)
direction - direction of transition (read)
active - default true, boolean to have swipes active (good for layered Pages objects)
swipe - the ZIM Swipe object used for pages (can tweak distance to percentage if rescaling)

EVENTS
for the data above, swiping the home page down automatically goes to the hide page
if the home page is swiped up it automatically goes to the find page
Pages dispatches a "swipe" event before changing pages if swiped
you can then get pages.page, pages.nextPage and pages.direction
you can pause() if needed the transition to handle data, etc. and then unpause()
you do not need to handle going to another page when swiping - that is handled automatically
so you probably will not use the swipe event unless handling data between pages
Pages dispatches a "page" event when you pass in a page object in the swipe array
myPages.on("page",function(e){...})
with myPages.page being set to the new page (e.target.page)
and myPages.lastPage being set to the old page (e.target.lastPage)
myPages.direction gets the direction of the transition (e.target.direction)
if there is a string in the swipe array like "info"
then the zim.Pages() object dispatches an event equivalent to the string
for the data example above, myPages.on("info",function(e){...});
would trigger when the home page is swiped to the left
Pages also dispatches a "pageTransitioned" event when a transition is complete
you will have the same properties available as with the page event

the first page object is the start page
you can add pages with the addPage() method
it will not show until you swipe or go to it - unless it was the first page added
once again - do not add the pages to the stage yourself - let Pages do it for you
just add the pages object to the stage.  Pages is designed for full stage
if you want pages within a smaller area - consider using two canvas tags
--*/
	zim.Pages = function(holder, pages, transition, speed, transitionTable) {

		var sig = "holder, pages, transition, speed, transitionTable";
		var duo; if (duo = zob(zim.Pages, arguments, sig)) return duo;

		function makePages() {

			if (zot(holder) || !holder.getBounds || !holder.getBounds()) {zog("zim pages - Pages():\nobject must have bounds set"); return;}
			if (zot(pages)) pages = []; // can add pages with addPages
			if (zot(transition)) transition = "none";
			if (zot(speed)) speed = 200;
			if (zot(transitionTable)) transitionTable = [];
			this.transitionTable = transitionTable;

			this.speed = speed;
			this.active = true;
			var that = this;

			var hW = holder.getBounds().width;
			var hH = holder.getBounds().height;

			var currentPage = this.page = (pages[0]) ? pages[0].page : null;

			var black; var white;
			if (transition!="none" || transitionTable!=[]) makeTransitionAssets();

			function makeTransitionAssets() {
				black = new createjs.Shape();
				black.graphics.f("black").r(0,0,hW,hH+1);
				white = new createjs.Shape();
				white.graphics.f("white").r(0,0,hW,hH+1);
			}

			var directions = ["left","right","up","down"];

			var data; // holds the page data object
			var page; // holds a page

			for (var i=0; i<pages.length; i++) {
				data = pages[i];
				data.page.zimSwipeArray = (data.swipe) ? data.swipe : [];
			}
			this.addChild(currentPage);

			this.swipe = new zim.Swipe(holder);

			// handle giving swipe event time to trigger event and provide code intervention
			var pauseInfo;
			var paused = false;

			var swipeEvent = this.swipe.on("swipe", function(e) {
				if (!that.active) return;
				var direction = e.currentTarget.direction
				if (direction == "none") return;
				// swap direction (swipe up means move down)
				var newDirection = "";
				if (direction=="left") newDirection="right";
				else if (direction=="right") newDirection="left";
				else if (direction=="up") newDirection="down";
				else if (direction=="down") newDirection="up";
				direction = newDirection;
				var dirIndex = directions.indexOf(direction);
				page = currentPage.zimSwipeArray[dirIndex];

				pauseInfo = [page, direction, null, null, true];
				that.page = currentPage;
				that.nextPage = page;
				that.direction = direction;
				that.dispatchEvent("swipe");

				setTimeout(function() {
					if (!paused) {
						that.go(page, direction, null, null, true); // true is from swipe
					}
				}, 50);
			});

			this.addPage = function(page, swipeArray) {
				if (zot(swipeArray)) swipeArray = [];
				var data = {page:page, swipe:swipeArray};
				data.page.zimSwipeArray = (data.swipe) ? data.swipe : [];
				if (!currentPage) {
					currentPage = that.page = data.page;
					that.addChild(currentPage);
				}
			}

			this.removePage = function(page) {
				if (that.currentPage == page) {
					that.removeChild(page);
					if (holder.getStage()) holder.getStage().update(); // works even if holder is stage
				}
				page.zimSwipeArray = null;
			}

			this.setSwipe = function(page, swipeArray) {
				if (zot(swipeArray)) swipeArray = [];
				var data = {page:page, swipe:swipeArray};
				data.page.zimSwipeArray = (data.swipe) ? data.swipe : [];
			}

			this.pause = function() {
				paused = true;
			}
			this.unpause = function() {
				if (paused) that.go(pauseInfo[0], pauseInfo[1], pauseInfo[2], pauseInfo[3], pauseInfo[4]);
			}

			this.go = function(newPage, direction, trans, ms, fromSwipe) {
				// newPage holds a page or a string command
				setTimeout(function() {paused = false;},200);
				var slides = [{x:hW},{x:-hW},{y:hH},{y:-hH}];
				var slides2 = [{x:0},{x:0},{y:0},{y:0}];
				var reveals = [{x:hW/2,alpha:0},{x:-hW/2,alpha:0},{y:hH/2,alpha:0},{y:-hH/2,alpha:0}];

				// check for default transition override in transitionTable
				var tempTransition = transition; // default transition
				var tempMs = speed; // default transition speed
				for (var i=0; i<that.transitionTable.length; i++) {
					if (that.transitionTable[i][0]==currentPage && that.transitionTable[i][1]==newPage) {
						tempTransition = that.transitionTable[i][2];
						tempMs = that.transitionTable[i][3];
						break;
					}
				}
				// transition passed into go overrides all transitions
				// so if there is not a transition parameter set trans tempTransition
				// which is either the transition table transition or the default
				if (zot(trans)) trans = tempTransition; // use default
				if (zot(ms)) ms = tempMs; // use default
				that.speed = ms;

				that.direction = direction;
				if (newPage=="" || newPage==null) {
					that.page = currentPage;
					that.dispatchEvent("nothing");
				} else if (typeof newPage === 'string') {
					that.page = currentPage;
					that.dispatchEvent(newPage);
				} else {
					if (newPage == currentPage) return; // same page ;-)
					if (zot(direction)) direction="right";
					var dirIndex = directions.indexOf(direction);

					function transEnd(pages) {
						pages[0].uncache();
						pages[1].uncache();
						that.dispatchEvent("pageTransitioned");
						that.removeChild(that.lastPage);
						that.removeChild(black);
						that.removeChild(white);
					}

					function transEndHalf(pages) {
						that.removeChild(that.lastPage);
						zim.animate(pages.shift(), {alpha:0}, that.speed/2, null, transEnd, pages);
					}

					newPage.x = 0;
					newPage.y = 0;
					newPage.alpha = 1;

					if (trans == "slide") {
						newPage.x = -(slides[dirIndex].x | 0);
						newPage.y = -(slides[dirIndex].y | 0);
						newPage.cache(0,0,(hW+1)/newPage.scaleX,(hH+1)/newPage.scaleY);
						currentPage.cache(0,0,(hW+1)/currentPage.scaleX,(hH+1)/currentPage.scaleY);
						that.addChild(newPage);
						that.addChild(currentPage);
						zim.animate(currentPage, slides[dirIndex], that.speed, null, transEnd, [currentPage, newPage]);
						zim.animate(newPage, slides2[dirIndex], that.speed);
					} else if (trans == "reveal") {
						newPage.cache(0,0,(hW+1)/newPage.scaleX,(hH+1)/newPage.scaleY);
						currentPage.cache(0,0,(hW+1)/currentPage.scaleX,(hH+1)/currentPage.scaleY);
						that.addChild(newPage); // put destination under current page
						that.addChild(currentPage);
						zim.animate(currentPage, reveals[dirIndex], that.speed, null, transEnd, [currentPage, newPage]);
					} else if (trans == "fade") {
						newPage.cache(0,0,(hW+1)/newPage.scaleX,(hH+1)/newPage.scaleY);
						currentPage.cache(0,0,(hW+1)/currentPage.scaleX,(hH+1)/currentPage.scaleY);
						newPage.alpha = 1;
						that.addChild(newPage);
						that.addChild(currentPage);
						zim.animate(currentPage, {alpha:0}, that.speed, null, transEnd, [currentPage, newPage]);
					} else if (trans == "black") {
						newPage.cache(0,0,(hW+1)/newPage.scaleX,(hH+1)/newPage.scaleY);
						currentPage.cache(0,0,(hW+1)/currentPage.scaleX,(hH+1)/currentPage.scaleY);
						newPage.alpha = 1;
						that.addChild(newPage);
						that.addChild(currentPage);
						black.alpha = 0;
						that.addChild(black);
						zim.animate(black, {alpha:1}, that.speed/2, null, transEndHalf, [black, currentPage, newPage]);
					} else if (trans == "white") {
						newPage.cache(0,0,(hW+1)/newPage.scaleX,(hH+1)/newPage.scaleY);
						currentPage.cache(0,0,(hW+1)/currentPage.scaleX,(hH+1)/currentPage.scaleY);
						newPage.alpha = 1;
						that.addChild(newPage);
						that.addChild(currentPage);
						white.alpha = 0;
						that.addChild(white);
						zim.animate(white, {alpha:1}, that.speed/2, null, transEndHalf, [white, currentPage, newPage]);
					} else {
						that.addChild(newPage);
						that.removeChild(currentPage);
						// that.dispatchEvent("pageTransitioned"); // hmmm... no
					}

					that.lastPage = currentPage;
					that.page = newPage;
					if (zot(fromSwipe)) fromSwipe = false;
					that.fromSwipe = fromSwipe;
					that.dispatchEvent("page");
					currentPage = newPage;
					if (holder.getStage()) holder.getStage().update();
				}
			}

			this.resize = function() {
				hW = holder.getBounds().width;
				hH = holder.getBounds().height;
				if (transition!="none" || transitionTable!=[]) makeTransitionAssets();
			}


			this.puff = function(milliseconds) {
				// add all pages to the holder behind current page
				// if milliseconds then this is the time to settle automatically
				for (var i=0; i<pages.length; i++) {
					that.addChild(pages[i].page);
				}
				that.addChild(currentPage);
				if (milliseconds > 0) {
					setTimeout(function() {
						that.settle();
					}, milliseconds);
				}
			}

			this.settle = function() {
				that.removeAllChildren();
				that.addChild(currentPage);
				that.dispatchEvent("puffed");
			}

			this.disable = function() {
				that.active = false;
			}

			this.enable = function() {
				that.active = true;
			}

			this.dispose = function() {
				that.swipe.off("swipe", swipeEvent);
				that.removeAllChildren();
				pages = null;
				return true;
			}

		}
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makePages.prototype = new createjs.Container();
		makePages.prototype.constructor = zim.Pages;
		return new makePages();
	}


/*--
zim.HotSpots = function(spots, local, mouseDowns)

HotSpots Class

extends a createjs.Container
puts an invisible click area (hotSpot) on pages
or specify an object and it will turn that into a hotspot
var hs = new zim.HotSpots();

PARAMETERS: supports DUO - parameters or single object
you pass in an array of hotspot data objects:
[{page:home, rect:[190,50,260,260], call:someFunction},
{page:home, rect:[70,405,500,150], call:someOtherFunction}]
the page should be a createjs Container
the rect is the [left, right, width, height] of a rectangle relative to the stage
call is the callback function to call when a hotSpot is clicked
instead of a rect array you can pass an object that must have setBounds() set
[{page:home, rect:submitButton, call:function(){//code}}]
the hotSpot will then use the button position and bounds as the rectangle
this allows you to manage all your button presses from one place
note - in this case, HotSpots will actually add a click event to the button
the second parameter local defaults to true
and should be used when the element scale independently from the stage
in local mode you must add coordinates of the hotSpot inside its container
if set to false then you pass in global coordinates and hotSpot will convert them
the third parameter is whether you want mouseDowns on the hotSpots
this defaults to false to prevent users from activating a swipe on a button (when using ZIM Swipe)

METHODS
show() - shows the hotspots for testing during authoring time
hide() - hides the hotspots
addHotSpot(page,rect,call) - can dynamically add hotSpots
removeHotSpots(page,id) - id is optional - so can remove all spots on a page
dispose() - removes listeners

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

note, the class does actually add rectangle shapes to your page
the spot is a pixel rect with an alpha of .01 and then uses a hitArea of a backing shape
this could have been done with "math" alone but rollover cursor would be a pain
the class creates zim.HotSpot objects - see the class underneath this one
--*/

	if (zot(zim.ACTIONEVENT)) zim.ACTIONEVENT = "mousedown";

	zim.HotSpots = function(spots, local, mouseDowns) {

		var sig = "spots, local, mouseDowns";
		var duo; if (duo = zob(zim.HotSpots, arguments, sig)) return duo;

		function makeHotSpots() {
			if (zot(spots) || !Array.isArray(spots)) {zog("zim pages - HotSpots():\nplease provide an array of HotSpot data"); return;}
			if (zot(local)) local = true;
			if (zot(mouseDowns)) mouseDowns = false;
			var eventType = (zim.ACTIONEVENT=="mousedown")?"mousedown":"click";

			var that = this;

			var data; // spot data object
			var hs; // hotSpot object
			var hotSpots = []; // array of hotSpot objects

			// loop through data and add hotSpot objects
			for (var i=0; i<spots.length; i++) {
				addSpot(spots[i]);
			}

			function addSpot(data) {
				var button = null;
				if (!Array.isArray(data.rect)) {
					button = data.rect; // data includes a button rather than rect
					if (!button) {
						zog("zim pages - HotSpots(): HotSpot "+ data.page + " " + data.rect +" button does not exist");
						return;
					}
					data.rect = [button.x, button.y, 1, 1];	// bounds are not used for button
				}

				hs = new zim.HotSpot(data.page,data.rect[0],data.rect[1],data.rect[2],data.rect[3],data.call,local);
				hs.zimHSpage = data.page;
				hs.button = button;
				hotSpots.push(hs);
				hs.on(eventType, hsEvent);
				if (button) {
					// stop hotSpot from taking away rollovers on button
					hs.spot.mouseEnabled = false;
					hs.spot.mouseChildren = false;
					// but now need to add click to button as hotSpot will not work
					button.zimHScall = data.call;
					button.zimHSEvent = button.on(eventType, hsEvent, true);
					if (!mouseDowns) {
						button.zimHSMDEvent = button.on("mousedown",function(e) {
							e.stopImmediatePropagation();
						});
					}
					button.cursor = "pointer";
				}
			}

			function hsEvent(e) {
				if (e.stopImmediatePropagation) e.stopImmediatePropagation();
				if (window.event) window.event.cancelBubble=true;
				if (typeof(e.currentTarget.zimHScall) == "function") {
					e.currentTarget.zimHScall(e);
				}
			}

			this.addHotSpot = function(page,rect,call) {
				data = {page:page, rect:rect, call:call};
				spots.push(data);
				addSpot(data);
			}

			this.show = function() {
				for (var i=0; i<hotSpots.length; i++) {
					hs = hotSpots[i];
					if (!hs.button) hs.show();
				}
			}
			this.hide = function() {
				for (var i=0; i<hotSpots.length; i++) {
					hs = hotSpots[i];
					hs.hide();
				}
			}

			this.removeHotSpots = function(page, rect) {
				for (var i=spots.length-1; i>=0; i--) {
					data = spots[i];
					hs = hotSpots[i];
					if (rect && !Array.isArray(rect)) { // button
						rect = [rect.x, rect.y, rect.getBounds().width, rect.getBounds().height];
					}
					if (
						(zot(page) && zot(rect)) ||
						(zot(rect) && page==data.page) ||
						(zot(page) && zim.arraysEqual(rect,data.rect)) ||
						(page==data.page && zim.arraysEqual(rect,data.rect))
					) {
						// remove hotSpot from data and hotSpots list
						spots.splice(i,1);
						if (hs.button) {
							hs.button.off(eventType, hs.button.zimHSEvent);
							hs.button.zimHSEvent = null;
							if (!mouseDowns) {
								hs.button.off("mousedown", hs.button.zimHSMDEvent);
								hs.button.zimHSMDEvent = null;
							}
						}
						hs.off(eventType, hsEvent);
						hs.dispose();
						hotSpots.splice(i,1);
					}
				}
			}

			this.dispose = function() {
				for (var i=0; i<hotSpots.length; i++) {
					hs = hotSpots[i];
					if (hs.button) {
						hs.button.off(eventType, hs.button.zimHSEvent);
						hs.button.zimHSCall = null;
						hs.button.zimHSEvent = null;
						if (!mouseDowns) {
							hs.button.off("mousedown", hs.button.zimHSMDEvent);
							hs.button.zimHSMDEvent = null;
						}
					}
					hs.off(eventType, hsEvent);
					hs.dispose();
				}
				return true;
			}
		}
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeHotSpots.prototype = new createjs.Container();
		makeHotSpots.prototype.constructor = zim.HotSpots;
		return new makeHotSpots();
	}


/*--
zim.HotSpot = function(obj, x, y, width, height, call, local)

HotSpot Class

adds an invisible button to a container object (often think of this as the page)
var hs = new zim.HotSpot();
if you want multiple spots it is more efficient to use the HotSpots class above
which manages multiple HotSpot objects (otherwise you end up with multiple event functions)
the spot is a pixel rect with an alpha of .01 and then uses a hitArea of a backing shape
the spot will get a cursor of "pointer"

PARAMETERS: supports DUO - parameters or single object
the container object in which to place the hotspot
the x, y, width and height of the hotspot relative to the stage
call is the function to call when the spot is pressed
local defaults to true and should be used when the element scale independently from the stage
in local mode you must add coordinates of the hotSpot inside its container
if set to false then you pass in global coordinates and hotSpot will convert them

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

METHODS
show() - helps when creating the spot to see where it is
hide() - hides the hotspot
dispose() - removes the listener and the spot

PROPERTIES
spot - the actual hotSpot object that gets added to the container can be accessed with the spot property
eg. hs.spot
--*/
	zim.HotSpot = function(obj, x, y, width, height, call, local) {

		var sig = "obj, x, y, width, height, call, local";
		var duo; if (duo = zob(zim.HotSpot, arguments, sig)) return duo;

		function makeHotSpot() {
			if (zot(obj) || !obj.addChild) {zog("zim pages - HotSpot():\nPlease pass in container object for obj"); return;}
			if (obj instanceof createjs.Container == false) zog("zim build - HotSpot():\nObjects passed in should be Containers");
			if (zot(local)) local = true;
			eventType = (zim.ACTIONEVENT=="mousedown")?"mousedown":"click";

			var w = width; var h = height;
			var that = this;

			var backing = new createjs.Shape();
			var but = new createjs.Shape();

			if (!local) {
				var point = obj.globalToLocal(x,y);
				var point2 = obj.globalToLocal(x+w,y+h);
				var newW = point2.x-point.x;
				var newH = point2.y-point.y;
				backing.graphics.f("#999999").dr(point.x,point.y,newW,newH);
				but.graphics.f("#999999").dr(point.x,point.y,1,1);	 // small point
			} else {
				backing.graphics.f("#999999").dr(x,y,w,h);
				but.graphics.f("#999999").dr(x,y,1,1);
			}

			backing.alpha = .4;
			backing.mouseEnabled = false;
			but.alpha = .01;
			but.cursor = "pointer";
			this.spot = but;

			var butEvent = but.on(eventType,function(e) {
				if (typeof(call) == "function") {
					call();
				}
			});
			obj.addChild(but);
			but.hitArea = backing;
			this.show = function() {
				obj.addChild(backing);
			}
			this.hide = function() {
				obj.removeChild(backing);
			}
			this.dispose = function() {
				but.off(eventType, butEvent);
				obj.removeChild(but);
				delete but;
				return true;
			}
		}
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeHotSpot.prototype = new createjs.Container();
		makeHotSpot.prototype.constructor = zim.HotSpot;
		return new makeHotSpot();
	}


/*--
zim.dashedLinesOn = function()

adds dashedLineTo(x1, y1, x2, y2, dashLen)
and drawDashedRect(x, y, w, h, dashLen) methods to createjs Graphics
https://gist.github.com/diverted247/9216242 - Ted Patrick
--*/
	zim.dashedLinesOn = function() {
		if (zim.dashed) return; // only need to define once
		zim.dashed = true;
		createjs.Graphics.prototype.dashedLineTo = function(x1, y1, x2, y2, dashLen){
			this.moveTo(x1, y1);

			var dX = x2 - x1;
			var dY = y2 - y1;
			var dashes = Math.floor(Math.sqrt(dX*dX+dY*dY) / dashLen);
			var dashX = dX / dashes;
			var dashY = dY / dashes;

			var q = 0;
			while(q++ < dashes){
				x1 += dashX;
				y1 += dashY;
				this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x1, y1);
			}
			this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x2, y2);
			return this;
		}
		createjs.Graphics.prototype.drawDashedRect = function(x1, y1, w, h, dashLen){
			this.moveTo(x1, y1);
			var x2 = x1 + w;
			var y2 = y1 + h;
			this.dashedLineTo(x1, y1, x2, y1, dashLen);
			this.dashedLineTo(x2, y1, x2, y2, dashLen);
			this.dashedLineTo(x2, y2, x1, y2, dashLen);
			this.dashedLineTo(x1, y2, x1, y1, dashLen);
			return this;
		}
	}


/*--
zim.Manager = function()

Manager class

used internally to make GridManager and GuideManager
and in future perhaps OutlineManager
--*/
	zim.Manager = function(type) {
		if (zon && type) zog("zim pages - " + type);
		var that = this;
		this.items = [];
		this.add = function(a) {
			that.items.push(a);
		}
		this.resize = function() {
			if (!that) return;
			for (var i=0; i<that.items.length; i++) {
				if (!that.items[i].resize()) that.items.splice(i); // was disposed
			}
		}
		this.dispose = function() {
			for (var i=0; i<that.items.length; i++) {
				that.items[i].dispose();
			}
			that.items = [];
			if (zon) zog("zim pages - " + type + " - all disposed");
			that = null;
			return true;
		}
	}


/*--
zim.Guide = function(obj, vertical, percent, hideKey, pixelKey)

Guide Class

extends createjs.Container
var guide = new zim.Guide(parameters);
stage.addChild(guide);
shows a guide to help layout assets with code
cursor x and y percentage or pixels are shown along edges
as a distance from the guide
can use G key to toggle guide visibility
can use P key to toggle percent and pixels

make sure you remove the guide for your final version (dispose)

PARAMETERS: supports DUO - parameters or single object
obj - to add guide to (stage is default)
vertical - defaults to true, set to false for horizontal guide
percent - defaults to true to show percent - false to show pixels
hideKey - key to press to hide guide - default G
pixelKey - key to press to swap percent and pixels - default P

PROPERTIES
pixels - boolean - set to true to change to pixels, false to go to percent

METHODS
dispose() - clears keyboard events and guide
--*/
	zim.Guide = function(obj, vertical, percent, hideKey, pixelKey) {

		var sig = "obj, vertical, percent, hideKey, pixelKey";
		var duo; if (duo = zob(zim.Guide, arguments, sig)) return duo;

		function makeGuide() {

			if (zot(obj)) obj = "stage";
			if (zot(vertical)) vertical = true;
			if (obj != "stage" && (!obj.getBounds || !obj.getBounds())) {zog ("zim pages - Guide(): Please provide bounds for the obj (setBounds())"); return;}
			if (zot(percent)) percent = true;
			if (zot(hideKey)) hideKey = "G";
			if (zot(pixelKey)) pixelKey = "P";

			var that = this;
			var stage;
			var stageEvent;
			zim.dashedLinesOn();

			// make text boxes that show x and y
			var boxW = 80;
			var boxH = 26;
			var minX = boxW/6+boxW/2;
			var minY = boxH*2
			var maxX; // set max values once we get a stage
			var maxY;

			var box;
			if (vertical) {
				box = makeBox("#00c5af", "white", "white");
				box.shape.regX = boxW+boxW/6; box.shape.regY = boxH/2;
				box.label.x = -boxW/2-boxW/6;
			} else {
				box = makeBox("#d61fa0", "white", "white");
				box.shape.regX = boxW/2; box.shape.regY = boxH + boxH/4;
				box.label.y = -boxH*3/4;
			}

			function makeBox(fill, stroke, textColor) {
				var box = new createjs.Container();
				box.shape = new createjs.Shape();
				box.shape.graphics.s(stroke).ss(1).f(fill).r(0,0,boxW,boxH);
				box.shape.alpha = .9;
				box.addChild(box.shape);
				box.label = new createjs.Text("10", "16px verdana", textColor);
				box.label.textAlign = "center";
				box.label.textBaseline = "middle";
				box.addChild(box.label);
				box.mouseChildren = false;
				box.mouseEnabled = false;
				return box;
			}

			// get stage and apply stagemousemove to move text boxes
			// the added event was added in the 2014 createjs
			// found the added did not reliably get a stage property
			// still had to wait a few microseconds
			// so resorting to interval
			// this.on("added", added);
			var addedInterval = setInterval(function() {
				if (obj == "stage") {
					if (that && that.getStage()) {
						added();
					}
				} else {
					if (obj && obj.getStage()) {
						added();
					}
				}
			},100);

			var guideCheck = false;
			var objW;
			var objH;
			var line;
			var dragBounds;
			function added() {
				clearInterval(addedInterval);
				if (obj == "stage") {
					stage =	that.getStage();
					obj = stage;
				} else {
					stage =	obj.getStage();
				}
				objW = obj.getBounds().width;
				objH = obj.getBounds().height;
				if (vertical) {
					box.y = objH/2;
					box.label.text = "y:" + ((that.pixels) ? Math.round(objW*70/100) : "70%");


				} else {
					box.x = objW/2;
					box.label.text = "x:" + ((that.pixels) ? Math.round(objH*70/100) : "70%");
				}
				line = new createjs.Shape();
				that.addChild(line);
				(vertical) ? line.x = objW*.7 : line.y = objH*.7;

				if (!guideCheck) {
					obj.addChild(that);
					drawGuide();
				}
				stage.off("stagemousemove", stageEvent);
				stageEvent = stage.on("stagemousemove", where);
				stage.update();
			};

			var lastPoint = {x:0,y:0};
			function where(e) {
				// convert mouse location to local point
				var point; var diff;
				if (e) {
					point = obj.globalToLocal(e.rawX, e.rawY);
					lastPoint = point;
				} else {
					point = {x:lastPoint.x, y:lastPoint.y}
				}
				if (!percent) {	// pixels
					if (vertical) {
						diff = Math.round(Math.abs(point.x-line.x));
						box.label.text = "x:" + Math.max(0, Math.min(diff, Math.round(objW)));
						box.y = Math.max(minY, Math.min(point.y, maxY));
					} else {
						diff = Math.round(Math.abs(point.y-line.y));
						box.label.text = "y:" + Math.max(0, Math.min(diff, Math.round(objH)));
						box.x = Math.max(minX, Math.min(point.x, maxX));
					}
				} else {
					if (vertical) {
						diff = Math.round(Math.abs(point.x-line.x)/objW*100);
						box.label.text = "x:" + Math.max(0, Math.min(diff, 100)) + "%";
						box.y = Math.max(minY, Math.min(point.y, maxY));
					} else {
						diff = Math.round(Math.abs(point.y-line.y)/objH*100);
						box.label.text = "y:" + Math.max(0, Math.min(diff, 100)) + "%";
						box.x = Math.max(minX, Math.min(point.x, maxX));
					}
				}
				if (stage) stage.update();
			}

			// make the guide once we have the stage
			// and any time resize is called
			function drawGuide() {
				guideCheck = true;
				objW = obj.getBounds().width;
				objH = obj.getBounds().height;
				var pointer;
				if (vertical) {
					pointer = "ew-resize";
					dragBounds = new createjs.Rectangle(0,0,objW,0);
				} else {
					pointer = "ns-resize";
					dragBounds = new createjs.Rectangle(0,0,0,objH);
				}
				zim.noDrag(line);
				setTimeout(function() {
					// give time for content to settle
					zim.drag(line, dragBounds, pointer, pointer, null, null, true);
				}, 500);
				stage.mouseMoveOutside = true;
				stage.enableMouseOver(10);

				maxX = objW-boxW*2/3;
				maxY = objH-boxH - boxH;
				line.uncache();
				var g = line.graphics;
				if (vertical) {
					g.c().s("rgba(0,255,255,.1)").ss(20).mt(0,0).lt(0,objH);
					g.f().s("white").ss(2).mt(0,0).lt(0,objH);
					g.s("#00c5af").ss(2).dashedLineTo(0,0,0,objH,20);
					line.cache(-10,0,20,objH);
				} else {
					g.c().s("rgba(255,0,255,.1)").ss(20).mt(0,0).lt(objW,0);
					g.f().s("white").ss(2).mt(0,0).lt(objW, 0);
					g.s("#d61fa0").ss(2).dashedLineTo(0,0,objW,0,20);


					line.cache(0,-10,objW,20);
				}

				(vertical) ?  box.x = objW : box.y = objH;
				that.addChild(box);

			}

			Object.defineProperty(this, 'pixels', {
				get: function() {
					return !percent;
				},
				set: function(value) {
					percent = !value;
					that.resize();
				}
			});

			// add key listener to hide and show the guide
			window.addEventListener("keydown", keyEvent);

			function keyEvent(e) {
				if (!e) e=event;
				if (!stage) return;
				if (String.fromCharCode(e.keyCode) == hideKey.toUpperCase()) { // G
					that.visible = !that.visible;
					stage.off("stagemousemove", stageEvent);
					if (that.visible) {
						stageEvent = stage.on("stagemousemove", where, that);
					}
					stage.update();
				}
				if (String.fromCharCode(e.keyCode) == pixelKey.toUpperCase()) { // P
					that.pixels = !that.pixels;
				}
			}

			this.resize = function() {
				if (!that) return false;
				if (stage) {
					drawGuide();
					where();
				}
				return true;
			}

			this.dispose = function() {
				if (!that) return false;
				zim.noDrag(line);
				clearInterval(addedInterval);
				that.removeAllChildren();
				window.removeEventListener("keydown", keyEvent);
				if (that.parent) that.parent.removeChild(that);
				that = null;
				return true;
			}
		}
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeGuide.prototype = new createjs.Container();
		makeGuide.prototype.constructor = zim.Guide;
		return new makeGuide();
	}


/*--
zim.GuideManager = function()

GuideManager class
extends the ZIM Manager abstract class
add Zim Guide objects and update or remove all guides at once
guides are handy to use but perhaps annoying to update and remove if you have many
GuideManager keeps track of the guides and lets you update or dispose of them on command

PROPERTIES
items - an array of all Guide objects added with add()

METHODS
add(guide) - registers a guide with the GuideManager
resize() - resizes all the guides in the GuideManager (ie. if stage changes)
dispose() - disposes all guides and the GuideManager

note: to just hide guides, you use the G key
and to toggle percent and pixels use the P key
you can dispose guides individually or use this class to dispose all
disposing will remove the G, P key listener and the guide
--*/
	zim.GuideManager = function() {
		zim.Manager.call(this, "GuideManager");
	}
	zim.GuideManager.prototype = new zim.Manager();
	zim.GuideManager.prototype.constructor = zim.GuideManager;


/*--
zim.Grid = function(obj, color, percent, hideKey, pixelKey)

Grid Class

extends createjs.Container
var grid = new zim.Grid(parameters);
stage.addChild(grid);
shows a grid to help layout assets with code (percent is default)
cursor x and y percentage or pixels are shown along edges
can use G key to toggle grid visibility
can use P key to toggle percent and pixels

make sure you remove the grid for your final version (dispose)

PARAMETERS: supports DUO - parameters or single object
obj - to add grid to (stage is default)
color - defaults to black
percent - defaults to true to show percent - false to show pixels
hideKey - key to press to hide grid - default G
pixelKey - key to press to swap percent and pixels - default P

PROPERTIES
pixels - boolean - set to true to change to pixels, false to go to percent

METHODS
dispose() - clears keyboard events and grid
--*/
	zim.Grid = function(obj, color, percent, hideKey, pixelKey) {

		var sig = "obj, color, percent, hideKey, pixelKey";
		var duo; if (duo = zob(zim.Grid, arguments, sig)) return duo;

		function makeGrid() {

			if (zot(obj)) obj = "stage";
			if (zot(color)) color = "black";
			if (obj != "stage" && (!obj.getBounds || !obj.getBounds())) {zog ("zim pages - Grid(): Please provide bounds for the obj (setBounds())"); return;}
			if (zot(percent)) percent = true;
			if (zot(hideKey)) hideKey = "G";
			if (zot(pixelKey)) pixelKey = "P";

			var that = this;
			var stage;
			var pixels = 10; // for grid
			var stageEvent;


			this.mouseChildren = false;
			this.mouseEnabled = false;

			// make text boxes that show x and y
			var boxW = 80;
			var boxH = 26;

			var top = makeBox("#dddddd", color, "#333333");
			top.shape.regX = boxW/2; top.shape.regY = -boxH/4;
			top.label.y = boxH*3/4;

			var left = makeBox("#dddddd", color, "#333333");
			left.shape.regX = -boxW/6; left.shape.regY = boxH/2;
			left.label.x = boxW/2 + boxW/6;

			function makeBox(fill, stroke, textColor) {
				var box = new createjs.Container();
				box.shape = new createjs.Shape();
				box.shape.graphics.s(stroke).ss(1).f(fill).r(0,0,boxW,boxH);
				box.shape.alpha = .9;
				box.addChild(box.shape);
				box.label = new createjs.Text("10", "16px verdana", textColor);
				box.label.textAlign = "center";
				box.label.textBaseline = "middle";
				box.addChild(box.label);
				box.mouseChildren = false;
				box.mouseEnabled = false;
				return box;
			}

			var minX = boxW/6+boxW/2;
			var minY = boxH*2
			var maxX; // set max values once we get a stage
			var maxY;

			top.x = minX;
			left.y = minY;
			top.label.text = "x:0";
			left.label.text = "y:0";


			// get stage and apply stagemousemove to move text boxes
			// the added event was added in the 2014 createjs
			// found the added did not reliably get a stage property
			// still had to wait a few microseconds
			// so resorting to interval
			// this.on("added", added);
			var addedInterval = setInterval(function() {
				if (obj == "stage") {
					if (that && that.getStage()) {
						added();
					}
				} else {
					if (obj && obj.getStage()) {
						added();
					}

				}
			},100);

			var gridCheck = false;
			function added() {
				clearInterval(addedInterval);
				if (obj == "stage") {
					stage =	that.getStage();
					obj = stage;
				} else {
					stage =	obj.getStage();
				}
				if (!gridCheck) {
					drawGrid();
					obj.addChild(that);
				}
				stage.off("stagemousemove", stageEvent);
				stageEvent = stage.on("stagemousemove", where);
				stage.update();
			};

			var lastPoint = {x:0,y:0};
			function where(e) {
				// convert mouse location to local point
				var point;
				if (e) {
					point = obj.globalToLocal(e.rawX, e.rawY);
					lastPoint = point;
				} else {
					point = {x:lastPoint.x, y:lastPoint.y}
				}
				if (!percent) {	// pixels
					top.label.text = "x:" + Math.max(0, Math.min(Math.round(point.x), Math.round(objW)));
					top.x = Math.max(minX, Math.min(point.x, maxX));
					left.label.text = "y:" + Math.max(0, Math.min(Math.round(point.y), Math.round(objH)));
					left.y = Math.max(minY, Math.min(point.y, maxY));
				} else {
					top.label.text = "x:" + Math.max(0, Math.min(Math.round(point.x/objW*100), 100)) + "%";
					top.x = Math.max(minX, Math.min(point.x, maxX));
					left.label.text = "y:" + Math.max(0, Math.min(Math.round(point.y/objH*100), 100)) + "%";
					left.y = Math.max(minY, Math.min(point.y, maxY));
				}
				if (stage) stage.update();
			}

			// make the grid once we have the stage
			var objW;
			var objH;
			var cached;
			function drawGrid() {
				gridCheck = true;

				objW = obj.getBounds().width;
				objH = obj.getBounds().height;
				stage.mouseMoveOutside = true;
				stage.enableMouseOver(10);

				maxX = objW-boxW*2/3;
				maxY = objH-boxH - boxH;

				cached = new createjs.Container();
				that.addChild(cached);
				var grid = new createjs.Shape();
				cached.addChild(grid);
				var g = grid.graphics;
				g.s(color).ss(1);

				var grid2 = new createjs.Shape();
				cached.addChild(grid2);


				if (!percent) { // pixels

					for (var i=0; i<objW/pixels; i++) {
						g.mt(i*pixels, 0).lt(i*pixels, objH);
					}
					for (var i=0; i<objH/pixels; i++) {
						g.mt(0, i*pixels).lt(objW, i*pixels);
					}
					grid.alpha = .3;

					g = grid2.graphics;
					g.s(color).ss(1);

					for (var i=0; i<objW/(pixels*10); i++) {
						g.mt(i*(pixels*10), 0).lt(i*(pixels*10), objH);
					}
					for (var i=0; i<objH/(pixels*10); i++) {
						g.mt(0, i*(pixels*10)).lt(objW, i*(pixels*10));
					}

				} else { // percent - every 5 percent

					for (var i=1; i<20+2; i++) {
						g.mt(i*objW/20, 0).lt(i*objW/20, objH);
					}
					for (var i=1; i<20; i++) {
						g.mt(0, i*objH/20).lt(objW, i*objH/20);
					}
					grid.alpha = .3;

					g = grid2.graphics;
					g.s(color).ss(1);

					for (var i=1; i<10; i++) {
						g.mt(i*objW/10, 0).lt(i*objW/10, objH);
					}
					for (var i=1; i<10; i++) {
						g.mt(0, i*objH/10).lt(objW, i*objH/10);
					}
				}

				var crossSize = 80;
				g.s("#FFFFFF").ss(8);
				g.mt(objW/2, objH/2-crossSize/2).lt(objW/2, objH/2+crossSize/2);
				g.mt(objW/2-crossSize/2, objH/2).lt(objW/2+crossSize/2, objH/2);

				g.s("#000000").ss(4);
				g.mt(objW/2, objH/2-crossSize/2).lt(objW/2, objH/2+crossSize/2);
				g.mt(objW/2-crossSize/2, objH/2).lt(objW/2+crossSize/2, objH/2);

				// draw a border
				g.s(color).ss(3);
				g.dr(0,0,objW,objH);

				grid2.alpha = .5;
				cached.cache(0,0,objW,objH);

				that.addChild(top);
				that.addChild(left);

				stage.update();
			}

			Object.defineProperty(this, 'pixels', {
				get: function() {
					return !percent;
				},
				set: function(value) {
					percent = !value;
					that.resize();
				}
			});

			// add key listener to hide and show the grid
			window.addEventListener("keydown", keyEvent);

			function keyEvent(e) {
				if (!e) e=event;
				if (!stage) return;
				if (String.fromCharCode(e.keyCode) == hideKey.toUpperCase()) { // G
					that.visible = !that.visible;
					stage.off("stagemousemove", stageEvent);
					if (that.visible) {
						stageEvent = stage.on("stagemousemove", where, that);
					}
					stage.update();
				}
				if (String.fromCharCode(e.keyCode) == pixelKey.toUpperCase()) { // P
					that.removeChild(cached);
					cached = null;
					that.pixels = !that.pixels;
				}
			}

			this.resize = function() {
				if (!that) return false;
				that.removeChild(cached);
				cached = null;
				if (stage) {
					drawGrid();
					where();
					setTimeout(function(){ // solve ipod bug
						that.removeChild(cached);
						cached = null;
						drawGrid();
					},200);
				}
				return true;
			}

			this.dispose = function() {
				clearInterval(addedInterval);
				that.removeAllChildren();
				window.removeEventListener("keydown", keyEvent);
				if (that.parent) that.parent.removeChild(that);
				that = null;
				return true;
			}

		}
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeGrid.prototype = new createjs.Container();
		makeGrid.prototype.constructor = zim.Grid;
		return new makeGrid();
	}


/*--
zim.GridManager = function()

GridManager class
add Zim Grid objects and update or remove all grids at once
grids are handy to use but perhaps annoying to update and remove if you have many
GridManager keeps track of the grids and lets you update or dispose of them on command

PROPERTIES
items - an array of all Grid objects added with add()

METHODS
add(grid) - registers a grid with the GridManager
resize() - resizes all the grids in the GridManager (ie. if stage changes)
dispose() - disposes all grids and the GridManager

note: to just hide grids, you use the G key
and to toggle percent and pixels use the P key
you can dispose grids individually or use this class to dispose all
disposing will remove the G key listener and the grid
--*/
	zim.GridManager = function() {
		zim.Manager.call(this, "GridManager");
	}
	zim.GridManager.prototype = new zim.Manager();
	zim.GridManager.prototype.constructor = zim.GridManager;


/*--
zim.Layout = function(holder, regions, lastMargin, backgroundColor, vertical, regionShape, scalingObject, hideKey)

Layout class

extends a createjs.EventDispatcher so it can dispatch events
arranges objects on the page by fitting them in regions
make a layout object for each page if desired
and even nest layout objects inside regions
fixed aspect ratio content is fit into regions
good for flexive design where you anchor titles and navigation
handles any number of regions vertically or horizontally
var layout = zim.Layout(parameters)

PARAMETERS: supports DUO - parameters or single object
the holder object (stage, container, etc) that must have bounds set
the bounds will constrain the layout
an array of region objects with specific properties for each
example - with all dimensions as percents

Example VERTICAL region objects
[ {object:title, marginTop:10, maxWidth:80, minHeight:20, align:"left", valign:"top"},
{object:content, marginTop:5, maxWidth:90}, // note, middle gets no minHeight
{object:nav, marginTop:5, maxWidth:80, height:20, backgroundColor:"red"} ]
note: no minHeight for middle regions - but heights on any region
align defaults to middle for the regions
valign defaults to top and bottom for the top and bottom region and middle for the others
backgroundColor applies a backing color to the region

Example HORIZONTAL region objects
{object:col1, marginLeft:10, maxHeight:80, width:20, valign:"bottom"},
{object:col2, marginLeft:5, maxHeight:90, align:"middle"}, // note, middle gets no minWidth
{object:col3, marginLeft:5, maxHeight:80, minWidth:20, align:"left", valign:"top"},
align defaults to left and right for the outer regions and middle for the inside regions
valign defaults to top for all the regions

PARAMETERS CONT'D
lastMargin - the margin at the bottom (vertical) or at the right (horizontal) defaults to 0
backgroundColor - for the whole holder - defaults to ""
vertical - boolean defaults to true for vertical layout (set to false for horizontal)
regionShape - a createjs Shape object to show where bounds are (optional) (added to holder)
can toggle on and off with B key - but must pass in the Shape to use the B key
scalingTarget - an object used as the bounds of the region scaling
setting a scalingTarget will also set the bounds of the holder to the scalingTarget bounds
it does not scale the holder - only scales the region objects inside
hideKey is the hot key for hiding and showing the bounds - default B

PROPERTIES
regions - the regions object - if changed will have to call resize() manually

METHODS
resize() - resize based on new bounds of the holder (or scalingObject)
dispose() - removes the B key listener (otherwise, nothing to dispose)
addShape(shape) - adds a bounding shape dynamically
removeShape() - permanently removes the bounding shape
disable() - disables all the layout (shape and sizing)
enable() - enables all the layout (shape and sizing)
if you want to get rid of the objects then you need to do so in your app

DESCRIPTION OF FLEXIVE DESIGN
here described with vertical layout - horizontal is similar but rotated 90
the content in the middle will try and expand against the top and bottom
until it forces the top and bottom to their minimum percents
if the content hits its maximum width percent first then the top and bottom
will fill up the rest of the height until they reach their maximum widths
--*/
	zim.Layout = function(holder, regions, lastMargin, backgroundColor, vertical, regionShape, scalingObject, hideKey) {

		var sig = "holder, regions, lastMargin, backgroundColor, vertical, regionShape, scalingObject, hideKey";
		var duo; if (duo = zob(zim.Layout, arguments, sig)) return duo;

		function makeLayout() {
			if (zot(holder) || !holder.getBounds) {zog ("zim pages - Layout(): please provide an object with bounds set that holds the objects being laid out"); return;}
			scalingObject = (zot(scalingObject)) ? holder : scalingObject;
			if (!scalingObject.getBounds || !scalingObject.getBounds()) {zog ("zim pages - Layout(): holder must have bounds set or provide a scalingObject with bounds"); return;}
			var bounds = scalingObject.getBounds();
			holder.setBounds(0,0,bounds.width,bounds.height);
			// note, Layout sets bounds of holder but does not scale the holder - only the objects in regions
			// it may be that the holder is scaled by some external process
			// but probably not if a scalingObject is used

			if (zot(lastMargin)) lastMargin = 0;
			if (zot(vertical)) vertical = true;
			if (zot(backgroundColor)) backgroundColor = "";
			if (zot(hideKey)) hideKey = "B";
			zim.dashedLinesOn(); // turns on dashed lines for bounds
			var backing = new createjs.Shape(); // holds any backing colors
			var that = this;
			this.active = true;

			// loop through region objects and assign defaults
			// also check that regions can fit with values given
			// we basically do the same thing with horizontal and vertical layouts
			// but obviously one uses widths and the other heights, etc.
			// so adapted generic phrases of PRIMARY and SECONDARY
			// primary for vertical is in the Y direction and uses height and top
			// primary for horizontal is in the X direction and uses width and left
			// secondary for vertical is X and for horizontal is Y
			// min, absolute and margin values are only available in the primary
			// max values are only available in the secondary
			// align, valign and backgroundcolor is available for primary and secondary
			// absolute values (height, width) are to be used if given
			// if not given we try to maximize size and to adhere to min values
			// as calculations progress we calculate given, maxGiven and marginGiven values
			// these are temporary depending on the resizing and are always in the primary direction
			// secondary direction is quite simple
			// primary direction is quite complex involving a number of steps and even some recursion

			this.regions = regions; // expose the regions object for dynamic adjustments then manual resize

			var r; // used to hold a region in a loop
			var totalAbsolute = 0;
			var minPrimary = "minWidth";
			var primary = "width";
			var secondary = "height";
			var marginPrimary = "marginLeft";
			var maxSecondary = "maxHeight";
			var axisPrimary = "x";
			var axisSecondary = "y";
			if (vertical) {
				minPrimary = "minHeight";
				primary = "height";
				secondary = "width";
				marginPrimary = "marginTop";
				maxSecondary = "maxWidth";
				axisPrimary = "y";
				axisSecondary = "x";
			}
			for (var i=0; i<regions.length; i++) {
				r = regions[i];
				if (!r.object || !r.object.getBounds()) {zog("zim pages - Layout(): each region object must have an object with setBounds() set"); return;}
				if (!r[minPrimary]) r[minPrimary] = 0;
				if (!r[primary]) r[primary] = 0;
				if (!r.backgroundColor) r.backgroundColor = "";
				r.given = 0;
				r.maxGiven = 0;
				if (!r[marginPrimary]) r[marginPrimary] = 0;
				if (!r[maxSecondary]) r[maxSecondary] = 100;
				if (vertical) {
					// default alignment differs for orientation
					if (!r.align) r.align = "middle";
					if (!r.valign) {
						if (i==0) {r.valign = "top";}
						else if (i==regions.length-1) {r.valign = "bottom";}
						else {r.valign = "middle";}
						if (regions.length == 1) {r.valign = "middle"}
					}
				} else {
					if (!r.valign) r.valign = "top";
					if (!r.align) {
						if (i==0) {r.align = "left";}
						else if (i==regions.length-1) {r.align = "right";}
						else {r.align = "middle";}
						if (regions.length == 1) {r.align = "middle"}
					}
				}
				if (r[primary]) r[minPrimary] = 0; // primary overrides minPrimary
				totalAbsolute += r[primary] + r[marginPrimary];
			}

			// primaries (not minPrimaries) are absolute percentage and are kept no matter what
			// margins are absolute percentage and are kept no matter what
			// check if primaries and margins are more than 100%
			totalAbsolute += lastMargin;
			if (totalAbsolute > 100) {zog("zim pages - Layout(): cannot fit regions into 100% bounds"); return;}
			var leftOverPrimary = 100-totalAbsolute;

			distribute(); // also called from within resize function
			function distribute() {
				// distribute leftOverPrimary to any regions without a primary or a given (primary)
				// proportion based on primary dimension of objects in regions
				// apply this primary to given (primary)
				var totalPrimaries = 0;
				for (var i=0; i<regions.length; i++) {
					r = regions[i];
					r.given = 0;
					if (r[primary] == 0) totalPrimaries += r.object.getBounds()[primary];
				}
				// now we know total raw heights of objects needing height applied
				// loop back through and give these objects their proportion of what is left
				for (var i=0; i<regions.length; i++) {
					r = regions[i];
					if (r[primary] == 0) r.given = r.object.getBounds()[primary] / totalPrimaries * leftOverPrimary;
				}
			}

			this.resize = function() {
				if (!that.active) return;
				bounds = scalingObject.getBounds();
				holder.setBounds(0,0,bounds.width,bounds.height);
				backing.graphics.clear();
				if (backgroundColor!="") backing.graphics.f(backgroundColor).r(0,0,bounds.width,bounds.height);

				for (var i=0; i<regions.length; i++) {
					r = regions[i];
					r.maxGiven = 0;
					r.marginGiven = 0;
				}
				// all the primaries are applied
				// but some objects might not need the primary because they have maxed out on maxSecondary
				// we need to give this extra primary back to the pool
				// and keep doing it until there are no more maxed objects

				var keepGoing = true; var allCheck; var giveBack;
				var p; var s; var boundsP; var boundsS; var maxGiven;
				var leftOverPrimary2 = leftOverPrimary;
				while (keepGoing) {
					// check for objects maxed in width
					giveBack = 0;
					keepGoing = false; allCheck = true;
					// we want to keep going unless all objects are maxed
					// or none of the objects are maxed
					for (var i=0; i<regions.length; i++) {
						r = regions[i];
						if (r.given > 0 && r.maxGiven == 0) {
							p = r.object.getBounds()[primary];
							s = r.object.getBounds()[secondary];
							boundsP =  r.given * bounds[primary]/100;
							boundsS =  r[maxSecondary] * bounds[secondary]/100; // convert to pixels
							maxGiven = s/p*boundsP;
							if (maxGiven > boundsS) {
								// maxed out so give back height
								keepGoing=true;
								// store this as maxGiven property
								// might have to take it away if later minHeights are not met
								r.maxGiven = p/s*boundsS * 100/bounds[primary]; // convert back to percentage
								giveBack += r.given - r.maxGiven;
								leftOverPrimary2 -= r.maxGiven;
							} else {
								allCheck = false;
							}
						}
					}

					if (!keepGoing) break;
					if (allCheck) break;

					// redistribute the extra stuff too all that are not maxed out and not with primary values
					// proportion based on primary dimension of objects in regions
					// apply this primary to given (primary)
					totalPrimaries = 0;
					for (var i=0; i<regions.length; i++) {
						r = regions[i];
						if (r[primary] == 0 && r.maxGiven == 0) totalPrimaries += r.object.getBounds()[primary];
					}
					// now we know total raw heights of objects needing height applied
					// loop back through and give these objects their proportion of what is left
					for (var i=0; i<regions.length; i++) {
						r = regions[i];
						if (r[primary] == 0 && r.maxGiven == 0) r.given = r.object.getBounds()[primary] / totalPrimaries * leftOverPrimary2;
					}
				}

				// if end regions have not met their minPrimaries
				// set those minPrimaries to primaries and resize again
				// divide leftover primary to regions with no set primary
				// maximize middle regions as this is usually content
				// if the edge regions have minPrimaries set them to minPrimary
				// if they do not have minPrimaries then proportion them equally with the rest

				var scaleCheck = true;
				r = regions[0];
				if (r.maxGiven > 0) {
					 if (r.maxGiven < r[minPrimary]) {r[primary] = r[minPrimary]; scaleCheck = false;}
				} else if (r.given > 0) {
					 if (r.given < r[minPrimary]) {r[primary] = r[minPrimary]; scaleCheck = false;}
				}
				r = regions[regions.length-1];
				if (r.maxGiven > 0) {
					 if (r.maxGiven < r[minPrimary]) {r[primary] = r[minPrimary]; scaleCheck = false;}
				} else if (r.given > 0) {
					 if (r.given < r[minPrimary]) {r[primary] = r[minPrimary]; scaleCheck = false;}
				}
				if (!scaleCheck) {
					// recalculate leftOverPrimary
					totalAbsolute = 0;
					for (var i=0; i<regions.length; i++) {
						r = regions[i];
						totalAbsolute += r[primary] + r[marginPrimary];
					}
					totalAbsolute += lastMargin;
					if (totalAbsolute > 100) {zog("zim build - Layout(): cannot fit regions into 100% bounds"); return;}

					leftOverPrimary = 100-totalAbsolute;
					distribute();
					that.resize();
					return;
				}


				// if specified all primaries or all maxed in secondary
				// then distribute based on inner margins
				// watch out - may need to revert to original margins if page is resized
				// so introduce a new marginGiven property

				var allHeights = true; var marginTotal = 0; var primaryTotal = 0;
				for (var i=0; i<regions.length; i++) {
					r = regions[i];
					marginTotal += r[marginPrimary];
					if (r[primary] > 0) primaryTotal += r[primary];
					else if (r.maxGiven > 0) primaryTotal += r.maxGiven;
					else if (r.given > 0) primaryTotal += r.given;
					if (r[primary] == 0) {
						allHeights = false;
					}
				}
				if (allHeights || allCheck) {
					marginTotal += lastMargin;
					var extra = 100-primaryTotal-marginTotal;
					// remove two outer margins
					marginTotal -= (lastMargin + regions[0][marginPrimary]);
					if (extra != 0 && marginTotal != 0) { // divide up extra margin space
						for (var i=0; i<regions.length; i++) {
							if (i==0) continue;
							r = regions[i];
							r.marginGiven = r[marginPrimary]/marginTotal*(marginTotal+extra);
						}
					}
				}

				// ready to fit objects into regions, align and draw any bounds and background colors
				var pPos=0; // primary position (x for horizontal, y for vertical)
				var sPos=0; // secondary position
				var p;  	// primary dimension (width for horizontal, height for vertical)
				var s;		// secondary dimension
				var f; 		// fit variable will receive a handy object with new data and original region bounds data
							// {x:obj.x, y:obj.y, width:newW, height:newH, scale:scale, bX:left, bY:top, bWidth:width, bHeight:height}

				var addedW; var addedH;	// just a little offscreen coloring to help page transitions
				if (regionShape && regionShape.graphics) {
					var g = regionShape.graphics;
					g.c();
				}
				for (var i=0; i<regions.length; i++) {
					r = regions[i];

					// calculate primary data
					if (r.marginGiven > 0) pPos += r.marginGiven * bounds[primary]/100; // convert to pixels
					else pPos += r[marginPrimary] * bounds[primary]/100;
					if (r[primary] > 0) {p = r[primary];}
					else if (r.maxGiven > 0) {p = r.maxGiven;}
					else if (r.given > 0) {p = r.given;}
					else {p = 0;}
					p = p * bounds[primary]/100;

					// calculate secondary data
					s = r[maxSecondary] * bounds[secondary]/100;
					sPos = (bounds[secondary]-s)/2;

					// fit the objects into the region, align and draw any regionShape
					// this is slightly different for different orientations
					if (vertical) f = zim.fit(r.object,sPos,pPos,s,p);
					else f = zim.fit(r.object,pPos,sPos,p,s);

					// handle alignment
					if (r.valign == "top") r.object.y = f.bY;
					else if (r.valign == "bottom") r.object.y = f.bY+f.bHeight-f.height;
					if (r.align == "left") r.object.x = f.bX;
					else if (r.align == "right") r.object.x = f.bX+f.bWidth-f.width;
					if (regionShape && regionShape.graphics) {
						g.s("white").ss(2).r(f.bX,f.bY,f.bWidth,f.bHeight);
						g.s("#ff8203").ss(2).drawDashedRect(f.bX,f.bY,f.bWidth,f.bHeight,20);
					}

					// draw any backing colors for region
					// transitions in ZIM Pages need a little extra overlap on page edges
					addedH = addedW = 0;
					if (pPos == 0 || (pPos+p) == bounds[primary]) if (vertical) {addedH=1} else {addedW=1};
					if (s == bounds[secondary]) if (vertical) {addedW=1} else {addedH=1};
					if (r.backgroundColor != "") backing.graphics.f(r.backgroundColor).r(f.bX, f.bY, f.bWidth+addedW, f.bHeight+addedH);

					// increase our primary position
					pPos += p;
				}
			}

			this.resize();

			// add regionShape if there is one and backing shape
			if (regionShape) holder.addChild(regionShape);
			holder.addChildAt(backing,0);

			// key listener and other methods:

			// add key listener to hide and show the bounds
			window.addEventListener("keydown", keyEvent);
			function keyEvent(e) {
				if (!e) e=event;

				if (regionShape) {
					if (String.fromCharCode(e.keyCode) == hideKey.toUpperCase()) { // B
						regionShape.visible = !regionShape.visible;
						if (regionShape.getStage()) regionShape.getStage().update();
					}
				}
			}

			this.disable = function() {
				that.active = false;
				window.removeEventListener("keydown", keyEvent);
				if (regionShape) regionShape.alpha = 0;
			}

			this.enable = function() {
				that.active = true;
				window.addEventListener("keydown", keyEvent);
				that.resize();
				if (regionShape) regionShape.alpha = 1;
			}

			this.removeShape = function() { // use for final app
				if (regionShape) {
					regionShape.graphics.clear();
					holder.removeChild(regionShape);
					regionShape = null;
					regionShape = false;
				}
				window.removeEventListener("keydown", keyEvent);
			}

			this.addShape = function(shape, target) {
				that.removeShape();
				regionShape = shape;
				window.addEventListener("keydown", keyEvent);
				holder.addChild(regionShape);
				that.resize();
			}

			this.dispose = function() {
				// does not really dispose incase a resize is needed
				// it has no events aside from the keydown
				// which gets removed when we removeShape below
				that.removeShape();
				return true;
			}


		}
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeLayout.prototype = new createjs.EventDispatcher();
		makeLayout.prototype.constructor = zim.Layout;
		return new makeLayout();
	}


/*--
zim.LayoutManager = function()

LayoutManager class

add Zim Layout objects and update them all at once
also can remove all layout region bound shapes at once
as well as remove the B key to show the region bound shapes
for a final project, call the dispose()
this will remove all shapes and key events
the layouts will remain in place to handle multiple screen sizes

PROPERTIES
items - an array of all Layout objects added with add()

METHODS
add(layout) - registers a layout with the LayoutManager
resize() - resizes all the layouts in the LayoutManager
disable() - disables all the layouts in the LayoutManager (shapes and sizing)
enable() - enables all the layouts in the LayoutManager (shapes and sizing)
dispose() - only removes bounds shapes and keyboard events (does not really dispose)

note: to just hide bounds, you use the B key
--*/
	zim.LayoutManager = function() {
		if (zon) zog("zim pages - LayoutManager");
		var that = this;
		this.items = [];
		this.add = function(layout) {
			that.items.push(layout);
		}
		this.resize = function() {
			for (var i=0; i<that.items.length; i++) {
				that.items[i].resize();
			}
		}
		this.disable = function() {
			for (var i=0; i<that.items.length; i++) {
				that.items[i].disable();
			}
		}
		this.enable = function() {
			for (var i=0; i<that.items.length; i++) {
				that.items[i].enable();
			}
		}

		this.dispose = function() {
			for (var i=0; i<that.items.length; i++) {
				that.items[i].removeShape(); // also removes key events
			}
			return true;
		}
	}

	return zim;
} (zim || {});


////////////////  ZIM FRAME  //////////////

// zimframe.js provides code to help you set up your coding environment

var zim = function(zim) {

	if (zon) zog("ZIM FRAME Module");

/*--
zim.Frame = function(scaling, width, height, rollover, touch, scrollTop)

Frame class

extends a createjs EventDispatcher
var frame = new zim.Frame(parameters);
creates your canvas and stage
Frame lets you decide how you want your stage to scale
It also provides events for resizing and orientation change
as well as a way to remake the canvas if necessary

PARAMETERS: supports DUO - parameters or single object
scaling can have values as follows with full being the default
"none"		sets canvas and stage to dimensions and does not scale if window changes
"fit"		sets canvas and stage to dimensions and scales to fit inside window size
"outside"	sets canvas and stage to dimensions and scales to fit outside window size
"full"		sets canvas and stage to window size (canvas is actually set to screen size)
width and height - will set both the exact canvas and stage size when scaling is set to none
they will set the stage width and height when set to fit or outside (the canvas is then scaled)
this is handy because all your dimensions are set to start
width and height are ignored when scaling is set to full as these are set to the window width and height
rollover - activates rollovers and is set to true by default
touch - activates touch on mobile and is set to true by default
scrollTop - activates scrolling on older apple devices to hide the url bar and defaults to true

PROPERTIES
stage - read only reference to the createjs stage - to change run remakeCanvas()
width - read only reference to the stage width - to change run remakeCanvas()
height - read only reference to the stage height - to change run remakeCanvas()
orientation - "vertical" or "horizontal" (updated live with orientation change)
zil - reference to zil events that stop canvas from shifting
colors: orange, green, pink, blue, brown, silver, tin, grey, lighter, light, dark, darker, purple

METHODS
remakeCanvas(width, height) - removes old canvas and makes a new one and a new stage
will have to set your local stage, stageW and stageH variables again
loadAssets([file, file], path) - pass in an array of images or sounds then an optional path to directory
asset(file) - access a loaded asset based on file string (not including path)
if the asset is a sound then use asset(file).play(); // returns createjs sound instance
makeCircles(radius) - returns a createjs.Shape with the ZIM Circles (centered reg)
dispose() - only removes canvas, resize listener and stage

EVENTS
"ready" - fired when the stage is made
"progress" - fires constantly as assets are loaded with loadAssets() to represent overall load progress
"assetload" - fired when an asset loaded with loadAssets() has loaded (use asset property of event object)
"complete" - fired when all assets loaded with loadAssets() are loaded (then use frame.asset())
"error" - fired when there is a problem loading an asset with loadAssets()
"resize" - fired on resize of screen
"orientation" - fired on orientation change

--*/
	zim.Frame = function(scaling, width, height, rollover, touch, scrollTop) {

		var sig = "scaling, width, height, rollover, touch, scrollTop";
		var duo; if (duo = zob(zim.Frame, arguments, sig)) return duo;

		function makeFrame() {

			var mobile = zim.mobile();
			if (zot(scaling)) scaling = "full";
			if (zot(width)) width = 500;
			if (zot(height)) height = 500;
			if (zot(rollover)) rollover = !mobile;
			if (zot(touch)) touch = true;
			if (zot(scrollTop)) scrollTop = true;

			var that = this;
			var stageW = width; // ignored if scaling is full
			var stageH = height;
			var largest; // automatically set
			var appOrientation; // watch out - orientation keyword is used by apple - sigh
			var lastOrientation; // used to detect orientation change
			var stage;
			var appReady = false; // check variable - set true when ready ;-) (watch - "ready" is reserved)

			window.addEventListener('load', function() {
				if (mobile == "android") {
					setTimeout(function() {init();}, 500); // to catch delayed screen sizes
				} else {
					init();
				}
			});

			if (scaling != "none") window.addEventListener('resize', function() {
				sizeCanvas();
				if (mobile) setTimeout(function() {sizeCanvas();}, 250);
				if (mobile) setTimeout(function() {sizeCanvas();}, 500); // to catch delayed screen sizes
			});



			function init() {

				makeCanvas();
				makeStage();

				// for older mobile - pan hides the location bar
				if (scrollTop) {setTimeout(function() {window.scrollTo(0, 0);}, 100);}

				that.dispatchEvent("ready");

				if (scaling=="full") {
					appReady = true;
					fullResize();
					if (mobile) setTimeout(function() {sizeCanvas();}, 250);
					if (mobile) setTimeout(function() {sizeCanvas();}, 500); // to catch delayed screen sizes
				}
			}

			function makeStage() {
				if (scaling != "none") sizeCanvas();
				if (scaling == "full") {that.zil = zil();} // keep canvas still (from arrows, scrollwheel, etc.)
				stage = new createjs.Stage("myCanvas");
				stage.setBounds(0, 0, stageW, stageH);
				if (rollover) stage.enableMouseOver(10); // if you need mouse rollover
				if (touch) createjs.Touch.enable(stage,true); // added for mobile
			}

			function fullResize() {
				if (!appReady) return;
				that.dispatchEvent("resize");
			}

			function sizeCanvas() {

				var can = zid("myCanvas");
				var w = zim.windowWidth();
				var h = zim.windowHeight();
				var newW; var newH;

				appOrientation = that.orientation = (w > h) ? "horizontal" : "vertical";
				if (appOrientation != lastOrientation) { // new orientation
					lastOrientation = appOrientation;
					that.dispatchEvent("orientation");
				}
				if (!can) return;

				if (scaling == "fit") {
					// scales canvas to fit dimensions inside screen
					if (w/h >= stageW/stageH) {
						newH = h;
						newW = newH*stageW/stageH;
					} else {
						newW = w;
						newH = newW*stageH/stageW;
					}
				} else if (scaling == "outside") {
					// scales canvas so screen inside dimensions
					document.body.style.overflow = "hidden";
					if (w/h >= stageW/stageH) {
						newW = w;
						newH = newW*stageH/stageW;
					} else {
						newH = h;
						newW = newH*stageW/stageH;
					}
				} else if (scaling == "full") {
					// does not scale canvas but sets width and height to screen
					document.body.style.overflow = "hidden";
					can.style.left = can.style.top = "0px";
					stageW = w;
					stageH = h;
					if (stage) stage.setBounds(0,0,stageW,stageH);
					fullResize();
					return;
				}

				can.style.width = newW + "px";
				can.style.height = newH + "px";
				// horizontal center
				can.style.left = ((w-newW)/2) + "px";
				// vertical center
				can.style.top = ((h-newH)/2) + "px";
			}

			function makeCanvas() {
				// note the width and height of a canvas
				// are separate from from the width and height styles
				// so beware of unintentionally stretching the canvas with styles

				var canvas = document.createElement("canvas");
				canvas.setAttribute("id", "myCanvas");
				largest = Math.max(window.innerWidth, screen.width, window.innerHeight, screen.height);
				// does not work on iOS6 in full screen if loading from icon unless keep canvas at device size
				// thank you apple for this and many other days of hell

				if (mobile != "ios") largest *= 3;
				if (scaling == "full") {
					canvas.setAttribute("width", largest);
					canvas.setAttribute("height", largest);
				} else {
					canvas.setAttribute("width", stageW);
					canvas.setAttribute("height", stageH);
				}
				document.body.appendChild(canvas);
			}

			this.assets = {}; // store asset Bitmap or play function for sound
			this.loadAssets = function(arr, path, xhr) {
				if (zot(arr)) return;
				if (zot(xhr)) xhr = false;
				if (!Array.isArray(arr)) arr = [arr];
				var soundCheck = false;
				var manifest = [];
				var a; var ext; var i; var j;
				var re = /\.([^.]+)$/i; // get extension
				for (i=0; i<arr.length; i++) {
					a = arr[i];
					ext = a.match(re);
					if (createjs.Sound.SUPPORTED_EXTENSIONS.indexOf(ext[1]) >= 0) soundCheck = true;
					manifest.push({src:a});
				}
				that.preload = new createjs.LoadQueue(xhr, path);
				if (soundCheck) that.preload.installPlugin(createjs.Sound);
				that.preload.on("progress", function(e) {that.dispatchEvent(e);});
				that.preload.on("error", function(e) {that.dispatchEvent(e);});
				that.preload.on("fileload", function(e) {
					var item = e.item;
					var ext = item.id.match(re);
					var asset;
					if (createjs.Sound.SUPPORTED_EXTENSIONS.indexOf(ext[1]) >= 0) {
						asset = that.assets[item.id] = {type:"sound", play:function(){
							return createjs.Sound.play(item.id);
						}};
					} else {
						asset = that.assets[item.id] = new createjs.Bitmap(e.result);
						asset.type = "image";
					}
					var ev = new createjs.Event("assetload");
					ev.item = item; // createjs preload item
					ev.asset = asset;
					that.dispatchEvent(ev);
				});
				that.preloadEvent = that.preload.on("complete", function(e) {that.dispatchEvent(e);});
				that.preload.loadManifest(manifest);
			}

			this.asset = function(n) {
				if (zot(n)) return;
				return that.assets[n] || {play:function(){if (zon) {zog("zim.Frame - asset(sound) not found"); return {};}}};
			}

			Object.defineProperty(that, 'stage', {
				get: function() {
					return stage;
				},
				set: function(s) {
					zog("zim.Frame(): stage is read only - see remakeCanvas(), perhaps");
				}
			});

			Object.defineProperty(that, 'stageW', { // depreciated (use width)
				get: function() {
					return stageW;
				},
				set: function(w) {
					zog("zim.Frame(): stageW is read only - see remakeCanvas(), perhaps");
				}
			});

			Object.defineProperty(that, 'stageH', { // depreciated (use height)
				get: function() {
					return stageH;
				},
				set: function(h) {
					zog("zim.Frame(): stageH is read only - see remakeCanvas(), perhaps");
				}
			});
			Object.defineProperty(that, 'width', {
				get: function() {
					return stageW;
				},
				set: function(w) {
					zog("zim.Frame(): width is read only - see remakeCanvas(), perhaps");
				}
			});

			Object.defineProperty(that, 'height', {
				get: function() {
					return stageH;
				},
				set: function(h) {
					zog("zim.Frame(): height is read only - see remakeCanvas(), perhaps");
				}
			});

			this.remakeCanvas = function(width, height) {
				if (scaling == "full") return;
				if (zot(width)) width = stageW;
				if (zot(height)) height = stageH;
				if (zid("myCanvas")) zid("myCanvas").parentNode.removeChild(zid("myCanvas"));
				stageW = width;
				stageH = height;
				makeCanvas();
				makeStage();
			}

			this.dispose = function() {
				window.removeEventListener('resize', sizeCanvas);
				stage.removeAllChildren();
				stage.removeAllEventListeners();
				if (zid("myCanvas")) zid("myCanvas").parentNode.removeChild(zid("myCanvas"));
				stage = null;
				that = null;
				return true;
			}

			// zim colors
			this.orange		= this.wrap 	= "#f58e25";
			this.green  	= this.code 	= "#acd241";
			this.pink  		= this.create 	= "#e472c4";
			this.blue   	= this.build 	= "#50c4b7";
			this.brown  	= this.pages 	= "#d1a170";
			this.silver		= this.frame 	= "#999999";
			this.tin		= this.examples	= "#777777";
			this.grey   	= this.cdn  	= "#555555";
			this.lighter 	= this.template = "#eeeeee";
			this.light 		= this.docs 	= "#cccccc";
			this.dark 		= this.bits 	= "#333333";
			this.darker 	= this.zim 		= "#111111";
			this.purple		= this.github 	= "#993399";

			this.makeCircles = function(radius) {
				if (zot(radius)) radius = 100;
				var colors = [that.wrap, that.code, that.create, that.build, that.pages, that.bits];
				var c = new createjs.Shape();
				var g = c.graphics;
				c.radius = radius;
				for (var i=0; i<colors.length; i++) {
					g.f(colors[i]).dc(0,0,(c.radius/colors.length)*(colors.length-i));
				}
				c.setBounds(-c.radius,-c.radius,c.radius*2,c.radius*2);
				c.width = c.height = radius*2;
				return c;
			}

		}
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeFrame.prototype = new createjs.EventDispatcher();
		makeFrame.prototype.constructor = zim.Frame;
		return new makeFrame();
	}

	return zim;
} (zim || {});
