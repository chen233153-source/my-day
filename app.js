/* ==========================================================================
   app.js
   ========================================================================== */

/* ---------- state ---------- */

const KEY = 'my-day-v1';

const DEFAULTS = {
  onboarded: false,
  identity: '',
  feelings: [],
  goals: [],
  vision: '',
  habits: [],
  gratitude: [],
  days: {},
  votes: 0,
  weekly: [],
  chat: [],
  settings: { eveningHour: 21, apiKey: '', model: 'claude-sonnet-5' }
};

let S = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(DEFAULTS);
    const parsed = JSON.parse(raw);
    return { ...structuredClone(DEFAULTS), ...parsed,
             settings: { ...DEFAULTS.settings, ...(parsed.settings || {}) } };
  } catch (e) {
    console.warn('state load failed, starting fresh', e);
    return structuredClone(DEFAULTS);
  }
}

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); }
  catch (e) { toast('לא הצלחתי לשמור. אולי אין מקום בזיכרון.'); }
}

/* ---------- date helpers ---------- */

const pad = n => String(n).padStart(2, '0');
const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const shiftKey = n => { const d = new Date(); d.setDate(d.getDate() + n); return dayKey(d); };

function today() {
  const k = dayKey();
  if (!S.days[k]) S.days[k] = { big3: null, gratitudeToday: '', evening: null, addon: null };
  return S.days[k];
}

const HEB_DAYS = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];

function niceDate(key) {
  const [y, m, d] = key.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  const k = dayKey();
  if (key === k) return 'היום';
  if (key === shiftKey(-1)) return 'אתמול';
  return `יום ${HEB_DAYS[dt.getDay()]}, ${d}.${m}`;
}

/* ---------- dom helpers ---------- */

const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const CHECK = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12.5l5 5L19.5 7"/></svg>';

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

function buzz(ms = 12) { if (navigator.vibrate) try { navigator.vibrate(ms); } catch (e) {} }

/* ---------- sheet + full overlay ---------- */

function openSheet(html) {
  $('#sheet-body').innerHTML = html;
  $('#sheet').classList.add('open');
  $('#scrim').classList.add('open');
}
function closeSheet() {
  $('#sheet').classList.remove('open');
  $('#scrim').classList.remove('open');
}
$('#scrim').addEventListener('click', closeSheet);

let fullCleanup = null;
function openFull(html, cleanup) {
  $('#full-body').innerHTML = html;
  $('#full').classList.add('open');
  fullCleanup = cleanup || null;
}
function closeFull() {
  $('#full').classList.remove('open');
  $('#full-body').innerHTML = '';
  if (fullCleanup) { fullCleanup(); fullCleanup = null; }
}

/* ---------- router ---------- */

const VIEWS = ['now', 'habits', 'gratitude', 'compass', 'advisor'];
let current = 'now';

function go(view) {
  current = view;
  VIEWS.forEach(v => $('#v-' + v).classList.toggle('hide', v !== view));
  document.querySelectorAll('.nav .item').forEach(b =>
    b.classList.toggle('active', b.dataset.go === view));
  render();
  $('#v-' + view).scrollTop = 0;
}

document.querySelectorAll('[data-go]').forEach(b =>
  b.addEventListener('click', () => { buzz(); go(b.dataset.go); }));

/* ---------- votes ---------- */

function addVote(goalId) {
  S.votes++;
  if (goalId) {
    const g = S.goals.find(x => x.id === goalId);
    if (g) g.votes = (g.votes || 0) + 1;
  }
  save();
}

const celebrate = () => CELEBRATIONS[Math.floor(Math.random() * CELEBRATIONS.length)];

/* ==========================================================================
   VIEW: עכשיו
   ========================================================================== */

function phase() {
  const d = today();
  const hour = new Date().getHours();
  if (!d.big3) return 'morning';
  if (d.evening) return 'done';
  const allDone = d.big3.length > 0 && d.big3.every(t => t.done);
  if (hour >= S.settings.eveningHour || allDone) return 'evening';
  return 'day';
}

function renderNow() {
  const d = today();
  const p = phase();
  let html = '';

  if (p === 'morning')      html = nowMorning(d);
  else if (p === 'day')     html = nowDay(d);
  else if (p === 'evening') html = nowEvening(d);
  else                      html = nowDone(d);

  $('#v-now').innerHTML = html;
  wireNow(p);
}

function headerHTML(sub) {
  return `
    <div class="eyebrow">${esc(S.identity || 'אני אישה שמתחילה')}</div>
    <div class="hello">${sub}</div>
    <div class="hero">${S.votes}</div>
    <div class="hero-cap">קולות לאישה שאת בונה</div>`;
}

function tilesHTML() {
  return `
    <div class="tiles sec">
      <button class="tile t-peach" id="t-calm">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/><circle cx="12" cy="12" r="3.4"/></svg>
        <span class="lbl">רגיעה</span>
      </button>
      <button class="tile t-mint" id="t-thanks">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.4 5.6a4.6 4.6 0 0 0-6.5 0L12 7.5l-1.9-1.9a4.6 4.6 0 1 0-6.5 6.5l8.4 8.4 8.4-8.4a4.6 4.6 0 0 0 0-6.5z"/></svg>
        <span class="lbl">תודה</span>
      </button>
      <button class="tile t-lav" id="t-stuck">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.3 9.3a2.8 2.8 0 1 1 3.5 3.9v1.3"/><path d="M12 17.3h.01"/></svg>
        <span class="lbl">תקועה</span>
      </button>
    </div>`;
}

/* ---- בוקר ---- */

function greeting() {
  const h = new Date().getHours();
  if (h >= 22 || h < 5) return 'לילה טוב, חן';
  if (h >= 17) return 'ערב טוב, חן';
  if (h >= 12) return 'צהריים טובים, חן';
  return 'בוקר טוב, חן';
}

function nowMorning(d) {
  const goals = S.goals.filter(g => !g.done);

  return `
    ${headerHTML(greeting())}
    <div class="card sec">
      <div class="h">תודה אחת</div>
      <div class="capt" style="margin-top:4px">משהו קטן, ולמה הוא נגע בך.</div>
      <input class="field" id="m-grat" style="margin-top:12px" placeholder="על מה את מודה הבוקר" value="${esc(d.gratitudeToday)}">
      <input class="field" id="m-grat-why" placeholder="כי…">
    </div>

    <div class="card sec">
      <div class="h">שלוש משימות</div>
      <div class="capt" style="margin-top:4px">
        ${goals.length ? 'מהו הדבר האחד שיקדם אותך היום?' : 'אם רק הן יקרו, היום הצליח.'}
      </div>
      <div style="margin-top:14px">
        ${[0, 1, 2].map(i => `
          <input class="field" id="m-t${i}" placeholder="${i === 0 ? 'המשימה החשובה ביותר' : 'משימה ' + (i + 1) + ' (לא חובה)'}">
          ${goals.length ? `<select class="field hide" id="m-g${i}" style="margin-top:6px;font-size:14px">
            <option value="">בלי שיוך למטרה</option>
            ${goals.map(g => `<option value="${g.id}">${esc(g.title)}</option>`).join('')}
          </select>` : ''}
          ${i < 2 ? '<div style="height:12px"></div>' : ''}`).join('')}
      </div>
    </div>

    <button class="cta sec" id="m-save">שמרי וסגרי</button>
    ${addonHTML(d)}
    ${tilesHTML()}`;
}

/* ---- יום ---- */

function nowDay(d) {
  const next = d.big3.find(t => !t.done);
  const goal = next && next.goalId ? S.goals.find(g => g.id === next.goalId) : null;
  const restCount = d.big3.filter(t => !t.done).length - 1;

  return `
    <div class="eyebrow">המשימה שלך עכשיו</div>
    <div class="card" style="margin-top:16px">
      <div class="h">${esc(next.text)}</div>
      <div class="capt" style="margin-top:6px">
        ${goal ? 'מקדם: ' + esc(goal.title) + ' · ' : ''}${S.votes} קולות עד היום
      </div>
    </div>

    <div class="launch-wrap" style="margin-top:56px">
      <button class="launch" id="d-launch"><span class="ltr">5 · 4 · 3 · 2 · 1</span></button>
      <button class="outline" id="d-done" style="margin-top:32px;padding-inline:44px">עשיתי</button>
      <button class="ghost on-grad" id="d-stuck" style="margin-top:10px">תקועה</button>
    </div>

    <div class="spacer" style="min-height:20px"></div>
    ${restCount > 0 ? `<div class="capt" style="text-align:center;color:oklch(100% 0 0 / .8)">עוד ${restCount} ${restCount === 1 ? 'משימה' : 'משימות'} אחריה</div>` : ''}
    ${addonHTML(d)}
    ${tilesHTML()}`;
}

/* ---- ערב ---- */

