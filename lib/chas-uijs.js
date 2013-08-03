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
	if(p1.isNumber){
		p1={ch:p1,zn:1};
	}
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
	return sluchch(1);
}

sl=sluchch;


//Блок из функций, которые обеспечивают движок расчётных задач
//{{

function svVel(a){
/*Массив a состоит из элементов-объектов следующей структуры:
	vel: название величины
	rod: род существительного
		0: мужской
		1: женский
		2: средний
		3: только во множественном числе
	bkv: буква, которой обозначается величина. Если её нет, не упоминается.
	zna: значение величины
	nmn: размерность величины. Опять же, если не указано - лесом.
	nah: можно ли требовать найти величину
	pre: префикс, то есть то, что пишется перед названием величины
	utv: альтернативное величине утвердительное высказывание
	vpr: альтернативный вопрос
	vin: величина в винительном падеже. Если равна 1, то именительный и винительный падежи совпадают. Если не определена, то конструкции, где нужен в. п., избегаются.
*/
	var b=a.slice();
	b.shuffle();
	for(;!b[0].nah;b.shuffle());
	var rez='';//Сюда будет записан результат
	var c=b[0];
	for(var i1=b.length-1;i1>0;i1--){
		b[i1]=nazvVel(b[i1]);
	}
	b.splice(0,1);
	var d=sluchch(1,[b.length,3].minE());
	var f=[c.zna];//В этом массиве будут фразы.
//	if(sl(1)&&c.rod!=2){
//		f[1]='Чему '+om.ravno[c.rod]+' '+c.vel+(' $'+c.bkv+'$').esli(c.bkv)+', если '+sosiskaVel(b.splice(0,d))+
//		(c.nmn?
//			['? Ответ выразите в '+c.nmn+'.'.esli(c.nmn.posl()!='.')+' ',', '+om.vyrazh[c.rod]+' в '+c.nmn+'? '].iz():
//			'? '
//		)
//	}
	f[1]=voprVel(c,sosiskaVel(b.splice(0,d)));
	for(;b.length;){
		var st=b.splice(0,1);
		var sk=sosiskaVel(b.splice(0,sluchch(2)));
		f.push((om.utochn.iz()+st+(sk?om.utochn2.iz()+sk:'')+'. ').plusminus().toZagl());
	}
	return f;
	
}

function nazvVel(a){
	if(a.utv){
		return a.utv;
	}
	if(!a.rod){
		a.rod=0;
	}
	return(
		a.vel+' '+
		(a.bkv?
			'$'+a.bkv+'=':
			[om.ravno,om.sostavl].iz()[a.rod]+' '
		)+
		(a.pre?
			a.pre:
			''
		)+
		a.zna+
		(' '+a.nmn).esli(a.nmn)+
		'$'.esli(a.bkv)
	);
}

function sosiskaVel(a){
//	console.log(a);
	if(!a.length){
		return '';
	}
	for(var rez=''+a.splice(0,1);a.length;){
		rez+=om.utochn2.iz()+a.splice(0,1);
	}
//	console.log(rez);
	return rez;
}

function voprVel(a,t1){
	var rez='';
	t1=t1.trim();
	t1=t1?', если '+t1:'';
	a.rod=a.rod?a.rod:0;
	if(a.vpr){
		rez=a.vpr.toZagl()+t1+'? '+
		(
		!!a.nmn?
		['ответ',otvdayte.iz()].shuffle().join(' ').toZagl()+' в '+a.nmn+'.':
		''		
		);
		return rez;
	}
	var bkv=(' $'+a.bkv+'$').esli(a.bkv);
	var rez=[
			'Чему '+om.ravno[a.rod]+' '+a.vel+bkv+t1+'? '+
			(
				a.nmn?
				'Ответ выразите в '+a.nmn+'.'.esli(a.nmn.posl()!='.')+' ':
				''
			)
		,
			'Чему '+om.ravno[a.rod]+' '+a.vel+bkv+
			(
				a.nmn?
				', '+lx['выраженный'].i[a.rod]+' в '+a.nmn:
				''
			)+
			t1+'? '
		,
			'Сколько '+(a.nmn+' ').esli(a.nmn)+om.sostavl[a.rod]+' '+a.vel+bkv+t1+'? '
		,
	];
	if(a.vin==1){
		a.vin=a.vel;
	}
	if(a.vin){
		rez.push(
			om.otvnaydite.iz().toZagl()+' '+a.vin+bkv+
			(
				a.nmn?
				', '+lx['выраженный'].v[a.rod]+'в '+a.nmn:
				''
			)
			+t1+'.'
		);
		rez.push(
			om.otvnaydite.iz().toZagl()+' '+a.vin+bkv+t1+'. '+
			(
				a.nmn?
				'Ответ выразите в '+a.nmn+'. ':
				''
			)
		);
	}
	return rez.iz();
}


//}}


//Движок от В14
//{{
function fn_txt(nai,f,n,k,nb,kb){
	return (
		om.otvnaydite.iz().toZagl()+' '+nai+' значение функции $y = '+f+'$ на промежутке $'+(nb?'(':'[')+(-1).pina(4)+';'+(1).pina(4)+(kb?')':']')+'$.'
	).plusminus();
}	

//a - объект с параметрами. Так сказать, питонический подход.
//slag - массив со слагаемыми в виде строк. Наверное, можно и числа, но лучше не надо.
//minx - точка минимума					//Если одно из них не указано, попросту не спрашиваем
//miny - значение в точке минимума		//
//maxx - точка максимума				//
//maxy - значение в точке максимума		//
//cnst - принудительно указать константу. Если 0 - то ясно, не упоминать.
//prnz - начало промежутка				//
//prkz - конец промежутка				//Если одного нет, то луч. Если обоих, то вся ОДЗ
//prnb - открытое начало промежутка				
//prkb - открытый конец промежутка				


function fn_nai(a){
	
}

function fn_promezh(a){
	//Если границ интервала нет, то это числовая прямая.
	if(a.prnz==undefined && a.prkz==undefined){
		return {
			nazv:'',
			text:'$(-\\infty;\\infty)$',
		}
	}
	if(a.prnz==undefined && a.prkb){
		return{
			nazv:'открытый луч',
			text:'$(-\\infty;'+')$',
		}
	}
}

//}}

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
	rez+='};'
	return rez;
}

function sklon2(a){

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
	for(;a.posl()=='0'&&a.search(/[.]/)!=-1;a=a.udalPosl()){};
	for(;a.posl()=='.';a=a.udalPosl()){};
	return a;
}

Number.prototype.pm=function(){
	'use strict';
	return this*sluchiz([1,-1]);
}

Number.prototype.dopdo=function(c,n){
	'use strict';
	var str=''+this;
	for(;str.length<n;str=c+str){
	}
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
	return (this-this.floor()==0);
}

Number.prototype.isPolnKvadr=function(){
	'use strict';
	return (this.sqrt().isZ());
}

Number.prototype.toStandart=function(p1){
	'use strict';
	return (this.toFixedLess(10).toStandart(p1));
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

Number.prototype.koren=function(){
	return this.isPolnKvadr()?''+this.ts():'\\sqrt{'+this.ts()+'}';
}

Number.prototype.isNumber=true;

Number.prototype.frac=function(p1){
	var a1={ch:this,zn:p1};
	Drob.sokr(a1);
	if(a1.ch==0)return '0';
	var z='';
	if(a1.ch<0){
		z='-';
		a1.ch*=-1;
	} 
	return z+('\\frac{').esli(a1.zn!=1)+(a1.ch==1?'1':a1.ch)+('}{'+a1.zn+'}').esli(a1.zn!=1);
	
}
/*
Number.prototype.toStringT4k=Number.prototype.toString;

Number.prototype.toString=function(){
	return(this.toStringT4k().replace(/[.]/g,','));
}*/

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
	var a=this.replace(/[+][+]/g,'+');
	a=a.replace(/--/g,'+');
	a=a.replace(/[+]-/g,'-');
	a=a.replace(/-[+]/g,'-');
	a=a.replace(/[+]$/g,'');
	a=a.replace(/[{][+]/g,'{');
	a=a.replace(/[+][}]/g,'}');
	a=a.replace(/\(\+/g,'(');
	a=a.replace(/\+\)/g,')');

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
	a=a.reverse();
	a=a.replace(/[.]{2}(?=[A-Za-zА-Яа-яЁё])/g,'.');
	a=a.replace(/[.]{1}[$][.]{1}(?=[A-Za-zА-Яа-яЁё])/g,'.');
	a=a.reverse();
	return a;
};

String.prototype.isString=true;
RegExp.prototype.isRegExp=true;
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
//}}Словосочетания с главным словом - существительным

////////////////////////////////////////////////////////////////////////

lx['выраженный']={};
lx['выраженный'].i=['выраженный','выраженная','выраженное','выраженные'];
lx['выраженный'].r=['выраженного','выраженной','выраженного','выраженных'];
lx['выраженный'].d=['выраженному','выраженной','выраженному','выраженным'];
lx['выраженный'].v=['выраженный','выраженную','выраженное','выраженные'];
lx['выраженный'].t=['выраженным','выраженной','выраженным','выраженными'];
lx['выраженный'].p=['выраженном','выраженной','выраженном','выраженных'];

