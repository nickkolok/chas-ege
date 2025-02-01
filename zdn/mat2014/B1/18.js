(function(){

var prazdnik=['день рождения','юбилей','именины','праздник','Восьмое марта',].iz();
var cena=sl(10,150);
var summa=sl(cena*3+1,1500);
var cvety=sklonlxkand(['роза','мимоза','тюльпан','гладиолус','ирис','лилия','подснежник','хризантема','флокс',].iz());

NAtask.setTask({
	text : 'На '+prazdnik+' полагается дарить букет из нечётного числа цветов. '+
	cvety.im.toZagl()+' стоят '+cena.rub()+' за штуку. У молодого человека есть '+summa.rub()+
	'. Из какого наибольшего числа '+cvety.rm+' он может купить букет '+
	sklonlxkand(om.imenaj.ie.iz()).de+' на '+prazdnik+'?',
	answers : (((summa-cena)/cena/2).floor()*2+1).ts(),
});
})();
//Обзад 26637
