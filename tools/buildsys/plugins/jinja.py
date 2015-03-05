import logging
from pathlib import Path

from jinja2 import Environment, FileSystemLoader

from api import IPluginApi, IApi
from mode import Task


def jinja_render(api: IApi, build_dir: Path, task: Task) -> bool:
	"""Создание директорий"""
	templates_dir_var = "templates-dir"
	dest_dir_var = "dest"
	templates_var = "templates"

	if not templates_dir_var in task and not isinstance(task[templates_dir_var], str):
		logging.error("Ожидалась строка %s" % templates_dir_var)
		return False

	if not dest_dir_var in task and not isinstance(task[dest_dir_var], str):
		logging.error("Ожидалась строка %s" % dest_dir_var)
		return False

	if not templates_var in task and not isinstance(task[templates_var], list):
		logging.error("Ожидалася массив строк %s" % templates_dir_var)
		return False

	templdir = Path(task[templates_dir_var])
	dest = Path(build_dir / task[dest_dir_var])
	templates = task[templates_var]

	if not templdir.exists():
		logging.error("Директория '%s' не существует" % templdir)
		return False
	if not templdir.is_dir():
		logging.error("'%s' не является директорией" % templdir)
		return False

	if not dest.exists():
		dest.mkdir(parents=True)
	elif not dest.is_dir():
		logging.error("'%s' существует, но не является директорией" % templdir)
		return False

	env = Environment(loader=FileSystemLoader(str(templdir)))

	variables = {}
	for k, v in api.variables.items():
		variables[k.replace("-", "_")] = v

	for t in templates:
		out = dest / Path(t)
		logging.info("Сборка шаблона {t} в {d}".format(t=t, d=out))
		templ = env.get_template(t)
		with out.open("w") as f:
			f.write(templ.render(CURRENT_TEMPLATE=t, **variables))

	return True


def bs_plugin(api: IPluginApi):
	api.add_tool("jinja.render", jinja_render)
