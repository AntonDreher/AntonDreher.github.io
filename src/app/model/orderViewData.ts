export class OrderViewData {    
    token: string = '';
    id: string = '';
    amount: number = 0;
    date: Date = new Date();
    //orderedItems: CartItem[] = [];
    status: string = '';
    oid: number = 0;

    constructor(token: string, id: string, amount: number, status: string, oid: number) {        
        this.token = token;
        this.id = id;
        this.amount = amount;
        //this.orderedItems = items;
        this.date = new Date();
        this.status= status;
        this.oid = oid;
    }

    

   
    
}