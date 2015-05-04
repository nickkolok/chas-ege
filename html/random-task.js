var n;

var nas=200;
var zelen={r:0,g:nas,b:0};
var krasn={r:nas,g:0,b:0};
var zhelt={r:nas,g:nas,b:0};
var flProv=1;
var vremyaStart;

var slvopr;

var v=[];

var strelkaEst=1;


var initializeStatsTable = function() {
	var statstable = $(document.createElement("table"));
	statstable.attr("id", "stats-table");
	statstable.addClass("table table-bordered");
	
	var row_indexes = $(document.createElement("tr"))
		.attr("id", "stats-table-indexes");
	var row_right = $(document.createElement("tr"))
		.attr("id", "stats-table-right");
	var row_stats = $(document.createElement("tr"))
		.attr("id", "stats-table-stats");
	var row_time = $(document.createElement("tr"))
		.attr("id", "stats-table-time");

	var create_data_indexes = function(index, title, taskset_name) {
		return $(document.createElement("td"))
			.attr("title", title)
			.append(
				$(document.createElement("input"))
					.attr({
						"id": "checkbox-B" + index,
						"type": "checkbox",
						"checked": "",
						"data-jstorage-id": "sluch-checkbox-B" + index + "-" + taskset_name
					})
			)
			.append(
				$(document.createElement("label"))
					.attr({
						"for": "checkbox-B" + index
					})
					.html(
						dvig.getzadname(index)
					)
			);
	};

	var create_data_right = function(index, title) {
		return $(document.createElement("td"))
			.attr("title", title)
			.append(
				$(document.createElement("span"))
					.attr("id", "r-B" + index)
			);
	};

	var create_data_stats = function(index, title) {
		return $(document.createElement("td"))
			.attr("title", title)
			.append(
				$(document.createElement("span"))
					.attr("id", "right-B" + index)
			)
			.append("<br>из<br>")
			.append(
				$(document.createElement("span"))
					.attr("id", "total-B" + index)
			);
	};

	var create_data_time = function(index, title) {
		return $(document.createElement("td"))
			.attr("title", title)
			.append(
				$(document.createElement("span"))
					.addClass("time")
					.attr("id", "time-B" + index)
			);
	};

	for (var i = 1; i <= nabor.nZad; i++) {
		if (nabor.vykl[i]) {
			continue;
		}

		var title = "";
		window.comment = ""; // TODO: что за фигня?

		try {
			nabor.upak[dvig.getzadname(i)].main();
			title = window.comment;
		} catch (e) {} // FIXME: Надо бы проверять, но нужно ли?

		row_indexes.append(create_data_indexes(i, title, nabor.name));
		row_right.append(create_data_right(i, title));
		row_stats.append(create_data_stats(i, title));
		row_time.append(create_data_time(i, title));
	}

	
	row_right.append(create_data_right("", ""));
	row_stats.append(create_data_stats("", ""));

	statstable.append(row_indexes);
	statstable.append(row_right);
	statstable.append(row_stats);
	statstable.append(row_time);
	$("#stats-table-slot").append(statstable);
};


function veroyatn(){
	var pr;
	for(var i=1;i<=nabor.nZad;i++){
		pr=umka.verno[i]/umka.vsego[i];
		$('#r-B'+i).html(
			umka.vsego[i]>4?
			(pr*100).toFixedLess(0)+'%':
			''
		);
		$('#right-B'+i).html(
			umka.verno[i]
		);
		$('#total-B'+i).html(
			umka.vsego[i]
		);
		if(umka.kvoNaVremya[i]){
			$('#time-B'+i).html(
				(umka.vremya[i]/umka.kvoNaVremya[i]).round().toDvoet()
			);
		}
		$('#r-B'+i).css(
			'background-color',
			pr>0.5?
			cvetMezhdu(zhelt,zelen,pr*2-1):
			cvetMezhdu(krasn,zhelt,pr*2)
		);
	}
	pr=umka.verno.sum()/umka.vsego.sum();
	$('#r-B').html(
		umka.vsego.sum()>4?
		(umka.verno.sum()/umka.vsego.sum()*100).toFixedLess(0)+'%':
		''
	);
	$('#right-B').html(
		umka.verno.sum()
	);
	$('#total-B').html(
		umka.vsego.sum()
	);
	$('#r-B').css(
		'color',
		pr>0.5?
		cvetMezhdu(zhelt,zelen,pr*2-1):
		cvetMezhdu(krasn,zhelt,pr*2)
	);	
}

function obnov(p1){
	slvopr=p1;
	$('#pole').html(slvopr.txt);
	slvopr.trd();
	MathJax.Hub.Typeset();
	$('#otvet').html(slvopr.ver.join(';;'));
	$('#never').html(slvopr.nev.join(';;'));
	$("#otvet").css("display", "block");
	$("#never").css("display", "block");
	vremyaStart=new Date().getTime();
}

