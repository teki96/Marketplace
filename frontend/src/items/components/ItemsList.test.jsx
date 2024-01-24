import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ItemsList from './ItemsList';

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

const TEST_ITEMS_DATA = [
  {
    id: '519ce2f1-13d6-480f-a808-8a14af22ffc5',
    title: 'Test Item 1',
    description: 'Test Description 1',
    image: 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg',
    price: 100.00,
    ownerId: '9e8333f4-7925-4b04-a7bf-9b0355ab1407',
  },
  {
    id: '31c05f08-7c0e-4db5-a07c-fa54a7058078',
    title: 'Test Item 2',
    description: 'Test Description 2',
    image: 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg',
    price: 200.00,
    ownerId: 'fee13236-95f8-4659-ae78-27d1ddce138f',
  },
  {
    id: 'b2b0b5a0-0b0a-4b0a-8b0a-0b0b0b0b0b0b',
    title: 'Test Item 3',
    description: 'Test Description 3',
    image: 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg',
    price: 300.00,
    ownerId: '77100e50-0a08-4a69-bdbd-0cd8068c37ac',
  },
];

describe('The ItemsList', () => {
  test('should show no items when no item is available', () => {
    render(<ItemsList items={[]} />);
    expect(screen.getByText('No items found.')).toBeInTheDocument();
  });

  test('should show a list of items', () => {
    render(<ItemsList items={TEST_ITEMS_DATA} />, { wrapper });
    expect(screen.queryByText('No items found.')).not.toBeInTheDocument();
    expect(screen.getByText('Test Item 1')).toBeInTheDocument();
    expect(screen.getByText('Test Item 2')).toBeInTheDocument();
    expect(screen.getByText('Test Item 3')).toBeInTheDocument();
  });
});
