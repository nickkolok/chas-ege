(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        'use strict';

        let bakeryArray = generateMatrix(1, sl(3, 5), 1, 7).iz();
        let numberOfBakeryProducts = bakeryArray.sum();
        let selectedProduct = sl(0, bakeryArray.length - 1);
        let name = [om.maleNames, om.femaleNames].iz().iz();
        genAssertZ1000(bakeryArray[selectedProduct] / numberOfBakeryProducts);

        let bakeryProducts = sklonlxkand(['пирожок', 'круассан', 'слойка', 'рулет'].iz());

        let fillingForBaking = ['мясом', 'лососем', 'вишней', 'клубникой', 'крыжовником', 'малиной', 'облепихой', 'ежевикой',
            'голубикой', 'арбузом', 'абрикосом', 'изюмом', 'иргой', 'рябиной', 'луком', 'морковкой', 'капустой', 'картошкой'
        ].iz(bakeryArray.length);

        let bakeryProductsWithFilling = fillingForBaking.map((filling, index) => '$' + bakeryArray[index] + '$ c ' + filling);

        NAtask.setTask({
            text: `На тарелке лежат одинаковые на вид ${bakeryProducts.im}: 
			${bakeryProductsWithFilling.joinLast(' и ')}. ${name} наугад выбирает ${['один', 'одну'][bakeryProducts.rod]} ${bakeryProducts.ve}. 
			Найдите вероятность того, что ${[`этот`, `эта`, `это`, `эти`][bakeryProducts.rod]} ${bakeryProducts.ie} окажется с ${fillingForBaking[selectedProduct]}.`,
            answers: bakeryArray[selectedProduct] / numberOfBakeryProducts,
            authors: ['Суматохина Александра'],
        });
    }, 100);
})();

// 1024 1025 508391 508411 509655
