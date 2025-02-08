(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let post = ['председателя', 'заместителя председателя', 'секретаря'].iz();
        let educationPlace = ['школьного', 'университетского'].iz();
        let rand = sl(0, 1);
        let winOrLose = ['победитель', 'проигравший'][rand];
        let numberOfParticipants = sl(70, 120, 1);
        let loserRatio = sl(1, 4, 1);
        let winnerRatio = loserRatio + sl(1, 5, 1);

        genAssert(numberOfParticipants.kratno(loserRatio + winnerRatio), 'количество участников не кратко сумме отношения');

        let numberOfVotesInOnePart = numberOfParticipants / (loserRatio + winnerRatio);
        let numberOfPeopleWhoVotedThatWeNeed = [numberOfVotesInOnePart * winnerRatio, numberOfVotesInOnePart * loserRatio][rand];

        NAtask.setTask({
            text:
                'На пост ' + post + ' ' + educationPlace + ' совета претендовали два кандидата. В голосовании приняли участие ' + chislitlx(numberOfParticipants, 'выборщик', 'v$') +
                '. Голоса между кандидатами распределились в отношении ' + loserRatio + ':' + winnerRatio + '. Сколько голосов получил ' + winOrLose + '?',
            answers: numberOfPeopleWhoVotedThatWeNeed,
        });
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=506736
//zer00player
