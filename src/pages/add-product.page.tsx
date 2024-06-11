import { useState } from 'react';
import Card from '../lib/card';
import PageHeader from '../components/page-header';
import Button from '../lib/button';
import useInventoryStore from '../store/inventory.store';
import { useNavigate } from 'react-router-dom';
import { RouterUrls } from '../utils/variables/router.variables';

const AddProductPage = () => {
  const [name, setName] = useState<string>('');
  const { addProduct } = useInventoryStore();
  const navigate = useNavigate();
  const handleAddProduct = () => {
    addProduct({ name });
    navigate(`/${RouterUrls.INVENTORY_PAGE}`);
  };

  const handleNameInput = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  return (
    <main className='min-w-80 w-1/3 m-auto h-svh flex flex-col'>
      <PageHeader>AddProducts Page</PageHeader>
      <div className='flex flex-col flex-1 justify-center pb-4'>
        <Card className='max-h-80 h-full'>
          <form
            className='flex flex-col h-full gap-4 justify-center'
            onSubmit={handleAddProduct}
          >
            <div className='flex flex-col'>
              <label htmlFor='name'>Name:</label>
              <input
                type='text'
                id='name'
                value={name}
                onInput={handleNameInput}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
            </div>
            <Button>Add Product</Button>
          </form>
        </Card>
      </div>
    </main>
  );
};

export default AddProductPage;
