(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let rand = sl1();
        let randMoreOrLess = sl1();
        let studentBoy = sklonlxkand(['мальчик', 'юноша', 'парень', 'ученик', 'студент'].iz());
        let studentGirl = sklonlxkand(['девочка', 'девушка', 'ученица', 'студентка'].iz());
        let boyOrGirl = [studentBoy, studentGirl][rand];
        let girlOrBoy = [studentBoy, studentGirl][1 - rand];
        let educationInstitution = sklonlxkand(['школа', 'колледж', 'университет', 'ВУЗ', 'техникум', 'лицей'].iz());
        let firstHalfOfStudent = 100 - sl(20, 49, 1);
        let differenceInNumberOfStudent = sl(4, 100, 1);

        genAssert(differenceInNumberOfStudent.kratno(firstHalfOfStudent - (100 - firstHalfOfStudent)), "разница учеников в количестве не кратка разнице учеников в %");

        let result = differenceInNumberOfStudent / (firstHalfOfStudent - (100 - firstHalfOfStudent));

        NAtask.setTask({
            text:
                'В ' + educationInstitution.pe + ' ' + boyOrGirl.im + ' составляют ' + firstHalfOfStudent +
                '% числа всех учащихся.' + ' Сколько всего ',

            questions: [
                {
                    text: 'учащихся ',
                    answers: result * 100,
                },
                {
                    text: boyOrGirl.rm,
                    answers: result * firstHalfOfStudent,
                },
                {
                    text: girlOrBoy.rm,
                    answers: result * (100 - firstHalfOfStudent),
                },
            ],
            postquestion: ' в ' + educationInstitution.pe + ', если ' + [boyOrGirl, girlOrBoy][randMoreOrLess].rm +
                ' там на ' + differenceInNumberOfStudent + ' учащихся ' + ['больше', 'меньше'][randMoreOrLess] + ', чем ' +
                [girlOrBoy, boyOrGirl][randMoreOrLess].rm + '?',
        });
    }, 100);
})();
