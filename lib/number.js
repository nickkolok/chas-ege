'use strict';
Number.prototype.toFixedLess=function(n){
	var a=this.toFixed(n);
	for(;a.posl()=='0'&&a.search(/[.]/)!=-1;a=a.udalPosl()){};
	for(;a.posl()=='.';a=a.udalPosl()){};
	return a;
}

Number.prototype.pm=function(){
	return sl1()?this:-this;
}

Number.prototype.dopdo=function(c,n){
	var str=''+this;
	for(;str.length<n;str=c+str){};
	return str;
}
Number.prototype.isZ=function(){
	return this-this.floor()==0;
}

Number.prototype.isPolnKvadr=function(){
	return this.sqrt().isZ();
}

Number.prototype.ts=
Number.prototype.toStandart=function(p1){
	return this.toFixedLess(10).toStandart(p1);
}

Number.prototype.toStandart;
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
	if(a1.ch==0)
		return '0';
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

Number.prototype.fracstr=function(p1,str){
	var a1={ch:this,zn:p1};
	if(p1.isString)
		return 
			a1.zn!=1?
			'\\frac{'+a1.ch+str+'}{'+a1.zn+'}':
			'{'+a1.ch+str+'}';
	
	Drob.sokr(a1);
	if(!a1.ch)
		return '0';
	var z='';
	if(a1.ch<0){
		z='-';
		a1.ch*=-1;
	} 
	return z+('\\frac{').esli(a1.zn!=1)+(a1.ch==1?str:a1.ch+str)+('}{'+a1.zn+'}').esli(a1.zn!=1);
	
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

Number.prototype.proporMezhdu=function(k,pr){
	return this+(k-this)*pr;
}

Number.prototype.toDvoet=function(a){
	if(!a)
		a=60;
	return Math.floor(this/60)+':'+Math.floor(this%60).dopdo('0',2);
}

Number.prototype.okrugldo=function(p1){
	return okrugldo(this.p1);
}

Number.prototype.fct=function(){
	return this>0?(this-1).fct()*this:1;
}

Number.prototype.isNumber=true;

for(var chto in Number.prototype)
	Object.defineProperty(Number.prototype, chto, { enumerable: false });
