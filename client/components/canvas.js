app.directive('stars', ['$rootScope', '$compile', '$filter', '$http', function company($rootScope, $compile, $filter, $http){
	return {
		restrict: 'A',
		compile: function compile(tElement, tAttrs){
			return {
				pre: function preLink(scope, el, attrs, ctrl){
					//remove directive to prevent infinite loop
					//hallo
					el.removeAttr("stars");
					let stars = '';
					for(let i = 0; i < 200; i++){
						const top = Math.floor((Math.random() * 100) + 1);
						const left = Math.floor((Math.random() * 100) + 1);
						const type = Math.floor((Math.random() * 10) + 1);
						stars += '<div class="star star_'+type+'" style="top: '+top+'%;left: '+left+'%"></div>'
					}
					el.append(stars);
					$compile(el)(scope);
				}
			};
		}
	};
}]);

/*
*  Author: Jesse Florig
*  Source: http://jsfiddle.net/jesseflorig/PYnyn/
*/
// src: http://www.html5gamedevelopment.org/html5-game-tutorials/2012-01-procedural-textures-in-html5-canvas
// This is a port of Ken Perlin's Java code. The
// original Java code is at http://cs.nyu.edu/%7Eperlin/noise/.
// Note that in this version, a number from 0 to 1 is returned.
var PerlinNoise = new function() {

	this.noise = function(x, y, z) {

		var p = new Array(512);
		var permutation = [151,160,137,91,90,15,
			131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
			190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
			88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
			77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
			102,143,54, 65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,
			135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,
			5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
			223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,
			129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,
			251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,
			49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,
			138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180
		];
		for (var i=0; i < 256 ; i++)
			p[256+i] = p[i] = permutation[i];

		var X = Math.floor(x) & 255,                  // FIND UNIT CUBE THAT
			Y = Math.floor(y) & 255,                  // CONTAINS POINT.
			Z = Math.floor(z) & 255;
		x -= Math.floor(x);                                // FIND RELATIVE X,Y,Z
		y -= Math.floor(y);                                // OF POINT IN CUBE.
		z -= Math.floor(z);
		var    u = fade(x),                                // COMPUTE FADE CURVES
			v = fade(y),                                // FOR EACH OF X,Y,Z.
			w = fade(z);
		var A = p[X  ]+Y, AA = p[A]+Z, AB = p[A+1]+Z,      // HASH COORDINATES OF
			B = p[X+1]+Y, BA = p[B]+Z, BB = p[B+1]+Z;      // THE 8 CUBE CORNERS,

		return scale(lerp(w, lerp(v, lerp(u, grad(p[AA  ], x  , y  , z   ),  // AND ADD
			grad(p[BA  ], x-1, y  , z   )), // BLENDED
			lerp(u, grad(p[AB  ], x  , y-1, z   ),  // RESULTS
				grad(p[BB  ], x-1, y-1, z   ))),// FROM  8
			lerp(v, lerp(u, grad(p[AA+1], x  , y  , z-1 ),  // CORNERS
				grad(p[BA+1], x-1, y  , z-1 )), // OF CUBE
				lerp(u, grad(p[AB+1], x  , y-1, z-1 ),
					grad(p[BB+1], x-1, y-1, z-1 )))));
	}
	function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
	function lerp( t, a, b) { return a + t * (b - a); }
	function grad(hash, x, y, z) {
		var h = hash & 15;                      // CONVERT LO 4 BITS OF HASH CODE
		var u = h<8 ? x : y,                 // INTO 12 GRADIENT DIRECTIONS.
			v = h<4 ? y : h==12||h==14 ? x : z;
		return ((h&1) == 0 ? u : -u) + ((h&2) == 0 ? v : -v);
	}
	function scale(n) { return (1 + n)/2; }
};
var shader = function(r, g, b, a, x, y, w, h) {
	x /= w;
	y /= h; // normalize
	var size = 10;  // pick a scaling value
	var n = PerlinNoise.noise(size * x, size * y, 0.8);

	r = g = b = Math.round(255 * n);

	// return {r:r-50, g:g+50, b:255, a:100};
	// return {r:r-50, g:g+50, b:255, a:15};
	return {r:r, g:g, b:b, a:255};
};
var manipulateImageData = function(canvas, shader) {
	var w = canvas.width;
	var h = canvas.height;
	var context  = canvas.getContext("2d");

	var imageData = context.createImageData(w, h);
	context.globalCompositeOperation = 'multiply';
	for (var i = 0, l = imageData.data.length; i < l; i += 4) {
		var x = (i / 4) % w;
		var y = Math.floor(i / w / 4);

		var r = imageData.data[i + 0];
		var g = imageData.data[i + 1];
		var b = imageData.data[i + 2];
		var a = imageData.data[i + 3];

		var pixel = shader(r, g, b, a, x, y, w, h);
		imageData.data[i  ] = pixel.r;
		imageData.data[i + 1] = pixel.g;
		imageData.data[i + 2] = pixel.b;
		imageData.data[i + 3] = pixel.a;
	}

	context.putImageData(imageData, 0, 0);

};

