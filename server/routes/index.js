const router = require('express').Router();
const { homeController, postController } = require('../controllers');
const signupController = require('../controllers/validation');
const ensureAuthenticated = require('../utils/ensureAuthenticated');
const logoutUser = require('../controllers/validation/logoutController');
const page = require('../controllers/pagesController');
const loginController = require('../controllers/validation/loginController');
const deletePostController = require('../controllers/deletePostController');
const {
  getPostController,
  editPostController,
} = require('../controllers/getPostController');

router.get('/login', page.loginPage);
router.get('/signup', page.signupPage);
router.get('/', ensureAuthenticated, page.homePage);
router.get('/post', ensureAuthenticated, page.createPostPage);
router.get('/edit/post/:post', ensureAuthenticated, page.editPostPage);

router.post('/api/v1/login', loginController);
router.post('/api/v1/signup', signupController);
router.post('/api/v1/user/logout', logoutUser);
router.get('/api/v1/posts', homeController); // test
router.get('/api/v1/posts/:post', getPostController); // test
router.post('/api/v1/user/post', postController);
router.delete('/api/v1/delete/:post', deletePostController);
router.post('/api/v1/edit/post/:post', getPostController);
router.put('/api/v1/edit/post/:post', editPostController);

router.use(page.notFoundPage);

module.exports = router;
