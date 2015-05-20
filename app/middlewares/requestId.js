/*!
 * @fileoverview
 * Load requestId middleware.
 */

'use strick';

/**
 * Module dependencies
 */
var requestId = require('koa-request-id');

/**
 * @description Load requestId middleware
 * @public
 * @function
 * @param {Function} app.use - Middleware loader
 * @example
 *
 *  var koa = require( 'koa' );
 *  var app = koa();
 *  loadRequestIdMiddleware( app );
 */
module.exports = function loadRequestIdMiddleware(app) {
  app.use(requestId());
};
