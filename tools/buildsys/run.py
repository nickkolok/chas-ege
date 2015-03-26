#!/usr/bin/env python3.4

import sys
import argparse
import logging
from pathlib import Path
import imp

#Загрузка сторонних библиотек
click      = imp.load_source('click'     , './ext/python-libs/click/__init__.py'     )
markupsafe = imp.load_source('markupsafe', './ext/python-libs/markupsafe/__init__.py')
jinja2     = imp.load_source('jinja2'    , './ext/python-libs/jinja2/__init__.py'    )


from core import BuildSysCore


@click.command()
@click.option("--debug", is_flag=True, default=False, help="Включить режим отладки")
@click.option("--config", help="Конфигурационный Python-скрипт")
@click.option("--mode", help="Режим")
@click.option("--dump-variables", is_flag=True, default=False, help="Вывести все переменные по окончанию сборки")
def main(debug, config, mode, dump_variables):
	core = BuildSysCore()

	logging.info("Build System v%s" % core.version)

	if debug:
		core.enable_debug()

	core.load_plugins_from(Path(__file__).parent / "plugins")
	core.load_config(Path(config))

	core.build(mode)

	if dump_variables:
		logging.info("Переменные:")
		for k, v in core.variables.items():
			name = "\"%s\"" % k if isinstance(k, str) else k
			value = "\"%s\"" % v if isinstance(v, str) else v
			logging.info("\t{n}: {v}".format(n=name, v=value))


if __name__ == "__main__":
	main()
