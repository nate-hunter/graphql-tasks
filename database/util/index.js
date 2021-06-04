const mongoose = require('mongoose');

module.exports.connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL, {
            useNewUrlParser: true, useUnifiedTopology: true
        });
        console.log('--> Connected to MongoDB')
    } catch (error) {
        console.log('\n!!! There was an error connecting to MongoDB !!!\n', error);
        throw error;        
    }

}