/*eslint-env node*/
'use strict';

var common = require('gulp-capacitorjs-common');
common.config.src.out = 'stream-bus.js';
common.config.src.main = 'src/stream-bus.js';
common.registerCommon();
