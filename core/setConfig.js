/*!
 * mo
 * Copyright(c) 2015 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Setup config and attach to Koa instance.
 */

'use strick';

/**
 * @description Setup config and attach to Koa instance
 * @public
 * @function
 * @param {Object} app - Koa instance
 * @example
 *
 *  var koa = require( 'koa' );
 *  var app = koa();
 *  setConfig( app );
 */
module.exports = function setConfig(app) {
  /**
   * Module dependencies
   */
  var fs = require('fs');
  var path = require('path');
  var yaml = require('js-yaml');

  var cwd = process.cwd();
  var configDir = path.resolve(cwd, 'config');
  var configPath = path.resolve(configDir, app.env + '.yml');
  var config = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));

  var deaultConfig = {
    configPath: configPath,
    appname: 'mo-project',
    server: {
      host: '0.0.0.0',
      port: 3000,
      timezone: 'UTC'
    },
    logger: {
      appenders: {
        file: {
          filename: 'mo.log',
          maxLogSize: 10 * 1024 * 1024,
          backups: 10
        },
        mongodb: 'localhost:27017/logs'
      },
      verbose: true,
      level: 'info'
    }
  };

  config.appname = config.appname || deaultConfig.appname;
  config.server.host = config.server.host || deaultConfig.server.host;
  config.server.port = process.env.PORT || config.server.port || deaultConfig.server.port;
  config.server.timezone = config.server.timezone || deaultConfig.server.timezone;

  if (config.logger && config.logger.appenders) {
    config.logger.verbose = config.logger.verbose || deaultConfig.logger.verbose;
    config.logger.level = config.logger.level || deaultConfig.logger.level;

    var fileConfig = config.logger.appenders.file;

    if (fileConfig) {
      fileConfig.filename = fileConfig.filename || deaultConfig.logger.appenders.file.filename;
      fileConfig.maxLogSize = fileConfig.maxLogSize || deaultConfig.logger.appenders.file.maxLogSize;
      fileConfig.backups = fileConfig.backups || deaultConfig.logger.appenders.file.backups;
    }

    if (config.logger.appenders.mongodb) {
      config.logger.appenders.mongodb = deaultConfig.logger.appenders.mongodb;
    }
  }

  config.dir = {
    config: configDir,
    libraries: path.resolve(cwd, 'app/libraries'),
    logs: path.resolve(cwd, 'log'),
    middlewares: path.resolve(cwd, 'app/middlewares'),
    modules: path.resolve(cwd, 'app/modules'),
    public: path.resolve(cwd, 'public'),
    tmp: path.resolve(cwd, 'tmp')
  };

  process.env.TZ = config.server.timezone;

  app.name = config.appname;
  app.keys = [config.cookie];

  return app.config = config;
};
