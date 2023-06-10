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

    const [selectedValue, setSelectedValue] = useState('')
    const [savedTheme, setSavedTheme] = useState('')

    useEffect(() => {
        const localTheme = localStorage.getItem('theme')
        setSavedTheme(localTheme)

        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme)
        }

        if (selectedValue) {
            document.documentElement.setAttribute('data-theme', selectedValue)
        }
    }, [selectedValue, savedTheme])

    const closeModal = () => {
        setModalOpen(false)
    }

    const handleLogout = () => {
        dispatch(setLogOut())
    }

    const handleChange = (event) => {
        setSelectedValue(event.target.value)
        localStorage.setItem('theme', event.target.value)
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
            <nav className='navbar flex w-full items-center  bg-neutral bg-opacity-50 px-16 py-5 '>
                <div className='navbar-start  ' onClick={() => navigate('/')}>
                    <h1 className='cursor-pointer  text-4xl font-medium '>
                        TEST
                    </h1>
                </div>

                <div className='navbar-end '>
                    {isAuth ? (
                        <>
                            <div className='mx-10 flex items-center justify-center'>
                                <div className='dropdown'>
                                    <label
                                        tabIndex={0}
                                        className='m-1 text-lg font-bold  transition-colors duration-300  hover:text-primary'
                                    >
                                        Products
                                    </label>
                                    <ul
                                        tabIndex={0}
                                        className='dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow'
                                    >
                                        <li>
                                            <a>Item 1</a>
                                        </li>
                                        <li>
                                            <a>Item 2</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className=' flex transform gap-4 px-5 duration-500 hover:translate-y-[-5px]'>
                                <button
                                    className='btn-primary btn'
                                    onClick={() => {
                                        dispatch(setLogOut())
                                    }}
                                >
                                    Sign out
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='transform px-5 duration-500 hover:translate-y-[-5px]'>
                                <button
                                    className='btn-primary btn rounded-md border-none border-transparent text-base'
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
                    )}{' '}
                    <select
                        value={selectedValue}
                        onChange={handleChange}
                        className='select-secondary select '
                    >
                        <option disabled selected>
                            Pick a theme
                        </option>
                        <option>light</option>
                        <option>dark</option>
                        <option>night</option>
                        <option>themeA</option>
                    </select>
                </div>
            </nav>
        </>
    )
}

export default Navbar
