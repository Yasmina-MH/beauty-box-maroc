// Gestionnaire d'authentification premium
class AuthManager {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('bb_users')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('bb_currentUser')) || null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkAuthState();
        this.setupPasswordToggles();
        this.setupPasswordStrengthMeter();
    }

    setupEventListeners() {
        // Connexion
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Inscription
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }
    }

    handleLogin(e) {
        e.preventDefault();
        const form = e.target;
        const email = form.querySelector('input[type="email"]').value.trim();
        const password = form.querySelector('input[type="password"]').value;

        const user = this.users.find(u => u.email === email);
        
        if (!user) {
            this.showError("Aucun compte trouvé avec cet email");
            return;
        }

        if (user.password !== password) {
            this.showError("Mot de passe incorrect");
            return;
        }

        this.currentUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone
        };

        localStorage.setItem('bb_currentUser', JSON.stringify(this.currentUser));
        
        // Redirection avec animation
        this.showSuccess(`Bienvenue ${user.name} !`);
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 1500);
    }

    handleRegister(e) {
        e.preventDefault();
        const form = e.target;
        const name = form.querySelector('input[type="text"]').value.trim();
        const email = form.querySelector('input[type="email"]').value.trim();
        const phone = form.querySelector('input[type="tel"]').value.trim();
        const password = form.querySelector('#reg-password').value;
        const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;

        // Validations
        if (this.users.some(u => u.email === email)) {
            this.showError("Un compte existe déjà avec cet email");
            return;
        }

        if (password !== confirmPassword) {
            this.showError("Les mots de passe ne correspondent pas");
            return;
        }

        if (password.length < 8) {
            this.showError("Le mot de passe doit contenir au moins 8 caractères");
            return;
        }

        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            phone,
            password,
            joined: new Date().toISOString()
        };

        this.users.push(newUser);
        localStorage.setItem('bb_users', JSON.stringify(this.users));
        
        this.currentUser = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone
        };

        localStorage.setItem('bb_currentUser', JSON.stringify(this.currentUser));
        
        this.showSuccess("Inscription réussie ! Redirection...");
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 1500);
    }

    checkAuthState() {
        if (this.currentUser && window.location.pathname.includes('auth')) {
            this.showInfo(`Vous êtes déjà connecté en tant que ${this.currentUser.name}`);
            setTimeout(() => {
                window.location.href = "../index.html";
            }, 2000);
        }
    }

    setupPasswordToggles() {
        document.querySelectorAll('.toggle-password').forEach(btn => {
            btn.addEventListener('click', function() {
                const input = this.parentElement.querySelector('input');
                const icon = this.querySelector('i');
                
                if (input.type === "password") {
                    input.type = "text";
                    icon.classList.replace('fa-eye', 'fa-eye-slash');
                } else {
                    input.type = "password";
                    icon.classList.replace('fa-eye-slash', 'fa-eye');
                }
            });
        });
    }

    setupPasswordStrengthMeter() {
        const passwordInput = document.getElementById('reg-password');
        if (!passwordInput) return;

        passwordInput.addEventListener('input', function() {
            const strengthBar = document.querySelector('.strength-bar');
            const strengthText = document.querySelector('.strength-text');
            const strength = this.calculatePasswordStrength(this.value);

            strengthBar.style.width = `${strength.percentage}%`;
            strengthBar.style.backgroundColor = strength.color;
            strengthText.textContent = strength.text;
        });
    }

    calculatePasswordStrength(password) {
        let strength = 0;
        
        // Longueur
        strength += Math.min(password.length * 5, 30);
        
        // Diversité
        if (/[A-Z]/.test(password)) strength += 10;
        if (/[0-9]/.test(password)) strength += 10;
        if (/[^A-Za-z0-9]/.test(password)) strength += 10;
        
        // Couleur et texte
        let color, text;
        if (strength < 30) {
            color = "#ff4d4d";
            text = "Faible";
        } else if (strength < 60) {
            color = "#ffa64d";
            text = "Moyen";
        } else if (strength < 80) {
            color = "#70db70";
            text = "Fort";
        } else {
            color = "#4CAF50";
            text = "Très fort";
        }

        return {
            percentage: Math.min(strength, 100),
            color,
            text
        };
    }

    showError(message) {
        // Implémentez une belle notification d'erreur
        alert(message); // À remplacer par un système de notifications
    }

    showSuccess(message) {
        alert(message); // À remplacer
    }

    showInfo(message) {
        alert(message); // À remplacer
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    new AuthManager();
});
