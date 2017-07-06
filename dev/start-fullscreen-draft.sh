#!/bin/bash
firefox -url 'file:///home/math/git/chas-ege/dist/sh/polnmat.html#{%22nabor%22:{%22zagol%22:%22../zdn/kfa_cpp/test1.js%22},%22style%22:{%22menuLinkTarget%22:%22_self%22,%22fon%22:%22white%22,%22pan%22:%22#9ff%22},"shellOptions":{"autorun":"true"}}' &
xdotool search --sync --onlyvisible --class "Firefox" windowactivate key F11
