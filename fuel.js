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
        displayArea.style.backgroundColor = '#d4edda';
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
        const resultText = `${efficiency.toFixed(2)} km/l`;
        resultBox.innerHTML = `Efficiency: ${resultText}`;

        // Save to History
        addHistoryRecord(`Efficiency: ${distance}km / ${fuel}L = ${resultText}`);

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

    const fuelNeeded = (distance / efficiency).toFixed(2);
    const totalCost = (fuelNeeded * currentFuelPrice).toFixed(2);

    litersDisplay.innerText = `${fuelNeeded} L`;
    totalDisplay.innerText = `Rs ${parseFloat(totalCost).toLocaleString()}`;
    perKmDisplay.innerText = `Rs ${(totalCost / distance).toFixed(2)} / km`;

    // Save to History
    addHistoryRecord(`Trip: ${distance}km @ ${efficiency}km/l. Cost: Rs ${totalCost}`);
}

/**
 * Clears all inputs and results.
 */
function clearAll() {
    document.getElementById("distance").value = "";
    document.getElementById("fuel").value = "";
    document.getElementById("trip-distance").value = "";
    document.getElementById("trip-efficiency").value = "";

    document.getElementById("efficiency-result").innerText = "";
    document.getElementById("liters-needed-display").innerText = "";
    document.getElementById("total-lkr-display").innerText = "";
    document.getElementById("lkr-per-km-display").innerText = "";

    const priceDisplay = document.getElementById("price-display");
    if (priceDisplay) {
        priceDisplay.innerText = "No fuel type selected.";
        priceDisplay.style.backgroundColor = "";
    }
    currentFuelPrice = 0;
}

// --- HISTORY LOGIC ---

/**
 * Adds a new record to the local storage history.
 */
function addHistoryRecord(details) {
    const history = JSON.parse(localStorage.getItem('fuelHistory')) || [];
    const newRecord = {
        date: new Date().toLocaleString(),
        details: details
    };
    history.unshift(newRecord); // Add to the beginning
    localStorage.setItem('fuelHistory', JSON.stringify(history.slice(0, 10))); // Keep last 10 records
    updateHistoryDisplay();
}

/**
 * Updates the history display in the HTML.
 */
function updateHistoryDisplay() {
    const historyList = document.getElementById('history-list');
    const history = JSON.parse(localStorage.getItem('fuelHistory')) || [];

    if (history.length === 0) {
        historyList.innerHTML = '<p>No history records yet.</p>';
        return;
    }

    historyList.innerHTML = history.map(item => `
        <div style="background: #f8f9fa; padding: 10px; border-left: 4px solid #007bff; margin-bottom: 8px; font-size: 13px;">
            <small style="color: #6c757d;">${item.date}</small><br>
            <strong>${item.details}</strong>
        </div>
    `).join('');
}

/**
 * Clears the history from local storage.
 */
function clearHistory() {
    if (confirm("Are you sure you want to clear all history?")) {
        localStorage.removeItem('fuelHistory');
        updateHistoryDisplay();
    }
}

// Initialize display on load
document.addEventListener('DOMContentLoaded', () => {
    updateHistoryDisplay();
    console.log("Fuel Tracker System Initialized.");
});
