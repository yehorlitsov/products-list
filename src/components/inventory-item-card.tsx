import { ShoppingBasket } from 'lucide-react';
import Card from '../lib/card';
import { InventoryItem } from '../models/inventory-item.interface';
import { Trash2 } from 'lucide-react';
import useInventoryStore from '../store/inventory.store';

interface IntventoryItemCardProps {
  inventoryItem: InventoryItem;
  index: number;
}

const InventoryItemCard = ({
  inventoryItem,
  index,
}: IntventoryItemCardProps) => {
  const { removeInventoryItem } = useInventoryStore();

  return (
    <Card className='grid grid-cols-[32px_180px_1fr_50px] gap-2 items-center'>
      <ShoppingBasket size={32} />
      <div>{inventoryItem.name}</div>
      <div>{inventoryItem.quantity}</div>
      <Trash2
        size={18}
        className='justify-self-end cursor-pointer text-red-600'
        onClick={() => removeInventoryItem(index)}
      />
    </Card>
  );
};

export default InventoryItemCard;
