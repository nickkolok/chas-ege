i=1;
for file in $(ls ../$1/*)
do
ln -s $file $i.js;
((i++));

done
