/*!
 * @fileoverview
 * Load cors middleware.
 */

'use strick';

/**
 * Module dependencies
 */
var cors = require( 'koa-cors' );

/**
 * @description Load cors middleware
 * @public
 * @function
 * @param {Function} app.use - Middleware loader
 * @example
 *
 *  var koa = require( 'koa' );
 *  var app = koa();
 *  loadCorsMiddleware( app );
 */
module.exports = function loadCorsMiddleware( app ){
  app.use( cors());
};
