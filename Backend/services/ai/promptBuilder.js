const buildResumeParsingPrompt = (text) => {
  return `
You are an expert ATS-optimized resume parser. Your task is to extract structured information from the provided resume text.

SCHEMA:
{
  "personal_info": {
    "name": "", // Leave empty for manual user entry
    "location": "", // Leave empty for manual user entry
    "sector": "", // Leave empty for manual user entry
    "rl_id": "" // Leave empty for manual user entry
  },
  "personal_profile": "string",
  "employment_summary": [
    {
      "from": "string",
      "to": "string",
      "company_name": "string",
      "position": "string"
    }
  ],
  "education_and_skills": {
    "qualifications": ["string"],
    "training": ["string"],
    "certifications": ["string"],
    "awards": ["string"],
    "technical_skills": ["string"],
    "license": ["string"]
  },
  "comprehensive_work_history": [ // MUST BE VERBATIM COPY-PASTE, DO NOT SUMMARIZE
    {
      "company": "string",
      "location": "string",
      "role": "string",
      "period": "string",
      "summary": "string",
      "responsibilities": ["string"], // Extract EACH bullet point separately
      "projects": ["string"], // Extract EACH project title and description as separate strings
      "reason_for_leaving": "string"
    }
  ]
}

INSTRUCTIONS:
- Return ONLY valid JSON.
- Do not include any markdown formatting.
- If a field is not found, use an empty string or empty array.
- **1. COMPREHENSIVE WORK HISTORY (UNLIMITED)**: You MUST extract EVERY SINGLE job and company from the CV. If there are 15 companies, list all 15. There is NO limit here. Use the "comprehensive_work_history" key.
- **2. EMPLOYMENT SUMMARY (LIMITED TO 5)**: ONLY this specific section is limited to the 5 most recent companies.
- **3. VERBATIM EXTRACTION**: For the comprehensive history, you MUST copy-paste paragraphs and bullets VERBATIM. Each bullet point from the CV must be a separate item in the "responsibilities" or "projects" array.
- **SUMMARY**: This field MUST contain the full, unedited introductory paragraph(s) for the role.
- **RESPONSIBILITIES**: This array MUST contain every single bullet point from the CV that is not a project.
- **PROJECTS**: If the CV lists specific "Projects" or "Key Projects" under a job, extract them as separate strings in the "projects" array.
- **4. DATE FORMAT**: "MMM-YYYY" (e.g., Jan-2024).
- **5. EDUCATION & SKILLS FORMAT (OPTIONAL YEAR)**: Look for years ANYWHERE in the education entry (at beginning, middle, or end). If you find a year (4-digit number like 2005, 2010, etc.), extract it and format as "Year - Degree - Institution". If no year is found, format as "Degree - Institution".
  - **QUALIFICATIONS**: Degrees, Diplomas, Apprenticeships. Look for years in formats like "University Name 2005", "2005 - Degree", "Degree (2005)", etc. Extract the year and reformat as "Year - Degree - Institution".
  - **TRAINING**: Professional training courses. Same year extraction rules apply.
  - **CERTIFICATIONS**: Specific certifications. Same year extraction rules apply.
  - **AWARDS**: Professional awards (e.g., "Electrician of the year 2019").
  - **TECHNICAL SKILLS**: Core job-related skills and software.
  - **LICENSE**: Driving licenses.
- **6. MANUAL FIELDS**: You MUST extract the candidate's **Name** and **Location** from the CV. However, do NOT extract Sector or RL ID—leave these two as empty strings.
- **7. IGNORE**: References, Interests, Languages.

RESUME TEXT:
${text}
`;
};

const buildTemplateAnalysisPrompt = (analysisData) => {
  return `
Analyze the following resume template structure and describe its design elements for recreation in React + Tailwind CSS.

ASPECTS TO ANALYZE:
- Layout structure (Single column, Multi-column, Sidebar)
- Section ordering
- Typography (Serif, Sans-serif, font sizes)
- Spacing and alignment
- Colors (Primary, secondary, text colors)
- Experience/Education card layouts

DATA:
${analysisData}

Return a structured JSON describing these elements.
`;
};

module.exports = {
  buildResumeParsingPrompt,
  buildTemplateAnalysisPrompt,
};
