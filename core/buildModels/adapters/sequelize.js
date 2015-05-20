'use strick';

module.exports = function sequelizeAdapter(app) {
  /**
   * Module dependencies
   */
  var Sequelize = require('sequelize');
  var logger = app.logger;
  var config = app.config.db.sequelize;
  var configPath = app.config.configPath;

  if (!config) {
    logger.error('Sequelize configuration missing in ' + configPath);
    process.exit(1);
  }

  return {

    buildModel: function buildModel() {

    },

    buildAssociation: function buildAssociation() {

    },

    connectDb: function connectDb() {
      var database = config.database || 'mo';
      var password = config.password || null;

      if (!config.username) {
        logger.error('Missing username in sequelize configuration in ' + configPath);
        process.exit(1);
      }

      var sequelize = new Sequelize(config.database, config.username, password, config.options);
      app.sequelize = sequelize;
    }
  };
};
