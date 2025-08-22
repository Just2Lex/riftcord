(function(document){
document.addEventListener('DOMContentLoaded', function(){
// footer year
var yearEl = document.getElementById('year'); if(yearEl) yearEl.textContent = new Date().getFullYear();


var hamburger = document.getElementById('hamburger');
var nav = document.getElementById('nav');
if(hamburger && nav) hamburger.addEventListener('click', function(){ nav.style.display = nav.style.display === 'flex' ? '' : 'flex'; });


// counters animation
var easeOutCubic = function(t){ return 1 - Math.pow(1 - t, 3); };
var animateNumber = function(el, target, duration){ duration = duration || 1200; var start = 0; var range = target - start; var startTime = null; function step(ts){ if(!startTime) startTime = ts; var progress = Math.min((ts - startTime) / duration, 1); var val = Math.floor(start + range * easeOutCubic(progress)); el.textContent = val.toLocaleString(); if(progress < 1) requestAnimationFrame(step); else el.textContent = target.toLocaleString(); }; requestAnimationFrame(step); };
var statEls = document.querySelectorAll('.stat-value'); statEls.forEach(function(el){ var t = parseInt(el.getAttribute('data-target')||0,10); animateNumber(el, t); });


// demo fetch
var demoFetch = document.getElementById('demoFetch'); if(demoFetch) demoFetch.addEventListener('click', function(){ demoFetch.disabled = true; demoFetch.textContent = 'Обновление...'; setTimeout(function(){ var vals = [640,14230,48]; var els = document.querySelectorAll('.stat-value'); els.forEach(function(el,i){ el.setAttribute('data-target', vals[i]||el.getAttribute('data-target')); animateNumber(el, parseInt(el.getAttribute('data-target'))); }); demoFetch.disabled = false; demoFetch.textContent = 'Обновить'; },900); });


// copy invite buttons
var copyButtons = [document.getElementById('copyInvite'), document.getElementById('copyLinkBtn')];
copyButtons.forEach(function(btn){ if(!btn) return; btn.addEventListener('click', function(){ var url = 'https://discord.com/oauth2/authorize?client_id=1408071786545020979'; if(navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(url).then(function(){ var original = btn.innerHTML; btn.innerHTML = 'Скопировано!'; setTimeout(function(){ btn.innerHTML = original; },1300); }); } else { var tmp = document.createElement('input'); document.body.appendChild(tmp); tmp.value = url; tmp.select(); document.execCommand('copy'); document.body.removeChild(tmp); var original = btn.innerHTML; btn.innerHTML = 'Скопировано!'; setTimeout(function(){ btn.innerHTML = original; },1300); } }); });


// Playground simulation
var runBtn = document.getElementById('runCmd');
var clearBtn = document.getElementById('clearPlay');
var out = document.getElementById('playOutput');
var summoner = document.getElementById('summoner');
var cmdSelect = document.getElementById('cmdSelect');


function renderCard(title, rows){ var wrap = document.createElement('div'); wrap.className = 'result-card'; var h = document.createElement('h4'); h.textContent = title; h.style.marginTop = 0; wrap.appendChild(h); var list = document.createElement('div'); list.className = 'result-rows'; rows.forEach(function(r){ var row = document.createElement('div'); row.className = 'row'; row.innerHTML = '<strong>' + r.k + ':</strong> <span>' + r.v + '</span>'; list.appendChild(row); }); wrap.appendChild(list); return wrap; }


function simulateProfile(name){ var ranks = ['Iron','Bronze','Silver','Gold','Platinum','Diamond','Master','GrandMaster','Challenger']; var champ = ['Yasuo','Lux','Ahri','Darius','Vayne','Lee Sin','Zed']; var rand = function(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }; var rank = ranks[rand(2,6)] + ' ' + rand(0,4); var kda = (Math.random()*3+1).toFixed(2); var winrate = rand(40,66) + '%'; var topChamp = champ[rand(0,champ.length-1)]; return renderCard('Профиль: ' + name, [{k:'Ранг', v:rank}, {k:'KDA', v:kda}, {k:'Winrate', v:winrate}, {k:'Топ чемпион', v:topChamp}]); }


function simulateRecent(name){ var outcomes = ['Победа','Поражение']; var champ = ['Yasuo','Lux','Ahri','Darius','Vayne']; var rand = function(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }; var rows = Array.from({length:5}).map(function(_,i){ return {k:'Матч ' + (i+1), v: (Math.random()>0.5? 'Победа':'Поражение') + ' — ' + champ[rand(0,champ.length-1)]}; }); return renderCard('Последние матчи: ' + name, rows); }


if(runBtn){ runBtn.addEventListener('click', function(){ out.innerHTML = ''; var name = (summoner.value || 'Player').trim(); var cmd = cmdSelect.value; var loader = document.createElement('div'); loader.className = 'loader'; loader.textContent = 'Выполняется...'; out.appendChild(loader); setTimeout(function(){ out.innerHTML = ''; if(cmd === 'profile') out.appendChild(simulateProfile(name)); if(cmd === 'recent') out.appendChild(simulateRecent(name)); if(cmd === 'bind') out.appendChild(renderCard('Bind', [{k:'Инструкция', v:'Перейди в Discord и выполни /bind для привязки аккаунта'}])); if(cmd === 'quiz') out.appendChild(renderCard('Daily Quiz', [{k:'Вопрос', v:'Кто - чемпион с наибольшим растущим урон?'}, {k:'Награда', v:'Роль: Quiz Champion'}])); },800); }); }


if(clearBtn) clearBtn.addEventListener('click', function(){ if(out) out.innerHTML = '<div class="empty-state"><svg width="56" height="56" viewBox="0 0 24 24" aria-hidden><use href="#ico-discord"></use></svg><div class="muted">Здесь появится результат выполнения команды</div></div>'; });


});
})(document);