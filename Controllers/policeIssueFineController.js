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
exports.getPoliceById = exports.getAllPoliceIssueFines = exports.getFinesByUserNIC = exports.addpoliceIssueFine = void 0;
const policeIssueFine_1 = __importDefault(require("../Model/policeIssueFine"));
const policeIssueFineServices_1 = require("../Services/policeIssueFineServices");
const PoliceIssueFineServices = new policeIssueFineServices_1.policeIssueFineServices();
const addpoliceIssueFine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { civilUserName, civilNIC, type, issueLocation, vehicalNumber, date, time, isPaid, policeId } = req.body;
        // if (!civilUserName || !civilNIC || !type || !issueLocation || !vehicalNumber || !date ||!time ||!isPaid ||!policeId) {
        //     res.status(400).json({ message: "All fields are required" });
        // }
        const newFine = new policeIssueFine_1.default({ civilUserName, civilNIC, type, issueLocation, vehicalNumber, date, time, isPaid: false, policeId });
        yield newFine.save();
        res.status(201).json({ message: "Fine issued successfully", data: newFine });
    }
    catch (error) {
        res.status(400).json({ message: "server error" });
    }
});
exports.addpoliceIssueFine = addpoliceIssueFine;
const getFinesByUserNIC = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = _req.params.id;
        const issueFines = yield PoliceIssueFineServices.getFinesByUserNIC(id);
        res.status(200).json({ message: "Fines retrieved successfully", data: issueFines });
    }
    catch (error) {
        res.status(400).json({ message: "server error" });
    }
});
exports.getFinesByUserNIC = getFinesByUserNIC;
const getAllPoliceIssueFines = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fines = yield policeIssueFine_1.default.find();
        res.status(200).json({ message: "Fines retrieved successfully", data: fines });
    }
    catch (error) {
        res.status(400).json({ message: "server error" });
    }
});
exports.getAllPoliceIssueFines = getAllPoliceIssueFines;
const getPoliceById = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = _req.params.id;
        const issueFines = yield PoliceIssueFineServices.getPoliceById(id);
        res.status(200).json({ message: "Fines retrieved successfully", data: issueFines });
    }
    catch (error) {
        res.status(400).json({ message: "server error" });
    }
});
exports.getPoliceById = getPoliceById;
