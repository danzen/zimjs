
// ZIM js Interactive Media modules by Dan Zen http://danzen.com (c) 2015
// http://zimjs.com  
// zimframe.js provides code to help you set up your coding environment
// free to use - donations welcome of course! http://zimjs.com/donate

if (typeof zog === "undefined") { // bootstrap zimwrap.js
	document.write('<script src="http://d309knd7es5f10.cloudfront.net/zimwrap_1.4.js"><\/script>');
	document.write('<script src="http://d309knd7es5f10.cloudfront.net/zimframe_1.5.js"><\/script>');
} else {

var zim = function(zim) {
	
	if (zon) zog("ZIM FRAME Module");

/*-- // borrowed windoWidth and windowHeight from ZIM Code
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
} 