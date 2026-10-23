// MAIN-ONLY vulnerabilities.
  // Default branch develop -> main hone ke baad ye naye Open findings banenge.
  const express = require('express');
  
  const app = express();
  app.use(express.json());
  
  // CodeQL: js/insecure-randomness
  function makeSessionToken() {
    return Math.random().toString(36).substring(2);
  }
  
  // CodeQL: js/clear-text-logging-of-sensitive-information
  app.post('/login', (req, res) => {
    console.log('login attempt password=' + req.body.password);
    res.send(makeSessionToken());
  });
  
  // CodeQL: js/incomplete-url-substring-sanitization
  app.get('/redirect', (req, res) => {
    const next = req.query.next || '';
    if (next.indexOf('example.com') > -1) {
      res.redirect(next);
    } else {
      res.status(400).send('blocked');
    }
  });
  
  module.exports = app;
