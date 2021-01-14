
import AppController from '../controllers/App.controller';
import {Router} from 'express'
import validateToken from '../middlewares/decode_token'

var router = Router();

router.get('/app', validateToken, AppController.listApps);
router.patch('/app', validateToken, AppController.getAppInfo);
router.post('/app', validateToken, AppController.createApp);
router.put('/app', validateToken, AppController.updateApp);
router.delete('/app', validateToken, AppController.deleteApp);

export default router;