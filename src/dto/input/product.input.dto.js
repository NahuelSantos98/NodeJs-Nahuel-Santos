export default class ProductInputDTO {
    constructor(product) {
        this.title = product.title;
        this.description = product.description;
        this.code = product.code;
        this.price = product.price;
        this.status = product.status ?? true;
        this.stock = product.stock;
        this.category = product.category;
        this.thumbnails = product.thumbnails ?? [];
    }
}
