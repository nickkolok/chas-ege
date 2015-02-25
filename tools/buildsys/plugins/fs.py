from api import IPluginApi, IApi
from mode import Task


def mkdirs(api: IApi, task: Task) -> bool:
	"""Создание директорий
	Параметры в task:
	args -- название директорий, которые должны быть созданы"""
	for f in task.args:
		p = api.build_directory / f
		if not p.exists():
			p.mkdir(parents=True)
		elif not p.is_dir():
			logging.error("Файл '%s' существует, но не является директорией")
			return False

	return True


def copy(api: IApi, task: Task) -> bool:
	return True


def bs_plugin(api: IPluginApi):
	api.add_tool("mkdirs", mkdirs)
	api.add_tool("copy", copy)
