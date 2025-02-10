(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let rand = sl(0, 1);
        let randOfSickness = sl(0, 1);

        let theGetSickAtSchool = ['школе', 'университете', 'ВУЗе', 'детском садике'].iz();
        let theySickinHospital = ['больнице', 'клинике', 'лечебнице', 'госпитале', 'стационаре', 'лазарете'].iz();
        let whereTheyGetSick = [theGetSickAtSchool, theySickinHospital][randOfSickness];

        let illnessInSchool = ['гриппом', 'корью', 'ОРВИ', 'гриппом', 'ангиной', 'гепатитом А', 'простудой', 'дифтерией', 'простудой'].iz();
        let illnessesInTheHospital = ['туберкулёзом', 'гепатитом В', 'бронхитом', 'COVID-19', 'золотистым стафилококком'].iz();
        let typeOfSickness = [illnessInSchool, illnessesInTheHospital][randOfSickness];

        let decreasedByHowMuchGet = [2, 4, 5, 10, 20, 25, 50].iz();
        let increasedByHowMuchGet = sl(2, 5, 0.1);

        let increasedOrDecreased = ['увеличилось', 'уменьшилось'][rand];
        let ByHowMuchGet = [increasedByHowMuchGet, decreasedByHowMuchGet][rand];

        let result = [100 * increasedByHowMuchGet - 100, 100 - 100 / decreasedByHowMuchGet][rand];

        NAtask.setTask({
            text:
                'Число больных ' + typeOfSickness + ' в ' + whereTheyGetSick + ' ' + increasedOrDecreased + ' за месяц в ' + chislitlx(ByHowMuchGet, 'раз', '$') + '.' +
                ' На сколько процентов ' + increasedOrDecreased + ' число больных ' + typeOfSickness + '?',
            answers: result,
        });
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=511916
//zer00player