function vybrZad(){
	for(var i=1;i<=nabor.nZad;i++)
		v[i]=($('#checkbox-B'+i).is(':checked')?1:0);
	var w=[];
	for(var i=1;i<=nabor.nZad;i++)
		if(v[i])
			w.push(i);
	if(!w.length){
		$('#pole').html('Хотя бы один тип заданий должен быть выбран! <button onclick="vybrv();">Выбрать все</button>');
		return;
	}
	if($("#radio-sluch").prop("checked"))
		return w.iz();
	if($("#radio-porad").prop("checked")){
		var tekzad=n?n:0;
		for(var i=0;w[i]<=tekzad;i++);
		return w[i]?w[i]:w[0];
	}
	if($("#radio-umka" ).prop("checked")){
		var masV=[];
		for(var i=1;i<=nabor.nZad;i++)
			if(v[i] && (umka.vsego[i]<5))
				return i;
		for(var i=1;i<=nabor.nZad;i++)
			if(v[i])
				masV.push(1.1-umka.verno[i]/umka.vsego[i])
			else
				masV.push(0);
		return masV.sVeroyatn()+1;
	}
	return w.iz();
}


function sozdat(){
	strelkaEst=0;
	n=vybrZad();
	if(n==undefined)
		return;
	dvig.zadan(obnov,n);
	zdnSost();
}


function podobnoe(){
	dvig.zadan(obnov,n,nomer);
	zdnSost();
}


function zdnSost(){
	vazhnOn();
	if(!checkJQuery('sozdat()','pole'))
		return;
	if(!checkMathJax('sozdat()','pole'))
		return;
	$('#pole').html('Задание составляется, подождите...');
	$('#protv').hide();
	$('#otv').val('');
	$('#prov').unbind('click');
	$('#prov').bind('click',prover);
	$("#prov").removeClass("disabled");
	$("#sozd").addClass("disabled");
	$("#podob").addClass("disabled");
	// FIXME: setVKI();
	// VKI_attach(document.getElementById('otv'));
	flProv=0;
	$('#bnomer').show().html(dvig.getzadname(n));

	$("#qst").css("display", "block");
}

function prover(){
	vazhnOff();
	var flUchetPrav=0;
	var kand=$('#otv').val();
	if(kand===''){
		if(!confirm('Вы не ввели ответ, нажмите "Отмена" для того, чтобы ввести ответ или "ОК", чтобы сдаться и посмотреть ответ.'))
			return;
		uchetPrav(n,'N');
		flUchetPrav=1;
	}
	$('#protv').show();
	var checkPraviln=$('#check-praviln').is(':checked')
	if(checkPraviln){
		umka.vsego[n]++;
	}
	var txt='';

	if(slvopr.vrn(kand)){
		if(checkPraviln){
			umka.verno[n]++;
		}
		txt='Правильно!';
		uchetPrav(n,1);
	}else{
		txt='Неправильно! Правильный ответ: '+slvopr.ver.join(' или ');
		if(!flUchetPrav)
			uchetPrav(n,0);
	}

	if($('#check-na-vremya').is(':checked')){
		umka.vremya[n]+=(new Date().getTime()-vremyaStart)/1000;
		umka.kvoNaVremya[n]++;
	}
	if(vopr.rsh)
		txt+='<br/><br/>'+vopr.rsh;
	$('#protv').html(txt);
	MathJax.Hub.Typeset();
	$("#prov").addClass("disabled");
	$("#sozd").removeClass("disabled");
	$("#podob").removeClass("disabled");
	sohrUmka();
	veroyatn();
	specCounter('sluch');
	flProv=1;
}


function uchetPrav(kat,prav,nom){
	if(svinta)
		return;
	var ifr=document.createElement('iframe');
	ifr.src='../sh/sluchcounter.html?'+nabor.name+'/'+kat+'#'+prav;
	ifr.style.display='none';
	ifr.style.top='-9999px';
	ifr.style.position='absolute';
	document.body.appendChild(ifr);
}


function vybrv(){
	for(var i=1;i<=nabor.nZad;i++){
		$('#checkbox-B'+i).not(':checked').click();
	}
}


function obrabNaVremya(){
	if($('#check-na-vremya').is(':checked')){
		$('.vremya').show();
	}else{
		$('.vremya').hide();
	}
}


function obrabPraviln(){
	if($('#check-praviln').is(':checked')){
		$('.praviln').show();
	}else{
		$('.praviln').hide();
	}
}


function vybr0(){
	for(var i=1;i<=nabor.nZad;i++){
		$('#checkbox-B'+i).removeAttr('checked');
	}
}


function strelkaDvig(){
	if(!strelkaEst){
		$('#strelka').remove();
		return;
	}
	$('#strelka').animate({left:'-=20'},{duration:1000});
	$('#strelka').animate({left:'+=20'},{duration:1000,complete:strelkaDvig});
	// $('#sozd').animate({opacity:'0.5'},{duration:1000});
	// $('#sozd').animate({opacity:'1'},{duration:1000});

}

(function(){
//function startShell() {
	initializeStatsTable();
	zagrUmka();
	veroyatn();

	$(obrabNaVremya);
	$(obrabPraviln);

	strelkaDvig();
	$("#prov").addClass("disabled");
	$("#podob").addClass("disabled");
	galkiKat('#galki_kat','sluch');
	spoiler();

	$("#otv").keyup(function(event) {
		if(nabor.mnogostrOtvet || flProv)
			return true;
		if(event.keyCode==13){
			prover();
			return false;
		}
	});
//}
})();
