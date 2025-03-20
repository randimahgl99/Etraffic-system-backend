import { Router } from "express";
import { CivilUserController } from "../Controllers/civilUserController";

const router = Router();
const civilUserController = new CivilUserController();


router.post("/auth/adminRegister", (req, res) => civilUserController.adminRegister(req, res));
router.put("/auth/admin/:id", (req, res) => civilUserController.editAdmin(req, res));


export default router;
