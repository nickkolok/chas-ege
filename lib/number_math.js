
Number.prototype.pow=function(n){'use strict';
	return Math.pow(this,n);
}

Number.prototype.sqrt=function(){'use strict';
	return Math.sqrt(this);
}

Number.prototype.sqr=function(){'use strict';
	return Math.pow(this,2);
}
Number.prototype.abs=function(){'use strict';
	return Math.abs(this);
}

Number.prototype.floor=function(){'use strict';
	return Math.floor(this);
}

Number.prototype.ceil=function(){'use strict';
	return Math.ceil(this);
}

Number.prototype.atan=function(){'use strict';
	return Math.atan(this);
}

Number.prototype.asin=function(){'use strict';
	return Math.asin(this);
}

Number.prototype.acos=function(){'use strict';
	return Math.acos(this);
}

Number.prototype.arcsin=function(){'use strict';
	return Math.asin(this);
}

Number.prototype.arccos=function(){'use strict';
	return Math.acos(this);
}

Number.prototype.arctg=function(){'use strict';
	return Math.atan(this);
}

Number.prototype.arcctg=function(){'use strict';
	return Math.atan(1/this);
}

Number.prototype.sin=function(){'use strict';
	return Math.sin(this);
}

Number.prototype.cos=function(){'use strict';
	return Math.cos(this);
}

Number.prototype.tg=function(){'use strict';
	return Math.tan(this);
}

Number.prototype.ctg=function(){'use strict';
	return 1/Math.tan(this);
}
Number.prototype.sqr=function(){'use strict';
	return this.pow(2);
}

Number.prototype.round=function(){'use strict';
	return Math.round(this);
}

for(var chto in Number.prototype)
	Object.defineProperty(Number.prototype, chto, { enumerable: false });
