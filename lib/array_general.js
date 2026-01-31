'use strict';

/**
 * This file contains Array.prototype embeddings,
 * that seem to be general enough to be
 * probably useful for other projects.
 * These functions should NOT depend on other chas-ege libs.
**/


Array.prototype.permuteCyclic = function (repeat) {
/** Циклическая перестановка массива*/
/** [1,2,3,4].permuteCyclic(1)==>[4,1,2,3]*/
	repeat %= this.length;

	//Handling negative permutations
	repeat += this.length * (repeat < 0);

	let tail = this.splice(this.length - repeat);
	this.splice(0, 0, ...tail);

	return this;
}

/**
 * Генерирует все возможные уникальные пары элементов массива
 * @param {Array} array - Исходный массив
 * @returns {Array} Новый массив, содержащий все уникальные пары элементов
 * @example
 * const pairs = Array.generatePairs([1, 2, 3]);
 * // pairs = [[1, 2], [1, 3], [2, 3]]
 */
Array.generatePairs = function() {
    if (!this || this.length <= 1) {
        return [];
    }

    let pairs = [];
    for (let i = 0; i < this.length; i++) {
        for (let j = i + 1; j < this.length; j++) {
            pairs.push([this[i], this[j]]);
        }
    }

    return pairs;
};

Array.prototype.shuffle = function(b){
/**Перемешивает массив случайным образом. Если b, то ещё и рекурсивно на один уровень.*/
	var i = this.length, j, t;
	while(i)
	{
		j=((i--)*Math.random() ).floor();
		t=b && typeof this[i].shuffle!=='undefined' ? this[i].shuffle() : this[i];
		this[i]=this[j];
		this[j]=t;
	}
	return this;
};//за основу взят пример с tigir.com


Array.prototype.shuffleJoin = function (separator){
	/** Перемешивает и соединяет массив*/
	separator = separator || '';
	return this.shuffle().join(separator);
}

Array.prototype.joinLast = function(conjunctionForFirst, conjunctionForLast) {
	/**Если  conjunctionForFirst -
	Соединяет массив запятыми и соединяет два последних элемента conjunctionForFirst */
	/**Если  conjunctionForFirst и conjunctionForLast -
	Соединяет массив conjunctionForFirst и соединяет два последних элемента conjunctionForLast */
	if (conjunctionForLast != undefined) {
		return this.slice(0, this.length - 1).join(conjunctionForFirst) + conjunctionForLast + this[this.length - 1];
	}
	return this.slice(0, this.length - 1).join(', ') + conjunctionForFirst + this[this.length - 1];

}


Array.prototype.min=function(f){
/**Индекс минимального элемента числового массива. Если f, то первого, иначе последнего.*/
	var i;
	var m=0;
	if(f){
		for(i=this.length;i;i--)
			if(this[i]<=this[m])
				m=i;
	}else
		for(i=this.length;i;i--)
			if(this[i]<this[m])
				m=i;
	return m;
}

Array.prototype.max=function(f){
/**Индекс максимального элемента числового массива. Если f, то первого, иначе последнего.*/
	var i;
	var m=0;
	if(f){
		for(i=this.length;i;i--){
			if(this[i]>=this[m]){
				m=i;
			}
		}
	}else{
		for(i=this.length;i;i--){
			if(this[i]>this[m]){
				m=i;
			}
		}
	}
	return m;
}

Array.prototype.minE=function(){
/**Минимальный элемент числового массива.*/
	return this[this.min()];
}

Array.prototype.maxE=function(){
/**Максимальный элемент числового массива.*/
	return this[this.max()];
}

Array.prototype.last = function() {
/**Возвращает последний элемент массива. Простенько и со вкусом!*/
    return this[this.length - 1];
}

Array.prototype.pushIf=function(element, condition){
/**Добавляет в массив element, если выполнено condition.*/
	if(condition){
		this.push(element);
	}
}

Array.prototype.pushUnique = function (...elements) {
	/** Добавляет в массив elements, но только те элементы, которых ещё нет. */
	for (let el of elements) {
		if (!this.includes(el)) {
			this.push(el);
		}
	}
};

Array.prototype.sortDelDubl=function(p1){
/**Отсортировать копию массива по функции p1 (может быть опущена) и удалить дублирующиеся элементы*/
	if(this===[])
		return [];
	var a=this.slice().sort(p1);
	for(var i=0;i<a.length;i++)
		if(a[i]==a[i+1])
			a.splice(i--,1);
	return a;
}

Array.prototype.hasDubl=function(){
/**Есть ли в массиве дублирующиеся элементы*/
	if(this===[])
		return 0;
	var a=this.slice().sort();
	for(var i=0;i<a.length;i++)
		if(a[i]==a[i+1])
			return 1;
	return 0;
}

/**
 * Определяет, содержит ли массив элементы, которые почти равны друг другу
 * с заданной точностью.
 *
 * @param {number} accuracy - Точность сравнения элементов. 
 * Если не указано, то сравнение проводится с EPSILON
 * @returns {boolean} Возвращает true, если в массиве есть элементы, почти равные друг другу,
 * иначе false.
 */
Array.prototype.hasAlmostDuplicateNumbers = function(accuracy) {
    for (let i = 0; i < this.length; i++) {
        for (let j = i + 1; j < this.length; j++) {
            if (this[i].isAlmostEqual(this[j], accuracy)) {
                return true;
            }
        }
    }
    return false;
};

Array.prototype.copyAr=function() {
/**Если массив содержит вложенные, slice не подходит*/
	var ar = [];
	for (var i=0; i<this.length; i++){
		if (Array.isArray(this[i])){
			ar[i] = this[i].copyAr();
		}
		else {
			ar[i] = this[i];
		}
	}
	return ar;
}

Array.prototype.sortNumeric=function(){
/**Сортировка численного массива.*/
	return this.sort(function(a,b){
		return a-b;
	});
}

// See also:
//https://www.npmjs.com/package/fp_prototypes#Looks great!
//https://www.npmjs.com/package/more-array-methods
//https://www.npmjs.com/package/randomized-array
//https://www.npmjs.com/package/array-prototype-utils
//https://www.npmjs.com/package/proto.underscore
//https://www.npmjs.com/package/array-sugar
//https://www.npmjs.com/package/array.prototype.splitrandom
//https://www.npmjs.com/package/prototypes-array
//https://www.npmjs.com/package/array-smoosh
//https://www.npmjs.com/package/array.prototype.puresplice