function nowEvening(d) {
  const done = d.big3.filter(t => t.done).length;
  // אפשר להגיע למסך הערב גם באמצע היום, אם כל המשימות סומנו
  const early = new Date().getHours() < S.settings.eveningHour;
  return `
    ${headerHTML(early ? 'סיימת את הכל, חן' : greeting())}
    <div class="card sec">
      <div class="h">אבן הקסם</div>
      <div class="capt" style="margin-top:4px">מה הדבר הטוב ביותר שקרה היום? תגידי עליו תודה, ותרגישי אותה.</div>
      <textarea class="field" id="e-best" style="margin-top:12px" placeholder="הדבר הטוב ביותר של היום"></textarea>
    </div>

    <div class="card sec">
      <div class="h">מחר</div>
      <div class="capt" style="margin-top:4px">המשימה החשובה ביותר. היא תחכה לך מוכנה בבוקר.</div>
      <input class="field" id="e-tomorrow" style="margin-top:12px" placeholder="המשימה החשובה ביותר למחר">
    </div>

    <div class="card sec">
      <div class="h2">היום סימנת ${done} מתוך ${d.big3.length}</div>
      <div class="capt" style="margin-top:6px">
        ${done === d.big3.length ? 'הכל. יום שלם.' :
          done > 0 ? 'לא צריך מושלם. גמור מנצח מושלם.' :
          'יום כזה קורה. מחר זה היום שחשוב, לא אתמול.'}
      </div>
    </div>

    <button class="cta sec" id="e-save">סגרי את היום</button>
    ${tilesHTML()}`;
}

function nowDone(d) {
  return `
    ${headerHTML('היום סגור, חן')}
    <div class="card sec">
      <div class="h">הדבר הטוב של היום</div>
      <div class="body" style="margin-top:8px">${esc(d.evening.best) || '<span class="capt">לא נכתב</span>'}</div>
    </div>
    ${d.evening.tomorrow ? `
      <div class="card sec">
        <div class="h2">מחכה לך מחר</div>
        <div class="body" style="margin-top:6px">${esc(d.evening.tomorrow)}</div>
      </div>` : ''}
    <button class="ghost on-grad sec" id="e-reopen">לפתוח שוב את היום</button>
    ${tilesHTML()}`;
}

/* ---- תוסף היום ---- */

function addonForToday() {
  const epoch = Math.floor(Date.now() / 86400000);
  return ADDONS[epoch % ADDONS.length];
}

function addonHTML(d) {
  const a = addonForToday();
  if (d.addon && d.addon.id === a.id && d.addon.answer) {
    return `
      <div class="card sec">
        <div class="h2">${esc(a.title)}</div>
        <div class="body" style="margin-top:8px">${esc(d.addon.answer)}</div>
        <div class="src">${esc(a.src)}</div>
      </div>`;
  }
  return `
    <div class="card sec" id="addon-card">
      <div class="h2">${esc(a.title)}</div>
      <div class="capt" style="margin-top:6px">${esc(a.text)}</div>
      <div class="body" style="margin-top:12px;font-weight:500">${esc(a.prompt)}</div>
      ${a.type === 'choose' ? `
        <div class="pill-row" style="margin-top:12px">
          ${a.options.map((o, i) => `<button class="chip" data-opt="${i}">${esc(o)}</button>`).join('')}
        </div>` : ''}
      ${a.type === 'feelings' ? `
        <div class="pill-row" style="margin-top:12px">
          ${(S.feelings.length ? S.feelings : ['עוד לא הגדרתי תחושות ליבה']).map((f, i) =>
            S.feelings.length ? `<button class="chip" data-opt="${i}">${esc(f)}</button>` : `<span class="capt">${esc(f)}</span>`).join('')}
        </div>` : ''}
      <textarea class="field" id="addon-in" style="margin-top:12px" placeholder="בכמה מילים"></textarea>
      <div style="display:flex;gap:8px;margin-top:10px">
        <button class="outline" id="addon-save" style="flex:1">שמרי</button>
        <button class="ghost" id="addon-skip" style="flex:0 0 auto;padding-inline:16px">דלגי</button>
      </div>
      <div class="src">${esc(a.src)}</div>
    </div>`;
}

/* ---- wiring ---- */

function wireNow(p) {
  const d = today();

  $('#t-calm')?.addEventListener('click', () => { buzz(); openSOS(); });
  $('#t-thanks')?.addEventListener('click', () => { buzz(); go('gratitude'); });
  $('#t-stuck')?.addEventListener('click', () => { buzz(); openStuck(); });

  // תוסף היום
  const a = addonForToday();
  let chosen = '';
  document.querySelectorAll('#addon-card [data-opt]').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('#addon-card [data-opt]').forEach(x => x.classList.remove('on'));
    b.classList.add('on');
    chosen = b.textContent;
  }));
  $('#addon-save')?.addEventListener('click', () => {
    const txt = $('#addon-in').value.trim();
    if (!txt && !chosen) { toast('כתבי משהו קצר, או דלגי.'); return; }
    const answer = [chosen, txt].filter(Boolean).join(' · ');
    d.addon = { id: a.id, answer };
    if (a.savesAsGlimmer && txt) {
      S.gratitude.unshift({ id: uid(), text: txt, why: '', ts: Date.now(), type: 'glimmer' });
    }
    save(); buzz(); toast('נשמר.'); render();
  });
  $('#addon-skip')?.addEventListener('click', () => {
    d.addon = { id: a.id, answer: '', skipped: true }; save(); render();
  });

  if (p === 'morning') {
    $('#m-save').addEventListener('click', () => {
      const tasks = [0, 1, 2].map(i => ({
        text: $('#m-t' + i).value.trim(),
        goalId: $('#m-g' + i) ? $('#m-g' + i).value : '',
        done: false
      })).filter(t => t.text);

      if (!tasks.length) { toast('משימה אחת מספיקה כדי להתחיל.'); return; }

      const g = $('#m-grat').value.trim();
      const why = $('#m-grat-why').value.trim();
      if (g) {
        d.gratitudeToday = g;
        S.gratitude.unshift({ id: uid(), text: g, why: cleanWhy(why), ts: Date.now(), type: 'gratitude' });
      }
      d.big3 = tasks;
      save(); buzz(20); render();
    });

    // המשימה שנבחרה אתמול לערב מחר
    const y = S.days[shiftKey(-1)];
    if (y && y.evening && y.evening.tomorrow) {
      const t0 = $('#m-t0');
      if (t0 && !t0.value) t0.value = y.evening.tomorrow;
    }

    // בורר המטרה מופיע רק אחרי שנכתבה משימה, כדי לא להציף את המסך בשדות ריקים
    [0, 1, 2].forEach(i => {
      const input = $('#m-t' + i), sel = $('#m-g' + i);
      if (!input || !sel) return;
      const sync = () => sel.classList.toggle('hide', !input.value.trim());
      input.addEventListener('input', sync);
      sync();
    });
  }

  if (p === 'day') {
    $('#d-launch').addEventListener('click', () => runCountdown());
    $('#d-done').addEventListener('click', () => completeTask());
    $('#d-stuck').addEventListener('click', () => { buzz(); openStuck(); });
  }

  if (p === 'evening') {
    $('#e-save').addEventListener('click', () => {
      const best = $('#e-best').value.trim();
      const tomorrow = $('#e-tomorrow').value.trim();
      d.evening = { best, tomorrow };
      if (best) S.gratitude.unshift({ id: uid(), text: best, why: '', ts: Date.now(), type: 'stone' });
      save(); buzz(20); toast('לילה טוב.'); render();
    });
  }

  if (p === 'done') {
    $('#e-reopen').addEventListener('click', () => { d.evening = null; save(); render(); });
  }
}

function uid() { return Math.random().toString(36).slice(2, 10); }

// התצוגה מוסיפה "כי" לפני הנימוק, אז מסירים אותו אם המשתמשת כבר כתבה אותו
function cleanWhy(v) { return String(v || '').trim().replace(/^כי\s+/, ''); }

/* ---- השלמת משימה ---- */

function completeTask() {
  const d = today();
  // אפשר להגיע לכאן גם דרך זרימת התקיעות, לפני שהוגדרו משימות היום
  const t = d.big3 ? d.big3.find(x => !x.done) : null;
  if (t) { t.done = true; addVote(t.goalId); }
  else { addVote(); }
  buzz(25);
  const left = d.big3 ? d.big3.filter(x => !x.done).length : 0;
  openFull(`
    <div class="go">${esc(celebrate())}</div>
    <div class="hero" style="margin-top:18px">${S.votes}</div>
    <div class="hero-cap">קולות לאישה שאת בונה</div>
    <button class="outline" id="cel-ok" style="margin-top:40px;padding-inline:44px">${left ? 'למשימה הבאה' : 'סיימתי להיום'}</button>
  `);
  $('#cel-ok').addEventListener('click', () => { closeFull(); render(); });
  const auto = setTimeout(() => { closeFull(); render(); }, 4000);
  fullCleanup = () => clearTimeout(auto);
}

