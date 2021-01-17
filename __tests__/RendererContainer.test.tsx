import React from 'react';
import { render } from '@testing-library/react';
import RendererContainer from './../src/RendererContainer';

test('renders learn react link', () => {
  const { getByText } = render(<RendererContainer />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
