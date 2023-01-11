import express from 'express';
import dotenv from 'dotenv';
import { dataSourceConfig } from './database/data-source.config';
import { router } from './router/beach.router';

dotenv.config();

const app = express();
const port = process.env.PORT

dataSourceConfig
  .initialize()
  .then(() => {
    console.log('Data Source has been been initialized!');
  })
  .catch(error => {
    console.error("Error during Data Source initialization:", error);
  });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/beach', router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
