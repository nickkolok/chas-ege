from api import IPluginApi, IApi
from mode import Task


def mkdirs(api: IApi, task: Task) -> bool:
	for f in task.files:
		p = api.build_directory / f
		if not p.exists():
			p.mkdir(parents=True)
		elif not p.is_dir():
			logging.error("Файл '%s' существует, но не является директорией")
			return False

	return True


def bs_plugin(api: IPluginApi):
	api.add_tool("mkdirs", mkdirs)
