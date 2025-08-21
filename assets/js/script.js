document.addEventListener('DOMContentLoaded', function() {
    // Инициализация частиц
    if (typeof particlesJS !== 'undefined') {
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

    // Плавная прокрутка для навигационных ссылок
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

    // Интерактивная демонстрация команд
    const demoMessages = document.getElementById('demo-messages');
    const demoInput = document.getElementById('demo-input');
    const demoSend = document.getElementById('demo-send');
    const clearChat = document.getElementById('clear-chat');
    const demoHelp = document.getElementById('demo-help');
    const commandItems = document.querySelectorAll('.command-item');

    // Ответы бота на команды
    const commandResponses = {
        '!help': `**Available Commands:**
• **Moderation**: !ban, !kick, !mute, !clear
• **League of Legends**: !stats, !match, !rank, !live
• **Utility**: !help, !serverinfo, !userinfo, !ping

Type a command to see how I respond!`,

        '!ban @user': `**User Banned**
User: @user
Reason: Violation of server rules
Duration: Permanent`,

        '!kick @user': `**User Kicked**
User: @user
Reason: Inappropriate behavior`,

        '!mute @user': `**User Muted**
User: @user
Duration: 1 hour
Reason: Spamming`,

        '!stats Just2Lex': `**Summoner Statistics** - Just2Lex
Level: 187
Rank: Diamond III (75 LP)
Winrate: 54.3%
Main Role: Jungle
Most Played: Lee Sin, Elise, Graves`,

        '!match Just2Lex': `**Recent Match** - Just2Lex
Champion: Lee Sin
Result: Victory (12/4/8)
KDA: 12/4/8 (4.0 KDA)
Length: 32:15
Date: 2 hours ago`,

        '!rank Just2Lex': `**Rank Information** - Just2Lex
Solo/Duo: Diamond III (75 LP)
Flex: Platinum I (20 LP)
Winrate: 54.3% (243 wins, 205 losses)`,

        '!serverinfo': `**Server Information**
Name: RiftCord Community
Members: 1,243 online, 5,892 total
Channels: 24 text, 8 voice
Created: January 15, 2022
Owner: Just2Lex#1234`,

        '!ping': `**Pong!** 🏓
Latency: 42ms
Websocket: 56ms`,

        'default': `I don't recognize that command. Type **!help** to see available commands.`
    };

    // Добавление сообщения в чат
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        if (isUser) {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <img src="assets/images/user-avatar.png" alt="User Avatar">
                </div>
                <div class="message-content">
                    <div class="message-author">You</div>
                    <div class="message-text">${content}</div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <img src="assets/images/bot-avatar.png" alt="RiftCord Avatar">
                </div>
                <div class="message-content">
                    <div class="message-author">RiftCord <span class="bot-tag">BOT</span></div>
                    <div class="message-text">${content}</div>
                </div>
            `;
        }
        
        demoMessages.appendChild(messageDiv);
        demoMessages.scrollTop = demoMessages.scrollHeight;
    }

    // Обработка команды
    function processCommand(command) {
        const response = commandResponses[command] || commandResponses['default'];
        addMessage(response);
    }

    // Отправка сообщения
    function sendMessage() {
        const message = demoInput.value.trim();
        if (message) {
            addMessage(message, true);
            demoInput.value = '';
            
            // Имитация задержки ответа бота
            setTimeout(() => {
                processCommand(message);
            }, 1000);
        }
    }

    // Очистка чата
    function clearChatMessages() {
        while (demoMessages.firstChild) {
            demoMessages.removeChild(demoMessages.firstChild);
        }
        addMessage("Hello! I'm RiftCord, your League of Legends Discord companion. Type **!help** to see what I can do!");
    }

    // Обработчики событий
    if (demoSend && demoInput) {
        demoSend.addEventListener('click', sendMessage);
        demoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    if (clearChat) {
        clearChat.addEventListener('click', clearChatMessages);
    }

    if (demoHelp) {
        demoHelp.addEventListener('click', () => {
            addMessage('!help', true);
            setTimeout(() => processCommand('!help'), 1000);
        });
    }

    // Клик по команде в списке
    commandItems.forEach(item => {
        item.addEventListener('click', () => {
            const command = item.getAttribute('data-command');
            demoInput.value = command;
            demoInput.focus();
        });
    });

    // Анимация появления элементов при скролле
    const animatedElements = document.querySelectorAll('.champion-card, .quest-step, .stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });

    // Копирование кода
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const code = button.getAttribute('data-code');
            navigator.clipboard.writeText(code).then(() => {
                const originalHtml = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    button.innerHTML = originalHtml;
                }, 2000);
            });
        });
    });

    // Анимация статистики
    const statNumbers = document.querySelectorAll('.stat-number');
    const options = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target, 0, parseInt(entry.target.textContent), 2000);
                numberObserver.unobserve(entry.target);
            }
        });
    }, options);
    
    statNumbers.forEach(number => {
        numberObserver.observe(number);
    });
    
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start) + '+';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});