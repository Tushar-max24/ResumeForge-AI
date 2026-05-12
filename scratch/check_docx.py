import docx
import os

def check_structure(path):
    if not os.path.exists(path):
        print(f"File not found: {path}")
        return
    doc = docx.Document(path)
    print(f"--- {os.path.basename(path)} ---")
    for i, table in enumerate(doc.tables):
        first_row = [cell.text.strip() for cell in table.rows[0].cells]
        print(f"Table {i}: {first_row}")

check_structure(r'D:\Tushar\CV of Humres.docx')
check_structure(r'D:\Tushar\CV of HunTek.docx')
check_structure(r'D:\Tushar\CV of Totaco Template.docx')
