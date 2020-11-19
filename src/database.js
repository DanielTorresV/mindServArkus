const mongoose = require('mongoose') 

const URI = 'mongodb://mongo:27017/mind';

mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
})

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB is running');
});