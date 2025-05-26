import { Request, Response } from "express";
import { CivilUserService } from "../Services/civilUserServices";



const civilUserService = new CivilUserService();

export class CivilUserController {
    async register(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password, isAdmin, idNumber } = req.body;

            const newUser = await civilUserService.registerUser(name, email, password, idNumber, isAdmin);

            res.status(201).json({
                success: true,
                message: "User registered successfully",
                user: { 
                    id: newUser._id, 
                    name: newUser.name, 
                    email: newUser.email, 
                    isAdmin: newUser.isAdmin,
                    idNumber: newUser.idNumber
                },
            });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            const response = await civilUserService.loginUser(email, password);

            res.status(200).json({
                success: true,
                message: "Login successful",
                user: {
                    id: response.userId,
                    name: response.name,
                    email: response.email,
                    isAdmin: response.isAdmin,
                    nicNo: response.nicNo,
                    token: response.token
                }
            });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async adminRegister(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password, idNumber } = req.body;

            if (!idNumber) {
                throw new Error("ID Number is required for admin registration");
            }

            const newUser = await civilUserService.registerAdminUser(name, email, password, idNumber);

            res.status(201).json({
                success: true,
                message: "Admin registered successfully",
                user: { 
                    id: newUser._id, 
                    name: newUser.name, 
                    email: newUser.email, 
                    idNumber: newUser.idNumber,
                    isAdmin: newUser.isAdmin 
                },
            });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
    
            const result = await civilUserService.deleteUser(id);
    
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    
    async editUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updates = req.body;
            const updatedUser = await civilUserService.editUser(id, updates);
            res.status(200).json(updatedUser);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async editAdmin(req: any, res: any): Promise<void> {
        try {
            const userId = req.params.id;
            const updates = req.body;
    
            const updatedAdmin = await civilUserService.editAdmin(userId, updates);
            res.status(200).json(updatedAdmin);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async payFine(req: any, res: any): Promise<void> {
        try {
            const fineId = req.body;
            const paidFine = await civilUserService.payFine(fineId);
            res.status(200).json(paidFine);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async payFineStatus(req: any, res: any): Promise<void> {
        try {
            const sessionId = req.body;
            const transactionId = req.body;
            const paidFineStatus = await civilUserService.payFineStatus( sessionId, transactionId);
            res.status(200).json(paidFineStatus);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const isAdmin = req.query.isAdmin === 'true' ? true : 
                          req.query.isAdmin === 'false' ? false : 
                          undefined;
            
            const users = await civilUserService.getAllUsers(isAdmin);
            
            res.status(200).json({
                success: true,
                data: users
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}
