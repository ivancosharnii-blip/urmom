require('dotenv').config();

const express = require('express');
const OpenAI = require('openai');

const {
  pool,
  createConversation,
  saveMessage,
  getMessages,
} = require('./db');

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PORT = Number(process.env.PORT) || 3001;
const MAX_CONTEXT_MESSAGES = 20;

function parseOptionalPositiveInt(value, fieldName) {
  if (value === undefined || value === null || value === '') {
    return null;
  }
  const n = Number(value);
  if (!Number.isInteger(n) || n < 1) {
    const err = new Error(`${fieldName} must be a positive integer`);
    err.statusCode = 400;
    throw err;
  }
  return n;
}

function requirePositiveInt(value, fieldName) {
  const n = parseOptionalPositiveInt(value, fieldName);
  if (n === null) {
    const err = new Error(`${fieldName} is required and must be a positive integer`);
    err.statusCode = 400;
    throw err;
  }
  return n;
}

app.post('/chat', async (req, res, next) => {
  try {
    const { userId: rawUserId, message, conversationId: rawConversationId } =
      req.body || {};

    const userId = requirePositiveInt(rawUserId, 'userId');

    if (typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({
        error: 'message is required and must be a non-empty string',
      });
    }

    const { rows: userRows } = await pool.query(
      'SELECT id FROM users WHERE id = $1',
      [userId]
    );
    if (userRows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    let conversationId;

    if (
      rawConversationId === undefined ||
      rawConversationId === null ||
      rawConversationId === ''
    ) {
      conversationId = await createConversation(userId);
    } else {
      conversationId = parseOptionalPositiveInt(
        rawConversationId,
        'conversationId'
      );
      if (conversationId === null) {
        return res.status(400).json({
          error: 'conversationId must be a positive integer when provided',
        });
      }

      const { rows: convRows } = await pool.query(
        'SELECT id FROM conversations WHERE id = $1 AND user_id = $2',
        [conversationId, userId]
      );
      if (convRows.length === 0) {
        return res.status(404).json({ error: 'Conversation not found' });
      }
    }

    const text = message.trim();
    await saveMessage(conversationId, 'user', text);

    const history = await getMessages(conversationId);
    const openaiMessages = history.slice(-MAX_CONTEXT_MESSAGES).map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const model = process.env.OPENAI_MODEL;
    if (!model) {
      const err = new Error('OPENAI_MODEL is not configured');
      err.statusCode = 500;
      throw err;
    }

    if (!process.env.OPENAI_API_KEY) {
      const err = new Error('OPENAI_API_KEY is not configured');
      err.statusCode = 500;
      throw err;
    }

    let completion;
    try {
      completion = await openai.chat.completions.create({
        model,
        messages: openaiMessages,
      });
    } catch (apiErr) {
      console.error('OpenAI API error:', apiErr);
      const err = new Error('Failed to get AI response');
      err.statusCode = 502;
      throw err;
    }

    const reply = completion.choices[0]?.message?.content?.trim() ?? '';
    if (!reply) {
      return res.status(502).json({ error: 'Empty reply from AI' });
    }

    await saveMessage(conversationId, 'assistant', reply);

    res.json({ reply, conversationId });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.statusCode && err.statusCode >= 400 ? err.statusCode : 500;
  if (status >= 500) {
    return res.status(500).json({ error: 'Internal server error' });
  }
  return res.status(status).json({ error: err.message || 'Bad request' });
});

app.listen(PORT, () => {
  console.log(`Chat API listening on http://localhost:${PORT}`);
});
