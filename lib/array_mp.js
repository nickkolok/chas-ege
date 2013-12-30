Array.prototype.mp_prov=function(){'use strict';
	var fl=true;
	var len=this.length-1;
	for(;(len+1)&&fl;len--)
		fl=fl&&(this[len].a!=undefined)&&(this[len].b!=undefined);
	return fl;
}

Array.prototype.mp_tPeres=function(){'use strict';
	if(!this.mp_prov())
		return undefined;
	
	var x;
	var y;
	if(this[0].a.abs()==Infinity){
		x=this[0].b;
		y=this[1].a*x+this[1].b;
	}else if(this[1].a.abs()==Infinity){
		x=this[1].b;
		y=this[0].a*x+this[0].b;
	}else{
		var c=this[1].a-this[0].a;
		if(c==0)
			if(this[0].b==this[1].b)
				x=y=Infinity;
			else
				x=y=NaN;
		else{
			x=(this[0].b-this[1].b)/(this[1].a-this[0].a);
			y=this[0].a*x+this[0].b;
		}
	}	
	return {x:x,y:y};
}

var docsArray;
if(!docsArray)
	docsArray={};

for(var chto in Array.prototype){
	docsArray[chto]=Array.prototype[chto];
	Object.defineProperty(Array.prototype, chto, { enumerable: false });
}
