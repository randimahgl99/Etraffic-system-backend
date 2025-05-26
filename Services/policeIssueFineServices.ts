
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


    async updateFinesById(id: string, updates: Partial<IPoliceIssueFine>): Promise<IPoliceIssueFine | null> {
        const updatedFine = await policeIssueFine.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedFine) {
            throw new Error("Fine not found for the given ID");
        }

        return updatedFine;
    }

    async getAllPoliceIssueFines(){

        const issueFines = await policeIssueFine.find()
        if(!issueFines){
            throw new Error("There are no Issue fine by that ID");
        }
        return issueFines;
    }

    async getFinesByUserNIC(id: string): Promise<IPoliceIssueFine[]> {
            console.log("Received ID Type:", typeof id);
            console.log("Received ID Value:", id);
    
            const issueFines = await policeIssueFine.find({ civilNIC: id });

            console.log(issueFines);
    
            if (!issueFines || issueFines.length === 0) {
                throw new Error("There are no Issue fines for that ID");
            }
    
            return issueFines;
    }
    
    async getFinesById(id: string): Promise<IPoliceIssueFine> {
        console.log("Received ID Type:", typeof id);
        console.log("Received ID Value:", id);
    
        const issueFine = await policeIssueFine.findById(id);
    
        console.log(issueFine);
    
        if (!issueFine) {
            throw new Error("There is no fine for that ID");
        }
    
        return issueFine;
    }
  
    
    async getPoliceById (id : string ): Promise<IPoliceIssueFine[]>{
        const policeOfficer = await policeIssueFine.find({policeId:id})
        if(!policeOfficer){
            throw new Error("There are no Police Officer by that ID");
        }
        return policeOfficer;
    }
}