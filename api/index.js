const express = require('express')
const redis = require("redis");

const port = 3001
const app = express()

const client = redis.createClient();
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);

app.get('/jobs',async (req, res) => {

const jobs = await getAsync('github')
res.header("Access-Control-Allow-Origin", " * ");
console.log(JSON.parse(jobs).length);

  return res.send(jobs)
})

app.listen(port, () => {
  console.log(`Job app listening at http://localhost:${port}`)
})