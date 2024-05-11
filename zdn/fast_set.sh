#переходим в общую папку набора
#заполняем переменную array названиями шаблонов
#array=(8 3 23 11 76)
#относительный путь до скрипта и до обрабатываемой папки
#../fast_set.sh ../../matege2023p/4

array=(
#41-46
245335
#47-48
271830001
#49-50
271830002
#51-58
245338
#59-62
27074
#75-78
270680001
#79-82
270680002
#83-86
270680003
#87-90
270680004
#91-98+103-106
24534001
24534002
#99-102
24534101
24534102
#111-114
24534401
#115-120
24534301
#145-148
27114
#151-154
27115
#239-242
27041001
#243-346
27041002
#247-250
27049001
#251-254
27051003
#255-258
27051004
#259-262
27051001
#263-266
27051002
#267-270
48830001
#271-276
48830002
#277-280
50770001
#281-284
50770002
#285-288
50770003
#289-292
24535101
#293-296
24535102
#297-300
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
