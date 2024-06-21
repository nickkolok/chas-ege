var mathjsRules = {};

mathjsRules.clearFracAsPower = [
	//It remains a bit unclear how it works
	{ r: 'n1^(c1/c2)', l: 'n1^divide(c1,c2)' },
];

mathjsRules.trigRevTrig = [
	{ l: 'sin(arcsin(n1))', r: 'n1'              },
	{ l: 'sin(arccos(n1))', r:    'sqrt(1-n1^2)' },
	{ l: 'sin(arctg(n1))' , r: 'n1/sqrt(1+n1^2)' },
	{ l: 'sin(arcctg(n1))', r:  '1/sqrt(1+n1^2)' },

	{ l: 'cos(arcsin(n1))', r:    'sqrt(1-n1^2)' },
	{ l: 'cos(arccos(n1))', r: 'n1'              },
	{ l: 'cos(arctg(n1))' , r: ' 1/sqrt(1+n1^2)' },
	{ l: 'cos(arcctg(n1))', r: 'n1/sqrt(1+n1^2)' },

	{ l:  'tg(arcsin(n1))', r: 'n1/sqrt(1-n1^2)' },
	{ l:  'tg(arccos(n1))', r: 'sqrt(1-n1^2)/n1' },
	{ l:  'tg(arctg(n1))' , r: 'n1'              },
	{ l:  'tg(arcctg(n1))', r: '1/n1'            },

	{ l: 'ctg(arcsin(n1))', r: 'sqrt(1-n1^2)/n1' },
	{ l: 'ctg(arccos(n1))', r: 'n1/sqrt(1-n1^2)' },
	{ l: 'ctg(arctg(n1))' , r: '1/n1'            },
	{ l: 'ctg(arcctg(n1))', r: 'n1'              },


	{ l: 'tan(arcsin(n1))', r: 'n1/sqrt(1-n1^2)' },
	{ l: 'tan(arccos(n1))', r: 'sqrt(1-n1^2)/n1' },
	{ l: 'tan(arctg(n1))' , r: 'n1'              },
	{ l: 'tan(arcctg(n1))', r: '1/n1'            },

	{ l: 'cot(arcsin(n1))', r: 'sqrt(1-n1^2)/n1' },
	{ l: 'cot(arccos(n1))', r: 'n1/sqrt(1-n1^2)' },
	{ l: 'cot(arctg(n1))' , r: '1/n1'            },
	{ l: 'cot(arcctg(n1))', r: 'n1'              },


	{ l: 'sin(asin(n1))', r: 'n1'              },
	{ l: 'sin(acos(n1))', r:    'sqrt(1-n1^2)' },
	{ l: 'sin(atan(n1))', r: 'n1/sqrt(1+n1^2)' },
	{ l: 'sin(acot(n1))', r:  '1/sqrt(1+n1^2)' },

	{ l: 'cos(asin(n1))', r:    'sqrt(1-n1^2)' },
	{ l: 'cos(acos(n1))', r: 'n1'              },
	{ l: 'cos(atan(n1))', r: ' 1/sqrt(1+n1^2)' },
	{ l: 'cos(acot(n1))', r: 'n1/sqrt(1+n1^2)' },

	{ l:  'tg(asin(n1))', r: 'n1/sqrt(1-n1^2)' },
	{ l:  'tg(acos(n1))', r: 'sqrt(1-n1^2)/n1' },
	{ l:  'tg(atan(n1))', r: 'n1'              },
	{ l:  'tg(acot(n1))', r: '1/n1'            },

	{ l: 'ctg(asin(n1))', r: 'sqrt(1-n1^2)/n1' },
	{ l: 'ctg(acos(n1))', r: 'n1/sqrt(1-n1^2)' },
	{ l: 'ctg(atan(n1))', r: '1/n1'            },
	{ l: 'ctg(acot(n1))', r: 'n1'              },

	{ l: 'tan(asin(n1))', r: 'n1/sqrt(1-n1^2)' },
	{ l: 'tan(acos(n1))', r: 'sqrt(1-n1^2)/n1' },
	{ l: 'tan(atan(n1))', r: 'n1'              },
	{ l: 'tan(acot(n1))', r: '1/n1'            },

	{ l: 'cot(asin(n1))', r: 'sqrt(1-n1^2)/n1' },
	{ l: 'cot(acos(n1))', r: 'n1/sqrt(1-n1^2)' },
	{ l: 'cot(atan(n1))', r: '1/n1'            },
	{ l: 'cot(acot(n1))', r: 'n1'              },
];

mathjsRules.rusTrig2eng = [
	{ l:  'tg(n1)', r: 'tan(n1)' },
	{ l: 'ctg(n1)', r: 'cot(n1)' },
	{ l:  'arctg(n1)', r: 'atan(n1)' },
	{ l: 'arcctg(n1)', r: 'acot(n1)' },
	{ l: 'arcsin(n1)', r: 'asin(n1)' },
	{ l: 'arccos(n1)', r: 'acos(n1)' },
];

