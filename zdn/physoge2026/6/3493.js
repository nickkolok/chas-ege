(function() {
    'use strict';
    
    let v_bus = sl(5, 20);
    let v_pass = sl(1, 3);
    let directionSign = [1, -1].iz();
    let directionText = directionSign === 1 ? 'от задней двери к кабине водителя' : 'от кабины водителя к задней двери';
    let v_result = v_bus + directionSign * v_pass;
    let passenger = sklonlxkand(['пассажир', 'пассажирка'].iz());
    
    let text = 'Автобус везёт пассажиров по прямой дороге со скоростью ' + v_bus + ' м/с. ' +
               passenger.ie.toZagl() + ' равномерно идёт по салону автобуса со скоростью ' + v_pass + ' м/с относительно автобуса, двигаясь ' +
               directionText + '. Чему равен модуль скорости ' + passenger.re + ' относительно дороги?';
               
    let analys = 'Скорость автобуса относительно дороги равна $' + v_bus + '$ м/с. ' +
                 'Скорость ' + passenger.re + ' относительно автобуса равна $' + v_pass + '$ м/с. ' +
                 'Так как ' + passenger.ie + ' движется ' + (directionSign === 1 ? 'по ходу движения автобуса' : 'против хода движения автобуса') + ', ' +
                 (passenger.rod === 1 ? 'её' : 'его') + ' скорость относительно дороги равна ' + (directionSign === 1 ? 'сумме' : 'разности') + ' скоростей: $' + v_bus + (directionSign === 1 ? ' + ' : ' - ') + v_pass + ' = ' + v_result + '$ м/с.';
                 
    NAtask.setTask({
        text: text,
        answers: v_result,
        analys: analys,
        tags: {
            'Кинематика': 1,
            'ОГЭ': 1,
        }
    });
})();
// ФИПИ 01A441 E81948
