import express from 'express';
import * as body from 'body-parser';
import BillaClient from '../billa-client/client';

const billa = new BillaClient();
const apiRouter = express.Router();

apiRouter.use(body.json());

apiRouter.get("/searchByUrl", async (req, res) => {
  const response = await billa.searchByUrl(req.body.url);
  res.send(response);
})

apiRouter.get("/infos/:id", async (req, res) => {
  const response = await billa.articleInfos(req.params.id);
  res.send(response);
})

export default apiRouter;