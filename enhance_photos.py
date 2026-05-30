"""
Mejora fotos de trayectoria y convierte planos PDF a imágenes.
"""
import os
import fitz  # PyMuPDF
from PIL import Image, ImageEnhance, ImageFilter

BASE = r"C:\Users\Fernando\estudio-arquitectura\img\trayectoria"

def enhance(path_in, path_out=None):
    if path_out is None:
        path_out = path_in
    img = Image.open(path_in).convert("RGB")
    # Contraste
    img = ImageEnhance.Contrast(img).enhance(1.35)
    # Brillo
    img = ImageEnhance.Brightness(img).enhance(1.10)
    # Saturación
    img = ImageEnhance.Color(img).enhance(1.25)
    # Nitidez
    img = ImageEnhance.Sharpness(img).enhance(1.4)
    img.save(path_out, "JPEG", quality=88, optimize=True)
    print(f"  OK {os.path.basename(path_out)}")

# ── Mejorar fotos de los 3 edificios ─────────────────────────────────────────
for folder in ["ercilia1", "ercilia2", "iris2"]:
    folder_path = os.path.join(BASE, folder)
    print(f"\n=== {folder} ===")
    for f in sorted(os.listdir(folder_path)):
        if f.lower().endswith((".jpg", ".jpeg")):
            enhance(os.path.join(folder_path, f))

# ── Convertir planos PDF a imágenes ──────────────────────────────────────────
planos = [
    # (pdf_path, destino_img, caption_label)
    (r"E:\OBRAS\EDIFICIO E-1 estudio cordoba\ERCILIA OBRA-2-A3- P.BAJA.pdf",
     os.path.join(BASE, "ercilia1", "plano-pb.jpg"), "Ercilia I — Planta Baja"),
    (r"E:\OBRAS\EDIFICIO E-1 estudio cordoba\ERCILIA OBRA-2-A3- P.2do a 5to.pdf",
     os.path.join(BASE, "ercilia1", "plano-tipo.jpg"), "Ercilia I — Planta Tipo 2do a 5to"),
    (r"E:\OBRAS\EDIFICIO E-1 estudio cordoba\ERCILIA OBRA-2-A3- terraza.pdf",
     os.path.join(BASE, "ercilia1", "plano-azotea.jpg"), "Ercilia I — Planta Azotea"),
    (r"E:\OBRAS\EDIFICIO I-2 estudio cordoba\planta modif 21-09-A3 planta baja.pdf",
     os.path.join(BASE, "iris2", "plano-pb.jpg"), "Iris II — Planta Baja"),
    (r"E:\OBRAS\EDIFICIO I-2 estudio cordoba\planta modif 21-09-A3 planta 1 piso.pdf",
     os.path.join(BASE, "iris2", "plano-tipo.jpg"), "Iris II — Planta 1er Piso"),
    (r"E:\OBRAS\EDIFICIO I-2 estudio cordoba\planta modif 21-09-A3 azotea.pdf",
     os.path.join(BASE, "iris2", "plano-azotea.jpg"), "Iris II — Planta Azotea"),
    (r"E:\OBRAS\EDIFICIO I-2 estudio cordoba\planta modif 21-09-A3 corte A-A.pdf",
     os.path.join(BASE, "iris2", "plano-corte.jpg"), "Iris II — Corte A-A"),
    (r"E:\OBRAS\EDIFICIO I-2 estudio cordoba\planta modif 21-09-A3 fachada pcipal.pdf",
     os.path.join(BASE, "iris2", "plano-fachada.jpg"), "Iris II — Fachada Principal"),
]

print("\n=== Convirtiendo planos ===")
for pdf_path, out_path, label in planos:
    if not os.path.exists(pdf_path):
        print(f"  NO No encontrado: {os.path.basename(pdf_path)}")
        continue
    doc = fitz.open(pdf_path)
    page = doc[0]
    mat = fitz.Matrix(2.5, 2.5)  # 250% = buena resolución
    pix = page.get_pixmap(matrix=mat, colorspace=fitz.csRGB)
    pix.save(out_path.replace(".jpg", ".png"))
    # Convertir a JPG con fondo blanco
    img = Image.open(out_path.replace(".jpg", ".png")).convert("RGB")
    img.save(out_path, "JPEG", quality=92)
    os.remove(out_path.replace(".jpg", ".png"))
    doc.close()
    print(f"  OK {label}")

print("\n¡Listo!")
