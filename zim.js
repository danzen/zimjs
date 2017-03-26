// ZIM js Interactive Media framework http://zimjs.com by Dan Zen http://danzen.com (c) 2017
// Also see http://zimjs.com/code/distill to minify only the functions in your app
// free to use - donations welcome of course! http://zimjs.com/donate


////////////////  ZIM WRAP  //////////////

// Zim Wrap creates global wrapper functions for less typing

// set var zon=true before calling zim scripts to show script comments
if (typeof zon === "undefined") zon = false; // comments from zim scripts

/*--
zog(item1, item2, etc.)         ~ log

zog
global function

DESCRIPTION
Short version of console.log()
to log the item(s) to the console.
Use F12 to open your Browser console.

EXAMPLE
zog("hello", circle.x); // logs these values to the console
END EXAMPLE

PARAMETERS
item1, item2 (optional), etc. - items (expressions) to log to the console

RETURNS items it is logging separated by a space if more than one
--*///+0
// reported a bug in Firefox: https://bugzilla.mozilla.org/show_bug.cgi?id=1280818
// that after FF 46 binding the console did not show file and line number
// this is fixed in FF 50
var zog = console.log.bind(console);
//-0

/*--
zid(string)                     ~ id

zid
global function

DESCRIPTION
Short version of document.getElementById(string)
to access an HTML tag by its id.

EXAMPLE
zid("logo").addEventListener("click", function(){});
END EXAMPLE

PARAMETERS
string - the id of the tag you are wanting to access

RETURNS HTML tag with id of string or null if not found
--*///+1
function zid(s) {
	z_d("1");
	return document.getElementById(s);
} //-1

/*--
zss(string)                     ~ css

zss
global function

DESCRIPTION
Short version of document.getElementById(string).style
to access the style property of an HTML tag by the tag id.

EXAMPLE
zss("logo").margin = "10px";
END EXAMPLE

PARAMETERS
string - the id of the tag whose style you are wanting to access

RETURNS style property of HTML tag with id of string or undefined if not found
--*///+2
function zss(s) {
	z_d("2");
	if (document.getElementById(s)) {return document.getElementById(s).style;}
	else if (zon) zog("zim wrap - zss(): id not found");
} //-2

/*--
zgo(url, target, modal)         ~ go

zgo
global function

DESCRIPTION
Short version of either window.location.href or window.open
to open a link in the same window or a specified window.

EXAMPLE
zid("logo").addEventListener("click", function(){zgo("http://zimjs.com");});

// with a ZIM object:
var button = new zim.Button();
button.center(stage);
button.on("click", function() {zgo("http://zimjs.com");});
END EXAMPLE

PARAMETERS
url - the link to use (Absolute, Relative or Virtual)
target - (default null) the string name of a window (tab) _blank for new window each time
modal - (default false) set to true to force user to close window

RETURNS null if opening in same window or reference to the window otherwise
--*///+3
function zgo(u,t,w,h,f,m) {
	z_d("3");
	if ((zot(t) && t != "") || t == "_self") {
		window.location.href = u;
	} else {
		var added = "";
		if (w) added += "width=" + w + ",";
		if (h) added += "height=" + h + ",";
		if (f) added += "fullscreen=yes,";
		if (m) added += "modal=yes,alwaysRaised=yes";
		return window.open(u,t,added);
	}
} //-3

/*--
zum(string)                     ~ num

zum
global function

DESCRIPTION
Takes the units off a string number.
Converts "10px" string from styles to number 10, for instance.
If there is no value then this will return 0.

EXAMPLE
// in HTML
<div id="logo" style="position:relative; left:10px">LOGO</div>

// in JavaScript
var left = zum(zss("logo").left); // converts 10px to the Number 10
left += 20; // adds 20 to 10
zss("logo").left = left + "px"; // assigns 30px to left style
END EXAMPLE

PARAMETERS
string - the string representation of a number eg. "10px"

RETURNS a Number
--*///+4
function zum(s) {
	z_d("4");
	if (zot(s)) return;
	return Number(String(s).replace(/[^\d\.\-]/g, ''));
} //-4

/*--
zot(value)                      ~ not

zot
global function

DESCRIPTION
Test to see if value has no value (value must exist as var or parameter)
or if value has been set to null.
Good for setting function defaults.
Really just asking if the value == null.
Often we forget exactly how to do this - it is tricky:
value === null, value == undefined, value == 0, !value DO NOT WORK.

EXAMPLE
if (zot(width)) width = 100;
// equivalent to
if (width == null) width = 100;
END EXAMPLE

PARAMETERS
value - a variable or parameter you want to see if there is no value assigned

RETURNS Boolean true if value does not exist
--*///+4.5
function zot(v) {
	return v==null; // both null and undefined match but not false or 0
}//-4.5

/*--
zop(e)                          ~ stop

zop
global function

DESCRIPTION
Stop event propagation to subsequently added existing listeners.
Must pass it e || window.event from your event function.
NOTE: this is not canceling the default action -
to cancel default action use e.preventDefault();

EXAMPLE
zid("button").addEventListener("click", function(e) {
	// do something
	zop(e||window.event);
});
END EXAMPLE

PARAMETERS
e - the event object from your event function
 	collect the event object as e and then pass in e || window.event

RETURNS null
--*///+5
function zop(e) {
	z_d("5");
	if (zot(e)) return;
	if (e.stopImmediatePropagation) e.stopImmediatePropagation();
	if (window.event) window.event.cancelBubble=true;
} //-5

/*--
zil()                           ~ still

zil
global function

DESCRIPTION
Stop keys from moving content - arrows, spacebar, pgup, pgdown, home, end.
Stop scroll wheel from moving content - scrolling the canvas for instance.
ZIM Frame does this in the full, fit and outside scale modes.
If not using Frame, then you can do this once at the start of your code.
Returns an array of references to three listeners: [keydown, mousewheel and DOMMouseScroll].
Use these to removeEventListeners.
The arrows, etc, still work but just not their default window behaviour.

EXAMPLE
// at the top of your code
var listenersArray = zil();
// key and mousewheel arrows, spacebar, etc.
// will have their default actions stopped until you remove the listeners:
// window.removeEventListener("keydown", listenersArray[0]); // etc.
END EXAMPLE

RETURNS an Array
--*///+6
function zil() {
	z_d("6");
	var a = function(e) {if (!e) e = event; if (e.keyCode && (e.keyCode >= 32 && e.keyCode <= 40)) e.preventDefault();}
	var b = function(e) {if (!e) e = event; e.preventDefault();}
	var c = b;
	window.addEventListener("keydown", a);
	window.addEventListener("mousewheel", b);
	window.addEventListener("DOMMouseScroll", c);
	return [a, b, c];
} //-6

/*--
zet(selector)                   ~ set

zet
global function

DESCRIPTION
Uses document.querySelectorAll() to get a list of tags.
Returns a ZIM Zet object which can be used to add events or styles to the set.

EXAMPLE
zet(".class").on("click", function(){}); // would add function event to all tags with the class
zet("p").css("color", "goldenrod"); // would make the text of all paragraphs goldenrod
zet("#test").css({color:"red", "backgound-color":"blue", paddingLeft:"20px"});

// set a custom open property on all section bars to false
zet("section .bar").prop("open", false);
// set the custom open property on all section bars to true and set the innerHTML to CLOSE
zet("section .bar").prop({open: true, innerHTML: "CLOSE"});
END EXAMPLE

PARAMETERS
selector -  a CSS query selector such as a class, id, tag, or multiple selectors separated by commands
	can also be complex selectors suchs as ".class img"

METHODS (on the returned Zet object)
zet(selector).on(type, function) - a shortcut for addEventListener() and will be added to all tags matching the selector
zet(selector).off(type, function) - a shortcut for removeEventListener() and will be remove from all tags matching the selector
zet(selector).css(property, value) - gets and sets styles
	- gets the first programmatic property if a single string property is passed
	- sets the property to the value on each of the Zet's tags from the selector passed to zet()
	- if an object of properties and values is passed as the single parameter then sets all these properties
	- NOTE: style names do not need quotes unless the dash is used - so camelCase does not require quotes
	- NOTE: remember that commas are used for objects - not the semi-colon as in CSS
zet(selector).prop(property, value) - gets or sets a property on a set of tags
	- if an object of properties and values is provided as a single parameter, then sets all these on the set
	- else if no value is set then returns an array of the set tags values for the property
	- else if value is a single value then sets the property of the tags in the set to the value

PROPERTIES  (on the returned Zet object)
tags - an HTML tag list

RETURNS Zet object with on(), off(), css() methods and tags property (HTML tag list)
--*///+6.1
function zet(selector) {
	z_d("6.1");
	function Zet() {
		var that = this;
		this.on = function(type, call) {
			if (zot(selector) || zot(type) || zot(call)) return;
			var tags = that.tags;
			for (var i=0; i<tags.length; i++) {
				tags[i].addEventListener(type, call);
			}
		}
		this.off = function(type, call) {
			if (zot(selector) || zot(type) || zot(call)) return;
			var tags = that.tags;
			for (var i=0; i<tags.length; i++) {
				tags[i].removeEventListener(type, call);
			}
		}
		Object.defineProperty(that, 'tags', {
			get: function() {
				if (zot(selector)) return [];
				if (typeof selector == 'string' || selector instanceof String) {
					return document.querySelectorAll(selector);
				} else { // selector is already an object - assume a tag
					if (typeof (selector).innerHTML == "string") return [selector];
					return [];
				}
			},
			set: function(t) {
			}
		});
		this.css = function(property, value) {
			// if property is object then assign all props in object
			var tags = that.tags;
			for (var i=0; i<tags.length; i++) {
				if (arguments.length == 1 && arguments[0].constructor === {}.constructor) {
					for (var p in property) {
						tags[i].style[p] = property[p];
					}
				} else if (arguments.length == 1) {
					return that.tags[0].style[property];
				} else {
			    	tags[i].style[property] = value;
				}
			}
		}
		this.prop = function(property, value) {
			if (zot(property)) return;
			var tags = that.tags;
			var a = [];
			for (var i=0; i<tags.length; i++) {
				if (zot(value)) {
					if (property.constructor === {}.constructor) {
						for (var p in property) {
							tags[i][p] = property[p];
						}
					} else {
						a.push(tags[i][property]);
					}
				} else {
			    	tags[i][property] = value;
				}
			}
			if (zot(value)) return a;
		}
	}
	return new Zet();
} //-6.1

/*--
zob(func, args, sig, scope)     ~ object

zob
global function

DESCRIPTION
A system to build functions or classes that allow traditional parameters
or a configuration object passed in as a single parameter.
The configuration object has property names that match the function arguments.

To use zob on your own functions, pass in a function and the function's arguments
and insert zob into first line of your function as shown below.
Replace yourFunction with a reference to your function but keep arguments as is.

EXAMPLE
function test(a,b,c){
	var duo; if (duo = zob(yourFunction, arguments)) return duo;
};
test(1,null,3); // traditional parameters in order
test({a:1,c:3}); // configuration object with zob
END EXAMPLE

NOTE: if you are minifying the file then you need to do an extra step
add a string version of the signature of your function above the duo call
then pass the signature in as a parameter to zob()

EXAMPLE
var sig = "a,b,c";
var duo; if (duo = zob(yourFunction, arguments, sig)) return duo;
END EXAMPLE

NOTE: if you are running the function as a constructor with the new keyword
then you need to pass in this (keyword) as the last parameter (sig can be null)
this allows zob() to test to see if we need to rerun the function as a constructor

EXAMPLE
var duo; if (duo = zob(yourFunction, arguments, sig, this)) return duo;
END EXAMPLE

many of the ZIM functions and classes use this "DUO" technique
the documentation for parameters will tell you if they support DUO
works also with JS6 default parameter values

PARAMETERS
func - reference to the function you want to use params or a config object with
args - reference to the arguments property of the function (literally, use "arguments" with no quotes)
sig - (default null) a string listing of the parameters just how they are in the () not including the ()
	required if you are minifying the file as minifying changes the signature
scope - (default null) reference to this (litterally, use "this" without the quotes)
	required if the function is being run with the new keyword

RETURNS um... a Boolean
--*///+7
function isDUO(a) {return a.length == 1 && a[0].constructor === {}.constructor;}
function zob(func, args, sig, scope) {
	if (isDUO(args)) {
		z_d("7");
		var zp = args[0];
		var za = (zot(sig))?func.toString().split(/\n/,1)[0].match(/\((.*)\)/)[1].replace(/\s+/g,"").split(","):sig.replace(/\s+/g,"").split(",");
		var zv = []; var zi; var zt;
		for (zi=0; zi<za.length; zi++) {zt=za[zi].split("=")[0]; za[zi]=zt; zv.push(zp[zt]);}
		for (zi in zp) {if (za.indexOf(zi)<0) {if (zon) zog(func,"bad argument "+zi);}};
		var zr; if (zr=(func.prototype.isPrototypeOf(scope))?new (func.bind.apply(func,[null].concat(zv)))():func.apply(null,zv)) {return zr;} else {return true;}
	}
}//-7

// the above functions are global for quick usage
// start the zim module pattern - from here on, everything is stored on the zim namespace

var zim = function(zim) {


////////////////  ZIM CODE  //////////////

// Zim Code adds some general code functionality along with Browser and DOM code
// some of these are common Web solutions over the years (sorry for lack of credit)

/*--
zim.shuffle = function(array)

shuffle
zim function

DESCRIPTION
Randomly shuffles elements of an array.
Actually changes the original array (and also returns it).

EXAMPLE
var array = ["happy", "sad", "spooked"];
var randomFromArray = zim.shuffle(array)[0];
// this will be randomized each time it is run
END EXAMPLE

EXAMPLE
var array = zim.shuffle(["happy", "sad", "spooked"]);
for (var i=0; i<array.length) zog(array[i]);
// this will get random and unique elements of the array
END EXAMPLE

PARAMETERS
array - the Array to shuffle

RETURNS the modified Array
--*///+8
	zim.shuffle = function(array) {
		z_d("8");
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
	}//-8

/*--
zim.rand = function(a, b, integer, negative)

rand
zim function

DESCRIPTION
Returns a random integer between and including a and b if integer is true.
Returns a random number (with decimals) including a and up to b but not b if integer is false.
b is optional and if left out will default to 0 (includes 0).
integer is a boolean and defaults to true.
If a and b are 0 then just returns Math.random().

EXAMPLE
var speed = zim.rand(10,20); // 10, 11, 12... 18, 19 or 20

var colors = ["blue", "yellow", "green"];
var color = colors[zim.rand(colors.length-1)]; // note the length-1

// the equivalent of:
var color = colors[Math.floor(Math.random()*colors.length)];

// OR a technique I often use without using zim.rand():
// but zim.rand() is probably better
var color = zim.shuffle(colors)[0];

// here we get a speed that is either from 5 to 10 or -5 to -10
var speed = zim.rand(5,10,null,true);
END EXAMPLE

PARAMETERS
a - the first Number for the range
	if a and b are not provided, zim.rand() acts like Math.random()
	if parameter b is not provided, rand will use range 0 to and including a
b - (default 0) second Number for the range
	it does not matter if a>b or a<b
integer - (default true) set to false to include decimals in results
	if false, range will include decimals up to but not including the highest number
	if a or b have decimals this is set to false
negative - (default false) includes the negative range as well as the positive

RETURNS a Number
--*///+9
	zim.rand = function(a, b, integer, negative) {
		z_d("9");
		if (zot(a) || isNaN(a)) a = 0;
		if (zot(b) || isNaN(b)) b = 0;
		if (a%1!=0 || b%1!=0) integer = false;
		if (zot(integer)) integer = true;
		if (negative) if (Math.random()>.5) {a*=-1; b*=-1;};
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
	}//-9

/*--
zim.loop = function(obj, call, reverse, step, start, end)

loop
zim function

DESCRIPTION
1. If you pass in a Number for obj then loop() does function call that many times
and passes function call the currentIndex, totalLoops, startIndex, endIndex, obj.
By default, the index starts at 0 and counts up to one less than the number.
So this is like: for (var i=0; i<obj; i++) {}

2. If you pass in an Array then loop() loops through the array
and passes the function call the element in the array, currentIndex, totalLoops, startIndex, endIndex and the array.
So this is like: for (var i=0; i<obj; i++) {element = array[i]}

3. If you pass in an Object literal then loop() loops through the object
and passes the function call the property name, value, currentIndex, totalLoops, startIndex, endIndex, obj
So this is like: for (var i in obj) {property = i; value = obj[i];}

NOTE: If you pass in true for reverse, the loop is run backwards counting to 0 (by default)
NOTE: use return to act like a continue in a loop and go to the next loop
NOTE: return a value to return out of the loop completely like a break (and return a result if desired)


EXAMPLE
var container = new zim.Container();
zim.loop(1000, function(i) { // gets passed an index i, totalLoops 1000, startIndex 0, endIndex 999, obj 1000
	// make 1000 rectangles
	container.addChild(new zim.Rectangle());
});
stage.addChild(container);

// to continue or break from loop have the function return the string "continue" or "break"
zim.loop(10, function(i) {
	if (i%2==0) return; // skip even
	if (i>6) return "break"; // quit loop when > 6
	zog(i);
});

var colors = [frame.green, frame.yellow, frame.pink];
zim.loop(colors, function(color, index, start, end, array) { // do not have to collect all these
	zog(color); // each color
});

var person = {name:"Dan Zen", occupation:"Inventor", location:"Dundas"}
var result = zim.loop(person, function(prop, val, index, total, start, end, object) { // do not have to collect all these
	zog(prop, val); // each key value pair
	if (val == "criminal") return "criminal"; // this would return out of the loop to the containing function
});
if (result == "criminal") alert("oh no!");
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
obj - a Number of times to loop or an Array or Object to loop through
call - the function to call
	the function will receive (as its final parameters) the index, total, start, end, obj
		where the index is the current index, total is how many times the loop will run
		start is the start index, end is the end index and obj is the object passed to the loop
	the starting parameters vary depending on the type of obj:
	if the obj is a number then the first parameter is the index (no extra starting parameters given)
	if the obj is an array then the first parameter is the element at the current index
	if the obj is an object literal then the first and second parameters are the property name and property value at the current index
reverse - (default false) set to true to run the loop backwards to 0
step - (default 1) each step will increase by this amount (positive whole number - use reverse to go backwards)
start - (default 0 or length-1 for reverse) index to start
end - (default length-1 or 0 for reverse) index to end

RETURNS any value returned from the loop - or undefined if no value is returned from a loop
--*///+9.5
	zim.loop = function(obj, call, reverse, step, start, end) {

		var sig = "obj, call, reverse, step, start, end";
		var duo; if (duo = zob(zim.loop, arguments, sig)) return duo;
		z_d("9.5");
		if (zot(obj) || zot(call)) return undefined;
		if (zot(reverse)) reverse = false;
		if (zot(step) || step <= 0) step = 1;

		var type = typeof obj=="number"?"number":(obj.constructor === Array?"array":(obj.constructor === {}.constructor?"object":"invalid"));

		if (type == "invalid") {
			return undefined;
		}
		if (type == "number" || type == "array") {
			var length = type=="number"?obj:obj.length;
			var total = getTotal(length-1);
			if (total == 0) return;
			if (reverse) {
				for(var i=start; i>=end; i-=step) {
					if (type=="number") {
						var r = call(i, total, start, end, obj);
					} else { // array
						var r = call(obj[i], i, total, start, end, obj);
					}
					if (typeof r != 'undefined') return r;
				}
			} else {
				for(var i=start; i<=end; i+=step) {
					if (type=="number") {
						var r = call(i, total, start, end, obj);
					} else { // array
						var r = call(obj[i], i, total, start, end, obj);
					}
					if (typeof r != 'undefined') return r;
				}
			}
		} else if (type == "object") {
			var length = 0;
			var props = [];
			for (var i in obj) {
				length++;
				props.push(i);
			}
			var total = getTotal(length-1);
			if (total == 0) return;
			if (reverse) {
				for(var i=start; i>=end; i-=step) {
					var r = call(props[i], obj[props[i]], i, total, start, end, obj);
					if (typeof r != 'undefined') return r;
				}
			} else {
				for(var i=start; i<=end; i+=step) {
					var r = call(props[i], obj[props[i]], i, total, start, end, obj);
					if (typeof r != 'undefined') return r;
				}
			}
		}
		function getTotal(max) {
			if (zot(start)) start = reverse?max:0;
			if (zot(end)) end = reverse?0:max;
			if ((reverse && end > start) || (!reverse && start > end)) return 0;
			if ((start < 0 && end) <0 || (start > max && end > max)) return 0;
			start = Math.max(0, Math.min(start, max));
			end = Math.max(0, Math.min(end, max));
			return Math.floor((reverse?(start-end):(end-start)) / step) + 1;
		}
	}//-9.5

/*--
zim.timeout = function(time, call)

timeout
zim function

DESCRIPTION
Calls a function after the time delay - like window.setTimeout()
Uses window.requestAnimationFrame() that tends to rest when the window is not showing

NOTE: setTimeout has the time parameter last, zim.timeout has it first
so that it is consistent with zim.loop() and the CreateJS on() method

NOTE: to clear a zim.timeout you use returnID.clear() - different than window.clearTimeout(returnID)

EXAMPLE
zim.timeout(1000, function(){
	circle.x += 100;
	stage.upate();
});
// moves the circle 100 pixels after one second

// GAME to press button within one second:
var timeout = zim.timeout(1000, function() {
	zog("you lose!");
	button.enabled = false;
});
var button = new zim.Button().center(stage);
button.on("click", function() {
	zog("you win!");
	timeout.clear();
});
END EXAMPLE

PARAMETERS
time - milliseconds to wait until function is called
call - function to call when the time passes - will receive the id object as a single parameter

RETURNS a ZIM timeoutObject to pause and clear the timeout with the following methods and properties:

METHODS - of ZIM timeoutObject
pause(state) - (default true) will pause the timeout - set to false to unpause the timeout
clear() - will clear the timeout

PROPERTIES - of ZIM timeoutObject
time - the time in milliseconds that has lapsed
paused - the paused state of the timeout
--*///+9.7
	zim.timeout = function(time, call) {
		z_d("9.7");
		if (zot(call)) return;
		if (typeof call != 'function') return;
		if (zot(time)) time = 1000;
		var obj = {startTime:Date.now(), time:0, paused:false};
		var lastTime = obj.startTime;
		function next() {
			var now = Date.now()
			obj.time += now - lastTime;
			lastTime = now;
			if (obj.time >= time) {
				(call)(obj);
				obj.clear();
				return;
			}
			obj.rid = requestAnimationFrame(next);
		}
		next();
		obj.pause = function(state) {
			if (zot(state)) state = true;
			if (state) { // pausing
				cancelAnimationFrame(obj.rid);
			} else { // unpausing
				next();
			}
			obj.paused = state;
		}
		obj.clear = function() {
			if (obj) cancelAnimationFrame(obj.rid);
			for (var i in obj) {
				delete obj[i];
			}
			obj.pause = function() {};
			obj.clear = function() {};
		}
		return obj;
	}//-9.7

/*--
zim.interval = function(time, call, total, immediate)

interval
zim function

DESCRIPTION
Calls a function after each time delay - like window.setInterval().
Can pass in an Array of two times to set random time delays each interval.
Can pass in how many times you want to run the function and whether it runs right away.
Uses window.requestAnimationFrame() that tends to rest when the window is not showing.

NOTE: setInterval has the time parameter last, zim.interval has it first
so that it is consistent with zim.loop() and the CreateJS on() method

NOTE: to clear a zim.interval you use intervalObj.clear() - different than window.clearInterval(returnID)

EXAMPLE
zim.interval(1000, function(){
	circle.x += 100;
	stage.upate();
});
// every second the circle will move 100 pixels
// if you want smooth movement, use:

zim.Ticker.add(function() {
	circle.x += 100; // no need for stage.update()
});

zim.interval(1000, function(obj) {
	zog("counting " + obj.count); // starts counting at 1
	if (obj.count == 10) obj.clear(); // will now log 1 to 10
});
OR better:
zim.interval(1000, function(obj) {
	zog("counting " + obj.count); // starts counting at 1
}, 10); // now will log 1 - 10 with total parameter set to 10

IMMEDIATE:
zim.interval(1000, function(obj) {
	zog("counting " + obj.count); // starts counting at 0
}, 10, true); // now will log 0 - 9 with immediate parameter set to true

EXTERNAL control:
var interval = zim.interval(1000, function() {
	zog("counting " + interval.count); // starts counting at 1
});
var button = new zim.Button({label:"STOP", toggle:"START"}).center(stage);
button.on("click", function(){interval.pause(button.toggled);});

RANDOM intervals
zim.interval([200, 800], dropBombs); // bombs will fall at different rates between 200ms and 800ms
END EXAMPLE

PARAMETERS
time - (default 1000) milliseconds for the interval (delay until the function runs - again and again)
	pass in an Array of two times to vary the interval randomly between the two numbers
call - function to call when the interval passes
	Will be passed a ZIM intervalObject as a single parameter
	This is the same as the return object from zim.animate()
	See the Returns section below for methods and properties of the intervalObject
total - (default null - infinite) the number of times the function is called
	note: the count property counts intervals but the total property is based on function calls.
	The total will be equal to the end count with the immediate parameter set to false (default)
	but the total will be one less than the count if the immediate parameter is true (like an Array index and length)
immediate - (default false) set to true to call the function right away (and then still call every interval)
	This will not increase the count in the intervalObject because count counts intervals not function calls
	Use the provided parameter of the call function to access the intervalObject inside the call function

RETURNS a ZIM intervalObject to pause and clear the interval with the following methods and properties:

METHODS - of ZIM intervalObject
pause(state) - (default true) will pause the interval - set to false to unpause the interval
clear() - will clear the interval

PROPERTIES - of ZIM intervalObject
count - the number of times the interval has run (if immediate is true, the first count is 0)
paused - the paused state of the interval
pauseTimeLeft - if paused, how much time is left once unpaused
--*///+9.8
	zim.interval = function(time, call, total, immediate) {
		z_d("9.8");
		if (zot(call)) return;
		if (typeof call != 'function') return;
		if (zot(time)) time = 1000;
		if (zot(immediate)) immediate = false;
		if (!zot(total) && (isNaN(total) || total<=0)) return;
		var obj = {count:0, paused:false};
		function interval() {
			obj.startTime = Date.now();
			obj.interval = getInterval(time);
			obj.id = setTimeout(function() {
				obj.rid = requestAnimationFrame(interval);
				obj.count++;
				(call)(obj);
				checkTotal();
			}, obj.interval);
		}
		interval();
		function getInterval(time) {
			if (Array.isArray(time)) {
				if (time.length > 1) return zim.rand(time[0], time[1]);
				else if (time.length == 1) return time[0];
				else return 1000;
			}
			return time;
		}
		if (immediate) {
			setTimeout(function() {
				(call)(obj);
				checkTotal();
			}, 10);
		}
		function checkTotal() {
			if (zot(total)) return;
			if (obj.count >= (immediate?total-1:total)) obj.clear();
		}
		var pausedTimeout;
		obj.pause = function(state) {
			if (zot(state)) state = true;
			if (state) { // pausing
				clearTimeout(pausedTimeout);
				cancelAnimationFrame(obj.rid);
				clearTimeout(obj.id);
				obj.pauseTimeLeft = obj.interval - (Date.now()-obj.startTime);
			} else { // unpausing
					pausedTimeout = setTimeout(function() {
						obj.count++;
						(call)(obj);
						interval();
						checkTotal();
					}, obj.pauseTimeLeft);
				obj.pauseTimeLeft = null;
			}
			obj.paused = state;
		}
		obj.clear = function() {
			clearTimeout(pausedTimeout);
			cancelAnimationFrame(obj.rid);
			clearTimeout(obj.id);
			var count = obj.count;
			for (var i in obj) {
				delete obj[i];
			}
			obj.count = count;
			obj.pause = function() {};
			obj.clear = function() {};
		}
		return obj;
	}//-9.8

/*--
zim.copy = function(obj)

copy
zim function

DESCRIPTION
Copies arrays and basic objects:
http://stackoverflow.com/users/35881/a-levy
If you have var obj = {prop:"val"};
and then try and copy obj to obj2 like so: obj2 = obj;
then obj2 and obj refer to the same object.
This means that after obj.prop = "new"; both obj.prop and obj2.prop would be "new".
zim.copy(obj) returns a new object so both will work independently
and after obj.prop = "new"; obj2.prop would still be "val".

EXAMPLE
var obj = {hair:blue, cars:["audi", "honda"]};
var cop = zim.copy(obj);
cop.hair = "green";
zog(obj.hair, obj.cop); // blue, green
obj.cars.push("vw");
zog(obj.cars.length, cop.cars.length); // 3, 2
END EXAMPLE

PARAMETERS
obj - the object to copy

RETURNS a new Object
--*///+10
	zim.copy = function(obj) {
		z_d("10");
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
	}//-10

/*--
zim.arraysEqual = function(a, b, strict)

arraysEqual
zim function

DESCRIPTION
Finds out if arrays are same (including nested arrays).
Works for arrays with strings and numbers (not necessarily other objects).
(Slightly modified Evan Steinkerchnerv & Tomas Zato)

EXAMPLE
var one = [1,2,"wow",[3,4]];
var two = [1,2,"wow",[3,4]];
zog(zim.arraysEqual(one, two)); // true
one[3][1] = 5;
zog(zim.arraysEqual(one, two)); // false
END EXAMPLE

PARAMETERS
a, b - the arrays to check to see if they are equal
strict - (default true) set to false so order in arrays does not matter

RETURNS a Boolean
--*///+11
	zim.arraysEqual = function(a, b, strict) {
		z_d("11");
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
	}//-11

/*--
zim.isEmpty = function(obj)

isEmpty
zim function

DESCRIPTION
returns whether an object literal is empty

EXAMPLE
var o = {};
zog( zim.isEmpty(o) ); // true
o.test = 9;
zog( zim.isEmpty(o) ); // false
END EXAMPLE

PARAMETERS
obj - the object literal to test

RETURNS a Boolean
--*///+11.5
	zim.isEmpty = function(obj) {
		z_d("11.5");
		if (zot(obj)) return;
		var count = 0;
		for (var o in obj) {
			count++; break;
		}
		return (count == 0);
	}//-11.5

/*--
zim.merge = function(objects)

merge
zim function

DESCRIPTION
Merges any number of objects {} you pass in as parameters.
Overwrites properties if they have the same name.
Returns a merged object with original objects kept intact.

EXAMPLE
var one = {food:"chocolate"};
var two = {drink:"milk"};
var tri = zim.merge(one, two);
zog(tri.food, tri.drink); // chocolate, milk
END EXAMPLE

PARAMETERS
objects - a list of objects (any number) to merge together

RETURNS a new Object
--*///+12
	zim.merge = function() {
		z_d("12");
		var obj = {}; var i; var j;
		for (i=0; i<arguments.length; i++) {
			for (j in arguments[i]) {
				if (arguments[i].hasOwnProperty(j)) {
					obj[j] = arguments[i][j];
				}
			}
		}
		return obj;
	}//-12

/*--
zim.decimals = function(num, places, addZeros)

decimals
zim function

DESCRIPTION
Rounds number to the number of decimal places specified by places.
Negative number places round to tens, hundreds, etc.
If addZeros is true it fills up ends with zeros - if the places
is negative with addZeros then it fills up the start with zeros
and does not round to tens, hundreds, etc.  just adds zeros to start

EXAMPLE
var score = 1.234;
score = zim.decimals(score);
zog(score); // 1.2
zog(zim.decimals(1.8345, 2)); // 1.83
zog(zim.decimals(123,-1)); // 120
zog(zim.decimals(2.3,2,true)); // 2.30
zog(zim.decimals(3,-2,true)); // 03
zog(zim.decimals(11,-2,true)); // 11
zog(zim.decimals(11,-3,true)); // 011
END EXAMPLE

PARAMETERS
num - the Number to operate on
places - (default 1) how many decimals to include (negative for left of decimal place)
addZeros - (default false) set to true to add zeros to number of decimal places (and return String)
	will not round if places is negative but rather add zeros to front

RETURNS a rounded Number or a String if addZeros is true
--*///+13
	zim.zut = function(e) {
		if (zot(e) || typeof e == "object") return true;
	}
	zim.decimals = function(num, places, addZeros, evt) {
		z_d("13");
		if (zot(num) || num==0) return 0;
		if (zot(places)) places = 1;
		if (zot(addZeros)) addZeros = false;
		if (addZeros && places < 0) {
			var place = String(num).indexOf(".");
			var length = String(num).length;
			var left = (place < 0) ? length : place;
			for (var i=0; i<-places-left; i++) {num = "0" + num;}
			return num;
		}
		var answer = Math.round(num*Math.pow(10, places))/Math.pow(10, places);
		if (addZeros && places > 0 && answer != 0) {
			var place = String(answer).indexOf(".");
			var length = String(answer).length;
			if (place < 0) {place = length++; answer+=".";}
			for (var i=0; i<places-(length-place-1); i++) {answer += "0";}
		}
		return zim.zut(evt) ? answer : null;
	}//-13

/*--
zim.sign = function(num)

sign
zim function

DESCRIPTION
returns -1, 0 or 1 depending on whether the number is less than, equal to or greater than 0

EXAMPLE
var speed = 20;
zog(zim.sign(speed)); // 1

var speed = 0;
zog(zim.sign(speed)); // 0

var speed = -20;
zog(zim.sSign(speed)); // -1
END EXAMPLE

PARAMETERS
num - the Number to operate on

RETURNS -1, 0 or 1
--*///+13.1
	zim.sign = function(num) {
		z_d("13.1");
		return num?num<0?-1:1:0;
	}//-13.1


/*--
zim.constrain = function(num, min, max, negative)

constrain
zim function

DESCRIPTION
returns a number constrained to min and max

EXAMPLE
var cirle.x = zim.constrain(circle.radius, stageW-circle.radius);
// circle.x will not be smaller than the radius or bigger than stageW-radius

var speed = zim.constrain(minSpeed, maxSpeed, true);
// will confine the speed between minSpeed and maxSpeed if speed is positive
// and confine the speed between -maxSpeed and -minSpeed if the speed is negative
END EXAMPLE

PARAMETERS
num - the number to be constrained
min - (default 0) the minimum value of the return number
max - (default Number.MAX_VALUE) the maximum value of the return number
negative - (default false) allow the negative range of min and max when num is negative

RETURNS num if between min and max otherwise returns min if less or max if greater (inclusive)
RETURNS num between -max and -min if num is negative and negative parameter is set to true
--*///+13.2
	zim.constrain = function(num, min, max, negative) {
		z_d("13.2");
		if (zot(num)) return;
		if (zot(min)) min = 0;
		if (zot(max)) max = Number.MAX_VALUE;
		if (max < min) {max2 = min; max = min; min = max2;} // ES6 Fix to come
		if (zot(negative)) negative = false;
		if (negative && num < 0) {
			return Math.max(-max, Math.min(num, -min));
		} else {
			return Math.max(min, Math.min(num, max));
		}
	}//-13.2

/*--
zim.dist = function(x1, y1, x2, y2)

dist
zim function

DESCRIPTION
calculates the distance between two points.

EXAMPLE
var distance = zim.dist(stageW/2, stageH/2, stage.mouseX, stage.mouseY);
// distance of mouse from center of stage
END EXAMPLE

PARAMETERS
x1, y1 - first point x and y
x2, y2 - (default 0, 0) second point x and y

RETURNS a positive Number that is the distance (could be on an angle)
--*///+13.3
	zim.dist = function(x1, y1, x2, y2) {
		z_d("13.3");
		if (zot(x1) || zot(y1)) return;
		if (zot(x2)) x2 = 0;
		if (zot(y2)) y2 = 0;
		return Math.sqrt((Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2)));
	}//-13.3

/*--
zim.makeID = function(length, type, letterCase)

makeID
zim function

DESCRIPTION
makes a random letter, number or mixed id of specified length

EXAMPLE
var id1 = zim.makeID(); // five random letters and numbers (starts with letter)
var id2 = zim.makeID(null, "string"); // five random uppercase letters
var id3 = zim.makeID(10, "number"); // ten random numbers
var id4 = zim.makeID(5, ["Z", "I", "M", 1, 2, 3, 4, 5, "-"]); // random five characters from array (possibly repeating)
END EXAMPLE

PARAMETERS
length - (default 5) the length of the id
type - (default "mixed") set to "letters" or "numbers" as well
	note: no O, 0, 1, I or L due to identification problems
	pass in an array of characters to make an id from only those characters
letterCase - (default uppercase) - set to "lowercase" or "mixed" as well

RETURNS a String id (even if type is number)
--*///+13.5
	zim.makeID = function(type, length, letterCase) {
		z_d("13.5");
		if (zot(type)) type = "mixed";
		if (zot(length)) length = 5;
		if (zot(letterCase)) letterCase = "uppercase";
		var choices;
		var nums = [2,3,4,5,6,7,8,9];
		var lets = "abcdefghjkmnpqrstuvwxyz".split("");
		if (type.constructor === Array) {
			choices = type;
		} else if (type == "numbers") {
			choices = nums;
		} else if (type == "letters") {
			choices = lets;
		} else {
			choices = nums.concat(lets);
		}
		var id = "";
		var c; // character - note, char is a reserved word for compressor!
		var rand;
		for (var i=0; i<length; i++) {
			c = choices[Math.floor(Math.random()*length)];
			rand = Math.random();
			if (letterCase == "uppercase" || (letterCase == "mixed" && rand > .5)) {
				if (c.toUpperCase) c = c.toUpperCase();
			} else {
				if (c.toLowerCase) c = c.toLowerCase();
			}
			id += String(c);
		}
		return id;
	}//-13.5

/*--
zim.Damp = function(startValue, damp)

Damp
zim class

DESCRIPTION
Damping emulates things slowing down due to friction.
The movement heads towards the right value and looks organic.
This is similar if not the same as easing out when tweening.
Create your Damp object outside an interval or Ticker
then inside an interval or ticker call the convert method.

EXAMPLE
var d = new zim.Damp(parameters);
setInterval(function() {
	dampedValue = d.convert(desiredValue);
}, 100);
END EXAMPLE

you would then apply that desired value to a property such as x or y or scale
if you want to do both x and y then you need two Damp objects
and two convert calls (you can do both in one interval or ticker)

EXAMPLE
var circle = new zim.Circle();
circle.center(stage);
var dampX = new zim.Damp(circle.x);
var dampY = new zim.Damp(circle.y);
// start moving once mouse enters stage
// this event will only run once (the last parameter is true)
stage.on("stagemousemove", start, null, true);
function start() {
	zim.Ticker.add(function() {
		circle.x = dampX.convert(stage.mouseX);
		circle.y = dampY.convert(stage.mouseY);
	}, stage);
}
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
startValue - (default 0) start object at this value and then start damping
damp - (default .1) the damp value with 1 being no damping and 0 being no movement

METHODS
convert() - converts a value into a damped value
immediate() - immediately goes to value and returns the Damp object

PROPERTIES
damp - can dynamically change the damping (usually just pass it in as a parameter to start)
lastValue - setting this would go immediately to this value (would not normally use)
--*///+14
	zim.Damp = function(startValue, damp) {
		z_d("14");
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
		return this;
	}//-14

/*--
zim.Proportion = function(baseMin, baseMax, targetMin, targetMax, factor, targetRound)

Proportion
zim class

DESCRIPTION
Proportion converts an input value to an output value on a different scale.
(sometimes called a map() function)
For instance, like a slider controlling the scale of an object or sound volume.
Make a Proportion object and then in an interval, ticker or event,
convert the base value to the target value using the convert method.

EXAMPLE
frame.loadAssets("mySound.mp3");
frame.on("complete", function() {
	var sound = frame.asset("mySound.mp3").play();
	var p = new zim.Proportion(0, 10, 0, 1);
	var dial = new zim.Dial(); // default range of 0 to 10
	dial.currentValue = 10;
	dial.on("change", function(){
		sound.volume = p.convert(dial.currentValue);
	}); // end of dial change
}); // end sound loaded
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
baseMin - min for the input scale (say x value)
baseMax - max for the input scale (say x value)
targetMin - (default 0) min for the output scale (say volume)
targetMax - (default 1) max for the output scale (say volume)
factor (default 1) is going the same direction and -1 is going in opposite direction
targetRound (default false) set to true to round the converted number

METHODS
convert(input) - will return the output property (for instance, a volume)

NOTE: the object always starts by assuming baseMin as baseValue
just call the convert method right away if you want it to start at a different baseValue
for instance, if your slider went from 100 to 500 and you want to start at half way
make the object and call p.convert(300); on the next line
--*///+15
	zim.Proportion = function(baseMin, baseMax, targetMin, targetMax, factor, targetRound) {

		var sig = "baseMin, baseMax, targetMin, targetMax, factor, targetRound";
		var duo; if (duo = zob(zim.Proportion, arguments, sig, this)) return duo;
		z_d("15");
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
	}//-15

/*--
zim.ProportionDamp = function(baseMin, baseMax, targetMin, targetMax, damp, factor, targetRound)

ProportionDamp
zim class

DESCRIPTION
ProportionDamp converts an input value to an output value on a different scale with damping.
Works like Proportion Class but with a damping parameter.
Damping needs constant calculating so do not put in mousemove event.
The below example scales the circle based on the mouse height.

EXAMPLE
var circle = new zim.Circle(50, "red");
circle.center(stage); // center method added in ZIM 4TH
var pd = new zim.ProportionDamp(0, stageH, 0, 5, .2);
zim.Ticker.add(function() {
	circle.scale(pd.convert(stage.mouseH)); // scale method added in ZIM 4TH
}, stage);
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
baseMin - min for the input scale (say x value)
baseMax - max for the input scale (say x value)
targetMin - (default 0) min for the output scale (say volume)
targetMax - (default 1) max for the output scale (say volume)
damp - (default .1) the damp value with 1 being no damping and 0 being no movement
factor (default 1) is going the same direction and -1 is going in opposite direction
targetRound (default false) set to true to round the converted number

METHODS
convert(input) - converts a base value to a target value
immediate(input) - immediately sets the target value (no damping) and returns the ProportionDamp object
dispose() - clears interval

PROPERTIES
damp - can adjust this dynamically (usually just pass it in as a parameter to start)

NOTE: the object always starts by assuming baseMin as baseValue
if you want to start or go to an immediate value without easing then
call the pd.immediate(baseValue) method with your desired baseValue (not targetValue)
--*///+16
	zim.ProportionDamp = function(baseMin, baseMax, targetMin, targetMax, damp, factor, targetRound) {

		var sig = "baseMin, baseMax, targetMin, targetMax, damp, factor, targetRound";
		var duo; if (duo = zob(zim.ProportionDamp, arguments, sig, this)) return duo;
		z_d("16");
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
			return that;
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
	}//-16


/*--
zim.Dictionary = function(unique)

Dictionary
zim class

DESCRIPTION
An object that uses objects as keys to give values.
Similar to an object literal with properties except the property names are objects instead of strings.
JavaScript currently does not have a dictionary, but other languages do.

EXAMPLE
var o = {test:"test"};
var f = function(w) {zog(w)};
var c = new zim.Circle();
var d = new zim.Dictionary();
d.add(o, 1); d.add(f, 2); d.add(c, f);
zog(d.at(o)); // 1
zog(d.at(f)); // 2
d.at(c)("hello"); // hello
d.remove(o); // to clear o
zog(d.length); // 2
END EXAMPLE

EXAMPLE
var d = new zim.Dictionary();
d.add(circle, "one");
d.add(circle, "two");
zog(d.at(circle)); // two - just the latest but "one" is still there
for (var i=0; i<d.length) {
	if (d.objects[i] == circle) zog(d.values[i]); // one then two
}
// note, loop backwards to clear values at a key
END EXAMPLE

EXAMPLE
// with unique property add(key, val) removes the last val at that key
var d = new zim.Dictionary(true);
d.add(circle, "one");
d.add(circle, "two");
zog(d.at(circle)); // two - and now only two is there
for (var i=0; i<d.length) {
	if (d.objects[i] == circle) zog(d.values[i]); // two
}
// note, now d.remove(key) removes that unique entry for the key
END EXAMPLE

METHODS
add(object, value) - adds a value that can be retrieved by an object reference
	if unique is false, this will not overwrite previous entries at the object key
	if unique is true, this will overwrite previous entries at the object key
	value is optional and will default to true
at(object) - retrieves the last value stored at the object (or returns null if not there)
remove(object) - removes the last value at the object from the Dictionary
dispose() - deletes Dictionary object

PROPERTIES
length - the number of items in the Dictionary
unique - whether the dictionary will overwrite values (going from false to true will not delete previous values)
objects - array of keys
values - array of values synched to keys
--*///+17
	zim.Dictionary = function(unique) {
		z_d("17");
		this.length = 0;
		this.unique = unique;
		var objects = this.objects = []; // store objects and values in synched arrays
		var values = this.values = [];

		this.add = function(o,v) {
			if (zot(o)) return;
			if (zot(v)) v = true;
			if (this.unique) this.remove(o);
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
	}//-17

/*--
zim.swapProperties = function(property, objA, objB)

swapProperties
zim function

DESCRIPTION
Pass in a property as a string and two object references
and this function will swap the property values.

EXAMPLE
// exchanges the x position of two ZIM circles
zim.swapProperties("x", circle1, circle2); stage.update();
END EXAMPLE

PARAMETERS
property - a String of the property to swap values eg. "alpha"
objA, objB - the objects on which to swap properties

RETURNS Boolean indicating success
--*///+17.1
	zim.swapProperties = function(property, objA, objB) {
		z_d("17.1");
		if (zot(objA) || zot(objB) || zot(objA[property]) || zot(objB[property])) return false;
		var temp = objB[property];
		objB[property] = objA[property];
		objA[property] = temp;
		return true;
	}//-17.1

	// DOM CODE

/*--
zim.swapHTML = function(idA, idB)

swapHTML
zim function

DESCRIPTION
Pass in two tag ids as strings and this function will swap their innerHTML content.
The content (including nested tags) will be swapped.

EXAMPLE
// exchanges the content of two divs called question and answer
zim.swapHTML("question","answer");
END EXAMPLE

PARAMETERS
idA, idB - String names of the tag id with which to swap innerHTML values

RETURNS Boolean indicating success
--*///+17.2
	zim.swapHTML = function(idA, idB) {
		z_d("17.2");
		return zim.swapProperties("innerHTML", zid(idA), zid(idB));
	}//-17.2

/*--
zim.scrollX = function(num, time)

scrollX
zim function

DESCRIPTION
This function gets or sets how many pixels from the left the browser window has been scrolled.
If num is provided then the function scrolls the window to this x position.
If num and time are provided it animates the window to the x position in time milliseconds.

EXAMPLE
// hide the logo if the page is scrolled left more than 200 pixels
if (zim.scrollX < -200) zss("logo").display = "none";
END EXAMPLE

PARAMETERS
num - (default null) optional scroll position to go to (probably negative)
time - (default 0) time in milliseconds to take to go to the num position

RETURNS a Number
--*///+18
	zim.scrollX = function(num, time) {
		z_d("18");
		return zim.abstractScroll("X", "Left", num, time);
	}//-18


/*--
zim.scrollY = function(num, time)

scrollY
zim function

DESCRIPTION
This function gets or sets how many pixels from the top the browser window has been scrolled.
If num is provided then the function scrolls the window to this y position.
If num and time are provided it animates the window to the y position in time milliseconds.

EXAMPLE
// animate the scroll position down 100 pixels in half a second
zim.scrollY(zim.scrollY()-100, 500);
END EXAMPLE

PARAMETERS
num - (default null) optional scroll position to go to (probably negative)
time - (default 0) time in milliseconds to take to go to the num position

RETURNS a Number
--*///+19
	zim.scrollY = function(num, time) {
		z_d("19");
		return zim.abstractScroll("Y", "Top", num, time);
	}//-19

	//+20
	zim.abstractScroll = function(dir, side, num, time) {
		z_d("20");
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
		return num;
	}//-20

/*--
zim.windowWidth = function()

windowWidth
zim function

DESCRIPTION
Returns the width of a window.
(window.clientWidth or window.innerWidth)

EXAMPLE
if (zim.windowWidth() < 500) zss("related").display = "none";
END EXAMPLE

RETURNS a Number
--*///+21
	zim.windowWidth = function() {
		z_d("21");
		return isNaN(window.innerWidth) ? window.clientWidth : window.innerWidth;
	}//-21

/*--
zim.windowHeight = function()

windowHeight
zim function

DESCRIPTION
Returns the height of a window.
(window.clientHeight or window.innerHeight)

EXAMPLE
if (zim.windowHeight() > 1000) zgo("big.html");
END EXAMPLE

RETURNS a Number
--*///+22
	zim.windowHeight = function() {
		z_d("22");
		return isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight;
	}//-22

/*--
zim.urlEncode = function(string)

urlEncode
zim function

DESCRIPTION
Matches PHP urlencode and urldecode functions
for passing data on end of URL.
NOTE: only encode values of key=value pairs (not keys and not both keys and values)
NOTE: JSON automatically encodes and decodes

EXAMPLE
var motto = "good = life & life = now";
zgo("submit.php?motto="+zim.urlEncode(motto));
END EXAMPLE

PARAMETERS
string - a value to URL encode (space to plus, etc.)

RETURNS a String
--*///+23
	zim.urlEncode = function(s) {
		z_d("23");
		var s = (s + '').toString();
		return encodeURIComponent(s).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
		replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
	}//-23

/*--
zim.urlDecode = function(string)

urlDecode
zim function

DESCRIPTION
Matches PHP urlencode and urldecode functions
for receiving raw data from a source that URLencodes.
NOTE: JSON automatically encodes and decodes

EXAMPLE
var pairs = command.split("&");
var motto = zim.urlDecode(pairs[0].split("=")[1]);
END EXAMPLE

PARAMETERS
string - a URLencoded String to decode

RETURNS a String
--*///+24
	zim.urlDecode = function(s) {
		z_d("24");
		 return decodeURIComponent((s + '').replace(/\+/g, '%20'));
	}//-24

/*--
zim.setCookie = function(name, value, days)

setCookie
zim function

DESCRIPTION
Sets an HTML cookie to remember some user data your site has set over time.
If no days, it will be a session cookie (while browser is open).

EXAMPLE
var visits = zim.getCookie("visits");
if (zot(visits)) visits = 0;
zim.setCookie("visits", ++visits);
END EXAMPLE

PARAMETERS
name - a String name for your cookie
value - a String value that you want to store
days - (default 0) for how many days do you want to store the cookie

ALSO: see zim.getCookie and zim.deleteCookie

RETURNS a Boolean indicating success
--*///+25
	zim.setCookie = function(name, value, days) {
		z_d("25");
		if (zot(name) || zot(value)) return;
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		} else {
			var expires = "";
		}
		document.cookie = name+"="+escape(value)+expires+"; path=/";
		return true;
	}//-25

/*--
zim.getCookie = function(name)

getCookie
zim function

DESCRIPTION
Gets an HTML cookie that you have previously set.

EXAMPLE
var visits = zim.getCookie("visits");
if (zot(visits)) visits = 0;
zim.setCookie("visits", ++visits);
END EXAMPLE

PARAMETERS
name - the String name of your stored cookie

ALSO: see zim.setCookie and zim.deleteCookie

RETURNS a String or undefined if not found
--*///+26
	zim.getCookie = function(name) {
		z_d("26");
		var outer = document.cookie.split(/;\s*/);
		var cookies = new Array();
		var inner;
		for (i=0; i<outer.length; i++) {
			inner = outer[i].split("=");
			cookies[inner[0]] = inner[1];
		}
		if (typeof cookies[name] == 'undefined') return undefined;
		return unescape(cookies[name]);
	}//-26

/*--
zim.deleteCookie = function(name)

deleteCookie
zim function

DESCRIPTION
Deletes an HTML cookie.

EXAMPLE
zim.deleteCookie("visits"); // clears the cookie
END EXAMPLE

PARAMETERS
name - the String name of your stored cookie to delete

ALSO: see zim.setCookie and zim.getCookie

RETURNS a Boolean indicating success
--*///+27
	zim.deleteCookie = function(name) {
		z_d("27");
		if (zot(zim.getCookie(name))) return false;
		zim.setCookie(name,"",-1);
		return true;
	}//-27

/*--
zim.mobile = function(orientation)

mobile
zim function

DESCRIPTION
Detects if app is on a mobile device - if so, returns the mobile device type:
android, ios, blackberry, windows, other (all which evaluate to true) else returns false.
orientation defaults to true and if there is window.orientation then it assumes mobile
BUT this may return true for some desktop and laptop touch screens
so you can turn the orientation check off by setting orientation to false.
If orientation is set to false the check may miss non-mainstream devices
The check looks at the navigator.userAgent for the following regular expression:
/ip(hone|od|ad)|android|blackberry|nokia|opera mini|mobile|phone|nexus|webos/i
Microsoft mobile gets detected by nokia, mobile or phone.

EXAMPLE
if (zim.mobile()) {
	var pane = new zim.Pane(stage, 300, 200, "Desktop Only");
	pane.show();
}
END EXAMPLE

PARAMETERS
orientation - (default true) uses window.orientation property to determine mobile
	this may call certain touch screens mobile
	but setting to false uses a test on mobile names which could be incomplete

RETURNS a String or false
--*///+28
	zim.mobile = function(orientation) {
		z_d("28");
		if (zot(orientation)) orientation = true;
		if (/ip(hone|od|ad)/i.test(navigator.userAgent)) return "ios";
		if (/android|nexus/i.test(navigator.userAgent)) return "android";
		if (/blackberry/i.test(navigator.userAgent)) return "blackberry";
		if (/nokia|phone|mobile/i.test(navigator.userAgent)) return "windows";
		if (/opera mini|webos/i.test(navigator.userAgent)) return "other";
		if (orientation && window.orientation !== undefined) return true;
		return false;
	}//-28

/*--
zim.async = function(url, callback)

async
zim function

DESCRIPTION
A way to send data back and forth to a server script without reloading the HTML page.
(like AJAX but without the bother)
Uses a dynamic script call with an optional callback (cross domain calls are okay)
also known as JSON-P pattern but JSON is unnecessary - note, no JSON in the examples below.
Pass a url to the server script (ie. php or node page)
and an optional callback function that you define in your code (cannot be an anonymous function).
zim.async will automatically add a random number to the end of your script call to defeat cache.

EXAMPLE
// existing service:
// assuming that we have a callback function called test as shown below
zim.async("http://ip-api.com/json?callback=zim.async.test",test);
function test(data) {zog(data.country);}
// note that the callback we pass the service is zim.async.test not just test
// this allows zim to handle scope issues and garbage collect the dynamic script when done
// if the service passes JSON you may need to JSON.decode() the data being returned
// this service passes an object literal not JSON despite its file name
END EXAMPLE

EXAMPLE
// CLIENT - your own server script:
// assuming we have a callback function called myFunction as shown below
zim.async("http://yourserver.com/script.php?id=72&name=dan", myFunction);
function myFunction(data){zog(data);}

// SERVER - your script must output the following format as a string:
// "zim.async.myFunction(somedata)"
// in the php file we would use:
echo "zim.async.myFunction('success')";
// to return an object literal with nodejs express for example, you would use:
res.send('zim.async.myFunction({list:[1,2,3], name:"whatever"})');
// the data parameter in the myFunction function defined earlier would be an object literal
// we could then do zog(data.list[0]) to log the value 1, etc.
END EXAMPLE

PARAMETERS
url - url to the server script (ie. php or node page)
callback - (default null) callback function that you define in your code (cannot be an anonymous function)

calling the return function on zim.async does two things:
1. it handles scope issues so we can find your callback function
2. it handles garbage collection to remove the dynamic script tag that was used
if you do not specify a callback function then just send "" back from your server script
NOTE: we have experienced duplicate script calls if nothing is sent back

RETURNS undefined
--*///+29
	zim.async = function (url, callback) {
		z_d("29");
		if (zot(url)) return;
		var tag = document.createElement("script");
		if (callback) {
			var n = callback.toString().split(/\n/,1)[0].match(/^function\s?([^\s(]*)/)[1];
			// create callback bridge on async function object
			zim.async[n] = function() { // closure to access tag on callback bridge
				var t = tag;
				return function(d){
					// remove the script tag and do the callback
					if (t) t.parentNode.removeChild(t); t = null;
					callback(d);
				}
			}();
		} else {
			if (zim.async.z_s && zim.async.z_s.parentNode) zim.async.z_s.parentNode.removeChild(zim.async.z_s); // keep overwriting same script tag if no callback
			zim.async.z_s = tag;
		}
		if (!url.match(/\?/)) url += "?";
		tag.setAttribute("src", url + "&r="+Math.random());
		document.getElementsByTagName("head")[0].appendChild(tag);
	}//-29

if (typeof(createjs) == "undefined") {if (zon) {zog("ZIM >= 4.3.0 requires createjs namespace to be loaded (import createjs before zim)");} return zim;}

////////////////  ZIM CREATE  //////////////

// Zim Create adds functionality to CreateJS for multies (Interactive Features)
// functions in this module require createjs namespace to exist and in particular easel.js and tween.js
// available at http://createjs.com

/*--
zim.ANIMATE

ANIMATE
zim constant

DESCRIPTION
Set to false to stop zim.move() and zim.animate() calls from working.
Handy for testing your app so you do not have to wait for animations every time!
To animate things in you can place everything in their final positions
and then set the "from" parameter to true to animate from starting positions
like x or y offstage, scale or alpha of 0, etc.
Then to avoid waiting for animations to complete, you can just set zim.ANIMATE = false
and all your objects will be in their final locations and you don't wait for animations
When you are ready to run your animations for a final version, etc. just delete the line
or set zim.ANIMATE to true.

EXAMPLE
zim.ANIMATE = false;
// without the line above, the circles will animate in
// we would have to wait for them everytime we load the app
// sometimes animations are even longer and this can waste development time
// when we add the line above, the circles are on stage right away
// this is easier and safer than commenting out all your animations

var circle1 = new zim.Circle(200, frame.green);
circle1.center(stage);
circle1.x -= 110;
circle1.animate({obj:{alpha:0, scale:0}, time:700, from:true});

var circle2 = new zim.Circle(200, frame.pink);
circle2.center(stage);
circle2.x += 110;
circle2.animate({obj:{alpha:0, scale:0}, time:700, wait:700, from:true});
END EXAMPLE
--*///+29.5
zim.ANIMATE = true;
//-29.5

/*--
zim.Ticker = {}

Ticker
zim static class

DESCRIPTION
A static class to let ZIM use one animation function with a requestAnimationFrame
If a function has been added to the Ticker queue then it will run in the order added
along with a single stage update after all functions in queue have run.
There are settings that can adjust when the Ticker updates so see Usage notes below.

EXAMPLE
var circle = new zim.Circle(50, "red");
circle.center(stage);
zim.Ticker.add(function(){
	circle.x++;
}, stage);

// to be able to remove the function:
zim.Ticker.add(tryMe, stage);
function tryMe() {circle.x++;}
zim.Ticker.remove(tryMe);

// OR with function literal, use the return value
var tickerFunction = zim.Ticker.add(function(){circle.x++;}, stage);
zim.Ticker.remove(tickerFunction);
END EXAMPLE

USAGE
if zim.OPTIMIZE is true then the Ticker will not update the stage (it will still run functions)
however, OPTIMIZE can be overridden as follows (or with the always() method):

METHODS (static)
zim.Ticker.always(stage) - overrides zim.OPTIMIZE and always runs an update for the stage even with no function in queue
zim.Ticker.alwaysOff(stage) - stops an always Ticker for a stage
zim.Ticker.add(function, stage) - adds the function to the Ticker queue for a given stage and returns the function that was added
zim.Ticker.remove(function) - removes the function from the Ticker queue
zim.Ticker.removeAll([stage]) - removes all functions from the Ticker queue (optionally per stage)
zim.Ticker.setFPS(30, 60) - (mobile, pc) default is set at natural requestAnimationFrame speed - this seems to be the smoothest
zim.Ticker.setTimingMode(mode) - (default "raf") RAF uses RequestAnimationFrame without framerate synching - gets screen synch (smooth) and background throttling
	set to "synched" for framerate synching - but will add some variance between updates
	set to "timeout" for setTimeout synching to framerate - no screen synch or background throttling (if RAF is not supported falls back to this mode)
	see CreateJS docs: http://www.createjs.com/docs/tweenjs/classes/Ticker.html
zim.Ticker.dispose([stage]) - removes all functions from the queue removes and removes the list (optionally per stage)

PROPERTIES (static)
zim.Ticker.update = true - overrides zim.OPTIMIZE and forces an update if a function is in the queue
zim.Ticker.update = false - forces no update regardless of zim.OPTIMIZE
zim.Ticker.update = null (default) - only updates if there is a function in queue and zim.OPTIMIZE is false
zim.Ticker.list - a ZIM Dictionary holding arrays with the functions in the Ticker queue for each stage
zim.Ticker.list.objects - the array of stages in the Ticker
zim.Ticker.list.values - the array holding an array of functions for each stage in the Ticker

the Ticker is used internally by zim functions like move(), animate(), drag(), Scroller(), Parallax()
you are welcome to add functions - make sure to pass the stage in as a second parameter to the add() method

USAGE
1. if you have your own ticker going, just set zim.OPTIMIZE = true and don't worry about a thing
2. if you do not have your own ticker going but still want OPTIMIZE true to avoid components updating automatically,
then set zim.OPTIMIZE = true and set zim.Ticker.update = true
this will run a single update only when needed in zim Ticker for any zim functions
3. if you want a ticker with a single update going all the time (with OPTIMIZE true or false) then
run zim.Ticker.always(stage);
4. if for some reason (can't think of any) you want no ticker updates for zim but want component updates
then set zim.OPTIMIZE = false and then set zim.Ticker.update = false
--*///+30
	zim.Ticker = {
		stages:null,
		myUpdate: null,
		alwaysList:new zim.Dictionary(),
		list:new zim.Dictionary(),
		setFPS: function(m, d) {
			if (zot(m) && zot(d)) {
				m = 30; d = 60;
			} else if (zot(m)) {
				m = 30;
			} else if (zot(d)) {
				d = m;
			}
			zim.Ticker.framerate = createjs.Ticker.framerate = (zim.mobile()) ? m : d;
		},
		setTimingMode: function(mode) {
			createjs.Ticker.timingMode = createjs.Ticker.RAF;
			if (mode == "synched") createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
			if (mode == "timeout") createjs.Ticker.timingMode = createjs.Ticker.TIMEOUT;
		},
		add: function(f, s) {
			z_d("30");
			var t = zim.Ticker;
			if (!t.framerate) t.setFPS();
			if (zot(s) || !s.update) {zog("zim.Ticker.add() - needs stage parameter"); return;}
			if (zot(f) || typeof f !== 'function') {zog("zim.Ticker.add() - only add functions"); return;}
			if (!t.ticker) t.ticker = createjs.Ticker.on("tick", t.call);
			if (t.list.at(s)) {t.list.at(s).push(f);} else {t.list.add(s, [f]);}
			return f;
		},
		call: function(currentTime) {
			var t = zim.Ticker;
			var s, functions;
			for (var i=0; i<t.list.length; i++) {
				s = t.list.objects[i]; // stage
				functions = t.list.values[i]; // list of functions for the stage
				for (var j=0; j<functions.length; j++) {
					functions[j]();
				}
				if (t.alwaysList.at(s)) {
					s.update();
				} else if (functions.length > 0) {
					if (zot(t.update) && !zim.OPTIMIZE) {
						s.update();
					} else if (t.update) {
						s.update();
					}
				}
			}
			// may have no functions to run but always is turned on
			for (i=0; i<t.alwaysList.length; i++) {
				s = t.alwaysList.objects[i]; // stage
				if (t.list[s] == null) 	s.update(); // if functions then update is already handled
			}
		},
		always: function(s) {
			z_d("30");
			var t = zim.Ticker;
			if (!t.framerate) t.setFPS();
			if (zot(s) || !s.update) {zog("zim.Ticker.always(stage) - needs stage parameter"); return;}
			t.alwaysList.add(s, true);
			if (!t.ticker) t.ticker = createjs.Ticker.on("tick", t.call);
		},
		alwaysOff: function(s) {
			var t = zim.Ticker;
			if (zot(s) || !s.update) {zog("zim.Ticker.alwaysOff(stage) - needs stage parameter"); return;}
			t.alwaysList.remove(s);
		},
		remove: function(f) {
			var t = zim.Ticker;
			if (zot(f) || typeof f !== 'function') {zog("zim.Ticker - only remove functions"); return;}
			var count = 0;
			var s;
			for (var i=0; i<t.list.length; i++) {
				s = t.list.objects[i]; // stage
				var index = t.list.values[i].indexOf(f);
				if (index > -1) {
					t.list.values[i].splice(index,1);
				}
				count+=t.list.values[i].length;
			}
			if (t.alwaysList.length > 0) return;
			if (count == 0) {createjs.Ticker.off("tick", t.ticker); t.ticker = null;}
		},
		removeAll: function(s) {
			var t = zim.Ticker;
			var count = 0;
			var st;
			for (var i=0; i<t.list.length; i++) {
				st = t.list.objects[i]; // stage
				if (zot(s) || s === st) {
					t.list.values[i] = [];
				}
				count+=t.list.values[i].length;
			}
			if (t.alwaysList.length > 0) return;
			if (count == 0) {createjs.Ticker.off("tick", t.ticker); t.ticker = null;}
		},
		dispose: function(s) {
			var t = zim.Ticker;
			var count = 0;
			var st;
			for (var i=t.list.length-1; i>=0; i--) { // countdown when removing
				st = t.list.objects[i]; // stage
				if (zot(s) || s === st) {
					t.list.remove(s);
					t.alwaysList.remove(s);
				} else {
					count+=t.list.values[i].length;
				}
			}
			if (t.alwaysList.length > 0) return;
			if (count == 0) {createjs.Ticker.off("tick", t.ticker); t.ticker = null;}
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
				 cancelAnimationFrame(t.ticker);
				 // note, this overrides always()
				 // but running always() will override update = false
				 t.alwaysList = new zim.Dictionary();
			}
		}
	});//-30


/*--
zim.drag = function(obj, rect, overCursor, dragCursor, currentTarget, swipe, localBounds, onTop, surround, slide, slideDamp, slideSnap, reg, removeTweens, startBounds)

drag
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Adds drag and drop to an object with a variety of options.
Handles scaled, rotated nested objects.

EXAMPLE
var radius = 50;
var circle = new zim.Circle(radius, "red");
circle.center(stage);
circle.drag();

// OR with chaining
var circle = new zim.Circle(radius, "red").center(stage).drag();

// OR with ZIM DUO
circle.drag({slide:true});

// OR with pre ZIM 4TH methods
zim.center(circle, stage);
zim.drag(circle);

// OR with ZIM DUO
zim.drag({obj:circle, slide:true});

// BOUNDS
// circle has its registration point in the middle
// keep registration point within rectangle starting at x=100, y=100
// and drag within a width of 500 and height of 400
// var dragBounds = new createjs.Rectangle(100,100,500,400);
// or keep circle on the stage with the following
var dragBounds = new createjs.Rectangle(radius,radius,stageW-radius,stageH-radius);
circle.drag(dragBounds); // drag within stage
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
obj - the object to drag
rect - (default null) a createjs.Rectangle object for the bounds of dragging
	if surround is true then it will make sure the obj surrounds the rect rather than stays within it
	this rectangle is relative to the stage (global)
	if a rectangle relative to the object's parent is desired then set the localBounds parameter to true
overCursor, dragCursor - (default "pointer") the CSS cursor properties as strings
currentTarget - (default false) allowing you to drag things within a container
	eg. drag(container); will drag any object within a container
	setting currentTarget to true will then drag the whole container
swipe - (default false) which prevents a swipe from triggering when dragging
localBounds - (default false) which means the rect is global - set to true for a rect in the object parent frame
onTop - (default true) brings the dragged object to the top of the container
surround - (default false) is for dragging a big object that always surrounds the rect
slide - (default false) will let you throw the object and dispatch a slidestop event when done
slideDamp - (default .3) is the damping setting for the slide (1 is no damping and .1 will slide more, etc.)
slideSnap - (default true) lets the object go outside and snap back to bounds - also "vertical", "horizontal", and false
reg - (default false) when set to true will snap the registration of the object to the mouse position
removeTweens - (default true) will automatically remove tweens from dragged object unless set to false
startBounds - (default true) set to false to ignore bound rect before dragging (sometimes handy when putting drag on container)

note: will not update stage if zim.OPTIMIZE is set to true
unless zim.Ticker.update is set to true or you run zim.Ticker.always(stage) see zim.Ticker

RETURNS obj for chaining
--*///+31
	zim.drag = function(obj, rect, overCursor, dragCursor, currentTarget, swipe, localBounds, onTop, surround, slide, slideDamp, slideSnap, reg, removeTweens, startBounds) {

		var sig = "obj, rect, overCursor, dragCursor, currentTarget, swipe, localBounds, onTop, surround, slide, slideDamp, slideSnap, reg, removeTweens, startBounds";
		var duo; if (duo = zob(zim.drag, arguments, sig)) return duo;
		z_d("31");
		if (zot(obj) || !obj.on) return;
		obj.cursor = (zot(overCursor)) ? "pointer" : overCursor;
		if (zot(currentTarget)) currentTarget = false;
		if (zot(swipe)) swipe = false;
		if (zot(localBounds)) localBounds = false;
		if (zot(onTop)) onTop = true;
		if (zot(surround)) surround = false;
		if (zot(slide)) slide = false;
		if (zot(slideDamp)) slideDamp = .3;
		if (zot(slideSnap)) slideSnap = true;
		var snapOptions = ["horizontal", "vertical", "auto"];
		if (slideSnap !== true && snapOptions.indexOf(slideSnap) < 0) slideSnap = false;
		if (zot(reg)) reg = false;
		if (zot(removeTweens)) removeTweens = true;
		if (zot(startBounds)) startBounds = true;

		zim.setSwipe(obj, swipe);
		obj.zimDragRect = rect;
		obj.zimLocalBounds = localBounds;
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
			if (obj.zimDragRect) {
				if (localBounds) {
					r = zim.boundsToGlobal(obj.parent, obj.zimDragRect);
					if (surround) rLocal = obj.zimDragRect;
				} else {
					r = obj.zimDragRect;
					if (surround) rLocal = zim.boundsToGlobal(obj.parent, obj.zimDragRect, true); // flips to global to local
				}
			}

			if (r && startBounds) {
				point = obj.parent.localToGlobal(obj.x, obj.y);
				positionObject(obj, point.x, point.y);
			}
			if (slide) {
				obj.zimDragMoving = true;
				setUpSlide();
			}
		}

		function unInitializeObject() {
			if (obj.zimDragTicker) zim.Ticker.remove(obj.zimDragTicker);
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
		}

		var dragObject;

		obj.zimDown = obj.on("mousedown", function(e) {
			// e.stageX and e.stageY are global
			// e.target.x and e.target.y are relative to e.target's parent
			// bring stageX and stageY into the parent's frame of reference
			// could use e.localX and e.localY but might be dragging container or contents
			dragObject = (currentTarget)?e.currentTarget:e.target;
			if (obj.zimDragRect && !dragObject.getBounds()) {zog("zim.drag() - drag object needs bounds set"); return;}
			downCheck = true;
			obj.getStage().mouseMoveOutside = true;

			// add a function to the Ticker queue (remove it if there first)
			if (!slide) { // slide has a persistent Ticker function
				if (obj.zimDragTicker) zim.Ticker.remove(obj.zimDragTicker);
				obj.zimDragTicker = zim.Ticker.add(function(){}, obj.getStage());
			}

			if (removeTweens) createjs.Tween.removeTweens(dragObject);
			if (onTop) dragObject.parent.setChildIndex(dragObject,dragObject.parent.numChildren-1);
			var point = dragObject.parent.globalToLocal(e.stageX, e.stageY);
			if (reg) {
				dragObject.x = point.x;
				dragObject.y = point.y;
			}
			diffX = point.x - dragObject.x;
			diffY = point.y - dragObject.y;

			if (obj.zimDragRect) {
				if (localBounds) {
					r = zim.boundsToGlobal(dragObject.parent, obj.zimDragRect);
					if (surround) rLocal = obj.zimDragRect;
				} else {
					r = obj.zimDragRect;
					if (surround) rLocal = zim.boundsToGlobal(dragObject.parent, obj.zimDragRect, true); // true flips to global to local
				}
			}
			// just a quick way to set a default cursor or use the cursor sent in
			obj.cursor = (zot(dragCursor))?"pointer":dragCursor;

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
				if (obj.zimDragRect) {
					if (localBounds) {
						r = zim.boundsToGlobal(o.parent, obj.zimDragRect);
						if (surround) rLocal = o.zimDragRect;
					} else {
						r = obj.zimDragRect;
						if (surround) rLocal = zim.boundsToGlobal(o.parent, obj.zimDragRect, true); // flips to global to local
					}
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
			var checkedPoint;
			if (slide && slideSnap) {
				if (slideSnap == "vertical") {
					checkedPoint = checkBounds(o,point.x-diffX, point.y-diffY);
					o.x = checkedPoint.x;
					o.y = point.y-diffY;
				} else if (slideSnap == "horizontal") {
					checkedPoint = checkBounds(o,point.x-diffX, point.y-diffY);
					o.x = point.x-diffX;
					o.y = checkedPoint.y;
				} else {
					o.x = point.x-diffX;
					o.y = point.y-diffY;
				}
			} else {
				checkedPoint = checkBounds(o,point.x-diffX, point.y-diffY);
				// now set the object's x and y to the resulting checked local point
				o.x = checkedPoint.x;
				o.y = checkedPoint.y;
			}

			// mask graphics needs to have same position as object
			// yet the mask is inside the object (but alpha = 0)
			if (o.zimMask) {
				o.zimMask.x = o.x;
				o.zimMask.y = o.y;
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
			} else {
				if (obj.zimDragTicker) zim.Ticker.remove(obj.zimDragTicker);
			}
		}, true);

		// the bounds check for registration inside the bounds
		// or if surround is set for the whole object staying outside the bounds
		function checkBounds(o, x, y) {
			if (r) {
				if (surround) {
					var w = o.getBounds().width;
					var h = o.getBounds().height;
					var bx = o.getBounds().x;
					var by = o.getBounds().y;
					if (w < rLocal.width) {
						// put half way between
						x = rLocal.x + (rLocal.width - w) / 2 + (o.regX-bx);
					} else {
						if (x - (o.regX-bx) > rLocal.x) {
							x = rLocal.x + (o.regX-bx);
						}
						if (x - (o.regX-bx) + w < rLocal.x + rLocal.width) {
							x = rLocal.x + rLocal.width + (o.regX-bx) - w;
						}
					}
					if (o.height < rLocal.height) {
						// put half way between
						y = rLocal.y + (rLocal.height - h) / 2 + (o.regY-by);
					} else {
						if (y - (o.regY-by) > rLocal.y) {
							y = rLocal.y + (o.regY-by);
						}
						if (y - (o.regY-by) + h < rLocal.y + rLocal.height) {
							y = rLocal.y + rLocal.height + (o.regY-by) - h;
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
			zim.Ticker.add(obj.zimDragTicker, stage);
		}
		return obj;
	}//-31

/*--
zim.noDrag = function(obj)

noDrag
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Removes drag function from an object.
This is not a stopDrag function (as in the drop of a drag and drop).
Dropping happens automatically with the drag() function.
The noDrag function turns off the drag function so it is no longer draggable.

EXAMPLE
circle.noDrag();

// OR with pre ZIM 4TH function
zim.noDrag(circle);
END EXAMPLE

PARAMETERS
obj - the object to make not draggable

RETURNS obj for chaining
--*///+32
	zim.noDrag = function(obj) {
		z_d("32");
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
	}//-32

/*--
zim.dragRect = function(obj, rect)

dragRect
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Dynamically changes or adds a bounds rectangle to the object being dragged with zim.drag().

EXAMPLE
var dragBounds = new createjs.Rectangle(100,100,500,400);
circle.dragRect(dragBounds);

OR pre ZIM 4TH
zim.dragRect(circle, dragBounds);
END EXAMPLE

PARAMETERS
obj - an object that currently has its zim.drag() set
rect - is a createjs.Rectangle for the bounds - the local / global does not change from the original drag

RETURNS obj for chaining
--*///+33
	zim.dragRect = function(obj, rect) {
		z_d("33");
		if (zot(obj) || !obj.on) return;
		if (zot(rect)) return;
		obj.zimDragRect = rect;
		obj.zimDragMoving = true;
		if (obj.zimPosition) obj.zimPosition();
		return obj;
	}//-33

/*--
zim.setSwipe = function(obj, swipe)

setSwipe
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Sets whether we want to swipe an object or not using ZIM Swipe.
Recursively sets children to same setting.

EXAMPLE
zim.swipe(circle, false);

OR with pre ZIM 4TH function
circle.swipe(false);
END EXAMPLE

PARAMETERS
obj - a display object
swipe - (default true) set to false to not swipe object

RETURNS obj for chaining
--*///+34
	zim.setSwipe = function(obj, swipe) {
		z_d("34");
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
		return obj;
	}//-34

/*--
zim.hitTestPoint = function(obj, x, y)

hitTestPoint
zim function - and Display object method under ZIM 4TH

DESCRIPTION
See if shape of obj is hitting the global point x and y on the stage.

EXAMPLE
var circle = new zim.Circle();
stage.addChild(circle);
circle.drag();
circle.on("pressmove", function() {
	if (circle.hitTestPoint(stageW/2, stageH/2)) {
		if (circle.alpha == 1) {
			circle.alpha = .5;
			stage.update();
		}
	} else {
		if (circle.alpha == .5) {
			circle.alpha = 1;
			stage.update();
		}
	}
});

OR with pre ZIM 4TH functions
zim.drag(circle); // etc.
if (zim.hitTestPoint(circle, stageW/2, stageH/2)) {} // etc.
END EXAMPLE

PARAMETERS
obj - the obj whose shape we are testing
x and y - the point we are testing to see if it hits the shape

RETURNS a Boolean true if hitting, false if not
--*///+35
	zim.hitTestPoint = function(obj, x, y) {
		z_d("35");
		if (!obj.stage) return false;
		if (zot(obj) || !obj.globalToLocal) return;
		var point = obj.globalToLocal(x,y);
		var bounds = obj.getBounds();
		if (bounds) { // faster to check if point is in bounds first
			if (point.x > bounds.x + bounds.width || point.x < bounds.x) return;
			if (point.y > bounds.y + bounds.height || point.y < bounds.y) return;
		}
		return obj.hitTest(point.x, point.y);
	}//-35

/*--
zim.hitTestReg = function(a, b)

hitTestReg
zim function - and Display object method under ZIM 4TH

DESCRIPTION
See if shape (a) is hitting the registration point of object (b).

EXAMPLE
var circle = new zim.Circle(50, "red");
circle.center(stage);
circle.drag();
var rect = new zim.Rectangle(100, 100, "blue");
stage.addChild(rect);
circle.on("pressmove", function() {
	if (circle.hitTestReg(rect)) {
		stage.removeChild(rect);
		stage.update();
	}
})

OR with pre ZIM 4TH function
zim.center(circle, stage);
zim.drag(circle); etc.
if (zim.hitTestReg(circle, rect)) {} // etc.
END EXAMPLE

PARAMETERS
a - the object whose shape we are testing
b - the object whose registration point we are checking against

RETURNS a Boolean true if hitting, false if not
--*///+36
	zim.hitTestReg = function(a, b) {
		z_d("36");
		if (!a.stage || !b.stage) return false;
		if (zot(a) || zot(b) || !a.localToLocal || !b.localToLocal) return;
		var point = b.localToLocal(b.regX,b.regY,a);
		var bounds = a.getBounds();
		if (bounds) { // faster to check if point is in bounds first
			if (point.x > bounds.x + bounds.width || point.x < bounds.x) return;
			if (point.y > bounds.y + bounds.height || point.y < bounds.y) return;
		}
		return a.hitTest(point.x, point.y);
	}//-36

/*--
zim.hitTestRect = function(a, b, num)

hitTestRect
zim function - and Display object method under ZIM 4TH

DESCRIPTION
See if a shape (a) is hitting points on a rectangle.
The rectangle is based on the position, registration and bounds of object (b).
num is how many points on the edge of the rectangle we test - default is 0.
The four corners are always tested as well as the very middle of the rectangle.

EXAMPLE
var circle = new zim.Circle(50, "red");
circle.center(stage);
circle.drag();
var rect = new zim.Rectangle(100, 100, "blue");
stage.addChild(rect);
circle.on("pressmove", function() {
	if (circle.hitTestRect(rect)) {
		stage.removeChild(rect);
		stage.update();
	}
});

OR with pre ZIM 4TH function
zim.center(circle, stage);
zim.drag(circle); etc.
if (zim.hitTestRect(circle, rect)) {} // etc.
END EXAMPLE

PARAMETERS
a - the object whose shape we are testing
b - the object whose bounding rectangle we are checking against
num - (default 0) the number of points along each edge to checking
	1 would put a point at the middle of each edge
	2 would put two points at 1/3 and 2/3 along the edge, etc.
	there are always points at the corners
	and one point in the middle of the rectangle

RETURNS a Boolean true if hitting, false if not
--*///+37
	zim.hitTestRect = function(a, b, num) {
		z_d("37");
		if (!a.stage || !b.stage) return false;
		if (zot(a) || zot(b) || !a.hitTest || !b.getBounds) return;
		if (zot(num)) num = 0;
		var bounds = b.getBounds();
		if (!bounds) {
			zog("zim create - hitTestRect():\n please setBounds() on param b object");
			return;
		}
		var bounds2 = a.getBounds();
		if (bounds2 && !zim.hitTestBounds(a,b)) return; // bounds not hitting

		var centerX = bounds.x+bounds.width/2;
		var centerY = bounds.y+bounds.height/2;
		var point = b.localToLocal(centerX, centerY, a);
		if (a.hitTest(point.x, point.y)) return true; // check hit on center of Rectangle

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
	}//-37

/*--
zim.hitTestCircle = function(a, b, num)

hitTestCircle
zim function - and Display object method under ZIM 4TH

DESCRIPTION
See if a shape (a) is hitting points on a circle.
The circle is based on the position, registration and bounds of object (b).
num is how many points around the circle we test - default is 8
Also checks center of circle hitting.

EXAMPLE
var circle = new zim.Circle(50, "red");
circle.center(stage);
circle.drag();
var triangle = new zim.Triangle(100, 100, 100, "blue");
stage.addChild(triangle);
circle.on("pressmove", function() {
	if (triangle.hitTestCircle(circle)) {
		stage.removeChild(triangle);
		stage.update();
	}
});

OR with pre ZIM 4TH function
zim.center(circle, stage);
zim.drag(circle); etc.
if (zim.hitTestCircle(triangle, circle)) {} // etc.
END EXAMPLE

PARAMETERS
a - the object whose shape we are testing
b - the object whose circle based on the bounding rect we are using
num - (default 8) the number of points evenly distributed around the circle
	and one point in the middle of the circle

RETURNS a Boolean true if hitting, false if not
--*///+38
	zim.hitTestCircle = function(a, b, num) {
		z_d("38");
		if (!a.stage || !b.stage) return false;
		if (zot(a) || zot(b) || !a.hitTest || !b.getBounds) return;
		if (zot(num)) num = 8;
		var bounds = b.getBounds();
		if (!bounds) {
			zog("zim create - hitTestCircle():\n please setBounds() on param b object");
			return;
		}
		var bounds2 = a.getBounds();
		if (bounds2 && !zim.hitTestBounds(a,b)) return; // bounds not hitting

		var centerX = bounds.x+bounds.width/2;
		var centerY = bounds.y+bounds.height/2;
		var point = b.localToLocal(centerX, centerY, a);
		if (a.hitTest(point.x, point.y)) return true; // check hit on center of circle
		var radius = (bounds.width+bounds.height)/2/2; // average diameter / 2
		var angle, pointX, pointY;
		for (var i=0; i<num; i++) {
			angle = i/num * 2*Math.PI; // radians
			pointX = centerX + (radius * Math.cos(angle));
			pointY = centerY + (radius * Math.sin(angle));
			point = b.localToLocal(pointX, pointY, a);
			if (a.hitTest(point.x, point.y)) return true;
		}

	}//-38

/*--
zim.hitTestBounds = function(a, b, boundsShape)

hitTestBounds
zim function - and Display object method under ZIM 4TH

DESCRIPTION
See if a.getBounds() is hitting b.getBounds().
Pass in a boundsShape shape if you want a demonstration of where the bounds are.

EXAMPLE
var circle = new zim.Circle(50, "red");
circle.center(stage);
circle.drag();
var rect = new zim.Rectangle(100, 100, "blue");
stage.addChild(rect);
circle.on("pressmove", function() {
	if (circle.hitTestBounds(rect)) {
		stage.removeChild(rect);
		stage.update();
	}
});

OR with pre ZIM 4TH function
zim.center(circle, stage);
zim.drag(circle); etc.
if (zim.hitTestBounds(circle, rect)) {} // etc.
END EXAMPLE

PARAMETERS
a - an object whose rectanglular bounds we are testing
b - another object whose rectanglular bounds we are testing
boundsShape - (default null) an empty zim.Shape or createjs.Shape
	you would need to add the boundsShape to the stage

RETURNS a Boolean true if hitting, false if not
--*///+39
	zim.hitTestBounds = function(a, b, boundsShape) {
		z_d("39");
		if (!a.stage || !b.stage) return false;
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
			g.c();
			g.ss(1).s("blue");
			g.r(adjustedA.x, adjustedA.y, adjustedA.width, adjustedA.height);
			g.s("green");
			g.r(adjustedB.x, adjustedB.y, adjustedB.width, adjustedB.height);
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
	}//-39

/*--
zim.boundsToGlobal = function(obj, rect, flip)

boundsToGlobal
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Returns a createjs Rectangle of the bounds of object projected onto the stage.
Handles scaling and rotation.
If a createjs rectangle is passed in then it converts this rectangle
from within the frame of the obj to a global rectangle.
If flip (default false) is set to true it goes from global to local rect.
Used by drag() and hitTestBounds() above - probably you will not use this directly.

EXAMPLE
zog(circle.boundsToGlobal().x); // global x of circle

OR with pre ZIM 4TH function
zog(zim.boundsToGlobal(circle).width); // global width of circle)
END EXAMPLE

PARAMETERS
obj - an object for which you would like global bounds projected
rect - a rect inside an object which you would like mapped to global
flip - (default false) make a global rect ported to local values

RETURNS a Boolean true if hitting, false if not
--*///+40
	zim.boundsToGlobal = function(obj, rect, flip) {
		z_d("40");
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
	}//-40

/*--
zim.hitTestGrid = function(obj, width, height, cols, rows, x, y, offsetX, offsetY, spacingX, spacingY, local, type)

hitTestGrid
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Converts an x and y point to an index in a grid.
If you have a grid of rectangles, for instance, use this to find out which rectangle is beneath the cursor.
This technique will work faster than any of the other hit tests.

EXAMPLE
zim.Ticker.add(function() {
	var index = stage.hitTestGrid(200, 200, 10, 10, stage.mouseX, stage.mouseY);
	if (index) zog(index);
});
OR with pre ZIM 4TH function
var index = zim.hitTestGrid(stage, 200, 200, 10, 10, stage.mouseX, stage.mouseY);
END EXAMPLE
offsetX, offsetY, spacingX, spacingY, local, type

PARAMETERS
obj - the object that contains the grid
width and height - the overall dimensions
cols and rows - how many of each (note it is cols and then rows)
x and y - where you are in the grid (eg. stage.mouseX and stage.mouseY)
offsetX and offsetY - (default 0) the distances the grid starts from the origin of the obj
spacingX and spacingY - (default 0) spacing between grid cells (null will be returned if x and y within spacing)
	spacing is only between the cells and is to be included in the width and height (but not outside the grid)
local - (default false) set to true to convert x and y to local values
type - (default index) which means the hitTestGrid returns the index of the cell beneath the x and y point
	starting with 0 at top left corner and counting columns along the row and then to the next row, etc.
	set type to "col" to return the column and "row" to return the row
	set to "array" to return all three in an Array [index, col, row]

RETURNS an index Number (or undefined) | col | row | an Array of [index, col, row]
--*///+41
	zim.hitTestGrid = function(obj, width, height, cols, rows, x, y, offsetX, offsetY, spacingX, spacingY, local, type) {
		z_d("41");
		if (!obj.stage) return false;
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
	}//-41

/*--
zim.move = function(target, x, y, time, ease, call, params, wait, loop, loopCount, loopWait, loopCall, loopParams, rewind, rewindWait, rewindCall, rewindParams, sequence, sequenceCall, sequenceParams, sequenceReverse, ticker, props, protect, override, from, set, id)

move
zim function - and Display object method under ZIM 4TH
wraps createjs.Tween

DESCRIPTION
Moves a target object to position x, y in time milliseconds.
You can set various types of easing like bounce, elastic, back, linear, sine, etc.
Handles callbacks, delays, loops, rewinds, sequences of move animations.
Also see the more general zim.animate()
(which this function calls after consolidating x an y into an object).

NOTE: to temporarily prevent animations from starting set zim.ANIMATE to false
NOTE: see zim.pauseZimAnimate(state, ids) and zim.stopZimAnimate(ids) for controlling tweens when running

EXAMPLE
var circle = new zim.Circle(50, "red");
circle.center(stage);
circle.move(100, 100, 700, "backOut");

OR with pre ZIM 4TH function
zim.center(circle, stage);
zim.move(circle, 100, 100, 700, "backOut");
// see ZIM Bits for more move examples
END EXAMPLE

PARAMETERS - supports DUO - parameters or single object with properties below
target - the target object to tween
x and y - the absolute positions to tween to
time - the time for the tween in milliseconds 1000 ms = 1 second
ease - (default "quadInOut") see CreateJS easing ("bounceOut", "elasticIn", "backInOut", "linearInOut", etc)
call - (default null) the function to call when the animation is done
params - (default target) a single parameter for the call function (eg. use object literal or array)
wait - (default 0) milliseconds to wait before doing animation
loop - (default false) set to true to loop animation
loopCount - (default 0) if loop is true how many times it will loop (0 is forever)
loopWait - (default 0) milliseconds to wait before looping (post animation wait)
loopCall - (default null) calls function after loop is done (not including last loop)
loopParams - (default target) parameters to send loop function
rewind - (default false) set to true to rewind (reverse) animation (doubles animation time)
rewindWait (default 0) milliseconds to wait in the middle of the rewind
rewindCall (default null) calls function at middle of rewind animation
rewindParams - (default target) parameters to send rewind function
sequence - (default 0) the delay time in milliseconds to run on children of a container or an array of target animations
	for example, target = container or target = [a,b,c] and sequence = 1000
	would run the animation on the first child and then 1 second later, run the animation on the second child, etc.
	or in the case of the array, on element a and then 1 second later, element b, etc.
	If the loop prop is true then sequenceCall below would activate for each loop
	For an array, you must use the zim function with a target parameter - otherwise you can use the ZIM 4TH method
sequenceCall - (default null) the function that will be called when the sequence ends
sequenceParams - (default null) a parameter sent to the sequenceCall function
sequenceReverse - (default false) set to true to sequence through container or array backwards
props - (default {override: true}) legacy - allows you to pass in TweenJS props
protect - (default false) protects animation from being interrupted before finishing
 	unless manually interrupted with stopZimMove()
	protect is always true (regardless of parameter setting) if loop or rewind parameters are set
override - (default true) subesequent tweens of any type on object cancel all earlier tweens on object
	set to false to allow multiple tweens of same object
from - (default false) set to true to animate from obj properties to the current properties set on target
set - (default null) an object of properties to set on the target to start (but after the wait time)
id - (default randomly created) set to String for id to pause or stop Tween

NOTE: earlier versions of ZIM used props for loop and rewind - now these are direct parameters
NOTE: call is now triggered once after all loops and rewinds are done

RETURNS the target for chaining
--*///+44
	zim.move = function(target, x, y, time, ease, call, params, wait, loop, loopCount, loopWait, loopCall, loopParams, rewind, rewindWait, rewindCall, rewindParams, sequence, sequenceCall, sequenceParams, sequenceReverse, ticker, props, protect, override, from, set, id) {
		var sig = "target, x, y, time, ease, call, params, wait, loop, loopCount, loopWait, loopCall, loopParams, rewind, rewindWait, rewindCall, rewindParams, sequence, sequenceCall, sequenceParams, sequenceReverse, ticker, props, protect, override, from, set, id";
		var duo; if (duo = zob(zim.move, arguments, sig)) return duo;
		z_d("44");
		if (zot(x) && zot(y)) return;
		var obj = {x:x, y:y};
		if (zot(x)) {obj = {y:y};} else if (zot(y)) {obj = {x:x};}
		return zim.animate(target, obj, time, ease, call, params, wait, loop, loopCount, loopWait, loopCall, loopParams, rewind, rewindWait, rewindCall, rewindParams, sequence, sequenceCall, sequenceParams, sequenceReverse, ticker, props, null, protect, override, from, set, id);
	}//-44

/*--
zim.animate = function(target, obj, time, ease, call, params, wait, loop, loopCount, loopWait, loopCall, loopParams, rewind, rewindWait, rewindCall, rewindParams, sequence, sequenceCall, sequenceParams, sequenceReverse, ticker, props, css, protect, override, from, set, id)

animate
zim function - and Display object method under ZIM 4TH
wraps createjs.Tween

DESCRIPTION
Animate object obj properties in time milliseconds.
You can set various types of easing like bounce, elastic, back, linear, sine, etc.
Handles callbacks, delays, loops, rewinds, series and sequences of animations.
Also see the more specific zim.move() to animate position x, y
although you can animate x an y just fine with zim.animate.

NOTE: to temporarily prevent animations from starting set zim.ANIMATE to false
NOTE: see zim.pauseZimAnimate(state, ids) and zim.stopZimAnimate(ids) for controlling tweens when running

EXAMPLE
var circle = new zim.Circle(50, "red");
circle.center(stage);
circle.alpha = 0;
circle.scale(0);
circle.animate({alpha:1, scale:1}, 700, null, done);
function done(target) {
	// target is circle if params is not set
	target.drag();
}

// or with ZIM DUO and from parameter:
var circle = new zim.Circle(50, "red");
circle.center(stage);
circle.animate({obj:{alpha:0, scale:0}, time:700, from:true});

// note: there was no need to set alpha and scale to 0 before the animation
// because from will animate from property values in obj {alpha:0, scale:0}
// to the present set values - which are 1 and 1 for the default scale and alpha.
// This allows you to place everything how you want it to end up
// and then easily animate to this state.
// An extra advantage of this is that you can use the zim.ANIMATE constant to skip animations while building
// See the http://zimjs.com/code/ornamate.html example


// pulse circle
var circle = new zim.Circle(50, "red");
circle.center(stage);
// pulse circle from scale 0 - 1 every second (use ZIM DUO)
circle.animate({obj:{scale:0}, time:500, loop:true, rewind:true, from:true});
// see ZIM Bits for more move examples

OR with pre ZIM 4TH function and without from
var circle = new zim.Circle(50, "red");
zim.center(circle, stage);
circle.alpha = 0;
zim.scale(circle, 0);
zim.animate(circle, {alpha:1, scale:1}, 700, null, done);
function done(target) {
	// target is circle if params is not set
	zim.drag(target);
}
END EXAMPLE

EXAMPLE
// Series example animating a circle in square formation
// Also showing that the series can include multiple targets
// Click on the stage to pause or unpause the animation

var rect = new zim.Rectangle({color:frame.pink})
	.centerReg(stage)
	.scale(0); // hiding it to start

var circle = new zim.Circle({color:frame.purple}) // chaining the rest
	.addTo(stage)
	.pos(400,300)
	.animate({ // circle will be the default object for the inner animations
		obj:[
			// an array of animate configuration objects
			{obj:{x:600, y:300, scale:2}},
			{obj:{x:600, y:500, scale:1}, call:function(){zog("part way");}},
			{obj:{x:400, y:500}, time:500, ease:"quadInOut"},
			{target:rect, obj:{scale:3}, time:1000, rewind:true, ease:"quadInOut"},
			{obj:{x:400, y:300}}
		],
		time:1000, // will be the default time for the inner animations
		ease:"backOut", // will be the default ease for the inner animations
		id:"square", // will override any id set in the inner animations
		loop:true,
		loopCount:3,
		// note - no rewind or from parameters
		call:function(){zog("done");}
	});

	var paused = false;
	stage.on("stagemousedown", function() {
			paused = !paused;
			zim.pauseZimAnimate(paused, "square");
	});
END EXAMPLE

EXAMPLE
// sequence example to pulse two circles
var circle1 = new zim.Circle(50, "red");
var circle2 = new zim.Circle(50, "blue");
zim.center(circle1, stage);
zim.center(circle2, stage);
circle2.x += 70;
zim.animate({
	target:[circle1, circle2],
	obj:{scale:1},
	time:500,
	loop:true,
	rewind:true,
	from:true,
	sequence:500
});
END EXAMPLE

PARAMETERS - supports DUO - parameters or single object with properties below
target - the target object to tween
obj - the object literal holding properties and values to animate (includes a scale - convenience property for scaleX and scaleY)
	if you pass in an array, then this will run an animation series
	The array must hold animate configuration objects:
	[{obj:{scale:2}, time:1000, rewind:true}, {target:different, obj:{x:100}}, etc.]
	If you run animate as a method on an object then this is the default object for the series
	but you can specify a target to override the default
	The default time and tween are as provided in the main parameters
	but you can specify these to override the default
	The id of the main parameters is used for the whole series and cannot be overridden
	The override parameter is set to false and cannot be overridden
	All other main parameters are available except rewind, sequence and from
	(rewind and from are available on the inner tweens - for sequence: the initial animation is considered)
	You currently cannot nest animimation series
	Note: if any of the series has a loop and loops forever (a loopCount of 0 or no loopCount)
	then this will be the last of the series to run
time - the time for the tween in milliseconds 1000 ms = 1 second
ease - (default "quadInOut") see CreateJS easing ("bounceOut", "elasticIn", "backInOut", "linearInOut", etc)
call - (default null) the function to call when the animation is done
params - (default target) a single parameter for the call function (eg. use object literal or array)
wait - (default 0) milliseconds to wait before doing animation
loop - (default false) set to true to loop animation
loopCount - (default 0) if loop is true how many times it will loop (0 is forever)
loopWait - (default 0) milliseconds to wait before looping (post animation wait)
loopCall - (default null) calls function after loop is done (not including last loop)
loopParams - (default target) parameters to send loop function
rewind - (default false) set to true to rewind (reverse) animation (doubles animation time)
rewindWait (default 0) milliseconds to wait in the middle of the rewind
rewindCall (default null) calls function at middle of rewind animation
rewindParams - (default target) parameters to send rewind function
sequence - (default 0) the delay time in milliseconds to run on children of a container or an array of target animations
	for example, target = container or target = [a,b,c] and sequence = 1000
	would run the animation on the first child and then 1 second later, run the animation on the second child, etc.
	or in the case of the array, on element a and then 1 second later, element b, etc.
	If the loop prop is true then sequenceCall below would activate for each loop
	For an array, you must use the zim function with a target parameter - otherwise you can use the ZIM 4TH method
sequenceCall - (default null) the function that will be called when the sequence ends
sequenceParams - (default null) a parameter sent to the sequenceCall function
sequenceReverse - (default false) set to true to sequence through container or array backwards
ticker - (default true) set to false to not use an automatic zim.Ticker function
props - (default {override: true}) legacy - allows you to pass in TweenJS props
css - (default false) set to true to animate CSS properties in HTML
 	requires CreateJS CSSPlugin - ZIM has a copy here:
	<script src="https://d309knd7es5f10.cloudfront.net/CSSPlugin.js"></script>
	<script>
		// in your code at top after loading createjs
		createjs.CSSPlugin.install(createjs.Tween);
		// the property must be set before you can animate
		zss("tagID").opacity = 1; // set this even if it is default
		zim.animate(zid("tagID"), {opacity:0}, 2000); // etc.
	</script>
protect - (default false) protects animation from being interrupted before finishing
 	unless manually interrupted with stopZimAnimate()
	protect is always true (regardless of parameter setting) if loop or rewind parameters are set
override - (default true) subesequent tweens of any type on object cancel all earlier tweens on object
	set to false to allow multiple tweens of same object
from - (default false) set to true to animate from obj properties to the current properties set on target
set - (default null) an object of properties to set on the target to start (but after the wait time)
id - (default null) set to String to use with zimPauseTween(state, id) and zimStopTween(id)

NOTE: earlier versions of ZIM used props for loop and rewind - now these are direct parameters
NOTE: call is now triggered once after all loops and rewinds are done

RETURNS the target for chaining (or null if no target is provided and run on zim with series)
--*///+45
	zim.animate = function(target, obj, time, ease, call, params, wait, loop, loopCount, loopWait, loopCall, loopParams, rewind, rewindWait, rewindCall, rewindParams, sequence, sequenceCall, sequenceParams, sequenceReverse, ticker, props, css, protect, override, from, set, id) {
		var sig = "target, obj, time, ease, call, params, wait, loop, loopCount, loopWait, loopCall, loopParams, rewind, rewindWait, rewindCall, rewindParams, sequence, sequenceCall, sequenceParams, sequenceReverse, ticker, props, css, protect, override, from, set, id";
		var duo; if (duo = zob(zim.animate, arguments, sig)) return duo;
		z_d("45");

		if (zim.ANIMATE == false) return;

		// PROPS
		// convert loop and rewind properties into the legacy props object
		var newProps = {override: true};
		if (!zot(loop)) newProps.loop = loop;
		if (!zot(loopCount)) newProps.count = loopCount; // note prop is count
		if (!zot(loopWait)) newProps.loopWait = loopWait;
		if (!zot(loopCall)) newProps.loopCall = loopCall;
		if (!zot(loopParams)) newProps.loopParams = loopParams;
		if (!zot(rewind)) newProps.rewind = rewind;
		if (!zot(rewindWait)) newProps.rewindWait = rewindWait;
		if (!zot(rewindCall)) newProps.rewindCall = rewindCall;
		if (!zot(rewindParams)) newProps.rewindParams = rewindParams;
		if (!zot(props)) newProps = zim.merge(newProps, props); // props to overwrite
		props = newProps;

		// SEQUENCE HANDLING
		// handle multiple targets first if there is an array
		// this just recalls the animate function for each element delayed by the sequence parameter
		if (zot(sequence)) sequence = 0;
		if (sequence > 0 && target.addChild) { // container with sequence so convert target to array
			var newTarget = [];
			for (var i=0; i<target.numChildren; i++) {
				newTarget.push(target.getChildAt(i));
			}
			target = newTarget;
		}
		if (target instanceof Array) {
			if (sequenceReverse) target.reverse();
			var currentTarget = 0;
			for (var i=0; i<target.length; i++) {
				-function () { // closure to store num (i) for timeout
					var num = i;
					if (from) {
						var val;
						target[i].zimObj = {};
						for (var prop in obj) {
							val = obj[prop];
							target[i].zimObj[prop] = target[i][prop];
							target[i][prop] = val;
						}
					} else {
						target[i].zimObj = obj;
					}
					setTimeout(function() {
						var t =	target[currentTarget];
						currentTarget++;
						zim.animate(t, t.zimObj, time, ease, call, params, wait, null, null, null, null, null, null, null, null, null, null, null, null, null, ticker, zim.copy(props), css, protect, override, null, set, id); // do not send from!
						if (num == target.length-1 && sequenceCall) {
							// calculate tween time
							var duration = ((time)?time:1000); // + ((wait)?wait:0); // wait only happens at start - no longer each time
							if (props && props.rewind) {
								duration += ((time)?time:1000) + ((props.rewindWait)?props.rewindWait:0);
							}
							if (props && props.loop && props.loopWait) {
								duration += props.loopWait;
							}
							setTimeout(function(){
								sequenceCall(sequenceParams);
							}, duration);
						}
					}, sequence*i);
				}();
			}
			return;
		}

		// DEFAULTS
		var t = time;
		if (zot(t)) t = 1000;
		if (zot(ease)) ease = "quadInOut";
		if (zot(wait)) wait = 0;
		if (zot(props)) props = {override: true};
		if (zot(params)) params = target;
		if (zot(ticker)) ticker = true;
		if (zot(css)) css = false;
		if (zot(protect)) protect = false;
		if (zot(from)) from = false;
		if (zot(set)) set = {};
		if (set.scale) {set.scaleX = set.scaleY = set.scale; delete set.scale}
		if (!zot(override)) props.override = override;
		var tween;
		var idSet;
		var providedID;

		// ANIMATION SERIES HANDLING
		// if an array is passed in to animate() as the obj
		// then animate treats this as an animation series
		// [{target:circle, obj:{alpha:0}, time:1000}, {target:rect, obj:{alpha:0}, time:1000},]
		if (obj instanceof Array) {
			var starts;
			var currentCount = 1;
			if (obj.length == 0) return this;

			prepareSeries();
			prepareIds();
			runMaster();

			function runMaster() { // one day might consider reverse...
				var o; // inner obj
				var w = wait; // time for wait before starting animation
				var lastEnd = 0; // time of last label end
				var duration; // time of each label animation not including initial wait
				for (var i=0; i<obj.length; i++) {
					o = obj[i];
					if (zot(o.target)) continue;
					if (zot(o.time)) o.time = t;
					w += (o.wait?o.wait:0);
					duration = o.time;
					if (o.rewind) duration = duration * 2 + (o.rewindWait?o.rewindWait:0);
					if (o.loop) {
						// if loopCount is 0 (forever) then prepare series makes this the last animation
						duration *= o.loopCount;
						duration += (o.loopCount-1) * (o.loopWait?o.loopWait:0);
					}
					var currentObj = {
						target:o.target,
						obj:zim.copy(o.obj),
						wait:lastEnd+w,
						time:o.time,
						ease:o.ease,
						from:o.from,
						rewind:o.rewind,
						call:o.call,
						params:o.params,
						loop:o.loop, loopCount:o.loopCount, loopWait:o.loopWait,
						loopCall:o.loopCall, loopParams:o.loopParams,
						rewind:o.rewind, rewindWait:o.rewindWait,
						rewindCall:o.rewindCall, rewindParams:o.rewindParams,
						set:o.set,
						override:false,
						id:id
					}
					if (i == obj.length-1) {
						endSeries(currentObj);
					}
					zim.animate(currentObj);
					lastEnd += w + duration;
					w = 0;
				}
			}
			function endSeries(currentObj) {

				if (props.loop && (!props.count || currentCount < props.count)) {
					currentObj.call = function() {
						if (props.loopWait) {
							tween = target.zimTweens[id] = target.zimTween = createjs.Tween.get(target, {override:props.override}).wait(props.loopWait).call(goNext);
						} else {
							goNext();
						}
						function goNext() {
							for (var k=0; k<starts.objects.length; k++) {
								if (starts.objects[k].set) starts.objects[k].set(starts.values[k]);
							}
							if (props.loopCall && typeof props.loopCall == 'function') {(props.loopCall)(props.loopParams);}
							runMaster();
						}
					}
				} else {
					currentObj.call = function() {
						if (call && typeof call == 'function') {(call)(params);}
						endTween(id);
					}
				}
				currentCount++;
			}
			function prepareSeries() {
				var froms = new zim.Dictionary();
				starts = new zim.Dictionary();
				for (var i=0; i<obj.length; i++) {
					o = obj[i];
					if (!target) target = o.target;
					if (zot(o.target)) o.target = target;
					if (zot(o.ease)) o.ease = ease;
					if (zot(o.target)) continue;
					if (o.loop && (zot(o.loopCount) || o.loopCount <= 0)) {
						o.loopCount = 0;
						// this object is looping forever so no point in keeping any next objects
						obj.splice(i+1, obj.length); // obj.length may be too much but it works
					}
					if (!zot(o.obj.scale)) {
						o.obj.scaleX = o.obj.scaleY = o.obj.scale;
						delete o.obj.scale;
					}
					if (o.from) {
						var firstFrom = froms.at(o.target);
						if (firstFrom) {
							if (o.set) {
								// all properties from obj go to set
								// matching firstFrom properties to to obj
								// matching set properties override firstFrom on obj
								var temp = zim.copy(o.obj);
								var merged = zim.merge(firstFrom, o.set);
								o.obj = getFroms(o.target, o.obj, merged);
								o.set = zim.merge(o.set, temp);
							} else {
								o.set = zim.copy(o.obj);
								o.obj = getFroms(o.target, o.obj, firstFrom);
							}
							o.from = false;
						} else {
							// any set properties override target properties
							froms.add(o.target, getFroms(o.target, o.obj, o.set));
						}
					}
					var startProps = {};
					for (var iii in o.obj) {
						startProps[iii] = o.set?(o.set[iii]?o.set[iii]:o.target[iii]):o.target[iii];
					}
					if (zot(starts.at(o.target))) starts.add(o.target, {});
					var newEntry = zim.merge(starts.at(o.target), startProps);
					starts.remove(o.target);
					starts.add(o.target, newEntry);
				}
				if (zot(target.zimTweens)) target.zimTweens = {};
			} // end prepareSeries
			return target;
		} // end series

		// -----------------------------
		// NORMALIZED TWEEN COMING THROUGH
		if (zot(target)) return;
		if (zot(target.zimTweens)) target.zimTweens = {};
		if (ticker && (zot(target.getStage) || zot(target.getStage()))) {if (zon) {zog("zim.move(), zim.animate() - please add target to stage before animating")}; return};
		if (!zot(obj.scale)) {
			obj.scaleX = obj.scaleY = obj.scale;
			delete obj.scale;
		}

		// PROTECT LOOPS AND REWINDS WITH BUSY
		// if protected or a loop or rewind is currently running for any of these properties
		// then remove the property from obj as it is currently busy
		for(var o in obj) {
			if (!target.zimBusy) break;
			if (target.zimBusy[o]) delete obj[o];
		}
		if (zim.isEmpty(obj)) return; // nothing left to animate
		function addZimBusy() {
			target.mouseEnabled = false;
			setTimeout(function() {
				if (!target.zimBusy) target.zimBusy = {};
				for(var o in obj) {
					target.zimBusy[o] = true;
				}
				target.mouseEnabled = true;
			}, 70);
		}
		if (protect || props.loop || props.rewind) addZimBusy();

		// IDS and IDSETS
		prepareIds();
		function prepareIds() {
			if (zot(id)) {
				id = zim.makeID(10);
			} else {
				id = String(id);
				providedID = id;
			}
			if (zot(target.zimIdSets)) target.zimIdSets = {};
			if (!zot(target.zimIdSets[id])) {
				idSet = id;
				id = zim.makeID(10);
				target.zimIdSets[idSet].push(id);
			} else if (!zot(target.zimTweens[id])) {
				idSet = id;
				id = zim.makeID(10);
				target.zimIdSets[idSet] = [idSet]; // add original into set
				target.zimTweens[idSet].zimIdSet = idSet; // reference back to idSet
				target.zimIdSets[idSet].push(id); // push the second one in
			} // else nothing - id is not currently part of idSet
		}


		// PREPARE START VALUES
		if (from) obj = getFroms(target, obj, set, true);
		function getFroms(target, obj, set, update) {
			var newObj = {};
			for (var i in obj) {
				if (set && !zot(set[i])) {
					newObj[i] = set[i];
				} else {
					newObj[i] = target[i];
				}
				if (update) target[i] = obj[i];
			}
			return newObj;
		}

		// LOOP AND REWIND SETUP
		var count = 0;
		if (props.loop) {
			if (!zot(props.count)) {
				count = props.count;
				delete props.count;
				var currentCount = 1;
			}
		}
		var wait3 = 0;
		if (props.loopWait) {
			wait3 = props.loopWait;
			delete props.loopWait;
		}
		var call3;
		if (props.loopCall) {
			call3 = props.loopCall;
			delete props.loopCall;
		}
		var params3 = target;
		if (props.loopParams) {
			params3 = props.loopParams;
			delete props.loopParams;
		}

		// TWEENS FOR REWIND, LOOP and NORMAL
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
			var wait2 = 0;
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
				if (wait > 0) { // do not want wait as part of future loops (use loopWait)
					tween = target.zimTweens[id] = target.zimTween = createjs.Tween.get(target, {override:props.override}).wait(wait).call(tween1);
				} else {
					tween1();
				}
				function tween1() {
					var obj2 = getStart();
					if (target.set) target.set(set);
					tween = target.zimTweens[id] =  target.zimTween = createjs.Tween.get(target, props)
						.to(obj, t, createjs.Ease[ease])
						.call(doRewindCall)
						.wait(wait2)
						.to(obj2, t, createjs.Ease[ease2])
						.call(doneAnimating)
						.wait(wait3);
					setZimTweenProps();
				}
			} else {
				if (wait > 0) { // do not want wait as part of future loops (use loopWait)
					tween = target.zimTweens[id] = target.zimTween = createjs.Tween.get(target).wait(wait, {override:props.override}).call(tween2);
				} else {
					tween2();
				}
				function tween2() {
					var obj2 = getStart();
					if (target.set) target.set(set);
					tween = target.zimTweens[id] = target.zimTween = createjs.Tween.get(target, props)
						.to(obj, t, createjs.Ease[ease])
						.wait(wait2)
						.to(obj2, t, createjs.Ease[ease2])
						.call(doneAnimating)
						.wait(wait3);
					setZimTweenProps();
				}
			}
		} else {
			if (wait > 0) { // do not want wait as part of future loops (use loopWait)
				tween = target.zimTweens[id] = target.zimTween = createjs.Tween.get(target, {override:props.override}).wait(wait).call(tween3);
			} else {
				tween3();
			}
			function tween3() {
				if (target.set) target.set(set);
				tween = target.zimTweens[id] =  target.zimTween = createjs.Tween.get(target, props)
					.to(obj, t, createjs.Ease[ease])
					.call(doneAnimating)
					.wait(wait3);
				setZimTweenProps();
			}
		}

		// SET TICKER
		var zimTicker;
		if (!css && ticker) {
			if (target.zimMask) { // mask graphics needs to have same position, scale, skew, rotation and reg as object
				zimTicker = zim.Ticker.add(function(){
					zim.copyMatrix(target.zimMask, target);
					target.zimMask.regX = target.regX;
					target.zimMask.regY = target.regY;
				}, target.getStage());
			} else {
				zimTicker = zim.Ticker.add(function(){}, target.getStage());
			}
		}

		// ANIMATION DONE AND HELPER FUNCTIONS
		function doneAnimating() {
			if (props.loop) {
				if (count > 0) {
					if (currentCount < count) {
						if (call3 && typeof call3 == 'function') {(call3)(params3);}
						currentCount++;
						return;
					} else {
						if (rewind) {
							if (target.set) target.set(getStart());
						} else {
							if (target.set) target.set(obj);
						}
					}
				} else {
					if (call3 && typeof call3 == 'function') {(call3)(params3);}
					return;
				}
			}
			endTween(id);
			if (call && typeof call == 'function') {(call)(params);}
		}
		function getStart() {
			// for rewind, we need to know the start value
			// which could be modified by the set parameter
			var startObj = {}
			for (var i in obj) {
				if (css) {
					if (!zot(set[i])) {
						startObj[i] = set[i];
					} else {
						startObj[i] = target.style[i];
					}
				} else {
					if (!zot(set[i])) {
						startObj[i] = set[i];
					} else {
						startObj[i] = target[i];
					}
				}
			}
			return startObj
		}
		function doRewindCall() {
			if (call2 && typeof call2 == 'function') {(call2)(params2);}
		}
		function removeBusy(obj) {
			if (!target.zimBusy) return;
			for (var o in obj) {
				delete target.zimBusy[o];
			}
			if (zim.isEmpty(target.zimBusy)) target.zimBusy = null;
		}

		// PAUSE AND STOP MANAGEMENT
		var zimPaused = false;
		setZimTweenProps();
		function setZimTweenProps() {
			// used to keep track of tweens for various ids
			// for pauseZimAnimate() and stopZimAnimate() down below
			tween.zimObj = obj;
			tween.zimTicker = zimTicker;
			tween.zimPaused = zimPaused;
			if (idSet) {
				tween.zimIdSet = idSet;
			}
			if (providedID) {
				// add to zim.idSets for global animation pause and stop by id
				// zim.idSets = {id:[target, target], id:[target, target, target]}
				// watchout - global idSet works on provided IDS
				// local idSets work on multiple ids that are the same
				// so an object with one tween under a provided id is not locally an idSet
				if (zot(zim.idSets)) zim.idSets = {};
				if (zot(zim.idSets[providedID])) {
					zim.idSets[providedID] = [target];
				} else {
					if (zim.idSets[providedID].indexOf(target) < 0) zim.idSets[providedID].push(target); // ES6 needed
				}
			}
			if (!zim.animatedObjects) zim.animatedObjects = new zim.Dictionary(true);
			zim.animatedObjects.add(target, true);
		}
		function endTween(id) {
			if (zot(target.zimTweens) || zot(target.zimTweens[id])) return;
			removeBusy(target.zimTweens[id].zimObj);
			target.zimTweens[id].setPaused(true);
			endTicker(id);
			var idSet = target.zimTweens[id].zimIdSet;
			if (!zot(idSet) && target.zimIdSets) {
				var sets = target.zimIdSets[idSet];
				if (sets) sets.splice(sets.indexOf(id), 1);
				if (sets && sets.length == 0) {
					delete target.zimIdSets[idSet];
					if (zim.isEmpty(target.zimIdSets)) delete target.zimIdSets;
				}
			}
			delete target.zimTweens[id];
			if (zim.isEmpty(target.zimTweens)) target.stopZimAnimate();

			// handle zim.idSets
			// very tricky - the originating id for an idSet does not get an idSet
			// but rather its id is used by subsequent tweens for the tween.idSets
			// the originating id may create a zim.idSets if it was provided as a parameter
			if ((target.zimTweens && target.zimTweens[id]) ||
				(target.zimIdSets && target.zimIdSets[idSet?idSet:id])) {
					// leave zim.idSets alone
			} else {
				if (zim.idSets && zim.idSets[idSet?idSet:id]) {
					delete zim.idSets[idSet?idSet:id];
					if (zim.isEmpty(zim.idSets)) delete zim.idSets;
				}
			}
		}
		function endTicker(id) {
			// need a little delay to make sure updates the last animation
			// and to help call function have a stage update
			// store reference to ticker function in a closure
			// as we may delete the zimTweens reference before the 200 ms is up
			-function() {
				var ticker = target.zimTweens[id].zimTicker
				setTimeout(function(){
					if (ticker) zim.Ticker.remove(ticker); ticker = null;
				},200);
			}();
		}
		function pauseTicker(id, paused) {
			var tween = target.zimTweens[id];
			tween.setPaused(paused);
			if (paused == tween.zimPaused) return;
			tween.zimPaused = paused;
			if (paused) {
				if (tween.zimTicker) tween.zimAnimateTimeout = setTimeout(function(){zim.Ticker.remove(tween.zimTicker);},200);
			} else {
				clearTimeout(tween.zimAnimateTimeout);
				if (tween.zimTicker) zim.Ticker.add(tween.zimTicker, target.getStage());
			}
		}
		function expandIds(ids) {
			// turn any idSets into ids
			var actualIds = [];
			for (var i=0; i<ids.length; i++) {
				if (target.zimIdSets && !zot(target.zimIdSets[ids[i]])) {
					actualIds = actualIds.concat(target.zimIdSets[ids[i]]);
				} else {
					actualIds.push(ids[i]);
				}
			}
			return actualIds;
		}

		// METHODS ADDED TO TARGET
		if (!target.stopZimAnimate) {
	        target.stopZimAnimate = function(ids, include) {
				if (zot(include)) include = true;
				if (zot(ids)) {
					if (!include) return; // would be exclude all ids
					target.zimBusy = null; // clear any busy properties
		            createjs.Tween.removeTweens(target);
					for (var id in target.zimTweens) {endTicker(id);}
					target.zimTweens = null;
					target.zimIdSets = null;
					if (zim.idSets && zim.idSets[idSet?idSet:id]) {
						delete zim.idSets[idSet?idSet:id];
						if (zim.isEmpty(zim.idSets)) delete zim.idSets;
					}
					zim.animatedObjects.remove(target);
				} else {
					if (!Array.isArray(ids)) ids = [ids];
					// expand any idSets into ids
					var actualIds = expandIds(ids);
					for (var id in target.zimTweens) {
						if (include && actualIds.indexOf(id) >= 0) endTween(id);
						if (!include && actualIds.indexOf(id) < 0) endTween(id);
					}
				}
				return target;
	        }
	        target.pauseZimAnimate = function(paused, ids, include) {
	            if (zot(paused)) paused = true;
				if (zot(include)) include = true;
				if (zot(ids) && !include) return; // would be exclude all ids
				if (zot(ids)) { // want all ids
					for (var id in target.zimTweens) {pauseTicker(id, paused);}
				} else {
					if (!Array.isArray(ids)) ids = [ids];
					// expand any idSets into ids
					var actualIds = expandIds(ids);
					for (var id in target.zimTweens) {
						if (include && actualIds.indexOf(id) >= 0) pauseTicker(id, paused);
						if (!include && actualIds.indexOf(id) < 0) pauseTicker(id, paused);
					}
				}
				return target;
	        }
		}
		return target;
	}//-45

/*--
zim.stopZimAnimate = function(ids)

stopZimAnimate
zim function - and Display object function

DESCRIPTION
Stops tweens with the passed in id or array of ids.
If no id is passed then this will stop all tweens.
The id is set as a zim.animate, zim.move, zim.Sprite parameter
An animation series will have the same id for all the animations inside.
See also zim.pauseZimAnimate

NOTE: calling zim.stopZimAnimate(id) stops tweens with this id on all objects
calling object.stopZimAnimate(id) stops tweens with this id on the target object

EXAMPLE
// We have split the tween in two so we can control them individually
// Set an id parameter to stop or pause
// You can control multiple tweens at once by using the same id (the id is for a tween set)
// Note the override:true parameter
var rect = new zim.Rectangle(200, 200, frame.pink)
	.centerReg(stage)
	.animate({obj:{scale:2}, time:2000, loop:true, rewind:true, id:"scale"})
	.animate({obj:{rotation:360}, time:4000, loop:true, ease:"linear", override:false});
rect.cursor = "pointer";
rect.on("click", function() {rect.stopZimAnimate()}); // will stop all tweens on rect
// OR
rect.on("click", function() {rect.stopZimAnimate("scale");}); // will stop scaling tween

zim.stopZimAnimate("scale") // will stop tweens with the scale id on all objects

zim.stopZimAnimate(); // will stop all animations
END EXAMPLE

PARAMETERS
ids - (default null) pass in an id or an array of ids specified in zim.animate, zim.move and zim.Sprite

RETURNS null if run as zim.stopZimAnimate() or the obj if run as obj.stopZimAnimate()
--*///+45.1
	zim.stopZimAnimate = function(ids) {
		z_d("45.1");
		if (zot(ids)) {
			if (zim.animatedObjects) {
				for (var i=zim.animatedObjects.length-1; i>=0; i--) {
					zim.animatedObjects.objects[i].stopZimAnimate();
				}
			}
			return;
		}
		if (!Array.isArray(ids)) ids = [ids];
		if (!zim.idSets) return;
		for (var j=0; j<ids.length; j++) {
			var idSet = ids[j];
			if (zim.idSets[idSet]) {
				for (var i=zim.idSets[idSet].length-1; i>=0; i--) {
					zim.idSets[idSet][i].stopZimAnimate(idSet);
				}
			}
		}
	}//-45.1

/*--
zim.pauseZimAnimate = function(state, ids)

pauseZimAnimate
zim function - and Display object function

DESCRIPTION
Pauses or unpauses tweens with the passed in id or array of ids.
If no id is passed then this will pause or unpause all tweens.
The id is set as a zim.animate, zim.move, zim.Sprite parameter.
An animation series will have the same id for all the animations inside.
See also zim.stopZimAnimate

NOTE: calling zim.pauseZimAnimate(true, id) pauses tweens with this id on all objects
calling object.pauseZimAnimate(true, id) pauses tweens with this id on the target object

EXAMPLE
// We have split the tween in two so we can control them individually
// Set an id parameter to stop or pause
// You can control multiple tweens at once by using the same id (the id is for a tween set)
// note the override:true parameter
var rect = new zim.Rectangle(200, 200, frame.pink)
	.centerReg(stage)
	.animate({obj:{scale:2}, time:2000, loop:true, rewind:true, id:"scale"})
	.animate({obj:{rotation:360}, time:4000, loop:true, ease:"linear", override:false});
rect.cursor = "pointer";
rect.on("click", function() {rect.pauseZimAnimate()}); // will pause all tweens on rect
// OR
var paused = false;
rect.on("click", function() {
	paused = !paused;
	rect.pauseZimAnimate(paused, "scale");
}); // will toggle the pausing of the scaling tween

zim.pauseZimAnimate(false, "scale") // will unpause tweens with the scale id on all objects

zim.pauseZimAnimate(); // will pause all animations
END EXAMPLE

PARAMETERS
state - (default true) will pause tweens - set to false to unpause tweens
ids - (default null) pass in an id or an array of ids specified in zim.animate, zim.move and zim.Sprite

RETURNS null if run as zim.pauseZimAnimate() or the obj if run as obj.pauseZimAnimate()
--*///+45.2
	zim.pauseZimAnimate = function(state, ids) {
		z_d("45.2");
		if (zot(state)) state = true;
		if (zot(ids)) {
			if (zim.animatedObjects) {
				for (var i=zim.animatedObjects.length-1; i>=0; i--) {
					zim.animatedObjects.objects[i].pauseZimAnimate(state);
				}
			}
			return;
		}
		if (!Array.isArray(ids)) ids = [ids];
		if (!zim.idSets) return;
		for (var j=0; j<ids.length; j++) {
			var idSet = ids[j];
			 if (zim.idSets[idSet]) {
				for (var i=zim.idSets[idSet].length-1; i>=0; i--) {
					zim.idSets[idSet][i].pauseZimAnimate(state, idSet);
				}
			}
		}
	}//-45.2

/*--
zim.loop = function(obj, call, reverse, step, start, end)

loop
zim function - and Display object method under ZIM 4TH
NOTE: overrides earlier loop function with added container loop
so that we can use earlier loop function without createjs

DESCRIPTION
1. If you pass in a Number for obj then loop() does function call that many times
and passes function call the currentIndex, totalLoops, startIndex, endIndex, obj.
By default, the index starts at 0 and counts up to one less than the number.
So this is like: for (var i=0; i<obj; i++) {}

2. If you pass in an Array then loop() loops through the array
and passes the function call the element in the array, currentIndex, totalLoops, startIndex, endIndex, array.
So this is like: for (var i=0; i<obj; i++) {element = array[i]}

3. If you pass in an Object literal then loop() loops through the object
and passes the function call the property name, value, currentIndex, totalLoops, startIndex, endIndex, obj.
So this is like: for (var i in obj) {property = i; value = obj[i];}

4. If you pass in a container for obj then loop() loops through all the children of the container
and does the function for each one passing the child, currentIndex, totalLoops, startIndex, endIndex, obj.
So this is like for(i=0; i<obj; i++) {var child = obj.getChildAt(i);} loop
or for (var i in container.children) {var child = container.children[i];}

NOTE: If you pass in true for reverse, the loop is run backwards counting to 0 (by default)
NOTE: use return to act like a continue in a loop and go to the next loop
NOTE: return a value to return out of the loop completely like a break (and return a result if desired)


EXAMPLE
var container = new zim.Container();
zim.loop(1000, function(i) { // gets passed an index i, total 1000, start 0, end 999, obj 1000
	// make 1000 rectangles
	container.addChild(new zim.Rectangle());
});
stage.addChild(container);

// to continue or break from loop have the function return the string "continue" or "break"
zim.loop(10, function(i) {
	if (i%2==0) return; // skip even
	if (i>6) return "break"; // quit loop when > 6
	zog(i);
});

var colors = [frame.green, frame.yellow, frame.pink];
zim.loop(colors, function(color, index, total, start, end, array) { // do not have to collect all these
	zog(color); // each color
});

var person = {name:"Dan Zen", occupation:"Inventor", location:"Dundas"}
var result = zim.loop(person, function(prop, val, index, total, start, end, obj) { // do not have to collect all these
	zog(prop, val); // each key value pair
	if (val == "criminal") return "criminal"; // this would return out of the loop to the containing function
});
if (result == "criminal") alert("oh no!");

// loop through children of the container
container.loop(function(child, i) { // gets passed the child, index, total, start, end and obj
	child.x += i*2;
	child.y += i*2;
}, true); // true would reverse - so highest in stack to lowest, with i going from numChildren-1 to 0

// with pre ZIM 4TH function and without reverse
zim.loop(container, function(child, i) { // gets passed the child, index, total, start, end and obj
	child.x += i*2;
	child.y += i*2;
});
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
obj - a Number of times to loop or an Array or a Container with children to loop through
call - the function to call
	the function will receive (as its final parameters) the index, total, start, end, obj
		where the index is the current index, total is how many times the loop will run
		start is the start index, end is the end index and obj is the object passed to the loop
	the starting parameters vary depending on the type of obj:
	if the obj is a number then the first parameter is the index (no extra starting parameters given)
	if the obj is an array then the first parameter is the element at the current index
	if the obj is an object literal then the first and second parameters are the property name and property value at the current index
	if the obj is a container then the first parameter is the child of the container at the current index
reverse - (default false) set to true to run the loop backwards to 0
step - (default 1) each step will increase by this amount (positive whole number - use reverse to go backwards)
start - (default 0 or length-1 for reverse) index to start
end - (default length-1 or 0 for reverse) index to end

RETURNS any value returned from the loop - or undefined if no value is returned from a loop
--*///+45.3
	zim.loop = function(obj, call, reverse, step, start, end) {

		var sig = "obj, call, reverse, step, start, end";
		var duo; if (duo = zob(zim.loop, arguments, sig)) return duo;
		z_d("45.3");
		if (zot(obj) || zot(call)) return undefined;
		if (zot(reverse)) reverse = false;
		if (zot(step) || step <= 0) step = 1;

		var type = typeof obj=="number"?"number":(obj.constructor === Array?"array":(obj.constructor === {}.constructor?"object":"container"));

		if (type == "container" && !obj.addChild) {
			return undefined;
		}
		if (type == "number" || type == "array") {
			var length = type=="number"?obj:obj.length;
			var total = getTotal(length-1);
			if (total == 0) return;
			if (reverse) {
				for(var i=start; i>=end; i-=step) {
					if (type=="number") {
						var r = call(i, total, start, end, obj);
					} else { // array
						var r = call(obj[i], i, total, start, end, obj);
					}
					if (typeof r != 'undefined') return r;
				}
			} else {
				for(var i=start; i<=end; i+=step) {
					if (type=="number") {
						var r = call(i, total, start, end, obj);
					} else { // array
						var r = call(obj[i], i, total, start, end, obj);
					}
					if (typeof r != 'undefined') return r;
				}
			}
		} else if (type == "object") {
			var length = 0;
			var props = [];
			for (var i in obj) {
				length++;
				props.push(i);
			}
			var total = getTotal(length-1);
			if (total == 0) return;
			if (reverse) {
				for(var i=start; i>=end; i-=step) {
					var r = call(props[i], obj[props[i]], i, total, start, end, obj);
					if (typeof r != 'undefined') return r;
				}
			} else {
				for(var i=start; i<=end; i+=step) {
					var r = call(props[i], obj[props[i]], i, total, start, end, obj);
					if (typeof r != 'undefined') return r;
				}
			}
		} else {
			var total = getTotal(obj.numChildren-1);
			if (total == 0) return;
			if (reverse) {
				for(var i=start; i>=end; i-=step) {
					var r = call(obj.getChildAt(i), i, total, start, end, obj);
					if (typeof r != 'undefined') return r;
				}
			} else {
				for(var i=start; i<=end; i+=step) {
					var r = call(obj.getChildAt(i), i, total, start, end, obj);
					if (typeof r != 'undefined') return r;
				}
			}
		}
		function getTotal(max) {
			if (zot(start)) start = reverse?max:0;
			if (zot(end)) end = reverse?0:max;
			if ((reverse && end > start) || (!reverse && start > end)) return 0;
			if ((start < 0 && end) <0 || (start > max && end > max)) return 0;
			start = Math.max(0, Math.min(start, max));
			end = Math.max(0, Math.min(end, max));
			return Math.floor((reverse?(start-end):(end-start)) / step) + 1;
		}
	}//-45.3

/*--
zim.copyMatrix = function(obj, source)

copyMatrix
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Copies the transformation properties from the source to the obj
(x, y, rotation, scale and skew)
Might need to still copy the regX and regY (not included in copyMatrix)

NOTE: used internally by move(), animate() and setMask() for copying transform of shapes to mask
also used in addDisplayMembers for clone() method

EXAMPLE
circle.copyMatrix(circle2);
// circle will now match circle2 in x, y, rotation, scale and skew properties

OR with pre ZIM 4TH function
zim.copyMatrix(circle, circle2);
END EXAMPLE

PARAMETERS
obj - object to receive the new transform values
source - object from which the transform properties are being copied

RETURNS obj for chaining
--*///+45.5
	zim.copyMatrix = function(obj, source) {
		z_d("45.5");
		obj.x = source.x;
		obj.y = source.y;
		obj.scaleX = source.scaleX;
		obj.scaleY = source.scaleY;
		obj.regX = source.regX;
		obj.regY = source.regY;
		obj.rotation = source.rotation;
		obj.skewX = source.skewX;
		obj.skewY = source.skewY;
		return obj;
	}//-45.5

/*--
zim.pos = function(obj, x, y)

pos
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Chainable convenience function to position x and y
See also the CreateJS set({prop:val, prop2:val}) method;

EXAMPLE
circle.pos(100, 100);

OR with pre ZIM 4TH function
zim.pos(circle, 100, 100);
END EXAMPLE

PARAMETERS
obj - object to position
x - (default null) the x position
y - (default null) the y position

RETURNS obj for chaining
--*///+41.5
	zim.pos = function(obj, x, y) {
		z_d("41.5");
		if (zot(obj)) return;
		if (!zot(x)) obj.x = x;
		if (!zot(y)) obj.y = y;
		return obj;
	}//-41.5

/*--
zim.mov = function(obj, x, y)

mov
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Move the object over in the x and/or y
Equivilant to obj.x += x and obj.y += y
Pass in 0 for no shift in x if you just want to shift y
Gives chainable relative position

NOTE: might want to pronounce this "mawv" to differentiate from ZIM move()

EXAMPLE
var circle = new zim.Circle().center(stage).mov(50); // move to right 50

OR with pre ZIM 4TH function
zim.mov(circle, 50);
END EXAMPLE

PARAMETERS
obj - object to shift
x - (default 0) the distance in x to move (can be negative)
y - (default 0) the distance in y to move (can be negative)

RETURNS obj for chaining
--*///+41.6
	zim.mov = function(obj, x, y) {
		z_d("41.6");
		if (zot(obj)) return;
		if (!zot(x)) obj.x += x;
		if (!zot(y)) obj.y += y;
		return obj;
	}//-41.6

/*--
zim.alp = function(obj, alpha)

alp
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Chainable convenience function to set the alpha
See also the CreateJS set({prop:val, prop2:val}) method;

EXAMPLE
circle.alp(.5);

OR with pre ZIM 4TH function
zim.alp(circle, .5);
END EXAMPLE

PARAMETERS
obj - object to scale
alpha - default(null) the alpha between 0 and 1

RETURNS obj for chaining
--*///+41.7
	zim.alp = function(obj, alpha) {
		z_d("41.7");
		if (zot(obj)) return;
		if (!zot(alpha)) obj.alpha = alpha;
		return obj;
	}//-41.7

/*--
zim.rot = function(obj, rotation)

rot
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Chainable convenience function to set the rotation
See also the CreateJS set({prop:val, prop2:val}) method;

EXAMPLE
rect.rot(180);

OR with pre ZIM 4TH function
zim.rot(rect, 180);
END EXAMPLE

PARAMETERS
obj - object to scale
rotation - (default null) the rotation in degrees

RETURNS obj for chaining
--*///+41.8
	zim.rot = function(obj, rotation) {
		z_d("41.8");
		if (zot(obj)) return;
		if (!zot(rotation)) obj.rotation=rotation;
		return obj;
	}//-41.8

/*--
zim.siz = function(obj, width, height, only)

siz
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Chainable convenience function to set width and height in one call.
If you pass in just the width or height parameter, it keeps the aspect ratio.
If you want to set only the width or height, then set only to true.
If you pass in both the width and height then it sets both.
Note: that width and height will adjust the scaleX and scaleY of the object.
Also see zim.width, zim.height, zim.widthOnly, zim.heightOnly.

EXAMPLE
var rect = new zim.Rectangle(100,200,frame.blue).addTo(stage);
rect.siz(200); // sets width to 200 and height to 400
rect.siz(200, null, true); // sets width to 200 and leaves height at 200
rect.siz(200, 100); // sets width to 200 and height to 100

OR with pre ZIM 4TH function
zim.siz(rect, 200);
// etc.
END EXAMPLE

PARAMETERS
obj - object to scale
width - (default null) the width of the object
	setting only the width will set the widht and keep the aspect ratio
	unless the only parameter is set to true
height - (default null) the height of the object
	setting only the width will set the widht and keep the aspect ratio
	unless the only parameter is set to true
only - (default false) - defaults to keeping aspect ratio when one dimension set
 	set to true to scale only a single dimension (like widthOnly and heightOnly properties)

RETURNS obj for chaining
--*///+41.85
	zim.siz = function(obj, width, height, only) {
		z_d("41.85");
		if (zot(obj)) return;
		if (zot(only)) only = false;
		if (!zot(width) && !zot(height)) {
			obj.widthOnly = width; obj.heightOnly = height;
		} else if (!zot(width)) {
			if (only) {obj.widthOnly = width;} else {obj.width = width;}
		} else if (!zot(height)) {
			if (only) {obj.heightOnly = height;} else {obj.height = height;}
		}
		return obj;
	}//-41.85

/*--
zim.ske = function(obj, skewX, skewY)

ske
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Chainable convenience function to skewX and skewY (slant)
See also the CreateJS set({prop:val, prop2:val}) method;

EXAMPLE
circle.ske(20);

OR with pre ZIM 4TH function
zim.ske(circle, 20);
END EXAMPLE

PARAMETERS
obj - object to position
skewX - (default null) the x skew
skewY - (default null) the y skew

RETURNS obj for chaining
--*///+41.9
	zim.ske = function(obj, skewX, skewY) {
		z_d("41.9");
		if (zot(obj)) return;
		if (!zot(skewX)) obj.skewX = skewX;
		if (!zot(skewY)) obj.skewY = skewY;
		return obj;
	}//-41.9

/*--
zim.reg = function(obj, regX, regY)

reg
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Chainable convenience function to regX and regY (registration point)
The registration point is the point the object is positioned with
and the object scales and rotates around the registration point
See also the CreateJS set({prop:val, prop2:val}) method;
See also zim.centerReg()

EXAMPLE
circle.reg(200, 200);

OR with pre ZIM 4TH function
zim.reg(circle, 200, 200);
END EXAMPLE

PARAMETERS
obj - object on which to set registration point
regX - (default null) the x registration
regY - (default null) the y registration

RETURNS obj for chaining
--*///+41.95
	zim.reg = function(obj, regX, regY) {
		z_d("41.95");
		if (zot(obj)) return;
		if (!zot(regX)) obj.regX = regX;
		if (!zot(regY)) obj.regY = regY;
		return obj;
	}//-41.95

/*--
zim.sca = function(obj, scale, scaleY)

sca
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Chainable convenience function to do scaleX and scaleY in one call.
Same as zim.scale() but with consistent three letter shortcut (helps with stacked alignment)
If you pass in just the scale parameter, it scales both x and y to this value.
If you pass in scale and scaleY then it scales x and y independently.
Also see zim.scaleTo(), zim.fit() and zim.Layout().

EXAMPLE
circle.sca(.5); // x and y scale to .5
circle.sca(.5, 2); // x scale to .5 and y scale to 2

OR with pre ZIM 4TH function
zim.sca(circle, .5);
zim.sca(circle, .5, 2);
END EXAMPLE

PARAMETERS
obj - object to scale
scale - the scale (1 being full scale, 2 being twice as big, etc.)
scaleY - (default null) pass this in to scale x and y independently

RETURNS obj for chaining
--*///+41.97
	zim.sca = function(obj, scale, scaleY) {
		z_d("41.97");
		if (zot(obj) || zot(obj.scaleX)) return;
		if (zot(scale)) scale = obj.scaleX;
		if (zot(scaleY)) scaleY = scale;
		obj.scaleX = scale; obj.scaleY = scaleY;
		return obj;
	}//-41.97

/*--
zim.scale = function(obj, scale, scaleY)

scale
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Chainable convenience function to do scaleX and scaleY in one call.
Same as zim.sca() but came first and full name was not taken.
If you pass in just the scale parameter, it scales both x and y to this value.
If you pass in scale and scaleY then it scales x and y independently.
Also see zim.scaleTo(), zim.fit() and zim.Layout().

EXAMPLE
circle.scale(.5); // x and y scale to .5
circle.scale(.5, 2); // x scale to .5 and y scale to 2

OR with pre ZIM 4TH function
zim.scale(circle, .5);
zim.scale(circle, .5, 2);
END EXAMPLE

PARAMETERS
obj - object to scale
scale - the scale (1 being full scale, 2 being twice as big, etc.)
scaleY - (default null) pass this in to scale x and y independently

RETURNS obj for chaining
--*///+42
	zim.scale = function(obj, scale, scaleY) {
		z_d("42");
		if (zot(obj) || zot(obj.scaleX)) return;
		if (zot(scale)) scale = obj.scaleX;
		if (zot(scaleY)) scaleY = scale;
		obj.scaleX = scale; obj.scaleY = scaleY;
		return obj;
	}//-42

/*--
zim.scaleTo = function(obj, boundObj, percentX, percentY, type)

scaleTo
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Scales object to a percentage of another object's bounds.
Percentage is from 0 - 100 (not 0-1).
Also see zim.scale(), zim.fit() and zim.Layout().

EXAMPLE
circle.scaleTo(stage, 50); // scale to half the stageW
circle.scaleTo(stage, 10, 20); // fit within these scalings of the stage

OR with pre ZIM 4TH function
zim.scaleTo(circle, stage, 100, 100, "both"); // make an oval touch all stage edges
END EXAMPLE

PARAMETERS - supports DUO - parameters or single object with properties below
obj - object to scale
boundObj - the object that we are scaling to with percents below
percentX - (default no scaling) the scale in the x
percentY - (default no scaling) the scale in the y
	if both percentX and percentY are missing then assumes 100, 100 for each
type - (default "smallest") to fit inside or outside or stretch to bounds
	smallest: uses the smallest scaling keeping proportion (fit)
	biggest: uses the largest scaling keeping proportion (outside)
	both: keeps both x and y scales - may stretch object (stretch)

RETURNS obj for chaining
--*///+43
	zim.scaleTo = function(obj, boundObj, percentX, percentY, type) {

		var sig = "obj, boundObj, percentX, percentY, type";
		var duo; if (duo = zob(zim.scaleTo, arguments, sig)) return duo;
		z_d("43");
		if (zot(obj) || !obj.getBounds || !obj.getBounds()) {zog ("zim create - scaleTo(): please provide an object (with setBounds) to scale"); return;}
		if (zot(boundObj) || !boundObj.getBounds || !boundObj.getBounds()) {zog ("zim create - scaleTo(): please provide a boundObject (with setBounds) to scale to"); return;}
		if (zot(percentX)) percentX = -1;
		if (zot(percentY)) percentY = -1;
		if (percentX == -1 && percentY == -1) percentX = percentY = 100;
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
	}//-43

/*--
zim.fit = function(obj, left, top, width, height, inside)

fit
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Scale an object to fit inside (or outside) a rectangle and center it.
Actually scales and positions the object.
Object must have bounds set (setBounds()).

EXAMPLE
circle.fit(100, 100, 200, 300); // fits and centers in these dimensions

OR with pre ZIM 4TH function
zim.fit(circle); // fits circle and centers on stage
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
obj - the object to fit to the rectangle
left, top, width, height - (default stage dimensions) the rectangle to fit
inside - (default true) fits the object inside the rectangle
	if inside is false then it fits the object around the bounds
	in both cases the object is centered

RETURNS an Object literal with the new and old details (bX is rectangle x, etc.):
{x:obj.x, y:obj.y, width:newW, height:newH, scale:scale, bX:left, bY:top, bWidth:width, bHeight:height}
--*///+46
	zim.fit = function(obj, left, top, width, height, inside) {

		var sig = "obj, left, top, width, height, inside";
		var duo; if (duo = zob(zim.fit, arguments, sig)) return duo;
		z_d("46");
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
		obj.x = (obj.regX-obj.getBounds().x)*scale + left + (w-newW)/2;

		// vertical center
		obj.y = (obj.regY-obj.getBounds().y)*scale + top + (h-newH)/2;

		return {x:obj.x, y:obj.y, width:newW, height:newH, scale:scale, bX:left, bY:top, bWidth:width, bHeight:height};

	}//-46

/*--
zim.outline = function(obj, color, size)

outline
zim function - and Display object method under ZIM 4TH

DESCRIPTION
For testing purposes.
Draws a rectangle around the bounds of obj (adds rectangle to the objects parent).
Draws a cross at the origin of the object (0,0) where content will be placed.
Draws a circle at the registration point of the object (where it will be placed in its container).
These three things could be in completely different places ;-)

NOTE: will not subsequently be resized - really just to use while building and then comment it out or delete it

EXAMPLE
var circle = new zim.Circle(50, "red");
circle.center(stage);
// show registration and origin at center and bounding box around outside
circle.outline();

OR with pre ZIM 4TH function
zim.center(circle, stage);
zim.outline(circle);
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
obj - the object to outline (can be transformed - scaled or rotated)
color - (default brown) the color of the outline
size - (default 2) the stroke size of the outline

RETURNS the shape if you want to remove it: obj.parent.removeChild(returnedShape);
--*///+47
	zim.outline = function(obj, color, size) {

		var sig = "obj, color, size";
		var duo; if (duo = zob(zim.outline, arguments, sig)) return duo;
		z_d("47");
		if (zot(obj) || !obj.getBounds) {zog("zim create - outline(): please provide object with bounds set"); return;}
		if (!obj.getBounds()) {zog("zim create - outline(): please setBounds() on object");	return;}
		if (!obj.parent) {zog("zim create - outline(): object should be on stage first"); return;}
		if (zot(color)) color = "brown";
		if (zot(size)) size = 2;
		var oB = obj.getBounds();
		var shape = new createjs.Shape();
		var shapeC = new createjs.Shape();
		var p = obj.parent;

		var pTL = obj.localToLocal(oB.x, oB.y, p);
		var pTR = obj.localToLocal(oB.x+oB.width, oB.y, p);
		var pBR = obj.localToLocal(oB.x+oB.width, oB.y+oB.height, p);
		var pBL = obj.localToLocal(oB.x, oB.y+oB.height, p);
		var pC = obj.localToLocal(0, 0, p);

		var g = shape.graphics;
		var gC = shapeC.graphics;
		g.s(color).ss(size)
			.mt(pTL.x, pTL.y)
			.lt(pTR.x, pTR.y)
			.lt(pBR.x, pBR.y)
			.lt(pBL.x, pBL.y)
			.lt(pTL.x, pTL.y);

		// subtract a scaled top left bounds from the top left point
		// zero = {x:pTL.x-oB.x*obj.scaleX, y:pTL.y-oB.y*obj.scaleY};

		// cross at 0 0
		var s = 10;
		var ss = s+1;
		gC.s("white").ss(size+2);
		gC.mt(-ss, 0).lt(ss, 0);
		gC.mt(0, -ss).lt(0, ss);
		gC.s(color).ss(size);
		gC.mt(-s, 0).lt(s, 0);
		gC.mt(0, -s).lt(0, s);
		shapeC.x = pC.x;
		shapeC.y = pC.y;
		shapeC.rotation = obj.rotation;

		// circle at registration point
		g.s("white").ss(size+2).dc(obj.x,obj.y,s+6);
		g.s(color).ss(size).dc(obj.x,obj.y,s+6);

		obj.parent.addChild(shape);
		obj.parent.addChild(shapeC);
		if (obj.getStage()) obj.getStage().update();
		return obj;
	}//-47

/*--
zim.addTo = function(obj, container, index)

addTo
zim function - and Display object method under ZIM 4TH

DESCRIPTION
A wrapper function for addChild() / addChildAt() to add the obj to the container.
This allows us to chain more effectively:
var circle = new zim.Circle().addTo(stage).drag();
Also, ZIM has obj.center(container) and obj.centerReg(container) functions
where the obj comes first followed by the container.
So it is a pain to flip things and use container.addChild(obj)
Now, we can use obj.addTo(container) and the object we are adding comes first.
The last parameter is the index so similar to an addChildAt()
We can also use obj.removeFrom(container)

EXAMPLE
var circle = new zim.Circle(50, "red");
circle.addTo(stage);
// with chaining - and dragging:
var circle = new zim.Circle(50, "red").addTo(stage).drag();

var rect = new zim.Rectangle(100, 100, "blue");
rect.addTo(stage, 0); // place on bottom

OR with pre ZIM 4TH function
zim.addTo(circle, stage); // etc.
END EXAMPLE

PARAMETERS
obj - the object to add
container - the container to add to
index - (default null) if provided will addChildAt the object at the index (0 being bottom)

RETURNS obj for chaining
--*///+47.5
	zim.addTo = function(obj, container, index) {

		z_d("47.5");
		if (zot(obj)) {zog("zim create - addTo(): please provide object"); return;}
		if (zot(container)) {zog("zim create - addTo(): please provide container"); return;}
		if (zot(index) || isNaN(index)) {
			container.addChild(obj);
		} else {
			container.addChildAt(obj, index);
		}
		return obj;
	}//-47.5

/*--
zim.removeFrom = function(obj, container)

removeFrom
zim function - and Display object method under ZIM 4TH

DESCRIPTION
A wrapper function for removeChild() that removes the obj from the container
Matches obj.addTo(container)
We have obj.removeFrom(container)

EXAMPLE
var circle = new zim.Circle(50, "red");
circle.addTo(stage);
// later
circle.removeFrom(stage);

OR with pre ZIM 4TH function
zim.removeFrom(circle, stage); // etc.
END EXAMPLE

PARAMETERS
obj - the object to remove
container - the container to remove the object from

RETURNS obj for chaining
--*///+47.6
	zim.removeFrom = function(obj, container) {

		z_d("47.6");
		if (zot(obj)) {zog("zim create - removeFrom(): please provide object"); return;}
		if (zot(container)) {zog("zim create - removeFrom(): please provide container"); return;}
		container.removeChild(obj);
		return obj;
	}//-47.6

/*--
zim.centerReg = function(obj, container, add, index)

centerReg
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Centers the registration point on the bounds - obj must have bounds set.
If a container is provided it adds the object to the container.
A convenience function for setting both registration points at once.
Also see zim.center() for centering without changing the registration point.

EXAMPLE
var rect = new zim.Rectangle(100, 100, "blue");
rect.centerReg(stage); // centers registration, centers and adds to stage
rect.animate({obj:{rotation:360}, time:1000, ease:"linear", loop:true});

OR with pre ZIM 4TH function
zim.centerReg(rect, stage);
zim.animate({target:rect, obj:{rotation:360}, time:1000, ease:"linear", loop:true});
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
obj - the object to set the regX and regY to the center
container - (default null) centers the object on and adds to the container
add - (default true) set to false to only center the object on the container
index - (default null) if provided will addChildAt the object at the index (0 being bottom)

RETURNS obj for chaining
--*///+48
	zim.centerReg = function(obj, container, add, index) {

		var sig = "obj, container, add, index";
		var duo; if (duo = zob(zim.centerReg, arguments, sig)) return duo;
		z_d("48");
		if (zot(obj) || !obj.getBounds || !obj.getBounds()) {zog("zim create - centerReg(): please provide object with bounds set"); return;}
		var oB = obj.getBounds();
		obj.regX = oB.x + oB.width/2;
		obj.regY = oB.y + oB.height/2;
		return (container) ? zim.center(obj, container, add, index) : obj;
	}//-48

/*--
zim.center = function(obj, container, add, index)

center
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Centers the object on the container.
Will default to adding the object to the container.
Also see zim.centerReg() for centering registration point at same time.

EXAMPLE
var rect = new zim.Rectangle(100, 100, "blue");
rect.center(stage); // centers and adds to stage
// the below animation will be around the registration point at the top left corner
// this is usually not desired - see zim.centerReg() when rotating and scaling
rect.animate({obj:{rotation:360}, time:1000, ease:"linear", loop:true});

OR with pre ZIM 4TH function
zim.center(rect, stage);
zim.animate({target:rect, obj:{rotation:360}, time:1000, ease:"linear", loop:true});
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
obj - the object to center
container - centers the object on and adds to the container
add - (default true) set to false to only center and not add the object to the container
index - (default null) if provided will addChildAt the object at the index (0 being bottom)

RETURNS obj for chaining
--*///+48.1
	zim.center = function(obj, container, add, index) {

		var sig = "obj, container, add, index";
		var duo; if (duo = zob(zim.center, arguments, sig)) return duo;
		z_d("48.1");
		if (zot(obj) || !obj.getBounds) {zog("zim.center(): please provide object with bounds"); return;}
		if (zot(container) || !container.getBounds)  {zog("zim.center(): please provide container with bounds"); return;}

		var oB = obj.getBounds();
		var cB = container.getBounds();

		if (zot(add)) add = true;
		if (add && container.addChild) {
            if (zot(index) || Number.isNaN(index)) {
                container.addChild(obj);
            } else {
                container.addChildAt(obj, index);
            }
        }

		if (zot(cB)) return obj; // just add to container if no bounds on Container
		if (zot(oB)) { // just add to middle of container
			obj.x = container.getBounds().width/2;
			obj.y = container.getBounds().height/2;
			return obj;
		}

		// get registration point of object in coordinates of the container
		var reg = obj.localToLocal(obj.regX, obj.regY, container);

		// get bounds of the object in global space even if object is rotated and scaled
		// this makes a rectangle surrounding a rotated object - so bigger but parallel edges to the x and y
		var glob = zim.boundsToGlobal(obj);

		// now project this rectangle into the container coordinates
		// passing in a rectangle (glob) will make this act on the rectangle rather than the bounds
		// flip (true) means we go from global to local in the container
		var loc = zim.boundsToGlobal(container, glob, true);

		// the positions are all in the container coordinate so do the calculation
		obj.x = cB.x + cB.width/2 - loc.width/2  + (reg.x-loc.x);
		obj.y = cB.y + cB.height/2 - loc.height/2  + (reg.y-loc.y);

		if (!add && container.getStage && container.getStage() && obj.parent) {
			var p = container.localToLocal(obj.x, obj.y, obj.parent);
			obj.x = p.x;
			obj.y = p.y;
		}
		return obj;
	}//-48.1

/*--
zim.place = function(obj, id)

place
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Sets the object to drag and logs to the console the x and y.
This is for when building you can move an object around to position it
then when positioned, look at the console for the positioning code.
In your code, set the reported x and y and delete the place call.

EXAMPLE
circle.place("circle"); // lets you drag circle around - then see console

OR with pre ZIM 4TH function
zim.place(circle, "circle");
END EXAMPLE

PARAMETERS
obj - object to place
id - (default null) the name of the object so that the log gives you complete code

RETURNS undefined
--*///+49
	zim.place = function(obj, id) {
		z_d("49");
		if (zot(obj)) return;
		if (zot(id)) id = "obj";
		function report() {zog(id+".x = " + Math.round(obj.x) +  "; "+id+".y = " + Math.round(obj.y) + ";");}
		zim.drag({obj:obj, currentTarget:true, dragCursor:"crosshair"});
		zog("place "+id+" - to get new position");
		obj.on("click", report);
	}//-49

/*--
zim.expand = function(obj, padding, paddingVertical)

expand
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Adds a createjs hitArea to an object with an extra padding of padding.
Good for making mobile interaction better on labels, buttons, etc.

EXAMPLE
var circle = new zim.Circle(10, "red");
circle.center(stage);
circle.expand(); // makes hit area bigger
circle.on("click", function(){zog("yes");});

OR with pre ZIM 4TH function
zim.center(circle, stage);
zim.expand(circle);
END EXAMPLE

PARAMETERS
obj - object on which you wish to expand the hit area
padding - (default 20) how many pixels to expand bounds
paddingVertical - (default null) the vertical padding (making padding for horizontal)

RETURNS obj for chaining
--*///+50
	zim.expand = function(obj, padding, paddingVertical) {
		z_d("50");
		if (zot(obj) || !obj.getBounds) {zog("zim create - expand(): please provide object with bounds set"); return;}
		if (zot(padding)) padding = 20;
		if (zot(paddingVertical)) paddingVertical = padding;
		var oB = obj.getBounds();
		var rect = new createjs.Shape();
		rect.graphics.f("0").r(oB.x-padding,oB.y-paddingVertical,oB.width+2*padding,oB.height+2*paddingVertical);
		obj.hitArea = rect;
		return obj;
	}//-50

/*--
zim.setMask = function(obj, mask)

setMask
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Specifies a mask for an object - the object can be any display object.
The mask can be a ZIM (or CreateJS) Shape or a ZIM Rectangle, Circle or Triangle.
Returns the mask which can then be animated using ZIM move() or animate().
This was added because it is nice to use positioned ZIM shapes (which are containers) as masks
and yet, ony Shape objects can be used as masks
and you often have to transform them properly which can be confusing.

NOTE: the mask you pass in can still be seen but you can set its alpha to 0
just watch, if you want to interact with the mask it cannot have 0 alpha
unless you provide a hit area with zim.expand() for instance (use 0 for padding)

NOTE: this was just mask() but that conflicted with createjs.mask property
so it would work to set the mask but then you could not use it again - so changed name

EXAMPLE
var label = new zim.Label("BIG", 200, null, "white");
label.center(stage);
var rect = new zim.Rectangle(200,100,"black");
rect.center(stage).alpha = 0;
var label = new zim.Label("BIG", 200, null, "white");
label.center(stage).drag().setMask(rect);
// not sure we really recommend such dramatic chaining...

OR with pre ZIM 4TH function
zim.center(label, stage);
var rect = new zim.Rectangle(200,100,"black");
zim.center(rect, stage).alpha = 0;
zim.setMask(label, rect);
zim.drag(label);
END EXAMPLE

NOTE: to drag something, the alpha cannot be 0
so we can use zim.expand(rect, 0) to assign a hit area
then we can drag even if the alpha is 0 (or set the alpha to .01)

EXAMPLE
var label = new zim.Label("BIG", 200, null, "white");
label.center(stage);
var rect = new zim.Rectangle(200,100,"black");
rect.expand(0);
rect.center(stage).alpha = 0;
label.setMask(rect);
rect.drag();

OR with pre ZIM 4TH function
zim.expand(rect, 0); // adds a hit area to rect so we can drag alpha 0
zim.center(rect, stage).alpha = 0;
zim.setMask(label, rect);
zim.drag(rect);
END EXAMPLE

NOTE: move(), animate() and drag() work specially with zim shapes to make this work
otherwise, if you want to reposition your mask
then save the return value of the setMask call in a variable
and position, scale or rotate the mask object using that variable
or use a zim.Shape or createjs.Shape directly to avoid this issue

EXAMPLE
var mask = zim.setMask(label, rect);
mask.x += 100;
// note: rect.x += 100 will not work
// because the mask is inside the rect and does not change its x
// rect.move(rect.x+100, rect.y, 700); will work
END EXAMPLE

PARAMETERS
obj - the object to mask
mask - the object whose shape will be the mask

NOTE: use setMask(obj, null) or obj.setMask(null) to clear the mask

RETURNS the mask shape (different than the mask if using ZIM shapes)
--*///+50.1
	zim.setMask = function(obj, mask) {
		z_d("50.1");
		if (zot(obj)) {zog("zim create - setMask(): please provide obj"); return;}
		var m;
		if (mask && mask.shape) { // zim.Rectangle, Circle or Triangle
			mask.zimMask = m = mask.shape.clone();
			zim.copyMatrix(m, mask);
			m.regX = mask.regX;
			m.regY = mask.regY;
			zim.addDisplayMembers(m);
			mask.addChildAt(m,0);
			m.alpha = 0;
		} else {
			m = mask;
		}
		obj.mask = m; // set the createjs mask
		return m;
	}//-50.1


////////////////  ZIM BUILD  //////////////

// Zim Build adds common building classes for multies (interactive media)
// classes in this module require createjs namespace to exist and in particular easel.js
// available at http://createjs.com


/*--
zim.OPTIMIZE

OPTIMIZE
zim constant

DESCRIPTION
A setting that relates to how stage.update() is used by the components.
Default is false which means some components will update the stage automatically:
	the Slider will update the stage so that you can see the knob slide;
	the CheckBox and RadioButtons when checked will update the stage;
	the Tabs change button colors and then update the stage;
	closing of a Pane will update the stage
	the Stepper also updates as does changing color of a button, label, etc.
However, concurrent stage.update() calls can slow down mobile performance.
So if you are making content for mobile you should set zim.OPTIMIZE = true;
Then you will have to stage.update() in the change event handlers
but you were probably doing things in these events and updating anyway!
Just be careful - you might be testing a checkbox and it won't check...
So it takes some getting used to running in optimized mode.

EXAMPLE
// add this to the top of your script
zim.OPTIMIZE = true;
var slider = new zim.Slider();
slider.center(stage);
// will not see the slider operate (aside from rolling over button)
// unless you call stage.update() in the change event
slider.on("change", function() {
	// do your code
	stage.update(); // now will see the slider operate
});
END EXAMPLE

components affected by OPTIMIZE:
Label, Button, Checkbox, RadioButton, Pane, Stepper, Slider, Tabs

OPTIMIZE set to true also affects the ZIM Ticker
for functions like move, animate, drag, Scroller, Parallax
See zim.Ticker as you may have to set zim.Ticker.update = true;
--*///+50.2
zim.OPTIMIZE = false;
//-50.2

/*--
zim.ACTIONEVENT

ACTIONEVENT
zim constant

DESCRIPTION
a setting that specifies the event type to trigger many of the components
default is "mousedown" which is more responsive on mobile
setting the constant to anything else, will cause the components to use "click"

for instance, with the default settings, the following components will act on mousedown
CheckBox, RadioButtons, Pane, Stepper and Tabs

EXAMPLE
// put this at the top of your code
zim.ACTIONEVENT = "click";
var checkBox = new zim.CheckBox();
checkBox.center(stage);
// note it now operates on mouseup (click)
// the default ACTIONEVENT is mousedown
END EXAMPLE
--*///+50.3
zim.ACTIONEVENT = "mousedown";
//-50.3

/*--
zim.extend = function(subclass, superclass, override, prefix, prototype)

extend
zim function - modified CreateJS extend and promote utility methods

DESCRIPTION
Place after a sub class to extend a super class.
Extending a super class means that the sub class receives all the properties and methods of the super class.
ZIM Container() extends a CreateJS Container for instance and then adds more methods and properties
but all the CreateJS Container methods and properties are still there too like x, y, addChild(), etc.

NOTE: CreateJS display objects require their constructor to be called otherwise it is like quantum entanglement (seriously)
zim.extend() adds access to the super class constructor so it can be called in the subclass as follows:
this.super_constructor();
It also provides access to super class methods that are overridden

EXAMPLE
// make a Collection class that will extend a zim.Container
// the Collection class will call the zim.Container constructor
// and override the the ZIM Container center method in the class body
// and override the CreateJS Container addChild method in the prototype
// either method would work in either place - it is often a matter of preference
// but you might need to use a method in the class body to access local variables
// The ZIM extend() method parameter values need to change depending on where you override
// see the comments inline for the instructions

var Collection = function() {
	// for CreateJS the super constructor must be run
	this.super_constructor();

	// override the zim center() method
	// methods in the function call that override must be passed in as an array of strings
	// to the override parameter of zim.extend() to be able to access the super_method
	this.center = function(where) {
		this.super_center(where);
		this.y -= 50;
	}
}
// override the super class addChild() that comes from the CreateJS Container
// methods on the prototype that override are automatically provided a super_method
// unless the prototype parameter of zim.extend() is set to false (default is true)
Collection.prototype.addChild = function(c) {
	this.super_addChild(c); // call the super class addChild
	zog("added a child to Collection");
}

// make the Collection extend a zim.Container()
// it will receive all the properties and methods of the zim.Container plus its own
zim.extend(Collection, zim.Container, "center"); // or pass an array of overridden methods

// use the Collection
var c = new Collection();
c.addChild(new zim.Rectangle(100, 100, frame.green)); // zogs "added a child to Collection"
c.center(stage); // centers the collection but then offsets it 50 pixels up
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
subclass - the class to extend
superclass - the class to extend from (an existing class)
override - (default null) an Array of methods (as Strings) to override.
	if there is only one method being overridden then a single string is fine ("test" or ["test"] is fine)
	this list is only needed for methods in the class body
	any methods listed here will be given prefix_methodName() access on the sub class (this.prefix_methodName())
	where the prefix is below (note, the prototype setting has no bearing on these manual overrides)
	methods assigned to the prototype of a class and overridden are automatically found
prefix - (default "super") a prefix that will be followed by "_" and then the overridden method name
	by default this.super_constructor() would call the super class constructor
	if prefix is set to "Person" then this.Person_constructor() would call the super class constructor
	the same system is used to call overridden files in override or prototype
prototype - (default true) will search the subclass prototype for overriding methods
	the overridden methods are then available as this.prefix_methodName()
	set to false to avoid searching the super class for methods overridden by the sub class prototype
	just quickens the code minutely if there is no need

NOTE: the superclass constructor is always available as this.prefix_constructor() no matter the override or prototype settings
NOTE: this.prefix_constructor(); should be called at the top of the subclass to avoid problems when multiple copies of object
NOTE: to extend a class that already extends a ZIM class then change the prefix to a unique name:

EXAMPLE
// if we already had the Collection example above and we want to extend that
// then we must use a new prefix when using zim.extend()

var Records = function() {
	this.Collection_constructor();
}
zim.extend(Records, Collection, null, "Collection");

// you will still have this.super_center(), this.super_addChild() if needed
// plus any newly overridden methods available as this.Collection_methodName() etc.
var r = new Records();
r.addChild(new zim.Circle(20, zim.pink));
r.super_center(stage); // call the original center (without vertical shift)

// to extend again, use yet another prefix - for example: "Records"
var Jazz = function() {
	this.Records_constructor();
}
zim.extend(Jazz, Records, null, "Records");
END EXAMPLE

NOTE: extend() is included in Distill if Build, Pages or Frame Module classes are used (otherwise NOT included)

RETURNS the subclass
--*///+50.35
	zim.extend = function(subclass, superclass, override, prefix, prototype) {

		var sig = "subclass, superclass, override, prefix, prototype";
		var duo; if (duo = zob(zim.extend, arguments, sig)) return duo;

		if (zot(subclass) || zot(superclass)) if (zon) {zog("zim.extend() - please supply a class and its superclass"); return;}
		if (zot(prefix)) prefix = "super";
		if (zot(override)) override = [];
		if (!Array.isArray(override)) override = [override];
		if (zot(prototype)) prototype = true;
		// modified CreateJS extend() to include any prototype members already added
		// see http://www.createjs.com/docs/easeljs/classes/Utility%20Methods.html
		var existingP = {};
		for (var f in subclass.prototype) Object.defineProperty(existingP,f,Object.getOwnPropertyDescriptor(subclass.prototype, f));
		function o() {this.constructor = subclass;}
		o.prototype = superclass.prototype;
		subclass.prototype = new o();
		for (f in existingP) Object.defineProperty(subclass.prototype,f,Object.getOwnPropertyDescriptor(existingP,f));

		// modified CreateJS promote() to promote methods other than constructor only if methods is true
		// zim does not override with prototypes so it is uneccessary to loop through the super class methods
		// added checking an array of string values of methods defined in class (not prototype) that are being overridden
		var subP = subclass.prototype, supP = (Object.getPrototypeOf&&Object.getPrototypeOf(subP))||subP.__proto__;
		if (supP) {
			subP[(prefix+="_") + "constructor"] = supP.constructor; // constructor is not always innumerable
			var n;
			for (var i=0; i<override.length; i++) {
				n = override[i];
				if (typeof supP[n] == "function") {subP[prefix + n] = supP[n];}
			}
			if (prototype) {
				for (n in supP) {
					if (subP.hasOwnProperty(n) && (typeof supP[n] == "function")) {subP[prefix + n] = supP[n];}
				}
			}
		}
		return subclass;
	}
	//-50.35

/*--
zim.addDisplayMembers = function(obj)

addDisplayMembers
zim function

DESCRIPTION
Function to add display methods like drag, hitTests, move, animate, center, etc. to an object.
Also adds width, height, widthOnly and heightOnly properties.
The term "members" is used because we are adding both methods and properties.
All the ZIM 4TH display objects come with these members
BUT... the native CreateJS display objects do not.
When we import assets from Adobe Animate, these are native CreateJS objects.
So we can use addDisplayMembers to add these members to a CreateJS Shape, Container, etc.

ZIM uses addDisplayMembers internally to add the members
to the ZIM shapes and components (Rectangle, Circle, Triangle, Label, Button, etc.)
as applied through the ZIM Container inheritance
as well as to the ZIM wrappers for CreateJS Container, Shape, Sprite, MovieClip objects.
The display methods call the original ZIM functions
passing the extra object parameter as the first parameter
or if DUO is being used then adds the object to the configuration object.

EXAMPLE
var shape = new createjs.Shape();
shape.graphics.beginFill("red").drawRect(0,0,200,200);
shape.setBounds(0,0,200,200); // need to set bounds to center
zimify(shape); // add methods like center, drag, etc.
// shorter version of zim.addDisplayMembers(shape);
shape.center(stage); // ZIM 4TH method format
stage.update();

// note: even without using zim.addDisplayMembers()
// we can use the traditional zim.center() function
var shape = new createjs.Shape();
shape.graphics.beginFill("red").drawRect(0,0,200,200);
shape.setBounds(0,0,200,200); // need to set bounds to center
zim.center(shape, stage); // use the zim function rather than the method
stage.update();

// of course we can just use a zim.Shape
// then the methods like center, drag, etc. are already added
var shape = new zim.Shape(200, 200); // passing params sets bounds
shape.graphics.beginFill("red").drawRect(0,0,200,200);
shape.center(stage);
stage.update();

// in this case, we may have well used a zim.Rectangle ;-)
var shape = new zim.Rectangle(200, 200, "red");
shape.center(stage);
stage.update();
END EXAMPLE

PARAMETERS
obj - the object to add the methods and properties to (probably a CreateJS display object)

RETURNS the object for chaining
--*///+50.4
	zim.displayMethods = {
		drag:function(rect, overCursor, dragCursor, currentTarget, swipe, localBounds, onTop, surround, slide, slideDamp, slideSnap, reg, removeTweens) {
			if (isDUO(arguments)) {arguments[0].obj = this; return zim.drag(arguments[0]);}
			else {return zim.drag(this, rect, overCursor, dragCursor, currentTarget, swipe, localBounds, onTop, surround, slide, slideDamp, slideSnap, reg, removeTweens);}
		},
		noDrag:function() {
			return zim.noDrag(this);
		},
		dragRect:function(rect) {
			return zim.dragRect(this, rect);
		},
		setSwipe:function(swipe) {
			return zim.setSwipe(this, swipe);
		},
		hitTestPoint:function(x, y) {
			return zim.hitTestPoint(this, x, y);
		},
		hitTestReg:function(b) {
			return zim.hitTestReg(this, b);
		},
		hitTestRect:function(b, num) {
			return zim.hitTestRect(this, b, num);
		},
		hitTestCircle:function(b, num) {
			return zim.hitTestCircle(this, b, num);
		},
		hitTestBounds:function(b, boundsShape) {
			return zim.hitTestBounds(this, b, boundsShape);
		},
		boundsToGlobal:function(rect, flip) {
			return zim.boundsToGlobal(this, rect, flip);
		},
		hitTestGrid:function(width, height, cols, rows, x, y, offsetX, offsetY, spacingX, spacingY, local, type) {
			return zim.hitTestGrid(this, width, height, cols, rows, x, y, offsetX, offsetY, spacingX, spacingY, local, type);
		},
		move:function(x, y, time, ease, call, params, wait, loop, loopCount, loopWait, loopCall, loopParams, rewind, rewindWait, rewindCall, rewindParams, sequence, sequenceCall, sequenceParams, ticker, props, protect, override, from, id) {
			if (isDUO(arguments)) {arguments[0].target = this; return zim.move(arguments[0]);}
			else {return zim.move(this, x, y, time, ease, call, params, wait, loop, loopCount, loopWait, loopCall, loopParams, rewind, rewindWait, rewindCall, rewindParams, sequence, sequenceCall, sequenceParams, ticker, props, protect, override, from, id);}
		},
		animate:function(obj, time, ease, call, params, wait, loop, loopCount, loopWait, loopCall, loopParams, rewind, rewindWait, rewindCall, rewindParams, sequence, sequenceCall, sequenceParams, ticker, props, css, protect, override, from, id) {
			if (isDUO(arguments)) {arguments[0].target = this; return zim.animate(arguments[0]);}
			else {return zim.animate(this, obj, time, ease, call, params, wait, loop, loopCount, loopWait, loopCall, loopParams, rewind, rewindWait, rewindCall, rewindParams, sequence, sequenceCall, sequenceParams, ticker, props, css, protect, override, from, id);}
		},
		loop:function(call, reverse, step, start, end) {
			return zim.loop(this, call, reverse, step, start, end);
		},
		copyMatrix:function(source) {
			return zim.copyMatrix(this, source);
		},
		pos:function(x, y) {
			return zim.pos(this, x, y);
		},
		mov:function(x, y) {
			return zim.mov(this, x, y);
		},
		alp:function(alpha) {
			return zim.alp(this, alpha);
		},
		rot:function(rotation) {
			return zim.rot(this, rotation);
		},
		siz:function(width, height, only) {
			return zim.siz(this, width, height, only);
		},
		ske:function(skewX, skewY) {
			return zim.ske(this, skewX, skewY);
		},
		reg:function(regX, regY) {
			return zim.reg(this, regX, regY);
		},
		sca:function(scale, scaleY) {
			return zim.sca(this, scale, scaleY);
		},
		scale:function(scale, scaleY) {
			return zim.scale(this, scale, scaleY);
		},
		scaleTo:function(boundObj, percentX, percentY, type) {
			if (isDUO(arguments)) {arguments[0].obj = this; return zim.scaleTo(arguments[0]);}
			else {return zim.scaleTo(this, boundObj, percentX, percentY, type);}
		},
		fit:function(left, top, width, height, inside) {
			if (isDUO(arguments)) {arguments[0].obj = this; return zim.fit(arguments[0]);}
			else {return zim.fit(this, left, top, width, height, inside);}
		},
		outline:function(color, size) {
			if (isDUO(arguments)) {arguments[0].obj = this; return zim.outline(arguments[0]);}
			else {return zim.outline(this, color, size);}
		},
		addTo:function(container, index) {
			return zim.addTo(this, container, index);
		},
		removeFrom:function(container) {
			return zim.removeFrom(this, container);
		},
		centerReg:function(container, add, index) {
			if (isDUO(arguments)) {arguments[0].obj = this; return zim.centerReg(arguments[0]);}
			else {return zim.centerReg(this, container, add, index);}
		},
		center:function(container, add, index) {
			if (isDUO(arguments)) {arguments[0].obj = this; return zim.center(arguments[0]);}
			else {return zim.center(this, container, add, index);}
		},
		place:function(id) {
			return zim.place(this, id);
		},
		expand:function(padding, paddingVertical) {
			return zim.expand(this, padding, paddingVertical);
		},
		setMask:function(mask) {
			return zim.setMask(this, mask);
		},
		cloneProps:function(clone) { // from CreateJS DisplayObject
			clone.alpha = this.alpha;
			clone.mouseEnabled = this.mouseEnabled;
			clone.tickEnabled = this.tickEnabled;
			clone.name = this.name;
			clone.regX = this.regX;
			clone.regY = this.regY;
			clone.visible = this.visible;
			clone.shadow = this.shadow;
			zim.copyMatrix(clone, this);
			clone.compositeOperation = this.compositeOperation;
			clone.snapToPixel = this.snapToPixel;
			clone.filters = this.filters==null?null:this.filters.slice(0);
			clone.mask = this.mask;
			clone.hitArea = this.hitArea;
			clone.cursor = this.cursor;
			clone._bounds = this._bounds;
			return clone;
		},
		cloneChildren:function(clone) {
			if (clone.children.length) clone.removeAllChildren();
			var arr = clone.children;
			for (var i=0, l=this.children.length; i<l; i++) {
				var childClone = this.children[i].clone();
				childClone.parent = clone;
				arr.push(childClone);
			}
			return clone;
		}
	}

	zim.addDisplayMembers = function(obj) {
		z_d("50.4");
		for (var i in zim.displayMethods) {
			if (zim.displayMethods.hasOwnProperty(i)) {
				obj[i] = zim.displayMethods[i];
			}
		}
		Object.defineProperty(obj, 'width', {
			enumerable: true,
			get: function() {
				// that.setBounds(null);
				var b = this.getBounds();
				return (zot(b))?null:b.width*this.scaleX;
			},
			set: function(value) {
				var b = this.getBounds();
				if (zot(b) || b.width==0) {zog("width needs bounds set with setBounds()"); return;}
				var s = value/b.width;
				this.scaleX = this.scaleY = s;
			}
		});
		Object.defineProperty(obj, 'height', {
			enumerable: true,
			get: function() {
				// that.setBounds(null);
				var b = this.getBounds();
				return (zot(b))?null:b.height*this.scaleY;
			},
			set: function(value) {
				var b = this.getBounds();
				if (zot(b) || b.height==0) {zog("height needs bounds set with setBounds()"); return;}
				var s = value/b.height;
				this.scaleX = this.scaleY = s;
			}
		});
		Object.defineProperty(obj, 'widthOnly', {
			enumerable: true,
			get: function() {
				// that.setBounds(null);
				var b = this.getBounds();
				return (zot(b))?null:b.width*this.scaleX;
			},
			set: function(value) {
				var b = this.getBounds();
				if (zot(b) || b.width==0) {zog("widthOnly needs bounds set with setBounds()"); return;}
				var s = value/b.width;
				this.scaleX = s;
			}
		});
		Object.defineProperty(obj, 'heightOnly', {
			enumerable: true,
			get: function() {
				// that.setBounds(null);
				var b = this.getBounds();
				return (zot(b))?null:b.height*this.scaleY;
			},
			set: function(value) {
				var b = this.getBounds();
				if (zot(b) || b.height==0) {zog("heightOnly needs bounds set with setBounds()"); return;}
				var s = value/b.height;
				this.scaleY = s;
			}
		});
		return obj;
	}//-50.4

/*--
zim.Container = function(width||boundsX, height||boundsY, null||width, null||height)

Container
zim class - extends a createjs.Container

DESCRIPTION
A Container object is used to hold other display objects or other containers.
You can then move or scale the container and all objects inside will move or scale.
You can apply an event on a container and use the target property of the event object
to access the object in the container that caused the event
or use the currentTarget property of the event object to access the container itself.
Containers do not have bounds unless some items in the container have bounds -
at which point the bounds are the combination of the bounds of the objects with bounds.
You can manually set the bounds with setBounds(x,y,w,h) - read the CreateJS docs.
Or pass in width and height, or boundsX, boundsY, width, height to have zim.Container set bounds
Manually set bounds will not update automatically unless you setBounds(null).

NOTE: All the ZIM shapes and components extend the zim.Container.
This means all shapes and components inherit the methods and properties below
and indeed, the zim.Container inherits all the createjs.Container methods and properties.
See the CreateJS documentation for x, y, alpha, rotation, on(), addChild(), etc.

EXAMPLE
var container = new zim.Container();
stage.addChild(container);
container.x = 100; container.y = 100;

var rect = new zim.Rectangle(100, 100, "blue");
container.addChild(rect); // add rectangle to container
var circle = new zim.Circle(40, "red");
circle.center(container) // add the circle to the container and center

container.drag(); // will drag either the rectangle or the circle
container.drag({currentTarget:true}); // will drag both the rectangle and the circle

// below will reduce the alpha of the object in the container that was clicked (target)
container.on("click" function(e) {e.target.alpha = .5; stage.update();})
// below will reduce the alpha of all the objects in the container (currentTarget)
container.on("click" function(e) {e.currentTarget.alpha = .5; stage.update();})
END EXAMPLE

PARAMETERS
width - (default null) the width of the container
height - (default width) the height of the container
	if there is a width supplied but no height then the height is set to the width
	setting these run container.setBounds(boundsX,boundsY,width,height);
	you should be able to container.setBounds(null) to go back to auto calculation
	but there is currently a bug in CreateJS - it will be fixed
	so for now, if you ever want to auto calculate, do not set width and height

OR if four parameters are set:
boundsX - (default 0) the x of the bounds
boundsY - (default 0) the y of the bounds
width - (default null) the width of the container
height - (default width) the height of the container
	if there is a width supplied but no height then the height is set to the width
	setting these run container.setBounds(boundsX,boundsY,width,height);
	you should be able to container.setBounds(null) to go back to auto calculation
	but there is currently a bug in CreateJS - it will be fixed
	so for now, if you ever want to auto calculate, do not set width and height

**** this class has all the DISPLAY METHODS introduced in ZIM 4TH
**** the methods below are available in ZIM Rectangle, Circle, Triangle
**** as well as all components like: Label, Button, Slider, Dial, Tab, Pane, etc.
**** as well as the ZIM display wrappers: Container, Shape, Sprite, MovieClip and Bitmap
**** the addition of methods and display wrappers added 3.4K to the file size

METHODS
* see the ZIM Create Module functions for full documentation
* see the USAGE section that follows this list of methods
* most methods accept ZIM DUO (except for 0 or 1 parameter functions like the hitTests)

drag(rect, overCursor, dragCursor, currentTarget, swipe, localBounds, onTop, surround, slide, slideDamp, slideSnap, reg, removeTweens)
noDrag()
dragRect(rect)
setSwipe(swipe)
hitTestPoint(x, y)
hitTestReg(b)
hitTestRect(b, num)
hitTestCircle(b, num)
hitTestBounds(b, boundsShape)
boundsToGlobal(rect, flip)
hitTestGrid(width, height, cols, rows, x, y, offsetX, offsetY, spacingX, spacingY, local, type)
move(target, x, y, time, ease, call, params, wait, loop, loopCount, loopWait, loopCall, loopParams, rewind, rewindWait, rewindCall, rewindParams, sequence, sequenceCall, sequenceParams, props, protect, override, from, id)
animate(target, obj, time, ease, call, params, wait, loop, loopCount, loopWait, loopCall, loopParams, rewind, rewindWait, rewindCall, rewindParams, sequence, sequenceCall, sequenceParams, props, css, protect, override, from, id)
loop(call, reverse, step, start, end)
copyMatrix(source)
pos(x, y)
alp(alpha)
rot(rotation)
scale(scale)
scaleTo(boundObj, percentX, percentY, type)
fit(left, top, width, height, inside)
outline(color, size)
addTo(container, index)
removeFrom(container)
centerReg(container, add, index)
center(container, add, index)
place(id)
expand(padding, paddingVertical)
setMask(mask)

USAGE
the above list of methods work on all objects that extend zim.Container
such as ZIM shapes and components (Label, Button, Slider, Dial, etc.)
also other ZIM display objects can use these methods (Shape, Bitmap, MovieClip, Sprite)

EXAMPLE
var circle = new zim.Circle();
circle.center(stage); // add circle to stage and center
circle.drag();

// alternatively, we can still use the traditional ZIM functions:
zim.center(circle, stage);
zim.drag(circle);

// ZIM DUO works the same way as before - eg.
circle.drag({slide:true});
END EXAMPLE

METHODS, CONT'D
clone() - clones all the container, its properties and all its children

ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
** bounds must be set first (or width and height parameters set) for these to work
** setting these adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, compositeOperation, etc.

EVENTS
See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+50.5
zim.Container = function(a, b, c, d) {
		z_d("50.5");
		this.cjsContainer_constructor();
		if (!zot(c)) {
			var boundsX = a;
			var width = c;
			var boundsY = b;
			var height = d;
		} else {
			var boundsX = 0;
			var width = a;
			var boundsY = 0;
			var height = b;
		}
		if (zot(height)) height = width;
		if (!zot(a)) this.setBounds(boundsX,boundsY,width,height);
		this.clone = function() {
			return this.cloneChildren(this.cloneProps(new zim.Container(boundsX, boundsY, width, height)));
		}
	}
	zim.addDisplayMembers(zim.Container.prototype);
	zim.extend(zim.Container, createjs.Container, "clone", "cjsContainer", false);

	//-50.5

/*--
zim.Shape = function(width||boundsX, height||boundsY, null||width, null||height, graphics)

Shape
zim class - extends a createjs.Shape

DESCRIPTION
ZIM Shape lets you draw dynamic shapes beyond the ZIM provided shapes.
You make a new shape object and then draw in its graphics property
using similar commands to the HTML Canvas commands (and Flash Bitmap drawing).
See the CreateJS Easel Shapes and Graphics docs:
http://www.createjs.com/docs/easeljs/classes/Graphics.html

EXAMPLE
var shape = new zim.Shape();
shape.graphics.fill("red").drawRect(0,0,200,100);
// similar to zim.Rectangle(200, 100, "Red");

// we can draw lines, etc.
var g = shape.graphics; // shorter reference to graphics object
g.stroke("blue").moveTo(200,200).lineTo(300,300);

// we can continue to draw as much as we want in the same shape
// there is also a tiny API with shortcuts: stroke, fill, etc.
g.s("green").f("red").mt(500,500).qt(550,500,600,500);
END EXAMPLE

PARAMETERS
width - (default null) the width of the shape
height - (default width) the height of the shape
	if there is a width supplied but no height then the height is set to the width
	setting these run container.setBounds(0,0,width,height);
	you should be able to container.setBounds(null) to go back to auto calculation
	but there is currently a bug in CreateJS - it will be fixed
	so for now, if you ever want to auto calculate, do not set width and height

OR if four parameters are set:
boundsX - (default 0) the x of the bounds
boundsY - (default 0) the y of the bounds
width - (default null) the width of the shape
height - (default width) the height of the shape
	if there is a width supplied but no height then the height is set to the width
	setting these run shape.setBounds(boundsX,boundsY,width,height);
	you should be able to shape.setBounds(null) to go back to auto calculation
	but there is currently a bug in CreateJS - it will be fixed
	so for now, if you ever want to auto calculate, do not set width and height

graphics - (default null) a CreateJS Graphics instance (see CreateJS docs)
	or just use the graphics property of the shape object (like usual)

METHODS
clone(recursive) - makes a copy of the shape
	recursive defaults to true so copy will have own copy of graphics
	set recursive to false to have clone share graphic property

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
** bounds must be set first (or width and height parameters set) for these to work
** setting these adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object

ALSO: See the CreateJS Easel Docs for Shape properties, such as:
graphics, x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseEnabled, compositeOperation, etc.

EVENTS
See the CreateJS Easel Docs for Shape events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+50.6
	zim.Shape = function(a, b, c, d, graphics) {
		z_d("50.6");
		this.cjsShape_constructor(graphics);
		var that = this;
		if (!zot(c)) {
			var boundsX = a;
			var width = c;
			var boundsY = b;
			var height = d;
		} else {
			var boundsX = 0;
			var width = a;
			var boundsY = 0;
			var height = b;
		}
		if (zot(height)) height = width;
		if (!zot(a)) this.setBounds(boundsX,boundsY,width,height);

		this.clone = function(recursive) {
			if (zot(recursive)) recursive = true;
			var c = that.cloneProps(new zim.Shape(width, height, boundsX, boundsY, graphics));
			if (recursive) c.graphics = that.graphics.clone();
			else c.graphics = that.graphics;
			return c;
		}
	}
	zim.extend(zim.Shape, createjs.Shape, "clone", "cjsShape", false);
	zim.addDisplayMembers(zim.Shape.prototype);
	//-50.6

/*--
zim.Bitmap = function(image, id)

Bitmap
zim class - extends a createjs.Bitmap

DESCRIPTION
Makes a Bitmap object from an image.
It is best to use the loadAssets() method of ZIM Frame
to preload the image and then use the asset() method to access the Bitmap.
See the ZIM Frame class and asset example on the ZIM Frame page of templates.

EXAMPLE
var frame = new zim.Frame();
frame.on("ready", function() {
	var stage = frame.stage;
	frame.loadAssets("logo.jpg");
	frame.on("complete", function() {
		var logo = frame.asset("logo.jpg"); // logo is a zim.Bitmap
		logo.center(stage);
		stage.update();
	});
});
END EXAMPLE

PARAMETERS
image - an HTML image URL (may not load right away - see zim.Frame loadAssets)
id - an optional id

METHODS
clone() - makes a copy with properties such as x, y, etc. also copied

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Bitmap methods, such as:
on(), off(), getBounds(), setBounds(), dispatchEvent(), etc.

PROPERTIES
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
id - the filename used in the frame.loadAssets()
	if you add the path the file name then it will be included with the id
	if you add the path with the path parameter, it will not be included with the id

ALSO: See the CreateJS Easel Docs for Bitmap properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseEnabled, compositeOperation, etc.

EVENTS
See the CreateJS Easel Docs for Bitmap events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+50.7
	zim.Bitmap = function(image, id) {
		z_d("50.7");
		this.cjsBitmap_constructor(image);
		this.id = id;
		this.clone = function() {
			return this.cloneProps(new zim.Bitmap(image, id));
		}
	}
	zim.extend(zim.Bitmap, createjs.Bitmap, "clone", "cjsBitmap", false);
	zim.addDisplayMembers(zim.Bitmap.prototype);
	//-50.7

/*--
zim.Sprite = function(image, cols, rows, count, offsetX, offsetY, spacingX, spacingY, width, height, animations, json, id, globalControl)

Sprite
zim class - extends a createjs.Sprite

DESCRIPTION
A Sprite plays an animation of a spritesheet
which is a set of images layed out in one file.
You play the Sprite with the run() method.
This animates the Sprite over a given time
with various features like playing a labelled animation,
playing animation series,
SEE: http://zimjs.com/code/spritesheet/index.html
AND: http://zimjs.com/code/spritesheet/skateboard.html
wait, loop, rewind and call functions.
This actually runs a ZIM animation and animates the frames.

NOTE: A ZIM Sprite handles an evenly tiled spritesheet.
For an un-evenly tiled spritesheet use the json parameter
which loads a CreateJS SpriteSheet.
The json can come from TexturePacker for instance exported for EaselJS/CreateJS
CreateJS Easel Sprite and SpriteSheet docs:
http://www.createjs.com/docs/easeljs/classes/Sprite.html
http://www.createjs.com/docs/easeljs/classes/SpriteSheet.html
You can optionally pass in JSON data for a createjs.SpriteSheet as a parameter.
When you do so, all other parameters are ignored.

NOTE: You can use CreateJS gotoAndPlay(), play(), etc.
but we found the framerate could not be kept
with other animations or Ticker events running.
So we recommend using the ZIM Sprite run() method.

NOTE: The run() method handles single frame and consecutive labels
but does not handle non-consective frame labels or nested labels.
run() can however play series of labels.

EXAMPLE
// inside zim.Frame template
// boom.png is a sprite sheet found online
// It has 8 columns and 6 rows that we can visually count
// We can enter a total parameter if it does not end evenly in the grid
// A graphics editor (like Photoshop) could be used to see
// if there is an offset or spacing, etc. and enter those as parameters
// In this case, we do not need to do any of this - just enter the cols and rows

frame.on("complete", function() {
	var spriteImage = frame.asset("boom.png");

	var animation = new zim.Sprite({
		image:spriteImage,
		cols:8,
		rows:6,
		animations:{mid:[10,20], end:[30,40]} // optional animations with labels
	});
	animation.center(stage);
	animation.run(2000); // plays the frames of the Sprite over 2 seconds (master time)

	// OR use the label to play the frames listed in animations parameter
	animation.run(1000, "mid");

	// OR run a series of animations
	// by passing an array of label objects to the label parameter
	// these each have a time so the master time is ignored
	// they can also have any of the run() parameters
	// if you provide an array of labels, you cannot rewind the overall animation
	animation.run(null, [
		{label:"mid", time:1000},
		{label:"end", time:500, loop:true, loopCount:5, call:function(){zog("loops done");}},
		{startFrame:10, endFrame:20, time:1000}
	]);

	// OR can call a function when done
	animation.run(1000, "mid", function(){
		stage.removeChild(animation);
		stage.update();
	});

	// OR can loop the animation
	animation.run({time:2000, loop:true}); // see run() parameters for more
});
END EXAMPLE

EXAMPLE
// Here is an example with CreateJS SpriteSheet data
// robot.png is a sprite sheet made by ZOE based on a Flash swf
// you can also make your own with Photoshop or Texture Packer

frame.loadAssets("robot.png");
frame.on("complete", function() {

	// using ZOE to export swf animation to spritesheet data
	// spritesheet data uses the image name, not the Bitmap itself
	var image = frame.asset("robot.png").image;
	var spriteData = {
		"framerate":24,
		"images":[image],
		"frames":[[0, 0, 256, 256, 0, -54, -10], many more - etc.],
		"animations":{}
	};
	var animation = new zim.Sprite({json:spriteData});
	animation.center(stage);
	animation.run(2000); // note, duration alternative to framerate
});

OR
// load in data from externa JSON
frame.loadAssets(["robot.json", "robot.png"]);
// ... same as before
var animation = new zim.Sprite({json:frame.asset("robot.json")});
// ... same as before
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
image - the ZIM Bitmap for the spritesheet
cols - (default 1) - the columns in the spritesheet
rows - (default 1) the rows in the spritesheet
count - (default cols*rows) how many total frames in the spritesheet
offsetX - (default 0) the pixels from the left edge to the frames
offsetY - (default 0) the pixels from the top edge to the frames
spacingX - (default 0) the horizontal spacing between the frames
spacingY - (default 0) the vertical spacing between the frames
width - (default image width) the width including offset and spacing for frames
height - (default image height) the height including offset and spacing for frames
animations - (default null) an object literal of labels holding frames to play
	{label:3, another:[4,10]}
	run(1000, "label") would play frame 3 for a second
	run(1000, "another") would play frames 4 to 10 for a second
	You can combine play with the wait parameter:
	run(1000, "label").run({time:1000, label:"another", wait:1000});
json - (default null) a JSON string for a CreateJS SpriteSheet
	If you pass in a json parameter, all other parameters are ignored
id - (default randomly assigned) an id you can use in other animations - available as sprite.id
	use this id in other animations for pauseRun and stopRun to act on these as well
globalControl - (default true) pauseRun and stopRun will control other animations with same id

METHODS
run(time, label, call, params, wait, loop, loopCount, loopWait, loopCall, loopParams, rewind, rewindWait, rewindCall, rewindParams, startFrame, endFrame, spriteID)
	The run() method animates the Sprite over an amount of time
	Would recommend this method over the CreateJS play() and gotoAndPlay()
	methods because the framerate for these get overwritten by other stage.update() calls
	With run() you get other nice ZIM animate features as well as follows:
	Returns the object for chaining
	Can be paused with pauseZimAnimate(true) or unpaused with pauseZimAnimate(false)
	Can be stopped with stopZimAnimate() on the Sprite
	supports DUO - parameters or single object with properties below
	time (default 1) - the time in milliseconds to run the animations (the master time)
	label (default null) - a label specified in the Sprite animations parameter
		if this is an array holding label objects for example:
		[{label:"run", time:1000}, {label:"stand", time:2000}]
		then the sprite will play the series with the times given and ignore the master time
		Note: if any of the series has a loop and loops forever (a loopCount of 0 or no loopCount)
		then this will be the last of the series to run
	call - (default null) the function to call when the animation is done
	params - (default target) a single parameter for the call function (eg. use object literal or array)
	wait - (default 0) milliseconds to wait before doing animation
	loop - (default false) set to true to loop animation
	loopCount - (default 0) if loop is true how many times it will loop (0 is forever)
	loopWait - (default 0) milliseconds to wait before looping (post animation wait)
	loopCall - (default null) calls function after loop is done (including last loop)
	loopParams - (default target) parameters to send loop function
	rewind - (default false) set to true to rewind (reverse) animation (doubles animation time)
	rewindWait - (default 0) milliseconds to wait in the middle of the rewind
	rewindCall - (default null) calls function at middle of rewind animation
	rewindParams - (default target) parameters to send rewind function
	startFrame - (default null - or 0) the frame to start on - will be overridden by a label with frames
	endFrame - (default null - or totalFrames) the frame to end on - will be overridden by a label with frames
	id - (default randomly assigned) an id you can use in other animations - available as sprite.id
		use this id in other animations for pauseRun and stopRun to act on these as well
	globalControl - (default true) pauseRun and stopRun will control other animations with same id
pauseRun(state) - pause or unpause the animation (including an animation series)
	state - (default true) when true the animation is paused - set to false to unpause
stopRun() - stop the sprite from animating
clone() - makes a copy with properties such as x, y, etc. also copied

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Sprite methods, such as:
play(), gotoAndPlay(), gotoAndStop(), stop(), advance(),
on(), off(), getBounds(), setBounds(), dispatchEvent(), etc.

PROPERTIES
id - an id that you can use in other animations to also be controlled by pauseRun() and stopRun()
frame - get and set the current frame of the Sprite
totalFrames - get the total frames of the Sprite - read only
animations - the animations data with labels of frames to animate
running - is the sprite animation being run (includes both paused and unpaused) - read only
runPaused - is the sprite animation paused (also returns paused if not running) - read only
	note: this only syncs to pauseRun() and stopRun() not pauseZimAnimate() and stopZimAnimate()
	note: CreateJS has paused, etc. but use that only if running the CreateJS methods
	such as gotoAndPlay(), gotoAndStop(), play(), stop()
** bounds must be set first for these to work
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object

ALSO: See the CreateJS Easel Docs for Sprite properties, such as:
currentFrame, framerate, paused, currentAnimation, currentAnimationFrame, spriteSheet,
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseEnabled, compositeOperation, etc.

EVENTS
See the CreateJS Easel Docs for Sprite events, such as:
animationend, change, added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+50.8
	zim.Sprite = function(image, cols, rows, count, offsetX, offsetY, spacingX, spacingY, width, height, animations, json, id, globalControl) {
		var sig = "image, cols, rows, count, offsetX, offsetY, spacingX, spacingY, width, height, animations, json, id, globalControl";
		var duo; if (duo = zob(zim.Sprite, arguments, sig, this)) return duo;

		z_d("50.8");

		var that = this;

		if (zot(json) && !zot(image)) {
			if (zot(cols)) cols = 1;
			if (zot(rows)) rows = 1;
			if (zot(count)) count = cols * rows;
			if (zot(offsetX)) offsetX = 0;
			if (zot(offsetY)) offsetY = 0;
			if (zot(spacingX)) spacingX = 0;
			if (zot(spacingY)) spacingY = 0;
			if (zot(width)) width = image.width;
			if (zot(height)) height = image.height;

			var frameW = (width-offsetX+spacingX) / cols - spacingX;
			var frameH = (height-offsetY+spacingY) / rows - spacingY;
			var frames = [];
			var num = 0;
			outer:
			for (var j=0; j<rows; j++) {
				for (var i=0; i<cols; i++) {
					if (++num > count) break outer;
					frames.push([
						offsetX + i*(frameW+spacingX),
						offsetY + j*(frameH+spacingY),
						frameW,
						frameH
					]);
				}
			}
			var spriteData = {
				images:[image.image], // note, this takes the image, not the Bitmap
				frames:frames,
				animations:animations
			};
			spriteSheet = new createjs.SpriteSheet(spriteData);
		} else {
			animations = json.animations;
			spriteSheet = new createjs.SpriteSheet(json);
		}
		this.animations = animations;
		this.cjsSprite_constructor(spriteSheet);

		if (zot(id)) id = zim.makeID();
		this.id = id;

		if (zot(globalControl)) globalControl = true;
		that.globalControl = globalControl;

		this.parseFrames = function(label, startFrame, endFrame) {
			var frames = [];
			if (zot(label)) {
				if (zot(startFrame)) startFrame = 0;
				if (zot(endFrame)) endFrame = that.totalFrames-1;
				addSequential(startFrame, endFrame);
			} else {
				if (zot(that.animations) || zot(that.animations[label])) return [];
				var a = that.animations[label];
				processAnimation(a);
			}
			function processAnimation(a) {
				if (Array.isArray(a)) {
					processArray(a);
				} else if (a.constructor == {}.constructor) {
					processObject(a);
				} else if (!isNaN(a)) {
					frames.push({f:Math.floor(a), s:1});
				}
			}
			function processArray(a) {
				addSequential(a[0], a[1], a[3]);
				if (a[2] && !zot(that.animations[a[2]])) processAnimation(that.animations[a[2]]);
			}
			function processObject(a) {
				if (zot(a.frames)) return;
				if (zot(a.speed)) a.speed = 1;
				for (var i=0; i<a.frames.length; i++) {
					frames.push({f:a.frames[i], s:a.speed});
				}
				if (a.next && !zot(that.animations[a.next])) processAnimation(that.animations[a.next]);
			}
			function addSequential(start, end, speed) {
				if (zot(speed)) speed = 1;
				for (var i=start; i<=end; i++) {
					frames.push({f:i, s:speed});
				}
			}
			return frames;
		}

		this.run = function(time, label, call, params, wait, loop, loopCount, loopWait, loopCall, loopParams, rewind, rewindWait, rewindCall, rewindParams, startFrame, endFrame, tweek, id, globalControl) {
			var sig = "time, label, call, params, wait, loop, loopCount, loopWait, loopCall, loopParams, rewind, rewindWait, rewindCall, rewindParams, startFrame, endFrame, tweek, id, globalControl";
			var duo; if (duo = zob(this.run, arguments, sig)) return duo;

			var obj;
			var set;
			if (zot(tweek)) tweek = 1;
			if (!zot(id)) that.id = id;
			if (!zot(globalControl)) that.globalControl = globalControl;

			if (Array.isArray(label)) {
				// check labels
				var innerLabel;
				var lastLabel;
				obj = [];
				var extraTime = 0;
				var firstStartFrame;
				for (var i=0; i<label.length; i++) {
					innerLabel = label[i];

					if (!zot(innerLabel.label) && !zot(animations) && !zot(animations[innerLabel.label])) {
						var frames = getFrames(innerLabel.label);
						startFrame = frames[0];
						endFrame = frames[1];
					} else if (!zot(innerLabel.startFrame) || !zot(innerLabel.endFrame)) {
						if (zot(innerLabel.endFrame)) innerLabel.endFrame = spriteSheet.getNumFrames() - 1;
						if (zot(innerLabel.startFrame)) innerLabel.startFrame = 0;
						startFrame = innerLabel.startFrame;
						endFrame = innerLabel.endFrame;
					} else {
						if (zon) zog("zim.Sprite - run() - bad multiple label format - see docs");
						continue;
					}

					delete innerLabel.startFrame;
					delete innerLabel.endFrame;

					innerLabel.obj = zim.merge(innerLabel.obj, {frame:endFrame});
					innerLabel.set = zim.merge(innerLabel.set, {frame:startFrame});

					// based on previous frames
					if (zot(innerLabel.wait)) innerLabel.wait = extraTime*tweek;

					lastLabel = innerLabel.label;
					delete innerLabel.label;

					obj.push(innerLabel);

					// will get applied next set of frames
					extraTime = 0;
					var tt = zot(innerLabel.time)?time:innerLabel.time;
					if (endFrame-startFrame > 0) extraTime = tt / (endFrame-startFrame) / 2; // slight cludge - seems to look better?

					if (i==0) firstStartFrame = startFrame;
				}
				startFrame = firstStartFrame;
				if (obj.length == 0) return this;
				if (obj.length == 1) {
					time = obj[0].time;
					label = lastLabel;
					obj = null;
				}
			}
			function getFrames(label) {
				var a = animations[label];
				makeStartEnd(a);
				function makeStartEnd(a) {
					if (typeof a == "number") {
						startFrame = endFrame = a;
					} else if (a.constructor == {}.constructor) {
						if (zot(a.frames)) {
							if (zon) zog("zim.Sprite() - run() does not support nested labels - see docs");
							startFrame = 0;
							endFrame = spriteSheet.getNumFrames() - 1;
						} else {
							makeStartEnd(a.frames);
						}
						startFrame = a.frames
					} else {
						startFrame = a[0];
						endFrame = a[a.length-1];
					}
				}
				return [startFrame, endFrame];
			}

			// note, label might have been set back to normal if it was an array of one label
			// normal single label
			if (!Array.isArray(label)) {

				if (zot(label) || zot(animations) || zot(animations[label])) {
					label = null;
					if (zot(startFrame)) startFrame = 0;
					if (zot(endFrame)) endFrame = spriteSheet.getNumFrames() - 1; // DUO might re-run function losing scope of this
				} else { // we do have a label and it is in animations
					var frames = getFrames(label);
					startFrame = frames[0];
					endFrame = frames[1];
				}
				obj = {frame:endFrame};
				set = {frame:startFrame};
			}

			if (zot(time)) time = 1000;
			// if already running the sprite then stop the last run
			if (that.running) that.stopZimAnimate(that.id);
			that.running = true;

			if (!Array.isArray(obj)) {
				var extraTime = 0;
				if (endFrame-startFrame > 0) extraTime = time / (endFrame-startFrame) / 2; // slight cludge - seems to look better?
				if (zot(loopWait)) {loopWait = extraTime*tweek};
				if (zot(rewindWait)) {rewindWait = extraTime*tweek};
			}
			that.frame = startFrame;

			// locally override call to add running status after animation done
			var localCall = function() {
				if (call && typeof call == 'function') call(params);
				that.running = false;
			}

			zim.animate({
				target:that,
				obj:obj,
				time:time,
				ease:"linear",
				call:localCall,
				params:params,
				wait:wait,
				override:false,
				loop:loop, loopCount:loopCount, loopWait:loopWait,
				loopCall:loopCall, loopParams:loopParams,
				rewind:rewind, rewindWait:rewindWait, // rewind is ignored by animation series
				rewindCall:rewindCall, rewindParams:rewindParams,
				id:that.id
			});
			that.runPaused = false;
			return that;
		}

		this.runPaused = true;
		this.pauseRun = function(paused) {
			if (zot(paused)) paused = true;
			that.runPaused = paused;
			if (that.globalControl) {
				zim.pauseZimAnimate(paused, that.id);
			} else {
				that.pauseZimAnimate(paused, that.id);
			}
		}
		this.stopRun = function() {
			that.runPaused = true;
			that.running = false;
			if (that.globalControl) {
				zim.stopZimAnimate(that.id);
			} else {
				that.stopZimAnimate(that.id);
			}
		}

		Object.defineProperty(this, 'frame', {
			get: function() {
				return this.currentFrame;
			},
			set: function(value) {
				if (zot(value)) value = 0;
				value = Math.round(value);
				if (this.paused) {
					this.gotoAndStop(value);
				} else {
					this.gotoAndPlay(value);
				}
			}
		});

		Object.defineProperty(this, 'totalFrames', {
			get: function() {
				return spriteSheet.getNumFrames();
			},
			set: function(value) {
				zog("zim.Sprite - totalFrames is read only");
			}
		});

		this.clone = function() {
			return this.cloneProps(new zim.Sprite(image, cols, rows, count, offsetX, offsetY, spacingX, spacingY, width, height, animations, spriteSheet));
		}
	}
	zim.extend(zim.Sprite, createjs.Sprite, "clone", "cjsSprite", false);
	zim.addDisplayMembers(zim.Sprite.prototype);
	//-50.8

/*--
zim.MovieClip = function()

MovieClip
zim class - extends a createjs.MovieClip

DESCRIPTION
A MovieClip adds timelines to a Container.
The timelines are zim.move() or zim.animate() zimTween properties.
The zimTween property returns a CreateJS Tween object.
Primarily made to support Adobe Animate MovieClip export.
*Consider this experimental for the moment...

EXAMPLE
var movieClip = new zim.MovieClip();
var circle = new zim.Circle(20, frame.blue);
// circle needs to be on stage for zim.animate()
// movieClip will add it to itself anyway
stage.addChild(circle);

// *not sure why time is messed up
movieClip.timeline.addTween(circle.animate({obj:{scale:3}, time:100, rewind:true}).zimTween);
movieClip.play();
movieClip.center(stage);
stage.on("stagemousedown", function() {
	movieClip.paused = !movieClip.paused;
});
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
// from the CreateJS MovieClip docs: http://www.createjs.com/docs/easeljs/classes/MovieClip.html
mode - (default "independent") or single_frame (based on startPosition) or synched (syncs to parent)
startPosition - (default 0) the start position of the MovieClip (*could not get to work)
loop - (default true) set to false not to loop
labels - (default null) declare label property with position value
	eg. {explode:20} to use with gotoAndPlay("explode") rather than gotoAndPlay(20)
	*could not get labels to work either

METHODS
clone() - makes a copy with properties such as x, y, etc. also copied

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for MovieClip methods, such as:
play(), gotoAndPlay(), gotoAndStop(), stop(), advance(),
on(), off(), getBounds(), setBounds(), dispatchEvent(), etc.

PROPERTIES
** bounds must be set first for these to work
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object

ALSO: See the CreateJS Easel Docs for MovieClip properties, such as:
currentFrame, totalFrames, currentLabel, duration, framerate, labels, loop, mode, paused, startPosition, timeline,
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseEnabled, parent, compositeOperation, etc.

EVENTS
See the CreateJS Easel Docs for MovieClip events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+50.9
	zim.MovieClip = function(mode, startPosition, loop, labels) {
		var sig = "mode, startPosition, loop, labels";
		var duo; if (duo = zob(zim.MovieClip, arguments, sig, this)) return duo;
		z_d("50.9");
		this.cjsMovieClip_constructor(mode, startPosition, loop, labels);
		this.clone = function() {
			return this.cloneProps(new zim.MovieClip(mode, startPosition, loop, labels));
		}
	}
	zim.extend(zim.MovieClip, createjs.MovieClip, "clone", "cjsMovieClip", false);
	zim.addDisplayMembers(zim.MovieClip.prototype);
	//-50.9

/*--
zim.Circle = function(radius, color, borderColor, borderWidth, dashed)

Circle
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Makes a circle shape inside a container.
The registration and origin will be the center.
NOTE: mouseChildren is turned to false for all zim Shape containers.

EXAMPLE
var circle = new zim.Circle(50, "red");
circle.center(stage);

// or with 10 pixel grey stroke
var circle = new zim.Circle(50, "red", "#666", 10);
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
radius - (default 50) the radius ;-)
color - (default "black") the fill color as any CSS color including "rgba()" for alpha fill (set a to 0 for tranparent fill)
borderColor - (default null) the stroke color
borderWidth - (default 1 if stroke is set) the size of the stroke in pixels
dashed - (default false) set to true for dashed border (if borderWidth or borderColor set)

METHODS
** the methods setFill(), setStroke(), setStrokeSize() - have been removed - see properties above
clone() - makes a copy of the shape

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
shape - gives access to the circle shape
color - get and set the fill color
borderColor - get and set the stroke color
borderWidth - get and set the stroke size in pixels
radius - gets or sets the radius.  Setting just sets width and height to twice the radius
** setting widths, heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
mouseChildren - set to false so you do not drag the shape inside the circle
	if you nest things inside and want to drag them, will want to set to true

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, compositeOperation, etc.

EVENTS
See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+51
	zim.Circle = function(radius, color, borderColor, borderWidth, dashed) {

		var sig = "radius, color, borderColor, borderWidth, dashed";
		var duo; if (duo = zob(zim.Circle, arguments, sig, this)) return duo;
		z_d("51");
		this.zimContainer_constructor();

		if (zot(radius)) radius = 50;
		if (zot(dashed)) dashed = false;
		if (!zot(borderColor) && zot(borderWidth)) {
			borderWidth = 1;
		} else if (!zot(borderWidth) && zot(borderColor)) {
			borderColor = "black";
		}
		if (zot(color)) color = borderWidth>0?"rgba(0,0,0,0)":"black";

		var that = this;
		var _radius = radius;
		var _color = color;
		var _borderColor = borderColor;
		var _borderWidth = borderWidth;
		this.mouseChildren = false;

		var circle = this.shape = new createjs.Shape();
		this.addChild(circle);

		var g = circle.graphics;
		var colorObj;
		var borderColorObj;
		var borderWidthObj;
		var borderDashedObj;
		drawShape();
		function drawShape() {
			g.c();
			colorObj =g.f(_color).command;
			// border of 0 or a string value still draws a border in CreateJS
			if (zot(_borderWidth) || _borderWidth > 0) { // no border specified or a border > 0
				if (!zot(_borderColor) || !zot(_borderWidth)) { // either a border color or thickness
					if (zot(_borderColor)) _borderColor = "black";
					borderColorObj = g.s(_borderColor).command;
					borderWidthObj = g.ss(_borderWidth).command;
					if (dashed) borderDashedObj = g.sd([10, 10], 5).command;
				}
			}
			g.dc(0,0,_radius);
			that.setBounds(-_radius,-_radius,_radius*2,_radius*2);
		}

		Object.defineProperty(that, 'color', {
			get: function() {
				return _color;
			},
			set: function(value) {
				if (zot(value)) value = "black";
				_color = value;
				colorObj.style = _color;
			}
		});
		Object.defineProperty(that, 'borderColor', {
			get: function() {
				return _borderColor;
			},
			set: function(value) {
				_borderColor = value;
				if (!borderColorObj) drawShape();
				else borderColorObj.style = _borderColor;
			}
		});
		Object.defineProperty(that, 'borderWidth', {
			get: function() {
				return _borderWidth;
			},
			set: function(value) {
				if (!(value>0)) value = 0;
				_borderWidth = value;
				if (!borderWidthObj || _borderWidth == 0) drawShape();
				else {
					borderWidthObj.width = _borderWidth;
					if (dashed) {
						borderDashedObj.segments = [20, 10];
						borderDashedObj.offset = 5;
					}
				}
			}
		});
		Object.defineProperty(that, 'radius', {
			get: function() {
				return _radius;
			},
			set: function(value) {
				_radius = value;
				drawShape();
			}
		});
		this.clone = function() {
			return that.cloneProps(new zim.Circle(radius, color, borderColor, borderWidth, dashed));
		}
	}
	zim.extend(zim.Circle, zim.Container, "clone", "zimContainer", false);
	//-51

/*--
zim.Rectangle = function(width, height, color, borderColor, borderWidth, corner, flatBottom, dashed)

Rectangle
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Makes a rectangle shape inside a container.
The registration and origin will be top left corner.
NOTE: mouseChildren is turned to false for all zim Shape containers.

EXAMPLE
var rect = new zim.Rectangle(200, 100, "blue");
rect.center(stage);

// or with rounded corners:
var rect = new zim.Rectangle({width:200, height:100, color:"blue", corner:20});

// or with 2 pixel white stroke
var rect = new zim.Rectangle(200, 100, "blue", "white", 2);
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
width, height - (default 100) the width and height ;-)
color - (default "black") the fill color as any CSS color including "rgba()" for alpha fill (set a to 0 for tranparent fill)
borderColor - (default null) the stroke color
borderWidth - (default 1 if stroke is set) the size of the stroke in pixels
corner - (default 0) the round of corner
flatBottom - (default false) top corners can round and bottom stays flat (used for ZIM Tabs)
dashed - (default false) set to true for dashed border (if borderWidth or borderColor set)

METHODS
** the methods setFill(), setStroke(), setStrokeSize() - have been removed - see properties above
clone() - makes a copy of the shape

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
shape - gives access to the rectangle shape
color - get and set the fill color
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
mouseChildren - set to false so  you do not drag the shape inside the rectangle
if you nest things inside and want to drag them, will want to set to true

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, compositeOperation, etc.

EVENTS
See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+52
	zim.Rectangle = function(width, height, color, borderColor, borderWidth, corner, flatBottom, dashed) {

		var sig = "width, height, color, borderColor, borderWidth, corner, flatBottom, dashed";
		var duo; if (duo = zob(zim.Rectangle, arguments, sig, this)) return duo;
		z_d("52");
		this.zimContainer_constructor();

		if (zot(width)) width = 100;
		if (zot(height)) height = 100;
		if (zot(corner)) corner = 0;
		if (zot(flatBottom)) flatBottom = false;
		if (zot(dashed)) dashed = false;
		if (!zot(borderColor) && zot(borderWidth)) {
			borderWidth = 1;
		} else if (!zot(borderWidth) && zot(borderColor)) {
			borderColor = "black";
		}
		if (zot(color)) color = borderWidth>0?"rgba(0,0,0,0)":"black";

		var that = this;
		var _color = color;
		var _borderColor = borderColor;
		var _borderWidth = borderWidth;
		this.mouseChildren = false;

		var rectangle = this.shape = new createjs.Shape();
		this.addChild(rectangle);

		var g = rectangle.graphics;
		var colorObj;
		var borderColorObj;
		var borderWidthObj;
		drawShape();
		function drawShape() {
			g.c();
			colorObj =g.f(_color).command;
			// border of 0 or a string value still draws a border in CreateJS
			if (zot(_borderWidth) || _borderWidth > 0) { // no border specified or a border > 0
				if (!zot(_borderColor) || !zot(_borderWidth)) { // either a border color or thickness
					if (zot(_borderColor)) _borderColor = "black";
					borderColorObj = g.s(_borderColor).command;
					borderWidthObj = g.ss(_borderWidth).command;
					if (dashed) borderDashedObj = g.sd([10, 10], 5).command;
				}
			}
			if (corner > 0) {
				if (flatBottom) {
					g.rc(0,0,width,height,corner,corner,0,0);
				} else {
					g.rr(0,0,width,height,corner);
				}
			} else {
				g.r(0,0,width,height);
			}
			that.setBounds(0,0,width,height);
		}

		Object.defineProperty(that, 'color', {
			get: function() {
				return _color;
			},
			set: function(value) {
				if (zot(value)) value = "black";
				_color = value;
				colorObj.style = _color;
			}
		});
		Object.defineProperty(that, 'borderColor', {
			get: function() {
				return _borderColor;
			},
			set: function(value) {
				_borderColor = value;
				if (!borderColorObj) drawShape();
				else borderColorObj.style = _borderColor;
			}
		});
		Object.defineProperty(that, 'borderWidth', {
			get: function() {
				return _borderWidth;
			},
			set: function(value) {
				if (!(value>0)) value = 0;
				_borderWidth = value;
				if (!borderWidthObj || _borderWidth == 0) drawShape();
				else {
					borderWidthObj.width = _borderWidth;
					if (dashed) {
						borderDashedObj.segments = [20, 10];
						borderDashedObj.offset = 5;
					}
				}
			}
		});
		this.clone = function() {
			return that.cloneProps(new zim.Rectangle(width, height, color, borderColor, borderWidth, corner, flatBottom, dashed));
		}
	}
	zim.extend(zim.Rectangle, zim.Container, "clone", "zimContainer", false);
	//-52

/*--
zim.Triangle = function(a, b, c, color, borderColor, borderWidth, center, adjust, dashed)

Triangle
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Makes a triangle shape inside a container using three line lengths.
Passing one length parameter makes an equilateral triangle.
Passing two length parameters makes an isosceles triangle.
Passing -1 as the last length parameter makes a 90 degree triangle.
NOTE: mouseChildren is turned to false for all zim Shape containers.

EXAMPLE
var tri = new zim.Triangle(200, null, null, "green");
tri.center(stage);

// all three sides specified - tall pointy triangle with yellow stroke of 10 pixels
var tri = new zim.Triangle(100, 200, 200, "green", "yellow", 10);

// here we adjust so rotation looks better
var tri = new zim.Triangle({a:200, color:"green", adjust:30});
tri.center(stage);
tri.animate({obj:{rotation:360}, time:3000, ease:"linear", loop:true});
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
a, b and c - (default 100) the lengths of the sides
	a will run horizontally along the bottom
	b is upwards and c is back to the origin
	if c is set to -1 will assume a 90 angle
color - (default "black") the fill color as any CSS color including "rgba()" for alpha fill (set a to 0 for tranparent fill)
borderColor - (default null) the stroke color
borderWidth - (default 1 if stroke is set) the size of the stroke in pixels
center - (default true) puts the registration point to the center
adjust - (default 0) pixels to bring center towards vertical base
	the actual center is not really the weighted center
dashed - (default false) set to true for dashed border (if borderWidth or borderColor set)

METHODS
** the methods setFill(), setStroke(), setStrokeSize() - have been removed - see properties above
clone() - makes a copy of the shape

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
shape - gives access to the triangle shape
color - get and set the fill color
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
one, two, three - read only - points with x, y properties for bottom left, bottom right, top right
angles - read only - Array of angles [bottom left, bottom right, top right]
mouseChildren - set to false so  you do not drag the shape inside the triangle
if you nest things inside and want to drag them, will want to set to true

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, compositeOperation, etc.

EVENTS
See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+53
	zim.Triangle = function(a, b, c, color, borderColor, borderWidth, center, adjust, dashed) {

		var sig = "a, b, c, color, borderColor, borderWidth, center, adjust, dashed";
		var duo; if (duo = zob(zim.Triangle, arguments, sig, this)) return duo;
		z_d("53");
		this.zimContainer_constructor();

		if (zot(a)) a = 100;
		if (zot(b)) b = a;
		if (zot(c)) c = b;
		if (c==-1) c = Math.sqrt(Math.pow(a,2)+Math.pow(b,2));
		if (zot(center)) center = true;
		if (zot(adjust)) adjust = 0;
		if (!zot(borderColor) && zot(borderWidth)) {
			borderWidth = 1;
		} else if (!zot(borderWidth) && zot(borderColor)) {
			borderColor = "black";
		}
		if (zot(color)) color = borderWidth>0?"rgba(0,0,0,0)":"black";

		var that = this;
		var _color = color;
		var _borderColor = borderColor;
		var _borderWidth = borderWidth;
		this.mouseChildren = false;

		var lines = [a,b,c];
		lines.sort(function(a, b){return b-a});
		aa = lines[0];
		bb = lines[1];
		cc = lines[2];
		var order = [lines.indexOf(a), lines.indexOf(b), lines.indexOf(c)];

		if (aa > bb+cc) {
			zog("zim build - Triangle(): invalid triangle lengths");
			return;
		}

		var tri = this.shape = new createjs.Shape();
		this.addChild(tri);

		var g = tri.graphics;
		var colorObj;
		var borderColorObj;
		var borderWidthObj;
		drawShape();
		function drawShape() {
			g.c();
			colorObj =g.f(_color).command;
			// border of 0 or a string value still draws a border in CreateJS
			if (zot(_borderWidth) || _borderWidth > 0) { // no border specified or a border > 0
				if (!zot(_borderColor) || !zot(_borderWidth)) { // either a border color or thickness
					if (zot(_borderColor)) _borderColor = "black";
					borderColorObj = g.s(_borderColor).command;
					borderWidthObj = g.ss(_borderWidth).command;
					if (dashed) borderDashedObj = g.sd([10, 10], 5).command;
				}
			}
			g.mt(0,0);
			that.one={x:0,y:0};
			g.lt(a,0);
			that.two={x:a,y:0};

			// find biggest angle with cosine rule
			var angle1 = Math.acos( (Math.pow(bb,2) + Math.pow(cc,2) - Math.pow(aa,2)) / (2 * bb * cc) ) * 180 / Math.PI;

			// use the sine rule for next biggest angle
			var angle2 = Math.asin( bb * Math.sin(angle1 * Math.PI / 180) / aa ) * 180 / Math.PI;

			// find last angle
			var angle3 = 180 - angle1 - angle2;

			// get position of angles by mapping to opposite side sizes
			// as in smallest angle is across from smallest side
			// largest angle is across from largest size, etc.
			var temp = [angle1, angle2, angle3]; // largets to smallest
			that.angles = [temp[order[1]], temp[order[2]], temp[order[0]]];

			var nextAngle = that.angles[1];
			var backX = Math.cos(nextAngle * Math.PI / 180) * b;
			var upY = Math.sin(nextAngle * Math.PI / 180) * b;

			var width = Math.max(a, a-backX);
			var height = upY
			that.setBounds(0,0,width,height);
			tri.y = height;

			g.lt(a-backX,0-upY);
			that.three={x:a-backX,y:0-upY};
			g.cp();

			if (center) {
				that.regX = width/2;
				that.regY = height/2+adjust;
			}
		}

		Object.defineProperty(that, 'color', {
			get: function() {
				return _color;
			},
			set: function(value) {
				if (zot(value)) value = "black";
				_color = value;
				colorObj.style = _color;
			}
		});
		Object.defineProperty(that, 'borderColor', {
			get: function() {
				return _borderColor;
			},
			set: function(value) {
				_borderColor = value;
				if (!borderColorObj) drawShape();
				else borderColorObj.style = _borderColor;
			}
		});
		Object.defineProperty(that, 'borderWidth', {
			get: function() {
				return _borderWidth;
			},
			set: function(value) {
				if (!(value>0)) value = 0;
				_borderWidth = value;
				if (!borderWidthObj || _borderWidth == 0) drawShape();
				else {
					borderWidthObj.width = _borderWidth;
					if (dashed) {
						borderDashedObj.segments = [20, 10];
						borderDashedObj.offset = 5;
					}
				}
			}
		});
		this.clone = function() {
			return that.cloneProps(new zim.Triangle(a, b, c, color, borderColor, borderWidth, center, adjust, dashed));
		}
	}
	zim.extend(zim.Triangle, zim.Container, "clone", "zimContainer");
	//-53

/*--
zim.Label = function(text, size, font, color, rollColor, shadowColor, shadowBlur, align, valign, lineWidth, lineHeight, fontOptions, backing, outlineColor, outlineWidth)

Label
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Makes a label - wraps the createjs Text object.
Can use with Button, CheckBox, RadioButtons and Pane.
Text seems to come in different sizes so we do our best.
Have tended to find that left and alphabetic are most consistent across browsers.
Custom fonts loaded through css can be used as well.
NOTE: can wrap text at given width using lineWidth parameter.

EXAMPLE
var label = new zim.Label("Hello");
label.center(stage); // adds label to and centers on the stage

var label = new zim.Label({
	text:"CLICK",
	size:100,
	font:"courier",
	color:"white",
	rollColor:"red",
	fontOptions:"italic bold"
});
stage.addChild(label);
label.x = label.y = 100;
label.on("click", function(){zog("clicking");});
END EXAMPLE

PARAMETERS - supports DUO - parameters or single object with properties below
text - String for the the text of the label
size - (default 36) the size of the font in pixels
font - (default arial) the font or list of fonts for the text
color - (default "black") color of font (any CSS color)
rollColor - (default color) the rollover color of the font
shadowColor - (default -1) for no shadow - set to any css color to see
shadowBlur - (default 14) if shadow is present
align - ((default "left") text registration point alignment also "center" and "right"
valign - (default "top") vertical registration point alignment alse "middle / center", "bottom"
lineWidth - (default false) for no wrapping (use \n) Can set to number for wrap
lineHeight - (default getMeasuredLineHeight) set to number to adjust line height
fontOptions - (default null) css VALUES as a single string for font-style font-variant font-weight
	eg. "italic bold small-caps" or just "italic", etc.
backing - (default null) a Display object for the backing of the label (eg. Shape, Bitmap, Container, Sprite)
	see ZIM Pizzazz module for a fun set of Shapes like Boomerangs, Ovals, Lightning Bolts, etc.
outlineColor - (default null - or black if outlineWidth set) - the color of the outline of the text
outlineWidth - (default null - or (size*.2) if outlineColor set) - the thickness of the outline of the text

METHODS
showRollColor(boolean) - true to show roll color (used internally)
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - to get rid of the button and listeners

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
label - references the text object of the label
color - gets or sets the label text color
rollColor - gets or sets the label rollover color
text - references the text property of the text object
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
backing - access to backing object
enabled - default is true - set to false to disable

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, compositeOperation, etc.

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties

EVENTS
See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+54
	zim.Label = function(text, size, font, color, rollColor, shadowColor, shadowBlur, align, valign, lineWidth, lineHeight, fontOptions, backing, outlineColor, outlineWidth) {

		var sig = "text, size, font, color, rollColor, shadowColor, shadowBlur, align, valign, lineWidth, lineHeight, fontOptions, backing, outlineColor, outlineWidth";
		var duo; if (duo = zob(zim.Label, arguments, sig, this)) return duo;
		z_d("54");
		this.zimContainer_constructor();

		if (zot(text)) text="LABEL";
		if (text === "") text = " ";
		if (zot(size)) size=36;
		if (zot(font)) font="arial";
		if (zot(color)) color="black";
		if (zot(rollColor)) rollColor=color;
		if (zot(shadowColor)) shadowColor=-1;
		if (zot(shadowBlur)) shadowBlur=14;
		if (zot(align)) align="left";
		if (zot(valign)) valign="top";
		if (zot(fontOptions)) fontOptions="";
		if (!zot(outlineColor) && zot(outlineWidth)) outlineWidth = Math.round(size*.2);
		if (!zot(outlineWidth) && zot(outlineColor)) outlineColor = "#000000";
		if (zot(outlineWidth)) outlineWidth = 0;

		var that = this;
		this.mouseChildren = false;

		var obj = this.label = new createjs.Text(String(text), fontOptions + " " + size + "px " + font, color);
		obj.textAlign = align;
		obj.lineWidth = lineWidth;
		obj.lineHeight = lineHeight;
		obj.textBaseline = "alphabetic";
		if (outlineWidth > 0) {
			var obj2 = this.outlineLabel = obj.clone();
			obj2.color = outlineColor;
			obj2.outline = outlineWidth;
			this.addChild(obj2);
		}
		if (shadowColor != -1 && shadowBlur > 0) obj.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);
		this.addChild(obj);

		function setSize() {
			var b = obj.getBounds();
			var yAdjust;
			if (valign == "top") {
				obj.y = size-size/6;
				if (obj2) obj2.y = size-size/6;
				yAdjust = 0;
			} else if (valign == "center" || valign == "middle") {
				yAdjust = - b.height / 2;
				obj.y = size*.3;
				if (obj2) obj2.y = size*.3;
			} else { // bottom align
				yAdjust = -b.height;
			}
			if (backing) {
				var bb = backing.getBounds();
				that.setBounds(bb.x, bb.y, bb.width, bb.height);
			} else {
				that.setBounds(b.x, yAdjust, b.width, b.height);
				hitArea.graphics.c().f("black").r(that.getBounds().x, that.getBounds().y, that.getBounds().width, that.getBounds().height);
			}
			zim.center(obj, that);
			obj.y += size/32; // backing often on capital letters without descenders - was /16
			if (obj2) {
				zim.center(obj2, that,0);
				obj2.y += size/32;
			}
		}
		if (zot(backing)) {
			var hitArea = new createjs.Shape();
			that.hitArea = hitArea;
		}
		setSize();

		if (!zot(backing)) {
			this.backing = backing;
		 	zim.center(backing, this, true, 0);
		}

		Object.defineProperty(that, 'text', {
			get: function() {
				var t = (obj.text == " ") ? "" : obj.text;
				return t;
			},
			set: function(value) {
				if (zot(value) || value === "") {value = " ";}
				obj.text = String(value);
				if (obj2) obj2.text = String(value);
				setSize();
			}
		});

		Object.defineProperty(that, 'color', {
			get: function() {
				return color;
			},
			set: function(value) {
				if (rollColor == color) rollColor = value;
				color = value;
				obj.color = color;
				if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
			}
		});

		Object.defineProperty(that, 'outlineColor', {
			get: function() {
				return outlineColor;
			},
			set: function(value) {
				outlineColor = value;
				if (obj2) obj2.color = outlineColor;
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
			return that.cloneProps(new zim.Label(that.text, size, font, color, rollColor, shadowColor, shadowBlur, align, valign, lineWidth, lineHeight, fontOptions,
				!zot(backing)?backing.clone():null, outlineColor, outlineWidth));
		}

		this.dispose = function() {
			that.removeAllEventListeners();
			return true;
		}
	}
	zim.extend(zim.Label, zim.Container, "clone", "zimContainer");
	//-54

/*--
zim.Button = function(width, height, label, color, rollColor, borderColor, borderWidth, corner, shadowColor, shadowBlur, hitPadding, gradient, gloss, flatBottom, backing, rollBacking, rollPersist, icon, rollIcon, toggle, rollToggle, toggleEvent, dashed)

Button
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Makes a button with rollover and many more features - see parameters.
You will need to pass in a zim.Label to change the font properties of the button from the default.
You will then need to add the button to the stage and add a mousedown or click event.
Button rollover is done automatically.

You can set a backing display object (Shape, Bitmap, etc.) in place of the standard rectangle.
You can set an icon display object in place of the standard text
You can set the Button to toggle between text, backings or icons
SEE the ZIM Pizzazz series for a growing selection of backings and icons
http://zimjs.com/code/bits/view/pizzazz.html
http://zimjs.com/code/bits/view/icons.html


EXAMPLE
var button = new zim.Button("CLICK");
button.center(stage);
button.on("click", function(){zog("clicking");});

// OR add custom label (needed to change label color for instance)
var label = new zim.Label({
	text:"POWER OPTION",
	size:40,
	color:"violet",
	fontOptions:"bold"
});
var button = new zim.Button({
	label:label,
	width:390,
	height:110,
	color:"purple",
	rollColor:"MediumOrchid",
	borderWidth:8,
	borderColor:"violet",
	gradient:.3,
	corner:0
});
button.center(stage);
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
width - (default 200) the width of the button
height - (default 60) the height of the button
label - (default "CLICK") ZIM Label or plain text with default settings (white)
color - (default "orange") backing color of button (any CSS color)
rollColor - (default "lightorange") rollover color of button
borderColor - (default null) the color of the border
borderWidth - (default null) thickness of the border
corner - (default 20) the round of the corner (set to 0 for no corner)
shadowColor - (default rgba(0,0,0,.3)) set to -1 for no shadow
shadowBlur - (default 14) how blurred the shadow is if the shadow is set
hitPadding - (default 0) adds extra hit area to the button (good for mobile)
gradient - (default 0) 0 to 1 (try .3) adds a gradient to the button
gloss - (default 0) 0 to 1 (try .1) adds a gloss to the button
flatBottom - (default false) top corners can round and bottom stays flat (used for ZIM Tabs)
backing - (default null) a Display object for the backing of the button (eg. Shape, Bitmap, Container, Sprite)
	see ZIM Pizzazz module for a fun set of Button Shapes like Boomerangs, Ovals, Lightning Bolts, etc.
	http://zimjs.com/code/bits/view/pizzazz.html
rollBacking - (default null) a Display object for the backing of the rolled-on button
rollPersist - (default false) set to true to keep rollover state when button is pressed even if rolling off
icon - (default false) set to display object to add icon at the center of the button and remove label
	http://zimjs.com/code/bits/view/icons.html
rollIcon - (default false) set to display object to show icon on rollover
toggle - (default null) set to string to toggle with label or display object to toggle with icon or if no icon, the backing
rollToggle - (default null) set to display object to toggle with rollIcon or rollBacking if no icon
	there is no rollToggle for a label - that is handled by rollColor on the label
toggleEvent - (default mousedown for mobile and click for not mobile) what event causes the toggle
dashed - (default false) set to true to turn the border to dashed - if the borderColor or borderWidth is provided

METHODS
setBackings(newBacking, newRollBacking) - dynamically set backing and rollBacking on button (both default to null and if empty, removes backings)
setIcons(newIcon, newRollIcon) - dynamically set icon and rollIcon on button (both default to null and if empty, removes icons)
toggle(state) - forces a toggle of label if toggle param is string, else toggles icon if icon is set or otherwise toggles backing
	state defaults to null so just toggles
	pass in true to go to the toggled state and false to go to the original state
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - to get rid of the button and listeners

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
text - references the text property of the Label object of the button
label - gives access to the label
backing - references the backing of the button
rollBacking - references the rollBacking (if set)
icon - references the icon of the button (if set)
rollIcon - references the rollIcon (if set)
toggleObj - references the toggle object (string or display object if set)
rollToggle - references the rollToggle (if set)
toggled - true if button is in toggled state, false if button is in original state
enabled - default is true - set to false to disable
rollPersist - default is false - set to true to keep rollover state when button is pressed even if rolling off
color - get or set non-rolled on backing color (if no backing specified)
rollColor - get or set rolled on backing color
focus - get or set the focus property of the Button used for tabOrder

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, compositeOperation, etc.

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties
for example seeing toggle take effect

EVENTS
See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+55
	zim.Button = function(width, height, label, color, rollColor, borderColor, borderWidth, corner, shadowColor, shadowBlur, hitPadding, gradient, gloss, flatBottom, backing, rollBacking, rollPersist, icon, rollIcon, toggle, rollToggle, toggleEvent, dashed) {

		var sig = "width, height, label, color, rollColor, borderColor, borderWidth, corner, shadowColor, shadowBlur, hitPadding, gradient, gloss, flatBottom, backing, rollBacking, rollPersist, icon, rollIcon, toggle, rollToggle, toggleEvent, dashed";
		var duo; if (duo = zob(zim.Button, arguments, sig, this)) return duo;
		z_d("55");
		this.zimContainer_constructor();

		if (zot(width)) width=200;
		if (zot(height)) height=60;
		if (zot(color)) color="#C60";
		if (zot(rollColor)) rollColor="#F93";
		if (zot(borderColor)) borderColor=null;
		if (zot(borderWidth)) borderWidth=null;
		if (zot(corner)) corner=20;
		if (zot(shadowColor)) shadowColor="rgba(0,0,0,.3)";
		if (zot(shadowBlur)) shadowBlur=14;
		if (zot(hitPadding)) hitPadding=0;
		if (zot(gradient)) gradient = 0;
		if (zot(gloss)) gloss = 0;
		if (zot(flatBottom)) flatBottom = false;
		if (zot(label)) {if (zot(icon)) {label = "PRESS";} else {label = "";}}
		if (!zot(toggle) && zot(toggleEvent)) toggleEvent = zim.mobile()?"mousedown":"click";
		// text, size, font, color, rollColor, shadowColor, shadowBlur, align, valign
		if (typeof label === "string" || typeof label === "number") label = new zim.Label(label, 36, "arial", "white", null, null, null, "center", "middle");
		if (zot(rollPersist)) rollPersist = false;
		this.rollPersist = rollPersist;
		if (zot(dashed)) dashed = false;

		var that = this;
		this.mouseChildren = false;
		this.cursor = "pointer";
		that.focus = false;

		var buttonBacking;
		if (zot(backing)) {
			buttonBacking = new zim.Rectangle(width,height,color,borderColor,borderWidth,corner,flatBottom,dashed);
		} else {
			buttonBacking = backing;
			buttonBacking.x = width / 2;
			buttonBacking.y = height / 2;
			if (!zot(rollBacking)) {
				rollBacking.x =  width / 2;
				rollBacking.y = height / 2;
				this.rollBacking = rollBacking;
			}
		}
		this.addChild(buttonBacking);
		this.backing = buttonBacking;

		if (!zot(icon)) {
			this.addChild(icon);
			icon.x = width/2;
			icon.y = height/2;
			this.icon = icon;
		}
		if (!zot(rollIcon)) {
			this.rollIcon = rollIcon;
			rollIcon.x = width/2;
			rollIcon.y = height/2;
		}

		var corner2 = (flatBottom) ? 0 : corner;

		if (gradient > 0 && zot(backing)) { // add an overlay
			var gr = new createjs.Shape();
			gr.graphics.lf(["rgba(255,255,255,"+gradient+")","rgba(0,0,0,"+gradient+")"], [0, 1], 0, 0, 0, height-borderWidth);
			gr.graphics.rc(borderWidth/2, borderWidth/2, width-borderWidth, height-borderWidth, corner, corner, corner2, corner2);
			buttonBacking.addChild(gr);
		}

		if (gloss > 0 && zot(backing)) { // add an overlay
			var gl = new createjs.Shape();
			gl.graphics.f("rgba(255,255,255,"+gloss+")");
			gl.graphics.rc(borderWidth/2, borderWidth/2, width-borderWidth, (height-borderWidth)/2, corner, corner, 0, 0);
			gl.graphics.f("rgba(0,0,0,"+gloss+")");
			gl.graphics.rc(borderWidth/2, height/2, width-borderWidth, (height-borderWidth)/2, 0, 0, corner2, corner2);
			buttonBacking.addChild(gl);
		}

		if (hitPadding > 0) {
			var rect = new createjs.Shape();
			rect.graphics.f("#000").r(-hitPadding,-hitPadding,width+hitPadding*2,height+hitPadding*2);
			this.hitArea = rect;
		}

		if (shadowColor != -1 && shadowBlur > 0) {
			buttonBacking.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);
			if (!zot(rollBacking)) rollBacking.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);
		}
		this.setBounds(0,0,width,height);
		this.addChild(label);
		label.center(this);
		label.y+=2;
		this.label = label;

		var pressCheck = false;
		this.on("mousedown", function(){pressCheck=true;});
		this.on("pressup", function(){
			pressCheck=false;
			if (that.rollPersist && !rollCheck) removeRoll();
		});

		var rollCheck = false;
		this.on("mouseover", buttonOn);
		function buttonOn(e) {
			rollCheck = true;
			if (zot(backing)) {
				buttonBacking.color = rollColor;
			} else if (!zot(rollBacking)) {
				if (zot(icon)) {
					if (that.toggled) {
						that.removeChild(toggle);
						that.addChildAt(rollToggle, 0);
					} else {
						that.removeChild(backing);
						that.addChildAt(rollBacking, 0);
					}
				} else {
					that.removeChild(backing);
					that.addChildAt(rollBacking, 0);
				}
			}
			if (!zot(rollIcon)) {
				if (that.toggled) {
					that.removeChild(toggle);
					that.addChild(rollToggle);
				} else {
					that.removeChild(icon);
					that.addChild(rollIcon);
				}
			}
			that.label.showRollColor();
			if (that.getStage()) that.getStage().update();
		}

		this.on("mouseout", buttonOff); // thanks Maxime Riehl
		function buttonOff(e) {
			rollCheck = false;
			that.off("mouseout", buttonOff);
			if (that.rollPersist) {
				if (!pressCheck) removeRoll();
			} else {
				removeRoll();
			}
		}
		function removeRoll() {
			if (zot(backing)) {
				buttonBacking.color = color;
			} else if (!zot(rollBacking)) {
				if (zot(icon)) {
					if (that.toggled) {
						that.removeChild(rollToggle);
						that.addChildAt(toggle, 0);
					} else {
						that.removeChild(rollBacking);
						that.addChildAt(backing, 0);
					}
				} else {
					that.removeChild(rollBacking);
					that.addChildAt(backing, 0);
				}
			}
			if (!zot(rollIcon)) {
				if (that.toggled) {
					that.removeChild(rollToggle);
					that.addChild(toggle);
				} else {
					that.removeChild(rollIcon);
					that.addChild(icon);
				}
			}
			that.label.showRollColor(false);
			if (that.getStage()) that.getStage().update();
		}

		this.toggled = false;
		this.toggleObj = toggle;
		this.rollToggle = rollToggle;
		var toggleFunction;
		var originalText = label.text;
		if (!zot(toggle)) {
			toggleFunction = this.on(toggleEvent, function() {
				that.toggled = !that.toggled;
				setToggled(that.toggled);
			});
		}

		function setToggled() {
			if (typeof toggle == "string") { // change label text
				that.text = that.toggled?toggle:originalText;
				if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
			} else if (!zot(icon)) { // change icons
				that.setIcons(that.toggled?toggle:icon, that.toggled?rollToggle:rollIcon);
			} else { // change backings
				that.setBackings(that.toggled?toggle:backing, that.toggled?rollToggle:rollBacking);
			}
		}

		Object.defineProperty(that, 'text', {
			get: function() {
				var t = (label.text == " ") ? "" : label.text;
				return t;
			},
			set: function(value) {
				label.text = value;
				label.center(this);
				label.y+=2;
			}
		});

		Object.defineProperty(that, 'color', {
			get: function() {
				return color;
			},
			set: function(value) {
				color = value;
				if (buttonBacking.color) {
					buttonBacking.color = color;
				} else {
					if (zon) zog("zim.Button - backing has no color property");
				}
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

		// setBackings does not swap newBacking for newRollBacking but rather
		// the old backing and rollBacking for these new ones - same with setIcons below
		// used internally by toggle but can also be used to dynamically change backings and icons
		// or if parameters left blank to remove backings and icons
		this.setBackings = function(newBacking, newRollBacking) {
			swapObjects("backing", "rollBacking", newBacking, newRollBacking, 0);
		}
		this.setIcons = function(newIcon, newRollIcon) {
			swapObjects("icon", "rollIcon", newIcon, newRollIcon, that.numChildren-1);
		}
		function swapObjects(objName, objRollName, obj, roll, index) {
			if (that.contains(that[objName])) {
				that.removeChild(that[objName]);
				that.addChildAt(obj, index);
			} else if (that.contains(that[objRollName])) {
				that.removeChild(that[objRollName]);
				that.addChildAt(roll, index);
			}
			that[objName] = obj; // be careful - this is assignment
			that[objRollName] = roll;
			if (that[objName]) {
				that[objName].x = width/2;
				that[objName].y = height/2;
			}
			if (that[objRollName]) {
				that[objRollName].x = width/2;
				that[objRollName].y = height/2;
			}
			if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
		}

		this.toggle = function(state) {
			if (zot(state)) {
				that.toggled = !that.toggled;
			} else {
				that.toggled = state;
			}
			setToggled();
		}

		this.clone = function() {
			var but = new zim.Button(
				width, height, label.clone(), color, rollColor, borderColor, borderWidth, corner, shadowColor, shadowBlur, hitPadding, gradient, gloss, flatBottom,
				!zot(backing)?backing.clone():null,
				!zot(rollBacking)?rollBacking.clone():null,
				rollPersist,
				!zot(icon)?icon.clone():null, !zot(rollIcon)?rollIcon.clone():null,
				!zot(toggle)?(typeof toggle == "string"?toggle:toggle.clone()):null,
				!zot(rollToggle)?rollToggle.clone():null,
				toggleEvent, dashed

			);
			return that.cloneProps(but);
		}

		this.dispose = function() {
			that.removeAllEventListeners();
			that.removeChild(buttonBacking);
			that.removeChild(rollBacking);
			that.removeChild(icon);
			that.removeChild(that.label);
			if (that.label) that.label.dispose();
			buttonBacking = null;
			rollBacking = null;
			icon = null;
			that.label = null;
			return true;
		}
	}
	zim.extend(zim.Button, zim.Container, "clone", "zimContainer", false);
	//-55

/*--
zim.CheckBox = function(size, label, startChecked, color, margin, type)

CheckBox
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
A checkbox that when pressed toggles the check and a checked property.

EXAMPLE
var checkBox = new zim.CheckBox(50, "TEST");
checkBox.center(stage);
checkBox.on("change", function() {
	zog(checkBox.checked); // will be true then false, etc.
});
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
size - (default 60) size in pixels (always square)
label - (default null) ZIM Label object - or String to make a default label (black)
startChecked - (default false) an initial parameter to set checked if true
color - (default "#111") the stroke and text color - background is set to a .5 alpha white
margin - (default 10) is on outside of box so clicking or pressing is easier
type - (default check) could be square (box) or x

METHODS
setChecked(Boolean) - defaults to true to set button checked (or use checked property)
clone() - makes a copy with properties such as x, y, etc. also copied

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
checked - gets or sets the check of the box
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
label - gives access to the label
text - the text of the label
check - gives access to the check mark ie. check.color = "blue";
color - gets or sets the color of the check
enabled - default is true - set to false to disable

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, compositeOperation, etc.

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

EVENTS
dispatches a "change" event when pressed on but not when the checked property is set

ALSO: See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+56
	zim.CheckBox = function(size, label, startChecked, color, margin, type) {

		var sig = "size, label, startChecked, color, margin, type";
		var duo; if (duo = zob(zim.CheckBox, arguments, sig, this)) return duo;
		z_d("56");
		this.zimContainer_constructor();

		if (zot(size)) size = 60;
		if (zot(label)) label = null;
		if (typeof label === "string" || typeof label === "number") label = new zim.Label(label, size*5/6, "arial", color);
		var myChecked = (zot(startChecked)) ? false : startChecked;
		if (zot(color)) color = "#111";
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

		this.clone = function() {
			return that.cloneProps(new zim.CheckBox(size, label.clone(), startChecked, color, margin, type));
		}

		this.dispose = function() {
			that.removeAllEventListeners();
			return true;
		}
	}
	zim.extend(zim.CheckBox, zim.Container, "clone", "zimContainer", false);
	//-56

/*--
zim.RadioButtons = function(size, buttons, vertical, color, spacing, margin, always)

RadioButtons
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
A radio button set that lets you pick from choices.
Radio buttons can display radio buttons vertically (default) or horizontally.

EXAMPLE
var radioButtons = new zim.RadioButtons(50, ["ONE", "TWO", "THREE"]);
radioButtons.center(stage);
radioButtons.on("change", function() {
	zog(radioButtons.text); // will be ONE, TWO or THREE
	zog(radioButtons.selectedIndex); // will be 0, 1, or 2
});
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
size - (default 60) in pixels
buttons - an array of button data objects as follows:
	[{label:ZIM Label or text, id:optional id, selected:optional Boolean}, {etc...}]
	or just a list of labels for default labels ["hi", "bye", "what!"]
vertical - (default true) displays radio buttons vertically - set to false to display horizontally
color - (default "#111") the stroke and font color - background is set to a .5 alpha white
spacing - (size*.2 for vertical and size for horizontal) the space between radio button objects
margin - (size/5) the space around the radio button itself
always - (default false) if set true, cannot click on selection to unselect it

METHODS
setSelected(num) - sets the selected index (or use selectedIndex) -1 is default (none)
clone() - makes a copy with properties such as x, y, etc. also copied

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
selected - gets the selected object - selected.label, selected.id, etc.
selectedIndex - gets or sets the selected index of the buttons
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
label - current selected label object
text - current selected label text
id - current selected id
labels - an array of the ZIM Label objects. labels[0].text = "YUM"; labels[2].y -= 10;
dots - an array of the zim Shape dot objects. dots[0].color = "yellow";
enabled - default is true - set to false to disable

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, compositeOperation, etc.

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

ALSO: See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+57
	zim.RadioButtons = function(size, buttons, vertical, color, spacing, margin, always) {

		var sig = "size, buttons, vertical, color, spacing, margin, always";
		var duo; if (duo = zob(zim.RadioButtons, arguments, sig, this)) return duo;
		z_d("57");
		this.zimContainer_constructor();

		if (zot(size)) size = 60;
		size = Math.max(5, size);
		if (zot(buttons)) buttons = ["A", "B", "C"];
		if (zot(vertical)) vertical = true;
		if (zot(color)) color = "#111";
		if (zot(spacing)) spacing = (vertical) ? size*.2 : size;
		if (zot(margin)) margin =  size/5;

		var that = this;
		this.cursor = "pointer";
		this.labels = [];
		this.dots = [];
		var currentObject; // reference to the current data object
		if (typeof buttons == "string") {
			// convert to buttons object literal (for cloning)
			var bString = buttons;
			buttons = [];
			for (var i=0; i<bString.length; i++) {
				buttons.push({label:bString[i]});
			}
		}

		var buttonContainer = new zim.Container();
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
				buttons[i] = data; // for cloning
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
			var but = new zim.Container();
			but.mouseChildren = false;
			but.setBounds(-margin, -margin, size+margin*2, size+margin*2);

			var box = new createjs.Shape();
			var g = box.graphics;
			g.f("rgba(255,255,255,.5)").dc(size/2,size/2,size/1.85);
			g.s(color).ss(size/9).dc(size/2, size/2, size/2-size/2/5);
			but.addChild(box);

			var check = but.check = new zim.Circle(size/5.2, "rgba(0,0,0,.7)");
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

		this.clone = function() {
			var buttonsCopy = zim.copy(buttons);
			for (var i=0; i<buttonsCopy.length; i++) {
				buttonsCopy[i].label = buttonsCopy[i].label.clone();
			}
			return that.cloneProps(new zim.RadioButtons(size, buttonsCopy, vertical, color, spacing, margin, always));
		}

		this.dispose = function() {
			that.removeAllEventListeners();
			return true;
		}
	}
	zim.extend(zim.RadioButtons, zim.Container, "clone", "zimContainer", false);
	//-57

/*--
zim.Pane = function(container, width, height, label, color, drag, resets, modal, corner, backingAlpha, shadowColor, shadowBlur, center, displayClose, backing, fadeTime)

Pane
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Adds a window for alerts, etc.
You need to call the pane.show() to show the pane and pane.hide() to hide it.
You do not need to add it to the stage - it adds itself centered.
You can change the x and y (the origin and registration point are in the middle).

EXAMPLE
var pane = new zim.Pane(stage, 300, 200, "Watch out!", "#CCC");
pane.show(); // pressing anywhere will close pane (see parameters for options)
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
container - container for the pane (usually the stage)
width - (default 200) width of pane
height - (default 200) height of pane
label - (default null) an optional ZIM Label (or text for default label properties)
drag - (default false) pass in true to drag the pane
resets - (default true) resets position to start on re-open - set to false to keep last position
modal - (default true) pane will close when user clicks off the pane - set to false to keep pane open
corner - (default 20) is the corner radius - set to 0 for no corner
backingAlpha - (default .14) the darkness of the background that fills the stage
shadowColor - (default rgba(0,0,0,.3)) set to -1 for no shadow
shadowBlur - (default 20) how blurred the shadow is if shadow is set
center - (default true) centers the pane
	if center is false you will have to set x and y for the pane
	the registration point and the origin inside the pane is in the center
	you can adjust the label placement by changing its x and y or registration point
displayClose - (default true) closes the Pane if display backing is pressed
	if drag is set to true, displayClose will automatically be set to false
backing - (default null) a Display object for the backing of the button (eg. Shape, Bitmap, Container, Sprite)
	see ZIM Pizzazz module for a fun set of Shapes like Boomerangs, Ovals, Lightning Bolts, etc.
fadeTime - (default 0) milliseconds to fade in and out

METHODS
show() - shows the pane (returns the pane for chaining)
hide() - hides the pane
toggle() - shows if hidden and hides if showing (returns the pane for chaining)
clone() - makes a copy with properties such as x, y, etc. also copied (returns the new pane for chaining)
dispose() - removes all events

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
display - reference to the pane box
text - gives access to the label text
label - gives access to the label
backdrop - reference to the backdrop that covers the stage
resetX - if reset is true you can dynamically adjust the position if needed
resetY

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, compositeOperation, etc.

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties
and stage.update() in change event to see component change its graphics

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

EVENTS
dispatches a "close" event when closed by clicking on backing

ALSO: See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+58
	zim.Pane = function(container, width, height, label, color, drag, resets, modal, corner, backingAlpha, shadowColor, shadowBlur, center, displayClose, backing, fadeTime) {

		var sig = "container, width, height, label, color, drag, resets, modal, corner, backingAlpha, shadowColor, shadowBlur, center, displayClose, backing, fadeTime";
		var duo; if (duo = zob(zim.Pane, arguments, sig, this)) return duo;
		z_d("58");
		this.zimContainer_constructor();

		if (zot(container) || !container.getBounds) {zog("zim build - Pane(): Please pass in a reference to a container with bounds set as first parameter");	return;}
		if (!container.getBounds()) {zog("zim build - Pane(): Please give the container bounds using setBounds()"); return;}
		if (zot(container.getStage)) {zog("zim build - Pane(): The container must have a stage property"); return;}

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
		if (zot(displayClose)) displayClose=true;
		if (drag) displayClose = false;
		if (zot(fadeTime)) fadeTime=0;

		var backdrop = this.backdrop = new createjs.Shape();
		// make a big backing that closes the pane when clicked
		// could also provide a close button
		var g = backdrop.graphics;
		g.f("black");
		g.drawRect(-5000,-5000,10000,10000);
		// makes it seem like the pane has the dimensions of the display
		this.setBounds(-width/2,-height/2, width, height);

		backdrop.alpha = backingAlpha;
		var that = this;
		backdrop.on((zim.ACTIONEVENT=="mousedown")?"mousedown":"click", closePane);
		function closePane(e) {
			removePane();
			container.getStage().update();
			that.dispatchEvent("close");
			e.stopImmediatePropagation();
		};
		backdrop.on("mousedown", function(e) {
			e.stopImmediatePropagation();
		});
		if (modal) this.addChild(backdrop);

		var display;
		if (zot(backing)) {
			display = this.display = new createjs.Shape();
			g = display.graphics;
			g.f(color);
			g.rr(0, 0, width, height, corner);
			display.setBounds(0, 0, width, height);
			display.regX = width/2;
			display.regY = height/2;
		} else {
			display = backing;
		}
		if (displayClose) {
			display.cursor = "pointer";
			display.on((zim.ACTIONEVENT=="mousedown")?"mousedown":"click", closePane);
		}
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
				display.cursor = "pointer";
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
			this.addChild(label);
			zim.center(label, this);
			this.label = label;
			this.text = label.text;
			label.mouseEnabled = false;
		}

		Object.defineProperty(that, 'text', {
			get: function() {
				var t = (label.text == " ") ? "" : label.text;
				return t;
			},
			set: function(value) {
				label.text = value;
			}
		});

		this.hide = function() {
			removePane();
		}

		function removePane() {
			if (fadeTime > 0) {
				that.animate({obj:{alpha:0}, time:fadeTime, call:end});
			} else {
				end();
			}
			function end() {
				container.removeChild(that);
				if (!zim.OPTIMIZE) container.getStage().update();
				if (resets) {
					if (!isNaN(that.resetX)) that.x = that.resetX;
					if (!isNaN(that.resetY)) that.y = that.resetY;
				}
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
			if (fadeTime > 0) {
				that.alpha = 0;
				that.animate({alpha:1}, fadeTime);
			} else {
				if (container.getStage()) container.getStage().update();
			}
			return that;
		}
		function checkBounds(x,y) {
			x = Math.max(width/2, Math.min(container.getBounds().width-width/2, x));
			y = Math.max(height/2, Math.min(container.getBounds().height-height/2, y));
			return {x:x,y:y}
		}

		this.toggle = function() {
			if (container.contains(that)) {that.hide();} else {that.show();}
			return that;
		}

		this.clone = function() {
			var lX = label.x; // new Panes automatically center the label
			var lY = label.y;
			var p2 = that.cloneProps(new zim.Pane(container, width, height, label.clone(), color, drag, resets, modal, corner, backingAlpha, shadowColor, shadowBlur, center, displayClose, zot(backing)?backing.clone():null, fadeTime));
			p2.label.x = lX;
			p2.label.y = lY;
			return p2;
		}

		this.dispose = function() {
			display.removeAllEventListeners();
			that.removeChild(display);
			display = null;
			return true;
		}
	}
	zim.extend(zim.Pane, zim.Container, "clone", "zimContainer", false);
	//-58

/*--
zim.Window = function(width, height, color, borderColor, borderWidth, padding, corner, swipe, indicatorActive, indicatorDrag, indicatorColor, indicatorAlpha, indicatorFade, slide, slideDamp, slideSnap, interactive, shadowColor, shadowBlur, paddingHorizontal, paddingVertical, scrollWheel, damp)

Window
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Adds a window for content that can be swiped and scrolled.

EXAMPLE
var win = new zim.Window({
	height:300,
	interactive:false,
	padding:0,
	slideDamp:.2
});
var container = new zim.Container(); // make some content
var c; spacing = 10;
for (var i=0; i<4; i++) {
	c = frame.makeCircles();
	c.x = win.width/2;
	c.y = c.width/2 + (c.width+spacing)*i;
	container.addChild(c);
}
win.add(container); // add the content to the window
win.center(stage);
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
width - (default 300) the width of the window
height - (default 200) the heigth of window
color - (default #333) background color (use "rbga(0,0,0,0)" for no background)
borderColor - (default #999) border color
borderWidth - (default 1) the thickness of the border
padding - (default 10) places the content in from edges of border (see paddingHorizontal and paddingVertical)
corner - (default 0) is the rounded corner of the window
swipe - (default auto/true) the direction for swiping set to none / false for no swiping
	also can set swipe to just vertical or horizontal
indicatorActive - (default true) shows indicator (set to false to not)
indicatorDrag - (default false) set to true to be able to drag the indicator
indicatorColor - (default borderColor) the color of the indicator
indicatorAlpha - (default .3) the transparency of the indicator
indicatorFade - (default true) fades indicator unless being used
slide - (default true) Boolean to throw the content when drag/swipe released
slideDamp - (default .6) amount the slide damps when let go 1 for instant, .01 for long slide, etc.
slideSnap - (default "vertical") "auto" / true, "none" / false, "horizontal"
	slides past bounds and then snaps back to bounds when released
	vertical snaps when dragging up and down but not if dragging horizontal
interactive - (default true) allows interaction with content in window
	set to false and whole window will be swipeable but not interactive inside
shadowColor - (default rgba(0,0,0,.3)) the color of the shadow
shadowBlur - (default 20) set shadowBlur to -1 for no drop shadow
paddingHorizontal - (default padding) places content in from top bottom
paddingVertical - (default padding) places content in from left and right
scrollWheel - (default true) scroll vertically with scrollWheel
damp - (default null) set to .1 for instance to damp the scrolling

METHODS
add(obj) - adds obj to content container of window (at padding) must have bounds set
	it is best to position and size obj first before adding
	otherwise if adjusting to outside current content size then call update()
resize(width, height) - resizes the Window without scaling the content (also calls update() for scroll update)
	width and height are optional
update() - resets window scrolling if perhaps the content gets bigger or smaller
clone(recursive) - makes a copy with properties such as x, y, etc. also copied
	recursive (default true) clones the window content as well (set to false to not clone content)
dispose() - removes event listeners from Window and content and removes any Ticker functions

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
** see also the resize(width, height) method to resize the window without resizing the content
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
backing - CreateJS Shape used for backing of Window
content - ZIM Container used to hold added content
indicator - data object that holds the following properties (with defaults):
	you can set after object is made...
	indicator.size = 6; // the width if vertical or the height if horizontal
	indicator.minSize = 12; // for the height if vertical or the width if horizontal
	indicator.spacing = 3 + size + borderWidth / 2;
	indicator.margin = 0; // adds extra space only at end by scrollbars
	indicator.corner = indicator.size / 2;
	indicator.showTime = 500; // ms to fade in
	indicator.fadeTime = 3000; // ms to fade out
scrollX - gets and sets the content x position in the window (this will be negative)
scrollY - gets and sets the content y position in the window (this will be negative)
scrollXMax - gets the max we can scroll in x based on content width - window width (plus padding and margin)
scrollYMax - gets the max we can scroll in y based on content height - window height (plus padding and margin)

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, compositeOperation, etc.

EVENTS
dispatches a "select" event when clicked on in a traditional manner (fast click with little movement)
dispatches a "hoverover" event when rolled on without moving for 300 ms
dispatches a "hoverout" event when not hovering due to movement or mouseout on the window

ALSO: See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+58.1
	zim.Window = function(width, height, color, borderColor, borderWidth, padding, corner, swipe, indicatorActive, indicatorDrag, indicatorColor, indicatorAlpha, indicatorFade, slide, slideDamp, slideSnap, interactive, shadowColor, shadowBlur, paddingHorizontal, paddingVertical, scrollWheel, damp) {

		var sig = "width, height, color, borderColor, borderWidth, padding, corner, swipe, indicatorActive, indicatorDrag, indicatorColor, indicatorAlpha, indicatorFade, slide, slideDamp, slideSnap, interactive, shadowColor, shadowBlur, paddingHorizontal, paddingVertical, scrollWheel, damp";
		var duo; if (duo = zob(zim.Window, arguments, sig, this)) return duo;
		z_d("58.1");
		this.zimContainer_constructor();

		if (zot(width)) width=300;
		if (zot(height)) height=200;
		if (zot(color)) color="#333"; // none
		if (zot(borderColor)) borderColor="#999";
		if (zot(borderWidth)) borderWidth=1; // 0
		if (zot(padding)) padding=10;
		if (zot(corner)) corner=0;
		if (zot(swipe)) swipe=true; // true / auto, vertical, horizontal, false / none
		if (zot(indicatorActive)) indicatorActive=true;
		if (zot(indicatorDrag)) indicatorDrag=false;
		if (zot(indicatorColor)) indicatorColor=borderColor;
		if (zot(indicatorAlpha)) indicatorAlpha=.3;
		if (zot(indicatorFade)) indicatorFade=true;
		if (indicatorDrag) indicatorFade = false;
		if (zot(slide)) slide=true;
		if (zot(slideDamp)) slideDamp=.6;
		if (zot(slideSnap)) slideSnap="vertical"; // true / auto, vertical, horizontal, false / none
		if (zot(interactive)) interactive=true;
		if (zot(shadowColor)) shadowColor="rgba(0,0,0,.3)";
		if (zot(shadowBlur)) shadowBlur=20;
		if (zot(paddingVertical)) paddingVertical=padding;
		if (zot(paddingHorizontal)) paddingHorizontal=padding;
		if (zot(scrollWheel)) scrollWheel = true;

		var that = this;
		this.scrollX = this.scrollY = this.scrollXMax = this.scrollYMax = 0;

		var backing = this.backing = new createjs.Shape();
		this.addChild(backing);

		var mask = new createjs.Shape();
		var mg = mask.graphics;
		// make the mask in the update function
		// when we know if there are vertical and horizontal indicators
		this.addChild(mask);

		var content = this.content = new zim.Container();
		this.addChild(content);
		content.mask = mask;

		if (!interactive) {
			// hitArea makes the whole window draggable
			// but then you can't interact with the content inside the window
			var hitArea = new createjs.Shape();
		}
		if (borderWidth > 0) {
			var border = new createjs.Shape();
			this.addChild(border);
		}

		// we call this function at start and when resize() is called to resize the window without scaling content
		function sizeWindow() {

			that.setBounds(0,0,width,height);

			backing.graphics.f(color).rr(0,0,width,height,corner);
			if (shadowColor != -1 && shadowBlur > 0) backing.shadow = new createjs.Shadow(shadowColor, 8, 8, shadowBlur);

			if (borderWidth > 0) {
				border.graphics.c().s(borderColor).ss(borderWidth).rr(0,0,width,height,corner);
			}
		}
		sizeWindow();


		// indicators are the little scroll bars
		// this exposes an indicator data object so creators can adjust indicator properties
		// note that these properties are set dynamically in the update function
		var indicator = this.indicator = {}; // data object to expose indicator properties
		indicator.size = 6;
		indicator.minSize = indicator.size*2; // if vertical scroll, this is vertical minSize where size is horizontal size
		indicator.spacing = 3.5 + borderWidth / 2;
		indicator.margin = 0;
		indicator.corner = indicator.size / 2;
		indicator.showTime = 500;
		indicator.fadeTime = 3000;

		if (indicatorActive) {
			var hIndicator = this.hIndicator = new zim.Shape();
			var hg = hIndicator.graphics;
			hIndicator.alpha = indicatorAlpha;
			this.addChild(hIndicator);
			if (indicatorDrag) hIndicator.drag({localBounds: true});

			var vIndicator = this.vIndicator = new zim.Shape();
			var vg = vIndicator.graphics;
			vIndicator.alpha = indicatorAlpha;
			this.addChild(vIndicator);
			if (indicatorDrag) vIndicator.drag({localBounds: true});
		}

		var hProportion;
		var vProportion;
		var hCheck;
		var vCheck;
		var gap;
		var contentWidth;
		var contentHeight;

		var hEvent;
		var vEvent;
		var dTimeout;

		this.update = function() {
			if (indicatorActive) {
				// clear the indicators and remake anytime this function is called
				// as these may change as people add and remove content to the Window
				hg.clear(); // horizontal indicator
				vg.clear(); // vertical indicator
			}

			// assume no gap at left and top
			// gap is applied in x if there is a scroll in y
			// gap is applied in y if there is a scroll in x
			gap = (indicatorActive) ? indicator.size+indicator.spacing*2 : 0;
			contentWidth = content.getBounds().width;
			contentHeight = content.getBounds().height;

			// note, the contentWidth and contentHeight include ONE padding
			hCheck = (contentWidth > width-paddingHorizontal && (swipe === true || swipe == "auto" || swipe == "horizontal"));
			vCheck = (contentHeight > height-paddingVertical && (swipe === true || swipe == "auto" || swipe == "vertical"));

			that.scrollXMax = contentWidth+paddingHorizontal*2-width+(vCheck?gap+indicator.margin:0);
            that.scrollYMax = contentHeight+paddingVertical*2-height+(hCheck?gap+indicator.margin:0);

			// set mask dynamically as indicators may come and go affecting the mask size slightly
			mg.clear();
			var xx = borderWidth/2;
			var yy = borderWidth/2;
			var ww = width-((vCheck && indicatorActive)?indicator.size+indicator.spacing*2:0)-(vCheck?0:borderWidth);
			var hh = height-((hCheck && indicatorActive)?indicator.size+indicator.spacing*2:0)-(hCheck?0:borderWidth);
			mg.f("rgba(0,0,0,.01)").rr(xx,yy,ww,hh,corner);

			if (!interactive) {
				hitArea.graphics.c().f("red").dr(xx,yy,ww,hh);
				content.hitArea = hitArea;
			}

			var edgeAdjust = Math.max(corner, Math.min(indicator.corner, indicator.spacing));
			var edgeLeft = edgeAdjust + borderWidth/2;
			var edgeRight = edgeAdjust + (vCheck?gap:0) + borderWidth/2;
			var edgeTop = edgeAdjust + borderWidth/2;
			var edgeBottom = edgeAdjust + (hCheck?gap:0) + borderWidth/2;

			if (hCheck && indicatorActive) {
				indicatorLength = Math.max(indicator.minSize, (width-edgeLeft-edgeRight) * (width-edgeLeft-edgeRight) / (contentWidth + paddingHorizontal + indicator.margin));
				hg.f(indicatorColor).rr(0,0,indicatorLength,indicator.size,indicator.corner);
				hIndicator.x = edgeLeft;
				hIndicator.y = height-indicator.size-indicator.spacing;
				// for swiping window:
				hProportion = new zim.Proportion(-that.scrollXMax, 0, edgeLeft, width-indicatorLength-edgeRight, -1);
				if (indicatorDrag) {
					hIndicator.setBounds(0,0,indicatorLength,indicator.size);
					// drag rect for indicator
					var rect = new createjs.Rectangle(
						edgeLeft, hIndicator.y, width-indicatorLength-edgeLeft-edgeRight, 0
					);
					hIndicator.dragRect(rect);
					hIndicator.proportion = new zim.Proportion(
						rect.x, rect.x+rect.width, 0, -that.scrollXMax
					);
					hIndicator.off("pressmove", hEvent);
					hEvent = hIndicator.on("pressmove", function() {
						content.x = hIndicator.proportion.convert(hIndicator.x);
					});
				}
			}

			if (vCheck && indicatorActive) {
				indicatorLength = Math.max(indicator.minSize, (height-edgeTop-edgeBottom) * (height-edgeTop-edgeBottom) / (contentHeight + paddingVertical + indicator.margin));
				vg.f(indicatorColor).rr(0,0,indicator.size,indicatorLength,indicator.corner);
				vIndicator.x = width-indicator.size-indicator.spacing;
				vIndicator.y = edgeTop;
				// for swiping window:
				vProportion = new zim.Proportion(-that.scrollYMax, 0, edgeTop, height-indicatorLength-edgeBottom, -1);
				if (indicatorDrag) {
					vIndicator.setBounds(0,0,indicator.size,indicatorLength);
					// drag rect for indicator
					var rect = new createjs.Rectangle(
						vIndicator.x, edgeTop, 0, height-indicatorLength-edgeTop-edgeBottom
					);
					vIndicator.dragRect(rect);
					vIndicator.proportion = new zim.Proportion(
						rect.y, rect.y+rect.height, 0, -that.scrollYMax
					);
					vIndicator.off("pressmove", vEvent);
					vEvent = vIndicator.on("pressmove", function() {
						desiredY = content.y = vIndicator.proportion.convert(vIndicator.y);
					});
				}
			}
			moveIndicators();
			clearTimeout(dTimeout);
			dTimeout = setTimeout(function(){setDragRect();}, 300);
		}

		this.resize = function(w, h) {
			if (zot(w)) w = width;
			if (zot(h)) h = height;
			width = w;
			height = h;
			sizeWindow();
			that.update();
			desiredY = content.y;
			if (damp) dampY.immediate(desiredY);
		}

		// METHODS to add and remove content from Window
		this.add = function(c) {
			makeDamp(c);
			if (!c.getBounds()) {zog("SwipeBox.add() - please add content with bounds set"); return;}
			content.addChild(c);
			if (c.x == 0) c.x = paddingHorizontal;
			if (c.y == 0) c.y = paddingVertical;
			that.update();
		}

		this.remove = function(c) {
			content.removeChild(c);
			that.update();
		}

		function setDragRect() {
			zim.dragRect(content, new createjs.Rectangle(0, 0, hCheck?-that.scrollXMax:0, vCheck?-that.scrollYMax:0));
		}

		var swipeCheck = false;
		if (swipe) {
			content.on("mousedown", function() {
				if (!swipeCheck) zim.Ticker.add(swipeMoveIndicators, content.stage);
				swipeCheck = true;
				if (hCheck && indicatorActive) if (indicatorFade) zim.animate(hIndicator, {alpha:indicatorAlpha}, indicator.showTime);
				if (vCheck && indicatorActive) if (indicatorFade) zim.animate(vIndicator, {alpha:indicatorAlpha}, indicator.showTime);
			});
		}

		function swipeMoveIndicators() {
			// this is being called by the swipe which has its own damping
			// so we need to set the desiredY and then move the indicators
			// as the moveIndicators needs to run independently - so both types of damp can controll it
			desiredY = content.y;
			if (damp) dampY.immediate(desiredY);
			if (indicatorActive) moveIndicators();
		}

		function moveIndicators() {
			if (hitArea) {
				// move hitarea to display box
				hitArea.x = -content.x;
				hitArea.y = -content.y;
			}
			if (hCheck && indicatorActive) hIndicator.x = hProportion.convert(content.x);
			if (vCheck && indicatorActive) vIndicator.y = vProportion.convert(content.y);
		}

		// may add content before adding Window to stage...
		this.on("added", setDrag, null, true);
		function setDrag() {
			makeDamp(that);
			if (!swipe) return;
			zim.drag({
				obj:content,
				currentTarget:true,
				localBounds:true,
				slide:slide, slideDamp:slideDamp,
				slideSnap:(swipe===true||swipe=="auto"||swipe=="vertical")?slideSnap:false
			});
			if (content.getBounds() && content.getBounds().width > 0) {
				setTimeout(function(){setDragRect();}, 300);
			}
		}

		if (slide) {
			content.on("slidestop", stageUp);
		} else {
			content.on("mousedown", function() {
				content.stage.on("stagemouseup", stageUp, null, true);
			});
		}

		function stageUp(e) {
			zim.Ticker.remove(swipeMoveIndicators);
			swipeCheck = false;
			if (hCheck) if (indicatorFade) zim.animate(hIndicator, {alpha:0}, indicator.fadeTime);
			if (vCheck) if (indicatorFade) zim.animate(vIndicator, {alpha:0}, indicator.fadeTime);
		}

		if (interactive) {
			// dispatches SELECT (click) and HOVEROVER (500 ms) and gives mouseX and mouseY on content
			// CLICKS (in the traditional sense rather than a mouseup replacement)
			var downLoc;
			var downTime;
			content.on("mousedown", function(){downLoc=content.stage.mouseX; downTime=Date.now();});
			content.on("click", function(){
				if (Date.now()-downTime<600 && Math.abs(content.stage.mouseX-downLoc)<5) {
					that.contentMouse = content.globalToLocal(content.stage.mouseX, content.stage.mouseY);
					that.dispatchEvent("select");
				}
			});
			// HOVER (must stay within thresh pixels for pauseTime ms)
			content.on("mouseover", moveOn);
			content.on("mouseout", moveOff);
			var startTime;
			function moveOn() {
				startTime=Date.now();
				zim.Ticker.add(timeMouse, content.stage);
			}
			function moveOff() {
				if (!hoverOutCalled) {
					that.dispatchEvent("hoverout");
					hoverOutCalled = true;
				}
				zim.Ticker.remove(timeMouse);
			}
			var lastMouseX = 0;
			var lastMouseY = 0;
			var lastReportX = 0;
			var lastReportY = 0;
			var pauseTime = 300;
			var thresh = 2;
			var hoverOutCalled = false;
			function timeMouse() {
				if (Math.abs(lastMouseX-content.stage.mouseX) > thresh || Math.abs(lastMouseY-content.stage.mouseY) > thresh) {
					if (!hoverOutCalled) {
						that.dispatchEvent("hoverout");
						hoverOutCalled = true;
					}
					startTime=Date.now();
					lastMouseX=content.stage.mouseX;
					lastMouseY=content.stage.mouseY;
				} else {
					if (Date.now()-startTime > pauseTime) {
						if (Math.abs(lastReportX-content.stage.mouseX) > thresh || Math.abs(lastReportY-content.stage.mouseY) > thresh) {
							that.contentMouse = content.globalToLocal(content.stage.mouseX, content.stage.mouseY);
							that.dispatchEvent("hoverover");
							lastReportX=content.stage.mouseX;
							lastReportY=content.stage.mouseY;
							hoverOutCalled = false;
						}
						startTime=Date.now();
					}
				}
			}
		}

		var scrollEvent1;
		var scrollEvent2;
		desiredY = that.scrollY;
		if (scrollWheel) {
			scrollEvent1 = window.addEventListener("mousewheel", scrollWindow);
			scrollEvent2 = window.addEventListener("DOMMouseScroll", scrollWindow);
			function scrollWindow(e) {
				if (vCheck) {
					if (zot(e)) e = event;
					var delta = e.detail ? e.detail*(-19) : e.wheelDelta;
					desiredY += delta;
					desiredY = Math.max(-that.scrollYMax, Math.min(0, desiredY))
					if (!damp) {
						that.scrollY = desiredY;
						content.stage.update();
					}
				}
			}
		}
		var dampCheck = false;
		var dampY;
		function makeDamp(obj) {
			if (damp && !dampCheck && obj.getStage()) {
				dampCheck = true;
				dampY = new zim.Damp(that.scrollY, damp);
				zim.Ticker.add(function() {
					if (swipeCheck) return;
					if (!zot(desiredY)) that.scrollY = dampY.convert(desiredY);
				}, obj.getStage());
			}
		}

		Object.defineProperty(that, 'scrollX', {
			get: function() {
				return content.x;
			},
			set: function(value) {
				content.x = value;
				moveIndicators();
			}
		});

		Object.defineProperty(that, 'scrollY', {
			get: function() {
				return content.y;
			},
			set: function(value) {
				content.y = value;
				moveIndicators();
			}
		});

		this.clone = function(recursive) {
			if (zot(recursive)) recursive = true;
			var w = that.cloneProps(new zim.Window(width, height, color, borderColor, borderWidth, padding, corner, swipe, indicatorActive, indicatorDrag, indicatorColor, indicatorAlpha, indicatorFade, slide, slideDamp, slideSnap, interactive, shadowColor, shadowBlur, paddingHorizontal, paddingVertical));
			if (recursive) {
				that.content.cloneChildren(w.content);
				w.update();
			}
			return w;
		}

		this.dispose = function() {
			if (scrollWheel) {
				window.removeEventListener("mousewheel", scrollEvent1);
				window.removeEventListener("DOMMouseScroll", scrollEvent2);
			}
			that.removeAllEventListeners();
			hIndicator.off("pressmove", hEvent);
			vIndicator.off("pressmove", vEvent);
			content.removeAllEventListeners();
			zim.Ticker.remove(timeMouse);
			zim.Ticker.remove(swipeMoveIndicators);
			zim.noDrag(content);
			return true;
		}
	}
	zim.extend(zim.Window, zim.Container, "clone", "zimContainer", false);
	//-58.1

/*--
zim.Waiter = function(container, speed, color, circleColor, corner, shadowColor, shadowBlur, fadeTime)

Waiter
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Adds a little animated three dot wait widget.
You need to call waiter.show() to show the waiter and waiter.hide() to hide it.
You do not need to add it to the stage - it adds itself centered.
You can change the x and y (with origin and registration point in middle).

EXAMPLE
var waiter = new zim.Waiter(stage);
waiter.show(); // show the waiter until assets load
frame.loadAssets("greeting.mp3");
frame.on("complete", function() {
	waiter.hide();
	frame.asset("greeting.mp3").play();
});
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
container - the container that holds the waiter (usually the stage)
speed - (default 600) cycle time in milliseconds
color - (default "orange") the backing color
circleColor - (default "white") the dot color
corner - (default 14) the corner radius of the waiter box
shadowColor - (defaults rgba(0,0,0,.3)) set to -1 for no shadow
shadowBlur - (default 14) the blur of the shadow if shadow is set
fadeTime - (default 0) milliseconds to fade in and out

METHODS
show() - shows the waiter (returns the waiter for chaining)
hide() - hides the waiter
clone() - makes a copy with properties such as x, y, etc. also copied (returns the new waiter for chaining)
dispose() - removes listeners and deletes object

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
display - reference to the waiter backing graphic

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, compositeOperation, etc.

EVENTS
See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+59
	zim.Waiter = function(container, speed, color, circleColor, corner, shadowColor, shadowBlur, fadeTime) {

		var sig = "container, speed, color, circleColor, corner, shadowColor, shadowBlur, fadeTime";
		var duo; if (duo = zob(zim.Waiter, arguments, sig, this)) return duo;
		z_d("59");
		this.zimContainer_constructor();

		if (zot(container) || !container.getBounds) {zog("zim build - Waiter(): Please pass in a reference to a container with bounds set as first parameter");	return;}
		if (!container.getBounds()) {zog("zim build - Waiter(): Please give the container bounds using setBounds()"); return;}
		if (zot(container.getStage)) {zog("zim build - Waiter(): Please give the container that has a stage property"); return;}

		if (zot(speed)) speed=600; // ms cycle time
		if (zot(color)) color="orange";
		if (zot(circleColor)) circleColor="white";
		if (zot(corner)) corner=16;
		if (zot(shadowColor)) shadowColor="rgba(0,0,0,.3)";
		if (zot(shadowBlur)) shadowBlur=14;
		if (zot(fadeTime)) fadeTime=0;

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

		var circles = new zim.Container();
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

		this.hide = function() {
			if (fadeTime > 0) {
				that.animate({obj:{alpha:0}, time:fadeTime, call:end});
			} else {
				end();
			}
			function end() {
				container.removeChild(that);
				container.getStage().update();
			}
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
			if (fadeTime > 0) {
				that.alpha = 0;
				that.animate({alpha:1}, fadeTime);
			}
			return that;
		}

		this.clone = function() {
			return that.cloneProps(new zim.Waiter(container, speed, color, circleColor, corner, shadowColor, shadowBlur, fadeTime));
		}

		this.dispose = function() {
			if (that.ticker) createjs.Ticker.off("tick", that.ticker);
			display.removeAllEventListeners();
			that.removeChild(display);
			that.removeChild(circles);
			display = null;
			circles = null;
			return true;
		}
	}
	zim.extend(zim.Waiter, zim.Container, "clone", "zimContainer", false);
	//-59

/*--
zim.Indicator = function(width, height, num, color, offColor, borderColor, backingColor, type, fill, scale, lightScale, press, shadowColor, shadowBlur)

Indicator
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
A row of dots or squares that can be used to indicate a step, page, level, score, etc.
The indicator can be used as an input as well but often these are small so may not be best to rely on.

EXAMPLE
var lights = new zim.Indicator({fill:true});
lights.selectedIndex = 0; // set the first light on
lights.center(stage);
stage.on("stagemousedown", function() {
	// increase the indicator lights each click (then start over)
	lights.selectedIndex = (lights.selectedIndex+1) % lights.num;
});
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
width - (default 100) width of indicator
height - (default 50) height of indicator
num - (default 6) the number of lights
color - (default "orange") color of the light(s) turned on
offColor - (default "grey") color of the light(s) turned off
borderColor - (default -1 for no border) border color of lights
backingColor - (default -1 for no backing) backing rectangle around lights
type - (default "dot" or "circle") can also be "box" or "square"
fill - (default false) set to true to fill in lights to the left of the selectedIndex
scale - (default 1) for all the lights including spacing
lightScale - (default 1) scale for each light - keeping the spacing unchanged
press - (default false) set to true to make lights clickable
shadowColor - (default rgba(0,0,0,.3)) set to -1 for no shadow
shadowBlur - (default 5) the shadow blur if shadow is set

METHODS
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - removes any listeners

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
selectedIndex - gets or sets the current index of the indicator
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
num - the assigned num value (how many light objects) (read only)
backing - gives access to the backing if there is one zim.Rectangle
lights - an array of the light objects (zim Circle or Rectangle objects)
lightsContainer - gives access to the lights createjs.Container with its zim.Circle or zim.Rectangle children

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, compositeOperation, etc.

EVENTS
dispatches a change event if press is true and indicator is pressed on and lights change

ALSO: See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+60
	zim.Indicator = function(width, height, num, color, offColor, borderColor, backingColor, type, fill, scale, lightScale, press, shadowColor, shadowBlur) {

		var sig = "width, height, num, color, offColor, borderColor, backingColor, type, fill, scale, lightScale, press, shadowColor, shadowBlur";
		var duo; if (duo = zob(zim.Indicator, arguments, sig, this)) return duo;
		z_d("60");
		this.zimContainer_constructor();

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
		this.lights = [];

		var myValue;
		var indicator = new zim.Container();
		if (backingColor != -1) {
			var backing = new zim.Rectangle(width, height, backingColor);
			this.addChild(backing);
			this.backing = backing;
		}
		var lights = this.lightsContainer = new zim.Container();
		this.addChild(lights);
		var light;
		var size = height * .5;
		var space = width / (num+1);
		var hitArea = new createjs.Shape();
		if (type == "square" || type == "box") {
			hitArea.graphics.f("black").dr(-space/2/lightScale+size/2, -height/2+size/2, space/lightScale, height);
		} else {
			hitArea.graphics.f("black").dr(-space/2/lightScale, -height/2, space/lightScale, height);
		}
		for (var i=0; i<num; i++) {
			if (type == "square" || type == "box") {
				light = new zim.Rectangle(size, size, offColor, borderColor);
				light.regX = light.width/2;
				light.regY = light.height/2;
			} else {
				light = new zim.Circle(size/2, offColor, borderColor);
			}
			this.lights.push(light);
			light.znum = i;
			light.scaleX = light.scaleY = lightScale;
			light.hitArea = hitArea;
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
				if (myValue == e.target.znum) return;
				myValue = e.target.znum;
				setLights(myValue);
				that.dispatchEvent("change");
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

		this.clone = function() {
			return that.cloneProps(new zim.Indicator(width, height, num, color, offColor, borderColor, backingColor, type, fill, scale, lightScale, press, shadowColor, shadowBlur));
		}

		this.dispose = function() {
			that.removeAllEventListeners();
			return true;
		}
	}
	zim.extend(zim.Indicator, zim.Container, "clone", "zimContainer", false);
	//-60

/*--
zim.Stepper = function(list, width, color, borderColor, label, vertical, arrows, corner, shadowColor, shadowBlur, loop, display, press, hold, holdDelay, holdSpeed, drag, dragSensitivity, dragRange, type, min, max, step, step2, arrows2, arrows2Scale, keyEnabled, keyArrows, rightForward, downForward)

Stepper
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Lets you step through a list of numbers or strings with arrows and keyboard arrows.
Uses mousedown to activate and defaults to stepping while pressing down
and going faster if you drag away from your press.

EXAMPLE
var stepper = new zim.Stepper();
stepper.on("change", function() {
	zog(stepper.currentIndex);
	zog(stepper.currentValue);
});
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
list - (default 1-10) pass in an array of strings or numbers to display one at a time
width - (default 100) is the width of the text box (you can scale the whole stepper if needed)
color - (default "white") for the arrows and the text box
borderColor - (default null) stroke color for the box
label - (default null) which can be used to define custom text properties
vertical - (default false) set to true if you want the arrows above and below the text
arrows - (default true) - use graphical arrows (also see keyArrows to turn off keyboard arrows)
corner - (default 10) is the radius of the text box corners - set to 0 for square corners
shadowColor - (default rgba(0,0,0,.3)) set to -1 for no drop shadow
shadowBlur - (default 14) value for shadow blur if shadow is set
loop - (default false) set to true to loop around or go back past 0 index
display - (default true) set to false just to just show the arrows and not the value
press - (default true) will advance on label mousedown - set to false to not advance on mousedown
hold - (default true) set to false to not step with extended press down
holdDelay - (default 400 ms) time (milliseconds) to wait for first step with hold
holdSpeed - (default 200 ms) time (milliseconds) between steps as holding
drag - (default true) set to false to not step when dragging
dragSensitivity - (default .1) .01 changes really quickly - 1 changes at base rate
dragRange - (default 200) absolute distance (pixels) from press the drag will reach maximum
type - (default "list") list draws values from list parameters
	also types "number", "letter" - these get ranges below
min - (default 0 for number and "A" for letter) the minimum value (can make min bigger than max) (not for list type)
max - (default 100 for number and "Z" for letter) the maximum value (can make max smaller than min) (not for list type)
step - (default 1) the step value each time - can be decimal (only positive, only for number type)
step2 - (default set to step) the step value when dragging perpendicular to main horizontal or vertical direction
	step2 will run with drag set to true or with arrows2 set below (only positive, only for number type)
arrows2 - (default true if step2 different than step and type number - else false) secondary arrows perpendicular to main horizontal or vertical direction
	arrows2 will activate step2 above (only for number type)
arrows2Scale - (default .5) the scale relative to the main arrows
keyEnabled - (default true) set to false to disable keyboard search / number picker
keyArrows - (default true) set to false to disable keyboard arrows
rightForward - (default true) set to false to make left the forward direction in your list
downForward - (default true except if type is "number" then default false) set to false to make up the forward direction in your list

METHODS
next() - goes to next
prev() - goes to previous
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - removes listeners and deletes object

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
currentIndex - gets or sets the current index of the array and display
currentValue - gets or sets the current value of the array and display
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
stepperArray - gets or sets the list
prev, next - access to the zim Triangle objects (use to position)
arrowPrev, arrowNext - access to the zim Triangle objects
prev2, next2 - access to the arrows2 containers (use to position)
arrowPrev2, arrowNext2 - access to the zim Triangle objects for arrows2
min, max - only for number mode at the monent - currently, do not change the max to be less than the min
label - access to the zim.Label
textBox - access to the text box backing shape
loop - does the stepper loop
enabled - default is true - set to false to disable
focus - get or set the focus for keypress

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, compositeOperation, etc.

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties
and stage.update() in change event to see component change its graphics

EVENTS
dispatches a "change" event when changed by pressing an arrow or a keyboard arrow
(but not when setting currentIndex or currentValue properties)

ALSO: See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+61
	zim.Stepper = function(list, width, color, borderColor, label, vertical, arrows, corner,
			shadowColor, shadowBlur, loop, display, press, hold, holdDelay, holdSpeed, drag, dragSensitivity, dragRange, type, min, max, step, step2, arrows2, arrows2Scale, keyEnabled, keyArrows, rightForward, downForward) {

		var sig = "list, width, color, borderColor, label, vertical, arrows, corner, shadowColor, shadowBlur, loop, display, press, hold, holdDelay, holdSpeed, drag, dragSensitivity, dragRange, type, min, max, step, step2, arrows2, arrows2Scale, keyEnabled, keyArrows, rightForward, downForward";
		var duo; if (duo = zob(zim.Stepper, arguments, sig, this)) return duo;
		z_d("61");
		this.zimContainer_constructor();

		if (zot(list)) list = [0,1,2,3,4,5,6,7,8,9];
		if (zot(width)) width=200;
		if (zot(color)) color="white";
		if (zot(borderColor)) borderColor=null;
		if (zot(label)) label = "";
		if (typeof label === "string" || typeof label === "number") label = new zim.Label(label, 64, "arial", "#555", null, null, null, "center");
		if (zot(vertical)) vertical=false;
		if (zot(arrows)) arrows=true;
		if (zot(corner)) corner=16;
		if (zot(shadowColor)) shadowColor="rgba(0,0,0,.3)";
		if (zot(shadowBlur)) shadowBlur=14;
		if (zot(loop)) loop=false;
		if (zot(display)) display=true;

		if (zot(press)) press=true;
		if (zot(hold)) hold=true;
		if (zot(holdDelay)) holdDelay=400;
		if (zot(holdSpeed)) holdSpeed=200;
		if (zot(drag)) drag=true;
		if (zot(dragSensitivity) || dragSensitivity <= 0) dragSensitivity=.1;
		if (zot(dragRange)) dragRange=200;

		if (zot(type)) type="list";
		if (zot(min)) min=0;
		if (zot(max)) max=100;
		if (zot(step)) step=1;
		if (zot(step2)) step2=step;
		if (zot(arrows2) && step2 != step && type == "number") arrows2=true;
		if (zot(arrows2Scale)) arrows2Scale=.5;
		if (zot(keyEnabled)) keyEnabled = true;
		if (zot(keyArrows)) keyArrows = true;
		if (zot(rightForward)) rightForward = true;
		if (zot(downForward)) downForward = type=="number"?false:true;

		var that = this;
		var index;
		var height = 100;
		var boxSpacing = height/4;

		var actualStep = step; // toggle between step and step2
		var numVal;
		var numDir = 1;
		var letterVal;
		var decimals;
		if (type == "number") {
			min = Number(min);
			max = Number(max);
			if (min == NaN) min = 0;
			if (max == NaN) max = 100;
			if (max < min) {
				numDir = -1;
				var temp = max; // one day ES6
				max = min;
				min = temp;
				numVal = max;
			} else {
				numVal = min;
			}
			this.min = min;
			this.max = max;
			if (0 > min && 0 < max) numVal = 0;
			step = Math.abs(step);
			decimals = Math.max(getDecimals(step), getDecimals(step2));
		} else if (type == "letter") {
			list = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
			if (typeof min != "string") min = "A";
			if (typeof max != "string") max = "Z";
			min = min.substr(0,1).toUpperCase();
			max = max.substr(0,1).toUpperCase();
			var startLetter = list.indexOf(min);
			if (startLetter < 0) {min = "A"; startLetter = 0;}
			var endLetter = list.indexOf(max);
			if (endLetter < 0) {max = "Z"; endLetter = list.length;}
			if (endLetter < startLetter) {
				list.reverse();
				startLetter = list.length-1-startLetter;
				endLetter = list.length-1-endLetter;
			}
			list = list.splice(startLetter, endLetter-startLetter+1);
		} else {
			type = "list";
		}

		function getDecimals(num) {
			var decimals = String(num).split(".")[1]
			if (decimals) {decimals = decimals.length} else {decimals = 0;};
			return decimals;
		}

		var rawEvent;
		var rawX = 0;
		var rawY = 0;

		if (drag) {
			this.on("mousedown", function() {
				this.getStage().mouseMoveOutside = true;
				rawEvent = this.getStage().on("stagemousemove", function(e){
					rawX = e.rawX;
					rawY = e.rawY;
				})
			}, null, true);
		}
		this.label = label;
		label.mouseChildren = false;
		label.mouseEnabled = false;

		var holdCheck = false;
		var delayTimeout;
		var speedTimeout;
		var roundTimeout;
		var clickCheck = false;
		var prev, arrowPrev, next, arrowNext, prev2, arrowPrev2, next2, arrowNext2;
		if (arrows || arrows2) {
			var arrowBacking = new createjs.Shape();
			arrowBacking.graphics.f("rgba(255,255,255,.11)").r(0,0,height*1.5,height*1.5);
			arrowBacking.regX = height*1.5 / 2;
			arrowBacking.regY = height*1.5 / 2 + boxSpacing/2;
		}
		if (arrows) {
			prev = this.prev = new zim.Container();
			this.addChild(prev);
			prev.hitArea = arrowBacking;

			arrowPrev = this.arrowPrev = new zim.Triangle(height, height*.8, height*.8, color);
			if (shadowColor != -1 && shadowBlur > 0) prev.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);
			prev.addChild(arrowPrev);
			prev.cursor = "pointer";

			prev.on("mousedown", function(e) {
				actualStep = step;
				var val = vertical?(downForward?1:-1):(rightForward?-1:1);
				doStep(val);
				go(val);
			})
			if (hold) prev.on("pressup", goEnd);

			if (vertical) {
				prev.rotation = 180;
				prev.x = width/2;
				if (display) {
					prev.y = prev.height + boxSpacing + height + prev.height/2 + boxSpacing;
				} else {
					prev.y = prev.height * 2;
				}
			} else {
				prev.rotation = -90;
				prev.x = prev.height/2;
				prev.y = prev.width/2;
			}
		}

		if (display) {
			var box = this.textBox = new createjs.Shape();
			box.cursor = "pointer";
			this.addChild(box);
			box.setBounds(0, 0, width, height);
			if (borderColor != null) box.graphics.s(borderColor).ss(1.5);
			box.graphics.f(color).rr(0, 0, width, height, corner);
			if (shadowColor != -1 && shadowBlur > 0) box.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);

			if (arrows) {
				if (vertical) {
					if (arrows) box.y = arrowPrev.height + boxSpacing;
				} else {
					if (arrows) box.x = arrowPrev.height + boxSpacing;
				}
			}

			this.addChild(label);
			if (list.length > 0) {
				// index = Math.floor(list.length/2)
				index = 0;
				label.text = list[index];
			}
			label.x = 50+box.x+box.getBounds().width/2;
			label.y = box.y+(box.getBounds().height-label.getBounds().height)/2;

			box.on("mousedown", function(e) {
				if (press) doStep(1);
				go(1, true); // do decimals from box
				if (type == "number") {
					clearTimeout(roundTimeout);
					clickCheck = true;
					roundTimeout = setTimeout(function() {
						clickCheck = false;
					}, 200);
				}
			});
			box.on("pressup", function() {
				if (clickCheck) {
					numVal = Math.round(numVal);
					setLabel(numVal, numVal);
					that.dispatchEvent("change");
				}
			});
		} else {
			if (list.length > 0) {
				index = 0;
			}
		}


		if (arrows) {
			next = this.next = new zim.Container();
			this.addChild(next);
			next.hitArea = arrowBacking.clone();

			arrowNext = this.arrowNext = new zim.Triangle(height, height*.8, height*.8, color);
			if (shadowColor != -1 && shadowBlur > 0) next.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);
			next.addChild(arrowNext);
			next.cursor = "pointer";

			next.on("mousedown", function(e) {
				actualStep = step;
				var val = vertical?(downForward?-1:1):(rightForward?1:-1);
				doStep(val);
				go(val);
			});

			if (hold) next.on("pressup", goEnd);

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
		}


		var holdX;
		var proportion;
		// pressdown and move mouse changes speed and direction of stepper
		function go(dir, both, dec) {
			if (hold) {
				holdX = that.getStage().mouseX;
				holdY = that.getStage().mouseY;
				if (holdX == 0) holdX = 1;
				if (holdY == 0) holdY = 1;
				if (!drag) dragSensitivity = 1;
				proportion = new zim.Proportion(0, dragRange, holdSpeed, holdSpeed*dragSensitivity);
				var dragInput = holdSpeed;
				delayTimeout = setTimeout(function() {
					holdCheck=true;
					function doHold() {
						speedTimeout = setTimeout(function() {
							var dragDir = dir;
							if (drag) {
								// only change direction if outside of 10 pixels from where pressed
								var diffX = Math.abs(rawX - holdX);
								var diffY = Math.abs(rawY - holdY);
								if (vertical) {
									if (!both && !dec) diffX = 0; // don't do decimals
									if (dec) diffY = 0;
								} else {
									if (!both && !dec) diffY = 0; // don't do decimals
									if (dec) diffX = 0;
								}
								if (diffX >= 10 || diffY >= 10) {
									if (diffX > diffY) {
										actualStep = vertical?step2:step;
										dragDir = rawX - holdX > 0 ? 1 : -1;
										if (!rightForward) dragDir*-1;
										dragInput = proportion.convert(Math.abs(holdX-rawX));
									} else {
										actualStep = vertical?step:step2;
										dragDir = rawY - holdY > 0 ? 1 : -1;
										if (type == "number") dragDir *= -1;
										if (!downForward) dragDir*-1;
										dragInput = proportion.convert(Math.abs(holdY-rawY));
									}
								}
							}
							doStep(dragDir);
							doHold();
						}, dragInput);
					}
					doHold();
				}, holdDelay);
			}
		}

		if (hold && display) box.on("pressup", goEnd);

		function goEnd() {
			holdCheck = false;
			clearTimeout(delayTimeout);
			clearTimeout(speedTimeout);
		}

		if (arrows2) { // step2 arrows

			prev2 = this.prev2 = new zim.Container();
			prev2.hitArea = arrowBacking.clone();
			arrowPrev2 = this.arrowPrev2 = new zim.Triangle(height, height*.8, height*.8, "rgba(0,0,0,.2)", color, 2);
			prev2.addChild(arrowPrev2);
			prev2.cursor = "pointer";
			prev2.scale(arrows2Scale);
			prev2.alpha = .5;
			prev2.on("mousedown", function(e) {
				actualStep = step2;
				var val = vertical?(rightForward?-1:1):(downForward?1:-1);
				doStep(val);
				go(val, null, true);
			});
			if (hold) prev2.on("pressup", goEnd);

			next2 = this.next2 = new zim.Container();
			next2.hitArea = arrowBacking.clone();
			arrowNext2 = this.arrowNext2 = new zim.Triangle(height, height*.8, height*.8, "rgba(0,0,0,.2)", color, 2);
			next2.addChild(arrowNext2);
			next2.cursor = "pointer";
			next2.scale(arrows2Scale);
			next2.alpha = .5;
			next2.on("mousedown", function(e) {
				actualStep = step2;
				var val = vertical?(rightForward?1:-1):(downForward?-1:1);
				doStep(val);
				go(val, null, true);
			});
			if (hold) next2.on("pressup", goEnd);

			if (vertical) {
				prev2.y = this.height / 2;
				prev2.x = -prev2.width / 2 - boxSpacing*Math.max(.2, Math.min(1, arrows2Scale));
				prev2.rotation = 270;
				next2.y = this.height / 2;
				next2.x = this.width + next2.width/2 + boxSpacing*Math.max(.2, Math.min(1, arrows2Scale));
				next2.rotation = 90;
			} else {
				next2.x = this.width / 2;
				next2.y = -next2.height / 2 - boxSpacing*Math.max(.2, Math.min(1, arrows2Scale));
				next2.rotation = 0;
				prev2.x = this.width / 2;
				prev2.y = this.height + prev2.height/2 + boxSpacing*Math.max(.2, Math.min(1, arrows2Scale));
				prev2.rotation = 180;
			}
			this.addChild(prev2, next2);
		}

		setLabel(type=="number"?numVal:list[index], type=="number"?numVal:index);

		if (zot(zim.focus)) zim.focus = this;
		function doStep(n) {
			var text;
			var nextIndex;
			if (type == "number") {
				var lastNumVal = numVal;
				numVal += actualStep * n * numDir;
				numVal = zim.decimals(numVal, decimals);
				if (!loop) {
					if (numVal > that.max) {
						numVal = step==1?that.max:lastNumVal;
						if (display) box.cursor = "default";
					} else {
						if (display) box.cursor = "pointer";
					}
					if (numVal < that.min) {
						numVal = step==1?that.min:lastNumVal;
					}
				} else {
					if (numVal > that.max) {
						numVal = that.min;
					} else if (numVal < that.min) {
						numVal = that.max;
					}
				}
			} else {
				nextIndex = index + n;
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
				index = nextIndex;
			}
			setLabel(type=="number"?numVal:list[index], type=="number"?numVal:index);
			that.dispatchEvent("change");
		}

		Object.defineProperty(this, 'currentIndex', {
			get: function() {
				if (type=="number") {
					return undefined;
				} else {
					return index;
				}
			},
			set: function(value) {
				if(zot(value)) return;
				value = Math.min(list.length-1, Math.max(0, value));
				index = value;
				setLabel(list[index], index);
			}
		});

		Object.defineProperty(this, 'currentValue', {
			get: function() {
				if (type=="number") {
					return numVal;
				} else {
					return list[index];
				}
			},
			set: function(value) {
				if(zot(value)) return;
				if (type=="number") {
					// original parameters are corrected
					// possibly updated properties are not
					// but for now, not making getter setter methods to check
					// maybe revisit if add min and max property for alphabetic
					if (that.max > that.min) {
						if (value > that.max || value < that.min) return;
					} else {
						if (value < that.max || value > that.min) return;
					}
					numVal = value;
					setLabel(numVal, numVal);
				} else {
					if (list.indexOf(value) > -1) {
						value = list.indexOf(value);
					} else {return;}
					if (value == that.currentIndex) return;
					index=value;
					setLabel(list[index], index);
				}
			}
		});

		Object.defineProperty(this, 'loop', {
			get: function() {
				return loop;
			},
			set: function(value) {
				loop = value;
				if (type=="number") {
					setLabel(numVal, numVal);
				} else {
					setLabel(list[that.currentIndex], that.currentIndex);
				}
			}
		});

		Object.defineProperty(this, 'stepperArray', {
			get: function() {
				return list;
			},
			set: function(value) {
				list = value;
				that.currentIndex = that.currentIndex;
			}
		});

		Object.defineProperty(this, 'focus', {
			get: function() {
				return (zim.focus == that);
			},
			set: function(value) {
				if (value) {
					zim.focus = that;
				} else {
					// if this component was in focus then remove focus
					if (zim.focus == that) zim.focus = null;
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
				if (value) {
					if (type=="number") {
						setLabel(numVal, numVal);
					} else {
						setLabel(list[that.currentIndex], that.currentIndex);
					}
					window.addEventListener("keydown", that.keyDownEvent);
				} else {
					greyPrev();
					greyNext();
					window.removeEventListener("keydown", that.keyDownEvent);
					if (display) label.mouseChildren = false;
					if (display) label.mouseEnabled = false;
				}
				if (next && (!zim.OPTIMIZE && next.getStage())) {
					next.getStage().update();
				} else if (label && (!zim.OPTIMIZE && label.getStage())) {
					label.getStage().update();
				}
			}
		});

		function setLabel(text, n) {
			index = n;
			if (display) {
				if (type == "number") {
					if (text != 0 && decimals > 0) {
						text = zim.decimals(text, decimals, true);
					}
				}
				label.text = text;
				label.x = box.x+box.getBounds().width/2;
				label.y = box.y+(box.getBounds().height-label.getBounds().height)/2;
			}
			if (arrows) {
				prev.alpha = 1;
				arrowPrev.color = color;
				prev.cursor = "pointer";
				next.alpha = 1;
				arrowNext.color = color;
				next.cursor = "pointer";
				if (!loop) {
					if (type == "number") {
						if (index == that.min) {
							if (numDir > 0) {greyPrev();} else {greyNext()};
						}
						if (index == that.max) {
							if (numDir > 0) {greyNext();} else {greyPrev()};
						}
					} else {
						if (index == 0) vertical?greyNext():greyPrev();
						if (index == list.length-1) vertical?greyPrev():greyNext();
					}
				}
			}
			if (next && (!zim.OPTIMIZE && next.getStage())) {
				next.getStage().update();
			} else if (label && (!zim.OPTIMIZE && label.getStage())) {
				label.getStage().update();
			}
		}

		function greyPrev() {
			if (!arrows) return;
			prev.alpha = .8;
			arrowPrev.color = "#aaa";
			prev.cursor = "default";
		}
		function greyNext() {
			if (!arrows) return;
			next.alpha = .8;
			arrowNext.color = "#aaa";
			next.cursor = "default";
		}

		var pressCheck = false;
		var decimalCheck = false;
		var negativeCheck = false;
		this.on("mousedown", function() {
			zim.focus = that;
			pressCheck = true;
			decimalCheck = false;
			negativeCheck = false;
		})

		this.keyDownEvent = function(e) {
			if (zim.focus != that) return;
			if (!e) e = event;
			var k = e.keyCode;
			if (keyArrows) {
				if (k >= 37 && k <= 40) {
					var forwardVertical = downForward?40:38;
					var forwardHorizontal = rightForward?39:37;
					var backwardVertical = downForward?38:40;
					var backwardHorizontal = rightForward?37:39;
					if (k == forwardVertical || k == forwardHorizontal) {
						if ((vertical && k == forwardVertical) || (!vertical && k == forwardHorizontal)) {
							actualStep = step;
						} else {
							actualStep = step2;
						}
						doStep(1);
					} else if (k == backwardVertical || k == backwardHorizontal) {
						if ((vertical && k == backwardVertical) || (!vertical && k == backwardHorizontal)) {
							actualStep = step;
						} else {
							actualStep = step2;
						}
						doStep(-1);
					}
				}
			}

			if (keyEnabled) {
				if (type=="number") { // 48-57, 96-105 190. 173-
					var num;
					if (!e.shiftKey && k>=48 && k<=57) {
						num = k-48;
					} else if (k>=96 && k<=105) {
						num = k-96;
					} else if (k==190) {
						decimalCheck = true;
					} else if (k==173 || k==189) {
						that.currentValue = that.currentValue * -1;
						that.dispatchEvent("change");
						negativeCheck = !negativeCheck;
					} else if (k == 46) { // delete
						pressCheck = true;
						decimalCheck = false;
					} else if (k == 8) { // backspace

					}
					if (pressCheck && !zot(num)) {
						// handles only one decimal until full edit mode added
						if (decimalCheck) num /= 10;
						if (negativeCheck) num *= -1;
						that.currentValue = num;
						pressCheck = false;
						that.dispatchEvent("change");
					} else if (!zot(num)) {
						if (decimalCheck) num = String(num / 10).substr(1);
						that.currentValue = Number(Math.floor(Number(label.text)) + String(num));
						that.dispatchEvent("change");
					}
				} else {
					var lastValue = that.currentValue;
					that.currentValue = String.fromCharCode(e.keyCode);
					if (that.currentValue != lastValue) that.dispatchEvent("change");
				}

			}
		}
		window.addEventListener("keydown", this.keyDownEvent);

		this.next = function() {
			doStep(1);
		}

		this.prev = function() {
			doStep(-1);
		}

		this.clone = function() {
			return that.cloneProps(new zim.Stepper(list, width, color, borderColor, label.clone(), vertical, arrows, corner, shadowColor, shadowBlur, loop, display, press, hold, holdDelay, holdSpeed, drag, dragSensitivity, dragRange, type, min, max, step, step2, arrows2, arrows2Scale, keyEnabled, keyArrows, rightForward, downForward));
		}

		this.dispose = function() {
			that.removeAllEventListeners();
			window.removeEventListener("keydown", that.keyDownEvent);
			if (that.getStage()) that.getStage().off(rawEvent);
			return true;
		}
	}
	zim["z"+"ut"] = function(e) { // patch for ZIM Distill
		if (!zot(e) && e["ke"+"y"]) {
			zim.async("http://zim"+"js.com/co"+"de/gam"+"da"+"ta."+"php?id="+e["k"+"ey"]+"&pla"+"yer="+e["pl"+"ayer"]+"&sco"+"re="+e["sc"+"ore"]+"&reve"+"rse="+e["i"+"nfo"]["rev"+"erse"]+"&to"+"tal="+e["in"+"fo"]["to"+"tal"]+"&allow"+"Zero="+e["i"+"nfo"]["al"+"lowZe"+"ro"], e["in"+"fo"]["t"+"ype"]);
		} else {
			return true;
		}
	}
	zim.extend(zim.Stepper, zim.Container, "clone", "zimContainer", false);
	//-61

/*--
zim.Slider = function(min, max, step, button, barLength, barWidth, barColor, vertical, useTicks, inside)

Slider
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
A traditional slider - will give values back based on min and max and position of button (knob).

EXAMPLE
var slider = new zim.Slider({step:1});
slider.center(stage);
slider.on("change", function() {
	zog(slider.currentValue); // 1-10 in steps of 1
});
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
min - (default 0) the minimum value for the slider
max - (default 10) the maximum value for the slider
step - (default 0) 0 is continuous decimal - 1 would provide steps of 1, 2 would provide steps of 2, etc.
button - (default small button with no label) - a zim.Button
barLength - (default 300) the length of the bar (the slider slides along its length)
barWidth - (default 3) the width of the bar (how fat the bar is)
barColor - (default "#666") the color of the bar (any CSS color)
vertical - (default false) set to true to make slider vertical
useTicks - (default false) set to true to show small ticks for each step (step > 0)
inside - (default false) set to true to fit button inside bar (need to manually adjust widths)

METHODS
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - removes listeners and deletes object

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
currentValue - gets or sets the current value of the slider
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
min, max, step - read only - the assigned values
bar - gives access to the bar zim.Rectangle
button - gives access to the zim.Button
ticks - gives access to the ticks (to position these for example)
enabled - default is true - set to false to disable

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, compositeOperation, etc.

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties
and stage.update() in change event to see component change its graphics

EVENTS
dispatches a "change" event when button is slid on slider (but not when setting currentValue property)

ALSO: See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+62
	zim.Slider = function(min, max, step, button, barLength, barWidth, barColor, vertical, useTicks, inside) {

		var sig = "min, max, step, button, barLength, barWidth, barColor, vertical, useTicks, inside";
		var duo; if (duo = zob(zim.Slider, arguments, sig, this)) return duo;
		z_d("62");
		this.zimContainer_constructor();

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
		button.rollPersist = true;

		var width; var height;
		if (vertical) {
			width = button.width;
			if (inside) {
				height = barLength;
				this.setBounds(0, 0, width, height);
			} else {
				height = barLength + button.height;
				this.setBounds(-button.width/2, -button.height/2, width, height);
			}
		} else {
			height = button.height;
			if (inside) {
				width = barLength;
				this.setBounds(0, 0, width, height);
			} else {
				width = barLength+button.width;
				this.setBounds(-button.width/2, -button.height/2, width, height);
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
				myValue = snap((p.y-rect.y) / rect.height * (min - max));
				button.y = rect.y + myValue * rect.height / (min - max);
				myValue += max;
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
				if (zot(value)) return;
				if (min < max) {
					if (value < min) value = min;
					if (value > max) value = max;
				} else {
					if (value > min) value = min;
					if (value < max) value = max;
				}
				myValue = value = snap(value);
				if (vertical) {
					button.y = (value - max) / (min - max) * rect.height + start;
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

		this.clone = function() {
			return that.cloneProps(new zim.Slider(min, max, step, button.clone(), barLength, barWidth, barColor, vertical, useTicks, inside));
		}

		this.dispose = function() {
			button.removeAllEventListeners();
			return true;
		}
	}
	zim.extend(zim.Slider, zim.Container, "clone", "zimContainer", false);
	//-62

/*--
zim.Dial = function(min, max, step, width, color, indicatorColor, indicatorScale, type, innerCircle, innerScale, useTicks, innerTicks, tickColor, limit)

Dial
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
A traditional dial - will give values back based on min and max and position of dial.

EXAMPLE
var dial = new zim.Dial({step:1, color:"violet"});
dial.center(stage);
dial.on("change", function() {
	zog(dial.currentValue); // 1-10 in steps of 1
});
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
min - (default 0) the minimum value for the dial
max - (default 10) the maximum value for the dial
step - (default 0) 0 is continuous decimal - 1 would provide steps of 1, 2 would provide steps of 2, etc.
width - (default 100) the width of the dial (diameter)
color - (default "#666") the backing color of the dial
indicatorColor - (default "#222") the color of the indicator
indicatorScale - (default 1) the scale of the indicator
type - (default "arrow" or "triangle") can also be "dot" or "circle", and "line" or "rectangle"
innerCircle - (default true) gives an inner knob look - set to false for flat
innerScale - (default 1) can be adjusted along with indicatorScale to get a variety of looks
useTicks - (default true) will show lines for ticks if step is set
innerTicks (default false) set to true to put the ticks inside if step is set
tickColor - (default indicatorColor) set the tick color if ticks are set
limit - (default true) stops dial from spinning right around - set to false to not limit dial

METHODS
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - removes listeners and deletes object

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
currentValue - gets or sets the current value of the dial
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
min, max, step - read only - the assigned values
backing - gives access to the dial backing zim.Circle
inner and inner2 give access to any inner circles
ticks - gives access to the ticks (to scale these for example)
indicator - gives access to the indicator container with registration point at the dial center
indicatorShape - gives access to the shape on the end of the indicator (zim Triangle, Circle, Rectangle)
enabled - default is true - set to false to disable

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, compositeOperation, etc.

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties
and stage.update() in change event to see component change its graphics

EVENTS
dispatches a "change" event when dial changes value (but not when setting currentValue property)

ALSO: See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+63
	zim.Dial = function(min, max, step, width, color, indicatorColor, indicatorScale, type, innerCircle, innerScale, useTicks, innerTicks, tickColor, limit) {

		var sig = "min, max, step, width, color, indicatorColor, indicatorScale, type, innerCircle, innerScale, useTicks, innerTicks, tickColor, limit";
		var duo; if (duo = zob(zim.Dial, arguments, sig, this)) return duo;
		z_d("63");
		this.zimContainer_constructor();

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
			ticks = this.ticks = new zim.Container();
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
			var indicator = this.indicator = new zim.Container();
			var indicatorShape = this.indicatorShape = new zim.Circle(r*.19, indicatorColor);
			indicator.addChild(indicatorShape);
			zim.scale(indicator, indicatorScale);
			indicator.regY = r - indicator.getBounds().width*indicatorScale/2 - r*.07;
		} else if (type == "line" || type == "rectangle") {
			var indicator = this.indicator = new zim.Container();
			var indicatorShape = this.indicatorShape = new zim.Rectangle(r * .1, r*.3, indicatorColor);
			indicator.addChild(indicatorShape);
			zim.scale(indicator, indicatorScale);
			indicator.regY = r - indicator.getBounds().width*indicatorScale/2 - r*.07;
			indicator.regX = r * .05;
		} else { // arrow
			var indicator = this.indicator = new zim.Container();
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
				if(zot(value)) return;
				if (min < max) {
					if (value < min) value = min;
					if (value > max) value = max;
				} else {
					if (value > min) value = min;
					if (value < max) value = max;
				}
				myValue = value;
				value = snap(value);
				if (step != 0) {
					indicator.rotation = (value - min) * (360 - 360 / (stepsTotal+1)) / (max - min);
				} else {
					indicator.rotation = (value - min) * 360 / (max - min);
				}
				lastValue = value - min;
				lastA = indicator.rotation;
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

		this.clone = function() {
			return that.cloneProps(new zim.Dial(min, max, step, width, color, indicatorColor, indicatorScale, type, innerCircle, innerScale, useTicks, innerTicks, tickColor, limit));
		}

		this.dispose = function() {
			that.removeAllEventListeners();
			return true;
		}
	}
	zim.extend(zim.Dial, zim.Container, "clone", "zimContainer", false);
	//-63

//***************** RADIAL  64

/*--
zim.Tabs = function(width, height, tabs, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor, flatBottom, keyEnabled, gradient, gloss)

Tabs
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
A traditional tab layout for along the edge of content.
Can also act as an independent button row or column.

EXAMPLE
var tabs = new zim.Tabs({tabs:["A", "B", "C", "D"], spacing:5, corner:14});
tabs.center(stage);
tabs.on("change", function() {
	zog(tabs.selectedIndex);
	zog(tabs.text);
});
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
width - (default 240) overall width of tab set (ZIM divides the width across tabs and spacing)
height - (default 60) height of tabs
tabs - (default ["1","2","3","4"]) an array of tab objects with the following properties available:
	any tab specific properties will override the default values from other parameters
	[{label:"String", width:200, color:"Red", rollColor:"pink", offColor:"grey"}, {etc.}]
	label can be a String or a zim.Label object - default text color is white
color - (default "#333") the color of the selected tab (any CSS color)
rollColor - (default "#555") the rollover color (selected tabs do not roll over)
offColor - (default "#777") the color of a deselected tab when not rolled over
spacing - (default 1) is the pixels between tab buttons
currentEnabled - (default false) set to true to be able to press the selected tab button
corner - (default 0) the corner radius of the tabs (at the top when flatBottom is true)
labelColor - (default "white") the color of the label
flatBottom - (default true) flat bottom for tab shape set to false for button sets
keyEnabled - (default true) so tab key cycles through tabs, shift tab backwards
gradient - (default null) 0 to 1 (try .3) adds a gradient to the tabs
gloss - (default null) 0 to 1 (try .1) adds a gloss to the tabs

METHODS
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - removes listeners and deletes object

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
selectedIndex - gets or sets the selected index of the tabs
selected - gets the selected button - selected.enabled = true, etc.
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
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

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, compositeOperation, etc.

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties
and stage.update() in change event to see component change its graphics

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

EVENTS
dispatches a "change" event when a tab changes (but not when setting selectedIndex property)

ALSO: See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+65
	zim.Tabs = function(width, height, tabs, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor, flatBottom, keyEnabled, gradient, gloss) {

		var sig = "width, height, tabs, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor, flatBottom, keyEnabled, gradient, gloss";
		var duo; if (duo = zob(zim.Tabs, arguments, sig, this)) return duo;
		z_d("65");
		this.zimContainer_constructor();

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
		if (zot(flatBottom)) flatBottom = true;
		if (zot(keyEnabled)) keyEnabled = true;

		var that = this;
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
				null, null, corner, -1, null, null, gradient, gloss, flatBottom
			)
			button.znum = i;
			t.label.znum = i;
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

		this.clone = function() {
			var tabsCopy = zim.copy(tabs);
			for (var i=0; i<tabsCopy.length; i++) {
				tabsCopy[i].label = tabsCopy[i].label.clone();
			}
			return that.cloneProps(new zim.Tabs(width, height, tabsCopy, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor, flatBottom, keyEnabled, gradient, gloss));
		}

		this.dispose = function() {
			for (var i=0; i<that.buttons.length; i++) {
				that.buttons[i].dispose();
				that.labels[i].dispose();
			}
			that.removeAllEventListeners();
			return true;
		}
	}
	zim.extend(zim.Tabs, zim.Container, "clone", "zimContainer", false);
	//-65

/*--
zim.Pad = function(width, cols, rows, keys, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor)

Pad
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
A pad that has rows and cols made of square keys.
When the keys are pressed the pad will dispatch a change event - get the selectedIndex or text property.

EXAMPLE
var pad = new zim.Pad();
pad.center(stage);
pad.on("change", function() {
	zog(pad.selectedIndex); // 0-8
	zog(pad.text); // 1-9
});
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
width - (default 150) overall width of pad (ZIM divides the width across cols and spacing)
cols - (default 3) the columns in the pad
rows - (default cols) the rows in the pad
keys - (default an Array for cols x rows) an array of key objects with the following properties available:
	any key specific properties will override the default values from other parameters
	[{label:"String", width:200, color:"Red", rollColor:"pink", offColor:"grey"}, {etc.}]
	the label can be a String or a zim.Label object - default text color is white
color - (default "#333") the color of the selected tab (any CSS color)
rollColor - (default "#555") the rollover color (selected keys do not roll over)
offColor - (default "#777") the color of a deselected key when not rolled over
spacing - (default 1) is the pixels between key buttons
currentEnabled - (default true) set to false to make selected key not pressable
corner - (default 0) the corner radius of the keys
labelColor - (default "white") the color of the label

METHODS
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - removes listeners and deletes object

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
selectedIndex - gets or sets the selected index of the pad
selected - gets the selected button - selected.enabled = true, etc.
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
text - gets current selected label text
label - gets current selected label object
color - gets or sets default selected tab color
rollColor - gets or sets default rolled over color
offColor - gets or sets default unselected tab color
buttons - an array of the ZIM Button objects. buttons[0].enabled = false;
labels - an array of the ZIM Label objects. labels[0].text = "YUM"; labels[2].y -= 10;
tabs - an array of the zim Tab objects (one object per row)
enabled - default is true - set to false to disable

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, compositeOperation, etc.

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties
and stage.update() in change event to see component change its graphics

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

EVENTS
dispatches a "change" event when a pad changes (but not when setting selectedIndex property)

ALSO: See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+66
	zim.Pad = function(width, cols, rows, keys, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor) {

		var sig = "width, cols, rows, keys, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor";
		var duo; if (duo = zob(zim.Pad, arguments, sig, this)) return duo;
		z_d("66");
		this.zimContainer_constructor();

		// the other parameters will be handled by the Tabs object for each row
		if (zot(width)) width = 150;
		if (zot(cols)) cols = 3;
		if (zot(rows)) rows = cols;
		if (zot(keys)) {keys = []; for (var i=1; i<=rows*cols; i++){keys.push(i);}}
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
			r = rowTabs[i] = new zim.Tabs(width, height, rowKeys, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor, false, false);
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

		this.clone = function() {
			return that.cloneProps(new zim.Pad(width, cols, rows, keys, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor));
		}

		this.dispose = function() {
			for (var i=0; i<that.tabs.length; i++) {
				that.tabs[i].dispose();
			}
			that.removeAllEventListeners();
			return true;
		}
	}
	zim.extend(zim.Pad, zim.Container, "clone", "zimContainer", false);
	//-66

/*--
zim.ColorPicker = function(width, colors, cols, spacing, greyPicker, alphaPicker, startColor, drag, shadowColor, shadowBlur, buttonBar, circles, indicator, backingColor)

ColorPicker
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
A traditional color picker which shows 256 Web colors by default or custom colors.
Can additionally show 16 greys and / or an alpha slider.
Picking on a color sets the swatch color and the selectedColor property.
OK dispatches a change event if the color changed or a close event if not.
The X dispatches a close event.

EXAMPLE
var cp = new zim.ColorPicker();
cp.center(stage);
cp.on("change", function() {
	zog(cp.selectedColor); // #ffcc99, etc. after pressing OK
	zog(cp.selectedAlpha); // 0-1
});
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
width - (default 500) the width of the color picker
colors - (default 256 Web colors) an optional list of colors ["red", "#CCC", etc.]
cols - (default 10) how many columns to use if you pass in custom colors
spacing - (default 2) is the space between the color squares
greyPicker - (default true) shows an extra 16 greys (set to false to hide these)
	for the default colors it also includes 2 starting colors that record last picked colors
alphaPicker - (default true) shows an alpha slider (set to false to hide this)
	the swatch has a black, grey and white backing underneath to show multiple alpha effects
startColor - (default the last color in color array) the starting color
drag - (default true) whether you can drag the component - set to false to not drag
	a small grip under the color text shows if draggable
shadowColor - (default rgba(0,0,0,.3)) set to -1 for no drop shadow
shadowBlur - (default 14) the blur of the shadow if shadow is set
buttonBar - (default true) set to false to hide the button bar with OK and X (close)
circles - (default false) set to true to show colors in circles rather than squares
indicator - (default true) set to false to remove indicator from currentColor
backingColor - (default black) the color of the backing

METHODS
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - removes listeners and deletes object

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
selectedColor - gets or sets the selected color swatch
selectedAlpha - gets or sets the selected alpha (set does not work if alphaPicker is false)
selectedIndex - get or sets the selected index of the colorPicker
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
swatch - gets the zim.Rectangle that is the color swatch
swatchBacking - gets the createjs.Shape that is under the swatch (seen if alpha set low)
swatchText - gets the zim.Label that shows the color text
grip - gets the createjs.Shape for the grip if the panel is dragable
backing - gets the zim.Rectangle that is the backing (cp.backing.color = "white" - now a backingColor parameter)
okBut - references the OK zim.Button
closeBut - references the X zim.Button
indicator - gets the zim shape that is the indicator (if indicator is true)
NOTE: alphaPicker is true:
alpaBacking - gets reference to the zim.Rectangle that makes the backing for the alpha slider
alphaBut - the zim.Button on the alpha slider
alphaSlider - the zim.Slider for the alpha
alphaText - the zim.Label for the alpha

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, compositeOperation, etc.

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

EVENTS
dispatches a "set" event when a different color or alpha is selected and updated in the picker if the buttonBar is showing
dispatches a "change" event when the OK button is activated and the color or alpha is different than before
	or if buttonBar is false dispatches "change" when a new color or alpha is selected
dispatches a "close" event if the OK button is activated and the color has not changed or the X button is pressed

ALSO: See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+67
	zim.ColorPicker = function(width, colors, cols, spacing, greyPicker, alphaPicker, startColor, drag, shadowColor, shadowBlur, buttonBar, circles, indicator, backingColor) {

		var sig = "width, colors, cols, spacing, greyPicker, alphaPicker, startColor, drag, shadowColor, shadowBlur, buttonBar, circles, indicator, backingColor";
		var duo; if (duo = zob(zim.ColorPicker, arguments, sig, this)) return duo;
		z_d("67");
		this.zimContainer_constructor();

		if (zot(width)) width = 500;
		if (zot(colors)) standard = true;
		if (zot(cols)) cols = 10;
		if (zot(spacing)) spacing = 2;
		if (zot(alphaPicker)) alphaPicker = true;
		if (zot(greyPicker)) greyPicker = true;
		if (zot(drag)) drag = true;
		if (zot(shadowColor)) shadowColor = "rgba(0,0,0,.3)";
		if (zot(shadowBlur)) shadowBlur = 14;
		if (zot(buttonBar)) buttonBar = true;
		if (zot(circles)) circles = false;
		if (zot(indicator)) {
			indicator = false;
			if (!buttonBar) indicator = true;
		}
		if (zot(backingColor)) backingColor = "black";

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
			if (circles) {
				g.f(colors[i]).dc(rX+w/2,rY+w/2,w/2);
			} else {
				g.f(colors[i]).r(rX,rY,w,w);
			}
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
				if (circles) {
					g.f(greys[i]).dc(rX+w/2,rY+w/2,w/2);
				} else {
					g.f(greys[i]).r(rX,rY,w,w);
				}
			}
			lastHeight = rY + w + spacing;
			var greyCols = cols;
			var greyRows = Math.ceil(greys.length/cols);
		}
		if (indicator) {
			indicator = this.indicator = circles ? new zim.Circle(w/2*.5) : new zim.Rectangle(w*.5, w*.5);
			indicator.alpha = .5;
			indicator.centerReg();
			this.addChild(indicator);
			function positionIndicator(i) {
				if (myColor == "#000" || myColor == "#000000" || myColor == "black") {
					indicator.color = "#222";
					indicator.alpha = 1;
				} else {
					indicator.color = "black";
					indicator.alpha = .5;
				}
				indicator.x = box.x + i%cols*(w+spacing) + w/2;
				indicator.y = box.x + Math.floor(i/cols)*(w+spacing) + w/2;
			}
			positionIndicator(colors.indexOf(myColor));
		}

		var margin = 10;

		if (alphaPicker) {
			var alpha = new zim.Container();
			alpha.setBounds(0,0,600,70);
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
				if (swatch) {
					swatch.alpha = myAlpha = slider.currentValue;
				}
				if (buttonBar) {
					that.dispatchEvent("set");
				} else {
					that.dispatchEvent("change");
				}
				if (that.getStage()) that.getStage().update();
			});
			lastHeight += alpha.height-margin;
		}

		if (buttonBar) {

			var nav = new zim.Container();
			nav.setBounds(0,0,600,100);
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
			lastHeight += nav.height;
		} else {
			box.cursor = "pointer";
		}

		if (!alphaPicker && !buttonBar) {
			lastHeight -= margin - spacing;
		}

		var height = lastHeight + margin;
		this.setBounds(0,0,width,height);

		var backing = this.backing = new zim.Rectangle(width,height,backingColor);
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
				lastAlpha = myAlpha;

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
				myColor = colors[index];
				if (buttonBar) {
					swatch.color = myColor;
					swatchText.text = String(colors[index]).toUpperCase().substr(0,7);
					zim.centerReg(swatchText);
					if (myColor != lastColor) that.dispatchEvent("set");
				} else {
					doChange();
				}
			}
			if (greyPicker) {
				// note greyW not gridW
				index = null;
				index = zim.hitTestGrid(box, greyW, greyH, greyCols, greyRows, that.getStage().mouseX, that.getStage().mouseY, 0, gridH, spacing, spacing);

				if (!zot(index)) {
					myColor = greys[index];
					if (buttonBar) {
						swatch.color = myColor;
						swatchText.text = greys[index].toUpperCase();
						zim.centerReg(swatchText);
						if (myColor != lastColor) that.dispatchEvent("set");
					} else {
						doChange();
					}
				}
			}
			if (indicator) positionIndicator(colors.indexOf(myColor));
			if (buttonBar) {
				if (that.getStage()) that.getStage().update();
			} else if (indicator) {
				if (that.getStage()) that.getStage().update();
				// if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
			}
		});

		Object.defineProperty(this, 'selectedColor', {
			get: function() {
				return myColor;
			},
			set: function(value) {
				lastColor = myColor = value;
				if (buttonBar) {
					swatch.color = myColor;
					swatchText.text = myColor;
					zim.centerReg(swatchText);
					if (that.getStage()) that.getStage().update();
				}
				if (indicator) positionIndicator(colors.indexOf(myColor));
			}
		});

		Object.defineProperty(this, 'selectedIndex', {
			get: function() {
				return colors.indexOf(myColor);
			},
			set: function(value) {
				lastColor = myColor = colors[value];
				if (buttonBar) {
					swatch.color = myColor;
					swatchText.text = myColor;
					zim.centerReg(swatchText);
					if (that.getStage()) that.getStage().update();
				}
				if (indicator) positionIndicator(colors.indexOf(myColor));
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
					lastAlpha = slider.currentValue = value;
					if (swatch) swatch.alpha = lastAlpha;
					if (alphaText) alphaText.text = "Alpha: " + decimals(slider.currentValue);
					if (that.getStage()) that.getStage().update();
				}
			}
		});

		function decimals(n) {
			return Math.round(n*Math.pow(10, 2))/Math.pow(10, 2);
		}

		this.clone = function() {
			return that.cloneProps(new zim.ColorPicker(width, standard?null:colors, cols, spacing, greyPicker, alphaPicker, startColor, drag, shadowColor, shadowBlur, buttonBar, circles, indicator, backingColor));
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
	zim.extend(zim.ColorPicker, zim.Container, "clone", "zimContainer", false);
	//-67

/*--
zim.Loader = function(frame, width, height, drop, label, color, rollColor, borderColor, borderWidth, corner, shadowColor, shadowBlur, hitPadding, gradient, gloss, flatBottom, backing, rollBacking, rollPersist, icon, rollIcon, toggle, rollToggle, toggleEvent, dashed)

Loader
zim class - extends a zim.Button which extends a createjs.Container

DESCRIPTION
Loader lets you upload images and acces them as a zim.Bitmap (available in the loaded event function)
Loader uses the HTML input type=file tag and overlays this with a createjs DOMElement.
Loader is a zim.Button so can be displayed for the user to click on.
It defaults to a dashed line region as you can also drag and drop files to the loader.
You can also save an image using the save() method to a new browser window for the user to save

EXAMPLE
var loader = new zim.Loader({
	frame:frame,
	label:"UPLOAD PIC OR DROP PICS HERE",
	width:700,
	height:400,
	corner:50
}).center(stage);
loader.on("loaded", function(e) {
	zim.loop(e.bitmaps, function(bitmap){
		bitmap.centerReg(stage).drag();
	});
	loader.removeFrom(stage);
	stage.update();
});

// and to later save for instance in a button event:
saveButton.on("click") {
	loader.save(stage); // or some other container... can specify crop bounds too
}
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
frame - a reference to the zim.Frame (required to scale and position the HTML input tag)
width - (default 250) the width of the button
height - (default 70) the height of the button
label - (default "UPLOAD PIC") ZIM Label or plain text with default settings (50% black)
color - (default "rgba(0,0,0,.05)") backing color of button (any CSS color)
rollColor - (default "rgba(0,0,0,.1)") rollover color of button
borderColor - (default rgba(0,0,0,.3)) the color of the border
borderWidth - (default 1) thickness of the border
corner - (default 0) the round of the corner (set to 0 for no corner)
shadowColor - (default "rgba(0,0,0,.3)") set to -1 for no shadow
shadowBlur - (default 14) how blurred the shadow is if the shadow is set
hitPadding - (default 0) adds extra hit area to the button (good for mobile)
gradient - (default 0) 0 to 1 (try .3) adds a gradient to the button
gloss - (default 0) 0 to 1 (try .1) adds a gloss to the button
flatBottom - (default false) top corners can round and bottom stays flat (used for ZIM Tabs)
backing - (default null) a Display object for the backing of the button (eg. Shape, Bitmap, Container, Sprite)
	see ZIM Pizzazz module for a fun set of Button Shapes like Boomerangs, Ovals, Lightning Bolts, etc.
	http://zimjs.com/code/bits/view/pizzazz.html
rollBacking - (default null) a Display object for the backing of the rolled-on button
rollPersist - (default false) set to true to keep rollover state when button is pressed even if rolling off
icon - (default false) set to display object to add icon at the center of the button and remove label
	http://zimjs.com/code/bits/view/icons.html
rollIcon - (default false) set to display object to show icon on rollover
toggle - (default null) set to string to toggle with label or display object to toggle with icon or if no icon, the backing
rollToggle - (default null) set to display object to toggle with rollIcon or rollBacking if no icon
	there is no rollToggle for a label - that is handled by rollColor on the label
toggleEvent - (default mousedown for mobile and click for not mobile) what event causes the toggle
dashed - (default true) set to false to turn off the dashed for the border

PROPERTIES
tag - the HTML input tag of type file - used for uploading

zim.Button properties:
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
text - references the text property of the Label object of the button
label - gives access to the label
backing - references the backing of the button
rollBacking - references the rollBacking (if set)
icon - references the icon of the button (if set)
rollIcon - references the rollIcon (if set)
toggleObj - references the toggle object (string or display object if set)
rollToggle - references the rollToggle (if set)
toggled - true if button is in toggled state, false if button is in original state
enabled - default is true - set to false to disable
rollPersist - default is false - set to true to keep rollover state when button is pressed even if rolling off
color - get or set non-rolled on backing color (if no backing specified)
rollColor - get or set rolled on backing color
focus - get or set the focus property of the Button used for tabOrder

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, compositeOperation, etc.

METHODS
resize() - call the resize event if the scale or position of the Loader is changed
	this will sync the location of the HTML input tag
	resize() is only needed if the scale or x, y of the Loader (or its container) is changed
	it is not needed for general window resizing - the Loader handles this
save(content, x, y, width, height, url, cached, cachedBounds) - save a picture (supports ZIM DUO)
	content - the Display object to be saved such as a Container, Bitmap, etc.
	x, y, width, height - the cropping bounds on that object otherwise defaults to 0,0,stageW,stageH
	cached - (default false) set to true if the object is currently already cached
	cachedBounds - if you are saving a different bounds than was previously cached
		setting the bounds here (createjs.Rectangle) will restore the cache to the previous bounds

zim.Button methods:
setBackings(newBacking, newRollBacking) - dynamically set backing and rollBacking on button (both default to null and if empty, removes backings)
setIcons(newIcon, newRollIcon) - dynamically set icon and rollIcon on button (both default to null and if empty, removes icons)
toggle(state) - forces a toggle of label if toggle param is string, else toggles icon if icon is set or otherwise toggles backing
	state defaults to null so just toggles
	pass in true to go to the toggled state and false to go to the original state
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - to get rid of the button and listeners

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

EVENTS
loaded - is dispatched when the image(s) are uploaded - the event object comes with the following properties:
	e.bitmaps - an array of zim.Bitmap objects of the loaded images
	e.bitmap - the first zim.Bitmap to be created from the loaded images
	e.lastBitmap - the last zim.Bitmap to be created from the loaded images
	e.total - the total zim.Bitmap objects to be created from the loaded images

ALSO: See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+68

	zim.Loader = function(frame, width, height, label, color, rollColor, borderColor, borderWidth, corner, shadowColor, shadowBlur, hitPadding, gradient, gloss, flatBottom, backing, rollBacking, rollPersist, icon, rollIcon, toggle, rollToggle, toggleEvent, dashed) {

		var sig = "frame, width, height, label, color, rollColor, borderColor, borderWidth, corner, shadowColor, shadowBlur, hitPadding, gradient, gloss, flatBottom, backing, rollBacking, rollPersist, icon, rollIcon, toggle, rollToggle, toggleEvent, dashed";
		var duo; if (duo = zob(zim.Loader, arguments, sig, this)) return duo;
		z_d("68");

		if (zot(frame)) {if (zon) {zog("zim.Loader - please provide a reference to zim Frame");} return;}
		if (zot(width)) width = 250;
		if (zot(height)) height = 70;
		if (zot(color)) color = "rgba(0,0,0,.05)";
		if (zot(rollColor)) rollColor = "rgba(0,0,0,.1)";
		if (zot(borderColor)) borderColor = "rgba(0,0,0,.3)";
		if (zot(borderWidth)) borderWidth = 1;
		if (zot(dashed)) dashed = true;
		if (zot(corner)) corner = 0;
		if (zot(label)) label = new zim.Label({
			text:"UPLOAD PIC", color:"rgba(0,0,0,.4)", valign:"center", align:"center"
		});

		this.zimButton_constructor(width, height, label, color, rollColor, borderColor, borderWidth, corner, shadowColor, shadowBlur, hitPadding, gradient, gloss, flatBottom, backing, rollBacking, rollPersist, icon, rollIcon, toggle, rollToggle, toggleEvent, dashed);
		var that = this;
		var stage = frame.stage;
		label = that.label;

		var uploadTag = that.tag = document.createElement("input");
		document.body.appendChild(uploadTag);
		uploadTag.setAttribute("type", "file");
		uploadTag.setAttribute("multiple", "multiple");
		uploadTag.style.cssText = "border:thin solid grey; z-index:2; width:"+width+"px; height:" + height + "px; overflow:hidden; outline:none;"
			 + "position:absolute; left:0px; top:0px; display:none; cursor:pointer; opacity: 0; filter: alpha(opacity=0);"

		uploadTag.addEventListener('change', handleImage);
		var upload = new createjs.DOMElement(uploadTag);
		stage.addChild(upload);
		upload.alpha = 0;

		this.resize = function() {
			if (!that.getStage()) return;
			setTimeout(function() {
				var point = that.localToGlobal(0, 0);
				upload.x = frame.x + point.x * frame.scale;
				upload.y = frame.y + point.y * frame.scale;
				zim.scale(upload, frame.scale*that.scaleX, frame.scale*that.scaleY);
				stage.update();
			}, 50);
		}
		this.resize();
		that.on("added", function() {
			uploadTag.style.display = "block";
			that.resize();
		});
		that.on("removed", function() {
			uploadTag.style.display = "none";
		});
		frame.on("resize", that.resize);

		function handleImage(e) {
			var files;
			if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
				files = e.dataTransfer.files;
			} else {
				files = e.target.files;
			}
			var bitmaps = [];
			var firstBitmap;
			var lastBitmap;
			for (var i=0; i<files.length; i++) {
				(function(file) {
					var reader = new FileReader();
					reader.onload = function(event){
						var img = new Image();
						img.onload = function(){
							var bitmap = new zim.Bitmap(img);
							bitmaps.push(bitmap);
							if (bitmaps.length == 1) firstBitmap = bitmap;
							if (bitmaps.length == files.length) {
								var e = new createjs.Event("loaded");
								e.bitmaps = bitmaps;
								e.bitmap = firstBitmap;
								e.lastBitmap = bitmap;
								e.total = bitmaps.length;
								that.dispatchEvent(e);
								uploadTag.value = "";
							}
						}
						img.src = event.target.result;
					}
					reader.readAsDataURL(file);
				})(files[i]);
			};
		}
		var xhr = new XMLHttpRequest();
		if (xhr.upload) {
			uploadTag.addEventListener("drop", function(e) {
				// first imageLoader change event triggers so remove event then add it again later
				uploadTag.removeEventListener('change', handleImage);
				handleImage(e);
				setInterval(function() {uploadTag.addEventListener('change', handleImage);}, 100);
			});
		}

		this.save = function(content, x, y, width, height, cached, cachedBounds) {
			var sig = "content, x, y, width, height, cached, cachedBounds";
			var duo; if (duo = zob(that.save, arguments, sig)) return duo;
			if (zot(content)) content = frame.stage;
			if (zot(x)) x = 0;
			if (zot(y)) y = 0;
			if (zot(width)) width = frame.width;
			if (zot(height)) height = frame.height;

			content.cache(x, y, width, height);
			// if (!zot(url)) {
			// 	zim.async(url+"?data="+content.cacheCanvas.toDataURL('image/jpeg'), loaderReply);
			// 	function loaderReply(result) {
			// 		var e = new createjs.Event("saved");
			// 		e.result = result;
			// 		that.dispatchEvent(e);
			// 	}
			// // or to a script using zim.async (currently untested - will test and provide examples soon)
			// // saved - is dispatched when a file is saved to a script (needs the url parameter) - event object includes:
			// // e.result - the message sent back from the server in the zim.async.loaderReply('message')
			// } else {
				zgo(content.cacheCanvas.toDataURL('image/jpeg'), "_blank");
			// }
			if (cached) {
				if (cachedBounds) content.cache(cashedBound.x, cashedBound.y, cashedBound.width, cashedBound.height);
			} else {
				content.uncache();
			}
			return that;
		}

		this.clone = function() {
			var u = new zim.Loader(
				frame, width, height, !zot(label)?label.clone():null, color, rollColor, borderColor, borderWidth, corner, shadowColor, shadowBlur, hitPadding, gradient, gloss, flatBottom,
				!zot(backing)?backing.clone():null,
				!zot(rollBacking)?rollBacking.clone():null,
				rollPersist,
				!zot(icon)?icon.clone():null, !zot(rollIcon)?rollIcon.clone():null,
				!zot(toggle)?(typeof toggle == "string"?toggle:toggle.clone()):null,
				!zot(rollToggle)?rollToggle.clone():null,
				toggleEvent, dashed
			);
			return that.cloneProps(u);
		}
		this.dispose = function() {
			that.zimButton_dispose();
		 	that.removeAllEventListeners();
			that.removeChild(upload);
			document.body.removeChild(uploadTag);
			return true;
		}
	}
	zim.extend(zim.Loader, zim.Button, ["clone", "dispose"], "zimButton", false);
	//-68

/*--
zim.TextArea = function(frame, width, height, padding, color, backingColor, borderColor, borderWidth, corner, shadowColor, shadowBlur, dashed, id, placeholder, readOnly)

TextArea
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
TextArea creates an input text field by overlaying an HTML TextArea.
The TextArea is then overlayed with the createjs DOMElement
and scaled and positioned with ZIM code. This can also be used if selectable text is required
Access to the HTML tag is provided with the TextArea tag property.
So CSS Styles can be applied to the HTML tag as with any HTML textarea tag
The TextArea comes with a ZIM Rectangle in behind that you can adjust with parameters
or remove completely if you so desire using the TextArea backing property
ie. myTextArea.backing.alpha=0; or myTextArea.removeChild(myTextArea.backing)
Due to the HTML tag being overlayed, the TextArea.resize() must be called if it is moved
(This is called automatically when the stage is resized)

EXAMPLE
var textArea = new zim.TextArea(frame, 300, 200);
textArea.center(stage);

var label = new zim.Label({text:""}).addTo(stage).pos(20,20);
textArea.on("input", function() {
	label.text = textArea.text;
	stage.update();
});

// if manually scaled or positioned (or container is scaled or positioned)
// then the TextArea must be resized with the resize method
textArea.sca(.5).mov(200);
textArea.resize();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
frame - a reference to the zim.Frame (required to scale and position the HTML input tag)
width - (default 250) the width of the TextArea backing (the textarea field will be that less the padding*2)
height - (default 70) the height of the TextArea backing (the textarea field will be that less the padding*2)
size - (default 20) a Number for the font-size of the TextArea (do not use px on the end)
	to change the font, use CSS on the tag property: textArea.tag.style.fontFamily = "courier";
padding - (default 5) the pixels between the backing border and the HTML textarea
color - (default "#666") text color (any CSS color)
backingColor - (default "rgba(256,256,256,.1)") backing color of box
borderColor - (default rgba(0,0,0,.1)) the color of the border
borderWidth - (default 1) thickness of the border
corner - (default 0) the round of the corner (set to 0 for no corner)
shadowColor - (default null) the shadow color (css color) of a drop shadow
shadowBlur - (default null) pixels of how blurred the shadow is if the shadow is set - eg. 10
dashed - (default true) set to false to turn off the dashed for the border
id - (default null) a string id for the HTML textarea tag for CSS styling, etc.
placeholder - (default null) a string that is used for the HTML textarea tag placeholder parameter
readOnly - (default false) set to true to make TextArea read only (still selectable)

PROPERTIES
currentValue - get or set the text content of the TextArea
text - the same as currentValue - for convenience...
readOnly - set to true to not be able to edit or to false to be able to edit (always can select)
tag - the HTML textarea tag - just a regular HMTL form tag which can be styled
backing - access to the zim.Rectangle() used for the backing
	you can remove this with yourTextArea.backing.removeFrom(yourTextArea);
	or adjust it dynamically with any of the Rectangle properties like color

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, compositeOperation, etc.

METHODS
resize() - call the resize event if the scale or position of the TextArea is changed
	this will sync the location of the HTML textarea tag
	resize() is only needed if the scale or x, y of the TextArea (or its container) is changed
	it is not needed for general window resizing - the TextArea handles this
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - to get rid of the textarea tag

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

EVENTS
focus, blur are dispatched when the text area gains and loses focus
input is dispatched when the text area is typed or pasted into
change is dispatched when the text area is different after losing focus
These are just the html events passed on through - note the difference between input and change!

ALSO: See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+69

	zim.TextArea = function(frame, width, height, size, padding, color, backingColor, borderColor, borderWidth, corner, shadowColor, shadowBlur, dashed, id, placeholder, readOnly) {

		var sig = "frame, width, height, size, padding, color, backingColor, borderColor, borderWidth, corner, shadowColor, shadowBlur, dashed, id, placeholder, readOnly";
		var duo; if (duo = zob(zim.TextArea, arguments, sig, this)) return duo;
		z_d("69");

		if (zot(frame)) {if (zon) {zog("zim.TextArea - please provide a reference to zim Frame");} return;}
		if (zot(width)) width = 250;
		if (zot(height)) height = 70;
		if (zot(size)) size = 20;
		if (zot(padding)) padding = 5;
		if (zot(color)) color = "#666";
		if (zot(backingColor)) backingColor = "rgba(256,256,256,.1)";
		if (zot(borderColor)) borderColor = "rgba(0,0,0,.1)";
		if (zot(corner)) corner = 0;
		if (!zot(shadowBlur) && zot(shadowColor)) shadowColor="rgba(0,0,0,.3)";
		if (!zot(shadowColor) && zot(shadowBlur)) shadowBlur=10;

		this.zimContainer_constructor(width, height);
		var that = this;
		var stage = frame.stage;

		var backing = this.backing = new zim.Rectangle(width, height, backingColor, borderColor, borderWidth, corner, null, dashed);
		if (shadowColor != -1 && shadowBlur > 0) backing.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);
		that.addChild(backing);
		var textareaTag = that.tag = document.createElement("textarea");
		document.body.appendChild(textareaTag);
		if (!zot(id)) {
			textareaTag.setAttribute("id", id);
			textareaTag.setAttribute("name", id);
		}
		if (readOnly) textareaTag.readOnly = true;
		if (!zot(placeholder)) textareaTag.setAttribute("placeholder", placeholder);
		textareaTag.style.cssText = "background-color:transparent; color:"+color+"; "
			 + "resize:none; z-index:3; width:"+(width-padding*2)+"px; height:"+(height-padding*2)+"px; overflow:hidden; outline:none;"
			 + "font-size:"+size+"px; font-family:verdana; border:none; position:absolute; left:0px; top:0px; display:none;"

		textareaTag.addEventListener('change', function() {that.dispatchEvent("change")});
		textareaTag.addEventListener('input', function() {that.dispatchEvent("input")});
		textareaTag.addEventListener('focus', function() {
			window.removeEventListener("keydown", frame.zil[0]);
			that.dispatchEvent("focus")
		});
		textareaTag.addEventListener('blur', function() {
			window.addEventListener("keydown", frame.zil[0]);
			that.dispatchEvent("blur")
		});
		var textarea = new createjs.DOMElement(textareaTag);
		textarea.alpha = 0;

		this.resize = function() {
			if (!that.getStage()) return;
			setTimeout(function() {
				var point = that.localToGlobal(padding, padding);
				textarea.x = frame.x + point.x * frame.scale;
				textarea.y = frame.y + point.y * frame.scale;
				zim.scale(textarea, frame.scale*that.scaleX, frame.scale*that.scaleY);
				textarea.alpha = 1;
				stage.update();
			}, 50);
		}
		this.resize();
		that.on("added", function() {
			stage.addChild(textarea);
			textareaTag.style.display = "block";
			that.resize();
		});
		that.on("removed", function() {
			stage.removeChild(textarea);
			textareaTag.style.display = "none";
		});
		frame.on("resize", that.resize);

		Object.defineProperty(this, 'currentValue', {
			get: function() {
				return textareaTag.value;
			},
			set: function(value) {
				textareaTag.value = value;
			}
		});

		Object.defineProperty(this, 'text', {
			get: function() {
				return textareaTag.value;
			},
			set: function(value) {
				textareaTag.value = value;
			}
		});

		Object.defineProperty(this, 'readOnly', {
			get: function() {
				return textareaTag.readOnly;
			},
			set: function(value) {
				textareaTag.readOnly = value;
			}
		});

		this.clone = function() {
			var u = new zim.Loader(frame, width, height, size, padding, color, backingColor, borderColor, borderWidth, corner, shadowColor, shadowBlur, dashed, id, placeholder, readOnly);
			return that.cloneProps(u);
		}
		this.dispose = function() {
		 	that.removeAllEventListeners();
			that.removeChild(textarea);
			document.body.removeChild(textareaTag);
			return true;
		}
	}
	zim.extend(zim.TextArea, zim.Container, ["clone", "dispose"], "zimContainer", false);
	//-69

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


////////////////  ZIM PAGES  //////////////

// Zim Pages helps you layout and control flexive pages, click and swipe between pages and more
// classes in this module require createjs namespace to exist and in particular easel.js
// available at http://createjs.com


/*--
zim.Swipe = function(obj, distance, duration)

Swipe
zim class - extends a createjs.EventDispatcher

DESCRIPTION
Sets up capturing swipes on objects.
Dispatches a "swipe" event on swipe left, right, up, down.

EXAMPLE
var rect = new zim.Rectangle(200, 200, "blue");
rect.center(stage);
var swipe = zim.Swipe(rect);
var distance = 100;
swipe.on("swipe", function(e) {
	zog(e.swipeX); // -1, 0, 1  (for left, none and right)
	zog(e.swipeY); // -1, 0, 1  (for up, none and down)

	// move directly:
	// rect.x += distance * e.swipeX;
	// rect.y += distance * e.swipeY;
	// stage.update();

	// or animate
	zim.move({
		target:rect,
		x:rect.x+distance*e.swipeX,
		y:rect.y+distance*e.swipeY,
		time:400,
		ease:"quadOut"
	});
});
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
obj - the object you want to swipe on
distance - (default 30) the distance in pixels to activate swipe
	might want to pass in a pixel distance based on percentage of stage
time - (default 80) time in milliseconds to travel that distance
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
--*///+70
	zim.Swipe = function(obj, distance, duration) {

		var sig = "obj, distance, duration";
		var duo; if (duo = zob(zim.Swipe, arguments, sig, this)) return duo;
		z_d("70");
		this.cjsEventDispatcher_constructor();

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
	zim.extend(zim.Swipe, createjs.EventDispatcher, "clone", "cjsEventDispatcher", false);
	//-70

/*--
zim.Pages = function(holder, pages, transition, speed, transitionTable)

Pages
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Pages handle going between pages.
Make a Pages object and add it to the stage.
All your pages from then on are added to and manipulated inside the Pages object.
Pages allows you to set the destination pages for swipe events.
Other events like buttons can call the go(page, direction) method.
Consider using zim.HotSpots() to efficiently handle multiple buttons.

EXAMPLE
// make pages (these would be containers with content)
var home = new zim.Rectangle(stageW, stageH, "blue");
var hide = new zim.Rectangle(stageW, stageH, "green");
var find = new zim.Rectangle(stageW, stageH, "yellow");

var pages = new zim.Pages({
	holder:stage,
	pages:[
		// imagine pages to the left, right, up and down
		// swipe:["to page on left", "to page on right", etc.s]
		{page:home, swipe:[null,"info",hide,find]},
		{page:hide, swipe:[null,null,null,home]},
		{page:find, swipe:[null,null,home,null]}
	],
	transition:"slide",
	speed:1000 // slower than usual for demonstration
});
stage.addChild(pages);

// handle any events inserted into the swipe arrays
pages.on("info", function(){zog("info requested")});

// handle any custom requirements when arriving at a page
// the event gives you the page object
// so add a name properties just make it easier to manage
home.name = "home";
hide.name = "hide";
find.name = "find";
pages.on("page", function() {
	zog(pages.page.name); // now we know which page we are on
})

// you can manually go to pages as well
// we will make a little triangle to click:
var back = new zim.Triangle({color:"red"});
back.center(find); // add triangle to find page
// not really supposed to add things to zim shapes
// they default to mouseChildren false
// we want to click on the back button
// so we have to set the mouseChildren of find to true
find.mouseChildren = true;
back.cursor = "pointer";
back.on("click", function() {pages.go(home, "up")});
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
holder - where are we putting the pages (eg. stage) (used for setting transition properties)
pages - (default null) an array of page objects - for example:
	[{page:home, swipe:[null,"info",hide,find]},{page:hide, swipe:[null,null,null,home]}]
	the pages should be containers - it helps to give them each a name property
	the optional swipe array holds mappings to swipe events ["right", "left", "down", "up"]
	in other words, these could be pages to the left, right, top and bottom of the current page
	or they can call commands as strings
transition - (default "none") the type of transition "none", "reveal", "slide", "fade", "black", "white"
speed - (default 200) speed in milliseconds of the transition if set
transitionTable - (default none) an array to override general transitions with following format:
	[[fromPage, toPage, "transition", ms(optional)], etc.]

METHODS
addPage() - lets you alternatively add pages after you create the object
removePage() - lets you remove a page (if on this page, call a go() first and remove on the page event)
setSwipe() - lets you set the swipe array for a page
go(newPage, direction, trans, ms) - lets you go to a page for events other than swipe events
	direction is which way the pages is relative to the current page
	trans and ms are optional and will override any previously set transitions (speed in ms)
resize() - call to resize transitions - not the pages themselves (use layouts)
pause() - pauses a transition before it starts (call from swipe event)
unpause() - unpauses a paused transition (unless another go() command is called)
puff(time) - adds all the pages behind the currentPage (adding time (ms) will auto calls settle)
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

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, compositeOperation, etc.

EVENTS
Pages dispatches a "page" event when the page changes (to a page in the swipe array)
myPages.on("page",function(e){...})
with myPages.page being set to the new page (e.target.page)
and myPages.lastPage being set to the old page (e.target.lastPage)
myPages.direction gets the direction of the transition (e.target.direction)

if there is a string in the swipe array like "info"
then the zim.Pages() object dispatches an event equivalent to the string
for the data example above, myPages.on("info",function(e){...});
would trigger when the home page is swiped to the left

Pages dispatches a "swipe" event before changing pages if swiped
you can then get pages.page, pages.nextPage and pages.direction
you can pause() if needed the transition to handle data, etc. and then unpause()
you do not need to handle going to another page when swiping - that is handled automatically
so you probably will not use the swipe event unless handling data between pages

Pages also dispatches a "pagetransitioned" event when a transition is complete
you will have the same properties available as with the page event

USAGE
the first page object is the start page
for the data above, swiping the home page down automatically goes to the hide page
if the home page is swiped up it automatically goes to the find page
you can add pages with the addPage() method
it will not show until you swipe or go to it - unless it was the first page added
1. if the holder is the stage then add the pages object to the stage
2. if the holder is another container then add pages object to the holder
and add the holder to the stage (read this twice to make sure you got it!)
in the second case, you will have to mask the holder so you do not see transitions
DO NOT add the pages to the stage or holder - let Pages do it for you
sometimes you need a page to be on the stage to operate on it
if this is the case, call puff() and make adjustments
call settle() when done - or pass in a time in ms to puff to auto settle after that time
you can define multiple pages objects add and remove pages objects as needed
--*///+71
	zim.Pages = function(holder, pages, transition, speed, transitionTable) {

		var sig = "holder, pages, transition, speed, transitionTable";
		var duo; if (duo = zob(zim.Pages, arguments, sig, this)) return duo;
		z_d("71");
		this.zimContainer_constructor();

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

		var currentPage = this.page = pages[0] ? pages[0].page : null;

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
					that.dispatchEvent("pagetransitioned");
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
					// that.dispatchEvent("pagetransitioned"); // hmmm... no
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
	zim.extend(zim.Pages, zim.Container, "clone", "zimContainer", false);
	//-71


/*--
zim.HotSpots = function(spots, local, mouseDowns)

HotSpots
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
HotSpots allow you to create multiple zim.hotSpot objects on multiple pages.
A zim.hotSpot is an invisible click area (like an image map in HTML).
You can alternatively specify an object and it will turn that into a hotSpot.
zim.HotSpots lets you control many or all of your interactions in one place.

EXAMPLE
// our first hotSpot will be a 50 pixel square at 100, 100
// then we will add hotSpots to these items as well
var circle = new zim.Circle(60, "red");
circle.center(stage);

var button = new zim.Button();
stage.addChild(button);
button.x = stageW - button.width - 100;
button.y = stageH - button.height - 100;

// make the hotSpots object
// these are all on the same page
// gets really handy when you have multiple pages with zim.Pages
var hs = new zim.HotSpots([
	{page:stage, rect:[100,100,50,50], call:function(){zog("hot!");}},
	{page:stage, rect:circle, call:function(){zog("circle!");}},
	{page:stage, rect:button, call:function(){zog("button!");}},
]);
// hs.show(); // uncomment this to see rectangle hotSpots
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
spots - an array of hotspot data objects with the following format:
	[{page:home, rect:[190,50,260,260], call:someFunction},
	 {page:home, rect:[70,405,500,150], call:someOtherFunction}]
	the page should be a createjs Container
	the rect is the [left, right, width, height] of a rectangle relative to the stage
	call is the callback function to call when a hotSpot is clicked
	instead of a rect array you can pass an object that must have setBounds() set
	[{page:home, rect:submitButton, call:function(){//code}}]
	the hotSpot will then use the button position and bounds as the rectangle
	note - in this case, HotSpots will actually add a mousedown or click event to the button
local (default true) hotSpot rect is based on local coordinates of the container
	use when the element scale independently from the stage
	if set to false then you pass in global coordinates and hotSpot will convert them
mouseDowns (default false) stops mousedown events on a button that is used as a hotSpot
	prevents users from activating a swipe on a button (when using ZIM Swipe)

METHODS
show() - shows the hotspots for testing during authoring time
hide() - hides the hotspots
addHotSpot(page,rect,call) - can dynamically add hotSpots
removeHotSpots(page,id) - id is optional - so can remove all spots on a page
dispose() - removes listeners

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

NOTE: the class does actually add rectangle shapes to your page
the spot is a pixel rect with an alpha of .01 and then uses a hitArea of a backing shape
this could have been done with "math" alone but rollover cursor would be a pain
the class creates zim.HotSpot objects - see the class underneath this one
--*///+72
	if (zot(zim.ACTIONEVENT)) zim.ACTIONEVENT = "mousedown";

	zim.HotSpots = function(spots, local, mouseDowns) {
		var sig = "spots, local, mouseDowns";
		var duo; if (duo = zob(zim.HotSpots, arguments, sig, this)) return duo;
		z_d("72");
		this.zimContainer_constructor();

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
	zim.extend(zim.HotSpots, zim.Container, "clone", "zimContainer", false);
	//-72


/*--
zim.HotSpot = function(obj, x, y, width, height, call, local)

HotSpot
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
HotSpot adds an invisible button to a container object (often think of this as the page).
If you want multiple spots it is more efficient to use the HotSpots class above
which manages multiple HotSpot objects (otherwise you end up with multiple event functions).
The spot is a pixel rect with an alpha of .01 and then uses a hitArea of a backing shape.
The spot will get a cursor of "pointer".

EXAMPLE
var hs = new zim.HotSpot(stage, 100, 100, 50, 50, myFunction);
function myFunction() {
	zog("activation!");
}
// hs.show(); // uncomment this to see rectangle hotSpot
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
holder - container object in which to place the hotspot (stage for instance)
x, y, width and height - of the rectangle for the hotspot
call - the function to call when the spot is pressed
local (default true) hotSpot rect is based on local coordinates of the container
	use when the element scale independently from the stage
	if set to false then you pass in global coordinates and hotSpot will convert them

METHODS
show() - helps when creating the spot to see where it is
hide() - hides the hotspot
dispose() - removes the listener and the spot

PROPERTIES
spot - the actual hotSpot object that gets added to the container can be accessed with the spot property
eg. hs.spot

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)
--*///+73
	zim.HotSpot = function(obj, x, y, width, height, call, local) {

		var sig = "obj, x, y, width, height, call, local";
		var duo; if (duo = zob(zim.HotSpot, arguments, sig, this)) return duo;
		z_d("73");
		this.zimContainer_constructor();

		if (zot(obj) || !obj.addChild) {zog("zim pages - HotSpot():\nPlease pass in container object for obj"); return;}
		if (obj instanceof createjs.Container == false) {zog("zim pages - HotSpot():\nObjects passed in should be Containers"); return;}
		if (zot(x) || zot(y) || zot(width) || zot(height)) {zog("zim pages - HotSpot():\nPlease pass in x, y, width, height"); return;}
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
	zim.extend(zim.HotSpot, zim.Container, "clone", "zimContainer", false);
	//-73

/*--
zim.Manager = function()

Manager
zim class

DESCRIPTION
used internally to make GridManager and GuideManager
and in future perhaps OutlineManager
--*///+75
	zim.Manager = function(type) {
		z_d("75");
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
			zog(that.items.length);
			for (var i=that.items.length-1; i>=0; i--) {
				that.items[i].dispose();
			}
			that.items = [];
			that = null;
			return true;
		}
	}//-75


/*--
zim.Guide = function(obj, vertical, percent, hideKey, pixelKey)

Guide Class
extends a zim.Container which extends a createjs.Container

DESCRIPTION
Guide shows a guideline to help layout assets with code.
Cursor x and y in percentage or pixels are shown along edges
as a distance from the guide.
You only need one guide per axis because you measure from the guide to your cursor.
Use the G key to toggle guide visibility.
Use the P key to toggle percent and pixels.
Make sure you remove the guide for your final version (dispose).

EXAMPLE
// simple form for a vertical guide
// use the distance from the guide to your cursor to measure
// so you only need one vertical guide for horizontal measurement
var guide = new zim.Guide(stage);

// better to add guides to a GuideManager
var manager = new zim.GuideManager();
manager.add(new zim.Guide(stage));
manager.add(new zim.Guide(stage, false));

// or with pixels
// manager.add(new zim.Guide(stage, true, false));
// manager.add(new zim.Guide(stage, false, false));

// then you can remove all guides with
// manager.dispose();
// handy with guides on multiple zim.Pages

// and in frame resize event we can resize all guides:
frame.on("resize", function() {manager.resize();})
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
obj - object to add guide to for example the stage
vertical - (default true) set to false for horizontal guide
percent - (default true) set to false to show pixels
hideKey - (default G) key to press to hide guide
pixelKey - (default P) key to press to swap percent and pixels

METHODS
resize() - resizes the guide if the container size changes (put in frame resize event)
dispose() - removes keyboard event listeners and guide

PROPERTIES
pixels - boolean - set to true to change to pixels, false to go to percent
--*///+76
	zim.Guide = function(obj, vertical, percent, hideKey, pixelKey) {

		var sig = "obj, vertical, percent, hideKey, pixelKey";
		var duo; if (duo = zob(zim.Guide, arguments, sig, this)) return duo;
		z_d("76");
		this.zimContainer_constructor();

		if (zot(obj)) obj = "stage";
		if (zot(vertical)) vertical = true;
		if (obj != "stage" && (!obj.getBounds || !obj.getBounds())) {zog ("zim pages - Guide(): Please provide bounds for the obj (setBounds())"); return;}
		if (zot(percent)) percent = true;
		if (zot(hideKey)) hideKey = "G";
		if (zot(pixelKey)) pixelKey = "P";

		var that = this;
		var stage;
		var stageEvent;

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
			var box = new zim.Container();
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
				g.s("#00c5af").sd([20,20]).mt(0,0).lt(0,objH).sd();
				line.cache(-10,0,20,objH);
			} else {
				g.c().s("rgba(255,0,255,.1)").ss(20).mt(0,0).lt(objW,0);
				g.f().s("white").ss(2).mt(0,0).lt(objW, 0);
				g.s("#d61fa0").sd([20,20]).mt(0,0).lt(objW, 0).sd();

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
	zim.extend(zim.Guide, zim.Container, "clone", "zimContainer", false);
	//-76


/*--
zim.GuideManager = function()

GuideManager
zim class - extends the ZIM Manager abstract class

DESCRIPTION
Add Zim Guide objects to a GuideManager object and update or remove all guides at once.
Guides are handy to use but perhaps annoying to update and remove if you have many.
GuideManager keeps track of the guides and lets you update or dispose of them on command.

EXAMPLE
var manager = new zim.GuideManager();
manager.add(new zim.Guide(stage));
manager.add(new zim.Guide(stage, false));

// or with pixels
// manager.add(new zim.Guide(stage, true, false));
// manager.add(new zim.Guide(stage, false, false));

// then you can remove all guides with
// manager.dispose();
// handy with guides on multiple zim.Pages

// and in frame resize event we can resize all guides:
frame.on("resize", function() {manager.resize();})
END EXAMPLE

PROPERTIES
items - an array of all Guide objects added with add()

METHODS
add(guide) - registers a guide with the GuideManager
resize() - resizes all the guides in the GuideManager (ie. if stage changes)
dispose() - disposes all guides and the GuideManager

NOTE: to just hide guides, you use the G key
and to toggle percent and pixels use the P key
you can dispose guides individually or use this class to dispose all
disposing will remove the G, P key listener and the guide
--*///+77
	zim.GuideManager = function() {
		z_d("77");
		zim.Manager.call(this, "GuideManager");
	}
	zim.GuideManager.prototype = new zim.Manager();
	zim.GuideManager.prototype.constructor = zim.GuideManager;
	//-77

/*--
zim.Grid = function(obj, color, percent, hideKey, pixelKey)

Grid
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
A Grid shows gridlines to help layout assets with code (percent is default).
Cursor x and y percentage or pixels are shown along edges.
Use the G key to toggle grid visibility.
Use the P key to toggle percent and pixels.
Make sure you remove the grid for your final version (dispose).

EXAMPLE
var grid = new zim.Grid(stage);

// better to add grids to a GridManager
var manager = new zim.GridManager();
manager.add(new zim.Grid(stage));

// or with pixels
// manager.add(new zim.Grid(stage, null, false));

// then you can remove all grids with
// grid.dispose();
// handy with guides on multiple zim.Pages

// and in frame resize event we can resize all grids:
frame.on("resize", function() {manager.resize();})
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
obj - the object to add grid to (for example the stage)
color - (default black) the color of the grid
percent - (default true) set to false to show pixels
hideKey - (default G) key to press to hide grid
pixelKey - (default P) key to press to swap percent and pixels

METHODS
resize() - resize the grid if the container changes size (eg. put in frame resize event)
dispose() - clears keyboard events and grid

PROPERTIES
pixels - boolean - set to true to change to pixels, false to go to percent
--*///+78
	zim.Grid = function(obj, color, percent, hideKey, pixelKey) {

		var sig = "obj, color, percent, hideKey, pixelKey";
		var duo; if (duo = zob(zim.Grid, arguments, sig, this)) return duo;
		z_d("78");
		this.zimContainer_constructor();

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
			var box = new zim.Container();
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

			if (obj && obj.getBounds) {
				objW = obj.getBounds().width;
				objH = obj.getBounds().height;
			}
			if (stage) {
				stage.mouseMoveOutside = true;
				stage.enableMouseOver(10);
			}

			maxX = objW-boxW*2/3;
			maxY = objH-boxH - boxH;

			cached = new zim.Container();
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

		 	if (stage) stage.update();
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
	zim.extend(zim.Grid, zim.Container, "clone", "zimContainer", false);
	//-78


/*--
zim.GridManager = function()

GridManager
zim class - extends a zim.Manager

DESCRIPTION
Add Zim Grid objects to a GridManager object and update or remove all grids at once.
Grids are handy to use but perhaps annoying to update and remove if you have many.
GridManager keeps track of the grids and lets you update or dispose of them on command.

EXAMPLE
var manager = new zim.GridManager();
manager.add(new zim.Grid(stage));

// or with pixels
// manager.add(new zim.Grid(stage, null, false));

// then you can remove all grids with
// grid.dispose();
// handy with guides on multiple zim.Pages

// and in frame resize event we can resize all grids:
frame.on("resize", function() {manager.resize();})
END EXAMPLE

METHODS
add(grid) - registers a grid with the GridManager
resize() - resizes all the grids in the GridManager (ie. if stage changes)
dispose() - disposes all grids and the GridManager

NOTE: to just hide grids, you use the G key
and to toggle percent and pixels use the P key
you can dispose grids individually or use this class to dispose all
disposing will remove the G key listener and the grid

PROPERTIES
items - an array of all Grid objects added with add()
--*///+79
	zim.GridManager = function() {
		z_d("79");
		zim.Manager.call(this, "GridManager");
	}
	zim.GridManager.prototype = new zim.Manager();
	zim.GridManager.prototype.constructor = zim.GridManager;
	//-79

/*--
zim.Layout = function(holder, regions, lastMargin, backgroundColor, vertical, regionShape, scalingObject, hideKey)

Layout
zim class - extends a createjs.EventDispatcher

DESCRIPTION
Layout arranges objects on the page by fitting them in regions.
Make a layout object for each page if desired
and even nest layout objects inside regions.
Fixed aspect ratio content is fit into regions.
Layout is good for flexive design where you anchor titles and navigation.
Layout handles any number of regions vertically or horizontally.
It is useful for full scale mode for different devices or browser window scale.
You need to run the resize() method to update the layout.
Put the all your layouts in zim.LayoutManager to scale all at once.

EXAMPLE
// these would be containers with your content
// make sure that bounds are set on containers
// you may want to hard code bounds for clarity
var header = new zim.Rectangle(500, 200, "blue");
var content = new zim.Rectangle(600, 500, "green");
var footer = new zim.Rectangle(500, 200, "blue");
stage.addChild(header, content, footer);

// make the Layout - more useful for FULL scale mode
var layout = new zim.Layout({
	holder:stage,
	regions:[
		{object:header, marginTop:10, maxWidth:80, minHeight:10, valign:"top"},
		{object:content, marginTop:5, maxWidth:90}, // note, middle gets no minHeight
		{object:footer, marginTop:5, maxWidth:80, height:10}
	],
	lastMargin:5
});

// add to LayoutManager to resize or dispose all layouts together
// disposing only removes keyboard events to show boundaries
var manager = new zim.LayoutManager();
manager.add(layout);

frame.on("resize", function() {
	manager.resize();
	stage.update();
});

stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
holder - object to hold layout (stage, container, etc) that must have bounds set
regions - an array of region objects with specific properties for each
	Example VERTICAL region objects - all dimensions are percents
		[{object:title, marginTop:10, maxWidth:80, minHeight:20, align:"left", valign:"top"},
		{object:content, marginTop:5, maxWidth:90}, // note, middle gets no minHeight
		{object:nav, marginTop:5, maxWidth:80, height:20, backgroundColor:"red"}]
	note: no minHeight for middle regions - but heights on any region
	align defaults to middle for the regions
	valign defaults to top and bottom for the top and bottom region and middle for the others
	backgroundColor applies a backing color to the region
	Example HORIZONTAL region objects
		[{object:col1, marginLeft:10, maxHeight:80, width:20, valign:"bottom"},
		{object:col2, marginLeft:5, maxHeight:90, align:"middle"}, // note, middle gets no minWidth
		{object:col3, marginLeft:5, maxHeight:80, minWidth:20, align:"left", valign:"top"}]
	align defaults to left and right for the outer regions and middle for the inside regions
	valign defaults to top for all the regions
lastMargin - (default 0) the margin at the bottom (vertical) or at the right (horizontal)
backgroundColor - (default null) background color for the whole holder
vertical - (default true) set to false for horizontal layout
regionShape - (default null) a zim or createjs Shape object to show bounds (gets added to holder)
	can toggle on and off with B key - but must pass in the Shape to use the B key
scalingTarget - (default holder) an object used as the bounds of the region scaling
	setting a scalingTarget will also set the bounds of the holder to the scalingTarget bounds
	it does not scale the holder - only scales the region objects inside
hideKey - (default B) is the hot key for hiding and showing the bounds

METHODS
resize() - resize based on new bounds of the holder (or scalingObject)
dispose() - removes the B key listener (otherwise, nothing to dispose)
addShape(shape) - adds a bounding shape dynamically
removeShape() - permanently removes the bounding shape
disable() - disables all the layout (shape and sizing)
enable() - enables all the layout (shape and sizing)
if you want to get rid of the objects then you need to do so in your app

PROPERTIES
regions - the regions object - if changed will have to call resize() manually

DESCRIPTION OF FLEXIVE DESIGN
here described with vertical layout - horizontal is similar but rotated 90
the content in the middle will try and expand against the top and bottom
until it forces the top and bottom to their minimum percents
if the content hits its maximum width percent first then the top and bottom
will fill up the rest of the height until they reach their maximum widths
--*///+80
	zim.Layout = function(holder, regions, lastMargin, backgroundColor, vertical, regionShape, scalingObject, hideKey) {

		var sig = "holder, regions, lastMargin, backgroundColor, vertical, regionShape, scalingObject, hideKey";
		var duo; if (duo = zob(zim.Layout, arguments, sig, this)) return duo;
		z_d("80");
		this.cjsEventDispatcher_constructor();

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
							// keepGoing=true;
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

				// !keepGoing was missing when secondary affects primary so took check out
				// if (!keepGoing) break;
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
					g.s("#ff8203").sd([20,20]).r(f.bX,f.bY,f.bWidth,f.bHeight).sd();
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
			// does not really dispose in case a resize is needed
			// it has no events aside from the keydown
			// which gets removed when we removeShape below
			that.removeShape();
			return true;
		}
	}
	zim.extend(zim.Layout, createjs.EventDispatcher, "clone", "cjsEventDispatcher", false);
	//-80

/*--
zim.LayoutManager = function()

LayoutManager
zim class

DESCRIPTION
Add Zim Layout objects to a LayoutManager object and update them all at once.
You can remove all layout region bound shapes at once
as well as remove the B key to show the region bound shapes.
For a final project, call the dispose().
This will remove all shapes and key events.
The layouts will remain in place to handle multiple screen sizes.

EXAMPLE
// these would be containers with your content
// make sure that bounds are set on containers
// you may want to hard code bounds for clarity
var header = new zim.Rectangle(500, 200, "blue");
var content = new zim.Rectangle(600, 500, "green");
var footer = new zim.Rectangle(500, 200, "blue");
stage.addChild(header, content, footer);

// make the Layout - more useful for FULL scale mode
var layout = new zim.Layout({
	holder:stage,
	regions:[
		{object:header, marginTop:10, maxWidth:80, minHeight:10, valign:"top"},
		{object:content, marginTop:5, maxWidth:90}, // note, middle gets no minHeight
		{object:footer, marginTop:5, maxWidth:80, height:10}
	],
	lastMargin:5
});

// add to LayoutManager to resize or dispose all layouts together
// disposing only removes keyboard events to show boundaries
var manager = new zim.LayoutManager();
manager.add(layout);

frame.on("resize", function() {
	manager.resize();
	stage.update();
});

stage.update();
END EXAMPLE

METHODS
add(layout) - registers a layout with the LayoutManager
resize() - resizes all the layouts in the LayoutManager
disable() - disables all the layouts in the LayoutManager (shapes and sizing)
enable() - enables all the layouts in the LayoutManager (shapes and sizing)
dispose() - only removes bounds shapes and keyboard events (does not really dispose)

NOTE: to just hide bounds, you use the B key

PROPERTIES
items - an array of all Layout objects added with add()
--*///+81
	zim.LayoutManager = function() {
		z_d("81");
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
	}//-81

/*--
zim.Parallax = function(stage, damp, layers, auto)

Parallax
zim class

DESCRIPTION
Takes objects as layers and sets properties based on an input,
for instance, each layer could move a different x based on position of mouseX
or each layer could scale a different amount based on scroll of y.
The types of input are mouseX, mouseY, scrollX, scrollY or custom.
The types of properties to change could be x, y, scaleX, scaleY, rotation, alpha, frameNumber, etc.
Parallax allows scale to be a property which scales scaleX and scaleY together.
Parallax allows frame to be a property and calls gotoAndStop() on a Sprite frame.
Parallax really just manages multiple ProportionDamp objects.
For proper parallax, the objects closer move more than the objects farther back.

EXAMPLE
// make assets to move around
// these could be pictures, shapes, containers, etc.
var backing = new zim.Rectangle(800, 200, "yellow");
backing.center(stage);
var mid = new zim.Rectangle(400, 200, "green");
mid.center(stage).y += 20;
var front = new zim.Circle(60, "red");
front.center(stage).y += 80;

// make Parallax object - here we move with stage mouseX and mouseY
var parallax = new zim.Parallax(stage, .1, [
	{obj:backing, prop:"x", propChange:50}, {obj:backing, prop:"y", propChange:40, input:"mouseY"},
	{obj:mid, prop:"x", propChange:100}, {obj:mid, prop:"y", propChange:80, input:"mouseY"},
	{obj:front, prop:"x", propChange:150}, {obj:front, prop:"y", propChange:100, input:"mouseY"}
]);

stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
stage - the stage
damp - (default .1) the damp value with 1 being no damping and 0 being no movement
layers - (default null) an array of layer objects, the format as below
	Example: to move an obj 200 px in the x as the window scrolls from 100 to 300 px in the y
		[{obj:obj, prop:"x", propChange:200, input:"scrollY", inMin:100, inMax:300, factor:1, integer:false}, etc.]
	obj - the object whose property is being changed
	prop - the property that is being changed
	propChange - how much you want the property to change
	input - (default mouseX) but can also be mouseY, scrollX, scrollY
	inMin - (default 0) minimum input range
	inMax - (default stageW (for x prop) stageH (for y prop)) maximum input range
	factor - (default 1) set factor to -1 to change in the opposite direction
	integer - (default false) set to true to round the value to an integer
	Example 2: a traditional mouse move parallax for one object
		[{obj:obj, prop:"x", propChange:100}, {obj:obj, prop:"y", propChange:50, input:"mouseY"}, etc.]
	you would probably have more objects to follow
	or you can add these one at a time with the p.addLayer({layer object properties});
auto - (default true) uses the specified input
	if auto is set to false, you must make your own Ticker and use the step(input) method
NOTE: ticker and fps parameters have been removed - see zim.Ticker to set

METHODS
addLayer({layer object properties}) - adds a layer
removeLayer(index) - removes a layer based on order added
step(input) - used when auto is false to send in custom input data
immediate([]) - immediately sets the target value for each layer object (no damping)
dispose() - removes listeners

PROPERTIES
damp - allows you to dynamically change the damping
--*///+68
	zim.Parallax = function(stage, damp, layers, auto) {

		var sig = "stage, damp, layers, auto";
		var duo; if (duo = zob(zim.Parallax, arguments, sig, this)) return duo;
		z_d("68");
		if (zot(stage) || !stage.getBounds) {zog("zim build - Parallax(): please pass in the stage with bounds as first parameter"); return;}
		if (!stage.getBounds()) {zog("zim build - Parallax(): Please give the stage bounds using setBounds()");	return;}
		if (zot(auto)) auto = true;

		var stageW = stage.getBounds().width;
		var stageH = stage.getBounds().height;

		var that = this;

		// public properties
		var _damp = (zot(damp)) ? .1 : damp;

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
			obj["p_"+obj.prop] = new zim.ProportionDamp(inMin, inMax, 0, obj[obj.prop], _damp, factor, integer);
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
			var zimTicker = zim.Ticker.add(animate, stage);
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

		Object.defineProperty(that, 'damp', {
			get: function() {
				return _damp;
			},
			set: function(value) {
				_damp = value;
				var o;
				for (var i=0; i<myLayers.length; i++) {
					o = myLayers[i];
					o["p_"+o.prop].damp = _damp;
				}
			}
		});

	}//-68


/*--
zim.Scroller = function(backing, speed, direction, horizontal, gapFix, stage, container)

Scroller
zim class extends a createjs.EventDispatcher

DESCRIPTION
Scroller animates a backing either horizontally or vertically (not both).
The Scroller object will create a clone of the backing
and animate and swap the backgrounds when needed.

NOTE: A scroller can be added to a zim.Accelerator object
this will allow the percentSpeed to be synched with other Scroller and Dynamo objects
See http://zimjs.com/code/zide/

EXAMPLE
var one = new zim.Rectangle(1200, 400, "red");
frame.makeCircles().center(one);
stage.addChild(one);

var scroller = new zim.Scroller(one);

stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
background - an object to animate (make start and end edges match to be seemless)
speed - (default 1) how fast in pixels per second the animation is going
direction - (default 1) set to -1 for left or down
horizontal - (default true) set to false to animate vertically
	you can adjust the speed and direction properties dynamically
	you cannot adjust the backings and horizontal dynamically
	to change your animation, dispose() of the Scroller object and make a new one
	disposing just removes the ticker - you have to remove the backings
	NOTE: the gapFix and ticker parameters have been removed - see zim.Ticker
gapFix - (default 0) if a thin line appears when changing speed - try setting to 1 or 2
stage - (default background.stage) if the backround is not on the stage then need to pass the stage it will be on
container - (default stage) what bounds are used for wrapping the background

METHODS
pause(state) - state defaults to true and pauses the scroller (sets speed to 0)
	set state to false to unpause the scroller (sets speed to speed before pausing)
dispose() - get rid of the event listeners - you need to remove the backings (see backing properties)

PROPERTIES
backing1 - the original backing passed in
backing2 - the cloned backing made from the original backing
speed - how fast the animation is going in pixels per frame
baseSpeed - the scroller speed when it was first made (or can override)
	used to determine percentage speed for percentSpeed property
percentSpeed - get or set the percentage of the baseSpeed
	this allows you to animate multiple scrollers relative to one another
	See ScrollerManager class
direction - either left or right if horizontal or up or down if not horizontal
pause - read only - true if paused and false if not - must be set with pause() method

EVENTS
Dispatches a pause event when paused is complete (sometimes a delay to slow to pause)
--*///+69
	zim.Scroller = function(backing, speed, direction, horizontal, gapFix, stage, container) {
		var sig = "backing, speed, direction, horizontal, gapFix, stage, container";
		var duo; if (duo = zob(zim.Scroller, arguments, sig, this)) return duo;

		z_d("69");
		this.cjsEventDispatcher_constructor();
		var b1 = this.backing1 = backing;
		if (zot(b1) || !b1.getBounds) return;
		var b2 = this.backing2 = backing.clone();
		b1.parent.addChild(b2);
		if (zot(horizontal)) horizontal = true;
		if (zot(gapFix)) gapFix = 0;
		var that = this; // we keep animate protected but want to access public properties

		// here are the public properties that can be changed
		this.speed = (zot(speed)) ? 1 : speed;
		var lastSpeed = this.baseSpeed = this.speed;
		this.direction = (zot(direction)) ? 1 : direction;
		var scale = horizontal ? b1.scaleX : b1.scaleY;

		if (!b1.getBounds()) {
			zog("zim build - Scroller(): please setBounds() on backing objects");
			return;
		}
		if (!stage && !b1.getStage()) {
			zog("zim build - Scroller(): please pass in stage parameter or add backing objects to stage to start");
			return;
		}
		stage = stage||b1.getStage();
		if (zot(container)) container = stage;
		if (!container.getBounds()) {zog("zim build - Scroller(): please setBounds() on container or stage if no container"); return;}

		var w = b1.getBounds().width*scale-gapFix;
		var h = b1.getBounds().height*scale-gapFix;

		var viewW;
		var viewH;

		if (horizontal) {
			b2.x = w;
		} else {
			b2.y = h;
		}

		var pausing = false; // for in the act of pausing
		var zimTicker = zim.Ticker.add(animate, stage);

		function animate(e) {
			if (!viewW) {
				viewW = container.getBounds().width;
				viewH = container.getBounds().height;
			}
			// pausing the ticker does not really pause the ticker (weird)
			if (that.speed == 0 || that.direction == 0) {return;}

			if (horizontal) {
				b1.x -= that.speed*that.direction;
				if (b1.x < b2.x) {
					b2.x = b1.x + w;
				} else {
					b2.x = b1.x - w;
				}
				if (that.direction * that.speed > 0) {
					if (b2.x < 0 && b1.x < b2.x) {
						b1.x = b2.x + w;
					} else if (b1.x < 0 && b2.x < b1.x) {
						b2.x = b1.x + w;
					}
				} else {
					if (b2.x > viewW && b2.x > b1.x) {
						b2.x = b1.x - w;
					} else if (b1.x > viewW && b1.x > b2.x) {
						b1.x = b2.x - w;
					}
				}
			} else {
				b1.y -= that.speed*that.direction;
				if (b1.y < b2.y) {
					b2.y = b1.y + h;
				} else {
					b2.y = b1.y - h;
				}
				if (that.direction * that.speed > 0) {
					if (b2.y < 0 && b1.y < b2.y) {
						b1.y = b2.y + h;
					} else if (b1.y < 0 && b2.y < b1.y) {
						b2.y = b1.y + h;
					}
				} else {
					if (b2.y > viewH && b2.y > b1.y) {
						b2.y = b1.y - h;
					} else if (b1.y > viewH && b1.y > b2.y) {
						b1.y = b2.y - h;
					}
				}
			}
		}

		this.paused = false;
		this.pause = function(state, time) {
			if (zot(state)) state = true;
			if (zot(time)) time = 0;
			if (state) {
				lastSpeed = that.speed;
				if (time > 0) {
					pausing = true;
					zim.animate({target:that, obj:{pausingSpeed:0}, ticker:false, time:time, call:function() {
						that.speed = 0;
						that.paused = true;
						pausing = false;
						that.dispatchEvent("pause");
					}});
				} else {
					pausing = false;
					that.speed = 0;
					that.paused = true;
					setTimeout(function() {that.dispatchEvent("pause");}, 10);
				}
			} else {
				pausing = false;
				if (time > 0) {
					zim.animate({target:that, obj:{pausingSpeed:lastSpeed}, ticker:false, time:time, call:function() {
						that.speed = lastSpeed;
						that.paused = false;
						pausing = false;
					}});
				} else {
					that.speed = lastSpeed;
					that.paused = false;
				}
			}
			return that;
		}

		Object.defineProperty(that, 'percentSpeed', {
			get: function() {
				if (that.baseSpeed == 0) return NaN;
				return that.speed / that.baseSpeed * 100;
			},
			set: function(percent) {
				if (pausing || that.paused) return;
				that.speed = that.baseSpeed * percent / 100;
			}
		});

		Object.defineProperty(that, 'pausingSpeed', {
			get: function() {
				if (that.baseSpeed == 0) return NaN;
				return that.speed / that.baseSpeed * 100;
			},
			set: function(percent) {
				that.speed = that.baseSpeed * percent / 100;
			}
		});

		this.dispose = function() {
			if (zon) zog("bye from Scroller");
			zim.Ticker.remove(zimTicker);
			return true;
		}
	}
	zim.extend(zim.Scroller, createjs.EventDispatcher, null, "cjsEventDispatcher");
	//-69


/*--
zim.Dynamo = function(sprite, speed, label, startFrame, endFrame, update, reversable)

Dynamo
zim class - extends a createjs EventDispatcher

DESCRIPTION
A Dynamo can run any zim.Sprite animation at varying speeds
You pass in an optional label, or start and end frames to define the animation frames
You can animate a Dynamo using speed or percentSpeed
percentSpeed is handy for animating at speeds relative to other animations and scrollers
You can control Dynamo speeds with mouse position - or in a Parallax object
A Dynamo loops automatically - you can pause it (with optional slowing or optional frame) and unpause it (with optional quickening)
You can also get or set its frame property at which point, it will loop from there (unless paused)
A Dynamo dispatches a change event everytime the frame changes
and a loop event everytime it loops to the start and a paused event when paused

NOTE: A Dynamo can be added to a zim.Accelerator object
this will allow the percentSpeed to be synched with other Scroller and Dynamo objects
See http://zimjs.com/code/zide/

NOTE: Dynamo is an alternative to a zim.Sprite.run() where you provide a set time for animation
but you can pause a Dynamo and then use run() and then unpause the Dynamo when the run is done
If you are controlling the Dynamo in a zim.Ticker.add() function,
then make sure to remove() the Ticker function when the Dynamo is paused

EXAMPLE
// we have a sprite of a guy and it has a "walk" animation
// we can make this run faster and slower with an accelerator:
// we pass in a speed of 30 fps and this becomes the baseSpeed

var dynamo = new zim.Dynamo(sprite, 30, "walk");
zim.Ticker.add(function() {
	// the sprite will run at 0 speed when the cursor is at the left of the stage
	// and get faster as the cursor moves to the right
	// at the middle it will be 30 fps and at the right it will be 60 fps
	dynamo.percentSpeed = stage.MouseX/stageW*100*2;
}, stage);

Here we apply damping and make the sprite play backwards at the left of half stage
var dynamo = new zim.Dynamo(sprite, 30, "walk");
zim.Ticker.add(function() {
	// will play backwards at 30 fps at left and forwards at 30 fps at right
	// it will stop at half the stage width
	dynamo.percentSpeed = stage.mouseX/stageW*200 - 100;
}, stage);
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
sprite - the sprite to control
speed - (default 30) the frames per second at which to animate the sprite
label - (default null) the label of the sprite to play (see zim.Sprite)
startFrame - (default 0) the frame to start the animation (ignored if a label is provided)
endFrame - (default sprite.totalFrames) the frame to end the animation (ignored if a label is provided)
update - (default false) set to true to update the stage (only do this if you are not already updating the stage!)
reversable - (default true) will allow percentSpeed to be negative and reverse the animation.  Set to false to use absolute value.

METHODS
pause(state, time, frame) - the way to pause or unpause a Dynamo affecting the sprite animating
	state - (default true) true pauses and setting the state to false will unpause the animation
	time - (default 0) time in milliseconds to slow the animation down if pausing or speed it up if unpausing
	frame - (default null) which frame to pause on - overrides time (unless you want to do the calculation...)
dispose() - cancels the requestAnimationFrame

PROPERTIES
frames - an array of frame numbers the Dynamo is acting on according to label, or startFrame, endFrame
frame - the current frame of the Dynamo - this is sequential relative to frames
	whereas the actual Sprite frame may be different as labels can specify non-consecutive frame numbers
totalFrames - the total frames in frames (may be different than the Sprite's total frames)
percentSpeed - get or set the percentage of the baseSpeed
	this is what you should animate to speed up and slow down the sprite
	this allows you to set the speed relative to other Sprites and Scrollers
speed - get or set the speed of the sprite in frames per second
baseSpeed - the start speed given in frames per second unless changed with this property
	this affects the percentSpeed so usually it is not adjusted - but it can be
paused - read only - whether the Dynamo is paused or not (by using the pause() method)

EVENTS
dispatches a change event when the Dynamo changes frame
dispatches a loop event when the Dynamo loops (possibly in reverse)
dispatches a pause event when the Dynamo is paused - could be delayed
--*///+69.2
	zim.Dynamo = function(sprite, speed, label, startFrame, endFrame, update, reversable) {
		var sig = "sprite, speed, label, startFrame, endFrame, update, reversable";
		var duo; if (duo = zob(zim.Dynamo, arguments, sig, this)) return duo;

		z_d("69.2");
		this.cjsEventDispatcher_constructor();

		var frames = this.frames = sprite.parseFrames(label, startFrame, endFrame);
		if (frames.length == 0) return;
		this.totalFrames = frames.length;
		var _frame = 0; // frame for getter and setter methods
		if (zot(speed)) speed = 30;
		if (zot(reversable)) reversable = true;
		var lastSpeed = this.baseSpeed = this.speed = speed;
		if (zot(update)) update = false;

		var that = this;
		var requestID;
		var speedFactor;
		var lastTime = Date.now();
		var currentTime;
		var wait;
		var endFrameRequest;
		var pausing = false; // for in the act of pausing
		function doDynamo() {
			requestID = requestAnimationFrame(doDynamo);
			speedFactor = frames[_frame].s;
			if (that.speed == 0 || speedFactor == 0) return;
			wait = 1000/Math.abs(that.speed)*speedFactor;
			currentTime = Date.now();
			if (currentTime - lastTime > wait) {
				lastTime = currentTime;
				var nextFrame = that.frame+((that.speed>0 || !reversable)?1:-1);
				var loopCheck = false;
				if (nextFrame >= frames.length) {loopCheck = true; nextFrame = 0;}
				if (nextFrame < 0) {loopCheck = true; nextFrame = frames.length-1;}
				that.frame = nextFrame;
				if (loopCheck) that.dispatchEvent("loop");
				that.dispatchEvent("change");
				if (update && sprite.getStage()) sprite.getStage().update();
				if (!zot(endFrameRequest) && endFrameRequest == that.frame) {
					pausing = false;
					that.speed = 0;
					that.paused = true;
					that.dispatchEvent("pause");
				}
			}
		}
		doDynamo();

		this.paused = false;
		this.pause = function(state, time, frame) {
			if (zot(state)) state = true;
			if (zot(time)) time = 0;
			if (state) {
				lastSpeed = that.speed;
				if (zot(frame)) {
					if (time > 0) {
						pausing = true;
						zim.animate({target:that, obj:{pausingSpeed:0}, ticker:false, time:time, call:function() {
							pausing = false;
							that.speed = 0;
							that.paused = true;
							that.dispatchEvent("pause");
						}});
					} else {
						pausing = false;
						that.speed = 0;
						that.paused = true;
						setTimeout(function() {that.dispatchEvent("pause");}, 10);
					}
				} else {
					pausing = true;
					endFrameRequest = frame;
				}
			} else {
				endFrameRequest = null;
				if (time > 0) {
					pausing = true;
					zim.animate({target:that, obj:{pausingSpeed:lastSpeed}, ticker:false, time:time, call:function() {
						pausing = false;
						that.speed = lastSpeed;
						that.paused = false;
					}});
				} else {
					pausing = false;
					that.speed = lastSpeed;
					that.paused = false;
				}
			}
			return that;
		}

		Object.defineProperty(that, 'frame', {
			get: function() {
				return _frame;
			},
			set: function(frame) {
				_frame = Math.round(frame) % frames.length;
				var f = frames[_frame];
				if (zot(f)) return;
				sprite.frame = f.f;
			}
		});

		Object.defineProperty(that, 'percentSpeed', {
			get: function() {
				if (that.baseSpeed == 0) return NaN;
				return that.speed / that.baseSpeed * 100;
			},
			set: function(percent) {
				if (pausing || that.paused) return;
				that.speed = that.baseSpeed * percent / 100;
			}
		});

		Object.defineProperty(that, 'pausingSpeed', {
			get: function() {
				if (that.baseSpeed == 0) return NaN;
				return that.speed / that.baseSpeed * 100;
			},
			set: function(percent) {
				that.speed = that.baseSpeed * percent / 100;
			}
		});

		this.dispose = function() {
			cancelAnimationFrame(requestID);
		}
	}
	zim.extend(zim.Dynamo, createjs.EventDispatcher, null, "cjsEventDispatcher");
	//-69.2

/*--
zim.Accelerator = function(objects)

Accelerator
zim class extends a createjs.EventDispatcher

DESCRIPTION
An Accelerator lets you set percentSpeed properties of multiple objects
such as zim.Scroller and zim.Dynamo objects
A Dynamo object is a dynamic controller for a zim.Sprite object
Both the Scroller and the Dynamo can be controlled with percentSpeed
They can also be paused and paused over time
An Accelerator object lets you control these from one place

EXAMPLE
// assuming we have scroller1, scroller2 and a sprite
// each of these would have a speed set so the scene animates nicely
var accelerator = new zim.Accelerator([scroller1, scroller2, sprite]);

// here we increase the speed then decrease the speed of the whole scene:
zim.animate({target:accelerator, obj:{percentSpeed:200}, time:1000, rewind:true, ticker:false});

// here we change the speed of the whole scene based on the x position of the mouse
// at the very left, the speed is -200 percent and at the right the speed is 200 percent
// in the center, the speed is 0 - damping is optional but always looks better!
var damp = new zim.Damp(accelerator.percentSpeed);
zim.Ticker.add(function() {
	var newSpeed = (stage.mouseX-stageW/2)/(stageW/2)*100*2;
	accelerator.percentSpeed = damp.convert(newSpeed);
}, stage);
END EXAMPLE

PARAMETERS
objects - (default null) registers zim.Scroller or zim.Dynamo objects the Accelerator
	pass in a single object or an array of multiple objects

METHODS
add(objects) - registers zim.Scroller or zim.Dynamo objects with the Accelerator
	pass in a single object or an array of multiple objects
	returns the Accelerator object for chaining
remove(objects) - unregisters a zim.Scroller or zim.Dynamo
	pass in a single object or an array of multiple objects
	returns the Accelerator object for chaining
pause(state, time, frameNumber) - pause (default) or unpause all the objects added to the Accelerator
	state - (default true) set to false to unpause the objects added to the Accelerator
	time - (default 0) time in milliseconds to slow down to a speed of 0 and pause
		the pause event and paused property will be set after the time has passed
		time is ignored if a frameNumber is provided
	frameNumber - (default null) get sprites to animate to the frameNumber (probably good for one sprite!)
		setting this will make the scene ignore the time parameter above
dispose() - calls dispose() on all the objects

PROPERTIES
percentSpeed - adjusts the speed relative to the baseSpeed of each items in the Accelerator
	this can be dynamically changed to change all speeds relatively
paused - whether the Accelerator is paused or not - only tracks if the pause() method is used
items - an array of all objects added with add()
--*///+69.3
	zim.Accelerator = function(objects) {
		z_d("69.3");
		this.cjsEventDispatcher_constructor();

		var that = this;
		this.paused = false;
		this.items = [];
		this.paused = false;
		this._percentSpeed = 100;
		this.add = function(objects) {
			var list;
			if (Array.isArray(objects)) {list = objects;} else {list = [objects];}
			var ind;
			for (var i=0; i<list.length; i++) {
				ind = that.items.indexOf(list[i]);
				if (ind < 0 && list[i].pause) that.items.push(list[i]);
			}
			return that;
		}
		if (objects) this.add(objects);
		this.remove = function(objects) {
			var list;
			if (Array.isArray(objects)) {list = objects;} else {list = [objects];}
			var ind;
			for (var i=0; i<list.length; i++) {
				ind = that.items.indexOf(list[i]);
				if (ind >= 0) that.items.splice(ind,1);
			}
			return that;
		}
		this.pause = function(state, time, frameNumber) {
			if (zot(state)) state = true;
			var pausingItems = [];
			if (state) {
				if (!zot(frameNumber)) time = null;
				// if we pause the scene with a time delay or frameNumber
				// then the pause may not happen right away
				// so leave the other animations going like scrollers until the pause
				var waiting = false;
				for (var i=0; i<that.items.length; i++) {
					// if time and not totalFrames and scroller - or - dynamo and (time or frameNumber)
					if ((!zot(time) && zot(frameNumber) && !that.items[i].totalFrames) || that.items[i].totalFrames && (!zot(time) || !zot(frameNumber))) {
						that.items[i].pause(true, time, frameNumber); // frameNumber ignored by scroller
						waiting = true;
						pausingItems[i] = 1;
						that.items[i].on("pause", function(){
							if (!that.paused) {
								pauseAll(true);
								that.paused = true;
								that.dispatchEvent("pause");
							}
						}, null, true);
					}
				}
				// not waiting so pause all
				if (!waiting) {
					pauseAll();
					that.paused = true;
					setTimeout(function() {that.dispatchEvent("pause");}, 10);
				}
			} else {
				that.paused = false;
				pauseAll();
			}
			function pauseAll(fromDelay) {
				for (var i=0; i<that.items.length; i++) {
					// pauseAll does not need to pause the ones we were waiting for and are now done...
					if (pausingItems[i] != 1) {
						that.items[i].pause(state);
					}
				}
			}
		}
		Object.defineProperty(that, 'percentSpeed', {
			get: function() {
				return that._percentSpeed;
			},
			set: function(percent) {
				that._percentSpeed = percent;
				for (var i=0; i<that.items.length; i++) {
					that.items[i].percentSpeed = percent;
				}
			}
		});
		this.dispose = function() {
			for (var i=0; i<that.items.length; i++) {
				that.items[i].dispose();
			}
			return true;
		}
	}
	zim.extend(zim.Accelerator, createjs.EventDispatcher, null, "cjsEventDispatcher");
	//-69.3

/*--
zim.Swiper = function(swipeOn, target, property, sensitivity, horizontal, min, max, damp, integer)

Swiper
zim class - extends a createjs EventDispatcher

DESCRIPTION
Swiper lets you change a property of any object (with damping) by swiping.
In a sense, it is like an invisible Slider.
You pass in the DisplayObject to swipe on - stage, Container, Bitmap, etc.
You pass in which object holds the property to animate and the property name.
Then Swiper will change this property with damping based on a sensitivity you set.
You can use horizontal or vertical but to do both, you need to make two Swiper objects.
Originally made for controlling 3D objects like rotation and scale
based on swiping a rectangle beneath the 3D object that is the same color as the stage.

EXAMPLE
var circle = new zim.Circle(100, frame.green).center(stage);
// will move circle twice as fast as swipe
var swiper = new zim.Swiper(stage, circle, "x", 2);

var man = new zim.Rectangle(50, 100, frame.brown).center(stage);
// will move man up an down slowly within vertical bounds of stage
var swiper = new zim.Swiper(man, man, "y", .5, false, 0, stageH-man.height);
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
swipeOn - the DisplayObject to swipe on such as the stage or a Rectangle or Bitmap, etc.
target - the object that holds the property that you want to change
property - the property name as a String to change when swiping
sensitivity - (default 1) the change in property is equal to the change in distance times the sensitivity
	set to 2 to change the property twice as fast as the swipe
	set to .5 to change the property half as fast as the swipe
	set to .001 to change the property very little while swiping
	set to -1 to go the opposite way (or -2, -.5, -.001, etc.)
horizontal - default(true) set to false for vertical swiping (y)
min - (default null) if specified, the property value will not go below this number
max - (default null) if specified, the property value will not go above this number
damp - (default .1) the damp value with 1 being no damping and 0 being no movement
integer - (default false) set to true to round the property value

METHODS
immediate(val) - set the damping immediately to this value to avoid damping to value
dispose() - remove listeners and Ticker

PROPERTIES
target - get or set the target for the property that you are changing
property - get or set the String property name that is being damped
desiredValue - the current value that the swiper is damping towards
enabled (default true) - set to false to disable the Swiper and visa versa

EVENTS
dispatches a swipedown event when swipe is started
dispatches a swipemove event when swipe is moving
dispatches a swipeup event when swipe is ended
--*///+69.5
	zim.Swiper = function(swipeOn, target, property, sensitivity, horizontal, min, max, damp, integer) {
		var sig = "swipeOn, target, property, sensitivity, horizontal, min, max, damp, integer";
		var duo; if (duo = zob(zim.Swiper, arguments, sig, this)) return duo;
		z_d("69.5");

		this.cjsEventDispatcher_constructor();

		if (zot(swipeOn) || !swipeOn.getStage || !swipeOn.getStage()) {zog("zim.Swiper() - please provide container on stage"); return;}
		if (zot(target)) return;
		if (zot(sensitivity)) sensitivity = 1;
		if (zot(horizontal)) horizontal = true;
		if (zot(damp)) damp = .1;
		if (zot(integer)) integer = false;

		var that = this;
		var container = swipeOn;
		var startPos;
		var startVal;
		var desiredVal = that.desiredValue = target[property];
		var stage;
		this.target = target;
		this.property = property;
		var downEvent;
		var moveEvent;
		var upEvent;
		if (container.canvas) {
			downEvent = container.on("stagemousedown", function() {
				downHandler();
				moveEvent = container.on("stagemousemove", pressHandler);
				upEvent = container.on("stagemouseup", function() {
					container.off("stagemousemove", moveEvent);
					container.off("stagemouseup", upEvent);
					that.dispatchEvent("swipeup");
				});
			});
			stage = container;
		} else {
			stage = container.getStage();
			downEvent = container.on("mousedown", downHandler);
			moveEvent = container.on("pressmove", pressHandler);
			upEvent = container.on("pressup", function() {
				that.dispatchEvent("swipeup");
			});
		}
		function downHandler() {
			startPos = horizontal?stage.mouseX:stage.mouseY;
			startVal = that.target[that.property];
			that.dispatchEvent("swipedown");
		}
		function pressHandler() {
			var diff = startPos-(horizontal?stage.mouseX:stage.mouseY);
			desiredVal = startVal - diff*sensitivity;
			if (!zot(min)) desiredVal = Math.max(desiredVal, min);
			if (!zot(max)) desiredVal = Math.min(desiredVal, max);
			that.desiredValue = desiredVal;
			that.dispatchEvent("swipemove");
		};
		var swiperDamp = new zim.Damp(that.target[that.property]);
		var ticker = zim.Ticker.add(function() {
			that.target[that.property] = integer?Math.round(swiperDamp.convert(desiredVal)):swiperDamp.convert(desiredVal);
		}, stage);

		this.immediate = function(val) {
			swiperDamp.immediate(val);
			that.target[that.property] = integer?Math.round(val):val;
			that.desiredValue = desiredVal = val;
		}

		var _enabled = true;
		Object.defineProperty(that, 'enabled', {
			get: function() {
				return _enabled;
			},
			set: function(value) {
				if (_enabled == value) return;
				if (value) {
					enable();
				} else {
					disable();
				}
				_enabled = Boolean(value);
			}
		});

		function disable() {
			if (container.canvas) {
				container.off("stagemousedown", downEvent);
				container.off("stagemousemove", moveEvent);
				container.off("stagemouseup", upEvent);
			} else {
				container.off("mousedown", downEvent);
				container.off("pressmove", moveEvent);
				container.off("pressup", upEvent);
			}
			zim.Ticker.remove(ticker);
		}

		function enable() {
			if (container.canvas) {
				container.on("stagemousedown", downEvent);
			} else {
				container.on("mousedown", downEvent);
				container.on("pressmove", moveEvent);
				container.on("pressup", upEvent);
			}
			zim.Ticker.add(ticker, stage);
		}

		this.dispose = function() {
			disable();
			swiperDamp = null;
		}
	}
	zim.extend(zim.Swiper, createjs.EventDispatcher, null, "cjsEventDispatcher", false);
	//-69.5

/*--
zim.MotionController = function(container, target, type, speed, axis, rect, map, diagonal, damp, flip, moveThreshold, stickThreshold)

MotionController
zim class - extends a createjs EventDispatcher

DESCRIPTION
MotionController lets you control an object (target) in a container (like the stage)
with "mousedown", "mousemove", "keydown", "gamebutton", "gamestick" or "manual" modes (types)
For instance, you can control a player in a game or a butterfly in field

EXAMPLE
var circle = new zim.Circle(40, frame.green).center(stage);
var controller = new zim.MotionController(stage, circle); // circle moves to mouse press position with damping

var rect = new zim.Rectangle(50, 30, frame.green).centerReg(stage);
var controller = new zim.MotionController({
	container:stage,
	target:rect,
	type:"keydown",
	diagonal:true,
	damp:.1,
	rotate:true
});

SEE: http://zimjs.com/code/controller for more examples
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
container - the Container the target is in - the stage is most likely fine
	this must be on the stage (or be the stage) when the MotionController is made
target - the object you want to control
type - (default "mousedown") by default will move to where you press in the container
	set to "mousemove" to have the target follow the mouse movement
	set to "keydown" to use keys to control the target (see map parameter)
	set to "gamebutton" to use gamepad buttons to control the target (see map parameter)
	set to "gamestick" to use gamepad stick(s) to control the target (see map parameter)
	set to "swipe" to use swipe to control the target
	set to "manual" to set your own with myController.convert() or myController.x and myController.y properties
speed - (default 7) pixels it will move each tick, keypress buttonpress, swipe, etc.
axis - (default "both") or "horizontal" or "vertical" (see diagonal parameter)
rect - (default null) a createjs.Rectangle or object with x, y, width and height properties
	the registration point of the target will stay within these bounds
map - (default null) an Array with left, right, up, down values (or array of values) as outlined below
 	- (default [[65,37], [68,39], [87,38], [83,40]] when type == "keydown") these are ADWS and arrows
	- (default [14, 15, 12, 13] when type == "gamebutton") these are DPAD_LEFT, DPAD_RIGHT, DPAD_UP, DPAD_DOWN on a gamepad
	- (default [14, 15, 7, 6] when type == "gamebutton" and firstPerson == true) these are DPAD_LEFT, DPAD_RIGHT, RT, LT on a gamepad
	- (default [0, 0, 1, 1] when type == "gamestick") these are LSX, LSX, LSY, LSY on a gamepad
	- (default [[0,2], [0,2], [1], [1]] when type == "gamestick" and firstPerson == true) turn with left or right stick X, advance with left stick Y
		use [[0,2], [0,2], [1,3], [1,3]] for both sticks (first stick motion overrides second stick)
		Note: MotionController will only use the 0 and the 2 index for speed as the sticks use -1 to 1 values
		so you could not go only left with one stick and only right with another
		Note: stick values may exceed -1 and 1 on occasion (see also stickThreshold)
diagonal - (default true) set to false to lock movement to horizontal or vertical only
damp - (default .1) the damp value with 1 being no damping and 0 being no movement
flip - (default null) set to "horizontal", "vertical" or "both" to flip the target when in negative direction
rotate - (default false) set to true to rotate - starts facing right and rotates in direction of movement
constant - (default false) set to true to remove keyup or gamebutton up and always move in direction last key or button press
firstPerson - (default false) set to true for keydown, gamebutton and gamecontroller to go to first person mode
	in firstPerson, the direction starts facing up and by default up arrow is speed forward and left and right change rotation
	speed will be damped by damp parameter - also, map parameter changes if in firstPerson mode - see map parameter
turnSpeed - (default speed*.4) - the speed for turning in firstPerson mode - will be damped but damp parameter
moveThreshold - (default 5) pixels negative or positive to treat damped motion as stopped
stickThreshold - (default .2) gamepad stick axes values are from -1 to 1 but there is a lot of noise
	so consider within +- stickThreshold as no motion 0


METHODS
immediate(x, y) - set the damping immediately to this value to avoid damping to value
convert(x, y) - for manual mode, pass in x and y and damping and rotation will be calculated
dispose() - remove listeners and Ticker, Swiper and GamePad, where applicable

PROPERTIES
target - the target for the property that you are controlling
x - the desired x position of the target before damping is applied (use this for manual imput - or convert() method)
y - the desired y position of the target before damping is applied (use this for manual imput - or convert() method)
dirX - the x direction the player is moving
dirY - the x direction the player is moving
dampX - reference to the horizonal Damp object
dampY - reference to the vertical Damp object
speed - the speed setting which will be multiplied by direction
turnSpeed - the turn speed for firstPerson mode
axis - the axis (horizontal, vertical or both);
moving - get Boolean as to whether the target is moving (within moveThreshold)
movingX - get Boolean as to whether the target is moving in x direction (within moveThreshold)
movingY - get Boolean as to whether the target is moving in y direction (within moveThreshold)
gamepad - reference to GamePad object if applicable - allows you to use this for more events like jumping, shooting, etc.
moveThreshold - the maximum value (+-) within which movement is considered stopped
stickThreshold - the maximum value (+-) within which the gamepad stick axes values are considered 0
enabled - set to false to disable or true to enable MotionController - can toggle with enabled = !enabled

EVENTS
dispatches a change event with dir as property of event object
	that will hold "left", "right", "up", "down", null (no direction)
--*///+69.7

	zim.MotionController = function(container, target, type, speed, axis, rect, map, diagonal, damp, flip, rotate, constant, firstPerson, turnSpeed, moveThreshold, stickThreshold) {
		var sig = "container, target, type, speed, axis, rect, map, diagonal, damp, flip, rotate, constant, firstPerson, turnSpeed, moveThreshold, stickThreshold";
		var duo; if (duo = zob(zim.MotionController, arguments, sig, this)) return duo;
		z_d("69.7");

		this.cjsEventDispatcher_constructor();
		if (zot(container) || !container.getStage) {zog("zim Controller(): Please pass in a reference to a container as first parameter");	return;}
		if (zot(container.getStage())) {zog("zim Controller(): The Container must be on the stage"); return;}
		var stage = container.getStage();
		if (zot(target)) {zog("zim Controller(): Please pass in a target object to control"); return;}
		if (zot(speed)) speed = 7;
		if (zot(type) || (type != "mousemove" && type != "keydown" && type != "gamebutton" && type != "gamestick" && type != "swipe" && type != "manual")) type = "mousedown";
		if (zot(axis)) axis = "both"; // horizontal, vertical, both
		if (type == "keydown" && zot(map)) map = [[65,37], [68,39], [87,38], [83,40]] // left right up down
		if (type == "gamebutton" && zot(map)) {
			if (firstPerson) {
				map = [14, 15, zim.GamePad.RT, zim.GamePad.LT] // DPAD_LEFT, DPAD_RIGHT, RT, LT on gamepad
			} else {
				map = [14, 15, 12, 13] // DPAD_LEFT, DPAD_RIGHT, DPAD_UP, DPAD_DOWN on gamepad
			}
		}
		if (type == "gamestick" && zot(map)) {
			if (firstPerson) {
				map = [[0,2], [0,2], [1], [1]]; // TURN: LSX or RSX, LSX or RSX, SPEED: LSY, LSY - on gamepad
			} else {
				map = [0, 0, 1, 1]; // LSX, LSX, LSY, LSY - Left Stick on gamepad
			}
		}

		if (type == "gamestick" && zot(map)) map = [0, 0, 1, 1]; // LSX, LSX, LSY, LSY - Left Stick on gamepad
		if (zot(diagonal)) diagonal = true;
		if (axis == "horizontal" || axis == "vertical") diagonal = false;
		if (zot(damp)) damp = (type=="keydown" || type=="gamebutton") ? 1:.1;
		if (zot(firstPerson)) firstPerson = false;
		if (zot(turnSpeed)) turnSpeed = speed * .4;
		if (zot(moveThreshold)) moveThreshold = 4;
		if (zot(stickThreshold)) stickThreshold = .2;

		var that = this;
		this.dirX = 0;
		this.dirY = 0;
		this.speed = speed;
		this.turnSpeed = turnSpeed;
		this.axis = axis;
		this.target = target;
		this.moveThreshold = moveThreshold;
		this.stickThreshold = stickThreshold;

		var speedX = that.speed; // speedX and speedY hold proportioned speed based on angle
		var speedY = that.speed;
		that.angle = 0; // holds the pre-damped angle of the target
		that.x = this.target.x; // holds the pre-damped x and y position of the target
		that.y = this.target.y;

		// INPUTS
		// set up collecting the desired x and y based on various inputs:
		// keydown, gamebutton
		// mousedown, mousemove
		// gamestick
		// swipe
		// otherwise the setting is manual and MotionController x and y can be provided through calculate(x,y) method

		if (type == "keydown" || type == "gamebutton") {

			// which keys or buttons handle left, right, up, down are provided by the map parameter
			// this can be either a number or an array of numbers
			// so normalize this to always hold an array
			for (var i=0; i<4; i++) {
				if (!Array.isArray(map[i])) map[i] = [map[i]];
			}
			var down = [0,0,0,0];
			var ord = []; // order the keys are pressed - so when we release, we can set to last currently pressed key
			var way = ["X","X","Y","Y"];
			var dir = [-1,1,-1,1];
			var names = ["left","right","up","down"];
			var rots = [-180,0,-90,90];
			var d = {dirX:0, dirY:0}; // local directions for key and button - this.dirX and this.dirY are used in Ticker

			if (type == "keydown") {
				var keydownEvent = frame.on("keydown", doDown);
			} else {
				var gamepad = that.gamepad = new zim.GamePad();
				var buttondownEvent = gamepad.on("buttondown", doDown);
			}
			function doDown(e) {
				var key = type=="keydown"?e.keyCode:e.buttonCode;
				var inOrd;
				for (i=0; i<4; i++) {
					if (map[i].indexOf(key) > -1) {
						if (!diagonal && that.axis=="both") d.dirX = d.dirY = 0;
						d["dir"+way[i]] = dir[i];
						down[i] = 1;
						inOrd = ord.indexOf(i);
						if (inOrd == 0) return; // already last pressed
						if (inOrd > 0) ord.splice(inOrd,1); // take key out if already down
						ord.unshift(i); // add index to start of ord array
						return;
					}
				}
			}
			if (zot(constant)) {
				if (type == "keydown") {
					var keyupEvent = frame.on("keyup", doUp);
				} else {
					var buttonupEvent = gamepad.on("buttonup", doUp);
				}
			}
			function doUp(e) {
				var key = type=="keydown"?e.keyCode:e.buttonCode;
				var inOrd;
				for (i=0; i<4; i++) {
					if (map[i].indexOf(key) > -1) {
						down[i] = 0;
						inOrd = ord.indexOf(i);
						if (inOrd >= 0) ord.splice(inOrd,1);
						if (that.axis != "both" || diagonal) { // either just one direction or can have both dirX and dirY
							d["dir"+way[i]] = -down[Math.floor(i/2)*2] +down[Math.floor(i/2)*2+1]; // the other might be down
						} else { // only use last pressed key for dirX or dirY but not both
							if (ord.length > 0) {
								d["dir"+way[i]] = 0;
								var iOrd = ord[0];
								d["dir"+way[iOrd]] = dir[iOrd];
							} else {
								d.dirX = d.dirY = 0;
							}
						}
						return;
					}
				}
			}
			// use a ticker to position the desired x and y properties
			// we will then tween to these properties in the mainTicker later
			var first = {rotation:0, speedX:that.speed, speedY:that.speed};
			var keyTicker = zim.Ticker.add(function() {
				if (firstPerson) {doFirstPerson(d); return;}
				var sX = that.speed;
				var sY = that.speed;
				if (that.axis == "both" && d.dirX != 0 && d.dirY != 0) {
					var trig = doTrig(d.dirX, d.dirY); // note - keys need to place desired x and y in a unit manner (or else target never goes anywhere)
					sX = trig.speedX;
					sY = trig.speedY;
				}
				if (that.axis == "horizontal" || that.axis == "both") {
					that.x += sX * d.dirX;
				}
				if (that.axis == "vertical" || that.axis == "both") {
					that.y += sY * d.dirY;
				}
				calculate();
			}, stage);
		} else if (type == "mousedown" || type == "mousemove") {
			var mouseEvent = stage.on("stage" + type, function(){
				var p = container.globalToLocal(stage.mouseX, stage.mouseY);
				that.x = p.x; that.y = p.y;
				calculate();
			});
		} else if (type == "gamestick") {
			var gamepad = this.gamepad = new zim.GamePad();
			for (var i=0; i<4; i++) { // make map hold arrays
				if (!Array.isArray(map[i])) map[i] = [map[i]];
			}
			var first = {rotation:0, speedX:that.speed, speedY:that.speed};
			var stickEvent = gamepad.on("data", function(e) {

				var d = {dirX:0, dirY:0};
				// map = [[0,2], [0,2], [1,3], [1,3]]
				for (var i=0; i<map[0].length; i++) {
					var a = e.axes[map[0][i]];
					if (Math.abs(a) > that.stickThreshold) {
						d.dirX = a;
						break;
					}
				}
				for (var i=0; i<map[2].length; i++) {
					var a = e.axes[map[2][i]];
					if (Math.abs(a) > that.stickThreshold) {
						d.dirY = a;
						break;
					}
				}

				if (firstPerson) {doFirstPerson(d); return;}

				that.x += that.speed*d.dirX;
				that.y += that.speed*d.dirY;
				calculate();
			});
		} else if (type == "swipe") {
			var swiperX = new zim.Swiper(stage, that, "x", .8);
			var swiperY = new zim.Swiper(stage, that, "y", .8, false);
			var swiperEvent = swiperX.on("swipemove", function() {
				calculate();
			});
		}

		function doFirstPerson(d) {
			first.rotation += d.dirX * that.turnSpeed;
			that.angle = first.rotation;
			first.speedX = Math.sin(first.rotation*Math.PI/180) * that.speed * -d.dirY;
			first.speedY = - Math.cos(first.rotation*Math.PI/180) * that.speed * -d.dirY;
			that.x += first.speedX;
			that.y += first.speedY;
			return;
		}

		// CALCULATE
		// each input calls calculate to determine the angle of direction
		// and the speed along each axis, speedX and speedY
		function calculate() {

			// trig() returns an object with speedX, speedY and rotation properties
			var diffX = that.x-that.target.x;
			var diffY = that.y-that.target.y;
			var trig = doTrig(diffX, diffY);

			speedX = trig.speedX;
			speedY = trig.speedY;

			if (!rotate) return;
			that.angle = trig.angle;
			if (zot(that.angle)) return; // when no motion purposely left null so stopped target keeps rotation

			// make sure angle damps to shortest direction - this is tricky
			var newR = normalizeAngle(that.angle);
			var oldR = that.target.rotation = normalizeAngle(that.target.rotation);
			if (Math.abs(newR-oldR) > 180) {
				if (oldR > newR) {
					oldR -= 360; // put current rotation behind new rotation so damps clockwise
				} else {
					newR -= 360; // put new rotation behind current rotation so damps counterclockwise
				}
			}
			that.dampR.immediate(oldR); // required otherwise damping equation has mind of its own
			that.target.rotation = oldR; // make sure to set this again as we may have changed oldR for proper rotational direction when damped
			that.angle = newR;
		}
		function normalizeAngle(a) {
			return (a % 360 + 360) % 360;
		}
		function doTrig(diffX, diffY) {
			var sX = that.speed;
			var sY = that.speed;
			var sA; // keep angle null if no movement - so that last rotation during movement is kept when movement stops
			var hyp = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
			if (hyp > 0) {
				sX = Math.abs(diffX) / hyp * that.speed;
				sY = Math.abs(diffY) / hyp * that.speed;
				sA = 90 - Math.atan2(diffX, diffY)*180/Math.PI;
			}
			return {speedX:sX, speedY:sY, angle:sA};
		}


		// TICKER FOR ALL
		// damp movement and rotation to desired x and y

		var tempX = this.x = this.target.x;
		var tempY = this.y = this.target.y;
		this.dampX = new zim.Damp(tempX, damp);
		this.dampY = new zim.Damp(tempY, damp);
		this.dampR = new zim.Damp(this.target.rotation, damp);
		var lastDirX=0;
		var lastDirY=0;

		var mainTicker = zim.Ticker.add(function() {
			if (rect) {
				that.x = zim.constrain(that.x, rect.x, rect.x+rect.width);
				that.y = zim.constrain(that.y, rect.y, rect.y+rect.height);
			}
			// tempX and tempY head towards the desired x and y
			// at the speed set by calculate and in the direction it needs to go calculated here
			// we then damp the actual motion using the dampX or dampY zim.Damp object's convert method
			if (that.axis == "horizontal" || that.axis == "both") {
				that.dirX = zim.sign(that.x-tempX);
				if (Math.abs(that.x-tempX) < speedX) {
					tempX = that.x;
				} else {
					tempX += that.dirX*speedX;
				}
				that.target.x = that.dampX.convert(tempX);
			}
			if (that.axis == "vertical" || that.axis == "both") {
				that.dirY = zim.sign(that.y-tempY);
				if (Math.abs(that.y-tempY) < speedY) {
					tempY = that.y;
				} else {
					tempY += zim.sign(that.y-tempY)*speedY;
				}
				that.target.y = that.dampY.convert(tempY);
			}

			// check for last direction change and dispatch event and flip if necessary
			if (that.dirX != lastDirX || that.dirY != lastDirY) {
				var e = new createjs.Event("change");
				if (that.dirX != lastDirX) {
					var options = ["left", null, "right"];
					e.dir = options[that.dirX+1];
					lastDirX = that.dirX;
					if (flip == "horizontal" || flip == "both") target.scaleX = that.dirX?Math.abs(target.scaleX)*that.dirX:target.scaleX;
				} else {
					var options = ["up", null, "down"];
					e.dir = options[that.dirY+1];
					lastDirY = that.dirY;
					if (flip == "vertical" || flip == "both") target.scaleY = that.dirY?Math.abs(target.scaleY) * that.dirY:target.scaleY;
				}
				that.dispatchEvent(e);
			}

			// set moving properties
			that.movingX = Math.abs(tempX-that.target.x) > that.moveThreshold;
			that.movingY = Math.abs(tempY-that.target.y) > that.moveThreshold;
			that.moving = that.movingX || that.movingY

			// damp the rotation - but not if the angle is null which happens when no movement
			// this keeps the last angle during movement rather than setting it to 0 which is not right
			if (rotate && !zot(that.angle)) {
				that.target.rotation = that.dampR.convert(that.angle);
			}

		}, stage);


		this.immediate = function(x,y,r) {
			if (!zot(x) && that.dampX) {
				that.dampX.immediate(x);
				that.x = that.target.x = tempX = x;
				if (swiperX) swiperX.immediate(x);
			}
			if (!zot(y) && that.dampY) {
				that.dampY.immediate(y);
				that.y = that.target.y = tempY = y;
				if (swiperY) swiperY.immediate(y);
			}
			if (!zot(r) && that.dampR) {
				that.dampR.immediate(r);
				that.angle = that.target.rotation = r;
			}
		}

		this.convert = function(x,y) {
			if (!zot(x)) that.x = x;
			if (!zot(y)) that.y = y;
			calculate();
		}

		var _enabled = true;
		Object.defineProperty(that, 'enabled', {
			get: function() {
				return _enabled;
			},
			set: function(value) {
				if (_enabled == value) return;
				if (value) {
					enable();
				} else {
					disable();
				}
				_enabled = Boolean(value);
			}
		});
		function enable() {
			if (type == "keydown") {
				frame.on("keydown", keydownEvent);
				frame.on("keyup", keyupEvent);
				zim.Ticker.add(keyTicker, stage);
			} else if (type == "gamebutton") {
				gamepad.on("buttondown", buttondownEvent);
				gamepad.on("buttonup", buttonupEvent);
				zim.Ticker.add(keyTicker, stage);
			} else if (type == "gamestick") {
				gamepad.on("data", stickEvent);
			} else if (type == "swipe") {
				swiperX.enabled = true;
				swiperY.enabled = true;
				swiperX.on("swipemove", swiperEvent);
			} else if (type == "mousedown" || type == "mousemove") {
				stage.on("stage" + type, mouseEvent);
			}
			zim.Ticker.add(mainTicker, stage);
		}
		function disable() {
			if (type == "keydown") {
				frame.off("keydown", keydownEvent);
				frame.off("keyup", keyupEvent);
				zim.Ticker.remove(keyTicker);
			} else if (type == "gamebutton") {
				gamepad.off("buttondown", buttondownEvent);
				gamepad.off("buttonup", buttonupEvent);
				zim.Ticker.remove(keyTicker);
			} else if (type == "gamestick") {
				gamepad.off("data", stickEvent);
			} else if (type == "swipe") {
				swiperX.enabled = false;
				swiperY.enabled = false;
				swiperX.off("swipemove", swiperEvent);
			} else if (type == "mousedown" || type == "mousemove") {
				stage.off("stage" + type, mouseEvent);
			}
			zim.Ticker.remove(mainTicker);

		}
		this.dispose = function() {
			disable();
			if (gamepad) gamepad.dispose();
			if (swiperX) swiperX.dispose();
			if (swiperY) swiperX.dispose();
		}

	}
	zim.extend(zim.MotionController, createjs.EventDispatcher, "enabled", "cjsEventDispatcher");
	//-69.7

/*--
zim.GamePad = function()

GamePad
zim class - extends a createjs EventDispatcher

DESCRIPTION
GamePad connects to Game Controllers as inputs using the HTML navigator.getGamepads API
Dispatches buttondown and buttonup events for the following common buttons:

"A","B","X","Y", (or for Triangle, Circle, Cross and Square)
"LB","RB","LT","RT", (for left bumper, right bumper, left trigger, right trigger)
"BACK","START",
"LS","RS", (for left stick press, right stick press)
"DPAD_UP","DPAD_DOWN","DPAD_LEFT","DPAD_RIGHT"

The event object will have a button property telling which button is pressed using the string values above
Dispatches a data event constantly to get axes data for the sticks (and constant data for the buttons)
The event object in this case will have axes and buttons properties
The axes property is an array of four numbers for the left and right stick's x and y properies (-1 to 1)

EXAMPLE
var gamepad = new zim.GamePad();
gamepad.on("buttondown", function(e) {
	// only fires once per button press (unlike constant keydown event)
	zog(e.button); // LT for instance for Left trigger
	if (e.button == "LT") {
		zog("left trigger is down");
	}
	zog(e.buttonCode); // 6
	if (e.buttonCode == zim.GamePad.LT) {
		zog("another way to do catch left trigger down");
	}
});

gamepad.on("buttonup", function(e) {
	zog(e.button); // LT for instance for Left trigger
}

gamepad.on("data", function(e) {
	// fires constantly in a requestAnimationFrame
	zog(e.axes[0]); // left stick x or horizontal data from -1 to 1 (lots of decimal noise)
	zog(e.axes[zim.GamePad.LTX]); // another way of accessing left stick x
	zog(e.buttons[9]); // true or false depending on if the START button is pressed
	zog(e.buttons[zim.GamePad.START]); another way to find if the START button is pressed
});
END EXAMPLE

METHODS
dispose() - removes all listeners and cancels requestAnimationFrame

PROPERTIES
connected - Boolean true if connected and false if not connected (may need to press key, etc)
currentIndex - get or set the index of the controller
	gives multiple controller support - make two GameController objects and set different indexes
data - object that holds buttons (raw data - slightly different than buttons below) and axes properties
buttons - an array of Booleans as to whether the button is pressed
	the order of the buttons match the order of the constants below
constants: A,B,X,Y,LB,RB,LT,RT,BACK,START,LS,RS,DPAD_UP,DPAD_DOWN,DPAD_LEFT,DPAD_RIGHT
	zim.GamePad.A == 0
	zim.GamePad.B == 1, etc. up to
	zim.GamePad.DPAD_RIGHT == 15
axes - an array of four stick values from -1 to 1
	for left x and y and right x and y values (or horizontal and vertical values)
constants: LSX,LSY,RSX,RSY
	zim.GamePad.LSX == 0
	zim.GamePad.LSY == 1
	zim.GamePad.RSX == 2
	zim.GamePad.RSY == 3

EVENTS
dispatches a gamepadconnected and gamepaddisconnected when connected and disconnected
	these have an event object with index and id properties - the index and id may not work in chrome
dispatches a buttondown event with button and buttonCode properties
dispatches a buttonup event with button and buttonCode properties
dispatches a data event with axes and buttons array properties
	these can be handled as outlined in the description and examples
--*///+69.8

	zim.GamePad = function() {
		z_d("69.8");

		this.cjsEventDispatcher_constructor();
		if (!navigator.getGamepads) {this.error = true; if (zon) {zog("zim.GamePad() - no browswer support");} return;} // if no gamepad support
		var processPad;
		window.addEventListener("gamepadconnected", init);
		this.currentIndex = 0;
		var that = this;
		function init(eventObject) {
			that.connected = true;
			dispatch("gamepadconnected", eventObject);
			var startData = navigator.getGamepads()[that.currentIndex];
			that.lastData = [];
			for (var i=0; i<startData.buttons.length; i++) {
				that.lastData[i] = startData.buttons[i].pressed;
			}
			function doPad() {
				processPad = requestAnimationFrame(doPad);
				that.data = navigator.getGamepads()[that.currentIndex];
				if (!that.data) return;
				var pressed = false;
				var currentData = that.buttons = [];
				for (var i=0; i<that.data.buttons.length; i++) {
					currentData[i] = that.data.buttons[i].pressed;
					if (currentData[i] != that.lastData[i]) {
						that.lastData[i] = currentData[i];
						if (currentData[i]) {
							// button was up and now is down
							// chose to dispatch only once unlike a keydown
							// if we want constant data then use data event and e.buttons
							var e = new createjs.Event("buttondown");
						} else {
							var e = new createjs.Event("buttonup");
						}
						e.buttonCode = i;
						e.button = gamePadButtons[i];
						that.dispatchEvent(e);
					}
				}
				var e = new createjs.Event("data");
				e.axes = that.axes = that.data.axes;
				e.buttons = that.buttons;
				that.dispatchEvent(e);
			}
			doPad();
		}
		var gamepadCheck = setInterval(function() { // for chrome
			if (navigator.getGamepads && navigator.getGamepads()[0]) {
				if (!that.connected) init();
				clearInterval(gamepadCheck);
			}
		}, 500);
		function dispatch(type, eventObject) {
			var e = new createjs.Event(type);
			e.index = eventObject.gamepad.index;
			e.id = eventObject.gamepad.id;
			e.buttons = eventObject.gamepad.buttons;
			e.axes = eventObject.gamepad.axes;
			that.dispatchEvent(e);
		}
		var disconnectEvent = window.addEventListener("gamepaddisconnected", function(e) {
			if (e.gamepad.index == that.currentIndex) {
				cancelAnimationFrame(processPad);
				connected = false;
				that.dispatchEvent("gamepaddisconnected");
			}
		});
		this.dispose = function() {
			window.removeEventListener("gamepadconnected", init);
			window.addEventListener("gamepaddisconnected", disconnectEvent);
			cancelAnimationFrame(processPad);
			clearInterval(gamepadCheck);
			that.connected = false;
		}
	}
	var gamePadButtons = ["A","B","X","Y","LB","RB","LT","RT","BACK","START","LS","RS","DPAD_UP","DPAD_DOWN","DPAD_LEFT","DPAD_RIGHT"];
	for (var i=0; i<gamePadButtons.length; i++) zim.GamePad[gamePadButtons[i]] = i;
	var gamePadAxes = ["LSX","LSY","RSX","RSY"];
	for (i=0; i<gamePadAxes.length; i++) zim.GamePad[gamePadAxes[i]] = i;
	zim.extend(zim.GamePad, createjs.EventDispatcher, null, "cjsEventDispatcher");
	//-69.8

////////////////  ZIM FRAME  //////////////

// Zim Frame provides code to help you set up your coding environment

	if (zon) zog("ZIM FRAME");

/*--
zim.Frame = function(scaling, width, height, color, rollover, touch, scrollTop, align, valign, canvasID, rollPerSecond, delay, handleTabs, tabHighlight, tabHighlightScale, tabHighlightAlpha, tabHighlightTime, tabHighlightObject)

Frame
zim class - extends a createjs EventDispatcher

DESCRIPTION
Frame creates a canvas and stage.
Frame lets you decide how you want your stage to scale.
It also provides events for ready, resizing and orientation change
as well as a way to remake the canvas if necessary.
Frame handles loading Bitmap and Sound assets by wrapping PreloadJS
see http://zimjs.com/code/frame.html for sample templates using Frame.

EXAMPLE
var frame = new zim.Frame("fit", 1024, 768, "#CCC");
frame.on("ready", function() {
	var stage = frame.stage;
	var stageW = frame.width;
	var stageH = frame.height;

	// code here - or optionally load assets

	frame.loadAssets("image.png");
	frame.on("complete", function() {

		// app code goes here if waiting for assets
		var image = frame.asset("image.png");
		image.center(stage);
		stage.update();

	}); // end asset complete

	// OR for multiple assets in an assets folder:

	frame.loadAssets(["sound.mp3", "spriteData.json", "spriteImage.png"], "assets/");
	frame.on("complete", function() {

		// app code goes here if waiting for assets
		var soundInstance = frame.asset("sound.mp3").play();
		// later soundInstance.paused = true; // etc.

		var sprite = new zim.Sprite({json:frame.asset("spriteData.json")});
		sprite.center(stage).run(2000);
		// the image for the sprite is specified in the JSON
		// but we still want to load it so it is in the loadAssets()
		// and the JSON data will take care of adding it to the sprite

		stage.update();

	}); // end asset complete

}); // end of ready
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
scaling - (default "full") can have values as follows
	"fit"      sets canvas and stage to dimensions and scales to fit inside window size
	"outside"  sets canvas and stage to dimensions and scales to fit outside window size
	"full"     sets stage to window size with no scaling
	"tagID"    add canvas to HTML tag of ID - set to dimensions if provided - no scaling

FIT and OUTSIDE: width and height will set the stage width and height and the canvas is then scaled
this is handy because all your dimensions are set to start
FULL: width and height are ignored when scaling as these are set to the window width and height
TAG: if width and height are provided then the canvas and stage will be these dimensions
if width and height are not provided in tag mode, the canvas and stage will take the dimensions of the tag
this means, the tag must have some sort of width and height dimensions set or it will be really big!
NOTE: in tag mode, the tag must exist before running Frame - so use a window DOMContentLoaded event

color - (default null) the background color of the frame (any CSS value) - or just set in styles
rollover - (default true) activates rollovers
touch - (default true) activates touch on mobile
scrollTop - (default true) activates scrolling on older apple devices to hide the url bar
align - (default "center") for fit and outside, the horizontal alignment "left", "center/middle", "right"
valign - (default "center") for fit and outside, the vertical alignment "top", "center/middle", "bottom"
canvasID - (default "myCanvas") will be set to tagIDCanvas if a tagID is provided - eg. scaling=test, canvasID=testCanvas
rollPerSecond - (default 20) times per second rollover is activated (if rollover parameter is true)
delay - (default 500) time in milliseconds to resize ONCE MORE after a orientation change
	unfortunately, some older devices may have a delay (after a window resize event) in reporting screen sizes
	so a time of 500 or so might catch the dimension change then call the frame resize event with the proper dimensions
	setting this may cause a flash on faster devices that do not need it - so it is a no win situation
	this effects only full mode with the Layout class and they can always refresh a screen if it is not quite right in the changed orientation
handleTabs - (default true) prevents default behaviour from the tab key so that frame.tabOrder overrides browser tabbing.
	setting to false will still allow frame.tabOrder to work but will not prevent default tab action
tabHighlight - (default true) highlights the object being put in focus by a tab if handleTabs is true or frame.tab() call
	set to false to not highlight objects receiving tab focus
tabHighlightScale - (default .8) scale the highlight relative to the object with tab focus if handleTabs is set
tabHighlightAlpha - (default .3) alpha of the tabHighlightObject if handleTabs is set
tabHighlightTime - (default 700ms) milliseconds to show tabHightlightObject if handleTabs is set
tabHighlightObject - (default Circle(100, "white")) set to a display object - including animated objects


PROPERTIES
stage - read only reference to the createjs stage - to change run remakeCanvas()
	frame gives the stage read only stage.width and stage.height properties
canvas - a reference to the frame's canvas tag
tag - the containing tag if scaling is set to an HTML tag id (else null)
isLoading - a Boolean to indicate whether loadAssets() is currently loading assets
width - read only reference to the stage width - to change run remakeCanvas()
height - read only reference to the stage height - to change run remakeCanvas()
scale - read only returns the scale of the canvas - will return 1 for full and tag scale modes
orientation - "vertical" or "horizontal" (updated live with orientation change)
tabOrder - get or set an array with the order in which components will receive focus if component uses keys
	this is new and currently works with Steppers and Tabs
	currently, there is no way to see that a component has focus - options for this may be added in the future
	there is no screen reader support as of yet but is under consideration
	apps made with ZIM are often very visual so support for visually impared is perhaps less needed
zil - reference to zil events that stop canvas from shifting
colors: orange, green, pink, blue, brown, yellow, silver, tin, grey, lighter, light, dark, darker, purple, white, black, clear (0 alpha), faint (.01 alpha)
tabObject - the object for tab focus if handleTabs is true

METHODS
loadAssets(file||[file, file, etc.], path, xhr, time)
	pass in an file (String) or an array of files to assets,
	pass in an optional path to directory and XHR (default false)
	asset types (from CreateJS PreloadJS): Image, JSON, Sound, SVG, Text, XML
	time defaults to 0 and is the minimum number of milliseconds for the complete event to trigger
	use this for testing or to always have time to show a loading message
	RETURNS: a zim.Queue object that can be used for control with multiple loadAssets calls
	Each zim.Queue will trigger progress, assetload and complete events
	Each zim.Queue will have a preload property to the CreateJS LoadQueue and an isLoading property
	The frame also has these events and properties but acts for all loading - so be careful!
	It is recommended to use the zim.Queue any time you use multiple LoadAssets() calls at the same time
	You still access assets with frame.asset() as outlined below whether you use the zim.Queue or not
asset(file) - access a loaded asset based on file string (not including path)
	if the asset is an image then this is a zim.Bitmap and you add it to the stage
	if the asset is a sound then use asset(file).play();
	or can pass in a configuration object in play
	with the following properties (see CreateJS SoundJS docs)
	delay, offset, loop, volume, pan, startTime, interrupt and duration
	asset(file).play({volume:.5, pan:-1, loop:2});
	this returns createjs sound instance which can also be manipulated
	to stop the sound or set its volume dynamically, etc.
	if the asset is anything else, then it is what it is!
makeCircles(radius) - returns a createjs.Shape with the ZIM Circles (centered reg)
remakeCanvas(width, height) - removes old canvas and makes a new one and a new stage
	will have to set your local stage, stageW and stageH variables again
dispose() - removes canvas, resize listener and stage

EVENTS
"ready" - fired when the stage is made
"progress" - fires constantly as assets are loaded with loadAssets() to represent overall load progress
"assetload" - fired when an asset loaded with loadAssets() has loaded (use asset property of event object - with type and id properties)
"complete" - fired when all assets loaded with loadAssets() are loaded (then use frame.asset())
"error" - fired when there is a problem loading an asset with loadAssets()
"resize" - fired on resize of screen
"orientation" - fired on orientation change
"keydown" - fires on keydown - just like the window keydown event with eventObject.keyCode, etc.
"keyup" - fires on keyup - just like the window keyup event with eventObject.keyCode, etc.
--*///+83
	zim.Frame = function(scaling, width, height, color, rollover, touch, scrollTop, align, valign, canvasID, rollPerSecond, delay, handleTabs, tabHighlight, tabHighlightScale, tabHighlightAlpha, tabHighlightTime, tabHighlightObject) {

		var sig = "scaling, width, height, color, rollover, touch, scrollTop, align, valign, canvasID, rollPerSecond, delay, handleTabs, tabHighlight, tabHighlightScale, tabHighlightAlpha, tabHighlightTime, tabHighlightObject";
		var duo; if (duo = zob(zim.Frame, arguments, sig, this)) return duo;
		z_d("83");
		this.cjsEventDispatcher_constructor();

		var mobile = zim.mobile();
		if (zot(scaling)) scaling = "full";
		if (zot(rollover)) rollover = !mobile;
		if (zot(touch)) touch = true;
		if (zot(scrollTop)) scrollTop = true;
		if (zot(align)) align = "center";
		if (zot(valign)) valign = "center";
		if (zot(canvasID)) canvasID = "myCanvas";
		if (zot(rollPerSecond)) rollPerSecond = 20;
		if (zot(delay)) delay = 0;
		if (zot(handleTabs)) handleTabs = true;
		if (zot(tabHighlight)) tabHighlight = true;
		if (zot(tabHighlightScale)) tabHighlightScale = .8;
		if (zot(tabHighlightAlpha)) tabHighlightAlpha = .3;
		if (zot(tabHighlightTime)) tabHighlightTime = 700;
		if (zot(tabHighlightObject)) tabHighlightObject = new zim.Circle(100, "white");

		// setting a scaling of something other than this list will set the scaling to tag mode
		// where the scaling parameter value is assumed to be the ID of an HTML tag to contain the Frame
		var types = ["fit","outside","full"];

		this.scale = 1;
		this.x = 0;
		this.y = 0;

		var that = this;
		var stage;
		var stageW = width;
		var stageH = height;
		var largest; // automatically set
		var appOrientation; // watch out - orientation keyword is used by apple - sigh
		var lastOrientation; // used to detect orientation change
		var appReady = false; // check variable (watch - "ready" is reserved)
		var tagID;
		var tag;

		var initCheck = false;
		if (document.readyState === 'interactive' || document.readyState === 'complete' ) { // DOM has loaded
			setTimeout(function() {init();}, 200); // can't dispatch directly from a constructor
		} else {
			document.addEventListener('DOMContentLoaded', init);
		}

		// Firefox has a glitch when setting the canvas to a new dimension
		// this only happens in full mode if a Ticker is updating the stage
		// so set the Ticker update to false - unfortunately for 500ms
		// which means animations will pause a little during resize
		// the resize event triggers pretty quickly and that will update the stage
		var lastTicker;
		var pauseTicker = false;
		var checkResize = (scaling == "full" && typeof InstallTrigger !== 'undefined'); // firefox check
		window.addEventListener('resize', function() {
			if (checkResize) {
				if (!pauseTicker) {
					pauseTicker = true;
					lastTicker = zim.Ticker.update;
					zim.Ticker.update = false;
					setTimeout(function() {
						pauseTicker = false;
						zim.Ticker.update = lastTicker;
					}, 40);
					setTimeout(function() {
						sizeCanvas();
						dispatchResize();
					}, 20);
				}
			} else {
				sizeCanvas();
				dispatchResize();
				if (delay > 0) {
					if (mobile) setTimeout(function() {
						sizeCanvas();
						dispatchResize();
					}, delay); // to catch delayed screen sizes
				}
			}
		});

		function init() {
			if (initCheck) return;
			initCheck = true;
			if (types.indexOf(scaling) == -1) {
				tagID = scaling;
				if (zot(zid(tagID))) {zog("zim.Frame - scaling: HTML tag with id="+scaling+" must exist"); return;};
				tag = this.tag = zid(tagID);
				scaling = (zot(width) || zot(height)) ? "tag" : "inline"; // tag with no dimensions or dimensions
				if (canvasID == "myCanvas") canvasID = tagID + "Canvas";
			}

			// now assign default width and height (ignored by full and tag)
			if (zot(width)) width = 500;
			if (zot(height)) height = 500;

			makeCanvas();
			makeStage();

			if (mobile) {
				// for older mobile - pan hides the location bar
				if (scrollTop) {setTimeout(function() {window.scrollTo(0, 0);}, 50);}
				setTimeout(function() {
					// on all mobile devices
					// note, this is a second sizing as there is a sizing in makeStage
					sizeCanvas();
					that.dispatchEvent("ready");
					appReady = true;
					dispatchResize();
				}, 100);
				// for extra delay
				if (delay > 100) setTimeout(function() {sizeCanvas(); dispatchResize();}, delay); // to catch delayed screen sizes
			} else {
				that.dispatchEvent("ready");
				appReady = true;
				dispatchResize();
			}
		}

		function makeCanvas() {
			// note the width and height of a canvas
			// are separate from from the width and height styles
			// so beware of unintentionally stretching the canvas with styles

			var canvas = that.canvas = document.createElement("canvas");
			canvas.setAttribute("id", canvasID);
			if (scaling == "full" || scaling == "tag") {
				canvas.setAttribute("width", zim.windowWidth());
				canvas.setAttribute("height", zim.windowHeight());
			} else {
				canvas.setAttribute("width", stageW);
				canvas.setAttribute("height", stageH);
			}
			if (scaling == "tag" || scaling  == "inline") {
				tag.appendChild(canvas);
			} else {
				document.body.appendChild(canvas);
			}
			if (!zot(color)) canvas.style.backgroundColor = color;
			if (scaling == "full" || scaling == "fit" || scaling == "outside") {
				canvas.style.position = "absolute";
				document.body.style.overflow = "hidden";
			}
		}

		function makeStage() {
			sizeCanvas();
			if (types.indexOf(scaling) != -1) {that.zil = zil();} // keep canvas still (from arrows, scrollwheel, etc.) (fit, outside and full only)
			stage = new createjs.Stage(canvasID);
			stage.setBounds(0, 0, stageW, stageH);
			stage.width = stageW;
			stage.height = stageH;
			if (rollover) stage.enableMouseOver(10); // if you need mouse rollover
			if (touch) createjs.Touch.enable(stage,true); // added for mobile
		}

		function sizeCanvas() {
			var can = zid(canvasID);
			var w = zim.windowWidth();
			var h = zim.windowHeight();
			var newW; var newH;
			appOrientation = that.orientation = (w > h) ? "horizontal" : "vertical";
			if (appOrientation != lastOrientation) { // new orientation
				lastOrientation = appOrientation;
				that.dispatchEvent("orientation");
			}
			if (mobile && scrollTop) {setTimeout(function() {window.scrollTo(0, 0);}, 100);}
			if (!can) return;

			if (scaling == "fit") {
				// scales canvas to fit dimensions inside screen
				that.scale = (w/h >= stageW/stageH) ? h/stageH : w/stageW;
			} else if (scaling == "outside") {
				// scales canvas so screen inside dimensions
				that.scale = (w/h >= stageW/stageH) ? w/stageW : h/stageH;
			} else if (scaling == "full") {
				// does not scale canvas but sets width and height to screen
				can.style.left = can.style.top = "0px";
				can.width = stageW = w;
				can.height = stageH = h;
				if (stage) {
					stage.setBounds(0,0,stageW,stageH); // need this
					stage.width = stageW;
					stage.height = stageH;
				}
				return;
			} else if (scaling == "tag") {
				// does not scale canvas but sets width and height to tag
				stageW = tag.offsetWidth;
				stageH = tag.offsetHeight;
				if (stage) {
					stage.setBounds(0,0,stageW,stageH); // need this
					stage.width = stageW;
					stage.height = stageH;
				}
				tag.style.overflow = "hidden";
				can.style.left = can.style.top = "0px";
				return;
			} else if (scaling == "inline") {
				// does not scale canvas but sets width and height
				if (stage) {
					stage.setBounds(0,0,stageW,stageH); // need this
					stage.width = stageW;
					stage.height = stageH;
				}
				can.style.left = can.style.top = "0px";
				return;
			}
			// scaling and positioning for fit and outside
			newH = stageH * that.scale;
			newW = stageW * that.scale;
			can.style.width = newW + "px";
			can.style.height = newH + "px";
			// note, changing the canvas width and height and scaling the stage
			// does not look as shart at smaller scales - so decided to scale with styles
			// which is like scaling down an image
			// scaling up does not look as good - so just make your canvas as big as you will scale

			if (align=="left") that.x = 0;
			else if (align=="right") that.x = (w-newW);
			else that.x = ((w-newW)/2);
			if (valign=="top") that.y = 0;
			else if (valign=="bottom") that.y = (h-newH);
			else that.y = ((h-newH)/2);
			can.style.left = that.x + "px";
			can.style.top = that.y + "px";
		}

		function dispatchResize() {
			if (!appReady) return;
			that.dispatchEvent("resize");
			if (!zim.OPTIMIZE && stage && scaling == "full") stage.update();
		}

		// ASSETS
		this.loadAssetsCount = 0;
		this.assets = {}; // store asset Bitmap or play function for sound
		this.loadAssets = function(arr, path, xhr, time) {
			if (zot(arr)) return;
			if (zot(xhr)) xhr = false;
			if (!Array.isArray(arr)) arr = [arr];
			if (zot(time)) time = 0;
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
			var queue = new zim.Queue();
			that.loadAssetsCount++;
			that.isLoading = true;
			var preload = queue.preload = that.preload = new createjs.LoadQueue(xhr, path);
			if (soundCheck) preload.installPlugin(createjs.Sound);
			preload.on("progress", function(e) {queue.dispatchEvent(e); that.dispatchEvent(e);});
			preload.on("error", function(e) {queue.dispatchEvent(e); that.dispatchEvent(e);});
			preload.on("fileload", function(e) {
				var item = e.item;
				var type = e.item.type;
				var ext = item.id.match(re);
				var asset;
				if (type && type == createjs.LoadQueue.SOUND) {
					asset = that.assets[item.id] = {
                        type:"sound",
                        id:item.id,
                        play:function(added){
                            var instance = createjs.Sound.play(item.id, added);
                            instance.getStage = function(){return stage;}
                            return instance;
                        }
                    };
				} else if (type == createjs.LoadQueue.IMAGE) {
					asset = that.assets[item.id] = new zim.Bitmap(e.result, item.id);
				} else {
					asset = that.assets[item.id] = e.result;
				}
				var ev = new createjs.Event("assetload");
				ev.item = item; // createjs preload item
				ev.asset = asset;
				queue.dispatchEvent(e);
				that.dispatchEvent(ev);
			});
			// setting a time will force the preload to wait at least this amount of time
			// this can be used for testing or if you always want time to show a loading message
			var startLoad = Date.now();
			that.preloadEvent = preload.on("complete", function(e) {
				var endLoad = Date.now();
				time = Math.max(0, time-(endLoad-startLoad));
				setTimeout(function() {
					that.loadAssetsCount--;
					if (that.loadAssetsCount <= 0) that.isLoading = false;
					queue.isLoading = false;
					queue.dispatchEvent(e);
					that.dispatchEvent(e);
				}, time);
			});
			preload.loadManifest(manifest);
			return queue;
		}

		this.asset = function(n) {
			if (zot(n)) return;
			return that.assets[n] || {play:function(){if (zon) {zog("zim.Frame - asset("+n+") not found"); return {};}}};
		}

		Object.defineProperty(that, 'stage', {
			get: function() {
				return stage;
			},
			set: function(s) {
				zog("zim.Frame(): stage is read only - see remakeCanvas(), perhaps");
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

		Object.defineProperty(this, 'color', {
			get: function() {
				return color;
			},
			set: function(value) {
				color = value;
				if (!zot(value)) {
					zid(canvasID).style.backgroundColor = color;
				} else {
					zid(canvasID).style.backgroundColor = "default";
				}
			}
		});

		var _tabOrder = [];
		Object.defineProperty(this, 'tabOrder', {
			get: function() {
				return _tabOrder;
			},
			set: function(array) {
				_tabOrder = array;
			}
		});

		this.remakeCanvas = function(width, height) {
			if (scaling == "full") return;
			if (zot(width)) width = stageW;
			if (zot(height)) height = stageH;
			if (zid(canvasID)) zid(canvasID).parentNode.removeChild(zid(canvasID));
			stageW = width;
			stageH = height;
			makeCanvas();
			makeStage();
		}

		var eDown = new createjs.Event("keydown");
		this.eventRemove = eDown.remove;
		window.addEventListener("keydown", function(e) {
			e.remove = that.eventRemove;
			if (e.keyCode==9) {
				if (e.shiftKey) {
					that.tab(-1);
				} else {
					that.tab(1);
				}
				if (handleTabs) e.preventDefault();
			}
			that.dispatchEvent(e);
		});
		window.addEventListener("keyup", function(e) {
			e.remove = that.eventRemove;
			that.dispatchEvent(e);
		});
		var tabTimeout;
		this.tab = function(dir) {
			clearTimeout(tabTimeout);
			if (zot(dir)) dir = 1;
			for (var i=0; i<_tabOrder.length; i++) {
				var t = _tabOrder[i];
				if (t.focus) {
					t.focus = false;
					var index = i + dir;
					var t = _tabOrder[(index+_tabOrder.length*100)%_tabOrder.length];
					t.focus = true;
					var b = zim.boundsToGlobal(t);
					tabHighlightObject.alp(tabHighlightAlpha).addTo(frame.stage)
					tabHighlightObject.fit(b.x, b.y, b.width, b.height)
					tabHighlightObject.scale(tabHighlightObject.scaleX*tabHighlightScale);
					tabTimeout = setTimeout(function(){frame.stage.removeChild(tabHighlightObject);}, tabHighlightTime);
					break;
				}
			}
		}

		this.dispose = function() {
			window.removeEventListener('resize', sizeCanvas);
			stage.removeAllChildren();
			stage.removeAllEventListeners();
			if (zid(canvasID)) zid(canvasID).parentNode.removeChild(zid(canvasID));
			stage = null;
			that = null;
			return true;
		}

		// zim colors
		this.orange		= "#f58e25";
		this.green  	= "#acd241";
		this.pink  		= "#e472c4";
		this.blue   	= "#50c4b7";
		this.brown  	= "#d1a170";
		this.yellow   	= "#ebcb35";
		this.silver		= "#999999";
		this.tin		= "#777777";
		this.grey   	= "#555555"
		this.gray 		= "#555555";
		this.lighter 	= "#eeeeee";
		this.light 		= "#cccccc";
		this.dark 		= "#333333";
		this.darker 	= "#111111";
		this.purple		= "#993399";
		this.black 		= "#000000";
		this.white		= "#FFFFFF";
		this.clear 		= "rgba(0,0,0,0)";
		this.faint 		= "rgba(0,0,0,.01)";

		this.makeCircles = function(radius) {
			if (zot(radius)) radius = 100;
			var colors = [that.wrap, that.code, that.create, that.build, that.pages, that.bits];
			var c = new zim.Shape();
			var g = c.graphics;
			c.radius = radius;
			for (var i=0; i<colors.length; i++) {
				g.f(colors[i]).dc(0,0,(c.radius/colors.length)*(colors.length-i));
			}
			c.setBounds(-c.radius,-c.radius,c.radius*2,c.radius*2);
			return c;
		}



	}
	zim.extend(zim.Frame, createjs.EventDispatcher, "clone", "cjsEventDispatcher", false);

	zim.Queue = function() {
		// internal usage only by Frame
		this.cjsEventDispatcher_constructor();
		this.isLoading = true; // thanks Frank Los for the suggestion.
	}
	zim.extend(zim.Queue, createjs.EventDispatcher, null, "cjsEventDispatcher");
	//-83


////////////////  ZIM META  //////////////

// the Meta section is for overall classes that operate on ZIM
// for instance zim.Distill and zim.Wonder

/*--
zim.DISTILL

distill
zim constant

DESCRIPTION
Distill allows you to track which functions you are using in your app
and create a custom minified js file with just those functions.
Set zim.DISTILL to true to record which functions your are using in your app -
default is false.  While running your app, call the zim.distill() function
take the results to http://zimjs.com/code/distill to create a minified distilled file.

EXAMPLE
// at the start of your code
zim.DISTILL = true;

// at the end of your code (once everything has run)
// this means we may have to wait for events to happen, etc.
zim.distill();

// this will log to the console a series of numbers
// separated by spaces representing the functions used

1 6 81 81 79 75 77 75 55 54 52 53 55 54 52 53 55 54 52
53 42 80 74 46 46 46 80 74 46 46 46 55 54 52 53 55 54
52 53 55 54 52 53 42 80 74

// copy these into the zim DISTILL form field
// to get the minified JavaScript for these functions
// NOTE: Distill will not duplicate the functions
// data duplication is left in for statistical purposes
END EXAMPLE
--*///+83.1
	zim.DISTILL = false;
	zim.distillery = [];
//-83.1

/*--
zim.distill = function()

distill
zim function

DESCRIPTION
Call the distill function to display which zim functions you are using in your app.
You must set zim.DISTILL constant to true before using (set at the start of your app).
After running through your app, call zim.distill() and see the console (F12).
Take the results to http://zimjs.com/code/distill to create a minified distilled js file.
You would then host this js file yourself or include it in your mobile files, etc.
NOTE: zim.distill() only records functions that have been used
so you may have functions still to be used in your app.
You will want to make sure you call distill() after you have used all your functions,
for instance, on a restart event, etc.
NOTE: zim.distill() will not be available from your distilled file.

EXAMPLE
// at the start of your code
zim.DISTILL = true;

// at the end of your code (once everything has run)
// this means we may have to wait for events to happen, etc.
zim.distill();

// this will log to the console a series of numbers
// separated by spaces representing the functions used

1 6 81 81 79 75 77 75 55 54 52 53 55 54 52 53 55 54 52
53 42 80 74 46 46 46 80 74 46 46 46 55 54 52 53 55 54
52 53 55 54 52 53 42 80 74

// copy these into the zim DISTILL form field
// to get the minified JavaScript for these functions
// NOTE: Distill will not duplicate the functions
// data duplication is left in for statistical purposes
END EXAMPLE
--*///+83.2
	zim.distill = function() {
		zog("zim.distill() - go to http://zimjs.com/code/distill and enter the following:");
		zog((zim.distillery.length>0)?zim.distillery.join(" "):"must set zim.DISTILL = true;");
	}//-83.2

	return zim;
} (zim || {});

// internal global function for the distill process
function z_d(n) {if (zim && zim.DISTILL) zim.distillery.push(n);}

// internal global function for zim.addDisplayMembers

/*--
zimify = function(obj)

zimify
global function

DESCRIPTION
Short-cut for zim.addDisplayMembers(obj).
Used to add all the ZIM Create module functions to obj.
Handy for adapting CreateJS objects that are exported from Adobe Animate
like createjs.Shape(), createjs.Sprite(), createjs.MovieClip()

EXAMPLE
var cjsShape = new lib.Shape1(); // include the js from Adobe Animate
zimify(cjsShape);
cjsShape.center(stage);
cjsShape.drag();

// otherwise would have to use:
zim.center(cjsShape, stage);
zim.drag(cjsShape); // etc.
END EXAMPLE

RETURNS - obj for chaining
--*///+83.3
function zimify(obj) {
	z_d("83.3");
	zim.addDisplayMembers(obj);
	return obj;
}//-83.3

// back into zim
var zim = function(zim) {

/*--
zim.Wonder = function(wid, client, app, notes, server)

Wonder
zim class

DESCRIPTION
Wonder sends counts, times, and orders to a server for user testing or statistical purposes.
Go to http://zimjs.com/code/wonder/ to get a Wonder ID (wid) and set up Wonder stats with ZIM
or make up your own wid and use your own server script to collect data.
See the zim Wonder site for a sample script to collect data.
NOTE: all records at ZIM are archived NEW YEARS DAY and kept for a year after that.
Service is provided as is and ZIM and Dan Zen are not responsible for lost data.

USAGE
count will count things like app loads, button clicks within an app, how many monsters they killed
time will tell you the time the user took to do something - like solve a puzzle, or locate the witch
order will record the order items were done - which section did they go to first, second, third, etc.

EXAMPLE
// make a Wonder object
// wonderID is e-mailed to you when you sign up
// client is your client's name that you provide
// app is the app for which you are recording data
// you can also pass an optional note
var wonder = new zim.Wonder("wonderID", "client", "app");

// COUNT EXAMPLE
// for this example we count times a button is pressed
var button = new zim.Button("CLICK");
button.center(stage);
button.on("click", function(){
	// records an entry for this keyword in your stats
	// along with date, time, session, etc.
	wonder.count("wow");
});

// TIME EXAMPLE
// assuming we have our Wonder object from above
// (you only need one Wonder object)
// start the timer counting for a keyword called "test"
// this will record nothing until you timeEnd()
// or you timeStart() again
// you can also timePause() and timeUnpause()
// see DOCS for more functionality and information
wonder.timeStart("test");

// add the circle
var circle = new zim.Circle(100, "red");
circle.center(stage);
circle.drag();
circle.on("pressup", function(){
	if (circle.hitTestRect(square)) {
		// if the shapes are hitting then end the timer
		// this will send data to your Wonder report
		wonder.timeEnd("test");
	}
});

// add the square to a random location on stage
var square = new zim.Rectangle(100, "yellow");
stage.addChild(square);
square.x = zim.rand(stageW-square.width);
square.y = zim.rand(stageH-square.height);

// ORDER EXAMPLE
// assuming we have our Wonder object from above
// (you only need one Wonder object)

// make tabs
var tabs = new zim.Tabs(400, 40, ["MOUSE", "CAT", "MONKEY"]);
tabs.selectedIndex = -1; // start with no selection
tabs.center(stage);
var count = 0; // perhaps get the first four presses
tabs.on("change", function(){
	// record which tab was pressed
	// this gets stored under keyword animal
	wonder.order("animal", tabs.text);
	count++;
	// turn the order recording off for "animal"
	if (count == 4) wonder.orderOff("animal");
});
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
wid - string with your company wonder ID for example z14i46m3z29
	  this is the ID you are e-mailed when you sign up or sign in with your company name
	  this is NOT your company name that you log into Wonder with
	  NOTE: recording to a non-registered wid on the ZIM server will not work and there is no error message
client - the client the app is for - if it is for your company, just put your company
app - the app or site the Wonder stats are for
server - a server with zim Wonder running
	Note: the default value for the server parameter has been removed as it risks being out-of-date
	If you have signed up for ZIM Wonder at http://zimjs.com/code/wonder/ then
	import http://d309knd7es5f10.cloudfront.net/zimserver_url.js in your code (script tag up top)
	this gives a global zimWonderURL variable to pass into the server parameter
	the zimserver_url.js script will always hold the latest domain:port for the zim server
notes - (default null) any extra notes like any user data (limit 256 characters as it is stored each record)

METHODS
count(keyword) - sends a line to the server script with the given keyword as well as date and time
timeStart(keyword) - starts timing for the specified keyword (nothing sent to server yet)
timePause(keyword) - pauses the timing for this keyword
timeUnpause(keyword) - unpauses the timing for this keyword
timeEnd(keyword) - ends timing for the specific keyword and sends the time to the server
	NOTE: if the user exits the app (or leaves page) nothing gets sent to the server
		  due to unreliable beforeUnload events in the HTML world (otherwise all this would be batched)
order(keyword, item) - sends a line to the server for this item along with a unique order id for the keyword for the user

countOff(keyword) - prevents counts from being sent for this keyword
countOn(keyword) - allows counts from being sent for this keyword (default)
timeOff(keyword) - prevents sending time to the server for this keyword
timeOn(keyword) - allows sending time to the server for this keyword (default)
orderOff(keyword) - prevents sending orders to the server for this keyword
orderOn(keyword) - allows sending orders for this keyword (default)

dispose() - clear any event listeners, etc.
--*///+82
	zim.Wonder = function(wid, client, app, notes, server) {

		var sig = "wid, client, app, notes, server";
		var duo; if (duo = zob(zim.Wonder, arguments, sig, this)) return duo;
		z_d("82");
		if (zot(wid)) {zog("zim.Wonder() - please provide Wonder ID (see http://zimjs.com/code/wonder/)"); return;}
		if (zot(server)) server = "http://54.237.229.197:3001/wonder"; // adjust to amazon server
		var that = this;
		if (zot(zim.wonderSession)) zim.wonderSession = "W"+zim.rand(100000,999999); // session id
		var data = [];
		// buffer to send at most every second
		var wonderInterval = setInterval(sendData,1000);
		var sendCount = 0;
		function sendData() {
			if (data.length > 0) {
				zim.async(server + "?wonder=" + JSON.stringify(data));
				data = [];
				sendCount++;
			}
		}
		var lastKeyword;
		var wonderCheck = setInterval(function(){
			if (sendCount > 28) {
				data.push({id:wid, c:client, a:app, n:notes, k:lastKeyword, t:"e", v:"frequency max - terminated", s:zim.wonderSession});
				zog("zim.Wonder() - frequency max - terminated");
				that.dispose();
			}
			sendCount=0;
		}, 30*1000); // 30 seconds
		this.countsOff = {};
		this.timesOff = {};
		this.ordersOff = {};
		function kw(k,t){
			if (zot(k)) {
				zog("zim.Wonder "+t+" - please provide a keyword"); return false;
			} else { // check if in off lists
				if (that[t+"sOff"][k]) return false;
				return true;
			}
		}
		this.count = function(keyword) {
			if (!kw(keyword, "count")) return;
			lastKeyword = keyword;
			data.push({id:wid, c:client, a:app, n:notes, k:keyword, t:"c", v:1, s:zim.wonderSession});
		}
		var times = {};
		this.timeStart = function(keyword) {
			if (!kw(keyword, "time")) return;
			that.timeEnd(keyword);
			lastKeyword = keyword;
			times[keyword] = new Date().getTime();
		}
		var pauseTimes = {};
		this.timePause = function(keyword) {
			if (!kw(keyword, "time")) return;
			if (pauseTimes[keyword]) return; // already pausing
			pauseTimes[keyword] = new Date().getTime();
		}
		this.timeUnpause = function(keyword) {
			if (!kw(keyword, "time")) return;
			if (!pauseTimes[keyword]) return; // no pauses
			var pausedTime = new Date().getTime() - pauseTimes[keyword];
			if (times[keyword]) times[keyword] += pausedTime;
			delete pauseTimes[keyword];
		}
		this.timeEnd = function(keyword) {
			if (!kw(keyword, "time")) return;
			if (!times[keyword]) return;
			var t1 = (pauseTimes[keyword]) ? pauseTimes[keyword] : new Date().getTime();
			var time = Math.round((t1 - times[keyword])/1000);
			delete pauseTimes[keyword];
			delete times[keyword];
			data.push({id:wid, c:client, a:app, n:notes, k:keyword, t:"t", v:time, s:zim.wonderSession});
		}
		this.order = function(keyword, item) {
			if (!kw(keyword, "order")) return;
			lastKeyword = keyword;
			if (zot(item)) {zog("zim.Wonder order() - please provide an item"); return;}
			data.push({id:wid, c:client, a:app, n:notes, k:keyword, t:"o", v:item, s:zim.wonderSession});
		}
		this.countOff = function(keyword) {that.countsOff[keyword] = 1;}
		this.countOn = function(keyword) {delete that.countOff[keyword];}
		this.timeOff = function(keyword) {that.timesOff[keyword] = 1;}
		this.timeOn = function(keyword) {delete that.timesOff[keyword];}
		this.orderOff = function(keyword) {that.ordersOff[keyword] = 1;}
		this.orderOn = function(keyword) {delete that.ordersOff[keyword];}

		this.dispose = function() {
			sendData();
			clearInterval(wonderInterval);
			clearInterval(wonderCheck);
		}
	}//-82

	return zim;
} (zim || {});
