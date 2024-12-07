import { Router } from "express";
import { create, getAll } from "../services/transactionsService";

const router = Router();

router.get("/", getAll);
router.post("/", create);

export default router;