window.latbukv=["A","B","C","D","F","G","H","J","L","M","N","P","R","S","T","Q","U","W","X","Y","Z"];

window.rusbukv=["А","Б","В","Г","Д","Е","Ё","Ж","И","Й","К","Л","М","Н","П","Р","С","Т","У","Ф","Х","Ц","Ч","Ш","Щ","Ъ","Ы","Ь","Э","Ю","Я"];

window.moneta=['орёл','решка'];

window.razy=['ни разу','один раз','дважды','трижды','четырежды','пятикратно','шестикратно','семикратно','восьмикратно','девятикратно','десятикратно'];

window.kachestva={};
window.kachestva.ie=['безопасность','комфорт','функциональность','качество','внешний вид','простота ремонта','надёжность','гарантийный срок','скорость запуска','настраиваемость'];

window.tovary={};
window.tovary.ie=['автомобиль'	,'кофеварка'	,'чайник'	,'ноутбук'		,'бензопила'	,'СВЧ-печь'		,'велосипед'	,'садовый насос'	];
window.tovary.rm=['автомобилей'	,'кофеварок'	,'чайников'	,'ноутбуков'	,'бензопил'		,'СВЧ-печей'	,'велосипедов'	,'садовых насосов'	];

window.dlina={};
window.dlina.m= [/*7467.6, 			*/	1066.8,		185.2,			1852,				1609.34,				201.16		];
window.dlina.pm=[/*'русских милях',	*/	'вёрстах',	'кабельтовах',	'морских милях',	'американских милях',	'фурлонгах'	];
window.dlina.ie=[/*'русская миля',	*/	'верста',	'кабельтов',	'морская миля',		'американская миля',	'фурлонг'	];
window.dlina.rm=[/*'русских миль',	*/	'вёрст',	'кабельтовых',	'морских миль',		'американских миль',	'фурлонгов'	];

window.imenaj={};
window.imenaj.ie=['Анастасия','Юлия','Елена','Ольга','Яна','Олеся','Кристина','Вероника','Элеонора','Дарья','Мария','Екатерина','Софья','Наталия','Надежда','Александра'];

window.otchestvaj={};
window.otchestvaj.ie=['','Ивановна','Петровна','Фёдоровна','Васильевна','Анатольевна','Николаевна','Сергеевна','Игоревна','Михайловна','Владимировна','Олеговна','Степановна','Юрьевна','Александровна','Алексеевна','','','','']

window.profesj={};
window.profesj.ie=['суровая воронежская хакерша','','программистка','веб-дизайнер','аспирантка','скромный библиотекарь','блондинка','студентка','школьница','комсомолка, спортсменка, отличница и, наконец, просто красавица','']

window.deistviaj=['купила','получила в наследство','получила в подарок','нашла','приобрела','раздобыла'];

window.transportm={};
window.transportm.ie=['"Запорожец"'	,'"Москвич"'	,'автомобиль'	,'грузовик'	,'велосипед'	,'доисторический омнибус','автобус'];
window.transportm.r2=['"Запорожца"'	,'"Москвича"'	,'автомобиля'	,'грузовика','велосипеда'	,'доисторических омнибуса','автобуса'];
window.transportm.re=['"Запорожца"'	,'"Москвича"'	,'автомобиля'	,'грузовика','велосипеда'	,'доисторического омнибуса','автобуса'];
window.transportm.te=['"Запорожцем"','"Москвичом"','автомобилем','грузовиком','велосипедом','доисторическим омнибусом','автобусом'];

window.pifagtr=[[3,4,5],[5,12,13],[8,15,17],[7,24,25]];

