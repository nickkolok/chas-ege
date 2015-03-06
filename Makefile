
BUILD_TOOL_FLAGS=

BUILD_TOOL=./tools/buildsys/run.py
BUILD_CONF=./build-conf.json

DEV_BUILD_DIR=./build/dev/

.PHONY : dev
dev:
	@rm -rf $(DEV_BUILD_DIR)
	$(BUILD_TOOL) --config=$(BUILD_CONF) --mode=dev $(BUILD_TOOL_FLAGS)

# gen-doc:
# 	jsdoc -d=./doc/api -e=utf-8 -r=8 -a -p ./lib/
