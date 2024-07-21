document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form values (optional, if you want to display them)
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Display the confirmation message
    const confirmationMessage = document.getElementById('confirmationMessage');
    confirmationMessage.textContent = 'Your message has been sent successfully!';
    confirmationMessage.style.display = 'block'; // Show the confirmation message

    // Optionally, you can reset the form after submission
    document.getElementById('contactForm').reset();
});