/* ---- ספירה לאחור ---- */

function runCountdown() {
  buzz(15);
  let n = 5;
  openFull(`<div class="count pulse" id="cd">5</div>`);
  const tick = setInterval(() => {
    n--;
    const el = $('#cd');
    if (!el) { clearInterval(tick); return; }
    if (n > 0) {
      el.textContent = n;
      el.classList.remove('pulse'); void el.offsetWidth; el.classList.add('pulse');
      buzz(10);
    } else {
      clearInterval(tick);
      buzz(40);
      $('#full-body').innerHTML = `
        <div class="go">זוזי. עכשיו.</div>
        <div class="on-grad" style="margin-top:14px;max-width:280px">התחילי את הפעולה הפיזית הראשונה לפני שההיסוס חוזר.</div>
        <button class="outline" id="cd-block" style="margin-top:44px;padding-inline:32px">התחלתי, תני לי 30 דקות</button>
        <button class="ghost on-grad" id="cd-close" style="margin-top:6px">סגרי</button>`;
      $('#cd-block').addEventListener('click', () => runBlock(30));
      $('#cd-close').addEventListener('click', closeFull);
    }
  }, 1000);
  fullCleanup = () => clearInterval(tick);
}

/* ---- בלוק עבודה ---- */

function runBlock(minutes) {
  const total = minutes * 60;
  let left = total;
  const R = 92, C = 2 * Math.PI * R;

  openFull(`
    <div class="eyebrow" style="color:oklch(100% 0 0 / .88)">בלוק עבודה רצוף</div>
    <div class="ring" style="margin-top:26px">
      <svg width="210" height="210">
        <circle cx="105" cy="105" r="${R}" fill="none" stroke="oklch(100% 0 0 / .22)" stroke-width="8"/>
        <circle id="bk-arc" cx="105" cy="105" r="${R}" fill="none" stroke="#fff" stroke-width="8"
                stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="0"/>
      </svg>
      <div class="val" id="bk-val">30:00</div>
    </div>
    <div class="on-grad" style="margin-top:26px;max-width:290px">
      אם עצרת באמצע, זה לא נספר. וכשתסיימי, אל תסיימי בנקודה נמוכה: עוד חמש דקות עד פתרון חלקי, כדי שמחר יהיה קל להתחיל.
    </div>
    <div style="font-size:12px;color:oklch(100% 0 0 / .8);margin-top:10px">The Now Habit · Neil Fiore</div>
    <button class="outline" id="bk-done" style="margin-top:32px;padding-inline:36px">סיימתי את הבלוק</button>
    <button class="ghost on-grad" id="bk-stop" style="margin-top:4px">עצרי</button>
  `);

  const t = setInterval(() => {
    left--;
    const v = $('#bk-val');
    if (!v) { clearInterval(t); return; }
    v.textContent = `${pad(Math.floor(left / 60))}:${pad(left % 60)}`;
    $('#bk-arc').setAttribute('stroke-dashoffset', String(C * (1 - left / total)));
    if (left <= 0) {
      clearInterval(t);
      buzz(60);
      $('#bk-val').textContent = 'סיימת';
    }
  }, 1000);

  fullCleanup = () => clearInterval(t);
  $('#bk-done').addEventListener('click', () => { clearInterval(t); fullCleanup = null; closeFull(); completeTask(); });
  $('#bk-stop').addEventListener('click', () => { clearInterval(t); fullCleanup = null; closeFull(); });
}

/* ==========================================================================
   זרימת תקיעות
   ========================================================================== */

function openStuck() {
  openSheet(`
    <div class="h">מה עוצר?</div>
    <div class="capt" style="margin-top:6px">דחיינות היא כמעט תמיד רגש, לא עצלות. תבחרי את הקרוב ביותר.</div>
    <div class="stack" style="margin-top:16px">
      ${STUCK.map(s => `<button class="field" style="text-align:right;font-weight:500" data-stuck="${s.id}">${esc(s.label)}</button>`).join('')}
    </div>
    <button class="ghost" id="stuck-cancel" style="margin-top:8px">לא עכשיו</button>
  `);
  $('#stuck-cancel').addEventListener('click', closeSheet);
  document.querySelectorAll('[data-stuck]').forEach(b =>
    b.addEventListener('click', () => stuckFlow(STUCK.find(s => s.id === b.dataset.stuck))));
}

function stuckFlow(s) {
  if (s.routeTo === 'sos') { closeSheet(); setTimeout(openSOS, 260); return; }
  let step = 0;
  const answers = {};

  function draw() {
    if (step >= s.steps.length) return finish();
    const q = s.steps[step];
    openSheet(`
      <div class="capt">${esc(s.label)} · שלב ${step + 1} מתוך ${s.steps.length}</div>
      <div class="note" style="margin-top:12px">${esc(s.lead)}</div>
      <div class="h2" style="margin-top:18px">${esc(q.q)}</div>
      ${q.options ? `<div class="stack" style="margin-top:12px">
          ${q.options.map((o, i) => `<button class="field" style="text-align:right" data-o="${i}">${esc(o)}</button>`).join('')}
        </div>` :
        `<textarea class="field" id="sf-in" style="margin-top:12px" placeholder="בכמה מילים"></textarea>
         <button class="cta" id="sf-next" style="margin-top:12px">${step === s.steps.length - 1 ? 'סיימתי' : 'הלאה'}</button>`}
      <div class="src">${esc(s.src)}</div>
    `);
    document.querySelectorAll('[data-o]').forEach(b => b.addEventListener('click', () => {
      answers[q.key] = q.options[+b.dataset.o]; step++; draw();
    }));
    $('#sf-next')?.addEventListener('click', () => {
      const v = $('#sf-in').value.trim();
      if (!v) { toast('משפט אחד מספיק.'); return; }
      answers[q.key] = v; step++; draw();
    });
  }

  function finish() {
    const replacement = s.replacesTask ? answers[s.replacesTask] : null;
    openSheet(`
      <div class="h">${esc(s.outro)}</div>
      ${Object.entries(answers).map(([k, v]) => `<div class="note" style="margin-top:10px">${esc(v)}</div>`).join('')}
      ${replacement ? `<button class="cta sec" id="sf-replace">להחליף את המשימה בזה</button>` : ''}
      <button class="outline sec" id="sf-launch" style="width:100%">5-4-3-2-1, מתחילה</button>
      <button class="ghost" id="sf-close" style="margin-top:6px">סגרי</button>
      <div class="src">${esc(s.src)}</div>
    `);
    $('#sf-close').addEventListener('click', closeSheet);
    $('#sf-replace')?.addEventListener('click', () => {
      const d = today();
      const t = d.big3 && d.big3.find(x => !x.done);
      if (t) { t.text = replacement; save(); toast('המשימה הוחלפה.'); }
      closeSheet(); render();
    });
    $('#sf-launch').addEventListener('click', () => { closeSheet(); setTimeout(runCountdown, 260); });
  }

  draw();
}

/* ==========================================================================
   SOS
   ========================================================================== */

function openSOS() {
  openSheet(`
    <div class="h">איפה את עכשיו?</div>
    <div class="capt" style="margin-top:6px">הסיפור נגרר אחרי המצב. קודם בודקים את הגוף, אחר כך את המחשבות.</div>
    <div class="stack" style="margin-top:16px">
      ${STATES.map(st => `
        <button class="field" style="text-align:right" data-state="${st.id}">
          <div style="font-weight:600">${esc(st.label)}</div>
          <div class="capt" style="margin-top:2px">${esc(st.sub)}</div>
        </button>`).join('')}
    </div>
    <button class="ghost" id="sos-cancel" style="margin-top:8px">לא עכשיו</button>
    <div class="src">Anchored · Deb Dana</div>
  `);
  $('#sos-cancel').addEventListener('click', closeSheet);
  document.querySelectorAll('[data-state]').forEach(b =>
    b.addEventListener('click', () => sosTools(STATES.find(s => s.id === b.dataset.state))));
}

function sosTools(st) {
  openSheet(`
    <div class="capt">${esc(st.label)}</div>
    <div class="h" style="margin-top:4px">מה יעזור עכשיו</div>
    <div class="stack" style="margin-top:16px">
      ${st.tools.map(id => {
        const t = TOOLS[id];
        return `<button class="field" style="text-align:right" data-tool="${id}">
          <div style="font-weight:600">${esc(t.label)}</div>
          <div class="capt" style="margin-top:2px">${esc(t.text)}</div>
        </button>`;
      }).join('')}
    </div>
    <button class="ghost" id="sos-back" style="margin-top:8px">חזרה</button>
    <div class="src">${esc(st.src)}</div>
  `);
  $('#sos-back').addEventListener('click', openSOS);
  document.querySelectorAll('[data-tool]').forEach(b =>
    b.addEventListener('click', () => runTool(b.dataset.tool)));
}

