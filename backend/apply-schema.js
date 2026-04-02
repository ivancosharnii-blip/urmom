/**
 * Применяет schema.sql к базе из DATABASE_URL.
 * Запуск: pnpm db:setup (из папки backend)
 */
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

function splitStatements(sql) {
  const withoutLineComments = sql
    .split(/\r?\n/)
    .filter((line) => !/^\s*--/.test(line))
    .join('\n');

  return withoutLineComments
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url || url.includes('USER:PASSWORD')) {
    console.error(
      'Укажите рабочий DATABASE_URL в backend/.env (см. .env.example).'
    );
    process.exit(1);
  }

  const schemaPath = path.join(__dirname, 'schema.sql');
  const sql = fs.readFileSync(schemaPath, 'utf8');
  const statements = splitStatements(sql);

  const client = new Client({ connectionString: url });
  await client.connect();

  try {
    for (const stmt of statements) {
      await client.query(stmt + ';');
    }
  } finally {
    await client.end();
  }

  console.log('Схема применена:', statements.length, 'операций.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
