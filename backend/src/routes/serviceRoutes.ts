import { Router } from "express";
import { getServiceWithReviews } from "../controllers/serviceController";

const router = Router();

// Rota para obter um serviço específico com avaliações
router.get("/:id", getServiceWithReviews);

export default router;