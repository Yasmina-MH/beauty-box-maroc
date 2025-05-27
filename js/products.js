// Données des produits
const products = [
    {
        id: 1,
        name: "Box Perfect Skin",
        price: 199,
        category: "visage",
        image: "img/box1.jpg",
        description: "Fond de teint + correcteur + poudre"
    },
    {
        id: 2,
        name: "Box Glam Eyes",
        price: 179,
        category: "yeux",
        image: "img/box2.jpg",
        description: "Mascara + fard à paupières + eyeliner"
    },
    {
        id: 3,
        name: "Box Lip Luxe",
        price: 159,
        category: "levres", 
        image: "img/box3.jpg",
        description: "Rouge à lèvres + gloss + crayon"
    }
];

// Afficher les produits
function displayProducts(filter = 'all') {
    const grid = document.querySelector('.product-grid');
    if (!grid) return;
    
    grid.innerHTML = products
        .filter(product => filter === 'all' || product.category === filter)
        .map(product => `
            <div class="product-card" data-category="${product.category}">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">${product.price}DHS</p>
                <p class="description">${product.description}</p>
                <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
                    Ajouter au panier
                </button>
            </div>
        `).join('');
}

// Filtrage
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        displayProducts(this.dataset.filter);
    });
});

// Initialisation
displayProducts();
