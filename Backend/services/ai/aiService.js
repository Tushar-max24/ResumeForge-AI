const openai = require('../../config/openai');
const env = require('../../config/env');

const chatCompletion = async (prompt, options = {}) => {
  try {
    console.log(`Sending prompt to AI (${env.OPENAI_MODEL}). Resume text length: ${prompt.length}`);
    const response = await openai.chat.completions.create({
      model: env.OPENAI_MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: options.temperature || env.OPENAI_TEMPERATURE,
      max_tokens: options.max_tokens || env.OPENAI_MAX_TOKENS,
      response_format: { type: 'json_object' },
    });

    const parsed = JSON.parse(response.choices[0].message.content);
    console.log(`AI Response received. Work History entries: ${parsed.comprehensive_work_history?.length || 0}`);
    return parsed;
  } catch (error) {
    console.error('AI Service Error:', error);
    throw new Error('Failed to communicate with AI service');
  }
};

module.exports = {
  chatCompletion,
};
