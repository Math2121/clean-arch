import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import OrderModel from "../../../infrastructure/order/repository/sequilize/order.model";
import OrderItemModel from "../../../infrastructure/order/repository/sequilize/order-item.model";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";

import UpdateProductsUseCase from "./update.product.usecase";




describe("Test Update product integration", () => {
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

    it("should update product", async () => {
        const productRepository = new ProductRepository();

        const product = new Product("1", "Product 1", 100);

        await productRepository.create(product);

        const input = {
            id: "1",
            name: "Updated Product",
            price: 200,
            type: "a"
        }

        const usecase = new UpdateProductsUseCase(productRepository)
        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: "1",
            name: "Updated Product",
            price: 200
        })


    })



})