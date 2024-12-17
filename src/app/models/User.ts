import { Identifyer } from './Identifyer'

export class User{

    _id!: string;    
    name: string;
    lastName: string;
    identifyer: Identifyer;    
    email: string;
    phone: string;
    role: string;
    active: string;
    passWord: string; 
    gender: string;
    organizationId!: string;    
    branchId!: string;
        
    constructor(){   
        this.name = '';
        this.lastName = '';
        this.identifyer = new Identifyer;
        this.email = '';
        this.phone = '';
        this.role = '';
        this.active = '';
        this.passWord = '';
        this.gender = '';
    }
}