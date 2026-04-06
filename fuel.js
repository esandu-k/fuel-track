/**
 * Shows the price of the selected fuel type in the price-display paragraph.
 * @param {string} type - The name of the fuel type.
 * @param {number} price - The price of the fuel per liter.
 */
function showPrice(type, price) {
    const displayArea = document.getElementById('price-display');
    if (displayArea) {
        displayArea.innerHTML = `<strong>Selected:</strong> ${type}<br><strong>Price:</strong> Rs ${price} per liter`;
        displayArea.style.color = '#000000ff'; // Optional color feedback
    }
}

// Initial placeholder message (optional)
document.addEventListener('DOMContentLoaded', () => {
    console.log("Fuel Price Tracker Loaded");
});
