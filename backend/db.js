require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Новый диалог; возвращает id беседы.
async function createConversation(userId) {
  const { rows } = await pool.query(
    'INSERT INTO conversations (user_id) VALUES ($1) RETURNING id',
    [userId]
  );
  return rows[0].id;
}

async function saveMessage(conversationId, role, content) {
  await pool.query(
    'INSERT INTO messages (conversation_id, role, content) VALUES ($1, $2, $3)',
    [conversationId, role, content]
  );
}

// Сообщения от старых к новым; для API — обрезать до последних 20 в server.js.
async function getMessages(conversationId) {
  const { rows } = await pool.query(
    `SELECT role, content
     FROM messages
     WHERE conversation_id = $1
     ORDER BY created_at ASC`,
    [conversationId]
  );
  return rows;
}

module.exports = {
  pool,
  createConversation,
  saveMessage,
  getMessages,
};
