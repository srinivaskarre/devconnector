const config = require('config');
const mongoose = require('mongoose');

const mongoURI = config.get('mongoURI');

const connection = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      createIndexes: true,
    });
    console.log('Mongoose connected!!');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connection;
