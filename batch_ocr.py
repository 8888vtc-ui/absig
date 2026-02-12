
import os
import subprocess
import sys

# List of PDFs to analyze
pdfs = [
    r"D:\absig\SAA32  Correspondance Réponses.pdf",
    r"D:\absig\NEW SAA CHAPAUX  SAA Chapeux SAA (1).pdf",
    r"D:\absig\TEST SAA - FR.pdf"
]

tesseract_path = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def analyze_pdf(path):
    print(f"\n--- Analyzing: {os.path.basename(path)} ---")
    
    # Since Tesseract cannot read PDF directly without Poppler/Ghostscript, 
    # and we don't have them easily accessible in PATH, we try to use Tesseract's 
    # internal PDF handling if it works, or we report and wait for user.
    # Actually, Tesseract as installed via UB-Mannheim often includes a DLL for PDF 
    # but needs the command to point to a file.
    
    try:
        # We output to a text file
        output_base = os.path.basename(path).replace(".pdf", "")
        subprocess.run([tesseract_path, path, output_base, "-l", "fra", "--psm", "3"], check=True)
        
        with open(f"{output_base}.txt", "r", encoding="utf-8") as f:
            content = f.read()
            print(f"Extraction successful. First 500 chars:\n{content[:500]}")
            
    except Exception as e:
        print(f"Error analyzing {path}: {e}")
        print("Note: Tesseract usually requires Poppler to process PDF directly.")

for pdf in pdfs:
    if os.path.exists(pdf):
        analyze_pdf(pdf)
    else:
        print(f"File not found: {pdf}")
