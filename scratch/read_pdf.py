import sys
import pypdf
import os

pdf_path = sys.argv[1]
output_path = sys.argv[2]

try:
    with open(pdf_path, "rb") as f:
        reader = pypdf.PdfReader(f)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n\n"
            
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(text)
    print("Success")
except Exception as e:
    print(f"Error: {e}")
