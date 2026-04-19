// FAVORITES.JS

let currentUser = null;
let favoriteNovels = [];

function loadUser() {
    const saved = localStorage.getItem('novelkita_currentUser');
    if (saved) {
        currentUser = JSON.parse(saved);
        updateNavbar();
        loadFavorites();
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

function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem(`favorites_${currentUser.id}`)) || [];
    const allNovels = getNovels();
    favoriteNovels = allNovels.filter(n => favorites.includes(n.id));
    renderFavorites();
}

function renderFavorites() {
    const grid = document.getElementById('favoritesGrid');
    
    if (!favoriteNovels.length) {
        grid.innerHTML = `
            <div class="empty-state">
                <p>📭 Rak bacaan masih kosong.</p>
                <p>Temukan novel menarik dan klik ❤️ untuk menyimpan!</p>
                <a href="home.html" class="btn-primary" style="margin-top: 16px; display: inline-block;">Jelajahi Novel</a>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = favoriteNovels.map(novel => `
        <div class="novel-card" onclick="window.location.href='novel-detail.html?id=${novel.id}'">
            <div class="novel-cover">
                <div class="cover-placeholder">📖</div>
            </div>
            <div class="novel-info">
                <h3 class="novel-title">${novel.title}</h3>
                <p class="novel-author">by ${novel.author_name}</p>
                <div class="novel-stats">
                    <span>⭐ ${novel.rating || 0}</span>
                    <span>👁️ ${novel.views || 0}</span>
                </div>
                <div class="novel-genre">${novel.genre}</div>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', loadUser);