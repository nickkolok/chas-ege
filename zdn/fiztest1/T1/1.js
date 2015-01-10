(function(){
NAinfo.requireApiVersion(0, 0);

var v1=sl1();
var naim=[" Гц"," с"][v1];

do{
    var koleb=sl(2,100);
    var time=sl(2,100);
    var rez=[koleb/time,time/koleb];
}while(!(rez[v1]*1000).isZ());


NAtask.setTask({
    text:"За "+chislitlx(time,"секунда")+" маятник совершает "+chislitlx(koleb,"колебание")+". "+
        "Чему "+["равна частота","равен период"][v1]+" колебаний?",
    answers:rez[v1]+naim,
    wrongAnswers:[rez[1-v1].toFixedLess(4)+naim,""+koleb*time+naim,""+time+naim,""+koleb+naim],
    analys:"Частота колебаний равна количеству колебаний, делённому на время. "+
        "Период есть величина, обратная к частоте.",
});

AtoB();
})();
