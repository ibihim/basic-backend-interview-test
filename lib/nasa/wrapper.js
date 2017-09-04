'use strict';

const util = require('util');
const request = util.promisify(require('request'));

const DEFAULT_PAGE = 0;
const DEFAULT_SIZE = 10;

const API_KEY_PARAM = `api_key=${ process.env.API_KEY }`;
const NASA_API_URL = 'https://api.nasa.gov/neo/rest/v1';

const responseToBodyObj = response =>
    JSON.parse(response.body);

const getNeo = (page = DEFAULT_PAGE, size = DEFAULT_SIZE) => {
    const url = `${ NASA_API_URL }/neo/browse?page=${ page }&size=${ size }&${ API_KEY_PARAM }`;

    return request(url)
        .then(responseToBodyObj);
};

const getFeed = (from, to) => {
    const toParam = to ? `start_date=${ to }&` : '';
    const fromParam = `end_date=${ from }&`;
    const detailed = 'detailed=true&';

    const url = `${ NASA_API_URL }/feed?${ toParam }${ fromParam }`
                + `${ detailed }${ API_KEY_PARAM }`;

    return request(url)
        .then(responseToBodyObj);
};

module.exports = { getNeo, getFeed };
