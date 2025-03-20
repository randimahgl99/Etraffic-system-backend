import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            // return res.status(401).json({ success: false, message: "Access denied. No token provided." });
            console.log('run')
        }
        // const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
        // (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ success: false, message: "Invalid token." });
    }
};
