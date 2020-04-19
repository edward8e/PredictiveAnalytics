import React from 'react';
import ReactDOM from 'react-dom';
import Utils from './Utils';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Utils />, div);
  ReactDOM.unmountComponentAtNode(div);
});
