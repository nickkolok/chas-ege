dvig.dgn=0;//Отключаем диагностический режим движка. Под корень.
var flAce=0;
var editor;
var flFullscreen=0;

function updateQuestion(){
	$("#question").html(window.vopr.txt);
	$("#resh").html(vopr.rsh);
	window.vopr.dey();
	$("#answer").html(window.vopr.ver.join(";;"));
	$("#wrongAnswer").html(window.vopr.nev.join(";;"));
	MathJax.Hub.Typeset('typesettable-wrap');
}

function createFromFile(){
	if(!checkJQuery ("createFromFile()","pole"))
		return;
	if(!checkMathJax("createFromFile()","pole"))
		return;
	$("#question").html("Задание составляется, подождите...");
	v=$("#filepath").val();
	if(!v.length){
		$("#question").html("Нужно указать путь к загружаемому файлу!");
		return;
	}
	$("#shabl").attr("src",v);
	window.vopr.podg();
	zagr(v+"?"+Math.random());
	dvig.flObn=0;
	dvig.startxt=window.vopr.txt;
	dvig.obnov(updateQuestion);
	$("#answer-input").val("");
	$("#answer").hide();
	setVKI();
	VKI_attach(document.getElementById("answer-input"));
}

function checkAnswer(){
	if(window.vopr.vrn($("#answer-input").val())){
		alert("Правильно!");
	}else{
		alert("Неправильно!\nПравильный ответ: " + window.vopr.ver.join(" или "));
		$("#answer").show();
	}
	MathJax.Hub.Typeset('typesettable-wrap');
}

function createFromTextarea(){
	saveAce();
	$("#question").html("Если Вы видите эту надпись - задание не составлено, скорее всего, в программе ошибка.");
	var code=nabrano();
	try {
		if(isCppCode(code)){
			//Костыль, но положим, что это С++
			//TODO: подумать, может, хоть переключатель сделать?
			//TODO: ACE работает в режиме JS. Перевести в С++.
			chas2.task.setJscppTask(code);
		}else{
				eval(code);
		}
	} catch (e) {
		$("#question").html(e.message.replace(/\n/g,'<br/>'));
		console.error(e);
		return;
	}
	updateQuestion();
}

function tt(){
	saveAce();
	var t1=new Date().getTime();
	var code=nabrano();
	var iter=1*$("#iter").val();
	for(var i=iter;i;i--)
		eval(code);
	var t2=new Date().getTime();
	alert("Примерно "+(t2-t1)/iter+" сек.");
}

function enableAce(){
	var aceSize=1*$("#ace-size").val();
	var aceRows=1*$("#ace-rows").val();
	$("#ace-script")[0].style.position="relative";
	$("#ace-script")[0].style.height=aceSize*aceRows+"px";
	$("#ace-script")[0].style.textAlign="left";

	$("#ace-script").html($("#textarea-script").val().replace(/</g,"&lt;").replace(/>/g,"&gt;"));
	$("#textarea-script").hide();
	editor = ace.edit("ace-script");
	editor.session.on("changeMode", function(e, session){
		if ("ace/mode/javascript" === session.getMode().$id) {
			if (!!session.$worker) {
				session.$worker.send("setOptions", [{
					"esversion": 7, //ES7
					"esnext": false,
				}]);
			}
		}
	});
	editor.getSession().setUseSoftTabs(false);
	editor.getSession().setMode("ace/mode/javascript");
	editor.setFontSize(aceSize);
	$("#vklpodsv").hide();
	flAce=1;
}

function nabrano(){
	if(flAce)
		return editor.getValue();
	else
		return $("#textarea-script").val();
}

function saveAce(){
	if(flAce)
		$("#textarea-script").val(editor.getValue());
	chasStorage.domData.save();
}

function beautifyCode(){
	saveAce();
	var code=$("#textarea-script").val();
	if(isCppCode(code)){
		$("#textarea-script").val(code);
	} else {
		var beautifiedCode=js_beautify(code, {
			'indent_size': 1,
			'indent_char': '\t',
			'end_with_newline':true,
			'wrap_line_length':120,
			'jslint_happy':true,
			'opt.space_after_anon_function':false,
		});
		if(code!=beautifiedCode){
			alert("Обратите внимание: код шаблона не соответствует соглашениям, принятым в проекте."+
				"В редактор помещена скорректированная версия.");
		}
		if(flAce) {
			editor.setValue(beautifiedCode,1);
		}
		else {
			$("#textarea-script").val(beautifiedCode);
		}
	}
}

function startFullscreen(){
	if(flFullscreen || !flAce)
		return;
	editor.beforeFullscreen={
		bodyHeight:document.body.style.height,
		bodyOverflow:document.body.style.overflow,

		height:editor.container.style.height,
		width:editor.container.style.width,
		left:editor.container.style.left,
		top:editor.container.style.top,
		position:editor.container.style.position,
	};

	document.body.style.height="0";
	document.body.style.overflow="hidden";

	editor.container.style.left="0";
	editor.container.style.top="0";
	editor.container.style.width="100%";
	editor.container.style.height="100%";
	editor.container.style.position="fixed";

	editor.resize();

	flFullscreen=1;
}

function stopFullscreen(){
	if(!flFullscreen || ! flAce)
		return;
	document.body.style.height=editor.beforeFullscreen.bodyHeight;
	document.body.style.overflow=editor.beforeFullscreen.bodyOverflow;

	editor.container.style.left=editor.beforeFullscreen.left;
	editor.container.style.top=editor.beforeFullscreen.top;
	editor.container.style.width=editor.beforeFullscreen.width;
	editor.container.style.height=editor.beforeFullscreen.height;
	editor.container.style.position=editor.beforeFullscreen.position;

	editor.resize();

	flFullscreen=0;
}

document.onkeydown = function(e) {
    e = e || event;
    if (e.keyCode == 27) { // escape
        stopFullscreen();
        return false;
    } else if ((e.ctrlKey && e.shiftKey && e.keyCode == "F".charCodeAt(0))) {
        startFullscreen();
        return false;
    }
}

var templateTemplate = "(function() {\n \tretryWhileError(function() {\n\t\tNAinfo.requireApiVersion(" + NAinfo.API_VERSION.major + ", " + NAinfo.API_VERSION.minor + "); \n\t\tNAtask.setTask({\n\t\t\ttext: '',\n\t\t\tanswers: 0,\n\t\t\tanalys: '',\n\t\t});\n\t});\n})();";

var startShell = function (){
	zagr("../ext/keyboard/keyboard.js");
	if ($("#textarea-script").val() == "") {
		$("#textarea-script").val(templateTemplate);
		chasStorage.domData.save();
	}
}



function startExport(){
	vopr.template = $("#filepath").val().replace(/^(\.\.\/)+/,'');
	vopr.taskNumber = vopr.template.split("/").reverse()[1];

	replaceCanvasWithImgInTaskAndHTML($('#question')[0], vopr, function(){
		var fillerCode = createFiller(vopr);
		copyToClipboard(fillerCode)
	});
}
