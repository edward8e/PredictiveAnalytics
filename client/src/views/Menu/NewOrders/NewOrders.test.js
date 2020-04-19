import React from 'react';
import ReactDOM from 'react-dom';
import NewOrders from './NewOrders';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NewOrders />, div);
  ReactDOM.unmountComponentAtNode(div);
});
