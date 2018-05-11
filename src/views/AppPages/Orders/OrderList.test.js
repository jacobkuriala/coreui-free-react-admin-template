import React from 'react';
import ReactDOM from 'react-dom';
import OrderList from './OrderList';

jest.mock('react-chartjs-2', () => ({
  Line: () => null,
  Bar: () => null,
}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<OrderList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
