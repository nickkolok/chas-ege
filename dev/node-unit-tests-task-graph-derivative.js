'use strict';

/**
 * Тесты для NAtask.setTaskWithGraphOfFunctionDerivative (src/chas2/task.js)
 * Подключаются через require() в run-node-tests.js
 *
 * Функция опирается на всю сборку (genAssert, createSpline, NAtask.setTask,
 * модификаторы), поэтому здесь поднимается отдельное окно jsdom и в него
 * загружается build/lib/chas-uijs.js — так же, как это делает
 * dev/run-node-template.js. В окне подменяются createSpline и paintSpline:
 * подмена запоминает построенный сплайн и отмеченные точки, после чего ответ
 * каждой сгенерированной задачи пересчитывается независимо, без функций
 * lib/math_functions.js, и сравнивается с ответом задачи.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { JSDOM, VirtualConsole } = require('jsdom');

const projectRoot = path.join(__dirname, '..');

function createTaskWindow() {
    const dom = new JSDOM('<!DOCTYPE html><html><body>' +
        '<div id="document-write"></div><div id="legacyMenuKeeper"></div><div id="legacySliderKeeper"></div>' +
        '<div id="readiness-message"></div><div id="typesettable-wrap"><div id="question" class="question"></div>' +
        '<div id="resh" class="question"></div><div id="answer"></div><div id="wrongAnswer"></div></div>' +
        '<div id="wrap"><div id="panel"><input id="answer-input"></div></div><div id="scripts"></div></body></html>', {
        url: 'http://localhost/dist/sh/otladka.html',
        runScripts: 'dangerously',
        pretendToBeVisual: true,
        virtualConsole: new VirtualConsole(),
    });
    const window = dom.window;
    const context = dom.getInternalVMContext();
    const run = (code, filename) => vm.runInContext(code, context, { filename: filename });

    run(`
        window.chas = {
            maintainer: 'node-tests',
            mode: { svinta: true, root: '../', extPath: '../ext/', forceminjs: false },
            design: { menuKeeperId: 'legacyMenuKeeper', sliderKeeperId: 'legacySliderKeeper' },
            version: '0',
        };
        window.MathJax = {
            isReady: true,
            Hub: { Typeset() {}, Queue() {}, Config() {}, Register: { StartupHook() {}, MessageHook() {} } },
            Ajax: { loadComplete() {}, Require() {} },
        };
        window.alert = function () {};
        window.CanvasRenderingContext2D = function () {};
        window.CanvasRenderingContext2D.prototype = {};
        if (!window.ImageData) { window.ImageData = function () {}; }
    `, '<stubs>');
    run(fs.readFileSync(path.join(projectRoot, 'build', 'lib', 'chas-uijs.js'), 'utf8'), 'chas-uijs.js');
    window.dvig.dgn = 0;
    run(fs.readFileSync(path.join(projectRoot, 'node_modules', 'seedrandom', 'seedrandom.min.js'), 'utf8'), 'seedrandom.min.js');
    run(`
        window.__originalCreateSpline = window.createSpline;
        window.createSpline = function (options) {
            var result = window.__originalCreateSpline(options);
            window.__lastSpline = { result: result, options: options };
            return result;
        };
        window.__originalPaintSpline = window.paintSpline;
        window.paintSpline = function (options) {
            window.__lastPaint = { points: (options.points || []).slice(), type: options.markedPoints && options.markedPoints.type };
            return window.__originalPaintSpline(options);
        };
    `, '<capture>');
    return { window, run };
}

/**
 * Независимая проверка одной задачи.
 * input: { txt, ver, func, painFunc, options, paint }
 * Возвращает { st: 'ok' | 'amb' | 'WRONG' | 'unparsed', lint: [...], notes: [...], ... }.
 * 'amb' — ответ расходится, но отличие лежит у границы, которую на рисунке не различить.
 */
