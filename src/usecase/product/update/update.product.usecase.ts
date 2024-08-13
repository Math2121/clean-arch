import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";



export default class UpdateProductsUseCase {

    private productRepositoryInterface: ProductRepositoryInterface
    constructor(productRepositoryInterface: ProductRepositoryInterface) {
        this.productRepositoryInterface = productRepositoryInterface;
    }

    async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
        const product = await this.productRepositoryInterface.find(input.id);
        if (!product) {
            throw new Error("Product not found");
        }
        console.log(product.id);
        product.changeName(input.name);
        product.changePrice(input.price);

        await this.productRepositoryInterface.update(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price
        }

    }
}