import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import ValidateAccount from './ValidateAccount';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><ValidateAccount/></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
