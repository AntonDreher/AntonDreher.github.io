import { CartItem } from "./cartItem";

export class OrderData {    
    token: string = '';
    tableId: number = 0;
    totalAmount: number = 0;
    date: Date = new Date();
    orderedItems: CartItem[] = [];
    status: string = '';
    oID: number = 0;

    constructor(token: string, id: number, amount: number, items: CartItem[]) {        
        this.token = token;
        this.tableId = id;
        this.totalAmount = amount;
        this.orderedItems = items;
        this.date = new Date();
        this.status= 'open';
    }

    

   
    
}