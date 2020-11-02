var fetch = require('node-fetch');
const redis = require("redis");


const client = redis.createClient();

const { promisify } = require("util");
const setAsync = promisify(client.set).bind(client);

const baseURL = 'https://jobs.github.com/positions.json'

async function fetchGithub() {

    let resultCount = 1, onPage = 0;
    const allJobs = [];

    //Fetch all pages

    while (resultCount > 0) {

        const results = await fetch(`${baseURL}?page=${onPage}`);
        const jobs = await results.json();
        allJobs.push(...jobs);
        resultCount = jobs.length
        console.log('got' + resultCount + 'jobs');
        onPage++;

    }

    //filter algorithim for Junior Job Titles
    const jrJobs = allJobs.filter(job => {
        const jobTitle = job.title.toLowerCase();

        if (
            jobTitle.includes('senior') ||
            jobTitle.includes('manager') ||
            jobTitle.includes('sr.') ||
            jobTitle.includes('architect')

        ) {
            return false;
        }
        return true;


    })


    //Set in reddis
    const success = await setAsync('github', JSON.stringify(jrJobs));
    console.log({ success });
    console.log(jrJobs.length + 'total Junior jobs');


}

module.exports = fetchGithub;