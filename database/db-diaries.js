const models = require('./db-models');
const Diary = models.Diary;



async function getDiaries() {
    try {
        const returnValue = await Diary.findAll({ raw: true });
        return JSON.parse(JSON.stringify(returnValue));
    }
    catch (error) {
        return error;
    }
}

async function getDiary(diaryId) {
    try {
        const returnValue = await Diary.findByPk(diaryId, { raw: true });
        return JSON.parse(JSON.stringify(returnValue));
    }
    catch (error) {
        return error;
    }
}

async function saveDiary(diaryData) {
    try {
        const newDiary = await Diary.create(
            {
                name: diaryData.name,
                userId: diaryData.userId
            },
            { raw: true }
        );
        return JSON.parse(JSON.stringify(newDiary));
    }
    catch (error) {
        return error;
    }
}

async function removeDiary(id) {
    try {
        const returnValue = await Diary.findByPk(id, { raw: true });
        await Diary.destroy({
            where: { id: id }
        });
        return JSON.parse(JSON.stringify(returnValue));
    }
    catch (error) {
        return error;
    }
}

async function updateDiary(id, diaryData) {
    try {
        await Diary.update(
            {
                name: diaryData.name
            },
            {
                where: { id: id }
            });
        const returnValue = await Diary.findByPk(id, { raw: true });
        return JSON.parse(JSON.stringify(returnValue));
    }
    catch (error) {
        return error;
    }
}


module.exports.getDiaries = getDiaries;
module.exports.getDiary = getDiary;
module.exports.saveDiary = saveDiary;
module.exports.removeDiary = removeDiary;
module.exports.updateDiary = updateDiary;
