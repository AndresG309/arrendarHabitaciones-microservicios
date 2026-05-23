import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller.js"; 

const router = Router();

router.get('/', UsuarioController.getAll);
router.get('/:id', UsuarioController.getUserById);
router.post('/', UsuarioController.createUser);
router.put('/:id', UsuarioController.updateUser);
router.delete('/:id', UsuarioController.deleteUser);

//Autenticacion usuario
router.post('/auth/login', findByUsername);

export default router;

