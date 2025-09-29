document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll reveal animation
    const sr = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 2000,
        reset: true
    });
    sr.reveal('.hero-content', {});
    sr.reveal('.section-title', { delay: 200 });
    sr.reveal('.skills-container', { delay: 300 });
    sr.reveal('.project-card', { interval: 200 });

    // Typing animation
    const typingTextElement = document.querySelector('.typing-text');
    if (typingTextElement) {
        new Typed(typingTextElement, {
            strings: ['AI & Data Science Enthusiast', 'Full Stack Developer', 'Problem Solver'],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });
    }

    // Scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.id = 'scroll-to-top';
    scrollBtn.innerHTML = '↑';
    document.body.appendChild(scrollBtn);

    window.onscroll = () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    };
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});