app.directive('starField', ['$rootScope', '$window', '$timeout', function($rootScope, $window, $timeout){
	return {
		restrict: 'A',
		link: function(scope, el, attr, ctrl) {
			const canvas = el[0];
			const canvas_perlinNoise = document.querySelector('#perlinNoise');
			function getRandom(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}
			function resize(){
				el.attr('width', $window.innerWidth);
				el.attr('height', $window.innerHeight);

			}

			/*
			* Author: donpark
			* Source: https://gist.github.com/donpark/1796361
			 */
			function randomNoise(canvas, x, y, width, height, alpha) {
				x = x || 0;
				y = y || 0;
				width = width || canvas.width;
				height = height || canvas.height;
				alpha = alpha || 255;
				const g = canvas.getContext("2d");
				let	imageData = g.getImageData(x, y, width, height),
					random = Math.random,
					pixels = imageData.data,
					n = pixels.length,
					i = 0;
				while (i < n) {
					// pixels[i++] = pixels[i++] = pixels[i++] = (random() * 256) | 0;
					//define color in rgba
					pixels[i++] = getRandom(30, 200);
					pixels[i++] = getRandom(80, 151);
					pixels[i++] = 255;
					pixels[i++] = 5//random()* 256;//alpha;
				}
				g.putImageData(imageData, x, y);
				return canvas;
			}
			function perlinNoise(canvas, noise) {
				noise = noise || randomNoise(canvas);
				const g = canvas.getContext("2d");
				g.save();
				/* Scale random iterations onto the canvas to generate Perlin noise. */
				for (let size = 4; size <= noise.width; size *= 2) {
					let x = (Math.random() * (noise.width - size)) | 0,
						y = (Math.random() * (noise.height - size)) | 0;
					g.globalAlpha = 4 / size;
					g.drawImage(noise, x, y, size, size, 0, 0, canvas.width, canvas.height);
				}

				g.restore();
				return canvas;
			}


			// function draw(){
			// 	var stars = $window.innerWidth/0.8;
			// 	for (var i = 0; i < stars; i++) {
			// 		var x = Math.random() * canvas.offsetWidth;
			// 		var y = Math.random() * canvas.offsetHeight;
			// 		var	radius = Math.random() * 1.2;
			// 		context.beginPath();
			// 		context.arc(x, y, radius, 0, 360);
			// 		context.fillStyle = "hsla(200,100%,50%,0.8)";
			// 		// context.stroke();
			// 		context.fill();
			// 	}
			// } //asd

			const colorrange = [0,60,240];
			function draw(canvas, stars, big_stars){
				const context = canvas.getContext("2d");
				stars = stars || $window.innerWidth/0.8;
				for (let i = 0; i < stars; i++) {
					let x = Math.random() * canvas.offsetWidth,
						y = Math.random() * canvas.offsetHeight,
						radius = Math.random() * 1.2,
						hue = colorrange[getRandom(0,colorrange.length - 1)],
						sat = getRandom(50,100);
					context.beginPath();
					context.arc(x, y, radius, 0, 360);
					context.fillStyle = "hsl(" + hue + ", " + sat + "%, 88%)";
					context.fill();
				}

				if(big_stars){
					for (let i = 0; i < 5; i++) {
						let x = Math.random() * canvas.offsetWidth,
							y = Math.random() * canvas.offsetHeight,
							radius = Math.random() * 6.2,
							hue = colorrange[getRandom(0,colorrange.length - 1)],
							sat = getRandom(50,100);
						context.beginPath();
						context.arc(x, y, radius, 0, 360);
						context.fillStyle = "hsl(" + hue + ", " + sat + "%, 88%)";
						context.fill();
					}
				}
			}

			$timeout(function(){
				resize();
				// perlinNoise(canvas);
				manipulateImageData(canvas_perlinNoise, shader);
				draw(canvas);
			}, 0);


			$rootScope.$on('window_resize', function(obj, index){
				resize();
				// perlinNoise(canvas_perlinNoise);
				manipulateImageData(canvas_perlinNoise, shader);
				draw(canvas);
			});
		}
	};
}]);
