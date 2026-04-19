// THEME.JS - Dark/Light mode

function initTheme() {
    const savedTheme = localStorage.getItem('novelkita_theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    } else {
        document.body.setAttribute('data-theme', 'light');
    }
}

function toggleTheme() {
    const current = document.body.getAttribute('data-theme');
    if (current === 'dark') {
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem('novelkita_theme', 'light');
    } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('novelkita_theme', 'dark');
    }
}

initTheme();