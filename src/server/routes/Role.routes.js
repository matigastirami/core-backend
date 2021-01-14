
import RoleController from '../controllers/Role.controller';
import {Router} from 'express'
import validateToken from '../middlewares/decode_token'

var router = Router();

router.get('/role', validateToken, RoleController.listRoles);
router.patch('/role', validateToken, RoleController.getRoleInfo);
router.post('/role', validateToken, RoleController.createRole);
router.put('/role', validateToken, RoleController.updateRole);
router.delete('/role', validateToken, RoleController.deleteRole);

export default router;
