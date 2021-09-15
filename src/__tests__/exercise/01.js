// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

/* 

you'll need to create a DOM node,
add it to the body, and 
render the component to that DOM node. You'll also need to 
clean up the DOM when your test is finished.

*/

// clean up innerHTML between each test
// so that each test can run in isolation of each other
beforeEach(() => {
  document.body.innerHTML = ''
})

// test('failing test', () => {
//   const div = document.createElement('div')
//   document.body.append(div)

//   ReactDOM.render(<Counter />, div)

//   const message = div.firstElementChild.querySelector('div')
//   expect(message.textContent).toBe('Current count: 1')
// })

test('counter increments and decrements when the buttons are clicked', () => {
  const div = document.createElement('div')
  document.body.append(div)

  ReactDOM.render(<Counter />, div)

  const message = div.firstElementChild.querySelector('div')
  expect(message.textContent).toBe('Current count: 0')

  const clickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })
  const [decrement, increment] = div.querySelectorAll('button')

  increment.dispatchEvent(clickEvent)
  expect(message.textContent).toBe('Current count: 1')

  decrement.dispatchEvent(clickEvent)
  decrement.dispatchEvent(clickEvent)
  expect(message.textContent).toBe('Current count: -1')
})

/* eslint no-unused-vars:0 */
