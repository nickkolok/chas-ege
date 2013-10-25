function okrugldo(a,b){'use strict';
	if(!b)
		b=1;
	a=Math.round(a/b)*b;
	return a;
}
function sluchch(n,k,s){'use strict';
	if(!s)
		s=1;
	if(k==undefined)
		return sluchch(0,n,1);
	
    return okrugldo(okrugldo(Math.random() * (k-n),s) + n,s);
}

function slKrome(a,p1,p2,p3){'use strict';
	var b;
	if(a.isNumber || a.isString)
		for(b=a;b==a;b=sl(p1,p2,p3));
	else if(a.isArray)
		for(b=a[0];a.hasElem(b);b=sl(p1,p2,p3));
	else if(a.isFunction)
		for(b=a();b==a();b=sl(p1,p2,p3));
	else
		console.error('Первый параметр функции slKrome должен быть числом, строкой, массивом или функцией.');
	return b;
}

function sluchDel(a){'use strict';
	return a.sluchDel();
}

function sluchiz(a,n){'use strict';
	if(!(n>=1)){n=1;}
	var b=a.slice();
	b.shuffle();
	b.length=n;
	return b;
}

function chislit(a,s1,s2,s5){'use strict';
	a=a%100;
	if((a>=5)&&(a<=20))
		return s5;
	
	a=a%10;
	if(a==1)
		return s1;
	
	if((a<=4)&&(a>=2))
		return s2;
	
	return s5;
}

function s3ug(Ax,Ay,Bx,By,Cx,Cy){'use strict';
	return 0.5*(Ax*By+Ay*Cx+Bx*Cy-By*Cx-Cy*Ax-Ay*Bx).abs();
}

function chislitM(p1,p2,p3,p4){'use strict';
	return p1.ts()+' '+chislit(p1,p2,p3,p4);
}

function chislitlx(p1,p2,p3){'use strict';
	switch(p3){
		case 'i': return chislitM(p1,	lx[p2].ie,	(lx[p2].r2?lx[p2].r2:lx[p2].re),	lx[p2].rm);
		case 'r': return chislitM(p1,	lx[p2].re,	 lx[p2].rm,							lx[p2].rm);
		case 'd': return chislitM(p1,	lx[p2].de,	 lx[p2].dm,							lx[p2].dm);
		case 'v': return chislitM(p1,	lx[p2].ve,	(lx[p2].r2?lx[p2].r2:lx[p2].ve),	lx[p2].vm);
		case 't': return chislitM(p1,	lx[p2].te,	 lx[p2].tm,							lx[p2].tm);
		case 'p': return chislitM(p1,	lx[p2].pe,	 lx[p2].pm,							lx[p2].pm);
	}
	return chislitM(p1,lx[p2].ie,(lx[p2].r2?lx[p2].r2:lx[p2].re),lx[p2].rm);
}

var Drob={};

Drob.prov=function(p1){'use strict';
	p1=Drob.fixN(p1);
	return !!p1.ch&&!!p1.zn;
}

Drob.fixN=function(p1){'use strict';
	if(p1.isNumber)
		p1={ch:p1,zn:1};
	return p1;
}

Drob.sokr=function(p1){'use strict';
	p1=Drob.fixN(p1);
	if(!Drob.prov(p1))return null;
	if(p1.zn<0){
		p1.ch*=-1;
		p1.zn*=-1;
	}
	var a1=p1.ch.nod(p1.zn);
	p1.ch/=a1;
	p1.zn/=a1;
	return p1;
}

function clone(obj){'use strict';
    if(obj == null || typeof(obj) != 'object')
        return obj;
    
    var temp = {};
    for(var key in obj)
        temp[key] = clone(obj[key]);
    return temp;
}

function sl1(){'use strict';
	return Math.random().round();
}

sl=sluchch;

function sp(a){'use strict';//Я просто оставлю это здесь
	for(var i=0,c=a.split('\''),b=[];i<c.length;i++)
		b=b.concat(i%2?c[i]:c[i].split(' '));
	for(var i=0;i<b.length;b.splice(i,!b[i++]));
	return b;
}

function cvet(a){'use strict';
	return '#'+a.r.toString(16).dopdo('0',2)+a.g.toString(16).dopdo('0',2)+a.b.toString(16).dopdo('0',2);
}

function proporMezhdu(a,b,pr){'use strict';
	return a.proporMezhdu(b,pr);
}

function cvetMezhdu(a,b,pr){'use strict';
	return cvet({
		r:proporMezhdu(a.r,b.r,pr).round(),
		g:proporMezhdu(a.g,b.g,pr).round(),
		b:proporMezhdu(a.b,b.b,pr).round(),
	});
}

function escapeFromIframe(){'use strict';
	if(top.location.href!=document.location.href)
		top.location.href=document.location.href;
}

function perevodVelichin(a){'use strict';
	var edIzm=a.iz(2);
	var ishIzm=edIzm[0];
	var rezIzm=edIzm[1];
	var koef=sl(0.1,9.9,0.1)*10 .pow(sl(-1,1));
	var otv=koef*ishIzm[1]/rezIzm[1];
	window.vopr.txt='Выразите '+chislitlx(koef,ishIzm[0])+' в '+lx[rezIzm[0]].pm;
	window.vopr.ver=[otv.ts()];
}

function AtoB(n){'use strict';
//n - количество неверных ответов
	n=n?n:3
	var nev=window.vopr.nev.iz(n);
	var ver=window.vopr.ver.iz();
	var a=[[ver].concat(nev),[].N(n+1)].T().shuffle().T();
	window.vopr.ver=[a[1].pervSovp(1)+1];
	for(var i=0;i<=n;i++){
		window.vopr.txt+='<br/>'+(i+1)+')'+a[0][i];
	}
}

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
	for(var i=1;i<=n;i++)
		this[i]=this[i-1]+s*sluchch(-p,p);
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
	if(!p1.isArray)
		return this;
	if(p1.length>this.length)
		return p1.mn_plus(this);

	var len=p1.length;
	for(var i=0; i<len;i++)
		b[i]+=p1[i];
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
	var i;
	for(i=0; a>th[i] && i<th.length ;i++);
	return i;
}

Array.prototype.hasElem=function(a){'use_strict';
	return this.some(function(p1){
		return p1==a;
	});
}

for(var chto in Array.prototype)
	Object.defineProperty(Array.prototype, chto, { enumerable: false });
Array.prototype.mt_prov=function(){'use strict';
	var fl=true;
	var len=this.length-1;
	for(;(len+1)*fl;len--)
		fl=fl*(this[len].x!=undefined)*(this[len].y!=undefined);
	return fl;
};

Array.prototype.mt_s3ug=function(){'use strict';
	if(!this.mt_prov()+(this.length<3)){return 0};
	return 0.5*(this[0].x*this[1].y+this[0].y*this[2].x+this[1].x*this[2].y-this[1].y*this[2].x-this[2].y*this[0].x-this[0].y*this[1].x).abs();
};

Array.prototype.mt_tgUnakl=function(){'use strict';
	if(!this.mt_prov()+(this.length<2)){return undefined;}
	if(!(this[0].y-this[1].y)){return 0;}
	return (this[0].y-this[1].y)/(this[0].x-this[1].x);
}

Array.prototype.mt_is3ug=function(){'use strict';
	if(!this.mt_prov()+(this.length<3)){return 0};
	return this.mt_tgUnakl()!=[this[1],this[2]].mt_tgUnakl();
};

Array.prototype.mt_uPeres=function(){'use strict';
	if(!this.mt_prov()+(this.length<4)){return 0};
	var u=(this.mt_tgUnakl().atan()-[this[2],this[3]].mt_tgUnakl().atan()).abs();
	for(;u>=Math.PI;u=u-Math.PI);
	for(;u>Math.PI/2;u=u-Math.PI/2);
	return u;
};

