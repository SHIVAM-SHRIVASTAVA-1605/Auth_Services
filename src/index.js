const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const UserService = require('./services/user-services');

const app = express();

const prpareANdStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

    app.listen(3001, async () => {
        console.log(`Server Started on PORT: ${PORT}`);
        
        // const service = new UserService();
        // const newToken = service.createToken({email: 'shivam@gmail.com', id:1});
        // console.log("new token is: ", newToken);
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoaXZhbUBnbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNzU3NzkyNDA2LCJleHAiOjE3NTc3OTI0MzZ9.4-Xw7vwEptYnj8pZtUL7V1Dw5vhw9Qs51ghnRMRPUC4';
        // const response = service.verifyToken(token);
        // console.log(response);
    });
}

prpareANdStartServer();