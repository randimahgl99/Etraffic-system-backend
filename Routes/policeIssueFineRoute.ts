
import { addpoliceIssueFine, getAllPoliceIssueFines, getFinesByUserNIC, getPoliceById } from './../Controllers/policeIssueFineController';
import {Router} from "express";



const router: Router = Router();
router.post("/add", addpoliceIssueFine);
router.get("/all", getAllPoliceIssueFines);
router.get("/fines-get-by-NIC/:id", getFinesByUserNIC);
router.get("/policeOfficer-get-by-policeId/:id", getPoliceById);

export default router;