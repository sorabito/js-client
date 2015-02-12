#!/bin/bash

preamble="/* jsonrates.js v1.0.0 | Currency exchange rates API | jsonrates.com */"
input="src/jsonrates.js"
output="jsonrates.min.js"

uglifyjs "$input" --compress --preamble "$preamble" --stats --output "$output"