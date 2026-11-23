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
Ломаную через последовательные точки `(xs[i], ys[i])` рисует `ctx.drawPolyline(xs, ys)`
(например, график по массивам времён и значений); стиль линий — текущие `strokeStyle`/`lineWidth`,
третий аргумент `dotRadius` добавляет закрашенные точки в вершинах.
Следует использовать классы `Triangle` и т.д., если это требуется в задаче.
Чертёж должен соответствовать условию задачи
(т.е. его элементы должны быть пропорциональны тем, что описаны в условии);
соответственно, имеет смысл избегать исходных данных,
по которым трудно построить хорошо читаемый чертёж
(например, угла в 1 градус в треугольнике).


## Клетчатая бумага и кольцо

Для задач на квадратной решётке («план местности», фигуры на клетчатой бумаге)
не нужно повторять в `paint` подготовку холста: белый фон, серая сетка,
перенос начала координат в центр и масштабирование в единицы клетки делает
`ctx.gridPaper(cell, cells)` (`lib/canvas.js`). После него координаты фигур
задаются в клетках, а толщина линий фигуры — как `lineWidth / cell`:

```js
ctx.gridPaper(30, 6);
ctx.strokeStyle = om.secondaryBrandColors[0];
ctx.lineWidth = 4 / 30;
ctx.drawFigure(figure.vertices, figure.connectionMatrix);
```

Закрасить кольцо между двумя концентрическими окружностями (например,
заштрихованную фигуру между внутренним и внешним кругом) можно одним вызовом
`ctx.fillRing(x, y, outerRadius, innerRadius)` (`lib/canvas.js`); цвет берётся
из текущего `fillStyle`, внутренний круг остаётся пустым. Обводку окружностей
делайте отдельно — `ctx.drawCircle(...)` или `circle.drawOnto(ctx)`.

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

## Векторы на координатной плоскости

Векторы в шаблонах задаются массивами координат `[x, y]` (или `[x, y, z]`),
а вектор-отрезок — плоским массивом концов `[x1, y1, x2, y2]`.
Готовые операции — методы массивов в `lib/array.js`:

* `[x1, y1, x2, y2].coordVect()` — координаты вектора по концам (в пространстве — `[x1, y1, z1, x2, y2, z2]`);
* `a.scalprod(b)` — скалярное произведение;
* `a.veclength()` и `a.veclengthSquared()` — длина вектора и её квадрат;
* `a.veccos(b)` — косинус угла между ненулевыми векторами (без потери точности для целых координат);
* `a.vecangleInDegrees(b)` — угол между ненулевыми векторами в градусах.

Пересекаются ли два вектора-отрезка, проверяет `segmentIntersectionCount` (`lib/func.js`):

```js
let coordA = vectorA.coordVect();
genAssert(!segmentIntersectionCount(...vectorA, ...vectorB), 'Векторы A и B пересекаются');
let cos = coordA.veccos(vectorB.coordVect());
```

Эти формулы не нужно переписывать в шаблоне или копировать из соседнего шаблона.

## Примеры

### Планиметрия

[`zdn/matege2023p/1`](https://github.com/nickkolok/chas-ege/tree/devel/zdn/matege2023p/1)
[`zdn/matege2024b/12`](https://github.com/nickkolok/chas-ege/tree/devel/zdn/matege2024b/12)
[`zdn/matoge2024/15`](https://github.com/nickkolok/chas-ege/tree/devel/zdn/matoge2024/15)
[`zdn/matoge2024/16`](https://github.com/nickkolok/chas-ege/tree/devel/zdn/matoge2024/16)
[`zdn/matoge2024/17`](https://github.com/nickkolok/chas-ege/tree/devel/zdn/matoge2024/17)

### Стереометрия

[`zdn/matege2023p/2`](https://github.com/nickkolok/chas-ege/tree/devel/zdn/matege2023p/2)
