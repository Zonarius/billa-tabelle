import express from 'express';
import apiRouter from './routes/api';

const app = express();

app.use("/api", apiRouter);

app.listen(8080, () => console.log("Running on port 8080"));