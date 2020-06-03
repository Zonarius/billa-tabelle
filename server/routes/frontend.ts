import Parcel from 'parcel-bundler';

const frontendRouter = new Parcel("frontend/index.html");

export default frontendRouter.middleware();