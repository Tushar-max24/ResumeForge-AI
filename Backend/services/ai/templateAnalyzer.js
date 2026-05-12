const { chatCompletion } = require('./aiService');
const { buildTemplateAnalysisPrompt } = require('./promptBuilder');

const analyzeTemplate = async (extractedText) => {
  const prompt = buildTemplateAnalysisPrompt(extractedText);
  return await chatCompletion(prompt);
};

module.exports = {
  analyzeTemplate,
};
