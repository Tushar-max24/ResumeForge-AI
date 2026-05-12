import docx
import os

def get_header_info(path):
    if not os.path.exists(path):
        return f"File not found: {path}"
    doc = docx.Document(path)
    header_texts = []
    for section in doc.sections:
        # Check all possible header types
        headers = [section.header, section.first_page_header, section.even_page_header]
        for header in headers:
            for p in header.paragraphs:
                if p.text.strip():
                    header_texts.append(p.text.strip())
    return "\n".join(list(dict.fromkeys(header_texts))) # unique lines

files = {
    "HUMRES": r'D:\Tushar\CV of Humres.docx',
    "HUNTEK": r'D:\Tushar\CV of HunTek.docx',
    "TOTACO": r'D:\Tushar\CV of Totaco Template.docx'
}

for label, path in files.items():
    print(f"--- {label} ---")
    print(get_header_info(path))
    print()
