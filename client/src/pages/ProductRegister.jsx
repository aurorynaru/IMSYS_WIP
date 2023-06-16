import React, { useState, useEffect } from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { tailWindCss } from '../tailwindcss'
import { textBlack } from '../tailwindcss'
import { errorText } from '../functions/errorText.jsx'
import Navbar from '../components/Navbar'
import { useDispatch } from 'react-redux'
import { generateCustomID } from '../functions/randomID'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

const ProductRegister = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [customID, setCustomID] = useState('')
    const [resError, setResError] = useState('')
    const [itemPrice, setItemPrice] = useState(0)

    //supplier
    const [isLoadingSupplier, setIsLoadingSupplier] = useState(false)
    const [searchResultSupplier, setSearchResultSupplier] = useState([])
    const [supplierValue, setSupplierValue] = useState('')

    //brand
    const [isLoading, setIsLoading] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    useEffect(() => {
        setCustomID(generateCustomID('None'))
    }, [])

    const initialValues = {
        brand: 'None',
        description: '',
        price: 0,
        quantity: '',
        purchased_from: '',
        custom_id: 'None'
    }
    //use multer
    const handleSubmit = async (values, onSubmitProps) => {
        const savedUserResponse = await fetch(
            'http://localhost:8888/register/product',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }
        )

        const savedProduct = await savedUserResponse.json()
        if (savedProduct.error) {
            setResError(loggedIn.error)
        }

        if (savedProduct) {
            if (!savedProduct.error) {
                navigate('/register/product')
                onSubmitProps.resetProps()
            }
        }
    }

    const Schema = yup.object().shape({
        description: yup.string().min(2).required('required'),
        price: yup
            .number()
            .test(
                'greaterThanZero',
                'Price must be greater than 0',
                (value) => {
                    return value > 0
                }
            )
            .test(
                'greaterThanZeroWithDecimals',
                'Price must be greater than 0.00',
                (value) => {
                    return value > 0 || value === 0.0
                }
            )
            .typeError('Please enter a valid number')
            .min(0.01, 'Price must be at least 1')
            .required('Price is required'),
        quantity: yup.number().min(1).required('required'),
        purchased_from: yup
            .string()
            .min(2, 'purchased name must be at least 2 characters.')
            .required('required'),
        brand: yup
            .string()
            .min(2, 'Brand name must be at least 2 characters.')
            .required('required')
    })

    const handleSearchBrandName = async (query) => {
        if (query) {
            const newQuery = query.replace(/\s/g, '')
            if (newQuery.length > 0) {
                const response = await fetch(
                    `http://localhost:8888/api/brand/${query}`,
                    {
                        method: 'GET'
                    }
                )

                const newSearch = await response.json()
                setSearchResult(newSearch)
                setIsLoading(false)
            }
        } else {
            setSearchResult([])
            setIsLoading(false)
        }
    }

    const handleSearchSupplierName = async (query) => {
        if (query) {
            const newQuery = query.replace(/\s/g, '')
            if (newQuery.length > 0) {
                const response = await fetch(
                    `http://localhost:8888/api/supplier/${query}`,
                    {
                        method: 'GET'
                    }
                )

                const newSearch = await response.json()
                setSearchResultSupplier(newSearch)
                setIsLoadingSupplier(false)
            }
        } else {
            setSearchResultSupplier([])
            setIsLoadingSupplier(false)
        }
    }

    const setLoading = (value) => {
        if (value === 'supplier') {
            setIsLoadingSupplier(true)
        } else if (value === 'brand') {
            setIsLoading(true)
        }
    }

    const debounce = (submit, delay, value) => {
        let timeoutID

        return (...args) => {
            setLoading(value)
            clearTimeout(timeoutID)
            timeoutID = setTimeout(() => {
                submit(...args)
            }, delay)
        }
    }

    const debounceSubmitBrandName = debounce(
        handleSearchBrandName,
        200,
        'brand'
    )
    const debounceSubmitSupplierName = debounce(
        handleSearchSupplierName,
        200,
        'supplier'
    )

    const getCustomID = (setFieldValue) => {
        setFieldValue('custom_id', customID)
        return <h3 className={`${tailWindCss}`}>{customID}</h3>
    }

    return (
        <>
            <Navbar />
            <Formik
                initialValues={initialValues}
                validationSchema={Schema}
                onSubmit={handleSubmit}
            >
                {({
                    errors,
                    handleChange,
                    handleSubmit,
                    touched,
                    values,
                    setFieldValue,
                    handleBlur
                }) => (
                    <Form
                        autoComplete='off'
                        onSubmit={handleSubmit}
                        className='mx-auto my-5 flex w-1/3 flex-col gap-1 rounded-md border-[2px] border-gray-600 bg-secondary pt-3 shadow-lg'
                    >
                        <div className='flex flex-col gap-3 px-2 '>
                            <h1 className='text-lg font-medium '>
                                Register Products
                            </h1>
                            <div className='flex flex-col gap-1'>
                                <label
                                    className='flex items-center text-left text-sm font-semibold text-neutral'
                                    htmlFor='brand'
                                >
                                    Brand Name
                                    <span
                                        className='tooltip tooltip-right ml-1 before:text-xs'
                                        data-tip='brand name'
                                    >
                                        <ExclamationCircleIcon className='h-5 w-5 text-neutral' />
                                    </span>
                                </label>

                                <input
                                    className={` input-primary input input-sm rounded-sm text-primary ${
                                        errors.brand && touched.brand
                                            ? ` border-red-500 focus:ring-red-500`
                                            : ''
                                    }`}
                                    value={values.brand}
                                    onChange={(event) => {
                                        const value = event.target.value
                                        debounceSubmitBrandName(value)

                                        setFieldValue('brand', value)
                                    }}
                                    onBlur={handleBlur}
                                    id='brand'
                                    placeholder='Enter Brand name'
                                ></input>
                                {searchResult.length > 0 ? (
                                    <div className=' min-w-3/3 flex h-fit max-h-[180px]  w-2/3 flex-col items-center overflow-auto rounded-md  border-2 border-gray-600  bg-base-300 p-2'>
                                        {searchResult.map((elem) => {
                                            if (elem) {
                                                return (
                                                    <div
                                                        className=' flex h-fit w-full cursor-pointer  items-center  justify-between rounded-md p-1 text-sm font-medium text-primary hover:bg-neutral hover:text-accent'
                                                        key={elem.id}
                                                    >
                                                        <p
                                                            onClick={(
                                                                event
                                                            ) => {
                                                                const text =
                                                                    event.target
                                                                        .innerText

                                                                setSearchResult(
                                                                    []
                                                                )
                                                                setFieldValue(
                                                                    'brand',
                                                                    text
                                                                )

                                                                const custom =
                                                                    setCustomID(
                                                                        generateCustomID(
                                                                            text
                                                                        )
                                                                    )

                                                                setFieldValue(
                                                                    'custom_id',
                                                                    custom
                                                                )
                                                            }}
                                                        >
                                                            {elem.name}
                                                        </p>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                ) : isLoading ? (
                                    <div className=' w-[50px]] flex h-[180px] max-h-[50px] flex-col  items-center justify-center   overflow-auto  rounded-md border-2  border-gray-600 bg-base-300'>
                                        <span className='loading loading-spinner loading-md text-neutral '></span>
                                    </div>
                                ) : (
                                    ''
                                )}
                                {errorText(errors.brand, touched.brand)}
                            </div>
                            {console.log(values)}
                            <div className='flex flex-col gap-1 '>
                                <label
                                    className='flex items-center text-left text-sm font-semibold text-neutral'
                                    htmlFor='purchased_from'
                                >
                                    Purchased From
                                    <span
                                        className='tooltip tooltip-right ml-1 before:text-xs'
                                        data-tip='supplier name??? also you need to pick from the suggestion box'
                                    >
                                        <ExclamationCircleIcon className='h-5 w-5 text-neutral' />
                                    </span>
                                </label>

                                <input
                                    className={` input-primary input input-sm rounded-sm text-primary ${
                                        errors.name && touched.name
                                            ? ` border-red-500 focus:ring-red-500`
                                            : ''
                                    }`}
                                    value={supplierValue}
                                    onChange={(event) => {
                                        const value = event.target.value
                                        debounceSubmitSupplierName(value)

                                        setSupplierValue(value)
                                    }}
                                    id='purchased_from'
                                    placeholder='Purchased From'
                                    onBlur={handleBlur}
                                ></input>
                                {searchResultSupplier.length > 0 ? (
                                    <div className=' min-w-3/3 flex h-fit max-h-[180px]  w-2/3 flex-col items-center overflow-auto rounded-md  border-2 border-gray-600  bg-base-300 p-2'>
                                        {searchResultSupplier.map((elem) => {
                                            if (elem) {
                                                return (
                                                    <div
                                                        className=' flex h-fit w-full cursor-pointer  items-center  justify-between rounded-md p-1 text-sm font-medium text-primary hover:bg-neutral hover:text-accent'
                                                        key={elem.id}
                                                    >
                                                        <p
                                                            onClick={(
                                                                event
                                                            ) => {
                                                                const text =
                                                                    event.target
                                                                        .innerText

                                                                setSearchResultSupplier(
                                                                    []
                                                                )
                                                                setSupplierValue(
                                                                    text
                                                                )
                                                                setFieldValue(
                                                                    'purchased_from',
                                                                    elem.id
                                                                )
                                                            }}
                                                        >
                                                            {elem.name}
                                                        </p>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                ) : isLoadingSupplier ? (
                                    <div className=' w-[50px]] flex h-[180px] max-h-[50px] flex-col  items-center justify-center   overflow-auto  rounded-md border-2  border-gray-600 bg-base-300'>
                                        <span className='loading loading-spinner loading-md text-neutral '></span>
                                    </div>
                                ) : (
                                    ''
                                )}
                                {errorText(
                                    errors.purchased_from,
                                    touched.purchased_from
                                )}
                            </div>

                            <div className='flex flex-col gap-1 '>
                                <label
                                    className='text-sm font-semibold text-neutral'
                                    htmlFor='description'
                                >
                                    Item Description
                                </label>

                                <input
                                    className={` input-primary input input-sm rounded-sm text-primary ${
                                        errors.name && touched.name
                                            ? ` border-red-500 focus:ring-red-500`
                                            : ''
                                    }`}
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    id='description'
                                    placeholder='Enter Item description'
                                ></input>
                                {errorText(
                                    errors.description,
                                    touched.description
                                )}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label
                                    className='text-sm font-semibold text-neutral'
                                    htmlFor='price'
                                >
                                    Price
                                </label>

                                <input
                                    className={` input-primary input input-sm rounded-sm text-primary ${
                                        errors.price && touched.price
                                            ? ` border-red-500 focus:ring-red-500`
                                            : ''
                                    }`}
                                    value={values.price}
                                    type='number'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    id='price'
                                    placeholder='Enter Item Price'
                                ></input>
                                {errorText(errors.price, touched.price)}
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label
                                    className='text-sm font-semibold text-neutral'
                                    htmlFor='quantity'
                                >
                                    Quantity
                                </label>

                                <input
                                    className={` input-primary input input-sm rounded-sm text-primary ${
                                        errors.name && touched.name
                                            ? ` border-red-500 focus:ring-red-500`
                                            : ''
                                    }`}
                                    value={values.quantity}
                                    onChange={handleChange}
                                    id='quantity'
                                    type='number'
                                    placeholder='Enter quantity'
                                    onBlur={handleBlur}
                                ></input>
                                {errorText(errors.quantity, touched.quantity)}
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className='text-sm font-semibold text-neutral'>
                                    Custom ID
                                </label>
                                {getCustomID(setFieldValue)}
                            </div>
                        </div>
                        <p
                            className={`w-full text-center text-sm text-red-500 ${
                                resError ? '' : 'invisible'
                            }`}
                        >
                            {resError ? resError : 'error'}
                        </p>
                        <button
                            className='btn2 relative overflow-hidden rounded-bl-md rounded-br-md border-opacity-50  py-4 font-semibold uppercase leading-none tracking-wider'
                            type='submit'
                        >
                            <span className='absolute inset-0 bg-neutral '></span>
                            <span className='absolute inset-0 flex items-center  justify-center text-primary'>
                                Submit
                            </span>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default ProductRegister
