import React from 'react'
import { tailwindError } from '../tailwindcss'

const ErrorResponse = ({ error }) => {
    return error ? <p className={` ${tailwindError} `}>{error}</p> : null
}

export default ErrorResponse
