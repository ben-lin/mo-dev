/*!
 * mo
 * Copyright(c) 2015 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Setup logger and attach to Koa instance.
 */

'use strick';

/**
 * @description Setup logger and attach to Koa instance
 * @public
 * @function
 * @requires lib/setConfig
 * @param {Object} app.config.logger - Logger config
 * @param {Array} app.config.logger.appenders - Logger appenders config
 * @param {Boolean} app.config.logger.appenders.console - To use console appender or not
 * @param {Object} app.config.logger.appenders.file - File appender config; to use file appender or not
 * @param {String} app.config.logger.appenders.file.filename - Log file name
 * @param {String} app.config.logger.appenders.file.maxLogSize - Log file max size
 * @param {String} app.config.logger.appenders.file.backups - Log file backup amount
 * @param {String} app.config.logger.appenders.mongodb - MongoDB connection string
 * @returns {Object} log4js logger instance
 * @example
 *
 *  var koa = require( 'koa' );
 *  var app = koa();
 *  setLogger( app );
 */
module.exports = function setLogger(app) {
  /**
   * Module dependencies
   */
  var log4js = require('log4js');
  var config = app.config.logger;

  var appenders = [];

  /**
   * @description Setup logger, log level and attach to Koa instance
   * @private
   * @function
   * @param {Object} app - Koa instance
   * @returns {Object} log4js logger instance
   */
  function finishSettingLogger(app) {
    var logger = log4js.getLogger();

    logger.setLevel(config.level);
    logger.info('Setting logger');

    return app.logger = logger;
  }

  if (!config) return finishSettingLogger(app);
  if (!config.appenders) return finishSettingLogger(app);

  if (config.appenders.console) {
    appenders.push({
      type: 'console'
    });
  }

  var fileConfigs = config.appenders.file;

  if (fileConfigs) {
    appenders.push({
      type: 'file',
      filename: 'log/' + fileConfigs.filename,
      maxLogSize: fileConfigs.maxLogSize,
      backups: fileConfigs.backups
    });
  }

  if (config.appenders.mongodb) {
    appenders.push({
      type: 'log4js-node-mongodb',
      connectionString: config.appenders.mongodb
    });
  }

  log4js.configure({
    appenders: appenders
  });

  return finishSettingLogger(app);
};
