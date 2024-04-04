(function () {
    retryWhileError(function () {

        let height = sl(5, 50),
            depth = sl(10, 50),
            width = sl(10, 50);

        let v = sl1();

        let par = new Parallelepiped({
            depth: depth,
            height: height,
            width: width
        });

        let prism = new IrregularTriangularPrism({
            height: height,
            sideA: width,
            sideB: depth,
            sideC: par.DWDiagonal
        });

        let letter = ['A', 'B', 'C', 'D', 'D₁', 'A₁', 'B₁', 'C₁',];
        let strok = [5, 4];

        let matrixPar = [
            [strok],
            [[strok, 0][v], 1],
            [strok, 0, 1],
            [0, 0, [1, 0][1 - v], 1],
            [strok, [strok, 0][1 - v], 0, 0, 1],
            [0, 1, 0, 0, 0, 1],
            [0, 0, 1, 0, 1, [1, 0][v], 1],
        ];

        let camera = {
            x: 0,
            y: 0,
            z: 0,
            scale: 5,

            rotationX: -Math.PI / 2 + Math.PI / 14,
            rotationY: 0,
            rotationZ: 2 * Math.PI / 3,
        };

        let point2DPar = par.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));
        genAssert((point2DPar[0].x - point2DPar[2].x).abs() > 20, 'Сечение не видно')

        autoScale(par, camera, point2DPar, {
            startX: -180,
            finishX: 160,
            startY: -160,
            finishY: 160,
            maxScale: 50,
        });
        []

        point2DPar = par.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;
            ctx.translate(h/2, w/2);
            ctx.lineWidth = 2;
            ctx.strokeStyle = om.primaryBrandColors[0];
            ctx.strokeStyle = om.secondaryBrandColors;
            ctx.drawFigure(point2DPar, matrixPar);
            ctx.font = "25px liberation_sans";

            point2DPar.forEach((elem, i) => ctx.fillText(letter[i], elem.x, elem.y + ((i < point2DPar.length / 2) ? 15 : -10)))
        };

        NAinfo.requireApiVersion(0, 2);
        NAtask.setTask({
            text: 'В прямоугольном параллелепипеде $A B C D A_1 B_1 C_1 D_1$ известно, что ' + ['$AB=' + depth + '$',
            ' $BC=' + width + '$', ' $BB_1=' + height + '$'
            ].shuffleJoin(', ') + '. Найдите ',
            questions: [{
                text: 'объём',
                answers: prism.volume
            },],
            postquestion: ' многогранника, вершинами которого являются точки $' + [[
                ['A', 'B', 'C', 'A_1', 'B_1', 'C_1'],
                ['A', 'C', 'D', 'A_1', 'C_1', 'D_1']
            ].iz(),
            [['A', 'B', 'C', 'D', 'A_1', 'D_1'],
            ['A_1', 'B_1', 'C_1', 'D_1', 'B', 'C']].iz()].iz().shuffleJoin('$, $') + '$.',
            analys: 'Полный объём многогранника: $' + par.volume + '$' + '<br>' +
                'Диагональ основания:$' + (par.DWDiagonal.pow(2)).texsqrt(1) + '$',
            author: ['Суматохина Александра']
        });
        NAtask.modifiers.allDecimalsToStandard(true);
        NAtask.modifiers.multiplyAnswerBySqrt(12);
        NAtask.modifiers.variativeABC(letter);

        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });
    }, 100000);
})();
/*
Решу ЕГЭ
245335 264013 264511 517154 639472 264015 264017 264019 264021 264023 264025 264027 264029 264031 264033 264035 264037 264039 264041 264043 264045 264047 264049 264051 264053 264055 264057 264059 264061 264063 264065 264067 264069 264071 264073 264075 264077 264079 264081 264083 264085 264087 264089 264091 264093 264095 264097 264099 264101 264103 264105 264107 264109 264111 264113 264115 264117 264119 264121 264123 264125 264127 264129 264131 264133 264135 264137 264139 264141 264143 264145 264147 264149 264151 264153 264155 264157 264159 264161 264163 264165 264167 264169 264171 264173 264175 264177 264179 264181 264183 264185 264187 264189 264191 264193 264195 264197 264199 264201 264203 264205 264207 264209 264211 264213 264215 264217 264219 264221 264223 264225 264227 264229 264231 264233 264235 264237 264239 264241 264243 264245 264247 264249 264251 264253 264255 264257 264259 264261 264263 264265 264267 264269 264271 264273 264275 264277 264279 264281 264283 264285 264287 264289 264291 264293 264295 264297 264299 264301 264303 264305 264307 264309 264311 264313 264315 264317 264319 264321 264323 264325 264327 264329 264331 264333 264335 264337 264339 264341 264343 264345 264347 264349 264351 264353 264355 264357 264359 264361 264363 264365 264367 264369 264371 264373 264375 264377 264379 264381 264383 264385 264387 264389 264391 264393 264395 264397 264399 264401 264403 264405 264407 264409 264411 264413 264415 264417 264419 264421 264423 264425 264427 264429 264431 264433 264435 264437 264439 264441 264443 264445 264447 264449 264451 264453 264455 264457 264459 264461 264463 264465 264467 264469 264471 264473 264475 264477 264479 264481 264483 264485 264487 264489 264491 264493 264495 264497 264499 264501 264503 264505 264507 264509
*/
