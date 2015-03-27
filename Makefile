
BUILD_TOOL_FLAGS=

BUILD_SYS_DEPENDS_TOOL=./tools/buildsys/check-depends.py
BUILD_TOOL=./tools/buildsys/run.py
BUILD_CONF=./build-conf.json

DEV_BUILD_DIR=./build/dev/

.PHONY : check-depends
check-depends:
	$(BUILD_SYS_DEPENDS_TOOL)

.PHONY : dev
dev: check-depends
	@rm -rf $(DEV_BUILD_DIR)
	$(BUILD_TOOL) --config=$(BUILD_CONF) --mode=dev $(BUILD_TOOL_FLAGS)
