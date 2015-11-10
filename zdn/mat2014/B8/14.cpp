#include <iostream>
#include <cstdlib>

using namespace std;
int main()
{
    int grad2=rand()%50+10;
    int grad1=rand()%110+5+grad2;
    cout <<"Задание:"<<endl<<"Четырехугольник ABCD вписан в окружность. Угол ABC равен "<<grad1
         <<"°, угол CAD равен "<<grad2<<"°. Найдите угол ABD. Ответ дайте в градусах."<<endl;

    cout <<"Решение:"<<endl<<"Угол АВС равен сумме углов ABD и DBC. Угол DBC опирается на ту же дугу, что и угол CAD, поэтому тоже равен "<<grad2
         <<"°. Следовательно, угол ABD  равен "<<grad1<<"°-"<<grad2<<"°="<<grad1 - grad2<<"°."<<endl;
    cout <<"Ответ:"<<endl<<grad1 - grad2<<endl;

    return 0;
}
// Соломахина Анна
// http://ege-ok.ru/2012/03/22/vpisannyiy-ugol-zadanie-v6
