import '@testing-library/jest-dom'

import { render, screen, fireEvent } from '@testing-library/react'
import { useSession, signIn } from 'next-auth/react'
import { SubscribeButton } from './index'

jest.mock("next-auth/react")

const { getByText } = screen

describe("Subscribe Button Component", () => {

    it("renders correctly", () => {
        const useSessionMocked = jest.mocked(useSession)
        useSessionMocked.mockReturnValueOnce({
            data: null,
            status: "unauthenticated"
        })

        render( <SubscribeButton /> )
    
        expect(getByText("Subscribe now")).toBeInTheDocument()
    })

    it("redirects user to signbin in when not authenticated", () => {
        const signInMocked = jest.mocked(signIn)
        const useSessionMocked = jest.mocked(useSession)

        useSessionMocked.mockReturnValueOnce({
            data: null,
            status: "unauthenticated"
        })

        render( <SubscribeButton /> )

        const subscribeButton = getByText("Subscribe now")

        fireEvent.click(subscribeButton)

        // Espera que a função signIn, do next, seja chamada(toHaveBeenCalled)
        // ao clickar no 'subscribeButton' (fireEvent.click(subscribeButton))
        expect(signInMocked).toHaveBeenCalled()
    }) 
})