document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');

    productForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const code = document.getElementById('code').value;
        const price = parseFloat(document.getElementById('price').value);
        const stock = parseInt(document.getElementById('stock').value);
        const category = document.getElementById('category').value;

        const newProduct = { title, description, code, price, stock, category };

        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            if (response.ok) {
                const result = await response.json();
                alert(`Product added successfully! ID: ${result.data.id}`);
            } else {
                const error = await response.json();
                alert(`Failed to add product: ${error.message}`);
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('An error occurred. Please check the console for details.');
        }
    });

});
