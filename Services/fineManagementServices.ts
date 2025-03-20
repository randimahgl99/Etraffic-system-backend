import FineManagement, { IFineManagement } from "../Model/FineManagement";

export class fineManagementServices {
    async addfine( offence: string, nature: string, type: string, fine:string, fineNumber: string,): Promise<IFineManagement> {
        try{
            const newFine = new FineManagement({
            offence,
            nature,
            type,
            fine,
            fineNumber,

        });
        return await newFine.save();
       
    } catch (error: any){
       throw new Error(error);
    }
    }
}