function verifyTask(input) {
var g=input.painFunc,f=input.func,o=input.options,P=input.paint,minX=o.minX,maxX=o.maxX,der=o.type==='derivative';
var raw=String(input.txt).replace(/<canvas[\s\S]*?<\/canvas>/g,'');
var t=raw.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
var ver=Array.prototype.slice.call(input.ver);
var out={type:o.type,minX:minX,maxX:maxX,stepForX:o.stepForX,text:t,ver:ver,lint:[],notes:[]};
// ---------- оформление текста
if(/\s{2,}/.test(raw.replace(/<[^>]+>/g,'')))out.lint.push('двойной пробел');
if(/\$\[[^\]$]*\$/.test(t))out.lint.push('нет закрывающей ]');
if(/undefined|NaN|\[object/.test(t))out.lint.push('undefined/NaN в тексте');
if(/^В какой|В какой точке/.test(t.replace(/^.*?\.\s/,''))&&!/\?\s*$/.test(t))out.lint.push('вопрос без вопросительного знака');
if(/\d\.\d/.test(t))out.lint.push('десятичная точка в тексте');
if(ver.length!==1)out.lint.push('ответов: '+ver.length);
var got=Number(String(ver[0]).replace(',','.').replace('−','-'));
if(!isFinite(got))out.lint.push('ответ не число: '+ver[0]);
// ---------- независимая численная часть
var H=1e-3,N=Math.round((maxX-minX)/H);
function bis(fn,a,b){var fa=fn(a);for(var i=0;i<60;i++){var m=(a+b)/2,fm=fn(m);if((fa<0)===(fm<0)){a=m;fa=fm}else b=m}return (a+b)/2}
function zeros(fn,lo,hi){var r=[],px=lo,pv=fn(lo);var n=Math.round((hi-lo)/H);for(var i=1;i<=n;i++){var x=i===n?hi:lo+i*H,v=fn(x);if(pv===0){r.push({x:px,dir:v>0?'up':'down'})}else if(pv*v<0){r.push({x:bis(fn,px,x),dir:v>0?'up':'down'})}px=x;pv=v}return r}
function slope(fn,x){return (fn(x+1e-4)-fn(x-1e-4))/2e-4}
function extremes(fn,lo,hi){return zeros(function(x){return slope(fn,x)},lo+2e-4,hi-2e-4).map(function(z){return {x:z.x,kind:z.dir==='up'?'min':'max'}})}
var gz=zeros(g,minX,maxX), gext=extremes(g,minX,maxX);
var fext=der?gz.map(function(z){return {x:z.x,kind:z.dir==='up'?'min':'max'}}):gext;
var fprime=function(x){return der?g(x):slope(g,x)};
if(der){var fe2=extremes(f,minX,maxX);if(fe2.length!==fext.length||fe2.some(function(e,i){return Math.abs(e.x-fext[i].x)>5e-3||e.kind!==fext[i].kind}))out.notes.push('экстремумы func не совпадают с нулями графика');}
out.fext=fext.map(function(e){return [+e.x.toFixed(4),e.kind]});
// ---------- разбор вопроса
var q=t.replace(/^На рисунке изображён график.*?(\)\$\.|\$y=f\(x\)\$\.|функции \$f\(x\)\$\.)\s*/,'');
out.q=q;
var seg=null,m=q.match(/на отрезке \$\[(-?[\d,]+);(-?[\d,]+)\]?\$/)||q.match(/точке отрезка \$\[(-?[\d,]+);(-?[\d,]+)\]?\$/);
if(m)seg=[+m[1].replace(',','.'),+m[2].replace(',','.')];
var AMB=0.12; // ближе этого на рисунке не различить
function agg(set,word){var R=set.map(function(x){return Math.round(x)});
 if(/сумму/.test(word))return R.reduce(function(a,b){return a+b},0);
 if(/произведение/.test(word))return R.reduce(function(a,b){return a*b},1);
 if(/количество/.test(word))return set.length;
 if(/наибольшую/.test(word))return set.length?Math.max.apply(null,R):null;
 if(/наименьшую/.test(word))return set.length?Math.min.apply(null,R):null;
 return undefined}
var exp,amb=false,kind,set;
function inDom(x){return seg?(x>=seg[0]-1e-9&&x<=seg[1]+1e-9):(x>minX&&x<maxX)}
function ints(){var r=[];for(var x=Math.ceil(minX);x<=Math.floor(maxX);x++)if(x>minX&&x<maxX)r.push(x);return r}
var mk=q.match(/^На оси абсцисс отмечены ([^:]+): \$(.*?)\$\.\s*(.*)$/);
if(mk){ // отмеченные точки
 kind='marked';var pts=P?P.points:[];var rest=mk[3];
 var listed=mk[2];var cnt=parseInt(mk[1]);if(cnt!==pts.length)out.lint.push('в тексте '+cnt+' точек, на рисунке '+pts.length);
 if(P&&P.type==='number'){var nums=listed.split(';').map(function(s){return +s.trim().replace(',','.')});if(nums.length!==pts.length||nums.some(function(v,i){return Math.abs(v-pts[i])>1e-9}))out.lint.push('перечень точек в тексте не совпадает с рисунком')}
 if(pts.some(function(p){return Math.abs(p-Math.round(p*10)/10)>1e-9}))out.lint.push('точки с длинной дробной частью');
 var sg=/положительна|возрастает/.test(rest)?1:(/отрицательна|убывает/.test(rest)?-1:0);
 if(sg&&/количество/.test(rest)){set=pts.filter(function(p){return sg*fprime(p)>0});exp=set.length;
   var scale=Math.max.apply(null,pts.map(function(p){return Math.abs(fprime(p))}).concat([1e-9]));
   amb=pts.some(function(p){return fext.some(function(e){return Math.abs(e.x-p)<AMB})});
   if(!der){/* знак производной по графику функции: рядом с экстремумом не различить */}
   else{amb=pts.some(function(p){return Math.abs(g(p))<0.3})}}
 else if(/принимает (наибольшее|наименьшее) значение/.test(rest)){var big=/наибольшее/.test(rest);var vals=pts.map(fprime);var best=0;for(var i=1;i<pts.length;i++)if(big?vals[i]>vals[best]:vals[i]<vals[best])best=i;exp=pts[best];
   var sorted=vals.slice().sort(function(a,b){return big?b-a:a-b});amb=sorted.length>1&&Math.abs(sorted[0]-sorted[1])<0.7;set=pts;out.notes.push('значения производной: '+vals.map(function(v){return v.toFixed(2)}).join(' '))}
 else kind='unparsed';
}else if(/^В какой точке отрезка/.test(q)){kind='argext';var big2=/наибольшее/.test(q);if(!seg){kind='unparsed'}else{var bx=seg[0],bv=f(seg[0]);for(var x2=seg[0];x2<=seg[1]+1e-9;x2+=1e-3){var v2=f(x2);if(big2?v2>bv:v2<bv){bv=v2;bx=x2}}exp=Math.round(bx);if(Math.abs(bx-Math.round(bx))>0.25)out.notes.push('точка наибольшего/наименьшего значения не целая: '+bx.toFixed(3));
   // вторая по величине кандидатура: значения на концах
   var ev=[f(seg[0]),f(seg[1])];var other=big2?Math.max.apply(null,ev):Math.min.apply(null,ev);if(Math.abs(bx-seg[0])>1e-6&&Math.abs(bx-seg[1])>1e-6&&Math.abs(other-bv)<1e-9)amb=true;
   if(seg[0]<=minX||seg[1]>=maxX)out.lint.push('отрезок выходит за интервал');if(seg[0]>=seg[1])out.lint.push('вырожденный отрезок');set=[bx]}}
else if(/по длине интервал, на котором/.test(q)){kind='interval';var inc=/возрастает/.test(q);var b=[minX].concat(fext.map(function(e){return e.x}),[maxX]);var lens=[];for(var i2=1;i2<b.length;i2++){var mid=(b[i2-1]+b[i2])/2;if((fprime(mid)>0)===inc)lens.push(Math.round(b[i2])-Math.round(b[i2-1]))}
   exp=lens.length?(/наибольший/.test(q)?Math.max.apply(null,lens):Math.min.apply(null,lens)):null;set=lens;if(fext.some(function(e){return Math.abs(e.x-Math.round(e.x))>0.25}))out.notes.push('концы интервалов не целые')}
else if(/целых точек?, в которых (производная функции \$f\(x\)\$|функция( \$f\(x\)\$)?) (положительна|отрицательна|возрастает|убывает)/.test(q)){
 var mm=q.match(/(положительна|отрицательна|возрастает|убывает)/)[1];var isDer=/производная функции/.test(q);var s3=(mm==='положительна'||mm==='возрастает')?1:-1;
 if(isDer){kind='fprime-sign';set=ints().filter(function(x){return s3*fprime(x)>0});amb=ints().some(function(x){return fext.some(function(e){return Math.abs(e.x-x)<AMB&&Math.abs(e.x-x)>1e-6})})}
 else if(mm==='возрастает'||mm==='убывает'){kind='monotone';// промежутки монотонности замкнуты: точки экстремума входят
   var bb=[minX].concat(fext.map(function(e){return e.x}),[maxX]);set=ints().filter(function(x){for(var i=1;i<bb.length;i++){var lo=bb[i-1],hi=bb[i],mid=(lo+hi)/2;if(s3*fprime(mid)>0&&x>=Math.round(lo*1e6)/1e6-1e-6&&x<=hi+1e-6)return true}return false});
   amb=ints().some(function(x){return fext.some(function(e){return Math.abs(e.x-x)<AMB&&Math.abs(e.x-x)>1e-4})})}
 else{kind='f-sign';set=ints().filter(function(x){return s3*g(x)>0})}
 exp=agg(set,q)}
else if(/параллельна графику функции \$y=([^$]*x[^$]*)\$/.test(q)){kind='tangent-k';var eq=q.match(/\$y=([^$]*)\$/)[1].replace(/,/g,'.').replace(/−/g,'-');var km=eq.match(/([+-]?\d*\.?\d*)x/);var k=km[1]===''||km[1]==='+'?1:(km[1]==='-'?-1:+km[1]);
   var sol=zeros(function(x){return fprime(x)-k},minX+1e-6,maxX-1e-6).map(function(z){return z.x});set=sol;out.notes.push('k='+k);
   if(/абсциссу точки/.test(q)){exp=sol.length?Math.round(sol[0]):null;if(sol.length!==1)out.notes.push('НЕОДНОЗНАЧНО: решений '+sol.length);if(sol.some(function(x){return Math.abs(x-Math.round(x))>0.25}))out.notes.push('решение не целое')}
   else exp=agg(sol,q);
   amb=gext.some(function(e){return Math.abs(g(e.x)-k)<0.6})}
else if(/точ(ек|ки|ку) (экстремума|минимума|максимума)|решени(й|е) уравнения \$f'\(x\)=0\$|равна нулю|параллельна оси абсцисс|параллельна графику функции \$y=/.test(q)){
 kind='extrema';var kk=(q.match(/точ(?:ек|ки|ку) (экстремума|минимума|максимума)/)||[])[1]||'экстремума';
 var all=fext.filter(function(e){return kk==='экстремума'||(kk==='минимума')===(e.kind==='min')});
 set=all.filter(function(e){return inDom(e.x)}).map(function(e){return e.x});
 if(seg){amb=all.some(function(e){return Math.min(Math.abs(e.x-seg[0]),Math.abs(e.x-seg[1]))<0.45&&Math.min(Math.abs(e.x-seg[0]),Math.abs(e.x-seg[1]))>1e-9});if(seg[0]<=minX||seg[1]>=maxX)out.lint.push('отрезок выходит за интервал')}
 if(set.some(function(x){return Math.abs(x-Math.round(x))>0.3}))out.notes.push('точка не целая, а в ответе округлена');
 var single=/(Найдите|Определите) (точку|решение|абсциссу точки)/.test(q);
 if(single){exp=set.length?Math.round(set[0]):null;if(set.length!==1){out.notes.push('НЕОДНОЗНАЧНО: подходящих точек '+set.length);if(set.some(function(x){return Math.round(x)===got}))exp=got}}
 else exp=agg(set,q)}
else kind='unparsed';
out.kind=kind;out.exp=exp;out.got=got;out.set=set&&set.map(function(x){return +(+x).toFixed(4)});
var same=(typeof exp==='number')&&Math.abs(got-exp)<1e-9;
out.st=kind==='unparsed'?'unparsed':(exp===undefined?'unparsed':(same?'ok':(amb?'amb':'WRONG')));
if(exp===null)out.notes.push('вопрос о пустом множестве');
return out;
}

