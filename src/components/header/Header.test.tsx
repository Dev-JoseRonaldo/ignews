import { render, screen } from "@testing-library/react";
import { Header } from ".";

const { getByText } = screen

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return [null, false]
    }
  }
})

describe('Header component', () => {
  it('renders correctly', () => {
    render(<Header />)
    
    expect(getByText('Home')).toBeInTheDocument()
    expect(getByText('Posts')).toBeInTheDocument()
  })
})