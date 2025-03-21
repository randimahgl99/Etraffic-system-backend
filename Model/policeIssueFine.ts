import mongoose, {Schema, Model} from "mongoose";

export interface IPoliceIssueFine extends Document {
    civilUserName : string;
    civilNIC : string;
    issueLocation : string;
    vehicalNumber : string;
    date : string;
    time : string;
    isPaid : boolean;
    type : string;
    policeId : string;
    fineMangementId: string;
    
}

const policeIssueFineSchema: Schema = new Schema<IPoliceIssueFine>({
    civilUserName: { type: String, required: true },
    civilNIC: { type: String, required: true },
    issueLocation: { type: String, required: true },
    date:{type: String, required: true},
    time: { type: String, required: false },
    isPaid : {type: Boolean, requied: true},
    type: { type: String, required: false },
    policeId: { type: String, required: false },
    fineMangementId: { type: String, required: true },
});

const policeIssueFine: Model<IPoliceIssueFine> = mongoose.model<IPoliceIssueFine>("PoliceIssueFine", policeIssueFineSchema)

export default policeIssueFine;