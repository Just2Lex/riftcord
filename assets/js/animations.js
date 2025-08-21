// Дополнительные анимации
document.addEventListener('DOMContentLoaded', function() {
    // Анимация для кнопок
    const buttons = document.querySelectorAll('.lol-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
            button.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        });
    });
    
    // Анимация для карточек
    const cards = document.querySelectorAll('.feature-card, .command-category, .stat-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        cardObserver.observe(card);
    });
    
    // Параллакс эффект для фона
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax-speed') || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Анимация для интерактивных элементов
    const interactiveElements = document.querySelectorAll('.interactive');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.05)';
            element.style.zIndex = '10';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
            element.style.zIndex = '1';
        });
    });
    
    // Анимация для текста заголовка
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 1s ease, transform 1s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Анимация появления остального контента героя
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const children = heroContent.children;
        for (let i = 0; i < children.length; i++) {
            if (children[i] !== heroTitle) {
                children[i].style.opacity = '0';
                children[i].style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    children[i].style.transition = `opacity 0.8s ease ${i * 0.2}s, transform 0.8s ease ${i * 0.2}s`;
                    children[i].style.opacity = '1';
                    children[i].style.transform = 'translateY(0)';
                }, 500);
            }
        }
    }
});