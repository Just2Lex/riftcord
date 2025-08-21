// Демо-чат функционал
document.addEventListener('DOMContentLoaded', function() {
    // Глобальная функция для добавления сообщений в демо-чат
    window.addDemoMessage = function(content, isUser = false) {
        const demoChat = document.querySelector('.demo-chat');
        if (!demoChat) return;
        
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
        
        demoChat.appendChild(messageDiv);
        demoChat.scrollTop = demoChat.scrollHeight;
        
        // Анимация печатания для сообщений бота
        if (!isUser) {
            const messageText = messageDiv.querySelector('.message-text');
            messageText.classList.add('typing');
            setTimeout(() => {
                messageText.classList.remove('typing');
            }, 1000);
        }
    };
    
    // Инициализация демо-чата
    function initDemoChat() {
        const demoScenarios = document.querySelectorAll('.demo-scenario-btn');
        demoScenarios.forEach(btn => {
            btn.addEventListener('click', () => {
                // Убираем активный класс у всех кнопок
                demoScenarios.forEach(b => b.classList.remove('active'));
                // Добавляем активный класс к текущей кнопке
                btn.classList.add('active');
                
                // Загружаем соответствующий сценарий
                const scenario = btn.getAttribute('data-scenario');
                loadDemoScenario(scenario);
            });
        });
        
        // Загружаем начальный сценарий
        loadDemoScenario('welcome');
    }
    
    // Загрузка сценария демо-чата
    function loadDemoScenario(scenario) {
        const demoChat = document.querySelector('.demo-chat');
        if (!demoChat) return;
        
        // Очищаем чат
        demoChat.innerHTML = '';
        
        // Загружаем сообщения для выбранного сценария
        switch(scenario) {
            case 'welcome':
                addWelcomeMessages();
                break;
            case 'moderation':
                addModerationMessages();
                break;
            case 'stats':
                addStatsMessages();
                break;
            case 'utility':
                addUtilityMessages();
                break;
        }
    }
    
    // Сообщения для сценария приветствия
    function addWelcomeMessages() {
        setTimeout(() => {
            window.addDemoMessage("Hello! I'm Bot RiftCord, your League of Legends Discord companion. Type <strong>!help</strong> to see what I can do!");
        }, 500);
        
        setTimeout(() => {
            window.addDemoMessage("I can help you with moderation, League of Legends statistics, and various utility functions for your Discord server.");
        }, 2000);
        
        setTimeout(() => {
            window.addDemoMessage("Try selecting different scenarios from the tabs above to see me in action!");
        }, 3500);
    }
    
    // Сообщения для сценария модерации
    function addModerationMessages() {
        setTimeout(() => {
            window.addDemoMessage("Welcome to the moderation demo! Here are some things I can help with:");
        }, 500);
        
        setTimeout(() => {
            window.addDemoMessage("• Automatically detect and remove spam<br>• Manage user roles and permissions<br>• Kick or ban problematic users<br>• Keep logs of all moderation actions");
        }, 1500);
        
        setTimeout(() => {
            window.addDemoMessage("Try these commands in the demo:<br><code>!ban @user</code><br><code>!mute @user</code><br><code>!clear 10</code>");
        }, 3500);
    }
    
    // Сообщения для сценария статистики
    function addStatsMessages() {
        setTimeout(() => {
            window.addDemoMessage("League of Legends statistics at your fingertips! Here's what I can show you:");
        }, 500);
        
        setTimeout(() => {
            window.addDemoMessage("• Summoner profile information<br>• Live game tracking<br>• Match history with detailed stats<br>• Champion mastery and rankings");
        }, 1500);
        
        setTimeout(() => {
            window.addDemoMessage("Try these commands in the demo:<br><code>!stats SummonerName</code><br><code>!match SummonerName</code><br><code>!rank SummonerName</code>");
        }, 3500);
    }
    
    // Сообщения для сценария утилит
    function addUtilityMessages() {
        setTimeout(() => {
            window.addDemoMessage("Utility commands to enhance your Discord experience:");
        }, 500);
        
        setTimeout(() => {
            window.addDemoMessage("• Server information and statistics<br>• User profile lookup<br>• Custom command creation<br>• Automated welcome messages<br>• Role management and assignment");
        }, 1500);
        
        setTimeout(() => {
            window.addDemoMessage("Try these commands in the demo:<br><code>!serverinfo</code><br><code>!userinfo @user</code><br><code>!help</code>");
        }, 3500);
    }
    
    // Инициализация при загрузке
    initDemoChat();
});