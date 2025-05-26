import { Router } from "express";
import {
    addFine,
    deleteFine,
    editFine,
    getAllFines,
    getFineById
} from "../Controllers/fineManagementController"

const router: Router = Router();

router.post("/add", addFine);

router.delete("/delete/:id", deleteFine);

router.put("/edit/:id", editFine);

router.get("/all", getAllFines);

router.get("/:id", getFineById);

export default router;