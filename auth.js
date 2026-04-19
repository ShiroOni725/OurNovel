// AUTH.JS - Mock Authentication (nanti diganti pake Supabase)

// Fallback showToast if utils.js not loaded yet
if (typeof showToast !== 'function') {
    window.showToast = function(msg, type) {
        alert(msg);
    };
}

let currentUser = null;

// Check if user is logged in (dari localStorage)
function loadCurrentUser() {
    const saved = localStorage.getItem('novelkita_currentUser');
    if (saved) {
        currentUser = JSON.parse(saved);
        updateNavForUser();
        return currentUser;
    }
    return null;
}

function saveCurrentUser(user) {
    currentUser = user;
    localStorage.setItem('novelkita_currentUser', JSON.stringify(user));
    updateNavForUser();
}

function logout() {
    currentUser = null;
    localStorage.removeItem('novelkita_currentUser');
    updateNavForUser();
    showToast("Berhasil logout", "info");
}

function updateNavForUser() {
    const navLinks = document.getElementById('navLinks');
    if (!navLinks) return;
    
    if (currentUser) {
        navLinks.innerHTML = `
            <a href="home.html" class="nav-link">Home</a>
            ${currentUser.role === 'author' ? '<a href="dashboard.html" class="nav-link">Dashboard</a>' : ''}
            <a href="#" class="nav-link" id="logoutBtn">Logout</a>
        `;
        document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
            window.location.href = 'index.html';
        });
    } else {
        navLinks.innerHTML = `
            <a href="home.html" class="nav-link">Home</a>
            <a href="#" class="nav-link" id="loginNavBtn">Masuk</a>
        `;
        document.getElementById('loginNavBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            openLoginModal();
        });
    }
}

// Modal functions
function openLoginModal() {
    document.getElementById('loginModal').classList.remove('hidden');
}

function closeLoginModal() {
    document.getElementById('loginModal').classList.add('hidden');
}

function openRegisterModal() {
    document.getElementById('registerModal').classList.remove('hidden');
}

function closeRegisterModal() {
    document.getElementById('registerModal').classList.add('hidden');
}

// Mock login (nanti diganti pake Supabase)
function handleLogin(emailOrUsername, password) {
    // Mock validation
    const user = MOCK_USERS.find(u => 
        u.email === emailOrUsername || u.username === emailOrUsername
    );
    
    if (!user) {
        showToast("Email/username atau password salah", "error");
        return false;
    }
    
    // Mock password check (di real nanti pake Supabase)
    if (password.length < 1) {
        showToast("Email/username atau password salah", "error");
        return false;
    }
    
    saveCurrentUser(user);
    showToast(`Selamat datang kembali, ${user.username}!`, "success");
    
    setTimeout(() => {
        window.location.href = 'home.html';
    }, 1000);
    
    return true;
}

// Mock register (nanti diganti pake Supabase)
function handleRegister(username, email, password) {
    // Cek username unik
    if (MOCK_USERS.find(u => u.username === username)) {
        showToast("Username sudah digunakan. Pilih username lain.", "error");
        return false;
    }
    
    // Cek email unik
    if (MOCK_USERS.find(u => u.email === email)) {
        showToast("Email sudah terdaftar. Silakan login.", "error");
        return false;
    }
    
    // Cek password length
    if (password.length < 6) {
        showToast("Password minimal 6 karakter", "error");
        return false;
    }
    
    // Buat user baru (mock)
    const newUser = {
        id: MOCK_USERS.length + 1,
        username,
        email,
        role: "reader",
        bio: ""
    };
    MOCK_USERS.push(newUser);
    
    saveCurrentUser(newUser);
    showToast(`Akun berhasil dibuat! Selamat datang, ${username}!`, "success");
    
    setTimeout(() => {
        window.location.href = 'home.html';
    }, 1000);
    
    return true;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadCurrentUser();
    
    // Login modal triggers
    document.getElementById('loginBtn')?.addEventListener('click', openLoginModal);
    document.getElementById('registerBtn')?.addEventListener('click', openRegisterModal);
    document.getElementById('closeLoginModal')?.addEventListener('click', closeLoginModal);
    document.getElementById('closeRegisterModal')?.addEventListener('click', closeRegisterModal);
    document.getElementById('switchToRegister')?.addEventListener('click', () => {
        closeLoginModal();
        openRegisterModal();
    });
    document.getElementById('switchToLogin')?.addEventListener('click', () => {
        closeRegisterModal();
        openLoginModal();
    });
    
    // Login form
    document.getElementById('loginForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        handleLogin(email, password);
    });
    
    // Register form
    document.getElementById('registerForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('regUsername').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        handleRegister(username, email, password);
    });
    
    // Modal close on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.add('hidden');
        }
    });
});