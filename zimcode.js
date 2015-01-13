
// ZIM js Interactive Media modules by Dan Zen http://danzen.com (c) 2014
// http://zimjs.com  
// zimcode.js adds some general code functionality along with Browser and DOM code 
// some of these are common Web solutions over the years (sorry for lack of credit)
// moved Damp, Proportion and ProportionDamp here as they can be used without CreateJS
// free to use - donations welcome of course! http://zimjs.com/donate

if (typeof zog === "undefined") { // bootstrap zimwrap.js
	document.write('<script src="http://d309knd7es5f10.cloudfront.net/zimwrap_1.2.js"><\/script>');
	document.write('<script src="http://d309knd7es5f10.cloudfront.net/zimcode_1.2.js"><\/script>');
} else {

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
} 