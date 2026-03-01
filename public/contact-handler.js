// Contact form handler for Vercel deployment
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            // Get button and update UI
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.querySelector('span').textContent;
            
            // Show loading state
            submitButton.disabled = true;
            submitButton.querySelector('span').textContent = 'Sending...';
            
            try {
                // Send to Vercel API
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, message })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // Show success message
                    alert('Message sent successfully!');
                    contactForm.reset();
                } else {
                    // Show error message
                    alert('Error: ' + (result.error?.message || 'Failed to send message'));
                }
                
            } catch (error) {
                console.error('Error:', error);
                alert('Error: Failed to send message. Please try again.');
            } finally {
                // Reset button
                submitButton.disabled = false;
                submitButton.querySelector('span').textContent = originalText;
            }
        });
    }
});