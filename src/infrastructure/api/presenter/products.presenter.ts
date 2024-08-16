import { toXML } from "jstoxml";
import { OutputListCustomerDto } from "../../../usecase/customer/list/list.customer.dto";
import { OutputProductDto } from "../../../usecase/product/list/list.product.dto";

export default class PorductsPresenter {
    static toXML(data: OutputProductDto): string {

        const xmlOptions = {
            header: true,
            indent: " ",
            newline: "\n",
            allowEmpty: true,
        }

        return toXML({
            product: data.products.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    price: item.price
                }
            })
        }, xmlOptions)
    }
}