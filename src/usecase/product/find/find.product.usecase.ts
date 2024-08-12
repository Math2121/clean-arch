import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { OutputProductDto } from "./find.product.dto";

export default class FindProductUseCase {

    private productRepositoryInterface: ProductRepositoryInterface
    constructor(productRepositoryInterface: ProductRepositoryInterface) {
        this.productRepositoryInterface = productRepositoryInterface;
    }

    async execute(input: {id:string}): Promise<OutputProductDto> {

        const product = await this.productRepositoryInterface.find(input.id);
        if (!product) {
            throw new Error("Product not found")
        }

        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }
}