function runTool(id) {
  const t = TOOLS[id];
  closeSheet();
  setTimeout(() => {
    if (t.kind === 'breath')  return runBreath(t);
    if (t.kind === 'timer')   return runToolTimer(t);
    if (t.kind === 'list')    return runOrient(t);
    if (t.kind === 'capture') return runCapture(t);
    if (t.kind === 'scale')   return runScale(t);
    if (t.kind === 'note')    return runNote(t);
  }, 260);
}

function runBreath(t) {
  let rep = 0, idx = 0, timer = null;
  openFull(`
    <div class="eyebrow" style="color:oklch(100% 0 0 / .88)">${esc(t.label)}</div>
    <div class="breath" id="br" style="margin-top:30px">התחלנו</div>
    <div class="on-grad" id="br-rep" style="margin-top:24px">סבב 1 מתוך ${t.reps}</div>
    <button class="outline" id="br-stop" style="margin-top:36px;padding-inline:40px">סיימתי</button>
    <div style="font-size:12px;color:oklch(100% 0 0 / .8);margin-top:14px">${esc(t.src)}</div>
  `);

  function stepFn() {
    const el = $('#br');
    if (!el) return;
    const [label, secs, scale] = t.pattern[idx];
    el.style.transition = `transform ${secs}s cubic-bezier(.4,0,.5,1)`;
    el.style.transform = `scale(${scale})`;
    el.textContent = label;
    buzz(8);
    timer = setTimeout(() => {
      idx++;
      if (idx >= t.pattern.length) {
        idx = 0; rep++;
        if (rep >= t.reps) {
          el.textContent = 'זהו';
          $('#br-rep').textContent = 'סיימת. שימי לב איך הגוף מרגיש עכשיו.';
          buzz(40);
          return;
        }
        $('#br-rep').textContent = `סבב ${rep + 1} מתוך ${t.reps}`;
      }
      stepFn();
    }, secs * 1000);
  }
  setTimeout(stepFn, 400);
  fullCleanup = () => clearTimeout(timer);
  $('#br-stop').addEventListener('click', closeFull);
}

function runToolTimer(t) {
  let left = t.seconds;
  const R = 92, C = 2 * Math.PI * R;
  openFull(`
    <div class="eyebrow" style="color:oklch(100% 0 0 / .88)">${esc(t.label)}</div>
    <div class="on-grad" style="margin-top:12px;max-width:300px">${esc(t.text)}</div>
    <div class="ring" style="margin-top:24px">
      <svg width="210" height="210">
        <circle cx="105" cy="105" r="${R}" fill="none" stroke="oklch(100% 0 0 / .22)" stroke-width="8"/>
        <circle id="tt-arc" cx="105" cy="105" r="${R}" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="0"/>
      </svg>
      <div class="val" id="tt-val">${pad(Math.floor(left / 60))}:${pad(left % 60)}</div>
    </div>
    <button class="outline" id="tt-stop" style="margin-top:32px;padding-inline:40px">סיימתי</button>
    <div style="font-size:12px;color:oklch(100% 0 0 / .8);margin-top:14px">${esc(t.src)}</div>
  `);
  const tm = setInterval(() => {
    left--;
    const v = $('#tt-val');
    if (!v) { clearInterval(tm); return; }
    v.textContent = `${pad(Math.max(0, Math.floor(left / 60)))}:${pad(Math.max(0, left % 60))}`;
    $('#tt-arc').setAttribute('stroke-dashoffset', String(C * (1 - left / t.seconds)));
    if (left <= 0) { clearInterval(tm); v.textContent = 'זהו'; buzz(40); }
  }, 1000);
  fullCleanup = () => clearInterval(tm);
  $('#tt-stop').addEventListener('click', closeFull);
}

function runOrient(t) {
  let found = 0;
  openFull(`
    <div class="eyebrow" style="color:oklch(100% 0 0 / .88)">${esc(t.label)}</div>
    <div class="on-grad" style="margin-top:12px;max-width:300px">${esc(t.text)}</div>
    <div class="hero" id="or-n" style="margin-top:28px">0 / ${t.count}</div>
    <button class="launch" id="or-tap" style="margin-top:24px;width:150px;height:150px;font-size:19px">מצאתי עוד אחד</button>
    <button class="outline" id="or-stop" style="margin-top:30px;padding-inline:40px">סיימתי</button>
    <div style="font-size:12px;color:oklch(100% 0 0 / .8);margin-top:14px">${esc(t.src)}</div>
  `);
  $('#or-tap').addEventListener('click', () => {
    found = Math.min(t.count, found + 1);
    $('#or-n').textContent = `${found} / ${t.count}`;
    buzz(12);
    if (found === t.count) { $('#or-tap').textContent = 'זהו'; buzz(40); }
  });
  $('#or-stop').addEventListener('click', closeFull);
}

function runCapture(t) {
  openSheet(`
    <div class="h">${esc(t.label)}</div>
    <div class="capt" style="margin-top:6px">${esc(t.text)}</div>
    ${t.prefix ? `<div class="note" style="margin-top:14px">${esc(t.prefix)}…</div>` : ''}
    <textarea class="field" id="cap-in" style="margin-top:12px" placeholder="${esc(t.placeholder || '')}"></textarea>
    <button class="cta" id="cap-save" style="margin-top:12px">שמרי</button>
    <button class="ghost" id="cap-close" style="margin-top:4px">סגרי</button>
    <div class="src">${esc(t.src)}</div>
  `);
  $('#cap-close').addEventListener('click', closeSheet);
  $('#cap-save').addEventListener('click', () => {
    const v = $('#cap-in').value.trim();
    if (!v) { toast('משפט אחד מספיק.'); return; }
    const text = t.prefix ? `${t.prefix} ${v}` : v;
    S.gratitude.unshift({ id: uid(), text, why: '', ts: Date.now(),
                          type: t.prefix ? 'thought' : 'glimmer' });
    save(); buzz(); closeSheet(); toast('נשמר ביומן.'); render();
  });
}

function runScale(t) {
  openSheet(`
    <div class="h">${esc(t.label)}</div>
    <div class="capt" style="margin-top:6px">${esc(t.text)}</div>
    <div class="stack" style="margin-top:14px;max-height:46vh;overflow-y:auto">
      ${SCALE.map((s, i) => `<button class="field" style="text-align:right;padding:11px 14px" data-lvl="${i}">
        <span class="capt" style="margin-left:8px">${i + 1}</span>${esc(s)}</button>`).join('')}
    </div>
    <button class="ghost" id="sc-close" style="margin-top:8px">סגרי</button>
    <div class="src">${esc(t.src)}</div>
  `);
  $('#sc-close').addEventListener('click', closeSheet);
  document.querySelectorAll('[data-lvl]').forEach(b => b.addEventListener('click', () => {
    const i = +b.dataset.lvl;
    const top = i === 0;
    openSheet(`
      <div class="capt">את כאן</div>
      <div class="h" style="margin-top:2px">${esc(SCALE[i])}</div>
      <div class="note" style="margin-top:16px">
        ${top ? 'את בקצה העליון של הסולם. זה המקום לבנות תאוצה: מני בקול כמה שיותר דברים שאת מעריכה.'
              : `המדרגה הבאה מעלייך היא <b>${esc(SCALE[i - 1])}</b>. לא קופצים לפסגה. מספיק מחשבה אחת שמרגישה מעט יותר טוב.`}
      </div>
      <textarea class="field" id="sc-in" style="margin-top:12px" placeholder="מחשבה אחת שמרגישה קצת יותר טוב"></textarea>
      <button class="cta" id="sc-save" style="margin-top:12px">שמרי</button>
      <button class="ghost" id="sc-back" style="margin-top:4px">חזרה לסולם</button>
      <div class="src">${esc(t.src)}</div>
    `);
    $('#sc-back').addEventListener('click', () => runScale(t));
    $('#sc-save').addEventListener('click', () => {
      const v = $('#sc-in').value.trim();
      if (!v) { toast('משפט אחד מספיק.'); return; }
      S.gratitude.unshift({ id: uid(), text: v, why: '', ts: Date.now(), type: 'thought' });
      save(); buzz(); closeSheet(); toast('נשמר ביומן.'); render();
    });
  }));
}

function runNote(t) {
  openSheet(`
    <div class="h">${esc(t.label)}</div>
    <div class="capt" style="margin-top:8px">${esc(t.text)}</div>
    <button class="cta" id="nt-ok" style="margin-top:18px">עשיתי</button>
    <button class="ghost" id="nt-close" style="margin-top:4px">סגרי</button>
    <div class="src">${esc(t.src)}</div>
  `);
  $('#nt-close').addEventListener('click', closeSheet);
  $('#nt-ok').addEventListener('click', () => { buzz(25); closeSheet(); toast(celebrate()); });
}

/* ==========================================================================
   VIEW: הרגלים
   ========================================================================== */

