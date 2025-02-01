#include <iostream>
#include <cstdlib>
using namespace std;

int main()
{
  int n1 = rand()%20+5;
  int n2 = n1 + rand()%10+2;
  int kolvoNum = rand()%6+4;
  cout <<"Задание:"<<endl<<"Четвертый член арифметической прогрессии равен "<<n1<<", а восьмой равен "<<n2<<"."<<endl
       <<"Найти сумму "<<kolvoNum<<" первых членов прогрессии."<<endl;
  double d = (n2 - n1)/4.0;
  double a1 = n1 - 3*d;
  double sum = (2*a1 + d*(kolvoNum - 1))/2.0 * kolvoNum;
  cout <<"Ответ:"<<endl<<sum<<endl;
  return 0;
}
