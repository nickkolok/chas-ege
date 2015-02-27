
from pathlib import Path

import mode


class IApi:
	"""Центральный API"""

	@property
	def config(self) -> dict:
		"""Конфиг"""
		raise NotImplementedError()

	@property
	def tools(self) -> dict:
		"""Инструменты"""
		raise NotImplementedError()

	@property
	def build_directory(self) -> Path:
		"""Директория сборки"""
		raise NotImplementedError()

	@property
	def version(self) -> str:
		"""Версия системы"""
		raise NotImplementedError()

	@property
	def debug(self) -> bool:
		"""Флаг отладочного режима"""
		raise NotImplementedError()


class IPluginApi:
	"""API, предоставляемый плагину"""

	def add_tool(self, toolid: str, tool):
		"""Добавить интструмент
		:param toolid: строковый индекс инструмента
		:param tool: обработчик mode.Task"""
		raise NotImplementedError()


# class IConfigurationApi:
# 	"""API, предоставляемый конфигу"""

# 	def set_build_directory(self, path: str):
# 		"""Установить директорию сборки
# 		:param path: директория сбокри"""
# 		raise NotImplementedError()

# 	def add_mode(self, build_mode: mode.Mode):
# 		"""Добавить режим сборки
# 		:param mode: режим"""
# 		raise NotImplementedError()
