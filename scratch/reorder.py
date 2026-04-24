import re

with open('../html/projets.html', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'(<div class="projects-grid" id="projectsGrid">)(.*?)(    </div><!-- /projects-grid -->)', content, re.DOTALL)
prefix = match.group(1)
grid_content = match.group(2)
suffix = match.group(3)

parts = grid_content.split('      <!-- ')
cards = []
for p in parts:
    if not p.strip(): continue
    card = '      <!-- ' + p
    name_match = re.match(r'\s*<!-- (.*?) -->', card)
    if name_match:
        cards.append((name_match.group(1).strip(), card))
    else:
        print("No name match for:", card[:100])

card_dict = {name: card for name, card in cards}

order = [
    "CineZone",
    "PowerShell",
    "ClassCord",
    "Active Directory",
    "Prometheus + Grafana",
    "Migration Windows 10 → 11 (Entreprise Ragni)",
    "GLPI",
    "Sécurisation Linux",
    "Migration OneDrive",
    "Gestion de parc",
    "Interface Listes de diffusion",
    "Infrastructure IRIS",
    "PRA/PCRA"
]

new_grid = "\n"
for name in order:
    if name in card_dict:
        # Strip trailing whitespace and add exactly two newlines
        new_grid += card_dict[name].rstrip() + "\n\n"

for name, card in cards:
    if name not in order:
        new_grid += card.rstrip() + "\n\n"

new_content = content[:match.start(2)] + new_grid + content[match.start(3):]

with open('../html/projets.html', 'w', encoding='utf-8') as f:
    f.write(new_content)
print("Reorder successful.")
