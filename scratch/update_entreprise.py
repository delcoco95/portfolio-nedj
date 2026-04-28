import re

html_path = r"c:\Users\nedjb\Documents\PROJET IT\PORTFOLIO\html\entreprise.html"
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add Logo
content = content.replace(
    '<h1>Groupe Ragni</h1>',
    '<h1>Groupe Ragni <img src="../img/ragni light.webp" alt="Logo Groupe Ragni" class="ragni-logo"></h1>'
)

# Update L'entreprise
content = content.replace(
    'Entreprise fran&ccedil;aise sp&eacute;cialis&eacute;e dans la conception et la fabrication de luminaires pour l\'&eacute;clairage public',
    'Entreprise fran&ccedil;aise op&eacute;rant &agrave; l\'international, sp&eacute;cialis&eacute;e dans la conception et la fabrication de luminaires pour l\'&eacute;clairage public'
)

# Update Mon rôle
content = content.replace(
    '<p class="section-sub">Missions concr&egrave;tes men&eacute;es en alternance, align&eacute;es sur les projets IT du Groupe Ragni.</p>',
    '<p class="section-sub">Missions concr&egrave;tes men&eacute;es en alternance, align&eacute;es sur les projets IT du Groupe Ragni, avec une port&eacute;e internationale pour la gestion de parc et le support.</p>'
)

# Replace Icons with Graphic Elements
content = content.replace(
    '<span class="mission-icon"><i class="fa-solid fa-rocket"></i></span>',
    '<div class="mission-graphic" style="--hue: 210;"><div class="mission-orb"></div></div>'
)
content = content.replace(
    '<span class="mission-icon"><i class="fa-solid fa-folder-open"></i></span>',
    '<div class="mission-graphic" style="--hue: 280;"><div class="mission-orb"></div></div>'
)
content = content.replace(
    '<span class="mission-icon"><i class="fa-solid fa-headset"></i></span>',
    '<div class="mission-graphic" style="--hue: 150;"><div class="mission-orb"></div></div>'
)
content = content.replace(
    '<span class="mission-icon"><i class="fa-solid fa-file-lines"></i></span>',
    '<div class="mission-graphic" style="--hue: 30;"><div class="mission-orb"></div></div>'
)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)

# Update CSS
css_path = r"c:\Users\nedjb\Documents\PROJET IT\PORTFOLIO\css\entreprise.css"
with open(css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

# Remove old icon css
css_content = css_content.replace('.mission-icon i {\n  color: var(--accent);\n}', '')
css_content = css_content.replace('.mission-icon {\n  font-size: 22px;\n  margin-bottom: 12px;\n  display: block;\n}', '')

# Add new styles
new_css = """
/* ── RAGNI LOGO ── */
.ragni-logo {
  height: 0.9em;
  vertical-align: baseline;
  margin-left: 15px;
}
[data-theme="dark"] .ragni-logo {
  filter: invert(1) brightness(1.2);
}

/* ── MISSION GRAPHIC ── */
.mission-graphic {
  position: relative;
  width: 48px;
  height: 48px;
  margin-bottom: 20px;
  border-radius: 12px;
  background: hsla(var(--hue), 80%, 60%, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid hsla(var(--hue), 80%, 60%, 0.2);
  overflow: hidden;
}
.mission-orb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: hsla(var(--hue), 80%, 60%, 1);
  box-shadow: 0 0 20px hsla(var(--hue), 80%, 60%, 0.8), 0 0 40px hsla(var(--hue), 80%, 60%, 0.5);
}
"""

css_content += new_css

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css_content)

print("Entreprise Updated")
