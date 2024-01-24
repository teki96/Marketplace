import React, { useContext, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { AuthContext } from '../../shared/components/context/auth-context';
import { deleteItem, editItem } from '../api/items';
import { getUserById } from '../../users/api/users';
import ConfirmModal from '../../shared/components/confirmModal/ConfirmModal';
import EditItemModal from '../../shared/components/editItemModal/EditItemModal';

function Item({ item, onDeleteItem, onEditItem }) {
  console.log(item.ownerId);
  const auth = useContext(AuthContext);
  const [sellerName, setSellerName] = useState('');
  const [sellerEmail, setSellerEmail] = useState('');

  const getSellerInformation = async () => {
    try {
      const data = await getUserById(item.ownerId);
      console.log(data);
      setSellerName(data[0].name);
      setSellerEmail(data[0].email);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSellerInformation();
  }, []);

  const deleteItemMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: (data) => {
      onDeleteItem(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const deleteConfirmationHandler = () => {
    try {
      deleteItemMutation.mutate({
        id: item.id,
        token: auth.token,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const editItemMutation = useMutation({
    mutationFn: editItem,
    onSuccess: (data) => {
      onEditItem(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const editItemHandler = (title, description, image, price) => {
    try {
      editItemMutation.mutate({
        id: item.id,
        title,
        description,
        image,
        price,
        ownerId: auth.userId,
        token: auth.token,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="card w-96 max-h-200 bg-base-100 shadow-xl">
        <figure className="h-64">
          <img
            src={
              item.image
              || 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
            }
            alt={item.title}
          />
        </figure>
        <div className="card-body break-all">
          <div className="flex justify-between items-center pb-4">
            <h2 className="card-title">{item.title}</h2>
            <div className="badge badge-outline justify-end">{`Price: ${item.price}€`}</div>
          </div>
          <p className="overflow-x-auto overflow-y-auto">{item.description}</p>
          <div className="divider" />
          <div className="align-bottom">
            {auth.userId !== item.ownerId && (
            <p>
              {`Listed by: ${sellerName}`}
            </p>
            )}
            {auth.userId !== item.ownerId && (
            <p>
              {`Email: ${sellerEmail}`}
            </p>
            )}
          </div>
          <div className="card-actions justify-center">
            <div className="flex gap-4">
              {auth.userId === item.ownerId && (
                <EditItemModal
                  id="editItemModal"
                  buttonTitle="Edit"
                  item={item}
                  editItemHandler={editItemHandler}
                />
              )}
              {auth.userId === item.ownerId && (
                <ConfirmModal
                  id="deleteItemModal"
                  buttonTitle="Delete"
                  title="Are you sure you want to delete the item?"
                  description=""
                  action={deleteConfirmationHandler}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
