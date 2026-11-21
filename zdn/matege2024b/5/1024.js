(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        'use strict';

        let key = '1024';
        let preference = ['bakery', 'pencils'];
        let pencils = getSelectedPreferenceFromList(key, preference);
        let kinds = [
            ['твёрдый', 'твёрдых', 'с твёрдым грифелем'],
            ['мягкий', 'мягких', 'с мягким грифелем'],
            ['средней твёрдости', 'средней твёрдости', 'с грифелем средней твёрдости'],
        ];
        let counts = generateMatrix(1, pencils ? kinds.length : sl(3, 5), 1, pencils ? 20 : 7).iz();
        let selectedItem = sl(0, counts.length - 1);
        let answer = counts[selectedItem] / counts.sum();
        genAssertZ1000(answer);

        if (pencils) {
            let countsWithKinds = counts.map((count, i) =>
                '$' + count + '$ ' + chislit(count, kinds[i][0], kinds[i][1], kinds[i][1]));
            NAtask.setTask({
                text: 'В пенале лежат грифельные карандаши разной твёрдости: ' + countsWithKinds.joinLast(' и ') +
                    '. Какова вероятность того, что случайным образом достанут карандаш ' + kinds[selectedItem][2] + '?',
                answers: answer,
                preference,
            });
            return;
        }

        let name = [om.maleNames, om.femaleNames].iz().iz();
        let bakeryProducts = sklonlxkand(['пирожок', 'круассан', 'слойка', 'рулет'].iz());

        let fillingForBaking = ['мясом', 'лососем', 'вишней', 'клубникой', 'крыжовником', 'малиной', 'облепихой', 'ежевикой',
            'голубикой', 'арбузом', 'абрикосом', 'изюмом', 'иргой', 'рябиной', 'луком', 'морковкой', 'капустой', 'картошкой'
        ].iz(counts.length);

        let bakeryProductsWithFilling = fillingForBaking.map((filling, index) => '$' + counts[index] + '$ с ' + filling);

        NAtask.setTask({
            text: `На тарелке лежат одинаковые на вид ${bakeryProducts.im}: 
			${bakeryProductsWithFilling.joinLast(' и ')}. ${name} наугад выбирает ${['один', 'одну'][bakeryProducts.rod]} ${bakeryProducts.ve}. 
			Найдите вероятность того, что ${[`этот`, `эта`, `это`, `эти`][bakeryProducts.rod]} ${bakeryProducts.ie} окажется с ${fillingForBaking[selectedItem]}.`,
            answers: answer,
            authors: ['Суматохина Александра'],
            preference,
        });
    }, 100);
})();

// 1024 1025 508391 508411 509655
// 76DC18
// 108D23
// 26AF97
// B56EB0
// C1CA1F
