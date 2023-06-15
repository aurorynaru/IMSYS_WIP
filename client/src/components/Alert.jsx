import React from 'react'

const Alert = ({ text, css = '' }) => {
    return (
        <div className='flex justify-end'>
            <div
                className={`alert alert-success  w-1/6 whitespace-nowrap ${css} mx-5`}
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 shrink-0 stroke-current'
                    fill='none'
                    viewBox='0 0 24 24'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                </svg>
                <span>{text}</span>
            </div>
        </div>
    )
}

export default Alert