window.mesiacy={};
window.mesiacy.re=['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
window.mesiacy.dni=[31,28,31,30,31,30,31,31,30,31,30,31];

window.valuta={};
window.valuta.re=['доллара','евро','фунта стерлингов'];

var om={};
om.eda={};
om.eda.ie=['сырок'	,'шоколадка'	,'яблоко'	,'груша'	,'упаковка сока'	,'бутерброд'	,'бутылка газировки'	,'батон'	,'буханка хлеба'	];
om.eda.re=['сырка'	,'шоколадки'	,'яблока'	,'груши'	,'упаковки сока'	,'бутерброда'	,'бутылки газировки'	,'батона'	,'буханки хлеба'	];
om.eda.ve=['сырок'	,'шоколадку'	,'яблоко'	,'грушу'	,'упаковку сока'	,'бутерброд'	,'бутылку газировки'	,'батон'	,'буханку хлеба'	];
om.eda.rm=['сырков'	,'шоколадок'	,'яблок'	,'груш'		,'упаковок сока'	,'бутербродов'	,'бутылок газировки'	,'батонов'	,'буханок хлеба'	];

om.korabli={};
om.korabli.ie=['корабль'	,'круизный лайнер'	,'прогулочное судно'	,'теплоход'		,'пароход'	,'атомоход'		];
om.korabli.pe=['корабле'	,'круизном лайнере'	,'прогулочном судне'	,'теплоходе'	,'пароходе'	,'атомоходе'	];

om.meltov={};
om.meltov.ie=['фонарик'		,'флакон шампуня'	,'флэшка'	,'компакт-диск'		,'сувенир'		,'матрёшка'	,'магнит на холодидьник'	,'сборник тестов для подготовки к ЕГЭ'		,'тетрадь'	,'учебник'		,'цветочный горшок'		];
om.meltov.im=['фонарики'	,'флаконы шампуня'	,'флэшки'	,'компакт-диски'	,'сувениры'		,'матрёшки'	,'магниты на холодидьник'	,'сборники тестов для подготовки к ЕГЭ'		,'тетради'	,'учебники'		,'цветочные горшки'		];
om.meltov.re=['фонарика'	,'флакона шампуня'	,'флэшки'	,'компакт-диска'	,'сувенира'		,'матрёшки'	,'магнита на холодидьник'	,'сборника тестов для подготовки к ЕГЭ'		,'тетради'	,'учебника'		,'цветочных горшка'		];
om.meltov.ve=['фонарик'		,'флакон шампуня'	,'флэшку'	,'компакт-диск'		,'сувенир'		,'матрёшку'	,'магнит на холодидьник'	,'сборник тестов для подготовки к ЕГЭ'		,'тетрадь'	,'учебник'		,'цветочный горшок'		];
om.meltov.rm=['фонариков'	,'флаконов шампуня'	,'флэшек'	,'компакт-дисков'	,'сувениров'	,'матрёшек'	,'магнитов на холодидьник'	,'сборников тестов для подготовки к ЕГЭ'	,'тетрадей'	,'учебников'	,'цветочных горшков'	];

om.sroki={};
om.sroki.re=['недели'	,'декады'	,'месяца'	];
om.sroki.ve=['неделю'	,'декаду'	,'месяц'	];
om.sroki.rm=['недель'	,'декад'	,'месяцев'	];

om.uchrezhd={};
om.uchrezhd.ie=['офис'	,'канцелярия'	,'секретариат'	,'министерство'	,'ведомство'	,'Росообрнадзор'	,'Минобрнауки'	];
om.uchrezhd.ve=['офис'	,'канцелярию'	,'секретариат'	,'министерство'	,'ведомство'	,'Росообрнадзор'	,'Минобрнауки'	];
om.uchrezhd.pe=['офисе'	,'канцелярии'	,'секретариате'	,'министерстве'	,'ведомстве'	,'Росообрнадзоре'	,'Минобрнауки'	];

om.denned={};
om.denned.ie=		['воскресенье'	,'понедельник'	,'вторник'	,'среда'	,'четверг'	,'пятница'	,'суббота'	];
om.denned.ve=		['воскресенье'	,'понедельник'	,'вторник'	,'среду'	,'четверг'	,'пятницу'	,'субботу'	];
om.denned.pg=[];
om.denned.pg['в']=	['в'			,'в'			,'во'		,'в'		,'в'		,'в'		,'в'		];

om.igrkosti=[];
om.igrkosti[2]=[0,0,1,2,3,4,5,6,5,4,3,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
om.igrkosti[3]=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
(function() {
	for(var i1=1;i1<=6;i1++)
		for(var i2=1;i2<=6;i2++)
			for(var i3=1;i3<=6;i3++)
				om.igrkosti[3][i1+i2+i3]++;
})();

om.strany={};
om.strany.ie=['Россия'	,'Белоруссия'	,'Китай'	,'ЮАР'	,'Эквадор'	,'Венесуэла'	,'Куба'	,'Австралия'	,'Австрия'	,'Бельгия'	,'Англия'	,'Германия'	,'Польша'	,'Сербия'	,'Чехия'	,'Словакия'	,'Словения'	,'Израиль'	,'Бразилия'	,'Мексика'	];
om.strany.re=['России'	,'Белоруссии'	,'Китая'	,'ЮАР'	,'Эквадора'	,'Венесуэлы'	,'Кубы'	,'Австралии'	,'Австрии'	,'Бельгии'	,'Англии'	,'Германии'	,'Польши'	,'Сербии'	,'Чехии'	,'Словакии'	,'Словении'	,'Израиля'	,'Бразилии'	,'Мексики'	];

om.sportparn={};
om.sportparn.ie=['шахматы'	,'вольная борьба'	,'настольный теннис'	,'бадминтон'	,'шашки'	];
om.sportparn.pe=['шахматам'	,'вольной борьбе'	,'настольному теннису'	,'бадминтону'	,'шашкам'	];


om.sport={};
om.sport.ie=['гимнастика'	,'вольная борьба'	,'лёгкая атлетика'	,'тяжёлая атлетика'	];
om.sport.pe=['гимнастике'	,'вольной борьбе'	,'лёгкой атлетике'	,'тяжёлой атлетике'	];

om.izdsteklo={};
om.izdsteklo.rm=['витрин','оконных рам','аквариумов','книжных полок','террариумов'];

om.znamenat=[2,4,5,8,10,20,25,100,200];
/*
om.naspunkt={};
om.naspunkt.ie=['пункт','населённый пункт','город','городок','ПГТ','деревня','село','хутор'];
om.naspunkt.re=['пункта','населённого пункта','города','городка','ПГТ','деревни','села','хутора'];
om.naspunkt.ve=['пункт','населённый пункт','город','городок','ПГТ','деревню','село','хутор'];
*/
om.zhidkost={};
om.zhidkost.re=['воды','ртути','жидкости','раствора','бензина','керосина','метилового спирта','газировки','уксуса','нефти'];

om.ravno=['равен','равна','равно','равны'];
om.sostavl=['составляет','составляет','составляет','составляют'];
om.vyrazh=['выраженный','выраженная','выраженное','выраженные'];
om.utochn=['','','','','','при этом ','известно, что '];
om.utochn2=[', при этом ',', а ',', '];

om.goroda={};
om.goroda.ie=['Воронеж'		,'Москва','Санкт-Петербург'	,'Казань','Сочи','Семилуки'		,'Хабаровск'	,'Магадан'	,'Красноярск'];
om.goroda.pe=['Воронеже'	,'Москве','Санкт-Петербурге','Казани','Сочи','Семилуках'	,'Хабаровске'	,'Магадане'	,'Красноярске'];

om.porchisl={};
om.porchisl[1]={};
om.porchisl[1].i=['первый','первая','первое','первые'];
om.porchisl[2]={};
om.porchisl[2].i=['второй','вторая','второе','вторые'];
om.porchisl[3]={};
om.porchisl[3].i=['третий','третья','третье','третьи'];
om.porchisl[4]={};
om.porchisl[4].i=['четвёртый','четвёртая','четвёртое','четвёртые'];
om.porchisl[5]={};
om.porchisl[5].i=['пятый','пятая','пятое','пятые'];
om.porchisl[6]={};
om.porchisl[6].i=['шестой','шестая','шестое','шестые'];
om.porchisl[7]={};
om.porchisl[7].i=['седьмой','седьмая','седьмое','седьмые'];
om.porchisl[8]={};
om.porchisl[8].i=['восьмой','восьмая','восьмое','восьмые'];
om.porchisl[9]={};
om.porchisl[9].i=['девятый','девятая','девятое','девятые'];
om.porchisl[10]={};
om.porchisl[10].i=['деcятый','деcятая','деcятое','деcятые'];
om.porchisl[11]={};
om.porchisl[11].i=['одиннадцатый','одиннадцатая','одиннадцатое','одиннадцатые'];
om.porchisl[12]={};
om.porchisl[12].i=['двенадцатый','двенадцатая','двенадцатое','двенадцатые'];
om.porchisl[13]={};
om.porchisl[13].i=['тринадцатый','тринадцатая','тринадцатое','тринадцатые'];
om.porchisl[14]={};
om.porchisl[14].i=['четырнадцатый','четырнадцатая','четырнадцатое','четырнадцатые'];
om.porchisl[15]={};
om.porchisl[15].i=['пятнадцатый','пятнадцатая','пятнадцатое','пятнадцатые'];
om.porchisl[16]={};
om.porchisl[16].i=['шестнадцатый','шестнадцатая','шестнадцатое','шестнадцатые'];
om.porchisl[17]={};
om.porchisl[17].i=['семнадцатый','семнадцатая','семнадцатое','семнадцатые'];
om.porchisl[18]={};
om.porchisl[18].i=['восемнадцатый','восемнадцатая','восемнадцатое','восемнадцатые'];
om.porchisl[19]={};
om.porchisl[19].i=['девятнадцатый','девятнадцатая','девятнадцатое','девятнадцатые'];
om.porchisl[20]={};
om.porchisl[20].i=['двадцатый','двадцатая','двадцатое','двадцатые'];

om.otvdayte=['выразите','дайте','приведите','запишите'];
om.otvnaydite=['найдите','определите','вычислите'];

om.metally={};
om.metally.re=['меди','алюминия','чугуна','железа','стали','никеля','хрома'];


om.mesiacy=window.mesiacy;
om.tovary=window.tovary;
om.rusbukv=window.rusbukv;
om.latbukv=window.latbukv;
om.imenaj=window.imenaj;
om.transportm=window.transportm;
om.pifagtr=window.pifagtr;

om.toplivo=['топливо','бензин','дизель','газ','керосин','солярка'];
om.mezhgortrans=['автобус','поезд'];
om.naspunkt=['пункт','населённый пункт','город','городок','ПГТ'/*,'деревня','село','хутор','посёлок','инноград','наукоград'*/];
om.stroymat=['пенобетон',/*'бетон','брус','шлак','песок','щебень','гранит'*/];
om.izmergruz=['тонна','кубометр'];
document.write('<div id="menucenter">');
document.write('<ul class="pureCssMenu pureCssMenum">');
document.write('	<li class="pureCssMenui"><a class="pureCssMenui" href="#"><span>Оболочки</span><!--[if gt IE 6]--></a><!--[endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->');
document.write('	<ul class="pureCssMenum">');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../sh/sluch.html" target="_blank">Случайное задание</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../sh/pechmat.html" target="_blank">Тесты на печать</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../sh/polnmat.html" target="_blank">Полный тест</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../sh/otladka.html" target="_blank">Режим отладки шаблона</a></li>');
document.write('	</ul>');
document.write('	<!--[if lte IE 6]></td></tr></table></a><![endif]--></li>');
document.write('	<li class="pureCssMenui"><a class="pureCssMenui" href="#"><span>Документация</span><!--[if gt IE 6]--></a><!--[endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->');
document.write('	<ul class="pureCssMenum">');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/license.html" target="_blank">Лицензия</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/razrab.html" target="_blank">Разработчики</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/spec.html" target="_blank">Структура</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/systreb.html" target="_blank">Системные требования</a></li>');
document.write('	</ul>');
document.write('	<!--[if lte IE 6]></td></tr></table></a><![endif]--></li>');
document.write('	<li class="pureCssMenui"><a class="pureCssMenui" href="#"><span>Мы ВКонтакте</span><!--[if gt IE 6]--></a><!--[endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->');
document.write('	<ul class="pureCssMenum">');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="https://vk.com/app3634828" target="_blank">Приложение</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="https://vk.com/chasege" target="_blank">Группа</a></li>');
document.write('	</ul>');
document.write('	<!--[if lte IE 6]></td></tr></table></a><![endif]--></li>');
document.write('	<li class="pureCssMenui"><a class="pureCssMenui" href="http://www.math.vsu.ru" target="_blank">Сайт Математического факультета ВГУ</a></li>');
document.write('</ul>');
document.write('</div>');
console.log('menu.js отработал');

	
	var bIE=0;
	var bOpera=0;
	var bApple=0;
	if (!"\v1") {
		bIE=1;
		strBrowser='"MS Internet Explorer", жёстко привязанный к закрытой ОС "Microsoft Windows"';
	}
	if (/*@cc_on!@*/0) {
		bIE=1;
		strBrowser='"MS Internet Explorer", жёстко привязанный к закрытой ОС "Microsoft Windows"';
	}
	if (self.opera) {
		bOpera=1;
		strBrowser='"Opera"';
	}
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
		strBrowser='устройств "iPhone" или "iPod"';
		bApple=1;
	}
	
	if(bIE+bOpera+bApple) {
		document.write('<center><div id="browser"><font color="red" size="5">Вероятно, Вы используете проприетарный браузер '+strBrowser+'.<br/>  Система "ЧАС" официально не предназначалась и, скорее всего, не будет предназначаться для работы в проприетарных браузерах.</font><br/>Возможно, некоторые элементы будут работать.<br/><button onclick="$(\'#browser\').remove();" >Свернуть это предупреждение</button></div><div class="predupr">Настоятельно рекомендуем Вам скачать <a href="http://mozilla-russia.org/">Firefox</a> или <a href="https://www.google.com/intl/ru/chrome/browser/">Chrome</a></div></center>');
	}

var cashdiv=document.createElement('div');
cashdiv.style.top='-9999px';
cashdiv.style.position='absolute';
document.body.appendChild(cashdiv);
cashdiv.innerHTML='$'+'0123456789=+-e'+latbukv.soed()+'\\in'+latbukv.soed().toLowerCase()+'\\sin\\cos\\ln\\log\\lg 2$';
/*!
	AnythingSlider v1.9.2
	Original by Chris Coyier: http://css-tricks.com
	Get the latest version: https://github.com/CSS-Tricks/AnythingSlider

	To use the navigationFormatter function, you must have a function that
	accepts two paramaters, and returns a string of HTML text.

	index = integer index (1 based);
	panel = jQuery wrapped LI item this tab references
	@return = Must return a string of HTML/Text

	navigationFormatter: function(index, panel){
		return "Panel #" + index; // This would have each tab with the text 'Panel #X' where X = index
	}
*/
/*jshint browser:true, jquery:true, unused:false */
;(function($, win, doc) {
	"use strict";
	$.anythingSlider = function(el, options) {

		var base = this, o, t;

		// Wraps the ul in the necessary divs and then gives Access to jQuery element
		base.el = el;
		base.$el = $(el).addClass('anythingBase').wrap('<div class="anythingSlider"><div class="anythingWindow" /></div>');

		// Add a reverse reference to the DOM object
		base.$el.data("AnythingSlider", base);

		base.init = function(){

			// Added "o" to be used in the code instead of "base.options" which doesn't get modifed by the compiler - reduces size by ~1k
			base.options = o = $.extend({}, $.anythingSlider.defaults, options);

			base.initialized = false;
			if ($.isFunction(o.onBeforeInitialize)) { base.$el.bind('before_initialize', o.onBeforeInitialize); }
			base.$el.trigger('before_initialize', base);

			// Add "as-oldie" class to body for css purposes
			$('<!--[if lte IE 8]><script>jQuery("body").addClass("as-oldie");</script><![endif]-->').appendTo('body').remove();

			// Cache existing DOM elements for later
			// base.$el = original ul
			// for wrap - get parent() then closest in case the ul has "anythingSlider" class
			base.$wrapper = base.$el.parent().closest('div.anythingSlider').addClass('anythingSlider-' + o.theme);
			base.$outer = base.$wrapper.parent();
			base.$window = base.$el.closest('div.anythingWindow');
			base.$win = $(win);

			base.$controls = $('<div class="anythingControls"></div>');
			base.$nav = $('<ul class="thumbNav"><li><a><span></span></a></li></ul>');
			base.$startStop = $('<a href="#" class="start-stop"></a>');
			
			if (o.buildStartStop || o.buildNavigation) {
				base.$controls.appendTo( (o.appendControlsTo && $(o.appendControlsTo).length) ? $(o.appendControlsTo) : base.$wrapper);
			}
			if (o.buildNavigation) {
				base.$nav.appendTo( (o.appendNavigationTo && $(o.appendNavigationTo).length) ? $(o.appendNavigationTo) : base.$controls );
			}
			if (o.buildStartStop) {
				base.$startStop.appendTo( (o.appendStartStopTo && $(o.appendStartStopTo).length) ? $(o.appendStartStopTo) : base.$controls );
			}

			// Figure out how many sliders are on the page for indexing
			base.runTimes = $('.anythingBase').length;
			// hash tag regex - fixes issue #432
			base.regex = (o.hashTags) ? new RegExp('panel' + base.runTimes + '-(\\d+)', 'i') : null;
			if (base.runTimes === 1) { base.makeActive(); } // make the first slider on the page active

			// Set up a few defaults & get details
			base.flag    = false; // event flag to prevent multiple calls (used in control click/focusin)
			if (o.autoPlayLocked) { o.autoPlay = true; } // if autoplay is locked, start playing
			base.playing = o.autoPlay; // slideshow state; removed "startStopped" option
			base.slideshow = false; // slideshow flag needed to correctly trigger slideshow events
			base.hovered = false; // actively hovering over the slider
			base.panelSize = [];  // will contain dimensions and left position of each panel
			base.currentPage = base.targetPage = o.startPanel = parseInt(o.startPanel,10) || 1; // make sure this isn't a string
			o.changeBy = parseInt(o.changeBy,10) || 1;

			// set slider type, but keep backward compatibility with the vertical option
			t = (o.mode || 'h').toLowerCase().match(/(h|v|f)/);
			t = o.vertical ? 'v' : (t || ['h'])[0];
			o.mode = t === 'v' ? 'vertical' : t === 'f' ? 'fade' : 'horizontal';
			if (t === 'f') {
				o.showMultiple = 1; // all slides are stacked in fade mode
				o.infiniteSlides = false; // no cloned slides
			}

			base.adj = (o.infiniteSlides) ? 0 : 1; // adjust page limits for infinite or limited modes
			base.adjustMultiple = 0;
			if (o.playRtl) { base.$wrapper.addClass('rtl'); }

			// Build start/stop button
			if (o.buildStartStop) { base.buildAutoPlay(); }

			// Build forwards/backwards buttons
			if (o.buildArrows) { base.buildNextBackButtons(); }

			base.$lastPage = base.$targetPage = base.$currentPage;

			base.updateSlider();

			// Expand slider to fit parent
			if (o.expand) {
				base.$window.css({ width: '100%', height: '100%' }); // needed for Opera
				base.checkResize();
			}

			// Make sure easing function exists.
			if (!$.isFunction($.easing[o.easing])) { o.easing = "swing"; }

			// If pauseOnHover then add hover effects
			if (o.pauseOnHover) {
				base.$wrapper.hover(function() {
					if (base.playing) {
						base.$el.trigger('slideshow_paused', base);
						base.clearTimer(true);
					}
				}, function() {
					if (base.playing) {
						base.$el.trigger('slideshow_unpaused', base);
						base.startStop(base.playing, true);
					}
				});
			}

			// Hide/Show navigation & play/stop controls
			base.slideControls(false);
			base.$wrapper.bind('mouseenter mouseleave', function(e){
				// add hovered class to outer wrapper
				$(this)[e.type === 'mouseenter' ? 'addClass' : 'removeClass']('anythingSlider-hovered');
				base.hovered = (e.type === 'mouseenter') ? true : false;
				base.slideControls(base.hovered);
			});

			// Add keyboard navigation
			$(doc).keyup(function(e){
				// Stop arrow keys from working when focused on form items
				if (o.enableKeyboard && base.$wrapper.hasClass('activeSlider') && !e.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
					if (o.mode !== 'vertical' && (e.which === 38 || e.which === 40)) { return; }
					switch (e.which) {
						case 39: case 40: // right & down arrow
							base.goForward();
							break;
						case 37: case 38: // left & up arrow
							base.goBack();
							break;
					}
				}
			});

			// If a hash can not be used to trigger the plugin, then go to start panel - see issue #432
			base.currentPage = ((o.hashTags) ? base.gotoHash() : '') || o.startPanel || 1;
			base.gotoPage(base.currentPage, false, null, -1);

			// Binds events
			var triggers = "slideshow_resized slideshow_paused slideshow_unpaused slide_init slide_begin slideshow_stop slideshow_start initialized swf_completed".split(" ");
			$.each("onSliderResize onShowPause onShowUnpause onSlideInit onSlideBegin onShowStop onShowStart onInitialized onSWFComplete".split(" "), function(i,f){
				if ($.isFunction(o[f])){
					base.$el.bind(triggers[i], o[f]);
				}
			});
			if ($.isFunction(o.onSlideComplete)){
				// Added setTimeout (zero time) to ensure animation is complete... see this bug report: http://bugs.jquery.com/ticket/7157
				base.$el.bind('slide_complete', function(){
					setTimeout(function(){ o.onSlideComplete(base); }, 0);
					return false;
				});
			}
			base.initialized = true;
			base.$el.trigger('initialized', base);

			// trigger the slideshow
			base.startStop(o.autoPlay);

		};

		// called during initialization & to update the slider if a panel is added or deleted
		base.updateSlider = function(){
			// needed for updating the slider
			base.$el.children('.cloned').remove();
			base.navTextVisible = base.$nav.find('span:first').css('visibility') !== 'hidden';
			base.$nav.empty();
			// set currentPage to 1 in case it was zero - occurs when adding slides after removing them all
			base.currentPage = base.currentPage || 1;

			base.$items = base.$el.children();
			base.pages = base.$items.length;
			base.dir = (o.mode === 'vertical') ? 'top' : 'left';
			o.showMultiple = parseInt(o.showMultiple, 10) || 1; // only integers allowed
			o.navigationSize = (o.navigationSize === false) ? 0 : parseInt(o.navigationSize,10) || 0;

			// Fix tabbing through the page, but don't change the view if the link is in view (showMultiple = true)
			base.$items.find('a').unbind('focus.AnythingSlider').bind('focus.AnythingSlider', function(e){
				var panel = $(this).closest('.panel'),
					indx = base.$items.index(panel) + base.adj; // index can be -1 in nested sliders - issue #208
				base.$items.find('.focusedLink').removeClass('focusedLink');
				$(this).addClass('focusedLink');
				base.$window.scrollLeft(0).scrollTop(0);
				if ( ( indx !== -1 && (indx >= base.currentPage + o.showMultiple || indx < base.currentPage) ) ) {
					base.gotoPage(indx);
					e.preventDefault();
				}
			});
			if (o.showMultiple > 1) {
				if (o.showMultiple > base.pages) { o.showMultiple = base.pages; }
				base.adjustMultiple = (o.infiniteSlides && base.pages > 1) ? 0 : o.showMultiple - 1;
			}

			// Hide navigation & player if there is only one page
			base.$controls
				.add(base.$nav)
				.add(base.$startStop)
				.add(base.$forward)
				.add(base.$back)[(base.pages <= 1) ? 'hide' : 'show']();
			if (base.pages > 1) {
				// Build/update navigation tabs
				base.buildNavigation();
			}

			// Top and tail the list with 'visible' number of items, top has the last section, and tail has the first
			// This supports the "infinite" scrolling, also ensures any cloned elements don't duplicate an ID
			// Moved removeAttr before addClass otherwise IE7 ignores the addClass: http://bugs.jquery.com/ticket/9871
			if (o.mode !== 'fade' && o.infiniteSlides && base.pages > 1) {
				base.$el.prepend( base.$items.filter(':last').clone().addClass('cloned') );
				// Add support for multiple sliders shown at the same time
				if (o.showMultiple > 1) {
					base.$el.append( base.$items.filter(':lt(' + o.showMultiple + ')').clone().addClass('cloned multiple') );
				} else {
					base.$el.append( base.$items.filter(':first').clone().addClass('cloned') );
				}
				base.$el.find('.cloned').each(function(){
					// disable all focusable elements in cloned panels to prevent shifting the panels by tabbing
					$(this).find('a,input,textarea,select,button,area,form').attr({ disabled : 'disabled', name : '' });
					$(this).find('[id]')[ $.fn.addBack ? 'addBack' : 'andSelf' ]().removeAttr('id');
				});
			}

			// We just added two items, time to re-cache the list, then get the dimensions of each panel
			base.$items = base.$el.addClass(o.mode).children().addClass('panel');
			base.setDimensions();

			// Set the dimensions of each panel
			if (o.resizeContents) {
				base.$items.css('width', base.width);
				base.$wrapper
					.css('width', base.getDim(base.currentPage)[0])
					.add(base.$items).css('height', base.height);
			} else {
				base.$win.load(function(){
					// set dimensions after all images load
					base.setDimensions();
					// make sure the outer wrapper is set properly
					t = base.getDim(base.currentPage);
					base.$wrapper.css({ width: t[0], height: t[1] });
					base.setCurrentPage(base.currentPage, false);
				});
			}

			if (base.currentPage > base.pages) {
				base.currentPage = base.pages;
			}
			base.setCurrentPage(base.currentPage, false);
			base.$nav.find('a').eq(base.currentPage - 1).addClass('cur'); // update current selection

			if (o.mode === 'fade') {
				t = base.$items.eq(base.currentPage-1);
				if (o.resumeOnVisible) {
					// prevent display: none;
					t.css({ opacity: 1 }).siblings().css({ opacity: 0 });
				} else {
					// allow display: none; - resets video
					base.$items.css('opacity',1);
					t.fadeIn(0).siblings().fadeOut(0);
				}
			}

		};

		// Creates the numbered navigation links
		base.buildNavigation = function() {
			if (o.buildNavigation && (base.pages > 1)) {
				var a, c, i, t, $li;
				base.$items.filter(':not(.cloned)').each(function(j){
					$li = $('<li/>');
					i = j + 1;
					c = (i === 1 ? ' first' : '') + (i === base.pages ? ' last' : '');
					a = '<a class="panel' + i + ( base.navTextVisible ? '"' : ' ' + o.tooltipClass + '" title="@"' ) + ' href="#"><span>@</span></a>';
					// If a formatter function is present, use it
					if ($.isFunction(o.navigationFormatter)) {
						t = o.navigationFormatter(i, $(this));
						if (typeof(t) === "string") {
							$li.html(a.replace(/@/g,t));
						} else {
							$li = $('<li/>', t);
						}
					} else {
						$li.html(a.replace(/@/g,i));
					}
					$li
					.appendTo(base.$nav)
					.addClass(c)
					.data('index', i);
				});
				base.$nav.children('li').bind(o.clickControls, function(e) {
					if (!base.flag && o.enableNavigation) {
						// prevent running functions twice (once for click, second time for focusin)
						base.flag = true; setTimeout(function(){ base.flag = false; }, 100);
						base.gotoPage( $(this).data('index') );
					}
					e.preventDefault();
				});

				// Add navigation tab scrolling - use !! in case someone sets the size to zero
				if (!!o.navigationSize && o.navigationSize < base.pages) {
					if (!base.$controls.find('.anythingNavWindow').length){
						base.$nav
							.before('<ul><li class="prev"><a href="#"><span>' + o.backText + '</span></a></li></ul>')
							.after('<ul><li class="next"><a href="#"><span>' + o.forwardText + '</span></a></li></ul>')
							.wrap('<div class="anythingNavWindow"></div>');
					}
					// include half of the left position to include extra width from themes like tabs-light and tabs-dark (still not perfect)
					base.navWidths = base.$nav.find('li').map(function(){
						return $(this).outerWidth(true) + Math.ceil(parseInt($(this).find('span').css('left'),10)/2 || 0);
					}).get();
					base.navLeft = base.currentPage;
					// add 25 pixels (old IE needs more than 5) to make sure the tabs don't wrap to the next line
					base.$nav.width( base.navWidth( 1, base.pages + 1 ) + 25 );
					base.$controls.find('.anythingNavWindow')
						.width( base.navWidth( 1, o.navigationSize + 1 ) ).end()
						.find('.prev,.next').bind(o.clickControls, function(e) {
							if (!base.flag) {
								base.flag = true; setTimeout(function(){ base.flag = false; }, 200);
								base.navWindow( base.navLeft + o.navigationSize * ( $(this).is('.prev') ? -1 : 1 ) );
							}
							e.preventDefault();
						});
				}

			}
		};

		base.navWidth = function(x,y){
			var i, s = Math.min(x,y),
				e = Math.max(x,y),
				w = 0;
			for (i = s; i < e; i++) {
				w += base.navWidths[i-1] || 0;
			}
			return w;
		};

		base.navWindow = function(n){
			if (!!o.navigationSize && o.navigationSize < base.pages && base.navWidths) {
				var p = base.pages - o.navigationSize + 1;
				n = (n <= 1) ? 1 : (n > 1 && n < p) ? n : p;
				if (n !== base.navLeft) {
					base.$controls.find('.anythingNavWindow').animate(
						{ scrollLeft: base.navWidth(1, n), width: base.navWidth(n, n + o.navigationSize) },
						{ queue: false, duration: o.animationTime });
					base.navLeft = n;
				}
			}
		};

		// Creates the Forward/Backward buttons
		base.buildNextBackButtons = function() {
			base.$forward = $('<span class="arrow forward"><a href="#"><span>' + o.forwardText + '</span></a></span>');
			base.$back = $('<span class="arrow back"><a href="#"><span>' + o.backText + '</span></a></span>');

			// Bind to the forward and back buttons
			base.$back.bind(o.clickBackArrow, function(e) {
				// prevent running functions twice (once for click, second time for swipe)
				if (o.enableArrows && !base.flag) {
					base.flag = true; setTimeout(function(){ base.flag = false; }, 100);
					base.goBack();
				}
				e.preventDefault();
			});
			base.$forward.bind(o.clickForwardArrow, function(e) {
				// prevent running functions twice (once for click, second time for swipe)
				if (o.enableArrows && !base.flag) {
					base.flag = true; setTimeout(function(){ base.flag = false; }, 100);
					base.goForward();
				}
				e.preventDefault();
			});
			// using tab to get to arrow links will show they have focus (outline is disabled in css)
			base.$back.add(base.$forward).find('a').bind('focusin focusout',function(){
				$(this).toggleClass('hover');
			});

			// Append elements to page
			base.$back.appendTo( (o.appendBackTo && $(o.appendBackTo).length) ? $(o.appendBackTo) : base.$wrapper );
			base.$forward.appendTo( (o.appendForwardTo && $(o.appendForwardTo).length) ? $(o.appendForwardTo) : base.$wrapper );

			base.arrowWidth = base.$forward.width(); // assuming the left & right arrows are the same width - used for toggle
			base.arrowRight = parseInt(base.$forward.css('right'), 10);
			base.arrowLeft = parseInt(base.$back.css('left'), 10);

		};

		// Creates the Start/Stop button
		base.buildAutoPlay = function(){
			base.$startStop
				.html('<span>' + (base.playing ? o.stopText : o.startText) + '</span>')
				.bind(o.clickSlideshow, function(e) {
					if (o.enableStartStop) {
						base.startStop(!base.playing);
						base.makeActive();
						if (base.playing && !o.autoPlayDelayed) {
							base.goForward(true, o.playRtl);
						}
					}
					e.preventDefault();
				})
				// show button has focus while tabbing
				.bind('focusin focusout',function(){
					$(this).toggleClass('hover');
				});
		};

		// Adjust slider dimensions on parent element resize
		base.checkResize = function(stopTimer){
			// checking document visibility - 
			var vis = !!(doc.hidden || doc.webkitHidden || doc.mozHidden || doc.msHidden);
			clearTimeout(base.resizeTimer);
			base.resizeTimer = setTimeout(function(){
				var w = base.$outer.width(),
					h = base.$outer[0].tagName === "BODY" ? base.$win.height() : base.$outer.height();
				// base.width = width of one panel, so multiply by # of panels; outerPad is padding added for arrows.
				// ignore changes if window hidden
				if (!vis && (base.lastDim[0] !== w || base.lastDim[1] !== h)) {
					
					base.setDimensions(); // adjust panel sizes
					
					//callback for slider resize
					base.$el.trigger('slideshow_resized', base);
					
					// make sure page is lined up (use -1 animation time, so we can differeniate it from when animationTime = 0)
					base.gotoPage(base.currentPage, base.playing, null, -1);
					
				}
				if (typeof(stopTimer) === 'undefined'){ base.checkResize(); }
				
				// increase time if page is hidden; but don't stop it completely
			}, vis ? 2000 : 500);
		};

		// Set panel dimensions to either resize content or adjust panel to content
		base.setDimensions = function(){

			// reset element width & height
			base.$wrapper.find('.anythingWindow, .anythingBase, .panel')[ $.fn.addBack ? 'addBack' : 'andSelf' ]().css({ width: '', height: '' });
			base.width = base.$el.width();
			base.height = base.$el.height();
			base.outerPad = [ base.$wrapper.innerWidth() - base.$wrapper.width(), base.$wrapper.innerHeight() - base.$wrapper.height() ];
			var w, h, c, t, edge = 0,
				fullsize = { width: '100%', height: '100%' },
				// determine panel width
				pw = (o.showMultiple > 1 && o.mode === 'horizontal') ? base.width || base.$window.width()/o.showMultiple : base.$window.width(),
				ph = (o.showMultiple > 1 && o.mode === 'vertical') ? base.height/o.showMultiple || base.$window.height()/o.showMultiple : base.$window.height();
			if (o.expand){
				base.lastDim = [ base.$outer.width(), base.$outer.height() ];
				w = base.lastDim[0] - base.outerPad[0];
				h = base.lastDim[1] - base.outerPad[1];
				base.$wrapper.add(base.$window).css({ width: w, height: h });
				base.height = h = (o.showMultiple > 1 && o.mode === 'vertical') ? ph : h;
				base.width = pw = (o.showMultiple > 1 && o.mode === 'horizontal') ? w/o.showMultiple : w;
				base.$items.css({ width: pw, height: ph });
			}
			base.$items.each(function(i){
				t = $(this);
				c = t.children();
				if (o.resizeContents){
					// resize panel
					w = base.width;
					h = base.height;
					t.css({ width: w, height: h });
					if (c.length) {
						if (c[0].tagName === "EMBED") { c.attr(fullsize); } // needed for IE7; also c.length > 1 in IE7
						if (c[0].tagName === "OBJECT") { c.find('embed').attr(fullsize); }
						// resize panel contents, if solitary (wrapped content or solitary image)
						if (c.length === 1){ c.css(fullsize); }
					}
				} else {
					// get panel width & height and save it
					if (o.mode === 'vertical') {
						w = t.css('display','inline-block').width();
						t.css('display','');
					} else {
						w = t.width() || base.width; // if image hasn't finished loading, width will be zero, so set it to base width instead
					}
					if (c.length === 1 && w >= pw){
						w = (c.width() >= pw) ? pw : c.width(); // get width of solitary child
						c.css('max-width', w);   // set max width for all children
					}
					t.css({ width: w, height: '' }); // set width of panel
					h = (c.length === 1 ? c.outerHeight(true) : t.height()); // get height after setting width
					if (h <= base.outerPad[1]) { h = base.height; } // if height less than the outside padding, then set it to the preset height
					t.css('height', h);
				}
				base.panelSize[i] = [w,h,edge];
				edge += (o.mode === 'vertical') ? h : w;
			});
			// Set total width of slider
			base.$el.css((o.mode === 'vertical' ? 'height' : 'width'), o.mode === 'fade' ? base.width : edge );
		};

		// get dimension of multiple panels, as needed
		base.getDim = function(page){
			var t, i, w = base.width, h = base.height;
			if (base.pages < 1 || isNaN(page)) { return [ w, h ]; } // prevent errors when base.panelSize is empty
			page = (o.infiniteSlides && base.pages > 1) ? page : page - 1;
			i = base.panelSize[page];
			if (i) {
				w = i[0] || w;
				h = i[1] || h;
			}
			if (o.showMultiple > 1) {
				for (i = 1; i < o.showMultiple; i++) {
					t = page + i;
					if (o.mode === 'vertical') {
						w = Math.max(w, base.panelSize[t][0]);
						h += base.panelSize[t][1];
					} else {
						w += base.panelSize[t][0];
						h = Math.max(h, base.panelSize[t][1]);
					}
				}
			}
			return [w,h];
		};

		base.goForward = function(autoplay, rtl) {
			// targetPage changes before animation so if rapidly changing pages, it will have the correct current page
			base.gotoPage(base[ o.allowRapidChange ? 'targetPage' : 'currentPage'] + o.changeBy * (rtl ? -1 : 1), autoplay);
		};

		base.goBack = function(autoplay) {
			base.gotoPage(base[ o.allowRapidChange ? 'targetPage' : 'currentPage'] - o.changeBy, autoplay);
		};

		base.gotoPage = function(page, autoplay, callback, time) {
			if (autoplay !== true) {
				autoplay = false;
				base.startStop(false);
				base.makeActive();
			}
			// check if page is an id or class name
			if (/^[#|.]/.test(page) && $(page).length) {
				page = $(page).closest('.panel').index() + base.adj;
			}

			// rewind effect occurs here when changeBy > 1
			if (o.changeBy !== 1){
				var adj = base.pages - base.adjustMultiple;
				if (page < 1) {
					page = o.stopAtEnd ? 1 : ( o.infiniteSlides ? base.pages + page : ( o.showMultiple > 1 - page ? 1 : adj ) );
				}
				if (page > base.pages) {
					page = o.stopAtEnd ? base.pages : ( o.showMultiple > 1 - page ? 1 : page -= adj );
				} else if (page >= adj) {
					// show multiple adjustments
					page = adj;
				}
			}

			if (base.pages <= 1) { return; } // prevents animation
			base.$lastPage = base.$currentPage;
			if (typeof(page) !== "number") {
				page = parseInt(page,10) || o.startPanel;
				base.setCurrentPage(page);
			}

			// pause YouTube videos before scrolling or prevent change if playing
			if (autoplay && o.isVideoPlaying(base)) { return; }
			if (o.stopAtEnd && !o.infiniteSlides && page > base.pages - o.showMultiple) { page = base.pages - o.showMultiple + 1; } // fixes #515
			base.exactPage = page;
			if (page > base.pages + 1 - base.adj) { page = (!o.infiniteSlides && !o.stopAtEnd) ? 1 : base.pages; }
			if (page < base.adj ) { page = (!o.infiniteSlides && !o.stopAtEnd) ? base.pages : 1; }
			if (!o.infiniteSlides) { base.exactPage = page; } // exact page used by the fx extension
			base.currentPage = ( page > base.pages ) ? base.pages : ( page < 1 ) ? 1 : base.currentPage;
			base.$currentPage = base.$items.eq(base.currentPage - base.adj);
			base.targetPage = (page === 0) ? base.pages : (page > base.pages) ? 1 : page;
			base.$targetPage = base.$items.eq(base.targetPage - base.adj);
			time = typeof time !== 'undefined' ? time : o.animationTime;
			// don't trigger events when time < 0 - to prevent FX from firing multiple times on page resize
			if (time >= 0) { base.$el.trigger('slide_init', base); }
			// toggle arrows/controls only if there is time to see it - fix issue #317
			if (time > 0) { base.slideControls(true); }

			// Set visual
			if (o.buildNavigation){
				base.setNavigation(base.targetPage);
			}

			// When autoplay isn't passed, we stop the timer
			if (autoplay !== true) { autoplay = false; }
			// Stop the slider when we reach the last page, if the option stopAtEnd is set to true
			if (!autoplay || (o.stopAtEnd && page === base.pages)) { base.startStop(false); }

			if (time >= 0) { base.$el.trigger('slide_begin', base); }

			// delay starting slide animation
			setTimeout(function(d){
				var t, p, empty = true;
				if (o.allowRapidChange) {
					base.$wrapper.add(base.$el).add(base.$items).stop(true, true);
				}
				// resize slider if content size varies
				if (!o.resizeContents) {
					// animating the wrapper resize before the window prevents flickering in Firefox
					// don't animate the dimension if it hasn't changed - fix for issue #264
					p = base.getDim(page); d = {};
					// prevent animating a dimension to zero
					if (base.$wrapper.width() !== p[0]) { d.width = p[0] || base.width; empty = false; }
					if (base.$wrapper.height() !== p[1]) { d.height = p[1] || base.height; empty = false; }
					if (!empty) {
						base.$wrapper.filter(':not(:animated)').animate(d, { queue: false, duration: (time < 0 ? 0 : time), easing: o.easing });
					}
				}

				if (o.mode === 'fade') {
					if (base.$lastPage[0] !== base.$targetPage[0]) {
						base.fadeIt( base.$lastPage, 0, time );
						base.fadeIt( base.$targetPage, 1, time, function(){ base.endAnimation(page, callback, time); });
					} else {
						base.endAnimation(page, callback, time);
					}
				} else {
					d = {};
					d[base.dir] = -base.panelSize[(o.infiniteSlides && base.pages > 1) ? page : page - 1][2];
					// resize width of base element (ul) if vertical & width of content varies
					if (o.mode === 'vertical' && !o.resizeContents) { d.width = p[0]; }
					// Animate Slider
					base.$el.filter(':not(:animated)').animate(
						d, { queue: false, duration: time < 0 ? 0 : time, easing: o.easing, complete: function(){ base.endAnimation(page, callback, time); } }
					);
				}
			}, parseInt(o.delayBeforeAnimate, 10) || 0);
		};

		base.endAnimation = function(page, callback, time){
			if (page === 0) {
				base.$el.css( base.dir, o.mode === 'fade' ? 0 : -base.panelSize[base.pages][2]);
				page = base.pages;
			} else if (page > base.pages) {
				// reset back to start position
				base.$el.css( base.dir, o.mode === 'fade' ? 0 : -base.panelSize[1][2]);
				page = 1;
			}
			base.exactPage = page;
			base.setCurrentPage(page, false);

			if (o.mode === 'fade') {
				// make sure non current panels are hidden (rapid slide changes)
				base.fadeIt( base.$items.not(':eq(' + (page - base.adj) + ')'), 0, 0);
			}

			if (!base.hovered) { base.slideControls(false); }

			if (o.hashTags) { base.setHash(page); }

			if (time >= 0) { base.$el.trigger('slide_complete', base); }
			// callback from external slide control: $('#slider').anythingSlider(4, function(slider){ })
			if (typeof callback === 'function') { callback(base); }

			// Continue slideshow after a delay
			if (o.autoPlayLocked && !base.playing) {
				setTimeout(function(){
					base.startStop(true);
				// subtract out slide delay as the slideshow waits that additional time.
				}, o.resumeDelay - (o.autoPlayDelayed ? o.delay : 0));
			}
		};

		base.fadeIt = function(el, toOpacity, time, callback){
			var t = time < 0 ? 0 : time;
			if (o.resumeOnVisible) {
				el.filter(':not(:animated)').fadeTo(t, toOpacity, callback);
			} else {
				el.filter(':not(:animated)')[ toOpacity === 0 ? 'fadeOut' : 'fadeIn' ](t, callback);
			}
		};

		base.setCurrentPage = function(page, move) {
			page = parseInt(page, 10);

			if (base.pages < 1 || page === 0 || isNaN(page)) { return; }
			if (page > base.pages + 1 - base.adj) { page = base.pages - base.adj; }
			if (page < base.adj ) { page = 1; }

			// hide/show arrows based on infinite scroll mode
			if (o.buildArrows && !o.infiniteSlides && o.stopAtEnd){
				base.$forward[ page === base.pages - base.adjustMultiple ? 'addClass' : 'removeClass']('disabled');
				base.$back[ page === 1 ? 'addClass' : 'removeClass']('disabled');
				if (page === base.pages && base.playing) { base.startStop(); }
			}

			// Only change left if move does not equal false
			if (!move) {
				var d = base.getDim(page);
				base.$wrapper
					.css({ width: d[0], height: d[1] })
					.add(base.$window).scrollLeft(0).scrollTop(0); // reset in case tabbing changed this scrollLeft - probably overly redundant
				base.$el.css( base.dir, o.mode === 'fade' ? 0 : -base.panelSize[(o.infiniteSlides && base.pages > 1) ? page : page - 1][2] );
			}

			// Update local variable
			base.currentPage = page;
			base.$currentPage = base.$items.removeClass('activePage').eq(page - base.adj).addClass('activePage');

			if (o.buildNavigation){
				base.setNavigation(page);
			}

		};

		base.setNavigation = function(page){
			base.$nav
				.find('.cur').removeClass('cur').end()
				.find('a').eq(page - 1).addClass('cur');
		};

		base.makeActive = function(){
			// Set current slider as active so keyboard navigation works properly
			if (!base.$wrapper.hasClass('activeSlider')){
				$('.activeSlider').removeClass('activeSlider');
				base.$wrapper.addClass('activeSlider');
			}
		};

		// This method tries to find a hash that matches an ID and panel-X
		// If either found, it tries to find a matching item
		// If that is found as well, then it returns the page number
		base.gotoHash = function(){
			var h = win.location.hash,
				i = h.indexOf('&'),
				n = h.match(base.regex);
			// test for "/#/" or "/#!/" used by the jquery address plugin - $('#/') breaks jQuery
			if (n === null && !/^#&/.test(h) && !/#!?\//.test(h) && !/\=/.test(h)) {
				// #quote2&panel1-3&panel3-3
				h = h.substring(0, (i >= 0 ? i : h.length));
				// ensure the element is in the same slider
				n = ($(h).length && $(h).closest('.anythingBase')[0] === base.el) ? base.$items.index($(h).closest('.panel')) + base.adj : null;
			} else if (n !== null) {
				// #&panel1-3&panel3-3
				n = (o.hashTags) ? parseInt(n[1],10) : null;
			}
			return n;
		};

		base.setHash = function(n){
			var s = 'panel' + base.runTimes + '-',
				h = win.location.hash;
			if ( typeof h !== 'undefined' ) {
				win.location.hash = (h.indexOf(s) > 0) ? h.replace(base.regex, s + n) : h + "&" + s + n;
			}
		};

		// Slide controls (nav and play/stop button up or down)
		base.slideControls = function(toggle){
			var dir = (toggle) ? 'slideDown' : 'slideUp',
				t1 = (toggle) ? 0 : o.animationTime,
				t2 = (toggle) ? o.animationTime : 0,
				op = (toggle) ? 1 : 0,
				sign = (toggle) ? 0 : 1; // 0 = visible, 1 = hidden
			if (o.toggleControls) {
				base.$controls.stop(true,true).delay(t1)[dir](o.animationTime/2).delay(t2);
			}
			if (o.buildArrows && o.toggleArrows) {
				if (!base.hovered && base.playing) { sign = 1; op = 0; } // don't animate arrows during slideshow
				base.$forward.stop(true,true).delay(t1).animate({ right: base.arrowRight + (sign * base.arrowWidth), opacity: op }, o.animationTime/2);
				base.$back.stop(true,true).delay(t1).animate({ left: base.arrowLeft + (sign * base.arrowWidth), opacity: op }, o.animationTime/2);
			}
		};

		base.clearTimer = function(paused){
			// Clear the timer only if it is set
			if (base.timer) {
				win.clearInterval(base.timer);
				if (!paused && base.slideshow) {
					base.$el.trigger('slideshow_stop', base);
					base.slideshow = false;
				}
			}
		};

		// Pass startStop(false) to stop and startStop(true) to play
		base.startStop = function(playing, paused) {
			if (playing !== true) { playing = false; }  // Default if not supplied is false
			base.playing = playing;

			if (playing && !paused) {
				base.$el.trigger('slideshow_start', base);
				base.slideshow = true;
			}

			// Toggle playing and text
			if (o.buildStartStop) {
				base.$startStop.toggleClass('playing', playing).find('span').html( playing ? o.stopText : o.startText );
				// add button text to title attribute if it is hidden by text-indent
				if ( base.$startStop.find('span').css('visibility') === "hidden" ) {
					base.$startStop.addClass(o.tooltipClass).attr( 'title', playing ? o.stopText : o.startText );
				}
			}

			// Pause slideshow while video is playing
			if (playing){
				base.clearTimer(true); // Just in case this was triggered twice in a row
				base.timer = win.setInterval(function() {
					if ( !!(doc.hidden || doc.webkitHidden || doc.mozHidden || doc.msHidden) ) {
						// stop slideshow if the page isn't visible (issue #463)
						if (!o.autoPlayLocked) {
							base.startStop();
						}
					} else if ( !o.isVideoPlaying(base) ) {
						// prevent autoplay if video is playing
						base.goForward(true, o.playRtl);
					} else if (!o.resumeOnVideoEnd) {
						// stop slideshow if resume if false
						base.startStop();
					}
				}, o.delay);
			} else {
				base.clearTimer();
			}
		};

		// Trigger the initialization
		base.init();
	};

	$.anythingSlider.defaults = {
		// Appearance
		theme               : "default", // Theme name, add the css stylesheet manually
		mode                : "horiz",   // Set mode to "horizontal", "vertical" or "fade" (only first letter needed); replaces vertical option
		expand              : false,     // If true, the entire slider will expand to fit the parent element
		resizeContents      : true,      // If true, solitary images/objects in the panel will expand to fit the viewport
		showMultiple        : false,     // Set this value to a number and it will show that many slides at once
		easing              : "swing",   // Anything other than "linear" or "swing" requires the easing plugin or jQuery UI

		buildArrows         : true,      // If true, builds the forwards and backwards buttons
		buildNavigation     : true,      // If true, builds a list of anchor links to link to each panel
		buildStartStop      : true,      // ** If true, builds the start/stop button

/*
		// commented out as this will reduce the size of the minified version
		appendForwardTo     : null,      // Append forward arrow to a HTML element (jQuery Object, selector or HTMLNode), if not null
		appendBackTo        : null,      // Append back arrow to a HTML element (jQuery Object, selector or HTMLNode), if not null
		appendControlsTo    : null,      // Append controls (navigation + start-stop) to a HTML element (jQuery Object, selector or HTMLNode), if not null
		appendNavigationTo  : null,      // Append navigation buttons to a HTML element (jQuery Object, selector or HTMLNode), if not null
		appendStartStopTo   : null,      // Append start-stop button to a HTML element (jQuery Object, selector or HTMLNode), if not null
*/

		toggleArrows        : false,     // If true, side navigation arrows will slide out on hovering & hide @ other times
		toggleControls      : false,     // if true, slide in controls (navigation + play/stop button) on hover and slide change, hide @ other times

		startText           : "Start",   // Start button text
		stopText            : "Stop",    // Stop button text
		forwardText         : "&raquo;", // Link text used to move the slider forward (hidden by CSS, replaced with arrow image)
		backText            : "&laquo;", // Link text used to move the slider back (hidden by CSS, replace with arrow image)
		tooltipClass        : "tooltip", // Class added to navigation & start/stop button (text copied to title if it is hidden by a negative text indent)

		// Function
		enableArrows        : true,      // if false, arrows will be visible, but not clickable.
		enableNavigation    : true,      // if false, navigation links will still be visible, but not clickable.
		enableStartStop     : true,      // if false, the play/stop button will still be visible, but not clickable. Previously "enablePlay"
		enableKeyboard      : true,      // if false, keyboard arrow keys will not work for this slider.

		// Navigation
		startPanel          : 1,         // This sets the initial panel
		changeBy            : 1,         // Amount to go forward or back when changing panels.
		hashTags            : true,      // Should links change the hashtag in the URL?
		infiniteSlides      : true,      // if false, the slider will not wrap & not clone any panels
		navigationFormatter : null,      // Details at the top of the file on this use (advanced use)
		navigationSize      : false,     // Set this to the maximum number of visible navigation tabs; false to disable

		// Slideshow options
		autoPlay            : false,     // If true, the slideshow will start running; replaces "startStopped" option
		autoPlayLocked      : false,     // If true, user changing slides will not stop the slideshow
		autoPlayDelayed     : false,     // If true, starting a slideshow will delay advancing slides; if false, the slider will immediately advance to the next slide when slideshow starts
		pauseOnHover        : true,      // If true & the slideshow is active, the slideshow will pause on hover
		stopAtEnd           : false,     // If true & the slideshow is active, the slideshow will stop on the last page. This also stops the rewind effect when infiniteSlides is false.
		playRtl             : false,     // If true, the slideshow will move right-to-left

		// Times
		delay               : 3000,      // How long between slideshow transitions in AutoPlay mode (in milliseconds)
		resumeDelay         : 15000,     // Resume slideshow after user interaction, only if autoplayLocked is true (in milliseconds).
		animationTime       : 600,       // How long the slideshow transition takes (in milliseconds)
		delayBeforeAnimate  : 0,         // How long to pause slide animation before going to the desired slide (used if you want your "out" FX to show).

/*
		// Callbacks - commented out to reduce size of the minified version - they still work
		onSliderResize      : function(e, slider) {}, // Callback when slider resizes
		onBeforeInitialize  : function(e, slider) {}, // Callback before the plugin initializes
		onInitialized       : function(e, slider) {}, // Callback when the plugin finished initializing
		onShowStart         : function(e, slider) {}, // Callback on slideshow start
		onShowStop          : function(e, slider) {}, // Callback after slideshow stops
		onShowPause         : function(e, slider) {}, // Callback when slideshow pauses
		onShowUnpause       : function(e, slider) {}, // Callback when slideshow unpauses - may not trigger properly if user clicks on any controls
		onSlideInit         : function(e, slider) {}, // Callback when slide initiates, before control animation
		onSlideBegin        : function(e, slider) {}, // Callback before slide animates
		onSlideComplete     : function(slider) {},    // Callback when slide completes - no event variable!
*/

		// Interactivity
		clickForwardArrow   : "click",         // Event used to activate forward arrow functionality (e.g. add jQuery mobile's "swiperight")
		clickBackArrow      : "click",         // Event used to activate back arrow functionality (e.g. add jQuery mobile's "swipeleft")
		clickControls       : "click focusin", // Events used to activate navigation control functionality
		clickSlideshow      : "click",         // Event used to activate slideshow play/stop button
		allowRapidChange    : false,           // If true, allow rapid changing of the active pane, instead of ignoring activity during animation

		// Video
		resumeOnVideoEnd    : true,      // If true & the slideshow is active & a supported video is playing, it will pause the autoplay until the video is complete
		resumeOnVisible     : true,      // If true the video will resume playing, if previously paused; if false, the video remains paused.
		isVideoPlaying      : function(base){ return false; } // return true if video is playing or false if not - used by video extension

		// deprecated - use the video extension wmode option now
		// addWmodeToObject : "opaque"   // If your slider has a video supported by the extension, the script will automatically add a wmode parameter with this setting

	};

	$.fn.anythingSlider = function(options, callback) {

		return this.each(function(){
			var page, anySlide = $(this).data('AnythingSlider');

			// initialize the slider but prevent multiple initializations
			if ((typeof(options)).match('object|undefined')){
				if (!anySlide) {
					(new $.anythingSlider(this, options));
				} else {
					anySlide.updateSlider();
				}
			// If options is a number, process as an external link to page #: $(element).anythingSlider(#)
			} else if (/\d/.test(options) && !isNaN(options) && anySlide) {
				page = (typeof(options) === "number") ? options : parseInt($.trim(options),10); // accepts "  2  "
				// ignore out of bound pages
				if ( page >= 1 && page <= anySlide.pages ) {
					anySlide.gotoPage(page, false, callback); // page #, autoplay, one time callback
				}
			// Accept id or class name
			} else if (/^[#|.]/.test(options) && $(options).length) {
				anySlide.gotoPage(options, false, callback);
			}
		});
	};

})(jQuery, window, document);
window.sovety=[];
window.sovety=[
'Это - экспериментальная, тестовая версия программы.<br/>В ней могут быть ошибки и неполадки.',
'Все замечания и предложения отправляйте<br/>на адрес nickkolok@mail.ru',
'Программа "Час ЕГЭ" корректно работает<br/>только в <a href="../doc/systreb.html" target="_blank">поддерживаемых браузерах</a>.',
'В тренажёре иногда используются статистические данные,<br/>например, о погоде или ценах. Эти данные являются<br/>автоматически сгенерированными и <b>не</b> реальными.',
'Одна из разработчиц "Час ЕГЭ", Настя Червинская, срочно и <br/>бесплатно отдаёт котят в хорошие руки. Связаться с ней<br/> можно <a href="https://vk.com/kitten112007" target="_blank">ВКонтакте</a> или по телефону 8 (951) 5519607',
].shuffle();
function informer(){
	var i;
	document.write('<div id="inf">');
	document.write('<ul id="sovety">');
	for(i=0;i<window.sovety.length;i++){
		document.write('<li><div class="lisov">');
		document.write(window.sovety[i]);
		document.write('</div></li>');
	}
	document.write('</ul>');
	document.write('</div>');
	$(function(){
		$('#sovety').anythingSlider({
			forwardText         : "&gt;",
			backText         	: "&lt;",
			hashTags			:false,
//			expand:true,
			startPanel			:1,
			theme				:'minimalist-square',
			buildNavigation		:false,
			buildStartStop		:false,
			resizeContents  	:false,
			enableKeyboard		:false,
			autoPlay			:true,
		});
	});

}
informer();
