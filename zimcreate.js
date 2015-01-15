
// ZIM js Interactive Media modules by Dan Zen http://danzen.com (c) 2014
// zimcreate.js adds functionality to CreateJS for digidos (Interactive Features) http://zimjs.com
// free to use - donations welcome of course! http://zimjs.com/donate
// functions in this module require createjs namespace to exist and in particular easel.js
// available at http://createjs.com

if (typeof zog === "undefined") { // bootstrap zimwrap.js
	document.write('<script src="http://d309knd7es5f10.cloudfront.net/zimwrap_1.2.js"><\/script>');
	document.write('<script src="http://d309knd7es5f10.cloudfront.net/zimcreate_1.2.js"><\/script>');
} else {

var zim = function(zim) {
	
	if (zon) zog("ZIM CREATE Module");

	
	zim.drag = function(obj, rect, overCursor, dragCursor, currentTarget, mouseDowns) {
		
		// adds drag to an object (rect, overCursor, dragCursor optional, currentTarget optional, mouseDowns optional)
		// rect is a rectangle object for the bounds of dragging
		// the two cursor properties are any css cursor value such as "pointer", etc.
		// currentTarget defaults to false allowing you to drag things within a container
		// eg. drag(container); will drag any object within a container
		// setting currentTarget to true will then drag the whole container
		// dragging takes into account scaled and rotated object containers 	
		// mouseDowns defaults to false which prevents a swipe from triggering when dragging	
		
		obj.cursor = (zot(overCursor))?"pointer":overCursor;
		if (zot(currentTarget)) currentTarget = false;		
		if (zot(mouseDowns)) mouseDowns = false;
		
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
			if (!mouseDowns) e.stopImmediatePropagation();
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
} 
