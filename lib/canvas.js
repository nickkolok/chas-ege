'use strict';

CanvasRenderingContext2D.prototype.drawLine=function(x1,y1,x2,y2){
	this.beginPath();
	this.moveTo(x1,y1);
	this.lineTo(x2,y2);
	this.stroke();
	this.closePath();
}

CanvasRenderingContext2D.prototype.setka=function(s,n){
	for(var i=-n;i<=n;i++){
		this.drawLine(-s*n,s*i,s*n,s*i);
		this.drawLine(s*i,-s*n,s*i,s*n);
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

CanvasRenderingContext2D.prototype.fillKrug=function(x,y,r){
	this.beginPath();
	this.arc(x,y, r, 0, 2*Math.PI, false);
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
CanvasRenderingContext2D.prototype.drawCoordPlane = function(w, h, kl, text, mash) {
	//kl объект с полями: hor,ver
	//text объект с полями: x1,y1,sh1,sh2 (единичные отрезки и размер шрифта к ним)
	//sh1, sh2 по умолчанию 12px
	//mash - масштаб, по умолчанию mash=1
	if(mash!=undefined){
		kl.hor *= mash;
		kl.ver *= mash;}
	var width = (w / 2) % (kl.hor);
	var height = (h / 2) % (kl.ver);
	this.lineWidth = 0.5;
	this.setkaVer2(w, h, kl.hor, kl.ver);
	this.translate(w / 2 - width, h / 2 - height);
	//стрелки
	this.lineWidth = 1.5;
	this.drawArrow(0, h / 2 + height - 10, 0, -h / 2 + height + 10);
	this.drawArrow(-w / 2 + width + 10, 0, w / 2 + width - 10, 0);
	this.font = "12px liberation_sans";
	this.fillText(`x`, w / 2 + width - 20, 15);
	this.fillText(`y`, -15, -h / 2 + height + 20);
	//единичные отрезки
	this.font = "12px liberation_sans";
	this.fillText("0", -10, 12);
	this.drawLine(kl.hor, 5, kl.hor, -5);
	this.drawLine(-5, -kl.ver, 5, -kl.ver);
	this.font = '' + (text.sh1 || 12) + 'px liberation_sans';
	this.fillText(text.x1, kl.hor, 15);
	this.font = '' + (text.sh2 || 12) + 'px liberation_sans';
	this.fillText(text.y1, -15, -kl.ver);
};
CanvasRenderingContext2D.prototype.setkaVer2 = function(h, w, hor, ver, mash) {
	if(mash===undefined)
		mash=1;
	else{
	hor *= mash;
	ver *= mash;}
	for (let i = 0; i < w; i += hor)
		this.drawLine(i, 0, i, w);
	for (let i = 0; i < h; i += ver)
		this.drawLine(0, i, h, i);
};

CanvasRenderingContext2D.prototype.drawParallelepiped = function (o, dottedLine, diagonal, setLineDash) {

	dottedLine = dottedLine || [];
	diagonal = false || diagonal;
	setLineDash = setLineDash || [5, 2];
	o.lengthOfEdge = o.lengthOfEdge || false;
	o.scale = o.scale || 1 / 20;
	o.strokeStyle = o.strokeStyle || 'black';
	o.diagonalStrokeStyle = '#0099ff' || o.diagonalStrokeStyle;


	while (o.angle > Math.PI)
		o.angle -= Math.PI;
	if (o.angle === undefined || o.angle == Math.PI / 2)
		o.angle = Math.PI / 6;

	let sideCoordinates = [
		[0, 0, 0, o.height], //0
		[o.width, 0, o.width, o.height], //1
		[0, 0, o.width, 0], //2
		[0, o.height, o.width, o.height], //3
		[0, o.height, o.depth * o.angle.cos(), o.depth / 2 + o.height], //4
		[o.width, o.height, o.depth * o.angle.cos() + o.width, o.depth / 2 + o.height], //5
		[0, 0, o.depth * o.angle.cos(), o.depth / 2], //6
		[o.width, 0, o.depth * o.angle.cos() + o.width, o.depth / 2], //7
		[o.depth * o.angle.cos(), o.depth / 2, o.depth * o.angle.cos(), o.depth / 2 + o.height], //8
		[o.depth * o.angle.cos() + o.width, o.depth / 2, o.depth * o.angle.cos() + o.width, o.depth / 2 + o.height], //9
		[o.depth * o.angle.cos(), o.depth / 2, o.depth * o.angle.cos() + o
			.width, o.depth / 2
		], //10
		[o.depth * o.angle.cos(), o.depth / 2 + o.height, o.depth * o.angle.cos() + o.width, o.depth / 2 + o.height] //11
	];

	this.strokeStyle = o.strokeStyle;

	for (let i = 0; i < 12; i++) {
		if (dottedLine.includes(i))
			this.setLineDash(setLineDash);
		this.drawLine(sideCoordinates[i][0], sideCoordinates[i][1], sideCoordinates[i][2], sideCoordinates[i][3]);
		this.setLineDash([]);
	}

	//диагональ
	if (diagonal) {
		this.strokeStyle = o.diagonalStrokeStyle;
		this.setLineDash(setLineDash);
		this.drawLine(0, 0, o.depth * o.angle.cos() + o.width, o.depth / 2 + o.height);
		this.setLineDash([]);
		this.strokeStyle = o.strokeStyle;
	}

	//длины сторон
	let edge = [
		[o.width + 0.5, o.height / 2],
		[o.width / 2, -0.5],
		[o.depth * o.angle.cos() / 2 + o.width, o.depth / 2 + o.height]
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
