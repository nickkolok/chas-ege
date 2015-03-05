import logging
from pathlib import Path

from api import IPluginApi, IApi
from mode import Task


def set_var(api: IApi, build_dir: Path, task: dict) -> bool:
	"""Установка значения переменной"""
	vars_var = "vars"

	if not vars_var in task and not isinstance(task[vars_var], dict):
		logging.error("Ожидалася словарь %s" % vars_var)
		return False

	for k, v in task[vars_var].items():
		api.variables[k] = v

	return True


def copy(api: IApi, build_dir: Path, task: Task) -> bool:
	return True


def bs_plugin(api: IPluginApi):
	api.add_tool("set-var", set_var)
