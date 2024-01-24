import React, { useState } from 'react';

function EditItemModal(props) {
  const [title, setTitle] = useState(props.item.title);
  const [description, setDescription] = useState(props.item.description);
  const [image, setImage] = useState(props.item.image);
  const [price, setPrice] = useState(props.item.price);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.editItemHandler(title, description, image, price);
  };

  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor={props.id} className="btn btn-success">
        {props.buttonTitle}
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id={props.id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor={props.id}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="flex justify-center text-center pt-10 min-h-screen">
            <form onSubmit={handleSubmit} className="min-w-4xl">
              <div className="form-control">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  value={title || ''}
                  onChange={(event) => setTitle(event.target.value)}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label htmlFor="description">Description</label>
                <textarea
                  value={description || ''}
                  onChange={(event) => setDescription(event.target.value)}
                  className="textarea textarea-bordered"
                />
              </div>
              <div className="form-control">
                <label htmlFor="image">Link to image</label>
                <input
                  type="text"
                  value={image || ''}
                  onChange={(event) => setImage(event.target.value)}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control pb-5">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  value={price || 0.00}
                  onChange={(event) => setPrice(event.target.value)}
                  className="input input-bordered w-full"
                />
              </div>
              <button type="submit" className="btn btn-success w-48">
                Update Item
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditItemModal;
