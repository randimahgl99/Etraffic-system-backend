import { Router } from "express";
import {
    addFine,
    deleteFine,
    editFine,
    getAllFines
} from "../Controllers/fineManagementController"

const router: Router = Router();

router.post("/add", addFine);

router.delete("/delete/:id", deleteFine);

router.put("/edit/:id", editFine);

router.get("/all", getAllFines);

export default router;