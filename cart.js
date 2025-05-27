let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Ajouter au panier
function addToCart(id, name, price) {
    cart.push({ id, name, price });
    updateCart();
    alert(`${name} ajouté au panier !`);
}

// Mettre à jour le panier
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('cart-count').textContent = cart.length;
    
    // Afficher les articles dans cart.html
    if (document.getElementById('cart-items')) {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        
        document.getElementById('cart-items').innerHTML = cart.map(item => `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>${item.price}DHS</span>
                <button onclick="removeFromCart(${item.id})">×</button>
            </div>
        `).join('');
        
        document.getElementById('cart-total').textContent = `${total}DHS`;
    }
}

// Supprimer un article
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Initialisation
updateCart();
