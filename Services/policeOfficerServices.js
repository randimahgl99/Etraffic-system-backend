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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoliceOfficerService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const PliceOfficer_1 = __importDefault(require("../Model/PliceOfficer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class PoliceOfficerService {
    registerPoliceOfficerUser(name, contactInfo, password, station, badgeNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const newUser = new PliceOfficer_1.default({
                name,
                password: hashedPassword,
                contactInfo,
                station,
                badgeNumber
            });
            return yield newUser.save();
        });
    }
    deletePoliceOfficerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield PliceOfficer_1.default.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }
            yield user.deleteOne();
            return { success: true, message: "User deleted successfully" };
        });
    }
    editPoliceOfficerUser(userId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield PliceOfficer_1.default.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }
            const updateData = {};
            if (updates.station) {
                updates.station;
            }
            if (updates.contactInfo) {
                updates.contactInfo;
            }
            if (updates.password) {
                updates.password = yield bcryptjs_1.default.hash(updates.password, 10);
            }
            Object.assign(user, updates);
            yield user.save();
            return user;
        });
    }
    getAllPoliceOfficers() {
        return __awaiter(this, void 0, void 0, function* () {
            const officers = yield PliceOfficer_1.default.find();
            if (!officers) {
                throw new Error("There are no Police officers by that ID");
            }
            return officers;
        });
    }
    loginPoliceOfficer(badgeNumber, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield PliceOfficer_1.default.findOne({ badgeNumber }).lean();
            if (!user) {
                throw new Error("User not found");
            }
            const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error("Invalid credentials");
            }
            const token = jsonwebtoken_1.default.sign({ id: user._id.toString(), email: user.badgeNumber }, process.env.JWT_SECRET || "default_secret", {
                expiresIn: "1h",
            });
            const response = {
                token,
                userType: "PoliceOfficer",
                userId: user._id.toString()
            };
            return response;
        });
    }
}
exports.PoliceOfficerService = PoliceOfficerService;
