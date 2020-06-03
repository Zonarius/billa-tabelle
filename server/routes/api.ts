import express from 'express';
import * as body from 'body-parser';
import BillaClient from '../billa-client/client';

const billa = new BillaClient();
const apiRouter = express.Router();

apiRouter.use(body.json());

apiRouter.post("/searchByUrl", async (req, res) => {
  const url = req.body.url;
  if (!url) {
    return res.sendStatus(400);
  }
  const response = await billa.searchByUrl(url);
  res.send(response);
})

apiRouter.get("/infos/:id", async (req, res) => {
  const response = await billa.articleInfos(req.params.id);
  res.send(response);
})

export default apiRouter;