// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// import {internet} from 'faker'
import { build, fake } from '@jackfranklin/test-data-bot'
import Login from '../../components/login'

// const buildLoginForm = ({username = '', password = ''} = {}) => ({
//   anyUsername: username || internet.userName(),
//   anyPassword: password || internet.password()
// })

const buildLoginForm = build({
  fields: {
    anyUsername: fake(f => f.internet.userName()),
    anyPassword: fake(f => f.internet.password())
  }
})

test('submitting the form calls onSubmit with username and password', () => {
  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)
  
  const usernameInput = screen.getByLabelText(/username/i)
  const passwordInput = screen.getByLabelText(/password/i)
  const submitButton = screen.getByRole('button', {name: /submit/i})

  const {anyUsername, anyPassword} = buildLoginForm({
    overrides: {
      anyPassword: 'ABC'
    }
  })

  userEvent.type(usernameInput, anyUsername)
  userEvent.type(passwordInput, anyPassword)
  userEvent.click(submitButton)

  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith({
    username: anyUsername,
    password: 'ABC'
  })
})

/*
eslint
  no-unused-vars: "off",
*/
