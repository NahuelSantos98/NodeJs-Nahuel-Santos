export default class ProductOutputDTO {
    constructor(product) {
        this.id = product._id
        this.title = product.title;
        this.description = product.description;
        this.price = product.price;
        this.status = product.status ?? true;
        this.stock = product.stock;
        this.category = product.category;
        this.thumbnails = product.thumbnails ?? [];
    }
}