function habitState(h) {
  const t = dayKey(), y = shiftKey(-1), b = shiftKey(-2);
  // הרגל לא "מפספס" ימים שקדמו ליצירתו. בלי זה, הרגל חדש נפתח בהאשמה.
  const born = h.created || Object.keys(h.log).sort()[0] || t;
  const existed = k => k >= born;
  return {
    doneToday: !!h.log[t],
    missedYesterday: existed(y) && !h.log[y],
    missedTwice: existed(b) && !h.log[y] && !h.log[b]
  };
}

function renderHabits() {
  const t = dayKey();
  const week = [...Array(7)].map((_, i) => shiftKey(-(6 - i)));

  $('#v-habits').innerHTML = `
    <div class="eyebrow">שלושה, לא יותר</div>
    <div class="hello">ההרגלים שלי</div>

    ${S.habits.length === 0 ? `
      <div class="card sec">
        <div class="h">עוד אין הרגלים</div>
        <div class="capt" style="margin-top:8px">
          מתכון אחד: אחרי משהו שכבר קורה אצלך בוודאות, פעולה של פחות מ-30 שניות, ואז חגיגה קטנה.
          קטן מדי מכדי להיכשל.
        </div>
        <div class="src">Tiny Habits · BJ Fogg</div>
      </div>` :
      S.habits.map(h => {
        const st = habitState(h);
        return `
        <div class="card sec">
          <div class="row" style="padding:0;border:none">
            <button class="dot ${st.doneToday ? 'done' : ''}" data-tick="${h.id}">${CHECK}</button>
            <div class="txt" style="font-weight:600">${esc(h.behavior)}</div>
            <button class="capt" data-edit-h="${h.id}">עריכה</button>
          </div>
          <div class="capt" style="margin-top:8px">${esc(h.anchor)}</div>
          <div class="streak">
            ${week.map(k => `<i class="${h.log[k] ? 'on' : ''} ${k === t ? 'today' : ''}">${HEB_DAYS[new Date(k.split('-')[0], k.split('-')[1] - 1, k.split('-')[2]).getDay()]}</i>`).join('')}
          </div>
          ${st.missedTwice && !st.doneToday ? `
            <div class="note peach" style="margin-top:12px">
              פספסת פעמיים. לפספס פעם אחת זו תאונה, פעמיים זו התחלה של הרגל חדש. היום זה היום שחשוב.
            </div>` :
            st.missedYesterday && !st.doneToday ? `
            <div class="note" style="margin-top:12px">אתמול פספסת. זה קורה. רק לא פעמיים ברצף.</div>` : ''}
        </div>`;
      }).join('')}

    ${S.habits.length < 3 ? `<button class="cta sec" id="h-add">להוסיף הרגל</button>` :
      `<div class="capt sec" style="text-align:center;color:oklch(100% 0 0 / .88)">שלושה זה המקסימום. ההגבלה היא התכונה.</div>`}
  `;

  document.querySelectorAll('[data-tick]').forEach(b => b.addEventListener('click', () => {
    const h = S.habits.find(x => x.id === b.dataset.tick);
    if (h.log[t]) { delete h.log[t]; S.votes = Math.max(0, S.votes - 1); save(); render(); return; }
    h.log[t] = true; addVote(); buzz(25);
    openFull(`
      <div class="go">${esc(h.celebration || celebrate())}</div>
      <div class="hero" style="margin-top:18px">${S.votes}</div>
      <div class="hero-cap">קולות לאישה שאת בונה</div>
      <button class="outline" id="cel-ok" style="margin-top:40px;padding-inline:44px">יופי</button>`);
    $('#cel-ok').addEventListener('click', () => { closeFull(); render(); });
    const auto = setTimeout(() => { closeFull(); render(); }, 3200);
    fullCleanup = () => clearTimeout(auto);
  }));

  document.querySelectorAll('[data-edit-h]').forEach(b =>
    b.addEventListener('click', () => habitSheet(S.habits.find(x => x.id === b.dataset.editH))));
  $('#h-add')?.addEventListener('click', () => habitSheet(null));
}

function habitSheet(h) {
  const isNew = !h;
  openSheet(`
    <div class="h">${isNew ? 'הרגל חדש' : 'עריכת הרגל'}</div>
    <div class="capt" style="margin-top:6px">אחרי [עוגן], אני [התנהגות זעירה]. ואז אני חוגגת.</div>

    <div class="capt" style="margin-top:16px;font-weight:600">העוגן, משהו שכבר קורה בוודאות</div>
    <input class="field" id="hb-anchor" style="margin-top:6px" placeholder="אחרי שאני מוזגת קפה" value="${esc(h?.anchor || '')}">

    <div class="capt" style="margin-top:14px;font-weight:600">ההתנהגות, פחות מ-30 שניות</div>
    <input class="field" id="hb-behavior" style="margin-top:6px" placeholder="אני כותבת שורה אחת" value="${esc(h?.behavior || '')}">

    <div class="capt" style="margin-top:14px;font-weight:600">החגיגה, מיד אחרי</div>
    <input class="field" id="hb-cel" style="margin-top:6px" placeholder="כל הכבוד לי" value="${esc(h?.celebration || '')}">

    <button class="cta" id="hb-save" style="margin-top:18px">שמרי</button>
    ${!isNew ? `<button class="ghost" id="hb-del" style="margin-top:4px">מחקי את ההרגל</button>` : ''}
    <button class="ghost" id="hb-cancel">ביטול</button>
    <div class="src">Tiny Habits · BJ Fogg</div>
  `);
  $('#hb-cancel').addEventListener('click', closeSheet);
  $('#hb-del')?.addEventListener('click', () => {
    S.habits = S.habits.filter(x => x.id !== h.id); save(); closeSheet(); render();
  });
  $('#hb-save').addEventListener('click', () => {
    const anchor = $('#hb-anchor').value.trim();
    const behavior = $('#hb-behavior').value.trim();
    const celebration = $('#hb-cel').value.trim();
    if (!anchor || !behavior) { toast('צריך עוגן והתנהגות.'); return; }
    if (isNew) S.habits.push({ id: uid(), anchor, behavior, celebration, log: {}, created: dayKey() });
    else Object.assign(h, { anchor, behavior, celebration });
    save(); closeSheet(); render();
  });
}

/* ==========================================================================
   VIEW: תודות
   ========================================================================== */

const G_LABEL = { gratitude: 'תודה', glimmer: 'נצנוץ', stone: 'אבן הקסם', thought: 'מחשבה' };

function renderGratitude() {
  const t = dayKey();
  const todayCount = S.gratitude.filter(g => dayKey(new Date(g.ts)) === t).length;

  $('#v-gratitude').innerHTML = `
    <div class="eyebrow">מסע ההערכה</div>
    <div class="hello">תודות</div>
    <div class="hero">${todayCount}</div>
    <div class="hero-cap">${todayCount === 0 ? 'עוד לא כתבת היום' : 'היום'}${todayCount >= 20 ? ' · עשרים' : todayCount >= 10 ? ' · עשר' : ''}</div>

    <div class="card sec">
      <div class="h">מה עוד</div>
      <div class="capt" style="margin-top:6px">שורה אחת בכל פעם. ה"כי" הוא מה שהופך את זה למורגש במקום למכני.</div>
      <input class="field" id="g-text" style="margin-top:12px" placeholder="אני מודה על…">
      <input class="field" id="g-why" placeholder="כי…">
      <button class="cta" id="g-add" style="margin-top:12px">הוסיפי</button>
      <div class="src">The Magic · Rhonda Byrne + Ask and It Is Given · Abraham-Hicks</div>
    </div>

    ${S.gratitude.length ? `
      <div class="card sec">
        <div class="h">היומן</div>
        ${S.gratitude.slice(0, 60).map(g => `
          <div class="entry">
            <div class="when">${niceDate(dayKey(new Date(g.ts)))} · ${G_LABEL[g.type] || 'תודה'}</div>
            <div class="what">${esc(g.text)}</div>
            ${g.why ? `<div class="why">כי ${esc(g.why)}</div>` : ''}
          </div>`).join('')}
        ${S.gratitude.length > 60 ? `<div class="capt" style="margin-top:12px">מוצגות 60 האחרונות מתוך ${S.gratitude.length}</div>` : ''}
      </div>` : ''}
  `;

  const add = () => {
    const text = $('#g-text').value.trim();
    if (!text) return;
    S.gratitude.unshift({ id: uid(), text, why: cleanWhy($('#g-why').value), ts: Date.now(), type: 'gratitude' });
    save(); buzz(12);
    const n = S.gratitude.filter(g => dayKey(new Date(g.ts)) === t).length;
    if (n === 10) toast('עשר. זה כבר מסע.');
    else if (n === 20) toast('עשרים. תרגישי את זה רגע.');
    render();
    setTimeout(() => $('#g-text')?.focus(), 30);
  };
  $('#g-add').addEventListener('click', add);
  $('#g-why').addEventListener('keydown', e => { if (e.key === 'Enter') add(); });
  $('#g-text').addEventListener('keydown', e => { if (e.key === 'Enter') $('#g-why').focus(); });
}

