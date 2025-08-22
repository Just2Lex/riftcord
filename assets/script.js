// Небольшая интерактивность: моб.меню, анимация чисел, копирование ссылки и демонстрация обновления статов.

document.addEventListener('DOMContentLoaded', () => {
  // год в футере
  document.getElementById('year').textContent = new Date().getFullYear();

  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const mobileInvite = document.getElementById('mobileInvite');

  hamburger?.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? '' : 'flex';
  });

  // Кнопка "Пригласить" в моб. меню
  mobileInvite?.addEventListener('click', () => {
    window.open('https://discord.com/oauth2/authorize?client_id=1408071786545020979', '_blank', 'noopener');
  });

  // Анимация чисел
  function animateNumber(el, target, duration = 1200) {
    const start = 0;
    const range = target - start;
    let startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const val = Math.floor(start + range * easeOutCubic(progress));
      el.textContent = val.toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString();
      }
    }
    requestAnimationFrame(step);
  }
  function easeOutCubic(t){ return 1 - Math.pow(1 - t, 3); }

  function refreshStatsFromDOM(simulated = true) {
    const els = document.querySelectorAll('.stat-value');
    els.forEach(el => {
      const target = parseInt(el.getAttribute('data-target')) || 0;
      if (simulated) {
        // небольшой рандом для демонстрации
        const jitter = Math.floor(target * (Math.random() * 0.08 - 0.04));
        animateNumber(el, Math.max(0, target + jitter));
      } else {
        animateNumber(el, target);
      }
    });
  }

  // начальная анимация
  refreshStatsFromDOM(true);

  // "Обновить демо-статус" — имитируем запрос и обновляем цифры
  const demoFetch = document.getElementById('demoFetch');
  demoFetch?.addEventListener('click', () => {
    demoFetch.disabled = true;
    demoFetch.textContent = 'Обновление...';
    // симулируем задержку запроса
    setTimeout(() => {
      // при реальной реализации здесь можно сделать fetch к своему API
      const vals = [620, 13620, 45]; // пример новых значений
      const els = document.querySelectorAll('.stat-value');
      els.forEach((el, i) => {
        el.setAttribute('data-target', vals[i] || el.getAttribute('data-target'));
      });
      refreshStatsFromDOM(false);
      demoFetch.textContent = 'Обновить демо-статус';
      demoFetch.disabled = false;
    }, 900);
  });

  // Копирование ссылки приглашения
  const copyInvite = document.getElementById('copyInvite');
  copyInvite?.addEventListener('click', async () => {
    const url = 'https://discord.com/oauth2/authorize?client_id=1408071786545020979';
    try {
      await navigator.clipboard.writeText(url);
      copyInvite.textContent = 'Скопировано!';
      setTimeout(()=> copyInvite.textContent = 'Копировать ссылку', 1300);
    } catch (e) {
      // fallback
      const tmp = document.createElement('input');
      document.body.appendChild(tmp);
      tmp.value = url;
      tmp.select();
      document.execCommand('copy');
      document.body.removeChild(tmp);
      copyInvite.textContent = 'Скопировано!';
      setTimeout(()=> copyInvite.textContent = 'Копировать ссылку', 1300);
    }
  });

  // Плавный скролл для внутренних ссылок
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (ev) => {
      ev.preventDefault();
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});
