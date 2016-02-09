#include <iostream>
#include <cstdlib>
using namespace std;

int main()
{
  int b =rand()%10+2;
  int a =rand()%90+2+b;
  int number1 = rand()%7+3;
  int number2 = number1 + rand()%7+4;
  int druggs = rand()%2;
  cout <<"Задание: "<< endl <<"Арифметическая прогрессия задана формулой $a_{n}="<<a<<"-"<<b<<"n$." <<endl;
  int A[2];
  if (druggs)
  {
    cout <<"Найдите сумму положительных членов данной прогрессии."<<endl;
    int kolvoPol = a/b; //Кол-во положительных чисел
    int sumPol = A[1]=((a-b) + (a-b*kolvoPol))*kolvoPol/2; //Сумма положительных
  }
  else
  {
    cout <<"Найдите сумму членов данной прогрессии с "<<number1<<" по "<<number2<<" включительно."<<endl;
    int n1 = a - b*number1;// Член прогрессии, соответствующий числу number1
    int n2 = a - b*number2;//Аналогично для number2
    int sum = A[0]=(n1 + n2)/2*(number2-number1 +1);
  }
  cout <<"Ответ:"<<endl <<A[druggs];
  return 0;
}
/* Автор: Соломахина Анна
* http://ege-ok.ru/2014/02/09/arifmeticheskaya-progressiya-chast-2*/
