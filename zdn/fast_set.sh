#переходим в общую папку набора
#заполняем переменную array названиями шаблонов
#array=(8 3 23 11 76)
#относительный путь до скрипта и до обрабатываемой папки
#../fast_set.sh ../../matege2023p/4

array=()

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
