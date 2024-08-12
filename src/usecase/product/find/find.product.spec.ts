import FindProductUseCase from "./find.product.usecase";

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
}
describe("Find Product", () => {

    it("should find a product", async () => {
        const productRepository = MockRepository();
        const usecase = new FindProductUseCase(productRepository);
        const product = {
            id: "123",
            name: "Product 1",
            price: 10.99
        }
        productRepository.find.mockResolvedValue(product)


        const input = {
            id: "123"
        }

        const output = await usecase.execute(input)

        expect(output).toEqual(expect.objectContaining({
            id: "123",
            name: "Product 1",
            price: 10.99
        }))
    })

    it("should throw an error when product not found", async () => {
        const productRepository = MockRepository();
        const usecase = new FindProductUseCase(productRepository);
        productRepository.find.mockResolvedValue(null)

        const input = {
            id: "123"
        }

        await expect(usecase.execute(input)).rejects.toThrow("Product not found")
        
        productRepository.find.mockReset()
    })

})