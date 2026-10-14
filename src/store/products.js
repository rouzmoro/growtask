let products = [];

function getProduct(productId) {
    return products.find(p => p.id === productId);
}

export function setProducts(data) {
    products = data.map(p => ({ ...p, count: p.count || 1 }));
}

export function getProducts() {
    return products;
}

export function getProductCount(productId) {
    const product = getProduct(productId);
    return product.count;
}

export function getProductQuantity(productId) {
    const product = getProduct(productId);
    return product.quantity;
}

export function updateProductCount(productId, count) {
    const product = getProduct(productId);
    if (product) {
        product.count = count;
    }
}

export function removeProduct(productId) {
    products = products.filter(p => p.id !== productId);
}

export function removeAllProducts() {
    products = [];
}

export function getCartTotals() {
    let totalCount = 0;
    let totalCost = 0;
    let totalOldCost = 0;

    for (const product of products) {
        const count = product.count || 1;
        totalCount += count;
        totalCost += product.price * count;
        totalOldCost += (product.old_price || product.price) * count;
    }

    return { totalCount, totalCost, totalOldCost };
}