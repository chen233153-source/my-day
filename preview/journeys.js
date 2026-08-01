// המסעות לפי plans/MAP.md חלק ב2. הרצף שבו המשתמשת עוברת מסך למסך.
// `to` הוא שם הקובץ. `via` הוא מה שמוביל לשם.
// האם המעבר מחווט בקוד נקבע אוטומטית מ-flow.json, לא נכתב כאן ביד.
window.JOURNEYS = [
{
  n: "מסע 1", title: "הפעם הראשונה", sub: "פעם אחת בחיים. כל שלב ניתן לדילוג.",
  steps: [
    { file:"01-onboarding-welcome.html", name:"פתיחה" },
    { via:"בואי נתחיל",  file:"02-onboarding-identity.html", name:"שם" },
    { via:"הלאה",        file:"03-onboarding-goals.html",    name:"מטרות" },
    { via:"הלאה",        file:"26-habits-editor.html",       name:"הרגל חיובי", note:"חמישה שלבים פנימיים" },
    { via:"מתחילות",     file:"onboarding-break-habit.html", name:"הרגל שלילי" },
    { via:"הלאה",        file:"04-onboarding-evening.html",  name:"שעת ערב" },
    { via:"זהו, סיימנו", file:"today-morning.html",          name:"הבית" },
  ],
  gap: "חסר בשרשרת: מסך זהות. היום הזהות נשאלת רק בתוך עורך ההרגל."
},
{
  n: "מסע 2", title: "יום רגיל", sub: "הבית משתנה לפי השעה.",
  steps: [
    { file:"06-now-morning-full-v2.html", name:"בוקר" },
    { via:"הבוקר שלי",   file:"morning-run.html",      name:"שגרת בוקר" },
    { via:"סיימתי",      file:"today-day.html",        name:"יום" },
    { via:"להתחיל",      file:"07-now-action.html",    name:"רגע הפעולה", note:"רוטציה בין שתי משימות, 20 דקות כל אחת" },
    { via:"סיימתי",      file:"action-celebrate.html", name:"חגיגה" },
    { via:"מספיק להיום", file:"today-evening.html",    name:"ערב" },
    { via:"עשיתי",       file:"today-closed.html",     name:"היום סגור", note:"אין CTA. יוצאים." },
  ]
},
{
  n: "מסע 3", title: "נתקעת", sub: "נכנסים מרגע הפעולה. גיליון שעולה מעל המשימה.",
  steps: [
    { file:"07-now-action.html",    name:"רגע הפעולה" },
    { via:"זה מרגיש גדול מדי", file:"stuck-choice.html",   name:"מה עוצר" },
    { via:"זה גדול מדי",       file:"stuck-question.html", name:"הצעד הקטן", note:"״זה מפחיד אותי״ מוביל ל-stuck-fear במקום" },
    { via:"הלאה",              file:"stuck-summary.html",  name:"סיכום" },
    { via:"5-4-3-2-1, מתחילה", file:"action-countdown.html", name:"ספירה" },
    { via:"אוטומטית",          file:"07-now-action.html",  name:"חזרה לפעולה" },
  ]
},
{
  n: "מסע 3ב", title: "נתקעת מפחד", sub: "ענף נפרד מתוך ״מה עוצר״.",
  steps: [
    { file:"stuck-choice.html",  name:"מה עוצר" },
    { via:"זה מפחיד אותי", file:"stuck-fear.html",    name:"מאיזה כאב את נמנעת" },
    { via:"כאב או אובדן",  file:"stuck-summary.html", name:"סיכום" },
  ]
},
{
  n: "מסע 4", title: "צריכה רגיעה", sub: "הכלים נגזרים מהמצב שנבחר, ולא תפריט אחיד.",
  steps: [
    { file:"07-now-action.html", name:"רגע הפעולה" },
    { via:"אני בהצפה", file:"calm-where.html", name:"איפה את" },
    { via:"מגויסת",    file:"calm-tools.html", name:"כלים" },
    { via:"אנחה",      file:"calm-breath.html", name:"נשימה" },
    { via:"סיימתי",    file:"calm-tools.html", name:"חזרה לכלים" },
  ]
},
{
  n: "מסע 4ב", title: "רגיעה, ענפים נוספים", sub: "כבויה מקבלת התארקות. בסדר מקבלת סולם או נצנוץ.",
  steps: [
    { file:"calm-tools.html",   name:"כלים" },
    { via:"תנועה לשחרור", file:"calm-ground.html",  name:"התארקות" },
    { via:"גלישה על הדחף", file:"calm-glimmer.html", name:"נצנוץ" },
    { via:"אפשרויות",     file:"calm-ladder.html",  name:"הסולם שלי", note:"נפתח רק כשהיא בסדר" },
  ]
},
{
  n: "מסע 5", title: "הרגל לאורך זמן", sub: "ארבעה מסלולי ניתוב. זה המסלול של הרגל חדש.",
  steps: [
    { file:"24-habits-empty.html",  name:"ניתוב" },
    { via:"משהו חדש",  file:"26-habits-editor.html", name:"הקמה", note:"מסתיים בהסכם" },
    { via:"כל יום",    file:"today-evening.html",    name:"ערב" },
    { via:"לא עשיתי",  file:"35-habit-resistance.html", name:"רגע ההתנגדות" },
    { via:"אחרי 14 יום", file:"25-habits.html",      name:"הקולות", note:"הצעת הגדלה" },
  ]
},
{
  n: "מסע 5ב", title: "להפסיק הרגל", sub: "מסלול נפרד מאותו מסך ניתוב.",
  steps: [
    { file:"24-habits-empty.html", name:"ניתוב" },
    { via:"רוצה להפסיק", file:"36-habit-break.html", name:"החלפת שגרה", note:"ארבעה שלבים" },
  ]
},
{
  n: "מסע 6", title: "שבועי", sub: "מחזור של 12 שבועות, שלוש מטרות מקסימום.",
  steps: [
    { file:"compass-home.html",        name:"המצפן" },
    { via:"פעם בשבוע", file:"compass-weekly.html", name:"הפגישה השבועית" },
    { via:"מטרה תקועה", file:"compass-stuck.html",  name:"מה עוצר במטרה" },
    { via:"אוטומטית",  file:"compass-goal-editor.html", name:"עורך המטרה" },
  ],
  gap: "compass-horizons נעול עד סוף המחזור, ולכן לא בשרשרת."
},
{
  n: "מסע 7", title: "משימות ותודות", sub: "טאבים שנכנסים אליהם מכל מקום.",
  steps: [
    { file:"tasks-empty.html", name:"משימות ריק" },
    { via:"לכתוב משימה", file:"tasks.html", name:"משימות" },
    { via:"כתיבת תודה",  file:"gratitude-writing.html", name:"רשימת תודה" },
  ]
},
];

// מסכים שלא נכנסו לאף מסע. מוצגים בסוף כדי שלא ייעלמו.
window.ORPHAN_SCREENS = [
  ["today-morning.html","בוקר דליל · כפילות מול 06"],
  ["gratitude.html","תודות · כפילות מול gratitude-writing"],
  ["gratitude-empty.html","תודות ריק"],
  ["action-block.html","בלוק 30 דקות · סותר את הרוטציה"],
  ["action-move.html","זוזי · נכנסים אחרי הספירה"],
  ["morning-build.html","הכנה מהערב"],
  ["artist-date.html","פגישת האמן · פעם בשבוע"],
  ["compass-horizons.html","אופקים · נעול"],
];
