import express from 'express';
import { getFindings, bindCatch } from '../lib/utils';
import { sum } from "../../core/math";

const router = express.Router();


router.get('/', (_, res) => res.send('API is healthy!'));

router.get('/occurence', bindCatch(async function (req: express.Request, res: express.Response) {
  const tagName = req.query.tagName;

  if (!tagName) {
    throw new Error('tagName query param is expected!');
  }
  
  const finding = await getFindings(tagName as string);

  res.send(finding);
}));

router.get('/sum', (_, res) => res.send(`${sum(10, 4)}`));

export default router