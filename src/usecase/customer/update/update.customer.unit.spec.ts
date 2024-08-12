import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import Address from "../../../domain/customer/value-object/address"
import UpdateCustomerUseCase from "./update.customer.usecase"

describe("Update Customer", () => {
    const customer = CustomerFactory.createWithAddress(
        "John Doe",
        new Address("Rua Teste", 123, "00000-000", "São Paulo")
    )

    const input = {
        id: customer.id,
        name: "Jane Doe",
        address: {
            street: "Rua Teste",
            number: 123,
            zip: "00000-002",
            city: "São Pauli"
        }
    }

    const mockRepository = ()=> {
        return {
            update: jest.fn(),
            find: jest.fn().mockResolvedValue(Promise.resolve(customer)),
            findAll: jest.fn(),
            create: jest.fn()
        }
    }

    it("should update customer", async () => {
        const repository = mockRepository()
        const usecase = new UpdateCustomerUseCase(repository)

        const output = await usecase.execute(input)

        expect(output).toEqual(input)
    })
})