import {Company} from "./Company";

export class Coupon {

    id: number;
    company: number;
    category: string;
    title: string;
    Description: string;
    startDate: Date;
    endDate: Date;
    amount: number;
    price: number;
    image: string;


    constructor(id: number, company: number, category: string, title: string,
                Description: string, startDate: Date, endDate: Date, amount: number, price: number, image: string) {
        this.id = id;
        this.company = company;
        this.category = category;
        this.title = title;
        this.Description = Description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.price = price;
        this.image = image;
    }
}