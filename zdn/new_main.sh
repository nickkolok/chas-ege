i=1;
touch main.js;
printf "window.nomer=[\n\t" >> main.js;
for file in $(ls $1/* -v)
do
filename=$(basename -- "$file");
extension="${filename##*.}";
filename="${filename%.*}";
if(($filename!="main")); then
printf "%s,\n\t" $filename >> main.js
fi
((i++));
done
printf "].iz()\nwindow.comment='';\n" >> main.js;
#cd {путь к папке, где будут лежать симлинки}
#../.././symlinks.sh ../../matege2022p/9 <--папкка откуда будут браться файлы для симлинков
#../.././new_main.sh ../../matege2022p/9 создаём main.js  в той же папке




