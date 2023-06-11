import React, { useEffect, useState, Fragment, useRef } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setLogOut } from '../state/index.js'
import { textBlack } from '../tailwindcss.js'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
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
            <nav className='navbar flex max-w-full items-center  bg-neutral  px-5 py-5 '>
                <div className='navbar-start gap-2  ' onClick={() => navigate('/')}>
                    <h1 className='cursor-pointer  text-md font-medium text-accent'>
                        TEST
                    </h1>
                    <h1 className='cursor-pointer  text-md font-medium text-accent'>
                        TESTING
                    </h1>
                    <h1 className='cursor-pointer  text-md font-medium text-accent'>
                        TEST
                    </h1>
                </div>

              
                    {isAuth ? (
                        <div className='navbar-center '>
                            <div className='flex items-center justify-center'>
                                <Menu
                                    as='div'
                                    className='relative inline-block  text-left'
                                >
                                    <div className='text-primary hover:text-accent active:text-accent'>
                                        <Menu.Button className='inline-flex w-full justify-center rounded-md px-4 py-2 text-md  font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75'>
                                            Products
                                            <ChevronDownIcon
                                                className=' m-auto -mr-1 ml-2 h-5 w-5 '
                                                aria-hidden='true'
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter='transition ease-out duration-100'
                                        enterFrom='transform opacity-0 scale-95'
                                        enterTo='transform opacity-100 scale-100'
                                        leave='transition ease-in duration-75'
                                        leaveFrom='transform opacity-100 scale-100'
                                        leaveTo='transform opacity-0 scale-95'
                                    >
                                        <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-base-300 rounded-md bg-base-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                            <div className='px-1 py-1 '>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`${
                                                                active
                                                                    ? 'bg-secondary text-accent'
                                                                    : 'text-base-content'
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                        >
                                                            Create Purchase Order
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`${
                                                                active
                                                                    ? 'bg-secondary text-accent'
                                                                    : 'text-base-content'
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                        >
                                                            Register Products
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                            <div className='px-1 py-1'>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`${
                                                                active
                                                                    ? 'bg-secondary text-accent'
                                                                    : 'text-base-content'
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                        >
                                                            Purchase History
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`${
                                                                active
                                                                    ? 'bg-secondary text-accent'
                                                                    : 'text-base-content'
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                        >
                                                            View Products
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                           
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                                <Menu
                                    as='div'
                                    className='relative inline-block  text-left'
                                >
                                    <div className='text-primary hover:text-accent active:text-accent'>
                                        <Menu.Button className='inline-flex w-full justify-center rounded-md px-4 py-2 text-md  font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75'>
                                            Invoice
                                            <ChevronDownIcon
                                                className=' m-auto -mr-1 ml-2 h-5 w-5 '
                                                aria-hidden='true'
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter='transition ease-out duration-100'
                                        enterFrom='transform opacity-0 scale-95'
                                        enterTo='transform opacity-100 scale-100'
                                        leave='transition ease-in duration-75'
                                        leaveFrom='transform opacity-100 scale-100'
                                        leaveTo='transform opacity-0 scale-95'
                                    >
                                        <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-base-300 rounded-md bg-base-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                            <div className='px-1 py-1 '>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`${
                                                                active
                                                                    ? 'bg-secondary text-accent'
                                                                    : 'text-base-content'
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                        >
                                                            Create Invoice
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`${
                                                                active
                                                                    ? 'bg-secondary text-accent'
                                                                    : 'text-base-content'
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                        >
                                                            Invoice History
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                            <div className='px-1 py-1'>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`${
                                                                active
                                                                    ? 'bg-secondary text-accent'
                                                                    : 'text-base-content'
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                        >
                                                            Delivery Receipt
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                             
                                            </div>
                                           
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                                <Menu
                                    as='div'
                                    className='relative inline-block  text-left'
                                >
                                    <div className='text-primary hover:text-accent active:text-accent'>
                                        <Menu.Button className='inline-flex w-full justify-center rounded-md px-4 py-2 text-md  font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75'>
                                            Client
                                            <ChevronDownIcon
                                                className=' m-auto -mr-1 ml-2 h-5 w-5 '
                                                aria-hidden='true'
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter='transition ease-out duration-100'
                                        enterFrom='transform opacity-0 scale-95'
                                        enterTo='transform opacity-100 scale-100'
                                        leave='transition ease-in duration-75'
                                        leaveFrom='transform opacity-100 scale-100'
                                        leaveTo='transform opacity-0 scale-95'
                                    >
                                        <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-base-300 rounded-md bg-base-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                            <div className='px-1 py-1 '>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`${
                                                                active
                                                                    ? 'bg-secondary text-accent'
                                                                    : 'text-base-content'
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                        >
                                                            Register Clients
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`${
                                                                active
                                                                    ? 'bg-secondary text-accent'
                                                                    : 'text-base-content'
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                        >
                                                            View Clients
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                                <Menu
                                    as='div'
                                    className='relative inline-block  text-left'
                                >
                                    <div className='text-primary hover:text-accent active:text-accent'>
                                        <Menu.Button className='inline-flex w-full justify-center rounded-md px-4 py-2 text-md  font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75'>
                                            Users
                                            <ChevronDownIcon
                                                className=' m-auto -mr-1 ml-2 h-5 w-5 '
                                                aria-hidden='true'
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter='transition ease-out duration-100'
                                        enterFrom='transform opacity-0 scale-95'
                                        enterTo='transform opacity-100 scale-100'
                                        leave='transition ease-in duration-75'
                                        leaveFrom='transform opacity-100 scale-100'
                                        leaveTo='transform opacity-0 scale-95'
                                    >
                                        
                                        <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-base-300 rounded-md bg-base-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                            <div className='px-1 py-1 '>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`${
                                                                active
                                                                    ? 'bg-secondary text-accent'
                                                                    : 'text-base-content'
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                        >
                                                            Search Users
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>

                            </div>
                        <div className="navbar-end flex">
                    <select
                        value={savedTheme}
                        onChange={handleChange}
                        className='select-primary select select-sm '
                    >
                        <option disabled selected>
                            Pick a theme
                        </option>

                        <option>light</option>
                        <option>dark</option>
                        <option>themeA</option>
                    </select>
                    
                            <div className=' flex items-center transform duration-500 hover:translate-y-[-5px]'>
                                <button
                                    className='btn-primary btn mx-2 btn-sm'
                                    onClick={() => {
                                        dispatch(setLogOut())
                                    }}
                                >
                                    Sign out
                                </button>
                            </div>
                            </div>  
                            </div>
                    ) : (
                        <div className='navbar-end gap-3'>
                            <div className='transform duration-500 hover:translate-y-[-5px]'>
                                <button
                                    className='btn-secondary btn btn-sm whitespace-nowrap'
                                    onClick={() => navigate('/register/user')}
                                >
                                    Register user
                                </button>
                            </div>
                            <div className='transform  duration-500 hover:translate-y-[-5px]'>
                                <button
                                    className='btn btn-primary btn-sm whitespace-nowrap'
                                    onClick={() => navigate('/login')}
                                >
                                    Sign In
                                </button>
                            </div>

                            <div className="">
                    <select
                        value={savedTheme}
                        onChange={handleChange}
                        className='select-primary select select-sm '
                    >
                        <option disabled selected>
                            Pick a theme
                        </option>

                        <option>light</option>
                        <option>dark</option>
                        <option>themeA</option>
                    </select>
                    </div>
                        </div>
                    )}
                
                
            </nav>
        </>
    )
}

export default Navbar
