// Get elements
const sellWasteOption = document.getElementById('sellWasteOption');
const sellWastePopup = document.getElementById('sellWastePopup');
const closePopup = document.getElementById('closePopup');
const sellWasteForm = document.getElementById('sellWasteForm');
const confirmationPopup = document.getElementById('confirmationPopup');
const closeConfirmationPopup = document.getElementById('closeConfirmationPopup');
const confirmationMessage = document.getElementById('confirmationMessage');
const materialsContainer = document.getElementById('materialsContainer');
const addMaterialButton = document.getElementById('addMaterial');

// Show the sell waste popup when the option is clicked
sellWasteOption.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    sellWastePopup.style.display = 'block'; // Show the popup
});

    buyWasteOption.addEventListener('click', function() {
        buyWastePopup.style.display = 'block'; // Hide the popup
    });
// Close the sell waste popup when the 'x' is clicked
closePopup.addEventListener('click', function() {
    sellWastePopup.style.display = 'none'; // Hide the popup
});
closeBuyPopup.addEventListener('click', function() {
    buyWastePopup.style.display = 'none'; });// Hide the popup


// Close the sell waste popup when clicking outside of the popup content
window.addEventListener('click', function(event) {
    if (event.target === sellWastePopup) {
        sellWastePopup.style.display = 'none'; // Hide the popup
    }
    if (event.target === buyWastePopup) {
                    buyWastePopup.style.display = 'none';
                }
});

// Add a new material entry
addMaterialButton.addEventListener('click', function() {
    const newMaterialEntry = document.createElement('div');
    newMaterialEntry.className = 'material-entry';
    newMaterialEntry.innerHTML = `
        <select class="material-select" required>
            <option value="">--Select Material--</option>
            <option value="plastic">Plastic - ₹15 per kg</option>
            <option value="paper">Paper - ₹10 per kg</option>
            <option value="biomass">Biomass - ₹20 per kg</option>
            <option value="metal">Metal - ₹55 per kg</option>
            <option value="glass">Glass - ₹25 per kg</option>
        </select>
        <input type="number" class="material-quantity" placeholder="Quantity (kg)" min="1" required>
        <button type="button" class="remove-material">Remove</button>
    `;
    materialsContainer.appendChild(newMaterialEntry);
    updateMaterialOptions(); // Update the material options after adding a new entry
});

// Handle removing a material entry
materialsContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-material')) {
        event.target.parentElement.remove();
        updateMaterialOptions(); // Update the material options after removing an entry
    }
});

// Function to update material options based on selected materials
function updateMaterialOptions() {
    const selectedMaterials = Array.from(materialsContainer.querySelectorAll('.material-select'))
        .map(select => select.value)
        .filter(value => value); // Get selected values

    const materialSelects = materialsContainer.querySelectorAll('.material-select');
    materialSelects.forEach(select => {
        const options = select.querySelectorAll('option');
        options.forEach(option => {
            if (selectedMaterials.includes(option.value) && option.value !== select.value) {
                option.disabled = true; // Disable already selected materials
            } else {
                option.disabled = false; // Enable options that are not selected
            }
        });
    });
}

// Handle form submission
sellWasteForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const scheduleDate = document.getElementById('scheduleDate').value;
    const pickupLocation = document.getElementById('pickupLocation').value;

    // Validate phone number
    if (phone.length !== 10) {
        alert("Please enter a valid 10-digit phone number.");
        return; // Exit the function if phone number is invalid
    }

    // Get selected materials and quantities
    const materials = [];
    const materialEntries = document.querySelectorAll('.material-entry');

    materialEntries.forEach(entry => {
        const materialSelect = entry.querySelector('.material-select');
        const quantityInput = entry.querySelector('.material-quantity');
        const material = materialSelect.value;
        const quantity = quantityInput.value;

        // Check if material and quantity are selected
        if (material && quantity) {
            materials.push(`${material} - ${quantity} kg`);
        }
    });

    // Check if any materials were selected
    if (materials.length === 0) {
        alert("Please select at least one material with a quantity.");
        return; // Exit the function if no materials are selected
    }

    // Display confirmation message in the confirmation popup
    confirmationMessage.textContent = `Your details have been successfully submitted! Your pickup is scheduled at ${pickupLocation} on ${scheduleDate}. Selected materials: ${materials.join(', ')}.`;
    confirmationPopup.style.display = 'block'; // Show the confirmation popup

    // Hide the sell waste popup
    sellWastePopup.style.display = 'none';

    // Reset the form
    sellWasteForm.reset();
    materialsContainer.innerHTML = ''; // Clear materials
});

// Close the confirmation popup when the 'x' is clicked
closeConfirmationPopup.addEventListener('click', function() {
    confirmationPopup.style.display = 'none'; // Hide the confirmation popup
});

// Close the confirmation popup when clicking outside of the popup content
window.addEventListener('click', function(event) {
    if (event.target === confirmationPopup) {
        confirmationPopup.style.display = 'none'; // Hide the confirmation popup
    }
});

buyWasteForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const name = document.getElementById('buyerName').value;
    const phone = document.getElementById('buyerPhone').value;
    const email = document.getElementById('buyerEmail').value;

    // Validate phone number
    if (phone.length !== 10) {
        alert("Please enter a valid 10-digit phone number.");
        return; // Exit the function if phone number is invalid
    }

    // Display confirmation message in the confirmation popup
    confirmationMessage.textContent = `Your details have been successfully submitted! You will be contacted shortly.`;
    confirmationPopup.style.display = 'block'; // Show the confirmation popup

    // Hide the sell waste popup
    buyWastePopup.style.display = 'none';

    // Reset the form
    buyWasteForm.reset();
});
