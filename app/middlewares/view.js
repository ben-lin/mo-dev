/*!
 * @fileoverview
 * Setup and load view middleware.
 */

'use strick';

/**
 * Module dependencies
 */
var view = require('koa-views');
var swig = require('swig');

/**
 * @description Setup and load view middleware
 * @public
 * @function
 * @param {Function} app.use - Middleware loader
 * @example
 *
 *  var koa = require( 'koa' );
 *  var app = koa();
 *  viewMiddleware( app );
 */
module.exports = function loadViewMiddleware(app) {
  app.use(view('views', {
    map: {
      html: swig
    }
  }));
};
