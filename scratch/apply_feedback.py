import re

html_path = r"c:\Users\nedjb\Documents\PROJET IT\PORTFOLIO\html\entreprise.html"
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the hero section in entreprise.html
old_hero = """  <!-- PAGE HERO -->
  <div class="page-hero">
    <div class="page-hero-tag">Alternance &middot; Sept. 2025 &mdash; Sept. 2026</div>
    <h1>Groupe Ragni <img src="../img/ragni light.webp" alt="Logo Groupe Ragni" class="ragni-logo"></h1>
    <p>Technicien Support Informatique en alternance &mdash; &eacute;clairage public &amp; solutions connect&eacute;es.</p>
  </div>"""

new_hero = """  <!-- PAGE HERO -->
  <div class="page-hero" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
    <div class="hero-content" style="flex: 1; min-width: 300px;">
      <div class="page-hero-tag">Alternance &middot; Sept. 2025 &mdash; Sept. 2026</div>
      <h1>Groupe Ragni</h1>
      <p>Technicien Support Informatique en alternance &mdash; &eacute;clairage public &amp; solutions connect&eacute;es.</p>
    </div>
    <div class="hero-logo" style="flex-shrink: 0; display: flex; align-items: center; justify-content: center; padding: 20px;">
      <img src="../img/ragni light.webp" alt="Logo Groupe Ragni" class="ragni-logo-hero">
    </div>
  </div>"""
content = content.replace(old_hero, new_hero)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)

# Update css/entreprise.css for the new logo class
css_path = r"c:\Users\nedjb\Documents\PROJET IT\PORTFOLIO\css\entreprise.css"
with open(css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

old_logo_css = """/* ── RAGNI LOGO ── */
.ragni-logo {
  height: 0.9em;
  vertical-align: baseline;
  margin-left: 15px;
}
[data-theme="dark"] .ragni-logo {
  filter: invert(1) brightness(1.2);
}"""

new_logo_css = """/* ── RAGNI LOGO ── */
.ragni-logo-hero {
  max-width: 250px;
  height: auto;
  filter: brightness(0); /* Noir en mode clair */
  transition: filter 0.4s ease;
}
[data-theme="dark"] .ragni-logo-hero {
  filter: brightness(0) invert(1); /* Blanc en mode sombre */
}"""
css_content = css_content.replace(old_logo_css, new_logo_css)

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css_content)

# Update css/projets.css to remove overflow: hidden from projects-grid
projets_css_path = r"c:\Users\nedjb\Documents\PROJET IT\PORTFOLIO\css\projets.css"
with open(projets_css_path, 'r', encoding='utf-8') as f:
    projets_css = f.read()

projets_css = projets_css.replace('  overflow: hidden;\n}', '}')

with open(projets_css_path, 'w', encoding='utf-8') as f:
    f.write(projets_css)

# Update html/projets.html text for IRIS
projets_html_path = r"c:\Users\nedjb\Documents\PROJET IT\PORTFOLIO\html\projets.html"
with open(projets_html_path, 'r', encoding='utf-8') as f:
    projets_html = f.read()

old_desc = "Infrastructure segmentée avec auth 802.1X via FreeRADIUS + OpenLDAP sur matériel Cisco réel."
new_desc = "Infrastructure segmentée avec auth 802.1X via Active Directory avec NPS radius sur matériel Cisco réel."
projets_html = projets_html.replace(old_desc, new_desc)

with open(projets_html_path, 'w', encoding='utf-8') as f:
    f.write(projets_html)

print("Updates applied")
