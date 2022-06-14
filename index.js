require("dotenv").config();
const fs = require('fs');
const express = require("express");
const sequelize = require("./db");
const router = require("./routes/index");
const cors = require("cors");
const http = require('http');
const https = require('https');
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);

const HTTP_PORT = 8080;
const HTTPS_PORT = 443;

app.use(express.static(__dirname));

// Certificate
// const privateKey = fs.readFileSync('/etc/letsencrypt/live/chamala.tatar/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/chamala.tatar/fullchain.pem', 'utf8');
// const ca = fs.readFileSync('/etc/letsencrypt/live/chamala.tatar/chain.pem', 'utf8');

// const credentials = {
//     key: privateKey, cert: certificate, ca: ca
// };


app.get("/", function (req, res) {
    res.json({ message: "Success!" });
});


// Starting both http & https servers
const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        httpServer.listen(HTTP_PORT, () => console.log(`Server started on port ${HTTP_PORT}`));
        // httpsServer.listen(HTTPS_PORT, () => console.log(`Server started on port ${HTTPS_PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();