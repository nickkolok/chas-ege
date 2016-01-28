#include <iostream>
#include <cstdlib>
using namespace std;

int fun (int x)
{
  if (x==1)
    return 2;
  else if (x==2)
    return 4;
  else return 3*fun(x - 1) - fun(x - 2)*2;
}

int main ()
{
  int number =rand()%3 + 2 ;
  cout <<"Задание:" << endl << "Алгоритм вычисления значения функции F(n), где n – натуральное число," << endl
     << "задан следующими соотношениями:" <<endl;
  cout << "F(1) = 2"<<endl;
  cout << "F(2) = 4"<<endl;
  cout << "F(n) = F(n-1) * 3 - F(n-2) * 2 , при n > 2"<<endl;
  cout << "Чему равно значение функции  F(" << number << ") ?"<<endl;
  cout << "В ответе запишите только натуральное число."<<endl;
  cout << "Ответ: " << endl << fun (number) << endl;

  return 0;
}
