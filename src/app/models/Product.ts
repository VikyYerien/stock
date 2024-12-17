import { Identifyer } from './Identifyer'
import { Category } from './Category';

export class Product{

    _id!: string;    
    name!: string;
    description!: string;
    price!: {
        ammount: string, 
        currency: string
    };
    imgUrls!: string[];
    batchNumber: Identifyer;
    code!: string;
    organizationId!: string;    
    branchId!: string;
    discounts!: [{
        name: string,
        description: string,
        percentage: string
        ammount: string,
    }];
    categoryId!: string;
    available!: Boolean;
    stock!: string;
        
    constructor(){
        this.batchNumber = new Identifyer;
    }
}