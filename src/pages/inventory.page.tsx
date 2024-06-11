import Button from '../lib/button';
import Card from '../lib/card';
import InventoryItemCard from '../components/inventory-item-card';
import PageHeader from '../components/page-header';
import useInventoryStore from '../store/inventory.store';
import { useNavigate } from 'react-router-dom';
import { RouterUrls } from '../utils/variables/router.variables';
import AddInventoryItemForm from '../components/add-inventory-item-form';
import { InventoryAPI } from '../services/api/inventory.api.service';
import { useEffect, useState } from 'react';
import { ShoppingBasket, Trash2 } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';

const inventoryAPIService = new InventoryAPI();

const IntventoryListLoading = () => {
  return (
    <>
      {['', ''].map((_, index) => (
        <Card
          key={index}
          className='grid grid-cols-[32px_180px_1fr_50px] gap-2 items-center'
        >
          <ShoppingBasket size={32} />
          <Skeleton containerClassName='flex' className='h-6' />
          <Skeleton containerClassName='flex' className='h-6 max-w-80' />
          <Trash2
            size={18}
            className='justify-self-end cursor-pointer text-red-600 pointer-events-none'
          />
        </Card>
      ))}
    </>
  );
};

const IntventoryPage = () => {
  const { inventory, setInventory } = useInventoryStore();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleAddProductClick = () => {
    navigate(`/${RouterUrls.ADD_PRODUCT}`);
  };

  useEffect(() => {
    const requestProducts = async () => {
      try {
        const fetchedInventory = await inventoryAPIService.getInventory();
        setInventory(fetchedInventory);
      } catch (err) {
        // setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    requestProducts();
  }, [setInventory]);

  return (
    <main className='container m-auto'>
      <PageHeader>Intentory</PageHeader>
      <div className='flex flex-col gap-4'>
        <AddInventoryItemForm />

        <Card className='flex flex-col gap-4'>
          <div className='px-4 grid grid-cols-[32px_180px_1fr] gap-2 items-center'>
            <span></span>
            <span>Name</span>
            <span>Quantity</span>
          </div>

          {loading ? (
            <IntventoryListLoading />
          ) : (
            inventory.map((inventoryItem, index) => (
              <InventoryItemCard
                key={index}
                inventoryItem={inventoryItem}
                index={index}
              />
            ))
          )}
        </Card>
      </div>
      <div className='p-4 flex justify-center'>
        <Button onClick={handleAddProductClick}>Add Product</Button>
      </div>
    </main>
  );
};

export default IntventoryPage;
