import React from 'react';
import ReactDOM from 'react-dom';
import OrderCalendar from './OrderCalendar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<OrderCalendar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
