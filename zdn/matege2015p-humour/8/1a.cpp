#include <iostream>
#include <cstdlib>
#include <cmath>
using namespace std;
int main()
{
  int nday = rand()%10+5;
  int ayabl = rand()%1+2;
  int ctvor = 100*(rand()%2+1);
  int d = rand()%1+1;
  int b = pow(ayabl,d)*ctvor;

  int podxod = 5*(rand()%2+1);
  int pricid = b/podxod;


  cout <<"Задание:"<<endl<<"Гламурная выпускница Кандализа Изолентова за "<<nday<<" дней до последнего звонка померила талию и решила похудеть. Кандализа нашла в интернете диету, позволяющую сбросить $m = n log_{a} (b/c)$ килограмм, где $n$ - количество дней, $a$ - количество яблок, съедаемых в день, $b$ - количество приседаний в день, $с$ - масса творога в дневном рационе. На сколько килограмм похудеет Кандализа, есть будет до выпускного питаться только яблоками ("<<ayabl<<" яблока в день) и творогом ("<<ctvor<<" г в день), делая ежедневно, в течение дня, "<<podxod<<" подхода по "<<pricid<<" приседаний?"<<endl;


  cout <<"Ответ:"<<endl<<nday*d;

  return 0;
}
//Автор:Соломахина Анна
