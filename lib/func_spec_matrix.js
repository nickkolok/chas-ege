'use strict';

function multiplyMatrix(A,B){//http://mathhelpplanet.com/viewtopic.php?f=44&t=22337
	var rowsA = A.length,
		colsA = A[0].length,
		rowsB = B.length,
		colsB = B[0].length,
		C = [];
	for(var i=0; i<rowsA; i++)
		C[i]=[];
	for(	var k=0; k<colsB; k++)
		for(	var i=0; i < rowsA; i++){
			var temp=0;
			for(	var j = 0; j < rowsB; j++)
				temp += A[i][j]*B[j][k];
			C[i][k] = temp;
		}
	return C;
}

function Determinant(A){	// Определитель матрицы (используется алгоритм Барейса)
	var N=A.length,
		B=[],
		denom=1,
		exchanges=0;
	for(var i=0; i<N; ++i){
		B[i]=[];
		for(var j=0; j<N; ++j)
			B[i][j] = A[i][j];
	}
	for(var i=0; i<N-1; ++i){
		var maxN=i,
		maxValue=Math.abs(B[i][i]);
		for(var j=i+1; j<N; ++j){
			var value=Math.abs(B[j][i]);
			if(value>maxValue){
				maxN=j;
				maxValue = value;
			}
		}
		if(maxN>i){
			var temp = B[i]; B[i] = B[maxN]; B[maxN] = temp;
			++exchanges;
		}else if(maxValue==0)
			return maxValue;
		var value1=B[i][i];
		for(var j = i+1; j < N; ++j){
			var value2=B[j][i];
			B[j][i]=0;
			for(var k=i+1; k<N; ++k)
				B[j][k]=(B[j][k]*value1-B[i][k]*value2)/denom;
		}
		denom=value1;
	} //@ http://mathhelpplanet.com/viewtopic.php?f=44&t=22390
	if(exchanges%2)
		return -B[N-1][N-1];
	else
		return B[N-1][N-1];
}

function MatrixCofactor(i,j,A){   //Алгебраическое дополнение матрицы
	var N=A.length,
		sign=((i+j)%2==0) ? 1 : -1;
	for(var m=0; m<N; m++){
		for(var n=j+1; n<N; n++)
			A[m][n-1]=A[m][n];
		A[m].length--;
	}
	for(var k=i+1; k<N; k++)
		A[k-1] = A[k];
	A.length--;
	return sign*Determinant(A);
}

function AdjugateMatrix(A){   //Союзная (присоединённая) матрица
	var N=A.length,
		B=[],
		adjA=[];
	for(var i=0; i<N; i++){
		adjA[i]=[];
		for(var j=0; j<N; j++){
			for(var m=0; m<N; m++)
			{
				B[m]=[];
				for(var n = 0; n < N; n++)
					B[m][n] = A[m][n];
			}
			adjA[i][j] = MatrixCofactor(j,i,B);
		}
	}
	return adjA;
}

function InverseMatrix(B){   // Обратная матрица
	var det=Determinant(B);
	if(!det)
		return false;
	var N=B.length,
		A = AdjugateMatrix(B);
	for(var i=0; i<N; i++)
		for(var j=0; j<N; j++)
			A[i][j] /= det;
	return A;
}

function objSum(a,b){
/**Сложение двух матриц или двух чисел.*/
	if(!a)
		return b;
	if(!b)
		return a;
	if(a.isNumber && b.isNumber)
		return a+b;
	if(a.isArray && b.isArray)
		return a.map(function(a1,b1){
			return objSum(a1,b[b1]);
		});
	return undefined;
}

function objSubtraction(a,b){
/**Вычитание двух матриц или двух чисел.*/
	if(!a)
		return b;
	if(!b)
		return a;
	if(a.isNumber && b.isNumber)
		return a-b;
	if(a.isArray && b.isArray)
		return a.map(function(a1,b1){
			return objSubtraction(a1,b[b1]);
		});
	return undefined;
}

function objUmn(a,b){
/**Умножение a на b (матрица или число)*/
	if(!a || !b)
		return 0;
	if(a.isNumber && b.isNumber)
		return a*b;
	if(a.isArray && b.isArray)
		return multiplyMatrix(a,b);
	if(a.isArray && b.isNumber)
		return a.map(function(a1){
			return objUmn(a1,b);
		});
	if(b.isArray && a.isNumber)
		return objUmn(b,a);

	return undefined;
}

function arrayOfUniqueValues(length, min, max, p1) {
	/**Генерирует массив из случайных неповторяющихся чисел. min, max и p1 - параметры sluchch.*/
	let result = [];
	p1 = p1 || 1;

	let lengthOfRange = ((1 + max - min) / p1).floor();

	if (lengthOfRange < length) {
		throw new Error('Диапазона недостаточно для заполнения массива');
	}

	if (lengthOfRange == length) {
		for (let index = min; index <= max; index += p1) {
			result.push(index)
		}
		return result.shuffle();
	}

	for (let index = 0; index < length; index++) {
		result.push(slKrome(result, min, max, p1))
	}

	return result;
}

function generateMatrix(stroki,stolbcy,min,max,p1){
/**Генерирует матрицу из случайных чисел. min, max и p1 - параметры sluchch.*/
	var rez=[];
	for(var i=0;i<stroki;i++){
		rez[i]=[];
		for(var j=0;j<stolbcy;j++)
			rez[i][j]=sl(min,max,p1);
	}
	return rez;
}

function generateScalMatrix(x,n){
/**Генерирует скалярную иатрицу n на n с числом x на главной диагонали.*/
	var rez=generateMatrix(n,n,0);
	for(var i=0;i<n;i++)
		rez[i][i]=x;
	return rez;
}

function generateBinaryMatrix(bits) {
/**
 * Генерирует матрицу, содержащую все возможные двоичные строки заданной длины.
 * Каждая строка представлена в виде массива чисел, дополненного количеством нулей в строке.
 *
 * @param {number} bits - Количество битов в каждой двоичной строке.
 * @returns {Array<Array<number>>} Матрица, где каждая строка - массив чисел, представляющий двоичную строку и количество нулей.
 */
    let matrix = [];
    for (let i = 0; i < Math.pow(2, bits); i++) {
        let binaryString = i.toString(2).padStart(bits, '0');
        let binaryArray = Array.from(binaryString, Number);
        let zeroCount = binaryArray.filter(bit => bit === 0).length;
        matrix.push([...binaryArray, zeroCount]);
    }
    return matrix;
}

try {
	global. multiplyMatrix = module.exports. multiplyMatrix = multiplyMatrix ;
	global. Determinant = module.exports. Determinant = Determinant ;
	global. MatrixCofactor = module.exports. MatrixCofactor = MatrixCofactor ;
	global. AdjugateMatrix = module.exports. AdjugateMatrix = AdjugateMatrix ;
	global. InverseMatrix = module.exports. InverseMatrix = InverseMatrix ;
	global. objSum = module.exports. objSum = objSum ;
	global. objUmn = module.exports. objUmn = objUmn ;
	global. generateMatrix = module.exports. generateMatrix = generateMatrix ;
	global. generateBinaryMatrix = module.exports. generateBinaryMatrix = generateBinaryMatrix ;
	global. generateScalMatrix = module.exports. generateScalMatrix = generateScalMatrix ;
	global. arrayOfUniqueValues= module.exports. arrayOfUniqueValues= arrayOfUniqueValues;
} catch (e) {
}
