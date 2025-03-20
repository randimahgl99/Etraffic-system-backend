import mongoose, { Schema, Document, Model } from "mongoose";
//import validator from "validator";


export interface IFineManagement extends Document {
    offence: string;
    nature: string;
    type: string;
    fine: string;
    fineNumber: string;
}

const fineManagementSchema: Schema = new Schema<IFineManagement>({
    offence: { type: String, required: true },
    nature: { type: String, required: true },
    type: {type:String, required: true },
    fine: { type: String, required: true },
    fineNumber: { type: String, required: true },
});

const FineManagement: Model<IFineManagement> = mongoose.model<IFineManagement>("FineManagement", fineManagementSchema);

export default FineManagement;