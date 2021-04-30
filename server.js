const express = require('express');
const uncaughtExceptions = require('./src/exceptions/uncaughtExceptions');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookie = require('cookie-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const apiRouter = require('./src/routes/api_routes');
const adminRouter = require('./src/admin/routes/adminRoutes');
const http = require('http');
const config = require('./src/config/config');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const connectToMongodb = require('./src/libs/mongoDbConnection');
const compression = require('compression');
const setUpPassport = require('./src/admin/auth/setUppassport');


const flash = require('connect-flash');
const passport = require('passport');
const messages =require('express-messages');
const { validationResult } = require('express-validator');



require('dotenv').config();
const port = config.app.port || process.env.PORT || 4000;
const mongoConfig = {
    devDbURI: config.db.testURI,
    dbOptions: config.db.dbOptions
}
const corsOptions = {
    origin: 'http://localhost:4000',
    optionsSuccessStatus: 200 
}
const swaggerDocumentationSpecs = swaggerJsdoc(require('./src/documentation/options'));
const app = express();
app.disable('x-powered-by');
app.use(helmet());
connectToMongodb(mongoose, mongoConfig);
setUpPassport();
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.use(uncaughtExceptions);
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(compression());
app.use("/apidocs",swaggerUi.serve, swaggerUi.setup(swaggerDocumentationSpecs, {explorer: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookie( config.secret.cookieSecret));
app.use(session({
    secret: config.secret.sessionSecret,
    resave:true,
    saveUninitialized:true   
}));



app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/admin', (req, res, next) => {
    res.locals.messages = messages();
    next();
});
app.use('/admin', (req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash('error');
    res.locals.infos = req.flash('info')
    res.locals.valErrors = validationResult(req).array()
    next();
});

app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/admin', express.static(path.join(__dirname, 'public')));
app.use('/admin', adminRouter);
app.use('/api/v1/', apiRouter);
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.use(( req, res, next)=> {
    res.status(404).json({Error: true, message: 'API endpoint does not exist'});
})
app.use((err, req, res, next)=> {
    console.error(err);
    next(err);
});
app.use((err, req, res, next)=> {
    res.status(500).json({ServerError: true, message: 'internal server error'});
});
function startServer() {
    http.createServer(app).listen(port, ()=> console.log(`app started at port ${port}`));
}
if(require.main === module) {
    startServer();
}else{
    module.exports = startServer;
}