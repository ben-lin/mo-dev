module.exports = function buildGeneralAssociations(app) {
  var User = app.models.User;
  var Project = app.models.Project;

  User.hasMany(Project);
  Project.belongsTo(User, {
    as: 'Owner'
  });
};
