import logging
from pathlib import Path

from api import IPluginApi, IApi
from mode import Task


def mkdirs(api: IApi, build_dir: Path, task: dict) -> bool:
	"""Создание директорий"""
	for f in task["files"]:
		p = build_dir / f
		if not p.exists():
			p.mkdir(parents=True)
		elif not p.is_dir():
			logging.error("Файл '%s' существует, но не является директорией")
			return False

	return True


def bs_plugin(api: IPluginApi):
	api.add_tool("fs.mkdirs", mkdirs)
