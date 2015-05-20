// load module config

// for each module in modules
//   check module dir existance, if exist
//     check model dir existance, if exist
//       read dir and get files ending with .js
//         if there are any models
//           for each model in models
//             require the model
//             // build model map

//         else throw an error with no model file found
//     else throw an error with model dir not found
//   else throw an error with mudule dir not found

/*!
 * mo
 * Copyright(c) 2015 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Build models.
 */

'use strick';

/**
 * @description
 * @private
 * @example
 *  var modelMap = {
 *    modules : [ 'general/user redis' ],
 *    warning : [ 'general/user.create has been overwritten by login-signup/create' ],
 *    data : {
 *      user : {
 *        identity : 'user',
 *        attributes : {
 *          name : {
 *            type     : 'string',
 *            required : true
 *          },
 *          email : {
 *            type     : 'email',
 *            required : true,
 *            unique   : true
 *          }
 *        }
 *      }
 *    }
 *  };
 */
var modelMap = {};

/**
 * @description
 * @public
 * @function
 * @requires lib/setConfig
 * @requires lib/setLogger
 * @param {Array} app.config.modules - List of modules to be loaded
 * @param {Object} app.logger - Logger instance
 * @param {Object} app.config.db - Database configuration
 * @example
 */
module.exports = function buildModels( app ){
  /**
   * Module dependencies
   */
  var fs     = require( 'fs' );
  var path   = require( 'path' );
  var logger = app.logger;

  logger.info( 'Building models' );

  var moduleNames = app.config.modules;
  if( moduleNames && moduleNames.length ){
    moduleNames.forEach( function ( moduleName ){
      var modelDirPath = path.resolve( app.config.dir.modules, moduleName, 'models' );
      try{
        var modelNames = fs.readdirSync( modelDirPath );
        if( modelNames && modelNames.length ){
          modelNames.forEach( function ( modelName ){
            if( /\.js$/.test( modelName )){
              var key = modelName.replace( '.js', '' );
              var modelPath = path.resolve( modelDirPath, modelName );
              var tmp = require( modelPath );
              // TODO: merge and show warning
              modelMap[ key ] = tmp;
            }
          })
        }
      }catch( error ){
        logger.error( 'Path not found when loading models.\nPath: ' + modelDirPath );
        process.exit( 1 );
      }
    });
  }else{
    logger.warn( 'No modules found when loading models' );
  }



  /**
   * @description
   * @public
   * @function
   */
  app.connectDatabases = function connectDatabases( callback ){
    var dbs = app.config.db;

    if( !dbs || !dbs.length ){
      logger.info( 'No database configuration found in `config/' + app.env + '`' );
      process.exit( 1 );
    }

    // connect all db
    dbs.forEach( function (){

    });

    orm.initialize( ormConfig, function ormInitializedCallback( err, models ){
      if( err ){
        logger.error( 'Having trouble connecting database', '\n', err );
        throw err;
      }

      // Attach models to `mo` instance
      app.models = models;

      logger.info( 'Database connected' );

      callback();
    });
  };
};
