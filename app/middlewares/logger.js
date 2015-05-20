/*!
 * @fileoverview
 * Setup and load logger middleware.
 */

'use strick';

/**
 * Module dependencies
 */
var util = require('util');
var bytes = require('bytes');

/**
 * @description Setup logger middleware
 * @private
 * @function
 * @param {Object} app.logger - Logger instance
 * @returns {Object} koaLog4jsMiddleware
 */
function koaLog4js(app) {
  var logger = app.logger;

  /**
   * @description Calculate timestamp difference
   * @private
   * @function
   * @param {Number} startTime - Request started timestamp
   * @returns {String} The timestamp difference in `ms`
   */
  function timeDiff(startTime) {
    return (Date.now() - startTime) + 'ms';
  }

  /**
   * @description logger middleware
   * @public
   * @function
   * @param {Function} next - Next middleware
   * @this Koa Context
   */
  return function* koaLog4jsMiddleware(next) {
    var config = this.app.config.logger;
    var startTime = Date.now();
    var req = this.request;
    var res = this.response;
    var header = req.header;
    var nodeReq = this.req;
    var pid = process.pid;
    var ip = nodeReq.connection.remoteAddress || headers['x-forwarded-for'];
    var agent = req.header['user-agent'];
    var time;
    var log;

    if (config && config.verbose === true) {
      log = {
        pid: pid,
        req: {
          id: undefined,
          ip: ip,
          method: req.method,
          url: req.url,
          header: header
        }
      };

      try {
        yield next;
      } catch (err) {
        // log uncaught downstream errors
        log.error = err.stack;
        logger.error('\n', log);
        throw err;
      }

      if (this.id) log.req.id = this.id;
      if (req.body) log.req.body = req.body;

      log.res = {
        status: res.status,
        time: timeDiff(startTime),
        header: res.header,
        body: res.body
      };

      logger.info('\n', util.inspect(log, { /*colors : true,*/
        depth: null
      }), '\n');
    } else {
      try {
        yield next;
      } catch (err) {
        time = timeDiff(startTime);
        log = [ip, req.method, req.url, 500, time, agent, '\n'].join(' ');

        // log uncaught downstream errors
        logger.error(log, err.stack);
        throw err;
      }

      var len = bytes(Number(res.header['content-length']));
      time = timeDiff(startTime);
      log = [ip, req.method, req.url, res.status, time, len, agent].join(' ');

      logger.info(log);
    }
  };
}

/**
 * @description Setup and load logger middleware
 * @public
 * @function
 * @param {Function} app.use - Middleware loader
 * @example
 *
 *  var koa = require( 'koa' );
 *  var app = koa();
 *  loadLoggerMiddleware( app );
 */
module.exports = function loadLoggerMiddleware(app) {
  app.use(koaLog4js(app));
};
