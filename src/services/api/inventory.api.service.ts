import { InventoryItem } from '../../models/inventory-item.interface';
import { API_URL } from '../../utils/variables/api.variables';

const PREFIX = 'inventory';

export class InventoryAPI {
  async getInventory(): Promise<InventoryItem[]> {
    const response = await fetch(`${API_URL}/${PREFIX}`);

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    return response.json();
  }

  async updateInventory(inventoryItem: InventoryItem[]) {
    const response = await fetch(`${API_URL}/${PREFIX}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inventoryItem),
    });

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    return response.json();
  }
}
