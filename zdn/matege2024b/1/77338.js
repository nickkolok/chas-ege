
(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let numberOfPeople = sl(50, 100, 1);
        let placeToSleepInOneRoom = sl(2, 5, 1);
        let whoLiveHere = [' мужском ', ' женском ', ' '].iz();
        let educationPlace = [' института ', ' колледжа ', ' вуза ', ' '].iz();
        
        genAssert(!numberOfPeople.kratno(placeToSleepInOneRoom), "Количество мест для сна кратко количеству людей");

        NAtask.setTask({
            text:
                'В' + whoLiveHere + 'общежитии' + educationPlace + 'в каждой комнате можно поселить ' + placeToSleepInOneRoom + '-x человек. ' +
                'Какое наименьшее количество комнат необходимо для поселения ' + numberOfPeople + ' иногородних студентов?',
            answers: (numberOfPeople / placeToSleepInOneRoom).ceil(),
        });

    }, 100);
})();

//https://ege.sdamgia.ru/test?likes=77338
//zer00player


