const API_BASE = import.meta.env.DEV ? '' : 'https://growtask.ru/test-front';

export async function fetchProducts() {
    const response = await fetch(`${API_BASE}/api/products`);
    if (!response.ok) {
        throw new Error('Ошибка загрузки товаров');
    }
    const result = await response.json();
    return result.data;
}