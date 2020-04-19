import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Order from './Order';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Order/></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
