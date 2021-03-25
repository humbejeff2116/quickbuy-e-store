
const React = require('react');
const ReactDomServer = require( 'react-dom/server');
const  metaTagsServer = require( 'react-meta-tags/server');
const { MetaTagsContext } = require( 'react-meta-tags');
const  App = require( '../client/src/App');
const fs = require( 'fs');


module.exports = function renderApp(req, res, next){
    const metaInstance = metaTagsServer();
    match({ routes, location: req.url }, (err, redirectLocation, renderProps)=> {
        let htmlString;
        try{
            htmlString = ReactDomServer.renderToString(
                <MetaTagsContext extract={metaInstance.extract}>
                   <App {...renderProps} />
                </MetaTagsContext>     
            )
        } catch(err) {
            if(err) {
                next(err);
            }
        }
        const meta = metaInstance.renderToString();
      fs.readFile("./client/public/index.html","utf8",(err, data)=> {
            if(err) throw err;
            let htmlTemplate = data.replace(
                /<head><\/head>/, 
                `<head>
                <meta charset ="utf-8"/>
                ${meta}
                </head>`
            );
            htmlTemplate += data.replace(
                /<div id="root"><\/div>/, 
                `<div id="root">
                ${htmlString}
                </div>`
            );
            res.status(200).send(htmlTemplate)
        });
        
        // const htmlTemplate =(`
        // <!DOCTYPE html>
        // <html lang ="eng">
        // <head>
        // <meta charset ="utf-8" />
        // ${meta}
        // </head>
        // <body>
        // <div id="root">
        // ${htmlString}
        // </div>
        // </body>
        // </html>       
        // `)
    })
}