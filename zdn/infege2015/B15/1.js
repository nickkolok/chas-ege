(function(){'use strict';

/*Returns the number of children*/
var countNodeChildren = function(mat, ic){
	var s = 0;
	for (var j = 0; j < mat[0].length; j++){
		if(mat[ic][j]=='+'){
			s++;
		}
	}
	return s;
};

/*Returns the number of parents*/
var countNodeParents = function(mat, ic){
	var s = 0;
	for (var j = 0; j < mat[0].length; j++){
		if(mat[j][ic] == '+'){
			s++;
		}
	}
	return s;
};

/*Returns indices of all children*/
var getNodeChildren = function(mat, ic){
	var ch = [];
	for (var j = 0; j < mat[0].length; j++){
		if(mat[j][ic]=='+'){
			ch.push(j);
		}
	}
	return ch;
};

/*Recursive way search*/
var wayCount = 0;
var callCount = 0;
var searchNode = function(mat, ic, jfinish){
	callCount += 1;
	if(ic == jfinish){
		wayCount += 1;
		return 0;
	} else {
		for (var j = ic; j < mat[0].length; j++){
			if(mat[ic][j] == '+'){
				searchNode(mat, j, jfinish);
			}
		}
	}
};

/* Canvas parameters */
var elRadius = getRandomInt(140,150);
var scaleX = getRandomInt(14,18)/getRandomInt(10,12);
var scaleY = 1;
var baseRadius = 18;
var arrowShift = 15;

/* Node parameters*/
var nodeCharArray = [];
var startNode = -1;
var endNode = -1;
var maxNodeCount = 4;
var maxNodeConnections = 3;
var dens = getRandomInt(90,105);
var nodeXarray = [];
var nodeYarray = [];
var nameCode = 'A'.charCodeAt(0);

/*Calculate coordinates*/
var ky = 0;
var i = 0;
var b = 0;
for (var ix = -elRadius * scaleX + getRandomInt(40, 50);
	(ix<=elRadius*scaleX-getRandomInt(10,30) && (i<maxNodeCount));
	 ix+=dens){
	ky = Math.pow(elRadius.sqr() - (ix/scaleX).sqr(), 0.5);
	nodeXarray.push(Math.round(ix));
	nodeYarray.push(Math.round(-ky));
	nodeCharArray.push(String.fromCharCode(nameCode + i));
	i++;
}
var tmp = i;
for (var ix = -elRadius * scaleX + getRandomInt(10, 20); (ix <= elRadius * scaleX - getRandomInt(10, 30) && (i < maxNodeCount + tmp)); ix += dens){
	ky = Math.pow(elRadius.sqr()-(ix/scaleX).sqr(), 0.5);
	nodeXarray.push(Math.round(ix));
	nodeYarray.push(Math.round(ky));
	nodeCharArray.push(String.fromCharCode(nameCode+i));
	i++;
}
var nodeCount = i;

/*Create path matrix*/
var nodePathArray = [];
for (var i = 0; i < nodeCount; i++){
	nodePathArray[i] = [];
	for (var j=0; j < nodeCount; j++){
		nodePathArray[i][j] = '-';
	}
}
for (var i = 0; i < nodeCount; i++){
	for (var j=0; j < nodeCount; j++){
		var startNodeConnections = countNodeParents(nodePathArray, i) + countNodeChildren(nodePathArray, i);
		var endNodeConnections = countNodeParents(nodePathArray, j) + countNodeChildren(nodePathArray, j);
		if(i < j && startNodeConnections <= maxNodeConnections && endNodeConnections <= maxNodeConnections){
			nodePathArray[i][j] = ['+','-'].iz();
		}
	}
}

/*Generate question*/
var startNodeId = getRandomInt(0, 2);
var endNodeId = getRandomInt(nodeCount - 4, nodeCount - 1);
var q = 'На рисунке изображены города, некоторые из которых соединены дорогами.' +
	'Двигаться по дорогам можно только в направлении, указанном стрелкой. ' +
	'Найдите число путей из города ' +
	nodeCharArray[startNodeId] + ' в город ' + nodeCharArray[endNodeId] + '.';

/*Generate answer*/
searchNode(nodePathArray, startNodeId, endNodeId);
window.vopr.ver = ['' + wayCount];

/*Drawing on canvas*/
var slid=sl(1000000000);
window.vopr.dey = function(){
	var ris = document.getElementById('ris'+slid);
	var ct = ris.getContext('2d');
	var maxX = (ris.width)/2;
	var maxY = (ris.height)/2;
	ct.translate(maxX, maxY);

	/*Drawing properties*/
	var fontSize = '14';
	ct.font = fontSize + 'pt sans-serif';
	ct.lineWidth = 2;
	ct.fillStyle = '#000000';

	/*Corners*/
	ct.drawFilledCircle(-maxX, +maxY, 7);
	ct.drawFilledCircle(+maxX, -maxY, 7);
	ct.drawFilledCircle(-maxX, -maxY, 7);
	ct.drawFilledCircle(+maxX, +maxY, 7);

	/*Nodes and arrows*/
	for (var i2 = 0; i2 < nodeCount; i2++){
		for (var j2 = 0; j2 < nodeCount; j2++){
			if(i2!=j2 && nodePathArray[i2][j2]=='+'){
				var startNode2 = new Complex(nodeXarray[i2], nodeYarray[i2]);
				var endNode2 = new Complex(nodeXarray[j2], nodeYarray[j2]);
				var edgeLength = new Complex().sum(startNode2, endNode2.minus()).norma();
				var lmbd = (edgeLength+baseRadius+arrowShift)/(baseRadius+arrowShift);
				var midPoint = new Complex().sum(
					startNode2,
					endNode2.umn(lmbd)
					).umn(1/(1+lmbd));
				ct.drawArrow(nodeXarray[i2], nodeYarray[i2], midPoint.re, midPoint.im);
			}
		}
	}

	/*Set nodes text*/
	for(var i2 = 0; i2 < nodeCount; i2++){
		ct.fillStyle = '#000000';
		ct.drawFilledCircle(nodeXarray[i2], nodeYarray[i2], baseRadius);
		ct.fillStyle = '#FFFFFF';
		ct.drawFilledCircle(nodeXarray[i2],nodeYarray[i2], baseRadius-2);
		ct.fillStyle = '#000000';
		ct.fillText((nodeCharArray[i2]), nodeXarray[i2] - fontSize / 2, nodeYarray[i2] + fontSize/2);
	};
	$('#ris').attr('id','');
};

window.vopr.txt ='<canvas style="float:left;margin-right:1em;" width="600" height="400" id="ris'+
slid+'" style="text-align:center" opozn="' + Math.random()+'"></canvas>'+
q +'';

})();
//by _zevs
