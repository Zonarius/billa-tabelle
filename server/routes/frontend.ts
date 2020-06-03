import express from 'express';
import Parcel from 'parcel-bundler';
import appRoot from 'app-root-path';

const development = process.env.NODE_ENV !== 'production';
console.log(require.main?.filename);
export default function frontendRouter() {
  if (development) {
    const frontendRouter = new Parcel(appRoot.resolve("frontend/index.html"));
    return frontendRouter.middleware();
  } else {
    const router = express.Router();
    router.use(express.static(appRoot.resolve("dist")))
    router.get("*", (req, res) => {
      res.sendFile(appRoot.resolve("dist/index.html"))
    })
    return router;
  }
}
