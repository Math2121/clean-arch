import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import Address from "../../../domain/customer/value-object/address"
import ListCustomerUseCase from "./list.customer.usecase"

describe("List Customer", () => {

    const customer = CustomerFactory.createWithAddress(
        "John Doe",
        new Address("Rua Teste", 123, "00000-000", "São Paulo")
    )

    const customer2 = CustomerFactory.createWithAddress(
        "Johson Doe",
        new Address("Rua Teste", 123, "00000-000", "São Paulo")
    )

    const mock = () => {
        return {
            find: jest.fn(),
            findAll: jest.fn().mockResolvedValue(Promise.resolve([customer, customer2])),
            create: jest.fn(),
            update: jest.fn(),
        }
    }

    it("should list customers", async () => {
        const repository = mock()
        const usecase = new ListCustomerUseCase(repository)

        const output = await usecase.execute()

        expect(output.customers.length).toEqual(2)
        expect(output.customers[0].id).toEqual(customer.id)
        expect(output.customers[1].id).toEqual(customer2.id)
    })

})