/* ==========================================================================
   VIEW: המצפן
   ========================================================================== */

function weekStartKey() {
  const d = new Date();
  d.setDate(d.getDate() - d.getDay()); // ראשון
  return dayKey(d);
}

function renderCompass() {
  const active = S.goals.filter(g => !g.done);
  const doneGoals = S.goals.filter(g => g.done);
  const ws = weekStartKey();
  const reviewed = S.weekly.some(w => w.weekStart === ws);

  $('#v-compass').innerHTML = `
    <div class="eyebrow">לאן אני הולכת</div>
    <div class="hello">המצפן</div>

    <div class="card sec">
      <div class="h">הזהות</div>
      <div class="capt" style="margin-top:6px">כל פעולה באפליקציה נספרת כקול בעד המשפט הזה.</div>
      <input class="field" id="c-identity" style="margin-top:12px" placeholder="אני אישה ש…" value="${esc(S.identity)}">
      <div class="src">הרגלים אטומיים · James Clear</div>
    </div>

    <div class="card sec">
      <div class="h">תחושות הליבה</div>
      <div class="capt" style="margin-top:6px">שלוש עד ארבע מילים. איך את רוצה להרגיש, לפני שאת מחליטה מה לעשות.</div>
      <input class="field" id="c-feelings" style="margin-top:12px" placeholder="רגועה, חופשייה, יוצרת" value="${esc(S.feelings.join(', '))}">
      <div class="src">The Desire Map · Danielle LaPorte</div>
    </div>

    <div class="card sec">
      <div class="h">מטרות הרבעון</div>
      <div class="capt" style="margin-top:6px">עד שלוש. 12 שבועות הם השנה שלך.</div>
      ${active.length ? active.map(g => `
        <div class="entry">
          <div class="what" style="font-weight:600">${esc(g.title)}</div>
          ${g.why ? `<div class="why">למה: ${esc(g.why)}</div>` : ''}
          ${g.tactics?.length ? `<div class="why">השבוע: ${g.tactics.map(esc).join(' · ')}</div>` : ''}
          <div style="display:flex;align-items:center;gap:12px;margin-top:8px">
            <span class="chip">${g.votes || 0} קולות</span>
            <button class="capt" data-edit-g="${g.id}">עריכה</button>
            <button class="capt" data-done-g="${g.id}">הושגה</button>
          </div>
        </div>`).join('') :
        `<div class="capt" style="margin-top:12px">עוד אין מטרות. אפשר גם להתחיל מדף החזון ולהעביר משם.</div>`}
      ${active.length < 3 ? `<button class="outline" id="c-add-goal" style="margin-top:14px;width:100%">מטרה חדשה</button>` : ''}
      <div class="src">The 12 Week Year + Your Best Year Ever</div>
    </div>

    <div class="card sec">
      <div class="h">דף החזון</div>
      <div class="capt" style="margin-top:6px">כתיבה חופשית, בלי מגבלה. מטרות, יעדים, רצונות, איך את רוצה שהחיים ייראו. כתוב בהווה, כאילו זה כבר קורה.</div>
      <textarea class="field tall" id="c-vision" style="margin-top:12px" placeholder="אני…">${esc(S.vision)}</textarea>
      <div style="display:flex;gap:8px;margin-top:10px">
        <button class="outline" id="c-vision-save" style="flex:1">שמרי</button>
        <button class="outline" id="c-vision-promote" style="flex:1">להפוך שורה למטרה</button>
      </div>
      <div class="src">Scripting · Abraham-Hicks + The Slight Edge · Jeff Olson</div>
    </div>

    <div class="card sec">
      <div class="h">הסקירה השבועית</div>
      <div class="capt" style="margin-top:6px">רבע שעה, פעם בשבוע. היעד הוא 85 אחוז ביצוע, לא מאה.</div>
      ${reviewed ? `<div class="note mint" style="margin-top:12px">השבוע כבר נסקר. ${esc(S.weekly.find(w => w.weekStart === ws).pct)}% ביצוע.</div>` :
        `<button class="outline" id="c-review" style="margin-top:12px;width:100%">להתחיל סקירה</button>`}
      ${S.weekly.length ? `<div style="margin-top:12px">${S.weekly.slice(-5).reverse().map(w =>
        `<div class="entry"><div class="when">שבוע של ${niceDate(w.weekStart)}</div>
         <div class="what">${w.pct}% ביצוע · ${w.done} מתוך ${w.planned}</div>
         ${w.notes ? `<div class="why">${esc(w.notes)}</div>` : ''}</div>`).join('')}</div>` : ''}
      <div class="src">The 12 Week Year · Brian Moran</div>
    </div>

    ${doneGoals.length ? `
      <div class="card sec">
        <div class="h">ארכיון</div>
        ${doneGoals.map(g => `<div class="entry"><div class="what">${esc(g.title)}</div>
          <div class="why">${g.votes || 0} קולות</div></div>`).join('')}
      </div>` : ''}

    <div class="card sec">
      <div class="h2">הגדרות</div>
      <div class="capt" style="margin-top:10px">שעת הערב, מתי האפליקציה עוברת לסקירת ערב</div>
      <input class="field" id="c-hour" type="number" min="17" max="23" style="margin-top:6px" value="${S.settings.eveningHour}">
      <div class="capt" style="margin-top:12px">מפתח Anthropic API, בשביל היועצת. נשמר על המכשיר הזה בלבד.</div>
      <input class="field" id="c-key" type="password" style="margin-top:6px" placeholder="sk-ant-…" value="${esc(S.settings.apiKey)}">
      <button class="outline" id="c-settings-save" style="margin-top:12px;width:100%">שמרי הגדרות</button>
      <button class="ghost" id="c-export" style="margin-top:6px">ייצוא כל הנתונים לקובץ</button>
    </div>
  `;

  const saveIdentity = () => { S.identity = $('#c-identity').value.trim(); save(); };
  $('#c-identity').addEventListener('blur', saveIdentity);
  $('#c-feelings').addEventListener('blur', () => {
    S.feelings = $('#c-feelings').value.split(',').map(s => s.trim()).filter(Boolean).slice(0, 4);
    save();
  });

  $('#c-add-goal')?.addEventListener('click', () => goalSheet(null));
  document.querySelectorAll('[data-edit-g]').forEach(b =>
    b.addEventListener('click', () => goalSheet(S.goals.find(g => g.id === b.dataset.editG))));
  document.querySelectorAll('[data-done-g]').forEach(b => b.addEventListener('click', () => {
    const g = S.goals.find(x => x.id === b.dataset.doneG);
    g.done = true; save(); buzz(30); toast('הושגה. גמור מנצח מושלם.'); render();
  }));

  $('#c-vision-save').addEventListener('click', () => {
    S.vision = $('#c-vision').value; save(); toast('נשמר.');
  });
  $('#c-vision-promote').addEventListener('click', () => {
    const lines = $('#c-vision').value.split('\n').map(s => s.trim()).filter(Boolean);
    if (!lines.length) { toast('כתבי משהו בדף החזון קודם.'); return; }
    if (S.goals.filter(g => !g.done).length >= 3) { toast('כבר יש שלוש מטרות פעילות.'); return; }
    openSheet(`
      <div class="h">איזו שורה הופכת למטרה?</div>
      <div class="stack" style="margin-top:14px;max-height:52vh;overflow-y:auto">
        ${lines.map((l, i) => `<button class="field" style="text-align:right" data-line="${i}">${esc(l)}</button>`).join('')}
      </div>
      <button class="ghost" id="vp-cancel" style="margin-top:8px">ביטול</button>`);
    $('#vp-cancel').addEventListener('click', closeSheet);
    document.querySelectorAll('[data-line]').forEach(b =>
      b.addEventListener('click', () => goalSheet(null, lines[+b.dataset.line])));
  });

  $('#c-review')?.addEventListener('click', weeklyReview);

  $('#c-settings-save').addEventListener('click', () => {
    const h = parseInt($('#c-hour').value, 10);
    if (h >= 12 && h <= 23) S.settings.eveningHour = h;
    S.settings.apiKey = $('#c-key').value.trim();
    save(); toast('נשמר.');
  });

  $('#c-export').addEventListener('click', exportData);
}

