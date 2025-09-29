document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = document.querySelector('.submit-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
                to_email: "sibin230805@gmail.com",
                from_name: name,
                from_email: email,
                message: message
            })
            .then(function() {
                btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                contactForm.reset();
                setTimeout(() => btn.innerHTML = originalText, 3000);
            }, function(error) {
                btn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send';
                console.error('Failed to send message:', error);
                setTimeout(() => btn.innerHTML = originalText, 3000);
            });
        });
    }
});