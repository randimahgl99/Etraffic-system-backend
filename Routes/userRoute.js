"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const civilUserController_1 = require("../Controllers/civilUserController");
const router = (0, express_1.Router)();
const civilUserController = new civilUserController_1.CivilUserController();
router.post("/auth/register", (req, res) => civilUserController.register(req, res));
router.post("/auth/login", (req, res) => civilUserController.login(req, res));
router.delete("/:id", (req, res) => civilUserController.deleteUser(req, res));
router.put("/:id", (req, res) => civilUserController.editUser(req, res));
exports.default = router;
