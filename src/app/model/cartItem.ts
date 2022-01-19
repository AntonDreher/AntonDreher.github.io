import { SafeUrl } from "@angular/platform-browser";

export class CartItem {
    itemId: number = 0;
    title: string = "";
    price: number = 0.0;
    amount: number = 0;
    imageUrl: SafeUrl = "";


    getPriceAsCurrency() {
        this.price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
    }
}