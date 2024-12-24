import {Coupon} from "../Models/Coupon";
import axios from "axios";
import {Company} from "../Models/Company";

export class CompanyService {

    async addCoupon(coupon: Coupon) {
        return (await axios.post<Coupon>("http://localhost:8080/company/add", coupon)).data
    }

    async updateCoupon(coupon: Coupon) {
        return (await axios.put<Coupon>("http://localhost:8080/company/update",coupon)).data
    }

    async deleteCoupon(couponId: number) {
        return (await axios.delete<number>(`http://localhost:8080/company/${couponId}`)).data
    }

    async getAll() {
        return (await axios.get<Coupon[]>("http://localhost:8080/company/all")).data
    }


    //redundant methods as they can more efficiently be filtered with javascript
        async getAllByCategory(category: string) {
            return (await axios.get<Coupon[]>(`http://localhost:8080/company/all/${category}`)).data
        }


        async getAllByMaxPrice(maxprice: number) {
            return (await axios.get<Coupon[]>(`http://localhost:8080/company/all/${maxprice}`)).data
        }


    async getDetails() {
        return (await axios.get<Company>("http://localhost:8080/company/details")).data
    }


}