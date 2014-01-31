#!/bin/sh
cd zdn
for nbr in `ls -F | grep -e ./ | tr -d \/`
do
	cd $nbr;
	echo 'nabor.upak={' > upak.js
	for ktg in `ls -Fv | grep -e ./ | tr -d \/`
	do 
		echo "$ktg :{" >> upak.js
		cd $ktg
		for nmr in `ls *.js | tr -d \.js`
		do
			echo "$nmr :function(){" >> ../upak.js
			cat "$nmr.js" >> ../upak.js
			echo "}," >> ../upak.js
		done
		cd ..
		echo "}," >> upak.js
	done
	echo '};' >> upak.js
	cd ..
	java -jar ../ext/compiler.jar --jscomp_off internetExplorerChecks --charset UTF-8 --js $nbr/upak.js --js_output_file $nbr/upak.min.js
	mv $nbr/upak.min.js $nbr/upak.js
done
cd ..
