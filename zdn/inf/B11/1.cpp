#include <iostream>
#include <cstdlib>
using namespace std;

int fun (int x)
{
    if (x==1)
        return 1;
    else if (x==2)
        return 3;
    else return x*fun(x - 1) + fun(x - 2)*(x-1);
}

int main ()
{
    int number =rand()%3 + 2 ;
    cout <<"Алгоритм вычисления значения функции F(n), где n – натуральное\n число, задан следующими соотношениями:" <<endl;
    cout << "\nF(1) = 1";
    cout << "\nF(2) = 3";
    cout << "\nF(n) = F(n-1) * n + F(n-2) * (n-1) , for n > 2";
    cout << "\nЧему равно значение функции  F(" << number << ") ?";
    cout << "\nВ ответе запишите только натуральное число.";
    cout << "\nAnswer: " << fun (number) << endl;

    return 0;


}
