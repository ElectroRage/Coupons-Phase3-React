import {Coupon} from "../Models/Coupon";
import axios from "axios";
import {Company} from "../Models/Company";

export class CompanyService {

    async addCoupon(coupon: Coupon) {
        return (await axios.post<Coupon>("http://localhost:8080/company/add", coupon)).data
    }

    async updateCoupon(coupon: Coupon) {
        return (await axios.patch<Coupon>("http://localhost:8080/company/update", coupon)).data
    }

    async deleteCoupon(couponId: number) {
        return (await axios.delete(`http://localhost:8080/company/${couponId}`)).data
    }


    async getAll() {
        return (await axios.get<Coupon[]>("http://localhost:8080/company/all")).data
    }


    async getAllByCategory(category: string) {
        return (await axios.get<Coupon[]>(`http://localhost:8080/company/all/${category}`)).data
    }


    async getAllByMaxPrice(maxprice: number) {
        return (await axios.get<Coupon[]>(`http://localhost:8080/company/all/${maxprice}`)).data
    }


    async getDetails() {
        return (await axios.get<Company>("http://localhost:8080/company")).data
    }


}