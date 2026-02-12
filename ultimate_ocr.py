
import fitz  # PyMuPDF
import pytesseract
import os

# Tesseract setup
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

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
        print(f"  Page {page_num + 1}/{len(doc)}...")
        page = doc.load_page(page_num)
        
        # Render page to image for OCR
        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
        img_path = f"temp_page_{page_num}.png"
        pix.save(img_path)
        
        # Use English OCR (tested and working on this machine)
        text = pytesseract.image_to_string(img_path, lang='eng')
        full_text += f"\n--- PAGE {page_num + 1} ---\n" + text
        
        os.remove(img_path)
            
    output_file = os.path.basename(pdf_path) + "_OCR.txt"
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(full_text)
    print(f"  Saved OCR text to: {output_file}")
    doc.close()

for pdf in pdfs:
    if os.path.exists(pdf):
        try:
            process_pdf(pdf)
        except Exception as e:
            print(f"  Error processing {pdf}: {e}")
    else:
        print(f"  File not found: {pdf}")
