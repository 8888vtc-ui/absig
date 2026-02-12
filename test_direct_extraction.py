
import fitz  # PyMuPDF
import os

pdfs = [
    r"D:\absig\SAA32  Correspondance Réponses.pdf",
    r"D:\absig\NEW SAA CHAPAUX  SAA Chapeux SAA (1).pdf",
    r"D:\absig\TEST SAA - FR.pdf"
]

def process_pdf(pdf_path):
    print(f"\n--- PROCESSING: {os.path.basename(pdf_path)} ---")
    doc = fitz.open(pdf_path)
    full_text = ""
    
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text = page.get_text()
        if text.strip():
            print(f"  Page {page_num + 1}: Text found.")
            full_text += f"\n--- PAGE {page_num + 1} ---\n" + text
        else:
            print(f"  Page {page_num + 1}: BLANK (Scanned?)")
            
    output_file = os.path.basename(pdf_path) + "_TEXT_ONLY.txt"
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(full_text)
    print(f"  Saved to: {output_file}")
    doc.close()

for pdf in pdfs:
    if os.path.exists(pdf):
        process_pdf(pdf)
    else:
        print(f"  File not found: {pdf}")
