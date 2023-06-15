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
    const [searchResult, setSearchResult] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [suggestedText, setSuggestedText] = useState('')

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

    const handleSearch = async (query) => {
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

    const debounce = (submit, delay) => {
        let timeoutID

        return (...args) => {
            setIsLoading(true)
            clearTimeout(timeoutID)
            timeoutID = setTimeout(() => {
                submit(...args)
            }, delay)
        }
    }

    const debounceSubmit = debounce(handleSearch, 200)

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
                        className='mx-auto my-5 flex w-1/3 flex-col gap-1 rounded-md border-[2px] border-gray-600 bg-secondary pt-5 shadow-lg'
                    >
                        <div className='flex flex-col gap-3 px-2 '>
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
                                {console.log(values)}
                                <input
                                    className={` input-primary input input-sm rounded-sm text-primary ${
                                        errors.brand && touched.brand
                                            ? ` border-red-500 focus:ring-red-500`
                                            : ''
                                    }`}
                                    value={values.brand}
                                    onChange={(event) => {
                                        const value = event.target.value
                                        debounceSubmit(value)

                                        setFieldValue('brand', value)

                                        if (values.brand && value.length >= 2) {
                                            setCustomID(generateCustomID(value))
                                        }
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
                                                                setSuggestedText(
                                                                    text
                                                                )
                                                                setSearchResult(
                                                                    []
                                                                )
                                                                setFieldValue(
                                                                    'brand',
                                                                    text
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
                            <div className='flex flex-col gap-1 '>
                                <label
                                    className='flex items-center text-left text-sm font-semibold text-neutral'
                                    htmlFor='purchased_from'
                                >
                                    Purchased From
                                    <span
                                        className='tooltip tooltip-right ml-1 before:text-xs'
                                        data-tip='supplier name???'
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
                                    value={values.purchased_from}
                                    onChange={handleChange}
                                    id='purchased_from'
                                    placeholder='Purchased From'
                                    onBlur={handleBlur}
                                ></input>
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

                                <h3 className={`${tailWindCss}`}>
                                    {customID && customID}
                                </h3>
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
