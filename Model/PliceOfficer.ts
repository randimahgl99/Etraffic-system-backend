import mongoose, { Schema, Document, Model } from "mongoose";
// import validator from "validator";


export interface IPoliceOfficer extends Document {
    name: string;
    contactInfo: string;
    password: string;
    station: string;
    badgeNumber: string;
}

const policeOfficerSchema: Schema = new Schema<IPoliceOfficer>({
    name: { type: String, required: true },
    contactInfo: { type: String, required: true },
    password: { type: String, required: true },
    station:{type: String, required: false},
    badgeNumber: { type: String, required: true },
});

const PoliceOfficer: Model<IPoliceOfficer> = mongoose.model<IPoliceOfficer>("PoliceOfficer", policeOfficerSchema);

export default PoliceOfficer;
