(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let key = '356399';
        let preference = ['radius', 'area', 'diagonal'];

        let rand = getListedPreference(key, preference.map((pref, index) => ({
            preference: pref,
            preferenceValue: index
        })), sl(preference.length - 1));
        
        let square = new Square({
            length: sl(5, 50)*[1,2*(2).sqrt()][Number(rand==2)],
            supplementary: {
                calculateDiagonals: true,
            }
        });
        
        if(rand==2){
        square.connectVerticesInConnectionMatrix([
            [[0, 2], [1, 3]].iz(),
        ]);}

        let vertex = autoScale(square.vertices);

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(vertex, square.connectionMatrix);
            ctx.drawArc(0, 0, vertex[3].x.abs(), 0, 2 * Math.PI);

        };

        NAtask.setTask({
            text: ``,
            questions:[[{
            	text:`Сторона квадрата равна $${square.lengthAB}$. Найдите радиус окружности, вписанной в этот квадрат.`,
            	answers:square.lengthAB/2,
            },{
            	text:`Найдите площадь квадрата, описанного вокруг окружности радиуса $${square.lengthAB/2}$.`,
            	answers:square.area(),
            },{
            	text:`Радиус вписанной в квадрат окружности равен $${(square.lengthAB/2).pow(2).texsqrt(1)}$. Найдите диагональ этого квадрата.`,
            	answers:square.lengthDiagonalAC,
            }][rand]],
            authors: ['Александра Суматохина'],
            preference,
        });
        NAtask.modifiers.allDecimalsToStandard();

        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });

    }, 2000);
})();
// https://oge.sdamgia.ru/problem?id=356399
// https://oge.sdamgia.ru/problem?id=353229
// https://oge.sdamgia.ru/problem?id=356369
