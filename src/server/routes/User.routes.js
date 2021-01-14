
import UserController from '../controllers/User.controller';
import {Router} from 'express'
import validateToken from '../middlewares/decode_token'

var router = Router();

router.get('/user', validateToken, UserController.listUsers);
router.get('/myprofile', validateToken, UserController.getMyProfileInfo);
router.patch('/user', validateToken, UserController.getUserInfo);
router.post('/user', UserController.createUser);
router.put('/user', validateToken, UserController.updateUser);
router.delete('/user', validateToken, UserController.deleteUser);
router.post('/signin', UserController.getLoginToken);
router.post('/changepassword', validateToken, UserController.changePassword);

export default router;