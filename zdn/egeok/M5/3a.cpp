#include <iostream>
#include<cstdlib>
#include <ctime>
using namespace std;

int main()
{
  srand (time(0));
  system ("chcp 1251");
  int membersCount = rand() % 20 + 3;
  int a1 = rand() % 20 + 3;
  int d = rand() % 20 - 20;
  int memNumber1 = rand() % 5 + 3;
  int memNumber2 = rand() % 5 + memNumber1 + 1;
  int mem1 = a1 + d * (memNumber1 - 1);
  int mem2 = a1 + d * (memNumber2 - 1);

  char* A[20];
  A[3]="третий";
  A[4]="четвертый";
  A[5]="пятый";
  A[6]="шестой";
  A[7]="седьмой";
  A[8]="восьмой";
  A[9]="девятый";
  A[10]="десятый";
  A[11]="oдиннадцатый";
  A[12]="двенадцатый";


  cout << "Задание:" << endl;
  cout << "В данной арифметической прогрессии "<< A[memNumber1] << " член равен " << mem1
    << ", а " << A[memNumber2] << " - " << mem2 << ". "<<endl<<"Найти сумму "
    << membersCount <<" первых членов прогрессии." << endl;

  float answer = membersCount * (2 * a1 + d * (membersCount - 1)) / 2.0;
  cout << "Ответ:" << endl;
  cout << answer << endl;
  return 0;
}
