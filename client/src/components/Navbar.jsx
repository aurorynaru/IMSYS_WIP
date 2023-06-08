import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setLogOut } from '../state/index.js'
import { textBlack } from '../tailwindcss.js'
const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isHovered, setIsHovered] = useState(false)
    const [isModalOpen, setModalOpen] = useState(false)
    const [remainingSeconds, setRemainingSeconds] = useState(0)

    const expirationDate = useSelector((state) => state.expirationDate)
    const token = useSelector((state) => state.token)
    const isAuth = Boolean(useSelector((state) => state.token))

    const closeModal = () => {
        setModalOpen(false)
    }

    const handleLogout = () => {
        dispatch(setLogOut())
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentTimestamp = Math.floor(Date.now() / 1000)

            if (token && expirationDate && currentTimestamp > expirationDate) {
                clearInterval(intervalId)
            } else if (token && expirationDate) {
                setRemainingSeconds(expirationDate - currentTimestamp)

                if (remainingSeconds <= 5) {
                    setModalOpen(true)
                }
            }
        }, 1000)

        return () => {
            clearInterval(intervalId)
        }
    }, [dispatch, token, expirationDate])

    return (
        <>
            <div className='flex items-center justify-between bg-white-blue px-5 py-5 shadow-md '>
                <div
                    className='flex items-center px-5 '
                    onClick={() => navigate('/')}
                >
                    <h1
                        className={`m-0 cursor-pointer text-3xl font-medium tracking-[0.005em] text-dark  `}
                    >
                        TEST
                    </h1>
                </div>
                <div className='group relative flex items-center '></div>
                <div className='flex'>
                    {isAuth ? (
                        <div className='flex items-center justify-center'>
                            <ul>
                                <li
                                    className={` ${textBlack} cursor-pointer font-medium hover:text-dark`}
                                    onClick={() => {
                                        navigate('/create/product')
                                    }}
                                >
                                    Create product
                                </li>
                            </ul>

                            <div className='flex transform gap-4 px-5 duration-500 hover:translate-y-[-5px]'>
                                <button
                                    className='rounded-md border-none border-transparent bg-dark px-4 py-2 text-sm font-medium text-white-blue '
                                    onClick={() => {
                                        dispatch(setLogOut())
                                    }}
                                >
                                    Sign out
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className='transform px-5 duration-500 hover:translate-y-[-5px]'>
                                <button
                                    className='rounded-md border-none border-transparent bg-dark px-4 py-2 text-sm font-medium text-white-blue '
                                    onClick={() => navigate('/register/user')}
                                >
                                    Register user
                                </button>
                            </div>
                            <div className='transform px-5 duration-500 hover:translate-y-[-5px]'>
                                <button
                                    className='rounded-md border-none border-transparent bg-dark px-4 py-2 text-sm font-medium text-white-blue '
                                    onClick={() => navigate('/login')}
                                >
                                    Sign In
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Navbar
