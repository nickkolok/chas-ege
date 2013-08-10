function okrugldo(a,b){
	if(!b){b=1;}
	a=Math.round(a/b)*b;
	return a;
}
function sluchch(n,k,s){
	if(!s){s=1;}
	if(k==undefined){return sluchch(0,n,1)};
    var a=okrugldo(okrugldo(Math.random() * (k-n),s) + n,s);	
    return a;
}

function sluchDel(a){
	return a.sluchDel();
}

function sluchiz(a,n){
	if(!(n>=1)){n=1;}
	var b=a.slice();
	b.shuffle();
	b.length=n;
	return b;
}

function chislit(a,s1,s2,s5){
	a=a%100;
	if((a>=5)&&(a<=20)){
		return s5;
	}
	a=a%10;
	if(a==1){
		return s1;
	}
	if((a<=4)&&(a>=2)){
		return s2;
	}
	return s5;
}

function s3ug(Ax,Ay,Bx,By,Cx,Cy){
	return 0.5*(Ax*By+Ay*Cx+Bx*Cy-By*Cx-Cy*Ax-Ay*Bx).abs();
}

function chislitM(p1,p2,p3,p4){
	return p1.ts()+' '+chislit(p1,p2,p3,p4);
}

function chislitlx(p1,p2,p3){
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

Drob.prov=function(p1){
	p1=Drob.fixN(p1);
	return !!p1.ch&&!!p1.zn;
}

Drob.fixN=function(p1){
	if(p1.isNumber)
		p1={ch:p1,zn:1};
	return p1;
}

Drob.sokr=function(p1){
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

function clone(obj)
{
    if(obj == null || typeof(obj) != 'object')
    {
        return obj;
    }
    var temp = {};
    for(var key in obj)
    {
        temp[key] = clone(obj[key]);
    }
    return temp;
}

function sl1(){
	return Math.random().round();
}

sl=sluchch;

function sp(a){//Я просто оставлю это здесь
	for(var i=0,c=a.split('\''),b=[];i<c.length;i++)
		b=b.concat(i%2?c[i]:c[i].split(' '));
	for(var i=0;i<b.length;b.splice(i,!b[i++]));
	return b;
}

function setlx(p1){
	return('lx[\''+p1+'\']={\n');
}

function logparam(p1,p2){
	return p2.isString?
			('\t'+p1+':\''+p2+'\',\n'):
			('\t'+p1+':'+p2+',\n');
			
}

function logsklon(a){
	console.log(sklon(a))
}

function sklon(a){
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

function cvet(a){
	return '#'+a.r.toString(16).dopdo('0',2)+a.g.toString(16).dopdo('0',2)+a.b.toString(16).dopdo('0',2);
}

function proporMezhdu(a,b,pr){
	return a.proporMezhdu(b,pr);
}

function cvetMezhdu(a,b,pr){
	return cvet({
		r:proporMezhdu(a.r,b.r,pr).round(),
		g:proporMezhdu(a.g,b.g,pr).round(),
		b:proporMezhdu(a.b,b.b,pr).round(),
	});
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

Array.prototype.sVeroyatn=function(){
	var th=this.toSum().sumPyram();
	var a=Math.random();
	console.log(a);
	var i;
	for(i=0; a>th[i] && i<th.length ;i++);
	return i;
}
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
Number.prototype.toFixedLess=function(n){
	var a=this.toFixed(n);
	for(;a.posl()=='0'&&a.search(/[.]/)!=-1;a=a.udalPosl());
	for(;a.posl()=='.';a=a.udalPosl());
	return a;
}

Number.prototype.pm=function(){
	'use strict';
	return this*sluchiz([1,-1]);
}

Number.prototype.dopdo=function(c,n){
	'use strict';
	var str=''+this;
	for(;str.length<n;str=c+str);
	return str;
}

Number.prototype.pow=function(n){
	'use strict';
	return Math.pow(this,n);
}

Number.prototype.sqrt=function(){
	'use strict';
	return Math.sqrt(this);
}

Number.prototype.sqr=function(){
	'use strict';
	return Math.pow(this,2);
}
Number.prototype.abs=function(){
	'use strict';
	return Math.abs(this);
}

Number.prototype.floor=function(){
	'use strict';
	return Math.floor(this);
}

Number.prototype.ceil=function(){
	'use strict';
	return Math.ceil(this);
}

Number.prototype.isZ=function(){
	'use strict';
	return this-this.floor()==0;
}

Number.prototype.isPolnKvadr=function(){
	'use strict';
	return this.sqrt().isZ();
}

Number.prototype.toStandart=function(p1){
	'use strict';
	return this.toFixedLess(10).toStandart(p1);
}

Number.prototype.ts=Number.prototype.toStandart;

Number.prototype.atan=function(){
	return Math.atan(this);
}

Number.prototype.asin=function(){
	return Math.asin(this);
}

Number.prototype.acos=function(){
	return Math.acos(this);
}

Number.prototype.arcsin=function(){
	return Math.asin(this);
}

Number.prototype.arccos=function(){
	return Math.acos(this);
}

Number.prototype.arctg=function(){
	return Math.atan(this);
}

Number.prototype.arcctg=function(){
	return Math.atan(1/this);
}

Number.prototype.sin=function(){
	return Math.sin(this);
}

Number.prototype.cos=function(){
	return Math.cos(this);
}

Number.prototype.tg=function(){
	return Math.tan(this);
}

Number.prototype.ctg=function(){
	return 1/Math.tan(this);
}

Number.prototype.mzhd=function(a,b,c){
	var p1=[a,b];
	var p2=p1[p1.max()];
	var p3=p1[p1.min()];
	return (this<p2)&&(this>p3)||((this==p2)||(this==p3))&&(!!c);
}

Number.prototype.polozh=function(){
	return this<0?0:this;
}

Number.prototype.nod=function(p1){
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

Number.prototype.pina=function(p1){
	var a1={ch:this,zn:p1};
	Drob.sokr(a1);
	if(a1.ch==0)return '0';
	var z='';
	if(a1.ch<0){
		z='-';
		a1.ch*=-1;
	} 
	return z+('\\frac{').esli(a1.zn!=1)+(a1.ch==1?'':a1.ch)+'\\pi'+('}{'+a1.zn+'}').esli(a1.zn!=1);
}

Number.prototype.koren=function(p1){
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

Number.prototype.polnKvadrMnozh=function(){
	if(this==0)
		return 0;
	var t=this.abs();
	var i=1;
	for(var rez=1;i.sqr()<=t;i++)
		if(t.kratno(i.sqr()))
			rez=i;
	return rez;
}

Number.prototype.isNumber=true;

Number.prototype.frac=function(p1){
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

Number.prototype.kratno=function(p1){
	return !(this%p1);
}

Number.prototype.delit=function(p1){
	return !(p1%this);
}

Number.prototype.sluchDel=function(){
	for(var r=this+1;!this.kratno(r);r=sluchch(1,this));
	return r; 
}

Number.prototype.toChMin=function(){
	var a=(this/60).floor();
	var b=this%60;
	return chislitM(a,'час','часа','часов').esli(a)+' '.esli(a&&b)+chislitM(b,'минута','минуты','минут').esli(b);
}

Number.prototype.chislit=function(p1,p2,p3){
	return chislit(this,p1,p2,p3);
}

Number.prototype.chislitM=function(p1,p2,p3){
	return chislitM(this,p1,p2,p3);
}

Number.prototype.chislitlx=function(p1,p2){
	return chislitlx(this,p1,p2);
}

Number.prototype.min=function(){
	var a=Array.prototype.slice.call(arguments);
	a.push(this);
	return a.minE();
}

Number.prototype.max=function(){
	var a=Array.prototype.slice.call(arguments);
	a.push(this);
	return a.maxE();
}

Number.prototype.plusminus=Number.prototype.ts;

Number.prototype.sqr=function(){
	return this.pow(2);
}

Number.prototype.round=function(){
	return Math.round(this);
}

Number.prototype.proporMezhdu=function(k,pr){
	return this+(k-this)*pr;
}

Number.prototype.toDvoet=function(a){
	if(!a)
		a=60;
	return Math.floor(this/60)+':'+Math.floor(this%60).dopdo('0',2);
}
String.prototype.mesh=function(){
	'use strict';
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

String.prototype.dopdo=function(c,n){
	'use strict';
	var str=this;
	for(;str.length<n;str=c+str){
	}
	return str;
};

String.prototype.toZagl=function(){
	'use strict';
	if(this=='')return '';
	var a=this[0].toUpperCase()+''+this.substr(1);//.toLowerCase();
	return a;
};

String.prototype.frac=function(p1){
	'use strict';
	return '\\frac{'+this+'}{'+p1+'}';
}

String.prototype.posl=function(){
	'use strict';
	return this[this.length-1];
};

String.prototype.udalPosl=function(n){
	'use strict';
	if(n==undefined){n=1};
	return this.substr(0,this.length-n);
};

String.prototype.udalPerv=function(n){
	'use strict';
	if(n==undefined){n=1};
	return this.substr(n,this.length-n);
};

String.prototype.toStandart=function(p1){
	'use strict';
	var a=this.replace(/[.]/g,',');
	if(p1){
		a=a.replace(/[,]/,'{,}');
	}
	return a;
};

String.prototype.esli=function(p1){
	'use strict';
	return p1?this:'';
}

String.prototype.vTag=function(p1,p2){
	'use strict';
	return '<'+p1+(' '+p2).esli(p2)+'>'+this+'</'+p1+'>';
}

String.prototype.vTabl=function(p1,p2){
	'use strict';
	return (p1?p1:'<br/><br/>')+this.vTag('table',p2?p2:'style="text-align:center;font:inherit;" border=1');//.vTag('center');
}

String.prototype.ts=String.prototype.toStandart;

String.prototype.reverse = function () {
	'use strict';
	return this.split('').reverse().join('');
};//http://blog.stevenlevithan.com/archives/mimic-lookbehind-javascript //Товарищ очень сильно выручил


String.prototype.plusminus=function(){
	'use strict';
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
	a=a.replace(/[.]{1}[$][.]{1}(?=[A-Za-zА-Яа-яЁё])/g,'.');
	a=a.reverse();
	return a;
};

String.prototype.isString=true;
RegExp.prototype.isRegExp=true;
/*
Object.prototype['isObject']=true;

Object.prototype.copy=function(){
	return clone(this);
}
*/
RegExp.prototype.isRegExp=true;
////////////////////////////////////////////////////////////////////////
var lx=[];	//Объявляем глобальный объект lx
////////////////////////////////////////////////////////////////////////
//
//	ie: именительный	падеж единственного	числа
//	re: родительный		падеж единственного	числа
//
//{{Существительные
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
	vm:'соляркы',
	tm:'солярками',
	pm:'солярках',
	rod:1,
	skl:1,
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



//}}Существительные

////////////////////////////////////////////////////////////////////////

//{{Словосочетания с главным словом - существительным
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

//}}Словосочетания с главным словом - существительным

////////////////////////////////////////////////////////////////////////

lx['выраженный']={};
lx['выраженный'].i=['выраженный','выраженная','выраженное','выраженные'];
lx['выраженный'].r=['выраженного','выраженной','выраженного','выраженных'];
lx['выраженный'].d=['выраженному','выраженной','выраженному','выраженным'];
lx['выраженный'].v=['выраженный','выраженную','выраженное','выраженные'];
lx['выраженный'].t=['выраженным','выраженной','выраженным','выраженными'];
lx['выраженный'].p=['выраженном','выраженной','выраженном','выраженных'];

