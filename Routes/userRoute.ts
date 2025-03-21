import { Router } from "express";
import { CivilUserController } from "../Controllers/civilUserController";

const router = Router();
const civilUserController = new CivilUserController();



router.post("/auth/register", (req, res) => civilUserController.register(req, res));
router.post("/auth/login", (req, res) => civilUserController.login(req, res));
router.delete("/:id", (req, res) => civilUserController.deleteUser(req, res));
router.put("/:id", (req, res) => civilUserController.editUser(req, res));
router.post("/pay-fine", (req, res) => civilUserController.payFine(req,res));
router.put("/pay-fine-status", (req, res) => civilUserController.payFineStatus(req,res));

export default router;
