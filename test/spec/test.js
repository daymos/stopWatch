(function () {
	'use strict';
	describe('stopwatch', function () {

		describe('should be able to', function () {

			it('start and stop', function(){
				Watch.start();
				expect(Watch.isRunning).toBe(1);
				Watch.stop();
				expect(Watch.isRunning).toBe(0);
			})

			it('measure the time elapsed', function(done){
				Watch.start();
				setTimeout(function(){
					Watch.stop(); 
					expect(Watch.timeElapsed>10).toBe(true);
					done();
				},50)
			})
			it('either be restarted from 0 (reset) or restarted at the last stopped time', function(done){
				Watch.start();
				setTimeout(function(){
					Watch.start()
					expect(Watch.timeElapsed >= 80).toBe(true)
					console.log('here 1: ',Watch.timeElapsed )
					done()
				}, 100)
				Watch.reset();
				expect(Watch.timeElapsed).toBe(0);
				console.log('here 2:',Watch.timeElapsed)

			})
			it('return the time elapsed when partial time button is clicked it', function(done){
				Watch.start();
				setTimeout(function(){
					expect(Watch.lap()>=Watch.timeElapsed).toBe(true);
					done()
					Watch.stop()
				},50)
			})
			it('store successive laps and return them in an array', function(done){
				Watch.start();
				var id = setInterval(function(){
					Watch.lap()
				},50);
				setTimeout(function(){
					clearInterval(id);
					for (var i = 0; i < 5; i++){
						expect(Watch.lapArray[i]>=50*i).toBe(true);
					}
					done();
					Watch.stop();
				}, 500);
			})

			it('return array of svg', function(){
				Watch.timeElapsed = 61000;
					expect(Watch.getTime()).toEqual([svg[0],svg[1],svg[10],svg[0],svg[1]])
			})

			it('draws the digits in dom', function(){
				Watch.timeElapsed = 61000;
				Watch.draw();
				var elements = document.getElementsByTagName('path')
				for(var i = 0; i < elements.length; i++){
					console.log(elements[i].toString(), ' compare to ', Watch.getTime()[i]);
					expect(elements[i].toString()).toBe(Watch.getTime()[i])
				}

			})

		});
	});
})();


var svg = ['<path d="M71 412c0 286 159 428 336 428s335 -142 335 -428c0 -306 -158 -427 -335 -427s-336 121 -336 427zM261 412c0 -178 55 -262 146 -262c90 0 145 84 145 262c0 167 -55 263 -145 263c-91 0 -146 -97 -146 -263z" />',
	'<path d="M29 487v186l235 152h89v-825h-188v575z" />',
	'<path d="M363 681c-90 0 -147 -157 -147 -157l-157 76s80 240 304 240c283 0 320 -186 320 -290c0 -193 -291 -385 -291 -385h306v-165h-643v47s425 351 425 503c0 30 -7 131 -117 131z" />',
	'<path d="M205 587l-148 72s42 181 273 181c157 0 271 -100 271 -240c0 -68 -28 -120 -73 -155c64 -39 105 -102 105 -189c0 -158 -129 -271 -306 -271c-254 0 -310 203 -310 203l174 85s11 -126 135 -126c69 0 119 39 119 109c0 71 -53 121 -119 121c-20 0 -36 -6 -36 -6v123h41 c50 0 99 44 99 104c0 53 -49 91 -102 91c-104 0 -123 -102 -123 -102z" />',
	'<path d="M646 825v-486h96v-165h-96v-174h-176v174h-400v56l329 595h247zM470 574h-40l-109 -235h149v235z" />',
	'<path d="M18 164l149 72c15 -51 59 -94 145 -94c68 0 118 50 118 120c0 109 -107 145 -214 145c-69 0 -116 -15 -141 -26l69 444h421v-165h-260l-18 -115c7 0 15 1 23 1c156 -1 308 -61 308 -290c0 -158 -129 -271 -306 -271c-176 0 -263 95 -294 179z" />',
	'<path d="M580 825l-243 -283s21 12 59 12c113 0 263 -97 263 -289c0 -195 -157 -280 -306 -280c-185 0 -329 122 -329 280c0 145 44 212 130 329l194 231h232zM219 265c0 -72 52 -125 125 -125s127 53 127 125c0 74 -56 128 -127 128c-69 0 -125 -54 -125 -128z" />',
	'<path d="M711.5 825v-55c-185.92 -256.667 -348.394 -513.333 -436 -770h-222c102.99 226.588 185.666 458.829 380 660h-355v165h633z" />',
	'<path d="M613 632c0 -91 -44 -151 -106 -187c83 -38 145 -110 145 -223c0 -139 -153 -237 -308 -237c-160 0 -309 98 -309 237c0 113 61 185 144 223c-63 36 -109 96 -109 187c0 122 137 208 273 208c141 0 270 -86 270 -208zM435 605c0 53 -37 93 -91 93c-53 0 -93 -40 -93 -93 c0 -55 42 -92 93 -92c53 0 91 37 91 92zM239 252c0 -61 42 -105 104 -105c60 0 105 44 105 105c0 62 -47 105 -105 105c-59 0 -104 -43 -104 -105z" />',
	'<path d="M109 0l243 283s-21 -12 -59 -12c-113 0 -263 97 -263 289c0 195 157 280 306 280c185 0 329 -122 329 -280c0 -145 -44 -212 -130 -329l-194 -231h-232zM470 560c0 72 -52 125 -125 125s-127 -53 -127 -125c0 -74 56 -128 127 -128c69 0 125 54 125 128z" />',
	'<path d="M72 386c0 48 39 88 85 88s85 -40 85 -88s-39 -88 -85 -88s-85 40 -85 88zM72 88c0 48 39 88 85 88s85 -40 85 -88s-39 -88 -85 -88s-85 40 -85 88z" />']
