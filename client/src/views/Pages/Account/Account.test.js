import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Account from './Account';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Account/></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
