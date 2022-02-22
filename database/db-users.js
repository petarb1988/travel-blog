const models = require('./db-models');
const generatePassword = require('../auth/password-utils').generatePassword;
const User = models.User;


async function getAllUsers() {
    try {
        const returnValue = await User.findAll({ raw: true });
        return JSON.parse(JSON.stringify(returnValue));
    }
    catch (error) {
        return error;
    }
}

async function getOneUser(userId) {
    try {
        const returnValue = await User.findByPk(userId, { raw: true });
        return JSON.parse(JSON.stringify(returnValue));
    }
    catch (error) {
        return error;
    }
}

async function saveUser(userData) {
    try {
        const hashData = generatePassword(userData.password);
        const newUser = await User.create(
            {
                username: userData.username,
                hash: hashData.hash,
                salt: hashData.salt
            },
            { raw: true }
        );
        return JSON.parse(JSON.stringify(newUser));
    }
    catch (error) {
        return error;
    }
}

async function removeUser(id) {
    try {
        const returnValue = await User.findByPk(id, { raw: true });
        await User.destroy({
            where: { id: id }
        });
        return JSON.parse(JSON.stringify(returnValue));
    }
    catch (error) {
        return error;
    }
}

async function updateUser(id, userData) {
    try {
        await User.update(
            {
                username: userData.username,
                password: userData.password
            },
            {
                where: { id: id }
            });
        const returnValue = await User.findByPk(id, { raw: true });
        return JSON.parse(JSON.stringify(returnValue));
    }
    catch (error) {
        return error;
    }
}


module.exports.saveUser = saveUser;
module.exports.removeUser = removeUser;
module.exports.updateUser = updateUser;
module.exports.getAllUsers = getAllUsers;
module.exports.getOneUser = getOneUser;