
import fitz
import pytesseract
import os

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

pdf_path = r"D:/absig/SAA32  Correspondance Réponses.pdf"

def test_ocr_eng():
    doc = fitz.open(pdf_path)
    page = doc.load_page(0)
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
    pix.save("test_ocr.png")
    
    # Use English
    text = pytesseract.image_to_string("test_ocr.png", lang='eng')
    print("--- OCR Result (ENG) ---")
    print(text[:1000])
    
    doc.close()

if __name__ == "__main__":
    test_ocr_eng()
