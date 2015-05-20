/*!
 * @fileoverview
 * Load router middleware.
 */

'use strick';

/**
 * Module dependencies
 */
var router = require( 'koa-router' );

/**
 * @description Load router middleware
 * @public
 * @function
 * @param {Function} app.use - Middleware loader
 * @example
 *
 *  var koa = require( 'koa' );
 *  var app = koa();
 *  loadRouterMiddleware( app );
 */
module.exports = function loadRouterMiddleware( app ){
  app.use( router( app ));
};
