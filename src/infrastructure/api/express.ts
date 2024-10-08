import express, { Express } from "express"
import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../customer/repository/sequelize/customer.model";
import { customerRoute } from "./routes/customer.routes";
import { productsRoute } from "./routes/products.routes";
import ProductModel from "../product/repository/sequelize/product.model";

export const app: Express = express()
app.use(express.json())
app.use('/customers', customerRoute)
app.use('/products', productsRoute)


export let sequelize:Sequelize;


async function setupDb(){
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:"
    })


    try {
        await sequelize.addModels([CustomerModel, ProductModel])
        await sequelize.sync()
        console.log("Connection has been established successfully.")
    } catch (error) {
        console.error("Unable to connect to the database:", error)
    }
}

setupDb()