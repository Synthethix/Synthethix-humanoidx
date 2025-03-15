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
    navLinks.style.display = 'none';

    const openMenu = () => {
        hamburger.classList.add('active');
        navLinks.classList.add('active');
        navLinks.style.display = 'flex';
    };

    const closeMenu = () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        navLinks.style.display = 'none';
    };

    const toggleMenu = () => {
        if (navLinks.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !hamburger.contains(e.target) && 
            !navLinks.contains(e.target)) {
            closeMenu();
        }
    });

    // Close menu when clicking on a nav link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
        } else if (!navLinks.classList.contains('active')) {
            navLinks.style.display = 'none';
        }
    });
});
