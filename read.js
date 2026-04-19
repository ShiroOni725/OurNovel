// READ.JS

let currentUser = null;
let currentNovel = null;
let currentChapter = null;
let allChapters = [];
let currentFontSize = 18;

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

function getParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        novelId: parseInt(params.get('novelId')),
        chapterId: parseInt(params.get('chapterId'))
    };
}

function loadChapterData() {
    const { novelId, chapterId } = getParams();
    currentNovel = getNovelById(novelId);
    currentChapter = getChapterById(chapterId);
    
    if (!currentNovel || !currentChapter) {
        document.getElementById('chapterView').innerHTML = `
            <div class="empty-state">
                <p>Chapter tidak ditemukan.</p>
                <a href="home.html" class="btn-primary">Kembali ke Home</a>
            </div>
        `;
        return;
    }
    
    // Get all chapters of this novel
    allChapters = currentNovel.chapters || [];
    
    renderChapter();
    updateReadingProgress();
}

function renderChapter() {
    const currentIndex = allChapters.findIndex(ch => ch.id === currentChapter.id);
    const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
    const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;
    
    const html = `
        <h1 class="chapter-title">${currentChapter.title}</h1>
        <div class="chapter-content" id="chapterContent" style="font-size: ${currentFontSize}px">
            ${currentChapter.content?.replace(/\n/g, '<br><br>') || 'Konten belum tersedia.'}
        </div>
        <div class="reading-nav">
            ${prevChapter ? `
                <button class="btn-secondary" onclick="goToChapter(${prevChapter.id})">
                    ← ${prevChapter.title}
                </button>
            ` : '<div></div>'}
            ${nextChapter ? `
                <button class="btn-primary" onclick="goToChapter(${nextChapter.id})">
                    ${nextChapter.title} →
                </button>
            ` : ''}
        </div>
    `;
    
    document.getElementById('chapterView').innerHTML = html;
    
    // Restore scroll position
    const savedPosition = localStorage.getItem(`reading_${currentNovel.id}_${currentChapter.id}_${currentUser?.id}`);
    if (savedPosition) {
        setTimeout(() => {
            window.scrollTo(0, parseInt(savedPosition));
        }, 100);
    }
}

function goToChapter(chapterId) {
    // Save current scroll position
    saveScrollPosition();
    window.location.href = `read.html?novelId=${currentNovel.id}&chapterId=${chapterId}`;
}

function saveScrollPosition() {
    if (currentUser && currentNovel && currentChapter) {
        localStorage.setItem(`reading_${currentNovel.id}_${currentChapter.id}_${currentUser.id}`, window.scrollY);
    }
}

function updateReadingProgress() {
    if (currentUser && currentNovel && currentChapter) {
        // Just save on scroll
        window.addEventListener('scroll', () => {
            saveScrollPosition();
        });
    }
}

function adjustFontSize(delta) {
    currentFontSize = Math.min(32, Math.max(12, currentFontSize + delta));
    const content = document.getElementById('chapterContent');
    if (content) {
        content.style.fontSize = `${currentFontSize}px`;
    }
    localStorage.setItem('novelkita_fontSize', currentFontSize);
}

function loadFontSize() {
    const saved = localStorage.getItem('novelkita_fontSize');
    if (saved) {
        currentFontSize = parseInt(saved);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadUser();
    loadFontSize();
    loadChapterData();
    
    document.getElementById('decreaseFontBtn')?.addEventListener('click', () => adjustFontSize(-2));
    document.getElementById('increaseFontBtn')?.addEventListener('click', () => adjustFontSize(2));
    document.getElementById('themeToggleReading')?.addEventListener('click', toggleTheme);
    
    window.addEventListener('beforeunload', () => {
        saveScrollPosition();
    });
});

window.goToChapter = goToChapter;