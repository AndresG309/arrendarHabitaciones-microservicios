import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller.js";
import { verifyToken, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/auth/login', UsuarioController.login);

//Demas rutas Crude
router.get('/', verifyToken, authorizeRoles('administrador'), UsuarioController.getAll);
router.post('/', verifyToken, authorizeRoles('administrador'), UsuarioController.createUser);
router.get('/:id', verifyToken, UsuarioController.getUserById);
router.put('/:id', verifyToken, authorizeRoles('administrador'), UsuarioController.updateUser);
router.delete('/:id', verifyToken, authorizeRoles('administrador'), UsuarioController.deleteUser);

export default router;
