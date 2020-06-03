import express from 'express';
import * as body from 'body-parser';
import BillaClient from './billa-client/client';

const billa = new BillaClient();
const app = express();
const api = express.Router();

api.use(body.json());

api.get("/searchByUrl", async (req, res) => {
  const response = await billa.searchByUrl(req.body.url);
  res.send(response);
})

api.get("/infos/:id", async (req, res) => {
  const response = await billa.articleInfos(req.params.id);
  res.send(response);
})

app.use("/api", api);

app.listen(8080, () => console.log("Running on port 8080"));