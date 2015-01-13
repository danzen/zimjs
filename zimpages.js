// ZIM js Interactive Media modules by Dan Zen http://danzen.com (c) 2014
// zimpages.js helps you layout and control flexive pages, click and swipe between pages and more http://zimjs.com
// free to use - donations welcome of course! http://zimjs.com/donate
// classes in this module require createjs namespace to exist and in particular easel.js
// available at http://createjs.com
// (borrows zim.arraysEqual (zimcode), zim.animate and zim.fit (zimcreate))

if (typeof zog === "undefined") { // bootstrap zimwrap.js
	document.write('<script src="http://d309knd7es5f10.cloudfront.net/zimwrap_1.2.js"><\/script>');
	document.write('<script src="http://d309knd7es5f10.cloudfront.net/zimpages_1.2.js"><\/script>');
} else {

var zim = function(zim) {
	
	if (zon) zog("ZIM PAGES Module");	
	
	// Swipe class
	
	// extends a createjs.EventDispatcher so it can dispatch events
	// sets up capturing swipes on objects
	// dispatches a "swipe" event on swipe left, right, up, down
	// var s = zim.Swipe(parameters) 	
		
	// PARAMETERS
	// pass into the object the object you want to swipe on
	// then an optional distance to activate swipe (100 pixel default)
	// and an optional time to travel that distance (200 ms default)
			
	// PROPERTIES
	// direction - the direction of the last swipe (left, right, up, down or none)
	// obj - the object that was last swiped
	
	// EVENTS
	// dispatches a "swipe"	event on every pressup (even if swipe failed and direction is none)
	// when a swipe event triggers
	// the Swipe object provides a direction property of "left", "right", "up", or "down"
	// the Swipe object provides an obj property of what object was swiped on
	// for instance if e is the event object
	// then e.target is the Swipe object so use e.target.direction
	// did not dispatch a custom event due to lack of support in early IE
	// Swipe also dispatches a direction of "none" if the mouse movement is not a swipe
	// this can be used to snap back to an original location		
	
	zim.Swipe = function(obj, distance, duration) {
		function makeSwipe() {
			if (zot(obj)) {zog("zimcreate.js Swipe():\nPlease pass in object"); return;}
			if (zot(distance)) distance = 100; // pixels for swipe to count
			if (zot(duration)) duration = 200; // ms to test pixels
			
			var startX;
			var startY;	
			var mouseX;
			var mouseY;
			var downCheck;
			var timer;
			var that = this;	
			
			obj.on("mousedown", function(e) {
				that.obj = e.target; 
				startX = e.stageX;
				startY = e.stageY;
				downCheck = true;	
				clearTimeout(timer);			
				timer = setTimeout(function() {
					if (downCheck) {
						// may as well use 45 degrees rather than figure for aspect ratio
						if (Math.abs(mouseX - startX) > Math.abs(mouseY - startY)) {
							if (mouseX - startX > distance) {that.direction="right"; that.dispatchEvent("swipe"); downCheck=false;}	
							if (startX - mouseX > distance) {that.direction="left"; that.dispatchEvent("swipe"); downCheck=false;}
						} else {
							if (mouseY - startY > distance) {that.direction="down"; that.dispatchEvent("swipe"); downCheck=false;}
							if (startY - mouseY > distance) {that.direction="up"; that.dispatchEvent("swipe"); downCheck=false;}
						}
					}				
				}, duration);
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
		}
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time	
		makeSwipe.prototype = new createjs.EventDispatcher();
		makeSwipe.prototype.constructor = zim.Swipe;	
		return new makeSwipe();
	}
		
	
	// borrowed from zimcreate.js	
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
	
	// borrowed from zimcreate.js
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
	
	// borrowed from zimcode.js
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
		
	
	// Pages Class
			
	// Pages extends the createjs Container - so you stage.addChild(myPages)				
	// handles going between pages
	// make a var myPages = new zim.Pages() object 
	// all your pages from then on are added to and manipulated inside the Pages object
	// Pages allows you to set the destination pages for swipe events
	// other events like buttons can call the go(page, direction) method
	// consider using zim.HotSpots() to efficiently handle multiple buttons
	
	// PARAMETERS
	// pass in the holder object (ie. stage) so we can set various transition animation parameters
	// pass in an array of page objects - for example:	
	// [{page:home, swipe:[null,"info",hide,find]},{page:hide, swipe:[null,null,null,home]}]
	// the pages should be containers - it helps to give them each a name property
	// the optional swipe array holds mappings to swipe events ["right", "left", "down", "up"]
	// in otherwords, these could be pages to the left, right, top and bottom of the current page
	// or they can call commands as strings
	// pass in the type of transition "reveal", "slide", "fade", "black", "white" or the default: "none"
	// and a speed in miliseconds
	// finally an optional transitionTable (read the property below for format)

	// METHODS
	// addPage() - lets you alternatively add pages after you create the object
	// removePage() - lets you remove a page (if on this page, call a go() first and remove on the page event)
	// setSwipe() - lets you set the swipe array for a page
	// go(newPage, direction, trans, ms) - lets you go to a page for events other than swipe events	
	// trans and ms are optional and will override any previously set transitions (speed in ms)
	// pause() - pauses a transition before it starts (call from swipe event)
	// unpause() - unpauses a paused transition (unless another go() command is called)
	// puff(time) - adds all the pages behind the currentPage (time (ms) auto calls settle)
	// settle() - removes all pages except the currentPage
	// disable() - stops swipe from activating and sets active = false
	// enable() - enables swipe action and sets active = true
	// dispose() - clears your listeners and pages
		
	// PROPERTIES
	// speed - of transitions in ms
	// transitionTable - [[fromPage, toPage, "transiton", ms(optional)], etc.] overrides default transition
	// page - the current page object (read)
	// lastPage - the last page before transition (read)
	// direction - direction of transition (read)
	// active - default true, boolean to have swipes active (good for layered Pages objects)

	// EVENTS
	// for the data above, swiping the home page down automatically goes to the hide page
	// if the home page is swiped up it automatically goes to the find page	
	// Pages dispatches a "swipe" event before changing pages if swiped
	// you can then get pages.page, pages.nextPage and pages.direction
	// you can pause() if needed the transition to handle data, etc. and then unpause() 
	// you do not need to handle going to another page when swiping - that is handled automatically
	// so you probably will not use the swipe event unless handling data between pages
	// Pages dispatches a "page" event when you pass in a page object in the swipe array
	// myPages.on("page",function(e){...})
	// with myPages.page being set to the new page (e.target.page)
	// and myPages.oldPage being set to the old page (e.target.page)
	// myPages.direction gets the direction of the transition (e.target.direction)
	// if there is a string in the swipe array like "info"
	// then the zim.Pages() object dispatches an event equivalant to the string
	// for the data example above, myPages.on("info",function(e){...});
	// would trigger when the home page is swiped to the left
	// Pages also dispatches a "pageTransitioned" event when a transition is complete
	// you will have the same properties available as with the page event
		
	// the first page object is the start page
	// you can add pages with the addPage() method 
	// it will not show until you swipe or go to it - unless it was the first page added
	// once again - do not add the pages to the stage yourself - let Pages do it for you
	// just add the pages object to the stage.  Pages is designed for full stage
	// if you want pages within a smaller area - consider using two canvas tags
	
	zim.Pages = function(holder, pages, transition, speed, transitionTable) {
		
		function makePages() {
		
			if (!holder.getBounds()) {zog("zimbuild.js Pages():\nobject must have bounds set"); return;}
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
			
			var swipe = new zim.Swipe(holder);

			// handle giving swipe event time to trigger event and provide code intervention
			var pauseInfo;
			var paused = false;	
				
			var swipeEvent = swipe.on("swipe", function(e) {
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
			
			this.puff = function(miliseconds) {
				// add all pages to the holder behind current page
				// if miliseconds then this is the time to settle automatically
				for (var i=0; i<pages.length; i++) {
					that.addChild(pages[i].page);	
				}	
				that.addChild(currentPage);
				if (miliseconds > 0) {
					setTimeout(function() {
						that.settle();
					}, miliseconds);
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
				swipe.off("swipe", swipeEvent);
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
	
	
	// HotSpots Class
	
	// extends a createjs.Container
	// puts an invisible click area (hotSpot) on pages
	// or specify an object and it will turn that into a hotspot
	// var hs = new zim.HotSpots();

	// PARAMETERS
	// you pass in an array of hotspot data objects:
	// [{page:home, rect:[190,50,260,260], call:someFunction}, 
	//  {page:home, rect:[70,405,500,150], call:someOtherFunction}]
	// the page should be a createjs Container
	// the rect is the [left, right, width, height] of a rectangle relative to the stage
	// call is the callback function to call when a hotSpot is clicked
	// instead of a rect array you can pass an object that must have setBounds() set
	// [{page:home, rect:submitButton, call:function(){//code}}]
	// the hotSpot will then use the button position and bounds as the rectangle
	// this allows you to manage all your button presses from one place
	// note - in this case, HotSpots will actually add a click event to the button
	// the second parameter local defaults to true
	// and should be used when the element scale independently from the stage
	// in local mode you must add coordinates of the hotSpot inside its container
	// if set to false then you pass in global coordinates and hotSpot will convert them
	// the third parameter is whether you want mouseDowns on the hotSpots
	// this defaults to false to prevent users from activating a swipe on a button (when using ZIM Swipe)
			
	// METHODS
	// show() - shows the hotspots for testing during authoring time
	// hide() - hides the hotspots
	// addHotSpot(page,rect,call) - can dynamically add hotSpots
	// removeHotSpots(page,id) - id is optional - so can remove all spots on a page
	// dispose() - removes listeners
	
	// note, the class does actually add rectangle shapes to your page
	// these have an alpha of .01
	// this could have been done with "math" alone but rollover cursor would be a pain
	// the class creates zim.HotSpot objects - see the class underneath this one
	
	zim.HotSpots = function(spots, local, mouseDowns) {
		function makeHotSpots() {
			
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
						zog("ZIM Build() :: HotSpot "+ data.page + " " + data.rect +" button does not exist");
						return;	
					}
					if (!button.getBounds()) {
						zog("ZIM Build() :: HotSpots button needs bounds");
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
	
	// HotSpot Class
	
	// adds an invisible button to a container object (often think of this as the page)
	// var hs = new zim.HotSpot();
	// if you want multiple spots it is more efficient to use the HotSpots class above
	// which manages multiple HotSpot objects (otherwise you end up with multiple event functions)
	// the spot actually keeps an alpha of .01
	// the spot will get a cursor of "pointer"
	
	// PARAMETERS
	// the container object in which to place the hotspot
	// the x, y, width and height of the hotspot relative to the stage
	// call is the function to call when the spot is clicked
	// local defaults to true and should be used when the element scale independently from the stage
	// in local mode you must add coordinates of the hotSpot inside its container
	// if set to false then you pass in global coordinates and hotSpot will convert them
		
	// METHODS	
	// show() - helps when creating the spot to see where it is
	// hide() - hides the hotspot
	// dispose() - removes the listener and the spot
	
	// PROPERTIES
	// spot - the actual hotSpot object that gets added to the container can be accessed with the spot property
	// eg. hs.spot
	
	
	zim.HotSpot = function(obj,x,y,w,h,call,local) {		
		function makeHotSpot() {			
			if (zot(obj)) {zog("zimbuild.js HotSpot():\nPlease pass in object"); return;}
			if (obj instanceof createjs.Container == false) zog("zimbuild.js HotSpot():\nObjects passed in should be Containers");
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
		
	
	// Grid Class
	
	// extends createjs.Container
	// var grid = new zim.Grid(parameters);
	// stage.addChild(grid);
	// shows a grid to help layout assets with code (percent is default)
	// cursor x and y percentage or pixels are shown along edges 
	// can use G key to toggle grid visibility
	// can use P key to toggle percent and pixels
	
	// make sure you remove the grid for your final version (dispose)
	
	// PARAMETERS
	// object - to add grid to (stage is default)
	// color - defaults to black
	// percent - defaults to true to show percent - false to show pixels
	
	// PROPERTIES
	// pixels - boolean - set to true to change to pixels, false to go to percent
	
	// METHODS
	// dispose() - clears keyboard events and grid
	
	
	zim.Grid = function(object, color, percent) {		
		function makeGrid() {					
				
			if (zot(object)) object = "stage";
			if (zot(color)) color = "black";
			if (object != "stage" && !object.getBounds()) {zog ("zimbuild.js Grid(): Please provide bounds for the object (setBounds())"); return;}
			if (zot(percent)) percent = true;
			
			var that = this;
			var stage; 			
			var pixels = 10; // for grid			
			var stageEvent;			
			this.mouseChildren = false;
			this.mouseEnabled = false;			
			
			// make text boxes that show x and y			
			var boxW = 80;
			var boxH = 26;
			
			var top = new createjs.Container();						
			var topBox = new createjs.Shape();
			topBox.graphics.s(color).ss(1).f("#dddddd").r(0,0,boxW,boxH);
			topBox.regX = boxW/2; topBox.regY = -boxH/4;
			topBox.alpha = .9;
			top.addChild(topBox);			
			var topText = new createjs.Text("10", "16px verdana", "#333333");
			topText.textAlign = "center";
			topText.textBaseline = "middle";	
			topText.y = boxH*3/4;		
			top.addChild(topText);			
			
			var left = new createjs.Container();					
			var leftBox = new createjs.Shape();
			leftBox.graphics.s(color).ss(1).f("#dddddd").r(0,0,boxW,boxH);
			leftBox.regX = -boxW/6; leftBox.regY = boxH/2; 
			leftBox.alpha = .9;
			left.addChild(leftBox);			
			var leftText = new createjs.Text("10", "16px verdana", "#333333");
			leftText.textAlign = "center";
			leftText.textBaseline = "middle";	
			leftText.x = boxW/2 + boxW/6;		
			left.addChild(leftText);	
			
			var minX = boxW/6+boxW/2;
			var minY = boxH*2
			var maxX; // set max values once we get a stage
			var maxY;
						
			top.x = minX;
			left.y = minY;
			topText.text = "x:0";
			leftText.text = "y:0";							

			// get stage and apply stagemousemove to move text boxes 			
			// the added event was added in the 2014 createjs
			// found the added did not reliably get a stage property
			// still had to wait a few microseconds
			// so resorting to interval
			// this.on("added", added); 
			var addedInterval = setInterval(function() {				
				if (object == "stage") {
					if (that && that.getStage()) {
						added();
					}
				} else {
					if (object && object.getStage()) {
						added();
					}
				}
			},100);		
						
			var gridCheck = false;
			function added() {
				clearInterval(addedInterval);
				if (object == "stage") {									
					stage =	that.getStage();
					object = stage;	
				} else {
					stage =	object.getStage();
				}			
				if (!gridCheck) {
					drawGrid();
					object.addChild(that);
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
					point = object.globalToLocal(e.rawX, e.rawY);					
					lastPoint = point;
				} else {
					point = {x:lastPoint.x, y:lastPoint.y}	
				}
				if (!percent) {	// pixels					
					topText.text = "x:" + Math.max(0, Math.min(Math.round(point.x), Math.round(objectW)));
					top.x = Math.max(minX, Math.min(point.x, maxX));
					leftText.text = "y:" + Math.max(0, Math.min(Math.round(point.y), Math.round(objectH)));
					left.y = Math.max(minY, Math.min(point.y, maxY));
				} else {
					topText.text = "x:" + Math.max(0, Math.min(Math.round(point.x/objectW*100), 100)) + "%";
					top.x = Math.max(minX, Math.min(point.x, maxX));
					leftText.text = "y:" + Math.max(0, Math.min(Math.round(point.y/objectH*100), 100)) + "%";
					left.y = Math.max(minY, Math.min(point.y, maxY));					
				}
				if (stage) stage.update();					
			}			
				
			// make the grid once we have the stage			
			var objectW;
			var objectH;	
			var cached;		
			function drawGrid() {
				gridCheck = true;				
				
				objectW = object.getBounds().width;
				objectH = object.getBounds().height;				
				stage.mouseMoveOutside = true;				
				stage.enableMouseOver(10);				
					
				maxX = objectW-boxW*2/3;
				maxY = objectH-boxH;					
				
				cached = new createjs.Container();
				that.addChild(cached);
				var grid = new createjs.Shape();
				cached.addChild(grid);				
				var g = grid.graphics;				
				g.s(color).ss(1);
				
				var grid2 = new createjs.Shape();
				cached.addChild(grid2);				
				
				if (!percent) { // pixels	
				
					for (var i=0; i<objectW/pixels; i++) {					
						g.mt(i*pixels, 0).lt(i*pixels, objectH);					
					}
					for (var i=0; i<objectH/pixels; i++) {
						g.mt(0, i*pixels).lt(objectW, i*pixels);
					}
					grid.alpha = .3;	
				
					g = grid2.graphics;  					
					g.s(color).ss(1);
					
					for (var i=0; i<objectW/(pixels*10); i++) {					
						g.mt(i*(pixels*10), 0).lt(i*(pixels*10), objectH);					
					}
					for (var i=0; i<objectH/(pixels*10); i++) {
						g.mt(0, i*(pixels*10)).lt(objectW, i*(pixels*10));				
					}
				
				} else { // percent - every 5 percent
					
					for (var i=1; i<20+2; i++) {					
						g.mt(i*objectW/20, 0).lt(i*objectW/20, objectH);					
					}
					for (var i=1; i<20; i++) {
						g.mt(0, i*objectH/20).lt(objectW, i*objectH/20);
					}
					grid.alpha = .3;	
					
					g = grid2.graphics;  
					g.s(color).ss(1);
					
					for (var i=1; i<10; i++) {					
						g.mt(i*objectW/10, 0).lt(i*objectW/10, objectH);					
					}
					for (var i=1; i<10; i++) {
						g.mt(0, i*objectH/10).lt(objectW, i*objectH/10);				
					}					
				}
				
				var crossSize = 80;
				g.s("#FFFFFF").ss(8);
				g.mt(objectW/2, objectH/2-crossSize/2).lt(objectW/2, objectH/2+crossSize/2);
				g.mt(objectW/2-crossSize/2, objectH/2).lt(objectW/2+crossSize/2, objectH/2);
				
				g.s("#000000").ss(4);
				g.mt(objectW/2, objectH/2-crossSize/2).lt(objectW/2, objectH/2+crossSize/2);
				g.mt(objectW/2-crossSize/2, objectH/2).lt(objectW/2+crossSize/2, objectH/2);
				
				// draw a border
				g.s(color).ss(3);
				g.dr(0,0,objectW,objectH);				
				
				grid2.alpha = .5;				
				cached.cache(0,0,objectW,objectH);
				
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
				if (e.keyCode == 71) { // G
					that.visible = !that.visible;
					stage.off("stagemousemove", stageEvent);
					if (that.visible) {
						stageEvent = stage.on("stagemousemove", where, that);
					}
					stage.update();
				}				
				if (e.keyCode == 80) { // P
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
				if (that.parent) that.parent.removeChild(that);
				that = null;
				window.removeEventListener("keydown", keyEvent);	
			}
			
		}		
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time	
		makeGrid.prototype = new createjs.Container();
		makeGrid.prototype.constructor = zim.Grid;	
		return new makeGrid();			
	}
	
	// GridManager class
	// add Zim Grid objects and update or remove all grids at once
	// grids are handy to use but perhaps annoying to update and remove if you have many
	// GridManager keeps track of the grids and lets you update or dispose of them on command
	
	// METHODS 
	// add(grid) - registers a grid with the GridManager
	// resize() - resizes all the grids in the GridManager (ie. if stage changes)
	// dispose() - disposes all grids and the GridManager
	
	// note: to just hide grids, you use the G key
	// and to toggle percent and pixels use the P key
	// you can dispose grids individually or use this class to dispose all
	// disposing will remove the G key listener and the grid
	
	zim.GridManager = function() {		
		if (zon) zog("zimbuild.js: GridManager");
		var that = this;
		this.grids = [];
		this.add = function(g) {
			that.grids.push(g);
		}
		this.resize = function() {
			if (!that) return;
			for (var i=0; i<that.grids.length; i++) {
				that.grids[i].resize();	
			}	
		}
		this.dispose = function() {
			for (var i=0; i<that.grids.length; i++) {
				that.grids[i].dispose();	
			}	
			if (zon) zog("zimbuild.js: GridManager - grids disposed");		
			that = null;
		}		
	}	
	
	// Layout class
	
	// extends a createjs.EventDispatcher so it can dispatch events
	// arranges objects on the page by fitting them in regions
	// make a layout object for each page if desired
	// and even nest layout objects inside regions
	// regions are fixed aspect ratio
	// good for flexive design where you anchor titles and navigation
	// handles up to three regions vertically or horizontally	
	// var layout = zim.Layout(parameters) 	
		
	// PARAMETERS
	// the holder object (stage, container, etc) that must have bounds set
	// the bounds will constrain the layout
	// region1, region2 and region3 objects with specific properties for each
	// example - with all dimensions as percents
	
	// Example VERTICAL region objects
	// {object:title, marginTop:10, maxWidth:80, minHeight:20, align:"left", valign:"top"}
	// {object:content, marginTop:5, maxWidth:90} // note, middle gets no minHeight
	// {object:nav, marginTop:5, maxWidth:80, minHeight:20, backgroundColor:"red"}
	// note: no minHeight for the middle region
	// align defaults to middle for the three regions
	// valign defaults to top, middle, bottom for the three regions
	// backgroundColor applies a backing color to the region
	
	// Example HORIZONTAL region objects
	// {object:col1, marginLeft:10, maxHeight:80, minWidth:20, valign:"bottom"}
	// {object:col2, marginLeft:5, maxHeight:90, align:"middle"} // note, middle gets no minWidth
	// {object:col3, marginLeft:5, maxHeight:80, minWidth:20, align:"left", valign:"top"}	
	// align defaults to left, middle, right for the three regions
	// valign defaults to top for the three regions	
	
	// PARAMETERS CONT'D
	// lastMargin - the margin at the bottom (vertical) or at the right (horizontal) defaults to 0
	// backgroundColor - for the whole holder - defaults to -1
	// vertical - boolean defaults to true for vertical layout (set to false for horizontal)
	// regionShape - a createjs Shape object to show where bounds are (optional) (added to holder)
	// can toggle on and off with B key - but must pass in the Shape to use the B key
	// scalingTarget - an object used as the bounds of the region scaling
	// setting a scalingTarget will also set the bounds of the holder to the scalingTarget bounds
	// it does not scale the holder - only scale the region objects inside
	
	// METHODS
	// resize() - resize based on new bounds of the holder (or scalingObject)
	// dispose() - removes the B key listener (otherwise, nothing to dispose)
	// addShape(shape) - adds a bounding shape dynamically
	// removeShape() - permanently removes the bounding shape
	// disable() - disables all the layout (shape and sizing)
	// enable() - enables all the layout (shape and sizing)	
	// if you want to get rid of the objects then you need to do so in your app
		
	// DESCRIPTION OF FLEXIVE DESIGN
	// here described with vertical layout - horizontal is similar but rotated 90
	// the content in the middle will try and expand against the top and bottom
	// until it forces the top and bottom to their minimum percents
	// if the content hits its maximum width percent first then the top and bottom
	// will fill up the rest of the height until they reach their maximum widths
	// the margins will be kept as minimum percentages
	
	// FLEXIVE STATES
	
	// 1. STATIC 
	// when wide, the top and bottom are a minimum height and content at maximum height
	
	// 2. SQUEEZE
	// when narrowing, content hits edges and gets shorter leaving room for top and bottom to grow
		
	// 3. SPREAD
	// when narrowing and top and bottom hit maximum width, the three content areas spread out	
	
	zim.Layout = function(holder, region1, region2, region3, lastMargin, backgroundColor, vertical, regionShape, scalingObject) {
		function makeLayout() {
			// if (zon) zog ("zimbuild.js Layout()");						
			if (zot(holder)) {zog ("zimbuild.js Layout(): please provide an object with bounds set that holds the objects being laid out"); return;}			
			scalingObject = (zot(scalingObject)) ? holder : scalingObject;
			if (!scalingObject.getBounds()) {zog ("zimbuild.js Layout(): holder must have bounds set or provide a scalingObject with bounds"); return;}			
			
			var bounds = scalingObject.getBounds();
			holder.setBounds(0,0,bounds.width,bounds.height);
			
			if (zot(lastMargin)) lastMargin = 0;
			if (zot(vertical)) vertical = true;
			if (zot(backgroundColor)) backgroundColor = -1;
			that = this;
			this.active = true;
			var logStates = false;			
			var backing = new createjs.Shape();
									
			// normalize vertical or horizontal data
			
			var obj1; var obj2; var obj3; var stage;
			var margin1=0; var margin2=0; var margin3=0; 
			var margin4=(zot(lastMargin)) ? 0 : lastMargin;
			var max1=0; var max2=0; var max3=0;	var min1=0; var min3=0;	
			var align1; var align2; var align3;	var valign1; var valign2; var valign3;
			var bg1; var bg2; var bg3;		
			var fit1={x:0,y:0,width:0,height:0,scale:0};
			var fit2={x:0,y:0,width:0,height:0,scale:0};
			var fit3={x:0,y:0,width:0,height:0,scale:0};
			var primary; var secondary; // holds bound height for vertical and width for horizontal
			
			if (vertical) { // defaults
				align1=align2=align3="middle"; 
				valign1="top"; valign2="middle"; valign3="bottom";
			} else {
				align1="left"; align2="middle"; align3="right";
				valign1=valign2=valign3="top";
			}			
			for (var i=1; i<=3; i++) assignVariables(i, vertical);
			
			var margins = margin1 + margin2 + margin3 + margin4;
			var min1Start = min1; var min3Start = min3;	
			var min1Last = min1; var min3Last = min3; 
			var state=0; var lastState=0;
			
			calculate();
						
			function calculate() {
				
				if (regionShape) regionShape.graphics.clear();
				backing.graphics.clear();
				if (backgroundColor!=-1) backing.graphics.f(backgroundColor).r(0,0,bounds.width,bounds.height);
									
				primary = (vertical) ? bounds.height : bounds.width;
				secondary = (vertical) ? bounds.width-bounds.x*2 : bounds.height-bounds.y*2;
				
				var primaryFit1=0; var primaryFit2=0; var primaryFit3=0; 
				var secondaryFit1=0; var secondaryFit2=0; var secondaryFit3=0;
				var scale1=0; var scale2=0; var scale3=0;							
							
				// check obj1 meets min1 (primary) when set to max1 (secondary)
				// check obj3 meets min3 (primary) when set to max3 (secondary)
				
				primaryPos = 0; // do not care about x and y right now
				secondaryPos = 0;
				
				if (obj1) {					
					primaryLen = min1Start*primary/100;	// mins, maxes and margins are percent so convert to pixels
					secondaryLen = max1*secondary/100;	
					setFit(1,primaryPos,secondaryPos,primaryLen,secondaryLen);	
					if (primaryFit1 < min1Start*primary/100) {						
						min1 = primaryFit1*100/primary;
						if (Math.floor(min1) != Math.floor(min1Last) && Math.floor(min1) != Math.floor(min1Start)) {
							if (zon) zog("zimbuild.js Layout(): region 1 min "+min1Start+"% cannot be met and will be set to "+Math.floor(min1)+"%");	
							min1Last = min1;
						}
					}			
				}
				
				if (obj3) {
					primaryLen = min3Start*primary/100;								
					secondaryLen = max3*secondary/100;	
					setFit(3,primaryPos,secondaryPos,primaryLen,secondaryLen);	
					if (primaryFit3 < min1Start*primary/100) {						
						min3 = primaryFit3*100/primary;
						if (Math.floor(min3) != Math.floor(min3Last) && Math.floor(min3) != Math.floor(min3Start)) {
							if (zon) zog("zimbuild.js Layout(): region 3 min "+min3Start+"% cannot be met and will be set to "+Math.floor(min3)+"%");	
							min3Last = min3;
						}
					}				
				}
				
				// get original primary lengths for later (height or width of object bounds)
				var p1 = 0; var p3 = 0;
				if (vertical) {
					if (obj1) p1 = obj1.getBounds().height;
					if (obj3) p3 = obj3.getBounds().height;
				} else {
					if (obj1) p1 = obj1.getBounds().width;
					if (obj3) p3 = obj3.getBounds().width;
				}
				
				// determine the Flexive State based first on the middle region which floats between the outer regions
				// unfortunately, these stages seem to have different requirements in terms of maximizing regions
				// this makes the procedural code below fairly complex
				// it probably would have been better to code the regions as independent object
				// and let them work themselves out leading to any number of regions being added, etc.
				// I did not quite expect the complexities so it was a fun two day puzzle			
				
				var leftover = (100-margins)*primary/100;
				var x; var y; var w; var h; 
				var primaryPos; var primaryLen; var secondaryPosition; var secondaryLen;
				var newScale = 0; var f;			
				
				if (obj2) {
					
					// setFitPrimary(num, pos, length) is used a lot below
					// you pass in which region (1, 2 or 3)
					// and then a primary min position - this is y in vertical or x in horizontal
					// and then a primary length - this is height in vertical or width in horizontal
					// and then it automatically maximizes the secondary position and length
					// these for a possible bounding rectangle in which to fit the object					
					// the function takes these dimensions and uses setFit() to fit the object
					// (sometimes setFit() is used directly if we only want dimensions and no final positioning 
					// the setFit function uses zim.fit() which actually scales and positions the object
					// it setFit also populates the following variables:
					
					// the resulting fit length in the primary (height for vertical, width for horizontal)
					// primaryFit1, primaryFit2, primaryFit3
					// the resulting fit length in the secondary (width for vertical, height for horizontal)
					// primaryFit1, primaryFit2, primaryFit3
					
					// the setFitPrimary (and the other functions) also return an object as follows:
					// {x:posX, y:posY, w:width, h:height, s:scale} of the fit object
					// these are, on occassion, used for fitting the next object 
					
					// the setFitPrimary() also automatically handles aligning the object within the bounds					
					
					setFitPrimary(2, (margin1+min1+margin2)*primary/100, (100-(margins+min1+min3))*primary/100);
														
					if (Math.round(secondaryFit2) == Math.round(secondaryLen)) {
						
						// we are on stage 2 if the middle has maxed-out in the secondary
						// we are on stage 3 if all the objects have maxed-out in the secondary						
						// how much room is leftover for obj1 and obj2 in the primary
						
						leftover = (100-margins-primaryFit2*100/primary)*primary/100;
					
						// can obj1 and obj2 go to max in secondary
						// and fit in the leftover in the primary?	
						// do not need to check for x and y - just want the lengths
						
						primaryPos = 0; secondaryPos = 0; primaryLen = 10000; // unlimited
						if (obj1) setFit(1,primaryPos,secondaryPos,primaryLen,max1*secondary/100);	
						if (obj3) setFit(3,primaryPos,secondaryPos,primaryLen,max3*secondary/100);
												
						if (primaryFit1 + primaryFit3 > leftover) {
							state2();
						} else {
							state3();	
						}						
					} else { // the middle has not maxed-out in the secondary
						state1();
					}					
				} else {
					state3(); // check on this... 
				}
				
			
				// STATE 1 - STATIONARY
				// the middle object (obj2) has not maxed-out in the secondary direction
				// outer objects (obj1 and obj3) are set to min1 and min3 in the primary direction
				function state1() {
					
					// if logging is turned on we log the Flexive state we are on
					if (logStates) {state=1; if (state!=lastState) {zog("Flexive State "+state); lastState=state;}};	
										
					if (obj1) setFitPrimary(1, margin1*primary/100, min1*primary/100);					
					if (obj3) setFitPrimary(3, primary-min3*primary/100-margin4*primary/100, min3*primary/100);										
				}
				
				
				// STATE 2 - SQUEEZE
				// middle is being squeezed in the secondary so its primary length shortens proportionally
				// giving the outer objects room to grow in the primary until they too reach max in the secondary			
				function state2() {
					
					if (logStates) {state=2; if (state!=lastState) {zog("Flexive State "+state); lastState=state;}};
										
					// the expanding outer objects may change the positioning of the middle object					
					if (regionShape) regionShape.graphics.clear();
					backing.graphics.clear();			
					if (backgroundColor!=-1) backing.graphics.f(backgroundColor).r(0,0,bounds.width,bounds.height);
															
					// if scale of obj1 at max is greater than scale of obj3 at max					
					primaryPos = 0; secondaryPos = 0;
					secondaryLen = 10000; // unlimited
												
					if (scale1 >= scale3) { // obj1 hits first
						if (obj3) { // leftover is in pixels							
							var leftover1 = leftover - primaryFit3;
							if (leftover1 >= p1*scale3) { // rescale obj1 to leftover1	
								if (obj2) setFit(1,primaryPos,secondaryPos,leftover1,secondaryLen);	
							} else { // equal scale equation								
								newScale = leftover/(p1+p3);								
							}								
						} else { // rescale obj1 to leftover1
							if (obj2) setFit(1,primaryPos,secondaryPos,leftover,secondaryLen);								
						}
					} else { // obj3 hits first
						if (obj1) {								
							var leftover3 = leftover - primaryFit1;
							if (leftover3 >= p3*scale1) { // rescale obj3 to leftover3								
								if (obj2) setFit(3,primaryPos,secondaryPos,leftover3,secondaryLen);	
							} else { // equal scale equation									
								newScale = leftover/(p1+p3);								
							}								
						} else { // rescale obj3 to leftover3								
							if (obj2) setFit(3,primaryPos,secondaryPos,leftover,secondaryLen);
						}						
					}	
									
					if (newScale != 0) {
						// scale obj1 and obj3 to new scale (scale them proportionally)
						if (obj1) setFit(1,primaryPos,secondaryPos,p1*newScale,secondaryLen);
						if (obj3) setFit(3,primaryPos,secondaryPos,p3*newScale,secondaryLen);
					}
					
					if (obj1) setFitPrimary(1, margin1*primary/100, primaryFit1);															
					if (obj3) setFitPrimary(3, (margin1+margin2+margin3)*primary/100 + primaryFit1 + primaryFit2, primaryFit3);					
					if (obj2) setFitPrimary(2, (margin1+margin2)*primary/100+primaryFit1, (100-margins)*primary/100-primaryFit1-primaryFit3);									
				}
				
				
				// STATE 3 - SPREAD
				// all objects are maxed-out in the secondary direction
				// the outer objects anchor to the outsides and the middle object centers
				function state3() {
					
					if (logStates) {state=3; if (state!=lastState) {zog("Flexive State "+state); lastState=state;}};
					
					if (regionShape) regionShape.graphics.clear();
					backing.graphics.clear();
					if (backgroundColor!=-1) backing.graphics.f(backgroundColor).r(0,0,bounds.width,bounds.height);
										
					if (obj1 && !obj2 && ! obj3) {							
						setFitPrimary(1, margin1*primary/100, primary-(margin1+margin4)*primary/100);																					
					}
					if (obj2 && !obj1 && ! obj3) {
						setFitPrimary(2, margin2*primary/100, primary-(margin2+margin4)*primary/100);						
					}	
					if (obj3 && !obj1 && ! obj2) {						
						setFitPrimary(3, margin3*primary/100, primary-(margin3+margin4)*primary/100);						
					}
					if (obj1 && obj3 && !obj2) {						
						// match scales						
						newScale = (100-margin1-margin4-margin3)*primary/100/(p1+p3);												
						f = setFitPrimary(1, margin1*primary/100, p1*newScale);	
						setFitPrimary(3, (margin1+margin3)*primary/100 + ((vertical) ? f.h : f.w), p3*newScale);					
					}	
					if (obj1 && obj2 && !obj3) {						
						// match scales						
						newScale = (100-margin1-margin4-margin2)*primary/100/(primaryFit1+primaryFit2);												
						f = setFitPrimary(1, margin1*primary/100, primaryFit1*newScale);	
						setFitPrimary(2, (margin1+margin2)*primary/100 + ((vertical) ? f.h : f.w), primaryFit2*newScale);					
					}	
					if (obj2 && obj3 && !obj1) {						
						// match scales						
						newScale = (100-margin3-margin4-margin2)*primary/100/(primaryFit3+primaryFit2);												
						f = setFitPrimary(2, margin2*primary/100, primaryFit2*newScale);	
						setFitPrimary(3, (margin2+margin3)*primary/100 + ((vertical) ? f.h : f.w), primaryFit3*newScale);					
					}	
					if (obj1 && obj2 && obj3) {																	
						// only gets here if all three are maxed in secondary
						// so proportion what is left after margins to the maxed-out heights of objects
						// dimensions (primaryFit, secondaryFit) come in correctly but not positions
						// find new heights						
						leftover = (100-margins)*primary/100;							
						f = setFitPrimary(1, margin1*primary/100, primaryFit1*leftover/(primaryFit1+primaryFit2+primaryFit3));	
						f = setFitPrimary(2, (margin1+margin2)*primary/100+ ((vertical) ? f.h : f.w), primaryFit2*leftover/(primaryFit1+primaryFit2+primaryFit3));																				
						primaryLen = primaryFit3*leftover/(primaryFit1+primaryFit2+primaryFit3);
						primaryPos = primary-margin4*primary/100-primaryLen; // note, uses primaryLen in primaryPos	
						f = setFitPrimary(3, primaryPos, primaryLen);						
					}											
				}	
				
				function setFit(num,primaryPos,secondaryPos,primaryLen,secondaryLen) {										
					x = (vertical) ? secondaryPos : primaryPos;
					y = (vertical) ? primaryPos : secondaryPos;
					w = (vertical) ? secondaryLen : primaryLen;
					h = (vertical) ? primaryLen : secondaryLen;									
					eval('fit'+num+' = zim.fit(obj'+num+',x,y,w,h);');
					eval('primaryFit'+num+' = (vertical) ? fit'+num+'.height : fit'+num+'.width;');
					eval('secondaryFit'+num+' = (vertical) ? fit'+num+'.width : fit'+num+'.height;');
					eval('scale'+num+' = fit'+num+'.scale;');					
					return {x:x, y:y, w:w, h:h};				
				}
				
				function setFitPrimary(num, primaryPos, primaryLen) {				
					var colors = [null,"red","blue","green"];
					eval('secondaryPos = (100-max'+num+')/2*secondary/100;');
					eval('secondaryLen = max'+num+'*secondary/100;');
					eval('f = setFit('+num+',primaryPos,secondaryPos,primaryLen,secondaryLen);');	
					var addedW=0; var addedH=0; // transitions need a little extra overlap on page edges
					if (primaryPos == 0 || (primaryPos+primaryLen) == primary) if (vertical) {addedH=1} else {addedW=1};						
					if (secondaryLen == secondary) if (vertical) {addedW=1} else {addedH=1};												
					eval('if (bg'+num+' != "") backing.graphics.f(bg'+num+').r(f.x, f.y, f.w+addedW, f.h+addedH);');
					eval('if (regionShape) regionShape.graphics.s("'+colors[num]+'").ss(2).dr(f.x, f.y, f.w, f.h);');
					eval('if (valign'+num+'=="top") obj'+num+'.y = f.y;');
					eval('if (valign'+num+'=="bottom") obj'+num+'.y = f.y+f.h-((vertical)?primaryFit'+num+':secondaryFit'+num+');');
					eval('if (align'+num+'=="left") obj'+num+'.x = f.x - bounds.x;');
					eval('if (align'+num+'=="right") obj'+num+'.x = f.x-bounds.x+f.w-((vertical)?secondaryFit'+num+':primaryFit'+num+');');										 
					return f;
				}				
									
				if (!stage) {
					for (var i=1; i<=3; i++) eval ('if (obj'+i+' && obj'+i+'.getStage()) stage = obj'+i+'.getStage();');
				} 
				if (stage) stage.update();
			}
						
			function assignVariables(i,vertical) {
				if (vertical) {
					if (eval('region'+i)) {
						eval('obj'+i+'=region'+i+'.object;');
						eval('margin'+i+'=(region'+i+'.marginTop)?region'+i+'.marginTop:0;');
						eval('max'+i+'=(region'+i+'.maxWidth)?region'+i+'.maxWidth:100;');
						if (i!=2) eval('min'+i+'=(region'+i+'.minHeight)?region'+i+'.minHeight:0;');
						eval('if (region'+i+'.align) align'+i+'=region'+i+'.align;');
						eval('if (region'+i+'.valign) valign'+i+'=region'+i+'.valign;');
						eval('bg'+i+'=(region'+i+'.backgroundColor)?region'+i+'.backgroundColor:"";');						
					}
				} else {
					if (eval('region'+i)) {						
						eval('obj'+i+'=region'+i+'.object;');					
						eval('margin'+i+'=(region'+i+'.marginLeft)?region'+i+'.marginLeft:0;');
						eval('max'+i+'=(region'+i+'.maxHeight)?region'+i+'.maxHeight:100;');
						if (i!=2) eval('min'+i+'=(region'+i+'.minWidth)?region'+i+'.minWidth:0;');
						eval('if (region'+i+'.align) align'+i+'=region'+i+'.align;');
						eval('if (region'+i+'.valign) valign'+i+'=region'+i+'.valign;');
						eval('bg'+i+'=(region'+i+'.backgroundColor)?region'+i+'.backgroundColor:"";');
					}
				}					
				eval ('if (obj'+i+' && obj'+i+'.getStage()) stage = obj'+i+'.getStage();');
				eval ('if (obj'+i+' && obj'+i+'.getStage()) stage = obj'+i+'.getStage();');
				
			}	
			
			if (regionShape) holder.addChild(regionShape);						
			holder.addChildAt(backing,0);			
			
			this.resize = function() {
				if (!that.active) return;
				bounds = scalingObject.getBounds();
				holder.setBounds(0,0,bounds.width,bounds.height);
				calculate();	
			}
			
			// add key listener to hide and show the bounds				
			window.addEventListener("keydown", keyEvent);			
			function keyEvent(e) {				
				if (!e) e=event; 								
				if (regionShape) {
					if (e.keyCode == 66) { // B
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
				that.resize = function() {
					bounds = scalingObject.getBounds();
					calculate();	
				}		
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
				regionTarget = target;
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
	
	// LayoutManager class
	// add Zim Layout objects and update them all at once
	// also can remove all layout region bound shapes at once
	// as well as remove the B key to show the region bound shapes
	// for a final project, call the removeShapes()
	// this will remove all shapes and key events
	// the layouts will remain in place to handle multiple screen sizes
	
	// METHODS 
	// add(layout) - registers a layout with the LayoutManager
	// resize() - resizes all the layouts in the LayoutManager
	// disable() - disables all the layouts in the LayoutManager (shapes and sizing)
	// enable() - enables all the layouts in the LayoutManager (shapes and sizing)
	// dispose() - only removes bounds shapes and keyboard events (does not really dispose)
	
	// note: to just hide bounds, you use the B key
	
	zim.LayoutManager = function() {		
		if (zon) zog("zimbuild.js: LayoutManager");
		var that = this;
		this.layouts = [];
		this.add = function(layout) {
			that.layouts.push(layout);
		}
		this.resize = function() {			
			for (var i=0; i<that.layouts.length; i++) {
				that.layouts[i].resize();	
			}	
		}
		this.disable = function() {			
			for (var i=0; i<that.layouts.length; i++) {							
				that.layouts[i].disable();	
			}
		}
		this.enable = function() {
			for (var i=0; i<that.layouts.length; i++) {
				that.layouts[i].enable();	
			}
		}
		
		this.dispose = function() {
			for (var i=0; i<that.layouts.length; i++) {
				that.layouts[i].removeShape(); // also removes key events
			}
		}		
	}		
	

	return zim;
} (zim || {});
} 
