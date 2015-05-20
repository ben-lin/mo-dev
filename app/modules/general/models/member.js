module.exports = function buildMemberModel( app ){
  var mongoose = app.mongoose;
  var Schema   = mongoose.Schema;
  var ObjectId = Schema.ObjectId;

  return {
    adapter : 'mongoose',
    fields : {
      // teamId + userId
      uid         : { type: ObjectId, required: true, ref: 'User' },
      teamId      : { type: ObjectId, required: true, ref: 'Team' },
      userId      : { type: ObjectId, required: true, ref: 'User' },
      // shortname + teamId
      shortnameUid: { type: String, required: true, unique: true },
      isJoined    : { type: Boolean, default: false },
      shortname   : { type: String, required: true },
      shortnameUat: { type: Number, default: Date.now },
      role        : { type: String, default: 'viewer' }, // admin|normal|viewer
      roleUat     : { type: Number, default: Date.now },
      createdAt   : { type: Number, default: Date.now },
      updatedAt   : { type: Number, default: Date.now }
    },

    opts : {
      virtual: {
        get: { propName: function ( val ){}},
        set: {}
      },

      validate: {
        propName: function ( val ){}
      },

      hooks: {
        pre: {
          init: [],
          validate: [],
          save: [],
          remove: []
        },

        post: {
          init: [],
          validate: [],
          save: [],
          remove: []
        }
      },

      // classMethods
      statics : {},

      // instanceMethods
      methods: {}
    }
  };
};
