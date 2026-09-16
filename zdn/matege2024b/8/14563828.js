(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let key = '14563828';
        let preference = ['findTrue', 'findFalse'];
        let rand = getSelectedPreferenceFromList(key, preference);
        let nCorrect = sl(1, 3);
        let nWrong = 4 - nCorrect;

        let scene = [{
            genPl: 'дачников в посёлке',
            nomSgIz: 'дачник из этого посёлка',
            nomSgV: 'дачник в этом посёлке',
            nomPlIz: 'дачники из этого посёлка',
            nomPlV: 'дачники в этом посёлке',
            crop1: 'виноград',
            crop2: 'груши',
        }, {
            genPl: 'садоводов в товариществе',
            nomSgIz: 'садовод из этого товарищества',
            nomSgV: 'садовод в этом товариществе',
            nomPlIz: 'садоводы из этого товарищества',
            nomPlV: 'садоводы в этом товариществе',
            crop1: 'яблоки',
            crop2: 'сливы',
        }, {
            genPl: 'огородников в деревне',
            nomSgIz: 'огородник из этой деревни',
            nomSgV: 'огородник в этой деревне',
            nomPlIz: 'огородники из этой деревни',
            nomPlV: 'огородники в этой деревне',
            crop1: 'огурцы',
            crop2: 'помидоры',
        }, {
            genPl: 'фермеров в округе',
            nomSgIz: 'фермер из этого округа',
            nomSgV: 'фермер в этом округе',
            nomPlIz: 'фермеры из этого округа',
            nomPlV: 'фермеры в этом округе',
            crop1: 'картофель',
            crop2: 'овёс',
        }].iz();

        let correct = [
            `Есть хотя бы один ${scene.nomSgV}, который выращивает и ${scene.crop2}, и ${scene.crop1}.`,
            `Среди тех, кто выращивает ${scene.crop1}, есть ${scene.nomPlIz}.`,
            `Среди тех, кто выращивает ${scene.crop2}, есть ${scene.nomPlIz}.`,
        ];
        let wrong = [
            `Если ${scene.nomSgIz} не выращивает ${scene.crop1}, то он выращивает ${scene.crop2}.`,
            `Если ${scene.nomSgV} выращивает ${scene.crop1}, то он не выращивает ${scene.crop2}.`,
            `Если ${scene.nomSgV} выращивает ${scene.crop2}, то он не выращивает ${scene.crop1}.`,
            `Каждый ${scene.nomSgIz} выращивает ${scene.crop1} или ${scene.crop2}.`,
            `Среди ${scene.genPl} нет тех, кто выращивает и ${scene.crop1}, и ${scene.crop2}.`,
        ];

        NAtask.setTask({
            text: `Среди ${scene.genPl} есть те, кто выращивает ${scene.crop1}, и есть те, кто выращивает ${scene.crop2}. ` +
                `А также есть те, кто не выращивает ни ${scene.crop1}, ни ${scene.crop2}. ` +
                `Некоторые ${scene.nomPlV}, выращивающие ${scene.crop1}, также выращивают и ${scene.crop2}. ` +
                `Выберите одно или несколько утверждений, которые ` + (rand ? 'неверны' : 'верны') + ` при указанных условиях. ` +
                `В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов. ` +
                `Если ответов несколько, записывайте их номера в порядке возрастания.`,
            answers: rand ? wrong : correct,
            wrongAnswers: rand ? correct : wrong,
            preference: preference,
        });
        AtoB2(nCorrect, nWrong);
    }, 1000);
})();
//14563828
//Открытый банк заданий DE39F4, аналоги: 5D0137, 381F62, F381E1
//chas-ege-selena
