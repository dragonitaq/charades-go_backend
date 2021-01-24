const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const db = process.env.MONGODB.replace('<USERNAME>', process.env.MONGODB_USERNAME).replace('<PASSWORD>', process.env.MONGODB_PASSWORD);

mongoose
  .connect(db, {
    // These are to deal with deprecation warning
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    // mongoose connect will return an promise object.
  })
  .then(() => {
    console.log('Database is connected!');
  });

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Server is live!');
});
