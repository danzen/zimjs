
// ZIM js Interactive Media modules by Dan Zen http://danzen.com (c) 2015
// zim.js includes all the basic zim coding modules http://zimjs.com
// free to use - donations welcome of course! http://zimjs.com/donate

////////////////  ZIM WRAP  //////////////

// zimwrap.js creates global wrapper functions for less typing

// set var zon=true before calling zim scripts to show script comments
if (typeof zon === "undefined") zon = false; // comments from zim scripts

/*--
zog(item1, item2, etc.) ~ log
a wrapper for console.log()
--*/
var zog = console.log.bind(console);
if (zon) zog("ZIM WRAP - zog zid zss zgo zum zot zop zil");

/*--
zid(string)             ~ id
short version of document.getElementById(s)
--*/
function zid(s) {
	return document.getElementById(s);	
}

/*--
zss(string)             ~ css
short version of document.getElementById(s).style
so you can do zss("logo").top = "10px"; // for instance
--*/
function zss(s) {
	if (document.getElementById(s)) {return document.getElementById(s).style;}
	else if (zon) zog("zim wrap - zss(): id not found");
}

/*--
zgo(url, target, modal) ~ go
short version of either window.location.href or window.open
--*/
function zgo(u,t,m) {
	if ((zot(t) && t != "") || t == "_self") {
		window.location.href = u;
	} else {
		if (zot(m)) { // not modal
			window.open(u,"_blank");
		} else {
			window.open(u,"_blank","modal=yes,alwaysRaised=yes");			
		}			
	}
}

/*--
zum(string)             ~ num
converts "10px string from styles to number 10, for instance
if there is no value then this will return 0
--*/
function zum(s) {
	if (zot(s)) return;
	return Number(String(s).replace(/[^\d\.\-]/g, ''));	
}

/*--
zot(value)              ~ not
test to see if value has no value (value must exist as var or parameter)
or if value has been set to null
good for setting function defaults: if (zot(speed)) speed=1;
--*/
function zot(v) {
	if (v === null) return true;
	return typeof v === "undefined";
}

/*--
zop(e)                  ~ stop
stop event propagation - just easier to remember than below
must pass it e || window.event from your event function
--*/
function zop(e) {
	if (zot(e)) return;	
	if (e.stopImmediatePropagation) e.stopImmediatePropagation();
	if (window.event) window.event.cancelBubble=true;	
}

/*--
zil()                   ~ still
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

PARAMETERS
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
		if (zon) zog("zim code - Damp");
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

PARAMETERS
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
		
		if (zon) zog("zim code - Proportion");

		// factor - set to 1 for increasing and -1 for decreasing
		// round - true to round results to whole number 
		
		// zot() is found in danzen.js (the z version of not)
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

PARAMETERS
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
		
		if (zon) zog("zim code - ProportionDamp");
		
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
zim.urlEncode = function(str)
matches PHP urlencode and urldecode functions
--*/
	zim.urlEncode = function(str) {
		var str = (str + '').toString();
		return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
		replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
	}
	
/*--
zim.urlDecode = function(str)
matches PHP urlencode and urldecode functions
--*/		
	zim.urlDecode = function(str) {
		 return decodeURIComponent((str + '').replace(/\+/g, '%20'));
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
	

	return zim;
} (zim || {});


////////////////  ZIM CREATE  //////////////

// zimcreate.js adds functionality to CreateJS for digidos (Interactive Features) 
// functions in this module require createjs namespace to exist and in particular easel.js and tween.js
// available at http://createjs.com

