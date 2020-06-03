import express from 'express';
import apiRouter from './routes/api';
import frontendRouter from './routes/frontend';

const app = express();

app.use("/api", apiRouter);
app.use(frontendRouter);

app.listen(8080, () => console.log("Running on port 8080"));