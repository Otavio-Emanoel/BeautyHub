import { Router } from "express";
import { listSalons } from "../controllers/salonController";

const router = Router();

// Rota para listar salões (Cliente)
router.get("/", listSalons);

export default router;