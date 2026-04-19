// PROFILE.JS

let currentUser = null;

function loadUser() {
    const saved = localStorage.getItem('novelkita_currentUser');
    if (saved) {
        currentUser = JSON.parse(saved);
        updateNavbar();
        loadProfile();
    } else {
        window.location.href = 'index.html';
    }
}

function updateNavbar() {
    const navLinks = document.getElementById('navLinks');
    if (!navLinks) return;

    navLinks.innerHTML = `
        <a href="home.html" class="nav-link">Home</a>
        ${currentUser.role === 'author' ? '<a href="dashboard.html" class="nav-link">Dashboard</a>' : ''}
        <a href="favorites.html" class="nav-link">Rak Baca</a>
        <a href="profile.html" class="nav-link">Profile</a>
        <button id="themeToggle" class="theme-btn">Tema</button>
        <a href="#" id="logoutNavBtn" class="nav-link">Logout</a>
    `;

    document.getElementById('logoutNavBtn')?.addEventListener('click', () => {
        localStorage.removeItem('novelkita_currentUser');
        window.location.href = 'index.html';
    });
    document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);

    document.getElementById('menuToggle')?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

function loadProfile() {
    const usernameEl = document.getElementById('profileUsername');
    const emailEl = document.getElementById('profileEmail');
    const bioEl = document.getElementById('profileBio');
    const roleEl = document.getElementById('profileRole');
    const avatarEl = document.getElementById('profileAvatar');
    const displayNameEl = document.getElementById('profileDisplayName');

    if (usernameEl) usernameEl.value = currentUser.username;
    if (emailEl) emailEl.value = currentUser.email;
    if (bioEl) bioEl.value = currentUser.bio || '';
    if (displayNameEl) displayNameEl.textContent = currentUser.username;

    const initial = currentUser.username.charAt(0).toUpperCase();
    if (avatarEl) avatarEl.textContent = initial;

    if (currentUser.role === 'author') {
        if (roleEl) {
            roleEl.textContent = 'Author';
            roleEl.className = 'role-badge role-author';
        }
        const becomeAuthorSection = document.getElementById('becomeAuthorSection');
        if (becomeAuthorSection) becomeAuthorSection.style.display = 'none';
    } else {
        if (roleEl) {
            roleEl.textContent = 'Reader';
            roleEl.className = 'role-badge role-reader';
        }
        const becomeAuthorSection = document.getElementById('becomeAuthorSection');
        if (becomeAuthorSection) becomeAuthorSection.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadUser();

    document.getElementById('profileForm')?.addEventListener('submit', (e) => {
        e.preventDefault();

        const bio = document.getElementById('profileBio')?.value || '';
        currentUser.bio = bio;

        localStorage.setItem('novelkita_currentUser', JSON.stringify(currentUser));

        const userIndex = MOCK_USERS.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            MOCK_USERS[userIndex].bio = bio;
        }

        showToast("Profil berhasil diperbarui!", "success");
    });

    document.getElementById('becomeAuthorBtn')?.addEventListener('click', () => {
        currentUser.role = 'author';
        localStorage.setItem('novelkita_currentUser', JSON.stringify(currentUser));

        const userIndex = MOCK_USERS.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            MOCK_USERS[userIndex].role = 'author';
        }

        showToast("Selamat! Kamu sekarang menjadi penulis.", "success");
        setTimeout(() => {
            loadProfile();
            updateNavbar();
        }, 800);
    });
});
