const user = require('../database/db-users');


function getUsers() {
    try {
        return user.getAllUsers();
    } catch (error) {
        return error;
    }
}

function getUser(id) {
    try {
        return user.getOneUser(id);
    } catch (error) {
        return error;
    }
}

async function createUser(username, password) {
    try {
        const userData = {
            username: username,
            password: password
        };

        return user.saveUser(userData);
    }
    catch (error) {
        return error;
    }
}

function deleteUser(id) {
    try {
        return user.removeUser(id);
    }
    catch (error) {
        return error;
    }
}

async function updateUser(id, username, password) {
    try {
        const userUpdated = {
            username: username,
            password: password
        };

        return user.updateUser(id, userUpdated);
    }
    catch (error) {
        return error;
    }
}


module.exports.getUsers = getUsers;
module.exports.getUser = getUser;
module.exports.createUser = createUser;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;
