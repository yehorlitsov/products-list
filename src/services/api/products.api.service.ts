import { Product } from '../../models/product.interface';
import { API_URL } from '../../utils/variables/api.variables';

const PREFIX = 'product';

export class ProductsAPI {
  async getAll(): Promise<Product[]> {
    const response = await fetch(`${API_URL}/${PREFIX}/all`);

    // if (!response.ok) {
    //   throw new Error('Network response was not ok');
    // }

    return response.json();
  }
}
