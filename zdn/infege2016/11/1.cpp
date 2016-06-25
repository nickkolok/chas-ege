#include <iostream>

#include <cstdlib>
using namespace std;

int f1,f2;

int fun (int x)
{
	if (x==1)
		return f1;
	if (x==2)
		return f2;
	return x * fun(x - 1) + fun(x - 2) * (x - 1);
}

int main ()
{
	int number = rand()%4 + 3;
	f1 =  rand()%4 + 1;
	f2 =  rand()%4 + 1;

	/*Задание 11 No. 4645*/
	cout << "Задание: "<<endl;
	// "<br/>" используемся в HTML-коде для перевода строки
	cout << "Алгоритм вычисления значения функции $F(n)$, где $n$ – натуральное число, задан следующими соотношениями:" << "<br/>";
	// В знаки доллара $ ... $ берётся формула в TeX-нотации
	cout << "$F(1) = " << f1 << "$" << "<br/>";
	cout << "$F(2) = " << f2 << "$" << "<br/>";
	//  "\\cdot" даёт точку, обозначающую умножение
	cout << "$F(n) = F(n-1) \\cdot n + F(n-2) \\cdot (n-1)$ для $n > 2$" << "<br/>";
	cout << "Чему равно значение функции $F(" << number << ")$ ? ";
	cout << "В ответе запишите только натуральное число." << endl;
	cout << "Ответ: " << endl << fun (number) << endl;

	return 0;
}
