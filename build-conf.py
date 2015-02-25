
import mode
from api import IConfigurationApi


class DevMode(mode.Mode):
	def __init__(self):
		mode.Mode.__init__(self, name="dev")


def bs_configure(api: IConfigurationApi):
	api.set_build_directory("./build/")
	api.add_mode(DevMode())
