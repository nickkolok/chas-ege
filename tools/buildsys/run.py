#!/usr/bin/env python3

import sys
import argparse
import logging
from pathlib import Path

import click

from core import BuildSysCore


@click.command()
@click.option("--debug", is_flag=True, default=False, help="Включить режим отладки")
@click.option("--config", help="Конфигурационный Python-скрипт")
@click.option("--mode", help="Режим")
def main(debug, config, mode):
	core = BuildSysCore()

	logging.info("Build System v%s" % core.version)

	if debug:
		core.enable_debug()

	core.load_plugins_from(Path(__file__).parent / "plugins")
	core.load_config(Path(config))

	core.build(mode)


if __name__ == "__main__":
	main()