Array.prototype.mt_isMnug=function(p1){'use strict';
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

Array.prototype.mt_rasst=function(){'use strict';
	if(!this.mt_prov()+(this.length<2)){return undefined;}
	
	return ((this[0].x-this[1].x).pow(2)+(this[0].y-this[1].y).pow(2)).sqrt();
};

Array.prototype.mt_s4ug=function(){'use strict';
	if(!this.mt_isMnug(4)){return undefined;}
	
	return 0.5*[this[0],this[2]].mt_rasst()*[this[1],this[3]].mt_rasst()*[this[0],this[2],this[1],this[3]].mt_uPeres().sin();
};

Array.prototype.mt_dubli=function(){'use strict';
	if(!this.mt_prov()){return undefined;};
	var fl=0;
	var len;
	var l2;
	for(len=this.length-1;len+1;len--){
		for(l2=this.length-1;l2>len;l2--)
			fl+=(this[len].x==this[l2].x&&this[len].y==this[l2].y);
	}
	return fl;
};

Array.prototype.mt_pryam=function(){'use strict';
	if(!this.mt_prov()){return undefined;};
	var p1={};
	var a=this.mt_tgUnakl();
	if(a.abs()==Infinity)
		var b=this[0].x;
	else
		var b=this[0].y-a*this[0].x;
	return {a:a,b:b};
};

Array.prototype.mt_join=function(p1){'use strict';
	if(!this.mt_prov())
		return undefined;
	if(!p1)
		p1=', ';
	var p2='';
	var len=this.length-1;
	for(var l2=0;l2<len;l2++)
		p2+='('+this[l2].x+'; '+this[l2].y+')'+p1;
	p2+='('+this[l2].x+'; '+this[l2].y+')';
	return p2;
}

Array.prototype.mt_otrPeres=function(){'use strict';
	if(!this.mt_prov())
		return undefined;
	var p1=[[this[0],this[1]].mt_pryam(),[this[2],this[3]].mt_pryam()].mp_tPeres();
	if(p1.x==Infinity)
		return Infinity;
	else if(p1.x.mzhd(this[0].x,this[1].x,1)&&p1.x.mzhd(this[2].x,this[3].x,1)&&p1.y.mzhd(this[0].y,this[1].y,1)&&p1.y.mzhd(this[2].y,this[3].y,1))
		return 1;
	return 0;
}

Array.prototype.mt_estSamoper=function(){'use strict';
	if(!this.mt_prov()||this.length<3){return undefined;};
	var len=this.length;
	var th=this.concat(this,this);
	var fl=0;
	for(var l1=0;l1<len;l1++)
		for(var l2=l1+2;l2<=l1+len-2;l2++)
			fl+=[th[l1],th[l1+1],th[l2],th[l2+1]].mt_otrPeres();
	return fl;
}

Array.prototype.mt_ladMnug=function(){'use strict';
	if((this.length<3)
		||	(!this.mt_prov())
		||	(this.mt_dubli())
	)
		return 0;
	
	for(;!this.mt_isMnug();this.shuffle());
	//Крайне криво, но думать лень.
	return this;
}

Array.prototype.mt_perpend=function(){'use strict';
	return (this.mt_uPeres()==Math.PI/2);
}

Array.prototype.mt_paral=function(){'use strict';
	return this.mt_uPeres()==0;
}

Array.prototype.mt_imen4ug=function(){'use strict';
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
	if(prug&&(rstor==2))
		return lx['квадрат'];
	else if(prug)
		return lx['прямоугольник'];
	else if(rstor==2)
		return lx['ромб'];
	else if(paral==2)
		return lx['параллелограмм'];
	else if(paral==1)
		return lx['трапеция'];
	else if(rstor==1)
		return lx['дельтоид'];
	else
		return lx['четырёхугольник'];
};

for(var chto in Array.prototype)
	Object.defineProperty(Array.prototype, chto, { enumerable: false });
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

for(var chto in Array.prototype)
	Object.defineProperty(Array.prototype, chto, { enumerable: false });
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

for(var chto in Array.prototype)
	Object.defineProperty(Array.prototype, chto, { enumerable: false });
Array.prototype.pe_inv=function(){
	var perest=0;
	var len=this.length;
	for(var i=0;i<len;i++)
		for(var j=i;j<len;j++)
			if(this[i]>this[j])
				perest++;
	return perest;
}

Array.prototype.pe_txt=function(){
	return "$\\left("+this.join(";")+"\\right)$";
}

for(var chto in Array.prototype)
	Object.defineProperty(Array.prototype, chto, { enumerable: false });
CanvasRenderingContext2D.prototype.drawLine=function(x1,y1,x2,y2){
	this.beginPath();
	this.moveTo(x1,y1);
	this.lineTo(x2,y2);
	this.stroke();
	this.closePath();
}
CanvasRenderingContext2D.prototype.setka=function(s,n){
	var i=-n;
	for(;i<=n;i++){
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
//		this.drawLine(s*n1,s*i,s*n,s*i);
}

CanvasRenderingContext2D.prototype.fillKrug=function(x,y,r){
	this.beginPath();
    this.arc(x,y, r, 0, 2*Math.PI, false);
    this.fill();
}

CanvasRenderingContext2D.prototype.isCanvasRenderingContext2D=true;
Number.prototype.toFixedLess=function(n){'use strict';
	var a=this.toFixed(n);
	for(;a.posl()=='0'&&a.search(/[.]/)!=-1;a=a.udalPosl());
	for(;a.posl()=='.';a=a.udalPosl());
	return a;
}

Number.prototype.pm=function(){'use strict';
	return this*sluchiz([1,-1]);
}

Number.prototype.dopdo=function(c,n){'use strict';
	var str=''+this;
	for(;str.length<n;str=c+str);
	return str;
}
Number.prototype.isZ=function(){'use strict';
	return this-this.floor()==0;
}

Number.prototype.isPolnKvadr=function(){'use strict';
	return this.sqrt().isZ();
}

Number.prototype.toStandart=function(p1){'use strict';
	return this.toFixedLess(10).toStandart(p1);
}

Number.prototype.ts=Number.prototype.toStandart;
Number.prototype.mzhd=function(a,b,c){'use strict';
	var p1=[a,b];
	var p2=p1[p1.max()];
	var p3=p1[p1.min()];
	return (this<p2)&&(this>p3)||((this==p2)||(this==p3))&&(!!c);
}

Number.prototype.polozh=function(){'use strict';
	return this<0?0:this;
}

Number.prototype.nod=function(p1){'use strict';
	var a,b;
	a=this<0?-this:this;
	b=p1<0?-p1:p1;
	if(a==b) return a;
	if((a==1)||(b==1))return 1;
	if(a==0) return b;
	if(b==0) return a;
	if(a>b) return b.nod(a%b);
			return a.nod(b%a);
}

Number.prototype.pina=function(p1){'use strict';
	var a1={ch:this,zn:p1};
	Drob.sokr(a1);
	if(a1.ch==0)
		return '0';
	var z='';
	if(a1.ch<0){
		z='-';
		a1.ch*=-1;
	} 
	return z+('\\frac{').esli(a1.zn!=1)+(a1.ch==1?'':a1.ch)+'\\pi'+('}{'+a1.zn+'}').esli(a1.zn!=1);
}

Number.prototype.koren=function(p1){'use strict';
	if(this.isPolnKvadr())
		return this.ts();
	var a='';
	var t=this;
	if(p1){
		a=this.polnKvadrMnozh();
		t=t/a.sqr();
	}
	return a+'\\sqrt{'+t.ts()+'}';
}

Number.prototype.polnKvadrMnozh=function(){'use strict';
	if(this==0)
		return 0;
	var t=this.abs();
	var i=1;
	for(var rez=1;i.sqr()<=t;i++)
		if(t.kratno(i.sqr()))
			rez=i;
	return rez;
}

Number.prototype.frac=function(p1){'use strict';
	var a1={ch:this,zn:p1};
	if(p1.isString)
		return ('\\frac{').esli(a1.zn!='1')+(a1.ch==1?'1':a1.ch)+('}{'+a1.zn+'}').esli(a1.zn!='1');
	
	Drob.sokr(a1);
	if(a1.ch==0)return '0';
	var z='';
	if(a1.ch<0){
		z='-';
		a1.ch*=-1;
	} 
	return z+('\\frac{').esli(a1.zn!=1)+(a1.ch==1?'1':a1.ch)+('}{'+a1.zn+'}').esli(a1.zn!=1);
	
}

Number.prototype.kratno=function(p1){'use strict';
	return !(this%p1);
}

Number.prototype.delit=function(p1){'use strict';
	return !(p1%this);
}

Number.prototype.sluchDel=function(){'use strict';
	for(var r=this+1;!this.kratno(r);r=sluchch(1,this));
	return r; 
}

Number.prototype.toChMin=function(){'use strict';
	var a=(this/60).floor();
	var b=this%60;
	return chislitM(a,'час','часа','часов').esli(a)+' '.esli(a&&b)+chislitM(b,'минута','минуты','минут').esli(b);
}

Number.prototype.chislit=function(p1,p2,p3){'use strict';
	return chislit(this,p1,p2,p3);
}

Number.prototype.chislitM=function(p1,p2,p3){'use strict';
	return chislitM(this,p1,p2,p3);
}

Number.prototype.chislitlx=function(p1,p2){'use strict';
	return chislitlx(this,p1,p2);
}

Number.prototype.min=function(){'use strict';
	var a=Array.prototype.slice.call(arguments);
	a.push(this);
	return a.minE();
}

Number.prototype.max=function(){'use strict';
	var a=Array.prototype.slice.call(arguments);
	a.push(this);
	return a.maxE();
}

Number.prototype.plusminus=Number.prototype.ts;

Number.prototype.proporMezhdu=function(k,pr){'use strict';
	return this+(k-this)*pr;
}

Number.prototype.toDvoet=function(a){'use strict';
	if(!a)
		a=60;
	return Math.floor(this/60)+':'+Math.floor(this%60).dopdo('0',2);
}

Number.prototype.okrugldo=function(p1){'use strict';
	return okrugldo(this.p1);
}

Number.prototype.fct=function(){
	return this>0?(this-1).fct()*this:1;
}

Number.prototype.isNumber=true;

for(var chto in Number.prototype)
	Object.defineProperty(Number.prototype, chto, { enumerable: false });

Number.prototype.pow=function(n){'use strict';
	return Math.pow(this,n);
}

Number.prototype.sqrt=function(){'use strict';
	return Math.sqrt(this);
}

Number.prototype.sqr=function(){'use strict';
	return Math.pow(this,2);
}
Number.prototype.abs=function(){'use strict';
	return Math.abs(this);
}

Number.prototype.floor=function(){'use strict';
	return Math.floor(this);
}

Number.prototype.ceil=function(){'use strict';
	return Math.ceil(this);
}

Number.prototype.atan=function(){'use strict';
	return Math.atan(this);
}

Number.prototype.asin=function(){'use strict';
	return Math.asin(this);
}

Number.prototype.acos=function(){'use strict';
	return Math.acos(this);
}

Number.prototype.arcsin=function(){'use strict';
	return Math.asin(this);
}

Number.prototype.arccos=function(){'use strict';
	return Math.acos(this);
}

Number.prototype.arctg=function(){'use strict';
	return Math.atan(this);
}

Number.prototype.arcctg=function(){'use strict';
	return Math.atan(1/this);
}

Number.prototype.sin=function(){'use strict';
	return Math.sin(this);
}

Number.prototype.cos=function(){'use strict';
	return Math.cos(this);
}

Number.prototype.tg=function(){'use strict';
	return Math.tan(this);
}

Number.prototype.ctg=function(){'use strict';
	return 1/Math.tan(this);
}
Number.prototype.sqr=function(){'use strict';
	return this.pow(2);
}

Number.prototype.round=function(){'use strict';
	return Math.round(this);
}

for(var chto in Number.prototype)
	Object.defineProperty(Number.prototype, chto, { enumerable: false });
String.prototype.mesh=function(){'use strict';
	var str=this;
	var a=str.length;
	var b=[];
	var i=0;
	for(i=0;i<a;i++){
		b.push(str[i]);
	}
	b.shuffle();
	str=b.join("");
	return str;	
};

String.prototype.dopdo=function(c,n){'use strict';
	var str=this;
	for(;str.length<n;str=c+str){
	}
	return str;
};

String.prototype.toZagl=function(){'use strict';
	if(this=='')return '';
	var a=this[0].toUpperCase()+''+this.substr(1);//.toLowerCase();
	return a;
};

String.prototype.frac=function(p1){'use strict';
	return '\\frac{'+this+'}{'+p1+'}';
}

String.prototype.posl=function(){'use strict';
	return this[this.length-1];
};

String.prototype.udalPosl=function(n){'use strict';
	if(n==undefined){n=1};
	return this.substr(0,this.length-n);
};

String.prototype.udalPerv=function(n){'use strict';
	if(n==undefined){n=1};
	return this.substr(n,this.length-n);
};

String.prototype.toStandart=function(p1){'use strict';
	var a=this.replace(/[.]/g,',');
	if(p1){
		a=a.replace(/[,]/,'{,}');
	}
	return a;
};

String.prototype.esli=function(p1){'use strict';
	return p1?this:'';
}

String.prototype.vTag=function(p1,p2){'use strict';
	return '<'+p1+(' '+p2).esli(p2)+'>'+this+'</'+p1+'>';
}

String.prototype.vTabl=function(p1,p2){'use strict';
	return (p1?p1:'<br/><br/>')+this.vTag('table',p2?p2:'style="text-align:center;font:inherit;" border=1');//.vTag('center');
}

String.prototype.ts=String.prototype.toStandart;

String.prototype.reverse=function (){'use strict';
	return this.split('').reverse().join('');
};//http://blog.stevenlevithan.com/archives/mimic-lookbehind-javascript //Товарищ очень сильно выручил

String.prototype.tn=function(){'use strict';
	return 1*this.replace(',','.');
};

String.prototype.istDataToStd=function(){'use strict';
	var a=this;
	a=a.replace(/\s/g,'.');
	a=a.replace(/\//g,'.');
	a=a.replace(/[-]/g,'.');
	a=a.replace(/[,]/g,'.');
	a=a.replace(/ю/g,'.');
	a=a.replace(/[.]+/g,'.');
	a=a.replace(/[.]0/g,'.');
	a=a.replace(/^0/g,'');
	a=a.replace(/^[.]/g,'');
	//Убираем г. в конце, если есть
	a=a.replace(/[.]$/g,'');
	a=a.replace(/г$/g,'');
	a=a.replace(/[.]$/g,'');
	//Теперь меняем номер месяца на месяц
	a=a.replace(/[.]1[.]/g, ' января '	);
	a=a.replace(/[.]2[.]/g, ' февраля '	);
	a=a.replace(/[.]3[.]/g, ' марта '	);
	a=a.replace(/[.]4[.]/g, ' апреля '	);
	a=a.replace(/[.]5[.]/g, ' мая '		);
	a=a.replace(/[.]6[.]/g, ' июня '	);
	a=a.replace(/[.]7[.]/g, ' июля '	);
	a=a.replace(/[.]8[.]/g, ' августа '	);
	a=a.replace(/[.]9[.]/g, ' сентября ');
	a=a.replace(/[.]10[.]/g,' октября '	);
	a=a.replace(/[.]11[.]/g,' ноября '	);
	a=a.replace(/[.]12[.]/g,' декабря '	);
	//И наконец, если исправление буквы "ю" на точку привело к повреждению названия месяца:
	a=a.replace(/и[.]ня/g, 'июня'	);
	a=a.replace(/и[.]ля/g, 'июля'	);
	//Меняем точки на пробелы
	a=a.replace(/[.]/g, ' '	);
	
	a=a+' г.';

	return a;
};


String.prototype.plusminus=function(){'use strict';
	var a=this;
	for(;a.match(/[+-][+-]/);){
		a=a.replace(/[+][+]/g,'+');
		a=a.replace(/--/g,'+');
		a=a.replace(/[+]-/g,'-');
		a=a.replace(/-[+]/g,'-');
		a=a.replace(/[+]$/g,'');
		a=a.replace(/[{][+]/g,'{');
		a=a.replace(/[+][}]/g,'}');
		a=a.replace(/\(\+/g,'(');
		a=a.replace(/\+\)/g,')');
		a=a.replace(/[=]\s*[+]/g,'=');
	}
	a=a.replace(/[+]1(?=[A-Za-zА-Яа-яЁё])/g,'+');
	a=a.replace(/[-]1(?=[A-Za-zА-Яа-яЁё])/g,'-');
	a=a.replace(/[{]1(?=[A-Za-zА-Яа-яЁё])/g,'{');
	a=a.replace(/[}]1(?=[A-Za-zА-Яа-яЁё])/g,'}');
	a=a.replace(/[ ]1(?=[A-Za-zА-Яа-яЁё])/g,' ');
	a=a.replace(/[~]1(?=[A-Za-zА-Яа-яЁё])/g,'~');
	a=a.replace(/[(]1(?=[A-Za-zА-Яа-яЁё])/g,'(');
	a=a.replace(/[)]1(?=[A-Za-zА-Яа-яЁё])/g,')');
	a=a.replace(/[=]1(?=[A-Za-zА-Яа-яЁё])/g,'=');
	a=a.replace(/[;]1(?=[A-Za-zА-Яа-яЁё])/g,';');
	a=a.replace(/\^1(?=[A-Za-zА-Яа-яЁё])/g,'^');
	a=a.replace(/^1(?=[A-Za-zА-Яа-яЁё])/g,'');
	a=a.replace(/^[+]/g,'');
	a=a.replace(/[;][-]0/g,';0');
	a=a.reverse();
	a=a.replace(/[.]{2}(?=[A-Za-zА-Яа-яЁё])/g,'.');
	a=a.replace(/[.]{1}[$][.]{1}(?=[A-Za-zА-Яа-яЁё])/g,'$.');
	a=a.reverse();
	return a;
};

String.prototype.isString=true;

for(var chto in String.prototype)
	Object.defineProperty(String.prototype, chto, { enumerable: false });

Function.prototype.isFunction=true;

for(var chto in Function.prototype)
	Object.defineProperty(Function.prototype, chto, { enumerable: false });
Object.prototype.clone=function(){'use strict';
	return clone(this);
}

Object.prototype.isObject=true;

for(var chto in Object.prototype)
	Object.defineProperty(Object.prototype, chto, {enumerable: false});
RegExp.prototype.isRegExp=true;

for(var chto in RegExp.prototype)
	Object.defineProperty(RegExp.prototype, chto, { enumerable: false });

////////////////////////////////////////////////////////////////////////
//
//	ie: именительный	падеж единственного	числа
//	re: родительный		падеж единственного	числа
//	de: дательный		падеж единственного	числа
//	ve: винительный		падеж единственного	числа
//	te: творительный	падеж единственного	числа
//	pe: предложный		падеж единственного	числа
//	ie: именительный	падеж множественного	числа
//	re: родительный		падеж множественного	числа
//	de: дательный		падеж множественного	числа
//	ve: винительный		падеж множественного	числа
//	te: творительный	падеж множественного	числа
//	pe: предложный		падеж множественного	числа
//
//	rod: род:
//		0: мужской
//		1: женский
//		2: средний
//		3: только множественное число
//
//	odu: одушевлённость:
//		0: неодушевлённое
//		1: одушевлённое
//
//	skl: склонение:
//		0: несклоняемое
//		1: первое
//		2: второе
//		3: третье
//		4: разносклоняемые существительные
////////////////////////////////////////////////////////////////////////
if(lx==undefined)
	var lx=[];	//Объявляем глобальный объект lx
////////////////////////////////////////////////////////////////////////


//{{Существительные
lx['август']={
	ie:'август',
	re:'августа',
	de:'августу',
	ve:'август',
	te:'августом',
	pe:'августе',
	im:'августы',
	rm:'августов',
	dm:'августам',
	vm:'августы',
	tm:'августами',
	pm:'августах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Австралия']={
	ie:'Австралия',
	re:'Австралии',
	de:'Австралии',
	ve:'Австралию',
	te:'Австралией',
	pe:'Австралии',
	im:'Австралии',
	rm:'Австралий',
	dm:'Австралиям',
	vm:'Австралии',
	tm:'Австралиями',
	pm:'Австралиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['Австрия']={
	ie:'Австрия',
	re:'Австрии',
	de:'Австрии',
	ve:'Австрию',
	te:'Австрией',
	pe:'Австрии',
	im:'Австрии',
	rm:'Австрий',
	dm:'Австриям',
	vm:'Австрии',
	tm:'Австриями',
	pm:'Австриях',
	rod:1,
	skl:1,
	odu:0,
};
lx['автобус']={
	ie:'автобус',
	re:'автобуса',
	de:'автобусу',
	ve:'автобус',
	te:'автобусом',
	pe:'автобусе',
	im:'автобусы',
	rm:'автобусов',
	dm:'автобусам',
	vm:'автобусы',
	tm:'автобусами',
	pm:'автобусах',
	rod:0,
	skl:2,
	odu:0,
}; 
lx['автомобиль']={
	ie:'автомобиль',
	re:'автомобиля',
	de:'автомобилю',
	ve:'автомобиль',
	te:'автомобилем',
	pe:'автомобиле',
	im:'автомобили',
	rm:'автомобилей',
	dm:'автомобилям',
	vm:'автомобили',
	tm:'автомобилями',
	pm:'автомобилях',
	rod:0,
	skl:2,
	odu:0,
};
lx['аквариум']={
	ie:'аквариум',
	re:'аквариума',
	de:'аквариуму',
	ve:'аквариум',
	te:'аквариумом',
	pe:'аквариуме',
	im:'аквариумы',
	rm:'аквариумов',
	dm:'аквариумам',
	vm:'аквариумы',
	tm:'аквариумами',
	pm:'аквариумах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Анастасия']={
	ie:'Анастасия',
	re:'Анастасии',
	de:'Анастасии',
	ve:'Анастасию',
	te:'Анастасией',
	pe:'Анастасии',
	im:'Анастасии',
	rm:'Анастасий',
	dm:'Анастасиям',
	vm:'Анастасий',
	tm:'Анастасиями',
	pm:'Анастасиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['Анатольевна']={
	ie:'Анатольевна',
	re:'Анатольевны',
	de:'Анатольевне',
	ve:'Анатольевну',
	te:'Анатольевной',
	pe:'Анатольевне',
	im:'Анатольевны',
	rm:'Анатольевн',
	dm:'Анатольевнам',
	vm:'Анатольевн',
	tm:'Анатольевнами',
	pm:'Анатольевнах',
	rod:1,
	skl:1,
	odu:0,
};
lx['Англия']={
	ie:'Англия',
	re:'Англии',
	de:'Англии',
	ve:'Англию',
	te:'Англией',
	pe:'Англии',
	im:'Англии',
	rm:'Англий',
	dm:'Англиям',
	vm:'Англии',
	tm:'Англиями',
	pm:'Англиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['апрель']={
	ie:'апрель',
	re:'апреля',
	de:'апрелю',
	ve:'апрель',
	te:'апрелем',
	pe:'апреле',
	im:'апрели',
	rm:'апрелей',
	dm:'апрелям',
	vm:'апрели',
	tm:'апрелями',
	pm:'апрелях',
	rod:0,
	skl:2,
	odu:0,
};
lx['аспирантка']={
	ie:'аспирантка',
	re:'аспирантки',
	de:'аспирантке',
	ve:'аспирантку',
	te:'аспиранткой',
	pe:'аспирантке',
	im:'аспирантки',
	rm:'аспиранток',
	dm:'аспиранткам',
	vm:'аспиранток',
	tm:'аспирантками',
	pm:'аспирантках',
	rod:1,
	skl:1,
	odu:0,
};
lx['атомоход']={
	ie:'атомоход',
	re:'атомохода',
	de:'атомоходу',
	ve:'атомоход',
	te:'атомоходом',
	pe:'атомоходе',
	im:'атомоходы',
	rm:'атомоходов',
	dm:'атомоходам',
	vm:'атомоходы',
	tm:'атомоходами',
	pm:'атомоходах',
	rod:0,
	skl:2,
	odu:0,
};
lx['бадминтон']={
	ie:'бадминтон',
	re:'бадминтона',
	de:'бадминтону',
	ve:'бадминтон',
	te:'бадминтоном',
	pe:'бадминтоне',
	im:'бадминтоны',
	rm:'бадминтонов',
	dm:'бадминтонам',
	vm:'бадминтоны',
	tm:'бадминтонами',
	pm:'бадминтонах',
	rod:0,
	skl:2,
	odu:0,
};
lx['батон']={
	ie:'батон',
	re:'батона',
	de:'батону',
	ve:'батон',
	te:'батоном',
	pe:'батоне',
	im:'батоны',
	rm:'батонов',
	dm:'батонам',
	vm:'батоны',
	tm:'батонами',
	pm:'батонах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Белоруссия']={
	ie:'Белоруссия',
	re:'Белоруссии',
	de:'Белоруссии',
	ve:'Белоруссию',
	te:'Белоруссией',
	pe:'Белоруссии',
	im:'Белоруссии',
	rm:'Белоруссий',
	dm:'Белоруссиям',
	vm:'Белоруссии',
	tm:'Белоруссиями',
	pm:'Белоруссиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['Бельгия']={
	ie:'Бельгия',
	re:'Бельгии',
	de:'Бельгии',
	ve:'Бельгию',
	te:'Бельгией',
	pe:'Бельгии',
	im:'Бельгии',
	rm:'Бельгий',
	dm:'Бельгиям',
	vm:'Бельгии',
	tm:'Бельгиями',
	pm:'Бельгиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['бензин']={
	ie:'бензин',
	re:'бензина',
	de:'бензину',
	ve:'бензин',
	te:'бензином',
	pe:'бензине',
	im:'бензины',
	rm:'бензинов',
	dm:'бензинам',
	vm:'бензины',
	tm:'бензинами',
	pm:'бензинах',
	rod:0,
	skl:2,
	odu:0,
}; 
lx['бетон']={
	ie:'бетон',
	re:'бетона',
	de:'бетону',
	ve:'бетон',
	te:'бетоном',
	pe:'бетоне',
	im:'бетоны',
	rm:'бетонов',
	dm:'бетонам',
	vm:'бетоны',
	tm:'бетонами',
	pm:'бетонах',
	rod:0,
	skl:2,
	odu:0,
};
lx['блондинка']={
	ie:'блондинка',
	re:'блондинки',
	de:'блондинке',
	ve:'блондинку',
	te:'блондинкой',
	pe:'блондинке',
	im:'блондинки',
	rm:'блондинок',
	dm:'блондинкам',
	vm:'блондинок',
	tm:'блондинками',
	pm:'блондинках',
	rod:1,
	skl:1,
	odu:0,
};
lx['Бразилия']={
	ie:'Бразилия',
	re:'Бразилии',
	de:'Бразилии',
	ve:'Бразилию',
	te:'Бразилией',
	pe:'Бразилии',
	im:'Бразилии',
	rm:'Бразилий',
	dm:'Бразилиям',
	vm:'Бразилии',
	tm:'Бразилиями',
	pm:'Бразилиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['брус']={
	ie:'брус',
	re:'бруса',
	de:'брусу',
	ve:'брус',
	te:'брусом',
	pe:'брусе',
	im:'брусья',
	rm:'брусьев',
	dm:'брусьям',
	vm:'брусья',
	tm:'брусьями',
	pm:'брусьях',
	rod:0,
	skl:2,
	odu:0,
};
lx['булавка']={
	ie:'булавка',
	re:'булавки',
	de:'булавке',
	ve:'булавку',
	te:'булавкой',
	pe:'булавке',
	im:'булавки',
	rm:'булавок',
	dm:'булавкам',
	vm:'булавки',
	tm:'булавками',
	pm:'булавках',
	rod:1,
	skl:1,
	odu:0,
};
lx['бутерброд']={
	ie:'бутерброд',
	re:'бутерброда',
	de:'бутерброду',
	ve:'бутерброд',
	te:'бутербродом',
	pe:'бутерброде',
	im:'бутерброды',
	rm:'бутербродов',
	dm:'бутербродам',
	vm:'бутерброды',
	tm:'бутербродами',
	pm:'бутербродах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Васильевна']={
	ie:'Васильевна',
	re:'Васильевны',
	de:'Васильевне',
	ve:'Васильевну',
	te:'Васильевной',
	pe:'Васильевне',
	im:'Васильевны',
	rm:'Васильевн',
	dm:'Васильевнам',
	vm:'Васильевн',
	tm:'Васильевнами',
	pm:'Васильевнах',
	rod:1,
	skl:1,
	odu:0,
};
lx['веб-дизайнер']={
	ie:'веб-дизайнер',
	re:'веб-дизайнера',
	de:'веб-дизайнеру',
	ve:'веб-дизайнера',
	te:'веб-дизайнером',
	pe:'веб-дизайнере',
	im:'веб-дизайнеры',
	rm:'веб-дизайнеров',
	dm:'веб-дизайнерам',
	vm:'веб-дизайнеров',
	tm:'веб-дизайнерами',
	pm:'веб-дизайнерах',
	rod:0,
	skl:2,
	odu:0,
};
lx['ведомство']={
	ie:'ведомство',
	re:'ведомства',
	de:'ведомству',
	ve:'ведомство',
	te:'ведомством',
	pe:'ведомстве',
	im:'ведомства',
	rm:'ведомств',
	dm:'ведомствам',
	vm:'ведомства',
	tm:'ведомствами',
	pm:'ведомствах',
	rod:2,
	skl:2,
	odu:0,
};
lx['велосипед']={
	ie:'велосипед',
	re:'велосипеда',
	de:'велосипеду',
	ve:'велосипед',
	te:'велосипедом',
	pe:'велосипеде',
	im:'велосипеды',
	rm:'велосипедов',
	dm:'велосипедам',
	vm:'велосипеды',
	tm:'велосипедами',
	pm:'велосипедах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Венесуэла']={
	ie:'Венесуэла',
	re:'Венесуэлы',
	de:'Венесуэле',
	ve:'Венесуэлу',
	te:'Венесуэлой',
	pe:'Венесуэле',
	im:'Венесуэлы',
	rm:'Венесуэл',
	dm:'Венесуэлам',
	vm:'Венесуэлы',
	tm:'Венесуэлами',
	pm:'Венесуэлах',
	rod:1,
	skl:1,
	odu:0,
};
lx['Вероника']={
	ie:'Вероника',
	re:'Вероники',
	de:'Веронике',
	ve:'Веронику',
	te:'Вероникой',
	pe:'Веронике',
	im:'Вероники',
	rm:'Вероник',
	dm:'Вероникам',
	vm:'Вероник',
	tm:'Верониками',
	pm:'Верониках',
	rod:1,
	skl:1,
	odu:0,
};
lx['верста']={
	ie:'верста',
	re:'версты',
	de:'версте',
	ve:'версту',
	te:'верстой',
	pe:'версте',
	im:'вёрсты',
	rm:'вёрст',
	dm:'вёрстам',
	vm:'вёрсты',
	tm:'вёрстами',
	pm:'вёрстах',
	rod:1,
	skl:1,
	odu:0,
};
lx['витрина']={
	ie:'витрина',
	re:'витрины',
	de:'витрине',
	ve:'витрину',
	te:'витриной',
	pe:'витрине',
	im:'витрины',
	rm:'витрин',
	dm:'витринам',
	vm:'витрины',
	tm:'витринами',
	pm:'витринах',
	rod:1,
	skl:1,
	odu:0,
};
lx['вода']={
	ie:'вода',
	re:'воды',
	de:'воде',
	ve:'воду',
	te:'водой',
	pe:'воде',
	im:'воды',
	rm:'вод',
	dm:'водам',
	vm:'воды',
	tm:'водами',
	pm:'водах',
	rod:1,
	skl:1,
	odu:0,
};
lx['воскресенье']={
	ie:'воскресенье',
	re:'воскресенья',
	de:'воскресенью',
	ve:'воскресенье',
	te:'воскресеньем',
	pe:'воскресенье',
	im:'воскресенья',
	rm:'воскресений',
	dm:'воскресеньям',
	vm:'воскресенья',
	tm:'воскресеньями',
	pm:'воскресеньях',
	rod:2,
	skl:2,
	odu:0,
};
lx['время']={
	ie:'время',
	re:'времени',
	de:'времени',
	ve:'время',
	te:'временем',
	pe:'времени',
	im:'времена',
	rm:'времён',
	dm:'временам',
	vm:'времена',
	tm:'временами',
	pm:'временах',
	rod:0,
	skl:4,
	odu:0,
};
lx['вторник']={
	ie:'вторник',
	re:'вторника',
	de:'вторнику',
	ve:'вторник',
	te:'вторником',
	pe:'вторнике',
	im:'вторники',
	rm:'вторников',
	dm:'вторникам',
	vm:'вторники',
	tm:'вторниками',
	pm:'вторниках',
	rod:0,
	skl:2,
	odu:0,
};
lx['газ']={
	ie:'газ',
	re:'газа',
	de:'газу',
	ve:'газ',
	te:'газом',
	pe:'газе',
	im:'газы',
	rm:'газов',
	dm:'газам',
	vm:'газы',
	tm:'газами',
	pm:'газах',
	rod:0,
	skl:2,
	odu:0,
}; 
lx['гараж']={
	ie:'гараж',
	re:'гаража',
	de:'гаражу',
	ve:'гараж',
	te:'гаражом',
	pe:'гараже',
	im:'гаражы',
	rm:'гаражов',
	dm:'гаражам',
	vm:'гаражы',
	tm:'гаражами',
	pm:'гаражах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Германия']={
	ie:'Германия',
	re:'Германии',
	de:'Германии',
	ve:'Германию',
	te:'Германией',
	pe:'Германии',
	im:'Германии',
	rm:'Германий',
	dm:'Германиям',
	vm:'Германии',
	tm:'Германиями',
	pm:'Германиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['гимнастика']={
	ie:'гимнастика',
	re:'гимнастики',
	de:'гимнастике',
	ve:'гимнастику',
	te:'гимнастикой',
	pe:'гимнастике',
	im:'гимнастики',
	rm:'гимнастик',
	dm:'гимнастикам',
	vm:'гимнастики',
	tm:'гимнастиками',
	pm:'гимнастиках',
	rod:1,
	skl:1,
	odu:0,
};
lx['город']={
	ie:'город',
	re:'города',
	de:'городу',
	ve:'город',
	te:'городом',
	pe:'городе',
	im:'города',
	rm:'городов',
	dm:'городам',
	vm:'города',
	tm:'городами',
	pm:'городах',
	rod:0,
	skl:2,
	odu:0,
}; 
lx['городок']={
	ie:'городок',
	re:'городка',
	de:'городку',
	ve:'городок',
	te:'городком',
	pe:'городке',
	im:'городки',
	rm:'городков',
	dm:'городкам',
	vm:'городки',
	tm:'городками',
	pm:'городках',
	rod:0,
	skl:2,
	odu:0,
};
lx['гравий']={
	ie:'гравий',
	re:'гравия',
	de:'гравию',
	ve:'гравий',
	te:'гравием',
	pe:'гравии',
	im:'гравии',
	rm:'гравиев',
	dm:'гравиям',
	vm:'гравии',
	tm:'гравиями',
	pm:'гравиях',
	rod:0,
	skl:2,
	odu:0,
};
lx['гранит']={
	ie:'гранит',
	re:'гранита',
	de:'граниту',
	ve:'гранит',
	te:'гранитом',
	pe:'граните',
	im:'граниты',
	rm:'гранитов',
	dm:'гранитам',
	vm:'граниты',
	tm:'гранитами',
	pm:'гранитах',
	rod:0,
	skl:2,
	odu:0,
};
lx['грузовик']={
	ie:'грузовик',
	re:'грузовика',
	de:'грузовику',
	ve:'грузовик',
	te:'грузовиком',
	pe:'грузовике',
	im:'грузовики',
	rm:'грузовиков',
	dm:'грузовикам',
	vm:'грузовики',
	tm:'грузовиками',
	pm:'грузовиках',
	rod:0,
	skl:2,
	odu:0,
};
lx['груша']={
	ie:'груша',
	re:'груши',
	de:'груше',
	ve:'грушу',
	te:'грушой',
	pe:'груше',
	im:'груши',
	rm:'груш',
	dm:'грушам',
	vm:'груши',
	tm:'грушами',
	pm:'грушах',
	rod:1,
	skl:1,
	odu:0,
};
lx['Дарья']={
	ie:'Дарья',
	re:'Дарьи',
	de:'Дарье',
	ve:'Дарью',
	te:'Дарьей',
	pe:'Дарье',
	im:'Дарьи',
	rm:'Дарий',
	dm:'Дарьям',
	vm:'Дарьи',
	tm:'Дарьями',
	pm:'Дарьях',
	rod:1,
	skl:1,
	odu:0,
};
lx['дача']={
	ie:'дача',
	re:'дачи',
	de:'даче',
	ve:'дачу',
	te:'дачей',
	pe:'даче',
	im:'дачи',
	rm:'дач',
	dm:'дачам',
	vm:'дачи',
	tm:'дачами',
	pm:'дачах',
	rod:1,
	skl:1,
	odu:0,
};
lx['декада']={
	ie:'декада',
	re:'декады',
	de:'декаде',
	ve:'декаду',
	te:'декадой',
	pe:'декаде',
	im:'декады',
	rm:'декад',
	dm:'декадам',
	vm:'декады',
	tm:'декадами',
	pm:'декадах',
	rod:1,
	skl:1,
	odu:0,
};
lx['дельтоид']={
	ie:'дельтоид',
	re:'дельтоида',
	de:'дельтоиду',
	ve:'дельтоид',
	te:'дельтоидом',
	pe:'дельтоиде',
	im:'дельтоиды',
	rm:'дельтоидов',
	dm:'дельтоидам',
	vm:'дельтоиды',
	tm:'дельтоидами',
	pm:'дельтоидах',
	rod:0,
	skl:2,
	odu:0,
};
lx['день']={
	ie:'день',
	re:'дня',
	de:'дню',
	ve:'день',
	te:'днём',
	pe:'дне',
	im:'дни',
	rm:'дней',
	dm:'дням',
	vm:'дни',
	tm:'днями',
	pm:'днях',
	rod:0,
	skl:2,
	odu:0,
}; 
lx['деревня']={
	ie:'деревня',
	re:'деревни',
	de:'деревне',
	ve:'деревню',
	te:'деревней',
	pe:'деревне',
	im:'деревни',
	rm:'деревень',
	dm:'деревням',
	vm:'деревни',
	tm:'деревнями',
	pm:'деревнях',
	rod:1,
	skl:1,
	odu:0,
};
lx['деталь']={
	ie:'деталь',
	re:'детали',
	de:'детали',
	ve:'деталь',
	te:'деталью',
	pe:'детали',
	im:'детали',
	rm:'деталей',
	dm:'деталям',
	vm:'детали',
	tm:'деталями',
	pm:'деталях',
	rod:1,
	skl:3,
	odu:0,
};
lx['дециметр']={
	ie:'дециметр',
	re:'дециметра',
	de:'дециметру',
	ve:'дециметр',
	te:'дециметром',
	pe:'дециметре',
	im:'дециметры',
	rm:'дециметров',
	dm:'дециметрам',
	vm:'дециметры',
	tm:'дециметрами',
	pm:'дециметрах',
	rod:0,
	skl:2,
	odu:0,
	skr:'дм',
};
lx['дизель']={
	ie:'дизель',
	re:'дизеля',
	de:'дизелю',
	ve:'дизель',
	te:'дизелем',
	pe:'дизеле',
	im:'дизели',
	rm:'дизелей',
	dm:'дизелям',
	vm:'дизели',
	tm:'дизелями',
	pm:'дизелях',
	rod:0,
	skl:2,
	odu:0,
};
lx['доллар']={
	ie:'доллар',
	re:'доллара',
	de:'доллару',
	ve:'доллар',
	te:'долларом',
	pe:'долларе',
	im:'доллары',
	rm:'долларов',
	dm:'долларам',
	vm:'доллары',
	tm:'долларами',
	pm:'долларах',
	rod:0,
	skl:2,
	odu:0,
}; 
lx['дом']={
	ie:'дом',
	re:'дома',
	de:'дому',
	ve:'дом',
	te:'домом',
	pe:'доме',
	im:'дома',
	rm:'домов',
	dm:'домам',
	vm:'дома',
	tm:'домами',
	pm:'домах',
	rod:0,
	skl:2,
	odu:0,
};
lx['домик']={
	ie:'домик',
	re:'домика',
	de:'домику',
	ve:'домик',
	te:'домиком',
	pe:'домике',
	im:'домики',
	rm:'домиков',
	dm:'домикам',
	vm:'домики',
	tm:'домиками',
	pm:'домиках',
	rod:0,
	skl:2,
	odu:0,
};
lx['евро']={
	ie:'евро',
	re:'евро',
	de:'евро',
	ve:'евро',
	te:'евро',
	pe:'евро',
	im:'евро',
	rm:'евро',
	dm:'евро',
	vm:'евро',
	tm:'евро',
	pm:'евро',
	rod:2,
	skl:0,
	odu:0,
};
lx['Елена']={
	ie:'Елена',
	re:'Елены',
	de:'Елене',
	ve:'Елену',
	te:'Еленой',
	pe:'Елене',
	im:'Елены',
	rm:'Елен',
	dm:'Еленам',
	vm:'Елен',
	tm:'Еленами',
	pm:'Еленах',
	rod:1,
	skl:1,
	odu:0,
};
lx['жидкость']={
	ie:'жидкость',
	re:'жидкости',
	de:'жидкости',
	ve:'жидкость',
	te:'жидкостью',
	pe:'жидкости',
	im:'жидкости',
	rm:'жидкостей',
	dm:'жидкостям',
	vm:'жидкости',
	tm:'жидкостями',
	pm:'жидкостях',
	rod:1,
	skl:3,
	odu:0,
};
lx['"Запорожец"']={
	ie:'"Запорожец"',
	re:'"Запорожца"',
	de:'"Запорожцу"',
	ve:'"Запорожец"',
	te:'"Запорожцем"',
	pe:'"Запорожце"',
	im:'"Запорожцы"',
	rm:'"Запорожцев"',
	dm:'"Запорожцам"',
	vm:'"Запорожцы"',
	tm:'"Запорожцами"',
	pm:'"Запорожцах"',
	rod:0,
	skl:2,
	odu:0,
};
lx['значение']={
	ie:'значение',
	re:'значения',
	de:'значению',
	ve:'значение',
	te:'значением',
	pe:'значении',
	im:'значения',
	rm:'значений',
	dm:'значениям',
	vm:'значения',
	tm:'значениями',
	pm:'значениях',
	rod:2,
	skl:2,
	odu:0,
};
lx['Ивановна']={
	ie:'Ивановна',
	re:'Ивановны',
	de:'Ивановне',
	ve:'Ивановну',
	te:'Ивановной',
	pe:'Ивановне',
	im:'Ивановны',
	rm:'Ивановн',
	dm:'Ивановнам',
	vm:'Ивановн',
	tm:'Ивановнами',
	pm:'Ивановнах',
	rod:1,
	skl:1,
	odu:0,
};
lx['известняк']={
	ie:'известняк',
	re:'известняка',
	de:'известняку',
	ve:'известняк',
	te:'известняком',
	pe:'известняке',
	im:'известняки',
	rm:'известняков',
	dm:'известнякам',
	vm:'известняки',
	tm:'известняками',
	pm:'известняках',
	rod:0,
	skl:2,
	odu:0,
};
lx['Израиль']={
	ie:'Израиль',
	re:'Израиля',
	de:'Израилю',
	ve:'Израиль',
	te:'Израилем',
	pe:'Израиле',
	im:'Израили',
	rm:'Израилей',
	dm:'Израилям',
	vm:'Израили',
	tm:'Израилями',
	pm:'Израилях',
	rod:0,
	skl:2,
	odu:0,
};
lx['инноград']={
	ie:'инноград',
	re:'иннограда',
	de:'иннограду',
	ve:'инноград',
	te:'инноградом',
	pe:'иннограде',
	im:'иннограды',
	rm:'инноградов',
	dm:'инноградам',
	vm:'иннограды',
	tm:'инноградами',
	pm:'инноградах',
	rod:0,
	skl:2,
	odu:0,
};
lx['интервал']={
	ie:'интервал',
	re:'интервала',
	de:'интервалу',
	ve:'интервал',
	te:'интервалом',
	pe:'интервале',
	im:'интервалы',
	rm:'интервалов',
	dm:'интервалам',
	vm:'интервалы',
	tm:'интервалами',
	pm:'интервалах',
	rod:0,
	skl:2,
	odu:0,
};
lx['июнь']={
	ie:'июнь',
	re:'июня',
	de:'июню',
	ve:'июнь',
	te:'июнем',
	pe:'июне',
	im:'июни',
	rm:'июней',
	dm:'июням',
	vm:'июни',
	tm:'июнями',
	pm:'июнях',
	rod:0,
	skl:2,
	odu:0,
};
lx['июль']={
	ie:'июль',
	re:'июля',
	de:'июлю',
	ve:'июль',
	te:'июлем',
	pe:'июле',
	im:'июли',
	rm:'июлей',
	dm:'июлям',
	vm:'июли',
	tm:'июлями',
	pm:'июлях',
	rod:0,
	skl:2,
	odu:0,
};
lx['кабельтов']={
	ie:'кабельтов',
	re:'кабельтова',
	de:'кабельтову',
	ve:'кабельтов',
	te:'кабельтовым',
	pe:'кабельтовом',
	im:'кабельтовы',
	rm:'кабельтовых',
	dm:'кабельтовым',
	vm:'кабельтовых',
	tm:'кабельтовыми',
	pm:'кабельтовых',
	rod:0,
	skl:2,
	odu:0,
};
lx['Казань']={
        ie:'Казань',
        re:'Казани',
        de:'Казани',
        ve:'Казань',
        te:'Казанью',
        pe:'Казани',
        im:'Казани',
        rm:'Казаней',
        dm:'Казаням',
        vm:'Казани',
        tm:'Казанями',
        pm:'Казанях',
        rod:1,
        skl:3,
        odu:0,
};
lx['кальций']={
	ie:'кальций',
	re:'кальция',
	de:'кальцию',
	ve:'кальций',
	te:'кальцием',
	pe:'кальции',
	im:'кальции',
	rm:'кальциев',
	dm:'кальциям',
	vm:'кальции',
	tm:'кальциями',
	pm:'кальциях',
	rod:0,
	skl:2,
	odu:0,
};
lx['камень']={
	ie:'камень',
	re:'камня',
	de:'камню',
	ve:'камень',
	te:'камнем',
	pe:'камне',
	im:'камни',
	rm:'камней',
	dm:'камням',
	vm:'камни',
	tm:'камнями',
	pm:'камнях',
	rod:0,
	skl:2,
	odu:0,
};
lx['канцелярия']={
	ie:'канцелярия',
	re:'канцелярии',
	de:'канцелярии',
	ve:'канцелярию',
	te:'канцелярией',
	pe:'канцелярии',
	im:'канцелярии',
	rm:'канцелярий',
	dm:'канцеляриям',
	vm:'канцелярии',
	tm:'канцеляриями',
	pm:'канцеляриях',
	rod:1,
	skl:1,
	odu:0,
};
lx['квадрат']={
	ie:'квадрат',
	re:'квадрата',
	de:'квадрату',
	ve:'квадрат',
	te:'квадратом',
	pe:'квадрате',
	im:'квадраты',
	rm:'квадратов',
	dm:'квадратам',
	vm:'квадраты',
	tm:'квадратами',
	pm:'квадратах',
	rod:0,
	skl:2,
	odu:0,
};
lx['керосин']={
	ie:'керосин',
	re:'керосина',
	de:'керосину',
	ve:'керосин',
	te:'керосином',
	pe:'керосине',
	im:'керосины',
	rm:'керосинов',
	dm:'керосинам',
	vm:'керосины',
	tm:'керосинами',
	pm:'керосинах',
	rod:0,
	skl:2,
	odu:0,
};
lx['километр']={
	ie:'километр',
	re:'километра',
	de:'километру',
	ve:'километр',
	te:'километром',
	pe:'километре',
	im:'километры',
	rm:'километров',
	dm:'километрам',
	vm:'километры',
	tm:'километрами',
	pm:'километрах',
	rod:0,
	skl:2,
	odu:0,
	skr:'км',
};
lx['Китай']={
	ie:'Китай',
	re:'Китая',
	de:'Китаю',
	ve:'Китай',
	te:'Китаем',
	pe:'Китае',
	im:'Китаи',
	rm:'Китаев',
	dm:'Китаям',
	vm:'Китаи',
	tm:'Китаями',
	pm:'Китаях',
	rod:0,
	skl:2,
	odu:0,
};
lx['компакт-диск']={
	ie:'компакт-диск',
	re:'компакт-диска',
	de:'компакт-диску',
	ve:'компакт-диск',
	te:'компакт-диском',
	pe:'компакт-диске',
	im:'компакт-диски',
	rm:'компакт-дисков',
	dm:'компакт-дискам',
	vm:'компакт-диски',
	tm:'компакт-дисками',
	pm:'компакт-дисках',
	rod:0,
	skl:2,
	odu:0,
};
lx['конструкция']={
	ie:'конструкция',
	re:'конструкции',
	de:'конструкции',
	ve:'конструкцию',
	te:'конструкцией',
	pe:'конструкции',
	im:'конструкции',
	rm:'конструкций',
	dm:'конструкциям',
	vm:'конструкции',
	tm:'конструкциями',
	pm:'конструкциях',
	rod:1,
	skl:1,
	odu:0,
};
lx['корабль']={
	ie:'корабль',
	re:'корабля',
	de:'кораблю',
	ve:'корабль',
	te:'кораблём',
	pe:'корабле',
	im:'корабли',
	rm:'кораблей',
	dm:'кораблям',
	vm:'корабли',
	tm:'кораблями',
	pm:'кораблях',
	rod:0,
	skl:2,
	odu:0,
};
lx['Красноярск']={
	ie:'Красноярск',
	re:'Красноярска',
	de:'Красноярску',
	ve:'Красноярск',
	te:'Красноярском',
	pe:'Красноярске',
	im:'Красноярски',
	rm:'Красноярсков',
	dm:'Красноярскам',
	vm:'Красноярски',
	tm:'Красноярсками',
	pm:'Красноярсках',
	rod:0,
	skl:2,
	odu:0,
};
lx['Кристина']={
	ie:'Кристина',
	re:'Кристины',
	de:'Кристине',
	ve:'Кристину',
	te:'Кристиной',
	pe:'Кристине',
	im:'Кристины',
	rm:'Кристин',
	dm:'Кристинам',
	vm:'Кристин',
	tm:'Кристинами',
	pm:'Кристинах',
	rod:1,
	skl:1,
	odu:0,
};
lx['Куба']={
	ie:'Куба',
	re:'Кубы',
	de:'Кубе',
	ve:'Кубу',
	te:'Кубой',
	pe:'Кубе',
	im:'Кубы',
	rm:'Куб',
	dm:'Кубам',
	vm:'Кубы',
	tm:'Кубами',
	pm:'Кубах',
	rod:1,
	skl:1,
	odu:0,
};
lx['кубометр']={
	ie:'кубометр',
	re:'кубометра',
	de:'кубометру',
	ve:'кубометр',
	te:'кубометром',
	pe:'кубометре',
	im:'кубометры',
	rm:'кубометров',
	dm:'кубометрам',
	vm:'кубометры',
	tm:'кубометрами',
	pm:'кубометрах',
	rod:0,
	skl:2,
	odu:0,
};
lx['литр']={
	ie:'литр',
	re:'литра',
	de:'литру',
	ve:'литр',
	te:'литром',
	pe:'литре',
	im:'литры',
	rm:'литров',
	dm:'литрам',
	vm:'литры',
	tm:'литрами',
	pm:'литрах',
	rod:0,
	skl:2,
	odu:0,
}; 
lx['луч']={
	ie:'луч',
	re:'луча',
	de:'лучу',
	ve:'луч',
	te:'лучом',
	pe:'луче',
	im:'лучи',
	rm:'лучей',
	dm:'лучам',
	vm:'лучи',
	tm:'лучами',
	pm:'лучах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Магадан']={
	ie:'Магадан',
	re:'Магадана',
	de:'Магадану',
	ve:'Магадан',
	te:'Магаданом',
	pe:'Магадане',
	im:'Магаданы',
	rm:'Магаданов',
	dm:'Магаданам',
	vm:'Магаданы',
	tm:'Магаданами',
	pm:'Магаданах',
	rod:0,
	skl:2,
	odu:0,
};
lx['магазин']={
	ie:'магазин',
	re:'магазина',
	de:'магазину',
	ve:'магазин',
	te:'магазином',
	pe:'магазине',
	im:'магазины',
	rm:'магазинов',
	dm:'магазинам',
	vm:'магазины',
	tm:'магазинами',
	pm:'магазинах',
	rod:0,
	skl:2,
	odu:0,
};
lx['магия']={
	ie:'магия',
	re:'магии',
	de:'магии',
	ve:'магию',
	te:'магией',
	pe:'магии',
	im:'магии',
	rm:'магий',
	dm:'магиям',
	vm:'магии',
	tm:'магиями',
	pm:'магиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['май']={
	ie:'май',
	re:'мая',
	de:'маю',
	ve:'май',
	te:'маем',
	pe:'мае',
	im:'маи',
	rm:'маев',
	dm:'маям',
	vm:'маи',
	tm:'маями',
	pm:'маях',
	rod:0,
	skl:2,
	odu:0,
};
lx['Мария']={
	ie:'Мария',
	re:'Марии',
	de:'Марии',
	ve:'Марию',
	te:'Марией',
	pe:'Марии',
	im:'Марии',
	rm:'Марий',
	dm:'Мариям',
	vm:'Марии',
	tm:'Мариями',
	pm:'Мариях',
	rod:1,
	skl:1,
	odu:0,
};
lx['март']={
	ie:'март',
	re:'марта',
	de:'марту',
	ve:'март',
	te:'мартом',
	pe:'марте',
	im:'марты',
	rm:'мартов',
	dm:'мартам',
	vm:'марты',
	tm:'мартами',
	pm:'мартах',
	rod:0,
	skl:2,
	odu:0,
};
lx['матрёшка']={
	ie:'матрёшка',
	re:'матрёшки',
	de:'матрёшке',
	ve:'матрёшку',
	te:'матрёшкой',
	pe:'матрёшке',
	im:'матрёшки',
	rm:'матрёшек',
	dm:'матрёшкам',
	vm:'матрёшки',
	tm:'матрёшками',
	pm:'матрёшках',
	rod:1,
	skl:1,
	odu:0,
};
lx['Мексика']={
	ie:'Мексика',
	re:'Мексики',
	de:'Мексике',
	ve:'Мексику',
	te:'Мексикой',
	pe:'Мексике',
	im:'Мексики',
	rm:'Мексик',
	dm:'Мексикам',
	vm:'Мексики',
	tm:'Мексиками',
	pm:'Мексиках',
	rod:1,
	skl:1,
	odu:0,
};
lx['меню']={
	ie:'меню',
	re:'меню',
	de:'меню',
	ve:'меню',
	te:'меню',
	pe:'меню',
	im:'меню',
	rm:'меню',
	dm:'меню',
	vm:'меню',
	tm:'меню',
	pm:'меню',
	rod:2,
	skl:0,
	odu:0,
};
lx['месяц']={
	ie:'месяц',
	re:'месяца',
	de:'месяцу',
	ve:'месяц',
	te:'месяцем',
	pe:'месяце',
	im:'месяцы',
	rm:'месяцев',
	dm:'месяцам',
	vm:'месяцы',
	tm:'месяцами',
	pm:'месяцах',
	rod:0,
	skl:2,
	odu:0,
};
lx['метр']={
	ie:'метр',
	re:'метра',
	de:'метру',
	ve:'метр',
	te:'метром',
	pe:'метре',
	im:'метры',
	rm:'метров',
	dm:'метрам',
	vm:'метры',
	tm:'метрами',
	pm:'метрах',
	rod:0,
	skl:2,
	odu:0,
	skr:'м',
};
lx['мешок']={
	ie:'мешок',
	re:'мешка',
	de:'мешку',
	ve:'мешок',
	te:'мешком',
	pe:'мешке',
	im:'мешки',
	rm:'мешков',
	dm:'мешкам',
	vm:'мешки',
	tm:'мешками',
	pm:'мешках',
	rod:0,
	skl:2,
	odu:0,
};
lx['миллиметр']={
	ie:'миллиметр',
	re:'миллиметра',
	de:'миллиметру',
	ve:'миллиметр',
	te:'миллиметром',
	pe:'миллиметре',
	im:'миллиметры',
	rm:'миллиметров',
	dm:'миллиметрам',
	vm:'миллиметры',
	tm:'миллиметрами',
	pm:'миллиметрах',
	rod:0,
	skl:2,
	odu:0,
	skr:'мм',
};
lx['министерство']={
	ie:'министерство',
	re:'министерства',
	de:'министерству',
	ve:'министерство',
	te:'министерством',
	pe:'министерстве',
	im:'министерства',
	rm:'министерств',
	dm:'министерствам',
	vm:'министерства',
	tm:'министерствами',
	pm:'министерствах',
	rod:2,
	skl:2,
	odu:0,
};
lx['Минобрнауки']={
	ie:'Минобрнауки',
	re:'Минобрнауки',
	de:'Минобрнауки',
	ve:'Минобрнауки',
	te:'Минобрнауки',
	pe:'Минобрнауки',
	im:'Минобрнауки',
	rm:'Минобрнауки',
	dm:'Минобрнауки',
	vm:'Минобрнауки',
	tm:'Минобрнауки',
	pm:'Минобрнауки',
	rod:2,
	skl:0,
	odu:0,
};
lx['минута']={
	ie:'минута',
	re:'минуты',
	de:'минуте',
	ve:'минуту',
	te:'минутой',
	pe:'минуте',
	im:'минуты',
	rm:'минут',
	dm:'минутам',
	vm:'минуты',
	tm:'минутами',
	pm:'минутах',
	rod:1,
	skl:1,
	odu:0,
};
lx['"Москвич"']={
	ie:'"Москвич"',
	re:'"Москвича"',
	de:'"Москвичу"',
	ve:'"Москвич"',
	te:'"Москвичом"',
	pe:'"Москвиче"',
	im:'"Москвичи"',
	rm:'"Москвичей"',
	dm:'"Москвичам"',
	vm:'"Москвичи"',
	tm:'"Москвичами"',
	pm:'"Москвичах"',
	rod:0,
	skl:2,
	odu:0,
};
lx['наукоград']={
	ie:'наукоград',
	re:'наукограда',
	de:'наукограду',
	ve:'наукоград',
	te:'наукоградом',
	pe:'наукограде',
	im:'наукограды',
	rm:'наукоградов',
	dm:'наукоградам',
	vm:'наукограды',
	tm:'наукоградами',
	pm:'наукоградах',
	rod:0,
	skl:2,
	odu:0,
};
lx['неделя']={
	ie:'неделя',
	re:'недели',
	de:'неделе',
	ve:'неделю',
	te:'неделей',
	pe:'неделе',
	im:'недели',
	rm:'недель',
	dm:'неделям',
	vm:'недели',
	tm:'неделями',
	pm:'неделях',
	rod:1,
	skl:1,
	odu:0,
};
lx['Николаевна']={
	ie:'Николаевна',
	re:'Николаевны',
	de:'Николаевне',
	ve:'Николаевну',
	te:'Николаевной',
	pe:'Николаевне',
	im:'Николаевны',
	rm:'Николаевн',
	dm:'Николаевнам',
	vm:'Николаевн',
	tm:'Николаевнами',
	pm:'Николаевнах',
	rod:1,
	skl:1,
	odu:0,
};
lx['ноябрь']={
	ie:'ноябрь',
	re:'ноября',
	de:'ноябрю',
	ve:'ноябрь',
	te:'ноябрём',
	pe:'ноябре',
	im:'ноябри',
	rm:'ноябрей',
	dm:'ноябрям',
	vm:'ноябри',
	tm:'ноябрями',
	pm:'ноябрях',
	rod:0,
	skl:2,
	odu:0,
};
lx['октябрь']={
	ie:'октябрь',
	re:'октября',
	de:'октябрю',
	ve:'октябрь',
	te:'октябрём',
	pe:'октябре',
	im:'октябри',
	rm:'октябрей',
	dm:'октябрям',
	vm:'октябри',
	tm:'октябрями',
	pm:'октябрях',
	rod:0,
	skl:2,
	odu:0,
};
lx['Олеся']={
	ie:'Олеся',
	re:'Олеси',
	de:'Олесе',
	ve:'Олесю',
	te:'Олесей',
	pe:'Олесе',
	im:'Олеси',
	rm:'Олесь',
	dm:'Олесям',
	vm:'Олесь',
	tm:'Олесями',
	pm:'Олесях',
	rod:1,
	skl:1,
	odu:0,
};
lx['Ольга']={
	ie:'Ольга',
	re:'Ольги',
	de:'Ольге',
	ve:'Ольгу',
	te:'Ольгой',
	pe:'Ольге',
	im:'Ольги',
	rm:'Ольг',
	dm:'Ольгам',
	vm:'Ольг',
	tm:'Ольгами',
	pm:'Ольгах',
	rod:1,
	skl:1,
	odu:0,
};
lx['отрезок']={
	ie:'отрезок',
	re:'отрезка',
	de:'отрезку',
	ve:'отрезок',
	te:'отрезком',
	pe:'отрезке',
	im:'отрезки',
	rm:'отрезков',
	dm:'отрезкам',
	vm:'отрезки',
	tm:'отрезками',
	pm:'отрезках',
	rod:0,
	skl:2,
	odu:0,
};
lx['офис']={
	ie:'офис',
	re:'офиса',
	de:'офису',
	ve:'офис',
	te:'офисом',
	pe:'офисе',
	im:'офисы',
	rm:'офисов',
	dm:'офисам',
	vm:'офисы',
	tm:'офисами',
	pm:'офисах',
	rod:0,
	skl:2,
	odu:0,
};
lx['параллелограмм']={
	ie:'параллелограмм',
	re:'параллелограмма',
	de:'параллелограмму',
	ve:'параллелограмм',
	te:'параллелограммом',
	pe:'параллелограмме',
	im:'параллелограммы',
	rm:'параллелограммов',
	dm:'параллелограммам',
	vm:'параллелограммы',
	tm:'параллелограммами',
	pm:'параллелограммах',
	rod:0,
	skl:2,
	odu:0,
};
lx['пароход']={
	ie:'пароход',
	re:'парохода',
	de:'пароходу',
	ve:'пароход',
	te:'пароходом',
	pe:'пароходе',
	im:'пароходы',
	rm:'пароходов',
	dm:'пароходам',
	vm:'пароходы',
	tm:'пароходами',
	pm:'пароходах',
	rod:0,
	skl:2,
	odu:0,
};
lx['ПГТ']={
	ie:'ПГТ',
	re:'ПГТ',
	de:'ПГТ',
	ve:'ПГТ',
	te:'ПГТ',
	pe:'ПГТ',
	im:'ПГТ',
	rm:'ПГТ',
	dm:'ПГТ',
	vm:'ПГТ',
	tm:'ПГТ',
	pm:'ПГТ',
	rod:0,
	skl:0,
	odu:0,
};
lx['пенобетон']={
	ie:'пенобетон',
	re:'пенобетона',
	de:'пенобетону',
	ve:'пенобетон',
	te:'пенобетоном',
	pe:'пенобетоне',
	im:'пенобетоны',
	rm:'пенобетонов',
	dm:'пенобетонам',
	vm:'пенобетоны',
	tm:'пенобетонами',
	pm:'пенобетонах',
	rod:0,
	skl:2,
	odu:0,
};
lx['песок']={
	ie:'песок',
	re:'песка',
	de:'песку',
	ve:'песок',
	te:'песком',
	pe:'песке',
	im:'пески',
	rm:'песков',
	dm:'пескам',
	vm:'пески',
	tm:'песками',
	pm:'песках',
	rod:0,
	skl:2,
	odu:0,
};
lx['песчаник']={
	ie:'песчаник',
	re:'песчаника',
	de:'песчанику',
	ve:'песчаник',
	te:'песчаником',
	pe:'песчанике',
	im:'песчаники',
	rm:'песчаников',
	dm:'песчаникам',
	vm:'песчаники',
	tm:'песчаниками',
	pm:'песчаниках',
	rod:0,
	skl:2,
	odu:0,
};
lx['Петровна']={
	ie:'Петровна',
	re:'Петровны',
	de:'Петровне',
	ve:'Петровну',
	te:'Петровной',
	pe:'Петровне',
	im:'Петровны',
	rm:'Петровн',
	dm:'Петровнам',
	vm:'Петровн',
	tm:'Петровнами',
	pm:'Петровнах',
	rod:1,
	skl:1,
	odu:0,
};
lx['пирожок']={
	ie:'пирожок',
	re:'пирожка',
	de:'пирожку',
	ve:'пирожок',
	te:'пирожком',
	pe:'пирожке',
	im:'пирожки',
	rm:'пирожков',
	dm:'пирожкам',
	vm:'пирожки',
	tm:'пирожами',
	pm:'пирожах',
	rod:0,
	skl:2,
	odu:0,
};
lx['поезд']={
	ie:'поезд',
	re:'поезда',
	de:'поезду',
	ve:'поезд',
	te:'поездом',
	pe:'поезде',
	im:'поезды',
	rm:'поездов',
	dm:'поездам',
	vm:'поезды',
	tm:'поездами',
	pm:'поездах',
	rod:0,
	skl:2,
	odu:0,
};
lx['полуинтервал']={
	ie:'полуинтервал',
	re:'полуинтервала',
	de:'полуинтервалу',
	ve:'полуинтервал',
	te:'полуинтервалом',
	pe:'полуинтервале',
	im:'полуинтервалы',
	rm:'полуинтервалов',
	dm:'полуинтервалам',
	vm:'полуинтервалы',
	tm:'полуинтервалами',
	pm:'полуинтервалах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Польша']={
	ie:'Польша',
	re:'Польши',
	de:'Польше',
	ve:'Польшу',
	te:'Польшой',
	pe:'Польше',
	im:'Польши',
	rm:'Польш',
	dm:'Польшам',
	vm:'Польши',
	tm:'Польшами',
	pm:'Польшах',
	rod:1,
	skl:1,
	odu:0,
};
lx['понедельник']={
	ie:'понедельник',
	re:'понедельника',
	de:'понедельнику',
	ve:'понедельник',
	te:'понедельником',
	pe:'понедельнике',
	im:'понедельники',
	rm:'понедельников',
	dm:'понедельникам',
	vm:'понедельники',
	tm:'понедельниками',
	pm:'понедельниках',
	rod:0,
	skl:2,
	odu:0,
};
lx['посёлок']={
	ie:'посёлок',
	re:'посёлка',
	de:'посёлку',
	ve:'посёлок',
	te:'посёлком',
	pe:'посёлке',
	im:'посёлки',
	rm:'посёлков',
	dm:'посёлкам',
	vm:'посёлки',
	tm:'посёлками',
	pm:'посёлках',
	rod:0,
	skl:2,
	odu:0,
};
lx['программистка']={
	ie:'программистка',
	re:'программистки',
	de:'программистке',
	ve:'программистку',
	te:'программисткой',
	pe:'программистке',
	im:'программистки',
	rm:'программисток',
	dm:'программисткам',
	vm:'программисток',
	tm:'программистками',
	pm:'программистках',
	rod:1,
	skl:1,
	odu:0,
};
lx['промежуток']={
	ie:'промежуток',
	re:'промежутка',
	de:'промежутку',
	ve:'промежуток',
	te:'промежутком',
	pe:'промежутке',
	im:'промежутки',
	rm:'промежутков',
	dm:'промежуткам',
	vm:'промежутки',
	tm:'промежутками',
	pm:'промежутках',
	rod:0,
	skl:2,
	odu:0,
};
lx['прямоугольник']={
	ie:'прямоугольник',
	re:'прямоугольника',
	de:'прямоугольнику',
	ve:'прямоугольник',
	te:'прямоугольником',
	pe:'прямоугольнике',
	im:'прямоугольники',
	rm:'прямоугольников',
	dm:'прямоугольникам',
	vm:'прямоугольники',
	tm:'прямоугольниками',
	pm:'прямоугольниках',
	rod:0,
	skl:2,
	odu:0,
};
lx['пункт']={
	ie:'пункт',
	re:'пункта',
	de:'пункту',
	ve:'пункт',
	te:'пунктом',
	pe:'пункте',
	im:'пункты',
	rm:'пунктов',
	dm:'пунктам',
	vm:'пункты',
	tm:'пунктами',
	pm:'пунктах',
	rod:0,
	skl:2,
	odu:0,
};
lx['путь']={
	ie:'путь',
	re:'пути',
	de:'пути',
	ve:'путь',
	te:'путём',
	pe:'пути',
	im:'пути',
	rm:'путей',
	dm:'путям',
	vm:'пути',
	tm:'путями',
	pm:'путях',
	rod:0,
	skl:2,
	odu:0,
};
lx['пятница']={
	ie:'пятница',
	re:'пятницы',
	de:'пятнице',
	ve:'пятницу',
	te:'пятницей',
	pe:'пятнице',
	im:'пятницы',
	rm:'пятниц',
	dm:'пятницам',
	vm:'пятницы',
	tm:'пятницами',
	pm:'пятницах',
	rod:1,
	skl:1,
	odu:0,
};
lx['раствор']={
	ie:'раствор',
	re:'раствора',
	de:'раствору',
	ve:'раствор',
	te:'раствором',
	pe:'растворе',
	im:'растворы',
	rm:'растворов',
	dm:'растворам',
	vm:'растворы',
	tm:'растворами',
	pm:'растворах',
	rod:0,
	skl:2,
	odu:0,
};
lx['ромб']={
	ie:'ромб',
	re:'ромба',
	de:'ромбу',
	ve:'ромб',
	te:'ромбом',
	pe:'ромбе',
	im:'ромбы',
	rm:'ромбов',
	dm:'ромбам',
	vm:'ромбы',
	tm:'ромбами',
	pm:'ромбах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Рособрнадзор']={
	ie:'Рособрнадзор',
	re:'Рособрнадзора',
	de:'Рособрнадзору',
	ve:'Рособрнадзор',
	te:'Рособрнадзором',
	pe:'Рособрнадзоре',
	im:'Рособрнадзоры',
	rm:'Рособрнадзоров',
	dm:'Рособрнадзорам',
	vm:'Рособрнадзоры',
	tm:'Рособрнадзорами',
	pm:'Рособрнадзорах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Россия']={
	ie:'Россия',
	re:'России',
	de:'России',
	ve:'Россию',
	te:'Россией',
	pe:'России',
	im:'России',
	rm:'Россий',
	dm:'Россиям',
	vm:'России',
	tm:'Россиями',
	pm:'Россиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['ртуть']={
	ie:'ртуть',
	re:'ртути',
	de:'ртути',
	ve:'ртуть',
	te:'ртутью',
	pe:'ртути',
	im:'ртути',
	rm:'ртутей',
	dm:'ртутям',
	vm:'ртути',
	tm:'ртутями',
	pm:'ртутях',
	rod:1,
	skl:3,
	odu:0,
};
lx['рубль']={
	ie:'рубль',
	re:'рубля',
	de:'рублю',
	ve:'рубль',
	te:'рублём',
	pe:'рубле',
	im:'рубли',
	rm:'рублей',
	dm:'рублям',
	vm:'рубли',
	tm:'рублями',
	pm:'рублях',
	rod:0,
	skl:2,
	odu:0,
};
lx['рука']={
	ie:'рука',
	re:'руки',
	de:'руке',
	ve:'руку',
	te:'рукой',
	pe:'руке',
	im:'руки',
	rm:'рук',
	dm:'рукам',
	vm:'руки',
	tm:'руками',
	pm:'руках',
	rod:1,
	skl:1,
	odu:0,
};
lx['ручка']={
	ie:'ручка',
	re:'ручки',
	de:'ручке',
	ve:'ручку',
	te:'ручкой',
	pe:'ручке',
	im:'ручки',
	rm:'ручек',
	dm:'ручкам',
	vm:'ручки',
	tm:'ручками',
	pm:'ручках',
	rod:1,
	skl:1,
	odu:0,
};
lx['Санкт-Петербург']={
	ie:'Санкт-Петербург',
	re:'Санкт-Петербурга',
	de:'Санкт-Петербургу',
	ve:'Санкт-Петербург',
	te:'Санкт-Петербургом',
	pe:'Санкт-Петербурге',
	im:'Санкт-Петербурги',
	rm:'Санкт-Петербургов',
	dm:'Санкт-Петербургам',
	vm:'Санкт-Петербурги',
	tm:'Санкт-Петербургами',
	pm:'Санкт-Петербургах',
	rod:0,
	skl:2,
	odu:0,
};
lx['сантиметр']={
	ie:'сантиметр',
	re:'сантиметра',
	de:'сантиметру',
	ve:'сантиметр',
	te:'сантиметром',
	pe:'сантиметре',
	im:'сантиметры',
	rm:'сантиметров',
	dm:'сантиметрам',
	vm:'сантиметры',
	tm:'сантиметрами',
	pm:'сантиметрах',
	rod:0,
	skl:2,
	odu:0,
	skr:'см',
};
lx['секретариат']={
	ie:'секретариат',
	re:'секретариата',
	de:'секретариату',
	ve:'секретариат',
	te:'секретариатом',
	pe:'секретариате',
	im:'секретариаты',
	rm:'секретариатов',
	dm:'секретариатам',
	vm:'секретариаты',
	tm:'секретариатами',
	pm:'секретариатах',
	rod:0,
	skl:2,
	odu:0,
};
lx['село']={
	ie:'село',
	re:'села',
	de:'селу',
	ve:'село',
	te:'селом',
	pe:'селе',
	im:'сёла',
	rm:'сёл',
	dm:'сёлам',
	vm:'сёла',
	tm:'сёлами',
	pm:'сёлах',
	rod:2,
	skl:2,
	odu:0,
};
lx['Семилуки']={
        ie:'Семилуки',
        re:'Семилук',
        de:'Семилукам',
        ve:'Семилуки',
        te:'Семилуками',
        pe:'Семилуках',
        im:'Семилуки',
        rm:'Семилук',
        dm:'Семилукам',
        vm:'Семилуки',
        tm:'Семилуками',
        pm:'Семилуках',
        rod:3,
        skl:2,
        odu:0,
};
lx['сентябрь']={
	ie:'сентябрь',
	re:'сентября',
	de:'сентябрю',
	ve:'сентябрь',
	te:'сентябре',
	pe:'сентябре',
	im:'сентябри',
	rm:'сентябрей',
	dm:'сентябрям',
	vm:'сентябри',
	tm:'сентябрями',
	pm:'сентябрях',
	rod:0,
	skl:2,
	odu:0,
};
lx['Сербия']={
	ie:'Сербия',
	re:'Сербии',
	de:'Сербии',
	ve:'Сербию',
	te:'Сербией',
	pe:'Сербии',
	im:'Сербии',
	rm:'Сербий',
	dm:'Сербиям',
	vm:'Сербии',
	tm:'Сербиями',
	pm:'Сербиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['Сергеевна']={
	ie:'Сергеевна',
	re:'Сергеевны',
	de:'Сергеевне',
	ve:'Сергеевну',
	te:'Сергеевной',
	pe:'Сергеевне',
	im:'Сергеевны',
	rm:'Сергеевн',
	dm:'Сергеевнам',
	vm:'Сергеевн',
	tm:'Сергеевнами',
	pm:'Сергеевнах',
	rod:1,
	skl:1,
	odu:0,
};
lx['Словакия']={
	ie:'Словакия',
	re:'Словакии',
	de:'Словакии',
	ve:'Словакию',
	te:'Словакией',
	pe:'Словакии',
	im:'Словакии',
	rm:'Словакий',
	dm:'Словакиям',
	vm:'Словакии',
	tm:'Словакиями',
	pm:'Словакиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['Словения']={
	ie:'Словения',
	re:'Словении',
	de:'Словении',
	ve:'Словению',
	te:'Словенией',
	pe:'Словении',
	im:'Словении',
	rm:'Словений',
	dm:'Словениям',
	vm:'Словении',
	tm:'Словениями',
	pm:'Словениях',
	rod:1,
	skl:1,
	odu:0,
};
lx['солярка']={
	ie:'солярка',
	re:'солярки',
	de:'солярке',
	ve:'солярку',
	te:'соляркой',
	pe:'солярке',
	im:'солярки',
	rm:'солярк',
	dm:'соляркам',
	vm:'солярки',
	tm:'солярками',
	pm:'солярках',
	rod:1,
	skl:1,
	odu:0,
};
lx['Сочи']={
	ie:'Сочи',
	re:'Сочи',
	de:'Сочи',
	ve:'Сочи',
	te:'Сочи',
	pe:'Сочи',
	im:'Сочи',
	rm:'Сочи',
	dm:'Сочи',
	vm:'Сочи',
	tm:'Сочи',
	pm:'Сочи',
	rod:1,
	skl:0,
	odu:0,
};
lx['среда']={
	ie:'среда',
	re:'среды',
	de:'среде',
	ve:'среду',
	te:'средой',
	pe:'среде',
	im:'среды',
	rm:'сред',
	dm:'средам',
	vm:'среды',
	tm:'средами',
	pm:'средах',
	rod:1,
	skl:1,
	odu:0,
};
lx['студентка']={
	ie:'студентка',
	re:'студентки',
	de:'студентке',
	ve:'студентку',
	te:'студенткой',
	pe:'студентке',
	im:'студентки',
	rm:'студенток',
	dm:'студенткам',
	vm:'студенток',
	tm:'студентками',
	pm:'студентках',
	rod:1,
	skl:1,
	odu:0,
};
lx['суббота']={
	ie:'суббота',
	re:'субботы',
	de:'субботе',
	ve:'субботу',
	te:'субботой',
	pe:'субботе',
	im:'субботы',
	rm:'суббот',
	dm:'субботам',
	vm:'субботы',
	tm:'субботами',
	pm:'субботах',
	rod:1,
	skl:1,
	odu:0,
};
lx['сувенир']={
	ie:'сувенир',
	re:'сувенира',
	de:'сувениру',
	ve:'сувенир',
	te:'сувениром',
	pe:'сувенире',
	im:'сувениры',
	rm:'сувениров',
	dm:'сувенирам',
	vm:'сувениры',
	tm:'сувенирами',
	pm:'сувенирах',
	rod:0,
	skl:2,
	odu:0,
};
lx['сырок']={
	ie:'сырок',
	re:'сырка',
	de:'сырку',
	ve:'сырок',
	te:'сырком',
	pe:'сырке',
	im:'сырки',
	rm:'сырков',
	dm:'сыркам',
	vm:'сырки',
	tm:'сырками',
	pm:'сырках',
	rod:0,
	skl:2,
	odu:0,
};
lx['теплоход']={
	ie:'теплоход',
	re:'теплохода',
	de:'теплоходу',
	ve:'теплоход',
	te:'теплоходом',
	pe:'теплоходе',
	im:'теплоходы',
	rm:'теплоходов',
	dm:'теплоходам',
	vm:'теплоходы',
	tm:'теплоходами',
	pm:'теплоходах',
	rod:0,
	skl:2,
	odu:0,
};
lx['террариум']={
	ie:'террариум',
	re:'террариума',
	de:'террариуму',
	ve:'террариум',
	te:'террариумом',
	pe:'террариуме',
	im:'террариумы',
	rm:'террариумов',
	dm:'террариумам',
	vm:'террариумы',
	tm:'террариумами',
	pm:'террариумах',
	rod:0,
	skl:2,
	odu:0,
};
lx['тетрадь']={
	ie:'тетрадь',
	re:'тетради',
	de:'тетради',
	ve:'тетрадь',
	te:'тетрадью',
	pe:'тетради',
	im:'тетради',
	rm:'тетрадей',
	dm:'тетрадям',
	vm:'тетради',
	tm:'тетрадями',
	pm:'тетрадях',
	rod:1,
	skl:3,
	odu:0,
};
lx['тонна']={
	ie:'тонна',
	re:'тонны',
	de:'тонне',
	ve:'тонну',
	te:'тонной',
	pe:'тонне',
	im:'тонны',
	rm:'тонн',
	dm:'тоннам',
	vm:'тонны',
	tm:'тоннами',
	pm:'тоннах',
	rod:1,
	skl:1,
	odu:0,
}; 
lx['топливо']={
	ie:'топливо',
	re:'топлива',
	de:'топливу',
	ve:'топливо',
	te:'топливом',
	pe:'топливе',
	im:'топливо',
	rm:'топлива',
	dm:'топливу',
	vm:'топливо',
	tm:'топливом',
	pm:'топливе',
	rod:2,
	skl:2,
	odu:0,
}; 
lx['точка']={
	ie:'точка',
	re:'точки',
	de:'точке',
	ve:'точку',
	te:'точкой',
	pe:'точке',
	im:'точки',
	rm:'точек',
	dm:'точкам',
	vm:'точки',
	tm:'точками',
	pm:'точках',
	rod:1,
	skl:1,
	odu:0,
};
lx['трапеция']={
	ie:'трапеция',
	re:'трапеции',
	de:'трапеции',
	ve:'трапецию',
	te:'трапецией',
	pe:'трапеции',
	im:'трапеции',
	rm:'трапеций',
	dm:'трапециям',
	vm:'трапеции',
	tm:'трапециями',
	pm:'трапециях',
	rod:1,
	skl:1,
	odu:0,
};
lx['учебник']={
	ie:'учебник',
	re:'учебника',
	de:'учебнику',
	ve:'учебник',
	te:'учебником',
	pe:'учебнике',
	im:'учебники',
	rm:'учебников',
	dm:'учебникам',
	vm:'учебники',
	tm:'учебниками',
	pm:'учебниках',
	rod:0,
	skl:2,
	odu:0,
};
lx['февраль']={
	ie:'февраль',
	re:'февраля',
	de:'февралю',
	ve:'февраль',
	te:'февралём',
	pe:'феврале',
	im:'феврали',
	rm:'февралей',
	dm:'февралям',
	vm:'феврали',
	tm:'февралями',
	pm:'февралях',
	rod:0,
	skl:2,
	odu:0,
};
lx['Фёдоровна']={
	ie:'Фёдоровна',
	re:'Фёдоровны',
	de:'Фёдоровне',
	ve:'Фёдоровну',
	te:'Фёдоровной',
	pe:'Фёдоровне',
	im:'Фёдоровны',
	rm:'Фёдоровн',
	dm:'Фёдоровнам',
	vm:'Фёдоровн',
	tm:'Фёдоровнами',
	pm:'Фёдоровнах',
	rod:1,
	skl:1,
	odu:0,
};
lx['флэшка']={
	ie:'флэшка',
	re:'флэшки',
	de:'флэшке',
	ve:'флэшку',
	te:'флэшкой',
	pe:'флэшке',
	im:'флэшки',
	rm:'флэшек',
	dm:'флэшкам',
	vm:'флэшки',
	tm:'флэшками',
	pm:'флэшках',
	rod:1,
	skl:1,
	odu:0,
};
lx['фонарик']={
	ie:'фонарик',
	re:'фонарика',
	de:'фонарику',
	ve:'фонарик',
	te:'фонариком',
	pe:'фонарике',
	im:'фонарики',
	rm:'фонариков',
	dm:'фонарикам',
	vm:'фонарики',
	tm:'фонариками',
	pm:'фонариках',
	rod:0,
	skl:2,
	odu:0,
};
lx['фурлонг']={
	ie:'фурлонг',
	re:'фурлонга',
	de:'фурлонгу',
	ve:'фурлонг',
	te:'фурлонгом',
	pe:'фурлонге',
	im:'фурлонги',
	rm:'фурлонгов',
	dm:'фурлонгам',
	vm:'фурлонги',
	tm:'фурлонгами',
	pm:'фурлонгах',
	rod:0,
	skl:2,
	odu:0,
};
lx['хутор']={
	ie:'хутор',
	re:'хутора',
	de:'хутору',
	ve:'хутор',
	te:'хутором',
	pe:'хуторе',
	im:'хутора',
	rm:'хуторов',
	dm:'хуторам',
	vm:'хутора',
	tm:'хуторами',
	pm:'хуторах',
	rod:0,
	skl:2,
	odu:0,
};
lx['час']={
	ie:'час',
	re:'часа',
	de:'часу',
	ve:'час',
	te:'часом',
	pe:'часе',
	im:'часы',
	rm:'часов',
	dm:'часам',
	vm:'часы',
	tm:'часами',
	pm:'часах',
	rod:0,
	skl:2,
	odu:0,
};
lx['четверг']={
	ie:'четверг',
	re:'четверга',
	de:'четвергу',
	ve:'четверг',
	te:'четвергом',
	pe:'четверге',
	im:'четверги',
	rm:'четвергов',
	dm:'четвергам',
	vm:'четверги',
	tm:'четвергами',
	pm:'четвергах',
	rod:0,
	skl:2,
	odu:0,
};
lx['четырёхугольник']={
	ie:'четырёхугольник',
	re:'четырёхугольника',
	de:'четырёхугольнику',
	ve:'четырёхугольник',
	te:'четырёхугольником',
	pe:'четырёхугольнике',
	im:'четырёхугольники',
	rm:'четырёхугольников',
	dm:'четырёхугольникам',
	vm:'четырёхугольники',
	tm:'четырёхугольниками',
	pm:'четырёхугольниках',
	rod:0,
	skl:2,
	odu:0,
};
lx['Чехия']={
	ie:'Чехия',
	re:'Чехии',
	de:'Чехии',
	ve:'Чехию',
	te:'Чехией',
	pe:'Чехии',
	im:'Чехии',
	rm:'Чехий',
	dm:'Чехиям',
	vm:'Чехии',
	tm:'Чехиями',
	pm:'Чехиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['шахматы']={
	ie:'шахматы',
	re:'шахмат',
	de:'шахматам',
	ve:'шахматы',
	te:'шахматами',
	pe:'шахматах',
	im:'шахматы',
	rm:'шахмат',
	dm:'шахматам',
	vm:'шахматы',
	tm:'шахматами',
	pm:'шахматах',
	rod:0,
	skl:2,
	odu:0,
};
lx['шашки']={
	ie:'шашки',
	re:'шашек',
	de:'шашкам',
	ve:'шашки',
	te:'шашками',
	pe:'шашках',
	im:'шашки',
	rm:'шашек',
	dm:'шашкам',
	vm:'шашки',
	tm:'шашками',
	pm:'шашках',
	rod:3,
	skl:1,
	odu:0,
};
lx['школьница']={
	ie:'школьница',
	re:'школьницы',
	de:'школьнице',
	ve:'школьницу',
	te:'школьницей',
	pe:'школьнице',
	im:'школьницы',
	rm:'школьниц',
	dm:'школьницам',
	vm:'школьницы',
	tm:'школьницами',
	pm:'школьницах',
	rod:1,
	skl:1,
	odu:0,
};
lx['шлак']={
	ie:'шлак',
	re:'шлака',
	de:'шлаку',
	ve:'шлак',
	te:'шлаком',
	pe:'шлаке',
	im:'шлаки',
	rm:'шлаков',
	dm:'шлакам',
	vm:'шлаки',
	tm:'шлаками',
	pm:'шлаках',
	rod:0,
	skl:2,
	odu:0,
};
lx['шоколадка']={
	ie:'шоколадка',
	re:'шоколадки',
	de:'шоколадке',
	ve:'шоколадку',
	te:'шоколадкой',
	pe:'шоколадке',
	im:'шоколадки',
	rm:'шоколадок',
	dm:'шоколадкам',
	vm:'шоколадки',
	tm:'шоколадками',
	pm:'шоколадках',
	rod:1,
	skl:1,
	odu:0,
};
lx['щебень']={
	ie:'щебень',
	re:'щебня',
	de:'щебню',
	ve:'щебень',
	te:'щебнем',
	pe:'щебне',
	im:'щебни',
	rm:'щебней',
	dm:'щебням',
	vm:'щебни',
	tm:'щебнями',
	pm:'щебнях',
	rod:0,
	skl:2,
	odu:0,
};
lx['Эквадор']={
	ie:'Эквадор',
	re:'Эквадора',
	de:'Эквадору',
	ve:'Эквадор',
	te:'Эквадором',
	pe:'Эквадоре',
	im:'Эквадоры',
	rm:'Эквадоров',
	dm:'Эквадорам',
	vm:'Эквадоры',
	tm:'Эквадорами',
	pm:'Эквадорах',
	rod:0,
	skl:2,
	odu:0,
};
lx['электричка']={
	ie:'электричка',
	re:'электрички',
	de:'электричке',
	ve:'электричку',
	te:'электричкой',
	pe:'электричке',
	im:'электрички',
	rm:'электричк',
	dm:'электричкам',
	vm:'электрички',
	tm:'электричками',
	pm:'электричках',
	rod:1,
	skl:1,
	odu:0,
}; 
lx['Элеонора']={
	ie:'Элеонора',
	re:'Элеоноры',
	de:'Элеоноре',
	ve:'Элеонору',
	te:'Элеонорой',
	pe:'Элеоноре',
	im:'Элеоноры',
	rm:'Элеонор',
	dm:'Элеонорам',
	vm:'Элеонор',
	tm:'Элеонорами',
	pm:'Элеонорах',
	rod:1,
	skl:1,
	odu:0,
};
lx['этаж']={
	ie:'этаж',
	re:'этажа',
	de:'этажу',
	ve:'этаж',
	te:'этажом',
	pe:'этаже',
	im:'этажи',
	rm:'этажей',
	dm:'этажам',
	vm:'этажи',
	tm:'этажами',
	pm:'этажах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Юлия']={
	ie:'Юлия',
	re:'Юлии',
	de:'Юлии',
	ve:'Юлию',
	te:'Юлией',
	pe:'Юлии',
	im:'Юлии',
	rm:'Юлий',
	dm:'Юлиям',
	vm:'Юлий',
	tm:'Юлиями',
	pm:'Юлиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['яблоко']={
	ie:'яблоко',
	re:'яблока',
	de:'яблоку',
	ve:'яблоко',
	te:'яблоком',
	pe:'яблоке',
	im:'яблоки',
	rm:'яблок',
	dm:'яблокам',
	vm:'яблоки',
	tm:'яблоками',
	pm:'яблоках',
	rod:2,
	skl:2,
	odu:0,
};
lx['Яна']={
	ie:'Яна',
	re:'Яны',
	de:'Яне',
	ve:'Яну',
	te:'Яной',
	pe:'Яне',
	im:'Яны',
	rm:'Ян',
	dm:'Янам',
	vm:'Ян',
	tm:'Янами',
	pm:'Янах',
	rod:1,
	skl:1,
	odu:0,
};
lx['январь']={
	ie:'январь',
	re:'января',
	de:'январю',
	ve:'январь',
	te:'январём',
	pe:'январе',
	im:'январи',
	rm:'январей',
	dm:'январям',
	vm:'январи',
	tm:'январями',
	pm:'январях',
	rod:0,
	skl:2,
	odu:0,
};

//}}Существительные

////////////////////////////////////////////////////////////////////////

lx['выраженный']={};
lx['выраженный'].i=['выраженный','выраженная','выраженное','выраженные'];
lx['выраженный'].r=['выраженного','выраженной','выраженного','выраженных'];
lx['выраженный'].d=['выраженному','выраженной','выраженному','выраженным'];
lx['выраженный'].v=['выраженный','выраженную','выраженное','выраженные'];
lx['выраженный'].t=['выраженным','выраженной','выраженным','выраженными'];
lx['выраженный'].p=['выраженном','выраженной','выраженном','выраженных'];

////////////////////////////////////////////////////////////////////////
//
//	ie: именительный	падеж единственного	числа
//	re: родительный		падеж единственного	числа
//	de: дательный		падеж единственного	числа
//	ve: винительный		падеж единственного	числа
//	te: творительный	падеж единственного	числа
//	pe: предложный		падеж единственного	числа
//	ie: именительный	падеж множественного	числа
//	re: родительный		падеж множественного	числа
//	de: дательный		падеж множественного	числа
//	ve: винительный		падеж множественного	числа
//	te: творительный	падеж множественного	числа
//	pe: предложный		падеж множественного	числа
//
//	rod: род:
//		0: мужской
//		1: женский
//		2: средний
//		3: только множественное число
//
//	odu: одушевлённость:
//		0: неодушевлённое
//		1: одушевлённое
//
//	skl: склонение:
//		0: несклоняемое
//		1: первое
//		2: второе
//		3: третье
//		4: разносклоняемые существительные
////////////////////////////////////////////////////////////////////////
if(lx==undefined)
	var lx=[];	//Объявляем глобальный объект lx
////////////////////////////////////////////////////////////////////////

//{{Словосочетания с главным словом - существительным
lx['американская миля']={
	ie:'американская миля',
	re:'американской мили',
	de:'американской миле',
	ve:'американскую милю',
	te:'американской милей',
	pe:'американской миле',
	im:'американские мили',
	rm:'американских миль',
	dm:'американским милям',
	vm:'американские мили',
	tm:'американскими милями',
	pm:'американских милях',
	rod:1,
	odu:0,
};
lx['бутылка газировки']={
	ie:'бутылка газировки',
	re:'бутылки газировки',
	de:'бутылке газировки',
	ve:'бутылку газировки',
	te:'бутылкой газировки',
	pe:'бутылке газировки',
	im:'бутылки газировки',
	rm:'бутылок газировки',
	dm:'бутылкам газировки',
	vm:'бутылки газировки',
	tm:'бутылками газировки',
	pm:'бутылках газировки',
	rod:0,
	odu:0,
};
lx['буханка хлеба']={
	ie:'буханка хлеба',
	re:'буханки хлеба',
	de:'буханке хлеба',
	ve:'буханку хлеба',
	te:'буханкой хлеба',
	pe:'буханке хлеба',
	im:'буханки хлеба',
	rm:'буханок хлеба',
	dm:'буханкам хлеба',
	vm:'буханки хлеба',
	tm:'буханками хлеба',
	pm:'буханках хлеба',
	rod:1,
	odu:0,
};
lx['вольная борьба']={
	ie:'вольная борьба',
	re:'вольной борьбы',
	de:'вольной борьбе',
	ve:'вольную борьбу',
	te:'вольной борьбой',
	pe:'вольной борьбе',
	im:'вольные борьбы',
	rm:'вольных борьб',
	dm:'вольным борьбам',
	vm:'вольные борьбы',
	tm:'вольными борьбами',
	pm:'вольных борьбах',
	rod:1,
	odu:0,
};
lx['доисторический омнибус']={
	ie:'доисторический омнибус',
	re:'доисторического омнибуса',
	de:'доисторическому омнибусу',
	ve:'доисторический омнибус',
	te:'доисторическим омнибусом',
	pe:'доисторическом омнибусе',
	im:'доисторические омнибусы',
	rm:'доисторических омнибусов',
	dm:'доисторическим омнибусам',
	vm:'доисторические омнибусы',
	tm:'доисторическими омнибусами',
	pm:'доисторических омнибусах',
	rod:0,
	odu:0,
};
lx['книжная полка']={
	ie:'книжная полка',
	re:'книжной полки',
	de:'книжной полке',
	ve:'книжную полку',
	te:'книжной полкой',
	pe:'книжной полке',
	im:'книжные полки',
	rm:'книжных полок',
	dm:'книжным полкам',
	vm:'книжные полки',
	tm:'книжными полками',
	pm:'книжных полках',
	rod:1,
	odu:0,
};
lx['комсомолка, спортсменка, отличница и, наконец, просто красавица']={
	ie:'комсомолка, спортсменка, отличница и, наконец, просто красавица',
	re:'комсомолки, спортсменки, отличницы и, наконец, просто красавицы',
	de:'комсомолке, спортсменке, отличнице и, наконец, просто красавице',
	ve:'комсомолку, спортсменку, отличницу и, наконец, просто красавицу',
	te:'комсомолкой, спортсменкой, отличницей и, наконец, просто красавицей',
	pe:'комсомолке, спортсменке, отличнице и, наконец, просто красавице',
	im:'комсомолки, спортсменки, отличницы и, наконец, просто красавицы',
	rm:'комсомолок, спортсменок, отличниц и, наконец, просто красавиц',
	dm:'комсомолкам, спортсменкам, отличницам и, наконец, просто красавицам',
	vm:'комсомолок, спортсменок, отличниц и, наконец, просто красавиц',
	tm:'комсомолками, спортсменками, отличницами и, наконец, просто красавицами',
	pm:'комсомолках, спортсменках, отличницах и, наконец, просто красавицах',
	rod:1,
	odu:0,
};
lx['круизный лайнер']={
	ie:'круизный лайнер',
	re:'круизного лайнера',
	de:'круизному лайнеру',
	ve:'круизный лайнер',
	te:'круизным лайнером',
	pe:'круизном лайнере',
	im:'круизные лайнеры',
	rm:'круизных лайнеров',
	dm:'круизным лайнерам',
	vm:'круизные лайнеры',
	tm:'круизными лайнерами',
	pm:'круизных лайнерах',
	rod:0,
	odu:0,
};
lx['лёгкая атлетика']={
	ie:'лёгкая атлетика',
	re:'лёкой атлетики',
	de:'лёгкой атлетике',
	ve:'лёгкую атлетику',
	te:'лёгкой атлетикой',
	pe:'лёгкой атлетике',
	im:'лёгкие атлетики',
	rm:'лёгких атлетик',
	dm:'лёгким атлетикам',
	vm:'лёгкие атлетики',
	tm:'лёгкими атлетиками',
	pm:'лёгких атлетиках',
	rod:1,
	odu:0,
};
lx['магнит на холодильник']={
	ie:'магнит на холодильник',
	re:'магнита на холодильник',
	de:'магниту на холодильник',
	ve:'магнит на холодильник',
	te:'магнитом на холодильник',
	pe:'магните на холодильник',
	im:'магниты на холодильник',
	rm:'магнитов на холодильник',
	dm:'магнитам на холодильник',
	vm:'магниты на холодильник',
	tm:'магнитами на холодильник',
	pm:'магнитах на холодильник',
	rod:0,
	odu:0,
};
lx['метиловый спирт']={
	ie:'метиловый спирт',
	re:'метилового спирта',
	de:'метиловому спирту',
	ve:'метиловый спирт',
	te:'метиловым спиртом',
	pe:'метиловом спирте',
	im:'метиловые спирты',
	rm:'метиловых спиртов',
	dm:'метиловым спиртам',
	vm:'метиловые спирты',
	tm:'метиловыми спиртами',
	pm:'метиловых спиртах',
	rod:0,
	odu:0,
};
lx['морская миля']={
	ie:'морская миля',
	re:'морской мили',
	de:'морской миле',
	ve:'морскую милю',
	te:'морской милей',
	pe:'морской миле',
	im:'морские мили',
	rm:'морских миль',
	dm:'морским милям',
	vm:'морские мили',
	tm:'морскими милями',
	pm:'морских милях',
	rod:1,
	odu:0,
};
lx['наименьшее значение']={
	ie:'наименьшее значение',
	re:'наименьшего значения',
	de:'наименьшему значению',
	ve:'наименьшее значение',
	te:'наименьшим значением',
	pe:'наименьшем значении',
	im:'наименьшие значения',
	rm:'наименьших значений',
	dm:'наименьшим значениям',
	vm:'наименьшие значения',
	tm:'наименьшими значениями',
	pm:'наименьших значениях',
	rod:2,
	odu:0,
};
lx['наибольшее значение']={
	ie:'наибольшее значение',
	re:'наибольшего значения',
	de:'наибольшему значению',
	ve:'наибольшее значение',
	te:'наибольшим значением',
	pe:'наибольшем значении',
	im:'наибольшие значения',
	rm:'наибольших значений',
	dm:'наибольшим значениям',
	vm:'наибольшие значения',
	tm:'наибольшими значениями',
	pm:'наибольших значениях',
	rod:2,
	odu:0,
};
lx['населённый пункт']={
	ie:'населённый пункт',
	re:'населённого пункта',
	de:'населённому пункту',
	ve:'населённый пункт',
	te:'населённым пунктом',
	pe:'населённом пункте',
	im:'населённые пункты',
	rm:'населённых пунктов',
	dm:'населённым пунктам',
	vm:'населённые пункты',
	tm:'населёнными пунктами',
	pm:'населённых пунктах',
	r2:'населённых пункта',
	rod:0,
	odu:0,
};
lx['настольный теннис']={
	ie:'настольный теннис',
	re:'настольного тенниса',
	de:'настольному теннису',
	ve:'настольный теннис',
	te:'настольным теннисом',
	pe:'настольном теннисе',
	im:'настольные теннисы',
	rm:'настольных теннисов',
	dm:'настольным теннисам',
	vm:'настольные теннисы',
	tm:'настольными теннисами',
	pm:'настольных теннисах',
	rod:0,
	odu:0,
};
lx['оконная рама']={
	ie:'оконная рама',
	re:'оконной рамы',
	de:'оконной раме',
	ve:'оконную раму',
	te:'оконной рамой',
	pe:'оконной раме',
	im:'оконные рамы',
	rm:'оконных рам',
	dm:'оконным рамам',
	vm:'оконные рамы',
	tm:'оконными рамами',
	pm:'оконных рамах',
	rod:1,
	odu:0,
};
lx['открытый луч']={
	ie:'открытый луч',
	re:'открытого луча',
	de:'открытому лучу',
	ve:'открытый луч',
	te:'открытым лучом',
	pe:'открытом луче',
	im:'открытые лучы',
	rm:'открытых лучей',
	dm:'открытым лучам',
	vm:'открытые лучи',
	tm:'открытыми лучами',
	pm:'открытых лучах',
	rod:0,
	odu:0,
};
lx['прогулочное судно']={
	ie:'прогулочное судно',
	re:'прогулочного судна',
	de:'прогулочному судну',
	ve:'прогулочное судно',
	te:'прогулочным судном',
	pe:'прогулочном судне',
	im:'прогулочные суда',
	rm:'прогулочных судов',
	dm:'прогулочным судам',
	vm:'прогулочные суда',
	tm:'прогулочными судами',
	pm:'прогулочных судах',
	rod:2,
	odu:0,
};
lx['русская миля']={
	ie:'русская миля',
	re:'русской мили',
	de:'русской миле',
	ve:'русскую милю',
	te:'русской милей',
	pe:'русской миле',
	im:'русские мили',
	rm:'русских миль',
	dm:'русским милям',
	vm:'русские мили',
	tm:'русскими милями',
	pm:'русских милях',
	rod:1,
	odu:0,
};
lx['сборник тестов для подготовки к ЕГЭ']={
	ie:'сборник тестов для подготовки к ЕГЭ',
	re:'сборника тестов для подготовки к ЕГЭ',
	de:'сборнику тестов для подготовки к ЕГЭ',
	ve:'сборник тестов для подготовки к ЕГЭ',
	te:'сборником тестов для подготовки к ЕГЭ',
	pe:'сборнике тестов для подготовки к ЕГЭ',
	im:'сборники тестов для подготовки к ЕГЭ',
	rm:'сборников тестов для подготовки к ЕГЭ',
	dm:'сборникам тестов для подготовки к ЕГЭ',
	vm:'сборники тестов для подготовки к ЕГЭ',
	tm:'сборниками тестов для подготовки к ЕГЭ',
	pm:'сборниках тестов для подготовки к ЕГЭ',
	rod:0,
	odu:0,
};
lx['скромный библиотекарь']={
	ie:'скромный библиотекарь',
	re:'скромного библиотекаря',
	de:'скромному библиотекарю',
	ve:'скромного библиотекаря',
	te:'скромным библиотекарем',
	pe:'скромном библиотекаре',
	im:'скромные библиотекари',
	rm:'скромных библиотекарей',
	dm:'скромным библиотекарям',
	vm:'скромных библиотекарей',
	tm:'скромными библиотекарями',
	pm:'скромных библиотекарях',
	rod:0,
	odu:0,
};
lx['суровая воронежская хакерша']={
	ie:'суровая воронежская хакерша',
	re:'суровой воронежской хакерши',
	de:'суровой воронежской хакерше',
	ve:'суровую воронежскую хакершу',
	te:'суровой воронежской хакершой',
	pe:'суровой воронежской хакерше',
	im:'суровые воронежские хакерши',
	rm:'суровых воронежских хакерш',
	dm:'суровым воронежским хакершам',
	vm:'суровых воронежских хакерш',
	tm:'суровыми воронежскими хакершами',
	pm:'суровых воронежских хакершах',
	rod:1,
	odu:0,
};
lx['точка минимума']={
	ie:'точка минимума',
	re:'точки минимума',
	de:'точке минимума',
	ve:'точку минимума',
	te:'точкой минимума',
	pe:'точке минимума',
	im:'точки минимума',
	rm:'точек минимума',
	dm:'точкам минимума',
	vm:'точки минимума',
	tm:'точками минимума',
	pm:'точках минимума',
	rod:1,
	odu:0,
};
lx['точка максимума']={
	ie:'точка максимума',
	re:'точки максимума',
	de:'точке максимума',
	ve:'точку максимума',
	te:'точкой максимума',
	pe:'точке максимума',
	im:'точки максимума',
	rm:'точек максимума',
	dm:'точкам максимума',
	vm:'точки максимума',
	tm:'точками максимума',
	pm:'точках максимума',
	rod:1,
	odu:0,
};
lx['тяжелая атлетика']={
	ie:'тяжелая атлетика',
	re:'тяжелой атлетики',
	de:'тяжелой атлетике',
	ve:'тяжелую атлетику',
	te:'тяжелой атлетикой',
	pe:'тяжелой атлетике',
	im:'тяжелые атлетики',
	rm:'тяжелых атлетик',
	dm:'тяжелым атлетикам',
	vm:'тяжелые атлетики',
	tm:'тяжелыми атлетиками',
	pm:'тяжелых атлетиках',
	rod:1,
	odu:0,
};
lx['упаковка сока']={
	ie:'упаковка сока',
	re:'упаковки сока',
	de:'упаковке сока',
	ve:'упаковку сока',
	te:'упаковкой сока',
	pe:'упаковке сока',
	im:'упаковки сока',
	rm:'упаковок сока',
	dm:'упаковкам сока',
	vm:'упаковки сока',
	tm:'упаковками сока',
	pm:'упаковках сока',
	rod:1,
	odu:0,
};
lx['флакон шампуня']={
	ie:'флакон шампуня',
	re:'флакона шампуня',
	de:'флакону шампуня',
	ve:'флакон шампуня',
	te:'флаконом шампуня',
	pe:'флаконе шампуня',
	im:'флаконы шампуня',
	rm:'флаконов шампуня',
	dm:'флаконам шампуня',
	vm:'флаконы шампуня',
	tm:'флаконами шампуня',
	pm:'флаконах шампуня',
	rod:0,
	odu:0,
};
lx['фунт стерлингов']={
	ie:'фунт стерлингов',
	re:'фунта стерлингов',
	de:'фунту стерлингов',
	ve:'фунт стерлингов',
	te:'фунтом стерлингов',
	pe:'фунте стерлингов',
	im:'фунты стерлингов',
	rm:'фунтов стерлингов',
	dm:'фунтам стерлингов',
	vm:'фунты стерлингов',
	tm:'фунтами стерлингов',
	pm:'фунтах стерлингов',
	rod:0,
	skl:2,
	odu:0,
};
lx['цветочный горшок']={
	ie:'цветочный горшок',
	re:'цветочного горшка',
	de:'цветочному горшку',
	ve:'цветочный горшок',
	te:'цветочным горшком',
	pe:'цветочном горшке',
	im:'цветочные горшки',
	rm:'цветочных горшков',
	dm:'цветочным горшкам',
	vm:'цветочные горшки',
	tm:'цветочными горшками',
	pm:'цветочных горшках',
	rod:0,
	skl:2,
	odu:0,
};
//}}Словосочетания с главным словом - существительным

////////////////////////////////////////////////////////////////////////
var lxskl=[];	//Объявляем глобальный объект lxskl - типичные окончания
////////////////////////////////////////////////////////////////////////
var lxpad={ie:1,re:1,de:1,ve:1,te:1,pe:1,im:1,rm:1,dm:1,vm:1,tm:1,pm:1,};

//Пустой шаблон

lxskl['']={
	ie:'',
	re:'',
	de:'',
	ve:'',
	te:'',
	pe:'',
	im:'',
	rm:'',
	dm:'',
	vm:'',
	tm:'',
	pm:'',
	rod:0,
	skl:2,
	odu:0,
};
//Первое склонение. Род считаем женским, если что, ставим вручную.
{
lxskl['я']={
	ie:'я',
	re:'и',
	de:'е',
	ve:'ю',
	te:'ей',
	pe:'е',
	im:'и',
	rm:'',
	dm:'ям',
	vm:'и',
	tm:'ями',
	pm:'ях',
	rod:1,
	skl:1,
	odu:0,
};
lxskl['а']={
	ie:'а',
	re:'ы',
	de:'е',
	ve:'у',
	te:'ой',
	pe:'е',
	im:'ы',
	rm:'',
	dm:'ам',
	vm:'ы',
	tm:'ами',
	pm:'ах',
	rod:1,
	skl:1,
	odu:0,
};
['ж','ш','ч','щ','к','х','г'].map(function(a){
	lxskl[a+'а']={
		ie:a+'а',
		re:a+'и',
		de:a+'е',
		ve:a+'у',
		te:a+'ой',
		pe:a+'е',
		im:a+'и',
		rm:a+'',
		dm:a+'ам',
		vm:a+'и',
		tm:a+'ами',
		pm:a+'ах',
		rod:1,
		skl:1,
		odu:0,
	}; 
});
['ж','ш','ч'].map(function(a){
	lxskl[a+'ка']={
		ie:a+'ка',
		re:a+'ки',
		de:a+'ке',
		ve:a+'ку',
		te:a+'кой',
		pe:a+'ке',
		im:a+'ки',
		rm:a+'ек',
		dm:a+'кам',
		vm:a+'ки',
		tm:a+'ками',
		pm:a+'ках',
		rod:1,
		skl:1,
		odu:0,
	}; 	
});
['б','в','д','з','л','м','н','п','р','с','т'].map(function(a){
	lxskl[a+'ка']={
		ie:a+'ка',
		re:a+'ки',
		de:a+'ке',
		ve:a+'ку',
		te:a+'кой',
		pe:a+'ке',
		im:a+'ки',
		rm:a+'ок',
		dm:a+'кам',
		vm:a+'ки',
		tm:a+'ками',
		pm:a+'ках',
		rod:1,
		skl:1,
		odu:0,
	}; 	
});
lxskl['ия']={
	ie:'ия',
	re:'ии',
	de:'ии',
	ve:'ию',
	te:'ией',
	pe:'ии',
	im:'ии',
	rm:'ий',
	dm:'иям',
	vm:'ии',
	tm:'иями',
	pm:'иях',
	rod:1,
	skl:1,
	odu:0,
};
}
//Второе склонение, средний род
lxskl['ие']={
	ie:'ие',
	re:'ия',
	de:'ию',
	ve:'ие',
	te:'ием',
	pe:'ии',
	im:'ия',
	rm:'ий',
	dm:'иям',
	vm:'ия',
	tm:'иями',
	pm:'иях',
	rod:2,
	skl:2,
	odu:0,
};
['ё','е'].map(function(a){
	lxskl[a]={
		ie:a,
		re:'я',
		de:'ю',
		ve:a,
		te:'ем',
		pe:'е',
		im:'я',
		rm:'ей',
		dm:'ям',
		vm:'я',
		tm:'ями',
		pm:'ях',
		rod:2,
		skl:2,
		odu:0,
	};
});

lxskl['о']={
	ie:'о',
	re:'а',
	de:'у',
	ve:'е',
	te:'ом',
	pe:'е',
	im:'а',
	rm:'',
	dm:'ам',
	vm:'а',
	tm:'ами',
	pm:'ах',
	rod:2,
	skl:2,
	odu:0,
};
//Второе склонение, мужской род
lxskl['ий']={
	ie:'ий',
	re:'ия',
	de:'ию',
	ve:'ий',
	te:'ием',
	pe:'ии',
	im:'ии',
	rm:'иев',
	dm:'иям',
	vm:'ии',
	tm:'иями',
	pm:'иях',
	rod:0,
	skl:2,
	odu:0,
};
lxskl['ь']={
	ie:'ь',
	re:'я',
	de:'ю',
	ve:'ь',
	te:'ем',
	pe:'е',
	im:'и',
	rm:'ей',
	dm:'ям',
	vm:'и',
	tm:'ями',
	pm:'ях',
	rod:0,
	skl:2,
	odu:0,
}; 
lxskl['й']={
	ie:'й',
	re:'я',
	de:'ю',
	ve:'й',
	te:'ем',
	pe:'е',
	im:'и',
	rm:'ев',
	dm:'ям',
	vm:'и',
	tm:'ями',
	pm:'ях',
	rod:0,
	skl:2,
	odu:0,
};
['б','в','д','з','л','м','н','п','р','с','т','ф','ц'].map(function(a){
	lxskl[a]={
		ie:a,
		re:a+'а',
		de:a+'у',
		ve:a,
		te:a+'ом',
		pe:a+'е',
		im:a+'ы',
		rm:a+'ов',
		dm:a+'ам',
		vm:a+'ы',
		tm:a+'ами',
		pm:a+'ах',
		rod:0,
		skl:2,
		odu:0,
	}; 	
});
['ж','ш','ч','щ','к','х','г'].map(function(a){
	lxskl[a]={
		ie:a,
		re:a+'а',
		de:a+'у',
		ve:a,
		te:a+'ом',
		pe:a+'е',
		im:a+'и',
		rm:a+'ей',
		dm:a+'ам',
		vm:a+'и',
		tm:a+'ами',
		pm:a+'ах',
		rod:0,
		skl:2,
		odu:0,
	}; 
});
lxskl['к'].rm='ков';
lxskl['г'].rm='гов';
lxskl['х'].rm='хов';

['ё','е','о'].map(function(a){
	lxskl[a+'к']={
		ie:a+'к',
		re:'ка',
		de:'ку',
		ve:a+'к',
		te:'ком',
		pe:'ке',
		im:'ки',
		rm:'ков',
		dm:'кам',
		vm:'ки',
		tm:'ами',
		pm:'ах',
		rod:0,
		skl:2,
		odu:0,
	};
});
//Костыли
lxskl['0']={
	ie:'',
	re:'',
	de:'',
	ve:'',
	te:'',
	pe:'',
	im:'',
	rm:'',
	dm:'',
	vm:'',
	tm:'',
	pm:'',
	rod:0,
	skl:0,
	odu:0,
};
lxskl['мя']={
	ie:'мя',
	re:'мени',
	de:'мени',
	ve:'мя',
	te:'менем',
	pe:'мени',
	im:'мена',
	rm:'мён',
	dm:'менам',
	vm:'мена',
	tm:'менами',
	pm:'менах',
	rod:0,
	skl:4,
	odu:0,
};
//И отдельный набор костылей для третьего склонения
lxskl['ь3']={
	ie:'ь',
	re:'и',
	de:'и',
	ve:'ь',
	te:'ью',
	pe:'и',
	im:'и',
	rm:'ей',
	dm:'ям',
	vm:'и',
	tm:'ями',
	pm:'ях',
	rod:1,
	skl:3,
	odu:0,
};
['ж','ш','ч','щ'].map(function(a){
	lxskl[a+'ь']={
		ie:a+'ь',
		re:a+'и',
		de:a+'и',
		ve:a+'ь',
		te:a+'ью',
		pe:a+'и',
		im:a+'и',
		rm:a+'ей',
		dm:a+'ям',
		vm:a+'и',
		tm:a+'ями',
		pm:a+'ях',
		rod:1,
		skl:3,
		odu:0,
	};
});
//Несклоняемые
['у','ю','э'].map(function(a){
	lxskl[a]={
		ie:a,
		re:a,
		de:a,
		ve:a,
		te:a,
		pe:a,
		im:a,
		rm:a,
		dm:a,
		vm:a,
		tm:a,
		pm:a,
		rod:1,
		skl:1,
		odu:0,
	}; 	
});
function autosklon(slovo,p1){'use strict';
	if(lx[slovo])
		return console.log('Такое слово уже есть в словаре.');
	var rez=setlx(slovo);
	if(p1!=undefined)
		slovo+=p1;
	var sl=slovo;
	for(;sl.length && !lx[sl] && !lxskl[sl]; sl=sl.udalPerv());
	var lxparent=lx[sl]?lx[sl]:lxskl[sl];
	var osnova=slovo.udalPosl(sl.length);
	for(var padezh in lxpad)
		rez+=logparam(padezh,osnova+lxparent[padezh]);
	rez+=logparam('rod',lxparent.rod);
	rez+=logparam('skl',lxparent.skl);
	rez+=logparam('odu',lxparent.odu);
	rez+='};\n'
	console.log(rez);//Это НЕ ОТЛАДКА!!!
}

function setlx(p1){'use strict';
	return('lx[\''+p1+'\']={\n');
}

function logparam(p1,p2){'use strict';
	return p2.isString?
			('\t'+p1+':\''+p2+'\',\n'):
			('\t'+p1+':'+p2+',\n');
}

function logsklon(a){'use strict';
	console.log(sklon(a))
}

function sklon(a){'use strict';
	setlx(a);
	var osn;//"Основа" слова. Выбирается так, чтобы было удобно.
	var rez='';//То, что отправим в результат. Например, в консоль.
	rez+=setlx(a);
	if(a.posl()=='а'){
		osn=a.udalPosl();
		rez+=logparam('ie',a);
		rez+=logparam('re',osn+'ы');
		rez+=logparam('de',osn+'е');
		rez+=logparam('ve',osn+'у');
		rez+=logparam('te',osn+'ой');
		rez+=logparam('pe',osn+'е');
		rez+=logparam('im',osn+'ы');
		rez+=logparam('rm',osn);
		rez+=logparam('dm',osn+'ам');
		rez+=logparam('vm',osn+'ы');
		rez+=logparam('tm',osn+'ами');
		rez+=logparam('pm',osn+'ах');
		rez+=logparam('rod',1);
		rez+=logparam('skl',1);
		rez+=logparam('odu',0);
	}else
	if(a.posl()=='ь'){
		osn=a.udalPosl();
		rez+=logparam('ie',a);
		rez+=logparam('re',osn+'я');
		rez+=logparam('de',osn+'ю');
		rez+=logparam('ve',a);
		rez+=logparam('te',osn+'ем');
		rez+=logparam('pe',osn+'е');
		rez+=logparam('im',osn+'и');
		rez+=logparam('rm',osn+'ей');
		rez+=logparam('dm',osn+'ям');
		rez+=logparam('vm',osn+'и');
		rez+=logparam('tm',osn+'ями');
		rez+=logparam('pm',osn+'ях');
		rez+=logparam('rod',0);
		rez+=logparam('skl',2);
		rez+=logparam('odu',0);
	}else
	{
		osn=a;
		rez+=logparam('ie',a);
		rez+=logparam('re',osn+'а');
		rez+=logparam('de',osn+'у');
		rez+=logparam('ve',a);
		rez+=logparam('te',osn+'ом');
		rez+=logparam('pe',osn+'е');
		rez+=logparam('im',osn+'ы');
		rez+=logparam('rm',osn+'ов');
		rez+=logparam('dm',osn+'ам');
		rez+=logparam('vm',osn+'ы');
		rez+=logparam('tm',osn+'ами');
		rez+=logparam('pm',osn+'ах');
		rez+=logparam('rod',0);
		rez+=logparam('skl',2);
		rez+=logparam('odu',0);
	}
	rez+='};\n'
	return rez;
}
