import { create } from 'zustand';
import { Product } from '../models/product.interface';
import { InventoryItem } from '../models/inventory-item.interface';
import { ProductsAPI } from '../services/api/products.api.service';
import { InventoryAPI } from '../services/api/inventory.api.service';

const productsAPIService = new ProductsAPI();
const inventoryAPIService = new InventoryAPI();

interface ProductsState {
  products: Product[];
  inventory: InventoryItem[];
  addProduct: (product: Product) => void;
  setProducts: (products: Product[]) => void;
  addInventroyItem: (inventoryItem: InventoryItem) => void;
  removeInventoryItem: (index: number) => void;
  setInventory: (nventoryItems: InventoryItem[]) => void;
}

const useInventoryStore = create<ProductsState>((set, get) => ({
  products: [],
  inventory: [],
  addProduct: async (product: Product) => {
    const newProduct = await productsAPIService.addProduct(product);

    set((state: ProductsState) => ({
      ...state,
      products: [...state.products, newProduct],
    }));
  },
  setProducts: (products: Product[]) =>
    set((state: ProductsState) => ({
      ...state,
      products: products,
    })),
  addInventroyItem: async (inventoryItem: InventoryItem) => {
    const state = get();

    const newInventroy = await inventoryAPIService.updateInventory([
      ...state.inventory,
      inventoryItem,
    ]);

    set((state: ProductsState) => ({
      ...state,
      inventory: newInventroy,
    }));
  },
  removeInventoryItem: async (index) => {
    const state = get();
    const itemsToUpdate = state.inventory.filter((_, i) => i !== index);
    const newInventroy = await inventoryAPIService.updateInventory(
      itemsToUpdate
    );

    set((state) => ({
      ...state,
      inventory: newInventroy,
    }));
  },
  setInventory: (inventoryItems: InventoryItem[]) =>
    set((state: ProductsState) => ({
      ...state,
      inventory: inventoryItems,
    })),
}));

export default useInventoryStore;
