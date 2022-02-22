const userDbMethods = require('../database/db-users');


async function create () {
    const username = Math.random().toString(36).slice(2);
    const password = Math.random().toString(36).slice(2);

    const mockUser = await userDbMethods.saveUser({username: username, password: password});
    return { username: username, password: password };
}

async function destroy (mockUserId) {
    const mockUser = await userDbMethods.removeUser(mockUserId);
    return;
}


module.exports.create = create;
module.exports.destroy = destroy;