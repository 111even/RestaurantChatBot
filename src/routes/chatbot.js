const express = require('express');
const router = express.Router();
const {
    addOrderItem,
    checkoutOrder,
    getOrderHistory,
    getCurrentOrder,
    cancelOrder,
} = require('../orders');

const menuItems = [
    "Amala",
    "Semo",
    "Apku",
    "Tuwo",
    "Eba"
];

router.post('/chat', (req, res) => {
    const { message } = req.body;
    const userId = req.ip; // Use IP address as a simple session identifier
    let reply = '';

    switch (message) {
        case '1':
            reply = "Select items to order:\n";
            menuItems.forEach((item, index) => {
                reply += `${index + 1}. ${item}\n`;
            });
            break;
        case '99':
            reply = checkoutOrder(userId);
            break;
        case '98':
            reply = JSON.stringify(getOrderHistory(userId));
            break;
        case '97':
            reply = JSON.stringify(getCurrentOrder(userId));
            break;
        case '0':
            reply = cancelOrder(userId);
            break;
        default:
            const itemIndex = parseInt(message) - 1;
            if (itemIndex >= 0 && itemIndex < menuItems.length) {
                addOrderItem(userId, menuItems[itemIndex]);
                reply = `${menuItems[itemIndex]} added to your order.`;
            } else {
                reply = "Invalid option. Please select a valid option.";
            }
    }

    res.json({ reply });
});

module.exports = router;
