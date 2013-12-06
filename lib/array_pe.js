Array.prototype.pe_inv=function(){'use strict';
	var perest=0;
	var len=this.length;
	for(var i=0;i<len;i++)
		for(var j=i;j<len;j++)
			if(this[i]>this[j])
				perest++;
	return perest;
}

Array.prototype.pe_txt=function(){'use strict';
	return "$\\left("+this.join(";")+"\\right)$";
}

for(var chto in Array.prototype)
	Object.defineProperty(Array.prototype, chto, { enumerable: false });
