#!/bin/sh
./make-chas-lib.sh
cat chas-lib.js dvig_fn.js osnmas.js menu.js browser.js cache.js ../ext/anyslider/js/jquery.anythingslider.js sovety.js > chas-uijs.js;
#echo -n ';chas.version="'  >> head.js
#DAT=`date date +%Y%m%d%H%M%S`;
#date | echo -n >>head.js
#echo -n $DAT'";' >> head.js
date +window.chas.version=\"%Y%m%d%H%M%S\" >>head.js;
