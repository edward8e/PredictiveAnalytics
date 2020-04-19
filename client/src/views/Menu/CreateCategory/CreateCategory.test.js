import React from 'react';
import ReactDOM from 'react-dom';
import CreateCategory from './CreateCategory';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateCategory />, div);
  ReactDOM.unmountComponentAtNode(div);
});
