#include <iostream>
#include <cstdlib>

using namespace std;
int main() {
  int firstMember=rand()%200-100;
  int d=rand()%20-10;
  int targetNumber=rand()%40+5;
  cout << "Задание:" << endl;
  cout << "Дана арифметическая прогрессия " << firstMember << "; " << (firstMember + d)
    << "... Найдите " << targetNumber << "-й член прогрессии." << endl;
  cout << "Ответ:" << endl;
  cout << firstMember + d * (targetNumber - 1) << endl;
  return 0;
}
