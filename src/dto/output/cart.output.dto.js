class CartOutputDTO {
    constructor(cart) {
        this.id = cart._id;
        this.products = cart.products.map(item => ({
            prodId: item.prodId ? item.prodId._id : null,
            title: item.prodId ? item.prodId.title : 'Unknown Product',
            price: item.prodId ? item.prodId.price : 0,
            quantity: item.quantity
        }));
    }
}

export default CartOutputDTO;