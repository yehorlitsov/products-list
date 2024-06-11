import { useEffect, useState } from 'react';
import Card from '../lib/card';
import useInventoryStore from '../store/inventory.store';
import { ProductsAPI } from '../services/api/products.api.service';
import Button from '../lib/button';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const productsAPIService = new ProductsAPI();

const AddInventoryItemFormLoading = () => {
  return (
    <Card className='grid grid-cols-1 md:grid-cols-[minmax(160px,_1fr)_minmax(160px,_1fr)_160px] gap-4'>
      <div className='flex flex-col gap-1'>
        <Skeleton containerClassName='flex' className='h-6 max-w-14' />
        <Skeleton containerClassName='flex' className='h-10' />
      </div>
      <div className='flex flex-col gap-1'>
        <Skeleton containerClassName='flex' className='h-6 max-w-16' />
        <Skeleton containerClassName='flex' className='h-10' />
      </div>
      <div className='flex justify-center md:items-end md:justify-end'>
        <Button className='pointer-events-none'>Add Item</Button>
      </div>
    </Card>
  );
};

const AddInventoryItemForm = () => {
  const { products, addInventroyItem, setProducts } = useInventoryStore();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

  const handleNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setName(e.currentTarget.value);
  };

  const handleQuantityInput = (e: React.FormEvent<HTMLInputElement>) => {
    setQuantity(+e.currentTarget.value);
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

  useEffect(() => {
    const requestProducts = async () => {
      try {
        const fetchedProducts = await productsAPIService.getAll();
        setProducts(fetchedProducts);
      } catch (err) {
        // setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    requestProducts();
  }, [setProducts]);

  return (
    <>
      {loading ? (
        <AddInventoryItemFormLoading />
      ) : (
        <Card className='grid grid-cols-1 md:grid-cols-[minmax(160px,_1fr)_minmax(160px,_1fr)_160px] gap-4'>
          <div className='flex flex-col gap-1'>
            <label htmlFor='name'>Name:</label>
            <select
              id='name'
              value={name}
              onChange={handleNameChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-10'
            >
              <option value=''>Select a category</option>

              {products.map((product, index) => (
                <option key={index} value={product.name}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='name'>Quantity:</label>
            <input
              type='number'
              id='quantity'
              value={quantity}
              onInput={handleQuantityInput}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-10'
            />
          </div>
          <div className='flex justify-center md:items-end md:justify-end'>
            <Button onClick={handleAddInventoryItemClick}>Add Item</Button>
          </div>
        </Card>
      )}
    </>
  );
};

export default AddInventoryItemForm;
