array=(26663 77383 77384 1 26664 509570 773101 282849 77371 26667 26665 77366 77367 77369 77370 77368 101879 10 26668 628738 6 26671 4 5 77379 26650 2 3 7 8 26648 77380 77382 525399 9 77381 315120 315535 11)
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

#переходим в общую папку набора
#.././fast_set.sh ../../matege2023p/5
