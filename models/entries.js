const entry = require('../database/db-entries');
const wikiApi = require('./wiki-api');


function getEntry(id) {
    try {
        return entry.getEntryById(id);
    } catch (error) {
        return error;
    }
}

async function getPaginatedEntries(pageParams) {
    try {
        return entry.getPaginatedEntries(pageParams);
    }
    catch (err) {
        return err;
    }
}

function autocomplete(entryLocationHint) {
    try {
        return entry.autocomplete(entryLocationHint);
    } catch (error) {
        return error;
    }
}

async function createEntry(location, description, diaryId) {
    try {
        const wikiDataFetch = await wikiApi.getWikiImageAndStub(location);

        const entryData = {
            location: location,
            description: description,
            image: wikiDataFetch.image,
            stub: wikiDataFetch.stub,
            diaryId: diaryId
        };

        return entry.saveEntry(entryData);
    }
    catch (error) {
        return error;
    }
}

function deleteEntry(id) {
    try {
        return entry.removeEntry(id);
    }
    catch (error) {
        return error;
    }
}

async function updateEntry(id, location, description) {
    try {
        const wikiDataFetch = await wikiApi.getWikiImageAndStub(location);

        const entryUpdateData = {
            location: location,
            description: description,
            image: wikiDataFetch.image,
            stub: wikiDataFetch.stub
        };

        return entry.updateEntry(id, entryUpdateData);
    }
    catch (error) {
        return error;
    }
}


module.exports.getEntry = getEntry;
module.exports.getPaginatedEntries = getPaginatedEntries;
module.exports.createEntry = createEntry;
module.exports.deleteEntry = deleteEntry;
module.exports.updateEntry = updateEntry;
module.exports.autocomplete = autocomplete;
