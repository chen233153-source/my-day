#!/usr/bin/env python3
"""
תופס את הטעות שחזרה שלוש פעמים ב-1.8: להמציא מסך שכבר עוצב.

לכל מסך באב הטיפוס, מחפש במסכים המעוצבים כותרת דומה.
אם נמצאה התאמה והמסך לא מצהיר שהוא נגזר ממנה, זו המצאה.

הרצה:  python3 check.py
יציאה: 0 נקי, 1 נמצאו המצאות.
"""
import re, sys, glob, os, unicodedata

PROTO = os.path.join(os.path.dirname(__file__), 'index.html')
DESIGN = ('/Users/chen/Library/Application Support/Open Design/namespaces/'
          'release-stable/data/projects/brand-product-a4813f')
SKIP = {'index.html','index-1.html','brand.html','flow-board.html',
        'ux-issues.html','nova-ai-splash.html'}

def norm(s):
    s = re.sub(r'<[^>]+>', ' ', s or '')
    s = unicodedata.normalize('NFKC', s)
    s = re.sub(r'[^\w֐-׿ ]', ' ', s)
    return re.sub(r'\s+', ' ', s).strip()

def words(s):
    return {w for w in norm(s).split() if len(w) > 2}

# ── כותרות המסכים המעוצבים
designed = {}
for path in sorted(glob.glob(os.path.join(DESIGN, '*.html'))):
    name = os.path.basename(path)
    if name in SKIP: continue
    html = open(path, encoding='utf-8').read()
    for m in re.finditer(r'<h1[^>]*>(.*?)</h1>', html, re.S):
        h = norm(m.group(1))
        if h and not h.startswith('$'):
            designed.setdefault(name, set()).add(h)

# ── מסכי אב הטיפוס: הכותרת, ושורת המקור שמצהירה מאיפה הוא נגזר
proto = open(PROTO, encoding='utf-8').read()

# מפצלים לפי גבולות המסכים, כדי שכל כותרת תישאר צמודה למקור שלה.
# הגרסה הראשונה של הבדיקה קראה שתי רשימות נפרדות והן יצאו מסונכרנות.
starts = [m.start() for m in re.finditer(r"\{ src:'", proto)]
ends = starts[1:] + [proto.index('\n];', starts[-1]) if starts else len(proto)]
screens = []
for a, b in zip(starts, ends):
    blk = proto[a:b]
    src = re.search(r"\{ src:'(.*?)',", blk, re.S)
    ttl = re.search(r"head\(\s*(?:`[^`]*`|'[^']*')\s*,\s*(?:'([^']*)'|`([^`]*)`)", blk)
    h1 = re.search(r'<h1[^>]*>(.*?)</h1>', blk, re.S)
    title = norm(ttl.group(1) or ttl.group(2)) if ttl else (norm(h1.group(1)) if h1 else '')
    screens.append((src.group(1) if src else '?', title))

bad, ok = [], []
for src, title in screens:
    if not title:
        ok.append((title or '(בלי כותרת)', src, '—')); continue
    tw = words(title)
    hit = None
    for fname, heads in designed.items():
        for h in heads:
            hw = words(h)
            if not hw or not tw: continue
            overlap = len(tw & hw) / min(len(tw), len(hw))
            if overlap >= 0.6:
                hit = (fname, h); break
        if hit: break
    if hit and hit[0].replace('.html','') not in src:
        bad.append((title, src, hit[0], hit[1]))
    else:
        ok.append((title, src, hit[0] if hit else '—'))

print(f"נבדקו {len(screens)} מסכי אב טיפוס מול {len(designed)} מסכים מעוצבים\n")
if bad:
    print("❌ המצאתי מסך שכבר עוצב:\n")
    for title, src, fname, head in bad:
        print(f"   אב הטיפוס : {title}")
        print(f"   מצהיר     : {src}")
        print(f"   כבר קיים  : {fname}  ← \"{head}\"\n")
else:
    print("✅ אף מסך באב הטיפוס לא משכפל מסך מעוצב קיים\n")

for title, src, hit in ok:
    mark = '↳' if hit != '—' else ' '
    print(f"  {mark} {title[:44]:44} {hit if hit!='—' else ''}")

sys.exit(1 if bad else 0)
