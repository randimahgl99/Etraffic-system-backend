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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connection_1 = __importDefault(require("./connection"));
const userRoute_1 = __importDefault(require("./Routes/userRoute"));
const policeIssueFineRoute_1 = __importDefault(require("./Routes/policeIssueFineRoute"));
const cors_1 = __importDefault(require("cors"));
const policeOfficerRoute_1 = __importDefault(require("./Routes/policeOfficerRoute"));
const fineManagementRoute_1 = __importDefault(require("./Routes/fineManagementRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/users", userRoute_1.default);
app.use("/policeIssueFine", policeIssueFineRoute_1.default);
app.use("/policeOfficers", policeOfficerRoute_1.default);
app.use("/fine", fineManagementRoute_1.default);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connection_1.default)();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Error starting server:", error);
    }
});
startServer();
