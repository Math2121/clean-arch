type Product = {
    id: string;
    name: string;
    price: number;
}
export interface OutputProductDto {
    products:Product[] | null;
}