import React from 'react';
import Item from './Item';

function ItemsList(props) {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No items found.</h2>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <ul className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {props.items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={props.onDeleteItem}
            onEditItem={props.onEditItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ItemsList;
