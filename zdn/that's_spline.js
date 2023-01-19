(function() {
	retryWhileError(function() {
		'use strict';

		function f(x) {
			return spline.at(x);
		}
		function maximum(){
		let max=[];
			for(let i=1;i<X.length;i++)
				if(Y[i]>Y[i-1]&&Y[i]>Y[i+1])
					max.push([X[i],Y[i]]);
			return max;
		}
		function minimum(){
		let min=[];
			for(let i=1;i<X.length;i++)
				if(Y[i]<Y[i-1]&&Y[i]<Y[i+1])
					min.push([X[i],Y[i]]);
			return min;
		}
		NAinfo.requireApiVersion(0, 2);
		let X = [];
		let Y = [];
		for (let i = -10; i < 10; i += sl(1, 3, 0.1))
			X.push(i);
		Y.push(sl(1, 6).pm());
		for (let i = 1; i < X.length; i++) {
			do {
				Y[i] = Y[i - 1] + sl(2, 10).pm();
			} while (Y[i].abs() > 5||Y[i]==0);
		}
		let spline = new Spline(X, Y);
		let paint1 = function(ct) {
			let h = 500;
			let w = 800;
			ct.translate(w/2, h/2);
			/*ct.drawLine(-w/2,0,w/2,0);
			ct.drawLine(0,-h/2,0,h/2);*/
			ct.scale(30, -30);
			ct.lineWidth = 0.1;

			graph9AdrawFunction(ct, f, {
				minX: -10,
				maxX: 10,
				minY: -8,
				maxY: 8,
				step: 0.01
			});
			graph9AmarkCircles(ct, [X,Y].T(), 20, 0.1);
			ct.fillStyle = "red";
			graph9AmarkCircles(ct, maximum(), 20, 0.1);
			ct.fillStyle = "green";
			graph9AmarkCircles(ct, minimum(), 20, 0.1);
		};
		NAtask.setTask({
			//text: Y + '<br>' + X,
			answers: 0,
			analys: 'Максимумов: '+maximum().length+'<br>'+'Минимумов: '+minimum().length,
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 800,
			height: 500,
			paint: paint1,
		});
	});
})();
