//37. Задание 4 № 320188
//Чтобы пройти в следующий круг соревнований, футбольной команде нужно набрать
//хотя бы 4 очка в двух играх. Если команда выигрывает, она получает 3 очка,
//в случае ничьей — 1 очко, если проигрывает — 0 очков. Найдите вероятность того,
//что команде удастся выйти в следующий круг соревнований. Считайте, что в
//каждой игре вероятности выигрыша и проигрыша одинаковы и равны 0,4.

(function () {
    'use strict';
    NAinfo.requireApiVersion(0, 0);

    var sorevn = ['соревнований', 'чемпионата', 'турнира'].iz();
    var sport = ['футбольной', 'волейбольной', 'баскетбольной', 'хоккейной', 'теннисной', 'бейсбольной'].iz();
    var vopros = ['удастся', ' не удастся'].iz();;
    var veroyatnost = [0.1, 0.2, 0.3, 0.4].iz();
    var vsego = sluchch(4, 9);
    var pobeda;
    var nichya;

    var answers;

    if (vsego == 4) {
        nichya = 1;
        pobeda = 3;
    } else if ((vsego == 5) || (vsego == 6)) {
        nichya = [1, 2].iz();
        pobeda = vsego - nichya;
    } else if ((vsego == 7) || (vsego == 8)) {
        nichya = [1, 2, 3].iz();
        pobeda = vsego - nichya;
    } else {
        nichya = [1, 2, 3, 4].iz();
        pobeda = vsego - nichya;
    }

    var for_luck = 2 * veroyatnost * (1 - veroyatnost * 2) + veroyatnost ** 2;
    if (vopros == 'удастся')
        answers = for_luck;
    else
        answers = 1 - for_luck;


    NAtask.setTask({

        text: 'Чтобы пройти в следующий круг ' + sorevn + ', ' + sport + ' команде нужно набрать ' +
            'хотя бы ' + chislitlx(vsego, 'очко') + ' в двух играх. Если команда выигрывает, она получает ' + chislitlx(pobeda, 'очко') + ', ' +
            'в случае ничьей — ' + chislitlx(nichya, 'очко') + ', если проигрывает — 0 очков. Найдите вероятность того, ' +
            'что команде ' + vopros + ' выйти в следующий круг ' + sorevn + '. Считайте, что в ' +
            'каждой игре вероятности выигрыша и проигрыша одинаковы и равны ' + veroyatnost + '.',


        answers,
    });
})();
