
// ZIM js Interactive Media modules by Dan Zen http://danzen.com (c) 2016
// http://zimjs.com
// zimframe.js provides code to help you set up your coding environment
// free to use - donations welcome of course! http://zimjs.com/donate

if (typeof zog === "undefined") { // bootstrap zimwrap.js
	document.write('<script src="http://d309knd7es5f10.cloudfront.net/zimwrap_2.5.js"><\/script>');
	document.write('<script src="http://d309knd7es5f10.cloudfront.net/zimframe_2.6.1.js"><\/script>');
} else {

var zim = function(zim) {

	if (zon) zog("ZIM FRAME Module");


/*-- // borrowed zim.mobile from ZIM Code
zim.mobile = function(orientation)
detects if app is on a mobile device - if so, returns the mobile device type
android, ios, blackberry, windows, other (all which evaluate to true) else returns false
orientation defaults to true and if there is window.orientation then it assumes mobile
BUT this may return true for some desktop and laptop touch screens
so you can turn the orientation check off by setting orientation to false
the check looks at the navigator.userAgent for the following regular expression
/ip(hone|od|ad)|android|blackberry|nokia|opera mini|mobile|phone|nexus|webos/i
microsoft mobile gets detected by nokia, mobile or phone
so if orientation is set to false the check may miss non-mainstream devices
--*/
	zim.mobile = function(orientation) {
		if (zot(orientation)) orientation = true;
		if (/ip(hone|od|ad)/i.test(navigator.userAgent)) return "ios";
		if (/android|nexus/i.test(navigator.userAgent)) return "android";
		if (/blackberry/i.test(navigator.userAgent)) return "blackberry";
		if (/nokia|phone|mobile/i.test(navigator.userAgent)) return "windows";
		if (/opera mini|webos/i.test(navigator.userAgent)) return "other";
		if (orientation && window.orientation !== undefined) return true;
		return false;
	}

/*-- // borrowed windowWidth and windowHeight from ZIM Code
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

PARAMETERS: supports DUO - parameters or single object
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
ead only reference to the stage width - to change run remakeCanvas()
height - rwidth - read only reference to the stage height - to change run remakeCanvas()
orientation - "vertical" or "horizontal" (updated live with orientation change)
zil - reference to zil events that stop canvas from shifting
colors: orange, green, pink, blue, brown, silver, tin, grey, lighter, light, dark, darker, purple

METHODS
remakeCanvas(width, height) - removes old canvas and makes a new one and a new stage
will have to set your local stage, stageW and stageH variables again
loadAssets([file, file], path) - pass in an array of images or sounds then an optional path to directory
asset(file) - access a loaded asset based on file string (not including path)
if the asset is a sound then use asset(file).play(); // returns createjs sound instance
makeCircles(radius) - returns a createjs.Shape with the ZIM Circles (centered reg) linked to ZIM site
dispose() - only removes canvas, resize listener and stage

EVENTS
"ready" - fired when the stage is made
"progress" - fires constantly as assets are loaded with loadAssets() to represent overall load progress
"assetload" - fired when an asset loaded with loadAssets() has loaded (use asset property of event object)
"complete" - fired when all assets loaded with loadAssets() are loaded (then use frame.asset())
"error" - fired when there is a problem loading an asset with loadAssets()
"resize" - fired on resize of screen
"orientation" - fired on orientation change

--*/
	zim.Frame = function(scaling, width, height, rollover, touch, scrollTop) {

		var sig = "scaling, width, height, rollover, touch, scrollTop";
		var duo; if (duo = zob(zim.Frame, arguments, sig)) return duo;

		function makeFrame() {

			var mobile = zim.mobile();
			if (zot(scaling)) scaling = "full";
			if (zot(width)) width = 500;
			if (zot(height)) height = 500;
			if (zot(rollover)) rollover = !mobile;
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

			window.addEventListener('load', function() {
				if (mobile == "android") {
					setTimeout(function() {init();}, 500); // to catch delayed screen sizes
				} else {
					init();
				}
			});

			if (scaling != "none") window.addEventListener('resize', function() {
				sizeCanvas();
				if (mobile) setTimeout(function() {sizeCanvas();}, 250);
				if (mobile) setTimeout(function() {sizeCanvas();}, 500); // to catch delayed screen sizes
			});



			function init() {

				makeCanvas();
				makeStage();

				// for older mobile - pan hides the location bar
				if (scrollTop) {setTimeout(function() {window.scrollTo(0, 0);}, 100);}

				that.dispatchEvent("ready");

				if (scaling=="full") {
					appReady = true;
					fullResize();
					if (mobile) setTimeout(function() {sizeCanvas();}, 250);
					if (mobile) setTimeout(function() {sizeCanvas();}, 500); // to catch delayed screen sizes
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

				if (mobile != "ios") largest *= 3;
				if (scaling == "full") {
					canvas.setAttribute("width", largest);
					canvas.setAttribute("height", largest);
				} else {
					canvas.setAttribute("width", stageW);
					canvas.setAttribute("height", stageH);
				}
				document.body.appendChild(canvas);
			}

			this.assets = {}; // store asset Bitmap or play function for sound
			this.loadAssets = function(arr, path, xhr) {
				if (zot(arr)) return;
				if (zot(xhr)) xhr = false;
				if (!Array.isArray(arr)) arr = [arr];
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
				that.preload = new createjs.LoadQueue(xhr, path);
				if (soundCheck) that.preload.installPlugin(createjs.Sound);
				that.preload.on("progress", function(e) {that.dispatchEvent(e);});
				that.preload.on("error", function(e) {that.dispatchEvent(e);});
				that.preload.on("fileload", function(e) {
					var item = e.item;
					var ext = item.id.match(re);
					var asset;
					if (createjs.Sound.SUPPORTED_EXTENSIONS.indexOf(ext[1]) >= 0) {
						asset = that.assets[item.id] = {type:"sound", play:function(){
							return createjs.Sound.play(item.id);
						}};
					} else {
						asset = that.assets[item.id] = new createjs.Bitmap(e.result);
						asset.type = "image";
					}
					var ev = new createjs.Event("assetload");
					ev.item = item; // createjs preload item
					ev.asset = asset;
					that.dispatchEvent(ev);
				});
				that.preloadEvent = that.preload.on("complete", function(e) {that.dispatchEvent(e);});
				that.preload.loadManifest(manifest);
			}

			this.asset = function(n) {
				if (zot(n)) return;
				return that.assets[n] || {play:function(){if (zon) {zog("zim.Frame - asset(sound) not found"); return {};}}};
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
				return true;
			}

			// zim colors
			this.orange		= this.wrap 	= "#f58e25";
			this.green  	= this.code 	= "#acd241";
			this.pink  		= this.create 	= "#e472c4";
			this.blue   	= this.build 	= "#50c4b7";
			this.brown  	= this.pages 	= "#d1a170";
			this.silver		= this.frame 	= "#999999";
			this.tin		= this.examples	= "#777777";
			this.grey   	= this.cdn  	= "#555555";
			this.lighter 	= this.template = "#eeeeee";
			this.light 		= this.docs 	= "#cccccc";
			this.dark 		= this.bits 	= "#333333";
			this.darker 	= this.zim 		= "#111111";
			this.purple		= this.github 	= "#993399";

			this.makeCircles = function(radius) {
				if (zot(radius)) radius = 100;
				var colors = [that.wrap, that.code, that.create, that.build, that.pages, that.bits];
				var c = new createjs.Shape();
				var g = c.graphics;
				c.radius = radius;
				for (var i=0; i<colors.length; i++) {
					g.f(colors[i]).dc(0,0,(c.radius/colors.length)*(colors.length-i));
				}
				c.setBounds(-c.radius,-c.radius,c.radius*2,c.radius*2);
				c.width = c.height = radius*2;
				return c;
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
