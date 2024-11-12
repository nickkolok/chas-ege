dvig.dgn = 0; // Отключаем диагностический режим движка. Под корень.
let flAce = 0;
let editor;
let flFullscreen = 0;

const updateQuestion = () => {
    $("#question").html(window.vopr.txt);
    $("#resh").html(vopr.rsh);
    window.vopr.dey();
    $("#answer").html(window.vopr.ver.join(";;"));
    $("#wrongAnswer").html(window.vopr.nev.join(";;"));
    MathJax.Hub.Typeset('typesettable-wrap');
};

const createFromFile = () => {
    if (!checkJQuery("createFromFile()", "pole")) return;
    if (!checkMathJax("createFromFile()", "pole")) return;

    $("#question").html("Задание составляется, подождите...");
    const v = $("#filepath").val();
    if (!v.length) {
        $("#question").html("Нужно указать путь к загружаемому файлу!");
        return;
    }
    $("#shabl").attr("src", v);
    window.vopr.podg();
    zagr(`${v}?${Math.random()}`);
    dvig.flObn = 0;
    dvig.startxt = window.vopr.txt;
    dvig.obnov(updateQuestion);
    $("#answer-input").val("");
    $("#answer").hide();
    setVKI();
    VKI_attach(document.getElementById("answer-input"));
};

const checkAnswer = () => {
    if (window.vopr.vrn($("#answer-input").val())) {
        alert("Правильно!");
    } else {
        alert(`Неправильно!\nПравильный ответ: ${window.vopr.ver.join(" или ")}`);
        $("#answer").show();
    }
    MathJax.Hub.Typeset('typesettable-wrap');
};

const createFromTextarea = () => {
    saveAce();
    $("#question").html("Если Вы видите эту надпись - задание не составлено, скорее всего, в программе ошибка.");
    const code = nabrano();
    try {
        if (isCppCode(code)) {
            // Костыль, но положим, что это С++
            // TODO: подумать, может, хоть переключатель сделать?
            // TODO: ACE работает в режиме JS. Перевести в С++.
            chas2.task.setJscppTask(code);
        } else {
            eval(code);
        }
    } catch (e) {
        $("#question").html(e.message.replace(/\n/g, '<br/>'));
        console.error(e);
        return;
    }
    updateQuestion();
};

const tt = () => {
    saveAce();
    const t1 = new Date().getTime();
    const code = nabrano();
    const iter = Number($("#iter").val());
    for (let i = iter; i; i--) eval(code);
    const t2 = new Date().getTime();
    alert(`Примерно ${(t2 - t1) / iter} сек.`);
};

const enableAce = () => {
    const aceSize = Number($("#ace-size").val());
    const aceRows = Number($("#ace-rows").val());
    const aceScript = $("#ace-script")[0];
    aceScript.style.position = "relative";
    aceScript.style.height = `${aceSize * aceRows}px`;
    aceScript.style.textAlign = "left";

    $("#ace-script").html($("#textarea-script").val().replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    $("#textarea-script").hide();
    editor = ace.edit("ace-script");
    editor.session.on("changeMode", (e, session) => {
        if ("ace/mode/javascript" === session.getMode().$id) {
            if (session.$worker) {
                session.$worker.send("setOptions", [{
                    "esversion": 7, // ES7
                    "esnext": false,
                }]);
            }
        }
    });
    editor.getSession().setUseSoftTabs(false);
    editor.getSession().setMode("ace/mode/javascript");
    editor.setFontSize(aceSize);
    $("#vklpodsv").hide();
    flAce = 1;
};

const nabrano = () => flAce ? editor.getValue() : $("#textarea-script").val();

const saveAce = () => {
    if (flAce) $("#textarea-script").val(editor.getValue());
    chasStorage.domData.save();
};

const beautifyCode = () => {
    saveAce();
    const code = $("#textarea-script").val();
    if (isCppCode(code)) {
        $("#textarea-script").val(code);
    } else {
        const beautifiedCode = js_beautify(code, {
            'indent_size': 1,
            'indent_char': '\t',
            'end_with_newline': true,
            'wrap_line_length': 120,
            'jslint_happy': true,
            'opt.space_after_anon_function': false,
        });
        if (code !== beautifiedCode) {
            alert("Обратите внимание: код шаблона не соответствует соглашениям, принятым в проекте." +
                "В редактор помещена скорректированная версия.");
        }
        if (flAce) {
            editor.setValue(beautifiedCode, 1);
        } else {
            $("#textarea-script").val(beautifiedCode);
        }
    }
};

const startFullscreen = () => {
    if (flFullscreen || !flAce) return;
    editor.beforeFullscreen = {
        bodyHeight: document.body.style.height,
        bodyOverflow: document.body.style.overflow,
        height: editor.container.style.height,
        width: editor.container.style.width,
        left: editor.container.style.left,
        top: editor.container.style.top,
        position: editor.container.style.position,
    };

    document.body.style.height = "0";
    document.body.style.overflow = "hidden";

    editor.container.style.left = "0";
    editor.container.style.top = "0";
    editor.container.style.width = "100%";
    editor.container.style.height = "100%";
    editor.container.style.position = "fixed";

    editor.resize();

    flFullscreen = 1;
};

const stopFullscreen = () => {
    if (!flFullscreen || !flAce) return;
    document.body.style.height = editor.beforeFullscreen.bodyHeight;
    document.body.style.overflow = editor.beforeFullscreen.bodyOverflow;

    editor.container.style.left = editor.beforeFullscreen.left;
    editor.container.style.top = editor.beforeFullscreen.top;
    editor.container.style.width = editor.beforeFullscreen.width;
    editor.container.style.height = editor.beforeFullscreen.height;
    editor.container.style.position = editor.beforeFullscreen.position;

    editor.resize();

    flFullscreen = 0;
};

document.onkeydown = (e) => {
    e = e || event;
    if (e.keyCode === 27) { // escape
        stopFullscreen();
        return false;
    } else if (e.ctrlKey && e.shiftKey && e.keyCode === "F".charCodeAt(0)) {
        startFullscreen();
        return false;
    }
};

const templateTemplate = `(function() {
    retryWhileError(function() {
        NAinfo.requireApiVersion(${NAinfo.API_VERSION.major}, ${NAinfo.API_VERSION.minor});
        NAtask.setTask({
            text: '',
            answers: 0,
            analys: '',
        });
    });
})();`;

var startShell = function (){
    zagr("../ext/keyboard/keyboard.js");
    if ($("#textarea-script").val() === "") {
        $("#textarea-script").val(templateTemplate);
        chasStorage.domData.save();
    }
};

const startExport = () => {
    vopr.template = $("#filepath").val().replace(/^(\.\.\/)+/, '');
    vopr.taskNumber = vopr.template.split("/").reverse()[1];

    replaceCanvasWithImgInTaskAndHTML($('#question')[0], vopr, () => {
        const fillerCode = createFiller(vopr);
        copyToClipboard(fillerCode);
    });
};
