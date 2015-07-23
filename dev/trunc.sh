#!/bin/sh
#rsync -r --exclude={ext/fonts,ext/mathjax/fonts/HTML-CSS/TeX/png} . ../chas-ege-trunc/
rm -rf ../chas-ege-trunc 
mkdir ../chas-ege-trunc
rsync -rW --exclude-from=dev/exclude.rsync . ../chas-ege-trunc/
echo " var chas.mode.svinta=0; chas.mode.trunc=1; chas.mode.offline=1; 	addstyle('../css/chas-ui.css');" >> ../chas-ege-trunc/lib/head.js
