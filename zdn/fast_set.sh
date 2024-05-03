#переходим в общую папку набора
#заполняем переменную array названиями шаблонов
#array=(8 3 23 11 76)
#относительный путь до скрипта и до обрабатываемой папки
#../fast_set.sh ../../matege2023p/4

array=(
#1-8
296600001
#9-12
300000001
#13-14
100000001
100000003
#15-18
100000002
#19.1, 19.4
271930001
#19.2-4, 19.5-6
271870001
#20-29
24
#30-33
318475
#34-37
36
39
2976
#40.1
271930002
271870002
#40.12
271920001
#41-46
245335
#47-48
271830001
#49-50
271830002
#51-58
245338
#59-62
270820001
#63-64
270820002
#65-68
956
#69-72
270680001
#73-76
270680002
#77-80
270680003
#81-84
270680004
#85-100
245341
#101-104
316553001
#105-116
11500001
#117-120
91100001
#121-122
91100003
#123-126 
91100002 
#127-128
16800001
#129-132
324450
#133-135
27109003
#136-137
30110001
#138-139
27114
#140-141
140
#142-145
27115
#146-149
27069001
#150-153
27135001
#154-157
27135002
#158-161
27135003
#162-165
27135004
#166-169
27135005
#170-171
27052001
#172-175
17200001
#176-179
318145
#180-182
27052002
#183-184
27058002
#185-186
27058002
#187-190
27045001
#191-196
27045002
#197-200
27046001
#201-204
27046002
#205-206
27118002
#207-208
27118001
#209-212
27163001
#213-214
27072001
#215-216
27072002
#217-220
27041001
#221-224
27041002
#225-228
27049001
#229-230
27051001
#231-232
27051002
#233-236
27051003
#237-240
27051004
#241-244
48830001
#245-250
48830002
#251-254
50770001
#255-258
50770002
#259-262
50770003
#263-266
24535101
#267-270
24535102
#271-274
24535102
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
