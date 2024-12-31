import cors from "cors";
import express from "express";

import { errorHandler } from "./middlewares/errorHandlerMiddleware";
import bankAccountsRouter from "./routers/bankAccountsRouter";
import categoriesRouter from "./routers/categoriesRouter";
import transactionRouter from "./routers/transactionsRouter";

export default function buildApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use("/transactions", transactionRouter);
  app.use("/bank/accounts", bankAccountsRouter);
  app.use("/categories", categoriesRouter);
  app.use(errorHandler);

  return app;
}
