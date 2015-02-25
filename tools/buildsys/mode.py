

class Task:
	"""Задача"""

	def __init__(self, toolid: str, files: (str, list), *args, **kwargs):
		assert isinstance(toolid, str), "toolid must be str"
		assert isinstance(files, (str, list)), "files must be str or list of str"

		self._toolid = toolid
		self._files = files
		self._args = args
		self._kwargs = kwargs

	@property
	def toolid(self) -> str:
		"""Строковый индекс инструмента, который будет выполнять эту задачу"""
		return self._toolid

	@property
	def files(self) -> (str, list):
		"""Путь (или шаблон пути) к файлам"""
		return self._files

	@property
	def args(self) -> list:
		return self._args

	@property
	def kwargs(self) -> dict:
		return self._kwargs
		


class Mode:
	"""Режим сборки"""

	def __init__(self, name: str):
		assert isinstance(name, str), "name must be str"
		self._name = name
		self._tasks = []

	def _append_task(self, task: Task):
		"""Добавить задачу
		:param task: задача"""
		self._tasks.append(task)

	@property
	def name(self) -> str:
		"""Название"""
		return self._name

	@property
	def tasks(self) -> list:
		"""Задачи"""
		return self._tasks
