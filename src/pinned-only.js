// PINNED-BRANCH-ONLY vulnerability.
  // ArmorCode mapping isko pin karo; default branch drift karao;
  // verify ki ye mapping auto-correct NAHI hui (ENG-TC-31778).
  const crypto = require('crypto');
  
  // CodeQL: js/weak-cryptographic-algorithm
  function hashPassword(pw) {
    return crypto.createHash('md5').update(pw).digest('hex');
  }
  
  module.exports = { hashPassword };
