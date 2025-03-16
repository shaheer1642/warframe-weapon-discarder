import { Router } from "express";
import itemsService from "../services/items.service";

const router = Router();

router.get('/', async (req, res) => {
    const items = itemsService.getItems();
    res.json(items);
})

export default router;