
import os
import pytesseract
from pdf2image import convert_from_path
import json

# Setup Tesseract path
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

pdfs = [
    r"D:\absig\SAA32  Correspondance Réponses.pdf",
    r"D:\absig\NEW SAA CHAPAUX  SAA Chapeux SAA (1).pdf",
    r"D:\absig\TEST SAA - FR.pdf"
]

def analyze_all():
    results = {}
    for pdf in pdfs:
        if not os.path.exists(pdf):
            print(f"Skipping {pdf} (not found)")
            continue
            
        print(f"Opening {pdf}...")
        try:
            # Note: convert_from_path requires poppler.
            # If poppler is missing, this will fail.
            # But we try to see if it's in the system.
            images = convert_from_path(pdf, dpi=200)
            text = ""
            for i, image in enumerate(images):
                print(f"  Processing page {i+1}...")
                text += pytesseract.image_to_string(image, lang='fra')
            
            output_name = os.path.basename(pdf) + ".txt"
            with open(output_name, "w", encoding="utf-8") as f:
                f.write(text)
            results[pdf] = text[:1000] # store preview
            print(f"  Saved to {output_name}")
            
        except Exception as e:
            print(f"  Error: {e}")
            
    return results

if __name__ == "__main__":
    analyze_all()
