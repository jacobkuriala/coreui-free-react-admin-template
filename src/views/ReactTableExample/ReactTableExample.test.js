import React from 'react';
import ReactDOM from 'react-dom';
import ReactTable from './ReactTableExample';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ReactTable />, div);
  ReactDOM.unmountComponentAtNode(div);
});
