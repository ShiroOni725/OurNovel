// NOVEL-DETAIL.JS

let currentUser = null;
let currentNovel = null;

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
    } else {
        navLinks.innerHTML = `
            <a href="home.html" class="nav-link">Home</a>
            <button id="themeToggle" class="theme-btn">Tema</button>
            <a href="index.html" class="nav-link">Masuk</a>
        `;
    }

    document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
    document.getElementById('menuToggle')?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

function getNovelIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
}

function renderNovelDetail() {
    const novelId = getNovelIdFromUrl();
    currentNovel = getNovelById(novelId);

    if (!currentNovel) {
        document.getElementById('novelDetail').innerHTML = `
            <div class="empty-state">
                <p>Novel tidak ditemukan.</p>
                <a href="home.html" class="btn-primary">Kembali ke Home</a>
            </div>
        `;
        return;
    }

    const isAuthor = currentUser && currentUser.id === currentNovel.author_id;

    const isFavorited = currentUser
        ? (JSON.parse(localStorage.getItem(`favorites_${currentUser.id}`)) || []).includes(currentNovel.id)
        : false;

    const html = `
        <div class="novel-detail-header">
            <div class="novel-detail-cover">
                ${currentNovel.cover ? `<img src="${currentNovel.cover}" alt="${currentNovel.title}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius);">` : 'Buku'}
            </div>
            <div>
                <h1 class="novel-detail-title">${currentNovel.title}</h1>
                <p class="novel-detail-author" onclick="window.location.href='profile.html'">
                    by ${currentNovel.author_name}
                </p>
                <div class="novel-detail-stats">
                    <div class="stat-item">
                        <span class="stat-value">${currentNovel.views || 0}</span>
                        <span class="stat-label">Views</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${currentNovel.likes || 0}</span>
                        <span class="stat-label">Likes</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${currentNovel.rating || 0}</span>
                        <span class="stat-label">Rating</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${currentNovel.chapters?.length || 0}</span>
                        <span class="stat-label">Chapter</span>
                    </div>
                </div>
                <div class="novel-detail-desc">
                    ${currentNovel.description || 'Tidak ada deskripsi.'}
                </div>
                <div>
                    <span class="novel-genre-badge">${currentNovel.genre}</span>
                </div>
                <div class="action-buttons">
                    ${currentNovel.chapters?.length > 0 ? `
                        <button class="btn-primary" onclick="startReading()">
                            Mulai Baca
                        </button>
                    ` : `
                        <button class="btn-primary" disabled style="opacity:0.5">
                            Belum Ada Chapter
                        </button>
                    `}
                    <button class="btn-outline" id="favoriteBtn" ${isFavorited ? 'disabled' : ''}>
                        ${isFavorited ? 'Tersimpan' : 'Simpan ke Rak'}
                    </button>
                </div>
                ${isAuthor ? `
                    <div class="action-buttons" style="margin-top:12px">
                        <button class="btn-secondary" onclick="window.location.href='novel-edit.html?id=${currentNovel.id}'">
                            Edit Novel
                        </button>
                        <button class="btn-secondary" onclick="window.location.href='chapter-edit.html?novelId=${currentNovel.id}'">
                            Tambah Chapter
                        </button>
                    </div>
                ` : ''}
            </div>
            <div style="clear:both"></div>
        </div>

        <div class="chapter-list">
            <h2>Daftar Chapter</h2>
            ${currentNovel.chapters?.length > 0 ? `
                <div id="chaptersContainer">
                    ${currentNovel.chapters.map(ch => `
                        <div class="chapter-item" onclick="readChapter(${ch.id})">
                            <div>
                                <div class="chapter-title">${ch.title}</div>
                                <div class="chapter-views">${ch.views || 0} views</div>
                            </div>
                            <div>&#9658;</div>
                        </div>
                    `).join('')}
                </div>
            ` : `
                <p style="padding:24px; color: var(--text-muted);">Belum ada chapter. ${isAuthor ? 'Klik "Tambah Chapter" untuk memulai menulis!' : ''}</p>
            `}
        </div>

        <div class="rating-section">
            <h3>Berikan Rating</h3>
            <div class="stars" id="starRating">
                ${[1,2,3,4,5].map(i => `
                    <span class="star" data-rating="${i}" onclick="rateNovel(${i})">&#9733;</span>
                `).join('')}
            </div>
            <div id="ratingMessage"></div>
        </div>
    `;

    document.getElementById('novelDetail').innerHTML = html;

    const savedRating = localStorage.getItem(`rating_${currentNovel.id}_${currentUser?.id}`);
    if (savedRating) {
        highlightStars(parseInt(savedRating));
    }
}

function highlightStars(rating) {
    document.querySelectorAll('.star').forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function rateNovel(rating) {
    if (!currentUser) {
        showToast("Login dulu untuk memberi rating!", "warning");
        setTimeout(() => window.location.href = 'index.html', 1500);
        return;
    }

    localStorage.setItem(`rating_${currentNovel.id}_${currentUser.id}`, rating);
    highlightStars(rating);
    showToast(`Rating ${rating} bintang untuk "${currentNovel.title}"`, "success");
}

function startReading() {
    if (currentNovel.chapters?.length > 0) {
        readChapter(currentNovel.chapters[0].id);
    }
}

function readChapter(chapterId) {
    window.location.href = `read.html?novelId=${currentNovel.id}&chapterId=${chapterId}`;
}

function addToFavorites() {
    if (!currentUser) {
        showToast("Login dulu untuk menyimpan ke rak bacaan!", "warning");
        setTimeout(() => window.location.href = 'index.html', 1500);
        return;
    }

    let favorites = JSON.parse(localStorage.getItem(`favorites_${currentUser.id}`)) || [];
    if (!favorites.includes(currentNovel.id)) {
        favorites.push(currentNovel.id);
        localStorage.setItem(`favorites_${currentUser.id}`, JSON.stringify(favorites));
        showToast(`"${currentNovel.title}" disimpan ke rak bacaan!`, "success");
        const btn = document.getElementById('favoriteBtn');
        if (btn) {
            btn.textContent = 'Tersimpan';
            btn.disabled = true;
        }
    } else {
        showToast("Novel sudah ada di rak bacaan!", "info");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadUser();
    renderNovelDetail();

    document.addEventListener('click', (e) => {
        if (e.target.id === 'favoriteBtn') {
            addToFavorites();
        }
    });
});

window.readChapter = readChapter;
window.rateNovel = rateNovel;
window.startReading = startReading;
