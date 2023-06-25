'use strict';

CanvasRenderingContext2D.prototype.drawLine=function(x1,y1,x2,y2){
	this.beginPath();
	this.moveTo(x1,y1);
	this.lineTo(x2,y2);
	this.stroke();
	this.closePath();
}
CanvasRenderingContext2D.prototype.regularGrid=
CanvasRenderingContext2D.prototype.setka=function(squareSide,squaresQuantity){
	for(var i=-squaresQuantity;i<=squaresQuantity;i++){
		this.drawLine(-squareSide*squaresQuantity,squareSide*i,squareSide*squaresQuantity,squareSide*i);
		this.drawLine(squareSide*i,-squareSide*squaresQuantity,squareSide*i,squareSide*squaresQuantity);
	}
}

CanvasRenderingContext2D.prototype.setkaXY=function(s,n1,n2,n3,n4){
	for(var i=n1;i<=n2;i++){
		this.drawLine(s*i,s*n3,s*i,s*n4);
	}
	for(i=n3;i<=n4;i++){
		this.drawLine(s*n1,s*i,s*n2,s*i);
	}
}
CanvasRenderingContext2D.prototype.drawFilledCircle=
CanvasRenderingContext2D.prototype.fillKrug=function(x,y,radius){
	this.beginPath();
	this.arc(x,y, radius, 0, 2*Math.PI, false);
	this.fill();
}

CanvasRenderingContext2D.prototype.drawLineSpec=function(x1,y1,x2,y2){
	var m = (x1-x2);
	var n = (y1-y2);
	var k = (n/m);

	if(x1==x2){
		for(var iy = Math.min(y1,y2); iy < Math.max(y1,y2); iy += 14){
			this.drawLine(x1,iy,x1,iy+7);
		}
	}

	if(y1==y2){
		for(var ix = Math.min(x1,x2); ix < Math.max(x1,x2); ix += 14){
			this.drawLine(ix, y1, ix+7, y1);
		}
	}

	if((x2>x1)&(y2>y1)){
		for (var ix=x1+7; ix<x2; ix+=14){
			this.drawLine(ix, y1+ix-x1, ix+7, y1+ix-x1+7);
		}
	}

	if((x2>x1)&(y2<y1)){
		for (var ix=x1+7; ix<x2; ix+=14){
			this.drawLine(ix, y1-ix-x1, ix+7, y1-ix-x1-7);
		}
	}

	if((x2<x1)&(y2<y1)){
		for (var ix=x2+7; ix<x1; ix+=14){
			this.drawLine(ix, y2+ix-x2, ix+7, y2+ix-x2+7);
		}
	}

	if((x2<x1)&(y2>y1)){
		for (var ix=x2+7; ix<x1; ix+=14){
			this.drawLine(ix, y2-ix+x2, ix+7, y2-ix+x2-7);
		}
	}
}

