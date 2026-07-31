/* ==========================================================================
   shots.mjs — מצלם כל מסך באפליקציה לקובץ PNG נפרד, בתיקיית screens/
   הרצה:  node shots.mjs        (השרת חייב לרוץ על 4180)
   ========================================================================== */

import { chromium } from 'playwright-core';
import { mkdirSync, rmSync } from 'node:fs';

const APP = 'http://localhost:4180';
const OUT = new URL('./screens/', import.meta.url).pathname;
const EXE = '/Users/chen/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';

const W = 390, H = 844;
const KEY = 'my-day-v1';
const wait = ms => new Promise(r => setTimeout(r, ms));

/* ---------- מצבי נתונים ---------- */

const day = n => {
  const d = new Date(); d.setDate(d.getDate() + n);
  const p = x => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

const HABIT = { id: 'h1', anchor: 'אחרי שאני מוזגת קפה בבוקר', behavior: 'אני כותבת שורה אחת לסקריפט',
                celebration: 'כל הכבוד לי', created: day(-6),
                log: { [day(-6)]: true, [day(-5)]: true, [day(-3)]: true, [day(-2)]: true, [day(-1)]: true } };
const HABIT2 = { id: 'h2', anchor: 'אחרי שאני מכבה את המחשב', behavior: 'אני מניחה את הטלפון בחדר השני',
                 celebration: '', created: day(-6), log: { [day(-2)]: true, [day(-1)]: true } };

const GOAL = { id: 'g1', title: '30 רילסים ברבעון', why: 'כי בלי נוכחות קבועה אין לקוחות חדשים',
               tactics: ['3 סקריפטים בשבוע', 'יום צילום קבוע'], votes: 12, done: false, created: Date.now() };

const GRAT = [
  { id: 'r1', text: 'שקט בבית לפני שכולם קמים', why: 'זה הזמן היחיד שהראש שלי שקט', ts: Date.now() - 1e3, type: 'gratitude' },
  { id: 'r2', text: 'שהעסק מפרנס אותי', why: 'לפני שנתיים זה לא היה מובן מאליו', ts: Date.now() - 2e3, type: 'gratitude' },
  { id: 'r3', text: 'קרן שמש על השולחן באמצע העריכה', why: '', ts: Date.now() - 3e3, type: 'glimmer' },
  { id: 'r4', text: 'שהצלחתי לצלם למרות שלא היה לי חשק', why: '', ts: Date.now() - 864e5, type: 'stone' },
  { id: 'r5', text: 'הקפה של הבוקר', why: 'הוא הסימן שהיום שלי מתחיל', ts: Date.now() - 864e5 - 1e3, type: 'gratitude' },
];

const base = over => JSON.stringify({
  onboarded: true,
  identity: 'אני אישה שמפרסמת גם כשלא בא לה',
  feelings: ['רגועה', 'חופשייה', 'יוצרת'],
  goals: [GOAL], vision: '', habits: [HABIT, HABIT2],
  gratitude: GRAT, days: {}, votes: 37, weekly: [], chat: [],
  settings: { eveningHour: 21, apiKey: '', model: 'claude-sonnet-5' },
  ...over,
});

const BIG3 = done => [
  { text: 'לערוך את הריל על פרידות', goalId: 'g1', done: done > 0 },
  { text: 'לענות לשלוש פניות מהדיירקט', goalId: '', done: done > 1 },
  { text: 'לסגור את הסקריפט לשבוע הבא', goalId: 'g1', done: done > 2 },
];

const STATES = {
  fresh:   null,
  morning: base({ days: {} }),
  day:     base({ days: { [day(0)]: { big3: BIG3(1), gratitudeToday: 'שקט בבית לפני שכולם קמים', evening: null, addon: null } } }),
  evening: base({ days: { [day(0)]: { big3: BIG3(3), gratitudeToday: 'שקט בבית', evening: null, addon: null } } }),
  closed:  base({ days: { [day(0)]: { big3: BIG3(3), gratitudeToday: 'שקט בבית', addon: null,
             evening: { best: 'שהצלחתי לצלם למרות שלא היה לי חשק', tomorrow: 'לערוך את שני הרילסים' } } } }),
  empty:   base({ habits: [], gratitude: [], goals: [], feelings: [], identity: '', votes: 0 }),
  chat:    base({ chat: [
    { role: 'user', text: 'אני נתקעת כל בוקר לפני שאני מצלמת. מה מהמדריכים יעזור?' },
    { role: 'assistant', text: 'זה כמעט תמיד רגש ולא עצלות. פיורה קורא לזה הימנעות מפחד, ואקאף היה אומר שהמטרה גדולה מדי.\n\nשני דברים לנסות מחר:\n1. לחתוך את המשימה בחצי. לא "לצלם ריל", אלא "להדליק מצלמה ולומר את ההוק".\n2. ברגע ההיסוס, 5-4-3-2-1 ותנועה פיזית לפני שהמוח מספיק להתערב.',
      actions: [{ type: 'habit', anchor: 'אחרי שאני מוזגת קפה', behavior: 'אני מדליקה מצלמה ואומרת הוק אחד', celebration: 'יש' }] },
  ], settings: { eveningHour: 21, apiKey: 'sk-ant-demo', model: 'claude-sonnet-5' } }),
};

/* ---------- רשימת המסכים ---------- */

const SCREENS = [
  // אונבורדינג
  { f: '01-אונבורדינג-פתיחה',       s: 'fresh' },
  { f: '02-אונבורדינג-זהות',        s: 'fresh', go: `document.querySelector('#ob-next').click()` },
  { f: '03-אונבורדינג-הרגל',        s: 'fresh', go: `document.querySelector('#ob-next').click(); document.querySelector('#ob-id').value='אני אישה שמפרסמת גם כשלא בא לה'; document.querySelector('#ob-next').click()` },
  { f: '04-אונבורדינג-שעת-ערב',     s: 'fresh', go: `document.querySelector('#ob-next').click(); document.querySelector('#ob-id').value='אני אישה שמפרסמת גם כשלא בא לה'; document.querySelector('#ob-next').click(); document.querySelector('#ob-skip').click()` },

  // עכשיו
  { f: '05-עכשיו-בוקר',             s: 'morning', tall: 1700 },
  { f: '06-עכשיו-בוקר-מלא',         s: 'morning', tall: 1700,
    go: `document.querySelector('#m-grat').value='שקט בבית לפני שכולם קמים'; document.querySelector('#m-grat-why').value='זה הזמן היחיד שהראש שלי שקט'; document.querySelector('#m-t0').value='לערוך את הריל על פרידות'; document.querySelector('#m-t0').dispatchEvent(new Event('input')); document.querySelector('#m-t1').value='לענות לשלוש פניות מהדיירקט'; document.querySelector('#m-t1').dispatchEvent(new Event('input'))` },
  { f: '07-עכשיו-רגע-הפעולה',       s: 'day', tall: 1350 },
  { f: '08-עכשיו-ערב',              s: 'evening', tall: 1500 },
  { f: '09-עכשיו-היום-סגור',        s: 'closed', tall: 1250 },

  // שכבות של רגע הפעולה
  { f: '10-ספירה-לאחור',            s: 'day', go: `document.querySelector('#d-launch').click()`, delay: 1200 },
  { f: '11-זוזי-עכשיו',             s: 'day', go: `document.querySelector('#d-launch').click()`, delay: 5600 },
  { f: '12-בלוק-30-דקות',           s: 'day', go: `document.querySelector('#d-launch').click()`, pre: 5800, then: `document.querySelector('#cd-block').click()`, delay: 1800 },
  { f: '13-חגיגה',                  s: 'day', go: `document.querySelector('#d-done').click()` },

  // תקיעות
  { f: '14-תקועה-בחירה',            s: 'day', go: `document.querySelector('#t-stuck').click()` },
  { f: '15-תקועה-שאלה',             s: 'day', go: `document.querySelector('#t-stuck').click()`, then: `document.querySelector('[data-stuck="too-big"]').click()` },
  { f: '16-תקועה-פחד',              s: 'day', go: `document.querySelector('#t-stuck').click()`, then: `document.querySelector('[data-stuck="fear"]').click()` },
  { f: '17-תקועה-סיכום',            s: 'day', go: `document.querySelector('#t-stuck').click()`,
    then: `document.querySelector('[data-stuck="too-big"]').click(); document.querySelector('#sf-in').value='רק ההוק והשורה הראשונה'; document.querySelector('#sf-next').click(); document.querySelector('#sf-in').value='להדליק מצלמה ולומר משפט אחד'; document.querySelector('#sf-next').click()` },

  // רגיעה
  { f: '18-רגיעה-איפה-את',          s: 'day', go: `document.querySelector('#t-calm').click()` },
  { f: '19-רגיעה-כלים',             s: 'day', go: `document.querySelector('#t-calm').click()`, then: `document.querySelector('[data-state="symp"]').click()` },
  { f: '20-רגיעה-נשימה',            s: 'day', go: `document.querySelector('#t-calm').click()`, then: `document.querySelector('[data-state="symp"]').click(); document.querySelector('[data-tool="sigh"]').click()`, delay: 1400 },
  { f: '21-רגיעה-התארקות',          s: 'day', go: `document.querySelector('#t-calm').click()`, then: `document.querySelector('[data-state="dorsal"]').click(); document.querySelector('[data-tool="orient"]').click()`, delay: 600 },
  { f: '22-רגיעה-סולם-רגשי',        s: 'day', go: `document.querySelector('#t-calm').click()`, then: `document.querySelector('[data-state="ventral"]').click(); document.querySelector('[data-tool="scale"]').click()`, delay: 600 },
  { f: '23-רגיעה-לכידת-נצנוץ',      s: 'day', go: `document.querySelector('#t-calm').click()`, then: `document.querySelector('[data-state="ventral"]').click(); document.querySelector('[data-tool="glimmer"]').click()`, delay: 600 },

  // הרגלים
  { f: '24-הרגלים-ריק',             s: 'empty', tall: 1100, go: `document.querySelector('[data-go="habits"]').click()` },
  { f: '25-הרגלים',                 s: 'day',   tall: 1300, go: `document.querySelector('[data-go="habits"]').click()` },
  { f: '26-הרגלים-עורך',            s: 'day',   go: `document.querySelector('[data-go="habits"]').click()`, then: `document.querySelector('#h-add').click()` },

  // תודות
  { f: '27-תודות-ריק',              s: 'empty', tall: 1100, go: `document.querySelector('[data-go="gratitude"]').click()` },
  { f: '28-תודות',                  s: 'day',   tall: 1900, go: `document.querySelector('[data-go="gratitude"]').click()` },

  // המצפן
  { f: '29-מצפן-עליון',             s: 'day', tall: 1900, go: `document.querySelector('[data-go="compass"]').click()` },
  { f: '30-מצפן-תחתון',             s: 'day', tall: 1900, go: `document.querySelector('[data-go="compass"]').click()`,
    then: `document.querySelector('#v-compass').scrollTop = 99999` },
  { f: '31-מצפן-עורך-מטרה',         s: 'day', go: `document.querySelector('[data-go="compass"]').click()`, then: `document.querySelector('[data-edit-g]').click()` },
  { f: '32-מצפן-סקירה-שבועית',      s: 'day', go: `document.querySelector('[data-go="compass"]').click()`, then: `document.querySelector('#c-review').click()` },

  // היועצת
  { f: '33-יועצת-ללא-מפתח',         s: 'day',  tall: 1200, go: `document.querySelector('[data-go="advisor"]').click()` },
  { f: '34-יועצת-שיחה',             s: 'chat', tall: 1700, go: `document.querySelector('[data-go="advisor"]').click()` },
];

/* ---------- הרצה ---------- */

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: EXE });
let ok = 0, failed = [];

