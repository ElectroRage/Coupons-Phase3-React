import axios from "axios";
import {Company} from "../Models/Company";
import {Customer} from "../Models/Customer"


export class AdminService {

    async addCompany(company: Company) {
        return (await axios.post<Company>("http://localhost:8080/admin/company", company)).data
    }

    async updateCompany(company: Company) {
        return (await axios.put<Company>("http://localhost:8080/admin/company", company)).data
    }

    async deleteCompany(companyId: number) {
        return (await axios.delete<number>(`http://localhost:8080/admin/company/${companyId}`)).data
    }

    async getAllCompanies() {
        return (await axios.get<Company[]>("http://localhost:8080/admin/allcompanies")).data
    }

    async getOneCompany(companyId: number) {
        return (await axios.get<Company>(`http://localhost:8080/admin/company/${companyId}`)).data
    }

    async getAllCustomers() {
        return (await axios.get<Customer[]>("http://localhost:8080//admin/allcustomers")).data
    }

    async addCustomer(customer:Customer){
        return (await axios.post<Customer>("http://localhost:8080/admin/customer",customer)).data
    }

    async updateCustomer(customer:Customer){
        return (await axios.put<Customer>("http://localhost:8080/admin/customer")).data
    }

    async getOneCustomers(customerId: number) {
        return (await axios.get<Customer>(`http://localhost:8080/admin/customer/${customerId}`)).data
    }

}

