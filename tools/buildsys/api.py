
import mode


class IApi:
	"""Центральный API"""

	@property
	def modes(self) -> dict:
		"""Режимы сборки"""
		raise NotImplementedError()

	@property
	def build_directory(self) -> str:
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


class IConfigurationApi:
	"""API, предоставляемый конфигу"""

	def set_build_directory(self, path: str):
		"""Установить директорию сборки
		:param path: директория сбокри"""
		raise NotImplementedError()

	def add_mode(self, build_mode: mode.Mode):
		"""Добавить режим сборки
		:param mode: режим"""
		raise NotImplementedError()
