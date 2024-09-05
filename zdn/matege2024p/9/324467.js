(function() { 'use strict'; retryWhileError(function() {
    let a = sl(0.0001, 0.001, 0.0001);
    let b = -sl(0.1, 0.9, 0.01);
    let c = sl(1, 100);
    let x = sl(5, 100, 5);
    genAssert(x < -b / a, 'Запрашиваемая ванта вообще находится в пределах пролёта');
    let f = (x => a * x * x + b * x + c);
    genAssert(f(-b / (2 * a)) > 1, 'Ванты не опускаются до полотна и не провисают');
    let y = f(x);
    genAssertZ1000(y, 'Ответ имеет не более 3 знаков после запятой');

    let svgString = 
	`<?xml version="1.0" encoding="UTF-8" standalone="no"?>

	<svg
	   version="1.1"
	   id="svg2"
	   width="319.66666"
	   height="213"
	   viewBox="0 0 319.66666 213"
	   sodipodi:docname="9e44a7c6416c8b49c143c24f629c4435.eps"
	   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
	   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
	   xmlns="http://www.w3.org/2000/svg"
	   xmlns:svg="http://www.w3.org/2000/svg">
	  <defs
		 id="defs6" />
	  <sodipodi:namedview
		 id="namedview4"
		 pagecolor="#ffffff"
		 bordercolor="#000000"
		 borderopacity="0.25"
		 inkscape:showpageshadow="2"
		 inkscape:pageopacity="0.0"
		 inkscape:pagecheckerboard="0"
		 inkscape:deskcolor="#d1d1d1" />
	  <g
		 id="g8"
		 inkscape:groupmode="layer"
		 inkscape:label="ink_ext_XXXXXX"
		 transform="matrix(1.3333333,0,0,-1.3333333,0,213)">
		<g
		   id="g10"
		   transform="scale(0.1)">
		  <g
			 id="g12"
			 transform="scale(10)">
			<text
			   xml:space="preserve"
			   transform="matrix(0.9,0,0,-1,114.267,39.268)"
			   style="font-variant:normal;font-weight:normal;font-size:11.5px;font-family:'Liberation Serif';-inkscape-font-specification:LiberationSerif;writing-mode:lr-tb;fill:#040606;fill-opacity:1;fill-rule:nonzero;stroke:none"
			   id="text22"><tspan
				 x="0 6.1525002 11.9025 17.641001 23.391001 28.418833 34.573341"
				 y="0"
				 sodipodi:role="line"
				 id="tspan14">полотно</tspan><tspan
				 x="-51.408001 -45.97831 -40.874142 -34.719627 -29.694128"
				 y="-75.732002"
				 sodipodi:role="line"
				 id="tspan16">ванта</tspan><tspan
				 x="4.8284998 10.258182 15.36235 21.516859 26.5429"
				 y="-51.481998"
				 sodipodi:role="line"
				 id="tspan18">ванта</tspan><tspan
				 x="12.5785 18.731001 23.837 29.9895"
				 y="-74.345299"
				 sodipodi:role="line"
				 id="tspan20">цепь</tspan></text>
			<text
			   xml:space="preserve"
			   transform="matrix(0,0.9,1,0,39.5328,55.2539)"
			   style="font-variant:normal;font-weight:normal;font-size:11.5px;font-family:'Liberation Serif';-inkscape-font-specification:LiberationSerif;writing-mode:lr-tb;fill:#040606;fill-opacity:1;fill-rule:nonzero;stroke:none"
			   id="text28"><tspan
				 x="0 6.1545143 12.309022 18.047522 23.797522"
				 y="0"
				 sodipodi:role="line"
				 id="tspan24">пилон</tspan><tspan
				 x="0 6.1545143 12.309022 18.047522 23.797522"
				 y="153.008"
				 sodipodi:role="line"
				 id="tspan26">пилон</tspan></text>
		  </g>
		  <path
			 d="M 1127.5,410 909.504,487.5"
			 style="fill:none;stroke:#040606;stroke-width:5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
			 id="path30" />
		  <path
			 d="M 670,1169.32 546.25,1010"
			 style="fill:none;stroke:#040606;stroke-width:5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
			 id="path32" />
		  <path
			 d="M 1443.96,932.266 1630,878.75"
			 style="fill:none;stroke:#040606;stroke-width:5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
			 id="path34" />
		  <path
			 d="m 1475.66,1157.71 214.05,-61.85"
			 style="fill:none;stroke:#040606;stroke-width:5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
			 id="path36" />
		  <path
			 d="M 1235,1157.71 726.477,856.25"
			 style="fill:none;stroke:#040606;stroke-width:5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
			 id="path38" />
		  <g
			 id="g40"
			 transform="scale(10)">
			<text
			   xml:space="preserve"
			   transform="matrix(0.9,0,0,-1,34.3563,36.9469)"
			   style="font-variant:normal;font-weight:normal;font-size:11.5px;font-family:'Liberation Serif';-inkscape-font-specification:LiberationSerif;writing-mode:lr-tb;fill:#040606;fill-opacity:1;fill-rule:nonzero;stroke:none"
			   id="text44"><tspan
				 x="0"
				 y="0"
				 id="tspan42">0</tspan></text>
			<text
			   xml:space="preserve"
			   transform="matrix(0.9,0,0,-1,15.88245,147.1899)"
			   style="font-style:italic;font-variant:normal;font-size:11.5px;font-family:'Liberation Serif';-inkscape-font-specification:TimesNewRomanPS-ItalicMT;writing-mode:lr-tb;fill:#040606;fill-opacity:1;fill-rule:nonzero;stroke:none"
			   id="text48"><tspan
				 x="0"
				 y="0"
				 id="tspan46">y</tspan></text>
			<text
			   xml:space="preserve"
			   transform="matrix(0.9,0,0,-1,22.298075,147.1899)"
			   style="font-variant:normal;font-weight:normal;font-size:11.5px;font-family:'Liberation Serif';-inkscape-font-specification:LiberationSerif;writing-mode:lr-tb;fill:#040606;fill-opacity:1;fill-rule:nonzero;stroke:none"
			   id="text52"><tspan
				 x="0 4.841578 12.314235"
				 y="0"
				 sodipodi:role="line"
				 id="tspan50">(м)</tspan></text>
			<text
			   xml:space="preserve"
			   transform="matrix(0.9,0,0,-1,218.6397,34.5789)"
			   style="font-style:italic;font-variant:normal;font-size:11.5px;font-family:'Liberation Serif';-inkscape-font-specification:TimesNewRomanPS-ItalicMT;writing-mode:lr-tb;fill:#040606;fill-opacity:1;fill-rule:nonzero;stroke:none"
			   id="text56"><tspan
				 x="0"
				 y="0"
				 id="tspan54">x</tspan></text>
			<text
			   xml:space="preserve"
			   transform="matrix(0.9,0,0,-1,225.22094,34.5789)"
			   style="font-variant:normal;font-weight:normal;font-size:11.5px;font-family:'Liberation Serif';-inkscape-font-specification:LiberationSerif;writing-mode:lr-tb;fill:#040606;fill-opacity:1;fill-rule:nonzero;stroke:none"
			   id="text60"><tspan
				 x="0 4.8411379 12.314241"
				 y="0"
				 sodipodi:role="line"
				 id="tspan58">(м)</tspan></text>
		  </g>
		  <path
			 d="M 1840,1402.5 V 195.641"
			 style="fill:none;stroke:#040606;stroke-width:20;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
			 id="path62" />
		  <path
			 d="m 1857.71,1402.5 c 0,-9.79 -7.92,-17.72 -17.71,-17.72 -9.79,0 -17.71,7.93 -17.71,17.72 0,9.79 7.92,17.71 17.71,17.71 9.79,0 17.71,-7.92 17.71,-17.71"
			 style="fill:#040606;fill-opacity:1;fill-rule:nonzero;stroke:none"
			 id="path64" />
		  <path
			 d="m 447.715,1402.5 c 0,-9.79 -7.93,-17.72 -17.715,-17.72 -9.785,0 -17.715,7.93 -17.715,17.72 0,9.79 7.93,17.71 17.715,17.71 9.785,0 17.715,-7.92 17.715,-17.71"
			 style="fill:#040606;fill-opacity:1;fill-rule:nonzero;stroke:none"
			 id="path66" />
		  <path
			 d="m 563.965,1140 c 0,-9.79 -7.93,-17.71 -17.715,-17.71 -9.785,0 -17.715,7.92 -17.715,17.71 0,9.79 7.93,17.71 17.715,17.71 9.785,0 17.715,-7.92 17.715,-17.71"
			 style="fill:#040606;fill-opacity:1;fill-rule:nonzero;stroke:none"
			 id="path68" />
		  <path
			 d="m 676.465,949.98 c 0,-9.785 -7.93,-17.714 -17.715,-17.714 -9.785,0 -17.715,7.929 -17.715,17.714 0,9.786 7.93,17.715 17.715,17.715 9.785,0 17.715,-7.929 17.715,-17.715"
			 style="fill:#040606;fill-opacity:1;fill-rule:nonzero;stroke:none"
			 id="path70" />
		  <path
			 d="m 787.715,804.023 c 0,-9.785 -7.93,-17.722 -17.715,-17.722 -9.785,0 -17.715,7.937 -17.715,17.722 0,9.786 7.93,17.715 17.715,17.715 9.785,0 17.715,-7.929 17.715,-17.715"
			 style="fill:#040606;fill-opacity:1;fill-rule:nonzero;stroke:none"
			 id="path72" />
		  <path
			 d="m 897.715,698.867 c 0,-9.785 -7.93,-17.715 -17.715,-17.715 -9.785,0 -17.715,7.93 -17.715,17.715 0,9.785 7.93,17.715 17.715,17.715 9.785,0 17.715,-7.93 17.715,-17.715"
			 style="fill:#040606;fill-opacity:1;fill-rule:nonzero;stroke:none"
			 id="path74" />
		  <path
			 d="m 1007.71,630.996 c 0,-9.785 -7.929,-17.715 -17.714,-17.715 -9.785,0 -17.715,7.93 -17.715,17.715 0,9.785 7.93,17.715 17.715,17.715 9.785,0 17.714,-7.93 17.714,-17.715"
			 style="fill:#040606;fill-opacity:1;fill-rule:nonzero;stroke:none"
			 id="path76" />
		  <path
			 d="m 1227.71,606.73 c 0,-9.789 -7.92,-17.73 -17.71,-17.73 -9.79,0 -17.71,7.941 -17.71,17.73 0,9.786 7.92,17.711 17.71,17.711 9.79,0 17.71,-7.925 17.71,-17.711"
			 style="fill:#040606;fill-opacity:1;fill-rule:nonzero;stroke:none"
			 id="path78" />
		  <path
			 d="m 1337.71,656.582 c 0,-9.785 -7.92,-17.727 -17.71,-17.727 -9.79,0 -17.71,7.942 -17.71,17.727 0,9.785 7.92,17.715 17.71,17.715 9.79,0 17.71,-7.93 17.71,-17.715"
			 style="fill:#040606;fill-opacity:1;fill-rule:nonzero;stroke:none"
			 id="path80" />
		  <path
			 d="m 1443.96,739.434 c 0,-9.786 -7.92,-17.715 -17.71,-17.715 -9.79,0 -17.71,7.929 -17.71,17.715 0,9.785 7.92,17.714 17.71,17.714 9.79,0 17.71,-7.929 17.71,-17.714"
			 style="fill:#040606;fill-opacity:1;fill-rule:nonzero;stroke:none"
			 id="path82" />
		  <path
			 d="m 1550.21,858.047 c 0,-9.785 -7.92,-17.727 -17.71,-17.727 -9.79,0 -17.71,7.942 -17.71,17.727 0,9.785 7.92,17.715 17.71,17.715 9.79,0 17.71,-7.93 17.71,-17.715"
			 style="fill:#040606;fill-opacity:1;fill-rule:nonzero;stroke:none"
			 id="path84" />
		  <path
			 d="m 1647.71,996.66 c 0,-9.785 -7.92,-17.734 -17.71,-17.734 -9.79,0 -17.71,7.949 -17.71,17.734 0,9.79 7.92,17.72 17.71,17.72 9.79,0 17.71,-7.93 17.71,-17.72"
			 style="fill:#040606;fill-opacity:1;fill-rule:nonzero;stroke:none"
			 id="path86" />
		  <path
			 d="m 1747.71,1169.32 c 0,-9.79 -7.92,-17.73 -17.71,-17.73 -9.79,0 -17.71,7.94 -17.71,17.73 0,9.78 7.92,17.71 17.71,17.71 9.79,0 17.71,-7.93 17.71,-17.71"
			 style="fill:#040606;fill-opacity:1;fill-rule:nonzero;stroke:none"
			 id="path88" />
		  <path
			 d="m 1117.71,599.773 c 0,-9.785 -7.92,-17.722 -17.71,-17.722 -9.79,0 -17.71,7.937 -17.71,17.722 0,9.79 7.92,17.715 17.71,17.715 9.79,0 17.71,-7.925 17.71,-17.715"
			 style="fill:#040606;fill-opacity:1;fill-rule:nonzero;stroke:none"
			 id="path90" />
		  <path
			 d="M 2308.91,487.5 H 0"
			 style="fill:none;stroke:#040606;stroke-width:20;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
			 id="path92" />
		  <path
			 d="M 2289.09,515.328 2397.5,486.301 2289.09,457.23 Z"
			 style="fill:#040606;fill-opacity:1;fill-rule:nonzero;stroke:none"
			 id="path94" />
		  <path
			 d="M 430,1402.5 70,487.5"
			 style="fill:none;stroke:#040606;stroke-width:10;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
			 id="path96" />
		  <path
			 d="m 1840,1402.5 362.5,-915"
			 style="fill:none;stroke:#040606;stroke-width:10;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
			 id="path98" />
		  <path
			 d="m 430,1402.5 c 0,0 286.25,-800 705,-805 382.5,-5 705,805 705,805"
			 style="fill:none;stroke:#040606;stroke-width:20;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
			 id="path100" />
		  <path
			 d="M 430,1508.91 V 260.512"
			 style="fill:none;stroke:#040606;stroke-width:20;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
			 id="path102" />
		  <path
			 d="m 402.168,1489.09 29.031,108.41 29.074,-108.41 z"
			 style="fill:#040606;fill-opacity:1;fill-rule:nonzero;stroke:none"
			 id="path104" />
		  <path
			 d="M 546.25,1142.15 V 487.5"
			 style="fill:none;stroke:#040606;stroke-width:10;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
			 id="path106" />
		  <path
			 d="M 658.75,949.98 V 487.75"
			 style="fill:none;stroke:#040606;stroke-width:10;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
			 id="path108" />
		  <path
			 d="M 770,804.016 V 487.5"
			 style="fill:none;stroke:#040606;stroke-width:10;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
			 id="path110" />
		  <path
			 d="M 880,698.867 V 487.5"
			 style="fill:none;stroke:#040606;stroke-width:10;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
			 id="path112" />
		  <path
			 d="M 990,630.996 V 487.75"
			 style="fill:none;stroke:#040606;stroke-width:10;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
			 id="path114" />
		  <path
			 d="M 1100,599.773 V 487.5"
			 style="fill:none;stroke:#040606;stroke-width:10;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
			 id="path116" />
		  <path
			 d="M 1210,606.73 V 487.75"
			 style="fill:none;stroke:#040606;stroke-width:10;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
			 id="path118" />
		  <path
			 d="M 1320,656.582 V 487.5"
			 style="fill:none;stroke:#040606;stroke-width:10;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
			 id="path120" />
		  <path
			 d="M 1426.25,739.434 V 487.75"
			 style="fill:none;stroke:#040606;stroke-width:10;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
			 id="path122" />
		  <path
			 d="M 1532.5,858.047 V 487.75"
			 style="fill:none;stroke:#040606;stroke-width:10;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
			 id="path124" />
		  <path
			 d="M 1630,996.66 V 487.75"
			 style="fill:none;stroke:#040606;stroke-width:10;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
			 id="path126" />
		  <path
			 d="M 1730,1169.32 V 487.75"
			 style="fill:none;stroke:#040606;stroke-width:10;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
			 id="path128" />
		  <path
			 d="M 70,487.5 C 450,487.5 282.5,10 1272.5,10 c 720,0 617.5,477.5 930,477.5"
			 style="fill:none;stroke:#040606;stroke-width:20;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
			 id="path130" />
		  <path
			 d="m 367.285,323.5 c 72.086,45 72.086,45 144.168,0 72.086,-45 72.086,-45 144.172,0 72.086,45 72.086,45 144.164,0 72.086,-45 72.086,-45 144.172,0 72.079,45 72.079,45 144.169,0 72.08,-45 72.08,-45 144.17,0 72.08,45 72.08,45 144.16,0 72.09,-45 72.09,-45 144.17,0 72.09,45 72.09,45 144.17,0 72.09,-45 72.09,-45 144.17,0 72.09,45 72.09,45 144.17,0"
			 style="fill:none;stroke:#040606;stroke-width:10;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
			 id="path132" />
		  <path
			 d="m 404.395,285.84 c 38.132,20.68 50.062,13.242 107.058,-22.34 72.086,-45 72.086,-45 144.172,0 72.086,45 72.086,45 144.164,0 72.086,-45 72.086,-45 144.172,0 72.079,45 72.079,45 144.169,0 72.08,-45 72.08,-45 144.17,0 72.08,45 72.08,45 144.16,0 72.09,-45 72.09,-45 144.17,0 72.09,45 72.09,45 144.17,0 72.09,-45 72.09,-45 144.17,0 58.72,36.648 69.61,43.441 110.57,20.398"
			 style="fill:none;stroke:#040606;stroke-width:10;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
			 id="path134" />
		  <path
			 d="m 460.582,232.512 c 12.852,-5.274 28.34,-14.942 50.871,-29.012 72.086,-45 72.086,-45 144.172,0 72.086,45 72.086,45 144.164,0 72.086,-45 72.086,-45 144.172,0 72.079,45 72.079,45 144.169,0 72.08,-45 72.08,-45 144.17,0 72.08,45 72.08,45 144.16,0 72.09,-45 72.09,-45 144.17,0 72.09,45 72.09,45 144.17,0 72.09,-45 72.09,-45 144.17,0 35.46,22.121 53.48,33.371 71.21,33.738"
			 style="fill:none;stroke:#040606;stroke-width:10;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
			 id="path136" />
		</g>
	  </g>
	</svg>
	`
    let svgBlob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});
    let url = URL.createObjectURL(svgBlob);
    let image = new Image();
    image.src = url;
    let paint1 = function(ct) {
        image.onload = function() {
            ct.drawImage(image, 0, 0);
            //URL.revokeObjectURL(url);
        };
    };

    NAtask.setTask({
        text: 'На рисунке изображена схема моста. ' +
            'Вертикальные пилоны связаны провисающей цепью. ' +
            'Тросы, которые свисают с цепи и поддерживают полотно моста, называются вантами. ' +
            'Введём  систему  координат:  ' + [
                'ось $Oy$ направим вертикально вверх вдоль одного из пилонов',
                'ось $Ox$ направим вдоль полотна моста'
            ].shuffleJoin(', а ') +
            ', как показано на рисунке. ' +
            'В этой системе координат линия, по которой провисает цепь моста, ' +
            'задаётся формулой ' +
            ('$$y=' + a + 'x^2 +' + b + 'x+' + c + ',$$').plusminus() +
            ' где $x$ и $y$ измеряются в метрах. ' +
            'Найдите длину ванты, расположенной в ' + chislitlx(x, 'метр', 'p$') + ' от пилона. ' +
            'Ответ дайте в метрах.',
        answers: y,
        authors: ['Aisse-258', 'NickKolok', 'mcFrene']
    });
    NAtask.modifiers.allDecimalsToStandard(true);
    chas2.task.modifiers.addCanvasIllustration({
        width: 400,
        height: 400,
        paint: paint1
    });
}, 2000);
})();
//mcFrene
/*РешуЕГЭ: 324467: 325722 325723 325724 325725 325726 325727 325728 325729 325730
*/
