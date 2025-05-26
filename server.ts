import express, { Application } from "express";
import dotenv from "dotenv";
import connect from "./connection";
import userRoute from "./Routes/userRoute";
import policeIssueFineRoute from "./Routes/policeIssueFineRoute";
import cors from 'cors';
import policeOfficerRoute from "./Routes/policeOfficerRoute";
import fineManagemetRoute from "./Routes/fineManagementRoute";
import adminRoute from "./Routes/adminRoute";



dotenv.config();

const app: Application = express();
const PORT = 5000;
app.use(cors());

app.use(express.json());
app.use("/users", userRoute);
app.use("/admin", adminRoute);
app.use("/policeIssueFine", policeIssueFineRoute);
app.use("/policeOfficers", policeOfficerRoute);
app.use("/fine", fineManagemetRoute);

const startServer = async () => {
    try {
        await connect();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
};

startServer();


