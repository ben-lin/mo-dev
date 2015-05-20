'use strick';

module.exports = function connectMongoose(app, callback) {
  var config = app.config.database.mongoose;

  if (!config.database) {
    throw new Error('Database not specified');
  }

  if (/[\s\<\>!@#\$%^&\*,\.]+/g.test(config.database)) {
    throw new Error('Database name contains illegal characters');
  }

  var url = 'mongodb://';

  if (config.username && config.username.length > 0) {
    url += config.username + ':' + config.password + '@';
  }

  url += (config.host || 'localhost') + ':' + (config.port || 27017);
  url += '/' + config.db;

  var db = mongoose.createConnection(url);

  db.on('error', function (err) {
    LOG.error(500, '[model][mongoose] error', err);
  });

  db.on('open', function () {
    UTILS.connection(mongoose);
    LOG.sys('Database connected at: ' + url);
    callback(db);
  });

  db.on('close', function () {
    LOG.sys('Database connection closed');
  });
};
