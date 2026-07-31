# מדריך המיקרו-קופי: היום שלי

מדריך כתיבה למסכים בפרויקט `brand-product-a4813f`, בנוי על מקורות מקצועיים ולא על טעם.
כל כלל כאן מסומן במקור שממנו הוא נגזר. כלל בלי מקור הוא דעה, ולא נכנס לכאן.

מחליף את `voice.md` בכל מה שנוגע לשאלה *איך* כותבים. `voice.md` נשאר תקף בכל מה שנוגע לניסוחים הקבועים (טבלת הכפתורים, שורות שאסור לגעת בהן).
חוקי המוצר הקשיחים נמצאים ב-`design-system.md` וגוברים על כל מה שכתוב כאן.

---

## חלק 1: מה המחקר באמת אומר

### 1.1 כנרת יפרח, המקור הרלוונטי ביותר

יפרח היא מחברת *מיקרו-קופי: המדריך המלא*, שתורגם לשש שפות, והמקור המקצועי היחיד שעובד בעברית באופן שיטתי.

**א. אפיון קול נעשה על סקאלות, לא על תארים.**
יפרח מאפיינת שפת מותג לפי צירים: אישי–מקצועי, סבלני–מהיר, שמרני–חדשני, נישתי–לכולם/ן.
המשמעות המעשית: "חמה וכנה" זה לא אפיון. מיקום על ציר זה אפיון, כי אפשר להכריע לפיו במקרה גבולי.
מקור: [LearnTech, פרק 61 עם כנרת יפרח](https://www.learntech.co.il/podcast/pod61/)

**ב. מצבים ריקים הם רכיב מתוכנן, לא שארית.**
יפרח דורשת שהמעצב יעביר לכותב את *כל* המצבים של כל מסך, כולל המצב לפני שיש תוכן, המצב אחרי שהמשתמשת מחקה הכול, ומצב "אין תוצאות".
השאלה שהיא מכתיבה: מה רואים בפעם הראשונה, ומה רואים בשוטף, ואלה לא אותו טקסט.
מקור: [Yifrah, "UX checklist: the invisible pieces of microcopy you're forgetting", UX Collective](https://uxdesign.cc/add-these-to-your-ux-checklist-the-invisible-pieces-of-microcopy-youre-forgetting-548f23eb95d8)

**ג. כל רכיב שיש לו מצב פתוח וסגור מגיע לכותב בשני המצבים.**
באותו מאמר: "Anything that has different closed and open states should reach the microcopy writers in both states."
נוגע ישירות לגיליונות התחתונים באפליקציה, למשל ב-`35-habit-resistance`.

**ד. שבע ההנחיות למיקרו-קופי נגיש. שלוש מהן קריטיות כאן:**

1. **סדר: תווית, ואז הנחיה, ואז שדה.** המידע שנחוץ לפעולה מופיע *לפני* הפעולה, לא אחריה. יפרח: "Label > Instruction\Hint > Field".
2. **הנחיות קבועות וגלויות, לא placeholder.** ציטוט: "permanently visible". טקסט שנעלם ברגע שמתחילים להקליד הוא טקסט שלא קיים.
3. **שנינות אף פעם לא על חשבון המסר.** המבחן שלה: האם יבינו איפה הם ומה הלאה רק מהטקסט. ועוד: "Simple is best", בלי ראשי תיבות, בלי משחקי מילים.

מקור: [Yifrah, "7 guidelines for writing accessible microcopy", Prototypr](https://blog.prototypr.io/7-guidelines-for-writing-accessible-microcopy-8d52575f5d8e)

**ה. הרכיב בעברית: שם פעולה מזמין יותר מציווי.**
בעמוד שהיא מרכזת על כתיבה שוויונית: כפתור `הרשמה` מזמין יותר מכפתור `הירשם`. הצורות שהיא מונה: שם פעולה (`כניסה`, `שמירה`, `התחלה`), שם פועל (`להוסיף לסל`), וגוף ראשון (`צרפו אותי`, `אני רוצה להירשם`).
מקור: [microcopy.co.il, כתיבה שוויונית](https://www.microcopy.co.il/how-to-write-for-all-genders)
ותומך בזה: [אור סגל, "6 טיפים לכתיבת מיקרו־קופי", אות אות אות](https://alefalefalef.co.il/microcopy/) שמנסח את אותו דבר: `שלח` פונה בלשון זכר, `שליחה` נטול מגדר.

**ו. השם של הרכיב עושה את העבודה הרגשית.**
בניתוח שלה ל-Headspace: הטאב של הסשנים שהושלמו נקרא `My Journey` ולא `History`. התווית עצמה היא ההתערבות.
מקור: [Yifrah, "How does meditation sound like?", Medium](https://medium.com/@Kinneret/how-does-meditation-sound-like-44c3cc8136fc)
**הערה חשובה למוצר הזה:** המילה `מסע` אסורה ב-`voice.md`. זו דוגמה שהמקור מציע ואנחנו דוחים במודע. העיקרון נשאר: התווית היא קופי, לא שם שדה.

---

### 1.2 מסגרות קול וטון ציבוריות

**Mailchimp: הקול קבוע, הטון משתנה לפי המצב הרגשי של הקוראת.**
מהמדריך הרשמי: "You have the same voice all the time, but your tone changes."
וההנחיה המבצעית: "consider the reader's state of mind... you can adjust your tone accordingly".
שני כללים נוספים שרלוונטיים ישירות:
- "It's always more important to be clear than entertaining."
- "forced humor can be worse than none at all", ואם מתלבטים, "keep a straight face".
- כפתורים: "Button copy should always include verbs."
מקור: [Mailchimp Content Style Guide, Voice and Tone](https://github.com/mailchimp/content-style-guide/blob/master/02-voice-and-tone.html.md) ו-[Web Elements](https://github.com/mailchimp/content-style-guide/blob/master/06-web-elements.html.md)

**Atlassian: מפה מפורשת של הגברה והנמכה לפי מצב.**
זה המקור הכי שימושי למוצר הזה, כי הוא נותן חוגה ולא סיסמה:
- להיות **יותר נועז** כשהיא בטוחה, מעוניינת, סומכת.
- להיות **פחות נועז** כשהיא חוששת, מבולבלת, מפוחדת.
- להיות **יותר מעשי** כשהיא מוצפת או בלחץ.
- הקריצה מותרת **רק** כשהיא מצליחה או שמחה.
ועיקרון ראשון שמכריע הרבה מסכים: "Tell people only what they need to know in the moment and nothing more."
מקור: [Atlassian Design System, Voice and tone](https://atlassian.design/foundations/content/voice-tone)

**Shopify Polaris: מבחן הקול בפועל.**
"Read it out loud. Does it sound like something a human would say?"
ועוד: להתחיל משפטים בפועל, לוותר על `you can`, ולכוון לרמת קריאה של כיתה ז.
מקור: [Polaris, Voice and tone](https://polaris-react.shopify.com/content/voice-and-tone) ו-[Actionable language](https://polaris-react.shopify.com/content/actionable-language)

**Apple HIG: כללי התראות, ונקודת מחלוקת.**
- כותרת קצרה, שורה אחת, בלי סימן פיסוק בסוף.
- "Avoid sounding accusatory, judgmental, or insulting."
- "It's better to be negative and direct than positive and oblique." זה כלל חזק נגד ריכוך מיותר.
- כפתור מתאר את התוצאה של הלחיצה, לא את השאלה.
מקור: [Apple iOS HIG, Alerts](https://codershigh.github.io/guidelines/ios/human-interface-guidelines/ui-views/alerts/index.html)

**המקורות חלוקים, וזה חשוב:**
Apple כותבת "Avoid pronouns such as you, your, me, and my, which are sometimes interpreted as insulting or patronizing".
Mailchimp, Polaris ויפרח אומרים בדיוק ההפך: לדבר אל האדם, ישירות.
**ההכרעה כאן:** האפליקציה הולכת עם Mailchimp ויפרח. הכלל של Apple נכתב להתראות מערכת שקופצות בלי שביקשו אותן, ולא למסך שהמשתמשת פתחה מרצונה כדי שידברו איתה. אבל האזהרה שלה תקפה: פנייה ישירה + שיפוט = פטרוני. לכן פנייה ישירה מותרת רק כשאין בה הערכה.

---

### 1.3 כללים לפי רכיב ממשק

**מצב ריק, שלוש דרישות (NN/g):**
1. לתקשר מצב: ברור שאין תוכן, ולא שמשהו נתקע.
2. לתת רמז לימוד: מה יופיע כאן וממה זה מגיע.
3. **לתת נתיב ישיר לפעולה**, כפתור או קישור, לא רק תיאור.
מקור: [NN/g, "Designing Empty States in Complex Applications: 3 Guidelines"](https://www.nngroup.com/articles/empty-state-interface-design/)

**הודעות כישלון (NN/g):**
- "Take a positive tone and don't blame the user."
- להימנע מהמילים invalid, illegal, incorrect. בעברית: `שגוי`, `לא חוקי`, `לא תקין`.
- **"Avoid humor since it can become stale if users encounter the error frequently."** זה הכלל הכי חשוב לאפליקציה הזאת, ואני חוזר אליו בסעיף 7.
מקור: [NN/g, Error Message Guidelines](https://www.nngroup.com/articles/error-message-guidelines/)

**כמה בכלל נקרא (NN/g):**
- "users have time to read at most 28% of the words during an average visit; 20% is more likely".
- 79% מהמשתמשים סורקים כל עמוד חדש, 16% קוראים מילה במילה.
- שכתוב לטקסט תמציתי שיפר שמישות ב-58%, פריסה סריקה ב-47%, שפה עניינית במקום שיווקית ב-27%, ושלושתם יחד ב-124%.
מקורות: [How Little Do Users Read?](https://www.nngroup.com/articles/how-little-do-users-read/), [How Users Read on the Web](https://www.nngroup.com/articles/how-users-read-on-the-web/)

**כפתורים:**
פועל בהתחלה (Mailchimp, Polaris), מתאר את התוצאה (Apple), ולא גנרי כמו `עוד` או `לחצי כאן` (יפרח, הנחיה 4).

**אישור והצלחה:**
יפרח: משוב אחרי פעולה חשובה או נדירה, ומספיק "a brief toast message that comes and goes on its own, or even a check mark". לא כל פעולה צריכה חגיגה.

---

### 1.4 עומס קוגניטיבי, ADHD, וקריאה בלחץ

**W3C COGA, "Making Content Usable" (המקור התקני):**
- פסקה: "if you have a paragraph of more than 50 words, try breaking it up into two paragraphs" (דפוס 4.4.5).
- משפט: נקודה אחת בכל משפט. מטרת הפסקה בהתחלה.
- **מסך: "Provide users with five or less main choices on each screen and remove unnecessary content"** (דפוס 4.6.3).
- ולמה זה משנה כאן, מילה במילה: "Busy pages, too much text, too many images and too much other content can cause cognitive overload, anxiety and loss of focus."
- הוראות: כל שלב בנפרד, כי "a person with an impaired working memory cannot hold onto many pieces of information at the same time" (4.4.9).
מקור: [W3C, Making Content Usable for People with Cognitive and Learning Disabilities](https://www.w3.org/TR/coga-usable/)
הערה: הדוגמה שה-W3C עצמו נותן ב-4.4.5 היא סטודנטית עם ADHD. זה לא עיבוד שלי.

**NHS ו-GOV.UK, המספרים הקשיחים:**
- NHS: "We use short sentences of up to 20 words." ו-"short paragraphs of up to 3 sentences." גיל קריאה 9 עד 11.
- GOV.UK: לפצל משפטים מעל 25 מילים, פסקה עד 5 משפטים.
- Home Office: "we recommend writing for a maximum reading age of 9, even if you are writing for a specialist audience."
מקורות: [NHS service manual](https://service-manual.nhs.uk/content/how-we-write), [GOV.UK clear language](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/clear-language/), [Home Office readability](https://design.homeoffice.gov.uk/accessibility/written-content/readability)

**התאמה לעברית, וזו הסקה שלי ולא ציטוט:** עברית דחוסה יותר מאנגלית, ה"א הידיעה ומילות היחס נצמדות למילה. משפט עברי של 12 עד 15 מילים שקול בערך למשפט אנגלי של 20. **התקרה כאן: 15 מילים למשפט, ובמסכי מצוקה הרבה פחות.**

**מסך מצוקה, 27-9-3:**
המקור המקורי הוא Covello, נייר שהוצג בכנס ה-WHO ב-2002, ואומץ אחר כך על ידי ה-CDC:
- "Mental noise can reduce a person's ability to process information by more than 80 percent."
- שלוש הודעות מפתח, כל אחת פחות מ-9 מילים, הסט כולו פחות מ-27 מילים.
- ההודעה הכי חשובה בהתחלה ובסוף, לא באמצע.
- רמת קריאה כיתות ו עד ח.
מקור: [Covello, "Message Mapping, Risk and Crisis Communication"](https://rcfp.pbworks.com/f/MessageMapping.pdf), ואישור בגוף ממשלתי: [NJ Dept. of Health](https://nj.gov/health/er/documents/risk_comm_glance.pdf)

**חרדה אוכלת קשב, וקשב מניע הבנה:**
מחקר על 251 תלמידים מצא קשר שלילי בין תסמיני חרדה גופניים להבנת הנקרא, בתיווך חלקי של קשב.
מקור: [PMC10350215](https://pmc.ncbi.nlm.nih.gov/articles/PMC10350215/)
מטא-אנליזה של 32 מחקרים מצאה השפעה שלילית בינונית עד חזקה של הפרעת קשב חיצונית על הבנת הנקרא (Hedges' g = −0.64).
מקור: [PMC12684101](https://pmc.ncbi.nlm.nih.gov/articles/PMC12684101/)

---

### 1.5 קופי תומך: מה עובד ומה מזייף

**מה שהופך חום לזיוף זה החזרתיות, לא הטון.**
ניתוח איכותני של 159 ביקורות על Wysa. משתמשים כתבו בעצמם: "a lot of what it says is repetitive and that can trigger a feeling of not being heard".
NN/g אומרת את אותו דבר על הומור בשגיאות. **זו הנקודה החזקה ביותר במחקר כולו למוצר הזה: משפט תומך שהיא רואה כל יום הופך לעלבון ביום הארבעים.**
מקור: [Chaudhry & Debi, mHealth 2024](https://mhealth.amegroups.org/article/view/126211/html)

**התלהבות מוגזמת מקבלת ציון נמוך יותר, בניסוי.**
מחקר של Northeastern: מה שנכשל באופן עקבי היו בוטים שנשמעו "aggressively enthusiastic or emotionally exaggerated regardless of context".
מקור: [Digital Trends, סיקור המחקר](https://www.digitaltrends.com/computing/its-not-just-you-research-says-people-dont-like-overtly-friendly-ai-chatbots/)

**פוזיטיביות רעילה: לא לקודד רגשות כטובים ורעים בממשק.**
- בלי סמיילי לשמח וזעוף לעצוב. צבע במקום פרצוף.
- לכלול אפשרות "לא בטוחה".
- להכיר בגורמים חיצוניים, ולא למקם את כל הסיבה בתוכה.
- אישורים שהמקור פוסל, בציטוט: "I can do anything I put my mind to."
- אישורים שהמקור מאשר: "I am doing the best I can with the circumstances I have."
מקור: [Digital Thriving Playbook, Toxic Positivity](https://digitalthrivingplaybook.org/big-idea/toxic-positivity-and-how-to-avoid-it-in-games-for-emotional-well-being/)

**יום שהוחמץ לא ממוסגר ככישלון.**
"Streaks can motivate some users, but missed days should not be framed as failure in non-linear recovery contexts."
אותו מקור פוסל גם קונפטי על מצב רוח נמוך שנרשם, ומסכי שדרוג בתוך זרימת תמיכה.
מקור: [Homan, Smashing Magazine, "Designing For Distressed Users"](https://www.smashingmagazine.com/2026/07/designing-distressed-users-mental-health-apps-ui/)

**סטריק מחליף את המטרה.**
"users often view extending their streak as more important than engaging in the underlying activity", ומחקר ב-Journal of Consumer Research מצא ששבירת רצף מגדילה נטישה.
מקור: [The Decision Lab, Streak Creep](https://thedecisionlab.com/insights/consumer-insights/streak-creep-the-perils-of-too-much-gamification)
לצד זה, יש עמדה מנוגדת שטוענת שהאשמת דואולינגו בדארק פטרן היא הגזמה. אני מציין אותה כי המקורות באמת חלוקים, אבל היא לא משנה את ההכרעה כאן.
מקור: [Opinions and Conditions, 2025](https://opinionsandconditions.substack.com/p/duolingo-owl-dark-patterns-digital-guilt)

**Confirmshaming: כפתור הסירוב אסור שישפוט.**
ההגדרה של Harry Brignull, "emotional manipulation to misdirect users", עם דוגמאות אמיתיות כמו "No thanks, I hate free money".
מקור: [Deceptive Design, Chapter 16](https://www.deceptive.design/book/contents/chapter-16)

**עיצוב מודע-טראומה, שני כללים מבצעיים:**
1. המסר החשוב ראשון, כדי שהיא תוכל לבחור מתי להיכנס פנימה.
2. **דרך יציאה או השהיה זמינה באותה מסגרת עצמה**, לא רק כפתור חזרה, וגם ביטול פעולה.
מקורות: [Content Design London](https://contentdesign.london/blog/using-trauma-informed-principles-with-content-design), [UX Content Collective](https://uxcontent.com/a-guide-to-trauma-informed-content-design/)

---

## חלק 2: הקול של האפליקציה הזאת, נגזר מהמקורות

### שלושה משפטים

**על הסקאלות של יפרח, האפליקציה יושבת בקצה האישי ובקצה הסבלני, ולא זזה משם:** היא לא ממהרת אותה, ולא מסבירה את עצמה במונחים מקצועיים, גם כשהלוגיקה מאחורי המסך מקצועית.
**לפי המודל של Mailchimp הקול קבוע ורק עוצמתו משתנה, ולפי החוגה של Atlassian הקריצה מותרת רק ברגע הצלחה** ואסורה בכל רגע שבו היא מוצפת, חוששת או תקועה.
**לפי COGA ו-Covello, המסך שהיא פותחת ברגע הקשה הוא לא המסך שבו כותבים יפה:** שם כותבים קצר, מסר אחד, ויציאה גלויה.

**המבחן שמכריע במקרה גבולי,** בגרסה של Polaris: לקרוא את זה בקול. אם זה לא נשמע כמו משהו שאדם היה אומר, זה לא נכנס.

### מה הקול לא

| לא | למה, לפי המקור |
|---|---|
| לא מאמנת שמעודדת | ההתלהבות המוגזמת מקבלת ציון נמוך יותר בניסוי (Northeastern) |
| לא מטפלת שמשתמשת במונחים | "Simple is best", בלי ז'רגון (יפרח, הנחיה 7) |
| לא מסבירה איך המנגנון עובד | "only what they need to know in the moment and nothing more" (Atlassian) |
| לא מצחיקה במסך שחוזר כל יום | הומור מתיישן כשרואים אותו שוב ושוב (NN/g) |
| לא מדרגת רגשות לטובים ורעים | פוזיטיביות רעילה (Digital Thriving) |
| לא סופרת החמצות | "missed days should not be framed as failure" (Smashing) |
| לא שופטת בכפתור הסירוב | confirmshaming (Brignull) |
| לא כותבת פסקת נחמה ארוכה במסך מצוקה | 27 מילים לכל הסט (Covello) |

---

## חלק 3: כללים לפי רכיב

| רכיב | הכלל | המקור |
|---|---|---|
| **כותרת h1** | עד 5 מילים, בלי נקודה בסוף. סימן שאלה מותר | Apple (כותרת שורה אחת, בלי פיסוק סופי), Mailchimp (בלי פיסוק סופי בכותרות) |
| **כותרת משנה** | משפט אחד, עד 15 מילים בעברית. רעיון אחד | COGA 4.4.5, NHS 20 מילים באנגלית |
| **מסך שלם** | עד 5 בחירות עיקריות. מה שלא נחוץ יורד | COGA 4.6.3 |
| **כפתור ראשי** | שם פועל או שם פעולה, מתאר את התוצאה | יפרח (`הרשמה` מזמין יותר מ`הירשם`), Apple, Mailchimp, Polaris |
| **כפתור סירוב או יציאה** | ניטרלי לגמרי. `לא עכשיו`, `מספיק`. אף פעם לא ניסוח שמעריך את הבחירה | Brignull |
| **מצב ריק** | שלוש שכבות: אין כאן כלום, מה יופיע כאן, וכפתור שמתחיל. **כפתור, לא רק משפט** | NN/g, 3 הנחיות |
| **placeholder** | לא נושא מידע. כל הנחיה נחוצה יושבת כתווית קבועה מעל השדה | יפרח, הנחיות 1 ו-6 |
| **רגע כישלון** | לתאר מה קרה בלי להאשים, בלי הומור, ובלי לקרוא לזה כישלון | NN/g, Smashing |
| **רגע הצלחה** | קצר. משוב שנעלם מעצמו מספיק. חגיגה שמורה לאירוע נדיר | יפרח, Atlassian (הקריצה רק בהצלחה) |
| **אישור פעולה** | הכפתור אומר מה יקרה, לא `אישור` ולא `כן` | Apple |
| **מידע משפטי לפני פעולה** | מופיע **מעל** הכפתור, לא מתחתיו | יפרח, הנחיה 1 |

---

## חלק 4: מפת טון לפי מצב רגשי

הבסיס הוא המודל של Mailchimp (קול קבוע, טון משתנה) והחוגה של Atlassian. תקציב המילים במצוקה הוא של Covello.

| מצב | מסכים | חוגת הנועזות | תקציב | הומור | יציאה גלויה |
|---|---|---|---|---|---|
| **פגישה ראשונה, קצת חוששת** | `01`–`04` | פחות נועז, יותר מעשי. להגיד מה יקרה עכשיו | עד 25 מילים במסך | לא | `לדלג` |
| **בוקר רגוע** | `today-morning`, `morning-*` | נועז מותר. זה הרגע היחיד שבו מותר להציע משהו | עד 25 מילים מעל הקיפול | עדין, ורק אם יצא טבעי | לא נדרש |
| **יום רגיל, מעשי** | `tasks`, `tasks-empty` | מעשי. הכי פחות רגשי באפליקציה | עד 20 מילים | יובש מותר | לא נדרש |
| **הרגלים בשגרה** | `24`–`26` | מעודד ומקורקע | עד 25 מילים | לא | `לא עכשיו` |
| **רגע התנגדות, אולי בושה** | `35`, `36`, `today-closed` | **פחות נועז. לתאר עובדה, לא רגש** | עד 20 מילים, משפטים של עד 10 | **אסור** | `לא עכשיו` |
| **תקועה** | `stuck-*` | מעשי בלבד. בלי קלילות | עד 20 מילים | אסור | **`לא עכשיו` גלוי במסך** |
| **מצוקה** | `calm-*` | כמעט בלי אישיות | **3 מסרים, עד 9 מילים כל אחד, עד 27 בסך הכול** | אסור | **`מספיק` גלוי, לא רק כפתור חזרה** |
| **הצלחה אמיתית** | `action-celebrate` | **הרגע היחיד לקריצה ולסימן קריאה** | עד 15 מילים | כן | `לצאת` |

**כלל ההכרעה בין שורות:** ככל שהיא פחות רגועה, פחות מילים, פחות אישיות, ויותר יציאות.

**כלל שנובע מהחזרתיות (Wysa, NN/g):** כל משפט שהיא רואה יותר מפעם בשבוע חייב או להשתנות, או להיות עובדתי לגמרי. משפט תומך קבוע במסך יומי הופך לרעש ואז לעלבון. זה נוגע ישירות ל-`today-morning`, ל-`tasks-empty` ול-`gratitude-empty`.

---

## חלק 5: עברית, ספציפית

### 5.1 גוף שני נקבה, ולמה זו בחירה ולא ברירת מחדל

רוב המוצרים בעברית בורחים מהמגדר דרך שם פועל ושם פעולה, וזה מה שיפרח והאקדמיה ללשון ממליצים למי שפונה לכולם.
האפליקציה הזאת פונה לנשים, ולכן בוחרת נקבה במפורש. זו בחירה לגיטימית לפי אותו מקור עצמו, שמציע גם לשאול מראש איך לפנות.
מקורות: [microcopy.co.il, כתיבה שוויונית](https://www.microcopy.co.il/how-to-write-for-all-genders), [אות אות אות](https://alefalefalef.co.il/microcopy/)

**החלוקה שנובעת מזה:**
- **כפתורים: שם פועל או שם פעולה.** `להתחיל`, `לשמור`, `לכתוב תודה`, `לבחור רגע אחר`. זה גם מה שיפרח מוצאת כמזמין יותר, וגם מה שמונע מהכפתור להישמע כמו הוראה.
- **גוף הטקסט: ציווי בנקבה, אבל רק אם חברה הייתה אומרת את זה בקול.** `תכתבי מה שיש בראש` עובד. `בחרי אפשרות` לא, כי אף אחת לא מדברת ככה.
- **אפשרויות בחירה: גוף ראשון.** `אני לא מצליחה להתחיל`, `הכל דולק, אני לא נרגעת`. זה כבר קיים באפליקציה וזה נכון: היא מזהה את עצמה במשפט, לא נענית לשאלה. מקביל ל-`צרפו אותי` אצל יפרח.

### 5.2 מה גורם לעברית להישמע מתורגמת או קשיחה

| הסימן | במקום |
|---|---|
| `אנא`, `על מנת`, `הנך`, `באפשרותך` | לוותר לגמרי |
| `לחצי כאן`, `למידע נוסף` | כפתור שמתאר את התוצאה (יפרח, הנחיה 4) |
| `המערכת שמרה את השינויים` | `נשמר` |
| סביל: `יישלח אלייך`, `הנתונים יעובדו` | פעיל: `נשלח לך` (Mailchimp: active voice) |
| שם פעולה מנופח: `ביצוע הפעולה`, `השלמת התהליך` | הפועל עצמו |
| `תוכלי ל...` | הפעולה ישירות (Polaris: לוותר על `you can`) |
| שמות שדה שדלפו מהמסמך התכנוני | תווית שנאמרת בקול (יפרח, Headspace) |

### 5.3 פיסוק, מספרים ו-RTL

**מספרים ושמות שמוזרקים לטקסט עברי חייבים בידוד.**
לפי W3C, תווים ניטרליים ומספרים בקצה של רצף RTL נדבקים לכיוון הלא נכון ומוצגים במקום הלא נכון. הפתרון: `<bdi>` סביב כל ערך דינמי, או `dir` על הרכיב.
זה נוגע ל-`163 קולות`, ל-`4 בלוקים השבוע`, ל-`17 דברים` ולכל `בוקר טוב, מיכל`.
מקור: [W3C, Unicode controls vs. markup for bidi support](https://www.w3.org/International/questions/qa-bidi-unicode-controls)

**סימן קריאה בסוף רצף עברי** הוא תו ניטרלי, ובלי `dir` תקין הוא קופץ לצד הלא נכון. עוד סיבה שהוא מותר רק פעם אחת באפליקציה.

**מירכאות:** מירכאות עבריות `״ ״` או גרשיים, לא `" "` ישרות שנשברות בציטוט בתוך RTL.

**נקודה בסוף כותרת:** לא. Apple ו-Mailchimp שניהם. סימן שאלה כן.

**קו מפריד ארוך:** אסור לפי `voice.md`, וגם אין לו תפקיד בפיסוק העברי התקני. משכתבים את המשפט.

---

## חלק 6: 15 שכתובים למחרוזות אמיתיות מהאפליקציה

לכל שכתוב יש נימוק אחד ממקור אחד. שכתוב בלי נימוק לא נכנס.

---

**1. `tasks-empty` · חסר נתיב פעולה**
לפני:
```
עוד אין כאן כלום
תכתבי מה שיש בראש. מתי, נחליט אחר כך.
```
אחרי:
```
עוד אין כאן כלום
תכתבי מה שיש בראש. מתי, נחליט אחר כך.
[לכתוב משימה]
```
**למה:** NN/g, הנחיה 3 למצבים ריקים: נתיב ישיר לפעולה, כפתור ולא רק תיאור. `gratitude-empty` כבר עושה את זה עם `לכתוב תודה`. זה פשוט חסר כאן, וזו אי-עקביות ולא החלטה.

---

**2. `24-habits-empty` · שורה שמייצרת עומס במסך בחירה**
לפני:
```
הרגל אחד בכל פעם
מה את רוצה שישתנה?
את לא בונה הרגל. את אוספת הוכחות למי שאת נעשית.
[4 כרטיסי בחירה, כל אחד עם כותרת והסבר]
```
אחרי:
```
מה את רוצה שישתנה?
[4 כרטיסי בחירה, כל אחד עם כותרת והסבר]
```
**למה:** COGA 4.6.3: עד 5 בחירות במסך, ולהסיר תוכן שאינו נחוץ, כי "too much text... can cause cognitive overload, anxiety and loss of focus". כרגע יש במסך שתי כותרות, סיסמה, וארבעה כרטיסים עם שמונה מחרוזות. הסיסמה יפה ואינה עוזרת לה לבחור.

---

**3. `24-habits-empty` · שתי כותרות שמתחרות**
לפני: `הרגל אחד בכל פעם` + `מה את רוצה שישתנה?`
אחרי: `מה את רוצה שישתנה?` בלבד
**למה:** Atlassian, עיקרון 1: "Tell people only what they need to know in the moment and nothing more". הכותרת הראשונה היא הבטחת מוצר, השנייה היא המשימה. במסך פעולה, המשימה מנצחת.

---

**4. `action-celebrate` · שפת איפוס שסותרת את המוצר עצמו**
לפני:
```
4 בלוקים השבוע
מתחיל מחדש כל שבוע.
```
אחרי:
```
<bdi>4</bdi> בלוקים השבוע
```
**למה:** `design-system.md` אוסר "סטריק שמתאפס", והמשפט `מתחיל מחדש כל שבוע` הוא בדיוק הודעת איפוס. Smashing: "missed days should not be framed as failure". המסך חוגג ומזכיר באותה נשימה שהמונה יימחק. אין סיבה להסביר את חוקי הספירה ברגע החגיגה.

---

**5. `action-celebrate` · הזכרת אשמה מכניסה אשמה**
לפני: `עכשיו הפסקה. בלי אשמה.`
אחרי: `עכשיו הפסקה.`
**למה:** Apple: "Avoid sounding accusatory, judgmental". Digital Thriving על פוזיטיביות רעילה: לא לקודד את החוויה מראש. המשפט מניח שהיא מרגישה אשמה על הפסקה, ואם היא לא הרגישה, עכשיו היא יודעת שאולי הייתה צריכה. שלוש האפשרויות מתחת (`לצאת החוצה`, `משהו לאכול`, `כלום, פשוט לשבת`) כבר נותנות את ההיתר בלי לנסח אותו.

---

**6. `today-morning` · הסבר מנגנון בסביל**
לפני: `משם יגיעו שלוש הפעולות של השבוע`
אחרי: `מכאן נבחר שלוש פעולות לשבוע`
**למה:** Mailchimp: קול פעיל, לא סביל. `יגיעו` מסתיר מי עושה מה. וגם: זו הבטחה על העתיד במסך של הבוקר, שלא עוזרת לה עכשיו (Atlassian, עיקרון 1).

---

**7. `today-closed` · נקודה בכותרת**
לפני: `היום סגור.`
אחרי: `היום סגור`
**למה:** Apple, כללי כותרת: בלי פיסוק סופי. Mailchimp: "Avoid using end punctuation" בכותרות, למעט סימן שאלה. הנקודה כאן גם מוסיפה נחרצות שלא נחוצה למסך שסוגר יום.

---

**8. `today-closed` · מספר, מירכאות ומילה של הצבעה**
לפני:
```
163 קולות
בעד "אני אדם שכותב"
```
אחרי:
```
<bdi>163</bdi> קולות
ל״אני אדם שכותב״
```
**למה:** שלוש סיבות, שלושה מקורות. W3C: מספר בתחילת רצף RTL בלי בידוד מוצג במקום הלא נכון. מירכאות ישרות בתוך RTL נשברות, ולכן מירכאות עבריות. ו`בעד` היא שפת הצבעה ולא שפת עדות. `ל` שומרת על המנגנון בלי הפוליטיקה.

---

**9. `tasks` · מונה שמציג חוב**
לפני:
```
מתישהו
17 דברים
```
אחרי:
```
מתישהו
```
עם המספר נחשף רק בפתיחת הקטגוריה.
**למה:** COGA 4.6.3, מילה במילה: תוכן עודף גורם ל"cognitive overload, anxiety and loss of focus". `17 דברים` הוא לא מידע שהיא צריכה כדי לבחור שלוש משימות להיום, וזו בדיוק המשימה של המסך. הוא כן מזכיר לה מה היא לא עשתה.

---

**10. `tasks` · הנחיה שנעלמת**
לפני: `מה עוד בראש?` בתוך השדה
אחרי: `מה עוד בראש?` כתווית קבועה מעל השדה, והשדה ריק
**למה:** יפרח, הנחיה 6: "permanently visible", והנחיה 1: תווית, ואז הנחיה, ואז שדה. Placeholder שנעלם בהקלדה הוא טקסט שלא קיים למי שמתחילה להקליד ומאבדת את החוט, וזה בדיוק קהל היעד.

---

**11. `01-onboarding-welcome` · תנאי שימוש אחרי הכפתור**
לפני: הכפתור `בואי נתחיל`, ומתחתיו `בלחיצה על ״בואי נתחיל״ את מסכימה לתנאי השימוש`
אחרי: אותו משפט בדיוק, **מעל** הכפתור
**למה:** יפרח, הנחיה 1: כל המידע הדרוש לפעולה מופיע לפניה, בסדר מלמעלה למטה. בקורא מסך ובניווט מקלדת, טקסט מתחת לכפתור מגיע אחרי שכבר לחצו.

---

**12. `calm-where` · אין יציאה במסגרת עצמה**
לפני: כותרת, כותרת משנה, שלושה כרטיסים, `הלאה`
אחרי: אותו מסך, ובנוסף `מספיק` גלוי בתחתית
**למה:** עיצוב מודע-טראומה: "Provide straightforward ways to leave or pause interactions". `voice.md` כבר קובע ש`מספיק` היא היציאה ממסכי רגיעה, אבל היא לא מופיעה במסך. אישה שפתחה מסך רגיעה בזמן התקף צריכה לראות את הדרך החוצה בלי לחפש חץ.

---

**13. `calm-where` · תקציב מילים של מסך מצוקה**
לפני (37 מילים בסך הכול):
```
איפה את עכשיו?
לא מה קרה. איפה הגוף.
הכל דולק, אני לא נרגעת / לב מהיר, נשימה קצרה, ראש רץ
כבתה לי המנורה / כבדות, ריחוק, אין כוח לכלום
אני בסדר, רק רוצה רגע / רגועה, וזה זמן טוב לתרגל
```
אחרי (24 מילים):
```
איפה את עכשיו?
לא מה קרה. איפה הגוף.
הכל דולק / לב מהיר, נשימה קצרה
כבתה לי המנורה / כבדות, אין כוח
אני בסדר, רק רוצה רגע
```
**למה:** Covello: עד שלושה מסרים, עד 9 מילים כל אחד, עד 27 בסך הכול, כי רעש מנטלי מוריד את יכולת העיבוד ביותר מ-80 אחוז. האפשרות השלישית לא צריכה תת-שורה בכלל, כי מי שרגועה לא צריכה שיתארו לה את זה.

---

**14. `stuck-choice` · אין יציאה, והמסך תופס אותה**
לפני: `תקועה` / `מה קורה עכשיו?` / `אין תשובה נכונה. תבחרי מה שהכי קרוב.` / ארבע אפשרויות
אחרי: אותו מסך, ובנוסף `לא עכשיו` בתחתית
**למה:** אותו מקור כמו 12, ובנוסף Brignull: הדרך היחידה החוצה ממסך שנפתח ברגע של בושה לא יכולה להיות מובלעת. `voice.md` כבר הגדיר את `לא עכשיו` בתור "יציאה שקטה בלי שנספרת בשום מקום", וזה בדיוק הניסוח הנכון: הוא לא שופט את הבחירה.

---

**15. `35-habit-resistance` · שאלה שהכפתורים לא עונים עליה**
לפני:
```
אולי הרגע שבחרת לא מספיק חזק. לנסות אחר?
[להקטין את הפעולה] [לבחור רגע אחר]
```
אחרי:
```
אפשר להקטין את הפעולה, ואפשר לבחור רגע אחר.
[להקטין את הפעולה] [לבחור רגע אחר]
```
**למה:** Apple: כפתור מתאר את התוצאה של הלחיצה, לא עונה על שאלה. `לנסות אחר?` היא שאלת כן ולא, ומתחתיה שני כפתורים שאף אחד מהם הוא לא כן ולא לא. יפרח, הנחיה 2: האם יבינו מה הלאה רק מהטקסט. הניסוח החדש הוא היגד, והכפתורים הם התשובות.

---

## חלק 7: מצבי כשל ידועים

לכל אחד: איך זה נכתב רע, איך זה נכתב טוב, ומאיזה מקור.

**1. פוזיטיביות רעילה**
רע: `כל יום הוא הזדמנות חדשה. את מסוגלת להכול.`
טוב: `היום זה לא קרה. שאלה אחת וממשיכות.`
מקור: Digital Thriving פוסל אישורים מסוג "I can do anything I put my mind to" ומאשר ניסוחים שמכירים במציאות.

**2. חזרתיות, מצב הכשל שהכי קל לפספס**
רע: אותו `בוקר טוב, יופי שחזרת` כל בוקר, 200 בקרים ברצף.
טוב: או משפט עובדתי לגמרי שלא מתיימר לחמימות (`שני, 27 ביולי`), או מאגר של חמישה ניסוחים שמתחלפים.
מקור: משתמשות Wysa, "repetitive... can trigger a feeling of not being heard"; NN/g על הומור שמתיישן.

**3. התלהבות מזויפת**
רע: `וואו! איזה יום מדהים היה לך!`
טוב: `בלוק שלם!` פעם אחת, אחרי בלוק שבאמת הושלם.
מקור: המחקר של Northeastern נגד בוטים "aggressively enthusiastic... regardless of context".

**4. יחס ילדותי**
רע: `כל הכבוד! את אלופה!`
טוב: `נספר.`
מקור: Mailchimp, "educate people without patronizing"; Apple נגד ניסוח פטרוני.

**5. Confirmshaming בכפתור הסירוב**
רע: `לא, אני מעדיפה להישאר תקועה`
טוב: `לא עכשיו`
מקור: Brignull, "emotional manipulation to misdirect users".

**6. ז'רגון טיפולי במסך**
רע: `לסיים את מחזור הלחץ`
טוב: `לתת לזה להיגמר`
מקור: יפרח, הנחיה 7: "Simple is best", בלי ראשי תיבות ובלי מונחים.

**7. פסקת נחמה ארוכה ברגע הלא נכון**
רע: `אני יודעת שזה מרגיש בלתי אפשרי עכשיו, וזה בסדר גמור להרגיש ככה. הגוף שלך עושה בדיוק את מה שהוא אמור לעשות, וזה יעבור.` (28 מילים במסך מצוקה)
טוב: `זה יעבור.` / `נשימה אחת.` / `אני כאן.`
מקור: Covello, 27-9-3, ורעש מנטלי שמוריד עיבוד ביותר מ-80 אחוז.

**8. דירוג רגשות לטוב ורע**
רע: `איך היה היום? [יום טוב] [יום רע]`
טוב: `איפה את עכשיו?` עם תיאורי גוף, ואפשרות `לא בטוחה`.
מקור: Digital Thriving: לא למסגר רגשות כחיוביים ושליליים, ולכלול אפשרות "Not Sure".

**9. הסבר מנגנון במקום קופי**
רע: `הפעולה תיספר במונה השבועי שלך`
טוב: `נספר.`
מקור: Atlassian, עיקרון 1, ויפרח על תוויות שנשמעות כמו שם שדה.

**10. הצעה שהיא בעצם דחיפה**
רע: `רוצה להוסיף עוד הרגל? זה הזמן להאיץ.`
טוב: כלום. לא כל מסך צריך הצעה.
מקור: Smashing: אסור לערבב פעולת תמיכה עם דחיפה לשדרוג או להרחבה. Atlassian: להיות פחות נועז כשהיא חוששת.

---

## חלק 8: בדיקה לפני שמסך נסגר

מוסיף על הרשימה שב-`voice.md`, לא מחליף אותה.

- [ ] קראתי בקול. זה נשמע כמו משהו שאדם אומר (Polaris)
- [ ] אין יותר מ-5 בחירות עיקריות במסך (COGA 4.6.3)
- [ ] אין משפט מעל 15 מילים בעברית
- [ ] במסך מצוקה: עד 3 מסרים, עד 27 מילים בסך הכול (Covello)
- [ ] במסך מצוקה או במסך תקועה: יש יציאה גלויה בתוך המסך עצמו
- [ ] מצב ריק: יש כפתור, לא רק משפט (NN/g)
- [ ] כל מידע שנחוץ לפעולה נמצא מעל הכפתור, לא מתחתיו (יפרח)
- [ ] אין הנחיה שיושבת רק ב-placeholder (יפרח)
- [ ] כל מספר או שם דינמי עטוף ב-`<bdi>` (W3C)
- [ ] אין נקודה בסוף כותרת
- [ ] המשפט הזה לא יופיע מולה יותר מפעם בשבוע, או שהוא עובדתי לגמרי
- [ ] כפתור הסירוב לא מעריך את הבחירה
- [ ] אין ספירה של החמצות בשום מקום במסך

---

## נספח: מקורות

**עברית ומיקרו-קופי**
- [Yifrah, UX checklist, UX Collective](https://uxdesign.cc/add-these-to-your-ux-checklist-the-invisible-pieces-of-microcopy-youre-forgetting-548f23eb95d8)
- [Yifrah, 7 guidelines for accessible microcopy, Prototypr](https://blog.prototypr.io/7-guidelines-for-writing-accessible-microcopy-8d52575f5d8e)
- [Yifrah, How does meditation sound like, Medium](https://medium.com/@Kinneret/how-does-meditation-sound-like-44c3cc8136fc)
- [microcopy.co.il, כתיבה שוויונית](https://www.microcopy.co.il/how-to-write-for-all-genders)
- [LearnTech פרק 61, סקאלות השפה](https://www.learntech.co.il/podcast/pod61/)
- [אור סגל, 6 טיפים למיקרו-קופי](https://alefalefalef.co.il/microcopy/)
- [W3C, bidi controls vs markup](https://www.w3.org/International/questions/qa-bidi-unicode-controls)

**קול וטון**
- [Mailchimp Content Style Guide](https://github.com/mailchimp/content-style-guide)
- [Atlassian, Voice and tone](https://atlassian.design/foundations/content/voice-tone)
- [Shopify Polaris, Voice and tone](https://polaris-react.shopify.com/content/voice-and-tone)
- [Apple iOS HIG, Alerts](https://codershigh.github.io/guidelines/ios/human-interface-guidelines/ui-views/alerts/index.html)

**רכיבי ממשק**
- [NN/g, Empty States](https://www.nngroup.com/articles/empty-state-interface-design/)
- [NN/g, Error Message Guidelines](https://www.nngroup.com/articles/error-message-guidelines/)
- [NN/g, How Little Do Users Read?](https://www.nngroup.com/articles/how-little-do-users-read/)
- [NN/g, How Users Read on the Web](https://www.nngroup.com/articles/how-users-read-on-the-web/)

**עומס קוגניטיבי ומצוקה**
- [W3C COGA, Making Content Usable](https://www.w3.org/TR/coga-usable/)
- [NHS, How we write](https://service-manual.nhs.uk/content/how-we-write)
- [GOV.UK, Clear language](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/clear-language/)
- [Home Office, Readability](https://design.homeoffice.gov.uk/accessibility/written-content/readability)
- [Covello, Message Mapping (WHO 2002)](https://rcfp.pbworks.com/f/MessageMapping.pdf)
- [PMC10350215, חרדה וקשב והבנת הנקרא](https://pmc.ncbi.nlm.nih.gov/articles/PMC10350215/)
- [PMC12684101, מטא-אנליזה של הסחות דעת בקריאה](https://pmc.ncbi.nlm.nih.gov/articles/PMC12684101/)

**קופי תומך וכשלים**
- [Homan, Designing For Distressed Users, Smashing](https://www.smashingmagazine.com/2026/07/designing-distressed-users-mental-health-apps-ui/)
- [Chaudhry & Debi, ניתוח ביקורות Wysa, mHealth 2024](https://mhealth.amegroups.org/article/view/126211/html)
- [Digital Thriving Playbook, Toxic Positivity](https://digitalthrivingplaybook.org/big-idea/toxic-positivity-and-how-to-avoid-it-in-games-for-emotional-well-being/)
- [Brignull, Confirmshaming](https://www.deceptive.design/book/contents/chapter-16)
- [Content Design London, Trauma-informed content design](https://contentdesign.london/blog/using-trauma-informed-principles-with-content-design)
- [UX Content Collective, Trauma-informed content design](https://uxcontent.com/a-guide-to-trauma-informed-content-design/)
- [The Decision Lab, Streak Creep](https://thedecisionlab.com/insights/consumer-insights/streak-creep-the-perils-of-too-much-gamification)
- [Northeastern chatbot tone research, סיקור](https://www.digitaltrends.com/computing/its-not-just-you-research-says-people-dont-like-overtly-friendly-ai-chatbots/)

**מה לא אומת ולכן לא נכנס:** לא מצאתי מקור ראשוני שמאשר את הטענה הרווחת ש"הבנת הנקרא יורדת בארבע רמות כיתה תחת לחץ", ולכן היא לא מופיעה כאן. גם לא מצאתי מקור מחקרי עם מספרים על כתיבת ממשק ל-ADHD ספציפית. מה שיש הוא COGA, שמשתמש ב-ADHD כדוגמה מפורשת בדפוס 4.4.5, והמטא-אנליזה על הסחות דעת.
