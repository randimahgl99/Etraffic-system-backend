import { Request, Response } from "express";
import { PoliceOfficerService } from "../Services/policeOfficerServices";



const policeOfficerServices = new  PoliceOfficerService();

export class PoliceOfficerController {
    async registerPoliceOfficerUser(req: Request, res: Response): Promise<void> {
        try {
            const { name, contactInfo, password, station, badgeNumber} = req.body;

            const newUser = await policeOfficerServices.registerPoliceOfficerUser(name, contactInfo, password, station, badgeNumber);

            res.status(201).json({
                success: true,
                message: "Police User registered successfully",
                user: { name: newUser.name,  contactInfo: newUser.contactInfo, station: newUser.station, badgeNumber: newUser._id,},
            });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async getAllPoliceOfficerUser(req: Request, res: Response): Promise<void> {
        try {

            const newUser = await policeOfficerServices.getAllPoliceOfficers()

            res.status(201).json({
                success: true,
                message: "Police User registered successfully",
                user: { newUser },
            });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async deletePoliceOfficerUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
    
            const result = await policeOfficerServices.deletePoliceOfficerUser(id);
    
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    
    async editPoliceOfficerUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updates = req.body;
            const updatedUser = await policeOfficerServices.editPoliceOfficerUser(id, updates);
            res.status(200).json(updatedUser);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { badgeNumber, password } = req.body;

            const response = await policeOfficerServices.loginPoliceOfficer(badgeNumber, password);

            res.status(200).json({
                success: true,
                message: "Login successful",
                user: {
                    id: response.userId,
                    name: response.name,
                    contactInfo: response.contactInfo,
                    station: response.station,
                    badgeNumber: response.badgeNumber,
                    userType: response.userType,
                    token: response.token
                }
            });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    
    
}
