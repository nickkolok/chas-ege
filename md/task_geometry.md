# Шаблоны по геометрии (планиметрии или стереометрии)

При написании шаблонов по геометрии следует,
наряду с общими рекомендациями 


## Буквы на чертеже

За случайную перестановку отвечает `NAtask.modifiers.variativeABC(letters);`.
Он заменяет буквенные обозначения точек на случайные с сохранением консистентности условия,
превращая какую-нибудь трапецию $ABCD$ в нечто вроде $RTFM$.
Его надлежит использовать, если не указано обратное.
`NAtask.modifiers.variativeABC(letters);` используется после `set*Task(...);`,
но перед `NAtask.modifiers.addCanvasIllustration(...);`, если таковой есть.

Благодаря тому, что массив `letters` передаётся по ссылке,
буквы на чертеже и в условии задачи соответствуют друг другу.
В случае, если чертежа нет, можно сокращать: `NAtask.modifiers.variativeABC();`.
А вот если точки не обозначены буквами ни в условии, ни на чертеже,
то этот модификатор использовать не нужно!


## Построение чертежа

Если образец задачи предполагает чертёж,
то его нужно сделать с помощью `NAtask.modifiers.addCanvasIllustration(...);`

Следует использовать `autoScale()`, если это возможно.
Если фигура может оказаться больше поля, передайте `{shrink: true}`:
тогда она не отбраковывается, а сначала уменьшается в 10, 100, … раз.
Следует использовать классы `Triangle` и т.д., если это требуется в задаче.
Чертёж должен соответствовать условию задачи
(т.е. его элементы должны быть пропорциональны тем, что описаны в условии);
соответственно, имеет смысл избегать исходных данных,
по которым трудно построить хорошо читаемый чертёж
(например, угла в 1 градус в треугольнике).

В случае, если на чертеже используются цвета, следует брать их из массивов
`om.primaryBrandColors` и `om.secondaryBrandColors`
с помощью функции `.iz()`.


## Специальные функции, классы и свойства

* Если есть чертёж, то имеет смысл заглянуть в `lib/canvas.js`:
там много интересных функций, которые весьма сокращают код.

* Если задача про треугольники или круги,
то полезно посмотреть на `lib/triangle.js` и `lib/circle.js` соответственно.

* Если в шаблоне есть непонятные функции,
то полезно посмотреть в `lib/figure.js`.

* Активно используются классы
`Angle`, `Circle`, `Parallelogram`, `Rectangle`, `Rhombus`, `Square`, `Triangle`, `Trapezoid` и т.д.
из библиотеки [flatten-shape-geometry](https://github.com/SugarHedgehog/flatten-shape-geometry).

### `connectionMatrix`
При построении чертежей часто используется матрица смежности `connectionMatrix`.
Она передаётся в функцию `ctx.drawFigure(points, connectionMatrix)` из `lib/canvas.js`.

Формат `connectionMatrix` — это компактное нижнее треугольное представление графа рёбер:
- Массив содержит $V-1$ строк, где $V$ — количество вершин.
- Строка с индексом $i$ (от 0 до $V-2$) соответствует вершине `points[i+1]`.
- Элемент строки с индексом $j$ (от 0 до $i$) соответствует вершине `points[j]`.
- Если `connectionMatrix[i][j]` истинно (например, `1`), то между `points[i+1]` и `points[j]` рисуется отрезок.
- Отсутствующие элементы в конце строк (массив может быть «рваным») эквивалентны `0` (отсутствие ребра).

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

## Примеры

### Планиметрия

[`zdn/matege2023p/1`](https://github.com/nickkolok/chas-ege/tree/devel/zdn/matege2023p/1)
[`zdn/matege2024b/12`](https://github.com/nickkolok/chas-ege/tree/devel/zdn/matege2024b/12)
[`zdn/matoge2024/15`](https://github.com/nickkolok/chas-ege/tree/devel/zdn/matoge2024/15)
[`zdn/matoge2024/16`](https://github.com/nickkolok/chas-ege/tree/devel/zdn/matoge2024/16)
[`zdn/matoge2024/17`](https://github.com/nickkolok/chas-ege/tree/devel/zdn/matoge2024/17)

### Стереометрия

[`zdn/matege2023p/3`](https://github.com/nickkolok/chas-ege/tree/devel/zdn/matege2023p/3)
