'use strict';
Circle.prototype.drawOnto = function(ctx) {
	ctx.beginPath();
	ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.closePath();
};
