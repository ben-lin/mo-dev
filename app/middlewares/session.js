/*!
 * @fileoverview
 * Setup and load session middleware.
 */

'use strick';

/**
 * Module dependencies
 */
var session    = require( 'koa-generic-session' );
var redisStore = require( 'koa-redis' );

/**
 * @description Setup and load session middleware
 * @public
 * @function
 * @param {Function} app.use - Middleware loader
 * @param {String} app.config.session.redis - Redis config
 * @param {String} app.config.session.redis.host - Redis host
 * @param {String} app.config.session.redis.port - Redis port
 * @param {String} app.config.session.redis.socket - Redis socket
 * @param {String} app.config.session.redis.db - Redis database name
 * @param {String} app.config.session.redis.pass - Redis password
 * @example
 *
 *  var koa = require( 'koa' );
 *  var app = koa();
 *  loadSessionMiddleware( app );
 */
module.exports = function loadSessionMiddleware( app ){
  var config = app.config.session.redis;

  app.use( session({ store : redisStore({
    host   : config.host,
    port   : config.port,
    socket : config.socket,
    db     : config.db,
    pass   : config.pass
  })}));
};
