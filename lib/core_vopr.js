'use strict';

// Объявление объекта `vopr` в глобальной области видимости.
window.vopr = {};

// Функция `vrn_ist` проверяет, существует ли стандартная версия данных `kand` в массиве `ver`.
window.vopr.vrn_ist = function(kand) {
    for (var i2 = 0; i2 < this.ver.length; i2++) {
        this.ver[i2] = this.ver[i2].istDataToStd();
        if (this.ver[i2] == kand.istDataToStd())
            return 1;
    }
    return 0;
};

// Функция `vrn_mat` проверяет, совпадает ли временная метка `ts` объекта `kand` с любым элементом в массиве `ver`.
window.vopr.vrn_mat = function(kand) {
    for (var i2 = 0; i2 < this.ver.length; i2++)
        if (this.ver[i2].ts() == kand.ts())
            return 1;
    return 0;
};

// Функция `vrn_list` сравнивает список, полученный из `kand`, с массивом `ver`, удаляя дубликаты и сортируя.
window.vopr.vrn_list = function(kand) {
    return '' + kand.split(/;\s*/g).sortDelDubl() == '' + chaslib.toStringsArray(this.ver).sortDelDubl();
};

// Функция `podg` инициализирует объект `vopr` с начальными значениями.
window.vopr.podg = function() {
    window.vopr.dey = function() {};
    window.vopr.correctAnswers = [];
    window.vopr.nev = [];
    window.vopr.txt = '';
    window.vopr.rsh = '';
    window.vopr.kat = [];
    window.vopr.authors = [];
    window.vopr.dgn = 1;
    window.vopr.err = 0;
    window.vopr.vrn = window.vopr.vrn_mat;
}
window.vopr.podg();

// Функция `trd` вызывает метод `dey` объекта `vopr` в строгом режиме, игнорируя ошибки.
window.vopr.trd = function() {
    'use strict';
    try {
        window.vopr.dey();
    } catch (e) {}
}

// Функция `AtoB` генерирует текстовые варианты ответов, учитывая количество неверных ответов `n`.
function AtoB(n) {
    // n - количество неверных ответов
    n = n ? n : 3;
    if (window.vopr.nev.hasDubl()) {
        window.vopr.nev = window.vopr.nev.sortDelDubl();
        console.log('AtoB(): nev: повторяющиеся варианты;');
    }
    if (window.vopr.ver.hasDubl()) {
        window.vopr.ver = window.vopr.ver.sortDelDubl();
        console.log('AtoB(): ver: повторяющиеся варианты;');
    }
    if (vopr.dgn && dvig.dgn && dvig.validateVopr()) {
        vopr.err = 1;
        return;
    }
    var nev = window.vopr.nev.iz(n);
    var ver = window.vopr.ver.iz();
    var a = [[ver].concat(nev), [].N(n + 1)].T().shuffle().T();
    window.vopr.ver = [a[1].indexOf(1) + 1];
    window.vopr.nev = [];
    for (var i = 0; i <= n; i++) {
        window.vopr.txt += '<br/>' + (i + 1) + ') ' + a[0][i];
    }
}

console.log('core_vopr.js отработал');
