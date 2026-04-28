import re

html_path = r"c:\Users\nedjb\Documents\PROJET IT\PORTFOLIO\html\projets.html"
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remplacements globaux pour les titres des tooltips
content = content.replace('<h4><i class="fa-solid fa-bullseye"></i> Besoin</h4>', '<h4>• Besoin</h4>')
content = content.replace('<h4><i class="fa-solid fa-hammer"></i> Réalisation</h4>', '<h4>• Solution</h4>')
content = content.replace('<h4><i class="fa-solid fa-lightbulb"></i> Compétences</h4>', '<h4>• Compétences</h4>')


# Remplacements spécifiques pour chaque projet (bloc <ul>...</ul>)

# 1. CineZone
cinezone_old = """            <ul>
              <li>Développer la présence en ligne</li>
              <li>Travailler en mode projet</li>
              <li>Organiser son développement professionnel</li>
            </ul>"""
cinezone_new = """            <ul>
              <li>- Participer à l’évolution d’un site Web exploitant les données de l’organisation.<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Sécurisation des accès et intégration de l'API REST (TMDB).</span></li>
              <li>- Analyser les objectifs et les modalités d’organisation d’un projet<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Analyse du besoin, conception de la solution en binôme et planification.</span></li>
              <li>- Déployer un service<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Installation du serveur web Apache et configuration du pare-feu.</span></li>
            </ul>"""
content = content.replace(cinezone_old, cinezone_new)

# 2. PowerShell
ps_old = """            <ul>
              <li>Travailler en mode projet</li>
              <li>Mettre à disposition un service informatique</li>
              <li>Gérer le patrimoine informatique</li>
            </ul>"""
ps_new = """            <ul>
              <li>- Exploiter des référentiels, normes et standards adoptés par le prestataire informatique<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Utilisation des cmdlets officiels PowerShell et documentation Microsoft.</span></li>
              <li>- Gérer des sauvegardes<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Création de snapshots (points de restauration) de la VM Windows Server.</span></li>
              <li>- Déployer un service<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Automatisation du déploiement des rôles AD, DNS et DHCP.</span></li>
              <li>- Mettre en place son environnement d’apprentissage personnel<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Configuration de VirtualBox et Visual Studio Code pour le script.</span></li>
              <li>- Développer son projet professionnel<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Création d'une documentation technique à destination des techniciens.</span></li>
            </ul>"""
content = content.replace(ps_old, ps_new)

# 3. ClassCord
cc_old = """            <ul>
              <li>Développer la présence en ligne</li>
              <li>Mettre à disposition un service informatique</li>
              <li>Travailler en mode projet</li>
            </ul>"""
cc_new = """            <ul>
              <li>- Mettre en place et vérifier les niveaux d’habilitation associés à un service<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Interface d'administration, hash SHA-256 et gestion des droits.</span></li>
              <li>- Traiter des demandes concernant les services réseau et système, applicatifs<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Configuration des règles de pare-feu UFW et conteneurisation Docker.</span></li>
              <li>- Déployer un service<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Déploiement d'un serveur de messagerie Python avec base SQLite.</span></li>
            </ul>"""
content = content.replace(cc_old, cc_new)

# 4. Active Directory
ad_old = """            <ul>
              <li>Gérer le patrimoine informatique</li>
              <li>Mettre à disposition un service informatique</li>
              <li>Répondre aux incidents</li>
            </ul>"""
ad_new = """            <ul>
              <li>- Recenser et identifier les ressources numériques<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Création de l'arborescence (OUs) et gestion des ressources AD.</span></li>
              <li>- Mettre en place et vérifier les niveaux d’habilitation associés à un service<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Application des stratégies globales via GPO et gestion des rôles.</span></li>
              <li>- Gérer des sauvegardes<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Sauvegarde de l'état du système du contrôleur de domaine.</span></li>
              <li>- Déployer un service<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Installation de Windows Server 2022 et configuration DNS/DHCP.</span></li>
              <li>- Développer son projet professionnel<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Acquisition d'une expertise en administration système Microsoft.</span></li>
            </ul>"""
content = content.replace(ad_old, ad_new)

# 5. Prometheus + Grafana
pg_old = """            <ul>
              <li>Gérer le patrimoine informatique</li>
              <li>Répondre aux incidents</li>
              <li>Mettre à disposition un service</li>
            </ul>"""
