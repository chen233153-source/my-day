// המסעות לפי plans/MAP.md חלק ב2. הרצף שבו המשתמשת עוברת מסך למסך.
// `to` הוא שם הקובץ. `via` הוא מה שמוביל לשם.
// האם המעבר מחווט בקוד נקבע אוטומטית מ-flow.json, לא נכתב כאן ביד.
window.JOURNEYS = [
{
  n: "מסע 1", title: "פתיחת מחזור 12 שבועות", sub: "ה-Onboarding החדש, מהגדרת המחזור ועד המעבר למסך הראשי.",
  steps: [
    { file:"onboarding:intro", flowKey:"onboarding:intro",
      src:"onboarding/index.v3.3.html?screen=intro", label:"index.v3.3 · intro", name:"פתיחת מחזור" },
    { via:"להתחיל את המחזור", file:"onboarding:goal", flowKey:"onboarding:goal",
      src:"onboarding/index.v3.3.html?screen=goal", label:"index.v3.3 · goal", name:"מטרה ומדד" },
    { via:"להמשיך", file:"onboarding:goalPlan", flowKey:"onboarding:goalPlan",
      src:"onboarding/index.v3.3.html?screen=goalPlan", label:"index.v3.3 · goalPlan", name:"סיבה ופעולות שבועיות" },
    { via:"המטרה מוכנה", file:"onboarding:goalsDecision", flowKey:"onboarding:goalsDecision",
      src:"onboarding/index.v3.3.html?screen=goalsDecision", label:"index.v3.3 · goalsDecision", name:"סיכום מטרות" },
    { via:"מספיק מטרות, להמשיך", file:"onboarding:habit", flowKey:"onboarding:habit",
      src:"onboarding/index.v3.3.html?screen=habit", label:"index.v3.3 · habit", name:"הרגל תומך" },
    { via:"להמשיך", file:"onboarding:habitAnchor", flowKey:"onboarding:habitAnchor",
      src:"onboarding/index.v3.3.html?screen=habitAnchor", label:"index.v3.3 · habitAnchor", name:"עוגן והסכם" },
    { via:"ההרגל מוכן", file:"onboarding:habitsDecision", flowKey:"onboarding:habitsDecision",
      src:"onboarding/index.v3.3.html?screen=habitsDecision", label:"index.v3.3 · habitsDecision", name:"סיכום הרגלים" },
    { via:"מספיק הרגלים, להמשיך", file:"onboarding:breakHabit", flowKey:"onboarding:breakHabit",
      src:"onboarding/index.v3.3.html?screen=breakHabit", label:"index.v3.3 · breakHabit", name:"הרגל להפחתה" },
    { via:"להמשיך או לדלג", file:"onboarding:morningPick", flowKey:"onboarding:morningPick",
      src:"onboarding/index.v3.3.html?screen=morningPick", label:"index.v3.3 · morningPick", name:"בחירת שגרת בוקר" },
    { via:"לבנות את השגרה", file:"onboarding:morningBuild", flowKey:"onboarding:morningBuild",
      src:"onboarding/index.v3.3.html?screen=morningBuild", label:"index.v3.3 · morningBuild", name:"בניית שגרת הבוקר" },
    { via:"השגרה מוכנה", file:"onboarding:week", flowKey:"onboarding:week",
      src:"onboarding/index.v3.3.html?screen=week", label:"index.v3.3 · week", name:"Weekly Big 3" },
    { via:"להמשיך", file:"onboarding:evening", flowKey:"onboarding:evening",
      src:"onboarding/index.v3.3.html?screen=evening", label:"index.v3.3 · evening", name:"שעת ערב" },
    { via:"לראות את הסיום", file:"onboarding:done", flowKey:"onboarding:done",
      src:"onboarding/index.v3.3.html?screen=done", label:"index.v3.3 · done", name:"סיימנו להגדיר" },
    { via:"לעבור למסך הראשי", file:"06-now-morning-full-v2.html", name:"המסך הראשי",
      note:"המעבר קיים בפריוויו; העברת הנתונים לאפליקציה עדיין לא מחוברת" },
  ],
  gap: "ה-Onboarding מאושר כ-flow. החיבור של הנתונים שנאספו למסך הראשי עדיין דורש מימוש."
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
