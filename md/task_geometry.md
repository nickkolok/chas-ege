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

## Примеры

### Планиметрия

[`zdn/matege2023p/1`](https://github.com/nickkolok/chas-ege/tree/devel/zdn/matege2023p/1)
[`zdn/matege2024b/12`](https://github.com/nickkolok/chas-ege/tree/devel/zdn/matege2024b/12)
[`zdn/matoge2024/15`](https://github.com/nickkolok/chas-ege/tree/devel/zdn/matoge2024/15)
[`zdn/matoge2024/16`](https://github.com/nickkolok/chas-ege/tree/devel/zdn/matoge2024/16)
[`zdn/matoge2024/17`](https://github.com/nickkolok/chas-ege/tree/devel/zdn/matoge2024/17)

### Стереометрия

[`zdn/matege2023p/3`](https://github.com/nickkolok/chas-ege/tree/devel/zdn/matege2023p/3)
