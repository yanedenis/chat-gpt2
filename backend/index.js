const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/chat', async (req, res) => {
  const { message } = req.body

  try {
    const chatResponse = await openai.chat.completions.create({
      model: 'z-ai/glm-4.5-air:free',
      messages: [{
        role: 'user',
        content: message
      }]
    })

    const reply = chatResponse.choices[0].message.content
    res.status(200).json({ reply })
  } catch (error) {
    console.error("Error connecting to OpenAI:", error)
    res.status(500).json({ message: "Something went wrong" })
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
