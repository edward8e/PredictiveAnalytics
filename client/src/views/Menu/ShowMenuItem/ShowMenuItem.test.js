import React from 'react';
import ReactDOM from 'react-dom';
import ShowMenuItem from './ShowMenuItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ShowMenuItem />, div);
  ReactDOM.unmountComponentAtNode(div);
});
