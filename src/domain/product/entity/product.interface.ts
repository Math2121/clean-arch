export default interface ProductInterface {
  get id(): string;
  get name(): string;
  get price(): number;
  changePrice(price: number): void
  changeName(name: string): void 
}
