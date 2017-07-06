(function() {

NAinfo.requireApiVersion(0, 2);

var types = [
	['int', 'целочисленный', function(){return sl(-200,200);}],
	['char', 'символьный', function(){return '\'' + String.fromCharCode(sl('a'.charCodeAt(0),'z'.charCodeAt(0))) + '\'';}],
	['bool', 'логический', function(){return ['true', 'false'].iz();}],
	['double', 'вещественный', function(){return sl(-200,200,0.01).ts().replace(',','.');}],
	['float', 'вещественный',  function(){return sl(-200,200,0.01).ts().replace(',','.');}],
];

var theType = types.iz();

var wrongTypes = [];
types.map(function(t) {
	if (t[1] !== theType[1]) {
		wrongTypes.push(t[1]);
	}
});

var name = String.fromCharCode(sl('a'.charCodeAt(0),'z'.charCodeAt(0)));

var taken = {name: true};

var rows = [];


for (var i = 0; i < sl(3,5); i++){
	var anotherName1 = i ? String.fromCharCode(sl('a'.charCodeAt(0),'z'.charCodeAt(0))) : name;
	var anotherName2 = String.fromCharCode(sl('a'.charCodeAt(0),'z'.charCodeAt(0)));
	if (!taken[anotherName1]) {
		taken[anotherName1] = true;
		var t =  i ? types.iz() : theType;
		rows.push(
			t[0] + ' ' + anotherName1 + (' = ' + t[2]()).esli(sl1()) +
				(', '+anotherName2 + (' = ' + t[2]()).esli(sl1())).esli(sl1() && !taken[anotherName2]) +
				';'
		);
		taken[anotherName2] = true;
	}
}

rows.shuffle();


chas2.task.setTask({
	text: 'Какой тип имеет переменная <b>' + name + '</b> ?' +
		'<pre>' + rows.join('\n') + '</pre><br/>',
	answers:  [
	    theType[1],
	],
	wrongAnswers: wrongTypes,
});
AtoB();

})();

