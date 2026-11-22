# Шаблоны по геометрии (планиметрии или стереометрии)

При написании шаблонов по геометрии следует,
наряду с общими рекомендациями 


## Буквы на чертеже

За случайную перестановку отвечает `NAtask.modifiers.variativeABC(letters);`
Его надлежит использовать, если не указано обратное.
`NAtask.modifiers.variativeABC(letters);` используется после `set*Task(...);`,
но перед `NAtask.modifiers.addCanvasIllustration(...);`, если таковой есть.

Благодаря тому, что массив `letters` передаётся по ссылке,
буквы на чертеже и в условии задачи соответствуют друг другу.
В случае, если чертежа нет, можно сокращать: `NAtask.modifiers.variativeABC();`


## Построение чертежа

Если образец задачи предполагает чертёж,
то его нужно сделать с помощью `NAtask.modifiers.addCanvasIllustration(...);`

Следует использовать `autoScale()`, если это возможно.
Если фигура может оказаться больше поля, передайте `{shrink: true}`:
тогда она не отбраковывается, а сначала уменьшается в 10, 100, … раз.
Чтобы фигура оказалась посередине поля, передайте `{center: true}`:
середина её габаритов переносится в середину поля
(без этой опции на месте остаётся начало координат).

Чтобы перенести начало координат в центр холста, используйте `ctx.translateToCenter()`:
размеры берутся из самого холста, поэтому дублировать `width`/`height`
из `addCanvasIllustration` в `paint` не нужно.
Следует использовать классы `Triangle` и т.д., если это требуется в задаче.
Чертёж должен соответствовать условию задачи
(т.е. его элементы должны быть пропорциональны тем, что описаны в условии);
соответственно, имеет смысл избегать исходных данных,
по которым трудно построить хорошо читаемый чертёж
(например, угла в 1 градус в треугольнике).


## Невидимые рёбра многогранника

Невидимые рёбра рисуются пунктиром (или не рисуются, если так в образце).
Какие из них невидимы, считать вручную для каждого ракурса не нужно:
в `lib/figure.js` есть

* `facesVisibility(vertices, points2D, faces)` - видна ли каждая грань
  выпуклого многогранника; `vertices` - вершины в пространстве,
  `points2D` - их проекции (`project3DTo2D()`, можно после `autoScale()`
  и сдвига), `faces` - номера вершин каждой грани;
* `isOnVisibleFace(faces, visibility, vertexIndices)` - лежит ли ребро
  (или отрезок сечения с концами на рёбрах) в видимой грани;
* `dashHiddenEdges(connectionMatrix, faces, visibility, dash)` - копия матрицы
  смежности для `drawFigure()` с пунктиром на невидимых рёбрах.

```js
let faces = [[0, 1, 2], [3, 4, 5], [0, 1, 4, 3], [1, 2, 5, 4], [2, 0, 3, 5]];
let visibility = facesVisibility(vertices, points2D, faces);
ct.drawFigure(points2D, dashHiddenEdges(prism.connectionMatrix, faces, visibility, [7, 5]));
```

Примеры: `zdn/matege2024b/13/510140.js`, `514225.js`, `526994.js`.

## Сосуды, тела вращения и размерные стрелки

Цилиндрический сосуд (бак, стакан, кружку) не нужно рисовать по дугам вручную:

* `ctx.drawCylinder({cx, yTop, yBottom, r, ry, strokeStyle, dash})` - каркас цилиндра:
  верхнее основание целиком, образующие, нижнее основание с невидимой пунктирной
  половиной. Сосуд `drawCylinderVessel` рисует каркас через него;
* `ctx.drawCylinderVessel({cx, yTop, yBottom, r, ry, liquidY, strokeStyle, liquidColor, dash})` -
  сосуд с открытым верхом: ободок, стенки и дно; если задан `liquidY`, ещё и жидкость
  до этого уровня. Жидкость заливается одним контуром, чтобы полупрозрачный цвет
  нигде не накладывался сам на себя;
* `ctx.drawCone({cx, apexY, baseY, r, ry, t, fillBelowSection, fillColor, strokeStyle, dash, axis})` -
  конус с вершиной сверху: контурные образующие, основание и, если задана доля `t`,
  секущая окружность на боковой поверхности (подобие с коэффициентом `t` от вершины).
  При `fillBelowSection: true` часть поверхности между секущей окружностью и основанием
  закрашивается одним контуром, `axis: true` добавляет пунктирную ось;
* `ctx.drawEllipseWithHiddenHalf(x, y, radiusX, radiusY, dash, yUp)` - эллипс в перспективе:
  ближняя половина сплошная, дальняя пунктиром. Отдельная функция, потому что так
  рисуются и дно, и поверхность жидкости, и любое другое основание тела вращения.
  Если ось Y перевёрнута (`ctx.scale(1, -1)`), передайте `yUp: true`;
* `ctx.drawDimensionArrow(x, y1, y2, letter, letterGap)` - вертикальная размерная стрелка
  с наконечниками с обоих концов и обозначением размера (`h` и т.п.) справа от середины.

```js
let edgeColor = om.secondaryBrandColors.iz();
ct.lineWidth = 2;
ct.strokeStyle = edgeColor;
ct.fillStyle = edgeColor;
ct.drawCylinderVessel({
	cx: 170, yTop: 40, yBottom: 255, r: 75,
	liquidY: 137, liquidColor: om.transparentBrandColors.iz(),
});
ct.drawDimensionArrow(170 + 75 + 25, 255, 137, 'h');
```

Конус с секущей окружностью (например, границей двух цветов на образующей):

```js
	ct.drawCone({
		cx: 130, apexY: 30, baseY: 240, r: 75,
		t: 0.5, fillBelowSection: true, axis: true,
		strokeStyle: edgeColor, fillColor: om.transparentBrandColors.iz(),
	});
```

Ручной набор того же чертежа - `zdn/matege2024b/11/16460866.js` и `508394.js`.
Каркас цилиндра вручную набирают `zdn/matege2023p/2/27051.js` и `5077.js` (PR #1083).
В `508394.js` конус вершиной вниз, а образующие проведены в точки касания эллипса;
этот вариант `drawCone` пока не покрывает.

В `drawCylinder`, `drawCylinderVessel`, `drawCone` и `drawDimensionArrow` ось Y направлена вниз, как на холсте
без `ctx.scale(1, -1)`. Радиус и уровень жидкости здесь - величины чертежа, а не
данные задачи: если они уже есть у объекта (например, у `Cylinder` из `lib/figure.js`),
в `paint` их дублировать не нужно.
## Примеры

### Планиметрия

[`zdn/matege2023p/1`](https://github.com/nickkolok/chas-ege/tree/devel/zdn/matege2023p/1)
[`zdn/matege2024b/12`](https://github.com/nickkolok/chas-ege/tree/devel/zdn/matege2024b/12)
[`zdn/matoge2024/15`](https://github.com/nickkolok/chas-ege/tree/devel/zdn/matoge2024/15)
[`zdn/matoge2024/16`](https://github.com/nickkolok/chas-ege/tree/devel/zdn/matoge2024/16)
[`zdn/matoge2024/17`](https://github.com/nickkolok/chas-ege/tree/devel/zdn/matoge2024/17)

### Стереометрия

[`zdn/matege2023p/3`](https://github.com/nickkolok/chas-ege/tree/devel/zdn/matege2023p/3)
