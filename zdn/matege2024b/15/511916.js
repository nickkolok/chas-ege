(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);


        let rand = sl(0, 6);
        let whereTheyGetSick = ['школе', 'университете', 'ВУЗе', 'детском садике', 'стационаре'].iz();
        let typeOfSickness = ['гриппом', 'корью', 'туберкулёзом', 'гепатитом В', 'ОРВИ', 'бронхитом', 'COVID-19', 'гриппом', 'ангиной'].iz();
        let decreasedByHowMuch = [2, 4, 5, 10, 20, 25, 50][rand];

        NAtask.setTask({
            text:
                'Число больных ' + typeOfSickness + ' в ' + whereTheyGetSick + ' уменьшилось за месяц в ' + chislitlx(decreasedByHowMuch, 'раз', '$') + '.' +
                ' На сколько процентов уменьшилось число больных ' + typeOfSickness + '?',
            answers: 100 - (100 / decreasedByHowMuch),
        });
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=511916
//zer00player
