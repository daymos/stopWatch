var sketcher = {
	svg:[],
	init: function(){
		this.svg = pathLib.generate()
	},
	selectPaths: function(time){
		var minutes = time[0]	
		var seconds = time[1]
		console.log(minutes, seconds)
		var output = [];
		if (minutes<10){
			output.push(this.svg[0]);
			output.push(this.svg[minutes]);
		} else {
			output.push(this.svg[minutes.toString().split('')[0]]);
			output.push(this.svg[minutes.toString().split('')[1]]);
			
		}
		output.push(this.svg[10]);
		if (seconds<10){
			output.push(this.svg[0]);
			output.push(this.svg[seconds]);
		} else {
			output.push(this.svg[seconds.toString().split('')[0]]);
			output.push(this.svg[seconds.toString().split('')[1]]);
		}
		return output
	},
	draw: function(time){
		var displayTime = this.selectPaths(time)

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
