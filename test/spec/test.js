(function () {
	'use strict';
	setTimeout(function(){
		location.reload()
	}, 5000)

	describe('stopwatch test set', function () {

		describe('maybe a bit more context here', function () {

			it('should start and stop', function(){
				Watch.start();
				expect(Watch.isRunning).toBe(1);
				Watch.stop();
				expect(Watch.isRunning).toBe(0);
			})

			it('should measure the time elapsed', function(done){
				Watch.start();
				setTimeout(function(){
					Watch.stop(); 
					expect(Watch.timeElapsed>10).toBe(true);
					done();
				},50)
			})
			it('should have the option to either be restarted from 0 (reset) or restarted at the last stopped time', function(done){
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
		});
	});
})();
