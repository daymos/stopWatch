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

		});
	});
})();
