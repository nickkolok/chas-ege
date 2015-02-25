#!/bin/sh
cat browser.css main.css menu.css ../ext/anyslider/css/anythingslider.css ../ext/anyslider/css/theme-minimalist-square.css ../ext/fonts/stylesheet.css ../ext/keyboard/keyboard.css ../ext/jqplot/jquery.jqplot.css > chas-ui.css;
#cat browser.css main.css menu.css ../ext/anyslider/css/anythingslider.css ../ext/anyslider/css/theme-minimalist-square.css ../ext/keyboard/keyboard.css ../ext/jqplot/jquery.jqplot.css > chas-ui.css;
java -jar ../ext/yuicompressor-2.4.8.jar chas-ui.css -o chas-ui.min.css --charset utf-8
