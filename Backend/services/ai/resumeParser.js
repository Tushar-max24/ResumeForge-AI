const { chatCompletion } = require('./aiService');
const { buildResumeParsingPrompt } = require('./promptBuilder');

const parseResume = async (extractedText) => {
  const prompt = buildResumeParsingPrompt(extractedText);
  return await chatCompletion(prompt);
};

module.exports = {
  parseResume,
};