mathjsRules.engTrig2rus = [
	{ r:  'tg(n1)', l: 'tan(n1)' },
	{ r: 'ctg(n1)', l: 'cot(n1)' },
	{ r:  'arctg(n1)', l: 'atan(n1)' },
	{ r: 'arcctg(n1)', l: 'acot(n1)' },
	{ r: 'arcsin(n1)', l: 'asin(n1)' },
	{ r: 'arccos(n1)', l: 'acos(n1)' },
];

mathjsRules.omit1pi = [
	{ l:  '(1 pi)/n1', r:  'pi/n1' },
	{ l: '(-1 pi)/n1', r: '-pi/n1' },
];

mathjsRules.omit1sqrt = [
	{ l: '1 sqrt(n1)', r:  'sqrt(n1)' },
];

mathjsRules.reduceFractions = [
	{ l: 'c1/c2', r: 'forceSimplifyConstants(divide(c1,c2))' },
	mathjs_helpers.forceSimplifyConstantsInNode,
];

mathjsRules.reduceFractionsPi = [
	{ l: 'c1*pi/c2', r: 'forceSimplifyConstants(divide(c1,c2)*pi)' },
	{ l: 'c1 pi/c2', r: 'forceSimplifyConstants(divide(c1,c2)*pi)' },
	//{ l: 'divide(c1*pi,c2)', r: 'forceSimplifyConstants(divide(c1*pi,c2))' },
	//{ l: 'divide(c1 pi,c2)', r: 'forceSimplifyConstants(divide(c1*pi,c2))' },
	mathjs_helpers.forceSimplifyConstantsInNode,
	{ l: 'c1/c2*pi', r: '(c1 pi)/c2' },
];

mathjsRules.trig2trigPow = [
	{ l:  '(sin(n1))^n2', r:  'sinpow(n1,n2)' },
	{ l:  '(cos(n1))^n2', r:  'cospow(n1,n2)' },
	{ l:  'sin(n1)', r:  'sinpow(n1,1)' },
	{ l:  'cos(n1)', r:  'cospow(n1,1)' },
];

mathjsRules.safeTrivialSimplification = [
	{ l: "+n1",    r: "n1" },
	{ l: "n1+0",   r: "n1" },
	{ l: "n1-0",   r: "n1" },
	{ l: "n1*1",   r: "n1" },
	{ l: "1 n1",   r: "n1" },
	{ l: "-1*n1",   r: "-n1" },
	{ l: "n3 + n1*-c2", r: "n3 -c2 n1" },
	{ l: "n1*-c2", r: "-c2 n1" },
	{ l: "n1*-n2", r: "(-n1)*n2" },
	{ l: "n1+-n2", r: "n1-n2" },
	{ l: 'n1+-n2*n3', r: 'n1-n2*n3' },
];

//TODO: negative summands cannot be the first. That should be fixed!
mathjsRules.shuffleSums = [
	//{ l:  'n1-n2', r: 'n1+(-n2)'},
	// It is hard (if even possible) to declare a function with arbitrary number of arguments
	{ l:  'n1+n2+n3+n4+n5+n6+n7+n8', r:  'shuffledSumG(n1,n2,n3,n4,n5,n6,n7,n8)' },
	{ l:  'n1+n2+n3+n4+n5+n6+n7', r:  'shuffledSumF(n1,n2,n3,n4,n5,n6,n7)' },
	{ l:  'n1+n2+n3+n4+n5+n6', r:  'shuffledSumE(n1,n2,n3,n4,n5,n6)' },
	{ l:  'n1+n2+n3+n4+n5', r:  'shuffledSumD(n1,n2,n3,n4,n5)' },
	{ l:  'n1+n2+n3+n4', r:  'shuffledSumC(n1,n2,n3,n4)' },
	{ l:  'n1+n2+n3', r:  'shuffledSumB(n1,n2,n3)' },
	{ l:  'n1+n2', r:  'shuffledSumA(n1,n2)' },
	mathjs_helpers.shuffleSumsInNode,
	{ r:  'n1+n2+n3+n4+n5+n6+n7+n8', l:  'shuffledSumG(n1,n2,n3,n4,n5,n6,n7,n8)' },
	{ r:  'n1+n2+n3+n4+n5+n6+n7', l:  'shuffledSumF(n1,n2,n3,n4,n5,n6,n7)' },
	{ r:  'n1+n2+n3+n4+n5+n6', l:  'shuffledSumE(n1,n2,n3,n4,n5,n6)' },
	{ r:  'n1+n2+n3+n4+n5', l:  'shuffledSumD(n1,n2,n3,n4,n5)' },
	{ r:  'n1+n2+n3+n4', l:  'shuffledSumC(n1,n2,n3,n4)' },
	{ r:  'n1+n2+n3', l:  'shuffledSumB(n1,n2,n3)' },
	{ r:  'n1+n2', l:  'shuffledSumA(n1,n2)' },
	//{ r:  '-n2+n1', l: 'n1+(-n2)'},
	//{ r:  '-n2+n1', l: '-(n2)+n1'},
];
