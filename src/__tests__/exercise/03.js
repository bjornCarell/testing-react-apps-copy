// Avoid implementation details
// http://localhost:3000/counter

import * as React from 'react'
// Make use of userEvent over fireEvent, userEvent fires all user events, so
// it wont matter if the developer uses onClick or onMouseDown event for example, 
// the test will still pass
import {render, /* fireEvent */ screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  render(<Counter />)

  const increment = screen.getByRole('button', {name: /increment/i})
  const decrement = screen.getByRole('button', {name: /decrement/i})
  const message = screen.getByText(/current count/i)

  expect(message).toHaveTextContent('Current count: 0')

  userEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')

  userEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})
