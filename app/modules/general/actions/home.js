module.exports = function homeActions(app) {
  app.get('/',
    function* validateRoot(next) {
      var session = this.session;
      session.count = session.count || 0;
      session.count++;
      this.body = session.count;

      yield next;
    },
    function* root(next) {
      // yield next;
      this.body = this.session.count;
    }
  );

  app.get('/remove', function* remove(next) {
    this.session = null;
    this.body = this.session;
  });

  app.post('/', function* postRoot() {
    this.body = this.request.body;
  });
};
