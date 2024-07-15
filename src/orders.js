const orders = {};

function getOrder(userId) {
    return orders[userId] || { currentOrder: [], orderHistory: [] };
}

function saveOrder(userId, order) {
    orders[userId] = order;
}

function addOrderItem(userId, item) {
    const order = getOrder(userId);
    order.currentOrder.push(item);
    saveOrder(userId, order);
}

function checkoutOrder(userId) {
    const order = getOrder(userId);
    if (order.currentOrder.length > 0) {
        order.orderHistory.push(order.currentOrder);
        order.currentOrder = [];
        saveOrder(userId, order);
        return "Order placed.";
    } else {
        return "No order to place.";
    }
}

function getOrderHistory(userId) {
    const order = getOrder(userId);
    return order.orderHistory.length > 0 ? order.orderHistory : "No order history.";
}

function getCurrentOrder(userId) {
    const order = getOrder(userId);
    return order.currentOrder.length > 0 ? order.currentOrder : "No current order.";
}

function cancelOrder(userId) {
    const order = getOrder(userId);
    order.currentOrder = [];
    saveOrder(userId, order);
    return "Order canceled.";
}

module.exports = {
    getOrder,
    saveOrder,
    addOrderItem,
    checkoutOrder,
    getOrderHistory,
    getCurrentOrder,
    cancelOrder,
};
