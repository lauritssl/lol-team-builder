/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'get /': {
    controller: 'HomeController',
    action: 'index'
  },


  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/
// Custom routes here...

  'get /login': 'AuthController.login',
  'get /logout': 'AuthController.logout',
  'get /register': 'AuthController.register',
  'post /auth/local': 'AuthController.callback',
  'post /auth/local/:action': 'AuthController.callback',

    /**
     * User routes
     */
    'get /api/user': 'UserController.getAll',
    'get /api/user/:id': 'UserController.getOne',
    'post /api/user': 'UserController.create',

  /**
     * Message routes
     *
     */
    'get /api/message': 'MessageController.getAll',
    'get /api/message/:id': 'MessageController.getOne',
    'post /api/message': 'MessageController.create',
    'delete /api/message/:id': 'MessageController.destroy',

    /**
     * Game routes
     *
     */
    'get /api/game': 'GameController.getAll',
    'get /api/game/:id': 'GameController.getOne',
    'post /api/game': 'GameController.create',

    'delete /api/game/:id': 'GameController.destroy',
    'post /api/game/:id/user' : 'GameController.addUser',
    'delete /api/game/:id/user' : 'GameController.destroyUser',
    'post /api/game/:id/spot' : 'GameController.addUser',
    'delete /api/game/:id/spot' : 'GameController.destroyUser',

    'post /api/game/:id/spot' : 'GameController.addSpot',
    'delete /api/game/:id/spot' : 'GameController.destroySpot',

     //Actions
    'put /api/game/:id/actions/start': 'GameController.startGame',
    'put /api/game/:id/actions/end': 'GameController.endGame',
    'put /api/game/:id/actions/rollBuild' : 'GameController.rollBuild',
    'put /api/game/:id/actions/draw' : 'GameController.drawCard',
    'put /api/game/:id/actions/accept' : 'GameController.acceptBuild',
    'put /api/game/:id/actions/denied' : 'GameController.denyBuild',

    'post /api/game/:id/actions/rollBuilds' : 'GameController.rollBuilds',
    'put /api/game/:id/actions/removeUserFromSpot' : 'GameController.removeUserFromSpot',
    'put /api/game/:id/actions/addUserToSpot' : 'GameController.addUserToSpot',
    'delete /api/game/:id/actions/resetBuilds' : 'GameController.resetBuilds',


  
   // If a request to a URL doesn't match any of the custom routes above, it is matched
  // against Sails route blueprints.  See `config/blueprints.js` for configuration options
  // and examples.
  'get /home': 'HomeController.index',
  'get /about': 'HomeController.index',
  'get /messages': 'HomeController.index',
  'get /games': 'HomeController.index',
  'get /games/:id': 'HomeController.index',
  'get /games/:id/join': 'HomeController.index',
  'get /new/game': 'HomeController.index'
};
