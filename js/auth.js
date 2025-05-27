// Simule une base de données utilisateurs
const users = JSON.parse(localStorage.getItem('users')) || [
    { email: "test@example.com", password: "123456", name: "Client Test" }
];

// Gestion de la connexion
document.getElementById('login-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;

    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert(`Bienvenue ${user.name} !`);
        window.location.href = "../index.html";
    } else {
        alert("Email ou mot de passe incorrect !");
    }
});

// Gestion de l'inscription
document.getElementById('register-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;
    const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;

    if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas !");
        return;
    }

    if (users.some(u => u.email === email)) {
        alert("Un compte existe déjà avec cet email !");
        return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    alert("Inscription réussie !");
    window.location.href = "../index.html";
});

// Vérifie si un utilisateur est connecté au chargement
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && window.location.pathname.includes('auth')) {
        alert(`Vous êtes déjà connecté en tant que ${currentUser.name}`);
        window.location.href = "../index.html";
    }
});
