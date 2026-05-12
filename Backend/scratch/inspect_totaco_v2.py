from docx import Document

def inspect_template(path):
    doc = Document(path)
    print(f"Inspecting {path}")
    
    for i, table in enumerate(doc.tables):
        print(f"\nTable {i}:")
        for r_idx, row in enumerate(table.rows):
            row_text = [cell.text.strip() for cell in row.cells]
            print(f"  Row {r_idx}: {row_text}")

if __name__ == "__main__":
    inspect_template("d:/TalentVerse AI/Tushar/ResumeForge AI/Backend/templates/CV of Totaco Template.docx")
