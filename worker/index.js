var CronJob = require('cron').CronJob;
const fetchGithub = require('./tasks/fetch-github');

// Fetch Github jobs every minute
var job = new CronJob('* * * * *',  fetchGithub, null, true, 'America/Los_Angeles');
job.start();

// yjvI5eaAqs5KrDcG3U0oUvqIob8kN6ko