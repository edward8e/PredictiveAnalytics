import React from 'react';
import ReactDOM from 'react-dom';
import CreateMenuItem from './CreateMenuItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateMenuItem />, div);
  ReactDOM.unmountComponentAtNode(div);
});
