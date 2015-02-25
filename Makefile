
BUILD_TOOL=./tools/buildsys/run.py
BUILD_TOOL_FLAGS=

.PHONY : dev
dev:
	$(BUILD_TOOL) --config=./build-conf.py $(BUILD_TOOL_FLAGS)

# gen-doc:
# 	jsdoc -d=./doc/api -e=utf-8 -r=8 -a -p ./lib/
