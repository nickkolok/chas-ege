retryWhileError(function() {
    NAinfo.requireApiVersion(0, 2);
 
    var S = sl(10, 50);
    var r = sl(1,50);
    var p = 1+r/100;
    var n = sl(4,9);
    var m = n-1;
    var g = sl(2010,2020);
    var d;
    var e;
    let v=0;
    let w=sl1();
    let massiv1=[];
    for (let i=0; i<n-1;i++){
        massiv1.push(slKrome(massiv1,1,5));
    }
    massiv1[0]=10;
    massiv1[n-1]=0;
    massiv1=massiv1.sort((a,b) => b - a);
    var massiv2= [].concat(massiv1);
    for (let i=0; i<n-1;i++){
        v+=S/10*p*massiv2[i]-S/10*massiv2[i+1];
    }
  for (let j=0; j<n-1;j++){
  if(w) massiv1[j]='$'+massiv1[j].texfrac(10)+'S'+'$';
else
massiv1[j]='$'+(massiv1[j]/10).ts()+'S'+'$';}

    massiv1[n-1]='$0$'; 
    let massiv3=[];
      massiv3[0]=g;
    for (let i=1; i<n;i++){
    	massiv3[i]=massiv3[i-1]+1;
    }
     let massiv4=[];
      for (let i=0; i<n-1;i++){
        massiv4[i]=massiv2[i]*p*S/10-massiv2[i+1]*S/10;
    }
    d=massiv4[0]-massiv4[n-2];
    e=d.okrugldo(0.01);
    //Выбираем месяц для пересчёта процентов
    var monthToRecalc = sl(0, 6);
    
    //Выбираем месяц для взятия кредита
    var monthIndex = sl(monthToRecalc + 4, 10); // От апреля до ноября
    NAtask.setTask({
        text: 'В '+
            sklonlxkand(om.months[monthIndex]).pe + // <--- вот оно, предложеный падеж месяца по его номеру
            ' '+g+' года планируется взять кредит в банке на сумму S'+
            ' миллионов рублей на '+chislitM(m, 'год', 'года', 'лет') +', где S – целое число. Условия его возврата таковы:<br>'+
             '– каждый '+om.months[monthToRecalc]+' долг '+['увеличивается', 'возрастает'].iz()+' на '+r+'% по сравнению с концом предыдущего года;<br>'+
            '– с ' + sklonlxkand(om.months[monthToRecalc+1]).re + ' по '+om.months[sl(monthToRecalc+3, monthIndex-1)]+' каждого года необходимо выплатить одним платежом часть долга.<br>'+
            '– в '+sklonlxkand(om.months[monthIndex]).pe+' каждого года долг должен составлять некоторую сумму, выраженную в миллионах рублей, в соответствии со следующей таблицей:<br>'+ 
            '<center><br/>' + //Центрирование и отступы вокруг таблицы
            '<table border="1" cellspacing="0" cellpadding="12">' +
                massiv3.join('</td><td>').replace('1S','S').replace('{1}S','S').vTag('td').vTag('tr')+
                massiv1.join('</td><td>').replace('1S','S').replace('{1}S','S').vTag('td').vTag('tr')+
            '</table>' +
            '</center><br/>' + //Центрирование и отступы вокруг таблицы
            'Найдите наибольшее значение S, при котором разница между наибольшей и наименьшей выплатами будет не больше '+e.ts()+' миллионов рублей',
        answers: S,
    });
}, 100000);
//задана таблица долгов
//514477 514483 514486 514627 514641 514725 516259 516278 517266 517801 523998 524025 525121

