(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        'use strict';

        let key = '1024';
        let preference = ['bakery', 'pencils'];
        let context = getSelectedPreferenceFromList(key, preference);
        let bakeryArray = generateMatrix(1, (context ? 3 : sl(3, 5)), 1, 20).iz();
        let numberOfBakeryProducts = bakeryArray.sum();
        let selectedProduct = sl(0, bakeryArray.length - 1);
        let name = [om.maleNames, om.femaleNames].iz().iz();
        genAssertZ1000(bakeryArray[selectedProduct] / numberOfBakeryProducts);

        let bakeryProducts = sklonlxkand(['пирожок', 'круассан', 'слойка', 'рулет'].iz());

        let fillingForBaking = ['мясом', 'лососем', 'вишней', 'клубникой', 'крыжовником', 'малиной', 'облепихой', 'ежевикой',
            'голубикой', 'арбузом', 'абрикосом', 'изюмом', 'иргой', 'рябиной', 'луком', 'морковкой', 'капустой', 'картошкой'
        ].iz(bakeryArray.length);

        let bakeryProductsWithFilling = fillingForBaking.map((filling, index) => '$' + bakeryArray[index] + '$ c ' + filling);

        if (context) {
            let kinds = ['твёрдых', 'мягких', 'средней твёрдости'];
            NAtask.setTask({
                text: 'В пенале лежат грифельные карандаши разной твёрдости: ' + bakeryArray.map((n, i) => '$' + n + '$ ' + kinds[i]).joinLast(' и ') + '. Какова вероятность того, что случайным образом достанут карандаш ' + ['с твёрдым грифелем', 'с мягким грифелем', 'с грифелем средней твёрдости'][selectedProduct] + '?',
                answers: bakeryArray[selectedProduct] / numberOfBakeryProducts, preference,
            });
            return;
        }
        NAtask.setTask({
            text: `На тарелке лежат одинаковые на вид ${bakeryProducts.im}: 
			${bakeryProductsWithFilling.joinLast(' и ')}. ${name} наугад выбирает ${['один', 'одну'][bakeryProducts.rod]} ${bakeryProducts.ve}. 
			Найдите вероятность того, что ${[`этот`, `эта`, `это`, `эти`][bakeryProducts.rod]} ${bakeryProducts.ie} окажется с ${fillingForBaking[selectedProduct]}.`,
            answers: bakeryArray[selectedProduct] / numberOfBakeryProducts,
            authors: ['Суматохина Александра'], preference,
        });
    }, 100);
})();

// 1024 1025 508391 508411 509655
// Сверка ФИПИ: все исходные коды соответствующих позиций.
// 5.100: 76DC18
// 5.101: 108D23
// 5.109: 26AF97
// 5.110: B56EB0
// 5.111: C1CA1F
