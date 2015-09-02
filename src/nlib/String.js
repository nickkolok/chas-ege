"use strict";

String.prototype.parseHumanReadableToJSON = function() {
	var result = {};
	var rows = this.split(/\s*[\n\r]+\s*/g);
	var currentProperty = 0;
	for (var i = 0; i < rows.length; i++) {
		if (/:$/.test(rows[i])) {
			currentProperty = rows[i].replace(/:$/, "");
			result[currentProperty] = "";
		} else {
			result[currentProperty] += " ".esli(result[currentProperty]) + rows[i];
		}
	}
	return result;
};

String.prototype.addToGlobal("docsString", 1);
