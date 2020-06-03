import express from 'express';
import * as body from 'body-parser';
import BillaClient from '../billa-client/client';

const billa = new BillaClient();
const apiRouter = express.Router();
// const searchMock = require("./mock.json");

apiRouter.use(body.json());

apiRouter.post("/searchByUrl", async (req, res) => {
  const url = req.body.url;
  if (!url) {
    return res.sendStatus(400);
  }
  // res.send(searchMock);
  const response = await billa.searchByUrl(url);
  if (req.query.includeInfos === "true") {
    const infos = await Promise.all(response.tiles.map(article => billa.articleInfos(article.data.articleId)))
    infos.forEach((infos, i) => (response.tiles[i] as any).infos = infos)
  }
  
  res.send(response);
})

apiRouter.get("/infos/:id", async (req, res) => {
  const response = await billa.articleInfos(req.params.id);
  res.send(response);
})

export default apiRouter;