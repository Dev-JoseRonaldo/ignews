import { render, screen } from "@testing-library/react";
import { SignInButton } from ".";
const { getByText } = screen


jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return [null , false]
    }
  }
})

it('renders correctly when user is not authenticated', () => {
  render(<SignInButton />)
  
  expect(getByText('Sign in with Github')).toBeInTheDocument()
})

jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return [
        { user: { name: 'John Doe', email: 'john.doe@gmail.com' }, expires: 'fake-expires' },
        false
      ]
    }
  }
})

it('renders correctly when user is authenticated', () => {
  const { debug } = render(<SignInButton />)
  debug()
  expect(getByText('John Doe')).toBeInTheDocument()
})
