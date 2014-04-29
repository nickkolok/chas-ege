'use strict';

CanvasRenderingContext2D.prototype.fillKrug=function(x,y,r){
this.beginPath();
    this.arc(x,y, r, 0, 2*Math.PI, false);
    this.fill();
}

CanvasRenderingContext2D.prototype.drawLine=function(x1,y1,x2,y2)
{
this.beginPath();
this.moveTo(x1,y1);
this.lineTo(x2,y2);
this.stroke();
this.closePath();
}

CanvasRenderingContext2D.prototype.drawLineSpec=function(x1,y1,x2,y2)
{
	var m = (x1-x2);
	var n = (y1-y2);
	var k = (n/m);
	
	console.log('DEBUG:  X1 = '+x1);
	console.log('DEBUG:  X2 = '+x2);
	console.log('DEBUG:  Y1 = '+y1);
	console.log('DEBUG:  Y2 = '+y2);
	console.log('DEBUG:  dX = '+(x1-x2));
	console.log('DEBUG:  dY = '+(y1-y2));
	
	if(x1==x2)
	{
		for(var iy = Math.min(y1,y2); iy < Math.max(y1,y2); iy += 14)
		{
			this.drawLine(x1,iy,x1,iy+7);
		}
		
	}
	
	if(y1==y2)
	{
		for(var ix = Math.min(x1,x2); ix < Math.max(x1,x2); ix += 14)
		{
			this.drawLine(ix, y1, ix+7, y1);
			
		}
		
	}
	
	if((x2>x1)&(y2>y1))
	{
		console.log('x2>x1, y2>y1');
		for (var ix=x1+7; ix<x2; ix+=14)
		{
			this.drawLine(ix, y1+ix-x1, ix+7, y1+ix-x1+7); 
		} 
	}
	
	if((x2>x1)&(y2<y1))
	{
		console.log('x2>x1, y2>y1');
		for (var ix=x1+7; ix<x2; ix+=14)
		{
			this.drawLine(ix, y1-ix-x1, ix+7, y1-ix-x1-7); 
		} 
	}
	
	if((x2<x1)&(y2<y1))
	{
		console.log('x2>x1, y2>y1');
		for (var ix=x2+7; ix<x1; ix+=14)
		{
			this.drawLine(ix, y2+ix-x2, ix+7, y2+ix-x2+7); 
		} 
	}
	
	if((x2<x1)&(y2>y1))
	{
		console.log('x2>x1, y2>y1');
		for (var ix=x2+7; ix<x1; ix+=14)
		{
			this.drawLine(ix, y2-ix+x2, ix+7, y2-ix+x2-7); 
		} 
	}

	
}

CanvasRenderingContext2D.prototype.setka=function(s,n)
{
var i=-n;
for(;i<=n;i++)
{
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
// this.drawLine(s*n1,s*i,s*n,s*i);
}




/*
 * 
 * 
	if((x2>x1)&(y2<y1))
	{
		//ct.drawLine(x1,y1,x2,y2);
		for (var ix=x1; ix<x2; ix+=10)
		{
			
			if((ix-x1)%20 == 0)
			{
				this.beginPath();
				this.moveTo(ix, -n*ix/m);
				this.lineTo(ix+10,-n*(ix+10)/m);
				this.stroke();
				this.closePath();
			}		 			
		} 
	}
	if((x2<x1)&(y2>y1))
	{
		//ct.drawLine(x1,y1,x2,y2);
		for (var ix=x2; ix<x1; ix+=10)
		{
			if((ix-x2)%20 == 0)
			{
					this.beginPath();
					this.moveTo(ix, n*ix/m);
					this.lineTo(ix+10,n*(ix+10)/m);
					this.stroke();
					this.closePath();
			}			
		} 
	}
	if((x2<x1)&(y2<y1))
	{
		//ct.drawLine(x1,y1,x2,y2);
		for (var ix=x2; ix<x1; ix+=10)
		{
			if((ix-x2)%20 == 0)
			{
					this.beginPath();
					this.moveTo(ix, -n*ix/m);
					this.lineTo(ix+10,-n*(ix+10)/m);
					this.stroke();
					this.closePath();
			}			
		} 
	} 
 */ 
CanvasRenderingContext2D.prototype.isCanvasRenderingContext2D=true;
