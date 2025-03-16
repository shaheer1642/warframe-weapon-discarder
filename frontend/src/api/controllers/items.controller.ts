import api from "../axios";

class ItemsController {
    async getItems() {
        const items = await api.get('/items');
        return items.data;
    }
}

const itemsController = new ItemsController();

export default itemsController;