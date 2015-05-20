/*!
 * @fileoverview
 * Setup and load static middleware.
 */

'use strick';

/**
 * Module dependencies
 */
var static = require('koa-static');

/**
 * @description Setup and load static middleware
 * @public
 * @function
 * @param {Function} app.use - Middleware loader
 * @param {String} app.config.dir.public - Public directory path
 * @example
 *
 *  var koa = require( 'koa' );
 *  var app = koa();
 *  LoadStaticMiddleware( app );
 */
module.exports = function LoadStaticMiddleware(app) {
  app.use(static(app.config.dir.public));
};