CanvasRenderingContext2D.prototype.drawArrow=function(x1, y1, x2, y2, arrowType) {
	var startA = 10;
	var startB = 3.75;
	var startC = Math.sqrt(Math.pow(startA, 2) + Math.pow(startB, 2));
	var change_arrow_radians = Math.atan2(startB, startA);
	//Calculate the change of the arrow head (i.e. horizontal, vertical or diagonal)
	var change_x_main = Math.abs(x1 - x2); //Adjacent
	var change_y_main = Math.abs(y1 - y2); //Opposite
	var change_angle_radians = Math.atan2(change_y_main, change_x_main);
	var change_angle_degrees = change_angle_radians * ( 180 / Math.PI);
	var change_x_0_arrowhead = Math.cos(change_angle_radians + change_arrow_radians) * startC;
	var change_y_0_arrowhead = Math.sin(change_angle_radians + change_arrow_radians) * startC;
	var change_x_1_arrowhead = Math.cos(change_angle_radians - change_arrow_radians) * startC;
	var change_y_1_arrowhead = Math.sin(change_angle_radians - change_arrow_radians) * startC;
	this.beginPath();

	/*Determines type of arrow*/
	if (arrowType == true) {
		if (((x1 < x2) && (y1 > y2)) || ((x1 == x2) && (y1 > y2))) {
			this.moveTo(x1, y1);
			this.lineTo(x2, y2);
			this.moveTo(x1 + change_x_0_arrowhead, y1 - change_y_0_arrowhead);
			this.lineTo(x1, y1);
			this.lineTo(x1 + change_x_1_arrowhead, y1 - change_y_1_arrowhead);
		} else if ((x1 > x2) && (y1 > y2)) {
			this.moveTo(x1, y1);
			this.lineTo(x2, y2);
			this.moveTo(x1 - change_x_0_arrowhead, y1 - change_y_0_arrowhead);
			this.lineTo(x1, y1);
			this.lineTo(x1 - change_x_1_arrowhead, y1 - change_y_1_arrowhead);
		} else if (((x1 < x2) && (y1 < y2)) || ((x1 < x2) && (y1 == y2))) {
			this.moveTo(x1, y1);
			this.lineTo(x2, y2);
			this.moveTo(x1 + change_x_0_arrowhead, y1 + change_y_0_arrowhead);
			this.lineTo(x1, y1);
			this.lineTo(x1 + change_x_1_arrowhead, y1 + change_y_1_arrowhead);
		} else if (((x1 > x2) && (y1 < y2)) || ((x1 > x2) && (y1 == y2)) || ((x1 == x2) && (y1 < y2))) {
			this.moveTo(x1, y1);
			this.lineTo(x2, y2);
			this.moveTo(x1 - change_x_0_arrowhead, y1 + change_y_0_arrowhead);
			this.lineTo(x1, y1);
			this.lineTo(x1 - change_x_1_arrowhead, y1 + change_y_1_arrowhead);
		}
	}else { //To the outside of the circle
		if (((x1 < x2) && (y1 > y2)) || ((x1 < x2) && (y1 == y2)) || ((x1 == x2) && (y1 > y2))) {
			this.moveTo(x1, y1);
			this.lineTo(x2, y2);
			this.moveTo(x2 - change_x_0_arrowhead, y2 + change_y_0_arrowhead);
			this.lineTo(x2, y2);
			this.lineTo(x2 - change_x_1_arrowhead, y2 + change_y_1_arrowhead);
		} else if (((x1 > x2) && (y1 > y2)) || ((x1 > x2) && (y1 == y2))){
			this.moveTo(x1, y1);
			this.lineTo(x2, y2);
			this.moveTo(x2 + change_x_0_arrowhead, y2 + change_y_0_arrowhead);
			this.lineTo(x2, y2);
			this.lineTo(x2 + change_x_1_arrowhead, y2 + change_y_1_arrowhead);
		} else if (x1 < x2 && y1 < y2){
			this.moveTo(x1, y1);
			this.lineTo(x2, y2);
			this.moveTo(x2 - change_x_0_arrowhead, y2 - change_y_0_arrowhead);
			this.lineTo(x2, y2);
			this.lineTo(x2 - change_x_1_arrowhead, y2 - change_y_1_arrowhead);
		} else if (((x1 > x2) && (y1 < y2)) || ((x1 == x2) && (y1 < y2))) {
			this.moveTo(x1, y1);
			this.lineTo(x2, y2);
			this.moveTo(x2 + change_x_0_arrowhead, y2 - change_y_0_arrowhead);
			this.lineTo(x2, y2);
			this.lineTo(x2 + change_x_1_arrowhead, y2 - change_y_1_arrowhead);
		}
	}
	this.stroke();
}
CanvasRenderingContext2D.prototype.drawCoordPlane =
CanvasRenderingContext2D.prototype.drawCoordinatePlane = function(width, height, cell, text, scale) {
	//cell объект с полями: hor,ver
	//text объект с полями: x1,y1,sh1,sh2 (единичные отрезки и размер шрифта к ним)
	//sh1, sh2 по умолчанию 12px
	//scale - масштаб, по умолчанию scale=1
	if(scale!=undefined){
		cell.hor *= scale;
		cell.ver *= scale;}
	let widthHalf = (width / 2) % (cell.hor);
	let heightHalf = (height / 2) % (cell.ver);
	this.lineWidth = 0.5;
	this.irregularGrid(width, height, cell.hor, cell.ver);
	this.translate(width / 2 - widthHalf, height / 2 - heightHalf);
	//стрелки
	this.lineWidth = 1.5;
	this.drawArrow(0, height / 2 + heightHalf - 10, 0, -height / 2 + heightHalf + 10);
	this.drawArrow(-width / 2 + widthHalf + 10, 0, width / 2 + widthHalf - 10, 0);
	this.font = "12px liberation_sans";
	this.fillText(`x`, width / 2 + widthHalf - 20, 15);
	this.fillText(`y`, -15, -height / 2 + heightHalf + 20);
	//единичные отрезки
	this.font = "12px liberation_sans";
	this.fillText("0", -10, 12);
	this.drawLine(cell.hor, 5, cell.hor, -5);
	this.drawLine(-5, -cell.ver, 5, -cell.ver);
	this.font = '' + (text.sh1 || 12) + 'px liberation_sans';
	this.fillText(text.x1, cell.hor, 15);
	this.font = '' + (text.sh2 || 12) + 'px liberation_sans';
	this.fillText(text.y1, -15, -cell.ver);
};
CanvasRenderingContext2D.prototype.setkaVer2 =
CanvasRenderingContext2D.prototype.irregularGrid = function(width, height, cellWidth, cellHeight, scale) {
	if(scale === undefined)
		scale = 1;
	else{
		cellWidth *= scale;
		cellHeight *= scale;
	}
	for (let i = 0; i < width; i += cellWidth)
		this.drawLine(i, 0, i, height);
	for (let i = 0; i < height; i += cellHeight)
		this.drawLine(0, i, width, i);
};

