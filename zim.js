
// ZIM js Interactive Media modules by Dan Zen http://danzen.com (c) 2014
// zim.js includes all the basic zim coding modules http://zimjs.com
// free to use - donations welcome of course! http://zimjs.com/donate

////////////////  ZIM WRAP  //////////////

// zimwrap.js creates global wrapper functions for less typing

// set var zon=true before calling zim scripts to show script comments
if (typeof zon === "undefined") zon = false; // comments from zim scripts

// zog() is now a short version of console.log() 
var zog = console.log.bind(console);

if (zon) zog("ZIM WRAP - zog, zid, zss, zgo, zum, zot, zop");

function zid(s) {
	// short version of document.getElementById()
	return document.getElementById(s);	
}

function zss(s) {
	// short version of document.getElementById(s).style
	// so you can do zss("logo").top = "10px"; // for instance
	return document.getElementById(s).style;	
}

function zgo(u,t,m) {
	// short version of either window.location.href or window.open
	if (zot(t) && t != "" && t != "_self") {
		window.location.href = u;
	} else {
		if (zot(m)) { // not modal
			window.open(u,"_blank");
		} else {
			window.open(u,"_blank","modal=yes,alwaysRaised=yes");			
		}			
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
	// stop keys from moving content - arrows, spacebar, pgup, pgdown, home, end
	if (e.keyCode >= 32 && e.keyCode <= 40) e.preventDefault();
	if (e.stopImmediatePropagation) e.stopImmediatePropagation();
	if (window.event) window.event.cancelBubble=true;	
}


////////////////  ZIM CODE  //////////////

// zimcode.js adds some general code functionality along with Browser and DOM code  
// some of these are common Web solutions over the years (sorry for lack of credit)
// moved Damp, Proportion and ProportionDamp here as they can be used without CreateJS

var zim = function(zim) {
	
	if (zon) zog("ZIM CODE Module");
	
	// randomly shuffles elements of an array
	// actually changes the original array (but also returns it)
	
	zim.shuffle = function(a) {
	  var i = a.length, j, temp;
	  if (i == 0) return a;
	  while(--i) {
		 j = Math.floor(Math.random()*(i+1));
		 temp=a[i];
		 a[i]=a[j];
		 a[j]=temp;
	  }
	  return a;
	}
	
	
	// returns a random number between and including a and b
	// b is optional and if left out will default to 0
	// integer is a boolean and defaults to true
	// if a and b are 0 then just returns Math.random()
	
	zim.rand = function(a, b, integer) { 
		if (zot(integer)) integer = true;
		if (zot(b)) b = 0;
		if (zot(a)) a = 0;
		if (a>b) {a++;} else if (b>a) {b++;}
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
	
	// copies arrays and basic objects
	// http://stackoverflow.com/users/35881/a-levy
	
	zim.copy = function(obj){
		if (obj==null || typeof obj != 'object') return;
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
	
	// modified Evan Steinkerchnerv & Tomas Zato
	// finds out if arrays are same (including nested arrays)
	// works for arrays with strings and numbers (not necessarily other objects)
	
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
	
	// rounds number to the number of decimal places specified by places
	// for instance zim.decimals(1.8345, 2) == 1.83
	
	zim.decimals = function(num, places) {
		if (zot(num) || num==0) return 0;
		if (zot(places)) places = 1;	
		return Math.round(num*Math.pow(10, places))/Math.pow(10, places);
	}
	
	// Damp Class 
	
	// damping emulates things slowing down due to friction
	// the movement heads towards the right direction and looks organic 
	// this is similar if not the same as easing out
	// create your Damp object outside an interval or ticker
	// var d = new zim.Damp(parameters);
	// then inside an interval or ticker call the convert method
	// d.convert(desiredValue)
	// you would then apply that desired value to a property such as x or y or scale
	// if you want to do both x and y then you need two Damp objects 
	// and two convert calls (you can do both in one interval or ticker)
	
	// PARAMETERS
	// a startValue if you want the object to start directly somewhere
	// the damp value with 1 being no damping and 0 being no movement - default is .1
	
	// METHODS
	// convert() - converts a value into a damped value
	
	// PROPERTIES
	// damp - can dynamically change the damping (usually just pass it in as a parameter to start)
	// lastValue - setting this would go immediately to this value (would not normally use)
	
	zim.Damp = function(startValue, damp) {
		if (zon) zog("zimcode.js: Damp");
		this.lastValue = (zot(startValue)) ? 0 : startValue;
		this.damp = (zot(damp)) ? .1 : damp;
	}	
	zim.Damp.prototype.convert = function(desiredValue) {
		return this.lastValue = this.lastValue + (desiredValue - this.lastValue) * this.damp;		
	}
	
	
	// Proportion Class
	
	// converts an input value to an output value on a different scale 	
	// for instance like a slider controlling the scale of an object or sound volume
	// make a Proportion object
	// var p = new zim.Proportion(parameters)	
	
	// PARAMETERS
	// put in min and max for the output scale (say volume)
	// put in min and max for the input scale (say x values, 0 and 1 are the defaults)			
	// in your own pressmove event function or whatever call p.convert(input)
	// pass in your input property (say the mouseX)
	// the object always starts by assuming baseMin as baseValue
	// just call the convert method right away if you want it to start at a different baseValue
	// for instance, if your slider went from 100 to 500 and you want to start at half way
	// make the object and call p.convert(300); on the next line
	// then in your pressmove event, use p.convert(stage.mouseX) for example
	
	// METHODS
	// convert(input) - will return the output property (for instance, a volume)			


	zim.Proportion = function(baseMin, baseMax, targetMin, targetMax, factor, targetRound) {
		
		if (zon) zog("zimcode.js: Proportion");

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
	
		
	// ProportionDamp Class
	
	// converts an input value to an output value on a different scale with damping	
	// works like Proportion Class but with a damping parameter
	// var pd = new zim.ProportionDamp(parmeters);
	
	// PARAMETERS
	// put in desired damping with 1 being no damping and .1 being the default
	// in your own interval or ticker event function call pd.convert(input)
	// the object always starts by assuming baseMin as baseValue
	// if you want to start or go to an immediate value without easing then
	// call the pd.immediate(baseValue) method with your desired baseValue (not targetValue)	
	
	// METHODS
	// convert(input) - converts a base value to a target value
	// immediate(input) - immediately sets the target value (no damping)
	
	// PROPERTIES
	// damp - can adjust this dynamically (usually just pass it in as a parameter to start)
			


	zim.ProportionDamp = function(baseMin, baseMax, targetMin, targetMax, damp, factor, targetRound) {
		
		if (zon) zog("zimcode.js: ProportionDamp");
		
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
			if (targetRound) {lastAmount = Math.round(lastAmount);}					
		}		
		
		this.immediate = function(n) {
			this.convert(n);
			calculate();
			lastAmount = targetAmount;
			if (targetRound) {lastAmount = Math.round(lastAmount);}	
		}
		
		this.convert = function(n) {
			baseAmount = n;			
			return lastAmount;
		}
		
		this.dispose = function() {
			clearInterval(interval);
		}
	}		


	// DOM CODE	
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


////////////////  ZIM CREATE  //////////////

// zimcreate.js adds functionality to CreateJS for digidos (Interactive Features) 
// functions in this module require createjs namespace to exist and in particular easel.js and tween.js
// available at http://createjs.com

var zim = function(zim) {
	
	if (zon) zog("ZIM CREATE Module");

	
	zim.drag = function(obj, rect, overCursor, dragCursor, currentTarget) {
		
		// adds drag to an object (rect, overCursor, dragCursor optional, currentTarget optional)
		// rect is a rectangle object for the bounds of dragging
		// the two cursor properties are any css cursor value such as "pointer", etc.
		// currentTarget defaults to false allowing you to drag things within a container
		// eg. drag(container); will drag any object within a container
		// setting currentTarget to true will then drag the whole container
		// dragging takes into account scaled and rotated object containers 		
		
		obj.cursor = (zot(overCursor))?"pointer":overCursor;
		if (zot(currentTarget)) currentTarget = false;
		
		var diffX; var diffY; var point;		
		obj.zimAdded = obj.on("added", initializeObject, null, true); // if not added to display list
		if (obj.parent) {
			initializeObject();
		}
		
		function initializeObject() {
			// check position right away if there is a bounding box
			// there is no mousedown so set the diffX and diffY to 0		
			diffX = 0;diffY = 0;
			// positionObject() is used as well in the dragmove function	
			// where it expects a global x and y
			// so convert obj.x and obj.y positions inside its parent to global:
			point = obj.parent.localToGlobal(obj.x, obj.y);
			positionObject(obj, point.x, point.y);		
		}
	
		obj.zimDown = obj.on("mousedown", function(e) {
			// e.stageX and e.stageY are global
			// e.target.x and e.target.y are relative to e.target's parent
			// bring stageX and stageY into the parent's frame of reference
			var dragObject = (currentTarget)?e.currentTarget:e.target;
			var point = dragObject.parent.globalToLocal(e.stageX, e.stageY); 
			diffX = point.x - e.target.x;
			diffY = point.y - e.target.y;	
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
			if (!obj.parent) return;
			var point = o.parent.globalToLocal(x, y);
			var checkedPoint = checkBounds(point.x-diffX, point.y-diffY);			
			// now set the object's x and y to the resulting checked local point
			o.x = checkedPoint.x;
			o.y = checkedPoint.y;
			o.getStage().update();			
		}
		
		obj.zimUp = obj.on("pressup", function(e) { 
			obj.cursor = (zot(overCursor))?"pointer":overCursor;
		}, true);
				
				
		function checkBounds(x,y) {							
		
			if (rect) {					
				// convert the desired drag position to a global point
				// note that we want the position of the object in its parent
				// so we use the parent as the local frame
				var point = obj.parent.localToGlobal(x,y);
				
				// check to see if we have a bounding rectangle to drag within
				// and if so - the rect is on the global stage so use the transformed point		
				x = Math.max(rect.x, Math.min(rect.x+rect.width, point.x));
				y = Math.max(rect.y, Math.min(rect.y+rect.height, point.y));
				// now that the point has been checked on the global scale
				// convert the point back to the obj parent frame of reference
				point = obj.parent.globalToLocal(x, y);
				x = point.x;
				y = point.y;
			} 
			
			return {x:x,y:y}				
		}
	}
			
	zim.noDrag = function(obj) {
		// removes drag function from an object
		obj.cursor = "default";
		obj.off("added", obj.zimAdded);
		obj.off("mousedown", obj.zimDown);
		obj.off("pressmove", obj.zimMove);
		obj.off("pressup", obj.zimUp);	
	}

	zim.hitTestPoint = function(obj,x,y) {
		// see if shape (obj) is hitting the global point x and y on the stage
		var point = obj.globalToLocal(x,y);
		return obj.hitTest(point.x, point.y);
	}
	
	zim.hitTestReg = function(a,b) {	
		// see if shape (a) is hitting the registration point of object b	
		var point = b.localToLocal(b.regX,b.regY,a);
		return a.hitTest(point.x, point.y);
	}


	zim.hitTestRect = function(a,b,num) {
		// see if a shape (a) is hitting points on a rectangle
		// the rectangle is based on the position, registration and bounds of object b
		// the four corners are the default with num=0;
		// if num is 1 then it tests for one extra (mid) point on each side
		// if num is 2 then it tests for two extra points on each side (1/3 and 2/3)
		// etc.
		
		if (zot(num)) num = 0;
			
		var bounds = b.getBounds();
		if (!bounds) {
			zog("zimcreate.js hitTestRect():\n please setBounds() on param b object");
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
	
	zim.hitTestCircle = function(a,b,num) {
		// see if a shape (a) is hitting points on a circle
		// the circle is based on the position, registration and bounds of object b
		// num is how many points around the circle we test - default is 8
		
		if (zot(num)) num = 8;
		
		var bounds = b.getBounds();
		if (!bounds) {
			zog("zimcreate.js hitTestCircle():\n please setBounds() on param b object");
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
	
	zim.hitTestBounds = function(a,b,boundsShape) {
		// see if the a.getBounds() is hitting the b.getBounds()
		// we draw bounds for demonstration if you pass in a boundsShape shape
		
		var boundsCheck = false;
		if (boundsShape && boundsShape.graphics) boundsCheck=true;
				
		var aB = a.getBounds();
		var bB = b.getBounds();
		if (!aB || !bB) {
			zog("zimcreate.js hitTestBounds():\n please setBounds() on both objects");
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


	zim.boundsToGlobal = function(o) {
		// returns a rectangle of the bounds projected onto the stage
		// used by the hitTestBounds above so probably you will not use this directly		
		var oB = o.getBounds();
		if (!oB) {
			zog("zimcreate.js boundsToGlobal():\n please setBounds() on both objects");
			return;
		}
		
		var pTL = o.localToGlobal(oB.x, oB.y);
		var pTR = o.localToGlobal(oB.x+oB.width, oB.y);
		var pBR = o.localToGlobal(oB.x+oB.width, oB.y+oB.height);		
		var pBL = o.localToGlobal(oB.x, oB.y+oB.height);
		
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
	
	zim.scale = function(o, s) {
		// convenience function to do scaleX and scaleY in one call
		// pass in the object to scale followed by the scale
		if (zot(o)) return;	
		if (zot(s)) s=1;
		o.scaleX = o.scaleY = s;	
	}
	

	zim.move = function(target, x, y, t, ease) {		
		// convenience function (wraps createjs.Tween)
		// to animate an object target to position x, y in t miliseconds
		// with ease (optional)
		if (zot(ease)) ease = "quadInOut";
		createjs.Tween.get(target, {override: true})
			.to({x:x, y:y}, t, createjs.Ease[ease])				
			.call(doneAnimating);
		var listener = createjs.Ticker.on("tick", stage);	
		function doneAnimating() {
			createjs.Ticker.off("tick", listener);
		}		
	}		
	
	zim.animate = function(target, obj, t, ease, callBack, params, wait) {		
		// convenience function (wraps createjs.Tween)
		// to animate object o properties in t miliseconds
		// with optional ease and a callBack function and params (send an array, for instance)
		if (zot(ease)) ease = "quadInOut";
		if (zot(wait)) wait = 0;
		createjs.Tween.get(target)
			.wait(wait)
			.to(obj, t, createjs.Ease[ease])				
			.call(doneAnimating);
		var listener = createjs.Ticker.on("tick", stage);	
		function doneAnimating() {
			if (callBack) {(callBack)(params);}
			createjs.Ticker.off("tick", listener);
		}		
	}	
	
	zim.fit = function(obj, left, top, width, height, inside) {
		// scale an object to fit inside (or outside) a rectangle and center it
		// actually scales and positions the object
		// object must have bounds set (setBounds())
		// if only the object is passed in then if fits to the stage
		// the inside parameter defaults to true and fits the object inside the bounds
		// if inside is false then it fits the object around the bounds
		// in both cases the object is centered
		// returns an object with the new {x:obj.x, y:obj.y, width:newW, height:newH, scale:scale}
		if (zot(obj)) return;
		if (!obj.getBounds()) {
			zog("zimcreate.js fit(): please setBounds() on object");
			return;
		}				
		if (zot(left)) {
			if (!obj.getStage()) {
				zog("zimcreate.js fit(): please add boundary dimensions or add obj to stage first");
				return;
			}	
			if (!obj.getStage().getBounds()) {
				zog("zimcreate.js fit(): please add boundary dimensions or add obj with bounds to stage first");
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
		
		return {x:obj.x, y:obj.y, width:newW, height:newH, scale:scale};	
							
	}	
	
	zim.outline = function(obj, color, size) {
		// draws a rectangle around the bounds of obj in the provided shape
		// draws a cross at the origin of the object (0,0) where content will be placed
		// draws a circle at the registration point of the object (where it will be placed in its container)
		// these three things could be in completely different places ;-)
		if (zot(obj)) {zog("zimcreate.js outline(): please provide object and shape"); return;}		
		if (!obj.getBounds()) {zog("zimcreate.js outline(): please setBounds() on object");	return;}
		if (!obj.parent) {zog("zimcreate.js outline(): object should be on stage first"); return;}
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
	}
	

	return zim;
} (zim || {});



////////////////  ZIM BUILD  //////////////

// zimbuild.js adds common building classes for digidos (interactive media)
// classes in this module require createjs namespace to exist and in particular easel.js
// available at http://createjs.com

var zim = function(zim) {
	
	if (zon) zog("ZIM BUILD Module");
	
	
	// Triangle class
	
	// extends a createjs.Shape
	// makes a triangle shape using three line lengths
	// var tri = new zim.Triangle(parameters);
	
	// PARAMETERS
	// a, b and c are the lengths of the sides
	// a will run horizontally along the bottom
	// b is upwards and c is back to the origin
	// fill, stroke, strokeSize are optional
	// center defaults to true and puts the registration point to the center
	// the actual center is not really the weighted center 
	// so can pass in an adjust which brings the center towards its vertical base
	
	zim.Triangle = function(a, b, c, fill, stroke, strokeSize, center, adjust) {
						
		function makeTriangle() {
		
			if (zot(a)) a = 100;
			if (zot(b)) b = a;
			if (zot(c)) c = a;
			if (zot(fill)) fill = "black";
			if (zot(center)) center = true;
			if (zot(adjust)) adjust = 0;
			
			var lines = [a,b,c];
			lines.sort(function(a, b){return b-a});
			aa = lines[0];
			bb = lines[1];
			cc = lines[2];
			
			if (aa > bb+cc) {
				zog("zimbuild.js Triangle(): invalid triangle lengths");
				return;
			}		
					
			var tri = new createjs.Shape();
			var g = tri.graphics;
			g.f(fill);
			if (!zot(stroke)) {
				g.s(stroke);
				if (zot(strokeSize)) strokeSize=1; 	
				g.ss(strokeSize);
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
			
			tri.width = Math.max(a, a-backX);
			tri.height = upY;
			tri.setBounds(0,0,tri.width,-tri.height);			
						
			g.lt(a-backX,0-upY);
			g.lt(0,0);
						
			if (center) {
				tri.regX = tri.width/2;
				tri.regY = -tri.height/2+adjust;
			}
			
			return tri;		
		}	
			
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeTriangle.prototype = new createjs.Shape();
		makeTriangle.constructor = zim.Triangle;
		return new makeTriangle();
		
	}	
	
	
	// Label Class
	
	// extends a createjs.Container	
	// makes a label - wraps the createjs Text object
	// can use with Button, CheckBox, RadioButtons and Pane 
	// var label = new zim.Label(parameters);	
	// Text seems to come in different sizes so we do our best
	// Have tended to find that left and alphabetic are most consistent across browsers
	
	// PARAMETERS
	// see the defaults in the code below 
	
	// METHODS
	// showRollColor(boolean) - true to show roll color (used internally)
	// clone() - returns a copy of the label and its properties
	// dispose() - to get rid of the button and listeners
	
	// PROPERTIES
	// label - references the text object of the label
	// text - references the text property of the text object
	
	// EVENTS
	// dispatches no events 
		
			
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
			this.addChildAt(backing,0);
			
			this.setBounds(0,0,this.getBounds().width,this.getBounds().height);
			
			//obj.x = obj.getBounds().width / 2; 
			obj.y = fontSize-fontSize/6; //obj.getBounds().height / 2;
				
			Object.defineProperty(that, 'text', {
				get: function() {
					var t = (obj.text == " ") ? "" : obj.text;				
					return t;
				},
				set: function(value) {
					obj.text = value;
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
		makeLabel.constructor = zim.Label;
		return new makeLabel();
		
	}
		
		
	
	
	// Button Class
	
	// extends a createjs.Container	
	// makes a button with rollovers 
	// var button = new zim.Button(parameters);
	// you will need to stage.addChild(button); and position it
	// you will need to add a click event button.on("click", function);
	// the Button class handles the rollovers		
	
	// PARAMETERS
	// see the defaults in the code below
	// (label is a ZIM Label object or text for default label properties)
	
	// METHODS
	// dispose() - to get rid of the button and listeners
	
	// PROPERTIES
	// width and height - or use getBounds().width and getBounds().height
	// text - references the text property of the Label object of the button
	// label - gives access to the label including button.label.text
	// backing - references the backing of the button
	
	// EVENTS
	// dispatches no events - you make your own click event
		
			
	zim.Button = function(
		width, height, label, 
		backingColor, backingRollColor, borderColor, borderThickness,
		corner, shadowColor, shadowBlur
	) {
	
		function makeButton() {
			
			// if (zon) zog("zimbuild.js: Button");
			
			if (zot(width)) width=200;
			if (zot(height)) height=60;
			if (zot(backingColor)) backingColor="#C60";
			if (zot(backingRollColor)) backingRollColor="#F93";
			if (zot(borderColor)) borderColor=null;
			if (zot(borderThickness)) borderThickness=1;
			if (zot(corner)) corner=20;
			if (zot(shadowColor)) shadowColor="#666";
			if (zot(shadowBlur)) shadowBlur=16;			
			if (zot(label)) label = "PRESS";			
			if (typeof label === "string" || typeof label === "number") label = new zim.Label(label, 36, "arial", "white");			
						
			this.mouseChildren = false; 
			this.cursor = "pointer";
				
			var buttonBacking = new createjs.Shape();		
			var g = buttonBacking.graphics;		
			g.f(backingColor);
			if (borderColor) g.s(borderColor).ss(borderThickness);
			g.rr(0, 0, width, height, corner);
			this.addChild(buttonBacking);
			this.backing = buttonBacking;
								
			if (shadowBlur > 0) buttonBacking.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);
			this.setBounds(0,0,width,height);
			this.width = width;
			this.height = height;
			
			label.x = (width-label.getBounds().width)/2+1;
			label.y = (height-label.getBounds().height)/2+2;
			this.addChild(label);
			this.label = label;		
			
			this.on("mouseover", buttonOn);
			var that = this;
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
		makeButton.constructor = zim.Button;
		return new makeButton();
		
	}
	
	// CheckBox Class
	
	// extends createjs.Container
	// a checkbox that when clicked toggles the check and a checked property
	// var checkBox = new zim.CheckBox(parameters)
	
	// PARAMETERS
	// size - in pixels (always square)
	// label - ZIM Label object - or just some text to make a default label
	// startChecked - an initial parameter to set checked if true - default is false
	// color - the stroke and check color (default black) - background is set to a .5 alpha white
	// margin - is on outside of box so clicking or pressing is easier
	
	// METHODS
	// setChecked(Boolean) - defaults to true to set button checked (or use checked property)
	
	// PROPERTIES
	// label - gives access to the label including checkBox.label.text
	// checked - gets or sets the check of the box
	
	// EVENTS
	// dispatches a "change" event when clicked on (or use a click event)
	
	
	zim.CheckBox = function(size, label, startChecked, color, margin) {
	
		function makeCheckBox() {
			
			// if (zon) zog("zimbuild.js: CheckBox");
				
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
			g.f("rgba(0,0,0,.01)").r(
				this.getBounds().x,
				this.getBounds().y,
				this.getBounds().width,
				this.getBounds().height
			);
			g.f("rgba(255,255,255,.5)").r(0,0,size,size);						
			g.s(color).ss(size/10).r(size/7, size/7, size-size/7*2, size-size/7*2);
						
			this.addChild(box);			
			
			if (label) {
				this.addChild(label);
				label.x = this.getBounds().width;
				label.y = size/8; 
				this.label = label;
			}
				
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
		makeCheckBox.constructor = zim.CheckBox;
		return new makeCheckBox();
		
	}	

	
	// RadioButtons Class
	
	// extends createjs.Container
	// a radio button set that lets you pick from choices
	// var radioButton = new zim.RadioButton(parameters)
	
	// PARAMETERS
	// size - in pixels (always square)
	// buttonData - an array of button data objects as follows:	
	// [{label:ZIM Label or text, id:optional id, selected:optional Boolean}, {etc...}]
	// or just a list of labels for default labels ["hi", "bye", "what!"]
	
	// vertical - boolean that if true displays radio buttons vertically else horizontally
	// color - the stroke and check color (default black) - background is set to a .5 alpha white
	// spacing - the space between radio button objects
	// margin - the space around the radio button itself
	
	// METHODS
	// setSelected(num) - sets the selected index (or use selectedIndex) -1 is default (none)
	
	// PROPERTIES
	// selected - gets the selected object - selected.label, selected.id, etc.
	// selectedIndex - gets or sets the selected index of the buttons
	// label - current selected label object
	// text - current selected label text
	// id - current selected id
	// labels - an array of the ZIM Label objects. labels[0].text = "YUM"; labels[2].y -= 10;
	
	// EVENTS
	// dispatches a "change" event when clicked on (or use a click event)
	// then ask for the properties above for info

	
	zim.RadioButtons = function(size, buttonData, vertical, color, spacing, margin) {
	
		function makeRadioButtons() {
			
			// if (zon) zog("zimbuild.js: RadioButtons");
			
			if (zot(size)) size = 60;
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
				g.f("rgba(0,0,0,.01)").r(
					but.getBounds().x,
					but.getBounds().y,
					but.getBounds().width,
					but.getBounds().height
				);
				g.f("rgba(255,255,255,.5)").dc(size/2,size/2,size/1.85);						
				g.s(color).ss(size/9).dc(size/2, size/2, size/2-size/2/5);
				but.addChild(box);
					
				var check = but.check = new createjs.Shape();
				check.mouseEnabled = false;
				check.alpha = .95;
				var g2 = check.graphics;		
				g2.f(color).dc(size/2,size/2,size/5.2);	
				
				if (label) {
					but.addChild(label);
					label.x = but.getBounds().width;
					label.y = size/8; 
					that.label = label;
					but.setBounds(-margin, -margin, size+margin*2+label.getBounds().width, Math.max(size+margin*2, label.getBounds().height));
				}
				if (mySelected) but.addChild(check);
								
				return(but);
			}
			
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
		makeRadioButtons.constructor = zim.RadioButtons;
		return new makeRadioButtons();
		
	}
	
	

	
	// Pane Class
	
	// extends a createjs.Container
	// adds a window for alerts, etc.
	// var pane = new zim.Pane(parameters); 
	// you need to call the pane.show() to show the pane and pane.hide() to hide it
	// you do not need to add it to the stage - it adds itself centered
	// you can change the x and y (with origin and registration point in middle)

	// PARAMETERS
	// see the defaults in the code below
	// pass in the stage and the width and height of the pane
	// pass in an optional ZIM Label (or text for default label properties)
	// pass in a boolean for if you want to drag the pane (default false)
	// pass in whether a dragging pane should open at first start position (defaults false)
	// for reset, by default, Pane takes the first position and will continue to use that
	// modal defaults to true and means the pane will close when user clicks off the pane
	// corner is the corner radius default 20
	// the backingAlpha is the darkness of the background that fills the stage
	// value for shadow blur - 0 for no shadow
	
	// METHODS
	// show() - shows the pane
	// hide() - hides the pane
	
	// PROPERTIES
	// display - reference to the pane box
	// label - gives access to the label including pane.label.text
	// backing - reference to the backing	that covers the stage
	// resetX - if reset is true you can dynamically adjust the position if needed
	// resetY 
	
	// EVENTS
	// dispatches a "close" event when closed by clicking on backing
		
	zim.Pane = function(stage, width, height, label, color, drag, resets, modal, corner, backingAlpha, shadowColor, shadowBlur) {
		
		function makePane() {
			
			// if (zon) zog("zimbuild.js: Pane");
			
			if (zot(stage)) {zog("zimbuild.js Pane(): Please pass in a reference to the stage with bounds set as first parameter");	return;}
			if (!stage.getBounds()) {zog("zimbuild.js Pane(): Please give the stage bounds using setBounds()");	return;}

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
					stage.update();
				});
				
				this.on("pressup", function(e) {				
					display.cursor = "pointer";
				});
			}
			
			this.addChild(display);
			
			if (label) {
				label.x = -label.getBounds().width/2;
				label.y = -label.getBounds().height/2;
				this.addChild(label);				
				this.label = label;
				this.text = label.text;				
			}
															
		
					
			stage.update();			
			
			this.hide = function() {
				stage.removeChild(that);			
				stage.update();	
				if (resets) {
					if (!isNaN(that.resetX)) that.x = that.resetX;					
					if (!isNaN(that.resetY)) that.y = that.resetY;
				}
			}			
			this.show = function() {
				that.x = (stage.getBounds().width) /2;
				that.y = (stage.getBounds().height) /2;
				stage.addChild(that);			
				stage.update();	
			}			
			function checkBounds(x,y) {		
				x = Math.max(width/2, Math.min(stage.getBounds().width-width/2, x));
				y = Math.max(height/2, Math.min(stage.getBounds().height-height/2, y));
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
		makePane.constructor = zim.Pane;
		return new makePane();
		
	}
	
	
	// Parallax Class	
	
	// takes objects and moves them with a parallax effect based on mouse movement
	// for proper parallax, the objects closer move more than the objects farther back
	// make a new object: p = new zim.Parallax(parameters)
	
	// PARAMETERS
	// pass in the stage from your code (uses stage.mouseX and stage.mouseY)
	// pass in the damping value (.1 default)
	// pass in an array of layer objects in the following format
	// [[obj, distanceX, distanceY], [obj2, distanceX, distanceY], etc.]
	// or you can add these one at a time with the p.addLayer(obj, distanceX, distanceY); method
	// you must pass in a layer object - the distanceX and distanceY can be 0 for no motion on that axis
	// the distance is the total distance you want the layer object to travel
	// relative to the cursor position between 0 and stage width or height
	// the Parallax class will apply half the distance on either side of the object's start point
	// should work through nested clips...
	
	// METHODS 
	// addLayer(obj, distanceX, distanceY) - to alternately add layers after the object is made
	// dispose() - removes listeners
	
	// PROPERTIES
	// damp - allows you to dynamically change the damping
	
		
	zim.Parallax = function(stage, damp, layers) {
						
		if (zon) zog("zimbuild.js: Parallax");
		
		if (zot(stage)) {zog("zimbuild.js: Parallax(): please pass in the stage with bounds as first parameter"); return;}
		if (!stage.getBounds()) {zog("zimbuild.js Pane(): Please give the stage bounds using setBounds()");	return;}

		var stageW = stage.getBounds().width;
		var stageH = stage.getBounds().height;
		
		var that = this;
		
		// public properties
		this.damp = (zot(damp)) ? .1 : damp;
		//this.x = (zot(damp)) ? stageW/2 : x;
		//this.y = (zot(damp)) ? stageH/2 : y;
		
		// public methods (do not get hoisted so define early)
		// addLayer works as a public method
		// and also is called from the object in case we add layers via the Parallax object parameters
		// the function prepares ProportionDamp objects for both x and y
		// and stores them on the layer object
		// and also stores the desired distances on the layer objects themselves
		// finally, the layer object is added to the myLayers private property
		// the timer then loops through these layers and handles things from there
		this.addLayer = function(obj, distanceX, distanceY) {
			if (zot(obj)) return;
			obj.zimX = zot(distanceX)?0:distanceX;
			obj.zimY = zot(distanceY)?0:distanceY;
			if (obj.zimX != 0) {
				obj.zimpX = new zim.ProportionDamp(0, stageW, 0, obj.zimX, that.damp);				
			}
			if (obj.zimY != 0) {
				obj.zimpY = new zim.ProportionDamp(0, stageH, 0, obj.zimY, that.damp);				
			}
			obj.zimsX = obj.x;
			obj.zimsY = obj.y;
			myLayers.push(obj);		
		}	
		
		this.dispose = function() {
			myLayers = null;
			createjs.Ticker.off("tick", ticker);
		}
		
		// private properties
		// here are any layers that come in from Parallax object parameters
		layers = (zot(layers)) ? [] : layers;			
		
		// we now are going to process these layers with the public addLayer method
		// this will add the processed layers to the private property, myLayers
		var myLayers = [];		
		for (var i=0; i<layers.length; i++) {			
			this.addLayer(layers[i][0], layers[i][1], layers[i][2]);
		}
						
		var ticker = createjs.Ticker.on("tick", animate);	
		createjs.Ticker.setFPS(60);

		// loop though our layers and apply the converted proportion damping
		function animate(e) {			
			var o; var newX; var newY; var point;
			for (var i=0; i<myLayers.length; i++) {
				o = myLayers[i];				
				point = o.parent.localToGlobal(o.zimsX, o.zimsY);
				newX = point.x;
				newY = point.y;
				if (o.zimX != 0) {	
					newX = newX - o.zimX/2 + o.zimpX.convert(stage.mouseX);
				}
				if (o.zimY != 0) {
					newY = newY - o.zimY/2 + o.zimpY.convert(stage.mouseY);					
				}	
				point = o.parent.globalToLocal(newX, newY);				
				o.x = point.x;
				o.y = point.y;
			}
			stage.update();
		}			
	}
	
	
	
	// Scroller Class
	
	// animates a backing either horizontally or vertically (not both)
	// make a new zim.Scroller(parameters) object 
	// the Scroller object will animate and swap the backgrounds when needed
	
	// PARAMETERS
	// pass in two backgrounds (that look the same - clone them)	
	// pass in the speed, direction and a boolean for horizontal (default true)
	// setting horizontal to false will animate vertically
	// you can adjust the speed and direction properties dynamically
	// you cannot adjust the backings and horizontal dynamically
	// to change your animation, dispose() of the Scroller object and make a new one
	// disposing just removes the ticker - you have to remove the backings
	// not sure what is causing a small gap to appear over time 
	// but if your background can overlap a little you can pass in a gapFix of 10 pixels etc.
	
	// METHODS
	// dispose() - get rid of the event listeners - you need to remove the backings 
	
	// PROPERTIES
	// speed - how fast the animation is going in pixels per frame (ticker set at 60)
	// direction - either left or right if horizontal or up or down if not horizontal
	// gapFix - if spacing occurs over time you can set the gapFix dynamically
	
	
	zim.Scroller = function(b1, b2, speed, direction, horizontal, gapFix) {
		
		if (zon) zog("zimbuild.js: Scroller");
		
		var that = this; // we keep animate protected but want to access public properties
		
		// here are the public properties that can be changed
		this.speed = (zot(speed)) ? 1 : speed;
		this.direction = (zot(direction)) ? 1 : direction;
		this.gapFix = (zot(gapFix)) ? 0 : gapFix;
		
		if (!b1.getBounds() || !b2.getBounds()) {
			zog("zimbuild.js: Scroller(): please setBounds() on backing objects");
			return;
		}	
		if (!b1.getStage()) {
			zog("zimbuild.js: Scroller(): please add backing objects to stage to start");
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
			if (!b1.getStage().getBounds()) {zog("zimbuild.js: Scroller(): please setBounds() on stage"); return;}
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
	
	// Swipe class
	
	// extends a createjs.EventDispatcher so it can dispatch events
	// sets up capturing swipes on objects
	// dispatches a "swipe" event on swipe left, right, up, down
	// var s = zim.Swipe(parameters) 	
		
	// PARAMETERS
	// pass into the object the object you want to swipe on
	// then an optional distance to activate swipe (100 pixel default)
	// and an optional time to travel that distance (200 ms default)
			
	// PROPERTIES
	// direction - the direction of the last swipe (left, right, up, down or none)
	// obj - the object that was last swiped
	
	// EVENTS
	// dispatches a "swipe"	event on every pressup (even if swipe failed and direction is none)
	// when a swipe event triggers
	// the Swipe object provides a direction property of "left", "right", "up", or "down"
	// the Swipe object provides an obj property of what object was swiped on
	// for instance if e is the event object
	// then e.target is the Swipe object so use e.target.direction
	// did not dispatch a custom event due to lack of support in early IE
	// Swipe also dispatches a direction of "none" if the mouse movement is not a swipe
	// this can be used to snap back to an original location		
	
	zim.Swipe = function(obj, distance, duration) {
		function makeSwipe() {
			if (zot(obj)) {zog("zimcreate.js Swipe():\nPlease pass in object"); return;}
			if (zot(distance)) distance = 100; // pixels for swipe to count
			if (zot(duration)) duration = 200; // ms to test pixels
			
			var startX;
			var startY;	
			var mouseX;
			var mouseY;
			var downCheck;
			var timer;
			var that = this;	
			
			obj.on("mousedown", function(e) {
				that.obj = e.target; 
				startX = e.stageX;
				startY = e.stageY;
				downCheck = true;	
				clearTimeout(timer);			
				timer = setTimeout(function() {
					if (downCheck) {
						// may as well use 45 degrees rather than figure for aspect ratio
						if (Math.abs(mouseX - startX) > Math.abs(mouseY - startY)) {
							if (mouseX - startX > distance) {that.direction="right"; that.dispatchEvent("swipe"); downCheck=false;}	
							if (startX - mouseX > distance) {that.direction="left"; that.dispatchEvent("swipe"); downCheck=false;}
						} else {
							if (mouseY - startY > distance) {that.direction="down"; that.dispatchEvent("swipe"); downCheck=false;}
							if (startY - mouseY > distance) {that.direction="up"; that.dispatchEvent("swipe"); downCheck=false;}
						}
					}				
				}, duration);
				obj.on("pressmove", function(e) {
					mouseX = e.stageX;
					mouseY = e.stageY;
				});
				obj.on("pressup", function(e) {
					if (downCheck) {
						that.direction="none"; that.dispatchEvent("swipe");
					}
					downCheck = false;
					clearTimeout(timer);	
				});				
			});			
		}
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time	
		makeSwipe.prototype = new createjs.EventDispatcher();
		makeSwipe.prototype.constructor = zim.Swipe;	
		return new makeSwipe();
	}
		
		
	
	// Pages Class
			
	// Pages extends the createjs Container - so you stage.addChild(myPages)				
	// handles going between pages
	// make a var myPages = new zim.Pages() object 
	// all your pages from then on are added to and manipulated inside the Pages object
	// Pages allows you to set the destination pages for swipe events
	// other events like buttons can call the go(page, direction) method
	// consider using zim.HotSpots() to efficiently handle multiple buttons
	
	// PARAMETERS
	// pass in the holder object (ie. stage) so we can set various transition animation parameters
	// pass in an array of page objects - for example:	
	// [{page:home, swipe:[null,"info",hide,find]},{page:hide, swipe:[null,null,null,home]}]
	// the pages should be containers - it helps to give them each a name property
	// the optional swipe array holds mappings to swipe events ["right", "left", "down", "up"]
	// in otherwords, these could be pages to the left, right, top and bottom of the current page
	// or they can call commands as strings
	// pass in the type of transition "reveal", "slide", "fade", "black", "white" or the default: "none"
	// and a speed in miliseconds
	// finally an optional transitionTable (read the property below for format)

	// METHODS
	// addPage() - lets you alternatively add pages after you create the object
	// removePage() - lets you remove a page (if on this page, call a go() first and remove on the page event)
	// setSwipe() - lets you set the swipe array for a page
	// go(newPage, direction, trans, ms) - lets you go to a page for events other than swipe events	
	// trans and ms are optional and will override any previously set transitions (speed in ms)
	// pause() - pauses a transition before it starts (call from swipe event)
	// unpause() - unpauses a paused transition (unless another go() command is called)
	// puff(time) - adds all the pages behind the currentPage (time (ms) auto calls settle)
	// settle() - removes all pages except the currentPage
	// disable() - stops swipe from activating and sets active = false
	// enable() - enables swipe action and sets active = true
	// dispose() - clears your listeners and pages
		
	// PROPERTIES
	// speed - of transitions in ms
	// transitionTable - [[fromPage, toPage, "transiton", ms(optional)], etc.] overrides default transition
	// page - the current page object (read)
	// lastPage - the last page before transition (read)
	// direction - direction of transition (read)
	// active - default true, boolean to have swipes active (good for layered Pages objects)

	// EVENTS
	// for the data above, swiping the home page down automatically goes to the hide page
	// if the home page is swiped up it automatically goes to the find page	
	// Pages dispatches a "swipe" event before changing pages if swiped
	// you can then get pages.page, pages.nextPage and pages.direction
	// you can pause() if needed the transition to handle data, etc. and then unpause() 
	// you do not need to handle going to another page when swiping - that is handled automatically
	// so you probably will not use the swipe event unless handling data between pages
	// Pages dispatches a "page" event when you pass in a page object in the swipe array
	// myPages.on("page",function(e){...})
	// with myPages.page being set to the new page (e.target.page)
	// and myPages.oldPage being set to the old page (e.target.page)
	// myPages.direction gets the direction of the transition (e.target.direction)
	// if there is a string in the swipe array like "info"
	// then the zim.Pages() object dispatches an event equivalant to the string
	// for the data example above, myPages.on("info",function(e){...});
	// would trigger when the home page is swiped to the left
	// Pages also dispatches a "pageTransitioned" event when a transition is complete
	// you will have the same properties available as with the page event
		
	// the first page object is the start page
	// you can add pages with the addPage() method 
	// it will not show until you swipe or go to it - unless it was the first page added
	// once again - do not add the pages to the stage yourself - let Pages do it for you
	// just add the pages object to the stage.  Pages is designed for full stage
	// if you want pages within a smaller area - consider using two canvas tags
	
	zim.Pages = function(holder, pages, transition, speed, transitionTable) {
		
		function makePages() {
		
			if (!holder.getBounds()) {zog("zimbuild.js Pages():\nobject must have bounds set"); return;}
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
			
			var swipe = new zim.Swipe(holder);

			// handle giving swipe event time to trigger event and provide code intervention
			var pauseInfo;
			var paused = false;	
				
			var swipeEvent = swipe.on("swipe", function(e) {
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
				}, 100);
			});			
			
			this.addPage = function(page, swipeArray) {				
				if (zot(swipeArray)) swipeArray = [];
				var data = {page:page, swipe:swipeArray};
				data.page.zimSwipeArray = (data.swipe) ? data.swipe : [];
				// this.addChildAt(data.page,0);			
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
						zim.animate(pages.unshift(), {alpha:0}, that.speed/2, null, transEnd, pages);
					}				
										
					newPage.x = 0;
					newPage.y = 0;
					newPage.alpha = 1;					
					
					if (trans == "slide") {						
						newPage.x = -(slides[dirIndex].x | 0);
						newPage.y = -(slides[dirIndex].y | 0);						
						newPage.cache(0,0,hW+1,hH+1);
						currentPage.cache(0,0,hW+1,hH+1);												
						that.addChild(newPage); 
						that.addChild(currentPage);						
						zim.animate(currentPage, slides[dirIndex], that.speed, null, transEnd, [currentPage, newPage]);
						zim.animate(newPage, slides2[dirIndex], that.speed);												
					} else if (trans == "reveal") {
						newPage.cache(0,0,hW+1,hH+1);
						currentPage.cache(0,0,hW+1,hH+1);
						that.addChild(newPage); // put destination under current page
						that.addChild(currentPage);
						zim.animate(currentPage, reveals[dirIndex], that.speed, null, transEnd, [currentPage, newPage]);
					} else if (trans == "fade") {
						newPage.cache(0,0,hW+1,hH+1);
						currentPage.cache(0,0,hW+1,hH+1);
						newPage.alpha = 1;
						that.addChild(newPage); 
						that.addChild(currentPage);
						zim.animate(currentPage, {alpha:0}, that.speed, null, transEnd, [currentPage, newPage]);																				
					} else if (trans == "black") {
						newPage.cache(0,0,hW+1,hH+1);
						currentPage.cache(0,0,hW+1,hH+1);
						newPage.alpha = 1;
						that.addChild(newPage); 
						that.addChild(currentPage);
						black.alpha = 0;
						that.addChild(black);						
						zim.animate(black, {alpha:1}, that.speed/2, null, transEndHalf, [black, currentPage, newPage]);																				
					} else if (trans == "white") {
						newPage.cache(0,0,hW+1,hH+1);
						currentPage.cache(0,0,hW+1,hH+1);
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
			
			this.puff = function(miliseconds) {
				// add all pages to the holder behind current page
				// if miliseconds then this is the time to settle automatically
				for (var i=0; i<pages.length; i++) {
					that.addChild(pages[i].page);	
				}	
				that.addChild(currentPage);
				if (miliseconds > 0) {
					setTimeout(function() {
						that.settle();
					}, miliseconds);
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
				swipe.off("swipe", swipeEvent);
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
	
	
	// HotSpots Class
	
	// extends a createjs.Container
	// puts an invisible click area (hotSpot) on pages
	// or specify an object and it will turn that into a hotspot
	// var hs = new zim.HotSpots();

	// PARAMETERS
	// you pass in an array of hotspot data objects:
	// [{page:home, rect:[190,50,260,260], call:someFunction}, 
	//  {page:home, rect:[70,405,500,150], call:someOtherFunction}]
	// the page should be a createjs Container
	// the rect is the [left, right, width, height] of a rectangle relative to the stage
	// call is the callback function to call when a hotSpot is clicked
	// instead of a rect array you can pass an object that must have setBounds() set
	// [{page:home, rect:submitButton, call:function(){//code}}]
	// the hotSpot will then use the button position and bounds as the rectangle
	// this allows you to manage all your button presses from one place
	// note - in this case, HotSpots will actually add a click event to the button
	// the second parameter local defaults to true
	// and should be used when the element scale independently from the stage
	// in local mode you must add coordinates of the hotSpot inside its container
	// if set to false then you pass in global coordinates and hotSpot will convert them
	// the third parameter is whether you want mouseDowns on the hotSpots
	// this defaults to false to prevent users from activating a swipe on a button (when using ZIM Swipe)
			
	// METHODS
	// show() - shows the hotspots for testing during authoring time
	// hide() - hides the hotspots
	// addHotSpot(page,rect,call) - can dynamically add hotSpots
	// removeHotSpots(page,id) - id is optional - so can remove all spots on a page
	// dispose() - removes listeners
	
	// note, the class does actually add rectangle shapes to your page
	// these have an alpha of .01
	// this could have been done with "math" alone but rollover cursor would be a pain
	// the class creates zim.HotSpot objects - see the class underneath this one
	
	zim.HotSpots = function(spots, local, mouseDowns) {
		function makeHotSpots() {
			
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
						zog("ZIM Build() :: HotSpot "+ data.page + " " + data.rect +" button does not exist");
						return;	
					}
					if (!button.getBounds()) {
						zog("ZIM Build() :: HotSpots button needs bounds");
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
	
	// HotSpot Class
	
	// adds an invisible button to a container object (often think of this as the page)
	// var hs = new zim.HotSpot();
	// if you want multiple spots it is more efficient to use the HotSpots class above
	// which manages multiple HotSpot objects (otherwise you end up with multiple event functions)
	// the spot actually keeps an alpha of .01
	// the spot will get a cursor of "pointer"
	
	// PARAMETERS
	// the container object in which to place the hotspot
	// the x, y, width and height of the hotspot relative to the stage
	// call is the function to call when the spot is clicked
	// local defaults to true and should be used when the element scale independently from the stage
	// in local mode you must add coordinates of the hotSpot inside its container
	// if set to false then you pass in global coordinates and hotSpot will convert them
		
	// METHODS	
	// show() - helps when creating the spot to see where it is
	// hide() - hides the hotspot
	// dispose() - removes the listener and the spot
	
	// PROPERTIES
	// spot - the actual hotSpot object that gets added to the container can be accessed with the spot property
	// eg. hs.spot
	
	
	zim.HotSpot = function(obj,x,y,w,h,call,local) {		
		function makeHotSpot() {			
			if (zot(obj)) {zog("zimbuild.js HotSpot():\nPlease pass in object"); return;}
			if (obj instanceof createjs.Container == false) zog("zimbuild.js HotSpot():\nObjects passed in should be Containers");
			if (zot(local)) local = true;			
			var that = this; 
			
			var but = new createjs.Shape();			
			this.spot = but;			
			if (!local) {			
				var point = obj.globalToLocal(x,y);
				var point2 = obj.globalToLocal(x+w,y+h);
				var newW = point2.x-point.x;
				var newH = point2.y-point.y;
				but.graphics.f("#999999").dr(point.x,point.y,newW,newH);
			} else {
				but.graphics.f("#999999").dr(x,y,w,h);
			}
			but.alpha = .01;
			but.cursor = "pointer";			
			var butEvent = but.on("click",function() {				
				if (typeof(call) == "function") {
					call();
				}
			});
			obj.addChild(but);
			this.show = function() {
				but.alpha = .5;	
			}
			this.hide = function() {
				but.alpha = .01;	
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
		
	
	// Grid Class
	
	// extends createjs.Container
	// var grid = new zim.Grid(parameters);
	// stage.addChild(grid);
	// shows a grid to help layout assets with code (percent is default)
	// cursor x and y percentage or pixels are shown along edges 
	// can use G key to toggle grid visibility
	// can use P key to toggle percent and pixels
	
	// make sure you remove the grid for your final version (dispose)
	
	// PARAMETERS
	// object - to add grid to (stage is default)
	// color - defaults to black
	// percent - defaults to true to show percent - false to show pixels
	
	// PROPERTIES
	// pixels - boolean - set to true to change to pixels, false to go to percent
	
	// METHODS
	// dispose() - clears keyboard events and grid
	
	
	zim.Grid = function(object, color, percent) {		
		function makeGrid() {					
				
			if (zot(object)) object = "stage";
			if (zot(color)) color = "black";
			if (object != "stage" && !object.getBounds()) {zog ("zimbuild.js Grid(): Please provide bounds for the object (setBounds())"); return;}
			if (zot(percent)) percent = true;
			
			var that = this;
			var stage; 			
			var pixels = 10; // for grid			
			var stageEvent;			
			this.mouseChildren = false;
			this.mouseEnabled = false;			
			
			// make text boxes that show x and y			
			var boxW = 80;
			var boxH = 26;
			
			var top = new createjs.Container();						
			var topBox = new createjs.Shape();
			topBox.graphics.s(color).ss(1).f("#dddddd").r(0,0,boxW,boxH);
			topBox.regX = boxW/2; topBox.regY = -boxH/4;
			topBox.alpha = .9;
			top.addChild(topBox);			
			var topText = new createjs.Text("10", "16px verdana", "#333333");
			topText.textAlign = "center";
			topText.textBaseline = "middle";	
			topText.y = boxH*3/4;		
			top.addChild(topText);			
			
			var left = new createjs.Container();					
			var leftBox = new createjs.Shape();
			leftBox.graphics.s(color).ss(1).f("#dddddd").r(0,0,boxW,boxH);
			leftBox.regX = -boxW/6; leftBox.regY = boxH/2; 
			leftBox.alpha = .9;
			left.addChild(leftBox);			
			var leftText = new createjs.Text("10", "16px verdana", "#333333");
			leftText.textAlign = "center";
			leftText.textBaseline = "middle";	
			leftText.x = boxW/2 + boxW/6;		
			left.addChild(leftText);	
			
			var minX = boxW/6+boxW/2;
			var minY = boxH*2
			var maxX; // set max values once we get a stage
			var maxY;
						
			top.x = minX;
			left.y = minY;
			topText.text = "x:0";
			leftText.text = "y:0";							

			// get stage and apply stagemousemove to move text boxes 			
			// the added event was added in the 2014 createjs
			// found the added did not reliably get a stage property
			// still had to wait a few microseconds
			// so resorting to interval
			// this.on("added", added); 
			var addedInterval = setInterval(function() {				
				if (object == "stage") {
					if (that && that.getStage()) {
						added();
					}
				} else {
					if (object && object.getStage()) {
						added();
					}
				}
			},100);		
						
			var gridCheck = false;
			function added() {
				clearInterval(addedInterval);
				if (object == "stage") {									
					stage =	that.getStage();
					object = stage;	
				} else {
					stage =	object.getStage();
				}			
				if (!gridCheck) {
					drawGrid();
					object.addChild(that);
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
					point = object.globalToLocal(e.rawX, e.rawY);					
					lastPoint = point;
				} else {
					point = {x:lastPoint.x, y:lastPoint.y}	
				}
				if (!percent) {	// pixels					
					topText.text = "x:" + Math.max(0, Math.min(Math.round(point.x), Math.round(objectW)));
					top.x = Math.max(minX, Math.min(point.x, maxX));
					leftText.text = "y:" + Math.max(0, Math.min(Math.round(point.y), Math.round(objectH)));
					left.y = Math.max(minY, Math.min(point.y, maxY));
				} else {
					topText.text = "x:" + Math.max(0, Math.min(Math.round(point.x/objectW*100), 100)) + "%";
					top.x = Math.max(minX, Math.min(point.x, maxX));
					leftText.text = "y:" + Math.max(0, Math.min(Math.round(point.y/objectH*100), 100)) + "%";
					left.y = Math.max(minY, Math.min(point.y, maxY));					
				}
				if (stage) stage.update();					
			}			
				
			// make the grid once we have the stage			
			var objectW;
			var objectH;	
			var cached;		
			function drawGrid() {
				gridCheck = true;				
				
				objectW = object.getBounds().width;
				objectH = object.getBounds().height;				
				stage.mouseMoveOutside = true;				
				stage.enableMouseOver(10);				
					
				maxX = objectW-boxW*2/3;
				maxY = objectH-boxH;					
				
				cached = new createjs.Container();
				that.addChild(cached);
				var grid = new createjs.Shape();
				cached.addChild(grid);				
				var g = grid.graphics;				
				g.s(color).ss(1);
				
				var grid2 = new createjs.Shape();
				cached.addChild(grid2);				
				
				if (!percent) { // pixels	
				
					for (var i=0; i<objectW/pixels; i++) {					
						g.mt(i*pixels, 0).lt(i*pixels, objectH);					
					}
					for (var i=0; i<objectH/pixels; i++) {
						g.mt(0, i*pixels).lt(objectW, i*pixels);
					}
					grid.alpha = .3;	
				
					g = grid2.graphics;  					
					g.s(color).ss(1);
					
					for (var i=0; i<objectW/(pixels*10); i++) {					
						g.mt(i*(pixels*10), 0).lt(i*(pixels*10), objectH);					
					}
					for (var i=0; i<objectH/(pixels*10); i++) {
						g.mt(0, i*(pixels*10)).lt(objectW, i*(pixels*10));				
					}
				
				} else { // percent - every 5 percent
					
					for (var i=1; i<20+2; i++) {					
						g.mt(i*objectW/20, 0).lt(i*objectW/20, objectH);					
					}
					for (var i=1; i<20; i++) {
						g.mt(0, i*objectH/20).lt(objectW, i*objectH/20);
					}
					grid.alpha = .3;	
					
					g = grid2.graphics;  
					g.s(color).ss(1);
					
					for (var i=1; i<10; i++) {					
						g.mt(i*objectW/10, 0).lt(i*objectW/10, objectH);					
					}
					for (var i=1; i<10; i++) {
						g.mt(0, i*objectH/10).lt(objectW, i*objectH/10);				
					}					
				}
				
				var crossSize = 80;
				g.s("#FFFFFF").ss(8);
				g.mt(objectW/2, objectH/2-crossSize/2).lt(objectW/2, objectH/2+crossSize/2);
				g.mt(objectW/2-crossSize/2, objectH/2).lt(objectW/2+crossSize/2, objectH/2);
				
				g.s("#000000").ss(4);
				g.mt(objectW/2, objectH/2-crossSize/2).lt(objectW/2, objectH/2+crossSize/2);
				g.mt(objectW/2-crossSize/2, objectH/2).lt(objectW/2+crossSize/2, objectH/2);
				
				// draw a border
				g.s(color).ss(3);
				g.dr(0,0,objectW,objectH);				
				
				grid2.alpha = .5;				
				cached.cache(0,0,objectW,objectH);
				
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
				if (e.keyCode == 71) { // G
					that.visible = !that.visible;
					stage.off("stagemousemove", stageEvent);
					if (that.visible) {
						stageEvent = stage.on("stagemousemove", where, that);
					}
					stage.update();
				}				
				if (e.keyCode == 80) { // P
					that.removeChild(cached);
					cached = null;
					that.pixels = !that.pixels;
				}
			}		
			
			this.resize = function() {
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
			}
			
			this.dispose = function() {
				clearInterval(addedInterval);
				that.removeAllChildren();
				if (that.parent) that.parent.removeChild(that);
				that = null;
				window.removeEventListener("keydown", keyEvent);	
			}
			
		}		
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time	
		makeGrid.prototype = new createjs.Container();
		makeGrid.prototype.constructor = zim.Grid;	
		return new makeGrid();			
	}
	
	// GridManager class
	// add Zim Grid objects and update or remove all grids at once
	// grids are handy to use but perhaps annoying to update and remove if you have many
	// GridManager keeps track of the grids and lets you update or dispose of them on command
	
	// METHODS 
	// add(grid) - registers a grid with the GridManager
	// resize() - resizes all the grids in the GridManager (ie. if stage changes)
	// dispose() - disposes all grids and the GridManager
	
	// note: to just hide grids, you use the G key
	// and to toggle percent and pixels use the P key
	// you can dispose grids individually or use this class to dispose all
	// disposing will remove the G key listener and the grid
	
	zim.GridManager = function() {		
		if (zon) zog("zimbuild.js: GridManager");
		var that = this;
		this.grids = [];
		this.add = function(g) {
			that.grids.push(g);
		}
		this.resize = function() {
			if (!that) return;
			for (var i=0; i<that.grids.length; i++) {
				that.grids[i].resize();	
			}	
		}
		this.dispose = function() {
			for (var i=0; i<that.grids.length; i++) {
				that.grids[i].dispose();	
			}	
			if (zon) zog("zimbuild.js: GridManager - grids disposed");		
			that = null;
		}		
	}	
	
	// Layout class
	
	// extends a createjs.EventDispatcher so it can dispatch events
	// arranges objects on the page by fitting them in regions
	// make a layout object for each page if desired
	// and even nest layout objects inside regions
	// regions are fixed aspect ratio
	// good for flexive design where you anchor titles and navigation
	// handles up to three regions vertically or horizontally	
	// var layout = zim.Layout(parameters) 	
		
	// PARAMETERS
	// the holder object (stage, container, etc) that must have bounds set
	// the bounds will constrain the layout
	// region1, region2 and region3 objects with specific properties for each
	// example - with all dimensions as percents
	
	// Example VERTICAL region objects
	// {object:title, marginTop:10, maxWidth:80, minHeight:20, align:"left", valign:"top"}
	// {object:content, marginTop:5, maxWidth:90} // note, middle gets no minHeight
	// {object:nav, marginTop:5, maxWidth:80, minHeight:20, backgroundColor:"red"}
	// note: no minHeight for the middle region
	// align defaults to middle for the three regions
	// valign defaults to top, middle, bottom for the three regions
	// backgroundColor applies a backing color to the region
	
	// Example HORIZONTAL region objects
	// {object:col1, marginLeft:10, maxHeight:80, minWidth:20, valign:"bottom"}
	// {object:col2, marginLeft:5, maxHeight:90, align:"middle"} // note, middle gets no minWidth
	// {object:col3, marginLeft:5, maxHeight:80, minWidth:20, align:"left", valign:"top"}	
	// align defaults to left, middle, right for the three regions
	// valign defaults to top for the three regions	
	
	// PARAMETERS CONT'D
	// lastMargin - the margin at the bottom (vertical) or at the right (horizontal) defaults to 0
	// backgroundColor - for the whole holder - defaults to -1
	// vertical - boolean defaults to true for vertical layout (set to false for horizontal)
	// regionShape - a createjs Shape object to show where bounds are (optional) (added to holder)
	// can toggle on and off with B key - but must pass in the Shape to use the B key
	// scalingTarget - an object used as the bounds of the region scaling
	// setting a scalingTarget will also set the bounds of the holder to the scalingTarget bounds
	// it does not scale the holder - only scale the region objects inside
	
	// METHODS
	// resize() - resize based on new bounds of the holder (or scalingObject)
	// dispose() - removes the B key listener (otherwise, nothing to dispose)
	// addShape(shape) - adds a bounding shape dynamically
	// removeShape() - permanently removes the bounding shape
	// disable() - disables all the layout (shape and sizing)
	// enable() - enables all the layout (shape and sizing)	
	// if you want to get rid of the objects then you need to do so in your app
		
	// DESCRIPTION OF FLEXIVE DESIGN
	// here described with vertical layout - horizontal is similar but rotated 90
	// the content in the middle will try and expand against the top and bottom
	// until it forces the top and bottom to their minimum percents
	// if the content hits its maximum width percent first then the top and bottom
	// will fill up the rest of the height until they reach their maximum widths
	// the margins will be kept as minimum percentages
	
	// FLEXIVE STATES
	
	// 1. STATIC 
	// when wide, the top and bottom are a minimum height and content at maximum height
	
	// 2. SQUEEZE
	// when narrowing, content hits edges and gets shorter leaving room for top and bottom to grow
		
	// 3. SPREAD
	// when narrowing and top and bottom hit maximum width, the three content areas spread out	
	
	zim.Layout = function(holder, region1, region2, region3, lastMargin, backgroundColor, vertical, regionShape, scalingObject) {
		function makeLayout() {
			// if (zon) zog ("zimbuild.js Layout()");						
			if (zot(holder)) {zog ("zimbuild.js Layout(): please provide an object with bounds set that holds the objects being laid out"); return;}			
			scalingObject = (zot(scalingObject)) ? holder : scalingObject;
			if (!scalingObject.getBounds()) {zog ("zimbuild.js Layout(): holder must have bounds set or provide a scalingObject with bounds"); return;}			
			
			var bounds = scalingObject.getBounds();
			holder.setBounds(0,0,bounds.width,bounds.height);
			
			if (zot(lastMargin)) lastMargin = 0;
			if (zot(vertical)) vertical = true;
			if (zot(backgroundColor)) backgroundColor = -1;
			that = this;
			this.active = true;
			var logStates = false;			
			var backing = new createjs.Shape();
									
			// normalize vertical or horizontal data
			
			var obj1; var obj2; var obj3; var stage;
			var margin1=0; var margin2=0; var margin3=0; 
			var margin4=(zot(lastMargin)) ? 0 : lastMargin;
			var max1=0; var max2=0; var max3=0;	var min1=0; var min3=0;	
			var align1; var align2; var align3;	var valign1; var valign2; var valign3;
			var bg1; var bg2; var bg3;		
			var fit1={x:0,y:0,width:0,height:0,scale:0};
			var fit2={x:0,y:0,width:0,height:0,scale:0};
			var fit3={x:0,y:0,width:0,height:0,scale:0};
			var primary; var secondary; // holds bound height for vertical and width for horizontal
			
			if (vertical) { // defaults
				align1=align2=align3="middle"; 
				valign1="top"; valign2="middle"; valign3="bottom";
			} else {
				align1="left"; align2="middle"; align3="right";
				valign1=valign2=valign3="top";
			}			
			for (var i=1; i<=3; i++) assignVariables(i, vertical);
			
			var margins = margin1 + margin2 + margin3 + margin4;
			var min1Start = min1; var min3Start = min3;	
			var min1Last = min1; var min3Last = min3; 
			var state=0; var lastState=0;
			
			calculate();
						
			function calculate() {
				
				if (regionShape) regionShape.graphics.clear();
				backing.graphics.clear();
				if (backgroundColor!=-1) backing.graphics.f(backgroundColor).r(0,0,bounds.width,bounds.height);
									
				primary = (vertical) ? bounds.height : bounds.width;
				secondary = (vertical) ? bounds.width-bounds.x*2 : bounds.height-bounds.y*2;
				
				var primaryFit1=0; var primaryFit2=0; var primaryFit3=0; 
				var secondaryFit1=0; var secondaryFit2=0; var secondaryFit3=0;
				var scale1=0; var scale2=0; var scale3=0;							
							
				// check obj1 meets min1 (primary) when set to max1 (secondary)
				// check obj3 meets min3 (primary) when set to max3 (secondary)
				
				primaryPos = 0; // do not care about x and y right now
				secondaryPos = 0;
				
				if (obj1) {					
					primaryLen = min1Start*primary/100;	// mins, maxes and margins are percent so convert to pixels
					secondaryLen = max1*secondary/100;	
					setFit(1,primaryPos,secondaryPos,primaryLen,secondaryLen);	
					if (primaryFit1 < min1Start*primary/100) {						
						min1 = primaryFit1*100/primary;
						if (Math.floor(min1) != Math.floor(min1Last) && Math.floor(min1) != Math.floor(min1Start)) {
							if (zon) zog("zimbuild.js Layout(): region 1 min "+min1Start+"% cannot be met and will be set to "+Math.floor(min1)+"%");	
							min1Last = min1;
						}
					}			
				}
				
				if (obj3) {
					primaryLen = min3Start*primary/100;								
					secondaryLen = max3*secondary/100;	
					setFit(3,primaryPos,secondaryPos,primaryLen,secondaryLen);	
					if (primaryFit3 < min1Start*primary/100) {						
						min3 = primaryFit3*100/primary;
						if (Math.floor(min3) != Math.floor(min3Last) && Math.floor(min3) != Math.floor(min3Start)) {
							if (zon) zog("zimbuild.js Layout(): region 3 min "+min3Start+"% cannot be met and will be set to "+Math.floor(min3)+"%");	
							min3Last = min3;
						}
					}				
				}
				
				// get original primary lengths for later (height or width of object bounds)
				var p1 = 0; var p3 = 0;
				if (vertical) {
					if (obj1) p1 = obj1.getBounds().height;
					if (obj3) p3 = obj3.getBounds().height;
				} else {
					if (obj1) p1 = obj1.getBounds().width;
					if (obj3) p3 = obj3.getBounds().width;
				}
				
				// determine the Flexive State based first on the middle region which floats between the outer regions
				// unfortunately, these stages seem to have different requirements in terms of maximizing regions
				// this makes the procedural code below fairly complex
				// it probably would have been better to code the regions as independent object
				// and let them work themselves out leading to any number of regions being added, etc.
				// I did not quite expect the complexities so it was a fun two day puzzle			
				
				var leftover = (100-margins)*primary/100;
				var x; var y; var w; var h; 
				var primaryPos; var primaryLen; var secondaryPosition; var secondaryLen;
				var newScale = 0; var f;			
				
				if (obj2) {
					
					// setFitPrimary(num, pos, length) is used a lot below
					// you pass in which region (1, 2 or 3)
					// and then a primary min position - this is y in vertical or x in horizontal
					// and then a primary length - this is height in vertical or width in horizontal
					// and then it automatically maximizes the secondary position and length
					// these for a possible bounding rectangle in which to fit the object					
					// the function takes these dimensions and uses setFit() to fit the object
					// (sometimes setFit() is used directly if we only want dimensions and no final positioning 
					// the setFit function uses zim.fit() which actually scales and positions the object
					// it setFit also populates the following variables:
					
					// the resulting fit length in the primary (height for vertical, width for horizontal)
					// primaryFit1, primaryFit2, primaryFit3
					// the resulting fit length in the secondary (width for vertical, height for horizontal)
					// primaryFit1, primaryFit2, primaryFit3
					
					// the setFitPrimary (and the other functions) also return an object as follows:
					// {x:posX, y:posY, w:width, h:height, s:scale} of the fit object
					// these are, on occassion, used for fitting the next object 
					
					// the setFitPrimary() also automatically handles aligning the object within the bounds					
					
					setFitPrimary(2, (margin1+min1+margin2)*primary/100, (100-(margins+min1+min3))*primary/100);
														
					if (Math.round(secondaryFit2) == Math.round(secondaryLen)) {
						
						// we are on stage 2 if the middle has maxed-out in the secondary
						// we are on stage 3 if all the objects have maxed-out in the secondary						
						// how much room is leftover for obj1 and obj2 in the primary
						
						leftover = (100-margins-primaryFit2*100/primary)*primary/100;
					
						// can obj1 and obj2 go to max in secondary
						// and fit in the leftover in the primary?	
						// do not need to check for x and y - just want the lengths
						
						primaryPos = 0; secondaryPos = 0; primaryLen = 10000; // unlimited
						if (obj1) setFit(1,primaryPos,secondaryPos,primaryLen,max1*secondary/100);	
						if (obj3) setFit(3,primaryPos,secondaryPos,primaryLen,max3*secondary/100);
												
						if (primaryFit1 + primaryFit3 > leftover) {
							state2();
						} else {
							state3();	
						}						
					} else { // the middle has not maxed-out in the secondary
						state1();
					}					
				} else {
					state3(); // check on this... 
				}
				
			
				// STATE 1 - STATIONARY
				// the middle object (obj2) has not maxed-out in the secondary direction
				// outer objects (obj1 and obj3) are set to min1 and min3 in the primary direction
				function state1() {
					
					// if logging is turned on we log the Flexive state we are on
					if (logStates) {state=1; if (state!=lastState) {zog("Flexive State "+state); lastState=state;}};	
										
					if (obj1) setFitPrimary(1, margin1*primary/100, min1*primary/100);					
					if (obj3) setFitPrimary(3, primary-min3*primary/100-margin4*primary/100, min3*primary/100);										
				}
				
				
				// STATE 2 - SQUEEZE
				// middle is being squeezed in the secondary so its primary length shortens proportionally
				// giving the outer objects room to grow in the primary until they too reach max in the secondary			
				function state2() {
					
					if (logStates) {state=2; if (state!=lastState) {zog("Flexive State "+state); lastState=state;}};
										
					// the expanding outer objects may change the positioning of the middle object					
					if (regionShape) regionShape.graphics.clear();
					backing.graphics.clear();			
					if (backgroundColor!=-1) backing.graphics.f(backgroundColor).r(0,0,bounds.width,bounds.height);
															
					// if scale of obj1 at max is greater than scale of obj3 at max					
					primaryPos = 0; secondaryPos = 0;
					secondaryLen = 10000; // unlimited
												
					if (scale1 >= scale3) { // obj1 hits first
						if (obj3) { // leftover is in pixels							
							var leftover1 = leftover - primaryFit3;
							if (leftover1 >= p1*scale3) { // rescale obj1 to leftover1	
								if (obj2) setFit(1,primaryPos,secondaryPos,leftover1,secondaryLen);	
							} else { // equal scale equation								
								newScale = leftover/(p1+p3);								
							}								
						} else { // rescale obj1 to leftover1
							if (obj2) setFit(1,primaryPos,secondaryPos,leftover,secondaryLen);								
						}
					} else { // obj3 hits first
						if (obj1) {								
							var leftover3 = leftover - primaryFit1;
							if (leftover3 >= p3*scale1) { // rescale obj3 to leftover3								
								if (obj2) setFit(3,primaryPos,secondaryPos,leftover3,secondaryLen);	
							} else { // equal scale equation									
								newScale = leftover/(p1+p3);								
							}								
						} else { // rescale obj3 to leftover3								
							if (obj2) setFit(3,primaryPos,secondaryPos,leftover,secondaryLen);
						}						
					}	
									
					if (newScale != 0) {
						// scale obj1 and obj3 to new scale (scale them proportionally)
						if (obj1) setFit(1,primaryPos,secondaryPos,p1*newScale,secondaryLen);
						if (obj3) setFit(3,primaryPos,secondaryPos,p3*newScale,secondaryLen);
					}
					
					if (obj1) setFitPrimary(1, margin1*primary/100, primaryFit1);															
					if (obj3) setFitPrimary(3, (margin1+margin2+margin3)*primary/100 + primaryFit1 + primaryFit2, primaryFit3);					
					if (obj2) setFitPrimary(2, (margin1+margin2)*primary/100+primaryFit1, (100-margins)*primary/100-primaryFit1-primaryFit3);									
				}
				
				
				// STATE 3 - SPREAD
				// all objects are maxed-out in the secondary direction
				// the outer objects anchor to the outsides and the middle object centers
				function state3() {
					
					if (logStates) {state=3; if (state!=lastState) {zog("Flexive State "+state); lastState=state;}};
					
					if (regionShape) regionShape.graphics.clear();
					backing.graphics.clear();
					if (backgroundColor!=-1) backing.graphics.f(backgroundColor).r(0,0,bounds.width,bounds.height);
										
					if (obj1 && !obj2 && ! obj3) {							
						setFitPrimary(1, margin1*primary/100, primary-(margin1+margin4)*primary/100);																					
					}
					if (obj2 && !obj1 && ! obj3) {
						setFitPrimary(2, margin2*primary/100, primary-(margin2+margin4)*primary/100);						
					}	
					if (obj3 && !obj1 && ! obj2) {						
						setFitPrimary(3, margin3*primary/100, primary-(margin3+margin4)*primary/100);						
					}
					if (obj1 && obj3 && !obj2) {						
						// match scales						
						newScale = (100-margin1-margin4-margin3)*primary/100/(p1+p3);												
						f = setFitPrimary(1, margin1*primary/100, p1*newScale);	
						setFitPrimary(3, (margin1+margin3)*primary/100 + ((vertical) ? f.h : f.w), p3*newScale);					
					}	
					if (obj1 && obj2 && !obj3) {						
						// match scales						
						newScale = (100-margin1-margin4-margin2)*primary/100/(primaryFit1+primaryFit2);												
						f = setFitPrimary(1, margin1*primary/100, primaryFit1*newScale);	
						setFitPrimary(2, (margin1+margin2)*primary/100 + ((vertical) ? f.h : f.w), primaryFit2*newScale);					
					}	
					if (obj2 && obj3 && !obj1) {						
						// match scales						
						newScale = (100-margin3-margin4-margin2)*primary/100/(primaryFit3+primaryFit2);												
						f = setFitPrimary(2, margin2*primary/100, primaryFit2*newScale);	
						setFitPrimary(3, (margin2+margin3)*primary/100 + ((vertical) ? f.h : f.w), primaryFit3*newScale);					
					}	
					if (obj1 && obj2 && obj3) {																	
						// only gets here if all three are maxed in secondary
						// so proportion what is left after margins to the maxed-out heights of objects
						// dimensions (primaryFit, secondaryFit) come in correctly but not positions
						// find new heights						
						leftover = (100-margins)*primary/100;							
						f = setFitPrimary(1, margin1*primary/100, primaryFit1*leftover/(primaryFit1+primaryFit2+primaryFit3));	
						f = setFitPrimary(2, (margin1+margin2)*primary/100+ ((vertical) ? f.h : f.w), primaryFit2*leftover/(primaryFit1+primaryFit2+primaryFit3));																				
						primaryLen = primaryFit3*leftover/(primaryFit1+primaryFit2+primaryFit3);
						primaryPos = primary-margin4*primary/100-primaryLen; // note, uses primaryLen in primaryPos	
						f = setFitPrimary(3, primaryPos, primaryLen);						
					}											
				}	
				
				function setFit(num,primaryPos,secondaryPos,primaryLen,secondaryLen) {										
					x = (vertical) ? secondaryPos : primaryPos;
					y = (vertical) ? primaryPos : secondaryPos;
					w = (vertical) ? secondaryLen : primaryLen;
					h = (vertical) ? primaryLen : secondaryLen;									
					eval('fit'+num+' = zim.fit(obj'+num+',x,y,w,h);');
					eval('primaryFit'+num+' = (vertical) ? fit'+num+'.height : fit'+num+'.width;');
					eval('secondaryFit'+num+' = (vertical) ? fit'+num+'.width : fit'+num+'.height;');
					eval('scale'+num+' = fit'+num+'.scale;');					
					return {x:x, y:y, w:w, h:h};				
				}
				
				function setFitPrimary(num, primaryPos, primaryLen) {				
					var colors = [null,"red","blue","green"];
					eval('secondaryPos = (100-max'+num+')/2*secondary/100;');
					eval('secondaryLen = max'+num+'*secondary/100;');
					eval('f = setFit('+num+',primaryPos,secondaryPos,primaryLen,secondaryLen);');	
					var addedW=0; var addedH=0; // transitions need a little extra overlap on page edges
					if (primaryPos == 0 || (primaryPos+primaryLen) == primary) if (vertical) {addedH=1} else {addedW=1};						
					if (secondaryLen == secondary) if (vertical) {addedW=1} else {addedH=1};												
					eval('if (bg'+num+' != "") backing.graphics.f(bg'+num+').r(f.x, f.y, f.w+addedW, f.h+addedH);');
					eval('if (regionShape) regionShape.graphics.s("'+colors[num]+'").ss(2).dr(f.x, f.y, f.w, f.h);');
					eval('if (valign'+num+'=="top") obj'+num+'.y = f.y;');
					eval('if (valign'+num+'=="bottom") obj'+num+'.y = f.y+f.h-((vertical)?primaryFit'+num+':secondaryFit'+num+');');
					eval('if (align'+num+'=="left") obj'+num+'.x = f.x - bounds.x;');
					eval('if (align'+num+'=="right") obj'+num+'.x = f.x-bounds.x+f.w-((vertical)?secondaryFit'+num+':primaryFit'+num+');');										 
					return f;
				}				
									
				if (!stage) {
					for (var i=1; i<=3; i++) eval ('if (obj'+i+' && obj'+i+'.getStage()) stage = obj'+i+'.getStage();');
				} 
				if (stage) stage.update();
			}
						
			function assignVariables(i,vertical) {
				if (vertical) {
					if (eval('region'+i)) {
						eval('obj'+i+'=region'+i+'.object;');
						eval('margin'+i+'=(region'+i+'.marginTop)?region'+i+'.marginTop:0;');
						eval('max'+i+'=(region'+i+'.maxWidth)?region'+i+'.maxWidth:100;');
						if (i!=2) eval('min'+i+'=(region'+i+'.minHeight)?region'+i+'.minHeight:0;');
						eval('if (region'+i+'.align) align'+i+'=region'+i+'.align;');
						eval('if (region'+i+'.valign) valign'+i+'=region'+i+'.valign;');
						eval('bg'+i+'=(region'+i+'.backgroundColor)?region'+i+'.backgroundColor:"";');						
					}
				} else {
					if (eval('region'+i)) {						
						eval('obj'+i+'=region'+i+'.object;');					
						eval('margin'+i+'=(region'+i+'.marginLeft)?region'+i+'.marginLeft:0;');
						eval('max'+i+'=(region'+i+'.maxHeight)?region'+i+'.maxHeight:100;');
						if (i!=2) eval('min'+i+'=(region'+i+'.minWidth)?region'+i+'.minWidth:0;');
						eval('if (region'+i+'.align) align'+i+'=region'+i+'.align;');
						eval('if (region'+i+'.valign) valign'+i+'=region'+i+'.valign;');
						eval('bg'+i+'=(region'+i+'.backgroundColor)?region'+i+'.backgroundColor:"";');
					}
				}					
				eval ('if (obj'+i+' && obj'+i+'.getStage()) stage = obj'+i+'.getStage();');
				eval ('if (obj'+i+' && obj'+i+'.getStage()) stage = obj'+i+'.getStage();');
				
			}	
			
			if (regionShape) holder.addChild(regionShape);						
			holder.addChildAt(backing,0);			
			
			this.resize = function() {
				if (!that.active) return;
				bounds = scalingObject.getBounds();
				holder.setBounds(0,0,bounds.width,bounds.height);
				calculate();	
			}
			
			// add key listener to hide and show the bounds				
			window.addEventListener("keydown", keyEvent);			
			function keyEvent(e) {				
				if (!e) e=event; 								
				if (regionShape) {
					if (e.keyCode == 66) { // B
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
				that.resize = function() {
					bounds = scalingObject.getBounds();
					calculate();	
				}		
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
				regionTarget = target;
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
	
	// LayoutManager class
	// add Zim Layout objects and update them all at once
	// also can remove all layout region bound shapes at once
	// as well as remove the B key to show the region bound shapes
	// for a final project, call the removeShapes()
	// this will remove all shapes and key events
	// the layouts will remain in place to handle multiple screen sizes
	
	// METHODS 
	// add(layout) - registers a layout with the LayoutManager
	// resize() - resizes all the layouts in the LayoutManager
	// disable() - disables all the layouts in the LayoutManager (shapes and sizing)
	// enable() - enables all the layouts in the LayoutManager (shapes and sizing)
	// dispose() - only removes bounds shapes and keyboard events (does not really dispose)
	
	// note: to just hide bounds, you use the B key
	
	zim.LayoutManager = function() {		
		if (zon) zog("zimbuild.js: LayoutManager");
		var that = this;
		this.layouts = [];
		this.add = function(layout) {
			that.layouts.push(layout);
		}
		this.resize = function() {			
			for (var i=0; i<that.layouts.length; i++) {
				that.layouts[i].resize();	
			}	
		}
		this.disable = function() {			
			for (var i=0; i<that.layouts.length; i++) {							
				that.layouts[i].disable();	
			}
		}
		this.enable = function() {
			for (var i=0; i<that.layouts.length; i++) {
				that.layouts[i].enable();	
			}
		}
		
		this.dispose = function() {
			for (var i=0; i<that.layouts.length; i++) {
				that.layouts[i].removeShape(); // also removes key events
			}
		}		
	}		
	

	return zim;
} (zim || {});