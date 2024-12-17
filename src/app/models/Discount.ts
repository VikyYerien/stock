export class Discount{
    _id!: string;
    name!: string;    
    description!: string;
    percentage!: string;
    ammount!: {
        currency: string;
        ammount: string;
    };
    branchId!: string;
    organizationId!: string;
        
    constructor(){}
}