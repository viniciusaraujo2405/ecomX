"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controller_1 = require("../controllers/usuario_controller");
const auth_middleware_1 = require("../middlewares/auth_middleware");
const router = (0, express_1.Router)();
const controller = new usuario_controller_1.UsuarioController();
//router.post('/', controller.create); // Cadastro público
router.get('/', auth_middleware_1.authenticateJWT, controller.findAll); //admin 
router.get('/me', auth_middleware_1.authenticateJWT, controller.getMyProfile);
router.put('/me', auth_middleware_1.authenticateJWT, async (req, res, next) => {
    try {
        await controller.update(req, res);
    }
    catch (err) {
        next(err);
    }
});
router.delete('/me', auth_middleware_1.authenticateJWT, async (req, res, next) => {
    try {
        await controller.delete(req, res);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
