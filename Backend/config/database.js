const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');
const fs = require('fs-extra');

const dbPath = path.join(__dirname, '../db/db.json');

// Ensure db directory exists
fs.ensureDirSync(path.join(__dirname, '../db'));

const adapter = new FileSync(dbPath);
const db = low(adapter);

// Set defaults
db.defaults({ resumes: [], templates: [] }).write();

module.exports = db;
