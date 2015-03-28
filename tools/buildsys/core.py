
import sys
import logging
import importlib
import json
from pathlib import Path

import api
import mode


class BuildSysCore(api.IApi, api.IPluginApi):
	"""Ядро системы"""
	
	def __init__(self):
		self._debug = False
		self._config = {}
		self._variables = {}
		self._tools = {}

		# TODO: Может оставить дату и время сообщения? "[%(asctime)s] %(levelname)-8s %(message)s",
		logging.basicConfig(format="%(levelname)-8s %(message)s",
							datefmt="%Y.%m.%d %H:%M:%S", level=logging.INFO)

		self._variables["buildsys.version"] = self.version
		self._variables["buildsys.debug"] = self.debug

	def enable_debug(self):
		"""Включить режим отладки"""
		self._debug = True
		logging.getLogger().setLevel(logging.DEBUG)
		logging.debug("Включен режим отладки")

	def load_plugins_from(self, directory: Path):
		"""Загрузить плагины из директории"""
		logging.debug("Загрузка плагинов из '%s'" % directory)

		if not directory.is_dir():
			raise IOError("'%s' -- не директория" % directory)

		for p in directory.iterdir():
			if p.suffix == ".py":
				logging.debug("\t%s" % p.name)
				try:
					loader = importlib.machinery.SourceFileLoader(p.stem, str(p))
					config = loader.load_module()

					config.bs_plugin(self)
				except BaseException as e:
					logging.exception(e)
					sys.exit(1)

	def load_config(self, path: Path):
		"""Загрузить конфиг
		:param path: путь к конфигу"""
		assert isinstance(path, Path), "path must be pathlib.Path"
		with path.open() as f:
		    self._config = json.loads(f.read())

	def build(self, build_mode: str):
		"""Собрать проект
		:param build_mode: название режима"""
		if build_mode not in self._config["modes"]:
			logging.critical("Режим '%s' не найден" % build_mode)
			return

		mode = self._config["modes"][build_mode]
		build_dir = Path(mode["build-dir"])

		if not build_dir.exists():
			build_dir.mkdir(parents=True)

		self._variables["buildsys.mode"] = build_mode

		logging.info("Сборка...")

		for t in mode["tasks"]:
			toolid = t["toolid"]
			if toolid not in self._tools:
				logging.critical("Инструмент '%s' не найден" % toolid)
				return
			if not self._tools[toolid](task=t, build_dir=build_dir, api=self):
				logging.critical("Выполнение инструмента '%s' завершилось не удачно" % toolid)
				return

		logging.info("Успешно собрано")

	def add_tool(self, toolid: str, tool):
		assert isinstance(toolid, str), "toolid must be str"

		if toolid in self._tools:
			raise NameError("Инструмент с toolid '%s' уже существует" % toolid)

		self._tools[toolid] = tool
		logging.debug("Добавлен инструмент '%s'" % toolid)

	@property
	def config(self) -> dict:
		return self._config

	@property
	def tools(self) -> dict:
		return self._tools

	@property
	def variables(self) -> dict:
		return self._variables

	@property
	def version(self) -> str:
		return "0.01"

	@property
	def debug(self) -> bool:
		return self._debug
