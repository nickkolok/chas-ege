
import sys
import logging
import importlib
from pathlib import Path

import api
import mode


class BuildSysCore(api.IApi, api.IConfigurationApi):
	"""Ядро системы"""
	
	def __init__(self):
		self._debug = False
		self._build_dir = "./build/"
		self._modes = {}

		# TODO: Может оставить дату и время сообщения? "[%(asctime)s] %(levelname)-8s %(message)s",
		logging.basicConfig(format="%(levelname)-8s %(message)s",
							datefmt="%Y.%m.%d %H:%M:%S", level=logging.INFO)

	def enable_debug(self):
		"""Включить режим отладки"""
		self._debug = True
		logging.getLogger().setLevel(logging.DEBUG)
		logging.debug("Включен режим отладки")

	def load_config(self, path: Path):
		"""Загрузить конфиг
		:param path: путь к конфигу"""
		assert isinstance(path, Path), "path must be pathlib.Path"
		INIT_FUNC = "bs_configure"
		loader = importlib.machinery.SourceFileLoader("config", str(path))
		config = loader.load_module()

		config.bs_configure(self)

	def build(self):
		"""Собрать проект"""
		pass

	def set_build_directory(self, path: str):
		assert isinstance(path, str), "path must be str"
		self._build_dir = path
		logging.debug("Директорией сборки выбрана '%s'" % path)

	def add_mode(self, build_mode: mode.Mode):
		assert isinstance(build_mode, mode.Mode), "build_mode must be instance of mode.Mode"

		if build_mode.name in self._modes:
			raise NameError("Режим с именем '%s' уже существует" % build_mode.name)

		self._modes[build_mode.name] = build_mode
		logging.debug("Добавлен режим сборки '%s'" % build_mode.name)

	@property
	def modes(self) -> dict:
		return self._modes

	@property
	def build_directory(self) -> str:
		return self._build_dir

	@property
	def version(self) -> str:
		return "0.01"

	@property
	def debug(self) -> bool:
		return self._debug
