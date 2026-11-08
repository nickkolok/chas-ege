(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let rand = sl(0, 1);
        let randOfSickness = sl(0, 1);

        let getSickAtSchool = ['школе', 'университете', 'ВУЗе', 'детском садике'].iz();
        let getSickInHospital = ['больнице', 'клинике', 'лечебнице', 'госпитале', 'стационаре', 'лазарете'].iz();
        let whereTheyGetSick = [getSickAtSchool, getSickInHospital][randOfSickness];

        let illnessInSchool = ['гриппом', 'корью', 'ОРВИ', 'ангиной', 'гепатитом А', 'простудой', 'дифтерией',].iz();
        let illnessInTheHospital = ['туберкулёзом', 'гепатитом В', 'бронхитом', 'COVID-19', 'золотистым стафилококком'].iz();
        let typeOfSickness = [illnessInSchool, illnessInTheHospital][randOfSickness];

        let decreasedByHowMuchGet = [2, 4, 5, 10, 20, 25, 50].iz();
        let increasedByHowMuchGet = sl(2, 5, 0.1);

        let increasedOrDecreased = ['увеличилось', 'уменьшилось'][rand];
        let byHowMuchGet = [increasedByHowMuchGet, decreasedByHowMuchGet][rand];

        NAtask.setTask({
            text:
                'Число больных ' + typeOfSickness + ' в ' + whereTheyGetSick + ' ' + increasedOrDecreased + ' за месяц в ' + chislitlx(byHowMuchGet, 'раз', '$') + '.' +
                ' На сколько процентов ' + increasedOrDecreased + ' число больных ' + typeOfSickness + '?',
            answers: [100 * increasedByHowMuchGet - 100, 100 - 100 / decreasedByHowMuchGet][rand],
        });
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=511916
//zer00player
