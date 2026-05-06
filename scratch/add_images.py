import re

html_path = r"c:\Users\nedjb\Documents\PROJET IT\PORTFOLIO\html\projets.html"
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. OneDrive
# Find the exact string to replace in the onedrive panel
onedrive_old = """            <div class="ent-gantt-row" style="grid-template-columns: 200px repeat(6, 1fr);">
              <div class="ent-gantt-task-name">Clôture & Documentation</div>
              <div class="ent-gantt-bar" style="grid-column: 7 / span 1;">S10</div>
            </div>
          </div>

          <div class="ent-section-label">Planification des sprints</div>"""

onedrive_new = """            <div class="ent-gantt-row" style="grid-template-columns: 200px repeat(6, 1fr);">
              <div class="ent-gantt-task-name">Clôture & Documentation</div>
              <div class="ent-gantt-bar" style="grid-column: 7 / span 1;">S10</div>
            </div>
          </div>
          <div class="ent-gantt-container" style="display: flex; flex-direction: column; gap: 20px;">
            <img src="../img/Jira - Migration cloud.jpg" alt="Suivi Jira de la migration OneDrive" class="ent-gantt-img">
            <img src="../img/SPMT - Migration cloud.jpg" alt="Outil SPMT Migration Cloud" class="ent-gantt-img">
            <img src="../img/barre de stockage - Migration cloud.png" alt="Barre de stockage libérée" class="ent-gantt-img">
            <p class="ent-img-desc">Aperçu du suivi Jira, de l'utilisation de l'outil SPMT et du résultat sur l'espace de stockage.</p>
          </div>

          <div class="ent-section-label">Planification des sprints</div>"""

content = content.replace(onedrive_old, onedrive_new)


# 2. Parc
# Find the exact string to replace in the parc panel
parc_old = """            <div class="ent-gantt-row" style="grid-template-columns: 200px repeat(4, 1fr);">
              <div class="ent-gantt-task-name">Tests & procédure</div>
              <div class="ent-gantt-bar g-green" style="grid-column: 5 / span 1;">S4</div>
            </div>
          </div>

          <div class="ent-section-label">Planification des sprints</div>"""

parc_new = """            <div class="ent-gantt-row" style="grid-template-columns: 200px repeat(4, 1fr);">
              <div class="ent-gantt-task-name">Tests & procédure</div>
              <div class="ent-gantt-bar g-green" style="grid-column: 5 / span 1;">S4</div>
            </div>
          </div>
          <div class="ent-gantt-container" style="display: flex; flex-direction: column; gap: 20px;">
            <img src="../img/Cockpit - inventaire.jpg" alt="Inventaire dans Cockpit" class="ent-gantt-img">
            <p class="ent-img-desc">Aperçu de la gestion des équipements et de l'inventaire via Cockpit.</p>
          </div>

          <div class="ent-section-label">Planification des sprints</div>"""

content = content.replace(parc_old, parc_new)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Images added to OneDrive and Parc modals.")
