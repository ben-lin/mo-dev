/*!
 * mo
 * Copyright(c) 2015 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Bundle everthing to Koa instance and export it as mo instance.
 */

'use strick';

/**
 * Module dependencies
 */
var koa = require('koa');

var app = koa();
require('./setConfig')(app);
require('./setLogger')(app);
require('./buildModels')(app);
require('./loadLibs')(app);
require('./LoadMiddlewares')(app);
require('./mapActions')(app);
module.exports = app;
