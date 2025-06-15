import { Router } from "express";
import { getServiceWithReviews, autoCancelOverdueAppointments } from "../controllers/serviceController";

const router = Router();

// Rota para obter um serviço específico com avaliações
router.get("/:id", getServiceWithReviews);

// Rota para auto-cancelamento de agendamentos atrasados
router.post("/auto-cancel-overdue", autoCancelOverdueAppointments);

export default router;