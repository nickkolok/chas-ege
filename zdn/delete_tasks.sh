#переходим в общую папку набора
#заполняем переменную array названиями шаблонов
#array=(8 3 23 11 76)
#относительный путь до скрипта
#../delete_tasks.sh

array=(27793 64485002 245351 1 320202 26668 10 27501 27995 99614 509101 13)

if [[ ${#array[@]} -eq 0 ]]; then
     echo "change array in file"
     exit
fi

cd "./"
i=1;
for index in ${!array[*]}
do
     cd $i;
     ((i++));
     #sed -i "s/${array[$index]}/\/\/ ${array[$index]}/" fipi.js
     sed -i "/${array[$index]}/d" fipi.js
     cd ..;
done
