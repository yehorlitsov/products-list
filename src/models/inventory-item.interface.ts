import { Product } from './product.interface';

export interface InventoryItem extends Product {
  quantity: number;
}
