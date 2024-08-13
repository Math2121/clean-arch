import { string } from "yup";
import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductsUseCase from "./update.product.usecase";


const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
}
describe("Update Product", () => {

    it("should update a product", async () => {

        const productRepository = MockRepository();
        const usecase = new UpdateProductsUseCase(productRepository);

    
       
        const product = ProductFactory.create(
           "a",
            "Teste product",
           20.99
        )

        const input = {
            id: product.id,
            name: "Updated Product",
            price: 15.99,
            type: "a"
        }
        productRepository.find.mockResolvedValue(product)
        const output = await usecase.execute(input)
    
        productRepository.find.mockReset()
        expect(output).toEqual({
            id: expect.any(String),
            name: "Updated Product",
            price: 15.99
        })



    });

    it("should throw an error when a product not exist", async () => {

        const productRepository = MockRepository();
        const usecase = new UpdateProductsUseCase(productRepository);

        const input = {
            id: "123",
            name: "Updated Product",
            price: 15.99,
            type: "a"
        }
        productRepository.find.mockResolvedValue(null)

        await expect(usecase.execute(input)).rejects.toThrow("Product not found")
    })

})