import React, { useState } from 'react';
import { useQuery } from 'react-query';
import ItemsList from '../components/ItemsList';
import LoadingSpinner from '../../shared/components/loadingspinner/LoadingSpinner';

function Items() {
  const [items, setItems] = useState([]);
  const { isLoading, data, error } = useQuery('items', () => fetch(`${import.meta.env.VITE_API_URL}/api/items`).then((res) => res.json()), {
    onSuccess: (data) => {
      setItems(data);
    },
  });

  const handleDeleteItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleEditItem = (editedItem) => {
    setItems((prevItems) => prevItems.map((item) => {
      if (item.id === editedItem.id) {
        return editedItem;
      }
      return item;
    }));
  };

  return (
    <div className="bg-primary min-h-screen pt-10">
      {isLoading ? (
        <div className="flex pt-10 justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div>
          Error:
          {error.message}
        </div>
      ) : (
        <ItemsList items={items} onDeleteItem={handleDeleteItem} onEditItem={handleEditItem} />
      )}
    </div>
  );
}

export default Items;
