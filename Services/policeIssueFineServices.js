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
exports.policeIssueFineServices = void 0;
const policeIssueFine_1 = __importDefault(require("../Model/policeIssueFine"));
class policeIssueFineServices {
    addPoliceIssueFine(civilUserName, civilNIC, issueLocation, vehicalNumber, date, time, isPaid, type, policeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newIssuFine = new policeIssueFine_1.default({
                civilUserName,
                civilNIC,
                issueLocation,
                vehicalNumber,
                date,
                time,
                isPaid,
                type,
                policeId,
            });
            return yield newIssuFine.save();
        });
    }
    getAllPoliceIssueFines() {
        return __awaiter(this, void 0, void 0, function* () {
            const issueFines = yield policeIssueFine_1.default.find();
            if (!issueFines) {
                throw new Error("There are no Issue fine by that ID");
            }
            return issueFines;
        });
    }
    getFinesByUserNIC(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const issueFines = yield policeIssueFine_1.default.findOne({ civilNIC: id });
            if (!issueFines) {
                throw new Error("There are no Issue fine by that ID");
            }
            return issueFines;
        });
    }
    getPoliceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const policeOfficer = yield policeIssueFine_1.default.find({ policeId: id });
            if (!policeOfficer) {
                throw new Error("There are no Police Officer by that ID");
            }
            return policeOfficer;
        });
    }
}
exports.policeIssueFineServices = policeIssueFineServices;
