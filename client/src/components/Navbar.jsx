import React, { useEffect, useState, Fragment, useRef } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setLogOut } from '../state/index.js'
import { textBlack } from '../tailwindcss.js'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { DocumentIcon } from '@heroicons/react/24/outline'
import { CubeIcon } from '@heroicons/react/24/outline'
import { UserGroupIcon } from '@heroicons/react/24/outline'
import { UserIcon } from '@heroicons/react/24/outline'
import { TruckIcon } from '@heroicons/react/24/outline'

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
        <div className='drawer z-50'>
            <input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
            <div className='drawer-content flex flex-col'>
                {/* Navbar */}
                <div className='navbar w-full bg-neutral'>
                    <div className='flex-none lg:hidden'>
                        <label
                            htmlFor='my-drawer-3'
                            className='btn-ghost btn-square btn'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                className='inline-block h-6 w-6 stroke-current'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M4 6h16M4 12h16M4 18h16'
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className='mx-2 flex-1 px-2'>
                        <h1 className='text-md  cursor-pointer font-medium text-accent'>
                            TEST
                        </h1>
                        <h1 className='text-md  cursor-pointer font-medium text-accent'>
                            TESTING
                        </h1>
                        <h1 className='text-md  cursor-pointer font-medium text-accent'>
                            TEST
                        </h1>
                    </div>
                    <div className='hidden flex-none lg:block'>
                        <ul className='menu menu-horizontal'>
                            {/* Navbar menu content here */}

                            {isAuth ? (
                                <div className='flex flex-1 '>
                                    <div className='flex items-center   justify-start'>
                                        <Menu
                                            as='div'
                                            className='relative inline-block  text-left'
                                        >
                                            <div className='text-primary hover:text-accent active:text-accent'>
                                                <Menu.Button className='text-md inline-flex w-full justify-start rounded-md px-2 py-2  font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75'>
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
                                                <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-base-300 rounded-md bg-base-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                                    <div className='px-1 py-1 '>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    onClick={() => {
                                                                        navigate(
                                                                            '/create/invoice'
                                                                        )
                                                                    }}
                                                                    className={`${
                                                                        active
                                                                            ? ' bg-neutral text-accent'
                                                                            : 'text-primary'
                                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                >
                                                                    Create
                                                                    Invoice
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    className={`${
                                                                        active
                                                                            ? ' bg-neutral text-accent'
                                                                            : 'text-primary'
                                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                >
                                                                    Invoice
                                                                    History
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
                                                                            ? ' bg-neutral text-accent'
                                                                            : 'text-primary'
                                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                >
                                                                    Delivery
                                                                    Receipt
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                    </div>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                        <Menu
                                            as='div'
                                            className='relative  inline-block text-left'
                                        >
                                            <div className='text-primary hover:text-accent active:text-accent'>
                                                <Menu.Button className='inline-flex w-full   justify-start rounded-md px-2 py-2  font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75'>
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
                                                <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-base-300 rounded-md  bg-base-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                                    <div className='px-1 py-1 '>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    className={`${
                                                                        active
                                                                            ? ' bg-neutral text-accent'
                                                                            : 'text-primary'
                                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm font-normal `}
                                                                >
                                                                    Create
                                                                    Purchase
                                                                    Order
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    onClick={() => {
                                                                        navigate(
                                                                            '/register/product'
                                                                        )
                                                                    }}
                                                                    className={`${
                                                                        active
                                                                            ? ' bg-neutral text-accent'
                                                                            : 'text-primary'
                                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm font-normal`}
                                                                >
                                                                    Register
                                                                    Products
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
                                                                            ? ' bg-neutral text-accent'
                                                                            : 'text-primary'
                                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm font-normal`}
                                                                >
                                                                    Purchase
                                                                    History
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    className={`${
                                                                        active
                                                                            ? ' bg-neutral text-accent'
                                                                            : 'text-primary'
                                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm font-normal`}
                                                                >
                                                                    View
                                                                    Products
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
                                                <Menu.Button className='text-md inline-flex w-full   justify-start rounded-md px-2 py-2  font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75'>
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
                                                                    onClick={() => {
                                                                        navigate(
                                                                            '/register/client/'
                                                                        )
                                                                    }}
                                                                    className={`${
                                                                        active
                                                                            ? ' bg-neutral text-accent'
                                                                            : 'text-primary'
                                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                >
                                                                    Register
                                                                    Clients
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    className={`${
                                                                        active
                                                                            ? ' bg-neutral text-accent'
                                                                            : 'text-primary'
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
                                                <Menu.Button className='text-md inline-flex w-full   justify-start rounded-md px-2 py-2  font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75'>
                                                    Supplier
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
                                                                    onClick={() => {
                                                                        navigate(
                                                                            '/register/supplier/'
                                                                        )
                                                                    }}
                                                                    className={`${
                                                                        active
                                                                            ? ' bg-neutral text-accent'
                                                                            : 'text-primary'
                                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                >
                                                                    Register
                                                                    Suppliers
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    className={`${
                                                                        active
                                                                            ? ' bg-neutral text-accent'
                                                                            : 'text-primary'
                                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                >
                                                                    View
                                                                    Suppliers
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
                                                <Menu.Button className='text-md inline-flex w-full   justify-start rounded-md px-2 py-2  font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75'>
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
                                                                            ? ' bg-neutral text-accent'
                                                                            : 'text-primary'
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
                                    <div className=' flex'>
                                        <select
                                            value={savedTheme || 'light'}
                                            onChange={handleChange}
                                            className='select-primary select select-sm '
                                        >
                                            <option disabled value=''>
                                                Pick a theme
                                            </option>

                                            <option>light</option>
                                            <option>dark</option>
                                            <option>themeA</option>
                                        </select>

                                        <div className=' flex transform items-center duration-500 hover:translate-y-[-5px]'>
                                            <button
                                                className='btn-primary btn-sm btn mx-2'
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
                                <div className='flex-1 gap-3'>
                                    <div className='transform duration-500 hover:translate-y-[-5px]'>
                                        <button
                                            className='btn-secondary btn-sm btn whitespace-nowrap'
                                            onClick={() =>
                                                navigate('/register/user')
                                            }
                                        >
                                            Register user
                                        </button>
                                    </div>
                                    <div className='transform  duration-500 hover:translate-y-[-5px]'>
                                        <button
                                            className='btn-primary btn-sm btn whitespace-nowrap'
                                            onClick={() => navigate('/login')}
                                        >
                                            Sign In
                                        </button>
                                    </div>

                                    <div className=''>
                                        <select
                                            value={savedTheme || 'light'}
                                            onChange={handleChange}
                                            className='select-primary select select-sm '
                                        >
                                            <option disabled value=''>
                                                Pick a theme
                                            </option>

                                            <option>light</option>
                                            <option>dark</option>
                                            <option>themeA</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <div className='drawer-side'>
                <label
                    htmlFor='my-drawer-3'
                    className='drawer-overlay '
                ></label>
                <ul className='menu  min-h-screen w-72 bg-base-200 p-4'>
                    {/* Sidebar content here */}
                    {isAuth ? (
                        <div className='flex flex-col'>
                            <h1 className='mb-2 font-bold'>General</h1>
                            <ul className='menu rounded-box w-full bg-base-200 p-0 '>
                                <li className='flex flex-col gap-4 '>
                                    <details close='true'>
                                        <summary>
                                            <span>
                                                <DocumentIcon className='h-4 w-4 text-primary' />
                                            </span>
                                            Invoice
                                        </summary>

                                        <ul>
                                            <li
                                                onClick={() => {
                                                    navigate('/create/invoice')
                                                }}
                                            >
                                                <a>Create invoice</a>
                                            </li>
                                            <li>
                                                <a>Invoice History</a>
                                            </li>
                                            <li>
                                                <a>Delivery Receipt</a>
                                            </li>
                                        </ul>
                                    </details>
                                    <details close='true'>
                                        <summary>
                                            <span>
                                                <CubeIcon className='h-4 w-4 text-primary' />
                                            </span>
                                            Products
                                        </summary>

                                        <ul>
                                            <li
                                                onClick={() => {
                                                    navigate(
                                                        '/register/product'
                                                    )
                                                }}
                                            >
                                                <a>Register Products</a>
                                            </li>
                                            <li>
                                                <a>Purchase History</a>
                                            </li>
                                            <li>
                                                <a>View Products</a>
                                            </li>
                                        </ul>
                                    </details>
                                    <details close='true'>
                                        <summary>
                                            <span>
                                                <UserGroupIcon className='h-4 w-4 text-primary' />
                                            </span>
                                            Client
                                        </summary>

                                        <ul>
                                            <li
                                                onClick={() => {
                                                    navigate(
                                                        '/register/client/'
                                                    )
                                                }}
                                            >
                                                <a>Register Client</a>
                                            </li>
                                            <li>
                                                <a>View Clients</a>
                                            </li>
                                        </ul>
                                    </details>
                                    <details close='true'>
                                        <summary>
                                            <span>
                                                <TruckIcon className='h-4 w-4 text-primary' />
                                            </span>
                                            Supplier
                                        </summary>

                                        <ul>
                                            <li
                                                onClick={() => {
                                                    navigate(
                                                        '/register/supplier/'
                                                    )
                                                }}
                                            >
                                                <a>Register Supplier</a>
                                            </li>
                                            <li>
                                                <a>View Suppliers</a>
                                            </li>
                                        </ul>
                                    </details>
                                    <details close='true'>
                                        <summary>
                                            <span>
                                                <UserIcon className='h-4 w-4 text-primary' />
                                            </span>
                                            Users
                                        </summary>

                                        <ul>
                                            <li>
                                                <a>Search Users</a>
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                            </ul>
                            <div className='mt-10 flex max-w-fit  items-start gap-5'>
                                <button
                                    className='btn-primary btn-sm btn  transform text-base-100 duration-500 hover:translate-y-[-5px] hover:text-neutral'
                                    onClick={() => {
                                        dispatch(setLogOut())
                                    }}
                                >
                                    Sign out
                                </button>
                                <select
                                    value={savedTheme || 'light'}
                                    onChange={handleChange}
                                    className='select-primary select select-sm '
                                >
                                    <option disabled value=''>
                                        Pick a theme
                                    </option>

                                    <option>light</option>
                                    <option>dark</option>
                                    <option>themeA</option>
                                </select>
                            </div>
                        </div>
                    ) : (
                        <div className='flex-1 gap-3'>
                            <div className='transform duration-500 hover:translate-y-[-5px]'>
                                <button
                                    className='btn-secondary btn-sm btn whitespace-nowrap'
                                    onClick={() => navigate('/register/user')}
                                >
                                    Register user
                                </button>
                            </div>
                            <div className='transform  duration-500 hover:translate-y-[-5px]'>
                                <button
                                    className='btn-primary btn-sm btn whitespace-nowrap'
                                    onClick={() => navigate('/login')}
                                >
                                    Sign In
                                </button>
                            </div>

                            <div className=''>
                                <select
                                    value={savedTheme || 'light'}
                                    onChange={handleChange}
                                    className='select-primary select select-sm '
                                >
                                    <option disabled value=''>
                                        Pick a theme
                                    </option>

                                    <option>light</option>
                                    <option>dark</option>
                                    <option>themeA</option>
                                </select>
                            </div>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Navbar
