#include <iostream>
#include <cstdlib>
using namespace std;
int main()
{
  unsigned int grad = rand()% 179 +1;
  cout << "Задание:" <<endl<< "Угол A четырехугольника ABCD, вписанного в окружность, равен " <<
  grad << "°. Найдите угол "<< endl
  << "C этого четырехугольника. Ответ дайте в градусах."<<endl;
  int answer = 180 - grad;
  cout <<"Ответ: " << endl << answer << endl;

  return 0;
}
