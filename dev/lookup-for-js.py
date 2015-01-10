#!/usr/bin/env python3

import sys
import re


def lookup(f):
	p = re.split("[\n]", f)
	p = [re.sub("addscript", "", l) for l in p if "addscript" in l]
	pathes = []

	for i in p:
		n = re.sub("[\s]*[(][\"']", "", i)
		n = re.sub("[\"'][)];", "", n)

		pathes.append(n)

	return pathes


if __name__ == "__main__":
	if "--help" in sys.argv:
		print("%s PATH_PREFIX FILE" % sys.argv[0])
		sys.exit(0)

	if len(sys.argv) != 3:
		print("ОШИБКА: не правильный формат команды\n\tсм. %s --help" % sys.argv[0])
		sys.exit(1)

	pathes = []
	for p in sys.argv[2:]:
		with open(p) as f:
			for n in lookup(f.read()):
				pathes.append("{pf}/{p}".format(pf=sys.argv[1], p=n))

	print(" ".join(pathes))

