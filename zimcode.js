
// ZIM js Interactive Media modules by Dan Zen http://danzen.com (c) 2014
// zimcode.js adds some general code functionality  http://zimjs.com
// free to use - donations welcome of course! http://zimjs.com/donate

if (typeof zog === "undefined") { // bootstrap zimwrap.js
	document.write('<script src="http://d309knd7es5f10.cloudfront.net/zimwrap_1.0.js"><\/script>');
	document.write('<script src="http://d309knd7es5f10.cloudfront.net/zimcode_1.0.js"><\/script>');
} else {

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
} 