i=1;
for file in $(ls $1/* -v)
do
filename=$(basename -- "$file");
extension="${filename##*.}";
filename="${filename%.*}";
ln -s $file $filename.js;
((i++));
done
#cd {путь к папке, где будут лежать симлинки}
#../.././symlinks.sh ../../matege2022p/9 <--папкка откуда будут браться файлы для симлинков
#../.././new_main.sh ../../matege2022p/9 создаём main.js  в той же папке