pg_new = """            <ul>
              <li>- Recenser et identifier les ressources numériques<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Configuration des exporters Prometheus pour cibler les serveurs.</span></li>
              <li>- Vérifier les conditions de la continuité d’un service informatique<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Surveillance en temps réel de l'état des services via Grafana.</span></li>
              <li>- Collecter, suivre et orienter des demandes<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Configuration d'Alertmanager pour l'envoi d'alertes par mail (Postfix).</span></li>
              <li>- Réaliser les tests d’intégration et d’acceptation d’un service<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Validation du déclenchement des alertes en simulant une panne.</span></li>
              <li>- Développer son projet professionnel<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Documentation de la chaîne complète de supervision.</span></li>
            </ul>"""
content = content.replace(pg_old, pg_new)

# 6. GLPI
glpi_old = """            <ul>
              <li>Répondre aux incidents</li>
              <li>Gérer le patrimoine informatique</li>
              <li>Organiser son développement professionnel</li>
            </ul>"""
glpi_new = """            <ul>
              <li>- Recenser et identifier les ressources numériques<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Déploiement d'agents d'inventaire automatisés sur les postes.</span></li>
              <li>- Collecter, suivre et orienter des demandes<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Mise en place du module Helpdesk (système de ticketing).</span></li>
              <li>- Déployer un service<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Installation de la stack LAMP et déploiement de l'application GLPI.</span></li>
              <li>- Développer son projet professionnel<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Maîtrise des outils ITSM standards de l'industrie.</span></li>
            </ul>"""
content = content.replace(glpi_old, glpi_new)

# 7. Sécurisation Linux
sec_old = """            <ul>
              <li>Gérer le patrimoine informatique</li>
              <li>Mettre à disposition un service</li>
              <li>Répondre aux incidents</li>
            </ul>"""
sec_new = """            <ul>
              <li>- Mettre en place et vérifier les niveaux d’habilitation associés à un service<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Gestion des identités avec OpenLDAP et accès restreints.</span></li>
              <li>- Vérifier les conditions de la continuité d’un service informatique<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Durcissement d'Ubuntu Server pour prévenir les interruptions.</span></li>
              <li>- Traiter des demandes concernant les services réseau et système, applicatifs<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Configuration d'un accès distant sécurisé via WireGuard VPN.</span></li>
              <li>- Traiter des demandes concernant les applications<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Déploiement d'un antivirus (ClamAV) en conteneur Docker.</span></li>
              <li>- Analyser les objectifs et les modalités d’organisation d’un projet<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Utilisation de Vagrant pour orchestrer l'environnement.</span></li>
              <li>- Déployer un service<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Mise en production de l'infrastructure sécurisée.</span></li>
              <li>- Mettre en œuvre des outils et stratégies de veille informationnelle<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Recherche des meilleures pratiques de sécurité (CIS Benchmarks).</span></li>
              <li>- Développer son projet professionnel<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Consolidation des compétences en cybersécurité système.</span></li>
            </ul>"""
content = content.replace(sec_old, sec_new)

# 8. Infrastructure IRIS
iris_old = """            <ul>
              <li>Gérer le patrimoine informatique</li>
              <li>Mettre à disposition un service</li>
              <li>Travailler en mode projet</li>
            </ul>"""
iris_new = """            <ul>
              <li>- Recenser et identifier les ressources numériques<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Cartographie du réseau et configuration des switchs Cisco (VLANs).</span></li>
              <li>- Mettre en place et vérifier les niveaux d’habilitation associés à un service<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Déploiement du contrôle d'accès 802.1X via FreeRADIUS et OpenLDAP.</span></li>
              <li>- Gérer des sauvegardes<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Sauvegarde des configurations des équipements réseaux Cisco (startup-config).</span></li>
              <li>- Traiter des demandes concernant les services réseau et système, applicatifs<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Segmenter le réseau avec routage inter-VLAN.</span></li>
              <li>- Traiter des demandes concernant les applications<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Configuration du portail d'authentification réseau.</span></li>
              <li>- Analyser les objectifs et les modalités d’organisation d’un projet<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Conception de l'architecture réseau répondant aux besoins de l'école.</span></li>
              <li>- Planifier les activités<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Organisation du déploiement par phases (câblage, switchs, serveurs).</span></li>
              <li>- Évaluer les indicateurs de suivi d’un projet et analyser les écarts<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Tests de connectivité et ajustement des règles de filtrage.</span></li>
              <li>- Déployer un service<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Mise en production de l'infrastructure réseau complète de l'école.</span></li>
              <li>- Développer son projet professionnel<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Travail sur du matériel réel (Cisco) en environnement de production.</span></li>
            </ul>"""
content = content.replace(iris_old, iris_new)

# 9. PRA/PCA
pra_old = """            <ul>
              <li>Gérer le patrimoine informatique</li>
              <li>Travailler en mode projet</li>
              <li>Organiser son développement professionnel</li>
            </ul>"""
