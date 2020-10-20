









const express = require('express');
// const domain = require('domain');
// const cluster = require('cluster');
const uncaughtExceptions = require('./src/exceptions/uncaughtExceptions');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookie = require('cookie-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const apiRouter = require('./src/routes/api_routes')
const http = require('http');
const config = require('./src/config/config');
const credentials = require('./src/config/credentials')
const path = require('path')
const cors = require('cors')
const helmet = require('helmet');
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express()
app.use(helmet());
//  application configuration variables;
const port =  config.app.port;
const host = config.db.host;
const dbPort = config.db.port;
const dbName = config.db.name;
const prodDbUri = config.db.prod


// establish connection with database
// let url = process.env.MONGODB_URI || `mongodb://localhost:27017/test`;
mongoose.connect( prodDbUri || `mongodb://${host}:${dbPort}/${dbName}`,
{ useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true,useFindAndModify:false  },
(err,conn)=>{
    if(err){
        throw err
    }
    console.log(`connection to database established`)
})
// set app view engine

app.set('views', path.join( __dirname, 'src', 'views'));
app.set('view engine' , 'ejs');

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
  }



// set up application middleware
app.use(uncaughtExceptions)
app.use(morgan('dev'));

app.use(cors(corsOptions))

// set specifications for swagger with the options
const specs = swaggerJsdoc( require('./src/documentation/options') );
app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}) );
// use body parser to collect form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// set cookie for application
app.use(cookie(credentials.cookieSecret));
// handle application sessions
app.use(session({
    secret:credentials.sessionSecret,
    resave:true,
    saveUninitialized:true
}));

// user routes start here
// serve static files from public folder
app.use(express.static(path.join(__dirname ,'client','build')));
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','build','index.html'));
});

app.use('/api/v1/', apiRouter);

app.use((req,res)=>{
    res.status(404).sendFile(path.join(__dirname,'public','404.html'));
});
// collect app errors
app.use((err,req,res,next)=>{
    console.error(err);
    next(err);
});
// handle app errors
app.use((err,req,res,next)=>{
    res.status(500).json({ServerError:true,message:'internal server error'});
});

// start application
http.createServer(app).listen(port,()=> console.log(`app started at port ${port}`));