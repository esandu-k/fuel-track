// Global variable to store the selected fuel price
let currentFuelPrice = 0;

/**
 * Updates the selected fuel price and displays it in the UI.
 */
function showPrice(type, price) {
    currentFuelPrice = price;
    const displayArea = document.getElementById('price-display');
    if (displayArea) {
        displayArea.innerHTML = `<strong>Selected:</strong> ${type} | <strong>Price:</strong> Rs ${price} / L`;
        displayArea.style.backgroundColor = '#d4edda'; // Light green background when selected
    }
}

/**
 * Calculates fuel efficiency (km/l).
 */
function calculateEfficiency() {
    const distanceInput = document.getElementById('distance');
    const fuelInput = document.getElementById('fuel');
    const resultBox = document.getElementById('efficiency-result');

    const distance = parseFloat(distanceInput.value);
    const fuel = parseFloat(fuelInput.value);

    if (!isNaN(distance) && !isNaN(fuel) && fuel > 0) {
        const efficiency = distance / fuel;
        resultBox.innerHTML = `Efficiency: ${efficiency.toFixed(2)} km/l`;
        
        // Auto-fill the efficiency divider in the Trip Calculator for convenience
        const tripEfficiencyInput = document.getElementById('trip-efficiency');
        if (tripEfficiencyInput) {
            tripEfficiencyInput.value = efficiency.toFixed(2);
        }
    } else {
        alert("Please enter a valid distance and fuel amount.");
    }
}

/**
 * Calculates trip cost.
 */
function calculateTripCost() {
    const distanceInput = document.getElementById('trip-distance');
    const efficiencyInput = document.getElementById('trip-efficiency');
    
    const litersDisplay = document.getElementById('liters-needed-display');
    const totalDisplay = document.getElementById('total-lkr-display');
    const perKmDisplay = document.getElementById('lkr-per-km-display');

    const distance = parseFloat(distanceInput.value);
    const efficiency = parseFloat(efficiencyInput.value);

    if (isNaN(distance) || isNaN(efficiency) || efficiency <= 0) {
        alert("Please enter a valid distance and vehicle efficiency.");
        return;
    }

    if (currentFuelPrice === 0) {
        alert("Please select a fuel type from the 'Current Fuel Prices' section first.");
        return;
    }

    const fuelNeeded = distance / efficiency;
    const totalCost = fuelNeeded * currentFuelPrice;

    litersDisplay.innerText = `${fuelNeeded.toFixed(2)} L`;
    totalDisplay.innerText = `Rs ${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    perKmDisplay.innerText = `Rs ${(totalCost / distance).toFixed(2)} / km`;
}

// Initialization check
document.addEventListener('DOMContentLoaded', () => {
    console.log("Fuel Tracker System Initialized.");
});

/**
 * Clears all inputs, result boxes, and resets the background colors and global state.
 */
function clearAll() {
    // Clear Input Values
    document.getElementById("distance").value = "";
    document.getElementById("fuel").value = "";
    document.getElementById("trip-distance").value = "";
    document.getElementById("trip-efficiency").value = "";

    // Clear Result Display Text
    document.getElementById("efficiency-result").innerText = "";
    document.getElementById("liters-needed-display").innerText = "";
    document.getElementById("total-lkr-display").innerText = "";
    document.getElementById("lkr-per-km-display").innerText = "";

    // Reset Price Display special case
    const priceDisplay = document.getElementById("price-display");
    if (priceDisplay) {
        priceDisplay.innerText = "No fuel type selected.";
        priceDisplay.style.backgroundColor = ""; // Reset background color to default
    }

    // Reset State
    currentFuelPrice = 0;
}
