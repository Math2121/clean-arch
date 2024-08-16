import express, { Request, Response } from 'express'
import CreateCustomerUseCase from '../../../usecase/customer/create/create.customer.usecase'
import RepositoryCustomerRepository from '../../customer/repository/sequelize/customer.repository'
import ListCustomerUseCase from '../../../usecase/customer/list/list.customer.usecase'
import customerPresenter from '../presenter/customer.presenter'
import CustomerPresenter from '../presenter/customer.presenter'
import ListProductsUseCase from '../../../usecase/product/list/list.product.usecase'
import ProductRepository from '../../product/repository/sequelize/product.repository'
import PorductsPresenter from '../presenter/products.presenter'


export const productsRoute = express.Router()

productsRoute.get('/', async (req: Request, res: Response) => {
    const usecase = new ListProductsUseCase(new ProductRepository())
    const output = await usecase.execute()
    res.format({
        json: async () => res.send(output),
        xml: async () => res.send(PorductsPresenter.toXML(output)),
    })
})