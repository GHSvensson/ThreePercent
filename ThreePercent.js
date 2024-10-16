function submitValue() {
    const initialValue = parseFloat(document.getElementById('initialValue').value);
    
    if (isNaN(initialValue) || initialValue <= 0) {
        alert('Please enter a valid number greater than 0');
        return;
    }

    // Store the initial value and current date
    localStorage.setItem('initialValue', initialValue);
    localStorage.setItem('submissionDate', new Date().toISOString()); // Store current date as ISO string
    
    // Calculate the new value after a day (for demonstration)
    let currentValue = initialValue + (initialValue * 0.03); // Increase by 3%
    const increase = currentValue * 0.03; // Calculate the increase
    const subtractedAmount = increase * 0.30; // Subtract 30% of the increase

    // Update the local storage with the new values
    localStorage.setItem('currentValue', currentValue.toFixed(2));
    localStorage.setItem('subtractedAmount', subtractedAmount.toFixed(2));

    // Display the results
    displayResults(currentValue, subtractedAmount);
    updateDayCounter(); // Update the day counter on submission
}

function displayResults(currentValue, subtractedAmount) {
    document.getElementById('currentValue').innerText = currentValue.toFixed(2);
    document.getElementById('subtractedAmount').innerText = subtractedAmount.toFixed(2);
}

function updateDayCounter() {
    const submissionDate = localStorage.getItem('submissionDate');
    if (submissionDate) {
        const initialDate = new Date(submissionDate);
        const currentDate = new Date();
        
        // Calculate the difference in time
        const timeDifference = currentDate - initialDate; // Time difference in milliseconds
        const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert to days
        
        // Display the number of days passed
        document.getElementById('dayCounter').innerText = daysPassed;
    } else {
        document.getElementById('dayCounter').innerText = 0; // Default to 0 if no date is found
    }
}

function loadValues() {
    const savedInitialValue = localStorage.getItem('initialValue');
    const savedCurrentValue = localStorage.getItem('currentValue');
    const savedSubtractedAmount = localStorage.getItem('subtractedAmount');

    if (savedInitialValue) {
        document.getElementById('initialValue').value = savedInitialValue; // Optionally fill the input with the saved value
    }

    if (savedCurrentValue) {
        displayResults(parseFloat(savedCurrentValue), parseFloat(savedSubtractedAmount));
    }
    
    updateDayCounter(); // Update day counter on load
}

// Call the loadValues function when the window loads
window.onload = loadValues;
