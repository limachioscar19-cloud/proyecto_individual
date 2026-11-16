let items = [];

export function addItem(name, price, quantity) {
    const existing = items.find(function (item) {
        return item.name === name && item.price === price;
    });

    if (existing) {
        existing.quantity += quantity;
    } else {
        items.push({ name: name, price: price, quantity: quantity });
    }
}

export function removeItem(index) {
    items.splice(index, 1);
}

export function getItems() {
    return items.slice();
}

export function getTotal() {
    return items.reduce(function (sum, item) {
        return sum + item.price * item.quantity;
    }, 0);
}

export function getCount() {
    return items.reduce(function (sum, item) {
        return sum + item.quantity;
    }, 0);
}

export function clearCart() {
    items = [];
}
