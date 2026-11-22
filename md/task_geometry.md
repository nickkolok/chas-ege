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

## Векторы на координатной плоскости

Для задач, где векторы заданы координатами начала и конца на клетчатой плоскости
(например, `zdn/matege2024p/2`), в `lib/func.js` есть

* `coordinatesOfVector(x1, y1, x2, y2)` — координаты вектора по концам:
  `[x2 - x1, y2 - y1]`. Заменяет самодельную лямбду
  `(V) => [V[2] - V[0], V[3] - V[1]]`, кочующую по шаблонам;
* `segmentIntersectionCount(x1, y1, x2, y2, x3, y3, x4, y4)` — число точек
  пересечения двух отрезков по плоским координатам концов (обёртка над
  `Array.prototype.mt_otrPeres`, `lib/array_mt.js`): 0, 1 или Infinity.
  Удобно для отбраковки пересекающихся векторов через `genAssert(!...)`.

```js
let coordA = coordinatesOfVector(...vectorA);
genAssert(!segmentIntersectionCount(...vectorA, ...vectorB), 'Векторы A и B пересекаются');
```

## Примеры

### Планиметрия

[`zdn/matege2023p/1`](https://github.com/nickkolok/chas-ege/tree/devel/zdn/matege2023p/1)
[`zdn/matege2024b/12`](https://github.com/nickkolok/chas-ege/tree/devel/zdn/matege2024b/12)
[`zdn/matoge2024/15`](https://github.com/nickkolok/chas-ege/tree/devel/zdn/matoge2024/15)
[`zdn/matoge2024/16`](https://github.com/nickkolok/chas-ege/tree/devel/zdn/matoge2024/16)
[`zdn/matoge2024/17`](https://github.com/nickkolok/chas-ege/tree/devel/zdn/matoge2024/17)

### Стереометрия

[`zdn/matege2023p/3`](https://github.com/nickkolok/chas-ege/tree/devel/zdn/matege2023p/3)
