Array.prototype.shuffle = function(b){'use strict';
 var i = this.length, j, t;
 while( i ) 
 {
  j = Math.floor( ( i-- ) * Math.random() );
  t = b && typeof this[i].shuffle!=='undefined' ? this[i].shuffle() : this[i];
  this[i] = this[j];
  this[j] = t;
 }

 return this;
};//взято с tigir.com . Хорошо бы переписать ручками с нуля...

Array.prototype.soed=function(){'use strict';
	return this.join('');
};

Array.prototype.sum=function(){'use strict';
	var a=0;
	var b=this.length;
	for(var i=0;i<b;i++){
		if((this[i]>0)||(this[i]<0)){
			a+=this[i];
		}
	}
 return a;
};

Array.prototype.sumObj=function(){'use strict';
	var a=0;
	var b=this.length;
	for(var i=0;i<b;i++){
		a=objSum(a,this[i]);
	}
 return a;
};

Array.prototype.umnObj=function(){'use strict';
	var a=1;
	var b=this.length;
	for(var i=0;i<b;i++){
		a=objUmn(a,this[i]);
	}
 return a;
};

Array.prototype.min=function(f){'use strict';
	var i;
	var m=0;
	if(f){
		for(i=1;i<this.length;i++){
			if(this[i]<this[m]){
				m=i;
			}
		}
	}else{
		for(i=1;i<this.length;i++){
			if(this[i]<=this[m]){
				m=i;
			}
		}
	}
	return m;
}

Array.prototype.max=function(f){'use strict';
	var i;
	var m=0;
	if(f){
		for(i=1;i<this.length;i++){
			if(this[i]>this[m]){
				m=i;
			}
		}
	}else{
		for(i=1;i<this.length;i++){
			if(this[i]>=this[m]){
				m=i;
			}
		}
	}
	return m;
}

Array.prototype.minE=function(){'use strict';
	return this[this.min()];
}

Array.prototype.maxE=function(){'use strict';
	return this[this.max()];
}

Array.prototype.toStandart=function(){'use strict';
	var len=this.length-1;
	for(;len+1;len--){
		this[len]=this[len].toStandart();
	}
}

Array.prototype.iz=function(p1){'use strict';
	var a=sluchiz(this,p1);
	if(p1){
		return a;
	}else{
		return a[0];
	}
}

Array.prototype.tr=function(p1,p2){'use strict';
	var len=this.length-1;
	var str='';
	for(;len+1;len--){
		str=this[len].vTag(p1?p1:'td')+str;
	}
	return str.vTag(p2?p2:'tr');
}

Array.prototype.zapslch=function(m,n,p1,p2,p3){'use strict';
	for(;m<=n;m++){
		this[m]=sluchch(p1,p2,p3);
	}
	return this;
}

Array.prototype.N=function(p1,p2){'use strict';
	for(var i=0;i<p1;this[i++]=(p2?i*p2:i));
	this.length=p1;
	return this;
}

Array.prototype.sluchiz=function(n){'use strict';
	return sluchiz(this,n);
}

Array.prototype.malRazn=function(n,s,p){'use strict';//Заполняет массив значениями, каждое из к-рых отличается от предыдущего не более, чем на s*p, и притом с шагом дискретизации s
// n - сколько элементов добавляем
// s - шаг изменения
// p - максимальное количество шагов изменения (в обе стороны)
	for(var i=1;i<=n;i++)
		this[i]=this[i-1]+s*sluchch(-p,p);
	return this;
}

Array.prototype.pervSovp=function(p1){'use strict';
	for(var i=0;i<this.length;i++)
		if(this[i]==p1)
			return i;
	return -1;
}

Array.prototype.poslSovp=function(p1){'use strict';
	for(var i=this.length-1;i>=0;i--)
		if(this[i]==p1)
			return i;
	return -1;
}

Array.prototype.sovp=function(p1){'use strict';
	var s=0;
	for(var i=this.length-1;i>=0;i--)
		if(this[i]==p1)
			s++;
	return s;
}

Array.prototype.toFixedLess=function(p1){'use strict';
	var a=[];
	var len=this.length;
	for(var i=0;i<len;i++)
		a[i]=this[i].toFixedLess(p1);
	return a;
}

