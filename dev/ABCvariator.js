'use strict';
//TODO: separate this!!
Array.prototype.shuffle = function(b){
/**Перемешивает массив случайным образом. Если b, то ещё и рекурсивно на один уровень.*/
	var i = this.length, j, t;
	while(i)
	{
		j=Math.floor( ((i--)*Math.random() ));
		t=b && typeof this[i].shuffle!=='undefined' ? this[i].shuffle() : this[i];
		this[i]=this[j];
		this[j]=t;
	}
	return this;
};//за основу взят пример с tigir.com

Array.prototype.permuteCyclic = function (repeat) {
/** Циклическая перестановка массива*/
/** [1,2,3,4].permuteCyclic(1)==>[4,1,2,3]*/
	repeat %= this.length;

	//Handling negative permutations
	repeat += this.length * (repeat < 0);

	let tail = this.splice(this.length - repeat);
	return tail.concat(this);
};


class ABCvariator {
	constructor(){
		this.shuffledLetters = ABCvariator.latinLetters.slice().shuffle();
		this.encodeMap = {};
		this.decodeMap = {};
		for(let i = 0; i < shuffledLetters.length; i++){
			encodeMap[ABCvariator.latinLetters[i]] = shuffledLetters[i];
			decodeMap[shuffledLetters[i]] = ABCvariator.latinLetters[i];
		}
	};

	replace(str, map){
		let oldStr;
		for(let letter in map){
			//TODO: String.replaceAll
			do{
				oldStr = str;
				str = str.replace(letter, map[letter]);
			}while(oldStr !== str);
		}
		return str;
	};

	encode(str){
		return this.replace(str, encodeMap);
	};

	decode(str){
		return this.replace(str, decodeMap);
	};

	rndChoice(){
		return Math.random() > 0.5;
	};

	rndInt(n){
		return Math.floor(Math.random() * n);
	};

	angle(str){
		return this.encode(this.rndChoice()? str : str.split('').reverse().join(''));
	};

	polygon(str){
		arr = str.split('');
		if(this.rndChoice()){
			arr.reverse();
		}
		arr.permuteCyclic(rndInt(arr.length));
		return this.encode(arr.join(''));
	};

	shuffle(str){
		return this.encode(str.split('').shuffle().join(''));
	};
};


Object.defineProperty(ABCvariator, 'latinLetters', {
	value: [
	  "A",
	  "B",
	  "C",
	  "D",
	  "F",
	  "G",
	  "H",
	  "J",
	  "L",
	  "M",
	  "N",
	  "P",
	  "R",
	  "S",
	  "T",
	  "Q",
	  "U",
	  "W",
	  "X",
	  "Y",
	],
	writable:false,
});




module.exports = ABCvariator;
