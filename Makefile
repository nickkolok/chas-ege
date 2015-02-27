
BUILD_TOOL_FLAGS=

BUILD_TOOL=./tools/buildsys/run.py
BUILD_CONF=./build-conf.json

.PHONY : dev
dev:
	$(BUILD_TOOL) --config=$(BUILD_CONF) --mode=dev $(BUILD_TOOL_FLAGS)

# gen-doc:
# 	jsdoc -d=./doc/api -e=utf-8 -r=8 -a -p ./lib/
