
// ZIM js Interactive Media modules by Dan Zen http://danzen.com (c) 2015
// zimcreate.js adds functionality to CreateJS for digidos (Interactive Features) http://zimjs.com
// free to use - donations welcome of course! http://zimjs.com/donate
// functions in this module require createjs namespace to exist and in particular easel.js and tween.js
// available at http://createjs.com

if (typeof zog === "undefined") { // bootstrap zimwrap.js
	document.write('<script src="http://d309knd7es5f10.cloudfront.net/zimwrap_1.4.js"><\/script>');
	document.write('<script src="http://d309knd7es5f10.cloudfront.net/zimcreate_1.5.js"><\/script>');
} else {

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
		if (props.rewind) {
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
				zog(callBack2);
				delete props.rewindParams;
				createjs.Tween.get(target, props)
					.wait(wait)
					.to(obj, t, createjs.Ease[ease])
					.call(rewindCall)
					.wait(wait2)
					.to(obj2, t, createjs.Ease[ease])				
					.call(doneAnimating);
			} else {
				createjs.Tween.get(target, props)
					.wait(wait)
					.to(obj, t, createjs.Ease[ease])
					.wait(wait2)
					.to(obj2, t, createjs.Ease[ease])				
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
} 