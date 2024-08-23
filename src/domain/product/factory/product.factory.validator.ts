import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import ProductValidator from "../validator/product.yup.validator";


export default class ProductValidatorFactory {
    public static create(): ValidatorInterface<Product> {
        return new ProductValidator()
    }
}