### Hexlet tests and linter status:

[![Actions Status](https://github.com/csmcgrl/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/csmcgrl/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/044dfbce24c1909736f9/maintainability)](https://codeclimate.com/github/csmcgrl/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/044dfbce24c1909736f9/test_coverage)](https://codeclimate.com/github/csmcgrl/frontend-project-46/test_coverage)

# Description

Console application "Difference Calculator" is a utility that determines the difference between two data structures represented as objects.

The program supports files with the extension .json, .yaml or .yml.
Reports are generated in the form of a text message, structured output, or in json format.

# Setup

<ol>
    <li>clone repository</li>
    <li>run the command make install</li>
</ol>

```
git clone git@github.com:csmcgrl/frontend-project-46.git
cd frontend-project-46
make install
```

# Application of the utility

Help output for this utility is carried out by the command "gendiff -h".

```
$ gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version       output the version number
  -f --format <type>  output format (default: "stylish")
  -h, --help          display help for command
```

The program can display differences in three formats:

- stylish (по умолчанию)
- plain
- json

To specify a specific output type, you must specify its name with the -f option.

For example, below is the output in plain format **plain** of the results of calculating differences between two files:

```
gendiff -f plain file1.json file2.json

Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```

# Demonstration

[![gendiff utility example .json](https://asciinema.org/a/579057.png)](https://asciinema.org/a/579057)
[![gendiff utility example .yml](https://asciinema.org/a/580571.png)](https://asciinema.org/a/580571)
[![gendiff utility example for recursive structures](https://asciinema.org/a/588897.png)](https://asciinema.org/a/588897)
[![gendiff utility example with plain format](https://asciinema.org/a/589715.png)](https://asciinema.org/a/589715)
