// Menu toggle functionality
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Reveal elements on scroll
function revealOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .command-category, .contact-link');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Initialize reveal on scroll
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Add active class to elements for animation
document.querySelectorAll('.feature-card, .command-category, .contact-link').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Reveal elements function
revealOnScroll();

// Update reveal function to handle the animation
const originalRevealOnScroll = revealOnScroll;
revealOnScroll = function() {
    originalRevealOnScroll();
    
    document.querySelectorAll('.feature-card, .command-category, .contact-link').forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Partner logos animation
const partnerLogos = document.querySelectorAll('.partner-logos img');
partnerLogos.forEach(logo => {
    logo.addEventListener('mouseenter', () => {
        logo.style.transform = 'scale(1.1)';
    });
    
    logo.addEventListener('mouseleave', () => {
        logo.style.transform = 'scale(1)';
    });
});

// Current year for footer
document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-bottom p');
    
    if (yearElement) {
        yearElement.textContent = yearElement.textContent.replace('2023', currentYear);
    }
});