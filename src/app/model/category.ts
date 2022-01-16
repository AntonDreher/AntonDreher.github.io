export class Category {
    category_id: number = -1;
    category_name: string = '';

    constructor(id: number, name: string) {
        this.category_id = id;
        this.category_name = name;
    }
}