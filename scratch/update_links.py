import os

target_dir = r"c:\Users\nedjb\Documents\PROJET IT\PORTFOLIO"

html_old = "../annexes/Tableau%20de%20synth%C3%A8se%20-%20Epreuve%20E4%20-%20BTS%20SIO%202026.pdf"
html_new = "../annexes/Tableau de synthèse - Epreuve E5 - BTS SIO 2026.pdf"

index_old = "annexes/Tableau%20de%20synth%C3%A8se%20-%20Epreuve%20E4%20-%20BTS%20SIO%202026.pdf"
index_new = "annexes/Tableau de synthèse - Epreuve E5 - BTS SIO 2026.pdf"

text_old = "Tableau de synthèse E4"
text_new = "Tableau de synthèse E5"

for root, dirs, files in os.walk(target_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content.replace(html_old, html_new)
            new_content = new_content.replace(index_old, index_new)
            new_content = new_content.replace(text_old, text_new)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {file}")
