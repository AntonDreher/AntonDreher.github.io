import { CartItem } from "./cartItem";


export class OrderItemsData {    
    oid: number = 0;
    cartItems: CartItem [] = [];



    constructor(oid: number, items: CartItem[]) {        
       this.oid = oid;
       this.cartItems = items;  
    }

    

   
    
}