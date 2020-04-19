import React from 'react';
import ReactDOM from 'react-dom';
import PastOrders from './PastOrders';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PastOrders />, div);
  ReactDOM.unmountComponentAtNode(div);
});
