import express from 'express';
import devBundle from './devBundle';
import path from 'path';
import template from './../template';
import { MongoClient } from 'mongodb';

const CURRENT_WORKING_DIR = process.cwd();
const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSimpleSetup';

MongoClient.connect(MONGODB_URI, (err, db) => {
  console.log('Connected sucessfully to mongodb server');
  db.close();
});

const app = express();

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

app.get('/', (req, res) => {
  res.status(200).send(template());
});

devBundle.compile(app);

app.listen(PORT, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('Server started on port %s.', PORT);
});
