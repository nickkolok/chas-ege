'use strict';

function Complex(re,im){
	this.re=+re?+re:0;
	this.im=+im?+im:0;
	this.isComplex=1;
	this.toString=function(){
	/**Представляет число в виде a+bi*/
		var rez;
		if(!this.re && !this.im)
			rez='0';
		else if( this.re && !this.im)
			rez=''+this.re;
		else if(!this.re &&  this.im)
			rez=''+this.im+'i';
		else if( this.re &&  this.im)
			rez= ''+this.re+'+'+this.im+'i';
		return rez.plusminus();
	}
	this.ts=function(){
		return this.toString().ts();
	}

	this.minus=function(){
	/**Противоположное число: -a-bi*/
		return new Complex( -(this.re), - (this.im));
	}

	this.sopr=function(){
	/**Сопряжёное число: a-bi*/
		return new Complex(this.re, - (this.im));
	}

	this.abs=
	this.norma=function(){
	/**Норма (модуль, абсолютное значение) комплексного числа*/
		return (this.re.sqr()+this.im.sqr()).sqrt();
	}

	this.obrat=function(){
	/**Обратное число: a-bi*/
		var n=this.norma().sqr();
		return new Complex(this.re/n, - (this.im)/n);
	}
	
	this.sum=function(){
	/**Прибавить к комплексному числу комплексные или действительные*/
		var rez=this.clone();
//		arguments[0].isComplex?arguments[0].clone():new Complex(arguments[0]);
		for(var i=arguments.length-1;i>=0;i--){
			var operand=arguments[i];
			if(operand.isNumber){
				rez.re+=operand;
			}else{
				if(operand.re){
					rez.re+=operand.re;
				}
				if(operand.im){
					rez.im+=operand.im;
				}
			}
		}
		return rez;
	}

	this.umn=function(){
	/**Умножить комплексное число на комплексные или действительные*/
		var rez=this.clone();
		for(var i=arguments.length-1;i>=0;i--){
			var operand=arguments[i];
			if(operand.isNumber){
				if(operand===0){
					return new Complex();
				}
				rez.re*=operand;
				rez.im*=operand;
			}else{
				if(!operand.re && !operand.im){
					//Нуль
					return new Complex();
				}else{
					var r=rez.re,
						m=rez.im;
					rez.re=r*operand.re-m*operand.im;
					rez.im=r*operand.im+m*operand.re;
				} 
			}
		}
		return rez;
	}
}
