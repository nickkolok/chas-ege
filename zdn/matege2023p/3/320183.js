//РАБОТАЕТ
//32. Задание 4 № 320183
//Перед началом футбольного матча судья бросает монетку, чтобы определить,
//какая из команд начнёт игру с мячом. Команда «Физик» играет три матча
//с разными командами. Найдите вероятность того, что в этих играх
//«Физик» выиграет жребий ровно два раза.

(function () {
    'use strict';
    NAinfo.requireApiVersion(0, 0);

    var sport = ['футбольного', 'волейбольного', 'баскетбольного', 'хоккейного', 'теннисного', 'бейсбольного'].iz();
    var team_name = ['Физик', 'Химик', 'Сапфир', 'Труд', 'Геолог', 'Биолог', 'Квант', 'Изумруд', 'Рубин', 'Факел'].iz();
    var vopr = ['начнёт игру с мячом', 'выиграет жребий'].iz();
    var kolvo;
    var answers = 0;
    var kolvo_rush = sl(0, 3);			//число сыгранных игр   0-2игры 1-3игры 2-4игры 3-5игр
    var games = ['два матча', 'три матча', 'четыре матча', 'пять матчей'][kolvo_rush];
    var kolvo_rush = kolvo_rush + 2;
    var first_times = sl(1, kolvo_rush);			//число выйгранных жребиев
    var rovno_ili_bol = sluchch(0, 1);//ровно %количество побед% = 0, больше = 1
    if (kolvo_rush == first_times){
        rovno_ili_bol = 0
    }



    if (rovno_ili_bol == 0){
        kolvo = ['ровно один раз','ровно два раза' ,'ровно три раза' ,'ровно четыре раза' ,'ровно пять раз'][first_times - 1]
        if (kolvo_rush  == 2){
            if (first_times == 1){
                answers = 0.5;
            }else{
                answers	= 0.25;
            }
        }

        if (kolvo_rush == 3){
            if (first_times == 1){
                answers = 0.375;
            }
            if (first_times == 2){
                answers	= 0.375;
            }
            if (first_times == 3){
                answers	= 0.125;
            }
        }

        if (kolvo_rush == 4){
            if (first_times == 1){
                answers = 0.25;
            }
            if (first_times == 2){
                answers	= 0.375;
            }
            if (first_times == 3){
                answers	= 0.25;
            }
            if (first_times == 4){
                answers	= 0.0625;
            }
        }

        if (kolvo_rush == 5){
            if (first_times == 1){
                answers = 0.15625;
            }
            if (first_times == 2){
                answers	= 0.3125;
            }
            if (first_times == 3){
                answers	= 0.3125;
            }
            if (first_times == 4){
                answers	= 0.15625;
            }
            if (first_times == 5){
                answers	= 0.03125;
            }
        }
    }else{
        kolvo = ['болeе одного раза','болeе двух раз' ,'болeе трёх раз' ,'болeе четырёх раз','болeе пяти раз'][first_times - 1]
        answers = (first_times / kolvo_rush)

        if (kolvo_rush == 2){
            if (first_times == 1){
                answers = 0.25;
            }else{
                answers	= 0;
            }
        }

        if (kolvo_rush == 3){
            if (first_times == 1){
                answers = 0.5;
            }
            if (first_times == 2){
                answers	= 0.125;
            }
            if (first_times == 3){
                answers	= 0;
            }
        }

        if (kolvo_rush == 4){
            if (first_times == 1){
                answers = 0.6875;
            }
            if (first_times == 2){
                answers	= 0.3125;
            }
            if (first_times == 3){
                answers	= 0.0625;
            }
            if (first_times == 4){
                answers	= 0;
            }
        }

        if (kolvo_rush == 5){
            if (first_times == 1){
                answers = 0.8125;
            }
            if (first_times == 2){
                answers	= 0.5;
            }
            if (first_times == 3){
                answers	= 0.1875;
            }
            if (first_times == 4){
                answers	= 0.03125;
            }
            if (first_times == 5){
                answers	= 0;
            }
        }
    }

    NAtask.setTask({

        text: 'Перед началом ' + sport + ' матча судья бросает монетку, чтобы определить, ' +
            'какая из команд начнёт игру с мячом. Команда «' + team_name + '» играет ' + games + ' ' +
            'с разными командами. Найдите вероятность того, что в этих играх ' +
            '«' + team_name + '» ' + vopr  + ' ' + kolvo + ' .',

        answers,

    });
})();