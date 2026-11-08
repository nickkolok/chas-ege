(function() {
    retryWhileError(function() {
        NAinfo.requireApiVersion(0, 2);

        let itemCount = sl(3, 5);
        let colors = om.trickyColors.iz(itemCount);

        let totalItems = sl(10, 50, 5);
        let itemName = sklonlxkand(['ластик', 'карандаш', 'шарик', 'бант', 'блокнот', 'значок', 'брелок', 'фломастер'].iz());
        let itemDistribution = [];
        let adjectiveForms = [];

        let currentSum = 0;
        let maxItemsPerColor = Math.ceil(totalItems / itemCount);

        for (let i = 0; i < itemCount - 1; i++) {
            let itemQuantity = sl(1, maxItemsPerColor);
            itemDistribution.push([colors[i], itemQuantity]);
            adjectiveForms.push(declensionOfAdjectives(itemQuantity, colors[i]));
            currentSum += itemQuantity;
        }

        let remainingItems = totalItems - currentSum;
        genAssert(remainingItems > 0, 'Не хватило вещей');
        itemDistribution.push([colors[itemCount - 1], remainingItems]);
        adjectiveForms.push(declensionOfAdjectives(remainingItems, colors[itemCount - 1]));

        let selectedItems = itemDistribution.iz(2);
        let m = sl(1, selectedItems[0][1]);
        let n = sl(1, selectedItems[1][1]);

        let maxM = Math.max(m, selectedItems[0][1]);
        let minM = Math.min(m, selectedItems[0][1]);
        let maxN = Math.max(n, selectedItems[1][1]);
        let minN = Math.min(n, selectedItems[1][1]);
        let maxMN = Math.max(m + n, totalItems);
        let minMN = Math.min(m + n, totalItems);

        let probability = (math.combinations(maxM, minM) * math.combinations(maxN, minN)) / math.combinations(maxMN, minMN);

        genAssertZ1000(probability * 100, 'Слишком много знаков после запятой');
        genAssert(probability > 0.001, 'Ответ должен быть больше нуля');

        NAtask.setTask({
            text: `В коробке ${adjectiveForms.slice(0, itemCount - 1).join(', ')} и ${adjectiveForms[adjectiveForms.length - 1]} ` +
                  `${chislit(remainingItems, itemName.ie, itemName.re, itemName.rm)}. Случайным образом выбирают ` +
                  `${chislitM(m + n, itemName.ie, itemName.re, itemName.rm)}. Какова вероятность того, что окажутся выбраны ` +
                  `${declensionOfAdjectives(m, selectedItems[0][0])} и ${declensionOfAdjectives(n, selectedItems[1][0])} ` +
                  `${chislit(n, itemName.ie, itemName.re, itemName.rm)}?`,
            answers: probability,
            authors: ['Суматохина Александра'],
        });
    }, 1000);
})();
//621772 508856 508863 508865 621902 661282 665293 508857 508858 508859 508860 508861 508862 508864
