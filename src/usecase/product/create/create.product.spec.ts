import CreateProductUseCase from "./product.create.usecase";

const input = {
    type: "a",
    name: "Test Product",
    price: 10.99
}


const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
}
describe("Create Product", () => {

    it("should create a product", async () => {

        const productRepository = MockRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const output = await usecase.execute(input)

        expect(output).toEqual(expect.objectContaining({
            id: expect.any(String),
            name: "Test Product",
            price: 10.99
        }))

    })

    it("should throw an error when trying to create a product with invalid type", async () => {
        const productRepository = MockRepository();
        const usecase = new CreateProductUseCase(productRepository);

        await expect(usecase.execute({
            type: "f",
            name: "Test Product",
            price: 10.99
        })).rejects.toThrow("Product type not supported")


    })

})