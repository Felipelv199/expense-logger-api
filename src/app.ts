import express from "express"
import cors from "cors";

import router from "./routers/transactionsRouter";
import { errorHandler } from "./middlewares/errorHandlerMiddleware";

export default function buildApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use("/transactions", router);
  app.use(errorHandler);

  return app;
}
