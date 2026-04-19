// NOVEL-EDIT.JS

let currentUser = null;
let editingNovelId = null;
let isNew = false;

function loadUser() {
    const saved = localStorage.getItem('novelkita_currentUser');
    if (!saved) {
        window.location.href = 'index.html';
        return;
    }
    currentUser = JSON.parse(saved);
    if (currentUser.role !== 'author') {
        showToast("Hanya penulis yang bisa membuat novel!", "error");
        setTimeout(() => window.location.href = 'home.html', 1500);
        return;
    }
    updateNavbar();
    loadNovelData();
}

function updateNavbar() {
    const navLinks = document.getElementById('navLinks');
    if (!navLinks) return;

    navLinks.innerHTML = `
        <a href="home.html" class="nav-link">Home</a>
        <a href="dashboard.html" class="nav-link">Dashboard</a>
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

function loadNovelData() {
    const params = new URLSearchParams(window.location.search);
    isNew = params.get('new') === 'true';
    editingNovelId = params.get('id') ? parseInt(params.get('id')) : null;

    if (isNew || !editingNovelId) {
        document.getElementById('pageTitle').textContent = 'Novel Baru';
        document.getElementById('saveBtn').textContent = 'Buat Novel';
        return;
    }

    const novel = getNovelById(editingNovelId);
    if (!novel) {
        showToast("Novel tidak ditemukan!", "error");
        setTimeout(() => window.location.href = 'dashboard.html', 1500);
        return;
    }

    if (novel.author_id !== currentUser.id) {
        showToast("Kamu tidak berhak mengedit novel ini!", "error");
        setTimeout(() => window.location.href = 'dashboard.html', 1500);
        return;
    }

    document.getElementById('pageTitle').textContent = 'Edit Novel';
    document.getElementById('novelTitle').value = novel.title;
    document.getElementById('novelGenre').value = novel.genre;
    document.getElementById('novelDesc').value = novel.description || '';

    const statusRadio = document.querySelector(`input[name="novelStatus"][value="${novel.status}"]`);
    if (statusRadio) statusRadio.checked = true;
}

document.getElementById('novelForm')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('novelTitle').value.trim();
    const genre = document.getElementById('novelGenre').value;
    const description = document.getElementById('novelDesc').value.trim();
    const status = document.querySelector('input[name="novelStatus"]:checked')?.value || 'draft';

    if (!title || !genre) {
        showToast("Judul dan genre wajib diisi!", "error");
        return;
    }

    if (isNew || !editingNovelId) {
        const newNovel = {
            id: MOCK_NOVELS.length + 1,
            title,
            author_id: currentUser.id,
            author_name: currentUser.username,
            genre,
            description,
            cover: null,
            status,
            views: 0,
            likes: 0,
            rating: 0,
            created_at: new Date().toISOString().split('T')[0],
            chapters: []
        };
        MOCK_NOVELS.push(newNovel);
        showToast("Novel berhasil dibuat!", "success");
    } else {
        const novelIndex = MOCK_NOVELS.findIndex(n => n.id === editingNovelId);
        if (novelIndex !== -1) {
            MOCK_NOVELS[novelIndex].title = title;
            MOCK_NOVELS[novelIndex].genre = genre;
            MOCK_NOVELS[novelIndex].description = description;
            MOCK_NOVELS[novelIndex].status = status;
        }
        showToast("Novel berhasil diperbarui!", "success");
    }

    setTimeout(() => window.location.href = 'dashboard.html', 1000);
});

document.addEventListener('DOMContentLoaded', loadUser);
