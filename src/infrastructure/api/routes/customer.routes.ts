import express, { Request, Response } from 'express'
import CreateCustomerUseCase from '../../../usecase/customer/create/create.customer.usecase'
import RepositoryCustomerRepository from '../../customer/repository/sequelize/customer.repository'
import ListCustomerUseCase from '../../../usecase/customer/list/list.customer.usecase'
import customerPresenter from '../presenter/customer.presenter'
import CustomerPresenter from '../presenter/customer.presenter'


export const customerRoute = express.Router()

customerRoute.post('/', async (req: Request, res: Response) => {


    const usecase = new CreateCustomerUseCase(new RepositoryCustomerRepository())

    try {
        const customerDto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                zip: req.body.address.zip,
                city: req.body.address.city,

            }
        }
        const output = await usecase.execute(customerDto)
        res.status(201).send(output)


    } catch (error) {
        res.status(500).send(error)
    }
})
customerRoute.get('/', async (req: Request, res: Response) => {
    const usecase = new ListCustomerUseCase(new RepositoryCustomerRepository())
    const output = await usecase.execute()
    res.format({
        json: async () => res.send(output),
        xml: async () => res.send(CustomerPresenter.toXML(output)),
    })


})