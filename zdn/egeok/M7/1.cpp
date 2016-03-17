#include <iostream>
#include <cstdlib>
using namespace std;

int main()
{
  int a = rand()%9 + 1, b = a+ 1, c = b + 1;
  cout <<"Задание: "<< endl << "Углы A,  B и  C четырехугольника  ABCD относятся как " <<
   a <<":"<< b <<":"<< c <<". Найдите угол D,"<< endl <<
   " если около данного четырехугольника можно описать окружность." << endl <<"Ответ дайте в градусах."<<endl;
  double koeff = 180.0/(a +c); //найдем коэффициент пропорциональности
  double answer = (a + c - b)*koeff;
  cout <<"Ответ: "<< endl << answer << endl;
  return 0;
}
