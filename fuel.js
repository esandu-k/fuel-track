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

function calculateEfficiency() {
    const distance = parseFloat(document.getElementById('distance').value);
    const fuel = parseFloat(document.getElementById('fuel').value);
    const priceDisplay = document.getElementById('price-display');

    if (!isNaN(distance) && !isNaN(fuel) && fuel > 0) {
        const efficiency = distance / fuel;
        priceDisplay.innerHTML += `<br><strong>Fuel Efficiency:</strong> ${efficiency.toFixed(2)} km/l`;
    } else {
        priceDisplay.innerHTML += `<br><strong>Error:</strong> Please enter valid distance and fuel values.`;
    }
}

function calculateTripCost() {
    const distance = parseFloat(document.getElementById('trip-distance').value);
    const efficiency = parseFloat(document.getElementById('trip-efficiency').value);
    const priceDisplay = document.getElementById('price-display');

    if (!isNaN(distance) && !isNaN(efficiency) && efficiency > 0) {
        const fuelNeeded = distance / efficiency;
        const totalCost = fuelNeeded * priceDisplay.innerHTML;
        priceDisplay.innerHTML += `<br><strong>Fuel Needed:</strong> ${fuelNeeded.toFixed(2)} liters`;
        priceDisplay.innerHTML += `<br><strong>Total Cost:</strong> Rs ${totalCost.toFixed(2)}`;
        priceDisplay.innerHTML += `<br><strong>Cost per km:</strong> Rs ${(totalCost / distance).toFixed(2)}`;
    } else {
        priceDisplay.innerHTML += `<br><strong>Error:</strong> Please enter valid distance and efficiency values.`;
    }
}