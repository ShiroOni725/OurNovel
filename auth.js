// AUTH.JS - Mock Authentication

// Modal functions
function openLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) modal.classList.remove('hidden');
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) modal.classList.add('hidden');
}

function openRegisterModal() {
    const modal = document.getElementById('registerModal');
    if (modal) modal.classList.remove('hidden');
}

function closeRegisterModal() {
    const modal = document.getElementById('registerModal');
    if (modal) modal.classList.add('hidden');
}

function handleLogin(emailOrUsername, password) {
    const user = MOCK_USERS.find(u =>
        u.email === emailOrUsername || u.username === emailOrUsername
    );

    if (!user) {
        showToast("Email/username atau password salah", "error");
        return false;
    }

    if (password.length < 1) {
        showToast("Email/username atau password salah", "error");
        return false;
    }

    localStorage.setItem('novelkita_currentUser', JSON.stringify(user));
    showToast(`Selamat datang kembali, ${user.username}!`, "success");

    setTimeout(() => {
        window.location.href = 'home.html';
    }, 1000);

    return true;
}

function handleRegister(username, email, password) {
    if (MOCK_USERS.find(u => u.username === username)) {
        showToast("Username sudah digunakan. Pilih username lain.", "error");
        return false;
    }

    if (MOCK_USERS.find(u => u.email === email)) {
        showToast("Email sudah terdaftar. Silakan login.", "error");
        return false;
    }

    if (password.length < 6) {
        showToast("Password minimal 6 karakter", "error");
        return false;
    }

    const newUser = {
        id: MOCK_USERS.length + 1,
        username,
        email,
        role: "reader",
        bio: ""
    };
    MOCK_USERS.push(newUser);

    localStorage.setItem('novelkita_currentUser', JSON.stringify(newUser));
    showToast(`Akun berhasil dibuat! Selamat datang, ${username}!`, "success");

    setTimeout(() => {
        window.location.href = 'home.html';
    }, 1000);

    return true;
}

document.addEventListener('DOMContentLoaded', () => {
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

    document.getElementById('loginForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        handleLogin(email, password);
    });

    document.getElementById('registerForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('regUsername').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        handleRegister(username, email, password);
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.add('hidden');
        }
    });

    document.getElementById('loginNavBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        openLoginModal();
    });
});
