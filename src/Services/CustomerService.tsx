import axios from "axios";
import {Coupon} from "../Models/Coupon";
import {Customer} from "../Models/Customer";

export class CustomerService {

    async purchase(coupon: Coupon) {
        return (await axios.post("http://localhost:8080/customer/purchase")).data
    }

    async getAll() {
        return (await axios.get<Coupon[]>("http://localhost:8080/customer/all")).data
    }

    //redundant methods as they can more efficiently be filtered with javascript
        async getAllByCategory(category: string) {
            return (await axios.get<Coupon[]>(`http://localhost:8080/customer/all/${category}`)).data
        }


        async getAllByMaxPrice(maxprice: number) {
            return (await axios.get<Coupon[]>(`http://localhost:8080/customer/all/${maxprice}`)).data
        }


    async getDetails() {
        return (await axios.get<Customer>("http://localhost:8080/customer/details")).data
    }

}