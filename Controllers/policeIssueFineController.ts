import { Request, Response } from "express";
import policeIssueFine from "../Model/policeIssueFine";
import {policeIssueFineServices} from "../Services/policeIssueFineServices";

const PoliceIssueFineServices = new policeIssueFineServices();

export const addpoliceIssueFine = async (req: Request, res: Response): Promise<void> => {
    try {
        const { civilUserName, civilNIC, type, issueLocation, vehicalNumber, date, time, isPaid, policeId, fineManagementId } = req.body;

        // if (!civilUserName || !civilNIC || !type || !issueLocation || !vehicalNumber || !date ||!time ||!isPaid ||!policeId) {
        //     res.status(400).json({ message: "All fields are required" });
        // }

        console.log(req.body)

        const newFine = new policeIssueFine({ civilUserName, civilNIC, type, issueLocation, vehicalNumber, date, time, isPaid: false, policeId, fineManagementId });
        await newFine.save();

        res.status(201).json({ message: "Fine issued successfully", data: newFine });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "server error" });
    }
};

export const getFinesByUserNIC = async (_req: Request, res: Response): Promise<void> => {
    try {
        const id: string = _req.params.id;
        const issueFines = await PoliceIssueFineServices.getFinesByUserNIC(id);

        res.status(200).json({ message: "Fines retrieved successfully", data: issueFines });
    } catch (error) {
        res.status(400).json({ message: "server error" });
    }

};

export const getFinesById = async (_req: Request, res: Response): Promise<void> => {
    try {
        const id: string = _req.params.id;
        const issueFines = await PoliceIssueFineServices.getFinesById(id);

        res.status(200).json({ message: "Fines retrieved successfully", data: issueFines });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "server error" });
    }

};

export const getAllPoliceIssueFines = async (_req: Request, res: Response): Promise<void> => {
    try {
        const fines = await policeIssueFine.find();

        res.status(200).json({ message: "Fines retrieved successfully", data: fines });
    } catch (error) {
        res.status(400).json({ message: "server error" });
    }
};

export const getPoliceById = async (_req: Request, res: Response): Promise<void> => {
    try {
        const id: string = _req.params.id;
        const issueFines = await PoliceIssueFineServices.getPoliceById(id);

        res.status(200).json({ message: "Fines retrieved successfully", data: issueFines });
    } catch (error) {
        res.status(400).json({ message: "server error" });
    }

};