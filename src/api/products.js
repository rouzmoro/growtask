export async function fetchProducts() {
    const response = await fetch(/api/products);
    if (!response.ok) {
        throw new Error('Ошибка загрузки товаров');
    }
    const result = await response.json();
    result.data.forEach(product => {
        if (product.image) {
            product.image = product.image.replace('http://', 'https://');
        }
    });
    return result.data;
}