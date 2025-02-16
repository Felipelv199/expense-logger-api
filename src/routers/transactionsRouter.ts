import { Router } from "express";

import {
  create,
  getByPage,
  createBulk,
  update,
  getById,
} from "../services/transactionsService";

const router = Router();

router.get("/", getByPage);
router.get("/:id", getById);
router.post("/", create);
router.post("/bulk", createBulk);
router.put("/:id", update);

export default router;
