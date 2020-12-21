import "./lib/env";
import express from 'express';
import bodyParser from "body-parser";
import path from "path";
import apiRouter from './api';

// Create a new express app instance
const app: express.Application = express();
const buildDir = path.resolve(__dirname, '../../build');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(buildDir));
app.use('/api', apiRouter);


app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
  if (err) {
    // global error catch here
    console.error(err.message); // oh no!
    res.status(500).send(err.message);
    return;
  }

  next(req);
})

const port = process.env.API_PORT || 3001;
app.listen(port, () => console.log(`App is listening on port ${port}!`));