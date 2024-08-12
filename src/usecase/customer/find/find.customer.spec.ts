import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import OrderModel from "../../../infrastructure/order/repository/sequilize/order.model";
import OrderItemModel from "../../../infrastructure/order/repository/sequilize/order-item.model";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "John Doe");
const address = new Address("123 Street", 123, "12345", "New York");
customer.changeAddress(address);
const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit Test find customer", () => {

    it("should find a customer", async () => {

        const customerRepository = MockRepository();
        const input = {
            id: "123"
        }
        const output = {
            id: "123",
            name: "John Doe",
            address: {
                street: "123 Street",
                number: 123,
                zip: "12345",
                city: "New York"
            }
        }
        const usecase = new FindCustomerUseCase(customerRepository)
        
        const outputResult = await usecase.execute(input)

        expect(output).toEqual(outputResult)

    })

    it("should not find a customer"  , async () => {
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(()=> {
            throw new Error("Customer not found")
        })
        const input = {
            id: "456"
        }
        const usecase = new FindCustomerUseCase(customerRepository)

        await expect(async()=> {
           await usecase.execute(input)
        }).rejects.toThrow("Customer not found")
    })


})