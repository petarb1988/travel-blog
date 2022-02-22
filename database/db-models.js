const db = require('./db-init');
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;


const User = sequelize.define('user', {

    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: { type: Sequelize.STRING() },
    hash: { type: Sequelize.STRING() },
    salt: { type: Sequelize.STRING() }
},
    { freezeTableName: true }
);

const Diary = sequelize.define('diary', {

    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: { type: Sequelize.STRING() },
    userId: { type: Sequelize.INTEGER() }
},
    { freezeTableName: true }
);

const Entry = sequelize.define('entry', {

    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    location: { type: Sequelize.STRING() },
    description: { type: Sequelize.TEXT() },
    image_url: { type: Sequelize.STRING() },
    stub: { type: Sequelize.TEXT() },
    diaryId: { type: Sequelize.INTEGER() }
},
    { freezeTableName: true }
);

User.hasMany(Diary, { foreignKey: 'userId' });
Diary.belongsTo(User);

Diary.hasMany(Entry, { foreignKey: 'diaryId' });
Entry.belongsTo(Diary);


module.exports.User = User;
module.exports.Diary = Diary;
module.exports.Entry = Entry;
