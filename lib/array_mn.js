'use strict';

Array.prototype.mn_plus=function(p1){
/**Прибавляет к массиву коэффициентов многочлена, записанных по возрастанию степеней, другой такой массив.
Текущий массив не изменяет!
*/
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
/**Умножает массив коэффициентов многочлена, записанных по возрастанию степеней, на другой такой массив.
Текущий массив не изменяет!
*/
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

Array.prototype.mn_proizv=function(){
/**Находит производную от многочлена, коэфф. которого в порядке возрастания степеней - элементы данного массива.*/
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
/**Находит значение многочлена, коэфф. которого в порядке возрастания степеней - элементы данного массива,
при значении переменной, равном x*/
	var len=this.length;
	var s=0;
	for(var i=0;i<len;i++){
		this[i]=Drob.fixN(this[i]);
		s+=this[i].ch*x.pow(i)/this[i].zn;
	}
	return s;
}

Array.prototype.mn_txt=function(x){
/**TeX-представление многочлена, коэфф. которого в порядке возрастания степеней - элементы данного массива, x - символ переменной.*/
	var len=this.length;
	this[0]=Drob.fixN(this[0]);
	var s=this[0].ch.frac(this[0].zn);
	for(var i=1;i<len;i++){
		this[i]=Drob.fixN(this[i]);
		if(this[i].ch){
			s= this[i].ch.frac(this[i].zn)+x+('^{'+i+'}').esli(i!=1)
				+'+'+s;
		}
	}
	return s.replace(/\+0$/,'').plusminus();
}

Array.prototype.mn_pervoobr=function(){
/**Находит первообразную (C=0) от многочлена, коэфф. которого в порядке возрастания степеней - элементы данного массива.*/
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

Array.prototype.mn_txtmas=function(x){
/**TeX-представление многочлена, коэфф. которого в порядке возрастания степеней - элементы данного массива, x - символ переменной, в виде массива выражений*/
	var len=this.length;
	this[0]=Drob.fixN(this[0]);
	var s=[this[0].ch.frac(this[0].zn).esli(this[0].ch)];
	for(var i=1;i<len;i++){
		this[i]=Drob.fixN(this[i]);
		if(this[i].ch){
			s.push(this[i].ch.frac(this[i].zn)+x+('^{'+i+'}').esli(i!=1));
		}
	}
	return s;
}

Array.prototype.addToGlobal('docsArray',1);
