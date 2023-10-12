const axios = require('axios');
const { User } = require('../models'); 
require('dotenv').config();

const translateText = async (req, res) => {
  const { text, userId } = req.body;  
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const targetLanguage = user.preferredLanguage;

    const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
      prompt: `Translate the following English text to ${targetLanguage}: ${text}`,
      max_tokens: 60,
      temperature: 0,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const translatedText = response.data.choices[0].text.trim();
    res.send({ translatedText });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to translate the message' });
  }
};

module.exports = {
  translateText
};
