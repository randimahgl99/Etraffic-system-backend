import { Router } from "express";
import { CivilUserController } from "../Controllers/civilUserController";

const router = Router();
const civilUserController = new CivilUserController();



router.post("/auth/register", (req, res) => civilUserController.register(req, res));
router.post("/auth/login", (req, res) => civilUserController.login(req, res));
router.delete("/:id", (req, res) => civilUserController.deleteUser(req, res));
router.put("/:id", (req, res) => civilUserController.editUser(req, res));

export default router;
