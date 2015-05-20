'use strick';

module.exports = function mapActions(app) {
  var logger = app.logger;
  logger.info('Mapping actions');

  var methods = [
    'HEAD',
    'OPTIONS',
    'GET',
    'PUT',
    'PATCH',
    'POST',
    'DELETE'
  ];
};
