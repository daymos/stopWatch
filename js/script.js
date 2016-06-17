var Watch = {
	isRunning: 0,
	timeElapsed: 0,
	interval: undefined,
	lapArray: [],
	reset: function(){
		var laps = this.stop()
		this.timeElapsed = 0;	
		this.lapArray = [];
		return laps
	},
	start: function(){
		if(!this.isRunning){
			this.isRunning = 1;
			var drawCount = 0
			var callback = () => {
				this.timeElapsed +=5;	
				drawCount+=5
				if (drawCount >=1000){
					this.draw()
					drawCount = 0
				}
			}
			this.interval = setInterval(callback, 5);
		}
	},
	stop: function(){
		if(this.isRunning){
			this.isRunning = 0;	
			clearInterval(this.interval);
			var lapString = 'Laps: '
			this.lapArray.forEach(function(lap, i){
				if(i>0){
					lapString += ', '+ (lap/1000) + ' secs'
				} else {
					lapString += (lap/1000) + ' secs'
				}
			})
			document.getElementById('laps').innerHTML = lapString
			return this.lapArray
		}
	},
	lap: function(){
		if(this.isRunning){
			var record = this.timeElapsed;
			this.lapArray.push(record)
			return record;
		}
	},
	getTime: function(){
		var totalSeconds = this.timeElapsed/1000;
		var minutes = Math.floor(totalSeconds/60);
		var seconds = Math.floor(totalSeconds % 60);
		var output = [];
		if (minutes<10){
			output.push(svg[0]);
			output.push(svg[minutes]);
		} else {
			output.push(svg[minutes.toString()[0]]);
			output.push(svg[minutes.toString()[1]]);
		}
		output.push(svg[10]);
		if (seconds<10){
			output.push(svg[0]);
			output.push(svg[seconds]);
		} else {
			output.push(svg[seconds.toString()[0]]);
			output.push(svg[seconds.toString()[1]]);
		}
		return output
	},
	draw: function(){
		var displayTime = this.getTime()
		displayTime.forEach(function(el,index){
			path = document.getElementById('digit'+index)
			path.setAttributeNS(null, "d", el);
		})
		var filling = setInterval(this.fill,0)
		var unfillFunc = this.unfill
		setTimeout(function(){
			clearInterval(filling)
			var unfilling = setInterval(unfillFunc,0)
			setTimeout(function(){
				clearInterval(unfilling)
			},500)
		}, 500, unfillFunc)
	},
	fill: function(){
		for(var i = 0; i <500;i++){
			var randX = Math.floor(Math.random()*825)
			var randY = Math.floor(Math.random()*1100-100)
			var index = Math.floor(Math.random()*5)
			var svgNS = "http://www.w3.org/2000/svg";
			var svg = document.getElementById('svg'+index)
			var rect = document.createElementNS(svgNS,"rect");
			rect.setAttributeNS(null, "width", "15");
			rect.setAttributeNS(null, "height", "15");
			rect.setAttributeNS(null, "x", randX);
			rect.setAttributeNS(null, "y", randY);
			rect.setAttributeNS(null, "fill", "black");
			path = document.getElementById('digit'+index)
			svg.insertBefore(rect, path);
		}
	},
	unfill: function(){
		for(var i = 0; i <500;i++){ 
			var index = Math.floor(Math.random()*5)
			var svg = document.getElementById('svg'+index)
			if(svg.childNodes.length>1){
				svg.removeChild(svg.firstChild)
			} 
		}
	}
}

var svg = ['M71 412c0 286 159 428 336 428s335 -142 335 -428c0 -306 -158 -427 -335 -427s-336 121 -336 427zM261 412c0 -178 55 -262 146 -262c90 0 145 84 145 262c0 167 -55 263 -145 263c-91 0 -146 -97 -146 -263z',
	'M29 487v186l235 152h89v-825h-188v575z',
	'M363 681c-90 0 -147 -157 -147 -157l-157 76s80 240 304 240c283 0 320 -186 320 -290c0 -193 -291 -385 -291 -385h306v-165h-643v47s425 351 425 503c0 30 -7 131 -117 131z',
	'M205 587l-148 72s42 181 273 181c157 0 271 -100 271 -240c0 -68 -28 -120 -73 -155c64 -39 105 -102 105 -189c0 -158 -129 -271 -306 -271c-254 0 -310 203 -310 203l174 85s11 -126 135 -126c69 0 119 39 119 109c0 71 -53 121 -119 121c-20 0 -36 -6 -36 -6v123h41 c50 0 99 44 99 104c0 53 -49 91 -102 91c-104 0 -123 -102 -123 -102z',
	'M646 825v-486h96v-165h-96v-174h-176v174h-400v56l329 595h247zM470 574h-40l-109 -235h149v235z',
	'M18 164l149 72c15 -51 59 -94 145 -94c68 0 118 50 118 120c0 109 -107 145 -214 145c-69 0 -116 -15 -141 -26l69 444h421v-165h-260l-18 -115c7 0 15 1 23 1c156 -1 308 -61 308 -290c0 -158 -129 -271 -306 -271c-176 0 -263 95 -294 179z',
	'M580 825l-243 -283s21 12 59 12c113 0 263 -97 263 -289c0 -195 -157 -280 -306 -280c-185 0 -329 122 -329 280c0 145 44 212 130 329l194 231h232zM219 265c0 -72 52 -125 125 -125s127 53 127 125c0 74 -56 128 -127 128c-69 0 -125 -54 -125 -128z',
	'M711.5 825v-55c-185.92 -256.667 -348.394 -513.333 -436 -770h-222c102.99 226.588 185.666 458.829 380 660h-355v165h633z',
	'M613 632c0 -91 -44 -151 -106 -187c83 -38 145 -110 145 -223c0 -139 -153 -237 -308 -237c-160 0 -309 98 -309 237c0 113 61 185 144 223c-63 36 -109 96 -109 187c0 122 137 208 273 208c141 0 270 -86 270 -208zM435 605c0 53 -37 93 -91 93c-53 0 -93 -40 -93 -93 c0 -55 42 -92 93 -92c53 0 91 37 91 92zM239 252c0 -61 42 -105 104 -105c60 0 105 44 105 105c0 62 -47 105 -105 105c-59 0 -104 -43 -104 -105z',
	'M109 0l243 283s-21 -12 -59 -12c-113 0 -263 97 -263 289c0 195 157 280 306 280c185 0 329 -122 329 -280c0 -145 -44 -212 -130 -329l-194 -231h-232zM470 560c0 72 -52 125 -125 125s-127 -53 -127 -125c0 -74 56 -128 127 -128c69 0 125 54 125 128z',
	'M72 386c0 48 39 88 85 88s85 -40 85 -88s-39 -88 -85 -88s-85 40 -85 88zM72 88c0 48 39 88 85 88s85 -40 85 -88s-39 -88 -85 -88s-85 40 -85 88z']
