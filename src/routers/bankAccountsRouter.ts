import { Router } from "express";

import { create, getAll } from "../services/bankAccountsService";

const router = Router();

router.post("/", create);
router.get("/", getAll);

export default router;
