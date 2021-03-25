
module.exports = function connectToMongodb(ODM, configurations) {
    ODM.connect(configurations.prodDbUri ||configurations.devDbUri, configurations.dbOptions, (err, conn)=> {
        if(err) throw err;
        console.log(`connection to database established`);
    })
}