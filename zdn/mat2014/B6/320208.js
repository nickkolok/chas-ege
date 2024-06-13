//56. Задание 4 № 320208
//В кармане у Миши было четыре конфеты — «Грильяж», «Белочка», «Коровка» и «Ласточка»,
//а также ключи от квартиры. Вынимая ключи, Миша случайно выронил из кармана одну конфету.
//Найдите вероятность того, что потерялась конфета «Грильяж».

(function () {
    'use strict';
    NAinfo.requireApiVersion(0, 0);

    var pol = ['выронил', 'выронила'].iz();
    if (pol == 'выронил'){
        var name = sklonlxkand(['Миша', 'Коля', 'Саша', 'Даня', 'Рома', 'Серёжа', 'Петя', 'Дима', 'Ваня',
            'Никита', 'Паша', 'Егор', 'Вова', 'Денис', 'Игорь', 'Лёша', 'Боря', 'Андрей', 'Юра', 'Максим', 'Семён', 'Витя', 'Антон'].iz());
    }else{
        var name = sklonlxkand(['Маша', 'Алла', 'Аня', 'Жанна', 'Инга', 'Ира', 'Карина', 'Полина', 'Оксана',
            'Оля', 'Галя', 'Даша', 'Евгения', 'Катя', 'Лена', 'Нина', 'Юля', 'Ульяна', 'Фаина', 'Маша'].iz());
    }
    var pocket = ['кармане', 'сумке', 'рюкзаке', 'ранце', 'пакете', 'ящике', 'заначке'].iz();
    var predmet = ['ключи', 'телефон', 'деньги', 'кошелёк', 'паспорт', 'блокот', 'ежедневник', ].iz();
    var dopoln;
    if (predmet == 'ключи')
        dopoln = ' от квартиры';
    else
        dopoln = '';

    var kolvo = ['четыре конфеты', 'пять конфет'].iz();

    var sweet1 = ['Грильяж', 'Белочка', 'Коровка', 'Ласточка', 'Гулливер'].iz();
    var sweet2 = ['Красная шапочка', 'Маска', 'Мишка', 'Ромашка', 'Метеорит'].iz();
    var sweet3 = ['Взлётная', 'Василёк', 'Пилот', 'Весна', 'Дюшес'].iz();
    var sweet4 = ['Снежок', 'Кара-Кум', 'Арктика', 'Путешественник', 'Буревестник'].iz();
    var sweet5;
    var naiti = [sweet1, sweet2, sweet3, sweet4].iz();
    var answers;

    if (kolvo == 'пять конфет') {
        sweet5 = ['«Стратосфера», ', '«Мечта», ', '«Чародейка», ', '«Незнайка», ', '«Цитрон», '].iz();
        answers = 0.2;
    } else {
        sweet5 = '';
        answers = 0.25;
    }

    NAtask.setTask({

        text: 'В ' + pocket + ' у ' + name.re + ' было ' + kolvo + ' — ' + sweet5 + '«' + sweet1 + '», «' + sweet2 + '», «' + sweet3 + '» и «' + sweet4 + '», ' +
            'а также ' + predmet + '' + dopoln + '. Вынимая ' + predmet + ', ' + name.ie + ' случайно ' + pol + ' из кармана одну конфету. ' +
            'Найдите вероятность того, что потерялась конфета «' + naiti + '».',

        answers,
    });
})();
