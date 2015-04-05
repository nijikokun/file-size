#!/bin/bash

MOCHA = node_modules/.bin/mocha
MOCHA_SPAWN = node_modules/.bin/_mocha
ISTANBUL = node_modules/.bin/istanbul
COVERAGE_REPORT = ./coverage/lcov.info
CODECLIMATE = ./node_modules/.bin/codeclimate

clean:
	rm -rf coverage

test:
	$(MOCHA) -R spec $(TESTS)

coverage:
	$(ISTANBUL) cover $(MOCHA_SPAWN) -- -R spec test/**/*.js

codeclimate:
	cat $(COVERAGE_REPORT) | $(CODECLIMATE)

.PHONY: test clean coverage coveralls codeclimate