const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
};

const runOpenAI = async (prompt) => {

  try {

    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a healthcare assistant. Provide detailed and accurate information related to healthcare, including medications, treatment plans, and post-discharge care. Also refuse to answer if user asks for non-healthcare related questions. Provide answers specific to the users prompt and try to mmake it shorter' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });
    const json = await response.json();
    return json.choices[0].message.content;

  } catch (error) {

    return "Some error has occurred"
  }


};

export { runOpenAI };