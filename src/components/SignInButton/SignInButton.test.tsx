import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import { useSession } from "next-auth/react"
import { SignInButton } from './index'

jest.mock("next-auth/react")

const { getByText } = screen

describe("Signin Button Component", () => {
    it("renders correctly when user is not authenticated", () => {
        const useSessionMocked = jest.mocked(useSession)

        useSessionMocked.mockReturnValueOnce({
            data: null,
            status: "unauthenticated"
        })

        render( <SignInButton /> )
    
        expect(getByText("Sign in with Github")).toBeInTheDocument()
    })

    it("renders correctly when user is authenticated", () => {
        const useSessionMocked = jest.mocked(useSession)
        useSessionMocked.mockReturnValueOnce({
            data: {
                user: {
                    name: "John Doe",
                    email: "john.doe@example.com.br"
                },
                expires: "false"
            },
            status: "authenticated"
        })
        
        render( <SignInButton /> )
    
        expect(getByText("John Doe")).toBeInTheDocument()
    })
})