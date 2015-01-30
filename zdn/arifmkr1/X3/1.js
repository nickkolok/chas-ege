(function(){
    'use strict';
    NAinfo.requireApiVersion(0, 0);

    var a=sl(-100,100,0.001);
    var b=sl(-100,100,0.001);
    var sign=sl1();

    NAtask.setTask({
        text: "$$"+a.ts(1)+["+","-"][sign]+b.ts(1).negativeBracketsTeX()+"=$$",
        answers: [a+b,a-b][sign],
    
    });
})();
