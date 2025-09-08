const express = require('express');

const { PORT } = require('./config/serverConfig');
const app = express();

const prpareANdStartServer = () => {
    app.listen(3001, () => {
        console.log(`Server Started on PORT: ${PORT}`);
    })
}

prpareANdStartServer();