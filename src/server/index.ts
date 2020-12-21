
import "./lib/env";
import express from 'express';
import { getFindings, bindCatch } from './lib/utils';

// Create a new express app instance
const app: express.Application = express();

app.get('/', bindCatch(async function (req: express.Request, res: express.Response) {
  const wtTagName = req.query.wtTagName;

  if (!wtTagName) {
    throw new Error('wtTagName query param is expected!');
  }
  
  const finding = await getFindings(wtTagName as string);

  res.send(finding);
}));

app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
  if (err) {
    // global error catch here
    console.error(err.message); // oh no!
    res.status(500).send(err.message);
    return;
  }

  next(req);
})

const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT || 3000, () => console.log(`App is listening on port ${PORT}!`));