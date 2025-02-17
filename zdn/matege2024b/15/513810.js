(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
    
        let rand = sl1();
        let randUpgrade = sl(0, 2);
        let randMoreOrLess = sl1();
        let studentBoy = sklonlxkand(['мальчик', 'юноша', 'парень', 'ученик', 'студент'].iz());
        let studentGirl = sklonlxkand(['девочка', 'девушка', 'ученица', 'студентка'].iz());
        let educationInstitution = sklonlxkand(['школа', 'колледж', 'университет', 'ВУЗ', 'техникум', 'лицей'].iz());
        let firstHalfOfStudent = 100 - sl(20, 49, 1);
        let differenceInNumberOfStudent = sl(4, 100, 1);

        genAssert(differenceInNumberOfStudent.kratno(firstHalfOfStudent - (100 - firstHalfOfStudent)), "разница учеников в количестве не кратка разнице учеников в %");


        NAtask.setTask({
            text:
                'В ' + educationInstitution.pe + ' ' + [studentBoy, studentGirl][rand].im + ' составляют ' + firstHalfOfStudent +
                '% числа всех учащихся.' + ' Сколько всего ' +
                ['учащихся в ' + educationInstitution.pe + ', если ' + [[studentBoy, studentGirl][rand], [studentGirl, studentBoy][rand]][randMoreOrLess].rm +
                    ' там на ' + differenceInNumberOfStudent + ' учащихся ' + ['больше', 'меньше'][randMoreOrLess] + ', чем ' +
                    [[studentGirl, studentBoy][rand], [studentBoy, studentGirl][rand]][randMoreOrLess].rm,

                [studentBoy, studentGirl][rand].rm + ' в ' + educationInstitution.pe + ', если ' +
                [[studentBoy, studentGirl][rand], [studentGirl, studentBoy][rand]][randMoreOrLess].rm + ' там на ' +
                differenceInNumberOfStudent + ' учащихся ' + ['больше', 'меньше'][randMoreOrLess] + ', чем ' +
                [[studentGirl, studentBoy][rand], [studentBoy, studentGirl][rand]][randMoreOrLess].rm,

                [studentGirl, studentBoy][rand].rm + ' в ' + educationInstitution.pe + ', если ' +
                [[studentBoy, studentGirl][rand], [studentGirl, studentBoy][rand]][randMoreOrLess].rm + ' там на ' +
                differenceInNumberOfStudent + ' учащихся ' + ['больше', 'меньше'][randMoreOrLess] + ', чем ' +
                [[studentGirl, studentBoy][rand], [studentBoy, studentGirl][rand]][randMoreOrLess].rm][randUpgrade] + '?',
            answers: [differenceInNumberOfStudent / (firstHalfOfStudent - (100 - firstHalfOfStudent)) * 100,
            differenceInNumberOfStudent / (firstHalfOfStudent - (100 - firstHalfOfStudent)) * firstHalfOfStudent,
            differenceInNumberOfStudent / (firstHalfOfStudent - (100 - firstHalfOfStudent)) * (100 - firstHalfOfStudent)][randUpgrade],
        });
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=513810
//zer00player
