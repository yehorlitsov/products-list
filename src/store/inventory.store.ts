import { create } from 'zustand';
import { Product } from '../models/product.interface';
import { InventoryItem } from '../models/inventory-item.interface';

const mockedProducts = [
  {
    name: 'shampoo',
  },
  {
    name: 'milk',
  },
  {
    name: 'eggs',
  },
  {
    name: 'beef burger',
  },
  {
    name: 'new pr',
  },
];

const mockedInventory = [
  {
    name: 'milk',
    quantity: 2,
  },
  {
    name: 'eggs',
    quantity: 3,
  },
];

interface ProductsState {
  products: Product[];
  inventory: InventoryItem[];
  addProduct: (product: Product) => void;
  setProducts: (products: Product[]) => void;
  addInventroyItem: (inventoryItem: InventoryItem) => void;
  removeInventoryItem: (index: number) => void;
  setInventory: (nventoryItems: InventoryItem[]) => void;
}

const useInventoryStore = create<ProductsState>((set) => ({
  products: mockedProducts || [],
  inventory: mockedInventory || [],
  addProduct: (product: Product) =>
    set((state: ProductsState) => ({
      ...state,
      products: [...state.products, product],
    })),
  setProducts: (products: Product[]) =>
    set((state: ProductsState) => ({
      ...state,
      products: products,
    })),
  addInventroyItem: (inventoryItem: InventoryItem) =>
    set((state: ProductsState) => {
      const existingItem = state.inventory.find(
        (item) => item.name === inventoryItem.name
      );

      if (existingItem) {
        return {
          ...state,
          inventory: state.inventory.map((item) =>
            item.name === inventoryItem.name
              ? { ...item, quantity: item.quantity + inventoryItem.quantity }
              : item
          ),
        };
      }

      return {
        ...state,
        inventory: [...state.inventory, inventoryItem],
      };
    }),
  removeInventoryItem: (index) =>
    set((state) => ({
      ...state,
      inventory: state.inventory.filter((_, i) => i !== index),
    })),
  setInventory: (inventoryItems: InventoryItem[]) =>
    set((state: ProductsState) => ({
      ...state,
      inventory: inventoryItems,
    })),
}));

export default useInventoryStore;
