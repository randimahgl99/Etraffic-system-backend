import { Router } from "express";
import { PoliceOfficerController } from "../Controllers/policeOfficerController";

const router = Router();
const policeOfficerController = new PoliceOfficerController();



router.post("/auth/register", (req, res) => policeOfficerController.registerPoliceOfficerUser(req, res));
router.delete("/delete/:id", (req, res) => policeOfficerController.deletePoliceOfficerUser(req, res));
router.put("/edit/:id", (req, res) => policeOfficerController.editPoliceOfficerUser(req, res));
router.get("/getall", (req, res) => policeOfficerController.getAllPoliceOfficerUser(req, res));

export default router;
