const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.resolve(__dirname, '../../database.db');

const db = new Database(dbPath, {verbose: console.log});

function initialSetup() {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS diario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    createdAt DATETIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
    `;
    db.exec(createTableQuery);
}

initialSetup();

console.log('SQLite3 Conectado!');

module.exports = db;