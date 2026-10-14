export async function fetchProducts() {
    const response = await fetch('/api/products');
    if (!response.ok) {
        throw new Error('Ошибка загрузки товаров');
    }
    const result = await response.json();
    return result.data;
}