function start(){
	var output = document.getElementById("output");
	output.className = "body";
	function warn(s) {
		output.value += "Внимание:" + s + "\n";
		NA.Lwarn(s);
	}
	function err(s) {
		output.value += "ОШИБКА:" + s + "\n";
		NA.Lerr(s);
	}
	NAtest.testTemplates({ triesCount : 5, warnFunc : warn, errCount : err });
}
