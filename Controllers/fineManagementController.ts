import { Request, Response } from "express";
import FineManagement from "../Model/FineManagement"; // Adjust path if needed

// Add a new fine
export const addFine = async (req: Request, res: Response): Promise<void> => {
    try {
        const { offence, nature, type, fine, fineNumber } = req.body;

        if (!offence || !nature || !type || !fine || !fineNumber) {
            res.status(400).json({ message: "All fields are required" });
        }

        const newFine = new FineManagement({ offence, nature, type, fine, fineNumber });
        await newFine.save();

        res.status(201).json({ message: "Fine added successfully", data: newFine });
    } catch (error) {
        res.status(400).json({ message: "server error" });
    }
};

// Delete a fine by ID
export const deleteFine = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const fine = await FineManagement.findByIdAndDelete(id);

        if (!fine) {
            res.status(404).json({ message: "Fine not found" });
        }

        res.status(200).json({ message: "Fine deleted successfully", data: fine });
    } catch (error) {
        res.status(400).json({ message: "server error" });
    }
};

// Edit/update a fine by ID
export const editFine = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const fine = await FineManagement.findByIdAndUpdate(id, updates, { new: true });

        if (!fine) {
            res.status(404).json({ message: "Fine not found" });
        }

        res.status(200).json({ message: "Fine updated successfully", data: fine });
    } catch (error) {
        res.status(400).json({ message: "server error" });
    }
};

// Get all fines
export const getAllFines = async (_req: Request, res: Response): Promise<void> => {
    try {
        const fines = await FineManagement.find();

        res.status(200).json({ message: "Fines retrieved successfully", data: fines });
    } catch (error) {
        res.status(400).json({ message: "server error" });
    }
};

export const getFineById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const fine = await FineManagement.findById(id);
        if (!fine) {
            res.status(404).json({ 
                success: false,
                message: "Fine not found" 
            });
            return;
        }

        res.status(200).json({ 
            success: true,
            message: "Fine retrieved successfully", 
            data: fine 
        });
    } catch (error:any) {
        console.error("Error fetching fine:", error);
        res.status(500).json({ 
            success: false,
            message: "Server error",
            error: error.message 
        });
    }
};