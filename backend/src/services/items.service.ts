import Items from "warframe-items";

class ItemsService {
    getItems() {
        const items = new Items({ category: ['Primary', 'Secondary', 'Melee'] });
        return items
    }
}

const itemsService = new ItemsService();

export default itemsService;