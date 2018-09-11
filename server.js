const express = require('express');
const bodyParser = require('body-parser');
const teamsApi = require('./src/routes/teams-api');
const securityApi = require('./src/routes/security-api');
const adminApi = require('./src/routes/admin-api');
const matchesApi = require('./src/routes/matches-api');
const mongooseConfig = require('./src/config/mongoose-connection');
const app = express();

app.use(bodyParser.json());
app.use(teamsApi);
app.use(securityApi);
app.use(adminApi);
app.use(matchesApi);
app.use((err, req, res, next) => {
    let status = 500;

    if (err.message.match(/not found/)) {
        status = 404;
    }
    return res.status(status).send({ error: err.message });
});
app.listen(3000, () => {
    console.log('Running on port: 3000');
});
