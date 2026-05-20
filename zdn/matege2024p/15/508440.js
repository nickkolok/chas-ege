(function() {
 retryWhileError(function() {
  let a = sluchch(-5, 0);
  let b = slKrome(0, a + 1, a + 2);
  let d = slKrome(0, b + 1, b + 2);
  let slChis = sl1();
  let znak = ['+', '-'];
  let znak2 = ['-', '+'];
  let dividend = sluchch(2, 5);
  let divider = dividend * [b, d][slChis] - [b, d][slChis] / Math.abs([b, d][slChis]);

  genAssertIrreducible(divider, dividend, 'Дробь должна быть несократима');
  genAssert(divider / dividend > b, 'Правый конец должен быть больше левого');
  genAssert(divider / dividend < d, 'Правый конец должен быть больше левого');

  let c = '$\\frac{' + divider + '}{' + dividend + '}$';
  let e = d + sluchch(1, 2);
  let up = [a, b, d, e].shuffle();
  let down = up.filter(item => item !== up[0]);
  down = down.sortNumeric();

  let answer = "(-∞;" + a + ")U(" + b + ";" + c + "]U(" + d + ";" + e + ")";

  const checkZnak = (member) =>
   member > 0 ? 1 : member < 0 ? 0 : 1;

function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
        let t = b;
        b = a % b;
        a = t;
    }
    return a;
}

function lcm(a, b) {
    return Math.abs(a * b) / gcd(a, b);
}

function toFraction(value, eps = 1e-9) {
    let num = Math.round(value * 1e9);
    let den = 1e9;
    let g = gcd(num, den);
    return { num: num / g, den: den / g };
}

let k1 = -down[0];
let k2 = -down[1];
let k3 = -down[2];
let am = dividend;
let bm = dividend * up[0] + divider;
let cm = divider * up[0];

let N_A = (am * k1 * k1 + bm * k1 + cm) / ((k1 - k2) * (k1 - k3));
let N_B = (am * k2 * k2 + bm * k2 + cm) / ((k2 - k1) * (k2 - k3));
let N_C = (am * k3 * k3 + bm * k3 + cm) / ((k3 - k1) * (k3 - k2));

//Приведение к общему знаменателю
let fracA = toFraction(N_A);
let fracB = toFraction(N_B);
let fracC = toFraction(N_C);

let commonDen = lcm(lcm(fracA.den, fracB.den), fracC.den);

let A_int = fracA.num * (commonDen / fracA.den);
let B_int = fracB.num * (commonDen / fracB.den);
let C_int = fracC.num * (commonDen / fracC.den);

//Сокращение общего множителя
let g_all = gcd(gcd(Math.abs(A_int), Math.abs(B_int)), Math.abs(C_int));
if (g_all > 1) {
    A_int /= g_all;
    B_int /= g_all;
    C_int /= g_all;
}

genAssert(A_int<1000, "Числитель должен быть меньше 1000");
genAssert(B_int<1000, "Числитель должен быть меньше 1000");
genAssert(C_int<1000, "Числитель должен быть меньше 1000");

  NAtask.setTask({
   text: '$\\frac{' + A_int + '}{' + 'x' + znak[checkZnak(down[0])] + Math.abs(down[0]) + '} + $' +
    '$\\frac{' + B_int + '}{' + 'x' + znak[checkZnak(down[1])] + Math.abs(down[1]) + '} + $' +
    '$\\frac{' + C_int + '}{' + 'x' + znak[checkZnak(down[2])] + Math.abs(down[2]) + '} \\ge 0 $' +
    ' $\\Leftrightarrow$ ' +
    '$\\frac{' + A_int + '(x' + znak[checkZnak(down[1])] + Math.abs(down[1]) + ')(x' + znak[checkZnak(down[2])] + Math.abs(down[2]) + ')' +
    znak[checkZnak(B_int)] +
    Math.abs(B_int) + '(x' + znak[checkZnak(down[0])] + Math.abs(down[0]) + ')(x' + znak[checkZnak(down[2])] + Math.abs(down[2]) + ')' +
    znak[checkZnak(C_int)] +
    Math.abs(C_int) + '(x' + znak[checkZnak(down[0])] + Math.abs(down[0]) + ')' + '(x' + znak[checkZnak(down[1])] + Math.abs(down[1]) + ')' + '}{' +
    '(x' + znak[checkZnak(down[0])] + Math.abs(down[0]) + ')' + 
    '(x' + znak[checkZnak(down[1])] + Math.abs(down[1]) + ')' +
    '(x' + znak[checkZnak(down[2])] + Math.abs(down[2]) + ')' + '} \\ge 0 $' +
    ' $\\Leftrightarrow$ ' +
    '$\\frac{' + dividend + 'x^2' + znak[checkZnak(dividend * up[0] + divider)] + Math.abs(dividend * up[0] + divider) + 'x' +
    znak2[checkZnak(up[0] * divider)] + Math.abs(up[0] * divider) + '}{' + '(x' + znak[checkZnak(down[0])] + Math.abs(down[0]) + ')' + '(x' +
    znak[checkZnak(down[1])] + Math.abs(down[1]) + ')' + '(x' + znak[checkZnak(down[2])] + Math.abs(down[2]) + ')' + '} \\le 0 $' +
    ' $\\Leftrightarrow$ ' +
    '$\\frac{(' + dividend + 'x' + znak[checkZnak(divider)] + Math.abs(divider) + ')(x' + znak[checkZnak(up[0])] + Math.abs(up[0]) + ')}{' + '(x' + znak[checkZnak(down[0])] + Math.abs(down[0]) + ')' +
    '(x' + znak[checkZnak(down[1])] + Math.abs(down[1]) + ')' + '(x' + znak[checkZnak(down[2])] + Math.abs(down[2]) + ')' + '} \\le 0 $',
   answers: answer,
   authors: ['Сергей Алендарь'],
  });
 }, 1000);
})();
//508440
