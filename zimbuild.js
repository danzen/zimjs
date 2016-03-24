
// ZIM js Interactive Media modules by Dan Zen http://danzen.com (c) 2016
// zimbuild.js adds common building functions for digidos (interactive media) http://zimjs.com
// free to use - donations welcome of course! http://zimjs.com/donate
// classes in this module require createjs namespace to exist and in particular easel.js
// available at http://createjs.com
// (borrows zim.ProportionDamp from ZIM code)

if (typeof zog === "undefined") { // bootstrap zimwrap.js
	document.write('<script src="http://d309knd7es5f10.cloudfront.net/zimwrap_2.5.js"><\/script>');
	document.write('<script src="http://d309knd7es5f10.cloudfront.net/zimbuild_2.5.js"><\/script>');
} else {

var zim = function(zim) {
	
	if (zon) zog("ZIM BUILD Module");
	
/*-- // borrowed from ZIM Code
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
		var duo; if (duo = zob(zim.ProportionDamp, arguments, sig)) return duo;
		
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
	
	
/*-- // borrowed from ZIM Create
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
*/

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
			if (text == "") text = " ";
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
			
			// if (zon) zog("zim build - Button");
			
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
				that.removeChild(buttonLabel);
				buttonBacking = null;
				buttonLabel = null;
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
zim.CheckBox = function(size, label, startChecked, color, margin)

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
dispatches a "change" event when pressed on
--*/
	zim.CheckBox = function(size, label, startChecked, color, margin) {
		
		var sig = "size, label, startChecked, color, margin";
		var duo; if (duo = zob(zim.CheckBox, arguments, sig)) return duo;
		
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
			g2.f(checkColor).p("AnQAdICBiaIEEDZIF8nfICfB4In/KPg"); // width about 90 reg in middle

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
					if (that.checked != value) that.dispatchEvent("change");			
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
dispatches a "change" event when pressed or selectedIndex is set
then ask for the properties above for info
--*/
	zim.RadioButtons = function(size, buttons, vertical, color, spacing, margin, always) {
		
		var sig = "size, buttons, vertical, color, spacing, margin, always";
		var duo; if (duo = zob(zim.RadioButtons, arguments, sig)) return duo;
		
		function makeRadioButtons() {
			
			// if (zon) zog("zim build - RadioButtons");
			
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
					that.dispatchEvent("change");
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
			
			// if (zon) zog("zim build - Waiter");
			
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
currentIndex - gets or sets the current index of the array and display
currentValue - gets or sets the current value of the array and display
stepperArray - gets or sets the list - you should manually set the desired currentIndex if you change this
arrowPrev, arrowNext - access to the graphical zim Triangle objects (createjs.Containers)
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
--*/	
	zim.Stepper = function(list, width, color, strokeColor, label, vertical, arrows, corner, shadowColor, shadowBlur, loop, display) {
		
		var sig = "list, width, color, strokeColor, label, vertical, arrows, corner, shadowColor, shadowBlur, loop, display";
		var duo; if (duo = zob(zim.Stepper, arguments, sig)) return duo;
		
		function makeStepper() {
			
			// if (zon) zog("zim build - Stepper");
			
			if (zot(list)) list = [0,1,2,3,4,5,6,7,8,9];
			if (zot(width)) width=200; 
			if (zot(color)) color="white";
			if (zot(strokeColor)) strokeColor=null;
			if (zot(label)) label = "";			
			if (typeof label === "string" || typeof label === "number") label = new zim.Label(label, 64, "arial", "#555");			
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
			
			label.mouseChildren = false;
			label.mouseEnabled = false;
			
			var prev = this.arrowPrev = new createjs.Container();
			this.addChild(prev);
			var prevBacking = new createjs.Shape();
			prevBacking.graphics.f("rgba(255,255,255,.11)").r(0,0,height*1.5,height*1.5);
			prevBacking.regX = height*1.5 / 2;
			prevBacking.regY = height*1.5 / 2 + boxSpacing/2;
			prev.hitArea = prevBacking;
			
			var arrowPrev = new zim.Triangle(height, height*.8, height*.8, color);
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
				label.x = box.x+(box.getBounds().width-label.getBounds().width)/2;
				label.y = box.y+(box.getBounds().height-label.getBounds().height)/2;
			} else {
				if (list.length > 0) {
					index = 0;
				}
			}

			var next = this.arrowNext = new createjs.Container();
			this.addChild(next);
			var nextBacking = new createjs.Shape();
			nextBacking.graphics.f("rgba(255,255,255,.01)").r(0,0,height*1.5,height*1.5);
			nextBacking.regX = height*1.5 / 2;
			nextBacking.regY = height*1.5 / 2 + boxSpacing/2;
			next.hitArea = nextBacking;
			
			var arrowNext = new zim.Triangle(height, height*.8, height*.8, color);
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
					that.dispatchEvent("change");
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
					that.dispatchEvent("change");
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
					label.x = box.x+(box.getBounds().width-label.getBounds().width)/2;
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
zim.Slider = function(min, max, step, button, barLength, barWidth, barColor, vertical, useTicks)

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
dispatches a "change" event when button is slid on slider
--*/	
	zim.Slider = function(min, max, step, button, barLength, barWidth, barColor, vertical, useTicks) {
		
		var sig = "min, max, step, button, barLength, barWidth, barColor, vertical, useTicks";
		var duo; if (duo = zob(zim.Slider, arguments, sig)) return duo;
		
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
			if (vertical) {
				this.width = button.width;
				this.height = barLength + button.height;
				this.setBounds(-button.width/2, -button.height/2, this.width, this.height);
			} else {
				this.width = barLength+button.width;
				this.height = button.height;
				this.setBounds(-button.width/2, -button.height/2, this.width, this.height);
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
				if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
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
					myValue = value = snap(value);
					if (vertical) {
						button.y = (value - min) / (max - min) * barLength;
						lastValue = button.y;
					} else {
						button.x = (value - min) / (max - min) * barLength;
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
zim.Tabs = function(width, height, tabs, color, rollColor, offColor, auto, spacing, corner, labelAdjust, keyEnabled)

Tabs Class

extends a createjs.Container
a traditional slider - will give values back based on min and max and position of button (knob)
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
note - if auto is false, the color applies to all buttons
spacing is the pixels between buttons - default 1 pixel
auto defaults to true and means the selected tab button will be disabled
corner is the corner radius - default 0 
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
text - gets or sets current selected label text
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
dispatches a "change" event when a tab changes
--*/	
	zim.Tabs = function(width, height, tabs, color, rollColor, offColor, spacing, auto, corner, labelAdjust, keyEnabled) {
		
		var sig = "width, height, tabs, color, rollColor, offColor, spacing, auto, corner, labelAdjust, keyEnabled";
		var duo; if (duo = zob(zim.Tabs, arguments, sig)) return duo;
		
		function makeTabs() {
			
			if (zot(width)) width = 240;
			if (zot(height)) height = 60; 
			if (zot(tabs) || tabs.length<=0) tabs = [{label:1},{label:2},{label:3},{label:4}]; 
			if (zot(color)) color = "#333";
			if (zot(rollColor)) rollColor = "#555"; 
			if (zot(offColor)) offColor = "#777"; 
			if (zot(auto)) auto = true;
			if (zot(spacing)) spacing = 1;
			if (zot(corner)) corner = 0;
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
			} else if (total < width - spacing*(num-1)) {
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
				tColor = (i==0 || !auto)?((zot(t.color))?color:t.color):((zot(t.offColor))?offColor:t.offColor);
				if (typeof t.label === "string" || typeof t.label === "number") {
					t.label = new zim.Label(t.label, 36, "arial", "white");
				}
				button = new zim.Button(
					(zot(t.width))?tabW:t.width, 
					height, t.label, tColor,
					(zot(t.rollColor))?rollColor:t.rollColor,
					null, null, corner, -1
				)
				button.num = i;
				t.label.num = i;
				t.label.y += labelAdjust;
				labels.push(t.label);
				buttons.push(button);
				this.addChild(button);
				button.x = lastX;
				lastX = button.x + button.width + spacing;		
				if (i==0 && auto) button.enabled = false;					
			};
			
			this.on((zim.ACTIONEVENT=="mousedown")?"mousedown":"click", function(e) {
				change(e.target.num);				
			});
			
			function change(num) {
				var t = tabs[myIndex];
				if (auto) {
					buttons[myIndex].color = (zot(t.offColor))?offColor:t.offColor;
					buttons[myIndex].enabled = true;
				}
				myIndex = num;
				t = tabs[myIndex];
				buttons[myIndex].color = (zot(t.color))?color:t.color;;
				if (auto) buttons[myIndex].enabled = false;
				that.dispatchEvent("change");
				if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
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
					change(Math.min(Math.max(value, 0), tabs.length-1));					
				}
			});
			
			Object.defineProperty(this, 'tabs', {
				get: function() {
					return myIndex;
				},
				set: function(value) {		
					change(Math.min(Math.max(value, 0), tabs.length-1));					
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
					return labels[myIndex].text;
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
				button.removeAllEventListeners();
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
						
		if (zon) zog("zim build - Parallax");
		
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
}