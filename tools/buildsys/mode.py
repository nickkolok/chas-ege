
class Mode:
	"""Режим сборки"""

	def __init__(self, name: str):
		assert isinstance(name, str), "name must be str"
		self._name = name

	@property
	def name(self) -> str:
		return self._name
