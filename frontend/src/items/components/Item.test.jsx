import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Item from './Item';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const TEST_ITEMS_DATA = {
  id: '519ce2f1-13d6-480f-a808-8a14af22ffc5',
  title: 'Test Item 1',
  description: 'Test Description 1',
  image: 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg',
  price: 100.00,
  ownerId: '9e8333f4-7925-4b04-a7bf-9b0355ab1407',
};

describe('The Item', () => {
  test('should show the item details', () => {
    render(<Item
      key={TEST_ITEMS_DATA.id}
      id={TEST_ITEMS_DATA.id}
      title={TEST_ITEMS_DATA.title}
      description={TEST_ITEMS_DATA.description}
      image={TEST_ITEMS_DATA.image}
      price={TEST_ITEMS_DATA.price}
      ownerId={TEST_ITEMS_DATA.ownerId}
    />, { wrapper });
    expect(screen.getByText('Test Item 1')).toBeInTheDocument();
    expect(screen.getByText('Test Description 1')).toBeInTheDocument();
    expect(screen.getByText('Price: 100€')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', TEST_ITEMS_DATA.image);
    expect(screen.getByAltText(TEST_ITEMS_DATA.title)).toBeInTheDocument();
  });
});
