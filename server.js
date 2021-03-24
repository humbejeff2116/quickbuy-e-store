const express = require('express');
const uncaughtExceptions = require('./src/exceptions/uncaughtExceptions');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookie = require('cookie-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const apiRouter = require('./src/routes/api_routes');
const http = require('http');
const config = require('./src/config/config');
const credentials = require('./src/config/credentials');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
// const serverRender = require('../src/controller/renderHtmlController');
// const  renderApp = require( '../dist-server/renderHtmlController')
const app = express();
app.use(helmet());

const port =  config.app.port;
const prodDbUri = config.db.prod;
const devDbUri =  `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;
const dbOptions = {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false };

mongoose.connect(prodDbUri ||devDbUri, dbOptions, (err, conn)=> {
    if(err) {
        throw err
    }
    console.log(`connection to database established`);
})

app.set('views', path.join( __dirname, 'src', 'views'));
app.set('view engine', 'ejs');

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
  }

app.use(uncaughtExceptions);
app.use(morgan('dev'));
app.use(cors(corsOptions));
// api documentation using swagger
const swaggerDocumentationSpecs = swaggerJsdoc( require('./src/documentation/options'));
app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerDocumentationSpecs, {explorer: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookie(credentials.cookieSecret));
app.use(session({
    secret:credentials.sessionSecret,
    resave:true,
    saveUninitialized:true   
}));
// render react app from the server
// app.use('*',renderApp);
app.use(express.static(path.join(__dirname ,'client','build')));
app.get('/',(req, res)=> {
    res.sendFile(path.join(__dirname,'client','build','index.html'));
});
app.use('/api/v1/', apiRouter);
app.use((err, req, res, next)=> {
    console.error(err);
    next(err);
});
app.use((err, req, res, next)=> {
    res.status(500).json({ServerError: true, message: 'internal server error'});
});
http.createServer(app).listen(port,()=> console.log(`app started at port ${port}`));