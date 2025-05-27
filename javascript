// Données des produits
const products = [
    {
        id: 1,
        name: "Box Perfect Skin",
        price: 199,
        category: "visage",
        image: "img/box1.jpg"
    },
    {
        id: 2,
        name: "Box Glam Eyes",
        price: 179,
        category: "yeux", 
        image: "img/box2.jpg"
    }
];

// Afficher les produits
function displayProducts() {
    const grid = document.querySelector('.product-grid');
    grid.innerHTML = products.map(product => `
        <div class="product-card" data-category="${product.category}">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}DHS</p>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
                Ajouter au panier
            </button>
        </div>
    `).join('');
}

// Filtrage
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        document.querySelectorAll('.product-card').forEach(card => {
            card.style.display = (filter === 'all' || card.dataset.category === filter) 
                ? 'block' : 'none';
        });
    });
});

// Initialisation
displayProducts();
