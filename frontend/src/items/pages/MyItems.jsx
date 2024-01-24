import { useQuery } from 'react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../shared/components/context/auth-context';
import ItemsList from '../components/ItemsList';

function MyItems() {
  const auth = useContext(AuthContext);
  const { isLoading, error, data } = useQuery('items', () => fetch(`${import.meta.env.VITE_API_URL}/api/items/owner/${auth.userId}`).then((res) => res.json()));

  return (
    <div className="bg-primary min-h-screen pt-10">
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>
          Error:
          {error.message}
        </div>
      ) : (
        <ItemsList items={data} />
      )}
    </div>
  );
}

export default MyItems;
