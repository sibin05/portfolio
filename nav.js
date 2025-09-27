const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('.nav-link');
const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-links');

// Shrink nav on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('nav-shrink');
    } else {
        nav.classList.remove('nav-shrink');
    }
});

// Section highlighting (scroll-based, reliable for all browsers)
function activateNavLink() {
    const sections = document.querySelectorAll('section[id]');
    let index = sections.length;
    while (--index >= 0) {
        if (window.scrollY + 80 >= sections[index].offsetTop) {
            navLinks.forEach(link => link.classList.remove('active'));
            const id = sections[index].id;
            const activeLink = document.querySelector('.nav-link[href="#' + id + '"]');
            if (activeLink) activeLink.classList.add('active');
            break;
        }
    }
}
window.addEventListener('scroll', activateNavLink);
document.addEventListener('DOMContentLoaded', activateNavLink);

// Mobile menu toggle
burger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    burger.classList.toggle('active');
});