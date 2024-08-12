import CreateCustomerUseCase from "./create.customer.usecase"

const input = {
    name: "John Doe",
    address: {
        street: "123 Street",
        number: 123,
        zip: "12345",
        city: "New York"
    }
}

const MockRepository = ()=> {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
}
describe("Create Customer", () => {
    it("should create a customer", async() => {
        const customerRepository = MockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        const output = await usecase.execute(input)


        expect(output).toEqual(expect.objectContaining({
            id: expect.any(String),
            name: "John Doe",
            address: {
                street: "123 Street",
                number: 123,
                zip: "12345",
                city: "New York"
            }
        }))
    })

    it("should throw an error if name is missing", async() => {
        const customerRepository = MockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        input.name = ""

        await expect(usecase.execute(input)).rejects.toThrow("Name is required");
    })
})