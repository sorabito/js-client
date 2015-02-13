#!/bin/bash

version="v1.0.0"
preamble="/* jsonrates.js $version | Currency exchange rates API | jsonrates.com */"
input="src/jr.js src/jrequest.js"
output="jsonrates.min.js"

uglifyjs $input --compress --preamble "$preamble" --stats --output $output