pra_new = """            <ul>
              <li>- Vérifier les conditions de la continuité d’un service informatique<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Réplication synchrone DRBD (RPO=0) et failover automatique Keepalived.</span></li>
              <li>- Gérer des sauvegardes<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Mise en place de BorgBackup (sauvegarde horaire chiffrée AES-256).</span></li>
              <li>- Collecter, suivre et orienter des demandes<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Supervision des états de réplication via Prometheus/Grafana.</span></li>
              <li>- Traiter des demandes concernant les services réseau et système, applicatifs<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Configuration réseau des 3 VMs Vagrant pour la haute disponibilité.</span></li>
              <li>- Analyser les objectifs et les modalités d’organisation d’un projet<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Conception de l'architecture PCA/PRA face aux risques de ransomwares.</span></li>
              <li>- Planifier les activités<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Définition des RTO et RPO cibles pour chaque service critique.</span></li>
              <li>- Réaliser les tests d’intégration et d’acceptation d’un service<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Exécution d'un test de restauration validé avec succès.</span></li>
              <li>- Déployer un service<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Déploiement des solutions via Docker Compose.</span></li>
              <li>- Mettre en œuvre des outils et stratégies de veille informationnelle<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Recherche sur les vulnérabilités aux ransomwares et l'immuabilité.</span></li>
              <li>- Développer son projet professionnel<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Application des concepts avancés de résilience des systèmes.</span></li>
            </ul>"""
content = content.replace(pra_old, pra_new)

# 10. Migration Win10
win_old = """            <ul>
              <li>Organiser son développement professionnel</li>
              <li>Gérer le patrimoine informatique</li>
              <li>Mettre à disposition un service informatique</li>
            </ul>"""
win_new = """            <ul>
              <li>- Recenser et identifier les ressources numériques<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Bilan matériel du parc pour analyse de compatibilité Windows 11.</span></li>
              <li>- Traiter des demandes concernant les services réseau et système, applicatifs<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Tests de validation applicative et résolution des cas d'échec de migration.</span></li>
            </ul>"""
content = content.replace(win_old, win_new)

# 11. OneDrive
od_old = """            <ul>
              <li>Travailler en mode projet</li>
              <li>Organiser son développement professionnel</li>
              <li>Gérer le patrimoine informatique</li>
            </ul>"""
od_new = """            <ul>
              <li>- Recenser et identifier les ressources numériques<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Analyse des 5 To de données sur les serveurs de fichiers locaux.</span></li>
              <li>- Collecter, suivre et orienter des demandes<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Suivi des anomalies utilisateurs lors de la migration et accompagnement.</span></li>
            </ul>"""
content = content.replace(od_old, od_new)

# 12. Gestion Parc
parc_old = """            <ul>
              <li>Gérer le patrimoine informatique</li>
              <li>Organiser son développement professionnel</li>
              <li>Travailler en mode projet</li>
            </ul>"""
parc_new = """            <ul>
              <li>- Recenser et identifier les ressources numériques<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Inventaire complet du parc IT avec installation des agents Cockpit.</span></li>
              <li>- Collecter, suivre et orienter des demandes<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Nettoyage et conformité des données remontées vers la solution ITSM.</span></li>
            </ul>"""
content = content.replace(parc_old, parc_new)

# 13. Interface Listes Distribution
dl_old = """            <ul>
              <li>Mettre à disposition un service informatique</li>
              <li>Développer la présence en ligne</li>
              <li>Organiser son développement professionnel</li>
            </ul>"""
dl_new = """            <ul>
              <li>- Collecter, suivre et orienter des demandes<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Alléger la charge du support IT niveau 1 en décentralisant la gestion.</span></li>
              <li>- Traiter des demandes concernant les applications<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Intégration de l'interface dans Outlook et l'Intranet via GPO.</span></li>
              <li>- Participer à la valorisation de l’image de l’organisation sur les médias numériques en tenant compte du cadre juridique et des enjeux économiques<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Développement d'une interface web moderne et sécurisée connectée à Microsoft 365.</span></li>
              <li>- Analyser les objectifs et les modalités d’organisation d’un projet<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Conception du Front End et connexion aux API Microsoft.</span></li>
              <li>- Planifier les activités<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Déploiement progressif par équipes/départements.</span></li>
              <li>- Déployer un service<br>&nbsp;&nbsp;<span style="color:#aaa; font-size:0.9em;">Preuve : Mise en production de l'outil de gestion des listes de diffusion.</span></li>
            </ul>"""
content = content.replace(dl_old, dl_new)


with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("HTML Update Complete")
