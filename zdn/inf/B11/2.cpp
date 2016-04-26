#include <iostream>
#include <cstdlib>
using namespace std;

int fun (int x)
{
  if (x==1)
    return 2;
  else if (x==2)
    return 4;
  else return 3 * fun(x - 1) - fun(x - 2) * 2;
}

int main ()
{
  int number = rand()%3 + 2 ;
  cout << "Алгоритм вычисления значения функции F(n), где n – натуральное число, \nзадан следующими соотношениями:";
  cout << "\nF(1) = 2";
  cout << "\nF(2) = 4";
  cout << "\nF(n) = F(n-1) * 3 - F(n-2) * 2 , при n > 2";
  cout << "\nЧему равно значение функции  F(" << number << ") ?";
  cout << "\nВ ответе запишите только натуральное число.";
  cout << "\nОтвет: " << endl << fun (number);

  return 0;
}
