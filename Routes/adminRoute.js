"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const civilUserController_1 = require("../Controllers/civilUserController");
const router = (0, express_1.Router)();
const civilUserController = new civilUserController_1.CivilUserController();
router.post("/auth/adminRegister", (req, res) => civilUserController.adminRegister(req, res));
router.put("/auth/admin/:id", (req, res) => civilUserController.editAdmin(req, res));
exports.default = router;
