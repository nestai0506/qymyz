# -*- coding: utf-8 -*-
import base64, os, re

ROOT = os.path.dirname(os.path.abspath(__file__))

def b64(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("ascii")

def datauri(path, mime="image/jpeg"):
    return f"data:{mime};base64,{b64(path)}"

# --- суреттердің data-URI-лары ---
hero_uri  = datauri(os.path.join(ROOT, "images", "hero.jpg"))
bg_uri    = datauri(os.path.join(ROOT, "images", "about-bg.jpg"))
about_uri = datauri(os.path.join(ROOT, "images", "about.jpg"))
aldar_uri = datauri(os.path.join(ROOT, "images", "aldar.webp"), "image/webp")

# --- CSS ---
with open(os.path.join(ROOT, "styles.css"), "r", encoding="utf-8") as f:
    css = f.read()
css = css.replace('url("images/hero.jpg")', f'url("{hero_uri}")')
css = css.replace('url("images/about-bg.jpg")', f'url("{bg_uri}")')

# --- JS ---
with open(os.path.join(ROOT, "script.js"), "r", encoding="utf-8") as f:
    js = f.read()

# --- HTML ---
with open(os.path.join(ROOT, "index.html"), "r", encoding="utf-8") as f:
    html = f.read()

# сыртқы CSS сілтемесін inline <style>-ке ауыстыру (?v=N нұсқасымен де сәйкес келеді)
html, n_css = re.subn(
    r'<link rel="stylesheet" href="styles\.css(?:\?v=\d+)?"\s*/?>',
    lambda m: "<style>\n" + css + "\n</style>",
    html
)
# about суретін data-URI-ге
html, n_img = re.subn(r'src="images/about\.jpg"', lambda m: f'src="{about_uri}"', html)
# hero-дағы бала суретін data-URI-ге
html, n_kid = re.subn(r'src="images/aldar\.webp"', lambda m: f'src="{aldar_uri}"', html)
assert n_kid == 1, f"aldar.webp inline failed: {n_kid}"
# сыртқы JS-ті inline <script>-ке
html, n_js = re.subn(
    r'<script src="script\.js(?:\?v=\d+)?"></script>',
    lambda m: "<script>\n" + js + "\n</script>",
    html
)
assert n_css == 1 and n_js == 1 and n_img == 1, f"inline failed: css={n_css} js={n_js} img={n_img}"

out = os.path.join(ROOT, "қымыз.html")
with open(out, "w", encoding="utf-8") as f:
    f.write(html)

print("OK - size:", round(os.path.getsize(out)/1024), "KB")
