// Отключаем диагностический режим движка.
dvig.dgn = 0;
let flAce = 0;
let editor;
let flFullscreen = 0;

/**
 * Обновляет содержимое вопроса и ответов на странице.
 */
const updateQuestion = () => {
    $("#question").html(window.vopr.txt);
    $("#resh").html(window.vopr.rsh);
    window.vopr.dey();
    $("#answer").html(window.vopr.ver.join(";;"));
    $("#wrongAnswer").html(window.vopr.nev.join(";;"));
    MathJax.Hub.Typeset('typesettable-wrap');
};

/**
 * Создает задание из файла, загруженного пользователем.
 */
const createFromFile = () => {
    if (!checkJQuery("createFromFile()", "pole") || !checkMathJax("createFromFile()", "pole")) return;

    $("#question").html("Задание составляется, подождите...");
    const filePath = $("#filepath").val();
    if (!filePath.length) {
        $("#question").html("Нужно указать путь к загружаемому файлу!");
        return;
    }
    $("#shabl").attr("src", filePath);
    window.vopr.podg();
    zagr(`${filePath}?${Math.random()}`);
    dvig.flObn = 0;
    dvig.startxt = window.vopr.txt;
    dvig.obnov(updateQuestion);
    $("#answer-input").val("");
    $("#answer").hide();
    setVKI();
    VKI_attach(document.getElementById("answer-input"));
};

/**
 * Проверяет правильность ответа пользователя.
 */
const checkAnswer = () => {
    const userAnswer = $("#answer-input").val();
    const correctAnswer = window.vopr.ver.join(" или ");
    if (window.vopr.vrn(userAnswer)) {
        alert("Правильно!");
    } else {
        alert(`Неправильно!\nПравильный ответ: ${correctAnswer}`);
        $("#answer").show();
    }
    MathJax.Hub.Typeset('typesettable-wrap');
};

/**
 * Создает задание из текста, введенного в текстовое поле.
 */
const createFromTextarea = () => {
    saveAce();
    $("#question").html("Если Вы видите эту надпись - задание не составлено, скорее всего, в программе ошибка.");
    const code = nabrano();
    try {
        if (isCppCode(code)) {
            chas2.task.setJscppTask(code);
        } else {
            new Function(code)();
        }
    } catch (e) {
        $("#question").html(e.message.replace(/\n/g, '<br/>'));
        console.error(e);
        return;
    }
    updateQuestion();
};

/**
 * Измеряет время выполнения кода, введенного пользователем.
 */
const tt = () => {
    saveAce();
    const t1 = Date.now();
    const code = nabrano();
    const iter = Number($("#iter").val());
    for (let i = iter; i; i--) new Function(code)();
    const t2 = Date.now();
    alert(`Примерно ${(t2 - t1) / iter} сек.`);
};

/**
 * Включает редактор Ace и настраивает его параметры.
 */
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
            session.$worker?.send("setOptions", [{
                "esversion": 7,
                "esnext": false,
            }]);
        }
    });
    editor.getSession().setUseSoftTabs(false);
    editor.getSession().setMode("ace/mode/javascript");
    editor.setFontSize(aceSize);
    $("#vklpodsv").hide();
    flAce = 1;
};

/**
 * Возвращает текст, введенный пользователем в редакторе или текстовом поле.
 */
const nabrano = () => flAce ? editor.getValue() : $("#textarea-script").val();

/**
 * Сохраняет текущее состояние редактора Ace в текстовое поле.
 */
const saveAce = () => {
    if (flAce) $("#textarea-script").val(editor.getValue());
    chasStorage.domData.save();
};

/**
 * Форматирует код в текстовом поле или редакторе Ace.
 */
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

/**
 * Переключает редактор Ace в полноэкранный режим.
 */
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

/**
 * Выключает полноэкранный режим редактора Ace.
 */
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

/**
 * Обрабатывает нажатия клавиш для управления полноэкранным режимом.
 */
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

/**
 * Инициализирует оболочку и загружает шаблон, если текстовое поле пустое.
 */
var startShell = function (){
    zagr("../ext/keyboard/keyboard.js");
    if ($("#textarea-script").val() === "") {
        $("#textarea-script").val(templateTemplate);
        chasStorage.domData.save();
    }
};

/**
 * Экспортирует задание, заменяя холсты изображениями.
 */
const startExport = () => {
    vopr.template = $("#filepath").val().replace(/^(\.\.\/)+/, '');
    vopr.taskNumber = vopr.template.split("/").reverse()[1];

    replaceCanvasWithImgInTaskAndHTML($('#question')[0], vopr, () => {
        const fillerCode = createFiller(vopr);
        copyToClipboard(fillerCode);
    });
};
