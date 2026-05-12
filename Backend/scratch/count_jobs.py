import json
import os

db_path = r'd:\TalentVerse AI\Tushar\Tushar\Backend\db\db.json'
if os.path.exists(db_path):
    with open(db_path, 'r') as f:
        data = json.load(f)
        if 'resumes' in data and len(data['resumes']) > 0:
            last_resume = data['resumes'][-1]
            work_history = last_resume['parsedData'].get('comprehensive_work_history', [])
            legacy_history = last_resume['parsedData'].get('career_history', [])
            print(f"Latest Resume ID: {last_resume['id']}")
            print(f"Count in comprehensive_work_history: {len(work_history)}")
            print(f"Count in career_history: {len(legacy_history)}")
            for i, job in enumerate(work_history):
                print(f"{i+1}: {job.get('company')}")
        else:
            print("No resumes found in DB")
else:
    print("DB file not found")
