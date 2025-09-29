const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check saved theme preference on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    body.classList.remove('light-theme');
    if (themeToggle) {
        themeToggle.checked = true;
    }
} else {
    body.classList.add('light-theme');
    body.classList.remove('dark-theme');
}

// Theme toggle functionality
if (themeToggle) {
    themeToggle.addEventListener('change', () => {
        body.classList.toggle('dark-theme');
        body.classList.toggle('light-theme');
        const newTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
    });
}