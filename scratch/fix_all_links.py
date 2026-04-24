import urllib.parse
import re
import glob

updates = {
    'Cinezone - Epreuve E5 - BTS SIO.pdf': 'N°1 - Cinezone - Annexes 7.pdf',
    'PowerShell - Epreuve E5 - BTS SIO.pdf': 'N°2 - Menu Powershell - Annexes 7.pdf',
    'ClassCord - Epreuve E5 - BTS SIO.pdf': 'N°3 - ClassCord - Annexes 7.pdf',
    'N°4 - AD - Annexes 7.pdf': 'N°4 - AD - Annexes 7.pdf',
    'N°5 - Supervision Infra - Annexes 7.pdf': 'N°5 - Supervision Infra - Annexes 7.pdf',
    'N°6 - GLPI - Annexes 7.pdf': 'N°6 - GLPI - Annexes 7.pdf',
    'N°7 - Securisation Linux multi-services - Annexes 7.pdf': 'N°7 - Securisation Linux multi-services - Annexes 7.pdf',
    'RP01 - Infra Reseau Securise - Annexes 7.pdf': 'RP01 - Infra Reseau Securise - Annexes 7.pdf',
    'RP02 - Conception PRA_PCA - Annexes 7.pdf': 'RP02 - Conception PRA_PCA - Annexes 7.pdf',
    'MigrationOS - Epreuve E5 - BTS SIO.pdf': 'MigrationOS - Epreuve E5 - BTS SIO.pdf',
    'OneDrive - Epreuve E5 - BTS SIO.pdf': 'OneDrive - Epreuve E5 - BTS SIO.pdf',
    'GestionParc - Epreuve E5 - BTS SIO.pdf': 'GestionParc - Epreuve E5 - BTS SIO.pdf',
    'ListesDistribution - Epreuve E5 - BTS SIO.pdf': 'ListesDistribution - Epreuve E5 - BTS SIO.pdf',
    'Tableau de synthèse - Epreuve E4 - BTS SIO 2026.pdf': 'Tableau de synthèse - Epreuve E4 - BTS SIO 2026.pdf',
}

def replacer(match):
    prefix = match.group(1)
    filename = match.group(2)
    
    unquoted = urllib.parse.unquote(filename)
    if unquoted == '#': return match.group(0) # skip #
    
    target_file = updates.get(unquoted, unquoted)
    quoted = urllib.parse.quote(target_file)
    return prefix + quoted

files = glob.glob('../html/*.html') + ['../index.html']

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Use standard string format to avoid escaping issues in different environments
    new_content = re.sub(r'(href=[\'"](?:\.\./|\./)?annexes/)(.*?)(?=[\'"])', replacer, content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(new_content)
print('Done')
