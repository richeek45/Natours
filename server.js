/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Should put on top of code to catch any exception
process.on('uncaughtException', (err) => {
  console.log('UNHANDLES EXCEPTION (⓿_⓿) Shutting Down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// Read the config file and save them into node-js env variables
dotenv.config({ path: './config.env' });
const app = require('./app');
// const { connect } = require('./routes/tourRoutes');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connections successful!'));

// 4. START THE SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, () => { 
  console.log(`App running on port ${port}.....`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLES REJECTION (⓿_⓿) Shutting Down...');
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});




