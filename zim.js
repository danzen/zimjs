
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


////////////////  ZIM CODE  //////////////

// zimcode.js adds some general code functionality

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
	
	
	// rounds number to the number of decimal places specified by places
	// for instance zim.decimals(1.8345, 2) == 1.83
	
	zim.decimals = function(num, places) {
		if (zot(num) || num==0) return 0;
		if (zot(places)) places = 1;	
		return Math.round(num*Math.pow(10, places))/Math.pow(10, places);
	}

	return zim;
} (zim || {});


////////////////  ZIM DOM  //////////////

// zimdom.js helps with common Browser and DOM  
// these are common Web solutions over the years (sorry for lack of credit)

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


////////////////  ZIM CREATE  //////////////

// zimcreate.js adds functionality to CreateJS for digidos (Interactive Features) 
// functions in this module require createjs namespace to exist and in particular easel.js
// available at http://createjs.com

var zim = function(zim) {
	
	if (zon) zog("ZIM CREATE Module");

	
	zim.drag = function(obj, rect, overCursor, dragCursor) {
		
		// adds drag to an object (rect, overCursor, dragCursor optional)
		// rect is a rectangle object for the bounds of dragging
		// dragging takes into account scaled and rotated object containers 		
			
		if (!obj.parent) {
			zog("zimcreate.js  drag(): Object must be added to stage at start to drag");	
			return;
		}
		
		obj.cursor = (zot(overCursor))?"pointer":overCursor;
				
		// check position right away if there is a bounding box
		// there is no mousedown so set the diffX and diffY to 0		
		var diffX = 0; var diffY = 0;
		// positionObject() is used as well in the dragmove function	
		// where it expects a global x and y
		// so convert obj.x and obj.y positions inside its parent to global:
		var point = obj.parent.localToGlobal(obj.x, obj.y);
		positionObject(obj, point.x, point.y);
	
		obj.zimDown = obj.on("mousedown", function(e) {
			// e.stageX and e.stageY are global
			// e.target.x and e.target.y are relative to e.target's parent
			// bring stageX and stageY into the parent's frame of reference
			var point = e.target.parent.globalToLocal(e.stageX, e.stageY); 
			diffX = point.x - e.target.x;
			diffY = point.y - e.target.y;	
			// just a quick way to set a default cursor or use the cursor sent in		
			obj.cursor = (zot(dragCursor))?"move":dragCursor;
		}, true);
		
		obj.zimMove = obj.on("pressmove", function(e) {
			positionObject(e.target, e.stageX, e.stageY);				
		}, true);
		
		function positionObject(o, x, y) {
			// x and y are the desired global positions for the object o			
			// checkBounds returns the same values if there are no bounds
			// and always returns values inside the bounds if there are bounds set
			// firstly, convert the global x and y to a point relative to the object's parent
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
		obj.off("mousedown", obj.zimDown);
		obj.off("pressmove", obj.zimMove);
		obj.off("pressup", obj.zimUp);	
	}

	zim.hitTestPoint = function(obj,x,y) {
		var point = obj.globalToLocal(x,y);
		return obj.hitTest(point.x, point.y);
	}
	
	zim.hitTestReg = function(a,b) {		
		var point = b.localToLocal(b.regX,b.regY,a);
		return a.hitTest(point.x, point.y);
	}


	zim.hitTestRect = function(a,b,num) {
		// see if a shape (a) is hitting points on a rectangle
		// the rectangle is based on the position, registration and bounds of object b
		// the four corners are the default with num=0;
		// if num is 1 then it tests for one extra (mid) point on each side
		// if num is 2 then it tests for two extra points on each side (1/3 and 2/3)
		
		if (zot(num)) num = 0;
			
		var bounds = b.getBounds();

		if (!bounds) if (zon) {
			zog("zimcreate.js hitTestRect:\n please setBounds() on param b object");
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
		if (!bounds) if (zon) {
			zog("zimcreate.js hitTestCircle:\n please setBounds() on param b object");
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
		if (!aB || !bB) if (zon) {
			zog("zimcreate.js hitTestBounds:\n please setBounds() on both objects");
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
		
		var oB = o.getBounds();
		if (!oB) if (zon) {
			zog("zimcreate.js boundsToGlobal:\n please setBounds() on both object");
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
		if (zot(o)) return;	
		if (zot(s)) s=1;
		o.scaleX = o.scaleY = s;	
	}

	return zim;
} (zim || {});



////////////////  ZIM BUILD  //////////////

// zimbuild.js adds common building functions for digidos (interactive media)
// functions in this module require createjs namespace to exist and in particular easel.js
// available at http://createjs.com

var zim = function(zim) {
	
	if (zon) zog("ZIM BUILD Module");
	
	
	// Button Class
	// var button = new zim.Button();
	// see the defaults in the code below (label is the text)
	// you will need to stage.addChild(button); and position it
	// you will need to add a click event button.on("click", function);
	// the Button class handles the rollovers	
			
	zim.Button = function(
		width, height, 
		label, fontSize, font, 
		backingColor, backingRollColor, textColor, textRollColor, borderColor, 
		corner, shadowColor, shadowBlur
	) {
	
		function makeButton() {
			
			if (zon) zog("zimbuild.js: Button");
			
			if (zot(width)) width=200;
			if (zot(height)) height=60;
			if (zot(label)) label="PRESS";
			if (zot(fontSize)) fontSize=36;
			if (zot(font)) font="arial";
			if (zot(backingColor)) backingColor="#C60";
			if (zot(backingRollColor)) backingRollColor="#F93";
			if (zot(textColor)) textColor="white";
			if (zot(textRollColor)) textRollColor="white";
			if (zot(borderColor)) borderColor="#777";
			if (zot(corner)) corner=20;
			if (zot(shadowColor)) shadowColor="#666";
			if (zot(shadowBlur)) shadowBlur=16;
						
			this.mouseChildren = false; 
			this.cursor = "pointer";
				
			var buttonBacking = new createjs.Shape();		
			var g = buttonBacking.graphics;		
			g.f(backingColor);
			if (borderColor) g.s(borderColor);
			g.rr(0, 0, width, height, corner);
			this.addChild(buttonBacking);					
			if (shadowBlur > 0) buttonBacking.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);
			this.setBounds(0,0,width,height);
			
			var buttonLabel = new createjs.Text(label, fontSize + "px " + font, textColor); 
			buttonLabel.textBaseline = "middle";
			buttonLabel.textAlign = "center";
			buttonLabel.x = width / 2 + 1; 
			buttonLabel.y = height / 2 + 2; 
			this.addChild(buttonLabel);
			this.buttonLable = buttonLabel;		
			
			this.on("mouseover", buttonOn);
			var that = this;
			function buttonOn(e) {
				that.on("mouseout", buttonOff);
				var g = buttonBacking.graphics;
				g.clear();
				g.f(backingRollColor);
				if (borderColor) g.s(borderColor);
				g.rr(0, 0, width, height, corner);
				buttonLabel.color = textRollColor;
				stage.update(); 
			}
		
			function buttonOff(e) {
				that.off("mouseout", buttonOff); 
				var g =buttonBacking.graphics;
				g.clear();
				g.f(backingColor);
				if (borderColor) g.s(borderColor);
				g.rr(0, 0, width, height, corner);
				buttonLabel.color = textColor;
				stage.update(); 
			}				
		}
	
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeButton.prototype = new createjs.Container();
		makeButton.constructor = zim.Button;
		return new makeButton();
		
	}
	
	// Pane Class
	// var pane = new zim.Pane(); 
	// you then can call pane.show() and pane.hide() in your code 
	// note: Pane automatically adds to stage and centers 
	// you can change the x and y of course
	
	// see the defaults in the code below
	// pass in a boolean for if you want to drag the pane (default false)
	// pass in if a dragging pane should open at first start position (defaults false)
	// for reset, by default, Pane takes the first position and will continue to use that
	// you can use resetX and resetY properties to dynamically adjust the reset position (if needed)
	// modal defaults to true and means the pane will close when user clicks off the pane
	// corner is the corner radius default 20
	
	zim.Pane = function(stage, width, height, color, drag, resets, modal, corner, backingAlpha) {
		
		function makePane() {
			
			if (zon) zog("zimbuild.js: Pane");
			
			if (zot(stage)) if (zon) {
				zog("Please pass in a reference to the stage as first parameter");	
				return;
			}
			if (zot(width)) width=200;
			if (zot(height)) height=200;
			if (zot(color)) width="white";
			if (zot(drag)) drag=false;
			if (zot(resets)) resets=false;
			if (zot(modal)) modal=true;
			if (zot(corner)) corner=20;
			if (zot(backingAlpha)) backingAlpha=.14;
					
			var backing = this.backing = new createjs.Shape();				
			// make a big backing that closes the pane when clicked
			// could also provide a close button
			var g = backing.graphics;
			g.beginFill("black");
			g.drawRect(-5000,-5000,10000,10000);
			backing.alpha = backingAlpha; 			
			var that = this;
			backing.on("click", function(e) {
				that.hide();
			});
			if (modal) this.addChild(backing);
			
			var display = this.display = new createjs.Shape();
			g = display.graphics;
			g.beginFill(color);
			g.drawRoundRect(0, 0, width, height, corner);
			display.shadow = new createjs.Shadow("#333", 8, 8, 20);		
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
									
			this.x = (stage.canvas.width-width) / 2
			this.y = (stage.canvas.height-height) / 2;
			// makes it seem like the pane has the dimensions of the display
			this.setBounds(0,0,width,height);
					
			stage.update();			
			
			this.hide = function() {
				stage.removeChild(this);			
				stage.update();	
				if (resets) {
					if (!isNaN(that.resetX)) that.x = that.resetX;					
					if (!isNaN(that.resetY)) that.y = that.resetY;
				}
			}			
			this.show = function() {
				stage.addChild(this);			
				stage.update();	
			}			
			function checkBounds(x,y) {		
				x = Math.max(0, Math.min(stage.canvas.width-width, x));
				y = Math.max(0, Math.min(stage.canvas.height-height, y));
				return {x:x,y:y}				
			}			
		}
		
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time		
		makePane.prototype = new createjs.Container();
		makePane.constructor = zim.Pane;
		return new makePane();
		
	}
		
	
	// Parallax Class
	
	// make a new object: p = new zim.Parallax()
	// pass in the stage from your code
	// pass in the damping value (.1 default)
	// pass in an array of layer objects in the following format
	// [[obj, distanceX, distanceY], [obj2, distanceX, distanceY], etc.]
	// or you can add these one at a time with the p.addLayer(obj, distanceX, distanceY); method
	// you must pass in a layer object - the distanceX and distanceY can be 0 for no motion on that axis
	// the distance is the total distance you want the layer object to travel
	// relative to the cursor position between 0 and stage width or height
	// the Parallax class will apply half the distance on either side of the object's start point
	// should work through nested clips...
		
	zim.Parallax = function(stage, damp, layers) {
						
		if (zon) zog("zimbuild.js: Parallax");
		
		if (zot(stage)) if (zon) {
			zog("please pass in the stage");
			return;
		}
		var stageW = stage.canvas.width;
		var stageH = stage.canvas.height;
		
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
	// make a new zim.Scroller() object passing in two backgrounds (that look the same)
	// the Scroller object will animate and swap the backgrounds when needed
	// pass in the speed, direction and a boolean for horizontal (default true)
	// setting horizontal to false will animate vertically
	// you can adjust the speed and direction properties dynamically
	// you cannot adjust the backings and horizontal dynamically
	// to change your animation, dispose() of this one and make a new Scroller() object
	// disposing just removes the ticker - you have to remove the backings
	
	zim.Scroller = function(b1, b2, speed, direction, horizontal) {
		
		if (zon) zog("zimbuild.js: Scroller");
		
		var that = this; // we keep animate protected but want to access public properties
		
		// here are the public properties that can be changed
		this.speed = (zot(speed)) ? 1 : speed;
		this.direction = (zot(direction)) ? 1 : direction;
		
		if (!b1.getBounds() || !b2.getBounds()) if (zon) {
			zog("please setBounds() on backing objects");
			return;
		}		
		var stageW = b1.getStage().canvas.width;
		var stageH = b1.getStage().canvas.height;
		
		if (horizontal) {
			b2.x = b1.getBounds().width;	
		} else {
			b2.y = b1.getBounds().height;
		}
				
		var ticker = createjs.Ticker.on("tick", animate);	
		createjs.Ticker.setFPS(60);
		function animate(e) {
			// pausing the ticker does not really pause the ticker (weird)
			if (that.speed == 0 || that.direction == 0) {return;}
			
			if (horizontal) {
				b1.x -= that.speed*that.direction;
				b2.x -= that.speed*that.direction;	
				
				if (that.direction * that.speed > 0) { 
					if (b2.x < 0 && b1.x < b2.x) {
						b1.x = b2.getBounds().width;
					} else if (b1.x < 0 && b2.x < b1.x) {
						b2.x = b1.getBounds().width;
					}			
				} else {
					if (b2.x > stageW && b2.x > b1.x) {
						b2.x = b1.x - b1.getBounds().width;
					} else if (b1.x > stageW && b1.x > b2.x) {
						b1.x = b2.x - b2.getBounds().width;
					}	
				}
			} else {
				b1.y -= that.speed*that.direction;
				b2.y -= that.speed*that.direction;	
				
				if (that.direction * that.speed > 0) { 
					if (b2.y < 0 && b1.y < b2.y) {
						b1.y = b2.getBounds().height;
					} else if (b1.y < 0 && b2.y < b1.y) {
						b2.y = b1.getBounds().height;
					}			
				} else {
					if (b2.y > stageH && b2.y > b1.y) {
						b2.y = b1.y - b1.getBounds().height;
					} else if (b1.y > stageH && b1.y > b2.y) {
						b1.y = b2.y - b2.getBounds().height;
					}	
				}
			}
			stage.update();
		}		
		
		this.dispose = function() {
			if (zon) zog("bye from Scroller");
			createjs.Ticker.off("tick", ticker);
		}
		
	}	
	
	
	zim.move = function(o, x, y, t, e) {		
		// convenience function to animate an object o to position x, y in t miliseconds
		// with ease of e
		createjs.Tween.get(o)
			.to({x:x, y:y}, t, createjs.Ease[e])				
			.call(doneAnimating);
		var listener = createjs.Ticker.on("tick", stage);	
		function doneAnimating() {
			createjs.Ticker.off("tick", listener);
		}		
	}		
	
	
	
	// Damp Class 
	
	// create your Damp object outside an interval or ticker
	// var d = new zim.Damp();
	// then inside an interval or ticker call the convert method
	// d.convert(desiredValue)
	// you would then apply that desired value to a property such as x or y or scale
	// if you want to do both x and y then you need two Damp objects 
	// and two convert calls (you can do both in one interval or ticker)
	
	zim.Damp = function(startValue, damp) {
		if (zon) zog("zimbuild.js: Damp");
		this.lastValue = (zot(startValue)) ? 0 : startValue;
		this.damp = (zot(damp)) ? .1 : damp;
	}	
	zim.Damp.prototype.convert = function(desiredValue) {
		return this.lastValue = this.lastValue + (desiredValue - this.lastValue) * this.damp;		
	}
	
	
	// Proportion Class
	
	// converts an input value to an output value on a different scale 	
	// make a Proportion object
	// var p = new zim.Proportion(parameters)	
	// put in min and max for the output scale (say volume)
	// put in min and max for the input scale (say x values, 0 and 1 are the defaults)			
	// in your own pressmove event function or whatever call p.convert(input)
	// pass in your input property (say the mouseX)
	// convert will return the output property (for instance, a volume)		
	// the object always starts by assuming baseMin as baseValue
	// just call the convert method right away if you want it to start at a different baseValue

	zim.Proportion = function(baseMin, baseMax, targetMin, targetMax, factor, targetRound) {
		
		if (zon) zog("zimbuild.js: Proportion");

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
	// put in desired damping with 1 being no damping and .1 being the default		
	// in your own interval or ticker event function call pd.convert(input)
	// the object always starts by assuming baseMin as baseValue.
	// if you want to start or go to an immediate value without easing then
	// call the pd.immediate(baseValue) method with your desired baseValue (not targetValue)

	zim.ProportionDamp = function(baseMin, baseMax, targetMin, targetMax, damp, factor, targetRound) {
		
		if (zon) zog("zimbuild.js: ProportionDamp");
		
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
	
	

	return zim;
} (zim || {});