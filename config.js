module.exports = {
    host: 'localhost',
    port: 3333,
    mongodb: {
        // host: 'mongodb://localhost:27017/pokertimer',
        host: 'mongodb+srv://pokertimer-admin:Albg1999@cluster0-qco8p.mongodb.net/pokertimer',
        opt: {
            useNewUrlParser: true,
            connectTimeoutMS: 10000,
            socketTimeoutMS: 10000,
        }
    },
    listLimit: 10
};