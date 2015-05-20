/*!
 * mo
 * Copyright(c) 2015 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Load specified middlewares.
 */

'use strick';

/**
 * @description Load specified middlewares
 * @public
 * @function
 * @requires lib/setConfig
 * @requires lib/setLogger
 * @param {Object} app.logger - Logger instance
 * @param {Array} app.config.middlewares - An Array of middlewares to be loaded
 * @param {String} app.config.dir.middlewares - Middlewares directory
 * @example
 *
 *  var koa = require( 'koa' );
 *  var app = koa();
 *  loadMiddlewares( app );
 */
module.exports = function loadMiddlewares( app ){
  /**
   * Module dependencies
   */
  var path   = require( 'path' );
  var logger = app.logger;

  logger.info( 'Loading middlewares' );

  var middlewares = app.config.middlewares;
  if( !middlewares || !middlewares.length ){
    return logger.warn( 'No middlewares found' );;
  }

  /**
   * @description Load each middleware
   * @private
   * @function
   * @param {String} middleware - Middleware name
   */
  middlewares.forEach( function middlewareLoader( middleware ){
    logger.info( 'Loading middleware: ' + middleware );
    require( path.resolve( app.config.dir.middlewares, middleware ))( app );
  });

  logger.info( 'All middlewares loaded' );
};
