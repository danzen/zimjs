// ZIM js Interactive Media modules by Dan Zen http://danzen.com (c) 2014
// zimpages.js helps you layout and control flexive pages, click and swipe between pages and more http://zimjs.com
// free to use - donations welcome of course! http://zimjs.com/donate
// classes in this module require createjs namespace to exist and in particular easel.js
// available at http://createjs.com
// (borrows zim.arraysEqual (ZIM code), zim.animate and zim.fit (ZIM create))

if (typeof zog === "undefined") { // bootstrap zimwrap.js
	document.write('<script src="http://d309knd7es5f10.cloudfront.net/zimwrap_1.3.js"><\/script>');
	document.write('<script src="http://d309knd7es5f10.cloudfront.net/zimpages_1.3.js"><\/script>');
} else {

var zim = function(zim) {
	
	if (zon) zog("ZIM PAGES Module");	
	
/*-- // borrowed from ZIM Code
zim.arraysEqual = function(a, b, strict)
slightly modified Evan Steinkerchnerv & Tomas Zato
finds out if arrays are same (including nested arrays)
works for arrays with strings and numbers (not necessarily other objects)
strict defaults to true - if false, order in arrays does not matter
--*/	
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
	
	/*-- // borrowed from ZIM Create
zim.animate = function(target, obj, t, ease, callBack, params, wait)
convenience function (wraps createjs.Tween)
to animate object o properties in t milliseconds
with optional ease and a callBack function and params (send an array, for instance)
returns target for chaining
--*/	
	zim.animate = function(target, obj, t, ease, callBack, params, wait) {		
		if (zot(target) || !target.on || zot(obj)) return;
		if (zot(ease)) ease = "quadInOut";
		if (zot(wait)) wait = 0;
		createjs.Tween.get(target)
			.wait(wait)
			.to(obj, t, createjs.Ease[ease])				
			.call(doneAnimating);
		var listener = createjs.Ticker.on("tick", stage);	
		function doneAnimating() {
			if (callBack && typeof callBack === 'function') {(callBack)(params);}
			createjs.Ticker.off("tick", listener);
		}	
		return target;	
	}	

/*-- // borrowed from ZIM Create
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
zim.Swipe = function(obj, distance, duration)

Swipe class

extends a createjs.EventDispatcher so it can dispatch events
sets up capturing swipes on objects
dispatches a "swipe" event on swipe left, right, up, down
var s = zim.Swipe(parameters) 	

PARAMETERS
pass into the object the object you want to swipe on
then an optional distance to activate swipe (50 pixel default)
can pass in a percentage of the stage
and an optional time to travel that distance (100 ms default)
	
PROPERTIES
distance - the distance needed for swipe to activate
duration - the time from mousedown a swipe is measured for distance
direction - the direction of the last swipe (left, right, up, down or none)
obj - the object that was last swiped
active - Boolean true for dispatching swipes and false for not

METHODS
enable() - set swipe to active (by default it is)
disable() - set swipe to inactive (sets active to false and does not dispatch)

EVENTS
dispatches a "swipe" event on every pressup (even if swipe failed and direction is none)
when a swipe event triggers
the Swipe object provides a direction property of "left", "right", "up", or "down"
the Swipe object provides an obj property of what object was swiped on
for instance if e is the event object
then e.target is the Swipe object so use e.target.direction
did not dispatch a custom event due to lack of support in early IE
Swipe also dispatches a direction of "none" if the mouse movement is not a swipe
this can be used to snap back to an original location		
--*/	
	zim.Swipe = function(obj, distance, duration) {
		function makeSwipe() {
			if (zot(obj) || !obj.on) {zog("zim pages - Swipe():\nPlease pass in object"); return;}
			if (zot(distance)) distance = 50; // pixels for swipe to count
			if (zot(duration)) duration = 100; // ms to test pixels
			
			this.distance = distance;
			this.duration = duration;
			this.active = true;
			
			var startX;
			var startY;	
			var mouseX;
			var mouseY;
			var downCheck;
			var timer;
			var that = this;	
			
			obj.on("mousedown", function(e) {
				if (!that.active) return;
				that.obj = e.target; 
				startX = e.stageX;
				startY = e.stageY;
				downCheck = true;	
				clearTimeout(timer);			
				timer = setTimeout(function() {
					if (downCheck) {
						// may as well use 45 degrees rather than figure for aspect ratio
						if (Math.abs(mouseX - startX) > Math.abs(mouseY - startY)) {
							if (mouseX - startX > that.distance) {that.direction="right"; that.dispatchEvent("swipe"); downCheck=false;}	
							if (startX - mouseX > that.distance) {that.direction="left"; that.dispatchEvent("swipe"); downCheck=false;}
						} else {
							if (mouseY - startY > that.distance) {that.direction="down"; that.dispatchEvent("swipe"); downCheck=false;}
							if (startY - mouseY > that.distance) {that.direction="up"; that.dispatchEvent("swipe"); downCheck=false;}
						}
					}				
				}, that.duration);
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
			
			this.disable = function() {
				that.active = false;
			}
			
			this.enable = function() {
				that.active = true;
			}	
		}
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time	
		makeSwipe.prototype = new createjs.EventDispatcher();
		makeSwipe.prototype.constructor = zim.Swipe;	
		return new makeSwipe();
	}
		
	
/*--
zim.Pages = function(holder, pages, transition, speed, transitionTable)

Pages Class

Pages extends the createjs Container - so you stage.addChild(myPages)				
handles going between pages
make a var myPages = new zim.Pages() object 
all your pages from then on are added to and manipulated inside the Pages object
Pages allows you to set the destination pages for swipe events
other events like buttons can call the go(page, direction) method
consider using zim.HotSpots() to efficiently handle multiple buttons

PARAMETERS
pass in the holder object (ie. stage) so we can set various transition animation parameters
pass in an array of page objects - for example:	
[{page:home, swipe:[null,"info",hide,find]},{page:hide, swipe:[null,null,null,home]}]
the pages should be containers - it helps to give them each a name property
the optional swipe array holds mappings to swipe events ["right", "left", "down", "up"]
in other words, these could be pages to the left, right, top and bottom of the current page
or they can call commands as strings
pass in the type of transition "reveal", "slide", "fade", "black", "white" or the default: "none"
and a speed in milliseconds
finally an optional transitionTable (read the property below for format)

METHODS
addPage() - lets you alternatively add pages after you create the object
removePage() - lets you remove a page (if on this page, call a go() first and remove on the page event)
setSwipe() - lets you set the swipe array for a page
go(newPage, direction, trans, ms) - lets you go to a page for events other than swipe events	
trans and ms are optional and will override any previously set transitions (speed in ms)
pause() - pauses a transition before it starts (call from swipe event)
unpause() - unpauses a paused transition (unless another go() command is called)
puff(time) - adds all the pages behind the currentPage (time (ms) auto calls settle)
settle() - removes all pages except the currentPage
disable() - stops swipe from activating and sets active = false
enable() - enables swipe action and sets active = true
dispose() - clears your listeners and pages

PROPERTIES
speed - of transitions in ms
transitionTable - [[fromPage, toPage, "transition", ms(optional)], etc.] overrides default transition
page - the current page object (read)
lastPage - the last page before transition (read)
direction - direction of transition (read)
active - default true, boolean to have swipes active (good for layered Pages objects)
swipe - the ZIM Swipe object used for pages (can tweak distance to percentage if rescaling)

EVENTS
for the data above, swiping the home page down automatically goes to the hide page
if the home page is swiped up it automatically goes to the find page	
Pages dispatches a "swipe" event before changing pages if swiped
you can then get pages.page, pages.nextPage and pages.direction
you can pause() if needed the transition to handle data, etc. and then unpause() 
you do not need to handle going to another page when swiping - that is handled automatically
so you probably will not use the swipe event unless handling data between pages
Pages dispatches a "page" event when you pass in a page object in the swipe array
myPages.on("page",function(e){...})
with myPages.page being set to the new page (e.target.page)
and myPages.oldPage being set to the old page (e.target.page)
myPages.direction gets the direction of the transition (e.target.direction)
if there is a string in the swipe array like "info"
then the zim.Pages() object dispatches an event equivalent to the string
for the data example above, myPages.on("info",function(e){...});
would trigger when the home page is swiped to the left
Pages also dispatches a "pageTransitioned" event when a transition is complete
you will have the same properties available as with the page event

the first page object is the start page
you can add pages with the addPage() method 
it will not show until you swipe or go to it - unless it was the first page added
once again - do not add the pages to the stage yourself - let Pages do it for you
just add the pages object to the stage.  Pages is designed for full stage
if you want pages within a smaller area - consider using two canvas tags
--*/	
	zim.Pages = function(holder, pages, transition, speed, transitionTable) {
		
		function makePages() {
		
			if (zot(holder) || !holder.getBounds || !holder.getBounds()) {zog("zim pages - Pages():\nobject must have bounds set"); return;}
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
			
			this.swipe = new zim.Swipe(holder);

			// handle giving swipe event time to trigger event and provide code intervention
			var pauseInfo;
			var paused = false;	
				
			var swipeEvent = this.swipe.on("swipe", function(e) {
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
			
			this.puff = function(milliseconds) {
				// add all pages to the holder behind current page
				// if milliseconds then this is the time to settle automatically
				for (var i=0; i<pages.length; i++) {
					that.addChild(pages[i].page);	
				}	
				that.addChild(currentPage);
				if (milliseconds > 0) {
					setTimeout(function() {
						that.settle();
					}, milliseconds);
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
				that.swipe.off("swipe", swipeEvent);
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

	

/*--
zim.HotSpots = function(spots, local, mouseDowns)

HotSpots Class

extends a createjs.Container
puts an invisible click area (hotSpot) on pages
or specify an object and it will turn that into a hotspot
var hs = new zim.HotSpots();

PARAMETERS
you pass in an array of hotspot data objects:
[{page:home, rect:[190,50,260,260], call:someFunction}, 
{page:home, rect:[70,405,500,150], call:someOtherFunction}]
the page should be a createjs Container
the rect is the [left, right, width, height] of a rectangle relative to the stage
call is the callback function to call when a hotSpot is clicked
instead of a rect array you can pass an object that must have setBounds() set
[{page:home, rect:submitButton, call:function(){//code}}]
the hotSpot will then use the button position and bounds as the rectangle
this allows you to manage all your button presses from one place
note - in this case, HotSpots will actually add a click event to the button
the second parameter local defaults to true
and should be used when the element scale independently from the stage
in local mode you must add coordinates of the hotSpot inside its container
if set to false then you pass in global coordinates and hotSpot will convert them
the third parameter is whether you want mouseDowns on the hotSpots
this defaults to false to prevent users from activating a swipe on a button (when using ZIM Swipe)

METHODS
show() - shows the hotspots for testing during authoring time
hide() - hides the hotspots
addHotSpot(page,rect,call) - can dynamically add hotSpots
removeHotSpots(page,id) - id is optional - so can remove all spots on a page
dispose() - removes listeners

note, the class does actually add rectangle shapes to your page
these have an alpha of .01
this could have been done with "math" alone but rollover cursor would be a pain
the class creates zim.HotSpot objects - see the class underneath this one
--*/
	zim.HotSpots = function(spots, local, mouseDowns) {
		function makeHotSpots() {
			if (zot(spots) || !Array.isArray(spots)) {zog("zim pages - HotSpots():\nplease provide an array of HotSpot data"); return;}
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
						zog("zim pages - HotSpots(): HotSpot "+ data.page + " " + data.rect +" button does not exist");
						return;	
					}
					if (!button.getBounds()) {
						zog("zim pages - HotSpots(): HotSpots button needs bounds");
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
	
	
/*--
zim.HotSpot = function(obj, x, y, w, h, call, local)

HotSpot Class

adds an invisible button to a container object (often think of this as the page)
var hs = new zim.HotSpot();
if you want multiple spots it is more efficient to use the HotSpots class above
which manages multiple HotSpot objects (otherwise you end up with multiple event functions)
the spot actually keeps an alpha of .01
the spot will get a cursor of "pointer"

PARAMETERS
the container object in which to place the hotspot
the x, y, width and height of the hotspot relative to the stage
call is the function to call when the spot is clicked
local defaults to true and should be used when the element scale independently from the stage
in local mode you must add coordinates of the hotSpot inside its container
if set to false then you pass in global coordinates and hotSpot will convert them

METHODS	
show() - helps when creating the spot to see where it is
hide() - hides the hotspot
dispose() - removes the listener and the spot

PROPERTIES
spot - the actual hotSpot object that gets added to the container can be accessed with the spot property
eg. hs.spot
--*/	
	zim.HotSpot = function(obj, x, y, w, h, call, local) {		
		function makeHotSpot() {			
			if (zot(obj) || !obj.addChild) {zog("zim pages - HotSpot():\nPlease pass in container object for obj"); return;}
			if (obj instanceof createjs.Container == false) zog("zim build - HotSpot():\nObjects passed in should be Containers");
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

	
/*--
zim.dashedLinesOn = function()

adds dashedLineTo(x1, y1, x2, y2, dashLen) 
and drawDashedRect(x, y, w, h, dashLen) methods to createjs Graphics
https://gist.github.com/diverted247/9216242 - Ted Patrick 
--*/	
	zim.dashedLinesOn = function() {
		if (zim.dashed) return; // only need to define once
		zim.dashed = true;
		createjs.Graphics.prototype.dashedLineTo = function(x1, y1, x2, y2, dashLen){
			this.moveTo(x1, y1);
			 
			var dX = x2 - x1;
			var dY = y2 - y1;
			var dashes = Math.floor(Math.sqrt(dX*dX+dY*dY) / dashLen);
			var dashX = dX / dashes;
			var dashY = dY / dashes;
			 
			var q = 0;
			while(q++ < dashes){
				x1 += dashX;
				y1 += dashY;
				this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x1, y1);
			}
			this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x2, y2);
			return this;
		}		 
		createjs.Graphics.prototype.drawDashedRect = function(x1, y1, w, h, dashLen){
			this.moveTo(x1, y1);
			var x2 = x1 + w;
			var y2 = y1 + h;
			this.dashedLineTo(x1, y1, x2, y1, dashLen);
			this.dashedLineTo(x2, y1, x2, y2, dashLen);
			this.dashedLineTo(x2, y2, x1, y2, dashLen);
			this.dashedLineTo(x1, y2, x1, y1, dashLen);
			return this;
		}	
	}
			
	
/*--
zim.Manager = function()

Manager class

used internally to make GridManager and GuideManager
and in future perhaps OutlineManager
--*/	
	zim.Manager = function(type) {	
		if (zon && type) zog("zim pages - " + type);	
		var that = this;
		this.items = [];
		this.add = function(a) {
			that.items.push(a);
		}
		this.resize = function() {
			if (!that) return;
			for (var i=0; i<that.items.length; i++) {				
				if (!that.items[i].resize()) that.items.splice(i); // was disposed	
			}	
		}
		this.dispose = function() {
			for (var i=0; i<that.items.length; i++) {			
				that.items[i].dispose();				
			}	
			that.items = [];
			if (zon) zog("zim pages - " + type + " - all disposed");		
			that = null;
		}		
	}		
	

/*--
zim.Guide = function(obj, vertical, percent, hideKey, pixelKey)

Guide Class

extends createjs.Container
var guide = new zim.Guide(parameters);
stage.addChild(guide);
shows a guide to help layout assets with code 
cursor x and y percentage or pixels are shown along edges 
as a distance from the guide
can use G key to toggle guide visibility
can use P key to toggle percent and pixels

make sure you remove the guide for your final version (dispose)

PARAMETERS
obj - to add guide to (stage is default)
vertical - defaults to true, set to false for horizontal guide
percent - defaults to true to show percent - false to show pixels
hideKey - key to press to hide guide - default G
pixelKey - key to press to swap percent and pixels - default P

PROPERTIES
pixels - boolean - set to true to change to pixels, false to go to percent

METHODS
dispose() - clears keyboard events and guide
--*/	
	zim.Guide = function(obj, vertical, percent, hideKey, pixelKey) {		
		function makeGuide() {					
				
			if (zot(obj)) obj = "stage";
			if (zot(vertical)) vertical = true;
			if (obj != "stage" && (!obj.getBounds || !obj.getBounds())) {zog ("zim pages - Guide(): Please provide bounds for the obj (setBounds())"); return;}
			if (zot(percent)) percent = true;
			if (zot(hideKey)) hideKey = "G";
			if (zot(pixelKey)) pixelKey = "P";
			
			var that = this;
			var stage; 	
			var stageEvent;
			zim.dashedLinesOn();
		
			// make text boxes that show x and y			
			var boxW = 80;
			var boxH = 26;
			var minX = boxW/6+boxW/2;
			var minY = boxH*2
			var maxX; // set max values once we get a stage
			var maxY;
			
			var box; 
			if (vertical) {	
				box = makeBox("#00c5af", "white", "white");	
				box.shape.regX = boxW+boxW/6; box.shape.regY = boxH/2; 
				box.label.x = -boxW/2-boxW/6;
			} else {				
				box = makeBox("#d61fa0", "white", "white");		
				box.shape.regX = boxW/2; box.shape.regY = boxH + boxH/4;		
				box.label.y = -boxH*3/4;
			}
			
			function makeBox(fill, stroke, textColor) {
				var box = new createjs.Container();					
				box.shape = new createjs.Shape();
				box.shape.graphics.s(stroke).ss(1).f(fill).r(0,0,boxW,boxH); 
				box.shape.alpha = .9;
				box.addChild(box.shape);			
				box.label = new createjs.Text("10", "16px verdana", textColor);
				box.label.textAlign = "center";
				box.label.textBaseline = "middle";		
				box.addChild(box.label);
				box.mouseChildren = false;
				box.mouseEnabled = false;
				return box;	
			}

			// get stage and apply stagemousemove to move text boxes 			
			// the added event was added in the 2014 createjs
			// found the added did not reliably get a stage property
			// still had to wait a few microseconds
			// so resorting to interval
			// this.on("added", added); 
			var addedInterval = setInterval(function() {				
				if (obj == "stage") {
					if (that && that.getStage()) {
						added();
					}
				} else {
					if (obj && obj.getStage()) {
						added();
					}
				}
			},100);		
						
			var guideCheck = false;
			var objW;
			var objH;
			var line;
			var dragBounds;
			function added() {
				clearInterval(addedInterval);
				if (obj == "stage") {									
					stage =	that.getStage();
					obj = stage;	
				} else {
					stage =	obj.getStage();
				}	
				objW = obj.getBounds().width;
				objH = obj.getBounds().height;
				if (vertical) {						
					box.y = objH/2;				
					box.label.text = "y:" + ((that.pixels) ? Math.round(objW*70/100) : "70%");	
				} else {					
					box.x = objW/2;	
					box.label.text = "x:" + ((that.pixels) ? Math.round(objH*70/100) : "70%");
				}	
				line = new createjs.Shape();
				that.addChild(line);
				(vertical) ? line.x = objW*.7 : line.y = objH*.7;		
				
				if (!guideCheck) {
					obj.addChild(that);
					drawGuide();					
				}
				stage.off("stagemousemove", stageEvent);
				stageEvent = stage.on("stagemousemove", where);	
				stage.update();			
			};					
		
			var lastPoint = {x:0,y:0};
			function where(e) {		
				// convert mouse location to local point
				var point; var diff;
				if (e) {
					point = obj.globalToLocal(e.rawX, e.rawY);					
					lastPoint = point;
				} else {
					point = {x:lastPoint.x, y:lastPoint.y}	
				}
				if (!percent) {	// pixels	
					if (vertical) {		
						diff = Math.round(Math.abs(point.x-line.x));		
						box.label.text = "x:" + Math.max(0, Math.min(diff, Math.round(objW)));
						box.y = Math.max(minY, Math.min(point.y, maxY));
					} else {
						diff = Math.round(Math.abs(point.y-line.y));
						box.label.text = "y:" + Math.max(0, Math.min(diff, Math.round(objH)));
						box.x = Math.max(minX, Math.min(point.x, maxX));
					}
				} else {
					if (vertical) {
						diff = Math.round(Math.abs(point.x-line.x)/objW*100);
						box.label.text = "x:" + Math.max(0, Math.min(diff, 100)) + "%";
						box.y = Math.max(minY, Math.min(point.y, maxY));
					} else {
						diff = Math.round(Math.abs(point.y-line.y)/objH*100);
						box.label.text = "y:" + Math.max(0, Math.min(diff, 100)) + "%";
						box.x = Math.max(minX, Math.min(point.x, maxX));
					}
				}
				if (stage) stage.update();					
			}			
				
			// make the guide once we have the stage
			// and any time resize is called
			function drawGuide() {
				guideCheck = true;
				objW = obj.getBounds().width;
				objH = obj.getBounds().height;
				var pointer;
				if (vertical) {
					pointer = "ew-resize";
					dragBounds = new createjs.Rectangle(0,0,objW,0);
				} else {
					pointer = "ns-resize";
					dragBounds = new createjs.Rectangle(0,0,0,objH);
				}				
				zim.noDrag(line);
				setTimeout(function() {
					// give time for content to settle
					zim.drag(line, dragBounds, pointer, pointer, null, null, true);	
				}, 500);
				stage.mouseMoveOutside = true;				
				stage.enableMouseOver(10);				
					
				maxX = objW-boxW*2/3;
				maxY = objH-boxH - boxH;
				line.uncache();
				var g = line.graphics;
				if (vertical) {					
					g.c().s("rgba(0,255,255,.1)").ss(20).mt(0,0).lt(0,objH);
					g.f().s("white").ss(2).mt(0,0).lt(0,objH);
					g.s("#00c5af").ss(2).dashedLineTo(0,0,0,objH,20);
					line.cache(-10,0,20,objH);					
				} else {					
					g.c().s("rgba(255,0,255,.1)").ss(20).mt(0,0).lt(objW,0);
					g.f().s("white").ss(2).mt(0,0).lt(objW, 0);
					g.s("#d61fa0").ss(2).dashedLineTo(0,0,objW,0,20);
					line.cache(0,-10,objW,20);
				}	
				
				(vertical) ?  box.x = objW : box.y = objH;
				that.addChild(box);		
			
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
	
			// add key listener to hide and show the guide			
			window.addEventListener("keydown", keyEvent);
			
			function keyEvent(e) {				
				if (!e) e=event; 
				if (!stage) return;					
				if (String.fromCharCode(e.keyCode) == hideKey.toUpperCase()) { // G
					that.visible = !that.visible;
					stage.off("stagemousemove", stageEvent);
					if (that.visible) {
						stageEvent = stage.on("stagemousemove", where, that);
					}
					stage.update();
				}				
				if (String.fromCharCode(e.keyCode) == pixelKey.toUpperCase()) { // P
					that.pixels = !that.pixels;
				}
			}		
			
			this.resize = function() {
				if (!that) return false;
				if (stage) {					
					drawGuide();
					where();
				}
				return true;
			}
			
			this.dispose = function() {
				if (!that) return false;
				zim.noDrag(line);
				clearInterval(addedInterval);
				that.removeAllChildren();
				window.removeEventListener("keydown", keyEvent);
				if (that.parent) that.parent.removeChild(that);
				that = null;
				return true;					
			}
		}
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time	
		makeGuide.prototype = new createjs.Container();
		makeGuide.prototype.constructor = zim.Guide;	
		return new makeGuide();			
	}
		
	
/*--
zim.GuideManager = function()

GuideManager class
extends the ZIM Manager abstract class
add Zim Guide objects and update or remove all guides at once
guides are handy to use but perhaps annoying to update and remove if you have many
GuideManager keeps track of the guides and lets you update or dispose of them on command

PROPERTIES
items - an array of all Guide objects added with add()

METHODS 
add(guide) - registers a guide with the GuideManager
resize() - resizes all the guides in the GuideManager (ie. if stage changes)
dispose() - disposes all guides and the GuideManager

note: to just hide guides, you use the G key
and to toggle percent and pixels use the P key
you can dispose guides individually or use this class to dispose all
disposing will remove the G, P key listener and the guide
--*/
	zim.GuideManager = function() {
		zim.Manager.call(this, "GuideManager");		
	}	
	zim.GuideManager.prototype = new zim.Manager();
	zim.GuideManager.constructor = zim.GuideManager;
		
	
/*--
zim.Grid = function(obj, color, percent, hideKey, pixelKey)

Grid Class

extends createjs.Container
var grid = new zim.Grid(parameters);
stage.addChild(grid);
shows a grid to help layout assets with code (percent is default)
cursor x and y percentage or pixels are shown along edges 
can use G key to toggle grid visibility
can use P key to toggle percent and pixels

make sure you remove the grid for your final version (dispose)

PARAMETERS
obj - to add grid to (stage is default)
color - defaults to black
percent - defaults to true to show percent - false to show pixels
hideKey - key to press to hide grid - default G
pixelKey - key to press to swap percent and pixels - default P

PROPERTIES
pixels - boolean - set to true to change to pixels, false to go to percent

METHODS
dispose() - clears keyboard events and grid
--*/
	zim.Grid = function(obj, color, percent, hideKey, pixelKey) {		
		function makeGrid() {					
				
			if (zot(obj)) obj = "stage";
			if (zot(color)) color = "black";
			if (obj != "stage" && (!obj.getBounds || !obj.getBounds())) {zog ("zim pages - Grid(): Please provide bounds for the obj (setBounds())"); return;}
			if (zot(percent)) percent = true;
			if (zot(hideKey)) hideKey = "G";
			if (zot(pixelKey)) pixelKey = "P";
			
			var that = this;
			var stage; 			
			var pixels = 10; // for grid			
			var stageEvent;			
			this.mouseChildren = false;
			this.mouseEnabled = false;			
			
			// make text boxes that show x and y			
			var boxW = 80;
			var boxH = 26;
			
			var top = makeBox("#dddddd", color, "#333333");			
			top.shape.regX = boxW/2; top.shape.regY = -boxH/4;		
			top.label.y = boxH*3/4;	
			
			var left = makeBox("#dddddd", color, "#333333");			
			left.shape.regX = -boxW/6; left.shape.regY = boxH/2; 
			left.label.x = boxW/2 + boxW/6;	
				
			function makeBox(fill, stroke, textColor) {
				var box = new createjs.Container();					
				box.shape = new createjs.Shape();
				box.shape.graphics.s(stroke).ss(1).f(fill).r(0,0,boxW,boxH); 
				box.shape.alpha = .9;
				box.addChild(box.shape);			
				box.label = new createjs.Text("10", "16px verdana", textColor);
				box.label.textAlign = "center";
				box.label.textBaseline = "middle";		
				box.addChild(box.label);
				box.mouseChildren = false;
				box.mouseEnabled = false;
				return box;	
			}
			
			var minX = boxW/6+boxW/2;
			var minY = boxH*2
			var maxX; // set max values once we get a stage
			var maxY;
						
			top.x = minX;
			left.y = minY;
			top.label.text = "x:0";
			left.label.text = "y:0";
					

			// get stage and apply stagemousemove to move text boxes 			
			// the added event was added in the 2014 createjs
			// found the added did not reliably get a stage property
			// still had to wait a few microseconds
			// so resorting to interval
			// this.on("added", added); 
			var addedInterval = setInterval(function() {				
				if (obj == "stage") {
					if (that && that.getStage()) {
						added();
					}
				} else {
					if (obj && obj.getStage()) {
						added();
					}
				}
			},100);		
						
			var gridCheck = false;
			function added() {
				clearInterval(addedInterval);
				if (obj == "stage") {									
					stage =	that.getStage();
					obj = stage;	
				} else {
					stage =	obj.getStage();
				}			
				if (!gridCheck) {
					drawGrid();
					obj.addChild(that);
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
					point = obj.globalToLocal(e.rawX, e.rawY);					
					lastPoint = point;
				} else {
					point = {x:lastPoint.x, y:lastPoint.y}	
				}
				if (!percent) {	// pixels					
					top.label.text = "x:" + Math.max(0, Math.min(Math.round(point.x), Math.round(objW)));
					top.x = Math.max(minX, Math.min(point.x, maxX));
					left.label.text = "y:" + Math.max(0, Math.min(Math.round(point.y), Math.round(objH)));
					left.y = Math.max(minY, Math.min(point.y, maxY));
				} else {
					top.label.text = "x:" + Math.max(0, Math.min(Math.round(point.x/objW*100), 100)) + "%";
					top.x = Math.max(minX, Math.min(point.x, maxX));
					left.label.text = "y:" + Math.max(0, Math.min(Math.round(point.y/objH*100), 100)) + "%";
					left.y = Math.max(minY, Math.min(point.y, maxY));					
				}
				if (stage) stage.update();					
			}			
				
			// make the grid once we have the stage			
			var objW;
			var objH;	
			var cached;		
			function drawGrid() {
				gridCheck = true;				
				
				objW = obj.getBounds().width;
				objH = obj.getBounds().height;				
				stage.mouseMoveOutside = true;				
				stage.enableMouseOver(10);				
					
				maxX = objW-boxW*2/3;
				maxY = objH-boxH - boxH;					
				
				cached = new createjs.Container();
				that.addChild(cached);
				var grid = new createjs.Shape();
				cached.addChild(grid);				
				var g = grid.graphics;				
				g.s(color).ss(1);
				
				var grid2 = new createjs.Shape();
				cached.addChild(grid2);	
											
				
				if (!percent) { // pixels	
				
					for (var i=0; i<objW/pixels; i++) {					
						g.mt(i*pixels, 0).lt(i*pixels, objH);					
					}
					for (var i=0; i<objH/pixels; i++) {
						g.mt(0, i*pixels).lt(objW, i*pixels);
					}
					grid.alpha = .3;	
				
					g = grid2.graphics;  					
					g.s(color).ss(1);
					
					for (var i=0; i<objW/(pixels*10); i++) {					
						g.mt(i*(pixels*10), 0).lt(i*(pixels*10), objH);					
					}
					for (var i=0; i<objH/(pixels*10); i++) {
						g.mt(0, i*(pixels*10)).lt(objW, i*(pixels*10));				
					}
				
				} else { // percent - every 5 percent
					
					for (var i=1; i<20+2; i++) {					
						g.mt(i*objW/20, 0).lt(i*objW/20, objH);					
					}
					for (var i=1; i<20; i++) {
						g.mt(0, i*objH/20).lt(objW, i*objH/20);
					}
					grid.alpha = .3;	
					
					g = grid2.graphics;  
					g.s(color).ss(1);
					
					for (var i=1; i<10; i++) {					
						g.mt(i*objW/10, 0).lt(i*objW/10, objH);					
					}
					for (var i=1; i<10; i++) {
						g.mt(0, i*objH/10).lt(objW, i*objH/10);				
					}					
				}
				
				var crossSize = 80;
				g.s("#FFFFFF").ss(8);
				g.mt(objW/2, objH/2-crossSize/2).lt(objW/2, objH/2+crossSize/2);
				g.mt(objW/2-crossSize/2, objH/2).lt(objW/2+crossSize/2, objH/2);
				
				g.s("#000000").ss(4);
				g.mt(objW/2, objH/2-crossSize/2).lt(objW/2, objH/2+crossSize/2);
				g.mt(objW/2-crossSize/2, objH/2).lt(objW/2+crossSize/2, objH/2);
				
				// draw a border
				g.s(color).ss(3);
				g.dr(0,0,objW,objH);				
				
				grid2.alpha = .5;				
				cached.cache(0,0,objW,objH);
				
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
				if (String.fromCharCode(e.keyCode) == hideKey.toUpperCase()) { // G
					that.visible = !that.visible;
					stage.off("stagemousemove", stageEvent);
					if (that.visible) {
						stageEvent = stage.on("stagemousemove", where, that);
					}
					stage.update();
				}				
				if (String.fromCharCode(e.keyCode) == pixelKey.toUpperCase()) { // P
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
				window.removeEventListener("keydown", keyEvent);	
				if (that.parent) that.parent.removeChild(that);
				that = null;
				
			}
			
		}		
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time	
		makeGrid.prototype = new createjs.Container();
		makeGrid.prototype.constructor = zim.Grid;	
		return new makeGrid();			
	}
	

/*--
zim.GridManager = function()

GridManager class
add Zim Grid objects and update or remove all grids at once
grids are handy to use but perhaps annoying to update and remove if you have many
GridManager keeps track of the grids and lets you update or dispose of them on command

PROPERTIES
items - an array of all Grid objects added with add()

METHODS 
add(grid) - registers a grid with the GridManager
resize() - resizes all the grids in the GridManager (ie. if stage changes)
dispose() - disposes all grids and the GridManager

note: to just hide grids, you use the G key
and to toggle percent and pixels use the P key
you can dispose grids individually or use this class to dispose all
disposing will remove the G key listener and the grid
--*/	
	zim.GridManager = function() {		
		zim.Manager.call(this, "GridManager");
	}	
	zim.GridManager.prototype = new zim.Manager();
	zim.GridManager.constructor = zim.GridManager;	


/*--
zim.Layout = function(holder, regions, lastMargin, backgroundColor, vertical, regionShape, scalingObject, hideKey) 

Layout class

extends a createjs.EventDispatcher so it can dispatch events
arranges objects on the page by fitting them in regions
make a layout object for each page if desired
and even nest layout objects inside regions
fixed aspect ratio content is fit into regions
good for flexive design where you anchor titles and navigation
handles any number of regions vertically or horizontally	
var layout = zim.Layout(parameters) 	

PARAMETERS
the holder object (stage, container, etc) that must have bounds set
the bounds will constrain the layout
an array of region objects with specific properties for each
example - with all dimensions as percents

Example VERTICAL region objects
[ {object:title, marginTop:10, maxWidth:80, minHeight:20, align:"left", valign:"top"}
{object:content, marginTop:5, maxWidth:90} // note, middle gets no minHeight
{object:nav, marginTop:5, maxWidth:80, height:20, backgroundColor:"red"} ]
note: no minHeight for middle regions - but heights on any region
align defaults to middle for the regions
valign defaults to top and bottom for the top and bottom region and middle for the others
backgroundColor applies a backing color to the region

Example HORIZONTAL region objects
{object:col1, marginLeft:10, maxHeight:80, width:20, valign:"bottom"}
{object:col2, marginLeft:5, maxHeight:90, align:"middle"} // note, middle gets no minWidth
{object:col3, marginLeft:5, maxHeight:80, minWidth:20, align:"left", valign:"top"}	
align defaults to left and right for the outer regions and middle for the inside regions
valign defaults to top for all the regions	

PARAMETERS CONT'D
lastMargin - the margin at the bottom (vertical) or at the right (horizontal) defaults to 0
backgroundColor - for the whole holder - defaults to ""
vertical - boolean defaults to true for vertical layout (set to false for horizontal)
regionShape - a createjs Shape object to show where bounds are (optional) (added to holder)
can toggle on and off with B key - but must pass in the Shape to use the B key
scalingTarget - an object used as the bounds of the region scaling
setting a scalingTarget will also set the bounds of the holder to the scalingTarget bounds
it does not scale the holder - only scales the region objects inside
hideKey is the hot key for hiding and showing the bounds - default B

METHODS
resize() - resize based on new bounds of the holder (or scalingObject)
dispose() - removes the B key listener (otherwise, nothing to dispose)
addShape(shape) - adds a bounding shape dynamically
removeShape() - permanently removes the bounding shape
disable() - disables all the layout (shape and sizing)
enable() - enables all the layout (shape and sizing)	
if you want to get rid of the objects then you need to do so in your app

DESCRIPTION OF FLEXIVE DESIGN
here described with vertical layout - horizontal is similar but rotated 90

the content in the middle will try and expand against the top and bottom
until it forces the top and bottom to their minimum percents
if the content hits its maximum width percent first then the top and bottom
will fill up the rest of the height until they reach their maximum widths	
--*/	
	zim.Layout = function(holder, regions, lastMargin, backgroundColor, vertical, regionShape, scalingObject, hideKey) {
		function makeLayout() {
			// if (zon) zog ("zim pages - Layout()");						
			if (zot(holder) || !holder.getBounds) {zog ("zim pages - Layout(): please provide an object with bounds set that holds the objects being laid out"); return;}			
			scalingObject = (zot(scalingObject)) ? holder : scalingObject;
			if (!scalingObject.getBounds || !scalingObject.getBounds()) {zog ("zim pages - Layout(): holder must have bounds set or provide a scalingObject with bounds"); return;}			
			var bounds = scalingObject.getBounds();
			holder.setBounds(0,0,bounds.width,bounds.height);
			// note, Layout sets bounds of holder but does not scale the holder - only the objects in regions
			// it may be that the holder is scaled by some external process
			// but probably not if a scalingObject is used
	
			if (zot(lastMargin)) lastMargin = 0;
			if (zot(vertical)) vertical = true;
			if (zot(backgroundColor)) backgroundColor = "";
			if (zot(hideKey)) hideKey = "B";
			zim.dashedLinesOn(); // turns on dashed lines for bounds
			var backing = new createjs.Shape(); // holds any backing colors
			var that = this;
			this.active = true;
			
			// loop through region objects and assign defaults
			// also check that regions can fit with values given
			// we basically do the same thing with horizontal and vertical layouts
			// but obviously one uses widths and the other heights, etc.
			// so adapted generic phrases of PRIMARY and SECONDARY
			// primary for vertical is in the Y direction and uses height and top  
			// primary for horizontal is in the X direction and uses width and left
			// secondary for vertical is X and for horizontal is Y
			// min, absolute and margin values are only available in the primary
			// max values are only available in the secondary
			// align, valign and backgroundcolor is available for primary and secondary
			// absolute values (height, width) are to be used if given
			// if not given we try to maximize size and to adhere to min values
			// as calculations progress we calculate given, maxGiven and marginGiven values
			// these are temporary depending on the resizing and are always in the primary direction
			// secondary direction is quite simple
			// primary direction is quite complex involving a number of steps and even some recursion
			
			var r; // used to hold a region in a loop
			var totalAbsolute = 0;
			var minPrimary = "minWidth";
			var primary = "width";
			var secondary = "height";
			var marginPrimary = "marginLeft";
			var maxSecondary = "maxHeight";
			var axisPrimary = "x";
			var axisSecondary = "y";			
			if (vertical) {
				minPrimary = "minHeight";
				primary = "height";
				secondary = "width";
				marginPrimary = "marginTop";
				maxSecondary = "maxWidth";
				axisPrimary = "y";
				axisSecondary = "x";
			}
			for (var i=0; i<regions.length; i++) {
				r = regions[i];
				if (!r.object || !r.object.getBounds()) {zog("zim pages - Layout(): each region object must have an object with setBounds() set"); return;}
				if (!r[minPrimary]) r[minPrimary] = 0;
				if (!r[primary]) r[primary] = 0;
				if (!r.backgroundColor) r.backgroundColor = "";
				r.given = 0;
				r.maxGiven = 0;
				if (!r[marginPrimary]) r[marginPrimary] = 0;
				if (!r[maxSecondary]) r[maxSecondary] = 100;
				if (vertical) {
					// default alignment differs for orientation
					if (!r.align) r.align = "middle";
					if (!r.valign) {
						if (i==0) {r.valign = "top";}
						else if (i==regions.length-1) {r.valign = "bottom";}
						else {r.valign = "middle";}
						if (regions.length == 1) {r.valign = "middle"}
					}
				} else {
					if (!r.valign) r.valign = "top";
					if (!r.align) {
						if (i==0) {r.align = "left";}
						else if (i==regions.length-1) {r.align = "right";}
						else {r.align = "middle";}
						if (regions.length == 1) {r.align = "middle"}
					}
				}
				if (r[primary]) r[minPrimary] = 0; // primary overrides minPrimary
				totalAbsolute += r[primary] + r[marginPrimary];	
			}
			
			// primaries (not minPrimaries) are absolute percentage and are kept no matter what
			// margins are absolute percentage and are kept no matter what
			// check if primaries and margins are more than 100%
			totalAbsolute += lastMargin;
			if (totalAbsolute > 100) {zog("zim pages - Layout(): cannot fit regions into 100% bounds"); return;}
			var leftOverPrimary = 100-totalAbsolute;
			
			distribute(); // also called from within resize function
			function distribute() {
				// distribute leftOverPrimary to any regions without a primary or a given (primary)
				// proportion based on primary dimension of objects in regions
				// apply this primary to given (primary)
				var totalPrimaries = 0;
				for (var i=0; i<regions.length; i++) {
					r = regions[i];
					r.given = 0;
					if (r[primary] == 0) totalPrimaries += r.object.getBounds()[primary];
				}
				// now we know total raw heights of objects needing height applied
				// loop back through and give these objects their proportion of what is left
				for (var i=0; i<regions.length; i++) {
					r = regions[i];
					if (r[primary] == 0) r.given = r.object.getBounds()[primary] / totalPrimaries * leftOverPrimary;			
				}
			}
			
			this.resize = function() {
				if (!that.active) return;
				bounds = scalingObject.getBounds();
				holder.setBounds(0,0,bounds.width,bounds.height);
				backing.graphics.clear();
				if (backgroundColor!="") backing.graphics.f(backgroundColor).r(0,0,bounds.width,bounds.height);
					
				for (var i=0; i<regions.length; i++) {
					r = regions[i];
					r.maxGiven = 0;	
					r.marginGiven = 0;
				}		
				// all the primaries are applied 
				// but some objects might not need the primary because they have maxed out on maxSecondary
				// we need to give this extra primary back to the pool 
				// and keep doing it until there are no more maxed objects
				
				var keepGoing = true; var allCheck; var giveBack; 
				var p; var s; var boundsP; var boundsS; var maxGiven;
				var leftOverPrimary2 = leftOverPrimary;
				while (keepGoing) {
					// check for objects maxed in width
					giveBack = 0;
					keepGoing = false; allCheck = true;
					// we want to keep going unless all objects are maxed
					// or none of the objects are maxed
					for (var i=0; i<regions.length; i++) {
						r = regions[i];				
						if (r.given > 0 && r.maxGiven == 0) {					
							p = r.object.getBounds()[primary];
							s = r.object.getBounds()[secondary];
							boundsP =  r.given * bounds[primary]/100;
							boundsS =  r[maxSecondary] * bounds[secondary]/100; // convert to pixels
							maxGiven = s/p*boundsP;
							if (maxGiven > boundsS) {
								// maxed out so give back height
								keepGoing=true;
								// store this as maxGiven property
								// might have to take it away if later minHeights are not met
								r.maxGiven = p/s*boundsS * 100/bounds[primary]; // convert back to percentage
								giveBack += r.given - r.maxGiven;
								leftOverPrimary2 -= r.maxGiven;
							} else {
								allCheck = false;
							}
						}
					}
					
					if (!keepGoing) break;
					if (allCheck) break;
					
					// redistribute the extra stuff too all that are not maxed out and not with primary values
					// proportion based on primary dimension of objects in regions
					// apply this primary to given (primary)
					totalPrimaries = 0;
					for (var i=0; i<regions.length; i++) {
						r = regions[i];
						if (r[primary] == 0 && r.maxGiven == 0) totalPrimaries += r.object.getBounds()[primary];
					}
					// now we know total raw heights of objects needing height applied
					// loop back through and give these objects their proportion of what is left
					for (var i=0; i<regions.length; i++) {
						r = regions[i];
						if (r[primary] == 0 && r.maxGiven == 0) r.given = r.object.getBounds()[primary] / totalPrimaries * leftOverPrimary2;
					}			
				}			
	
				// if end regions have not met their minPrimaries
				// set those minPrimaries to primaries and resize again
				// divide leftover primary to regions with no set primary
				// maximize middle regions as this is usually content
				// if the edge regions have minPrimaries set them to minPrimary
				// if they do not have minPrimaries then proportion them equally with the rest
				
				var scaleCheck = true;
				r = regions[0];
				if (r.maxGiven > 0) {
					 if (r.maxGiven < r[minPrimary]) {r[primary] = r[minPrimary]; scaleCheck = false;}
				} else if (r.given > 0) {
					 if (r.given < r[minPrimary]) {r[primary] = r[minPrimary]; scaleCheck = false;}
				}
				r = regions[regions.length-1];
				if (r.maxGiven > 0) {
					 if (r.maxGiven < r[minPrimary]) {r[primary] = r[minPrimary]; scaleCheck = false;}
				} else if (r.given > 0) {
					 if (r.given < r[minPrimary]) {r[primary] = r[minPrimary]; scaleCheck = false;}
				}
				if (!scaleCheck) {
					// recalculate leftOverPrimary
					totalAbsolute = 0;
					for (var i=0; i<regions.length; i++) {
						r = regions[i];
						totalAbsolute += r[primary] + r[marginPrimary];	
					}
					totalAbsolute += lastMargin;
					if (totalAbsolute > 100) {zog("zim build - Layout(): cannot fit regions into 100% bounds"); return;}
					
					leftOverPrimary = 100-totalAbsolute;
					distribute();
					that.resize();
					return;
				}
				
			
				// if specified all primaries or all maxed in secondary
				// then distribute based on inner margins
				// watch out - may need to revert to original margins if page is resized
				// so introduce a new marginGiven property
			
				var allHeights = true; var marginTotal = 0; var primaryTotal = 0;
				for (var i=0; i<regions.length; i++) {
					r = regions[i];
					marginTotal += r[marginPrimary];
					if (r[primary] > 0) primaryTotal += r[primary];
					else if (r.maxGiven > 0) primaryTotal += r.maxGiven;
					else if (r.given > 0) primaryTotal += r.given;
					if (r[primary] == 0) {
						allHeights = false;
					}
				}			
				if (allHeights || allCheck) {
					marginTotal += lastMargin;
					var extra = 100-primaryTotal-marginTotal;
					// remove two outer margins
					marginTotal -= (lastMargin + regions[0][marginPrimary]);
					if (extra != 0 && marginTotal != 0) { // divide up extra margin space
						for (var i=0; i<regions.length; i++) {
							if (i==0) continue;
							r = regions[i];
							r.marginGiven = r[marginPrimary]/marginTotal*(marginTotal+extra);
						}
					}
				}					
			
				// ready to fit objects into regions, align and draw any bounds and background colors
				var pPos=0; // primary position (x for horizontal, y for vertical)
				var sPos=0; // secondary position			
				var p;  	// primary dimension (width for horizontal, height for vertical)
				var s;		// secondary dimension
				var f; 		// fit variable will receive a handy object with new data and original region bounds data
							// {x:obj.x, y:obj.y, width:newW, height:newH, scale:scale, bX:left, bY:top, bWidth:width, bHeight:height}
				
				var addedW; var addedH;	// just a little offscreen coloring to help page transitions		
				if (regionShape && regionShape.graphics) {
					var g = regionShape.graphics;				
					g.c();
				}
				for (var i=0; i<regions.length; i++) {
					r = regions[i];
					
					// calculate primary data
					if (r.marginGiven > 0) pPos += r.marginGiven * bounds[primary]/100; // convert to pixels
					else pPos += r[marginPrimary] * bounds[primary]/100;				
					if (r[primary] > 0) {p = r[primary];}
					else if (r.maxGiven > 0) {p = r.maxGiven;}
					else if (r.given > 0) {p = r.given;}
					else {p = 0;}
					p = p * bounds[primary]/100;
					
					// calculate secondary data
					s = r[maxSecondary] * bounds[secondary]/100;
					sPos = (bounds[secondary]-s)/2;
					
					// fit the objects into the region, align and draw any regionShape
					// this is slightly different for different orientations
					if (vertical) f = zim.fit(r.object,sPos,pPos,s,p);
					else f = zim.fit(r.object,pPos,sPos,p,s);
					
					// handle alignment
					if (r.valign == "top") r.object.y = f.bY;	
					else if (r.valign == "bottom") r.object.y = f.bY+f.bHeight-f.height;	
					if (r.align == "left") r.object.x = f.bX;	
					else if (r.align == "right") r.object.x = f.bX+f.bWidth-f.width;
					if (regionShape && regionShape.graphics) {
						g.s("white").ss(2).r(f.bX,f.bY,f.bWidth,f.bHeight);
						g.s("#ff8203").ss(2).drawDashedRect(f.bX,f.bY,f.bWidth,f.bHeight,20);
					}	
						
					// draw any backing colors for region
					// transitions in ZIM Pages need a little extra overlap on page edges
					addedH = addedW = 0;
					if (pPos == 0 || (pPos+p) == bounds[primary]) if (vertical) {addedH=1} else {addedW=1};						
					if (s == bounds[secondary]) if (vertical) {addedW=1} else {addedH=1};
					if (r.backgroundColor != "") backing.graphics.f(r.backgroundColor).r(f.bX, f.bY, f.bWidth+addedW, f.bHeight+addedH);
				
					// increase our primary position
					pPos += p;				
				}
			}
			
			this.resize();
			
			// add regionShape if there is one and backing shape
			if (regionShape) holder.addChild(regionShape);						
			holder.addChildAt(backing,0);			
				
			// key listener and other methods:
				
			// add key listener to hide and show the bounds				
			window.addEventListener("keydown", keyEvent);			
			function keyEvent(e) {				
				if (!e) e=event; 								
				if (regionShape) {					
					if (String.fromCharCode(e.keyCode) == hideKey.toUpperCase()) { // B
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
				that.resize();
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
	

/*--
zim.LayoutManager = function()

LayoutManager class

add Zim Layout objects and update them all at once
also can remove all layout region bound shapes at once
as well as remove the B key to show the region bound shapes
for a final project, call the dispose()
this will remove all shapes and key events
the layouts will remain in place to handle multiple screen sizes

PROPERTIES
items - an array of all Layout objects added with add()

METHODS 
add(layout) - registers a layout with the LayoutManager
resize() - resizes all the layouts in the LayoutManager
disable() - disables all the layouts in the LayoutManager (shapes and sizing)
enable() - enables all the layouts in the LayoutManager (shapes and sizing)
dispose() - only removes bounds shapes and keyboard events (does not really dispose)

note: to just hide bounds, you use the B key
--*/	
	zim.LayoutManager = function() {		
		if (zon) zog("zim pages - LayoutManager");
		var that = this;
		this.items = [];
		this.add = function(layout) {
			that.items.push(layout);
		}
		this.resize = function() {			
			for (var i=0; i<that.items.length; i++) {
				that.items[i].resize();	
			}	
		}
		this.disable = function() {			
			for (var i=0; i<that.items.length; i++) {							
				that.items[i].disable();	
			}
		}
		this.enable = function() {
			for (var i=0; i<that.items.length; i++) {
				that.items[i].enable();	
			}
		}
		
		this.dispose = function() {
			for (var i=0; i<that.items.length; i++) {
				that.items[i].removeShape(); // also removes key events
			}
		}		
	}	
	
	return zim;
} (zim || {});
} 