var zim = function(zim) {
	
	if (zon) zog("ZIM CREATE Module");

/*--
zim.drag = function(obj, rect, overCursor, dragCursor, currentTarget, swipe, localBounds)
adds drag and drop to an object 
handles scaled, rotated nested objects
rect is a rectangle object for the bounds of dragging
this rectangle is relative to the stage (global)
if a rectangle relative to the object's parent is desired then set the localBounds parameter to true
after the rect comes two cursor properties which are any css cursor value such as "pointer", etc.
currentTarget defaults to false allowing you to drag things within a container
eg. drag(container); will drag any object within a container
setting currentTarget to true will then drag the whole container	
swipe defaults to false which prevents a swipe from triggering when dragging
localBounds defaults to false which means the rect is global - set to true for a rect in the object parent frame	
returns obj for chaining
--*/	
	zim.drag = function(obj, rect, overCursor, dragCursor, currentTarget, swipe, localBounds) {
		if (zot(obj) || !obj.on) return;
		obj.cursor = (zot(overCursor)) ? "pointer" : overCursor;
		if (zot(rect)) localBounds = false;
		if (zot(currentTarget)) currentTarget = false;		
		if (zot(swipe)) swipe = false;
		if (zot(localBounds)) localBounds = false;
		
		zim.setSwipe(obj, swipe);
		
		var diffX; var diffY; var point; var r;		
		obj.zimAdded = obj.on("added", initializeObject, null, true); // if not added to display list
		if (obj.parent) initializeObject();
		
		function initializeObject() {
			// check position right away if there is a bounding box
			// there is no mousedown so set the diffX and diffY to 0		
			diffX = 0; diffY = 0;
			// positionObject() is used as well in the dragmove function	
			// where it expects a global x and y
			// so convert obj.x and obj.y positions inside its parent to global:
			if (localBounds) {
				r = zim.boundsToGlobal(obj.parent, rect);
			} else {
				r = rect;
			}
			point = obj.parent.localToGlobal(obj.x, obj.y);
			positionObject(obj, point.x, point.y);	
		}
	
		obj.zimDown = obj.on("mousedown", function(e) {
			// e.stageX and e.stageY are global
			// e.target.x and e.target.y are relative to e.target's parent
			// bring stageX and stageY into the parent's frame of reference
			// could use e.localX and e.localY but might be dragging container or contents
			var dragObject = (currentTarget)?e.currentTarget:e.target;

			var point = dragObject.parent.globalToLocal(e.stageX, e.stageY);
			diffX = point.x - dragObject.x;
			diffY = point.y - dragObject.y;	
			if (localBounds) {
				r = zim.boundsToGlobal(e.target.parent, rect);
			} else {
				r = rect;
			}
			// just a quick way to set a default cursor or use the cursor sent in		
			obj.cursor = (zot(dragCursor))?"move":dragCursor;
		}, true);
		
		obj.zimMove = obj.on("pressmove", function(e) {
			var dragObject = (currentTarget)?e.currentTarget:e.target;
			positionObject(dragObject, e.stageX, e.stageY);				
		}, true);
		
		function positionObject(o, x, y) {
			// x and y are the desired global positions for the object o			
			// checkBounds returns the same values if there are no bounds
			// and always returns values inside the bounds if there are bounds set
			// firstly, convert the global x and y to a point relative to the object's parent
			if (!o.parent) return;
			if (!o.getStage()) return;
			var point = o.parent.globalToLocal(x, y);
			var checkedPoint = checkBounds(o,point.x-diffX, point.y-diffY);			
			// now set the object's x and y to the resulting checked local point
			o.x = checkedPoint.x;
			o.y = checkedPoint.y;
			o.getStage().update();			
		}
		
		obj.zimUp = obj.on("pressup", function(e) { 
			obj.cursor = (zot(overCursor))?"pointer":overCursor;
		}, true);
					
		function checkBounds(o, x, y) {							
		
			if (rect) {	
				// convert the desired drag position to a global point
				// note that we want the position of the object in its parent
				// so we use the parent as the local frame
				var point = o.parent.localToGlobal(x,y);
				// r is the bounds rectangle on the global stage 
				// r is set during mousedown to allow for global scaling when in localBounds mode
				// if you scale in localBounds==false mode, you will need to reset bounds with noDrag() drag()
				x = Math.max(r.x, Math.min(r.x+r.width, point.x));
				y = Math.max(r.y, Math.min(r.y+r.height, point.y));
				// now that the point has been checked on the global scale
				// convert the point back to the obj parent frame of reference
				point = o.parent.globalToLocal(x, y);
				x = point.x;
				y = point.y;
			} 
			
			return {x:x,y:y}				
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
		obj.off("mousedown", obj.zimDown);
		obj.off("pressmove", obj.zimMove);
		obj.off("pressup", obj.zimUp);
		return obj;	
	}
	
/*--
zim.setSwipe = function(obj, swipeBoolean)
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
zim.boundsToGlobal = function(obj, rectangle)
returns a rectangle of the bounds of object projected onto the stage
if a rectangle is passed in then it converts this rectangle 
from within the frame of the obj to a global rectangle
used by the hitTestBounds above so probably you will not use this directly
--*/
	zim.boundsToGlobal = function(obj, rectangle) {
		
		if (zot(obj) || !obj.getBounds) return;
		var oB = obj.getBounds();
		if (!oB && zot(rectangle)) {
			zog("zim create - boundsToGlobal():\n please setBounds() on object (or a rectangle)");
			return;
		}
		if (rectangle) oB = rectangle;
		
		var pTL = obj.localToGlobal(oB.x, oB.y);
		var pTR = obj.localToGlobal(oB.x+oB.width, oB.y);
		var pBR = obj.localToGlobal(oB.x+oB.width, oB.y+oB.height);		
		var pBL = obj.localToGlobal(oB.x, oB.y+oB.height);
		
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
type is "smallest" (default), "biggest", and "both"
smallest: uses the smallest scaling (fit)
biggest: uses the largest scaling (outside)
both: keeps both x and y scales - may stretch object (stretch)
returns the object for chaining
--*/	
	zim.scaleTo = function(obj, boundObj, percentX, percentY, type) {
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
zim.move = function(target, x, y, t, ease, callBack, params, wait, props, fps)
convenience function (wraps createjs.Tween)
to animate an object target to position x, y in t milliseconds
with optional ease and a callBack function and params (send an array, for instance)
and props for TweenJS tween (see CreateJS documentation) defaults to override:true
note, this is where you can set loop:true to loop animation
added to props as a convenience are:
rewind:true - rewinds (reverses) animation
rewindWait:ms - milliseconds to wait in the middle of the rewind (default 0 ms)
rewindCall:function - calls function at middle of rewind animation
rewindParams:obj - parameters to send rewind function

can set frames per second as fps parameter
returns target for chaining
--*/
	zim.move = function(target, x, y, t, ease, callBack, params, wait, props, fps) {
		return zim.animate(target, {x:x, y:y}, t, ease, callBack, params, wait, props, fps);
	}
	
/*--
zim.animate = function(target, obj, t, ease, callBack, params, wait, props, fps)
convenience function (wraps createjs.Tween)
to animate object o properties in t milliseconds
added convinience property of scale that does both scaleX and scaleY
with optional ease and a callBack function and params (send an array, for instance)
and props for TweenJS tween (see CreateJS documentation) defaults to override:true
note, this is where you can set loop:true to loop animation
added to props as a convenience are:
rewind:true - rewinds (reverses) animation
rewindWait:ms - milliseconds to wait in the middle of the rewind (default 0 ms)
rewindCall:function - calls function at middle of rewind animation
can set frames per second as fps parameter
returns target for chaining
--*/	
	zim.animate = function(target, obj, t, ease, callBack, params, wait, props, fps) {		
		if (zot(target) || !target.on || zot(obj) || !target.getStage()) return;
		if (zot(ease)) ease = "quadInOut";
		if (zot(wait)) wait = 0;
		if (zot(props)) props = {override: true};
		if (zot(fps)) fps = 60;
		if (!zot(obj.scale)) {
			obj.scaleX = obj.scaleY = obj.scale;
			delete obj.scale;
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
				delete props.rewindWait;
			}
			if (props.rewindCall) {
				var callBack2 = props.rewindCall;
				var params2 = props.rewindParams;
				delete props.rewindCall;
				delete props.rewindParams;
				createjs.Tween.get(target, props)
					.wait(wait)
					.to(obj, t, createjs.Ease[ease])
					.call(rewindCall)
					.wait(wait2)
					.to(obj2, t, createjs.Ease[ease2])				
					.call(doneAnimating);
			} else {
				createjs.Tween.get(target, props)
					.wait(wait)
					.to(obj, t, createjs.Ease[ease])
					.wait(wait2)
					.to(obj2, t, createjs.Ease[ease2])				
					.call(doneAnimating);
			}
		} else {
			createjs.Tween.get(target, props)
				.wait(wait)
				.to(obj, t, createjs.Ease[ease])				
				.call(doneAnimating);
		}
		var listener = createjs.Ticker.on("tick", target.getStage());	
		createjs.Ticker.setFPS(fps);
		function doneAnimating() {
			if (callBack && typeof callBack === 'function') {(callBack)(params);}
			createjs.Ticker.off("tick", listener);
		}	
		function rewindCall() {
			if (callBack2 && typeof callBack2 === 'function') {(callBack2)(params2);}
		}	
		return target;	
	}	

/*--
zim.fit = function(obj, left, top, width, height, inside)
scale an object to fit inside (or outside) a rectangle and center it
actually scales and positions the object
object must have bounds set (setBounds())
if only the object is passed in then if fits to the stage
the inside parameter defaults to true and fits the object inside the bounds
if inside is false then it fits the object around the bounds
in both cases the object is centered
returns an object with the new and old details:
{x:obj.x, y:obj.y, width:newW, height:newH, scale:scale, bX:left, bY:top, bWidth:width, bHeight:height}
--*/	
	zim.fit = function(obj, left, top, width, height, inside) {
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
		obj.x = left + (w-newW)/2;
		
		// vertical center
		obj.y = top + (h-newH)/2;	
		
		return {x:obj.x, y:obj.y, width:newW, height:newH, scale:scale, bX:left, bY:top, bWidth:width, bHeight:height};	
							
	}	

/*--
zim.outline = function(obj, color, size)
for testing purposes
draws a rectangle around the bounds of obj (adds rectangle to the objects parent)
draws a cross at the origin of the object (0,0) where content will be placed
draws a circle at the registration point of the object (where it will be placed in its container)
these three things could be in completely different places ;-)
returns the shape if you want to remove it: obj.parent.removeChild(returnedShape);
will not be resized - really just to use while building and then comment it out or delete it
--*/	
	zim.outline = function(obj, color, size) {
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
zim.centerReg = function(obj, container)
centers the registration point on the bounds - obj must have bounds set
if container is specified then sets obj x and y to half the width and height of container
just a convenience function - returns obj for chaining
--*/	
	zim.centerReg = function(obj, container) {
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
		return obj;
	}

	return zim;
} (zim || {});

/*--
zim.expand = function(obj, padding)
adds a createjs hitArea to an object with an extra padding of padding (default 20)
good for making mobile interaction better on labels, buttons, etc.
returns object for chaining
--*/	
	zim.expand = function(obj, padding) {
		if (zot(obj) || !obj.getBounds) {zog("zim create - expand(): please provide object with bounds set"); return;}	
		if (zot(padding)) padding = 20;
		var oB = obj.getBounds();
		var rect = new createjs.Shape();
		rect.graphics.f("0").r(oB.x-padding,oB.y-padding,oB.width+2*padding,oB.height+2*padding);
		obj.hitArea = rect;
		return obj;
	}
	

////////////////  ZIM BUILD  //////////////

// zimbuild.js adds common building classes for digidos (interactive media)
// classes in this module require createjs namespace to exist and in particular easel.js
// available at http://createjs.com

var zim = function(zim) {
	
	if (zon) zog("ZIM BUILD Module");
	

/*--
zim.Circle = function(radius, fill, stroke, strokeSize)

Circle class

extends a createjs.Container (allows for ZIM HotSpots)
makes a circle shape inside a container
var circle = new zim.Circle(parameters);
the registration and origin will be the center

PARAMETERS
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

PARAMETERS
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

PARAMETERS
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
zim.Label = function(labelText, fontSize, font, textColor, textRollColor, shadowColor, shadowBlur)

Label Class

extends a createjs.Container	
makes a label - wraps the createjs Text object
can use with Button, CheckBox, RadioButtons and Pane 
var label = new zim.Label(parameters);	
Text seems to come in different sizes so we do our best
Have tended to find that left and alphabetic are most consistent across browsers

PARAMETERS (see the defaults in the code)
labelText, 
fontSize, font, textColor, textRollColor, 
shadowColor, shadowBlur

METHODS
showRollColor(boolean) - true to show roll color (used internally)
clone() - returns a copy of the label and its properties
dispose() - to get rid of the button and listeners	
	
PROPERTIES
label - references the text object of the label
text - references the text property of the text object
width and height (or use getBounds().width, getBounds().height)

EVENTS
dispatches no events 
--*/	
	zim.Label = function(labelText, fontSize, font, textColor, textRollColor, shadowColor, shadowBlur) {
	
		function makeLabel() {	
			
			if (zot(labelText)) labelText="LABEL";
			if (labelText == "") labelText = " ";
			if (zot(fontSize)) fontSize=36;
			if (zot(font)) font="arial";
			if (zot(textColor)) textColor="black";
			if (zot(textRollColor)) textRollColor=textColor;
			if (zot(shadowColor)) shadowColor=null;
			if (zot(shadowBlur)) shadowBlur=16;
		
			var that = this;
			this.mouseChildren = false;
			
			var obj = this.label = new createjs.Text(String(labelText), fontSize + "px " + font, textColor); 
			obj.textBaseline = "alphabetic";
			obj.textAlign = "left";			 
			if (shadowColor && shadowBlur > 0) obj.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);
			this.addChild(obj);

			var backing = new createjs.Shape();
			backing.graphics.f("rgba(0,255,255,.01)").r(0,0,this.getBounds().width,this.getBounds().height);
			// this.addChildAt(backing,0); 
			// could always slightly see .01 transparency so use hitArea instead
			this.hitArea = backing;
			
			this.width = this.getBounds().width;
			this.height = this.getBounds().height;
			this.setBounds(0,0,this.width,this.height);
			
			//obj.x = obj.getBounds().width / 2; 
			obj.y = fontSize-fontSize/6; //obj.getBounds().height / 2;
				
			Object.defineProperty(that, 'text', {
				get: function() {
					var t = (obj.text == " ") ? "" : obj.text;				
					return t;
				},
				set: function(value) {
					if (zot(value)) {value = " ";}
					obj.text = value;
					that.setBounds(0,0,obj.getBounds().width,obj.getBounds().height);
				}
			});
			
			this.showRollColor = function(yes) {
				if (zot(yes)) yes = true;
				if (yes) {
					obj.color = textRollColor;
				} else {
					obj.color = textColor;
				}
				if (that.getStage()) that.getStage().update();
			}
				
			this.on("mouseover", function(e) {that.showRollColor();});
			this.on("mouseout", function(e) {that.showRollColor(false);});
			
			this.clone = function() {
				return new zim.Label(that.text, fontSize, font, textColor, textRollColor, shadowColor, shadowBlur);	
			}
		
			this.dispose = function() {
				that.removeAllEventListeners();
			}
		}
	
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeLabel.prototype = new createjs.Container();
		makeLabel.prototype.constructor = zim.Label;
		return new makeLabel();
		
	}
	
		
/*--
zim.Button = function(width, height, label, backingColor, backingRollColor, borderColor, borderThickness, corner, shadowColor, shadowBlur, buttonPadding)

Button Class

extends a createjs.Container	
makes a button with rollovers 
var button = new zim.Button(parameters);
you will need to stage.addChild(button); and position it
you will need to add a click event button.on("click", function);
the Button class handles the rollovers		

PARAMETERS (all with defaults - see code)
width, height, 
label, // ZIM Label or plain text for default settings
backingColor, backingRollColor, borderColor, borderThickness, 
corner, shadowColor (set to -1 for no shadow), shadowBlur
buttonPadding (default 0) adds extra hit area to the button for mobile

METHODS
dispose() - to get rid of the button and listeners

PROPERTIES
width and height - or use getBounds().width and getBounds().height
text - references the text property of the Label object of the button
label - gives access to the label
backing - references the backing of the button

EVENTS
dispatches no events - you make your own click event
--*/		
	zim.Button = function(width, height, label, backingColor, backingRollColor, borderColor, borderThickness, corner, shadowColor, shadowBlur, buttonPadding) {
	
		function makeButton() {
			
			// if (zon) zog("zim build - Button");
			
			if (zot(width)) width=200;
			if (zot(height)) height=60;
			if (zot(backingColor)) backingColor="#C60";
			if (zot(backingRollColor)) backingRollColor="#F93";
			if (zot(borderColor)) borderColor=null;
			if (zot(borderThickness)) borderThickness=1;
			if (zot(corner)) corner=20;
			if (zot(shadowColor)) shadowColor="rgba(0,0,0,.3)";
			if (zot(shadowBlur)) shadowBlur=16;		
			if (zot(buttonPadding)) buttonPadding=0;			
			if (zot(label)) label = "PRESS";			
			if (typeof label === "string" || typeof label === "number") label = new zim.Label(label, 36, "arial", "white");			
			
			var that = this;		
			this.mouseChildren = false; 
			this.cursor = "pointer";
				
			var buttonBacking = new createjs.Shape();		
			var g = buttonBacking.graphics;		
			g.f(backingColor);
			if (borderColor) g.s(borderColor).ss(borderThickness);
			g.rr(0, 0, width, height, corner);
			this.addChild(buttonBacking);
			this.backing = buttonBacking;
			
			if (buttonPadding > 0) {
				var rect = new createjs.Shape();
				rect.graphics.f("#000").r(-buttonPadding,-buttonPadding,width+buttonPadding*2,height+buttonPadding*2);
				this.hitArea = rect;
			}
								
			if (shadowBlur > 0) buttonBacking.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);
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
			
			this.on("mouseover", buttonOn);
			function buttonOn(e) {
				that.on("mouseout", buttonOff);
				var g = buttonBacking.graphics;
				g.clear();
				g.f(backingRollColor);
				if (borderColor) g.s(borderColor).ss(borderThickness);
				g.rr(0, 0, width, height, corner);
				that.label.showRollColor();
				if (that.getStage()) that.getStage().update();
			}
		
			function buttonOff(e) {
				that.off("mouseout", buttonOff); 
				var g =buttonBacking.graphics;
				g.clear();
				g.f(backingColor);
				if (borderColor) g.s(borderColor).ss(borderThickness);
				g.rr(0, 0, width, height, corner);
				that.label.showRollColor(false);
				if (that.getStage()) that.getStage().update();
			}			
			
			this.dispose = function() {
				that.removeAllEventListeners();
				that.removeChild(buttonBacking);
				that.removeChild(buttonLabel);
				buttonBacking = null;
				buttonLabel = null;
			}
		}
	
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeButton.prototype = new createjs.Container();
		makeButton.prototype.constructor = zim.Button;
		return new makeButton();
		
	}
	
	
/*--
zim.CheckBox = function(size, label, startChecked, color, margin)

CheckBox Class

extends createjs.Container
a checkbox that when clicked toggles the check and a checked property
var checkBox = new zim.CheckBox(parameters)

PARAMETERS
size - in pixels (always square)
label - ZIM Label object - or just some text to make a default label
startChecked - an initial parameter to set checked if true - default is false
color - the stroke and check color (default black) - background is set to a .5 alpha white
margin - is on outside of box so clicking or pressing is easier

METHODS
setChecked(Boolean) - defaults to true to set button checked (or use checked property)


PROPERTIES
label - gives access to the label including checkBox.label.text
checked - gets or sets the check of the box

EVENTS
dispatches a "change" event when clicked on (or use a click event)
--*/
	zim.CheckBox = function(size, label, startChecked, color, margin) {
	
		function makeCheckBox() {
			
			// if (zon) zog("zim build - CheckBox");
				
			if (zot(size)) size = 60;
			if (zot(label)) label = null;			
			if (typeof label === "string" || typeof label === "number") label = new zim.Label(label, size*5/6, "arial", color);
			var myChecked = (zot(startChecked)) ? false : startChecked;
			if (zot(color)) color = "black";
			if (zot(margin)) margin = 10; //20;			
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
				label.x = size*1.3; //this.getBounds().width;				
				label.y = size/8; 
				this.label = label;
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
			g2.f(color).p("AnQAdICBiaIEEDZIF8nfICfB4In/KPg"); // width about 90 reg in middle
						
			var cW = 95
			check.setBounds(-cW/2, -cW/2, cW, cW);			
			var scale = size/(cW+66);		
			
			check.scaleX = check.scaleY = scale;
			check.x = size/2;
			check.y = size/2;
			
			if (myChecked) this.addChild(check);					
			this.on("click", toggleCheck);
			
			Object.defineProperty(that, 'checked', {
				get: function() {				
					return myChecked;
				},
				set: function(value) {					
					that.setChecked(value);
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
				if (that.getStage()) that.getStage().update();
			}
			
			this.dispose = function() {
				that.removeAllEventListeners();				
			}
		}
	
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeCheckBox.prototype = new createjs.Container();
		makeCheckBox.prototype.constructor = zim.CheckBox;
		return new makeCheckBox();
		
	}	


/*--
zim.RadioButtons = function(size, buttonData, vertical, color, spacing, margin)

RadioButtons Class

extends createjs.Container
a radio button set that lets you pick from choices
var radioButton = new zim.RadioButton(parameters)

PARAMETERS
size - in pixels (always square)
buttonData - an array of button data objects as follows:	
[{label:ZIM Label or text, id:optional id, selected:optional Boolean}, {etc...}]
or just a list of labels for default labels ["hi", "bye", "what!"]

vertical - boolean that if true displays radio buttons vertically else horizontally
color - the stroke and check color (default black) - background is set to a .5 alpha white
spacing - the space between radio button objects
margin - the space around the radio button itself

METHODS
setSelected(num) - sets the selected index (or use selectedIndex) -1 is default (none)

PROPERTIES
selected - gets the selected object - selected.label, selected.id, etc.
selectedIndex - gets or sets the selected index of the buttons
label - current selected label object
text - current selected label text
id - current selected id
labels - an array of the ZIM Label objects. labels[0].text = "YUM"; labels[2].y -= 10;

EVENTS
dispatches a "change" event when clicked on (or use a click event)
then ask for the properties above for info
--*/
	zim.RadioButtons = function(size, buttonData, vertical, color, spacing, margin) {
	
		function makeRadioButtons() {
			
			// if (zon) zog("zim build - RadioButtons");
			
			if (zot(size)) size = 60;
			size = Math.max(5, size);
			if (zot(buttonData)) return;
			if (zot(vertical)) vertical = true;
			if (zot(color)) color = "black";
			if (zot(spacing)) spacing = (vertical) ? size*.2 : size;
			if (zot(margin)) margin =  size/5;			
			
			var that = this;
			this.cursor = "pointer";
			this.labels = [];
			var currentObject; // reference to the current data object
			
			var buttons = this.buttons = new createjs.Container();
			this.addChild(buttons);
			buttons.on("click", pressBut);
			function pressBut(e) {
				that.setSelected(buttons.getChildIndex(e.target));				
				that.dispatchEvent("change");
			}	
			
			
			// loop through data and call makeButton() each time
			makeButtons();
			var lastBut;
			function makeButtons() {
				// test for duplicate selected true properties (leave last selected)
				var data; var selectedCheck = false;
				for (var i=buttonData.length-1; i>=0; i--) {
					data = buttonData[i];
					if (data.selected && data.selected === true) {
						if (!selectedCheck) {
							selectedCheck = true; // first item marked selected
							that.id = data.id;
						} else {
							data.selected = "false"; // turn off selected
						}
					}					
				}				
				buttons.removeAllChildren();
				var but; var currentLocation = 0;
				for (var i=0; i<buttonData.length; i++) {
					data = buttonData[i];
					
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
								
					buttons.addChild(but);
		
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
					
				var check = but.check = new createjs.Shape();
				check.mouseEnabled = false;
				check.alpha = .95;
				var g2 = check.graphics;		
				g2.f(color).dc(size/2,size/2,size/5.2);	
				
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
			this.setBounds(0,0,this.getBounds().width+margin,this.getBounds().height+margin);
			
			// the main function that sets a button selected (after the initial makeButton)
			// this gets called by the setter methods below and the click event up top
			this.setSelected = function(value) {
				
				if (zot(value)) value = -1;
				if (value != -1 && !buttons.getChildAt(value)) return;
				
				var but;
				for (var i=0; i<buttons.getNumChildren(); i++) {
					but = buttons.getChildAt(i);					
					but.removeChild(but.check);
				}	
				if (value >= 0) {
					but = buttons.getChildAt(value);
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
				if (that.getStage()) that.getStage().update();
				
				function makeNull() {
					
				}
				
			}
			
			// getter setter methods
			
			Object.defineProperty(that, 'selected', {
				get: function() {				
					return currentObject;
				},
				set: function(value) {
					selectedIndex = value; // just in case
				}
			});
			
			Object.defineProperty(that, 'selectedIndex', {
				get: function() {			
					return (currentObject) ? currentObject.index : -1;
				},
				set: function(value) {
					this.setSelected(value); // just in case
				}
			});
			
			this.dispose = function() {
				that.removeAllEventListeners();				
			}
		}
	
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeRadioButtons.prototype = new createjs.Container();
		makeRadioButtons.prototype.constructor = zim.RadioButtons;
		return new makeRadioButtons();
		
	}
	
	
/*--
zim.Pane = function(container, width, height, label, color, drag, resets, modal, corner, backingAlpha, shadowColor, shadowBlur)

Pane Class

extends a createjs.Container
adds a window for alerts, etc.
var pane = new zim.Pane(parameters); 
you need to call the pane.show() to show the pane and pane.hide() to hide it
you do not need to add it to the stage - it adds itself centered
you can change the x and y (with origin and registration point in middle)

PARAMETERS
see the defaults in the code below
pass in the container for the pane (usually the stage) and the width and height of the pane
pass in an optional ZIM Label (or text for default label properties)
pass in a boolean for if you want to drag the pane (default false)
pass in whether a dragging pane should open at first start position (defaults false)
for reset, by default, Pane takes the first position and will continue to use that
modal defaults to true and means the pane will close when user clicks off the pane
corner is the corner radius default 20
the backingAlpha is the darkness of the background that fills the stage
shadowColor defaults to #333
value for shadow blur - 0 for no shadow
center - defaults to true and centers the label on the pane

METHODS
show() - shows the pane
hide() - hides the pane

PROPERTIES
display - reference to the pane box
text - gives access to the label text
label - gives access to the label
backing - reference to the backing	that covers the stage
resetX - if reset is true you can dynamically adjust the position if needed
resetY 

EVENTS
dispatches a "close" event when closed by clicking on backing
--*/	
	zim.Pane = function(container, width, height, label, color, drag, resets, modal, corner, backingAlpha, shadowColor, shadowBlur, center) {
		
		function makePane() {
			
			// if (zon) zog("zim build - Pane");
			
			if (zot(container) || !container.getBounds) {zog("zim build - Pane(): Please pass in a reference to a container with bounds set as first parameter");	return;}
			if (!container.getBounds()) {zog("zim build - Pane(): Please give the container bounds using setBounds()"); return;}
			if (zot(container.getStage)) {zog("zim build - Pane(): Please give the container that has a stage property"); return;}
			
			if (zot(width)) width=200;
			if (zot(height)) height=200;
			if (zot(label)) label = null;			
			if (typeof label === "string" || typeof label === "number") label = new zim.Label(label, 40, "arial", "black");
			if (zot(color)) color="white";
			if (zot(drag)) drag=false;
			if (zot(resets)) resets=false;
			if (zot(modal)) modal=true;
			if (zot(corner)) corner=20;
			if (zot(backingAlpha)) backingAlpha=.14;
			if (zot(shadowColor)) shadowColor="#333";
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
			backing.on("click", function(e) {
				that.hide();
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
			if (shadowBlur > 0) display.shadow = new createjs.Shadow(shadowColor, 8, 8, shadowBlur);		
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
				});
			}
			
			this.addChild(display);
			
			if (label) {
				if (center) {
					label.x = -label.getBounds().width/2;
					label.y = -label.getBounds().height/2;
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
				container.removeChild(that);			
				container.getStage().update();	
				if (resets) {
					if (!isNaN(that.resetX)) that.x = that.resetX;					
					if (!isNaN(that.resetY)) that.y = that.resetY;
				}
			}			
			this.show = function() {
				that.x = (container.getBounds().width) /2;
				that.y = (container.getBounds().height) /2;
				if (center && label) {
					label.x = -label.getBounds().width/2;
					label.y = -label.getBounds().height/2;
				}
				container.addChild(that);			
				container.getStage().update();	
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
			}
		}
		
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time		
		makePane.prototype = new createjs.Container();
		makePane.prototype.constructor = zim.Pane;
		return new makePane();
		
	}
	
	
/*--
zim.Waiter = function(container, speed, backingColor, circleColor, corner, shadowColor, shadowBlur)

Waiter Class

extends a createjs.Container
adds a little animated three dot wait widget
var waiter = new zim.Waiter(parameters); 
you need to call the waiter.show() to show the waiter and waiter.hide() to hide it
you do not need to add it to the stage - it adds itself centered
you can change the x and y (with origin and registration point in middle)

PARAMETERS
pass in the container for the waiter (usually the stage) 
pass in the speed in ms for the cycle time (default 600ms)
pass in backing color and dot color
corner is the corner radius default 14
color and value for shadow blur - 0 for no shadow

METHODS
show() - shows the waiter
hide() - hides the waiter

PROPERTIES
display - reference to the waiter backing graphic

--*/	

	zim.Waiter = function(container, speed, backingColor, circleColor, corner, shadowColor, shadowBlur) {
		
		function makeWaiter() {
			
			// if (zon) zog("zim build - Waiter");
			
			if (zot(container) || !container.getBounds) {zog("zim build - Waiter(): Please pass in a reference to a container with bounds set as first parameter");	return;}
			if (!container.getBounds()) {zog("zim build - Waiter(): Please give the container bounds using setBounds()"); return;}
			if (zot(container.getStage)) {zog("zim build - Waiter(): Please give the container that has a stage property"); return;}

			if (zot(speed)) speed=600; // ms cycle time
			if (zot(backingColor)) backingColor="orange";
			if (zot(circleColor)) circleColor="white";
			if (zot(corner)) corner=16;
			if (zot(shadowColor)) shadowColor="#444";
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
			g.beginFill(backingColor);
			g.drawRoundRect(0, 0, width, height, corner);
			if (shadowBlur > 0) display.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);		
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
			}
		}
		
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time		
		makeWaiter.prototype = new createjs.Container();
		makeWaiter.prototype.constructor = zim.Waiter;
		return new makeWaiter();
		
	}	


/*--
zim.Stepper = function(stepArray, width, backingColor, strokeColor, label, vertical, arrows, corner, shadowColor, shadowBlur, loopStepper)

Stepper Class

extends a createjs.Container
lets you step through a list of strings or numbers with arrows or keyboard arrows
var stepper = new zim.Stepper(parameters); 

PARAMETERS
pass in an array of strings or numbers to display one at a time - default 1-10
width is the width of the text box - default 100 (you can scale the whole stepper if needed)
a backingColor for the arrows and the text box - default white
a strokeColor color for the box - default null - no stroke
an optional label which can be used to define the text properties
vertical if you want the numbers above and below - default false - left and right of text
arrows - use keyboard arrows - default true (will always show graphical arrows)
corner is the radius of the text box corners default 10
shadowColor defaults to #444
value for shadow blur (default 14) - 0 for no shadow
loopStepper - defaults to false so will not loop around or go back past 0 index (unless set to true)

PROPERTIES
currentIndex - gets or sets the current index of the array and display
currentValue - gets or sets the current value of the array and display
stepperArray - gets or sets the stepArray - you should manually set the desired currentIndex if you change this
arrowPrev, arrowNext - access to the graphical zim Triangle objects (createjs.Containers)
textBox - access to the text box backing shape
loop - does the stepper loop

METHODS
next() - goes to next
prev() - goes to previous
dispose() - removes listeners and deletes object

EVENTS
dispatches a "change" event when changed by pressing an arrow or a keyboard arrow
--*/	
	zim.Stepper = function(stepArray, width, backingColor, strokeColor, label, vertical, arrows, corner, shadowColor, shadowBlur, loopStepper) {
		
		function makeStepper() {
			
			// if (zon) zog("zim build - Stepper");
			
			if (zot(stepArray)) stepArray = [0,1,2,3,4,5,6,7,8,9];
			if (zot(width)) width=200; 
			if (zot(backingColor)) backingColor="white";
			if (zot(strokeColor)) strokeColor=null;
			if (zot(label)) label = "";			
			if (typeof label === "string" || typeof label === "number") label = new zim.Label(label, 64, "arial", "#555");			
			if (zot(vertical)) vertical=false;
			if (zot(arrows)) arrows=true;
			if (zot(corner)) corner=16;
			if (zot(shadowColor)) shadowColor="rgba(0,0,0,.3)";
			if (zot(shadowBlur)) shadowBlur=14;
			if (zot(loopStepper)) loopStepper=false;		
			
			var that = this;
			var index;
			var height = 100;
			var boxSpacing = height/4;
					
			//var prev = this.arrowPrev = new zim.Triangle(height, height*.8, height*.8, backingColor);
			//if (shadowBlur > 0) prev.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);
			//this.addChild(prev);
			
			label.mouseChildren = false;
			label.mouseEnabled = false;
			
			var prev = this.arrowPrev = new createjs.Container();
			this.addChild(prev);
			var prevBacking = new createjs.Shape();
			prevBacking.graphics.f("rgba(255,255,255,.11)").r(0,0,height*1.5,height*1.5);
			prevBacking.regX = height*1.5 / 2;
			prevBacking.regY = height*1.5 / 2 + boxSpacing/2;
			//prev.addChild(prevBacking);
			prev.hitArea = prevBacking;
			
			var arrowPrev = new zim.Triangle(height, height*.8, height*.8, backingColor);
			if (shadowBlur > 0) prev.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);
			prev.addChild(arrowPrev);
			prev.cursor = "pointer";
			prev.on("click", function(e) {step(-1);});
			
			if (vertical) {
				prev.rotation = 0;
				prev.x = width/2;
				prev.y = prev.getBounds().height/2;
			} else {
				prev.rotation = -90;
				prev.x = prev.getBounds().height/2;
				prev.y = prev.getBounds().width/2;
			}
			
			var box = this.textBox = new createjs.Shape();
			box.cursor = "pointer";
			this.addChild(box);
			box.setBounds(0, 0, width, height);
			if (strokeColor != null) box.graphics.s(strokeColor).ss(1.5);
			box.graphics.f(backingColor).rr(0, 0, width, height, corner);
			if (shadowBlur > 0) box.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);		

			if (vertical) {
				box.y = arrowPrev.height + boxSpacing;
			} else {
				box.x = arrowPrev.height + boxSpacing;
			}
			// label
			
			this.addChild(label);
			if (stepArray.length > 0) {
				// index = Math.floor(stepArray.length/2)
				index = 0;
				label.text = stepArray[index];
			}
			label.x = box.x+(box.getBounds().width-label.getBounds().width)/2;
			label.y = box.y+(box.getBounds().height-label.getBounds().height)/2;

			var next = this.arrowNext = new createjs.Container();
			this.addChild(next);
			var nextBacking = new createjs.Shape();
			nextBacking.graphics.f("rgba(255,255,255,.01)").r(0,0,height*1.5,height*1.5);
			nextBacking.regX = height*1.5 / 2;
			nextBacking.regY = height*1.5 / 2 + boxSpacing/2;
			next.hitArea = nextBacking;
			
			var arrowNext = new zim.Triangle(height, height*.8, height*.8, backingColor);
			if (shadowBlur > 0) next.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);
			next.addChild(arrowNext);
			
			next.cursor = "pointer";
			next.on("click", function(e) {step(1);});
			box.on("click", function(e) {step(1);});
			
			if (vertical) {
				next.rotation = 180;
				next.x = width/2;
				next.y = box.y + box.getBounds().height + next.getBounds().height/2 + boxSpacing;
			} else {
				next.rotation = 90;
				next.x = box.x + box.getBounds().width + next.getBounds().height/2 + boxSpacing;
				next.y = next.getBounds().width/2;
			}
			
			setLabel(index);
			
			function step(n) {
				var nextIndex = index + n;
				if (!loopStepper) {
					if (nextIndex > stepArray.length-1) {
						box.cursor = "default";
						return;
					} else {
						box.cursor = "pointer";
					}
					if (nextIndex < 0) return;
				} else {
					if (nextIndex > stepArray.length-1) nextIndex = 0;
					if (nextIndex < 0) nextIndex = stepArray.length-1;
				}
				setLabel(nextIndex);				
			}
			
			Object.defineProperty(this, 'currentIndex', {
				get: function() {				
					return index;
				},
				set: function(value) {					
					index = Math.min(stepArray.length-1, Math.max(0, value));
					setLabel(index);
				}
			});
			
			Object.defineProperty(this, 'currentValue', {
				get: function() {				
					return stepArray[index];
				},
				set: function(value) {					
					if (stepArray.indexOf(value) > -1) {
						index = stepArray.indexOf(value);	
					}
					setLabel(index);
				}
			});
			
			Object.defineProperty(this, 'loop', {
				get: function() {				
					return loopStepper;
				},
				set: function(value) {					
					loopStepper = value;
					setLabel(index);
				}
			});
			
			Object.defineProperty(this, 'stepperArray', {
				get: function() {				
					return stepArray;
				},
				set: function(value) {					
					stepArray = value;
				}
			});
			
			function setLabel(n) {
				index = n;
				label.text = stepArray[index];
				label.x = box.x+(box.getBounds().width-label.getBounds().width)/2;
				label.y = box.y+(box.getBounds().height-label.getBounds().height)/2;
				prev.alpha = 1;
				arrowPrev.setFill(backingColor);
				prev.cursor = "pointer";
				next.alpha = 1;
				arrowNext.setFill(backingColor);
				next.cursor = "pointer";
				if (!loopStepper) {
					if (index == 0) {
						prev.alpha = .8;
						arrowPrev.setFill("#aaa");
						prev.cursor = "default";
					} 
					if (index == stepArray.length-1) {
						next.alpha = .8;
						arrowNext.setFill("#aaa");
						next.cursor = "default";
					}
				}
				if (label.getStage()) label.getStage().update();
				that.dispatchEvent("change");
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
				
			}
		}
		
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time		
		makeStepper.prototype = new createjs.Container();
		makeStepper.prototype.constructor = zim.Stepper;
		return new makeStepper();
		
	}	
	
	
/*--
zim.Slider = function(min, max, step, button, barLength, barWidth, barColor, vertical, useTicks)

Slider Class

extends a createjs.Container
a traditional slider - will give values back based on min and max and position of button (knob)
var slider = new zim.Slider(parameters); 
slider.on("change", function() {zog(slider.currentValue);}); 

PARAMETERS
pass in min and max amounts for slider (default 0, 10)
step for the slider (default 0 - for continuous decimal number)
a zim.Button (default small button with no label)
barLength (default 300), barWidth (default 3), varColor (default #666)
vertical (default false) for horizontal or vertical slider
useTicks (default false) set to true to show small ticks for each step (step > 0)

PROPERTIES
currentValue - gets or sets the current value of the slider
min, max, step - the assigned values (read only)
bar - gives access to the bar zim.Rectangle
button - gives access to the zim.Button
ticks - gives access to the ticks (to position these for example)

METHODS
disable() - stops slider from working
enable() - starts slider working if it was disabled
dispose() - removes listeners and deletes object

EVENTS
dispatches a "change" event when button is slid on slider
--*/	
	zim.Slider = function(min, max, step, button, barLength, barWidth, barColor, vertical, useTicks) {
		
		function makeSlider() {
			
			// if (zon) zog("zim build - Slider");
			
			if (zot(min)) min = 0;
			if (zot(max)) max = 10; 
			if (max-min == 0) {zog("ZIM Slider range must not be 0"); return;}
			if (zot(step)) step = 0;
			if (zot(barLength)) barLength = 300; 
			if (zot(barWidth)) barWidth = 3;
			if (zot(barColor)) barColor = "#666";
			if (zot(vertical)) vertical = false;
			if (zot(useTicks)) useTicks = false;
			
			if (zot(button)) {
				var w = 30; var h = 40;
				if (vertical) {w = 50; h = 40;}
				button = new zim.Button(w,h,"","#fff","#ddd","#666",1,0,null,null,30);
			}
			
			var that = this;			
			var myValue = min;
			this.button = button;
			
			var bar, rect, bounds, ticks, g;
			
			if (useTicks && step != 0) {
				ticks = this.ticks = new createjs.Shape();
				this.addChild(ticks);
				g = ticks.graphics;
				g.ss(1).s(barColor);
				var stepsTotal = (max - min) / step;
				var spacing = barLength / stepsTotal;
			}

			if (vertical) {
				if (useTicks && step != 0) {
					for (var i=0; i<=stepsTotal; i++) {
						g.mt(0, spacing*i).lt(20, spacing*i);
					}
					ticks.x = 10;					
				}
				bar = this.bar = new zim.Rectangle(barWidth, barLength, barColor);
				this.addChild(bar);
				zim.centerReg(button);
				this.addChild(button);
				bounds = bar.getBounds();
				rect = new createjs.Rectangle(bounds.width/2, bounds.y, 0, bounds.height);
			} else {
				if (useTicks && step != 0) {
					for (var i=0; i<=stepsTotal; i++) {
						g.mt(spacing*i,0).lt(spacing*i,-20);
					}
					ticks.y = -10;					
				}
				bar = this.bar = new zim.Rectangle(barLength, barWidth, barColor);
				this.addChild(bar);
				zim.centerReg(button);
				this.addChild(button);
				bounds = bar.getBounds();
				rect = new createjs.Rectangle(bounds.x, bounds.height/2, bounds.width, 0);
			}
			button.x = rect.x;
			button.y = rect.y;
			
			function snap(v) {
				if (step == 0) return v;
				return Math.round(v/step)*step;	
			}

			var diffX, diffY;
			var lastValue = 0;
			button.on("mousedown", function(e) {
				var point = that.globalToLocal(e.stageX, e.stageY);
				diffX = point.x - button.x;
				diffY = point.y - button.y;
			});
							
			button.on("pressmove", function(e) {	
				var point = that.globalToLocal(e.stageX, e.stageY);				
				var p = checkBounds(point.x-diffX, point.y-diffY, rect); 
				if (vertical) {
					button.x = p.x;
					myValue = snap(p.y / barLength * (max - min));
					button.y = myValue * barLength / (max - min);
					myValue += min;
					if (button.y != lastValue) {
						that.dispatchEvent("change");						
					}
					lastValue = button.y;
				} else {
					myValue = snap(p.x / barLength * (max - min));
					button.x = myValue * barLength / (max - min);
					myValue += min;
					button.y = p.y;
					if (button.x != lastValue) {
						that.dispatchEvent("change");						
					}
					lastValue = button.x;
				}
				that.getStage().update();
			});

			function checkBounds(x,y,rect) {		
				x = Math.max(rect.x, Math.min(rect.width, x));
				y = Math.max(rect.y, Math.min(rect.height, y));
				return {x:x,y:y}				
			}	

			Object.defineProperty(this, 'currentValue', {
				get: function() {
					return myValue;
				},
				set: function(value) {		
					if (value < min) value = min;			
					if (value > max) value = max;
					value = snap(value);
					if (vertical) {
						button.y = (value - min) / (max - min) * barLength;
						lastValue = button.y;
					} else {
						button.x = (value - min) / (max - min) * barLength;
						lastValue = button.x;
					}
					if (that.getStage()) that.getStage().update(); 
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
			
			this.disable = function() {
				that.mouseChildren = false;
				that.mouseEnabled = false;
			}
			
			this.enable = function() {
				that.mouseChildren = true;
				that.mouseEnabled = true;
			}
			
			this.dispose = function() {
				button.removeAllEventListeners();
			}
		}
		
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time		
		makeSlider.prototype = new createjs.Container();
		makeSlider.prototype.constructor = zim.Slider;
		return new makeSlider();
		
	}	
	
/*--
zim.Parallax = function(stage, damp, layers, auto)

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

PARAMETERS
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

METHODS 
addLayer({layer object properties}) - adds a layer
removeLayer(index) - removes a layer based on order added
step(input) - used when auto is false to send in custom input data
immediate([]) - immediately sets the target value for each layer object (no damping)
dispose() - removes listeners

PROPERTIES
damp - allows you to dynamically change the damping
--*/	
	zim.Parallax = function(stage, damp, layers, auto) {
						
		if (zon) zog("zim build - Parallax");
		
		if (zot(stage) || !stage.getBounds) {zog("zim build - Parallax(): please pass in the stage with bounds as first parameter"); return;}
		if (!stage.getBounds()) {zog("zim build - Parallax(): Please give the stage bounds using setBounds()");	return;}
		if (zot(auto)) {auto = true;}
		
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
			if (auto) createjs.Ticker.off("tick", ticker);
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
			var ticker = createjs.Ticker.on("tick", animate);	
			createjs.Ticker.setFPS(60);
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
					if (o.input == "mouseX") o.obj[o.prop] -= o[o.prop] / 2;
				}
			}			
			stage.update();
		}
	}
	
	
/*--
zim.Scroller = function(b1, b2, speed, direction, horizontal, gapFix)

Scroller Class

animates a backing either horizontally or vertically (not both)
make a new zim.Scroller(parameters) object 
the Scroller object will animate and swap the backgrounds when needed

PARAMETERS
pass in two backgrounds (that look the same - clone them)	
pass in the speed, direction and a boolean for horizontal (default true)
setting horizontal to false will animate vertically
you can adjust the speed and direction properties dynamically
you cannot adjust the backings and horizontal dynamically
to change your animation, dispose() of the Scroller object and make a new one
disposing just removes the ticker - you have to remove the backings
not sure what is causing a small gap to appear over time 
but if your background can overlap a little you can pass in a gapFix of 10 pixels etc.

METHODS
dispose() - get rid of the event listeners - you need to remove the backings 

PROPERTIES
speed - how fast the animation is going in pixels per frame (ticker set at 60)
direction - either left or right if horizontal or up or down if not horizontal
gapFix - if spacing occurs over time you can set the gapFix dynamically
--*/
	zim.Scroller = function(b1, b2, speed, direction, horizontal, gapFix) {
		
		if (zon) zog("zim build - Scroller");
		if (zot(b1) || !b1.getBounds || zot(b2) || !b2.getBounds) return;
		if (zot(horizontal)) horizontal = true;
		var that = this; // we keep animate protected but want to access public properties
		
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
						
		var ticker = createjs.Ticker.on("tick", animate);	
		createjs.Ticker.setFPS(60);
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
			createjs.Ticker.off("tick", ticker);
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

PARAMETERS
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
the Swipe object provides a direction property of "left", "right", "up", or "down"
the Swipe object provides an obj property of what object was swiped on
for instance if e is the event object
then e.target is the Swipe object so use e.target.direction
did not dispatch a custom event due to lack of support in early IE
Swipe also dispatches a direction of "none" if the mouse movement is not a swipe
this can be used to snap back to an original location	
also dispatches a "swipedown" event for convenience on a mousedown	
--*/	
	zim.Swipe = function(obj, distance, duration) {
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
					// may as well use 45 degrees rather than figure for aspect ratio
					if (Math.abs(mouseX - startX) > Math.abs(mouseY - startY)) {
						if (mouseX - startX > that.distance) {that.direction="right"; that.dispatchEvent("swipe"); swipeCheck=true;}	
						if (startX - mouseX > that.distance) {that.direction="left"; that.dispatchEvent("swipe"); swipeCheck=true;}
					} else {
						if (mouseY - startY > that.distance) {that.direction="down"; that.dispatchEvent("swipe"); swipeCheck=true;}
						if (startY - mouseY > that.distance) {that.direction="up"; that.dispatchEvent("swipe"); swipeCheck=true;}
					}
					if (!swipeCheck) {
						that.direction="none"; that.dispatchEvent("swipe");
					}
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

PARAMETERS
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
and myPages.oldPage being set to the old page (e.target.page)
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

PARAMETERS
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

note, the class does actually add rectangle shapes to your page
the spot is a pixel rect with an alpha of .01 and then uses a hitArea of a backing shape
this could have been done with "math" alone but rollover cursor would be a pain
the class creates zim.HotSpot objects - see the class underneath this one
--*/
	zim.HotSpots = function(spots, local, mouseDowns) {
		function makeHotSpots() {
			if (zot(spots) || !Array.isArray(spots)) {zog("zim pages - HotSpots():\nplease provide an array of HotSpot data"); return;}
			if (zot(local)) local = true;
			if (zot(mouseDowns)) mouseDowns = false;
			
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
					if (!button.getBounds()) {
						zog("zim pages - HotSpots(): HotSpots button needs bounds");
						return;	
					}
					data.rect = [button.x, button.y, button.getBounds().width, button.getBounds().height];	
				} 
				
				hs = new zim.HotSpot(data.page,data.rect[0],data.rect[1],data.rect[2],data.rect[3],data.call,local);	
				hs.zimHSpage = data.page;	
				hs.button = button;
				hotSpots.push(hs);
				hs.on("click", hsEvent);
				if (button) {					
					// stop hotSpot from taking away rollovers on button
					hs.spot.mouseEnabled = false;
					hs.spot.mouseChildren = false;
					// but now need to add click to button as hotSpot will not work
					button.zimHScall = data.call;
					button.zimHSEvent = button.on("click", hsEvent);
					if (!mouseDowns) {	
						button.zimHSMDEvent = button.on("mousedown",function(e) {	
							e.stopImmediatePropagation();		
						});
					}
					button.cursor = "pointer";				
				}									
			}
			
			function hsEvent(e) {
				if (typeof(e.currentTarget.zimHScall) == "function") {
					e.currentTarget.zimHScall();
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
							hs.button.off("click", hs.button.zimHSEvent);	
							hs.button.zimHSEvent = null;	
						}
						hs.off("click", hsEvent);
						hs.dispose();						
						hotSpots.splice(i,1);
					}
				}
			}		
				
			this.dispose = function() {				
				for (var i=0; i<hotSpots.length; i++) {
					hs = hotSpots[i];
					if (hs.button) {						
						hs.button.off("click", hs.button.zimHSEvent);	
						hs.button.zimHSCall = null;
						hs.button.zimHSEvent = null;					
					}
					hs.off("click", hsEvent);	
					hs.dispose();
				}				
			}					
		}
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time	
		makeHotSpots.prototype = new createjs.Container();
		makeHotSpots.prototype.constructor = zim.HotSpots;	
		return new makeHotSpots();			
	}	
	
	
