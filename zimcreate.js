
// ZIM js Interactive Media modules by Dan Zen http://danzen.com (c) 2016
// zimcreate.js adds functionality to CreateJS for digidos (Interactive Features) http://zimjs.com
// free to use - donations welcome of course! http://zimjs.com/donate
// functions in this module require createjs namespace to exist and in particular easel.js and tween.js
// available at http://createjs.com

if (typeof zog === "undefined") { // bootstrap zimwrap.js
	document.write('<script src="http://d309knd7es5f10.cloudfront.net/zimwrap_2.5.js"><\/script>');
	document.write('<script src="http://d309knd7es5f10.cloudfront.net/zimcreate_2.6.js"><\/script>');
} else {

var zim = function(zim) {
	
	if (zon) zog("ZIM CREATE Module");
	
/*-- // borrowed from ZIM Code
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
	
/*-- // borrowed from ZIM Build
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
zim.centerReg = function(obj, container)
centers the registration point on the bounds - obj must have bounds set
supports DUO - parameters or single object
if container is specified then sets obj x and y to half the width and height of container
just a convenience function - returns obj for chaining
--*/
	zim.centerReg = function(obj, container) {

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
} 