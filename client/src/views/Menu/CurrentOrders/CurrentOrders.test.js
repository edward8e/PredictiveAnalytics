import React from 'react';
import ReactDOM from 'react-dom';
import CurrentOrders from './CurrentOrders';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CurrentOrders />, div);
  ReactDOM.unmountComponentAtNode(div);
});
