#!/bin/sh
lib/make-chas-lib.sh

echo '"use strict";//' > lib/chas-uijs.js
cat `dev/lookup-for-js.py lib lib/load.js` >> lib/chas-uijs.js

date +window.chas.version=\"%Y%m%d%H%M%S\" >> lib/head.js;
