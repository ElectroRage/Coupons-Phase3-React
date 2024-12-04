import axios from "axios";
import {Company} from "../Models/Company";
import {Customer} from "../Models/Customer"


export class AdminService {

    async addCompany(company: Company) {
        return (await axios.post<Company>("http://localhost:8080/company", company)).data
    }

    async updateCompany(company: Company) {
        return (await axios.patch<Company>("http://localhost:8080/company", company)).data
    }

    async deleteCompany(companyId: number) {
        return (await axios.delete<number>(`http://localhost:8080/company/${companyId}`)).data
    }

    async getAllCompanies() {
        return (await axios.get<Company[]>("http://localhost:8080/allcompanies")).data
    }

    async getOneCompany(companyId: number) {
        return (await axios.get<Company>(`http://localhost:8080/company/${companyId}`)).data
    }

    async getAllCustomers() {
        return (await axios.get<Customer[]>("http://localhost:8080/allcustomers")).data
    }

    async getOneCustomers(customerId: number) {
        return (await axios.get<Customer>(`http://localhost:8080/customer/${customerId}`)).data
    }

}