/*--
zim.HotSpot = function(obj, x, y, w, h, call, local)

HotSpot Class

adds an invisible button to a container object (often think of this as the page)
var hs = new zim.HotSpot();
if you want multiple spots it is more efficient to use the HotSpots class above
which manages multiple HotSpot objects (otherwise you end up with multiple event functions)
the spot is a pixel rect with an alpha of .01 and then uses a hitArea of a backing shape
the spot will get a cursor of "pointer"

PARAMETERS
the container object in which to place the hotspot
the x, y, width and height of the hotspot relative to the stage
call is the function to call when the spot is clicked
local defaults to true and should be used when the element scale independently from the stage
in local mode you must add coordinates of the hotSpot inside its container
if set to false then you pass in global coordinates and hotSpot will convert them

METHODS	
show() - helps when creating the spot to see where it is
hide() - hides the hotspot
dispose() - removes the listener and the spot

PROPERTIES
spot - the actual hotSpot object that gets added to the container can be accessed with the spot property
eg. hs.spot
--*/	
	zim.HotSpot = function(obj, x, y, w, h, call, local) {		
		function makeHotSpot() {			
			if (zot(obj) || !obj.addChild) {zog("zim pages - HotSpot():\nPlease pass in container object for obj"); return;}
			if (obj instanceof createjs.Container == false) zog("zim build - HotSpot():\nObjects passed in should be Containers");
			if (zot(local)) local = true;			
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
						
			var butEvent = but.on("click",function() {				
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
				but.off("click", butEvent);
				obj.removeChild(but);
				delete but;	
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

PARAMETERS
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

PARAMETERS
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

PARAMETERS
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
		function makeLayout() {
			// if (zon) zog ("zim pages - Layout()");						
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

PARAMETERS
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
zil - reference to zil events that stop canvas from shifting

METHODS 
remakeCanvas(width, height) - removes old canvas and makes a new one and a new stage
will have to set your local stage, stageW and stageH variables again
dispose() - only removes canvas, resize listener and stage

--*/	
	zim.Frame = function(scaling, width, height, rollover, touch, scrollTop) {
		function makeFrame() {
		
			if (zot(scaling)) scaling = "full";
			if (zot(width)) width = 500;
			if (zot(height)) height = 500;
			if (zot(rollover)) rollover = true;
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
			
			window.addEventListener('load', init);
			if (scaling != "none") window.addEventListener('resize', sizeCanvas);
			
			function init() {
				
				makeCanvas();
				makeStage();
	
				// for older mobile - pan hides the location bar
				if (scrollTop) {setTimeout(function() {window.scrollTo(0, 0);}, 100);}
	
				that.dispatchEvent("ready");
			
				if (scaling=="full") {
					appReady = true;
					fullResize();
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
				if (scaling == "full") {
					canvas.setAttribute("width", largest);
					canvas.setAttribute("height", largest);
				} else {
					canvas.setAttribute("width", stageW);
					canvas.setAttribute("height", stageH);
				}
				document.body.appendChild(canvas);
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