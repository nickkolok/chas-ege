let rand = sluchch(0, 10);
let m = 'масса';
let a;
let b;
let c;
let d;
let verysmall = ['таблетки лекарства', 'комара', 'мухи', 'божьей коровки', 'капли воды', 'иголки', 'пуговицы'];
let small = ['монеты', 'малины', 'клубники', 'вилки', 'яйца', 'ножниц', 'птицы', 'компьютерной мыши', 'картофеля'];
let medium = ['коляски', 'собаки', 'кресла', 'холодильника', 'человека', 'шкафа'];
let big = ['машины', 'морского ската', 'бегемота', 'носорога', 'индийского слона', 'касатки', 'грузовика', 'африканского слона', 'автобуса'];
let array1 = [];
let ind = [0, 1, 2, 3];
let ind2 = [0, 1, 2, 3];

function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
}

shuffle(ind);
shuffle(ind2);

let array3 = [];
let v = sluchch(0, verysmall.length - 1);
let s = sluchch(0, small.length - 1);
let me = sluchch(0, medium.length - 1);
let bi = sluchch(0, big.length - 1);

a = (v + 1) * sluchch(10, 20);
b = Math.pow(s + 2, 2) + sluchch(1, 5);
c = (me + 1) * sluchch(10, 15);
d = (bi + 1) + (sluchch(0, 0.5, 0.1));

array3[0] = verysmall[v];
array3[1] = small[s];
array3[2] = medium[me];
array3[3] = big[bi];

let i = 0;
while (i != 4) {
    array1[i] = array3[ind2[i]];
    i++;
}

let ans = [];
for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        if (ind2[i] == ind[j]) {
            ans[i] = j;
        }
    }
}

i = 4;
while (i != 0) {
    i--;
    ans[i] = ans[i] + 1;
}

let array = [a + ' мг', b + ' г', c + ' кг', d + ' т'];

let answer = 'A) ' + ans[0] + ' B) ' + ans[1] + ' C) ' + ans[2] + ' D) ' + ans[3]

NAtask.setTask({
    text: ' ' + ' A) ' + m + ' ' + array1[0] + ' B) ' + m + ' ' + array1[1] + ' C) ' + m + ' ' + array1[2] + ' D) ' + m + ' ' + array1[3] + '$$ $$' +
        '1) ' + ' ' + array[ind[0]] + ' 2) ' + ' ' + array[ind[1]] + ' 3) ' + ' ' + array[ind[2]] + ' 4) ' + ' ' + array[ind[3]],
    answers: answer,
});
