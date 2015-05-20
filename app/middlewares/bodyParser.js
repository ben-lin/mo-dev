/*!
 * @fileoverview
 * Setup and load bodyParser middleware.
 */

'use strick';

/**
 * Module dependencies
 */
var body = require( 'koa-better-body' );

/**
 * @description Setup and load bodyParser middleware
 * @public
 * @function
 * @param {Function} app.use - Middleware loader
 * @param {String} app.config.dir.tmp - Tmp directory path
 * @example
 *
 *  var koa = require( 'koa' );
 *  var app = koa();
 *  loadBodyParserMiddleware( app );
 */
module.exports = function loadBodyParserMiddleware( app ){
  app.use( body({
    multipart : true,
    formidable: { uploadDir: app.config.dir.tmp }
  }));
};
