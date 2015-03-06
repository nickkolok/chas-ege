'use strict';

function lz_main(string){
	var vars=[];
	
}

function lz_split(string){
	if(!string)
		return [[]];
	var mas=string.reverse().split(/\s(?=[?!.,:;-])/).reverse().reverseElems();
	var len=mas.length;
	if(mas[len-1]==''){
		mas.length--;
		len--;
	}
	var temp;
	for(var i=0;i<len;){
		if(mas[i]==''){
			mas.splice(i,1);
			len--;
			continue;
		}
		temp=mas[i].match(/[?!.,:;-]+$/)[0];
		mas[i]=mas[i].replace(/[?!.,:;-]/g,'').split(/\s/);
		mas[i].push(temp);
		i++;
	}
	return mas.matrToVect();
}
