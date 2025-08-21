// Основной функционал сайта
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing scripts...');
    
    // Инициализация
    initParticles();
    initChampionIcons();
    initNavigation();
    initScrollAnimations();
    initModal();
    hideLoadingScreen();
    
    // Инициализация частиц
    function initParticles() {
        if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: "#C8AA6E" },
                    shape: { type: "circle" },
                    opacity: { value: 0.5, random: true },
                    size: { value: 3, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#C8AA6E",
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "repulse" },
                        onclick: { enable: true, mode: "push" },
                        resize: true
                    }
                },
                retina_detect: true
            });
        }
    }
    
    // Инициализация иконок чемпионов
    function initChampionIcons() {
        const championIcons = document.querySelectorAll('.champion-icon');
        championIcons.forEach(icon => {
            icon.addEventListener('click', () => {
                const champion = icon.getAttribute('data-champion');
                showChampionModal(champion);
            });
        });
    }
    
    // Показ модального окна с информацией о чемпионе
    function showChampionModal(champion) {
        const modal = document.getElementById('champion-modal');
        const championData = getChampionData(champion);
        
        if (championData && modal) {
            document.getElementById('modal-champion-name').textContent = championData.name;
            document.getElementById('modal-champion-role').textContent = championData.role;
            document.getElementById('modal-champion-difficulty').textContent = championData.difficulty;
            
            const abilitiesList = document.getElementById('modal-champion-abilities');
            abilitiesList.innerHTML = '';
            
            championData.abilities.forEach(ability => {
                const li = document.createElement('li');
                li.textContent = ability;
                abilitiesList.appendChild(li);
            });
            
            // Установка изображения (заглушка)
            const championImg = document.getElementById('modal-champion-img');
            if (championImg) {
                championImg.src = `assets/images/champions/${champion}.jpg`;
                championImg.alt = championData.name;
            }
            
            modal.style.display = 'flex';
        }
    }
    
    // Данные о чемпионах (заглушка)
    function getChampionData(champion) {
        const champions = {
            'lee-sin': {
                name: 'Lee Sin',
                role: 'Jungler',
                difficulty: 'High',
                abilities: ['Sonic Wave', 'Safeguard', 'Tempest', 'Dragon\'s Rage']
            },
            'ahri': {
                name: 'Ahri',
                role: 'Mid Laner',
                difficulty: 'Medium',
                abilities: ['Orb of Deception', 'Fox-Fire', 'Charm', 'Spirit Rush']
            },
            'yasuo': {
                name: 'Yasuo',
                role: 'Mid Laner',
                difficulty: 'High',
                abilities: ['Steel Tempest', 'Wind Wall', 'Sweeping Blade', 'Last Breath']
            },
            'lux': {
                name: 'Lux',
                role: 'Support',
                difficulty: 'Low',
                abilities: ['Light Binding', 'Prismatic Barrier', 'Lucent Singularity', 'Final Spark']
            },
            'darius': {
                name: 'Darius',
                role: 'Top Laner',
                difficulty: 'Medium',
                abilities: ['Decimate', 'Crippling Strike', 'Apprehend', 'Noxian Guillotine']
            }
        };
        
        return champions[champion] || null;
    }
    
    // Инициализация модального окна
    function initModal() {
        const modal = document.getElementById('champion-modal');
        const closeBtn = document.querySelector('.close-modal');
        
        if (!modal || !closeBtn) return;
        
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Инициализация навигации
    function initNavigation() {
        // Плавная прокрутка
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Мобильное меню
        const hamburger = document.querySelector('.nav-hamburger');
        if (hamburger) {
            hamburger.addEventListener('click', () => {
                const navItems = document.querySelector('.nav-items');
                const navActions = document.querySelector('.nav-actions');
                
                if (navItems && navActions) {
                    navItems.classList.toggle('active');
                    navActions.classList.toggle('active');
                    hamburger.classList.toggle('active');
                }
            });
        }
    }
    
    // Анимации при скролле
    function initScrollAnimations() {
        const sections = document.querySelectorAll('.lol-section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    // Скрытие экрана загрузки
    function hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1500);
        }
    }
});