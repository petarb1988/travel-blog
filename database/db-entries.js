const models = require('./db-models');
const Entry = models.Entry;
const Op = require('sequelize').Op;


async function getEntryById(entryId) {
    try {
        const returnValue = await Entry.findByPk(entryId, { raw: true });
        return JSON.parse(JSON.stringify(returnValue));
    }
    catch (error) {
        return error;
    }
}

async function getPaginatedEntries(pageParams) {
    try {
        const pageOffset = (parseInt(pageParams.pageNumber) - 1) * parseInt(pageParams.pageSize);
        const amount = await Entry.count({ where: { diaryId: pageParams.diaryId } });
        const data = await Entry.findAll({ order: [['createdAt', 'DESC']], where: { diaryId: pageParams.diaryId }, offset: pageOffset, limit: parseInt(pageParams.pageSize), raw: true });
        const returnValue = {
            status: 200,
            data: data,
            paginationInfo: {
                size: pageParams.pageSize,
                number: pageParams.pageNumber,
                count: amount
            }
        };
        return JSON.parse(JSON.stringify(returnValue));
    }
    catch (error) {
        return error;
    }
}

async function autocomplete(entryLocationHint) {
    try {
        const results = await Entry.findAll({ order: [['id', 'DESC']] , attributes: ['location'], where: { location: { [Op.startsWith]: entryLocationHint } }, raw: true });
        return JSON.parse(JSON.stringify(results));
    }
    catch (error) {
        return error;
    }
}

async function saveEntry(entryData) {
    try {
        const newEntry = await Entry.create(
            {
                location: entryData.location,
                description: entryData.description,
                image_url: entryData.image,
                stub: entryData.stub,
                diaryId: entryData.diaryId
            },
            { raw: true }
        );
        return JSON.parse(JSON.stringify(newEntry));
    }
    catch (error) {
        return error;
    }
}

async function removeEntry(id) {
    try {
        const returnValue = await Entry.findByPk(id, { raw: true });
        await Entry.destroy({
            where: { id: id }
        });
        return JSON.parse(JSON.stringify(returnValue));
    }
    catch (error) {
        return error;
    }
}

async function updateEntry(id, entryData) {
    try {
        await Entry.update(
            {
                location: entryData.location,
                description: entryData.description,
                image_url: entryData.image,
                stub: entryData.stub
            },
            {
                where: { id: id }
            });
        const returnValue = await Entry.findByPk(id, { raw: true });
        return JSON.parse(JSON.stringify(returnValue));
    }
    catch (error) {
        return error;
    }
}


module.exports.saveEntry = saveEntry;
module.exports.getPaginatedEntries = getPaginatedEntries;
module.exports.removeEntry = removeEntry;
module.exports.updateEntry = updateEntry;
module.exports.getEntryById = getEntryById;
module.exports.autocomplete = autocomplete;