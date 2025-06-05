const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  const messages = [
    {
      role: 'system',
      content: 'Você é um assistente inteligente especializado em sustentabilidade e no projeto Releaf. Responda com clareza e profundidade.',
    },
    { role: 'user', content: userMessage },
  ];

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: messages,
    });

    const reply = completion.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ reply: 'Erro ao processar a resposta da IA.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor online na porta ${PORT}`));