CanvasRenderingContext2D.prototype.drawParallelepiped = function(o, dottedLine, diagonal, setLineDash) {

	dottedLine = dottedLine || [];
	diagonal = false || diagonal;
	setLineDash = setLineDash || [5, 2];
	o.lengthOfEdge = o.lengthOfEdge || false;
	o.scale = o.scale|| 1/20;
	while (o.angle > Math.PI)
		o.angle -= Math.PI;
	if (o.angle === undefined || o.angle == Math.PI / 2 || o.angle == 3 * Math.PI / 2)
		o.angle = Math.PI / 6;

	let sideCoordinates = [
		[0, 0, 0, o.height], //0
		[o.width, 0, o.width, o.height], //1
		[0, 0, o.width, 0], //2
		[0, o.height, o.width, o.height], //3
		[0, o.height, o.depth * (o.angle).cos(), o.depth / 2 + o.height], //4
		[o.width, o.height, o.depth * (o.angle).cos() + o.width, o.depth / 2 + o.height], //5
		[0, 0, o.depth * (o.angle).cos(), o.depth / 2], //6
		[o.width, 0, o.depth * (o.angle).cos() + o.width, o.depth / 2], //7
		[o.depth * (o.angle).cos(), o.depth / 2, o.depth * (o.angle).cos(), o.depth / 2 + o.height], //8
		[o.depth * (o.angle).cos() + o.width, o.depth / 2, o.depth * (o.angle).cos() + o.width, o.depth / 2 + o.height], //9
		[o.depth * (o.angle).cos(), o.depth / 2, o.depth * (o.angle).cos() + o
			.width, o.depth / 2
		], //10
		[o.depth * (o.angle).cos(), o.depth / 2 + o.height, o.depth * (o.angle).cos() + o.width, o.depth / 2 + o.height] //11
	];

	for (let i = 0; i < 12; i++) {
		if (dottedLine.includes(i))
			this.setLineDash(setLineDash);
		this.drawLine(sideCoordinates[i][0], sideCoordinates[i][1], sideCoordinates[i][2], sideCoordinates[i][3]);
		this.setLineDash([]);
	}

	//диагональ
	if (diagonal) {
		this.strokeStyle = '#0099ff';
		this.setLineDash(setLineDash);
		this.drawLine(0, 0, o.depth * (o.angle).cos() + o.width, o.depth / 2 + o.height);
		this.setLineDash([]);
		this.strokeStyle = 'black';
	}

	//длины сторон
	let edge = [
		[o.width + 0.5, o.height / 2],
		[o.width / 2, -0.5],
		[o.depth * (o.angle).cos() / 2 + o.width, o.depth / 2 + o.height]
	];
	let length = [o.height, o.width, o.depth * 1.5];
	if (o.lengthOfEdge) {
		this.scale(1 / o.scale, 1 / o.scale);
		for (let i = 0; i < edge.length; i++)
			this.fillText(length[i], edge[i][0] * o.scale, edge[i][1] * o.scale);
	}
};
CanvasRenderingContext2D.prototype.isCanvasRenderingContext2D=true;

/*Иначе огнелисичка матюкается
var docsCanvas;
if(!docsCanvas)
	docsCanvas={};

for(var chto in CanvasRenderingContext2D.prototype){
	docsCanvas[chto]=CanvasRenderingContext2D.prototype[chto];
//	Object.defineProperty(CanvasRenderingContext2D.prototype, chto, { enumerable: false });
}*/
