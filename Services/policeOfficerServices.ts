import bcrypt from "bcryptjs";
import PoliceOfficer, { IPoliceOfficer } from "../Model/PliceOfficer";
import jwt from "jsonwebtoken";

export class PoliceOfficerService {

    async registerPoliceOfficerUser(name: string, contactInfo: string, password: string, station: string, badgeNumber: string): Promise<IPoliceOfficer> {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new PoliceOfficer({
            name,
            password: hashedPassword,
            contactInfo,
            station,
            badgeNumber
        });

        return await newUser.save();
    }
    
    async deletePoliceOfficerUser(userId: string): Promise<{ success: boolean; message: string }> {
        const user = await PoliceOfficer.findById(userId);
    
        if (!user) {
            throw new Error("User not found");
        }
    
        await user.deleteOne();
    
        return { success: true, message: "User deleted successfully" };
    }
    
    async editPoliceOfficerUser(userId: string, updates: Partial<IPoliceOfficer>): Promise<IPoliceOfficer> {
        const user = await PoliceOfficer.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }
        const updateData = {} 
        if(updates.station) {
            updates.station;
        }
        if(updates.contactInfo) {
            updates.contactInfo;
        }

        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        Object.assign(user, updates);
        await user.save();

        return user;
    }
    async getAllPoliceOfficers(){
        const officers = await PoliceOfficer.find()
        if(!officers){
            throw new Error("There are no Police officers by that ID");
        }
        return officers;
    }

    async loginPoliceOfficer(badgeNumber: string, password: string): Promise<{ token: string; userType: string; userId: string }>  {
        const user = await PoliceOfficer.findOne({ badgeNumber }).lean();
        if (!user) {
            throw new Error("User not found");
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }
    
        const token = jwt.sign({ id: user._id.toString(), email: user.badgeNumber }, process.env.JWT_SECRET || "default_secret", {
            expiresIn: "1h",
        });
    
        const response = {
            token,
            userType: "PoliceOfficer",
            userId: user._id.toString()
        };
    
        return response;
    }
    
    

}

