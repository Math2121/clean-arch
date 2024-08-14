import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import OrderModel from "../../../infrastructure/order/repository/sequilize/order.model";
import OrderItemModel from "../../../infrastructure/order/repository/sequilize/order-item.model";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import ListProductsUseCase from "./list.product.usecase";




describe("Test List products integration", () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([
            CustomerModel,
            OrderModel,
            OrderItemModel,
            ProductModel,
        ]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should list products", async () => {
        const productRepository = new ProductRepository();

        const product = new Product("1", "Product 1", 100);
        const product2 = new Product("2", "Product 2", 200)
        await productRepository.create(product2);
        await productRepository.create(product);

        const usecase = new ListProductsUseCase(productRepository)

        const output = await usecase.execute()
        console.log(output.products)
        expect(output.products).toEqual([product2, product])

    })



})