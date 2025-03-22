import bcrypt from "bcryptjs";
import CivilUser, { ICivilUser } from "../Model/CivilUser";
import jwt from "jsonwebtoken";
import FineManagement from "../Model/FineManagement";
import stripeLib from "stripe"
import Transaction from "../Model/transaction";
import policeIssueFine from "../Model/policeIssueFine";

const stripeKey = process.env.STRIPE_SECRET_KEY
if (!stripeKey) {
    throw new Error("STRIPE_SECRET_KEY is not defined in the environment variables");
}
const stripe = new stripeLib(stripeKey)
export class CivilUserService {
    async registerUser(name: string, email: string, password: string, idNumber:string): Promise<ICivilUser> {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new CivilUser({
            name,
            email,
            password: hashedPassword,
            isAdmin: false,
            idNumber, 
            
        });

        return await newUser.save();
    }


    async loginUser(email: string, password: string): Promise<{ token: string; userType: boolean }>  {
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

        const response = {
            "token":token,
            "userType":user.isAdmin
        }

        return response;
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

    async payFine(fineId: string): Promise<object> {
        const fine = await policeIssueFine.findById(fineId)
        if(!fine){
            throw new Error("Fine not found");
        }

        const fineMnagementData = await FineManagement.findById(fine.fineManagementId);
        if(!fineMnagementData){
            throw new Error("Fine management data not found")
        }

        const unitAmount: number = Number(fineMnagementData.fine) * 100;

        //create stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
               {
                  price_data: {
                     currency: "usd",
                     unit_amount: unitAmount, // Stripe expects amount in cents
                  },
                  quantity: 1,
               },
            ],
            mode: "payment",
            cancel_url: `http://localhost:5173/payment-subscription/upgrade-false`,
            success_url: `http://localhost:5173/payment-subscription/upgrade-success`,
        });

        //save transaction in db
        const transactionData = {
            fineId,
            issueLocation: fine.issueLocation,
            amount: fineMnagementData.fine,
        }
        const transaction = new Transaction(transactionData);
        await transaction.save()
        return {
            sessionId: session.id,
            url: session.url,
            transactionId: transaction._id
        };
    }

    async payFineStatus(sessionId: string, transactionId: string): Promise<object> {
        const transaction = await Transaction.findById(transactionId)
        if(!transaction){
            throw new Error("Transaction not found");
        }

        //get stripe checkout session data
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        let updatedTransaction
        if(session.payment_status== "paid"){
            //update transaction in db
            updatedTransaction = await Transaction.findByIdAndUpdate(transactionId, {status: "PAID"});
            if(!updatedTransaction){
                throw new Error('Transaction Update Failed')
            }
        }else{
            throw new Error('Paiment is pending')
        }
        return updatedTransaction;
    }
}

