// ===========================================================================
  // SHARED VULNERABILITIES - present on EVERY branch.
  // WARNING: must remain BYTE-IDENTICAL across branches.
  // ===========================================================================
  const express = require('express');
  const fs = require('fs');
  const { exec } = require('child_process');
  
  const app = express();
  
  // CodeQL: js/code-injection
  app.get('/eval', (req, res) => {
    const result = eval(req.query.expr);
    res.send(String(result));
  });
  
  // CodeQL: js/path-injection
  app.get('/read', (req, res) => {
    fs.readFile(req.query.file, 'utf8', (err, data) => {
      res.send(data || 'none');
    });
  });
  
  // CodeQL: js/command-line-injection
  app.get('/ping', (req, res) => {
    exec('ping -c 1 ' + req.query.host, (err, stdout) => {
      res.send(stdout || 'none');
    });
  });
  
  module.exports = app;
