document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', (event) => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert('Please fill out all fields before submitting.');
      event.preventDefault();  // Prevent form submission
    } else {
      alert(`Thanks for reaching out, ${name}! Your message has been sent.`);
    }
  });
});
