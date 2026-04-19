// HOME.JS - Complete

let currentUser = null;
let allNovels = [];
let currentTab = 'latest';

function loadUser() {
    const saved = localStorage.getItem('novelkita_currentUser');
    if (saved) {
        currentUser = JSON.parse(saved);
    }
    updateNavbar();
}

function updateNavbar() {
    const navLinks = document.getElementById('navLinks');
    if (!navLinks) return;
    
    if (currentUser) {
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
    } else {
        navLinks.innerHTML = `
            <a href="home.html" class="nav-link">🏠 Home</a>
            <button id="themeToggle" class="theme-btn">🌙</button>
            <a href="#" id="loginNavBtn" class="nav-link">🔑 Masuk</a>
        `;
        document.getElementById('loginNavBtn')?.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
    
    document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

function renderNovels(novels) {
    const grid = document.getElementById('novelsGrid');
    if (!grid) return;
    
    if (!novels.length) {
        grid.innerHTML = `
            <div class="empty-state">
                <p>📭 Belum ada novel.</p>
                <p>Jadi penulis pertama! ✍️</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = novels.map(novel => `
        <div class="novel-card" onclick="window.location.href='novel-detail.html?id=${novel.id}'">
            <div class="novel-cover">
                ${novel.cover ? `<img src="${novel.cover}" alt="${novel.title}">` : `<div class="cover-placeholder">📖</div>`}
            </div>
            <div class="novel-info">
                <h3 class="novel-title">${escapeHtml(novel.title)}</h3>
                <p class="novel-author">by ${novel.author_name}</p>
                <div class="novel-stats">
                    <span>⭐ ${novel.rating || 0}</span>
                    <span>👁️ ${novel.views || 0}</span>
                    <span>❤️ ${novel.likes || 0}</span>
                </div>
                <p class="novel-desc">${escapeHtml(novel.description?.substring(0, 100) || '')}${novel.description?.length > 100 ? '...' : ''}</p>
                <div class="novel-genre">${novel.genre}</div>
            </div>
        </div>
    `).join('');
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function filterAndRenderNovels() {
    const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const genre = document.getElementById('genreFilter')?.value || 'all';
    
    let filtered = [...allNovels];
    
    if (search) {
        filtered = filtered.filter(n => 
            n.title.toLowerCase().includes(search) || 
            n.author_name.toLowerCase().includes(search)
        );
    }
    
    if (genre !== 'all') {
        filtered = filtered.filter(n => n.genre === genre);
    }
    
    // Apply current tab sorting
    if (currentTab === 'latest') {
        filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (currentTab === 'popular') {
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (currentTab === 'top') {
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    
    renderNovels(filtered);
}

function setupTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentTab = btn.dataset.tab;
            filterAndRenderNovels();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadUser();
    allNovels = getNovels().filter(n => n.status === 'published');
    renderNovels(allNovels);
    setupTabs();
    
    document.getElementById('searchInput')?.addEventListener('input', filterAndRenderNovels);
    document.getElementById('genreFilter')?.addEventListener('change', filterAndRenderNovels);
});