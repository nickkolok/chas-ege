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
	var rez=sklonlxkand(p2,undefined,0);
	switch(p3){
		case 'i': return chislitM(p1,	rez.ie,	(rez.r2?rez.r2:rez.re),	rez.rm);
		case 'r': return chislitM(p1,	rez.re,	 rez.rm,				rez.rm);
		case 'd': return chislitM(p1,	rez.de,	 rez.dm,				rez.dm);
		case 'v': return chislitM(p1,	rez.ve,	(rez.r2?rez.r2:rez.ve),	rez.vm);
		case 't': return chislitM(p1,	rez.te,	 rez.tm,				rez.tm);
		case 'p': return chislitM(p1,	rez.pe,	 rez.pm,				rez.pm);
	}
	return chislitM(p1,rez.ie,(rez.r2?rez.r2:rez.re),rez.rm);
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
		if(obj[key].isArray)
			temp[key]=obj[key].slice();
		else
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
	n=n?n:3;
	var nev=window.vopr.nev.iz(n);
	var ver=window.vopr.ver.iz();
	var a=[[ver].concat(nev),[].N(n+1)].T().shuffle().T();
	window.vopr.ver=[a[1].pervSovp(1)+1];
	for(var i=0;i<=n;i++){
		window.vopr.txt+='<br/>'+(i+1)+') '+a[0][i];
	}
}

