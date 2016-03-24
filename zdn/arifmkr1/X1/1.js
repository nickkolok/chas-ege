(function(){
    'use strict';
    NAinfo.requireApiVersion(0, 0);

    var a=sl(-100,100);
    var b=sl(-100,100);
    var sign=sl1();

    NAtask.setTask({
        text: "$$"+a+["+","-"][sign]+b.negativeBrackets()+"=$$",
        answers: [a+b,a-b][sign],

    });
})();
