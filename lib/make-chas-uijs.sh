#!/bin/sh
./make-chas-lib.sh

echo '"use strict";//' > chas-uijs.js

cat ../ext/jquery-2.1.0.min.js 											>> chas-uijs.js
cat ../ext/jqplot/jquery.jqplot.min.js 									>> chas-uijs.js
cat ../ext/jqplot/plugins/jqplot.barRenderer.min.js 					>> chas-uijs.js
cat ../ext/jqplot/plugins/jqplot.categoryAxisRenderer.min.js			>> chas-uijs.js
cat ../ext/jstorage.min.js 												>> chas-uijs.js
cat ../ext/html2canvas.js 												>> chas-uijs.js
cat ../ext/anyslider/js/jquery.anythingslider.js 						>> chas-uijs.js
cat ../ext/keyboard/keyboard.js					 						>> chas-uijs.js

cat chas-lib.js 														>> chas-uijs.js

cat umka.js		  														>> chas-uijs.js
cat core_vopr.js  														>> chas-uijs.js
cat core_nabor.js  														>> chas-uijs.js
cat core_dvig.js  														>> chas-uijs.js
cat dvig_fn.js  														>> chas-uijs.js
cat dvig_rz.js  														>> chas-uijs.js
cat urljson.js   														>> chas-uijs.js
cat osnmas.js   														>> chas-uijs.js
cat style.js   															>> chas-uijs.js
cat menu.js   															>> chas-uijs.js
cat yametrika.js  														>> chas-uijs.js
cat browser.js   														>> chas-uijs.js
cat cache.js   															>> chas-uijs.js
cat sovety.js 															>> chas-uijs.js
cat jstorage.zapomni.js													>> chas-uijs.js;

date +window.chas.version=\"%Y%m%d%H%M%S\" >> head.js;
