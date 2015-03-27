#!/usr/bin/env python3

import sys


def main():
	print("Проверка зависимостей")

	status = True
	
	print("Проверка версии python...")
	try:
		python_version = sys.version.split(" ")[0].split(".")
		if int(python_version[0]) != 3 and int(python_version[1]) < 4:
			print("ERROR: Требуется Python версии 3.4 или выше. У вас {major}.{minor}".format(major=python_version[0],
			                                                                                  minor=python_version[1]))
			status = False
	except:
		status = False

	print("Проверка наличия библиотек...")
	try:
		import click
	except ImportError:
		print("ERROR: Библиотека click не найдена. Установит её через pip3")
		status = False

	try:
		import jinja2
	except ImportError:
		print("ERROR: Библиотека jinja2 не найдена. Установит её через pip3")
		status = False

	return status


if __name__ == '__main__':
	if not main():
		sys.exit(1)

