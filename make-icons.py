#!/usr/bin/env python3
"""מייצר את אייקוני ה-PWA מהגרדיאנט של הדיזיין סיסטם. ספרייה סטנדרטית בלבד."""
import math, struct, zlib, os

STOPS = [(0.00, 0.45, 0.18, 280), (0.33, 0.60, 0.14, 275),
         (0.66, 0.75, 0.10, 340), (1.00, 0.88, 0.06, 50)]


def oklch_to_rgb(L, C, H):
    h = math.radians(H)
    a, b = C * math.cos(h), C * math.sin(h)
    l_ = L + 0.3963377774 * a + 0.2158037573 * b
    m_ = L - 0.1055613458 * a - 0.0638541728 * b
    s_ = L - 0.0894841775 * a - 1.2914855480 * b
    l, m, s = l_ ** 3, m_ ** 3, s_ ** 3
    lin = (4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
           -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
           -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s)
    out = []
    for v in lin:
        v = max(0.0, min(1.0, v))
        v = 12.92 * v if v <= 0.0031308 else 1.055 * v ** (1 / 2.4) - 0.055
        out.append(int(round(max(0.0, min(1.0, v)) * 255)))
    return tuple(out)


def gradient_at(t):
    t = max(0.0, min(1.0, t))
    for i in range(len(STOPS) - 1):
        p0, p1 = STOPS[i], STOPS[i + 1]
        if p0[0] <= t <= p1[0]:
            f = 0 if p1[0] == p0[0] else (t - p0[0]) / (p1[0] - p0[0])
            L = p0[1] + (p1[1] - p0[1]) * f
            C = p0[2] + (p1[2] - p0[2]) * f
            dh = (p1[3] - p0[3] + 180) % 360 - 180   # הקשת הקצרה, כמו ב-CSS
            H = p0[3] + dh * f
            return oklch_to_rgb(L, C, H)
    return oklch_to_rgb(*STOPS[-1][1:])


def build(size):
    cx = cy = (size - 1) / 2.0
    r_out = size * 0.30
    r_in = size * 0.225
    ss = 3  # דגימת יתר להחלקת קצוות
    rows = []
    for y in range(size):
        row = bytearray()
        for x in range(size):
            t = ((x / (size - 1)) + (y / (size - 1))) / 2.0   # ציר 135 מעלות
            br, bg, bb = gradient_at(t)
            hits = 0
            for sy in range(ss):
                for sx in range(ss):
                    px = x + (sx + 0.5) / ss - 0.5
                    py = y + (sy + 0.5) / ss - 0.5
                    d = math.hypot(px - cx, py - cy)
                    if r_in <= d <= r_out:
                        hits += 1
            a = hits / (ss * ss)
            row += bytes((round(br + (255 - br) * a),
                          round(bg + (255 - bg) * a),
                          round(bb + (255 - bb) * a)))
        rows.append(bytes(row))
    return rows


def write_png(path, size):
    rows = build(size)
    raw = b''.join(b'\x00' + r for r in rows)

    def chunk(tag, data):
        c = struct.pack('>I', len(data)) + tag + data
        return c + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)

    png = (b'\x89PNG\r\n\x1a\n'
           + chunk(b'IHDR', struct.pack('>IIBBBBB', size, size, 8, 2, 0, 0, 0))
           + chunk(b'IDAT', zlib.compress(raw, 9))
           + chunk(b'IEND', b''))
    with open(path, 'wb') as f:
        f.write(png)
    print(f'{path}  {size}x{size}  {len(png)} bytes')


here = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'icons')
os.makedirs(here, exist_ok=True)
for s in (180, 192, 512):
    write_png(os.path.join(here, f'icon-{s}.png'), s)
