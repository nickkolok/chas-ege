'use strict';

function Word(o){
	if(!o)
		o={};
	if(o.isString)
		return new Word(sklonlxkand(o));
	for(var prop in o)
		this[prop]=o[prop];
};

Word.prototype.toString = function(){
	return '[Ошибка: падеж или иная форма слова "'+(this.ie||JSON.stringify(this))+'" не указаны]';
}

function autosklon(slovo,p1){
	if(slovo.isArray){
		for(var lensl=slovo.length-1;lensl>=0;lensl--)
			autosklon(slovo[lensl],p1);
		return;
	}
	if(lx[slovo])
		return console.log('Такое слово уже есть в словаре.');
	var rez=setlx(slovo);
	if(p1!=undefined)
		slovo+=p1;
	var sl=slovo;
	for(;sl.length && !lx[sl] && !lxskl[sl]; sl=sl.udalPerv()){};
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

var lxkand=[];

function sklonlxkand(slovo,p1,al){
	if(slovo.isArray){
		return slovo.map(function(str){return sklonlxkand(str);});
	}
	if(slovo.ie)
		return sklonlxkand(slovo.ie,p1,al);
	if(lx[slovo]){
		if(al)
			alert('Такое слово уже есть в словаре.');
		return new Word(lx[slovo]);
	}
	lxkand[slovo]=new Word();
	if(p1!=undefined)
		slovo+=p1;
	var sl=slovo;
	for(;sl.length && !lx[sl] && !lxskl[sl]; sl=sl.udalPerv()){};
	var lxparent=lx[sl]?lx[sl]:lxskl[sl];
	var osnova=slovo.udalPosl(sl.length);
	lxkand[slovo]=lxparent.clone();
	for(var padezh in lxpad)
		lxkand[slovo][padezh]=osnova+lxparent[padezh];
	lxkand[slovo].chr=1;
	return lxkand[slovo];
}

var lxdop={
	rod:1,
	skl:1,
	odu:1,
	sbs:1,
	sl:1,
	sr:1,
	pr:1,
	chr:1,
};

function strlxkand(slovo,p1,al){
	var rez=setlx(slovo);
	var sl;
	if(!lxkand[slovo])
		sl=sklonlxkand(slovo,p1,al).clone();
	else
		sl=lxkand[slovo].clone();
	for(var pad in lxpad){
		rez+=logparam(pad,sl[pad]);
		sl[pad]=undefined;
	}
	for(var pad in lxdop){
		rez+=logparam(pad,sl[pad]);
		sl[pad]=undefined;
	}
	for(var pad in sl)
		rez+=logparam(pad,sl[pad]);
	rez+='};\n';
	return rez;
}

function loglxkand(slovo,p1){
	console.log(strlxkand(slovo,p1,1));
}

function setlx(p1){
	return('\nlx[\''+p1+'\']={\n');
}

function logparam(p1,p2){
	return p2!=undefined?
		p2.isString?
			('\t'+p1+':\''+p2+'\',\n'):
			('\t'+p1+':'+p2+',\n')
		:'';
}

function logsklon(a){
	if(slovo.isArray){
		for(var lensl=slovo.length-1;lensl>=0;lensl--)
			logsklon(slovo[lensl],p1);
		return;
	}
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

var lxcompositions={
	'в': {
		'вторник':'во вторник',
	},
}
//TODO: добавить больше ситуаций
function lxcompose(a,b){
	if(lxcompositions[a] && lxcompositions[a][b]){
		return lxcompositions[a][b];
	}
	return a+' '+b;
}
