import React from 'react';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppClass from './AppClass'

test('renders without errors', () => {
  render(<AppClass />)
})
