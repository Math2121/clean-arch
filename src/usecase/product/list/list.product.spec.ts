import ListProductsUseCase from "./list.product.usecase";


const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
}
describe("List Products", () => {

    it("should list all products return null", async () => {

        const productRepository = MockRepository();
        const usecase = new ListProductsUseCase(productRepository);

        const output = await usecase.execute()
        expect(output).toEqual({ products: null })
        expect(productRepository.findAll).toBeCalledTimes(1)
    })

    it("should list all products", async () => {
        const productRepository = MockRepository();

        const products = [{ id: "123", name: "Test Product", price: 10.99 }]
        productRepository.findAll.mockResolvedValue(products)
        const usecase = new ListProductsUseCase(productRepository);

        const output = await usecase.execute()
        expect(output).toEqual({products})


    })



})