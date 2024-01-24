import React, { useRef, useContext, useState } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { createItem } from '../api/items';
import { AuthContext } from '../../shared/components/context/auth-context';
import ErrorNotification from '../../shared/components/errornotification/ErrorNotification';
import LoadingSpinner from '../../shared/components/loadingspinner/LoadingSpinner';

function CreateItem() {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();
  const priceRef = useRef();

  const auth = useContext(AuthContext);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createItemMutation = useMutation({
    mutationFn: createItem,
    onSuccess: (data) => {
      if (data.error) {
        setErrorMessage(data.error);
        setErrorVisible(true);
        return;
      }
      console.log(data);
      history.push('/');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      createItemMutation.mutate({
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        image: imageRef.current.value,
        price: priceRef.current.value,
        ownerId: auth.userId,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center text-center pt-10 bg-base-200 min-h-screen">
      <form onSubmit={onSubmitHandler} className="min-w-4xl">
        {errorMessage && (
          <ErrorNotification
            message={errorMessage}
            onClose={() => {
              setErrorVisible(false);
              setErrorMessage('');
            }}
          />
        )}
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" placeholder="Type here" ref={titleRef} className="input input-bordered w-full" />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <textarea ref={descriptionRef} className="textarea textarea-bordered" placeholder="Type here" />
        </div>
        <div className="form-control">
          <label htmlFor="image">Link to image</label>
          <input type="text" placeholder="Type here" ref={imageRef} className="input input-bordered w-full" />
        </div>
        <div className="form-control pb-5">
          <label htmlFor="price">Price</label>
          <input type="text" placeholder="0.00" ref={priceRef} className="input input-bordered w-full" />
        </div>
        <button type="submit" className="btn btn-success w-48">Create Item</button>
        {isSubmitting && (
        <div className="flex pt-10 justify-center items-center">
          <LoadingSpinner />
        </div>
        )}
      </form>
    </div>
  );
}

export default CreateItem;
