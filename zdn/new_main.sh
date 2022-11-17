i=1;
touch main.js;
printf "window.nomer=[\n" >> main.js;
for file in $(ls ../../$1/* -v)
do
filename=$(basename -- "$file");
extension="${filename##*.}";
filename="${filename%.*}";
printf "%s,\n" $filename >> main.js;

((i++));
done
printf "].iz()\nwindow.comment='';" >> main.js;
#cd {путь к папке, где будут лежать симлинки}
#../.././symlinks.sh matege2022p/9 <--папкка откуда будут браться файлы для симлинков
#../.././new_main.sh matege2022p/9 создаём main.js  в той же папке




