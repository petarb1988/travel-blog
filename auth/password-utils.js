const crypto = require('crypto');

function generatePassword (password) {
    const salt = crypto.randomBytes(32).toString('hex');
    const generateHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: generateHash
    };
}

function validatePassword (password, hash, salt) {
    const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return hash === hashVerify;
}


module.exports.generatePassword = generatePassword;
module.exports.validatePassword = validatePassword;