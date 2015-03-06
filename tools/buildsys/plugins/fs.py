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


def ln_s(api: IApi, build_dir: Path, task: dict) -> bool:
	"""Создать символьную ссылку"""
	files_var = "files"

	if not files_var in task and not isinstance(task[files_var], list):
		logging.error("Ожидалася массив массивов строк %s" % templates_dir_var)
		return False

	files = [(Path(f[0]), build_dir / Path(f[1])) for f in task[files_var]]

	for s, d in files:
		if not s.exists():
			logging.error("Файл '%s' не существует")
			continue
		if d.exists():
			logging.error("Файл '%s' уже существует")
			continue
		d.symlink_to(s.resolve(), s.is_dir())

	return True


def bs_plugin(api: IPluginApi):
	api.add_tool("fs.mkdirs", mkdirs)
	api.add_tool("fs.ln-s", ln_s)
