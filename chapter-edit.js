// CHAPTER-EDIT.JS

let currentUser = null;
let currentNovel = null;
let editingChapterId = null;

function loadUser() {
    const saved = localStorage.getItem('novelkita_currentUser');
    if (!saved) {
        window.location.href = 'index.html';
        return;
    }
    currentUser = JSON.parse(saved);
    if (currentUser.role !== 'author') {
        showToast("Hanya penulis yang bisa menambah chapter!", "error");
        setTimeout(() => window.location.href = 'home.html', 1500);
        return;
    }
    updateNavbar();
    loadChapterData();
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

function loadChapterData() {
    const params = new URLSearchParams(window.location.search);
    const novelId = parseInt(params.get('novelId'));
    editingChapterId = params.get('chapterId') ? parseInt(params.get('chapterId')) : null;

    if (!novelId) {
        showToast("Novel tidak ditemukan!", "error");
        setTimeout(() => window.location.href = 'dashboard.html', 1500);
        return;
    }

    currentNovel = getNovelById(novelId);
    if (!currentNovel) {
        showToast("Novel tidak ditemukan!", "error");
        setTimeout(() => window.location.href = 'dashboard.html', 1500);
        return;
    }

    if (currentNovel.author_id !== currentUser.id) {
        showToast("Kamu tidak berhak mengedit novel ini!", "error");
        setTimeout(() => window.location.href = 'dashboard.html', 1500);
        return;
    }

    document.getElementById('novelBadge').textContent = `Novel: ${currentNovel.title}`;

    if (editingChapterId) {
        const chapter = getChapterById(editingChapterId);
        if (chapter) {
            document.getElementById('pageTitle').textContent = 'Edit Chapter';
            document.getElementById('chapterTitle').value = chapter.title;
            document.getElementById('chapterContent').value = chapter.content || '';
            updateWordCount();
        }
    }

    renderChapterList();
}

function renderChapterList() {
    const section = document.getElementById('chapterListSection');
    const container = document.getElementById('chapterListContainer');

    if (!currentNovel.chapters || currentNovel.chapters.length === 0) {
        section.style.display = 'none';
        return;
    }

    section.style.display = 'block';
    container.innerHTML = currentNovel.chapters.map(ch => `
        <div class="chapter-item-manage">
            <div>
                <div style="font-weight:500;">${ch.title}</div>
                <div style="font-size:12px; color: var(--text-muted);">${ch.views || 0} views</div>
            </div>
            <div class="chapter-item-actions">
                <button class="icon-btn" onclick="editChapter(${ch.id})">Edit</button>
                <button class="icon-btn danger" onclick="deleteChapter(${ch.id})">Hapus</button>
            </div>
        </div>
    `).join('');
}

function editChapter(chapterId) {
    const chapter = getChapterById(chapterId);
    if (!chapter) return;

    editingChapterId = chapterId;
    document.getElementById('pageTitle').textContent = 'Edit Chapter';
    document.getElementById('chapterTitle').value = chapter.title;
    document.getElementById('chapterContent').value = chapter.content || '';
    updateWordCount();

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteChapter(chapterId) {
    if (!confirm('Yakin ingin menghapus chapter ini?')) return;

    const chapterIndex = currentNovel.chapters.findIndex(ch => ch.id === chapterId);
    if (chapterIndex !== -1) {
        currentNovel.chapters.splice(chapterIndex, 1);
        delete MOCK_CHAPTERS[chapterId];
        showToast("Chapter berhasil dihapus!", "success");
        renderChapterList();
    }
}

function updateWordCount() {
    const content = document.getElementById('chapterContent')?.value || '';
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    const wordCountEl = document.getElementById('wordCount');
    if (wordCountEl) wordCountEl.textContent = `${words} kata`;
}

function goBack() {
    if (currentNovel) {
        window.location.href = `novel-detail.html?id=${currentNovel.id}`;
    } else {
        window.location.href = 'dashboard.html';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadUser();

    document.getElementById('chapterContent')?.addEventListener('input', updateWordCount);

    document.getElementById('chapterForm')?.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('chapterTitle').value.trim();
        const content = document.getElementById('chapterContent').value.trim();

        if (!title) {
            showToast("Judul chapter wajib diisi!", "error");
            return;
        }

        if (editingChapterId) {
            const chapterMeta = currentNovel.chapters.find(ch => ch.id === editingChapterId);
            if (chapterMeta) chapterMeta.title = title;
            if (MOCK_CHAPTERS[editingChapterId]) {
                MOCK_CHAPTERS[editingChapterId].title = title;
                MOCK_CHAPTERS[editingChapterId].content = content;
            }
            showToast("Chapter berhasil diperbarui!", "success");
            editingChapterId = null;
            document.getElementById('pageTitle').textContent = 'Tambah Chapter';
        } else {
            const newId = Date.now();
            const order = (currentNovel.chapters?.length || 0) + 1;

            if (!currentNovel.chapters) currentNovel.chapters = [];
            currentNovel.chapters.push({
                id: newId,
                title,
                order,
                views: 0
            });

            MOCK_CHAPTERS[newId] = {
                id: newId,
                novel_id: currentNovel.id,
                title,
                content,
                views: 0,
                created_at: new Date().toISOString().split('T')[0]
            };

            showToast("Chapter berhasil ditambahkan!", "success");
        }

        document.getElementById('chapterTitle').value = '';
        document.getElementById('chapterContent').value = '';
        updateWordCount();
        renderChapterList();
    });
});

window.editChapter = editChapter;
window.deleteChapter = deleteChapter;
window.goBack = goBack;
