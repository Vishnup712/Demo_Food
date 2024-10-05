let order = {};
let totalAmount = 0;

// Load the order from localStorage when the page loads
window.onload = function () {
    const storedOrder = localStorage.getItem('order');
    if (storedOrder) {
        order = JSON.parse(storedOrder);  // Parse the stored JSON string
        updateOrderSummary();  // Update the order summary
    }
};

function addToOrder(itemName, itemPrice, itemImage) {
    // Check if the item already exists in the order
    if (order[itemName]) {
        order[itemName].quantity++;  // Increase the quantity
    } else {
        // Add item to the order object
        order[itemName] = {
            price: itemPrice,
            quantity: 1,
            image: itemImage
        };
    }

    // Store the updated order in localStorage
    localStorage.setItem('order', JSON.stringify(order));

    // Update the order summary
    updateOrderSummary();
}

function updateOrderSummary() {
    // Get the order list element
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';  // Clear the existing list

    // Recalculate total amount
    totalAmount = 0;

    // Loop through each item in the order and display it
    for (const itemName in order) {
        const item = order[itemName];
        const li = document.createElement('li');

        // Create an image element for the food item
        const img = document.createElement('img');
        img.src = item.image; // Set the image source
        img.className = 'food-image'; // Add class for styling
        img.alt = itemName; // Set alt text for accessibility

        li.appendChild(img); // Append the image to the list item
        li.appendChild(document.createTextNode(`${itemName} - ${item.price} x ${item.quantity}`)); // Add text with quantity

        // Add remove button to each item
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeFromOrder(itemName);
        li.appendChild(removeButton);
        
        orderList.appendChild(li);

        // Sum up the total amount
        totalAmount += item.price * item.quantity; // Update total amount with the new logic
    }

    // Update total price display
    document.getElementById('total-price').textContent = totalAmount.toFixed(2);
}

function removeFromOrder(itemName) {
    // Remove the item from the order object
    delete order[itemName];

    // Store the updated order in localStorage
    localStorage.setItem('order', JSON.stringify(order));

    // Update the order summary
    updateOrderSummary();
}

function placeOrder() {
    if (Object.keys(order).length === 0) {
        alert('Your cart is empty!');
    } else {
        // Display confirmation message
        let orderSummary = Object.entries(order).map(([name, item]) => `${name} - ${item.price} x ${item.quantity}`).join('\n');
        alert(`Your order has been placed!\n\nOrder Summary:\n${orderSummary}\nTotal: ${totalAmount.toFixed(2)}`);

        // Clear the order and reset total amount
        order = {};
        totalAmount = 0;

        // Clear localStorage
        localStorage.removeItem('order');

        // Update the order summary to clear the list
        updateOrderSummary();
    }
}
