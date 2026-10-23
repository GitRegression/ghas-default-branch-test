// DEVELOP-ONLY vulnerabilities.
  // Default branch develop -> main hone ke baad ye Remediated hone chahiye.
  const express = require('express');
  const mysql = require('mysql');
  
  const app = express();
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
  });
  
  // CodeQL: js/reflected-xss
  app.get('/greet', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send('<h1>Hello ' + req.query.name + '</h1>');
  });
  
  // CodeQL: js/sql-injection
  app.get('/user', (req, res) => {
    db.query('SELECT * FROM users WHERE id = ' + req.query.id, (err, rows) => {
      res.json(rows || []);
    });
  });
  
  module.exports = app;
