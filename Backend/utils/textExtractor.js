const fs = require('fs-extra');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');

const extractTextFromPDF = async (filePath) => {
  const dataBuffer = await fs.readFile(filePath);
  const data = await pdf(dataBuffer);
  return data.text;
};

const extractTextFromDOCX = async (filePath) => {
  const result = await mammoth.extractRawText({ path: filePath });
  return result.value;
};

const cleanText = (text) => {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/[^\x20-\x7E\n]/g, '') // Remove non-printable characters
    .replace(/\n\s*\n/g, '\n\n') // Remove excessive newlines
    .trim();
};

module.exports = {
  extractTextFromPDF,
  extractTextFromDOCX,
  cleanText,
};
