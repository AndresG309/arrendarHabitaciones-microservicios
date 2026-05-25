import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = Router();

router.get('/:id', UsuarioController.getUserById);
// Verificar token (cualquier usuario logueado - para otros microservicios)
router.get('/auth/verify-token', verifyToken, UsuarioController.verifyToken);

export default router;
