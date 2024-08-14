import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import OrderModel from "../../../infrastructure/order/repository/sequilize/order.model";
import OrderItemModel from "../../../infrastructure/order/repository/sequilize/order-item.model";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import CreateProductUseCase from "./product.create.usecase";


describe("Test Create product integration", () => {
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

    it("should create a new product", async () => {
        const productRepository = new ProductRepository();
        const input ={
            id: "1",
            name: "Product 1",
            price: 100,
            type: "a"
        }

        const usecase = new CreateProductUseCase(productRepository)
        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: "Product 1",
            price: 100
        })

    })

   

})