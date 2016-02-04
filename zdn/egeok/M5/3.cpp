#include <iostream>
#include <cstdlib>

using namespace std;

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
  cout << "В данной арифметической прогрессии "<< memNumber1 << "й член равен " << mem1
      << ", а " << memNumber2 << "й - " << mem2 << ". "<<endl<<"Найти сумму "
      << membersCount <<" первых членов прогрессии." << endl;

  float answer = membersCount * (2 * a1 + d * (membersCount - 1)) / 2.0;
  cout << "Ответ:" << endl;
  cout << answer << endl;
  return 0;
}
