# Makefile <https://github.com/tunnckoCore/dotfiles>
#
# Copyright (c) 2014 Charlike Mike Reagent, contributors.
# Released under the MIT license.
#

lint:
	jshint .
	jscs . --reporter inline

test:
	mocha

test-cov:
	istanbul cover _mocha

test-travis:
	istanbul cover _mocha --report lcovonly

clean:
	rm -rf node_modules coverage

.PHONY: lint test clean
