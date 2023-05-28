const mongoose = require('mongoose');
require('dotenv').config();
// let uri = "mongodb+srv://avery:password12345@the-flick-tracker.dnbkejv.mongodb.net/?retryWrites=true&w=majority"

// const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/yourmovies',
  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false

  // useCreateIndex: true,
}
);

module.exports = mongoose.connection;
