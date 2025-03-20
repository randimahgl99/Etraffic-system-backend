
import policeIssueFine, { IPoliceIssueFine } from "../Model/policeIssueFine";

export class policeIssueFineServices {
    async addPoliceIssueFine(civilUserName : string, civilNIC : string, issueLocation : string, vehicalNumber : string, date : string, time : string, isPaid : boolean,  type : string, policeId: string,): Promise<IPoliceIssueFine> {
        const newIssuFine = new policeIssueFine({
            civilUserName,
            civilNIC,
            issueLocation,
            vehicalNumber,
            date,
            time,
            isPaid,
            type,
            policeId,
        });

        return await newIssuFine.save();
    }

    async getAllPoliceIssueFines(){

        const issueFines = await policeIssueFine.find()
        if(!issueFines){
            throw new Error("There are no Issue fine by that ID");
        }
        return issueFines;
    }

    async getFinesByUserNIC (id : string): Promise<IPoliceIssueFine> {
        const issueFines = await policeIssueFine.findOne({civilNIC:id})
        if(!issueFines){
            throw new Error("There are no Issue fine by that ID");
        }
        return issueFines;
    }

    async getPoliceById (id : string ): Promise<IPoliceIssueFine[]>{
        const policeOfficer = await policeIssueFine.find({policeId:id})
        if(!policeOfficer){
            throw new Error("There are no Police Officer by that ID");
        }
        return policeOfficer;
    }
}