import React from 'react'
import { tailwindError } from '../tailwindcss'

const ErrorResponse = ({ error }) => {
    return <p className={` ${tailwindError} `}>{error}</p>
}

export default ErrorResponse