function goalSheet(g, prefill) {
  const isNew = !g;
  openSheet(`
    <div class="h">${isNew ? 'מטרה חדשה' : 'עריכת מטרה'}</div>
    <div class="capt" style="margin-top:6px">מדידה, עם תאריך בתוך 12 השבועות, ומחוץ לאזור הנוחות.</div>

    <div class="capt" style="margin-top:16px;font-weight:600">המטרה</div>
    <input class="field" id="g-title" style="margin-top:6px" placeholder="30 רילסים ברבעון" value="${esc(g?.title || prefill || '')}">

    <div class="capt" style="margin-top:14px;font-weight:600">הלמה, מה שיחזיק אותך כשקשה</div>
    <textarea class="field" id="g-why-t" style="margin-top:6px" placeholder="כי…">${esc(g?.why || '')}</textarea>

    <div class="capt" style="margin-top:14px;font-weight:600">טקטיקות שבועיות, הפעולות שבשליטתך</div>
    <input class="field" id="g-tac" style="margin-top:6px" placeholder="לכתוב 3 סקריפטים, לצלם ביום ראשון" value="${esc((g?.tactics || []).join(', '))}">

    <button class="cta" id="g-save-goal" style="margin-top:18px">שמרי</button>
    ${!isNew ? `<button class="ghost" id="g-del">מחקי</button>` : ''}
    <button class="ghost" id="g-cancel">ביטול</button>
    <div class="src">Your Best Year Ever · Michael Hyatt + The 12 Week Year</div>
  `);
  $('#g-cancel').addEventListener('click', closeSheet);
  $('#g-del')?.addEventListener('click', () => {
    S.goals = S.goals.filter(x => x.id !== g.id); save(); closeSheet(); render();
  });
  $('#g-save-goal').addEventListener('click', () => {
    const title = $('#g-title').value.trim();
    if (!title) { toast('צריך שם למטרה.'); return; }
    const why = $('#g-why-t').value.trim();
    const tactics = $('#g-tac').value.split(',').map(s => s.trim()).filter(Boolean);
    if (isNew) S.goals.push({ id: uid(), title, why, tactics, votes: 0, done: false, created: Date.now() });
    else Object.assign(g, { title, why, tactics });
    save(); closeSheet(); render();
  });
}

function weeklyReview() {
  const ws = weekStartKey();
  const keys = [...Array(7)].map((_, i) => shiftKey(-i)).filter(k => k >= ws);
  let planned = 0, done = 0;
  keys.forEach(k => {
    const d = S.days[k];
    if (d && d.big3) { planned += d.big3.length; done += d.big3.filter(t => t.done).length; }
  });
  const pct = planned ? Math.round(done / planned * 100) : 0;

  openSheet(`
    <div class="h">הסקירה השבועית</div>
    <div class="hero" style="color:var(--accent);margin-top:10px">${pct}%</div>
    <div class="capt">${done} מתוך ${planned} משימות שתכננת. היעד הוא 85 אחוז.</div>
    <div class="note ${pct >= 85 ? 'mint' : ''}" style="margin-top:16px">
      ${pct >= 85 ? 'זה הסף שמייצר תוצאות אמיתיות. שלמות אינה המטרה, עקביות היא המטרה.' :
        'מתחת ל-85. זה נתון, לא שיפוט. מתנה מאתמול שאת מקבלת היום כדי לשפר את המחר.'}
    </div>
    <div class="capt" style="margin-top:16px;font-weight:600">מה עבד, ומה חסם?</div>
    <textarea class="field" id="wr-notes" style="margin-top:6px" placeholder="בכמה מילים"></textarea>
    <button class="cta" id="wr-save" style="margin-top:14px">סגרי את השבוע</button>
    <button class="ghost" id="wr-cancel">לא עכשיו</button>
    <div class="src">The 12 Week Year + Full Focus Weekly Preview</div>
  `);
  $('#wr-cancel').addEventListener('click', closeSheet);
  $('#wr-save').addEventListener('click', () => {
    S.weekly.push({ weekStart: ws, planned, done, pct, notes: $('#wr-notes').value.trim() });
    save(); closeSheet(); buzz(30); render();
  });
}

