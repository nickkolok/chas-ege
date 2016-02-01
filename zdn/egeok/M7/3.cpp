#include <iostream>
#include <cstdlib>
using namespace std;
int main()
{
    int a = rand()% 178 +1;
    int b = rand()% 178 +1;
    int answer;
    if (a == b)
    {
        while ((a+b > 180) || (a+b < 180))
          a = rand()% 178 +1;
    }
    cout << "Два угла вписанного в окружность четырехугольника равны " << a << "° и " << b << "°. \nНайдите больший из оставшихся углов.\nОтвет дайте в градусах."<<endl;
    if (a>b)
        answer = 180 - b;
    else answer = 180 - a;
    cout <<"Ответ: " << endl << answer << endl;

    return 0;
}
