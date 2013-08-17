Array.prototype.shuffle = function( b )
{
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

Array.prototype.soed = function()
{
 return this.join('');
};

Array.prototype.sum = function()
{
	var a=0;
	var b=this.length;
	for(var i=0;i<b;i++)
	{
		if((this[i]>0)||(this[i]<0)){
			a+=this[i];
		}
	}
 return a;
};

Array.prototype.min=function(f){
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

Array.prototype.max=function(f){
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

Array.prototype.minE=function(){
	return this[this.min()];
}

Array.prototype.maxE=function(){
	return this[this.max()];
}

Array.prototype.toStandart=function(){
	var len=this.length-1;
	for(;len+1;len--)
	{
		this[len]=this[len].toStandart();
	}
}


Array.prototype.mt_prov=function(){
	var fl=true;
	var len=this.length-1;
	for(;(len+1)*fl;len--)
	{
		fl=fl*(this[len].x!=undefined)*(this[len].y!=undefined);
	}
	return fl;
};

Array.prototype.mt_s3ug=function(){
	if(!this.mt_prov()+(this.length<3)){return 0};
	return 0.5*(this[0].x*this[1].y+this[0].y*this[2].x+this[1].x*this[2].y-this[1].y*this[2].x-this[2].y*this[0].x-this[0].y*this[1].x).abs();
};

Array.prototype.mt_tgUnakl=function(){
	if(!this.mt_prov()+(this.length<2)){return undefined;}
	if(!(this[0].y-this[1].y)){return 0;}
	return (this[0].y-this[1].y)/(this[0].x-this[1].x);
}

Array.prototype.mt_is3ug=function(){
	if(!this.mt_prov()+(this.length<3)){return 0};
	return this.mt_tgUnakl()!=[this[1],this[2]].mt_tgUnakl();
};

Array.prototype.mt_uPeres=function(){
	if(!this.mt_prov()+(this.length<4)){return 0};
	var u=(this.mt_tgUnakl().atan()-[this[2],this[3]].mt_tgUnakl().atan()).abs();
	for(;u>=Math.PI;u=u-Math.PI);
	for(;u>Math.PI/2;u=u-Math.PI/2);
	return u;
};

Array.prototype.mt_isMnug=function(p1){
	if(
			(p1!=undefined)*(this.length!=p1)
		||	(this.length<3)
		||	(!this.mt_prov())
		||	(this.mt_dubli())
		||	(this.mt_estSamoper())
		){return 0;};
	
	var len=this.length-1;
	var fl=1;
	
	fl*=[this[0],this[len],this[len-1]].mt_is3ug();
	fl*=[this[0],this[1],this[len]].mt_is3ug();
	for(;len-1;len--){
		fl*=[this[len],this[len-1],this[len-2]].mt_is3ug();
	}

	return fl;
};

Array.prototype.mt_rasst=function(){
	if(!this.mt_prov()+(this.length<2)){return undefined;}
	
	return ((this[0].x-this[1].x).pow(2)+(this[0].y-this[1].y).pow(2)).sqrt();
};

Array.prototype.mt_s4ug=function(){
	if(!this.mt_isMnug(4)){return undefined;}
	
	return 0.5*[this[0],this[2]].mt_rasst()*[this[1],this[3]].mt_rasst()*[this[0],this[2],this[1],this[3]].mt_uPeres().sin();
};

Array.prototype.mt_dubli=function(){
	if(!this.mt_prov()){return undefined;};
	var fl=0;
	var len;
	var l2;
	for(len=this.length-1;len+1;len--){
		for(l2=this.length-1;l2>len;l2--){
			fl+=(this[len].x==this[l2].x&&this[len].y==this[l2].y);
		}
	}
	return fl;
}
 Array.prototype.mt_pryam=function(){
	if(!this.mt_prov()){return undefined;};
	var p1={};
	var a=this.mt_tgUnakl();
	if(a.abs()==Infinity){
		var b=this[0].x;
	}else{
		var b=this[0].y-a*this[0].x;
	}
	return {a:a,b:b};
 }

Array.prototype.mp_prov=function(){
	var fl=true;
	var len=this.length-1;
	for(;(len+1)*fl;len--)
	{
		fl=fl*(this[len].a!=undefined)*(this[len].b!=undefined);
	}
	return fl;

}
Array.prototype.mp_tPeres=function(){
	if(!this.mp_prov()){return undefined;};
	
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
		if(c==0){
			if(this[0].b==this[1].b){
				x=y=Infinity;
			}else{
				x=y=NaN;
			}
		}else{
			x=(this[0].b-this[1].b)/(this[1].a-this[0].a);
			y=this[0].a*x+this[0].b;
		}
	}	
	return {x:x,y:y};
}

Array.prototype.mt_join=function(p1){
	if(!this.mt_prov()){return undefined;};
//	console.log('!');
	if(!p1){p1=', ';}
	var p2='';
	var len=this.length-1;
	for(var l2=0;l2<len;l2++){
		p2+='('+this[l2].x+'; '+this[l2].y+')'+p1;
	}
	p2+='('+this[l2].x+'; '+this[l2].y+')';
	return p2;
}

Array.prototype.mt_otrPeres=function(){
	if(!this.mt_prov()){return undefined;};
	
	var p1=[[this[0],this[1]].mt_pryam(),[this[2],this[3]].mt_pryam()].mp_tPeres();
	if(p1.x==Infinity){
		return Infinity;
	}else if(p1.x.mzhd(this[0].x,this[1].x,1)&&p1.x.mzhd(this[2].x,this[3].x,1)&&p1.y.mzhd(this[0].y,this[1].y,1)&&p1.y.mzhd(this[2].y,this[3].y,1)){
		return 1;
	}
	return 0;
}

Array.prototype.mt_estSamoper=function(){
	if(!this.mt_prov()||this.length<3){return undefined;};
	var len=this.length;
	var th=this.concat(this,this);
	var fl=0;
	for(var l1=0;l1<len;l1++){
		for(var l2=l1+2;l2<=l1+len-2;l2++){
			fl+=[th[l1],th[l1+1],th[l2],th[l2+1]].mt_otrPeres();
//			console.log(l1,l1+1,l2,l2+1);
		}
	}
	return fl;
}

Array.prototype.mt_ladMnug=function(){
	if(
			(this.length<3)
		||	(!this.mt_prov())
		||	(this.mt_dubli())
		){return 0;};
	
	for(;!this.mt_isMnug();this.shuffle());
	//Крайне криво, но думать лень.
	return this;
}

Array.prototype.mt_perpend=function(){
	return (this.mt_uPeres()==Math.PI/2);
}

Array.prototype.mt_paral=function(){
	return this.mt_uPeres()==0;
}

Array.prototype.mt_imen4ug=function(){
	if(!this.mt_isMnug(4)){return 0;};
	var A=this[0];
	var B=this[1];
	var C=this[2];
	var D=this[3];
	var prug=	([A,B,B,C].mt_perpend())&&
				([B,C,C,D].mt_perpend())&&
				([A,D,D,C].mt_perpend());
	var rstor=	([A,B].mt_rasst()==[A,D].mt_rasst())*
				([C,B].mt_rasst()==[C,D].mt_rasst())+
				([B,A].mt_rasst()==[B,C].mt_rasst())*
				([D,A].mt_rasst()==[D,C].mt_rasst());
	var paral=	([A,B,C,D].mt_paral())+
				([A,D,B,C].mt_paral());
/*	console.log(prug);
	console.log([A,B,B,C].mt_uPeres()==Math.PI/2);
	console.log([B,C,C,D].mt_uPeres()==Math.PI/2);
	console.log([A,D,D,C].mt_uPeres()==Math.PI/2);
*/
	if(prug&&(rstor==2)){
		return {
			ie:'квадрат',
			re:'квадрата',
			de:'квадрату',
			ve:'квадрат',
			te:'квадратом',
			pe:'квадрате'
		}
	}else if(prug){
		return {
			ie:'прямоугольник',
			re:'прямоугольника',
			de:'прямоугольнику',
			ve:'прямоугольник',
			te:'прямоугольником',
			pe:'прямоугольнике'
		}
	}else if(rstor==2){
		return {
			ie:'ромб',
			re:'ромба',
			de:'ромбу',
			ve:'ромб',
			te:'ромбом',
			pe:'ромбе'
		}
	}else if(paral==2){
		return {
			ie:'параллелограмм',
			re:'параллелограмма',
			de:'параллелограмму',
			ve:'параллелограмм',
			te:'параллелограммом',
			pe:'параллелограмме'
		}
	}else if(paral==1){
		return {
			ie:'трапеция',
			re:'трапеции',
			de:'трапеции',
			ve:'трапецию',
			te:'трапецией',
			pe:'трапеции'
		}
	}else if(rstor==1){
		return {
			ie:'дельтоид',
			re:'дельтоида',
			de:'дельтоиду',
			ve:'дельтоид',
			te:'дельтоидом',
			pe:'дельтоиде'
		}
	}else{
		return {
			ie:'четырёхугольник',
			re:'четырёхугольника',
			de:'четырёхугольнику',
			ve:'четырёхугольник',
			te:'четырёхугольником',
			pe:'четырёхугольнике'
		}
	}						
};

Array.prototype.iz=function(p1){
	var a=sluchiz(this,p1);
	if(p1){
		return a;
	}else{
		return a[0];
	}
}

Array.prototype.tr=function(p1,p2){
	'use strict';
	var len=this.length-1;
	var str='';
	for(;len+1;len--){
		str=this[len].vTag(p1?p1:'td')+str;
	}
	return str.vTag(p2?p2:'tr');
}

Array.prototype.zapslch=function(m,n,p1,p2,p3){
	for(;m<=n;m++){
		this[m]=sluchch(p1,p2,p3);
	}
	return this;
}

Array.prototype.mn_proizv=function(){
	var len=this.length;
	var th=[];
	for(var i=0;i<len-1;i++){
		th[i]=clone(this[i+1]);
		th[i]=Drob.fixN(th[i]);
		th[i].ch=th[i].ch*(i+1);
		Drob.sokr(th[i]);
	}
	return th;
}

Array.prototype.mn_vychisl=function(x){
	var len=this.length;
	var s=0;
	for(var i=0;i<len;i++){
		this[i]=Drob.fixN(this[i]);
		s+=this[i].ch*x.pow(i)/this[i].zn;
	}
	return s;
}

Array.prototype.mn_txt=function(x){
	var len=this.length;
	this[0]=Drob.fixN(this[0]);
	var s=this[0].ch.frac(this[0].zn).esli(this[0].ch);
	for(var i=1;i<len;i++){
		this[i]=Drob.fixN(this[i]);
		if(this[i].ch){
			s= this[i].ch.frac(this[i].zn)+x+('^{'+i+'}').esli(i!=1)
				+'+'+s;
		}
	}
	return s.plusminus();
}

Array.prototype.mn_pervoobr=function(){
	var len=this.length;
	var th=[0];
	for(var i=1;i<len+1;i++){
		th[i]=clone(this[i-1]);
		th[i]=Drob.fixN(th[i]);
		th[i].zn=th[i].zn*i;
		Drob.sokr(th[i]);
	}
	return th;
}

Array.prototype.N=function(p1,p2){
	for(var i=0;i<p1;this[i++]=(p2?i*p2:i));
	this.length=p1;
	return this;
}


Array.prototype.sluchiz=function(n){
	return sluchiz(this,n);
}

Array.prototype.malRazn=function(n,s,p){//Заполняет массив значениями, каждое из к-рых отличается от предыдущего не более, чем на s*p, и притом с шагом дискретизации s
// n - сколько элементов добавляем
// s - шаг изменения
// p - максимальное количество шагов изменения (в обе стороны)
	for(var i=1;i<=n;i++){
		this[i]=this[i-1]+s*sluchch(-p,p);
	}
	return this;
}

Array.prototype.pervSovp=function(p1){
	for(var i=0;i<this.length;i++)
		if(this[i]==p1)
			return i;
	return -1;
}

Array.prototype.poslSovp=function(p1){
	for(var i=this.length-1;i>=0;i--)
		if(this[i]==p1)
			return i;
	return -1;
}

Array.prototype.sovp=function(p1){
	var s=0;
	for(var i=this.length-1;i>=0;i--)
		if(this[i]==p1)
			s++;
	return s;
}

Array.prototype.toFixedLess=function(p1){
	var a=[];
	var len=this.length;
	for(var i=0;i<len;i++)
		a[i]=this[i].toFixedLess(p1);
	return a;
}

Array.prototype.dopFixedLess=function(p1){
	var len=this.length;
	for(var i=0;i<len;i++)
		this[i]=[this[i],this[i].toFixedLess(p1)];
	return this;
}

Array.prototype.T=function(){
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

Array.prototype.zapMonot=function(n,a,minD,maxD,shag){
	this[0]=a;
	for(var i=1;i<n;i++)
		this[i]=this[i-1]+sluchch(minD,maxD,shag);
	return this;
}


/*Array.prototype.rezFunc=function(f1){
	var a=[];
	for(var i=0;i<this.length;i++)
		a[i]=f1(this[i]);
	return a;
}*///Велосипед. Ой, велосипед... Есть же map!

Array.prototype.udFunc=function(f1){
	return this.map(f1).sum();
}

Array.prototype.kolvoMzhd=function(min,max,vkl){
	return this.udFunc(function(p1){
		return vkl?p1>=min&&p1<=max:p1>min&&p1<max;
	});
}

Array.prototype.isArray=true;

Array.prototype.mn_plus=function(p1){
	var b=this.slice()
	if(p1.isNumber){
		b[0]+=p1;
		return b;
	}
	if(!p1.isArray){
		return this;
	}
	if(p1.length>this.length){
		return p1.mn_plus(this);
	}

	var len=p1.length;
	for(var i=0; i<len;i++){
		b[i]+=p1[i];
	}
	return b;
}

Array.prototype.mn_umn=function(p1){
	var b=this.slice()
	if(p1.isNumber){
		return this.map(function(p2){return p1*p2;});
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

Array.prototype.slag=function(){
	return this.shuffle().join('+');
}

Array.prototype.addPrefix=function(p1){
	return this.map(function(p2){return p1+p2;});
}

Array.prototype.toSum=function(a){
	if(a==undefined)
		a=1;
	var s=this.sum();
	return this.map(function(p1){return a*p1/s});
}

Array.prototype.sumPyram=function(){
	for(var i=1;i<this.length;i++)
		this[i]+=this[i-1];
	return this;
}

Array.prototype.sVeroyatn=function(){'use_strict';
	var th=this.toSum().sumPyram();
	var a=Math.random();
	console.log(a);
	var i;
	for(i=0; a>th[i] && i<th.length ;i++);
	return i;
}


Array.prototype.hasElem=function(a){'use_strict';
	return this.some(function(p1){
		return p1==a;
	});
}


for(var chto in Array.prototype){
	Object.defineProperty(Array.prototype, chto, { enumerable: false });
}
