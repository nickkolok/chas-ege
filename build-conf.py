
import mode
from api import IConfigurationApi


class DevMode(mode.Mode):
	def __init__(self):
		mode.Mode.__init__(self, name="dev")

		self._append_task(mode.Task("mkdirs",
						 [
							 "html",
							 "js",
						 ]
		))

def bs_config(api: IConfigurationApi):
	api.set_build_directory("./build/dev/")
	api.add_mode(DevMode())
