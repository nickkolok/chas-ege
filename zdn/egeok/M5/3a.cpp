#include <iostream>
#include<cstdlib>
using namespace std;

//JSCPP не умеет char* со строковыми литералами (cast failed from char to wchar_t),
//поэтому порядковые слова печатаем прямо, без массива указателей.
void ordinal(int n)
{
  if (n == 3) cout << "третий";
  else if (n == 4) cout << "четвертый";
  else if (n == 5) cout << "пятый";
  else if (n == 6) cout << "шестой";
  else if (n == 7) cout << "седьмой";
  else if (n == 8) cout << "восьмой";
  else if (n == 9) cout << "девятый";
  else if (n == 10) cout << "десятый";
  else if (n == 11) cout << "oдиннадцатый";
  else if (n == 12) cout << "двенадцатый";
}

int main()
{
  //JSCPP не знает ни ctime, ни srand. Его rand() и так берёт Math.random,
  //который в chas-ege зернится: задания выходят разными и воспроизводимыми.
  system ("chcp 1251");
  int membersCount = rand() % 20 + 3;
  int a1 = rand() % 20 + 3;
  int d = rand() % 20 - 20;
  int memNumber1 = rand() % 5 + 3;
  int memNumber2 = rand() % 5 + memNumber1 + 1;
  int mem1 = a1 + d * (memNumber1 - 1);
  int mem2 = a1 + d * (memNumber2 - 1);

  cout << "Задание:" << endl;
  cout << "В данной арифметической прогрессии ";
  ordinal(memNumber1);
  cout << " член равен " << mem1 << ", а ";
  ordinal(memNumber2);
  cout << " - " << mem2 << ". "<<endl<<"Найти сумму "
    << membersCount <<" первых членов прогрессии." << endl;

  float answer = membersCount * (2 * a1 + d * (membersCount - 1)) / 2.0;
  cout << "Ответ:" << endl;
  cout << answer << endl;
  return 0;
}
