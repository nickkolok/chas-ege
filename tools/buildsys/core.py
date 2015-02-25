
import sys
import logging
import importlib
from pathlib import Path

import api
import mode


class BuildSysCore(api.IApi, api.IConfigurationApi, api.IPluginApi):
	"""Ядро системы"""
	
	def __init__(self):
		self._debug = False
		self._build_dir = Path("./build/")
		self._modes = {}
		self._tools = {}

		# TODO: Может оставить дату и время сообщения? "[%(asctime)s] %(levelname)-8s %(message)s",
		logging.basicConfig(format="%(levelname)-8s %(message)s",
							datefmt="%Y.%m.%d %H:%M:%S", level=logging.INFO)

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
		INIT_FUNC = "bs_configure"
		loader = importlib.machinery.SourceFileLoader("config", str(path))
		config = loader.load_module()

		config.bs_config(self)

	def build(self, build_mode: str):
		"""Собрать проект
		:param build_mode: название режима"""
		if build_mode not in self._modes:
			logging.critical("Режим '%s' не найден" % build_mode)
			return

		mode = self._modes[build_mode]

		if not self._build_dir.exists():
			self._build_dir.mkdir(parents=True)

		for t in mode.tasks:
			if t.toolid not in self._tools:
				logging.critical("Инструмент '%s' не найден" % t.toolid)
				return
			if not self._tools[t.toolid](task=t, api=self):
				logging.critical("Выполнение инструмента '%s' завершилось не удачно" % t.toolid)
				return

	def set_build_directory(self, path: str):
		assert isinstance(path, str), "path must be str"
		self._build_dir = Path(path)
		logging.debug("Директорией сборки выбрана '%s'" % path)

	def add_mode(self, build_mode: mode.Mode):
		assert isinstance(build_mode, mode.Mode), "build_mode must be instance of mode.Mode"

		if build_mode.name in self._modes:
			raise NameError("Режим с именем '%s' уже существует" % build_mode.name)

		self._modes[build_mode.name] = build_mode
		logging.debug("Добавлен режим сборки '%s'" % build_mode.name)

	def add_tool(self, toolid: str, tool):
		assert isinstance(toolid, str), "toolid must be str"

		if toolid in self._tools:
			raise NameError("Инструмент с toolid '%s' уже существует" % toolid)

		self._tools[toolid] = tool
		logging.debug("Добавлен инструмент '%s'" % toolid)

	@property
	def modes(self) -> dict:
		return self._modes

	@property
	def tools(self) -> dict:
		return self._tools

	@property
	def build_directory(self) -> Path:
		return self._build_dir

	@property
	def version(self) -> str:
		return "0.01"

	@property
	def debug(self) -> bool:
		return self._debug
