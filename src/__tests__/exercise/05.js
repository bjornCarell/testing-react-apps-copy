// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import {setupServer} from 'msw/node'
import {handlers} from 'test/server-handlers'
import Login from '../../components/login-submission'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

const server = setupServer(...handlers)

beforeEach(() => server.listen())
afterAll(() => server.close())

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  //screen.debug()

  expect(screen.getByText(username)).toBeInTheDocument()
})

test('not providing password displays error message', async () => {
  const Component = render(<Login />)
  const {username} = buildLoginForm()

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  expect(Component).toMatchInlineSnapshot(`
    Object {
      "asFragment": [Function],
      "baseElement": <body>
        <div>
          <form>
            <div>
              <label
                for="username-field"
              >
                Username
              </label>
              <input
                id="username-field"
                name="username"
                type="text"
              />
            </div>
            <div>
              <label
                for="password-field"
              >
                Password
              </label>
              <input
                id="password-field"
                name="password"
                type="password"
              />
            </div>
            <div>
              <button
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
          <div
            style="height: 200px;"
          >
            <div
              role="alert"
              style="color: red;"
            >
              password required
            </div>
          </div>
        </div>
      </body>,
      "container": <div>
        <form>
          <div>
            <label
              for="username-field"
            >
              Username
            </label>
            <input
              id="username-field"
              name="username"
              type="text"
            />
          </div>
          <div>
            <label
              for="password-field"
            >
              Password
            </label>
            <input
              id="password-field"
              name="password"
              type="password"
            />
          </div>
          <div>
            <button
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
        <div
          style="height: 200px;"
        >
          <div
            role="alert"
            style="color: red;"
          >
            password required
          </div>
        </div>
      </div>,
      "debug": [Function],
      "findAllByAltText": [Function],
      "findAllByDisplayValue": [Function],
      "findAllByLabelText": [Function],
      "findAllByPlaceholderText": [Function],
      "findAllByRole": [Function],
      "findAllByTestId": [Function],
      "findAllByText": [Function],
      "findAllByTitle": [Function],
      "findByAltText": [Function],
      "findByDisplayValue": [Function],
      "findByLabelText": [Function],
      "findByPlaceholderText": [Function],
      "findByRole": [Function],
      "findByTestId": [Function],
      "findByText": [Function],
      "findByTitle": [Function],
      "getAllByAltText": [Function],
      "getAllByDisplayValue": [Function],
      "getAllByLabelText": [Function],
      "getAllByPlaceholderText": [Function],
      "getAllByRole": [Function],
      "getAllByTestId": [Function],
      "getAllByText": [Function],
      "getAllByTitle": [Function],
      "getByAltText": [Function],
      "getByDisplayValue": [Function],
      "getByLabelText": [Function],
      "getByPlaceholderText": [Function],
      "getByRole": [Function],
      "getByTestId": [Function],
      "getByText": [Function],
      "getByTitle": [Function],
      "queryAllByAltText": [Function],
      "queryAllByDisplayValue": [Function],
      "queryAllByLabelText": [Function],
      "queryAllByPlaceholderText": [Function],
      "queryAllByRole": [Function],
      "queryAllByTestId": [Function],
      "queryAllByText": [Function],
      "queryAllByTitle": [Function],
      "queryByAltText": [Function],
      "queryByDisplayValue": [Function],
      "queryByLabelText": [Function],
      "queryByPlaceholderText": [Function],
      "queryByRole": [Function],
      "queryByTestId": [Function],
      "queryByText": [Function],
      "queryByTitle": [Function],
      "rerender": [Function],
      "unmount": [Function],
    }
  `)
})

test('not providing username displays error message', async () => {
  const Component = render(<Login />)
  const {password} = buildLoginForm()

  userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  expect(Component).toMatchInlineSnapshot(`
    Object {
      "asFragment": [Function],
      "baseElement": <body>
        <div>
          <form>
            <div>
              <label
                for="username-field"
              >
                Username
              </label>
              <input
                id="username-field"
                name="username"
                type="text"
              />
            </div>
            <div>
              <label
                for="password-field"
              >
                Password
              </label>
              <input
                id="password-field"
                name="password"
                type="password"
              />
            </div>
            <div>
              <button
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
          <div
            style="height: 200px;"
          >
            <div
              role="alert"
              style="color: red;"
            >
              username required
            </div>
          </div>
        </div>
      </body>,
      "container": <div>
        <form>
          <div>
            <label
              for="username-field"
            >
              Username
            </label>
            <input
              id="username-field"
              name="username"
              type="text"
            />
          </div>
          <div>
            <label
              for="password-field"
            >
              Password
            </label>
            <input
              id="password-field"
              name="password"
              type="password"
            />
          </div>
          <div>
            <button
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
        <div
          style="height: 200px;"
        >
          <div
            role="alert"
            style="color: red;"
          >
            username required
          </div>
        </div>
      </div>,
      "debug": [Function],
      "findAllByAltText": [Function],
      "findAllByDisplayValue": [Function],
      "findAllByLabelText": [Function],
      "findAllByPlaceholderText": [Function],
      "findAllByRole": [Function],
      "findAllByTestId": [Function],
      "findAllByText": [Function],
      "findAllByTitle": [Function],
      "findByAltText": [Function],
      "findByDisplayValue": [Function],
      "findByLabelText": [Function],
      "findByPlaceholderText": [Function],
      "findByRole": [Function],
      "findByTestId": [Function],
      "findByText": [Function],
      "findByTitle": [Function],
      "getAllByAltText": [Function],
      "getAllByDisplayValue": [Function],
      "getAllByLabelText": [Function],
      "getAllByPlaceholderText": [Function],
      "getAllByRole": [Function],
      "getAllByTestId": [Function],
      "getAllByText": [Function],
      "getAllByTitle": [Function],
      "getByAltText": [Function],
      "getByDisplayValue": [Function],
      "getByLabelText": [Function],
      "getByPlaceholderText": [Function],
      "getByRole": [Function],
      "getByTestId": [Function],
      "getByText": [Function],
      "getByTitle": [Function],
      "queryAllByAltText": [Function],
      "queryAllByDisplayValue": [Function],
      "queryAllByLabelText": [Function],
      "queryAllByPlaceholderText": [Function],
      "queryAllByRole": [Function],
      "queryAllByTestId": [Function],
      "queryAllByText": [Function],
      "queryAllByTitle": [Function],
      "queryByAltText": [Function],
      "queryByDisplayValue": [Function],
      "queryByLabelText": [Function],
      "queryByPlaceholderText": [Function],
      "queryByRole": [Function],
      "queryByTestId": [Function],
      "queryByText": [Function],
      "queryByTitle": [Function],
      "rerender": [Function],
      "unmount": [Function],
    }
  `)
})
