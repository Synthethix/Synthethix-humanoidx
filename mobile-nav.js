document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (!hamburger || !navLinks) {
        console.error('Navigation elements not found');
        return;
    }

    // Ensure menu starts in closed state
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    navLinks.style.visibility = 'hidden';
    navLinks.style.opacity = '0';
    navLinks.style.transition = 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out';

    const toggleMenu = () => {
        const isActive = navLinks.classList.toggle('active');
        hamburger.classList.toggle('active', isActive);
        navLinks.style.visibility = isActive ? 'visible' : 'hidden';
        navLinks.style.opacity = isActive ? '1' : '0';
    };

    const closeMenu = () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        navLinks.style.visibility = 'hidden';
        navLinks.style.opacity = '0';
    };

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !hamburger.contains(e.target) && 
            !navLinks.contains(e.target)) {
            closeMenu();
        }
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style.visibility = 'visible';
            navLinks.style.opacity = '1';
        } else if (!navLinks.classList.contains('active')) {
            navLinks.style.visibility = 'hidden';
            navLinks.style.opacity = '0';
        }
    });
});
