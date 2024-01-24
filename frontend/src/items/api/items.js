export const getItems = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/items`);
  return await res.json();
};

export const createItem = async ({
  title,
  description,
  image,
  price,
  ownerId,
  token,
}) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/items`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title, description, image, price, ownerId,
    }),
  });
  return await res.json();
};

export const deleteItem = async ({ id, token }) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/items/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id,
    }),
  });
  return await res.json();
};

export const editItem = async ({
  id,
  title,
  description,
  image,
  price,
  ownerId,
  token,
}) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/items/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id, title, description, image, price, ownerId,
    }),
  });
  return await res.json();
};
