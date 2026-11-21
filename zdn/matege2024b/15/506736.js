(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let key = '506736';
        let preference1 = ['winner', 'loser'];
        let preference2 = ['numberOfPeopleWhoVotedThatWeNeed', 'numberOfParticipants'];
        let rand = getSelectedPreferenceFromList(key, preference1);
        let randUpgrade = getSelectedPreferenceFromList(key, preference2);
        let post = ['председателя', 'заместителя председателя', 'секретаря'].iz();
        let educationPlace = ['школьного', 'университетского'].iz();

        let winOrLose = ['победитель', 'проигравший'][rand];
        let numberOfParticipants = sl(70, 200, 1);
        let loserRatio = sl(1, 10, 1);
        let winnerRatio = loserRatio + sl(1, 10, 1);

        genAssertIrreducible(winnerRatio, loserRatio, 'победитель и проигравший имеют общие множители по мимо 1 ');
        genAssert(numberOfParticipants.kratno(loserRatio + winnerRatio), 'количество участников не кратко сумме отношения');

        let numberOfVotesInOnePart = numberOfParticipants / (loserRatio + winnerRatio);
        let numberOfPeopleWhoVotedThatWeNeed = [numberOfVotesInOnePart * winnerRatio, numberOfVotesInOnePart * loserRatio][rand];

        NAtask.setTask({
            text:
                'На пост ' + post + ' ' + educationPlace + ' совета претендовали два кандидата.' + [' В голосовании приняли участие ' + chislitlx(numberOfParticipants, 'выборщик', 'v$') + '.', ''][randUpgrade] +
                ' Голоса между кандидатами распределились в отношении ' + '$' + loserRatio + ':' + winnerRatio + '$' + ['. Сколько голосов получил ' + winOrLose,
                '. Сколько голосов было изначально, если ' + winOrLose + ' получил ' + chislitlx(numberOfPeopleWhoVotedThatWeNeed, 'голос', '$')][randUpgrade] + '?',
            answers: [numberOfPeopleWhoVotedThatWeNeed, numberOfParticipants][randUpgrade],
            preference: [preference1, preference2],
        });
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=506736
//zer00player
