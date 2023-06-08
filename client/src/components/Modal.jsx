import React, { useEffect } from 'react'

const Model = ({ closeModal, seconds, logOut }) => {
    useEffect(() => {
        if (seconds < 1) {
            console.log('logOut')
            logOut()
        }
    }, [seconds])

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div className='fixed inset-0 bg-black opacity-50'></div>
            <div className='z-10 rounded-lg bg-body p-8'>
                <h2 className='mb-4 text-xl font-bold'>
                    You will be logged out in
                </h2>
                <p>{seconds} seconds.</p>
                <button
                    onClick={() => {
                        logOut()
                        closeModal()
                    }}
                    className='mt-4 rounded bg-gray-800 px-4 py-2 text-white'
                >
                    Log out
                </button>
            </div>
        </div>
    )
}

export default Model
