import mongoose, { Schema, Document, Model } from "mongoose";
import validator from "validator";


export interface ITransaction extends Document {
    fineId: string;
    issueLocation: string;
    amount: number;
    status: string
}

const transactionSchema: Schema = new Schema<ITransaction>({
    fineId: { type: String, required: true },
    issueLocation: { type: String, required: true },
    amount :{type:Number, required: true},
    status: { type: String, default: "UNPAID", enum: ["PAID", "UNPAID"] },
});

const Transaction: Model<ITransaction> = mongoose.model<ITransaction>("Transaction", transactionSchema);

export default Transaction;
