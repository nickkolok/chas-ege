#include <iostream>
#include<cstdlib>
using namespace std;

//JSCPP не знает ни ctime, ни srand: его rand() и так берёт Math.random,
//который в chas-ege зернится, - задания выходят разными и воспроизводимыми.
//Не знает он и system(), и массивов char*: строковые литералы у него wchar_t[],
//поэтому порядковые числительные печатаем через switch.
void printOrdinal(int n)
{
  switch (n)
  {
    case 3: cout << "третий"; break;
    case 4: cout << "четвертый"; break;
    case 5: cout << "пятый"; break;
    case 6: cout << "шестой"; break;
    case 7: cout << "седьмой"; break;
    case 8: cout << "восьмой"; break;
    case 9: cout << "девятый"; break;
    case 10: cout << "десятый"; break;
    case 11: cout << "oдиннадцатый"; break;
    case 12: cout << "двенадцатый"; break;
  }
}

int main()
{
  int membersCount = rand() % 20 + 3;
  int a1 = rand() % 20 + 3;
  int d = rand() % 20 - 20;
  int memNumber1 = rand() % 5 + 3;
  int memNumber2 = rand() % 5 + memNumber1 + 1;
  int mem1 = a1 + d * (memNumber1 - 1);
  int mem2 = a1 + d * (memNumber2 - 1);

  cout << "Задание:" << endl;
  cout << "В данной арифметической прогрессии ";
  printOrdinal(memNumber1);
  cout << " член равен " << mem1 << ", а ";
  printOrdinal(memNumber2);
  cout << " - " << mem2 << ". " << endl << "Найти сумму "
    << membersCount << " первых членов прогрессии." << endl;

  float answer = membersCount * (2 * a1 + d * (membersCount - 1)) / 2.0;
  cout << "Ответ:" << endl;
  cout << answer << endl;
  return 0;
}
