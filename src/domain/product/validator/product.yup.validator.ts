import { ValidatorInterface } from "../../@shared/validator/validator.interface";

import * as yup from 'yup'
import Product from "../entity/product";
export default class ProductValidator implements ValidatorInterface<Product> {

    validate(product: Product) {
        try {

            yup.object()
            .shape({
                    id: yup.string().required("Id is required"),
                    name: yup.string().required("Name is required"),
                    price: yup.number().required("Price is required").min(0, "Price must be a positive number")
                })
                .validateSync({
                    id: product.id,
                    name: product.name,
                    price: product.price
                }, { abortEarly: false })

        } catch (error) {
            const e = error as yup.ValidationError
            e.errors.forEach((error) => {
                product.notification.addError({
                    message: error,
                    context: "product"
                })
            })
        }
    }

}