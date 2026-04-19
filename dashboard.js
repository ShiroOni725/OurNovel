// DASHBOARD.JS

let currentUser = null;
let myNovels = [];

function loadUser() {
    const saved = localStorage.getItem('novelkita_currentUser');
    if (saved) {
        currentUser = JSON.parse(saved);
        if (currentUser.role !== 'author') {
            showToast("Anda bukan penulis!", "error");
            setTimeout(() => window.location.href = 'home.html', 1500);
            return;
        }
        updateNavbar();
        loadMyNovels();
        updateStats();
    } else {
        window.location.href = 'index.html';
    }
}

function updateNavbar() {
    const navLinks = document.getElementById('navLinks');
    if (!navLinks) return;
    
    navLinks.innerHTML = `
        <a href="home.html" class="nav-link">🏠 Home</a>
        <a href="dashboard.html" class="nav-link">✍️ Dashboard</a>
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

function loadMyNovels() {
    const allNovels = getNovels();
    myNovels = allNovels.filter(n => n.author_id === currentUser.id);
    renderNovelsList();
}

function renderNovelsList() {
    const container = document.getElementById('novelsList');
    if (!myNovels.length) {
        container.innerHTML = `
            <div class="empty-state" style="padding: 40px;">
                <p>Belum ada novel.</p>
                <button class="btn-primary" onclick="window.location.href='novel-edit.html?new=true'">
                    + Buat Novel Pertama
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = myNovels.map((novel, index) => `
        <div class="novel-row">
            <div>${index + 1}</div>
            <div><strong>${novel.title}</strong></div>
            <div>${novel.genre}</div>
            <div>
                <span class="novel-status status-${novel.status}">
                    ${novel.status === 'published' ? '📢 Published' : novel.status === 'draft' ? '✏️ Draft' : '✅ Completed'}
                </span>
            </div>
            <div>${novel.views || 0}</div>
            <div class="novel-actions">
                <button class="action-icon" onclick="editNovel(${novel.id})" title="Edit">✏️</button>
                <button class="action-icon" onclick="manageChapters(${novel.id})" title="Chapter">📑</button>
                <button class="action-icon" onclick="viewNovel(${novel.id})" title="View">👁️</button>
                <button class="action-icon" onclick="deleteNovel(${novel.id})" title="Hapus">🗑️</button>
            </div>
        </div>
    `).join('');
}

function updateStats() {
    const totalNovels = myNovels.length;
    const totalChapters = myNovels.reduce((sum, n) => sum + (n.chapters?.length || 0), 0);
    const totalViews = myNovels.reduce((sum, n) => sum + (n.views || 0), 0);
    const totalLikes = myNovels.reduce((sum, n) => sum + (n.likes || 0), 0);
    
    document.getElementById('dashboardStats').innerHTML = `
        <div class="stat-card">
            <div class="stat-card-value">${totalNovels}</div>
            <div class="stat-card-label">Novel</div>
        </div>
        <div class="stat-card">
            <div class="stat-card-value">${totalChapters}</div>
            <div class="stat-card-label">Chapter</div>
        </div>
        <div class="stat-card">
            <div class="stat-card-value">${totalViews}</div>
            <div class="stat-card-label">Total Views</div>
        </div>
        <div class="stat-card">
            <div class="stat-card-value">${totalLikes}</div>
            <div class="stat-card-label">Total Likes</div>
        </div>
    `;
}

function editNovel(id) {
    window.location.href = `novel-edit.html?id=${id}`;
}

function manageChapters(id) {
    window.location.href = `novel-detail.html?id=${id}`;
}

function viewNovel(id) {
    window.location.href = `novel-detail.html?id=${id}`;
}

function deleteNovel(id) {
    if (confirm('Yakin ingin menghapus novel ini? Semua chapter akan ikut terhapus!')) {
        showToast("Novel dihapus (mock)", "info");
        loadMyNovels();
        updateStats();
    }
}

document.addEventListener('DOMContentLoaded', loadUser);