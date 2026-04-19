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
        <a href="home.html" class="nav-link">🏠 Home</a>
        ${currentUser.role === 'author' ? '<a href="dashboard.html" class="nav-link">✍️ Dashboard</a>' : ''}
        <a href="favorites.html" class="nav-link">❤️ Rak Baca</a>
        <a href="profile.html" class="nav-link">👤 Profile</a>
        <button id="themeToggle" class="theme-btn">🌙</button>
        <a href="#" id="logoutNavBtn" class="nav-link">🚪 Logout</a>
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
    document.getElementById('profileUsername').value = currentUser.username;
    document.getElementById('profileEmail').value = currentUser.email;
    document.getElementById('profileBio').value = currentUser.bio || '';
    
    const roleBadge = document.getElementById('profileRole');
    if (currentUser.role === 'author') {
        roleBadge.textContent = '✍️ Author';
        roleBadge.className = 'role-badge role-author';
        document.getElementById('profileAvatar').textContent = '✍️';
    } else {
        roleBadge.textContent = '📖 Reader';
        roleBadge.className = 'role-badge role-reader';
        document.getElementById('profileAvatar').textContent = '📖';
    }
}

document.getElementById('profileForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const bio = document.getElementById('profileBio').value;
    currentUser.bio = bio;
    
    // Save to localStorage
    localStorage.setItem('novelkita_currentUser', JSON.stringify(currentUser));
    
    // Update in mock users array
    const userIndex = MOCK_USERS.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        MOCK_USERS[userIndex].bio = bio;
    }
    
    showToast("Profil berhasil diperbarui!", "success");
});

document.addEventListener('DOMContentLoaded', loadUser);