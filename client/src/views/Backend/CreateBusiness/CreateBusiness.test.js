import React from 'react';
import ReactDOM from 'react-dom';
import CreateBusiness from './CreateBusiness';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateBusiness />, div);
  ReactDOM.unmountComponentAtNode(div);
});
