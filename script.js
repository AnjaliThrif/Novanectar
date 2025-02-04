// Select the contact form
const form = document.getElementById('contact-form');

// Add an event listener for form submission
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from refreshing the page
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Display an alert with the form details
  alert(`Thank you, ${name}! We have received your message: "${message}". We will reach out to you at ${email}.`);
  
  // Optionally, clear the form after submission
  form.reset();
});
