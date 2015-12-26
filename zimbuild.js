
// ZIM js Interactive Media modules by Dan Zen http://danzen.com (c) 2016
// zimbuild.js adds common building functions for digidos (interactive media) http://zimjs.com
// free to use - donations welcome of course! http://zimjs.com/donate
// classes in this module require createjs namespace to exist and in particular easel.js
// available at http://createjs.com
// (borrows zim.ProportionDamp from ZIM code)

if (typeof zog === "undefined") { // bootstrap zimwrap.js
	document.write('<script src="http://d309knd7es5f10.cloudfront.net/zimwrap_2.0.js"><\/script>');
	document.write('<script src="http://d309knd7es5f10.cloudfront.net/zimbuild_2.0.js"><\/script>');
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
zim.Label = function(labelText, fontSize, font, textColor, textRollColor, shadowColor, shadowBlur)

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
		
		var sig = "labelText, fontSize, font, textColor, textRollColor, shadowColor, shadowBlur";
		var duo; if (duo = zob(zim.Label, arguments, sig)) return duo;
		
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
zim.Button = function(width, height, label, backingColor, backingRollColor, borderColor, borderThickness, corner, shadowColor, shadowBlur, hitPadding)

Button Class

extends a createjs.Container	
makes a button with rollovers 
var button = new zim.Button(parameters);
you will need to stage.addChild(button); and position it
you will need to add a click event button.on("click", function);
the Button class handles the rollovers		

PARAMETERS (all with defaults - see code) supports DUO - parameters or single object
width, height, 
label, // ZIM Label or plain text for default settings
backingColor, backingRollColor, borderColor, borderThickness, 
corner, shadowColor (set to -1 for no shadow), shadowBlur
hitPadding (default 0) adds extra hit area to the button for mobile

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
	zim.Button = function(width, height, label, backingColor, backingRollColor, borderColor, borderThickness, corner, shadowColor, shadowBlur, hitPadding) {
	
		var sig = "width, height, label, backingColor, backingRollColor, borderColor, borderThickness, corner, shadowColor, shadowBlur, hitPadding";
		var duo; if (duo = zob(zim.Button, arguments, sig)) return duo;
	
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
			if (zot(hitPadding)) hitPadding=0;			
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
			
			if (hitPadding > 0) {
				var rect = new createjs.Shape();

				rect.graphics.f("#000").r(-hitPadding,-hitPadding,width+hitPadding*2,height+hitPadding*2);
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

PARAMETERS: supports DUO - parameters or single object
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

PARAMETERS: supports DUO - parameters or single object
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
		
		var sig = "size, buttonData, vertical, color, spacing, margin";
		var duo; if (duo = zob(zim.RadioButtons, arguments, sig)) return duo;
		
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
shadowColor defaults to #333
value for shadow blur - 0 for no shadow
center - defaults to true and centers the pane and the label on the pane
if center is false you will have to set x and y for the pane and the label
note, the origin inside the pane is in the center

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
				if (center) {
					if (isNaN(that.resetX)) {
						that.x = (container.getBounds().width) /2;
						that.y = (container.getBounds().height) /2;
					}
					if (label) {
						label.x = -label.getBounds().width/2;
						label.y = -label.getBounds().height/2;
					}
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

PARAMETERS: supports DUO - parameters or single object
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
		
		var sig = "container, speed, backingColor, circleColor, corner, shadowColor, shadowBlur";
		var duo; if (duo = zob(zim.Waiter, arguments, sig)) return duo;
		
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

PARAMETERS: supports DUO - parameters or single object
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
		
		var sig = "stepArray, width, backingColor, strokeColor, label, vertical, arrows, corner, shadowColor, shadowBlur, loopStepper";
		var duo; if (duo = zob(zim.Stepper, arguments, sig)) return duo;
		
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

PARAMETERS: supports DUO - parameters or single object
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
					myValue = value = snap(value);
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
		
		var sig = "stage, damp, layers, auto";
		var duo; if (duo = zob(zim.Parallax, arguments, sig)) return duo;
						
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
zim.Scroller = function(backing1, backing2, speed, direction, horizontal, gapFix)

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

METHODS
dispose() - get rid of the event listeners - you need to remove the backings 

PROPERTIES
speed - how fast the animation is going in pixels per frame (ticker set at 60)
direction - either left or right if horizontal or up or down if not horizontal
gapFix - if spacing occurs over time you can set the gapFix dynamically
--*/
	zim.Scroller = function(backing1, backing2, speed, direction, horizontal, gapFix) {
		
		var sig = "backing1, backing2, speed, direction, horizontal, gapFix";
		var duo; if (duo = zob(zim.Scroller, arguments, sig)) return duo;
		
		var b1 = backing1; var b2 = backing2;
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
}