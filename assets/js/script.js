document.addEventListener('DOMContentLoaded', function() {
    // Сначала скроем экран загрузки
    const loadingScreen = document.getElementById('loading');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000);
    }

    // Инициализация частиц
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            // ... конфигурация частиц ...
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

    // Интерактивная демонстрация команд - ОБНОВЛЕННЫЙ КОД
    const demoMessages = document.getElementById('demo-messages');
    const demoInput = document.getElementById('demo-input');
    const demoSend = document.getElementById('demo-send');
    const clearChat = document.getElementById('clear-chat');
    const demoHelp = document.getElementById('demo-help');
    const commandItems = document.querySelectorAll('.command-item');

    // Ответы бота на команды - ОБНОВЛЕНО ДЛЯ ПРАВИЛЬНОГО ФОРМАТИРОВАНИЯ
    const commandResponses = {
        '!help': `<strong>Available Commands:</strong><br><br>
• <strong>Moderation</strong>: !ban, !kick, !mute, !clear<br>
• <strong>League of Legends</strong>: !stats, !match, !rank, !live<br>
• <strong>Utility</strong>: !help, !serverinfo, !userinfo, !ping<br><br>
Type a command to see how I respond!`,

        '!ban @user': `<strong>User Banned</strong><br>
User: @user<br>
Reason: Violation of server rules<br>
Duration: Permanent`,

        '!kick @user': `<strong>User Kicked</strong><br>
User: @user<br>
Reason: Inappropriate behavior`,

        '!mute @user': `<strong>User Muted</strong><br>
User: @user<br>
Duration: 1 hour<br>
Reason: Spamming`,

        '!stats Just2Lex': `<strong>Summoner Statistics</strong> - Just2Lex<br>
Level: 187<br>
Rank: Diamond III (75 LP)<br>
Winrate: 54.3%<br>
Main Role: Jungle<br>
Most Played: Lee Sin, Elise, Graves`,

        '!match Just2Lex': `<strong>Recent Match</strong> - Just2Lex<br>
Champion: Lee Sin<br>
Result: Victory (12/4/8)<br>
KDA: 12/4/8 (4.0 KDA)<br>
Length: 32:15<br>
Date: 2 hours ago`,

        '!rank Just2Lex': `<strong>Rank Information</strong> - Just2Lex<br>
Solo/Duo: Diamond III (75 LP)<br>
Flex: Platinum I (20 LP)<br>
Winrate: 54.3% (243 wins, 205 losses)`,

        '!serverinfo': `<strong>Server Information</strong><br>
Name: RiftCord Community<br>
Members: 1,243 online, 5,892 total<br>
Channels: 24 text, 8 voice<br>
Created: January 15, 2022<br>
Owner: Just2Lex#1234`,

        '!ping': `<strong>Pong!</strong> 🏓<br>
Latency: 42ms<br>
Websocket: 56ms`,

        // Добавим новые команды для расширенной функциональности
        '!live Just2Lex': `<strong>Live Game Detection</strong> - Just2Lex<br>
Status: In Game<br>
Champion: Lee Sin<br>
Mode: Ranked Solo<br>
Duration: 15:32<br>
Teammates: 4 allies detected`,

        '!champion Lee Sin': `<strong>Champion Information</strong> - Lee Sin<br>
Role: Jungler<br>
Difficulty: High<br>
Win Rate: 49.2%<br>
Ban Rate: 5.7%<br>
<em>Use !build Lee Sin for recommended items</em>`,

        '!build Lee Sin': `<strong>Recommended Build</strong> - Lee Sin<br>
1. Goredrinker<br>
2. Black Cleaver<br>
3. Sterak's Gage<br>
4. Guardian Angel<br>
5. Death's Dance<br>
Boots: Plated Steelcaps`,

        '!counter Lee Sin': `<strong>Counters</strong> - Lee Sin<br>
Strong Against: Master Yi, Shaco, Evelynn<br>
Weak Against: Udyr, Graves, Elise<br>
Ban Recommendation: Graves`,

        'default': `I don't recognize that command. Type <strong>!help</strong> to see available commands.`
    };

    // Добавление сообщения в чат
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        if (isUser) {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <img src="/riftcord/assets/images/user-avatar.png" alt="User Avatar">
                </div>
                <div class="message-content">
                    <div class="message-author">You</div>
                    <div class="message-text">${content}</div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <img src="/riftcord/assets/images/bot-avatar.png" alt="RiftCord Avatar">
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
        addMessage("Hello! I'm RiftCord, your League of Legends Discord companion. Type <strong>!help</strong> to see what I can do!");
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

    // Клик по команде в списке - ОБНОВЛЕНО: теперь команда сразу отправляется
    commandItems.forEach(item => {
        item.addEventListener('click', () => {
            const command = item.getAttribute('data-command');
            demoInput.value = command;
            sendMessage(); // Отправляем команду сразу после клика
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

    // Добавим функцию для случайных советов по League of Legends
    function showRandomTip() {
        const tips = [
            "Did you know? Lee Sin's Sonic Wave reveals enemies for 3 seconds!",
            "Pro tip: Ward enemy jungle to track their movement!",
            "Remember to check minimap every 5-10 seconds!",
            "Communication is key - use pings to coordinate with your team!",
            "Objective control wins games - prioritize dragons and Baron!"
        ];
        
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        
        // Показываем подсказку через 30 секунд после загрузки
        setTimeout(() => {
            addMessage(`<strong>Pro Tip:</strong> ${randomTip}`);
        }, 30000);
    }
    
    // Запускаем показ случайных советов
    showRandomTip();
});