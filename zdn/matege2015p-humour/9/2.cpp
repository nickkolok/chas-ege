#include <iostream>
#include <cstdlib>
using namespace std;
int main()
{
    int dolya = rand() % 2 + 2;

    int ostat = 50 * (rand()%3+1);
    cout << "Задание:" << endl <<"Наблюдательный гопник Димон Чёткий намётанным глазом на выпускном определил, что у него в фужере конической формы осталось всего "<<ostat
         <<" грамм апельсинового сока, причём уровень сока достигает $\\frac{1}{" << dolya
         << "}$ высоты фужера. Сколько раз Димон совершит отточенное до автоматизма движение 'ещё по пятьдесят', прежде чем фужер наполнится?" << endl;
    int vBol = ostat * dolya * dolya * dolya;
    int kolvoRaz = (vBol - ostat)/50;
    cout <<"Ответ: " <<endl << kolvoRaz;
    return 0;
}
// Соломахина Анна
