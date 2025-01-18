// Hamburger Menu Toggle (if applicable to your design)
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navItems.forEach((item) => {
            item.classList.toggle('fade');
        });
    });

    // Close hamburger menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Form Validation for Contact Form
const contactForm = document.getElementById('contactForm');
const contactMessageDisplay = document.createElement('p');  // Dynamically create a message element
contactForm.appendChild(contactMessageDisplay);  // Add the message element below the form

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    
    // Reset previous messages
    contactMessageDisplay.textContent = "";
    contactMessageDisplay.style.color = 'red';  // Default color for errors
    
    // Validate fields
    if (name === "" || email === "" || message === "") {
        contactMessageDisplay.textContent = 'All fields are required.';
        return false;
    }
    
    if (!emailPattern.test(email)) {
        contactMessageDisplay.textContent = 'Please enter a valid email address.';
        return false;
    }
    
    // Success Message
    contactMessageDisplay.style.color = 'green';
    contactMessageDisplay.textContent = 'Thank you! Your message has been successfully sent.';
    
    // Automatically hide the success message after 3 seconds
    setTimeout(() => {
        contactMessageDisplay.textContent = '';
    }, 3000);

    // Reset the form after submission
    contactForm.reset();
});

// Function to send the message
function sendMessage() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const method = document.getElementById('method').value;
    const errorMessage = document.getElementById('error-message');

    // Clear previous error message
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    // Validation
    if (name === '') {
        displayError('Please enter your name.');
        return;
    }
    if (email === '' || !validateEmail(email)) {
        displayError('Please enter a valid email address.');
        return;
    }
    if (message === '') {
        displayError('Please enter your message.');
        return;
    }

    // If all inputs are valid, proceed with sending the message
    if (method === 'email') {
        const mailtoLink = `mailto:Kenzygourmet@gmail.com?subject=Message from ${name}&body=${encodeURIComponent(message)}`;
        window.location.href = mailtoLink;
    } else if (method === 'whatsapp') {
        const phoneNumber = '+234 803 479 4114'; // Replace with your WhatsApp number
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
    }
}

// Function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Function to display error message
function displayError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';

    // Hide the error message after 5 seconds
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000); // 5000 milliseconds = 5 seconds
}

// Newsletter Form Validation and Handling
const newsletterForm = document.getElementById('newsletterForm');
const newsletterMessageDisplay = document.createElement('p');  // Dynamically create a message element
newsletterForm.appendChild(newsletterMessageDisplay);  // Add the message element below the form

const subscribedEmails = new Set();  // Set to store subscribed emails

newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const email = document.getElementById('newsletterEmail').value.trim();
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Reset previous messages
    newsletterMessageDisplay.textContent = "";
    newsletterMessageDisplay.style.color = 'red';  // Default color for errors
    
    // Validate email
    if (!emailPattern.test(email)) {
        newsletterMessageDisplay.textContent = 'Please enter a valid email address.';
        return false;
    }

    // Check if the email is already subscribed
    if (subscribedEmails.has(email)) {
        newsletterMessageDisplay.textContent = 'You are already a subscriber.';
        
        // Automatically hide the error message after 3 seconds
        setTimeout(() => {
            newsletterMessageDisplay.textContent = '';
        }, 3000);

        return false;
    }

    // Add email to the Set and show success message
    subscribedEmails.add(email);
    newsletterMessageDisplay.style.color = 'green';
    newsletterMessageDisplay.textContent = 'Thank you for subscribing to our newsletter!';

    // Automatically hide the success message after 3 seconds
    setTimeout(() => {
        newsletterMessageDisplay.textContent = '';
    }, 3000);

    // Reset the form after submission
    newsletterForm.reset();
});