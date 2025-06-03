(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes
lib.webFontTxtFilters = {}; 

// library properties:
lib.properties = {
	width: 550,
	height: 400,
	fps: 24,
	color: "#FFFFFF",
	webfonts: {},
	manifest: []
};



lib.webfontAvailable = function(family) { 
	lib.properties.webfonts[family] = true;
	const txtFilters = lib.webFontTxtFilters && lib.webFontTxtFilters[family] || [];
	for(const f = 0; f < txtFilters.length; ++f) {
		txtFilters[f].updateCache();
	}
};
// symbols:



// stage content:
(lib.maze = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EBCB35").s().p("AYmWpIAAhkIGQAAIAAlxI8wAAIAAhkIEOAAIAApiIvIAAIAABaIhkAAIAAq6IigAAIAAhkIH0AAIAABkIjwAAIAAH8ITMAAIAABkIigAAIAAJiIMqAAIAAiqIBkAAIAACqIIwAAIAA78IiWAAIAAhkICWAAIAAlUMgxqAAAIAAhkMAzOAAAMAAAAtRgEggZAWpMAAAgtRIIbAAIAABkIm3AAIAAFUMApXAAAIAABkIleAAIAAHWIPeAAIAAnWIlUAAIAAhkIISAAIAABkIhaAAIAAUIIhkAAIAAhuIlKAAIAAhkIFKAAIAAn8IzsAAIAAhkICqAAIAAnWI4WAAIAAHWIDmAAIAABkIjmAAIAAGsIhkAAIAAvmIobAAMAAAAjRIIbAAIAAtRIBkAAIAAF8IKeAAIAAjIIBkAAIAADIIDmAAIAABkIvoAAIAAFxMAoIAAAIAABkg");
	this.shape.setTransform(207.5,145);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(275,200,415,290);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;