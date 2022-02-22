const fetch = require('node-fetch');

async function getWikiImageAndStub(location) {
    try {
        const wikiUrlImage = `https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${location}&prop=pageimages&pithumbsize=100&indexpageids`;
        const wikiUrlStub = `https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${location}&prop=extracts&exintro&explaintext&redirects=1&indexpageids`;

        const fetchImage = await fetch(wikiUrlImage);
        const fetchStub = await fetch(wikiUrlStub);

        const jsonImage = await fetchImage.json();
        const jsonStub = await fetchStub.json();

        const pageId = jsonImage.query.pageids[0];

        const image = jsonImage.query.pages[pageId].thumbnail.source;
        const stub = jsonStub.query.pages[pageId].extract;

        return { image: image, stub: stub };
    }

    catch (error) {
        console.error(error);
    }
}

module.exports.getWikiImageAndStub = getWikiImageAndStub;