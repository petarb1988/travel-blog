const diary = require('../database/db-diaries');


function getDiaries() {
    try {
        return diary.getDiaries();
    } catch (error) {
        return error;
    }
}

function getDiary(diaryId) {
    try {
        return diary.getDiary(diaryId);
    } catch (error) {
        return error;
    }
}

async function createDiary(name, userId) {
    try {
        const diaryData = {
            name: name,
            userId: userId
        };

        return diary.saveDiary(diaryData);
    }
    catch (error) {
        return error;
    }
}

function deleteDiary(diaryId) {
    try {
        return diary.removeDiary(diaryId);
    }
    catch (error) {
        return error;
    }
}

async function updateDiary(diaryId, name) {
    try {
        const diaryUpdateData = {
            name: name
       };

        return diary.updateDiary(diaryId, diaryUpdateData);
    }
    catch (error) {
        return error;
    }
}

module.exports.getDiaries = getDiaries;
module.exports.getDiary = getDiary;
module.exports.createDiary = createDiary;
module.exports.deleteDiary = deleteDiary;
module.exports.updateDiary = updateDiary;