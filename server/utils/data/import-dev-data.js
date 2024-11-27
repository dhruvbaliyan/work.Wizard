import dotenv from 'dotenv';
import fs from 'fs';
import mongoose from 'mongoose';
import Gigs from '../../models/gig.model.js'; // Adjust the path to your model

dotenv.config({path:'/Users/Shared/Files From f.localized/Web Devlopment/React/work_Wizard/work_wizard/server/.env'});

// if (!process.env.DATABASE || !process.env.DATABASE_PASSWORD) {
//   console.error('Error: DATABASE or DATABASE_PASSWORD is not defined in the environment variables.');
//   process.exit(1);
// }

// const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// Connect to MongoDB
console.log(process.env.MONGO);

mongoose
  .connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => {
    console.error('DB connection error:', err);
    process.exit(1);
  });

// READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(new URL('./gigs.json', import.meta.url), 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Gigs.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Gigs.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const args = process.argv.slice(2);
if (args[0] === '--import') {
  importData();
} else if (args[0] === '--delete') {
  deleteData();
} else {
  console.log('Invalid command. Use --import to import data or --delete to delete data.');
  process.exit(1);
}
