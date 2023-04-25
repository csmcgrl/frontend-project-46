install:
	npm ci

publish:
	npm publish --dry-run	

lint:
	npx eslint .

gendiff:
	node bin/gendiff.js

dev: 
	gendiff file1.json file2.json

watch:
	npx nodemon src/index.js

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8