module.exports = function registerTaskGraphDerivativeTests(QUnit) {

    let environment = null;
    function env() {
        if (!environment) {
            environment = createTaskWindow();
        }
        return environment;
    }

    // Генерирует count задач с настройками settings и проверяет каждую.
    // Отбракованные генератором попытки (genAssert) повторяются, как в retryWhileError.
    function generateAndVerify(seed, settings, count, maxAttempts) {
        const { window, run } = env();
        window.Math.seedrandom(String(seed));
        const results = [];
        let attempts = 0;
        while (results.length < count && attempts < maxAttempts) {
            attempts++;
            window.vopr.podg();
            window.__lastSpline = null;
            window.__lastPaint = null;
            // Настройки создаются внутри окна: функция пользуется методами,
            // добавленными в Array.prototype этого окна
            run('window.__settings = ' + JSON.stringify(settings) + ';', '<settings>');
            try {
                run('NAtask.setTaskWithGraphOfFunctionDerivative(window.__settings);', '<call>');
            } catch (e) {
                continue;
            }
            results.push(verifyTask({
                txt: String(window.vopr.txt),
                ver: window.vopr.ver,
                func: window.__lastSpline.result.func,
                painFunc: window.__lastSpline.result.painFunc,
                options: window.__lastSpline.options,
                paint: window.__lastPaint,
            }));
        }
        return results;
    }

    const describe = result => result.q + ' | ответ ' + result.got + ', ожидалось ' + result.exp +
        ' | ' + result.lint.concat(result.notes).join('; ');

    const bounds = { minX: -8, maxX: 8, minY: -9, maxY: 8, stepForX: 4, stepForY: 0.3 };

    // name: [настройки, сколько задач, какой вид вопроса ожидается]
    const cases = {
        'график функции: целые точки, производная положительна': [
            { type: 'function', boundariesOfGraph: bounds, extremumsIsInteger: { int: 'no', tolerance: 0.2 },
                questionsF: { main: 'integer_points', conditions: ['derivative_is_positive'], variants: ['sum', 'production', 'number', 'largest', 'smallest'] } },
            10, 'fprime-sign'],
        'график функции: целые точки, производная отрицательна': [
            { type: 'function', boundariesOfGraph: bounds, extremumsIsInteger: { int: 'no', tolerance: 0.2 },
                questionsF: { main: 'integer_points', conditions: ['derivative_is_negative'], variants: ['sum', 'production', 'number', 'largest', 'smallest'] } },
            10, 'fprime-sign'],
        'график производной: в какой точке отрезка функция принимает наибольшее или наименьшее значение': [
            { type: 'derivative', boundariesOfGraph: Object.assign({}, bounds, { stepForY: 0.1 }), minimumDifferenceBetweenExtremes: 0,
                numberOfRoots: { min: 2, max: 10 }, numberOfExtremes: { min: 2, max: 10 }, rootsIsInteger: { int: 'yes', tolerance: 0.09 },
                questionsF: { main: 'point', conditions: ['value_on_the_segment'], variants: ['smallest_value', 'largest_value'] } },
            8, 'argext'],
        'график производной: наименьшее значение на отрезке внутри промежутка монотонности': [
            { type: 'derivative', boundariesOfGraph: Object.assign({}, bounds, { stepForY: 0.1 }), minimumDifferenceBetweenExtremes: 0,
                numberOfRoots: { min: 1, max: 3 }, numberOfExtremes: { min: 2, max: 10 },
                questionsF: { main: 'point', conditions: ['value_on_the_segment_with_ends'], variants: ['smallest_value'] } },
            12, 'argext'],
        'график производной: наибольшее значение на отрезке внутри промежутка монотонности': [
            { type: 'derivative', boundariesOfGraph: Object.assign({}, bounds, { stepForY: 0.1 }), minimumDifferenceBetweenExtremes: 0,
                numberOfRoots: { min: 1, max: 3 }, numberOfExtremes: { min: 2, max: 10 },
                questionsF: { main: 'point', conditions: ['value_on_the_segment_with_ends'], variants: ['largest_value'] } },
            12, 'argext'],
    };

    QUnit.module('Task: setTaskWithGraphOfFunctionDerivative');

    Object.keys(cases).forEach(function (name) {
        QUnit.test(name, function (assert) {
            const [settings, count, kind] = cases[name];
            const results = generateAndVerify(name, Object.assign({ canvasSettings: {} }, settings), count, 20000);
            assert.equal(results.length, count, 'сгенерировано задач: ' + count);
            assert.deepEqual(results.filter(r => r.kind !== kind).map(describe), [], 'вопрос распознан как «' + kind + '»');
            assert.deepEqual(results.filter(r => r.st === 'WRONG' || r.st === 'unparsed').map(describe), [], 'ответы верны');
            assert.deepEqual(results.filter(r => r.lint.length > 0).map(describe), [], 'текст оформлен без огрехов');
            assert.deepEqual(results.filter(r => r.notes.some(n => /НЕОДНОЗНАЧНО|пустом множестве/.test(n))).map(describe), [],
                'вопрос однозначен');
        });
    });
};
