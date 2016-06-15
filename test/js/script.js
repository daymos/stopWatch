var Watch = {
	isRunning: 0,
	timeElapsed: 0,
	interval: undefined,
	reset: function(){
		this.timeElapsed = 0;	
	},
	start: function(){
		this.isRunning = 1;
		var callback = () => {
			this.timeElapsed +=5;	
		}
		this.interval = setInterval(callback, 5);

	},
	stop: function(){
		this.isRunning = 0;	
		clearInterval(this.interval);
	}
}
