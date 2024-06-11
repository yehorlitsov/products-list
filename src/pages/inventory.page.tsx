import Button from '../lib/button';
import Card from '../lib/card';
import InventoryItemCard from '../components/inventory-item-card';
import PageHeader from '../components/page-header';
import useInventoryStore from '../store/inventory.store';
import { useNavigate } from 'react-router-dom';
import { RouterUrls } from '../utils/variables/router.variables';
import { useState } from 'react';

const IntventoryPage = () => {
  const { inventory, products, addInventroyItem } = useInventoryStore();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);

  const handleNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setName(e.currentTarget.value);
  };

  const handleQuantityInput = (e: React.FormEvent<HTMLInputElement>) => {
    setQuantity(+e.currentTarget.value);
  };

  const handleAddProductClick = () => {
    navigate(`/${RouterUrls.ADD_PRODUCT}`);
  };

  const handleAddInventoryItemClick = () => {
    if (quantity <= 0) {
      return;
    }

    if (!name) {
      return;
    }

    addInventroyItem({ name, quantity });
  };

  return (
    <main className='container m-auto'>
      <PageHeader>Intentory</PageHeader>
      <div className='flex flex-col gap-4'>
        <Card className='grid grid-cols-1 md:grid-cols-[minmax(160px,_1fr)_minmax(160px,_1fr)_160px] gap-4'>
          <div className='flex flex-col'>
            <label htmlFor='name'>Name:</label>
            <select
              id='name'
              value={name}
              onChange={handleNameChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            >
              <option value=''>Select a category</option>

              {products.map((product, index) => (
                <option key={index} value={product.name}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='name'>Quantity:</label>
            <input
              type='number'
              id='quantity'
              value={quantity}
              onInput={handleQuantityInput}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
          </div>
          <div className='flex justify-center md:items-end md:justify-end'>
            <Button onClick={handleAddInventoryItemClick}>Add Item</Button>
          </div>{' '}
        </Card>

        <Card className='flex flex-col gap-4'>
          <div className='px-4 grid grid-cols-[32px_180px_1fr] gap-2 items-center'>
            <span></span>
            <span>Name</span>
            <span>Quantity</span>
          </div>

          {inventory.map((inventoryItem, index) => (
            <InventoryItemCard
              key={index}
              inventoryItem={inventoryItem}
              index={index}
            />
          ))}
        </Card>
      </div>
      <div className='p-4 flex justify-center'>
        <Button onClick={handleAddProductClick}>Add Product</Button>
      </div>
    </main>
  );
};

export default IntventoryPage;
