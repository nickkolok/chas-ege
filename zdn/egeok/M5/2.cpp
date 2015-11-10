#include <iostream>
#include <cstdlib>
using namespace std;

int main() 
{
	unsigned int kolvoMember = rand() % 7 + 3; // Количество вставляемых чисел
	int a1 = rand() % 10; // Первый член
	double d = rand() % 4 + 1; // Разность
	unsigned int n = rand() % 4 + 3; // Случайное число, определяющее номер некоторого члена в прогрессии
	int number1 = a1 + d * (n-1); // Некоторый член
	int number2 = a1 + d * (n + kolvoMember);

	cout << "Задание:" << endl; 
	cout << "Между числами " << number1 << " и " << number2 << " вставьте ещё " << kolvoMember
		<< " так, чтобы они вместе с данными числами составляли арифметическую прогрессию. "
		<< "Найдите сумму членов полученной прогрессии." << endl;
	double answer = ((number1 + number2)/2.0)*(kolvoMember + 2);
	cout << "Ответ: " << endl << answer << endl;
	return 0;
}
//Анна Соломахина
//http://ege-ok.ru/2014/02/08/arifmeticheskaya-progressiya
