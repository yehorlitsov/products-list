import { InventoryItem } from '../../models/inventory-item.interface';
import { Product } from '../../models/product.interface';
import { API_URL } from '../../utils/variables/api.variables';

const PREFIX = 'inventory';

export class InventoryAPI {
  async getInventory(): Promise<InventoryItem[]> {
    const response = await fetch(`${API_URL}/${PREFIX}`);

    // if (!response.ok) {
    //   throw new Error('Network response was not ok');
    // }

    return response.json();
  }
}