function exportData() {
  // המפתח לא יוצא מהמכשיר בקובץ הייצוא
  const safe = { ...S, settings: { ...S.settings, apiKey: '' } };
  const blob = new Blob([JSON.stringify(safe, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `my-day-${dayKey()}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

/* ==========================================================================
   VIEW: היועצת
   ========================================================================== */

let sending = false;

function renderAdvisor() {
  const hasKey = !!S.settings.apiKey;

  $('#v-advisor').innerHTML = `
    <div class="eyebrow">14 המדריכים שלך</div>
    <div class="hello">היועצת</div>

    ${!hasKey ? `
      <div class="card sec">
        <div class="h">צריך מפתח API</div>
        <div class="capt" style="margin-top:8px">
          היועצת רצה על Claude ומשיבה רק מתוך 14 המדריכים שלך. כדי להפעיל אותה צריך מפתח
          Anthropic API, שנשמר על המכשיר הזה בלבד ולא נשלח לשום מקום חוץ מ-Anthropic.
        </div>
        <input class="field" id="a-key" type="password" style="margin-top:12px" placeholder="sk-ant-…">
        <button class="cta" id="a-key-save" style="margin-top:12px">שמרי והפעילי</button>
        <div class="capt" style="margin-top:10px">אפשר להוציא מפתח ב-console.anthropic.com תחת API Keys.</div>
      </div>` : `
      <div id="a-log" style="margin-top:20px" class="stack-lg"></div>
      <div class="card sec">
        <textarea class="field" id="a-in" placeholder="מה את רוצה לשאול או להתייעץ עליו"></textarea>
        <button class="cta" id="a-send" style="margin-top:10px">שלחי</button>
        ${S.chat.length ? `<button class="ghost" id="a-clear" style="margin-top:2px">לנקות את השיחה</button>` : ''}
      </div>
      ${!S.chat.length ? `
        <div class="card sec">
          <div class="h2">אפשר לשאול למשל</div>
          <div class="stack" style="margin-top:12px">
            ${['אני נתקעת כל בוקר לפני שאני מצלמת. מה מהמדריכים יעזור?',
               'תעזרי לי להפוך את "לפרסם יותר" למטרה רבעונית אמיתית',
               'איזה הרגל זעיר יתאים לי אחרי הקפה של הבוקר?',
               'מה ההבדל בין מה שפוג אומר על כוח רצון למה שמקגוניגל אומרת?']
              .map(q => `<button class="field" style="text-align:right" data-q="${esc(q)}">${esc(q)}</button>`).join('')}
          </div>
        </div>` : ''}`}
  `;

  if (!hasKey) {
    $('#a-key-save').addEventListener('click', () => {
      const k = $('#a-key').value.trim();
      if (!k.startsWith('sk-ant-')) { toast('המפתח אמור להתחיל ב-sk-ant-'); return; }
      S.settings.apiKey = k; save(); render();
    });
    return;
  }

  drawChat();
  $('#a-send').addEventListener('click', sendMsg);
  $('#a-clear')?.addEventListener('click', () => { S.chat = []; save(); render(); });
  document.querySelectorAll('[data-q]').forEach(b =>
    b.addEventListener('click', () => { $('#a-in').value = b.dataset.q; sendMsg(); }));
}

function drawChat() {
  const log = $('#a-log');
  if (!log) return;
  log.innerHTML = S.chat.map((m, i) => {
    if (m.role === 'user') return `<div class="msg me">${esc(m.text)}</div>`;
    return `<div class="msg ai">${esc(m.text)}</div>` +
      (m.actions || []).map((a, j) => actionCard(a, i, j)).join('');
  }).join('');
  log.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
    const [i, j] = b.dataset.act.split(':').map(Number);
    applyAction(S.chat[i].actions[j], i, j);
  }));
  log.scrollIntoView({ block: 'end' });
  $('#v-advisor').scrollTop = $('#v-advisor').scrollHeight;
}

function actionCard(a, i, j) {
  if (a.applied) return `<div class="act-card"><div class="capt">נוסף ✓ ${esc(a.title || a.text || a.behavior)}</div></div>`;
  const label = a.type === 'goal' ? 'להוסיף כמטרת רבעון' :
                a.type === 'habit' ? 'להוסיף כהרגל' : 'להוסיף כמשימה להיום';
  const body = a.type === 'goal' ? `<b>${esc(a.title)}</b>${a.why ? `<div class="capt" style="margin-top:4px">למה: ${esc(a.why)}</div>` : ''}${a.tactics?.length ? `<div class="capt">השבוע: ${a.tactics.map(esc).join(' · ')}</div>` : ''}` :
               a.type === 'habit' ? `<b>${esc(a.anchor)}, ${esc(a.behavior)}</b>` :
               `<b>${esc(a.text)}</b>`;
  return `<div class="act-card">${body}
    <button class="outline" style="margin-top:10px;width:100%;background:transparent" data-act="${i}:${j}">${label}</button></div>`;
}

function applyAction(a, i, j) {
  if (a.type === 'goal') {
    if (S.goals.filter(g => !g.done).length >= 3) { toast('כבר יש שלוש מטרות פעילות.'); return; }
    S.goals.push({ id: uid(), title: a.title, why: a.why || '', tactics: a.tactics || [], votes: 0, done: false, created: Date.now() });
  } else if (a.type === 'habit') {
    if (S.habits.length >= 3) { toast('כבר יש שלושה הרגלים.'); return; }
    S.habits.push({ id: uid(), anchor: a.anchor, behavior: a.behavior, celebration: a.celebration || '', log: {}, created: dayKey() });
  } else if (a.type === 'task') {
    const d = today();
    if (!d.big3) d.big3 = [];
    if (d.big3.length >= 3) { toast('כבר יש שלוש משימות היום.'); return; }
    d.big3.push({ text: a.text, goalId: '', done: false });
  } else {
    toast('לא הצלחתי להוסיף את זה.');
    return;
  }
  a.applied = true;
  save(); buzz(25); toast('נוסף.'); drawChat();
}

function parseActions(text) {
  const actions = [];
  const clean = text.replace(/<<ACTION>>([\s\S]*?)<<END>>/g, (_, json) => {
    try {
      const a = JSON.parse(json.trim());
      if (a && a.type) actions.push(a);
    } catch (e) { /* בלוק פגום, מתעלמים */ }
    return '';
  }).trim();
  return { clean, actions };
}

async function sendMsg() {
  if (sending) return;
  const inp = $('#a-in');
  const text = inp.value.trim();
  if (!text) return;
  inp.value = '';
  S.chat.push({ role: 'user', text });
  save(); drawChat();

  sending = true;
  const log = $('#a-log');
  log.insertAdjacentHTML('beforeend', `<div class="msg ai" id="a-wait"><span class="dots"><i></i><i></i><i></i></span></div>`);
  $('#v-advisor').scrollTop = $('#v-advisor').scrollHeight;

  const context = buildContext();

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': S.settings.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: S.settings.model,
        max_tokens: 4096,
        output_config: { effort: 'low' },
        system: ADVISOR_SYSTEM + '\n\nההקשר של חן כרגע:\n' + context,
        messages: S.chat.slice(-11).map(m => ({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.text
        }))
      })
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(res.status === 401 ? 'המפתח לא תקין. אפשר לעדכן אותו במצפן, בהגדרות.' :
                      res.status === 429 ? 'יותר מדי בקשות. נסי שוב בעוד רגע.' :
                      `שגיאה ${res.status}. ${err.slice(0, 120)}`);
    }

    const data = await res.json();
    const raw = (data.content || []).filter(c => c.type === 'text').map(c => c.text).join('\n');
    const { clean, actions } = parseActions(raw);
    S.chat.push({ role: 'assistant', text: clean || 'לא קיבלתי תשובה. נסי שוב.', actions });
    save();
  } catch (e) {
    S.chat.push({ role: 'assistant', text: (e.message || 'לא הצלחתי להתחבר.') + '\n\nאם אין אינטרנט, כל שאר האפליקציה עובדת רגיל.' });
    save();
  } finally {
    sending = false;
    $('#a-wait')?.remove();
    render();
  }
}

function buildContext() {
  const d = today();
  const parts = [];
  if (S.identity) parts.push(`הזהות שהגדירה: ${S.identity}`);
  if (S.feelings.length) parts.push(`תחושות ליבה: ${S.feelings.join(', ')}`);
  const active = S.goals.filter(g => !g.done);
  if (active.length) parts.push('מטרות רבעון: ' + active.map(g => `${g.title}${g.why ? ` (למה: ${g.why})` : ''}`).join(' | '));
  if (S.habits.length) parts.push('הרגלים: ' + S.habits.map(h => `${h.anchor}, ${h.behavior}`).join(' | '));
  if (d.big3) parts.push('המשימות של היום: ' + d.big3.map(t => `${t.text}${t.done ? ' (בוצעה)' : ''}`).join(' | '));
  parts.push(`סך הקולות שצברה: ${S.votes}`);
  return parts.join('\n') || 'עוד לא הגדירה כלום באפליקציה.';
}

/* ==========================================================================
   אונבורדינג
   ========================================================================== */

function onboarding() {
  let step = 0;
  const draw = () => {
    if (step === 0) {
      openFull(`
        <div class="hello" style="font-size:26px">היי חן</div>
        <div class="on-grad" style="margin-top:14px;max-width:300px;line-height:1.6">
          שלוש דקות של הגדרה, פעם אחת. אחר כך כל פתיחה היא פחות מ-30 שניות.
        </div>
        <button class="outline" id="ob-next" style="margin-top:40px;padding-inline:44px">קדימה</button>`);
      $('#ob-next').addEventListener('click', () => { step++; draw(); });
    }
    else if (step === 1) {
      openFull(`
        <div class="eyebrow" style="color:oklch(100% 0 0 / .88)">1 מתוך 3</div>
        <div class="hello" style="font-size:23px;margin-top:6px">מי את רוצה להיות</div>
        <div class="on-grad" style="margin-top:12px;max-width:300px">
          לא מטרה, זהות. כל פעולה באפליקציה תיספר כקול בעד המשפט הזה.
        </div>
        <div style="width:100%;max-width:320px;margin-top:24px">
          <input class="field on-grad" id="ob-id" placeholder="אני אישה ש…">
        </div>
        <button class="outline" id="ob-next" style="margin-top:28px;padding-inline:44px">הלאה</button>
        <div style="font-size:12px;color:oklch(100% 0 0 / .8);margin-top:14px">הרגלים אטומיים · James Clear</div>`);
      $('#ob-next').addEventListener('click', () => {
        const v = $('#ob-id').value.trim();
        if (!v) { toast('משפט אחד. אפשר לשנות בכל רגע.'); return; }
        S.identity = v.startsWith('אני') ? v : 'אני אישה ש' + v;
        step++; draw();
      });
    }
    else if (step === 2) {
      openFull(`
        <div class="eyebrow" style="color:oklch(100% 0 0 / .88)">2 מתוך 3</div>
        <div class="hello" style="font-size:23px;margin-top:6px">הרגל אחד זעיר</div>
        <div class="on-grad" style="margin-top:12px;max-width:310px">
          אחרי משהו שכבר קורה אצלך בוודאות, פעולה של פחות מ-30 שניות. קטן מדי מכדי להיכשל.
        </div>
        <div style="width:100%;max-width:320px;margin-top:22px">
          <input class="field on-grad" id="ob-anchor" placeholder="אחרי שאני מוזגת קפה">
          <input class="field on-grad" id="ob-beh" placeholder="אני כותבת שורה אחת">
        </div>
        <button class="outline" id="ob-next" style="margin-top:26px;padding-inline:44px">הלאה</button>
        <button class="ghost on-grad" id="ob-skip" style="margin-top:4px">אחר כך</button>
        <div style="font-size:12px;color:oklch(100% 0 0 / .8);margin-top:10px">Tiny Habits · BJ Fogg</div>`);
      const next = () => { step++; draw(); };
      $('#ob-skip').addEventListener('click', next);
      $('#ob-next').addEventListener('click', () => {
        const a = $('#ob-anchor').value.trim(), b = $('#ob-beh').value.trim();
        if (a && b) S.habits.push({ id: uid(), anchor: a, behavior: b, celebration: '', log: {}, created: dayKey() });
        next();
      });
    }
    else if (step === 3) {
      openFull(`
        <div class="eyebrow" style="color:oklch(100% 0 0 / .88)">3 מתוך 3</div>
        <div class="hello" style="font-size:23px;margin-top:6px">מתי הערב שלך מתחיל</div>
        <div class="on-grad" style="margin-top:12px;max-width:300px">
          מהשעה הזאת האפליקציה עוברת לסקירת ערב במקום למשימות.
        </div>
        <div style="width:100%;max-width:160px;margin-top:24px">
          <input class="field on-grad" id="ob-hour" type="number" min="17" max="23" value="21"
                 style="text-align:center;font-size:22px;font-weight:700">
        </div>
        <button class="outline" id="ob-done" style="margin-top:28px;padding-inline:44px">סיימנו</button>`);
      $('#ob-done').addEventListener('click', () => {
        const h = parseInt($('#ob-hour').value, 10);
        if (h >= 12 && h <= 23) S.settings.eveningHour = h;
        S.onboarded = true; save(); buzz(30); closeFull(); render();
      });
    }
  };
  draw();
}

/* ==========================================================================
   render + boot
   ========================================================================== */

function render() {
  if (current === 'now')       renderNow();
  else if (current === 'habits')    renderHabits();
  else if (current === 'gratitude') renderGratitude();
  else if (current === 'compass')   renderCompass();
  else if (current === 'advisor')   renderAdvisor();
}

// חזרה לאפליקציה אחרי חצות, או אחרי שהיא הייתה ברקע
let lastDay = dayKey();
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    if (dayKey() !== lastDay) { lastDay = dayKey(); go('now'); }
    else render();
  }
});

if (S.onboarded) render();
else onboarding();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () =>
    navigator.serviceWorker.register('sw.js').catch(() => {}));
}
