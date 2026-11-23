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

## Параллелепипед: проекция и габариты

`ctx.drawParallelepiped(o, dottedLine, diagonal, setLineDash)` рисует коробку
с вершиной 5 в начале координат: передняя грань - прямоугольник `width` × `height`,
задняя сдвинута на `depth * cos(angle)` по горизонтали и `depth / 2` по вертикали.
Угол - в радианах и нормализуется (`parallelepipedAngle(angle)`): больше π -
уменьшается на π, π/2 и отсутствующий - π/6. Поэтому `angle: 40` - это
40 − 12π ≈ 2,30 (около 132°): косинус отрицательный, и глубина уходит **влево**.

В шаблонах встречаются два ракурса:

* ось Y вниз (`ct.scale(20, 20)`), `angle: 40` (реже `30`): глубина уходит влево,
  невидимы рёбра 0, 3, 4 - так в большинстве шаблонов, например
  `zdn/matege2024p/3/24.js`, `zdn/matege2024b/11/509658.js`;
* ось Y вверх (`ct.scale(1, -1)`), угол от 0 до π/2: глубина уходит вправо-вверх,
  невидимы рёбра 6, 8, 10 - `zdn/matege2024b/11/506456.js`, `512461.js`.

Номера рёбер - индексы в `dottedLine`. Переписывать формулу проекции в шаблоне
не нужно - в `lib/canvas.js` есть

* `parallelepipedVertices(o)` - восемь вершин проекции `[x, y]`: 1, 2, 5, 6 -
  передняя грань (5 - начало координат), 0, 3, 4, 7 - сдвинутая на глубину;
  0-3 лежат на высоте `height`, 4-7 - на нулевой;
* `parallelepipedSize(o)` - габарит проекции `{minX, minY, width, height}`:
  по нему чертёж вписывается в холст, а тот же `o` передаётся в `drawParallelepiped()`.
  Если глубина уходит влево, `minX` < 0: коробка начинается левее начала координат,
  и сдвигать чертёж нужно на `-minX`.

Обе функции объект `o` не меняют; `drawParallelepiped()`, как и раньше,
записывает в `o.angle` нормализованный угол.

```js
let box = {width: a, height: h, depth: a / 2, angle: 40};
let size = parallelepipedSize(box);
let m = 10; // поля в пикселях, чтобы крайние рёбра не обрезались
let s = Math.min((ct.canvas.width - 2 * m) / size.width, (ct.canvas.height - 2 * m) / size.height);
ct.translate(m, m);
ct.scale(s, s);
ct.translate(-size.minX, -size.minY); // ось Y вниз: габарит - от левого верхнего угла поля
ct.lineWidth = 2 / s; // толщина и штрих - в пикселях, а не в единицах чертежа
ct.drawParallelepiped(box, [0, 3, 4], false, [6 / s, 4 / s]);
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
