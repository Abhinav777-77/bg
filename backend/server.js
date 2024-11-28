const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API credentials and URLs
const textAPI_URL = "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct";
const imageAPI_URL = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell";
const textToken = "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";
const imageToken = "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";

// In-memory history storage (consider using a database in production)
const history = [];

// Function to generate text with exponential backoff
const generateText = async (prompt, retries = 3, delay = 2000) => {
  try {
    const response = await axios.post(textAPI_URL, { inputs: prompt }, {
      headers: {
        'Authorization': `Bearer ${textToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data[0].generated_text;
  } catch (error) {
    if (error.response && error.response.status === 429 && retries > 0) {
      console.warn(`Rate limit exceeded for text generation. Retrying in ${delay / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return generateText(prompt, retries - 1, delay * 2); // Exponential backoff
    }
    console.error('Error generating text:', error.message);
    throw new Error('Failed to generate text');
  }
};

// Function to generate image with exponential backoff
const generateImage = async (prompt, retries = 3, delay = 2000) => {
  try {
    const response = await axios.post(imageAPI_URL, { inputs: prompt }, {
      headers: {
        'Authorization': `Bearer ${imageToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data[0].generated_image_url;
  } catch (error) {
    if (error.response && error.response.status === 429 && retries > 0) {
      console.warn(`Rate limit exceeded for image generation. Retrying in ${delay / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return generateImage(prompt, retries - 1, delay * 2); // Exponential backoff
    }
    console.error('Error generating image:', error.message);
    throw new Error('Failed to generate image');
  }
};

// Route to generate text and image with rate limit handling
app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  try {
    // Generate text with delay between requests to avoid rate limiting
    const generatedText = await generateText(prompt);

    // Introduce a delay before generating the image
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Then generate the image
    const generatedImageUrl = await generateImage(prompt);

    // Store in history (optional)
    history.push({ prompt, generatedText, generatedImageUrl });

    res.json({ generatedText, generatedImageUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch history
app.get('/history', (req, res) => {
  res.json(history);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
