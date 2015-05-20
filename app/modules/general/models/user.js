module.exports = function buildUserModel( app ){
  var sequelize = app.sequelize;

  return {
    adapter : 'sequelize',
    fields : {
      name : {
        type     : sequelize.STRING,
        validate : {
          len     : [ 2, 100 ],
          notEmpty: true, // we can set error msg here. e.g. notEmpty : '05'
          notNull : true
        }
      },
      email : {
        type     : sequelize.STRING,
        unique   : true,
        validate : {
          isEmail: true,
          notEmpty: true,
          notNull : true
        }
      }
    },

    opts : {
      tableName : 'users',
      getterMethods : {
        fullName : function(){}
      },
      setterMethods : {},
      validate : {},
      classMethods : {},
      instanceMethods : {},
      hooks : {}
    }
  };
};
