"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.routes.ts
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth_controller");
const router = (0, express_1.Router)();
const controller = new auth_controller_1.AuthController();
router.post('/login', (req, res) => {
    controller.login(req, res);
});
exports.default = router;