for (const sc of SCREENS) {
  const height = sc.tall || H;
  const ctx = await browser.newContext({ viewport: { width: W, height }, deviceScaleFactor: 2, locale: 'he-IL' });
  const page = await ctx.newPage();
  try {
    await page.addInitScript(([key, val]) => {
      if (val) localStorage.setItem(key, val); else localStorage.removeItem(key);
    }, [KEY, STATES[sc.s]]);

    await page.goto(APP, { waitUntil: 'networkidle' });
    await page.waitForTimeout(350);

    if (sc.go)   { await page.evaluate(sc.go);   await page.waitForTimeout(sc.pre || (sc.then ? 250 : (sc.delay || 500))); }
    if (sc.then) { await page.evaluate(sc.then); await page.waitForTimeout(sc.delay || 550); }

    await page.screenshot({ path: OUT + sc.f + '.png' });
    console.log('✓', sc.f);
    ok++;
  } catch (e) {
    console.log('✗', sc.f, '—', e.message.split('\n')[0]);
    failed.push(sc.f);
  }
  await ctx.close();
}

await browser.close();
console.log(`\n${ok}/${SCREENS.length} מסכים נשמרו בתיקייה screens/`);
if (failed.length) { console.log('נכשלו:', failed.join(', ')); process.exit(1); }
