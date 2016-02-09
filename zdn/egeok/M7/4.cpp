#include <iostream>
#include <cstdlib>
using namespace std;
int main()
{
  int dol3,dol4;
  int dol1 = rand()%4+1;
  int dol2 = 10-dol1;
  int v = rand()%2;
  if (v)
  {
    dol3 = rand()%7+1;
    dol4 = 14-dol3;
  }
  else
  {
    dol3 = rand()%4+1;
    dol4 = 5-dol3;
  }
  cout <<"Задание:"<<endl
  <<"Точки A, B, C, D, расположенные на окружности, делят эту окружность на четыре дуги AB, BC, CD и AD, градусные величины которых относятся соответственно как "<<
  dol1<<":"<<dol2<<":"<<dol3<<":"<<dol4<<". Найдите угол A четырехугольника ABCD. Ответ дайте в градусах."<<endl;

  int k = 360/(dol1 + dol2 + dol3 + dol4);
  int answer=(dol2+dol3)*k;
  cout <<"Ответ:"<<endl<<answer<<endl;

  return 0;
}
