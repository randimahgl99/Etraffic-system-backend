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
exports.PoliceOfficerController = void 0;
const policeOfficerServices_1 = require("../Services/policeOfficerServices");
const policeOfficerServices = new policeOfficerServices_1.PoliceOfficerService();
class PoliceOfficerController {
    registerPoliceOfficerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, contactInfo, password, station, badgeNumber } = req.body;
                const newUser = yield policeOfficerServices.registerPoliceOfficerUser(name, contactInfo, password, station, badgeNumber);
                res.status(201).json({
                    success: true,
                    message: "Police User registered successfully",
                    user: { name: newUser.name, contactInfo: newUser.contactInfo, station: newUser.station, badgeNumber: newUser._id, },
                });
            }
            catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
        });
    }
    getAllPoliceOfficerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield policeOfficerServices.getAllPoliceOfficers();
                res.status(201).json({
                    success: true,
                    message: "Police User registered successfully",
                    user: { newUser },
                });
            }
            catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
        });
    }
    deletePoliceOfficerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield policeOfficerServices.deletePoliceOfficerUser(id);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
        });
    }
    editPoliceOfficerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updates = req.body;
                const updatedUser = yield policeOfficerServices.editPoliceOfficerUser(id, updates);
                res.status(200).json(updatedUser);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { badgeNumber, password } = req.body;
                const response = yield policeOfficerServices.loginPoliceOfficer(badgeNumber, password);
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
}
exports.PoliceOfficerController = PoliceOfficerController;
