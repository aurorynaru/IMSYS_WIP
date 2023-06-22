import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import CustomInput from '../components/CustomInput'
import CustomSelect from '../components/CustomSelect'
import CustomText from '../components/CustomText'
import CustomTextBox from '../components/CustomTextBox'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { errorText } from '../functions/errorText'
import TableForm from '../components/TableForm'

const Invoice = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [resError, setResError] = useState('')

    //supplier
    const [isLoadingClient, setIsLoadingClient] = useState(false)
    const [searchResultClient, setSearchResultClient] = useState([])
    const [ClientValue, setClientValue] = useState('')

    const initialValues = {
        invoice_number: '',
        credit_limit: '',
        client: '',
        address: '',
        items: [],
        date_created: '',
        tin: '',
        terms: '',
        recipient: '',
        vatable_sales: '',
        vat: '',
        total_sales_vat_inclusive: '',
        less_vat: '',
        net_vat: '',
        total_amount_due: '',
        user_id: '',
        status: ''
    }

    const Schema = yup.object().shape({
        invoice_number: yup.number().min(4).required('required'),
        credit_limit: yup.string().required('Credit limit is required'),
        client: yup.string().min(3).max(100).required('required'),
        address: yup.string().required('required'),
        date_created: yup.date().required('required'),
        terms: yup.number(),
        recipient: yup.string().required('required'),
        vatable_sales: yup.number().positive('Number must be positive'),
        tin: yup
            .string()
            .min(15, 'Tin number must be at least 12 numbers.')
            .max(15, 'Tin number must be at max 12 numbers.')
            .required('Tin number is required'),
        vat: yup
            .number()
            .min(7)
            .positive('Number must be positive')
            .required('required'),
        total_sales_vat_inclusive: yup
            .number()
            .min(2)
            .positive('Number must be positive')
            .required('required'),
        less_vat: yup
            .number()
            .min(2)
            .positive('Number must be positive')
            .required('required'),
        net_vat: yup
            .number()
            .min(2)
            .positive('Number must be positive')
            .required('required'),
        total_amount_due: yup
            .number()
            .min(2)
            .positive('Number must be positive')
            .required('required'),
        user_id: '',
        status: ''
    })

    const handleSubmit = (values) => {
        console.log(values)
    }

    const handleSearchClient = async (query) => {
        if (query) {
            const newQuery = query.replace(/\s/g, '')
            if (newQuery.length > 0) {
                const response = await fetch(
                    `http://localhost:8888/api/client/${query}`,
                    {
                        method: 'GET'
                    }
                )

                const newSearch = await response.json()

                setSearchResultClient(newSearch)
                setIsLoadingClient(false)
            }
        } else {
            setSearchResultClient([])
            setIsLoadingClient(false)
        }
    }

    const setLoading = (value) => {
        if (value === 'client') {
            setIsLoadingClient(true)
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

    const debounceSubmitClient = debounce(handleSearchClient, 200, 'client')

    const formatCreditLimit = (value) => {
        if (typeof value === 'string') {
            value = value.replace(/\D/g, '')
        }
        if (value.length > 0) {
            value = value.slice(0, 12)
        }

        const formattedValue = Number(value).toLocaleString()

        return formattedValue
    }

    const formatNumber = (value) => {
        if (typeof value === 'string') {
            value = value.replace(/\D/g, '')
        }

        if (value.length > 12) {
            value = value.slice(0, 12)
        }

        let formattedValue = ''
        let groupCount = Math.ceil(value.length / 3)

        for (let i = 0; i < groupCount; i++) {
            let startIndex = i * 3
            let endIndex = startIndex + 3
            let chunk = value.slice(startIndex, endIndex)

            if (i > 0) {
                formattedValue += '-'
            }

            formattedValue += chunk
        }

        return formattedValue
    }

    return (
        <>
            <Navbar />
            <div className='flex w-full'>
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
                            className='mx-5 my-5 flex w-1/2 flex-col gap-1 rounded-md border-[2px] border-gray-600 bg-secondary pt-3 shadow-lg'
                        >
                            <div className='flex flex-col gap-3 px-2 '>
                                <h1 className='text-lg font-medium '>
                                    Create Invoice
                                </h1>
                                <div className='flex flex-col gap-1'>
                                    <label
                                        className='flex items-center text-left text-sm font-semibold text-neutral'
                                        htmlFor='client'
                                    >
                                        Client Name
                                        <span
                                            className='tooltip tooltip-right ml-1 before:text-xs'
                                            data-tip='client name'
                                        >
                                            <ExclamationCircleIcon className='h-5 w-5 text-neutral' />
                                        </span>
                                    </label>

                                    <input
                                        className={` input-primary input input-sm rounded-sm text-primary ${
                                            errors.client && touched.client
                                                ? ` border-red-500 focus:ring-red-500`
                                                : ''
                                        }`}
                                        value={values.client}
                                        onChange={(event) => {
                                            const value = event.target.value
                                            debounceSubmitClient(value)
                                            setFieldValue('client', value)
                                        }}
                                        onBlur={handleBlur}
                                        id='client'
                                        placeholder='Enter client name'
                                    ></input>
                                    {searchResultClient.length > 0 ? (
                                        <div className=' min-w-3/3 flex h-fit max-h-[180px]  w-2/3 flex-col items-center overflow-auto rounded-md  border-2 border-gray-600  bg-base-300 p-2'>
                                            {searchResultClient.map((elem) => {
                                                if (elem) {
                                                    console.log(elem)
                                                    return (
                                                        <div
                                                            onMouseEnter={(
                                                                event
                                                            ) => {
                                                                const text =
                                                                    event.target
                                                                        .innerText

                                                                setFieldValue(
                                                                    'client',
                                                                    text
                                                                )
                                                                setFieldValue(
                                                                    'tin',
                                                                    elem.tin
                                                                )
                                                                setFieldValue(
                                                                    'terms',
                                                                    elem.terms
                                                                )
                                                                setFieldValue(
                                                                    'credit_limit',
                                                                    elem.credit_limit
                                                                )
                                                                setFieldValue(
                                                                    'address',
                                                                    elem.address
                                                                )
                                                            }}
                                                            onMouseLeave={() => {
                                                                setFieldValue(
                                                                    'client',
                                                                    ''
                                                                )
                                                                setFieldValue(
                                                                    'tin',
                                                                    ''
                                                                )
                                                                setFieldValue(
                                                                    'terms',
                                                                    ''
                                                                )
                                                                setFieldValue(
                                                                    'credit_limit',
                                                                    ''
                                                                )
                                                                setFieldValue(
                                                                    'address',
                                                                    ''
                                                                )
                                                            }}
                                                            onClick={(
                                                                event
                                                            ) => {
                                                                const text =
                                                                    event.target
                                                                        .innerText

                                                                setSearchResultClient(
                                                                    []
                                                                )
                                                                setFieldValue(
                                                                    'client',
                                                                    text
                                                                )
                                                                setFieldValue(
                                                                    'tin',
                                                                    elem.tin
                                                                )
                                                                setFieldValue(
                                                                    'terms',
                                                                    elem.terms
                                                                )
                                                                setFieldValue(
                                                                    'credit_limit',
                                                                    elem.credit_limit
                                                                )
                                                                setFieldValue(
                                                                    'address',
                                                                    elem.address
                                                                )
                                                            }}
                                                            className=' flex h-fit w-full cursor-pointer  items-center  justify-between rounded-md p-1 text-sm font-medium text-primary hover:bg-neutral hover:text-accent'
                                                            key={elem.id}
                                                        >
                                                            <p>{elem.name}</p>
                                                        </div>
                                                    )
                                                }
                                            })}
                                        </div>
                                    ) : isLoadingClient ? (
                                        <div className=' w-[50px]] flex h-[180px] max-h-[50px] flex-col  items-center justify-center   overflow-auto  rounded-md border-2  border-gray-600 bg-base-300'>
                                            <span className='loading loading-spinner loading-md text-neutral '></span>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                    {errorText(errors.client, touched.client)}
                                </div>
                                {console.log(values)}
                            </div>

                            <div className='flex flex-col gap-3 px-2'>
                                <label
                                    className='text-sm font-semibold text-neutral'
                                    htmlFor='description'
                                >
                                    Client address
                                </label>

                                <textarea
                                    className={`input-primary input input-sm h-20 rounded-sm text-primary ${
                                        errors.address && touched.address
                                            ? ' border-red-500 focus:ring-red-500'
                                            : ''
                                    } `}
                                    value={values.address}
                                    onChange={handleChange}
                                    id='address'
                                    placeholder='Client Address'
                                    onBlur={handleBlur}
                                ></textarea>
                                {errorText(errors.address, touched.address)}
                            </div>
                            <div className='flex w-1/2 flex-col gap-3 px-2'>
                                <label
                                    className='text-sm font-semibold text-neutral'
                                    htmlFor='credit_limit'
                                >
                                    Credit Limit
                                </label>

                                <Field
                                    className={`input-primary input input-sm rounded-sm text-primary ${
                                        errors.credit_limit &&
                                        touched.credit_limit
                                            ? ' border-red-500 focus:ring-red-500'
                                            : ''
                                    } `}
                                    name='credit_limit'
                                    type='text'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formatCreditLimit(
                                        values.credit_limit
                                    )}
                                />
                                {errorText(
                                    errors.credit_limit,
                                    touched.credit_limit
                                )}
                            </div>

                            <div className='flex w-full items-center gap-5 px-2'>
                                <div className='w-1/2'>
                                    <label
                                        className='tooltip flex items-center text-left text-sm font-semibold text-neutral'
                                        htmlFor='terms'
                                    >
                                        Client Terms
                                        <span
                                            className='tooltip  tooltip-right ml-1'
                                            data-tip='amount in days'
                                        >
                                            <ExclamationCircleIcon className='h-5 w-5 text-neutral' />
                                        </span>
                                    </label>

                                    <Field
                                        className={`input-primary input input-sm w-full rounded-sm text-primary ${
                                            errors.terms && touched.terms
                                                ? ' border-red-500 focus:ring-red-500'
                                                : ''
                                        } `}
                                        name='terms'
                                        type='number'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.terms}
                                    />

                                    {errorText(errors.terms, touched.terms)}
                                </div>
                                <div className='flex w-1/2 flex-col'>
                                    <label
                                        className='text-sm font-semibold text-neutral'
                                        htmlFor='credit_limit'
                                    >
                                        Tin number
                                    </label>
                                    <Field
                                        className={`input-primary input input-sm w-full rounded-sm text-primary ${
                                            errors.tin && touched.tin
                                                ? ' border-red-500 focus:ring-red-500'
                                                : ''
                                        } `}
                                        name='tin'
                                        type='text'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={formatNumber(values.tin)}
                                    />
                                    {errorText(errors.tin, touched.tin)}
                                </div>
                            </div>
                            <div className='border-red flex w-full items-center border-2 p-2'>
                                <div className='sat'></div>

                                <TableForm />
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
                                    Save
                                </span>
                                Save
                            </button>
                        </Form>
                    )}
                </Formik>
                <div className='sat'>yo</div>
            </div>
        </>
    )
}

export default Invoice
