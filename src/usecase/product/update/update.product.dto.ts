export interface InputUpdateProductDto {
    id: string;
    type: string;
    name: string;
    price: number;
}

export interface OutputUpdateProductDto {
    id: string;
    name: string;
    price: number;
}