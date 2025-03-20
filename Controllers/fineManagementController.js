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
exports.getAllFines = exports.editFine = exports.deleteFine = exports.addFine = void 0;
const FineManagement_1 = __importDefault(require("../Model/FineManagement")); // Adjust path if needed
// Add a new fine
const addFine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { offence, nature, type, fine, fineNumber } = req.body;
        if (!offence || !nature || !type || !fine || !fineNumber) {
            res.status(400).json({ message: "All fields are required" });
        }
        const newFine = new FineManagement_1.default({ offence, nature, type, fine, fineNumber });
        yield newFine.save();
        res.status(201).json({ message: "Fine added successfully", data: newFine });
    }
    catch (error) {
        res.status(400).json({ message: "server error" });
    }
});
exports.addFine = addFine;
// Delete a fine by ID
const deleteFine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const fine = yield FineManagement_1.default.findByIdAndDelete(id);
        if (!fine) {
            res.status(404).json({ message: "Fine not found" });
        }
        res.status(200).json({ message: "Fine deleted successfully", data: fine });
    }
    catch (error) {
        res.status(400).json({ message: "server error" });
    }
});
exports.deleteFine = deleteFine;
// Edit/update a fine by ID
const editFine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updates = req.body;
        const fine = yield FineManagement_1.default.findByIdAndUpdate(id, updates, { new: true });
        if (!fine) {
            res.status(404).json({ message: "Fine not found" });
        }
        res.status(200).json({ message: "Fine updated successfully", data: fine });
    }
    catch (error) {
        res.status(400).json({ message: "server error" });
    }
});
exports.editFine = editFine;
// Get all fines
const getAllFines = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fines = yield FineManagement_1.default.find();
        res.status(200).json({ message: "Fines retrieved successfully", data: fines });
    }
    catch (error) {
        res.status(400).json({ message: "server error" });
    }
});
exports.getAllFines = getAllFines;
