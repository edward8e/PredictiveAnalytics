import React from 'react';
import ReactDOM from 'react-dom';
import ShowCategory from './ShowCategory';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ShowCategory />, div);
  ReactDOM.unmountComponentAtNode(div);
});
