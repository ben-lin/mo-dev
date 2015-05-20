/*!
 * @fileoverview
 * Setup and load err500 middleware.
 */

'use strick';

/**
 * @description Setup err500 middleware
 * @private
 * @function
 * @returns {Function} err500Middleware
 */
function err500() {
  /**
   * @description err500 middleware
   * @public
   * @function
   * @param {Function} next - Next middleware
   * @this Koa Context
   */
  return function* err500Middleware(next) {
    try {
      yield next;
    } catch (err) {
      this.status = err.status || 500;
      this.body = err.message;

      this.app.emit('error', err, this);
    }
  };
};

/**
 * @description Load err500 middleware
 * @public
 * @function
 * @param {Function} app.use - Middleware loader
 * @example
 *
 *  var koa = require( 'koa' );
 *  var app = koa();
 *  loadErr500Middleware( app );
 */
module.exports = function loadErr500Middleware(app) {
  app.use(err500());
};
