import { Router } from "express";
import { listSalons } from "../controllers/salonController";
import { listSalonServices } from "../controllers/serviceController";

const router = Router();

// Rota para listar salões (Cliente)
router.get("/", listSalons);

// Rota para listar serviços de um salão específico (Cliente)
router.get("/:id/services", listSalonServices);

export default router;