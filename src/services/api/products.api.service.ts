import { Product } from '../../models/product.interface';
import { API_URL } from '../../utils/variables/api.variables';

const PREFIX = 'product';

export class ProductsAPI {
  async getAll(): Promise<Product[]> {
    const response = await fetch(`${API_URL}/${PREFIX}/all`);

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    return response.json();
  }

  async addProduct(product: Product) {
    const response = await fetch(`${API_URL}/${PREFIX}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    return response.json();
  }
}
