BIN = ./node_modules/.bin

.PHONY: bootstrap test lint app release;

SRC = $(shell find ./app ./Gruntfile.js  -type f -name '*.js')

start:
	@npm start

lint:
	@$(BIN)/jscs $(SRC);
	@$(BIN)/jsxhint $(SRC);

release:
	@$(BIN)/grunt release

bootstrap: package.json
	@npm install

test: lint
	@echo "no test yet"
