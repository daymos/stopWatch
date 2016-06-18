var watch = {
	isRunning: 0,
	timeElapsed: 0,
	interval: undefined,
	lapArray: [],
	init: function(){
		if(this.isRunning) this.stop();
		sketcher.init();
		this.timeElapsed = 0;	
		this.lapArray = [];
		this.lapString = 'Laps: ';
		sketcher.printLaps(this.lapString);
	},
	start: function(){
		this.init();
		if(!this.isRunning){
			this.isRunning = 1;
			var drawCount = 0
			var callback = () => {
				this.timeElapsed +=5;	
				drawCount+=5
				if (drawCount >=1000){
					sketcher.draw(this.getTime())
					drawCount = 0
				}
			}
			this.interval = setInterval(callback, 5);
		}
	},
	stop: function(){
		if(this.isRunning){
			this.lap()
			this.isRunning = 0;	
			clearInterval(this.interval);
			sketcher.printLaps(this.lapString)
		}
	},
	lap: function(){
		if(this.isRunning){
			var record = this.timeElapsed;
			this.lapArray.push(record)
			if (this.lapArray.length>1){
					this.lapString += ', '+ (record/1000) + ' secs'
			} else {
				this.lapString += (record/1000) + ' secs'
			}
			sketcher.printLaps(this.lapString)
			return record;
		}
	},
	getTime: function(){
		var totalSeconds = this.timeElapsed/1000;
		var minutes = Math.floor(totalSeconds/60);
		var seconds = Math.floor(totalSeconds % 60);
		return [minutes,seconds]
	},

}
