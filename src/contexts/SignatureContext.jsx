import React, { useState, createContext, useContext } from "react"

const SignatureContext = createContext()

export const useSignature = () => useContext(SignatureContext)

export default function SignatureProvider({ children }) {
    const [ signature, setSignature ] = useState({})

    return (
        <SignatureContext.Provider value={{ signature, setSignature }}>
            {children}
        </SignatureContext.Provider>
    )
}