Array.prototype.dopFixedLess=function(p1){'use strict';
	var len=this.length;
	for(var i=0;i<len;i++)
		this[i]=[this[i],this[i].toFixedLess(p1)];
	return this;
}

Array.prototype.T=function(){'use strict';
	var l1=this.length;
	var l2=0;
	for(var i=0;i<l1;i++)
		if(this[i].length>l2)
			l2=this[i].length;
	var a=[];
	for(i=0;i<l2;i++)
		a[i]=[];
	for(i=0;i<l1;i++)
		for(var j=0;j<l2;j++)
			a[j][i]=this[i][j];
	return a;
}

Array.prototype.zapMonot=function(n,a,minD,maxD,shag){'use strict';
	this[0]=a;
	for(var i=1;i<n;i++)
		this[i]=this[i-1]+sluchch(minD,maxD,shag);
	return this;
}

Array.prototype.udFunc=function(f1){'use strict';
	return this.map(f1).sum();
}

Array.prototype.kolvoMzhd=function(min,max,vkl){'use strict';
	return this.udFunc(function(p1){
		return vkl?p1>=min&&p1<=max:p1>min&&p1<max;
	});
}

Array.prototype.isArray=true;

Array.prototype.mn_plus=function(p1){'use strict';
	var b=this.slice()
	if(p1.isNumber){
		b[0]+=p1;
		return b;
	}
	if(!p1.isArray)
		return this;
	if(p1.length>this.length)
		return p1.mn_plus(this);

	var len=p1.length;
	for(var i=0; i<len;i++)
		b[i]+=p1[i];
	return b;
}

Array.prototype.mn_umn=function(p1){'use strict';
	var b=this.slice()
	if(p1.isNumber){
		return this.map(function(p2){'use strict';return p1*p2;});
	}
	if(!p1.isArray){
		return this;
	}
	if(p1.length>this.length){
		return p1.mn_umn(this);
	}
	var c=p1.slice()
	var d=[];
	var len=p1.length;
	for(var i=0; i<len;i++){
		d=d.mn_plus(b.mn_umn(p1[i]));
		b.unshift(0);
	}
	return d;
}

Array.prototype.slag=function(){'use strict';
	return this.shuffle().join('+');
}

Array.prototype.addPrefix=function(p1){'use strict';
	return this.map(function(p2){'use strict';return p1+p2;});
}

Array.prototype.toSum=function(a){'use strict';
	if(a==undefined)
		a=1;
	var s=this.sum();
	return this.map(function(p1){'use strict';return a*p1/s});
}

Array.prototype.sumPyram=function(){'use strict';
	for(var i=1;i<this.length;i++)
		this[i]+=this[i-1];
	return this;
}

Array.prototype.sVeroyatn=function(){'use_strict';
	var th=this.toSum().sumPyram();
	var a=Math.random();
	var i;
	for(i=0; a>th[i] && i<th.length ;i++);
	return i;
}

Array.prototype.hasElem=function(a){'use_strict';
	return this.some(function(p1){
		return p1==a;
	});
}

Array.prototype.matrToVect=function(n){'use_strict';
	if(n>1)
		return this.matrToVect(n-1).matrToVect();
	else{
		var rez=[];
		var len=this.length;
		for(var i=0;i<len;i++){
			rez=rez.concat(this[i]);
		}
		return rez;
	}
}

Array.prototype.ob$=function(){'use_strict';
	return this.map(function(p1){'use strict';
		return (''+p1).ob$();
	});
}

Array.prototype.sortDelDubl=function(p1){'use_strict';
	if(this===[])
		return [];
	var a=this.slice().sort(p1);
	for(var i=0;i<a.length;i++)
		if(a[i]==a[i+1])
			a.splice(i--,1);
	return a;
}

Array.prototype.matrixToTex=function(){'use_strict';
	if(this==[])
		return '';
	return '\\begin{array}{c}'+
		this.map(function(p1){'use strict';
			return p1.isArray?
				p1.join(' & '):
				p1;
		}).join('\\\\')+
		'\\end{array}';
}

Array.prototype.det=function(){'use strict';
	return Determinant(this);
}

Array.prototype.inv=function(){'use strict';
	return InverseMatrix(this);
}

for(var chto in Array.prototype)
	Object.defineProperty(Array.prototype, chto, { enumerable: false });
