const UserController = require('../controller/userController');
const LinkController = require('../controller/linkController');
const middleware = require('../middleware/jwtAuth');

module.exports = (app) => {
    //Register new User
    app.post('/register', UserController.createUser);

    //Login User
    app.get('/login', UserController.loginUser);

    //Link Routes
    app.post('/link',middleware.validateJWT,LinkController.createLink);
    app.put('/link/:link_title',middleware.validateJWT,LinkController.editLink);
    app.delete('/link/:link_title',middleware.validateJWT,LinkController.deleteLink);
    app.get('/link',middleware.validateJWT,LinkController.getAllLink);
    app.get('/link/:link_title',middleware.validateJWT,LinkController.clickLink);
}