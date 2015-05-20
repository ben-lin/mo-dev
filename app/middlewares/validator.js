/*!
 * @fileoverview
 * Load validator middleware.
 */

'use strick';

/**
 * Module dependencies
 */
var validator = require('koa-validate');

/**
 * @description Load validator middleware
 * @public
 * @function
 * @param {Function} app.use - Middleware loader
 * @example
 *
 *  var koa = require( 'koa' );
 *  var app = koa();
 *  loadValidatorMiddleware( app );
 */
module.exports = function loadValidatorMiddleware(app) {
  app.use(validator());
};
