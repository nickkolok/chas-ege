(function(){'use strict';

var mtr,//Матрица перехода
	baz,//Базис
	det;
do{
	mtr=generateMatrix(2,2,-4,4);
	det=mtr.det();
}while(!det || !(100/det).isZ());

do{
	baz=generateMatrix(2,2,-4,4);
	det=baz.det();
}while(!det || !(100/det).isZ());

var novbaz=objUmn(baz,mtr);

window.vopr.ver=[
	'$T_{B \\to B\'}='+
	'\\left('+
		mtr.matrixToTex().ts()+
	'\\right)$'+

	', $T_{B\' \\to B}='+
	'\\left('+
		mtr.inv().matrixToTex().ts()+
	'\\right)$'
];

window.vopr.rsh=
	'$B='+
	'\\left('+
		baz.matrixToTex().ts()+
	'\\right)$'+

	'<br/>'+
	'$B\'='+
	'\\left('+
		novbaz.matrixToTex().ts()+
	'\\right)$'+
	
'';

window.vopr.txt='Даны два базиса $B=(e_1~,~e_2)$ и $B\'=(e_1\'~,~e_2\')$, где '+
	'$~~e_1=('+baz.T()[0]+')$,'+
	'$~~e_2=('+baz.T()[1]+')$,'+
	'$~~e_1\'=('+novbaz.T()[0]+')$,'+
	'$~~e_2\'=('+novbaz.T()[1]+')$.'+
	'<br/>Найдите $T_{B \\to B\'}$ и $T_{B\' \\to B}$.'+
	'';

})();
