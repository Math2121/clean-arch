import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { OutputProductDto } from "./list.product.dto";

export default class ListProductsUseCase {

    private productRepositoryInterface: ProductRepositoryInterface
    constructor(productRepositoryInterface: ProductRepositoryInterface) {
        this.productRepositoryInterface = productRepositoryInterface;
    }

    async execute(): Promise<OutputProductDto | null> {

        const products = await this.productRepositoryInterface.findAll();

        if (!products) {
            return { products: null };
        }


        return { products };
    }
}