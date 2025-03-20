import bcrypt from "bcryptjs";
import CivilUser, { ICivilUser } from "../Model/CivilUser";
import jwt from "jsonwebtoken";

export class CivilUserService {
    async registerUser(name: string, email: string, password: string): Promise<ICivilUser> {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new CivilUser({
            name,
            email,
            password: hashedPassword,
            isAdmin: false,
            
        });

        return await newUser.save();
    }


    async loginUser(email: string, password: string): Promise<string | null> {
        const user = await CivilUser.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || "default_secret", {
            expiresIn: "1h",
        });

        return token;
    }
    async registerAdminUser(name: string, email: string, password: string, idNumber?: string): Promise<ICivilUser> {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new CivilUser({
            name,
            email,
            password: hashedPassword,
            isAdmin: true,
            idNumber, 
        });

        return await newUser.save();
    }
    async deleteUser(userId: string): Promise<{ success: boolean; message: string }> {
        const user = await CivilUser.findById(userId);
    
        if (!user) {
            throw new Error("User not found");
        }
    
        await CivilUser.findByIdAndDelete(userId);
    
        return { success: true, message: "User deleted successfully" };
    }
    
    async editUser(userId: string, updates: Partial<ICivilUser>): Promise<ICivilUser> {
        const user = await CivilUser.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        Object.assign(user, updates);
        await user.save();

        return user;
    }

    async editAdmin(userId: string, updates: Partial<ICivilUser>): Promise<ICivilUser> {
        const user = await CivilUser.findById(userId);
    
        if (!user) {
            throw new Error("Admin user not found");
        }
    
        if (!user.isAdmin) {
            throw new Error("The specified user is not an admin");
        }
    
        
        Object.assign(user, updates);
    
        return await user.save();
    }
    

}

