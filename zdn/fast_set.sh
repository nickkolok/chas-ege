#переходим в общую папку набора
#заполняем переменную array названиями шаблонов
#array=(8 3 23 11 76)
#относительный путь до скрипта и до обрабатываемой папки
#../fast_set.sh ../../matege2023p/4

array=(
296600001
300000001
100000001
100000002
100000003
24
318475
36
39
2976
271930001
271870001
271930002
271870002
271920001
270820001
270820002
956
270680001
270680002
270680003
270680004
316553001
91100001
91100003
91100002
16800001
324450
27109003
27114
140
27115
27069001
27135001
27135002
27135003
27135004
27135005
27052001
17200001
318145
27052002
27058002
27058001
27045001
27045002
27046001
27046002
3243
27118002
27118001
27163001
27072001
27072002
245335
271830001
271830002
245338
27074
24534001
24534002
24534101
24534102
24534401
24534301
11500001
27041001
27041002
27049001
27051003
27051004
27051001
27051002
48830001
48830002
50770001
50770002
50770003
24535101
24535102
24535103
)

if [[ ${#array[@]} -eq 0 ]]; then
     echo "change array in file"
     exit
fi

result=${PWD##*/}
result=${result:-/}
touch $result.js
printf "if (!window.nabor)\n\twindow.nabor = {};\nwindow.nabor.importFrom({\n\tnZad: "${#array[@]}",\n \tadres: '../zdn/"$result"/',\n" >> $result.js
printf "\tname: '"$result"',\n});\n" >> $result.js

cd "./"
i=1;
for index in ${!array[*]}
do
     mkdir $i;
     cd $i;
     ln -s $1/${array[$index]}.js ${array[$index]}.js;
     ((i++));

     touch main.js
     printf "window.nomer=[\n" >> main.js;
     printf "\t%s,\n" ${array[$index]} >> main.js
     printf "].iz()\nwindow.comment='"${array[$index]}"';\n" >> main.js;
     cd ..;
done
