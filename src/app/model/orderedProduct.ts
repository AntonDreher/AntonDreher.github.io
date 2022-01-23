export class OrderedProduct {    
    product_id: string = '';
    amount: number = 0;
    state: string = '';
    oid: number = 0;
    title: string = '';

    constructor(token: string, id: string, amount: number, status: string, oid: number) {        
        this.product_id = id;
        this.amount = amount;
        this.state= status;
        this.oid = oid;
    }

    

   
    
}