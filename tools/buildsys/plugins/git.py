import logging
import subprocess
from pathlib import Path

from api import IPluginApi, IApi
from mode import Task


def _get_crr_tag(exact: bool) -> str:
	cmd = ["git", "describe"]
	if not exact:
		cmd.append("--abbrev=0")

	out = subprocess.Popen(cmd, stdout=subprocess.PIPE).communicate()[0].decode("utf-8")
	if out != "":
		out = out[:-1]
	# out = p.communicate()

	if exact:
		logging.debug("Точный текущий тег: %s" % out)
	else:
		logging.debug("Последний тег: %s" % out)

	return out


def get_current_tag_exact(api: IApi, build_dir: Path, task: dict) -> bool:
	"""Поместить текущий тег в переменную"""
	dest_var_var = "dest-var"

	if not dest_var_var in task:
		logging.warning("Опцианальный параметр %s пропущен" % dest_var_var)
	if not isinstance(task[dest_var_var], str):
		logging.error("Ожидалася строка в параметре %s" % dest_var_var)
		return False

	dest_var = task[dest_var_var]

	cache_var = "tool.git.current-tag-exact"

	if not cache_var in api.variables:	
		api.variables[cache_var] = _get_crr_tag(True)

	api.variables[dest_var] = api.variables[cache_var]

	return True


def get_current_tag_last(api: IApi, build_dir: Path, task: dict) -> bool:
	"""Поместить последний тег в переменную"""
	dest_var_var = "dest-var"

	if not dest_var_var in task:
		logging.warning("Опцианальный параметр %s пропущен" % dest_var_var)
	if not isinstance(task[dest_var_var], str):
		logging.error("Ожидалася строка в параметре %s" % dest_var_var)
		return False

	dest_var = task[dest_var_var]

	cache_var = "tool.git.current-tag-last"

	if not cache_var in api.variables:	
		api.variables[cache_var] = _get_crr_tag(False)

	api.variables[dest_var] = api.variables[cache_var]

	return True


def bs_plugin(api: IPluginApi):
	api.add_tool("git.get-current-tag-exact", get_current_tag_exact)
	api.add_tool("git.get-current-tag-last", get_current_tag_last)
