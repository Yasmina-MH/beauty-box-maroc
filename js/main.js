// Gestion du panier (simplifié)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    document.querySelectorAll('#cart-count').forEach(el => {
        el.textContent = cart.length;
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Merci pour votre message ! Nous vous contacterons sous 24h.');
            this.reset();
        });
    }
});
