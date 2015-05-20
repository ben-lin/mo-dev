/*!
 * mo
 * Copyright(c) 2015 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Boot the app.
 */

/**
 * Module dependencies
 */
var app = require('./core/app');

/**
 * @description connectDatabase success callback
 * @private
 * @function
 */
app.connectDatabase(function connectDatabaseCallback() {
  var config = app.config.server;
  var logger = app.logger;

  logger.info(['Starting server at: ', config.host, ':', config.port].join(''));

  /**
   * @description Start the server; listen to host and port
   * @private
   * @function
   */
  app.listen(config.port, config.host, function serverStartedCallback() {
    logger.info('You are ready to rock!');

    // auto execute libs after server start
  });
});

// we dont need this
// app.on( 'error', function globalErrorHandler( err, ctx ){
//   console.log( 'Server Error:\n', err.stack, '\nContext:\n', ctx );
// });
