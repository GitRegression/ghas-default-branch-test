// PINNED-BRANCH-ONLY vulnerabilities.
// Pin an ArmorCode mapping to release-pinned; drift the GitHub default branch
// and assert this mapping is NOT auto-corrected (ENG-TC-31778).
const crypto = require('crypto');
const express = require('express');
const http = require('http');

const app = express();

// CodeQL: js/weak-cryptographic-algorithm  (security-extended suite only)
function hashPassword(pw) {
  return crypto.createHash('md5').update(pw).digest('hex');
}

// CodeQL: js/request-forgery  (SSRF - default suite)
app.get('/fetch', (req, res) => {
  http.get(req.query.url, (upstream) => {
    upstream.pipe(res);
  });
});

module.exports = { app, hashPassword };
