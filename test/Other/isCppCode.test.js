'use strict';
module('Basic Tests');

test('isCppCode', function() {
	expect(isCppCode('#include <iostream>\n#include <cstdlib>\n#include <ctime>\nusing namespace std;\nint main()\n{\nsrand(time(0));\nunsigned int grad = rand()% 179 +1;\ncout << "Задание:" <<endl<< "Угол A четырехугольника ABCD, вписанного в окружность, равен " << \ngrad << "°. Найдите угол "<< endl\n<< "C этого четырехугольника. Ответ дайте в градусах."<<endl;\nint answer = 180 - grad;\ncout <<"Ответ: " << endl << answer << endl;\n\nreturn 0;\n}')).to.eql(true);
	expect(isCppCode('#include <iostream>\n#include <cstdlib>\n#include <ctime>\nusing namespace std;\nint main ()\n{\nsrand(time(0));\nunsigned int grad = rand()% 179 +1;\ncout << "Задание:" <<endl<< "Угол A четырехугольника ABCD, вписанного в окружность, равен " << \ngrad << "°. Найдите угол "<< endl\n<< "C этого четырехугольника. Ответ дайте в градусах."<<endl;\nint answer = 180 - grad;\ncout <<"Ответ: " << endl << answer << endl;\n\nreturn 0;\n}')).to.eql(true);
	expect(isCppCode('#include <iostream>\n#include <cstdlib>\n#include <ctime>\nusing namespace std;\n\n{\nsrand(time(0));\nunsigned int grad = rand()% 179 +1;\ncout << "Задание:" <<endl<< "Угол A четырехугольника ABCD, вписанного в окружность, равен " << \ngrad << "°. Найдите угол "<< endl\n<< "C этого четырехугольника. Ответ дайте в градусах."<<endl;\nint answer = 180 - grad;\ncout <<"Ответ: " << endl << answer << endl;\n\nreturn 0;\n}')).to.eql(false);
});
