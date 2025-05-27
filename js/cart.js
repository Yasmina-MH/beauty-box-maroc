let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Ajouter au panier (accessible globalement)
window.addToCart = function(id, name, price) {
    cart.push({ id, name, price });
    updateCart();
    alert(`${name} a été ajouté à votre panier !`);
};

// Mettre à jour le panier
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Mettre à jour le compteur
    document.querySelectorAll('#cart-count').forEach(el => {
        el.textContent = cart.length;
    });
    
    // Mettre à jour la page panier si elle existe
    const cartItemsEl = document.getElementById('cart-items');
    if (cartItemsEl) {
        renderCart();
    }
}

// Afficher le panier
function renderCart() {
    const cartItemsEl = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('subtotal');
    const deliveryEl = document.getElementById('delivery-cost');
    const totalEl = document.getElementById('cart-total');
    
    if (!cartItemsEl) return;
    
    // Calcul des prix
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const deliveryCost = document.getElementById('delivery-select').value === 'marrakech' ? 0 : 30;
    const total = subtotal + deliveryCost;
    
    // Affichage
    cartItemsEl.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name}</span>
            <span>${item.price}DHS</span>
            <button onclick="removeFromCart(${item.id})">×</button>
        </div>
    `).join('');
    
    subtotalEl.textContent = `${subtotal}DHS`;
    deliveryEl.textContent = `${deliveryCost}DHS`;
    totalEl.textContent = `${total}DHS`;
}

// Supprimer un article
window.removeFromCart = function(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
};

// Gestion de la livraison
document.getElementById('delivery-select')?.addEventListener('change', renderCart);

// Initialisation
updateCart();
