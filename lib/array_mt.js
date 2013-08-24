Array.prototype.mt_prov=function(){
	var fl=true;
	var len=this.length-1;
	for(;(len+1)*fl;len--)
		fl=fl*(this[len].x!=undefined)*(this[len].y!=undefined);
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
		for(l2=this.length-1;l2>len;l2--)
			fl+=(this[len].x==this[l2].x&&this[len].y==this[l2].y);
	}
	return fl;
};

Array.prototype.mt_pryam=function(){
	if(!this.mt_prov()){return undefined;};
	var p1={};
	var a=this.mt_tgUnakl();
	if(a.abs()==Infinity)
		var b=this[0].x;
	else
		var b=this[0].y-a*this[0].x;
	return {a:a,b:b};
};

Array.prototype.mt_join=function(p1){
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

Array.prototype.mt_otrPeres=function(){
	if(!this.mt_prov())
		return undefined;
	var p1=[[this[0],this[1]].mt_pryam(),[this[2],this[3]].mt_pryam()].mp_tPeres();
	if(p1.x==Infinity)
		return Infinity;
	else if(p1.x.mzhd(this[0].x,this[1].x,1)&&p1.x.mzhd(this[2].x,this[3].x,1)&&p1.y.mzhd(this[0].y,this[1].y,1)&&p1.y.mzhd(this[2].y,this[3].y,1))
		return 1;
	return 0;
}

Array.prototype.mt_estSamoper=function(){
	if(!this.mt_prov()||this.length<3){return undefined;};
	var len=this.length;
	var th=this.concat(this,this);
	var fl=0;
	for(var l1=0;l1<len;l1++)
		for(var l2=l1+2;l2<=l1+len-2;l2++)
			fl+=[th[l1],th[l1+1],th[l2],th[l2+1]].mt_otrPeres();
	return fl;
}

Array.prototype.mt_ladMnug=function(){
	if((this.length<3)
		||	(!this.mt_prov())
		||	(this.mt_dubli())
	)
		return 0;
	
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
