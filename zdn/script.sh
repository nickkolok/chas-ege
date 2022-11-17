i=1;
for file in $(ls ../$1/* -v)
do
ln -s $file $i.js;
((i++));

done
