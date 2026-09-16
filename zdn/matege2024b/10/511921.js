(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        
        let width = sl(2, 9, 0.1);
        let length = sl(2, 9);
        let S = length * width;
        let delta = sl(0.1, 3, 0.1);
        let newS = Math.round((S + delta) * 10) / 10;
        
        // Гарантируем чистые числа без артефактов плавающей точки для отображения
        let displayWidth = Math.round(width * 10) / 10;
        let displayLength = Math.round(length * 10) / 10;
   
        NAtask.setTask({
            text: 'На плане указано, что прямоугольная комната имеет площадь $' + newS + '$ кв. м. Точные измерения показали, что ширина комнаты равна $' + displayWidth + '$ м, а длина $' + displayLength +
            '$ м. На сколько квадратных метров площадь комнаты отличается от площади, указанной на плане?',
            answers: delta,
        });
        
        // Добавляем canvas иллюстрацию с гарантированными отступами
        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 300,
            paint: function(ct) {
                // Гарантированные отступы от краёв canvas для текста и границ
                let padding = 40;
                let availableW = 400 - 2 * padding; // 320 px
                let availableH = 300 - 2 * padding; // 220 px
                
                // Максимальные возможные значения для расчёта масштаба
                let maxW = 12;
                let maxH = 9;
                
                let scaleX = availableW / maxW;
                let scaleY = availableH / maxH;
                let scale = Math.min(scaleX, scaleY);
                
                // Размеры прямоугольника в пикселях
                let rectW = displayLength * scale;
                let rectH = displayWidth * scale;
                
                // Центрируем прямоугольник на холсте
                let startX = (400 - rectW) / 2;
                let startY = (300 - rectH) / 2;
                
                // Рисуем прямоугольник
                ct.strokeStyle = '#000000';
                ct.lineWidth = 2;
                ct.strokeRect(startX, startY, rectW, rectH);
                
                // Настройки текста
                ct.font = '16px Arial';
                ct.fillStyle = '#000000';
                ct.textAlign = 'center';
                ct.textBaseline = 'middle';
                
                // Длина (сверху)
                ct.fillText(displayLength + ' м', startX + rectW / 2, startY - 15);
                
                // Ширина (слева, вертикально)
                ct.save();
                ct.translate(startX - 20, startY + rectH / 2);
                ct.rotate(-Math.PI / 2);
                ct.fillText(displayWidth + ' м', 0, 0);
                ct.restore();
            }
        });
        
        NAtask.modifiers.allDecimalsToStandard();
    }, 20000);
})();
//https://ege.sdamgia.ru/test?likes=511921
