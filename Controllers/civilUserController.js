"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CivilUserController = void 0;
const civilUserServices_1 = require("../Services/civilUserServices");
const civilUserService = new civilUserServices_1.CivilUserService();
class CivilUserController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const newUser = yield civilUserService.registerUser(name, email, password);
                res.status(201).json({
                    success: true,
                    message: "User registered successfully",
                    user: { id: newUser._id, name: newUser.name, email: newUser.email },
                });
            }
            catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const response = yield civilUserService.loginUser(email, password);
                res.status(200).json({
                    success: true,
                    message: "Login successful",
                    response,
                });
            }
            catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
        });
    }
    adminRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, idNumber } = req.body;
                const newUser = yield civilUserService.registerAdminUser(name, email, password, idNumber);
                res.status(201).json({
                    success: true,
                    message: "User registered successfully",
                    user: { id: newUser._id, name: newUser.name, email: newUser.email, idNumber: newUser.idNumber, },
                });
            }
            catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield civilUserService.deleteUser(id);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
        });
    }
    editUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updates = req.body;
                const updatedUser = yield civilUserService.editUser(id, updates);
                res.status(200).json(updatedUser);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    editAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const updates = req.body;
                const updatedAdmin = yield civilUserService.editAdmin(userId, updates);
                res.status(200).json(updatedAdmin);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.CivilUserController = CivilUserController;
