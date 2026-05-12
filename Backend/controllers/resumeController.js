const path = require('path');
const fs = require('fs-extra');
const { extractTextFromPDF, extractTextFromDOCX, cleanText } = require('../utils/textExtractor');
const { parseResume } = require('../services/ai/resumeParser');
const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const { exec } = require('child_process');
const env = require('../config/env');

const uploadAndParse = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    
    let rawText = '';
    if (ext === '.pdf') {
      rawText = await extractTextFromPDF(filePath);
    } else if (ext === '.docx') {
      rawText = await extractTextFromDOCX(filePath);
    }

    const cleanedText = cleanText(rawText);
    const parsedData = await parseResume(cleanedText);

    const resumeId = uuidv4();
    const resumeEntry = {
      id: resumeId,
      originalName: req.file.originalname,
      parsedData,
      createdAt: new Date().toISOString(),
    };

    db.get('resumes').push(resumeEntry).write();

    res.json({
      success: true,
      resumeId,
      data: parsedData,
    });
  } catch (error) {
    console.error('Upload and Parse Error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

const updateResume = async (req, res) => {
  try {
    const { id } = req.params;
    const { parsedData } = req.body;

    const resume = db.get('resumes').find({ id }).value();
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    db.get('resumes')
      .find({ id })
      .assign({ parsedData, updatedAt: new Date().toISOString() })
      .write();

    res.json({ success: true, message: 'Resume updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getResume = async (req, res) => {
  try {
    const { id } = req.params;
    const resume = db.get('resumes').find({ id }).value();
    
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.json({ success: true, data: resume });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateResumeDocx = async (req, res) => {
  try {
    const { id, templateId } = req.body;
    const resume = db.get('resumes').find({ id }).value();
    
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    const templateMap = {
      'totaco': 'CV of Totaco Template.docx',
      'humres': 'CV of Humres.docx',
      'huntek': 'CV of HunTek.docx'
    };

    const templateFileName = templateMap[templateId] || 'CV of Totaco Template.docx';
    const templatePath = path.join(__dirname, '../', env.TEMPLATE_DIR, templateFileName);
    const outputDir = path.join(__dirname, '../uploads/generated');
    await fs.ensureDir(outputDir);
    
    const rawName = (resume.parsedData.personal_info.name || 'Resume').trim();
    const nameParts = rawName.split(/\s+/);
    let displayName = rawName;
    if (nameParts.length >= 2) {
      displayName = `${nameParts[0]} ${nameParts[nameParts.length - 1]}`;
    }
    const downloadName = `CV of ${displayName}.docx`.replace(/[/\\?%*:|"<>]/g, '-');
    const outputFileName = `resume_${id}_${Date.now()}.docx`;
    const outputPath = path.join(outputDir, outputFileName);
    
    const jsonData = JSON.stringify(resume.parsedData);
    
    // Command to run python script
    const scriptPath = path.join(__dirname, '../scripts/fill_docx.py');
    
    // Passing JSON via file to avoid shell escaping issues
    const tempJsonPath = path.join(outputDir, `data_${id}.json`);
    await fs.writeJson(tempJsonPath, resume.parsedData);
    
    exec(`python "${scriptPath}" "${templatePath}" "${outputPath}" "${tempJsonPath}"`, (error, stdout, stderr) => {
      if (error) {
        console.error('Docx Generation Error:', error);
        return res.status(500).json({ error: 'Failed to generate docx' });
      }
      
      res.download(outputPath, downloadName, (err) => {
        if (err) console.error('Download Error:', err);
        // Cleanup
        fs.remove(tempJsonPath).catch(console.error);
        // fs.remove(outputPath).catch(console.error);
      });
    });

  } catch (error) {
    console.error('Generate Docx Error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadAndParse,
  updateResume,
  getResume,
  generateResumeDocx,
};
